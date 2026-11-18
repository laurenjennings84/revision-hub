/* Peter's Revision Hub: app engine */
/* ---------- diagrams (marker numbers match label order) ---------- */
const mk = (n,x,y) => `<g class="mk" data-n="${n}"><circle cx="${x}" cy="${y}" r="13"/><text x="${x}" y="${y}">${n}</text></g>`;
function waveSvg(){ let d=""; for(let x=20;x<=340;x+=4){ const y=100-50*Math.sin((x-20)/160*2*Math.PI); d+=(x===20?"M":"L")+x+" "+y.toFixed(1)+" "; }
  return `<svg class="diagram" viewBox="0 0 360 210" role="img" aria-label="Transverse wave">
  <line class="thin" x1="10" y1="100" x2="350" y2="100"/><path class="line" d="${d}"/>
  <line class="line" x1="60" y1="28" x2="220" y2="28" stroke-width="1.5"/><line class="line" x1="60" y1="22" x2="60" y2="34"/><line class="line" x1="220" y1="22" x2="220" y2="34"/>
  <line class="line" x1="236" y1="100" x2="236" y2="50" stroke-width="1.5"/><line class="line" x1="230" y1="50" x2="242" y2="50"/><line class="line" x1="230" y1="100" x2="242" y2="100"/>
  ${mk(1,60,64)}${mk(2,140,168)}${mk(3,140,28)}${mk(4,256,75)}${mk(5,330,118)}</svg>`; }
const DIAGRAMS = {
  heart: `<svg class="diagram" viewBox="0 0 330 290" role="img" aria-label="Heart">
    <rect class="shape" x="62" y="20" width="26" height="80"/><rect class="shape" x="118" y="30" width="24" height="80"/><rect class="shape" x="178" y="20" width="26" height="80"/><rect class="shape" x="256" y="112" width="60" height="22"/>
    <rect class="fillA" x="55" y="95" width="105" height="70" rx="10"/><rect class="fillA" x="55" y="170" width="105" height="100" rx="10"/>
    <rect class="fillA" x="165" y="95" width="95" height="70" rx="10"/><rect class="fillA" x="165" y="170" width="95" height="100" rx="10"/>
    ${mk(1,95,130)}${mk(2,107,220)}${mk(3,212,130)}${mk(4,212,220)}${mk(5,75,45)}${mk(6,130,55)}${mk(7,191,45)}${mk(8,295,123)}</svg>`,
  atom: `<svg class="diagram" viewBox="0 0 320 240" role="img" aria-label="Atom">
    <circle class="thin" cx="160" cy="120" r="62"/><circle class="thin" cx="160" cy="120" r="100"/>
    <circle class="fillA" cx="160" cy="120" r="26"/>
    <circle class="shape" cx="150" cy="112" r="8" style="fill:var(--accent)"/><circle class="shape" cx="170" cy="128" r="8" style="fill:var(--accent)"/>
    <circle class="shape" cx="170" cy="110" r="8"/><circle class="shape" cx="150" cy="130" r="8"/>
    <circle class="shape" cx="222" cy="120" r="7" style="fill:var(--ink)"/><circle class="shape" cx="98" cy="120" r="7" style="fill:var(--ink)"/><circle class="shape" cx="160" cy="20" r="7" style="fill:var(--ink)"/>
    ${mk(1,160,74)}${mk(2,122,96)}${mk(3,198,96)}${mk(4,246,108)}${mk(5,240,200)}</svg>`,
  volcano: `<svg class="diagram" viewBox="0 0 340 260" role="img" aria-label="Volcano cross-section">
    <ellipse class="shape" cx="170" cy="42" rx="70" ry="28"/>
    <polygon class="fillA" points="20,215 140,82 200,82 320,215"/>
    <path class="thin" d="M60 190 L150 100 M85 205 L155 125 M280 190 L190 100"/>
    <rect class="shape" x="160" y="82" width="20" height="120" style="fill:var(--accent)"/>
    <ellipse class="shape" cx="170" cy="225" rx="90" ry="26" style="fill:var(--accent)"/>
    <path class="line" d="M200 84 Q230 120 240 165" stroke-width="6" style="stroke:var(--accent)"/>
    ${mk(1,170,228)}${mk(2,152,150)}${mk(3,170,96)}${mk(4,170,40)}${mk(5,262,150)}${mk(6,92,170)}</svg>`
};
DIAGRAMS.wave = waveSvg();

/* ---------- state ---------- */
const ICON = {slider:"Slide", tap:"Tap", exam:"Exam", blanks:"Gaps", quiz:"Quiz", match:"Match", map:"Map", order:"Order", build:"Build", sort:"Sort", label:"Label"};
/* State lives in one object, cached on the device and synced to Firebase as one document per player. */
let CLOUD = null, ME = null;
let STATE = {kv:{}, acc:{}, log:[]};
let progress = {}, missed = {};
let saveTimer = null, saving = false, dirty = false;
const store = { get(k,d){ return k in STATE.kv ? STATE.kv[k] : d; }, set(k,v){ STATE.kv[k] = v; queueSave(); } };
const practice = () => !!(ME && ME.parent);
const cacheKey = () => "prh:state:" + (ME ? ME.uid : "local");
function ensureState(){ STATE.kv = STATE.kv||{}; STATE.acc = STATE.acc||{}; STATE.log = STATE.log||[];
  progress = store.get("progress", {}); missed = store.get("missed", {}); STATE.kv.progress = progress; STATE.kv.missed = missed; }
function loadLocalState(){ try{ const v = localStorage.getItem(cacheKey()); if(v) STATE = JSON.parse(v); }catch(e){} ensureState(); }
function queueSave(){ if(practice()) return; try{ localStorage.setItem(cacheKey(), JSON.stringify(STATE)); }catch(e){} dirty = true; clearTimeout(saveTimer); saveTimer = setTimeout(flush, 1500); }
async function flush(){
  if(!CLOUD || !ME || practice() || saving || !dirty) return; saving = true; dirty = false;
  try{ await CLOUD.savePlayer(ME.uid, {state: JSON.stringify(STATE), name: ME.name, email: ME.email, xp: STATE.kv.xp||0, updated: Date.now()}); setSync("Synced"); }
  catch(e){ dirty = true; setSync("Offline: will sync when back online"); }
  saving = false; if(dirty) saveTimer = setTimeout(flush, 8000);
}
function setSync(t){ const el = document.getElementById("sync"); if(el) el.textContent = t; }
document.addEventListener("visibilitychange", () => { if(document.visibilityState === "hidden") flush(); });
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const norm = s => String(s).toLowerCase().replace(/[’‘]/g,"'").replace(/[^\p{L}\p{N}'\-.\/^√×²⁻ ]/gu,"").replace(/\s+/g," ").trim().replace(/^[.']+|[.']+$/g,"");
const shuffle = a => { a = a.slice(); for(let i=a.length-1;i>0;i--){ const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]] = [a[j],a[i]]; } return a; };
const key = (s,set) => s.id+"/"+set.title;
const subjOf = id => SUBJECTS.find(x => x.id === id);

/* tag question items; turn match pairs into extra quiz questions for blitz and weak spots */
let GEN = {};
function reindex(){ GEN = {}; SUBJECTS.forEach(s => {
  GEN[s.id] = [];
  s.sets.forEach(set => {
    (set.type==="exam"?[]:(set.items||[])).forEach(it => { it._sid = s.id; it._id = s.id+"|"+(set.type==="tap" ? it.q+" "+(it.text||it.lines.join(" / ")) : (it.text||((it.code||"")+it.q))); });
    if(set.type==="match" && set.pairs.length>=4) set.pairs.forEach(([l,r]) => {
      const others = shuffle(set.pairs.filter(p=>p[0]!==l).map(p=>p[1])).slice(0,3);
      GEN[s.id].push({q:`Which matches “${l}”?`, a:r, opts:[r,...others], hint:set.title, _sid:s.id, _id:s.id+"|"+set.title+"|"+l});
    });
  });
}); }
reindex();
const quizPool = sid => SUBJECTS.filter(s=>!sid||s.id===sid).flatMap(s => [...s.sets.filter(x=>x.type==="quiz").flatMap(x=>x.items), ...GEN[s.id]]);
const allItems = () => SUBJECTS.flatMap(s => [...s.sets.filter(x=>x.type==="quiz"||x.type==="blanks").flatMap(x => x.items), ...GEN[s.id]]);
const allTagged = () => SUBJECTS.flatMap(s => [...s.sets.filter(x=>["quiz","blanks","slider","tap"].includes(x.type)).flatMap(x => x.items), ...GEN[s.id]]);
const weakItems = () => allItems().filter(it => missed[it._id] > 0);
const needsWork = () => SUBJECTS.flatMap(s => s.sets.map(set => ({s,set,p:progress[key(s,set)]})))
  .filter(w => w.p && w.p.best < 70).sort((a,b)=>a.p.best-b.p.best).slice(0,5);
const markMissed = (id, ok) => { if(!id) return;
  const sid = id.split("|")[0], a = STATE.acc[sid] = STATE.acc[sid] || {r:0,w:0}; ok ? a.r++ : a.w++;
  if(ok){ if(missed[id]) missed[id]--; if(!missed[id]) delete missed[id]; } else missed[id] = (missed[id]||0) + 2; store.set("missed", missed); };

const RANKS = ["Grom","Rookie","Shredder","Riff Machine","Headliner","Final Boss","Legend"];
const xpNow = () => store.get("xp",0);
const lvl = x => { const l = Math.floor(x/300); return {l:l+1, rank:RANKS[Math.min(l,RANKS.length-1)], into:x%300}; };
function addXP(n){ if(n>0) store.set("xp", xpNow()+Math.round(n)); }
const app = document.getElementById("app");
const top0 = () => window.scrollTo(0,0);

/* ---------- screens ---------- */
function home(){
  const all = SUBJECTS.flatMap(s => s.sets.map(set => progress[key(s,set)]));
  const done = all.filter(Boolean).length;
  const avg = done ? Math.round(all.filter(Boolean).reduce((t,p)=>t+p.best,0)/done) : 0;
  const days = store.get("days", []).length;
  const weak = weakItems().length, nw = needsWork();
  app.innerHTML = `
    ${topBar()}
    <div class="eyebrow">GCSE 2027 · Urmston Grammar</div>
    <h1>Peter's <em>Revision</em> Hub</h1>
    <p class="muted">Short runs. Land the answers, bank the XP, level up. Two or three rounds, then go skate.</p>
    ${practice()?`<div class="practice"><b>Practice mode.</b> You’re signed in as a parent, so nothing you do here is saved or shown on the dashboard. Peter’s scores aren’t affected.</div>`:""}
    ${(()=>{ const L = lvl(xpNow()); return `<div class="xp"><div class="row" style="justify-content:space-between"><span class="rank">Level ${L.l} · ${L.rank}</span><span class="note">${xpNow()} XP</span></div>
      <div class="xpbar"><i style="width:${L.into/3}%"></i></div><span class="note">${300-L.into} XP to the next level</span></div>`; })()}
    <div class="stats">
      <div class="stat"><b>${done}/${all.length}</b><span>activities done</span></div>
      <div class="stat"><b>${avg}%</b><span>average best score</span></div>
      <div class="stat"><b>${days}</b><span>days revised</span></div>
      <div class="stat"><b>${store.get("blitz:all",0)}</b><span>blitz record</span></div>
    </div>
    <div class="row">
      ${weak ? `<button class="btn" id="weak">Fix my weak spots (${weak})</button>` : ""}
      <button class="btn${weak?" ghost":""}" id="mix">Quick 10</button>
    </div>
    <div class="eyebrow">Arcade: all subjects</div>
    ${arcade(null)}
    ${nw.length ? `<div class="list"><div class="eyebrow">Needs another go</div>${nw.map(w => actBtn(w.s,w.set,`data-ws="${w.s.id}" data-wt="${esc(w.set.title)}"`, w.s.name)).join("")}</div>` : ""}
    <div class="grid">${SUBJECTS.map(s => { const n=s.sets.length, d=s.sets.filter(set=>progress[key(s,set)]).length;
      return `<button class="subj${s.focus?" focus":""}${s.alevel?" alevel":""}" data-s="${s.id}"><small>${esc(s.board)}</small><h3>${esc(s.name)}</h3>
        ${s.focus?'<span class="tag">Focus subject</span>':""}${s.alevel?'<span class="tag">A-level subject</span>':""}<div class="bar"><i style="width:${n?d/n*100:0}%"></i></div>
        <span class="note">${d} of ${n} done</span></button>`;}).join("")}</div>
    <p class="note">${practice()?"Practice mode: nothing is saved.":"Scores sync to the parent dashboard."} Wrong answers come back in ‘Fix my weak spots’ until you get each one right twice.</p>`;
  app.querySelectorAll("[data-s]").forEach(b => b.onclick = () => subject(b.dataset.s));
  app.querySelectorAll("[data-ws]").forEach(b => b.onclick = () => { const s=subjOf(b.dataset.ws); run(s, s.sets.find(x=>x.title===b.dataset.wt)); });
  app.querySelector("#mix").onclick = quickMix;
  wireArcade(null);
  const wk = app.querySelector("#weak"); if(wk) wk.onclick = weakRound;
  wireTopBar();
  top0();
}
function actBtn(s,set,attrs,sub){ const p = progress[key(s,set)];
  return `<button class="act" ${attrs}><span class="ico">${ICON[set.type]}</span>
    <span class="txt"><h3>${esc(set.title)}</h3><span class="note">${esc(sub||count(set))}</span></span>
    <span class="score${p?(p.best<70?" low":" done"):""}">${p?p.best+"%":"–"}</span></button>`; }
const count = set => ({match:set.pairs?.length+" pairs", map:set.model?.length+" points", order:set.steps?.length+" steps", build:set.quotes?.length+" quotes",
  exam:set.items?.length+" questions", sort:set.bins?Object.values(set.bins).flat().length+" cards":"", label:set.labels?.length+" labels"})[set.type] || set.items.length+" questions";

function subject(id){
  const s = subjOf(id);
  const topics = [...new Set(s.sets.map(x=>x.topic))];
  app.innerHTML = `
    <button class="back" id="back">← All subjects</button>
    <div class="eyebrow">${esc(s.board)}</div><h1>${esc(s.name)}</h1>
    <div class="eyebrow">Arcade</div>${arcade(s.id)}
    ${topics.map(t => `<div class="topic"><h2>${esc(t)}</h2>${s.sets.filter(x=>x.topic===t).map(set => actBtn(s,set,`data-t="${esc(set.title)}"`)).join("")}</div>`).join("")}`;
  app.querySelector("#back").onclick = home;
  wireArcade(s.id);
  app.querySelectorAll("[data-t]").forEach(b => b.onclick = () => run(s, s.sets.find(x=>x.title===b.dataset.t)));
  top0();
}

function run(s, set, mode){
  const done = score => finish(s, set, score, mode), back = () => subject(s.id);
  clearTimeout(bossTimer); clearInterval(timer);
  const fn = mode==="memory" ? memory : mode==="tap" ? tapDiagram :
    ({match, exam:examQ, map:mindMap, order:orderUp, build:buildQuote, sort:sortIt, label:labelIt, slider:sliderQ, tap:tapQ}[set.type] || ((s,set,d,b)=>questions(s.name,set.title,shuffle(set.items),d,b)));
  fn(s,set,done,back);
  top0();
}
const head = (back,label) => { const b = document.createElement("button"); b.className="back"; b.textContent="← "+label; b.onclick=back; return b; };
function shell(back, label, html){ app.innerHTML = `<div class="card">${html}</div>`; app.prepend(head(back,label)); return app.querySelector(".card"); }

function questions(subjName, title, items, done, back){
  let n = 0, right = 0, streak = 0;
  const draw = () => {
    const it = items[n], typed = !it.opts;
    const prompt = it.text ? esc(it.text).replace("___",'<u>&nbsp;?&nbsp;&nbsp;&nbsp;</u>') : esc(it.q);
    const card = shell(back, subjName, `
      <div class="progress"><span>${esc(title)}</span><span>${n+1} / ${items.length}</span></div>
      ${it.code?`<pre class="code">${esc(it.code)}</pre>`:""}
      <p class="qtext">${prompt}</p>${it.hint?`<p class="hint">${esc(it.hint)}</p>`:""}
      ${typed ? `<form id="f" class="row"><input type="text" id="ans" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type your answer"><button class="btn" type="submit">Check</button></form>`
              : `<div class="opts">${shuffle(it.opts).map(o=>`<button class="opt" data-o="${esc(o)}">${esc(o)}</button>`).join("")}</div>`}
      <div id="fb"></div>`);
    const fb = card.querySelector("#fb");
    const reveal = ok => {
      if(ok) right++; markMissed(it._id, ok); streak = ok ? streak+1 : 0;
      fb.innerHTML = `<div class="fb ${ok?"right":"wrong"}"><b>${ok?"Correct.":"Not quite."}</b>${streak>=3?` <span class="combo">Combo ×${streak}</span>`:""} ${ok?"":"Answer: <b>"+esc(typed?it.a[0]:it.a)+"</b>"}</div>
        <div class="row" style="margin-top:12px"><button class="btn" id="next">${n+1<items.length?"Next":"See score"}</button></div>`;
      const nx = fb.querySelector("#next"); nx.focus();
      nx.onclick = () => { n++; n<items.length ? draw() : done(Math.round(right/items.length*100)); };
    };
    if(typed){
      const inp = card.querySelector("#ans"); inp.focus();
      card.querySelector("#f").onsubmit = e => { e.preventDefault(); if(!inp.value.trim()) return;
        inp.disabled = true; e.target.querySelector("button").disabled = true;
        const v = norm(inp.value); reveal(it.a.some(a => norm(a) === v)); };
    } else card.querySelectorAll(".opt").forEach(b => b.onclick = () => {
      const ok = b.dataset.o === it.a;
      card.querySelectorAll(".opt").forEach(x => { x.disabled = true; if(x.dataset.o===it.a) x.classList.add("right"); });
      if(!ok) b.classList.add("wrong"); reveal(ok);
    });
  };
  draw();
}

function match(s, set, done, back){
  const left = shuffle(set.pairs.map(p=>p[0])), right = shuffle(set.pairs.map(p=>p[1]));
  const answer = Object.fromEntries(set.pairs);
  let sel = null, matched = 0, mistakes = 0;
  const card = shell(back, s.name, `
    ${modeBar("match", [["match","Match"],["memory","Memory"]])}
    <div class="progress"><span>${esc(set.title)}</span><span id="ct">0 / ${set.pairs.length}</span></div>
    <p class="hint">Tap one on the left, then its partner on the right.</p>
    <div class="match"><div class="col">${left.map(l=>`<button class="tile" data-l="${esc(l)}">${esc(l)}</button>`).join("")}</div>
      <div class="col">${right.map(r=>`<button class="tile" data-r="${esc(r)}">${esc(r)}</button>`).join("")}</div></div>`);
  wireModes(card, s, set);
  card.querySelectorAll("[data-l]").forEach(b => b.onclick = () => { if(b.disabled) return;
    card.querySelectorAll("[data-l]").forEach(x=>x.classList.remove("sel")); b.classList.add("sel"); sel = b; });
  card.querySelectorAll("[data-r]").forEach(b => b.onclick = () => {
    if(!sel || b.disabled) return;
    const id = s.id+"|"+set.title+"|"+sel.dataset.l;
    if(answer[sel.dataset.l] === b.dataset.r){
      markMissed(id,true); sel.classList.replace("sel","ok"); b.classList.add("ok"); sel.disabled = b.disabled = true; sel = null; matched++;
      card.querySelector("#ct").textContent = matched+" / "+set.pairs.length;
      if(matched === set.pairs.length) setTimeout(()=>done(Math.round(set.pairs.length/(set.pairs.length+mistakes)*100)), 400);
    } else { mistakes++; markMissed(id,false); b.classList.add("no"); setTimeout(()=>b.classList.remove("no"), 500); }
  });
}

function mindMap(s, set, done, back){
  const n = set.model.length, labels = set.labels;
  const card = shell(back, s.name, `
    <div class="progress"><span>${labels?"Essay plan":"Mind map"}</span><span>${n} ${labels?"sections":"branches"}</span></div>
    <div class="centre">${esc(set.centre)}</div>
    <p class="hint">${labels?"Write a short note for each section, with a quote where you can.":"Fill each branch with one key point from memory. Short notes are fine."}</p>
    <div class="map">${set.model.map((_,i)=>`<div class="branch"><label for="b${i}">${esc(labels?labels[i]:"Branch "+(i+1))}</label><textarea id="b${i}"></textarea></div>`).join("")}</div>
    <div class="row"><button class="btn" id="cmp">Compare with model answer</button></div><div id="model"></div>`);
  card.querySelector("#cmp").onclick = e => {
    e.target.disabled = true;
    const box = card.querySelector("#model");
    box.innerHTML = `<h3>Model ${labels?"plan":"branches"}: tick the ones you got</h3>
      <div class="list" style="margin-top:10px">${set.model.map((m,i)=>`<label class="check"><input type="checkbox" id="m${i}"><span>${labels?"<b>"+esc(labels[i])+":</b> ":""}${esc(m)}</span></label>`).join("")}</div>
      <div class="row" style="margin-top:12px"><button class="btn" id="fin">Finish</button></div>`;
    box.querySelector("#fin").onclick = () => done(Math.round(box.querySelectorAll("input:checked").length/n*100));
  };
}

function orderUp(s, set, done, back){
  const pool = shuffle(set.steps); let built = [], checked = false;
  const draw = () => {
    const card = shell(back, s.name, `
      <div class="progress"><span>${esc(set.title)}</span><span>${built.length} / ${set.steps.length}</span></div>
      <p class="hint">Tap them in the right order. Tap one in your list to send it back.</p>
      <div class="list">${built.map((b,i)=>`<button class="tile${checked?(set.steps[i]===b?" ok":" no"):""}" data-b="${i}"><b>${i+1}.</b> ${esc(b)}</button>`).join("") || '<p class="note">Your order appears here.</p>'}</div>
      ${checked?`<div class="list"><p class="note">Correct order:</p>${set.steps.map((x,i)=>`<p>${i+1}. ${esc(x)}</p>`).join("")}</div>`
        :`<div class="opts">${pool.filter(p=>!built.includes(p)).map(p=>`<button class="opt" data-p="${esc(p)}">${esc(p)}</button>`).join("")}</div>`}
      <div class="row">${checked?`<button class="btn" id="fin">See score</button>`:`<button class="btn" id="chk" ${built.length<set.steps.length?"disabled":""}>Check order</button>`}</div>`);
    card.querySelectorAll("[data-p]").forEach(b => b.onclick = () => { built.push(b.dataset.p); draw(); });
    if(!checked) card.querySelectorAll("[data-b]").forEach(b => b.onclick = () => { built.splice(+b.dataset.b,1); draw(); });
    const c = card.querySelector("#chk"); if(c) c.onclick = () => { checked = true; draw(); };
    const f = card.querySelector("#fin"); if(f) f.onclick = () => done(Math.round(built.filter((b,i)=>set.steps[i]===b).length/set.steps.length*100));
  };
  draw();
}

function buildQuote(s, set, done, back){
  const quotes = shuffle(set.quotes); let n = 0, right = 0;
  const draw = () => {
    const words = quotes[n].split(" "); const pool = shuffle(words.map((w,i)=>({w,i}))); let built = [], checked = false;
    const card = shell(back, s.name, `
      <div class="progress"><span>${esc(set.title)}</span><span>${n+1} / ${quotes.length}</span></div>
      <p class="hint">Tap the words in order to rebuild the quote.</p>
      <div class="built" id="built"></div><div class="words" id="pool"></div><div id="fb"></div>`);
    const paint = () => {
      card.querySelector("#built").innerHTML = built.map((b,k)=>`<button class="word" data-k="${k}">${esc(b.w)}</button>`).join("") || '<span class="note">Your quote builds here</span>';
      card.querySelector("#pool").innerHTML = pool.filter(p=>!built.includes(p)).map(p=>`<button class="word" data-i="${p.i}">${esc(p.w)}</button>`).join("");
      if(checked) return;
      card.querySelectorAll("#pool .word").forEach(b => b.onclick = () => { built.push(pool.find(p=>p.i===+b.dataset.i)); paint(); check(); });
      card.querySelectorAll("#built .word").forEach(b => b.onclick = () => { built.splice(+b.dataset.k,1); paint(); });
    };
    const check = () => { if(built.length < words.length) return; checked = true;
      const ok = built.map(b=>b.w).join(" ") === quotes[n]; if(ok) right++;
      card.querySelector("#fb").innerHTML = `<div class="fb ${ok?"right":"wrong"}"><b>${ok?"Correct.":"Not quite."}</b> ${ok?"":esc(quotes[n])}</div>
        <div class="row" style="margin-top:12px"><button class="btn" id="next">${n+1<quotes.length?"Next":"See score"}</button></div>`;
      card.querySelector("#next").onclick = () => { n++; n<quotes.length ? draw() : done(Math.round(right/quotes.length*100)); }; };
    paint();
  };
  draw();
}

function sortIt(s, set, done, back){
  const cards = shuffle(Object.entries(set.bins).flatMap(([bin,items]) => items.map(x=>({x,bin})))); const bins = Object.keys(set.bins);
  let n = 0, right = 0;
  const draw = () => {
    const c = cards[n];
    const card = shell(back, s.name, `
      <div class="progress"><span>${esc(set.title)}</span><span>${n+1} / ${cards.length}</span></div>
      <div class="sortcard">${esc(c.x)}</div>
      <div class="bins">${bins.map(b=>`<button class="opt" data-b="${esc(b)}">${esc(b)}</button>`).join("")}</div><div id="fb"></div>`);
    card.querySelectorAll("[data-b]").forEach(b => b.onclick = () => {
      const ok = b.dataset.b === c.bin; if(ok) right++;
      card.querySelectorAll("[data-b]").forEach(x => { x.disabled = true; if(x.dataset.b===c.bin) x.classList.add("right"); });
      if(!ok) b.classList.add("wrong");
      setTimeout(() => { n++; n<cards.length ? draw() : done(Math.round(right/cards.length*100)); }, ok?450:1100);
    });
  };
  draw();
}

function labelIt(s, set, done, back){
  const opts = shuffle(set.labels);
  const card = shell(back, s.name, `
    ${modeBar("label", [["label","Label it"],["tap","Tap it"]])}
    <div class="progress"><span>${esc(set.title)}</span><span>${set.labels.length} labels</span></div>
    ${DIAGRAMS[set.diagram]}${set.caption?`<p class="hint">${esc(set.caption)}</p>`:""}
    <div class="list">${set.labels.map((_,i)=>`<div class="lrow"><b>${i+1}</b><select id="l${i}" aria-label="Label ${i+1}"><option value="">Choose…</option>${opts.map(o=>`<option>${esc(o)}</option>`).join("")}</select></div>`).join("")}</div>
    <div class="row"><button class="btn" id="chk">Check labels</button></div><div id="fb"></div>`);
  wireModes(card, s, set);
  card.querySelector("#chk").onclick = e => {
    let right = 0;
    set.labels.forEach((l,i) => { const sel = card.querySelector("#l"+i); const ok = sel.value === l; if(ok) right++;
      sel.classList.add(ok?"ok":"no"); sel.disabled = true; if(!ok) sel.insertAdjacentHTML("afterend", `<span class="note">Answer: ${esc(l)}</span>`); });
    e.target.remove();
    card.querySelector("#fb").innerHTML = `<div class="row"><button class="btn" id="fin">See score</button></div>`;
    card.querySelector("#fin").onclick = () => done(Math.round(right/set.labels.length*100));
  };
}


function examQ(s, set, done, back){
  let n = 0, got = 0, total = 0;
  const draw = () => {
    const it = set.items[n];
    const card = shell(back, s.name, `
      <div class="progress"><span>${esc(set.title)}</span><span>${n+1} / ${set.items.length} · ${it.marks} marks</span></div>
      <p class="qtext">${esc(it.q)}</p>
      <p class="hint">Write your answer here or on paper. Then mark it honestly against the checklist.</p>
      <textarea id="ans" style="min-height:180px"></textarea>
      <div class="row"><button class="btn" id="mk">Mark my answer</button></div><div id="ms"></div>`);
    card.querySelector("#mk").onclick = e => { e.target.disabled = true;
      const box = card.querySelector("#ms");
      box.innerHTML = `<h3>Tick what your answer includes</h3><div class="list" style="margin-top:10px">${it.points.map((p,i)=>`<label class="check"><input type="checkbox" id="p${i}"><span>${esc(p)}</span></label>`).join("")}</div>
        <div class="row" style="margin-top:12px"><button class="btn" id="nx">${n+1<set.items.length?"Next question":"See score"}</button></div>`;
      box.querySelector("#nx").onclick = () => { got += box.querySelectorAll("input:checked").length; total += it.points.length; n++;
        n<set.items.length ? (draw(), top0()) : done(Math.round(got/total*100)); };
    };
  };
  draw();
}

let timer = null;
function blitz(sid){
  clearInterval(timer);
  const pool = shuffle(quizPool(sid)), label = sid ? subjOf(sid).name : "All subjects", back = () => { clearInterval(timer); sid ? subject(sid) : home(); };
  let n = 0, score = 0, left = 60;
  const draw = () => {
    const it = pool[n % pool.length];
    const card = shell(back, label, `
      <div class="progress"><span>60-second blitz</span><span>Score ${score}</span></div>
      <div class="timer" id="t">${left}s</div>
      ${it.code?`<pre class="code">${esc(it.code)}</pre>`:""}<p class="qtext">${esc(it.q)}</p>
      <div class="opts">${shuffle(it.opts).map(o=>`<button class="opt" data-o="${esc(o)}">${esc(o)}</button>`).join("")}</div>`);
    card.querySelectorAll(".opt").forEach(b => b.onclick = () => {
      const ok = b.dataset.o === it.a; markMissed(it._id, ok); if(ok) score++;
      b.classList.add(ok?"right":"wrong"); card.querySelectorAll(".opt").forEach(x=>x.disabled=true);
      setTimeout(() => { if(left>0){ n++; draw(); } }, ok?200:700);
    });
  };
  draw();
  timer = setInterval(() => { left--; const t = document.getElementById("t"); if(t) t.textContent = left+"s";
    if(left<=0){ clearInterval(timer); const k = "blitz:"+(sid||"all"), best = store.get(k,0); if(score>best) store.set(k,score); logEvent(sid||"all","60-second blitz",score,"blitz"); logDay(); addXP(score*2 + (score>best?20:0));
      const card = shell(back, label, `<div class="eyebrow">${score>best?"New record":"Time’s up"}</div><div class="big">${score}</div>
        <p>correct answers in 60 seconds. ${score>best?"Beat your old record of "+best+".":"Record: "+best+"."}</p>
        <div class="row"><button class="btn" id="again">Go again</button><button class="btn ghost" id="bk">Back</button></div>`);
      card.querySelector("#again").onclick = () => blitz(sid); card.querySelector("#bk").onclick = back; } }, 1000);
}

function logEvent(s, t, sc, kind){ STATE.log.push({d:Date.now(), s, t, sc, k:kind||"act"}); if(STATE.log.length > 400) STATE.log = STATE.log.slice(-400); }
function finish(s, set, score, mode){
  const k = key(s,set), prev = progress[k]; logEvent(s.id, set.title, score);
  addXP(score/4 + (prev && score > prev.best ? 10 : 0));
  progress[k] = { best: Math.max(score, prev ? prev.best : 0), last: score, date: new Date().toISOString().slice(0,10) };
  store.set("progress", progress); logDay();
  results(score, prev && score > prev.best, () => run(s,set,mode), () => subject(s.id), s.name);
}
function logDay(){ const d = new Date().toISOString().slice(0,10), days = store.get("days", []); if(!days.includes(d)){ days.push(d); store.set("days", days); } }
function results(score, newBest, retry, back, label){
  const msg = score>=90 ? "Clean landing. Move on to the next one." : score>=70 ? "Solid run. One more go will lock it in." : "Worth another go now while it’s fresh. It’s on your home screen until you beat 70%.";
  const card = shell(back, label, `<div class="eyebrow">${newBest?"New best · +10 bonus XP":"Score"}</div><div class="big">${score}%</div><p>${msg}</p>
    <div class="row"><button class="btn" id="again">Try again</button><button class="btn ghost" id="bk">Back to ${esc(label)}</button></div>`);
  card.querySelector("#again").onclick = retry; card.querySelector("#bk").onclick = back; top0();
}
function quickMix(){
  const items = shuffle(allItems()).slice(0,10).map(it => ({...it, hint:(it.hint?it.hint+" · ":"")+subjOf(it._sid).name}));
  questions("All subjects", "Quick 10", items, score => { logEvent("all","Quick 10",score); logDay(); addXP(score/4); results(score, false, quickMix, home, "home"); }, home);
}
function weakRound(){
  const items = shuffle(weakItems()).sort((a,b)=>missed[b._id]-missed[a._id]).slice(0,10).map(it => ({...it, hint:(it.hint?it.hint+" · ":"")+subjOf(it._sid).name}));
  questions("All subjects", "Weak spots", items, score => { logEvent("all","Weak spots",score); logDay(); addXP(score/3); results(score, false, weakItems().length?weakRound:home, home, "home"); }, home);
}


/* ---------- extra question types and arcade games ---------- */
const modeBar = (cur, modes, s, set) => `<div class="modes">${modes.map(([m,l])=>`<button class="mode${m===cur?" on":""}" data-mode="${m}">${l}</button>`).join("")}</div>`;
function wireModes(card, s, set){ card.querySelectorAll("[data-mode]").forEach(b => b.onclick = () => run(s, set, b.dataset.mode)); }
const fmtNum = (v, unit) => { const t = Math.abs(v) >= 1000 ? Number(v).toLocaleString("en-GB") : String(+(+v).toFixed(2)); return unit ? `${t} ${unit}` : t; };

/* Slide to estimate */
function sliderQ(s, set, done, back){
  const items = shuffle(set.items); let n = 0, right = 0;
  const draw = () => {
    const it = items[n], mid = +(((it.min+it.max)/2/it.step).toFixed(0)*it.step).toFixed(4);
    const card = shell(back, s.name, `
      <div class="progress"><span>${esc(set.title)}</span><span>${n+1} / ${items.length}</span></div>
      <p class="qtext">${esc(it.q)}</p>
      <div class="sval" id="sv">${fmtNum(mid, it.unit)}</div>
      <input type="range" id="sl" min="${it.min}" max="${it.max}" step="${it.step}" value="${mid}" aria-label="Your estimate">
      <div class="row" style="justify-content:space-between"><span class="note">${fmtNum(it.min, it.unit)}</span><span class="note">${fmtNum(it.max, it.unit)}</span></div>
      <div class="row"><button class="btn ghost small" id="dn">−</button><button class="btn ghost small" id="up">+</button><button class="btn" id="lock">Lock it in</button></div><div id="fb"></div>`);
    const sl = card.querySelector("#sl"), sv = card.querySelector("#sv");
    const show = () => sv.textContent = fmtNum(sl.value, it.unit);
    sl.oninput = show;
    card.querySelector("#dn").onclick = () => { sl.value = Math.max(it.min, +sl.value - it.step); show(); };
    card.querySelector("#up").onclick = () => { sl.value = Math.min(it.max, +sl.value + +it.step); show(); };
    card.querySelector("#lock").onclick = e => {
      const v = +sl.value, ok = Math.abs(v - it.a) <= (it.tol || 0) + 1e-9; if(ok) right++; markMissed(it._id, ok);
      sl.disabled = true; card.querySelectorAll(".btn.small").forEach(b=>b.disabled=true); e.target.remove();
      card.querySelector("#fb").innerHTML = `<div class="fb ${ok?"right":"wrong"}"><b>${ok?(v===it.a?"Bang on.":"Close enough."):"Not quite."}</b> The answer is <b>${esc(fmtNum(it.a, it.unit))}</b>.${it.tol&&!ok?` You needed to be within ${esc(fmtNum(it.tol, it.unit))}.`:""}</div>
        <div class="row" style="margin-top:12px"><button class="btn" id="next">${n+1<items.length?"Next":"See score"}</button></div>`;
      card.querySelector("#next").onclick = () => { n++; n<items.length ? draw() : done(Math.round(right/items.length*100)); };
    };
  };
  draw();
}

/* Tap the word (or the line) */
function tapQ(s, set, done, back){
  const items = shuffle(set.items); let n = 0, right = 0;
  const draw = () => {
    const it = items[n], lines = !!it.lines, toks = lines ? it.lines : it.text.split(/\s+/);
    const card = shell(back, s.name, `
      <div class="progress"><span>${esc(set.title)}</span><span>${n+1} / ${items.length}</span></div>
      <p class="qtext">${esc(it.q)}</p>
      <div class="${lines?"lines":"toks"}">${toks.map((t,i)=>`<button class="tok" data-i="${i}">${esc(t)}</button>`).join("")}</div><div id="fb"></div>`);
    const good = t => it.a.some(a => norm(a) === norm(t));
    card.querySelectorAll(".tok").forEach(b => b.onclick = () => {
      const ok = good(toks[+b.dataset.i]); if(ok) right++; markMissed(it._id, ok);
      card.querySelectorAll(".tok").forEach(x => { x.disabled = true; if(good(toks[+x.dataset.i])) x.classList.add("right"); });
      if(!ok) b.classList.add("wrong");
      card.querySelector("#fb").innerHTML = `<div class="fb ${ok?"right":"wrong"}"><b>${ok?"Spot on.":"Not that one."}</b> ${it.why?esc(it.why):""}</div>
        <div class="row" style="margin-top:12px"><button class="btn" id="next">${n+1<items.length?"Next":"See score"}</button></div>`;
      card.querySelector("#next").onclick = () => { n++; n<items.length ? draw() : done(Math.round(right/items.length*100)); };
    });
  };
  draw();
}

/* Memory flip, played on any matching set */
function memory(s, set, done, back){
  const pairs = shuffle(set.pairs).slice(0, 6);
  const cards = shuffle(pairs.flatMap(([l,r],i) => [{t:l,p:i},{t:r,p:i}]));
  let open = [], found = 0, tries = 0, lock = false;
  const card = shell(back, s.name, `
    ${modeBar("memory", [["match","Match"],["memory","Memory"]])}
    <div class="progress"><span>${esc(set.title)}</span><span id="ct">0 / ${pairs.length} pairs · 0 goes</span></div>
    <p class="hint">Flip two cards. Find each term and its partner.</p>
    <div class="mem">${cards.map((c,i)=>`<button class="mcard down" data-i="${i}" aria-label="Card ${i+1}">${esc(c.t)}</button>`).join("")}</div>`);
  wireModes(card, s, set);
  card.querySelectorAll(".mcard").forEach(b => b.onclick = () => {
    if(lock || !b.classList.contains("down")) return;
    b.classList.replace("down","up"); open.push(b);
    if(open.length < 2) return;
    tries++; const [a, c] = open, ca = cards[+a.dataset.i], cc = cards[+c.dataset.i];
    if(ca.p === cc.p){ a.classList.replace("up","ok"); c.classList.replace("up","ok"); a.disabled = c.disabled = true; found++; open = [];
      markMissed(s.id+"|"+set.title+"|"+pairs[ca.p][0], true);
      if(found === pairs.length) setTimeout(() => done(Math.min(100, Math.round(pairs.length / tries * 100))), 500);
    } else { lock = true; setTimeout(() => { a.classList.replace("up","down"); c.classList.replace("up","down"); open = []; lock = false; }, 900); }
    card.querySelector("#ct").textContent = `${found} / ${pairs.length} pairs · ${tries} goes`;
  });
}

/* Tap the part of the diagram */
function tapDiagram(s, set, done, back){
  const order = shuffle(set.labels.map((l,i)=>({l,i}))); let n = 0, right = 0;
  const card = shell(back, s.name, `
    ${modeBar("tap", [["label","Label it"],["tap","Tap it"]])}
    <div class="progress"><span>${esc(set.title)}</span><span id="ct">1 / ${order.length}</span></div>
    <p class="qtext">Tap: <b id="target"></b></p>
    ${DIAGRAMS[set.diagram]}<div id="fb"></div>`);
  wireModes(card, s, set);
  const marks = [...card.querySelectorAll(".diagram .mk")];
  const show = () => { card.querySelector("#target").textContent = order[n].l; card.querySelector("#ct").textContent = `${n+1} / ${order.length}`; marks.forEach(m => m.classList.remove("hit","miss")); };
  marks.forEach(m => m.addEventListener("click", () => {
    if(n >= order.length || card.dataset.wait) return;
    const ok = +m.dataset.n === order[n].i + 1; if(ok) right++;
    m.classList.add(ok?"hit":"miss"); if(!ok) marks[order[n].i].classList.add("hit");
    card.dataset.wait = "1";
    setTimeout(() => { delete card.dataset.wait; n++; n < order.length ? show() : done(Math.round(right/order.length*100)); }, ok?500:1300);
  }));
  show();
}

/* --- pools for the arcade --- */
function tfPool(sid){
  const out = [];
  SUBJECTS.filter(s=>!sid||s.id===sid).forEach(s => s.sets.forEach(set => {
    if(set.type==="match" && set.pairs.length >= 3) set.pairs.forEach(([l,r]) => {
      const others = set.pairs.filter(p=>p[1]!==r), truth = !others.length || Math.random() < .5;
      out.push({top:l, claim: truth ? r : others[Math.floor(Math.random()*others.length)][1], truth, answer:r, hint:set.title, _id:s.id+"|"+set.title+"|"+l, sid:s.id});
    });
    if(set.type==="quiz" && !set.code) set.items.forEach(it => {
      const wrong = it.opts.filter(o=>o!==it.a), truth = !wrong.length || Math.random() < .5;
      out.push({top:it.q, claim: truth ? it.a : wrong[Math.floor(Math.random()*wrong.length)], truth, answer:it.a, hint:set.title, _id:it._id, sid:s.id});
    });
  }));
  return out;
}
function oddPool(sid){
  const out = [];
  SUBJECTS.filter(s=>!sid||s.id===sid).forEach(s => s.sets.filter(x=>x.type==="sort").forEach(set => {
    const bins = Object.entries(set.bins);
    bins.forEach(([bin, items]) => { if(items.length < 3) return;
      bins.filter(([b])=>b!==bin).forEach(([ob, oitems]) => oitems.forEach(odd => out.push({bin, ob, odd, set:set.title, sid:s.id, pick:items}))); });
  }));
  return out;
}
const scramblePool = sid => SUBJECTS.filter(s=>!sid||s.id===sid).flatMap(s => s.sets.filter(x=>x.type==="blanks").flatMap(x=>x.items))
  .filter(it => /^[A-Za-zÀ-ÿ'’-]{4,12}$/.test(it.a[0]) && !/^\d/.test(it.a[0]));

/* Swipe true or false */
function trueFalse(sid){
  const back = () => sid ? subject(sid) : home(), label = sid ? subjOf(sid).name : "All subjects";
  const items = shuffle(tfPool(sid)).slice(0, 15); let n = 0, right = 0, streak = 0;
  if(!items.length) return back();
  const draw = () => {
    const it = items[n];
    const card = shell(back, label, `
      <div class="progress"><span>Swipe true or false</span><span>${n+1} / ${items.length}</span></div>
      <p class="hint">Swipe right for true, left for false. Or tap the buttons.</p>
      <div class="swipe" id="sw"><span class="note">${esc(it.hint)}${sid?"":" · "+esc(subjOf(it.sid).name)}</span><span class="qtext">${esc(it.top)}</span><span class="claim">→ ${esc(it.claim)}</span></div>
      <div class="tfbtns"><button class="btn no" id="f">False</button><button class="btn yes" id="t">True</button></div><div id="fb"></div>`);
    const sw = card.querySelector("#sw"); let x0 = null, dx = 0, gone = false;
    const answer = says => { if(gone) return; gone = true;
      const ok = says === it.truth; if(ok){ right++; streak++; } else streak = 0; markMissed(it._id, ok);
      sw.style.transform = `translateX(${says?120:-120}%) rotate(${says?12:-12}deg)`; sw.style.opacity = ".15";
      card.querySelectorAll(".tfbtns .btn").forEach(b=>b.disabled=true);
      card.querySelector("#fb").innerHTML = `<div class="fb ${ok?"right":"wrong"}"><b>${ok?"Correct.":"Not quite."}</b>${streak>=3?` <span class="combo">Combo ×${streak}</span>`:""} ${it.truth?"It’s true.":"False: it’s <b>"+esc(it.answer)+"</b>."}</div>`;
      setTimeout(() => { n++; n<items.length ? draw() : (logEvent(sid||"all","Swipe true or false",Math.round(right/items.length*100),"game"), logDay(), addXP(right*2), results(Math.round(right/items.length*100), false, () => trueFalse(sid), back, label)); }, ok?650:1500);
    };
    card.querySelector("#t").onclick = () => answer(true);
    card.querySelector("#f").onclick = () => answer(false);
    sw.addEventListener("pointerdown", e => { x0 = e.clientX; sw.classList.add("dragging"); sw.setPointerCapture(e.pointerId); });
    sw.addEventListener("pointermove", e => { if(x0===null) return; dx = e.clientX - x0; sw.style.transform = `translateX(${dx}px) rotate(${dx/20}deg)`; sw.classList.toggle("t", dx>40); sw.classList.toggle("f", dx<-40); });
    const end = () => { if(x0===null) return; sw.classList.remove("dragging","t","f"); x0 = null;
      if(Math.abs(dx) > 90) answer(dx > 0); else sw.style.transform = ""; dx = 0; };
    sw.addEventListener("pointerup", end); sw.addEventListener("pointercancel", end);
    document.onkeydown = e => { if(!document.getElementById("sw")) { document.onkeydown = null; return; } if(e.key==="ArrowRight") answer(true); if(e.key==="ArrowLeft") answer(false); };
  };
  draw();
}

/* Odd one out */
function oddOneOut(sid){
  const back = () => sid ? subject(sid) : home(), label = sid ? subjOf(sid).name : "All subjects";
  const rounds = shuffle(oddPool(sid)).slice(0, 8); let n = 0, right = 0;
  if(!rounds.length) return back();
  const draw = () => {
    const r = rounds[n], opts = shuffle([...shuffle(r.pick).slice(0,3), r.odd]);
    const card = shell(back, label, `
      <div class="progress"><span>Odd one out</span><span>${n+1} / ${rounds.length}</span></div>
      <p class="qtext">Which one doesn’t belong?</p><p class="hint">${esc(r.set)}</p>
      <div class="opts">${opts.map(o=>`<button class="opt" data-o="${esc(o)}">${esc(o)}</button>`).join("")}</div><div id="fb"></div>`);
    card.querySelectorAll(".opt").forEach(b => b.onclick = () => {
      const ok = b.dataset.o === r.odd; if(ok) right++;
      card.querySelectorAll(".opt").forEach(x => { x.disabled = true; if(x.dataset.o===r.odd) x.classList.add("right"); });
      if(!ok) b.classList.add("wrong");
      card.querySelector("#fb").innerHTML = `<div class="fb ${ok?"right":"wrong"}"><b>${ok?"Correct.":"Not quite."}</b> The others are all <b>${esc(r.bin)}</b>. ${esc(r.odd)} is <b>${esc(r.ob)}</b>.</div>
        <div class="row" style="margin-top:12px"><button class="btn" id="next">${n+1<rounds.length?"Next":"See score"}</button></div>`;
      card.querySelector("#next").onclick = () => { n++; if(n<rounds.length) return draw();
        const sc = Math.round(right/rounds.length*100); logEvent(sid||"all","Odd one out",sc,"game"); logDay(); addXP(sc/4); results(sc, false, () => oddOneOut(sid), back, label); };
    });
  };
  draw();
}

/* Unscramble the key word */
function unscramble(sid){
  const back = () => sid ? subject(sid) : home(), label = sid ? subjOf(sid).name : "All subjects";
  const items = shuffle(scramblePool(sid)).slice(0, 8); let n = 0, right = 0;
  if(!items.length) return back();
  const draw = () => {
    const it = items[n], word = it.a[0];
    let letters = word.split("").map((c,i)=>({c,i})); for(let k=0;k<5 && letters.map(l=>l.c).join("")===word;k++) letters = shuffle(letters);
    let built = [], over = false;
    const card = shell(back, label, `
      <div class="progress"><span>Unscramble</span><span>${n+1} / ${items.length}</span></div>
      <p class="qtext">${esc(it.text).replace("___",'<u>&nbsp;?&nbsp;&nbsp;&nbsp;</u>')}</p>${it.hint?`<p class="hint">${esc(it.hint)}${sid?"":" · "+esc(subjOf(it._sid).name)}</p>`:""}
      <div class="letters slots" id="slots"></div><div class="letters" id="pool"></div>
      <div class="row"><button class="btn ghost small" id="clr">Clear</button><button class="btn ghost small" id="skip">Show me</button></div><div id="fb"></div>`);
    const finish = ok => { over = true; if(ok) right++; markMissed(it._id, ok);
      card.querySelector("#fb").innerHTML = `<div class="fb ${ok?"right":"wrong"}"><b>${ok?"Nailed it.":"Not quite."}</b> ${ok?"":"It’s <b>"+esc(word)+"</b>."}</div>
        <div class="row" style="margin-top:12px"><button class="btn" id="next">${n+1<items.length?"Next":"See score"}</button></div>`;
      card.querySelector("#next").onclick = () => { n++; if(n<items.length) return draw();
        const sc = Math.round(right/items.length*100); logEvent(sid||"all","Unscramble",sc,"game"); logDay(); addXP(sc/4); results(sc, false, () => unscramble(sid), back, label); }; };
    const paint = () => {
      card.querySelector("#slots").innerHTML = letters.map((_,k)=> built[k] ? `<button class="letter" data-k="${k}">${esc(built[k].c)}</button>` : `<span class="letter empty"></span>`).join("");
      card.querySelector("#pool").innerHTML = letters.filter(l=>!built.includes(l)).map(l=>`<button class="letter" data-i="${l.i}">${esc(l.c)}</button>`).join("");
      if(over) return;
      card.querySelectorAll("#pool .letter").forEach(b => b.onclick = () => { built.push(letters.find(l=>l.i===+b.dataset.i)); paint();
        if(built.length === letters.length){ const g = built.map(l=>l.c).join(""); finish(it.a.some(a => norm(a) === norm(g))); } });
      card.querySelectorAll("#slots .letter[data-k]").forEach(b => b.onclick = () => { built.splice(+b.dataset.k, 1); paint(); });
    };
    card.querySelector("#clr").onclick = () => { if(!over){ built = []; paint(); } };
    card.querySelector("#skip").onclick = () => { if(over) return; const rest = letters.slice();
      built = word.split("").map(c => rest.splice(rest.findIndex(l=>l.c===c),1)[0]); finish(false); paint(); };
    paint();
  };
  draw();
}

/* Boss battle: three lives, waves get faster */
function boss(sid){
  const back = () => { clearTimeout(bossTimer); sid ? subject(sid) : home(); }, label = sid ? subjOf(sid).name : "All subjects";
  const pool = shuffle(quizPool(sid)); let n = 0, score = 0, lives = 3;
  if(!pool.length) return back();
  const wave = () => 1 + Math.floor(score/5), limit = () => Math.max(6, 16 - (wave()-1)*2);
  const end = () => { clearTimeout(bossTimer); const k = "boss:"+(sid||"all"), best = store.get(k,0); if(score>best) store.set(k,score);
    logEvent(sid||"all","Boss battle",score,"boss"); logDay(); addXP(score*3 + (score>best?25:0));
    const card = shell(back, label, `<div class="eyebrow">${score>best?"New record":"Defeated"}</div><div class="big">${score}</div>
      <p>questions survived, reaching wave ${wave()}. ${score>best?"Beat your old record of "+best+".":"Record: "+best+"."}</p>
      <div class="row"><button class="btn" id="again">Fight again</button><button class="btn ghost" id="bk">Back</button></div>`);
    card.querySelector("#again").onclick = () => boss(sid); card.querySelector("#bk").onclick = back; };
  const draw = () => {
    const it = pool[n % pool.length]; let left = limit(), over = false;
    const card = shell(back, label, `
      <div class="progress"><span>Boss battle · wave ${wave()}</span><span>Score ${score}</span></div>
      <div class="row" style="justify-content:space-between"><span class="hearts" aria-label="${lives} lives">${"♥".repeat(lives)}<span style="opacity:.25">${"♥".repeat(3-lives)}</span></span><span class="timer" id="t">${left}s</span></div>
      ${it.code?`<pre class="code">${esc(it.code)}</pre>`:""}<p class="qtext">${esc(it.q)}</p>
      <div class="opts">${shuffle(it.opts).map(o=>`<button class="opt" data-o="${esc(o)}">${esc(o)}</button>`).join("")}</div>`);
    const resolve = (ok, b) => { if(over) return; over = true; clearTimeout(bossTimer); markMissed(it._id, ok);
      card.querySelectorAll(".opt").forEach(x => { x.disabled = true; if(x.dataset.o===it.a) x.classList.add("right"); });
      if(b && !ok) b.classList.add("wrong");
      if(ok) score++; else lives--;
      setTimeout(() => { if(lives <= 0) return end(); n++; draw(); }, ok?350:1200); };
    card.querySelectorAll(".opt").forEach(b => b.onclick = () => resolve(b.dataset.o === it.a, b));
    const tick = () => { left--; const t = document.getElementById("t"); if(!t) return; t.textContent = left+"s"; if(left <= 0) resolve(false); else bossTimer = setTimeout(tick, 1000); };
    bossTimer = setTimeout(tick, 1000);
  };
  draw();
}
let bossTimer = null;

function arcade(sid){
  const games = [
    ["boss","Boss battle","3 lives. How many waves can you survive?", true],
    ["blitz","60-second blitz","Beat the clock", true],
    ["tf","Swipe true or false","Fast swipes, instant answers", tfPool(sid).length > 0],
    ["odd","Odd one out","Spot what doesn’t belong", oddPool(sid).length > 0],
    ["scr","Unscramble","Rebuild the key word", scramblePool(sid).length > 0]
  ].filter(g => g[3]);
  const rec = k => store.get(k+":"+(sid||"all"), 0);
  return `<div class="arcade">${games.map(([id,t,sub]) => `<button class="game" data-g="${id}"><b>${t}</b><span>${sub}${id==="boss"&&rec("boss")?` · record ${rec("boss")}`:""}${id==="blitz"&&rec("blitz")?` · record ${rec("blitz")}`:""}</span></button>`).join("")}</div>`;
}
function wireArcade(sid){
  app.querySelectorAll("[data-g]").forEach(b => b.onclick = () => ({boss, blitz, tf:trueFalse, odd:oddOneOut, scr:unscramble})[b.dataset.g](sid));
}

/* ---------- accounts, top bar and start-up ---------- */
function topBar(){
  if(!CLOUD) return `<div class="topbar"><span class="note">Not connected yet: progress saves on this device only.</span></div>`;
  return `<div class="topbar"><span class="note">${esc(ME.name||ME.email)} · <span id="sync">${practice()?"Practice mode":"Synced"}</span></span>
    <span class="row">${ME.parent?'<button class="btn ghost small" id="dash">Parent dashboard</button>':""}<button class="back" id="out">Sign out</button></span></div>`;
}
function wireTopBar(){
  const d = app.querySelector("#dash"); if(d) d.onclick = dashboard;
  const o = app.querySelector("#out"); if(o) o.onclick = async () => { await flush(); CLOUD.signOut(); };
}
function signInScreen(msg){
  app.innerHTML = `
    <div class="eyebrow">GCSE 2027 · Urmston Grammar</div>
    <h1>Peter's <em>Revision</em> Hub</h1>
    <p class="muted">Sign in with your Google account. Your XP, scores and weak spots sync to every device you use.</p>
    <div class="row"><button class="btn" id="go">Sign in with Google</button></div>
    ${msg?`<p class="fb wrong">${esc(msg)}</p>`:""}`;
  app.querySelector("#go").onclick = async () => { try{ await CLOUD.signIn(); }catch(e){ signInScreen("Sign-in didn’t finish: "+(e.code||e.message)+". Try again."); } };
}

/* ---------- question packs added from the dashboard ---------- */
const PACK_TYPES = ["quiz","blanks","match","order","map","build","sort","label","exam","slider","tap"];
function checkSet(c){
  if(!c || typeof c !== "object") return "not an object";
  if(!subjOf(c.subject)) return `unknown subject “${c.subject}” (use ${SUBJECTS.map(s=>s.id).join(", ")})`;
  if(!c.title || !c.topic) return "needs a title and a topic";
  if(!PACK_TYPES.includes(c.type)) return `unknown type “${c.type}”`;
  const need = {slider:"items", tap:"items", quiz:"items", blanks:"items", exam:"items", match:"pairs", order:"steps", map:"model", build:"quotes", sort:"bins", label:"labels"}[c.type];
  if(!c[need]) return `a ${c.type} set needs “${need}”`;
  if(c.type==="quiz" && c.items.some(i => !i.q || !i.a || !Array.isArray(i.opts) || !i.opts.includes(i.a))) return "each quiz item needs q, a and opts (including a)";
  if(c.type==="blanks" && c.items.some(i => !i.text || !Array.isArray(i.a))) return "each blanks item needs text and an a list";
  if(c.type==="label" && !DIAGRAMS[c.diagram]) return "unknown diagram";
  if(c.type==="slider" && c.items.some(i => !i.q || [i.a,i.min,i.max,i.step].some(v => typeof v !== "number") || i.a < i.min || i.a > i.max)) return "each slider item needs q and numbers a, min, max and step, with a between min and max";
  if(c.type==="tap" && c.items.some(i => !i.q || !(i.text || Array.isArray(i.lines)) || !Array.isArray(i.a))) return "each tap item needs q, text (or lines) and an a list";
  return "";
}
function mergeContent(list){
  (list||[]).forEach(raw => {
    if(checkSet(raw)) return;
    const c = JSON.parse(JSON.stringify(raw)), s = subjOf(c.subject); delete c.subject; c.custom = true;
    const i = s.sets.findIndex(x => x.title === c.title); i >= 0 ? s.sets[i] = c : s.sets.push(c);
  });
  reindex();
}
const slug = t => t.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,120) || "set";

/* ---------- parent dashboard ---------- */
const band = p => p == null ? "" : p >= 80 ? "good" : p >= 60 ? "ok" : "bad";
const pct = (a,b) => b ? Math.round(a/b*100) : null;
function analyse(p){
  let st = {}; try{ st = JSON.parse(p.state||"{}"); }catch(e){}
  const kv = st.kv||{}, prog = kv.progress||{}, miss = kv.missed||{}, acc = st.acc||{}, log = st.log||[];
  const now = Date.now(), DAY = 864e5;
  const daysSet = new Set(kv.days||[]);
  const last14 = [...Array(14)].map((_,i)=>new Date(now-i*DAY).toISOString().slice(0,10)).filter(d=>daysSet.has(d)).length;
  const subjects = SUBJECTS.map(s => {
    const done = s.sets.filter(set => prog[key(s,set)]);
    const avg = done.length ? Math.round(done.reduce((t,set)=>t+prog[key(s,set)].best,0)/done.length) : null;
    const a = acc[s.id]||{r:0,w:0};
    return {s, done:done.length, total:s.sets.length, avg, accuracy:pct(a.r, a.r+a.w), answers:a.r+a.w};
  });
  const topics = {};
  SUBJECTS.forEach(s => s.sets.forEach(set => { const r = prog[key(s,set)]; if(!r) return;
    const t = topics[s.id+"|"+set.topic] = topics[s.id+"|"+set.topic] || {s, topic:set.topic, sum:0, n:0}; t.sum += r.best; t.n++; }));
  const weakTopics = Object.values(topics).map(t=>({...t, avg:Math.round(t.sum/t.n)})).filter(t=>t.avg<75).sort((a,b)=>a.avg-b.avg).slice(0,8);
  const lookup = Object.fromEntries(allTagged().map(it => [it._id, it]));
  const worst = Object.entries(miss).sort((a,b)=>b[1]-a[1]).slice(0,10).map(([id,n]) => ({it:lookup[id], n, sid:id.split("|")[0]})).filter(x=>x.it);
  return {name:p.name||p.email||"Player", email:p.email, updated:p.updated, xp:kv.xp||0, last14, subjects, weakTopics, worst, log:log.slice(-15).reverse(), blitz:kv["blitz:all"]||0, boss:kv["boss:all"]||0};
}
const itemText = it => (it.text && !it.lines && it.q === undefined ? it.text.replace("___","…") : it.q) + (it.hint && it.q && it.q.startsWith("Which matches") ? " ("+it.hint+")" : "");
function report(r){
  const lines = [`Peter’s Revision Hub report, ${new Date().toLocaleDateString("en-GB")}`,
    `${r.name}: level ${lvl(r.xp).l} (${r.xp} XP), revised on ${r.last14} of the last 14 days.`, "", "Subjects (activities done, average best score, answer accuracy):",
    ...r.subjects.map(x => `- ${x.s.name}: ${x.done}/${x.total}, ${x.avg??"–"}%, ${x.accuracy??"–"}%`), "", "Weakest topics:",
    ...(r.weakTopics.length ? r.weakTopics.map(t => `- ${t.s.name}: ${t.topic} (${t.avg}%)`) : ["- none under 75% yet"]), "", "Most-missed questions:",
    ...(r.worst.length ? r.worst.map(w => `- ${subjOf(w.sid).name}: ${itemText(w.it)}`) : ["- none yet"]), "",
    "Please write new question packs for Peter’s Revision Hub aimed at these weak spots. Use a mix of types (quiz, blanks, match, sort, order, slider, tap, exam)."];
  return lines.join("\n");
}
async function dashboard(){
  app.innerHTML = `<button class="back" id="bk">← Try the app (practice mode)</button><h1>Parent <em>dashboard</em></h1><p class="note" id="st">Loading progress…</p><div id="players" class="list"></div>
    <div class="card"><h2>Add a question pack</h2><p class="note">Paste a pack Claude has written for you, then tap Add. It appears in the app for everyone straight away, no upload needed.</p>
      <textarea id="pack" style="min-height:140px" placeholder='{"sets":[ … ]}'></textarea>
      <div class="row"><button class="btn" id="add">Add pack</button></div><div id="addfb"></div></div>
    <div class="card"><h2>Question packs added</h2><div id="packs" class="list"><p class="note">Loading…</p></div></div>`;
  app.querySelector("#bk").onclick = home;
  app.querySelector("#add").onclick = addPack;
  top0();
  const timer = setTimeout(() => { const st = document.getElementById("st"); if(st) st.textContent = "Still loading. Check your connection."; }, 10000);
  try{
    const players = (await CLOUD.listPlayers()).filter(p => !CLOUD.isParent(p.email)); clearTimeout(timer);
    document.getElementById("st").textContent = (players.length ? `${players.length} player${players.length>1?"s":""}. Updated when each device syncs.` : "No progress yet. It appears once Peter signs in and finishes an activity.") + " Your own practice plays are never saved or shown here.";
    PLAYERS_IDX = 0; document.getElementById("players").innerHTML = players.map(p => playerCard(analyse(p))).join("");
    document.querySelectorAll("[data-copy]").forEach(b => b.onclick = async () => {
      const txt = report(analyse(players[+b.dataset.copy]));
      try{ await navigator.clipboard.writeText(txt); b.textContent = "Copied: paste it to Claude"; }
      catch(e){ const ta = b.parentElement.parentElement.querySelector("textarea.rep"); ta.hidden = false; ta.value = txt; ta.select(); b.textContent = "Select and copy the text below"; }
    });
  }catch(e){ clearTimeout(timer); document.getElementById("st").textContent = "Couldn’t load progress: "+(e.code||e.message); }
  listPacks();
}
function playerCard(r){
  const L = lvl(r.xp), seen = r.updated ? new Date(r.updated).toLocaleString("en-GB",{weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}) : "never";
  return `<div class="card">
    <div class="row" style="justify-content:space-between"><h2>${esc(r.name)}</h2><span class="note">Last active ${esc(seen)}</span></div>
    <div class="stats"><div class="stat"><b>${L.l}</b><span>level (${esc(L.rank)})</span></div><div class="stat"><b>${r.xp}</b><span>XP</span></div>
      <div class="stat"><b>${r.last14}/14</b><span>days revised, last 2 weeks</span></div><div class="stat"><b>${r.blitz}</b><span>blitz record</span></div><div class="stat"><b>${r.boss}</b><span>boss record</span></div></div>
    <div class="tblwrap"><table class="tbl"><thead><tr><th>Subject</th><th>Done</th><th>Avg best</th><th>Accuracy</th></tr></thead><tbody>
      ${r.subjects.map(x=>`<tr><td>${esc(x.s.name)}</td><td>${x.done}/${x.total}</td><td><span class="chip ${band(x.avg)}">${x.avg??"–"}${x.avg!=null?"%":""}</span></td><td><span class="chip ${band(x.accuracy)}">${x.accuracy??"–"}${x.accuracy!=null?"%":""}</span>${x.answers?` <span class="note">(${x.answers})</span>`:""}</td></tr>`).join("")}
    </tbody></table></div>
    <h3>Weakest topics</h3>${r.weakTopics.length?`<div class="list">${r.weakTopics.map(t=>`<div class="row"><span class="chip ${band(t.avg)}">${t.avg}%</span><span>${esc(t.s.name)}: ${esc(t.topic)}</span></div>`).join("")}</div>`:'<p class="note">Nothing under 75% yet.</p>'}
    <h3>Most-missed questions</h3>${r.worst.length?`<div class="list">${r.worst.map(w=>`<p class="note"><b>${esc(subjOf(w.sid).name)}:</b> ${esc(itemText(w.it))}</p>`).join("")}</div>`:'<p class="note">None yet.</p>'}
    <h3>Recent activity</h3>${r.log.length?`<div class="list">${r.log.map(l=>`<div class="row"><span class="note" style="min-width:110px">${new Date(l.d).toLocaleDateString("en-GB",{day:"numeric",month:"short"})}</span><span>${esc(l.t)} ${l.s!=="all"&&subjOf(l.s)?`<span class="note">(${esc(subjOf(l.s).name)})</span>`:""}</span><span class="chip ${l.k==="blitz"||l.k==="boss"?"":band(l.sc)}">${l.k==="blitz"||l.k==="boss"?l.sc+" correct":l.sc+"%"}</span></div>`).join("")}</div>`:'<p class="note">No activity yet.</p>'}
    <div class="row"><button class="btn" data-copy="${PLAYERS_IDX++}">Copy report for Claude</button></div>
    <textarea class="rep" hidden readonly style="min-height:160px"></textarea>
  </div>`;
}
let PLAYERS_IDX = 0;
async function listPacks(){
  const box = document.getElementById("packs"); if(!box) return;
  try{ const list = await CLOUD.loadContent();
    box.innerHTML = list.length ? list.map(c=>`<div class="row"><span class="tag">${esc(c.type)}</span><span>${esc(subjOf(c.subject)?.name||c.subject)}: ${esc(c.title)}</span></div>`).join("") : '<p class="note">None yet.</p>';
  }catch(e){ box.innerHTML = `<p class="note">Couldn’t load packs: ${esc(e.code||e.message)}</p>`; }
}
async function addPack(){
  const fb = document.getElementById("addfb"), raw = document.getElementById("pack").value.trim();
  let data; try{ data = JSON.parse(raw); }catch(e){ fb.innerHTML = `<p class="fb wrong">That isn’t a complete pack. Make sure you copied all of it, from the first { to the last }.</p>`; return; }
  const sets = Array.isArray(data) ? data : data.sets ? data.sets : [data];
  const problems = sets.map((c,i)=>{ const e = checkSet(c); return e ? `Set ${i+1}${c&&c.title?" (“"+c.title+"”)":""}: ${e}` : ""; }).filter(Boolean);
  if(problems.length){ fb.innerHTML = `<div class="fb wrong">${problems.map(esc).join("<br>")}</div>`; return; }
  fb.innerHTML = '<p class="note">Adding…</p>';
  try{ for(const c of sets) await CLOUD.addContent(slug(c.subject+"-"+c.title), c);
    mergeContent(sets); document.getElementById("pack").value = "";
    fb.innerHTML = `<p class="fb right">Added ${sets.length} set${sets.length>1?"s":""}. They’re in the app now.</p>`; listPacks();
  }catch(e){ fb.innerHTML = `<p class="fb wrong">Couldn’t save: ${esc(e.code||e.message)}. Check you’re signed in with a parent account.</p>`; }
}

/* ---------- boot ---------- */
window.bootApp = function(cloud){
  CLOUD = cloud;
  if(!CLOUD){ ME = null; loadLocalState(); home(); return; }
  CLOUD.onUser(async u => {
    if(!u){ ME = null; signInScreen(); return; }
    ME = {uid:u.uid, name:u.displayName||"", email:u.email||"", parent:CLOUD.isParent(u.email)};
    if(ME.parent){ STATE = {kv:{}, acc:{}, log:[]}; ensureState(); try{ mergeContent(await CLOUD.loadContent()); }catch(e){} dashboard(); return; }
    loadLocalState();
    app.innerHTML = '<p class="note">Loading your progress…</p>';
    try{ const remote = await CLOUD.loadPlayer(u.uid);
      if(remote && remote.state){ const r = JSON.parse(remote.state); if(((r.kv||{}).xp||0) >= (STATE.kv.xp||0)){ STATE = r; ensureState(); try{ localStorage.setItem(cacheKey(), JSON.stringify(STATE)); }catch(e){} } else queueSave(); }
      else if(STATE.log.length || STATE.kv.xp) queueSave();
    }catch(e){ setSync("Offline"); }
    try{ mergeContent(await CLOUD.loadContent()); }catch(e){}
    ME.parent ? dashboard() : home();
  });
};
