/* Peter's Revision Hub: built-in question content. New packs can also be added from the parent dashboard. */
/* ---------- content builders ---------- */
const M = (topic,title,pairs) => { const p = pairs.map(x=>x.split("|")); if(p.length<=8) return [{type:"match",topic,title,pairs:p}];
  const out=[], n=Math.ceil(p.length/8), size=Math.ceil(p.length/n); for(let i=0;i<n;i++) out.push({type:"match",topic,title:`${title} (${i+1}/${n})`,pairs:p.slice(i*size,(i+1)*size)}); return out; };
const Q = (topic,title,items) => [{type:"quiz",topic,title,items:items.map(x=>{ const [q,a,...w]=x.split("|"); return {q,a,opts:[a,...w]}; })}];
const B = (topic,title,items) => [{type:"blanks",topic,title,items:items.map(x=>{ const [text,a,hint]=x.split("|"); return {text,a:a.split(";"),hint}; })}];
const O = (topic,title,steps) => [{type:"order",topic,title,steps}];
const P = (topic,title,centre,model,labels) => [{type:"map",topic,title,centre,model,labels}];
const T = (topic,title,quotes) => [{type:"build",topic,title,quotes}];
const S = (topic,title,bins) => [{type:"sort",topic,title,bins}];
const C = (topic,title,items) => [{type:"quiz",code:true,topic,title,items:items.map(x=>({q:x.q,code:x.code,a:x.a,opts:[x.a,...x.w]}))}];
const L = (topic,title,diagram,labels,caption) => [{type:"label",topic,title,diagram,labels,caption}];

const SUBJECTS = [
{ id:"lit", name:"English Literature", board:"AQA 8702", focus:true, sets:[
  ...B("Macbeth","Macbeth key quotes",[
    "Fair is ___, and foul is fair|foul|The witches, Act 1",
    "Stars, hide your fires; Let not light see my black and deep ___|desires|Macbeth, Act 1",
    "It is too full o’ th’ ___ of human kindness|milk|Lady Macbeth about Macbeth",
    "Look like th’ innocent flower, But be the ___ under’t|serpent|Lady Macbeth, Act 1",
    "I have no spur to prick the sides of my intent, but only vaulting ___|ambition|Macbeth’s soliloquy, Act 1",
    "Is this a ___ which I see before me|dagger|Macbeth, Act 2",
    "Will all great Neptune’s ocean wash this ___ clean from my hand?|blood|Macbeth after the murder",
    "O, full of ___ is my mind, dear wife!|scorpions|Macbeth, Act 3",
    "Out, damned ___! Out, I say!|spot|Lady Macbeth sleepwalking",
    "Life’s but a walking ___|shadow|Macbeth, Act 5",
    "This dead ___ and his fiend-like queen|butcher|Malcolm, the final scene"]),
  ...T("Macbeth","Build the quote: Macbeth",["Fair is foul, and foul is fair","Look like th’ innocent flower, But be the serpent under’t","Out, damned spot! Out, I say!","Life’s but a walking shadow","O, full of scorpions is my mind, dear wife!"]),
  ...M("Macbeth","Macbeth characters",["Macbeth|Brave thane whose ambition turns him into a tyrant","Lady Macbeth|Pushes the murder, then is destroyed by guilt","Banquo|Loyal and suspicious; told his heirs will be kings","Duncan|Trusting king who is murdered in his sleep","Macduff|Thane of Fife who kills Macbeth","Malcolm|Duncan’s son who becomes king","The witches|Prophecies that spark Macbeth’s ambition"]),
  ...O("Macbeth","Macbeth: put the plot in order",["The witches greet Macbeth and Banquo","Macbeth is made Thane of Cawdor","Duncan is murdered","Banquo is murdered","Banquo’s ghost appears at the banquet","Macduff’s family is killed","Lady Macbeth sleepwalks","Macduff kills Macbeth"]),
  ...P("Macbeth","Mind map: ambition in Macbeth","Ambition in Macbeth",["The witches’ prophecy sparks Macbeth’s ambition","Lady Macbeth pushes him: questions his manhood","‘Vaulting ambition’: he knows it is dangerous","Leads to guilt, hallucinations and paranoia","Turns him into a tyrant (‘butcher’) and destroys him","Context: regicide breaks the Divine Right of Kings"]),
  ...P("Macbeth","Essay plan: Lady Macbeth and power","How does Shakespeare present Lady Macbeth as powerful?",["She is powerful at first: she dominates Macbeth and plans the murder","‘Unsex me here’: she rejects femininity to gain power","She manipulates Macbeth by questioning his manhood","Her power fades: she is shut out of his later plans","Sleepwalking and ‘Out, damned spot!’ show guilt destroying her","Context: Jacobean women expected to obey; links to the witches"],["Main argument","Act 1","Act 1 method","Act 3","Act 5","Context"]),
  ...B("Jekyll and Hyde","Jekyll and Hyde key quotes",[
    "If he be Mr. Hyde, I shall be Mr. ___|seek|Utterson",
    "I incline to ___ heresy. I let my brother go to the devil in his own way|cain's;cains;cain’s|Utterson, chapter 1",
    "trampled calmly over the child’s body… like some damned ___|juggernaut|Enfield’s story",
    "Something ___, shall we say?|troglodytic|Utterson describing Hyde",
    "with ___ fury, he was trampling his victim under foot|ape-like;apelike;ape like|The Carew murder",
    "Man is not truly one, but truly ___|two|Jekyll’s statement",
    "Edward Hyde, alone in the ranks of mankind, was pure ___|evil|Jekyll’s statement",
    "I stood already committed to a profound ___ of life|duplicity|Jekyll’s statement"]),
  ...T("Jekyll and Hyde","Build the quote: Jekyll and Hyde",["Man is not truly one, but truly two","If he be Mr. Hyde, I shall be Mr. Seek","Something troglodytic, shall we say?","Edward Hyde, alone in the ranks of mankind, was pure evil"]),
  ...M("Jekyll and Hyde","Jekyll and Hyde characters",["Dr Jekyll|Respected scientist hiding a secret side","Mr Hyde|Jekyll’s evil side, small and ape-like","Utterson|Rational lawyer who investigates","Lanyon|Doctor who dies after seeing the transformation","Enfield|Utterson’s cousin who tells the door story","Poole|Jekyll’s loyal butler","Sir Danvers Carew|MP murdered by Hyde"]),
  ...O("Jekyll and Hyde","Jekyll and Hyde: put the plot in order",["Enfield tells the story of the door","Utterson reads Jekyll’s will","Hyde murders Sir Danvers Carew","Lanyon dies after a shock","Poole and Utterson break into the cabinet","Jekyll’s full statement is read"]),
  ...P("Jekyll and Hyde","Mind map: duality","Duality",["Jekyll and Hyde: one man, two sides","Respectable public life vs secret private life","The house: grand front, sinister back door","London: rich streets vs foggy, dark Soho","Science vs religion and the supernatural","‘Man is not truly one, but truly two’"]),
  ...P("Jekyll and Hyde","Essay plan: Hyde as frightening","How does Stevenson present Hyde as frightening?",["Hyde is frightening because he is violent and inhuman","Trampling the girl: ‘like some damned Juggernaut’","Carew murder: ‘ape-like fury’ links to fears about evolution","People feel disgust they can’t explain (‘troglodytic’)","Victorian context: fear of degeneration and hidden sin"],["Main argument","Chapter 1","Chapter 4","Descriptions","Context"]),
  ...M("An Inspector Calls","An Inspector Calls characters",["Arthur Birling|Selfish businessman who cares about profit and status","Sybil Birling|Cold, snobbish chair of the charity","Sheila Birling|Changes most and accepts responsibility","Eric Birling|Drinks, steals, and is shaken into change","Gerald Croft|Sheila’s fiancé who had an affair with Daisy Renton","Inspector Goole|Priestley’s voice for socialist ideas","Eva Smith|Working-class woman each Birling harms","Edna|The maid, a silent reminder of class"]),
  ...O("An Inspector Calls","An Inspector Calls: who is questioned first?",["Mr Birling","Sheila","Gerald","Mrs Birling","Eric"]),
  ...P("An Inspector Calls","Mind map: responsibility","Responsibility",["Mr Birling sacks Eva for asking for higher wages","Sheila gets Eva sacked from Milwards out of jealousy","Gerald uses Eva then drops her","Mrs Birling refuses her help from the charity","Eric gets her pregnant and steals money","The Inspector’s final speech: we all share responsibility","Young (Sheila, Eric) change; the older Birlings don’t"]),
  ...P("An Inspector Calls","Essay plan: Sheila","How does Priestley use Sheila to present ideas about responsibility?",["Sheila shows the young can learn responsibility","Act 1: spoilt and shallow at first","She admits her part and feels guilt straight away","She challenges her parents in Act 3","Context: Priestley’s 1945 audience; hope for a fairer society"],["Main argument","Start","Change","End","Context"]),
  ...M("Power and Conflict","Poem to poet",["Ozymandias|Percy Bysshe Shelley","London|William Blake","The Prelude (extract)|William Wordsworth","My Last Duchess|Robert Browning","The Charge of the Light Brigade|Alfred Tennyson","Exposure|Wilfred Owen","Storm on the Island|Seamus Heaney","Bayonet Charge|Ted Hughes","Remains|Simon Armitage","Poppies|Jane Weir","War Photographer|Carol Ann Duffy","Tissue|Imtiaz Dharker","The Emigrée|Carol Rumens","Checking Out Me History|John Agard","Kamikaze|Beatrice Garland"]),
  ...M("Power and Conflict","Poem to big idea",["Ozymandias|Power of rulers fades; time and nature win","London|Suffering caused by those in power in the city","The Prelude (extract)|A boy humbled by the power of nature","My Last Duchess|A Duke’s jealous, controlling power","The Charge of the Light Brigade|Honouring soldiers despite a blunder","Exposure|Soldiers suffering from the weather more than the enemy","Storm on the Island|Power of nature against a community","Bayonet Charge|A soldier’s panic in the moment of attack","Remains|A soldier haunted by a killing (PTSD)","Poppies|A mother’s grief as her son leaves for war","War Photographer|Suffering in war vs the public’s indifference","Tissue|Paper as a symbol of fragile human power","The Emigrée|Memories of a lost home city","Checking Out Me History|Identity and a history taught from one side","Kamikaze|A pilot who turns back, and his family’s shame"]),
  ...S("Power and Conflict","Sort the poems: power of nature or effects of war?",{"Power of nature":["Ozymandias","The Prelude (extract)","Storm on the Island","Exposure"],"Effects of war":["Remains","Poppies","War Photographer","Bayonet Charge","Kamikaze","The Charge of the Light Brigade"]}),
  ...M("Poetry skills","Poetry terms",["Enjambment|A sentence running over the end of a line","Caesura|A pause in the middle of a line","Volta|A turning point in a poem","Dramatic monologue|One character speaking to a silent listener","Sonnet|14-line poem","Free verse|No regular rhyme or rhythm","Iambic pentameter|Ten syllables: unstressed, stressed","Semantic field|A group of words linked to one idea"]),
  ...P("Poetry skills","Plan: compare two poems","Compare how power is shown in Ozymandias and one other poem",["Big idea: both show human power is fragile","Ozymandias: the broken statue in the desert","Compare: e.g. Storm on the Island, nature beats people","Method: sonnet form and irony vs conversational voice","Ending: time wins vs fear of an invisible enemy"],["Main comparison","Poem 1","Poem 2","Methods","Endings"]),
  ...Q("Context","Context quick-fire",[
    "In what year is An Inspector Calls set?|1912|1945|1939|1901",
    "When was An Inspector Calls first performed?|1945|1912|1918|1960",
    "Which king was on the throne when Macbeth was written?|James I|Elizabeth I|Charles I|Henry VIII",
    "What idea said kings were chosen by God, making regicide a sin?|Divine Right of Kings|Magna Carta|Natural law|Feudalism",
    "When was Jekyll and Hyde published?|1886|1945|1606|1912",
    "Which political idea does Priestley push through the Inspector?|Socialism / collective responsibility|Capitalism|Monarchy|Anarchy",
    "Which Victorian value makes characters in Jekyll and Hyde keep secrets?|Reputation and respectability|Religious freedom|Equality|Adventure",
    "Which scientist’s theory of evolution unsettled Victorian readers?|Charles Darwin|Isaac Newton|Marie Curie|Albert Einstein"])
]},
{ id:"lang", name:"English Language", board:"AQA 8700", focus:true, sets:[
  ...M("Paper 1","Paper 1: which question?",["Q1 (4 marks)|List four things from a set part of the text","Q2 (8 marks)|How the writer uses language","Q3 (8 marks)|How the writer structures the whole text","Q4 (20 marks)|Evaluate a statement: how far do you agree?","Q5 (40 marks)|Descriptive or narrative writing"]),
  ...M("Paper 1","Structure terms (Paper 1 Q3)",["Shift in focus|Moving from one place, person or idea to another","Flashback|Jumping back in time","Foreshadowing|Hinting at something that happens later","Cyclical structure|Ending where it began","Zoom in|Moving from a wide view to one small detail","Short sentence or paragraph|Creates tension or emphasis"]),
  ...P("Paper 1","Plan: a descriptive piece","Describe a storm at sea",["Open with a single striking image (zoom in)","Use all five senses","Pathetic fallacy and personification of the sea","Vary sentence length: short ones for impact","Shift focus: wide view, then a person, then a detail","End by echoing the opening (cyclical)"]),
  ...O("Paper 1","Paper 1 Q4: order your answer",["Decide how far you agree with the statement","Pick a short quote that supports your view","Analyse the writer’s method in that quote","Explain the effect on the reader","Link back to the statement","Repeat with a new point"]),
  ...M("Paper 2","Paper 2: which question?",["Q1 (4 marks)|Choose four true statements","Q2 (8 marks)|Summarise the differences between the two sources","Q3 (12 marks)|How the writer uses language in one source","Q4 (16 marks)|Compare the writers’ ideas and perspectives","Q5 (40 marks)|Write to give your viewpoint (article, letter, speech)"]),
  ...M("Paper 2","Persuasive techniques",["Direct address|Talking straight to the reader: ‘you’","Anecdote|A short personal story","Facts and statistics|Numbers that make it sound proven","Opinion as fact|A view stated as if certain","Emotive language|Words chosen to stir feelings","Counter-argument|Raising the other side, then knocking it down","Hyperbole|Deliberate exaggeration"]),
  ...M("Paper 2","Writing forms (Paper 2 Q5)",["Article|Headline, strapline, subheadings","Formal letter|Dear…, then Yours sincerely or faithfully","Speech|Address the audience and use spoken techniques","Leaflet|Title, subheadings, clear sections","Essay|Introduction, balanced paragraphs, conclusion"]),
  ...P("Paper 2","Plan: a viewpoint article","‘Teenagers spend too much time on their phones.’ Write an article giving your view.",["Headline that hooks","Open with an anecdote or striking statistic","Point 1 with evidence and emotive language","Point 2 with a rhetorical question","Counter-argument, then rebut it","Strong ending: call to action"]),
  ...M("Language skills","Language techniques",["Simile|Comparison using ‘like’ or ‘as’","Metaphor|Saying something is something else","Personification|Giving human qualities to something not human","Pathetic fallacy|Weather that reflects mood","Sibilance|Repeated ‘s’ sounds","Juxtaposition|Placing contrasting ideas side by side","Rhetorical question|A question asked for effect","Triplet / rule of three|Three words or ideas grouped for emphasis","Onomatopoeia|A word that sounds like its meaning","Imperative|A command verb"]),
  ...Q("Language skills","Punctuation and SPaG",[
    "Which links two closely related full sentences?|Semicolon|Comma|Colon|Hyphen",
    "Which introduces a list or explanation?|Colon|Semicolon|Comma|Apostrophe",
    "A letter starting ‘Dear Sir or Madam’ ends…|Yours faithfully|Yours sincerely|From|Best wishes",
    "Which is correct?|The dog wagged its tail|The dog wagged it’s tail|The dog wagged its’ tail|The dog wagged its's tail",
    "‘Although it was late, we kept walking.’ What type of sentence?|Complex|Simple|Compound|Minor",
    "Which is correct?|They’re going to their house over there|Their going to there house over they’re|There going to they’re house over their|They’re going to there house over their"]),
  ...B("Language skills","Exam know-how",[
    "Each English Language paper lasts 1 hour ___ minutes|45|Both papers are the same length",
    "Question 5 is worth ___ marks|40|Half the paper",
    "Q5 splits into 24 marks for content and organisation and ___ for technical accuracy|16|SPaG",
    "Spend about ___ minutes on Q5, including planning|45|Plan for 5 of them",
    "In Q2 and Q3, always explain the ___ on the reader|effect;effects|What it makes us think or feel",
    "Paper 2 Q4 asks you to compare the writers’ ideas and ___|perspectives;perspective;viewpoints;attitudes|Their point of view"])
]},
{ id:"maths", name:"Maths (Higher)", board:"Edexcel 1MA1", alevel:true, sets:[
  ...Q("A-level prep: grade 9 stretch","Grade 9 algebra",[
    "Simplify (x² − 9)/(x + 3)|x − 3|x + 3|x² − 3|x − 9",
    "Solve 2x² − 3x − 5 = 0|x = 2.5 or x = −1|x = −2.5 or x = 1|x = 5 or x = −1|x = 1.5 or x = −1",
    "Solve x² < 9|−3 < x < 3|x < 3|x < −3 or x > 3|x > −3",
    "n² + n is always even because it equals…|n(n + 1), the product of consecutive integers|2n|n² + 1|(n + 1)²",
    "xₙ₊₁ = ∛(xₙ + 5) with x₀ = 2. What is x₁ (3 dp)?|1.913|7.000|2.500|1.710",
    "Tangent to x² + y² = 25 at (3, 4)?|y = −¾x + 25/4|y = 4/3 x|y = −4/3 x + 8|y = ¾x + 7/4",
    "Gradient of a curve at a point is found by…|Drawing a tangent and finding its gradient|Joining the two ends|Finding the area under it|Reading the y-intercept",
    "If AB = a and BC = b, then AC = ?|a + b|a − b|b − a|2a + b",
    "Exact value of cos 30°?|√3/2|1/2|√2/2|√3"]),
  ...B("A-level prep: grade 9 stretch","Exact values and identities",[
    "sin 60° = √3/___|2|Exact trig value",
    "tan 30° = 1/√___|3|Exact trig value",
    "(a + b)² = a² + ___ + b²|2ab|Expand carefully",
    "A function’s inverse undoes it: f⁻¹(f(x)) = ___|x|Back where you started"]),
  ...Q("Number","Number quick-fire",[
    "What is 3⁻²?|1/9|−9|−6|1/6","Simplify √50|5√2|25√2|2√5|10√5","Write 0.00045 in standard form|4.5 × 10⁻⁴|4.5 × 10⁴|45 × 10⁻⁵|4.5 × 10⁻³",
    "What is 8^(2/3)?|4|16|5.33|2","HCF of 12 and 18?|6|3|36|2","LCM of 4 and 6?|12|24|2|10",
    "0.3 recurring as a fraction?|1/3|3/10|3/100|1/30","Upper bound of 4.5 (to 1 dp)?|4.55|4.5|4.6|4.59",
    "60 as a product of prime factors?|2² × 3 × 5|2 × 30|4 × 15|2 × 3 × 10","Rationalise 1/√2|√2/2|2/√2|√2|1/2"]),
  ...Q("Algebra","Algebra quick-fire",[
    "Factorise x² + 5x + 6|(x + 2)(x + 3)|(x + 1)(x + 6)|(x − 2)(x − 3)|(x + 5)(x + 1)",
    "Expand (x + 3)(x − 3)|x² − 9|x² + 9|x² − 6x − 9|x² + 6x − 9",
    "nth term of 3, 7, 11, 15…|4n − 1|3n + 4|4n + 3|n + 4",
    "Solve 3x − 2 > 7|x > 3|x > 5/3|x < 3|x > 9",
    "x² + 6x + 2 written as a completed square?|(x + 3)² − 7|(x + 3)² + 2|(x + 6)² − 34|(x + 3)² − 9",
    "Turning point of y = (x − 2)² + 3?|(2, 3)|(−2, 3)|(2, −3)|(3, 2)",
    "Solve x + y = 10 and x − y = 4|x = 7, y = 3|x = 6, y = 4|x = 3, y = 7|x = 5, y = 5",
    "If f(x) = 2x + 1, what is f⁻¹(x)?|(x − 1)/2|(x + 1)/2|2x − 1|1/(2x + 1)",
    "Gradient of a line perpendicular to y = 2x + 1?|−1/2|2|−2|1/2"]),
  ...M("Algebra","Match the graph",["y = x²|U-shaped parabola","y = x³|S-shaped cubic curve","y = 1/x|Reciprocal: two curves in opposite corners","y = 2ˣ|Exponential: grows faster and faster","x² + y² = 25|Circle, centre origin, radius 5","y = 3x − 2|Straight line, gradient 3"]),
  ...B("Algebra","Algebra must-knows",[
    "Quadratic formula: x = (−b ± √(b² − 4ac)) / ___|2a|The denominator",
    "In y = mx + c, c is the y-___|intercept|Where it crosses the y-axis",
    "Difference of two squares: a² − b² = (a + b)(a − ___)|b|Brackets",
    "To find f(g(x)), apply ___ first|g|The inner function"]),
  ...Q("Ratio and proportion","Ratio quick-fire",[
    "Share £40 in the ratio 3 : 5|£15 and £25|£12 and £28|£13 and £27|£10 and £30",
    "Multiplier for a 15% decrease?|0.85|1.15|0.15|0.985",
    "After a 20% rise a coat costs £60. Original price?|£50|£48|£72|£40",
    "£200 at 3% compound interest for 2 years?|£212.18|£212.00|£206.00|£218.54",
    "120 km in 1.5 hours. Average speed?|80 km/h|180 km/h|60 km/h|90 km/h",
    "y ∝ x and y = 12 when x = 3. Find y when x = 5|20|15|36|4",
    "Inverse proportion: y = 6 when x = 2. Find y when x = 4|3|12|8|1.5"]),
  ...B("Geometry","Formulas to know",[
    "Area of a circle = π × r___|2;²;squared;^2|Power of r",
    "Sine rule: a / sin A = b / sin ___|b|Matching side and angle",
    "Area of any triangle = ½ab sin ___|c|The angle between a and b",
    "In a right-angled triangle, a² + b² = ___|c²;c2;c^2;c squared|Pythagoras",
    "Volume of a cylinder = πr²___|h|Height",
    "Volume of a cone = ___πr²h|1/3;⅓;one third|A fraction",
    "Arc length = (θ/360) × 2π___|r|Radius"]),
  ...Q("Geometry","Shape and angle quick-fire",[
    "Sum of interior angles of a pentagon?|540°|360°|720°|450°","Exterior angles of any polygon add to…|360°|180°|540°|It depends",
    "sin 30° = ?|0.5|√3/2|1|√2/2","tan 45° = ?|1|0|0.5|√3",
    "Length scale factor 2. Volume scale factor?|8|4|2|6","Hypotenuse when the other sides are 6 and 8?|10|14|12|9.8"]),
  ...M("Geometry","Circle theorems",["Angle in a semicircle|is 90°","Angle at the centre|is twice the angle at the circumference","Opposite angles in a cyclic quadrilateral|add up to 180°","Tangent and radius|meet at 90°","Angles in the same segment|are equal","Alternate segment theorem|angle between tangent and chord equals angle in the opposite segment","Two tangents from a point|are equal in length"]),
  ...O("Geometry","Trig: order the steps",["Label the sides opposite, adjacent and hypotenuse","Choose SOH, CAH or TOA","Write the equation","Rearrange to find the unknown","Calculate and round sensibly"]),
  ...Q("Probability and statistics","Probability and stats quick-fire",[
    "P(A) = 0.3. What is P(not A)?|0.7|0.3|1.3|0.03","Probability of two sixes with two dice?|1/36|1/6|2/12|1/12",
    "Independent events: P(A and B) = ?|P(A) × P(B)|P(A) + P(B)|P(A) − P(B)|P(A) ÷ P(B)",
    "Frequency density = ?|Frequency ÷ class width|Class width ÷ frequency|Frequency × class width|Frequency ÷ total",
    "Interquartile range = ?|Upper quartile − lower quartile|Max − min|Median − lower quartile|Upper quartile + lower quartile",
    "Median of 3, 9, 4, 7, 2?|4|5|7|9","A ∩ B in a Venn diagram means…|In A and B|In A or B|Not in A|Only in B"])
]},
{ id:"sci", name:"Combined Science", board:"AQA 8464 Higher", alevel:true, sets:[
  ...Q("A-level prep: Physics","Physics calculations",[
    "A 2 kg ball moves at 3 m/s. Kinetic energy?|9 J|6 J|18 J|3 J",
    "5 kg is lifted 2 m (g = 9.8 N/kg). GPE gained?|98 J|10 J|49 J|19.6 J",
    "12 V across 3 Ω. Current?|4 A|36 A|0.25 A|15 A",
    "2 A flows for 30 s. Charge?|60 C|15 C|32 C|0.07 C",
    "A car goes from 0 to 20 m/s in 5 s. Acceleration?|4 m/s²|100 m/s²|0.25 m/s²|15 m/s²",
    "Momentum of a 1000 kg car at 20 m/s?|20 000 kg m/s|50 kg m/s|10 000 kg m/s|200 000 kg m/s",
    "A 50 Hz wave has wavelength 2 m. Speed?|100 m/s|25 m/s|52 m/s|0.04 m/s",
    "Spring constant 40 N/m, extension 0.05 m. Force?|2 N|800 N|0.00125 N|40.05 N",
    "Heat 2 kg of water by 10 °C (c = 4200 J/kg °C)?|84 000 J|8 400 J|42 000 J|840 J",
    "Half-life 2 hours. Fraction left after 6 hours?|1/8|1/6|1/3|1/4",
    "A 60 W lamp runs for 10 s. Energy?|600 J|6 J|70 J|0.17 J"]),
  ...B("A-level prep: Physics","Equations to recall",[
    "Momentum = mass × ___|velocity|p = mv",
    "Acceleration = change in velocity ÷ ___|time|a = Δv/t",
    "v² − u² = 2 × a × ___|distance;displacement;s|Uniform acceleration (given on the sheet, but know it)",
    "Work done = force × ___|distance|Along the line of the force",
    "Power = current² × ___|resistance|P = I²R"]),
  ...M("A-level prep: Physics","Physics required practicals",["Specific heat capacity|Heat a block and measure temperature rise","Resistance|How wire length affects resistance","I–V characteristics|Filament lamp, diode and resistor","Density|Measure mass and volume (displacement can)","Force and extension|Add masses to a spring","Acceleration|How force and mass affect acceleration","Waves|Ripple tank to find wave speed","Infrared radiation|How surface colour affects emission"]),
  ...Q("A-level prep: Biology","Biology stretch",[
    "Bb × Bb. Chance of a bb child?|25%|50%|75%|0%",
    "Bb × bb. Chance of a bb child?|50%|25%|75%|100%",
    "Why does enzyme activity drop at high temperatures?|The active site changes shape (denatures)|The enzyme is used up|The substrate runs out|It dissolves",
    "Surface area : volume ratio of a 1 cm cube?|6 : 1|1 : 6|3 : 1|1 : 1",
    "Light intensity at double the distance from a lamp is…|A quarter|A half|Double|The same",
    "Pondweed moved further from a lamp gives off bubbles…|More slowly|Faster|At the same rate|Not at all",
    "A sample of 20 quadrats in a 100 m² field finds 3 daisies per quadrat (1 m²). Estimated population?|300|60|23|3 000"]),
  ...M("A-level prep: Biology","Food tests",["Benedict’s test|Sugars: blue to brick red when heated","Iodine|Starch: orange-brown to blue-black","Biuret test|Protein: blue to purple","Ethanol emulsion|Lipids: cloudy white layer"]),
  ...M("A-level prep: Biology","Biology required practicals",["Microscopy|Prepare a slide and calculate magnification","Osmosis|Potato cylinders in sugar or salt solutions","Food tests|Identify sugars, starch, protein and lipids","Enzymes|Effect of pH on amylase","Photosynthesis|Light intensity and pondweed bubbles","Reaction time|Ruler-drop test","Field investigation|Quadrats and transects"]),
  ...M("Biology: B1 Cell biology","Cell parts",["Nucleus|Contains genetic material","Mitochondria|Site of aerobic respiration","Ribosomes|Where proteins are made","Cell membrane|Controls what enters and leaves","Chloroplasts|Site of photosynthesis","Cell wall|Strengthens plant cells (cellulose)","Permanent vacuole|Filled with cell sap; keeps plant cells firm"]),
  ...Q("Biology: B1 Cell biology","Cells and transport",[
    "Bacteria are which type of cell?|Prokaryotic|Eukaryotic|Plant|Stem",
    "Mitosis produces…|Two genetically identical cells|Four different cells|One larger cell|Gametes",
    "Diffusion is movement from…|High to low concentration|Low to high concentration|Only through water|Only in plants",
    "Osmosis is the movement of…|Water across a partially permeable membrane|Glucose into cells|Gases in lungs|Ions against a gradient",
    "Which needs energy from respiration?|Active transport|Diffusion|Osmosis|Evaporation",
    "Magnification = ?|Image size ÷ real size|Real size ÷ image size|Image size × real size|Lens × eyepiece only"]),
  ...M("Biology: B2 Organisation","Enzymes and digestion",["Amylase|Starch into sugars","Protease|Proteins into amino acids","Lipase|Lipids into fatty acids and glycerol","Bile|Emulsifies fats; made in the liver","Stomach acid|Kills bacteria; best pH for protease","Small intestine|Where digested food is absorbed"]),
  ...L("Biology: B2 Organisation","Label the heart","heart",["Right atrium","Right ventricle","Left atrium","Left ventricle","Vena cava","Pulmonary artery","Aorta","Pulmonary vein"],"Front view: the heart’s left side is on the right of the diagram."),
  ...M("Biology: B2 Organisation","Blood, vessels and plants",["Artery|Thick muscular walls, high pressure","Vein|Valves stop blood flowing backwards","Capillary|Walls one cell thick for exchange","Red blood cell|Carries oxygen using haemoglobin","Xylem|Carries water and minerals up the plant","Phloem|Moves sugars around the plant (translocation)","Stomata|Pores controlled by guard cells"]),
  ...M("Biology: B3 Infection and response","Pathogens",["Measles|Virus","HIV|Virus","Tobacco mosaic virus|Virus affecting plants","Salmonella|Bacterium causing food poisoning","Gonorrhoea|Bacterium; treated with antibiotics","Rose black spot|Fungus","Malaria|Protist carried by mosquitoes"]),
  ...Q("Biology: B3 Infection and response","Defence and medicine",[
    "Antibiotics kill…|Bacteria|Viruses|All pathogens|Fungi only",
    "A vaccine contains…|Dead or inactive pathogens|Antibiotics|White blood cells|Painkillers",
    "White blood cells that engulf pathogens do…|Phagocytosis|Photosynthesis|Osmosis|Mitosis",
    "Antitoxins…|Neutralise toxins from bacteria|Kill viruses directly|Make red blood cells|Clot the blood",
    "Drug trials use a placebo to…|Compare against a dummy treatment|Make the drug stronger|Test on animals|Speed up results"]),
  ...B("Biology: B4 Bioenergetics","Equations",[
    "Photosynthesis: carbon dioxide + water → glucose + ___|oxygen|Product released",
    "Aerobic respiration: glucose + oxygen → carbon dioxide + ___|water|The other product",
    "Anaerobic respiration in muscles makes ___ acid|lactic|Causes oxygen debt",
    "In yeast, anaerobic respiration makes ethanol and carbon ___|dioxide|Fermentation"]),
  ...Q("Biology: B4 Bioenergetics","Bioenergetics quick-fire",[
    "Photosynthesis is…|Endothermic|Exothermic|Neither|Only at night",
    "Which is NOT a limiting factor for photosynthesis?|Oxygen concentration|Light intensity|Temperature|Carbon dioxide concentration",
    "Where does aerobic respiration happen?|Mitochondria|Nucleus|Ribosomes|Cell wall",
    "Oxygen debt is the oxygen needed to…|Break down lactic acid after exercise|Start photosynthesis|Make glucose|Grow muscles"]),
  ...O("Biology: B5 Homeostasis","Reflex arc in order",["Stimulus","Receptor","Sensory neurone","Relay neurone","Motor neurone","Effector","Response"]),
  ...M("Biology: B5 Homeostasis","Hormones",["Insulin|From the pancreas; lowers blood glucose","Glucagon|From the pancreas; raises blood glucose","Adrenaline|From adrenal glands; fight or flight","Thyroxine|From the thyroid; controls metabolic rate","Oestrogen|From the ovaries; main female hormone","Testosterone|From the testes; main male hormone","FSH|Makes eggs mature in the ovaries","LH|Triggers ovulation"]),
  ...Q("Biology: B5 Homeostasis","Homeostasis quick-fire",[
    "Type 1 diabetes is when…|The pancreas makes too little insulin|Cells ignore insulin|Blood glucose is too low|The liver stops working",
    "Type 2 diabetes is when…|Body cells no longer respond to insulin|The pancreas makes no insulin|There is too much glucagon|It is caught from others",
    "Homeostasis means…|Keeping internal conditions constant|Making hormones|Fighting disease|Growing cells"]),
  ...M("Biology: B6 Inheritance","Genetics words",["Gene|Section of DNA coding for a protein","Allele|A different version of a gene","Dominant|Shown even with one copy","Recessive|Only shown with two copies","Homozygous|Two identical alleles","Heterozygous|Two different alleles","Genotype|The alleles you have","Phenotype|The characteristic you see"]),
  ...Q("Biology: B6 Inheritance","Inheritance and evolution",[
    "Meiosis produces…|Four genetically different gametes|Two identical cells|One egg|Body cells",
    "How many chromosomes in a human body cell?|46|23|48|92",
    "Sex chromosomes of a male?|XY|XX|YY|XO",
    "Who proposed evolution by natural selection?|Charles Darwin|Gregor Mendel|Isaac Newton|Louis Pasteur",
    "Antibiotic-resistant bacteria are an example of…|Natural selection|Selective breeding|Genetic engineering|Cloning",
    "Choosing parents with useful traits to breed is…|Selective breeding|Natural selection|Mutation|Meiosis"]),
  ...S("Biology: B7 Ecology","Biotic or abiotic?",{"Biotic (living)":["Predators","Disease","Competition for food","New pathogens"],"Abiotic (non-living)":["Light intensity","Temperature","Soil pH","Wind","Carbon dioxide level"]}),
  ...Q("Biology: B7 Ecology","Ecology quick-fire",[
    "A food chain always starts with a…|Producer|Consumer|Predator|Decomposer",
    "A quadrat is used to…|Sample organisms in an area|Measure temperature|Count bacteria|Test soil pH",
    "Biodiversity is…|The variety of species in an area|The number of predators|The mass of plants|Rainfall level",
    "In the carbon cycle, CO₂ is removed from the air by…|Photosynthesis|Respiration|Combustion|Decay",
    "Deforestation increases CO₂ because…|Fewer trees photosynthesise and wood is burned|Trees release oxygen|Soil gets wetter|Animals breathe less"]),
  ...L("Chemistry: C1 Atomic structure","Label the atom","atom",["Nucleus","Proton","Neutron","Electron","Electron shell"]),
  ...M("Chemistry: C1 Atomic structure","Atoms and the periodic table",["Proton|Charge +1, mass 1","Neutron|Charge 0, mass 1","Electron|Charge −1, tiny mass","Isotopes|Same protons, different neutrons","Group 1|Alkali metals: more reactive down the group","Group 7|Halogens: less reactive down the group","Group 0|Noble gases: full outer shell, unreactive","Mendeleev|Left gaps for undiscovered elements"]),
  ...O("Chemistry: C1 Atomic structure","History of the atom",["Dalton: tiny solid spheres","Thomson: plum pudding model","Rutherford: alpha scattering shows a nucleus","Bohr: electrons in shells","Chadwick: discovers the neutron"]),
  ...Q("Chemistry: C2 Bonding","Bonding quick-fire",[
    "Bond between a metal and a non-metal?|Ionic|Covalent|Metallic|Hydrogen",
    "Covalent bonds involve…|Sharing pairs of electrons|Transferring electrons|A sea of electrons|Sharing protons",
    "Why do metals conduct?|Delocalised electrons|Ions are fixed|They are shiny|Strong covalent bonds",
    "Ionic compounds conduct when…|Molten or dissolved|Solid|Cold|Never",
    "Why does graphite conduct?|Each carbon has a delocalised electron|It has ions|It is a metal|It is a liquid",
    "Diamond is hard because…|Each carbon forms 4 strong covalent bonds|It has layers|It has weak forces|It contains metal"]),
  ...Q("Chemistry: C3 Quantitative chemistry","Calculations",[
    "Relative formula mass (Mr) of H₂O? (H = 1, O = 16)|18|17|34|10",
    "Mr of CO₂? (C = 12, O = 16)|44|28|32|40",
    "Moles = ?|Mass ÷ Mr|Mr ÷ mass|Mass × Mr|Volume ÷ mass",
    "Concentration in g/dm³ = ?|Mass ÷ volume|Volume ÷ mass|Mass × volume|Moles × mass",
    "In a closed system, total mass…|Stays the same|Increases|Decreases|Doubles"]),
  ...O("Chemistry: C4 Chemical changes","Reactivity series, most reactive first",["Potassium","Sodium","Calcium","Magnesium","Carbon","Zinc","Iron","Copper"]),
  ...M("Chemistry: C4 Chemical changes","Reactions",["Metal + acid|Salt + hydrogen","Acid + alkali|Salt + water","Hydrochloric acid|Makes chlorides","Sulfuric acid|Makes sulfates","Nitric acid|Makes nitrates","Oxidation|Loss of electrons (OIL)","Reduction|Gain of electrons (RIG)"]),
  ...Q("Chemistry: C4 Chemical changes","Electrolysis",[
    "Positive ions move to the…|Cathode (negative)|Anode (positive)|Middle|Surface",
    "Aluminium is extracted by…|Electrolysis of aluminium oxide|Heating with carbon|Dissolving in water|Distillation",
    "Electrolysis of brine gives hydrogen, chlorine and…|Sodium hydroxide|Sodium metal|Oxygen|Hydrochloric acid",
    "Why is cryolite used?|It lowers the melting point|It speeds up the reaction|It makes it safe|It colours the product"]),
  ...S("Chemistry: C5 Energy changes","Exothermic or endothermic?",{"Exothermic (gets hot)":["Combustion","Neutralisation","Respiration","Bond making"],"Endothermic (gets cold)":["Thermal decomposition","Photosynthesis","Citric acid + sodium hydrogencarbonate","Bond breaking"]}),
  ...Q("Chemistry: C6 Rates and equilibrium","Rates quick-fire",[
    "Which does NOT increase rate?|Lower temperature|Higher concentration|Bigger surface area|A catalyst",
    "A catalyst works by…|Lowering the activation energy|Raising the temperature|Being used up|Adding reactants",
    "Collision theory: reactions need collisions with…|Enough energy|Water|Light|Oxygen",
    "The symbol ⇌ means…|Reversible reaction|Fast reaction|Exothermic|No reaction",
    "Dynamic equilibrium: forward and backward rates are…|Equal|Zero|Different|Increasing"]),
  ...Q("Chemistry: C7 Organic chemistry","Crude oil and hydrocarbons",[
    "General formula for alkanes?|CₙH₂ₙ₊₂|CₙH₂ₙ|CₙHₙ|CₙH₂ₙ₋₂",
    "Crude oil is separated by…|Fractional distillation|Filtration|Cracking|Electrolysis",
    "Shorter hydrocarbon chains are…|More flammable, lower boiling point|Thicker|Less flammable|Solid",
    "Cracking makes shorter alkanes and…|Alkenes|Alcohols|Acids|Polymers only",
    "Test for an alkene?|Bromine water turns colourless|Limewater turns milky|Squeaky pop|Glowing splint relights",
    "Complete combustion of a hydrocarbon gives…|Carbon dioxide and water|Carbon monoxide|Soot only|Hydrogen"]),
  ...M("Chemistry: C8 Chemical analysis","Gas tests",["Hydrogen|Squeaky pop with a lit splint","Oxygen|Relights a glowing splint","Carbon dioxide|Turns limewater milky","Chlorine|Bleaches damp litmus paper"]),
  ...Q("Chemistry: C8 Chemical analysis","Analysis quick-fire",[
    "Rf value = ?|Distance moved by substance ÷ distance moved by solvent|Solvent ÷ substance|Spot size ÷ paper|Time ÷ distance",
    "In chemistry, a pure substance is…|A single element or compound|Natural|Clean|A mixture",
    "A formulation is…|A mixture designed as a useful product|An element|A pure compound|A gas"]),
  ...Q("Chemistry: C9 Atmosphere","Atmosphere quick-fire",[
    "About how much of today’s air is nitrogen?|78%|21%|50%|1%",
    "About how much of today’s air is oxygen?|21%|78%|4%|35%",
    "Early atmosphere was mainly…|Carbon dioxide|Oxygen|Nitrogen|Methane",
    "Which is a greenhouse gas?|Methane|Nitrogen|Oxygen|Argon",
    "Sulfur dioxide causes…|Acid rain|Global dimming|Ozone|Fog"]),
  ...M("Chemistry: C10 Using resources","Resources",["Potable water|Safe to drink","Desalination|Removing salt from sea water","Sterilising water|Chlorine, ozone or UV","Life cycle assessment|Environmental impact from start to disposal","Finite resource|Will run out (e.g. crude oil)","Renewable resource|Can be replaced (e.g. timber)"]),
  ...B("Physics: P1 Energy","Energy equations",[
    "Kinetic energy = ½ × mass × ___²|speed;velocity;v|Squared",
    "Gravitational potential energy = mass × g × ___|height;h|How high",
    "Efficiency = useful output ÷ total ___|input|Energy in",
    "Power = energy transferred ÷ ___|time;t|Measured in watts",
    "Change in thermal energy = m × c × change in ___|temperature|Specific heat capacity"]),
  ...S("Physics: P1 Energy","Renewable or non-renewable?",{"Renewable":["Wind","Solar","Hydroelectric","Tidal","Geothermal","Biofuel"],"Non-renewable":["Coal","Oil","Natural gas","Nuclear"]}),
  ...M("Physics: P2 Electricity","Electricity equations",["V = IR|Potential difference = current × resistance","Q = It|Charge = current × time","P = IV|Power = current × potential difference","P = I²R|Power = current² × resistance","E = QV|Energy = charge × potential difference"]),
  ...Q("Physics: P2 Electricity","Circuits and mains",[
    "In a series circuit, current is…|The same everywhere|Shared between components|Zero|Highest at the cell",
    "In a parallel circuit, potential difference across each branch is…|The same|Shared|Zero|Doubled",
    "UK mains supply?|230 V, 50 Hz|120 V, 60 Hz|12 V, 50 Hz|230 V, 60 Hz",
    "Colour of the live wire?|Brown|Blue|Green and yellow|Black",
    "Why does the National Grid use high voltage?|Lower current means less energy lost|It is safer|Cheaper wires|Faster electricity",
    "Resistance of a thermistor when it gets hotter?|Decreases|Increases|Stays the same|Becomes zero"]),
  ...Q("Physics: P3 Particle model","Particles quick-fire",[
    "Density = ?|Mass ÷ volume|Volume ÷ mass|Mass × volume|Weight ÷ area",
    "Energy to change state with no temperature change = ?|Specific latent heat × mass|m × c × Δθ|½mv²|mgh",
    "Gas pressure rises when heated because particles…|Move faster and hit the walls more|Get bigger|Stop moving|Join together",
    "Internal energy is…|Total kinetic and potential energy of particles|Temperature only|Heat lost|Mass × height"]),
  ...M("Physics: P4 Atomic structure","Radiation",["Alpha|Helium nucleus; stopped by paper","Beta|Fast electron; stopped by aluminium","Gamma|EM wave; reduced by thick lead","Half-life|Time for half the nuclei to decay","Contamination|Radioactive atoms get onto or into something","Irradiation|Exposed to radiation from outside"]),
  ...S("Physics: P5 Forces","Scalar or vector?",{"Scalar (size only)":["Speed","Distance","Mass","Energy","Time"],"Vector (size and direction)":["Velocity","Displacement","Force","Acceleration","Weight","Momentum"]}),
  ...M("Physics: P5 Forces","Forces equations and laws",["W = mg|Weight = mass × gravitational field strength","F = ma|Newton’s second law","F = ke|Hooke’s law for a spring","W = Fs|Work done = force × distance","p = mv|Momentum = mass × velocity","Newton’s first law|No resultant force: no change in motion","Newton’s third law|Equal and opposite forces on two objects"]),
  ...Q("Physics: P5 Forces","Motion quick-fire",[
    "Gradient of a distance–time graph gives…|Speed|Acceleration|Distance|Force",
    "Area under a velocity–time graph gives…|Distance travelled|Acceleration|Speed|Force",
    "Stopping distance = thinking distance + …|Braking distance|Reaction time|Speed|Friction",
    "Terminal velocity is reached when…|Weight equals air resistance|The object stops|Speed doubles|Mass changes",
    "Typical reaction time?|0.2–0.9 s|2–3 s|0.01 s|5 s"]),
  ...L("Physics: P6 Waves","Label the wave","wave",["Crest","Trough","Wavelength","Amplitude","Rest position"]),
  ...O("Physics: P6 Waves","EM spectrum, longest wavelength first",["Radio","Microwaves","Infrared","Visible light","Ultraviolet","X-rays","Gamma rays"]),
  ...M("Physics: P6 Waves","EM waves and uses",["Radio waves|TV and radio","Microwaves|Satellite communication and cooking","Infrared|Heaters and remote controls","Visible light|Fibre optic communication","Ultraviolet|Energy-efficient lamps and sun tanning","X-rays|Medical imaging","Gamma rays|Sterilising equipment and treating cancer"]),
  ...Q("Physics: P6 Waves","Waves quick-fire",[
    "Wave speed = ?|Frequency × wavelength|Frequency ÷ wavelength|Amplitude × frequency|Wavelength ÷ time",
    "Sound is a…|Longitudinal wave|Transverse wave|EM wave|Standing wave only",
    "Light is a…|Transverse wave|Longitudinal wave|Sound wave|Mechanical wave"]),
  ...Q("Physics: P7 Magnetism","Magnetism quick-fire",[
    "Like poles…|Repel|Attract|Do nothing|Cancel out",
    "Field lines go from…|North to south|South to north|Centre outwards|Nowhere",
    "A solenoid with an iron core makes…|A stronger electromagnet|A battery|A motor only|A permanent magnet",
    "Force on a wire in a field (F = BIl) is called the…|Motor effect|Generator effect|Hooke effect|Doppler effect",
    "Fleming’s left-hand rule: the first finger shows…|Magnetic field|Current|Force|Motion"])
]},
{ id:"cs", name:"Computer Science", board:"Edexcel 1CP2", sets:[
  ...M("Computational thinking","Key terms",["Decomposition|Breaking a problem into smaller parts","Abstraction|Removing unnecessary detail","Algorithm|Step-by-step instructions to solve a problem","Linear search|Checks each item in turn","Binary search|Halves a sorted list each time","Bubble sort|Swaps adjacent items until sorted","Merge sort|Splits the list then merges in order"]),
  ...M("Computational thinking","Flowchart symbols",["Oval (terminator)|Start or end","Parallelogram|Input or output","Diamond|Decision","Rectangle|Process"]),
  ...Q("Computational thinking","Logic",[
    "A AND B is true when…|Both A and B are true|Either is true|Neither is true|Only A is true",
    "A OR B is false when…|Both A and B are false|Both are true|Only A is true|Only B is true",
    "NOT true = ?|False|True|Both|Neither",
    "Which search needs a sorted list?|Binary search|Linear search|Both|Neither"]),
  ...Q("Data","Binary and hex",[
    "Binary 1010 in denary?|10|12|8|5","Hex F in denary?|15|16|14|11","Denary 255 in hex?|FF|F0|EE|1FF",
    "How many bits in a byte?|8|4|16|10","A logical left shift of 1 place does what to an unsigned number?|Doubles it|Halves it|Adds 1|Nothing",
    "Range of 8-bit two’s complement?|−128 to 127|0 to 255|−127 to 128|−256 to 255",
    "Adding two numbers gives a result too big for the bits. This is…|Overflow|Underflow|Compression|Sampling"]),
  ...Q("Data","Images, sound and compression",[
    "Bitmap file size (bits) = ?|Width × height × colour depth|Width + height|Colour depth × 8|Height × 1024",
    "More samples per second in sound means…|Better quality, larger file|Smaller file|Louder sound|Lower quality",
    "Lossless compression…|Can rebuild the original exactly|Removes data forever|Only works on images|Makes files bigger",
    "Run-length encoding is…|Lossless|Lossy|Encryption|Not compression",
    "1 kibibyte (KiB) is…|1024 bytes|1000 bytes|8 bits|1024 bits"]),
  ...M("Computers","Computer systems",["ALU|Does calculations and logic","Control unit|Decodes instructions and directs the CPU","Registers|Tiny fast stores inside the CPU","Cache|Fast memory holding frequently used data","RAM|Volatile main memory for running programs","ROM|Non-volatile; holds start-up instructions","Compiler|Translates the whole program at once","Interpreter|Translates and runs one line at a time"]),
  ...O("Computers","Fetch–decode–execute in order",["The address in the program counter is copied to the MAR","The instruction is fetched from memory into the MDR","The program counter is increased","The control unit decodes the instruction","The instruction is executed"]),
  ...S("Computers","Sort the storage",{"Magnetic":["Hard disk drive","Magnetic tape"],"Optical":["CD","DVD","Blu-ray"],"Solid state":["USB flash drive","SSD","SD card"]}),
  ...M("Networks","Network protocols",["HTTP|Requests web pages","HTTPS|Secure, encrypted web pages","TCP/IP|Splits data into packets and routes them","SMTP|Sends email","IMAP|Keeps email on the server and syncs it","POP3|Downloads email to one device","FTP|Transfers files"]),
  ...O("Networks","TCP/IP layers, top first",["Application","Transport","Internet","Link"]),
  ...M("Networks","Threats and protection",["Phishing|Fake messages to steal details","Malware|Software designed to cause harm","Brute force|Trying every password","Denial of service|Flooding a server so it can’t respond","SQL injection|Malicious code typed into a web form","Firewall|Blocks unauthorised network traffic","Encryption|Scrambles data so it can’t be read","Penetration testing|Paid hackers find weaknesses"]),
  ...Q("Issues and impact","Issues and impact",[
    "Which law makes hacking illegal?|Computer Misuse Act|Data Protection Act|Copyright Act|Freedom of Information Act",
    "Which law controls how personal data is stored?|Data Protection Act / UK GDPR|Computer Misuse Act|Copyright Act|Equality Act",
    "Open-source software…|Has source code anyone can view and change|Always costs money|Can’t be shared|Has no licence",
    "An environmental issue with computing?|E-waste and energy use|Faster processors|Cloud storage|Wi-Fi",
    "Bias in AI often comes from…|Biased training data|Fast processors|Too much RAM|Encryption"]),
  ...C("Programming","Python: predict the output",[
    {code:"for i in range(3):\n    print(i)", q:"What does this print?", a:"0, 1, 2 (one per line)", w:["1, 2, 3","0, 1, 2, 3","3"]},
    {code:"x = 7\nif x > 5 and x < 10:\n    print(\"A\")\nelse:\n    print(\"B\")", q:"What does this print?", a:"A", w:["B","A then B","Nothing"]},
    {code:"total = 0\nfor n in range(1, 5):\n    total = total + n\nprint(total)", q:"What does this print?", a:"10", w:["15","4","5"]},
    {code:"def double(n):\n    return n * 2\n\nprint(double(4) + 1)", q:"What does this print?", a:"9", w:["10","8","5"]},
    {code:"names = [\"Ana\", \"Ben\", \"Cal\"]\nprint(names[1])", q:"What does this print?", a:"Ben", w:["Ana","Cal","1"]},
    {code:"word = \"shark\"\nprint(word[0:3])", q:"What does this print?", a:"sha", w:["shar","hark","s"]},
    {code:"count = 0\nwhile count < 3:\n    count = count + 1\nprint(count)", q:"What does this print?", a:"3", w:["2","0","4"]},
    {code:"grid = [[1, 2], [3, 4]]\nprint(grid[1][0])", q:"What does this print?", a:"3", w:["2","1","4"]},
    {code:"print(\"5\" + \"2\")\nprint(int(\"5\") + 2)", q:"What do the two lines print?", a:"52 then 7", w:["7 then 7","52 then 52","7 then 52"]},
    {code:"word = \"shark\"\nprint(len(word), word.upper())", q:"What does this print?", a:"5 SHARK", w:["5 shark","4 SHARK","SHARK 5"]}]),
  ...C("Programming","Python: spot the bug",[
    {code:"score = 10\nif score = 10:\n    print(\"Top\")", q:"Why does line 2 fail?", a:"It needs == to compare", w:["score must be a string","print needs brackets removed","10 must be in quotes"]},
    {code:"for i in range(5)\n    print(i)", q:"What is missing on line 1?", a:"A colon at the end", w:["Brackets around i","A semicolon","The word do"]},
    {code:"age = input(\"Age? \")\nprint(age + 1)", q:"Why does this crash?", a:"input gives a string; it needs int()", w:["age is a reserved word","print can’t add","The prompt is wrong"]},
    {code:"items = [4, 8, 15]\nprint(items[3])", q:"Why does this crash?", a:"Index 3 doesn’t exist; lists start at 0", w:["Lists can’t hold numbers","print can’t show lists","It needs items(3)"]},
    {code:"def greet(name):\nprint(\"Hi \" + name)", q:"What is wrong?", a:"The function body is not indented", w:["def should be func","name needs quotes","Hi needs no quotes"]}]),
  ...O("Programming","Python: order the lines to find the largest number",["numbers = [4, 9, 2]","biggest = numbers[0]","for n in numbers:","    if n > biggest:","        biggest = n","print(biggest)"])
]},
{ id:"geo", name:"Geography", board:"OCR B J384", sets:[
  ...Q("Global hazards","Weather hazards",[
    "Air rises at the equator, creating…|Low pressure and heavy rain|High pressure and drought|Snow|Calm, dry weather",
    "Deserts form around 30° north and south because of…|Sinking air and high pressure|Rising air|Ocean currents only|Mountains",
    "Tropical storms form over oceans warmer than…|27°C|10°C|0°C|40°C",
    "The three cells of global circulation?|Hadley, Ferrel, Polar|Hadley, Darwin, Polar|Ferrel, Tropic, Arctic|Jet, Ferrel, Polar",
    "A long period with much less rain than normal is…|Drought|Monsoon|Flood|Heatwave"]),
  ...Q("Global hazards","Tectonic hazards",[
    "What type of plate boundary is the San Andreas Fault?|Conservative|Destructive|Constructive|Collision",
    "Plates move apart at a…|Constructive boundary|Destructive boundary|Conservative boundary|Hotspot",
    "Oceanic crust sinks under continental crust at a…|Destructive boundary|Constructive boundary|Conservative boundary|Hotspot",
    "Which scale measures earthquake magnitude?|Moment magnitude scale|Beaufort scale|Saffir-Simpson scale|Celsius"]),
  ...L("Global hazards","Label the volcano","volcano",["Magma chamber","Main vent","Crater","Ash cloud","Lava flow","Layers of ash and lava"]),
  ...M("Changing climate","Climate change",["Ice cores|Trapped air shows past climate","Tree rings|Width shows past growing conditions","Milankovitch cycles|Changes in Earth’s orbit (natural)","Volcanic eruptions|Ash blocks sunlight and cools the Earth","Solar output|Changes in the Sun’s energy","Enhanced greenhouse effect|Extra gases from humans trap more heat","Quaternary period|The last 2.6 million years"]),
  ...M("Distinctive landscapes","Erosion and transport",["Hydraulic action|Force of water breaks rock apart","Abrasion|Rocks scraped against the bed or cliff","Attrition|Rocks knock into each other and get smaller","Solution|Rock dissolved by water","Traction|Large boulders rolled along","Saltation|Pebbles bounced along","Suspension|Fine material carried in the water","Longshore drift|Material moved along the coast by waves"]),
  ...S("Distinctive landscapes","River or coastal landform?",{"River":["Waterfall","Meander","Ox-bow lake","Levee","Floodplain"],"Coastal":["Spit","Stack","Arch","Headland","Wave-cut platform"]}),
  ...O("Distinctive landscapes","How a stack forms",["A crack in the headland is eroded","It widens into a cave","The cave breaks through to form an arch","The arch roof collapses, leaving a stack","The stack erodes into a stump"]),
  ...O("Sustaining ecosystems","Rainforest layers, top first",["Emergent","Canopy","Understorey","Shrub layer","Forest floor"]),
  ...Q("Sustaining ecosystems","Ecosystems quick-fire",[
    "Why are rainforest soils poor?|Nutrients are taken up quickly by plants|Too cold|Too dry|No decomposers",
    "Which is a cause of rainforest loss?|Cattle ranching|Ecotourism|Tree planting|Protected reserves",
    "Polar regions include the Arctic and…|Antarctica|The Sahara|Siberia only|The Amazon",
    "Sustainable management means…|Meeting needs now without harming the future|Banning all use|Using as much as possible|Only tourism"]),
  ...Q("Urban futures","Cities quick-fire",[
    "A megacity has more than…|10 million people|1 million people|500,000 people|50 million people",
    "Urbanisation is…|A growing share of people living in towns and cities|Moving to the countryside|Building roads|Population falling",
    "A push factor from rural areas?|Lack of jobs|Better schools in the city|City nightlife|Higher city wages",
    "Informal settlements are…|Unplanned homes built without permission|Luxury flats|Suburbs|Council estates"]),
  ...M("Dynamic development","Development",["AC|Advanced country","EDC|Emerging and developing country","LIDC|Low-income developing country","HDI|Combines life expectancy, education and income","GNI per capita|Income per person","Rostow|Model: countries pass through five stages","Frank|Dependency theory: rich countries keep poor ones poor","Bottom-up aid|Small local projects run with communities"]),
  ...Q("UK in the 21st century","UK quick-fire",[
    "The UK’s population is…|Ageing|Getting younger|Shrinking fast|Mostly rural",
    "A large part of the UK economy today is…|Services|Coal mining|Farming|Shipbuilding",
    "The UK is a permanent member of the…|UN Security Council|G2|African Union|OPEC"]),
  ...M("Resource reliance","Food and resources",["Food security|Everyone always has enough safe, nutritious food","Malthus|Population will outgrow food supply","Boserup|People invent ways to grow more food","Food miles|Distance food travels to reach you","Large-scale farming|High-tech, high-output, often for export","Small-scale farming|Local, low-tech, often for the family"]),
  ...O("Fieldwork","The enquiry process",["Set a question or hypothesis","Collect primary and secondary data","Present the data","Analyse the results","Reach a conclusion","Evaluate the method"])
]},
{ id:"re", name:"Religious Studies", board:"AQA 8062", sets:[
  ...M("Christianity: beliefs","Christian beliefs",["Omnipotent|All-powerful","Omnibenevolent|All-loving","Just|Fair; judges rightly","Trinity|Father, Son and Holy Spirit","Incarnation|God becoming human in Jesus","Atonement|Restoring the relationship between God and humans","Original sin|The sin inherited from Adam and Eve","Resurrection|Rising from the dead"]),
  ...O("Christianity: beliefs","Jesus’ final days in order",["Last Supper","Arrest","Crucifixion","Burial","Resurrection","Ascension"]),
  ...Q("Christianity: beliefs","Beliefs quick-fire",[
    "Which book contains the creation story?|Genesis|Exodus|Revelation|Acts",
    "Catholics believe a place of cleansing after death is…|Purgatory|Jannah|Limbo only|Sheol",
    "Salvation through God’s grace means it is…|A free gift from God|Earned by good works only|Bought|Only for priests",
    "John 1 calls Jesus…|The Word|The Lamb only|The Prophet|The Law"]),
  ...M("Christianity: practices","Christian practices",["Liturgical worship|Set order of service","Non-liturgical worship|Freer, Bible-centred service","Informal worship|Spontaneous, e.g. Quakers","Baptism|Sacrament of joining the Church","Eucharist|Holy Communion: bread and wine","Pilgrimage|Journey to a holy place (e.g. Lourdes, Iona)","Evangelism|Spreading the Christian faith","Ecumenism|Churches working together"]),
  ...S("Christianity: practices","Sacrament or not?",{"Sacrament (in most churches)":["Baptism","Eucharist"],"Not a sacrament":["Pilgrimage","Food bank volunteering","Christmas","Street pastors"]}),
  ...M("Islam: beliefs","Islamic beliefs",["Tawhid|The oneness of Allah","Risalah|Prophethood","Akhirah|Life after death","Al-Qadr|Predestination","Jibril|Angel who revealed the Qur’an","Jannah|Paradise","Jahannam|Hell","Imamah|Shi’a belief in the Imams as leaders"]),
  ...M("Islam: beliefs","Holy books and prophets",["Qur’an|Final revelation to Muhammad","Tawrat|Torah, given to Musa (Moses)","Zabur|Psalms, given to Dawud (David)","Injil|Gospel, given to Isa (Jesus)","Sahifah|Scrolls of Ibrahim","Muhammad|Seal of the prophets","Adam|First prophet"]),
  ...S("Islam: beliefs","Sunni or Shi’a?",{"Sunni: Six Articles of Faith":["Belief in angels","Predestination (al-Qadr)","Holy books"],"Shi’a: Five Roots (Usul ad-Din)":["Adalat (justice)","Imamah","Nubuwwah (prophethood)"]}),
  ...M("Islam: practices","Islamic practices",["Shahadah|Declaration of faith","Salah|Five daily prayers","Wudu|Washing before prayer","Jummah|Friday midday prayer","Sawm|Fasting during Ramadan","Zakah|Giving 2.5% of savings to the poor","Khums|Shi’a 20% tax","Hajj|Pilgrimage to Makkah"]),
  ...M("Islam: practices","Festivals and jihad",["Eid ul-Fitr|Ends the fast of Ramadan","Eid ul-Adha|Remembers Ibrahim’s willingness to sacrifice his son","Ashura|Shi’a remember Husayn’s death","Night of Power|First revelation of the Qur’an","Greater jihad|Inner struggle to live as a good Muslim","Lesser jihad|Outward struggle to defend Islam"]),
  ...O("Islam: practices","Hajj in order",["Enter ihram","Tawaf: circle the Ka’aba","Run between Safa and Marwah","Stand at Arafat","Stone the pillars at Mina","Celebrate Eid ul-Adha"]),
  ...M("Themes (check which 4 you study)","Theme A: relationships and families",["Cohabitation|Living together without marriage","Contraception|Preventing pregnancy","Divorce|Legal ending of a marriage","Remarriage|Marrying again after divorce or death","Same-sex marriage|Legal in the UK since 2014","Gender equality|Men and women treated as equal"]),
  ...M("Themes (check which 4 you study)","Theme B: religion and life",["Sanctity of life|Life is holy, given by God","Quality of life|How good or worthwhile a life is","Stewardship|Duty to care for the world","Dominion|Authority over nature","Euthanasia|Ending life to relieve suffering","Abortion|Ending a pregnancy","Big Bang|Scientific origin of the universe","Evolution|Species change over time"]),
  ...M("Themes (check which 4 you study)","Theme C: existence of God",["Design argument|The world is too complex to be chance (Paley’s watch)","First cause argument|Everything has a cause, so God started it (Aquinas)","Miracle|Event that breaks the laws of nature","Problem of evil|Why would a loving God allow suffering?","General revelation|God known through nature","Special revelation|God known through a direct experience"]),
  ...M("Themes (check which 4 you study)","Theme D: peace and conflict",["Just war|Rules for when war is right","Holy war|War fought for religious reasons","Pacifism|Belief that violence is always wrong","Terrorism|Violence to cause fear for a cause","Reconciliation|Restoring friendship after conflict","WMD|Weapons that kill huge numbers"]),
  ...M("Themes (check which 4 you study)","Theme E: crime and punishment",["Retribution|Making criminals pay for their crime","Deterrence|Putting others off committing crime","Reformation|Helping criminals change","Protection|Keeping society safe","Capital punishment|The death penalty","Forgiveness|Letting go of blame"]),
  ...M("Themes (check which 4 you study)","Theme F: human rights",["Prejudice|Judging without knowing the facts","Discrimination|Acting on prejudice","Social justice|Fair treatment for everyone in society","Human rights|Rights everyone has","Exploitation|Taking unfair advantage of people","Racism|Prejudice based on race"]),
  ...P("Exam technique","Plan a 12-mark ‘evaluate’ answer","‘Euthanasia should never be allowed.’ Evaluate this statement.",["Argument for: sanctity of life, only God takes life","Develop with a teaching or source","Argument against: quality of life, compassion (agape)","Develop with a different view","Christian AND Muslim views where relevant","Justified conclusion that weighs both sides"],["Agree","Develop","Disagree","Develop","Religious views","Conclusion"])
]},
{ id:"fr", name:"French", board:"AQA 8652 Higher", sets:[
  ...M("Theme 1: People and lifestyle","Identity and relationships",["le demi-frère|half-brother / stepbrother","s’entendre avec|to get on with","se disputer|to argue","le meilleur ami|best friend","bavard|chatty","drôle|funny","timide|shy","gentil|kind"]),
  ...M("Theme 1: People and lifestyle","Healthy living",["la santé|health","le sommeil|sleep","sain|healthy","malsain|unhealthy","éviter|to avoid","fumer|to smoke","les légumes|vegetables","en forme|fit / in shape"]),
  ...M("Theme 1: People and lifestyle","Education and work",["les devoirs|homework","l’emploi du temps|timetable","la matière|school subject","le lycée|sixth form / high school","l’apprentissage|apprenticeship","le stage|work experience","le métier|job / trade","gagner|to earn / to win"]),
  ...M("Theme 2: Popular culture","Free time",["le loisir|hobby / leisure","la lecture|reading","le jeu vidéo|video game","sortir|to go out","jouer de la guitare|to play the guitar","faire du vélo|to cycle","le dessin animé|cartoon","l’équipe|team"]),
  ...M("Theme 2: Popular culture","Customs and festivals",["la fête|festival / party","Noël|Christmas","Pâques|Easter","le jour de l’An|New Year’s Day","le cadeau|present","fêter|to celebrate","le feu d’artifice|firework","le 14 juillet|Bastille Day"]),
  ...M("Theme 2: Popular culture","Celebrity culture",["la vedette|star / celebrity","célèbre|famous","le chanteur|singer","le modèle|role model","les réseaux sociaux|social media","la célébrité|fame","l’influenceur|influencer"]),
  ...M("Theme 3: Communication and the world","Travel and tourism",["les vacances|holidays","à l’étranger|abroad","la plage|beach","le billet|ticket","réserver|to book","la gare|train station","l’hébergement|accommodation","le séjour|stay"]),
  ...M("Theme 3: Communication and the world","Media and technology",["le portable|mobile phone","télécharger|to download","l’écran|screen","en ligne|online","le harcèlement|bullying","envoyer|to send","le mot de passe|password","l’ordinateur|computer"]),
  ...M("Theme 3: Communication and the world","Environment and where people live",["le réchauffement climatique|global warming","les déchets|rubbish / waste","recycler|to recycle","gaspiller|to waste","protéger|to protect","la campagne|countryside","le quartier|neighbourhood","la ville|town / city"]),
  ...Q("Grammar","Tenses",[
    "‘J’ai mangé’ means…|I ate|I eat|I will eat|I would eat","‘Je vais aller’ means…|I am going to go|I went|I go|I used to go",
    "‘Je jouais’ is which tense?|Imperfect|Perfect|Future|Present","‘Je jouerai’ means…|I will play|I would play|I played|I was playing",
    "‘Je jouerais’ means…|I would play|I will play|I played|I play","Which verb takes être in the perfect tense?|aller|manger|jouer|finir",
    "‘Si j’avais de l’argent, j’…’ Which fits?|achèterais|achète|achèterai|ai acheté"]),
  ...M("Grammar","Negatives",["ne… pas|not","ne… jamais|never","ne… plus|no longer","ne… rien|nothing","ne… personne|nobody","ne… que|only"]),
  ...B("Grammar","Fill the gap",[
    "Je suis ___ en France l’année dernière (aller)|allé;allée|Perfect tense with être",
    "J’___ regardé un film hier|ai|Avoir in the perfect tense",
    "Demain, je ___ jouer au foot|vais|Near future: aller + infinitive",
    "Elle est ___ (partir)|partie|Agrees with elle",
    "Quand j’étais petit, je ___ au parc (aller, imperfect)|allais|Used to go",
    "Il ___ beau aujourd’hui (weather)|fait|Il ___ beau"]),
  ...S("Grammar","Avoir or être in the perfect tense?",{"être":["aller","venir","arriver","partir","tomber","rester","naître","mourir"],"avoir":["manger","jouer","regarder","finir","faire","boire"]})
]},
{ id:"dt", name:"Design & Technology", board:"Edexcel 1DT0", sets:[
  ...M("Core: new technologies and energy","New and emerging technologies",["Automation|Machines doing tasks with little human input","CAD|Computer-aided design","CAM|Computer-aided manufacture","Just-in-time|Stock arrives only when needed","Planned obsolescence|Designed to go out of date","Crowdfunding|Raising money from many people online","Lean manufacturing|Cutting waste in production"]),
  ...S("Core: new technologies and energy","Renewable or non-renewable energy?",{"Renewable":["Wind","Solar","Hydroelectric","Biomass","Tidal"],"Non-renewable":["Coal","Oil","Gas","Nuclear"]}),
  ...M("Core: materials","Modern and smart materials",["Shape memory alloy|Returns to its shape when heated","Thermochromic pigment|Changes colour with temperature","Photochromic pigment|Changes colour with light","Piezoelectric material|Makes a voltage when squeezed","QTC|Conducts when compressed","Graphene|One-atom-thick sheet of carbon; very strong","Kevlar|Technical textile used in body armour","Carbon fibre (CFRP)|Composite: light and very strong"]),
  ...S("Core: materials","Hardwood or softwood?",{"Hardwood":["Oak","Beech","Ash","Mahogany","Balsa"],"Softwood":["Pine","Cedar","Larch","Spruce"]}),
  ...S("Core: materials","Ferrous or non-ferrous?",{"Ferrous (contains iron)":["Mild steel","Cast iron","Stainless steel"],"Non-ferrous":["Aluminium","Copper","Brass","Zinc","Tin"]}),
  ...S("Core: materials","Thermoplastic or thermoset?",{"Thermoplastic":["Acrylic","HIPS","PET","Polypropylene","PVC"],"Thermoset":["Epoxy resin","Polyester resin","Melamine formaldehyde","Urea formaldehyde"]}),
  ...M("Core: materials","Boards and textiles",["MDF|Manufactured board, smooth surface","Plywood|Layers glued at right angles","Chipboard|Wood chips glued together, cheap","Corrugated card|Fluted layer for packaging","Foam board|Light board for models","Cotton|Natural plant fibre","Wool|Natural animal fibre, warm","Polyester|Synthetic fibre, durable"]),
  ...M("Core: mechanical devices","Motion and mechanisms",["Linear|Moving in a straight line","Rotary|Moving in a circle","Reciprocating|Back and forth in a line","Oscillating|Swinging back and forth in an arc","Cam and follower|Rotary to reciprocating","Rack and pinion|Rotary to linear","Bell crank|Changes direction of motion by 90°","Idler gear|Makes driver and driven gears turn the same way"]),
  ...S("Core: mechanical devices","Which class of lever?",{"First class (pivot in middle)":["See-saw","Scissors","Crowbar"],"Second class (load in middle)":["Wheelbarrow","Nutcracker","Bottle opener"],"Third class (effort in middle)":["Tweezers","Fishing rod","Arm lifting a weight"]}),
  ...Q("Core: mechanical devices","Calculations",[
    "Mechanical advantage = ?|Load ÷ effort|Effort ÷ load|Load × effort|Distance ÷ time",
    "Gear ratio = ?|Driven teeth ÷ driver teeth|Driver teeth ÷ driven teeth|Driver × driven|Driven − driver",
    "A 10-tooth driver turns a 40-tooth driven gear. Gear ratio?|4 : 1|1 : 4|10 : 1|1 : 40",
    "Ohm’s law: V = ?|I × R|I ÷ R|R ÷ I|I + R"]),
  ...S("Systems specialism","Input, process or output?",{"Input":["LDR","Thermistor","Push switch","Microswitch","PIR sensor"],"Process":["Microcontroller","555 timer","4017 decade counter","Transistor"],"Output":["LED","Buzzer","Motor","Speaker","Lamp"]}),
  ...M("Systems specialism","Components",["LDR|Resistance falls as light increases","Thermistor|Resistance falls as temperature rises","Astable 555|Produces a continuous on/off pulse","Monostable 555|Gives one timed pulse","Decade counter|Counts pulses, lighting outputs in turn","Transistor|Acts as a switch to drive larger loads","Diode|Lets current flow one way only","Resistor|Limits current, e.g. to protect an LED"]),
  ...O("Systems specialism","Making a PCB in order",["Design the circuit in CAD","Transfer the design to the board (photo-etching)","Etch away unwanted copper","Drill holes for components","Insert components","Solder and test"]),
  ...O("Designing","Iterative design in order",["Identify the need","Research and write a specification","Generate ideas","Model and test","Evaluate and improve","Make the final prototype"])
]}
];


/* ---------- depth layer ---------- */
const E = (topic,title,items) => [{type:"exam",topic,title,items}];
const add = (id, sets) => subjOf0(id).sets.push(...sets);
function subjOf0(id){ return SUBJECTS.find(x=>x.id===id); }
const LIT_AOS = ["Clear argument that answers the question","Covers the extract and the whole text","Short, embedded quotes","Zooms in on a word or method and names it","Explains the effect on the audience or reader","Links to context and the writer’s purpose","Accurate spelling, punctuation and grammar"];

add("lit", [
  ...B("Macbeth","Macbeth quote bank: Acts 1–2",[
    "When shall we three meet ___?|again|The witches, opening line",
    "So foul and ___ a day I have not seen|fair|Macbeth’s first line echoes the witches",
    "For brave Macbeth – well he deserves that ___|name|The Captain, Act 1",
    "Yet do I fear thy ___; It is too full o’ th’ milk of human kindness|nature|Lady Macbeth",
    "Come, you spirits that tend on mortal thoughts, ___ me here|unsex|Lady Macbeth’s soliloquy",
    "When you durst do it, then you were a ___|man|Lady Macbeth attacks his manhood",
    "A little ___ clears us of this deed|water|Lady Macbeth after the murder",
    "There’s ___ in men’s smiles|daggers|Donalbain"]),
  ...B("Macbeth","Macbeth quote bank: Acts 3–5",[
    "Thou canst not say I did it: never shake thy ___ locks at me|gory|Macbeth to Banquo’s ghost",
    "By the pricking of my thumbs, something ___ this way comes|wicked|Second witch",
    "Here’s the smell of the ___ still|blood|Lady Macbeth sleepwalking",
    "All the perfumes of ___ will not sweeten this little hand|arabia|Lady Macbeth sleepwalking",
    "Tomorrow, and tomorrow, and ___|tomorrow|Macbeth hears of his wife’s death",
    "Macduff was from his mother’s ___ untimely ripped|womb|The prophecy is twisted"]),
  ...T("Macbeth","Build the quote: Macbeth 2",["When you durst do it, then you were a man","A little water clears us of this deed","There’s daggers in men’s smiles","By the pricking of my thumbs, something wicked this way comes","Tomorrow, and tomorrow, and tomorrow"]),
  ...M("Macbeth","Who says it? Macbeth",["Fair is foul, and foul is fair|The witches","Unsex me here|Lady Macbeth","Is this a dagger which I see before me|Macbeth","There’s daggers in men’s smiles|Donalbain","This dead butcher and his fiend-like queen|Malcolm","Out, damned spot!|Lady Macbeth (sleepwalking)"]),
  ...M("Macbeth","Macbeth methods",["Soliloquy|A character alone, revealing private thoughts","Dramatic irony|The audience knows more than the characters","Aside|A short remark to the audience","Iambic pentameter|Nobles’ verse rhythm","Prose|Used by the Porter and the sleepwalking Lady Macbeth","Trochaic tetrameter|The witches’ chanting rhythm","Motif|A repeated image, e.g. blood, sleep, darkness"]),
  ...E("Macbeth","Exam: Macbeth (30 marks + 4 SPaG)",[
    {q:"Starting with the sleepwalking scene, how does Shakespeare present guilt in Macbeth? Write a full answer, then mark it.", marks:34, points:[...LIT_AOS,"Compares Lady Macbeth’s guilt with Macbeth’s"]},
    {q:"How does Shakespeare present Macbeth as a tyrant? Write a full answer, then mark it.", marks:34, points:[...LIT_AOS,"Shows how he changes from ‘brave Macbeth’"]}]),
  ...B("Jekyll and Hyde","Jekyll and Hyde quote bank",[
    "it partakes too much of the style of the day of ___|judgment;judgement|Enfield on asking questions",
    "a blind ___ of discoloured wall|forehead|The door, chapter 1",
    "if ever I read ___ signature upon a face|satan's;satans;satan’s|Utterson about Hyde",
    "such unscientific ___|balderdash|Lanyon on Jekyll’s ideas",
    "like a district of some city in a ___|nightmare|London in the fog",
    "The ___ still slept on the wing above the drowned city|fog|Setting",
    "the large, handsome face of Dr. Jekyll grew ___ to the very lips|pale|When Hyde is mentioned",
    "I have had a ___, and I shall never recover|shock|Lanyon",
    "My devil had been long caged, he came out ___|roaring|Jekyll’s statement",
    "Henry Jekyll stood at times ___ before the acts of Edward Hyde|aghast|Jekyll’s statement"]),
  ...T("Jekyll and Hyde","Build the quote: Jekyll and Hyde 2",["My devil had been long caged, he came out roaring","I have had a shock, and I shall never recover","like a district of some city in a nightmare","such unscientific balderdash"]),
  ...M("Jekyll and Hyde","Who says it? Jekyll and Hyde",["I incline to Cain’s heresy|Utterson","Such unscientific balderdash|Lanyon","Like some damned Juggernaut|Enfield","My devil had been long caged|Jekyll","Something troglodytic|Utterson"]),
  ...E("Jekyll and Hyde","Exam: Jekyll and Hyde (30 marks)",[
    {q:"Starting with the extract where Utterson first meets Hyde, how does Stevenson present Hyde as a threat to society?", marks:30, points:LIT_AOS.slice(0,6).concat(["Links Hyde to Victorian fears (degeneration, Darwin, hidden vice)"])},
    {q:"How does Stevenson use settings to create mystery and fear?", marks:30, points:LIT_AOS.slice(0,6).concat(["Uses fog, the door and night-time London"])}]),
  ...Q("An Inspector Calls","Key moments: who does what?",[
    "Who says the Titanic is unsinkable?|Mr Birling|Gerald|Eric|The Inspector",
    "Why did Mr Birling sack Eva?|She led a strike for higher wages|She stole money|She was late|She insulted Sheila",
    "Why did Sheila get Eva sacked from Milwards?|Jealousy and bad temper in the shop|Eva stole a dress|Eva was rude to Gerald|Mrs Birling told her to",
    "Where did Gerald meet Daisy Renton?|The Palace Bar|Milwards|The charity committee|Birling’s factory",
    "Why did Mrs Birling refuse Eva help?|Eva used the name ‘Mrs Birling’ and she was prejudiced|There was no money|Eva didn’t ask|Gerald asked her to",
    "What does Eric steal?|Money from his father’s office|Sheila’s ring|Gerald’s watch|Nothing",
    "What does Gerald find out after the Inspector leaves?|No Inspector Goole is on the police force|Eva is alive|Eric lied|Sheila called the police",
    "How does the play end?|A phone call says an inspector is coming|Gerald confesses|Eric is arrested|The Birlings apologise",
    "‘Goole’ sounds like…|Ghoul, a ghost|Gold|Goal|Gull",
    "What is Priestley’s message?|We are all responsible for each other|Business comes first|The young are foolish|Class never matters"]),
  ...M("An Inspector Calls","Methods in An Inspector Calls",["Dramatic irony|Birling’s Titanic and ‘no war’ claims","Stage directions|Lighting changes from pink and intimate to brighter and harder","Cliffhanger|Each act ends on a revelation","Entrances and exits|Eric walks in just as Mrs Birling blames the father","Mouthpiece|The Inspector speaks Priestley’s views","Cyclical structure|Ends as it began, with an inspector on the way"]),
  ...E("An Inspector Calls","Exam: An Inspector Calls (30 marks + 4 SPaG)",[
    {q:"How does Priestley present the differences between the older and younger generations?", marks:34, points:[...LIT_AOS.filter((_,i)=>i!==1),"Covers the whole play (no extract on this paper)","Shows how Sheila and Eric change and the parents don’t"]},
    {q:"How does Priestley use the Inspector to present ideas about society?", marks:34, points:[...LIT_AOS.filter((_,i)=>i!==1),"Covers the whole play (no extract on this paper)","Discusses the final speech and his mysterious nature"]}]),
  ...B("Power and Conflict","Pre-1914 poem quotes",[
    "Look on my works, ye ___, and despair!|mighty|Ozymandias",
    "sneer of cold ___|command|Ozymandias",
    "The lone and level ___ stretch far away|sands|Ozymandias, last line",
    "The ___-forg’d manacles I hear|mind|London",
    "Marks of weakness, marks of ___|woe|London",
    "Runs in ___ down palace walls|blood|London",
    "a huge ___, black and huge|peak|The Prelude",
    "Looking as if she were ___|alive|My Last Duchess",
    "I gave commands; Then all smiles stopped ___|together|My Last Duchess",
    "Into the valley of ___ rode the six hundred|death|The Charge of the Light Brigade",
    "Someone had ___|blundered|The Charge of the Light Brigade",
    "Theirs not to reason why, theirs but to do and ___|die|The Charge of the Light Brigade",
    "But ___ happens|nothing|Exposure, repeated line",
    "All their eyes are ___|ice|Exposure"]),
  ...M("Power and Conflict","Methods in the modern poems",["Remains|Casual, spoken voice; the memory won’t leave","Poppies|Domestic images mixed with images of war","War Photographer|Darkroom setting; controlled rhyme vs chaos","Tissue|Extended metaphor of paper and light","The Emigrée|The city personified as a loved one","Checking Out Me History|Dialect and refrains challenge British history teaching","Kamikaze|Third person and a shift to the daughter’s voice","Storm on the Island|Conversational voice; ends with a twist about fear","Bayonet Charge|Starts mid-action; nature images show panic"]),
  ...E("Power and Conflict","Exam: compare two poems (30 marks)",[
    {q:"Compare how poets present the effects of conflict in ‘Remains’ and one other poem.", marks:30, points:["Clear comparative argument","Compares throughout with linking words","Uses references from both poems","Analyses language","Analyses form and structure","Explains effects on the reader","Relevant context for both poems"]}]),
  ...E("Poetry skills","Exam: unseen poetry",[
    {q:"Unseen poem (24 marks): How does the poet present feelings about a place? Write 3 paragraphs on any short poem from a past paper, then mark it.", marks:24, points:["Clear argument about the poet’s feelings","Quotes from across the poem","Names and analyses language","Comments on structure (ending, shifts, stanza)","Explains effect on the reader","Personal, thoughtful interpretation"]},
    {q:"Comparing unseen poems (8 marks): compare the methods the two poets use.", marks:8, points:["Compares methods, not just ideas","Specific methods named in each poem","Short quotes from both","Explains how the methods differ in effect"]}])
]);

add("lang", [
  ...E("Paper 1","Exam: Paper 1 questions",[
    {q:"Q2 (8 marks): How does the writer use language to describe the setting? Use a past paper extract.", marks:8, points:["Two or three precise quotes","Names techniques correctly","Zooms in on single words","Explains effects in detail","Uses subject terminology accurately"]},
    {q:"Q3 (8 marks): How has the writer structured the text to interest you?", marks:8, points:["Comments on the opening","Comments on shifts in focus","Comments on the ending","Explains why the writer made each choice","Refers to the whole text, not just language"]},
    {q:"Q4 (20 marks): ‘The writer makes the scene feel tense.’ How far do you agree?", marks:20, points:["Clear judgement on the statement","Evaluates, not just describes","Well-chosen quotes","Analyses methods","Explains effect on the reader","Covers the whole set section"]}]),
  ...E("Paper 2","Exam: Paper 2 questions",[
    {q:"Q2 (8 marks): Summarise the differences between the two sources.", marks:8, points:["Clear differences stated","Quotes from both sources","Inferences: what each suggests","Uses linking words (whereas, however)"]},
    {q:"Q4 (16 marks): Compare how the two writers convey their perspectives.", marks:16, points:["Compares attitudes throughout","Analyses methods in both","Quotes from both","Explains how methods show the attitude","Considers context of each source"]},
    {q:"Q5 (40 marks): Write a speech for your school arguing that homework should be banned.", marks:40, points:["Correct form: addresses the audience","Clear viewpoint throughout","Range of persuasive techniques","Paragraphs with clear links","Varied sentence types and openings","Ambitious vocabulary","Accurate punctuation, including ; and :","Strong conclusion"]}])
]);

add("maths", [
  ...B("A-level prep: grade 9 stretch","Grade 8–9 problems (type the answer)",[
    "A rectangle is (x + 5) cm by x cm with area 84 cm². Find x.|7|Form and factorise a quadratic",
    "A circle has area 50π cm². Find its radius as a surd.|5√2;√50|r² = 50",
    "5 red and 3 blue counters. Two taken without replacement. P(both red) as a fraction?|5/14;20/56|5/8 × 4/7",
    "A cone has radius 3 cm and height 4 cm. Slant height in cm?|5|Pythagoras",
    "A line passes through (1, 3) and (4, 9). Equation in the form y = mx + c?|y = 2x + 1;y=2x+1|Gradient first",
    "Right-angled triangle: hypotenuse 10, angle 30°. Side opposite the angle?|5|sin 30° = 0.5",
    "45 km at 30 km/h, then 60 km at 40 km/h. Average speed in km/h?|35|Total distance ÷ total time",
    "Sector with radius 6 cm and angle 60°. Arc length as a multiple of π?|2π;2pi|(60/360) × 2π × 6",
    "Boys : girls = 3 : 5, with 24 more girls than boys. How many pupils?|96|2 parts = 24",
    "2000 bacteria grow 5% a year. How many after 3 years (nearest whole)?|2315|2000 × 1.05³",
    "Similar solids have volumes 27 cm³ and 64 cm³. Small area 18 cm². Large area?|32|Length ratio 3 : 4",
    "12 cm and 5 cm, each to the nearest cm. Upper bound of the area in cm²?|68.75|12.5 × 5.5"]),
  ...Q("A-level prep: grade 9 stretch","Grade 8–9 reasoning",[
    "A price rises 10%, then falls 10%. Overall change?|1% decrease|No change|1% increase|20% decrease",
    "Where do y = x² and y = x + 6 meet?|(3, 9) and (−2, 4)|(3, 9) only|(2, 4) and (−3, 9)|(6, 36) and (0, 0)",
    "If y is inversely proportional to x², and x doubles, y…|Is divided by 4|Halves|Doubles|Is multiplied by 4",
    "The discriminant b² − 4ac < 0 means…|No real solutions|One solution|Two solutions|Infinite solutions",
    "Area under a speed–time graph between 0 and 10 s with trapezia estimates…|Distance travelled|Acceleration|Average speed|Time",
    "Which proves 0.4̇5̇ = 5/11?|Let x = 0.4545…, 100x − x = 45, x = 45/99|Divide 5 by 11 on a calculator|Round to 0.45|Multiply by 10 once"])
]);

add("sci", [
  ...Q("A-level prep: Biology","Biology required practical methods",[
    "Osmosis: why blot the potato cylinders before weighing?|Remove surface water so only osmosis changes the mass|Make them heavier|Kill the cells|Stop diffusion",
    "Osmosis: why calculate percentage change in mass?|The cylinders start at different masses|It is easier|To include the water|To avoid units",
    "Enzyme practical: how do you know the starch has gone?|Iodine stays orange-brown|Iodine turns blue-black|Benedict’s turns red|Bubbles stop",
    "Photosynthesis practical: why put water between the lamp and pondweed?|To absorb heat and keep temperature constant|To add CO₂|To make light brighter|To feed the plant",
    "Reaction time: why repeat and take a mean?|Reduces the effect of anomalies|Makes it faster|Makes it accurate to 1 mm|It is required by law",
    "Microscopy: which lens should you start with?|The lowest power|The highest power|Any lens|No lens"]),
  ...Q("A-level prep: Physics","Physics required practical methods",[
    "Specific heat capacity: why wrap the block in insulation?|Reduce energy lost to the surroundings|Make it heat faster|Protect the thermometer|Increase the current",
    "Resistance of a wire: why switch off between readings?|The wire heats up and its resistance changes|To save the battery|To reset the ammeter|It is quicker",
    "Density of an irregular object: how is volume found?|Displacement using a eureka can|Length × width × height|Weighing it|Using a ruler",
    "Ripple tank: why measure 10 waves and divide by 10?|Reduces uncertainty in a small measurement|It looks neater|Waves are too fast to see|To get the frequency",
    "Acceleration practical: to test force only, you keep what constant?|The total mass|The force|The distance only|The speed",
    "Spring practical: why read the ruler at eye level?|Avoid parallax error|Reduce friction|Increase extension|Keep the spring still"]),
  ...Q("Chemistry: C4 Chemical changes","Chemistry required practical methods",[
    "Making a soluble salt: why add excess copper oxide to the acid?|To make sure all the acid reacts|To speed it up|To change the colour|To make more acid",
    "After adding excess copper oxide you…|Filter, then evaporate and crystallise|Distil it|Add more acid|Freeze it",
    "Chromatography: why draw the start line in pencil?|Pencil doesn’t dissolve in the solvent|It is darker|Ink is too slow|It is cheaper",
    "Disappearing cross experiment measures rate by…|Time for the cross to disappear|Mass lost|Gas volume|Temperature",
    "Temperature-change practical: why use a polystyrene cup with a lid?|Reduce energy lost to the surroundings|It is cheaper|To stir better|To weigh it",
    "How do you get pure water from salt water?|Distillation|Filtration|Chromatography|Crystallisation"]),
  ...E("A-level prep: Biology","Exam: 6-mark Biology",[
    {q:"Describe how you would investigate the effect of pH on the rate of amylase activity. (6)", marks:6, points:["Mix amylase with buffer solution at one pH","Add starch and start the timer","Take samples every 30 s onto spotting tile with iodine","Record time until iodine stays orange-brown","Repeat at different pH values","Control: same temperature (water bath), volumes and concentrations"]},
    {q:"Explain how antibiotic-resistant bacteria develop. (6)", marks:6, points:["Random mutation makes some bacteria resistant","Antibiotic kills non-resistant bacteria","Resistant bacteria survive","They reproduce and pass on the resistant gene","Population of resistant bacteria increases","Made worse by overuse or not finishing courses"]},
    {q:"Explain how the body responds when blood glucose is too high. (4)", marks:4, points:["Pancreas detects the high level","Pancreas releases insulin","Insulin makes glucose move from blood into cells","Liver and muscle store excess as glycogen"]},
    {q:"Compare aerobic and anaerobic respiration in muscles. (6)", marks:6, points:["Aerobic uses oxygen; anaerobic does not","Aerobic makes CO₂ and water","Anaerobic makes lactic acid","Aerobic releases much more energy","Anaerobic happens in intense exercise","Anaerobic creates an oxygen debt"]}]),
  ...E("A-level prep: Physics","Exam: 6-mark Physics",[
    {q:"Describe how to find the specific heat capacity of a metal block. (6)", marks:6, points:["Measure the mass of the block","Insert heater and thermometer; insulate","Record starting temperature","Measure energy with a joulemeter (or V, I and time)","Record final temperature after a set time","Use c = ΔE ÷ (m × Δθ)"]},
    {q:"Describe how to find the density of an irregular object. (6)", marks:6, points:["Measure mass on a balance","Fill a eureka can to the spout","Lower the object in gently","Collect displaced water in a measuring cylinder","Volume of water = volume of object","Density = mass ÷ volume"]},
    {q:"Explain why a skydiver reaches terminal velocity. (4)", marks:4, points:["At first weight is greater than air resistance","So the skydiver accelerates","Air resistance increases with speed","Forces balance: resultant force zero, constant speed"]}]),
  ...E("Chemistry: C2 Bonding","Exam: 6-mark Chemistry",[
    {q:"Explain why graphite conducts electricity but diamond does not. (4)", marks:4, points:["In graphite each carbon bonds to 3 others","Leaving one delocalised electron per atom","Delocalised electrons carry charge through the structure","In diamond all 4 outer electrons are in bonds, none free"]},
    {q:"Describe how to make pure, dry crystals of copper sulfate. (6)", marks:6, points:["Warm sulfuric acid","Add copper oxide until in excess","Filter to remove unreacted copper oxide","Heat the solution to evaporate some water","Leave to cool and crystallise","Pat crystals dry"]},
    {q:"Explain the trend in reactivity down Group 1. (4)", marks:4, points:["Reactivity increases down the group","Outer electron is further from the nucleus","Less attraction (more shielding)","Outer electron lost more easily"]}])
]);

add("re", [
  ...E("Exam technique","Exam: RE short and long answers",[
    {q:"Explain two ways Muslims observe Sawm. (4)", marks:4, points:["First way stated","First way developed with detail","Second way stated","Second way developed"]},
    {q:"Explain two Christian beliefs about the afterlife. Refer to scripture or sacred writings. (5)", marks:5, points:["First belief stated","First belief developed","Second belief stated","Second belief developed","Relevant scripture or teaching"]},
    {q:"‘The most important duty for a Muslim is Salah.’ Evaluate this statement. (12 + 3 SPaG)", marks:15, points:["Argument for, with reasoning","Argument for, developed","Argument against, with reasoning","Argument against, developed","Religious teachings referred to","Justified conclusion","Accurate SPaG and specialist terms"]}])
]);

add("geo", [
  ...E("Global hazards","Exam: extended answers",[
    {q:"Explain why the impacts of a tectonic hazard are often greater in an LIDC than an AC. (6)", marks:6, points:["Weaker buildings collapse more easily","Less money for prediction and warning systems","Fewer emergency services and slower response","Poorer healthcare means more deaths","Uses a named example","Clear explanation linking cause to impact"]},
    {q:"Evaluate the evidence that climate change is caused by human activity. (8)", marks:8, points:["Natural causes explained","Human causes explained","Evidence named (ice cores, records)","Weighs up both sides","Specific data or examples","Clear conclusion","Uses geographical terms"]}])
]);

add("cs", [
  ...E("Networks","Exam: extended answers",[
    {q:"A school wants to protect its network. Discuss the methods it could use. (6)", marks:6, points:["Firewall to filter traffic","Strong passwords and authentication","Encryption of data","Access levels for different users","Regular updates and anti-malware","Weighs up how effective each is"]}])
]);

add("dt", [
  ...E("Core: materials","Exam: extended answers",[
    {q:"Evaluate the use of a thermoplastic for a child’s toy. (6)", marks:6, points:["Can be moulded into complex shapes","Durable and hard-wearing","Easy to colour","Can be recycled","Environmental impact of oil-based plastics","Justified conclusion"]}])
]);

add("sci", [
  ...Q("Real world: skate, bass and games","Physics of skating and bass",[
    "A 50 kg skater rolls at 4 m/s. Kinetic energy?|400 J|200 J|100 J|800 J",
    "A 50 kg skater stands at the top of a 2 m ramp (g = 9.8 N/kg). GPE?|980 J|100 J|490 J|9 800 J",
    "Ignoring friction, speed at the bottom of a 2 m drop (v = √(2gh))?|About 6.3 m/s|2 m/s|19.6 m/s|4 m/s",
    "Pushing back on the ground moves the skater forward. Which law?|Newton’s third law|Newton’s first law|Hooke’s law|Ohm’s law",
    "Why bend your knees when landing a drop?|More time to stop means a smaller force|It adds momentum|It makes you lighter|It reduces gravity",
    "A bass low E string vibrates at about 41 Hz. Wavelength in air (340 m/s)?|About 8.3 m|0.12 m|381 m|41 m",
    "Fretting higher up the neck shortens the string, so the note…|Gets higher (higher frequency)|Gets lower|Stays the same|Only gets louder",
    "Turning up the amp makes the sound wave’s…|Amplitude bigger|Frequency higher|Wavelength longer|Speed faster",
    "A 100 W amp plays a 3-minute song. Energy used?|18 000 J|300 J|1 800 J|33 J",
    "A bass pickup works because a vibrating steel string near a magnet…|Induces a potential difference in the coil|Makes light|Heats the coil|Stops the string",
    "Skate bearings spin more freely with lubricant because it…|Reduces friction|Adds mass|Increases weight|Stores energy",
    "Grip tape uses…|Friction|Magnetism|Static electricity|Buoyancy"])
]);
add("maths", [
  ...Q("Real world: skate, bass and games","Maths in games, gigs and ramps",[
    "A game runs at 60 frames per second. One frame lasts (ms, 1 dp)?|16.7|6.0|1.7|60.0",
    "A ramp rises 1.2 m over 3 m horizontally. Angle (nearest degree)?|22°|24°|68°|40°",
    "A deck costs £60 after 25% off. Original price?|£80|£75|£85|£45",
    "You win 3 out of 5 Rocket League matches. Expected wins in 40?|24|15|30|8",
    "A £1200 gaming PC: the graphics card is 35%. Cost?|£420|£350|£780|£35",
    "Gig tickets rise from £40 to £46. Percentage increase?|15%|6%|13%|46%",
    "24 anime episodes of 23 minutes each. Total time?|9 h 12 min|9 h 20 min|8 h 52 min|5 h 52 min",
    "A bass has 4 strings and 20 frets. Fretted positions in total?|80|24|16|400",
    "A mini ramp’s curve is a quarter circle of radius 1.5 m. Curve length (1 dp)?|2.4 m|4.7 m|1.5 m|9.4 m",
    "A kickflip lands 7 times in 10 tries. P(land two in a row), independent?|0.49|0.7|1.4|0.07"])
]);
add("cs", [
  ...C("Real world: skate, bass and games","Python: game logic",[
    {code:"health = 100\nfor hit in range(3):\n    health = health - 15\nprint(health)", q:"What does this print?", a:"55", w:["85","70","45"]},
    {code:"xp = 250\nlevel = 1\nif xp >= 200:\n    level = level + 1\nprint(level)", q:"What does this print?", a:"2", w:["1","250","201"]},
    {code:"bands = [\"Mastodon\", \"Meshuggah\", \"Gojira\"]\nfor b in bands:\n    if b[0] == \"M\":\n        print(b)", q:"What does this print?", a:"Mastodon and Meshuggah", w:["Gojira","All three","Nothing"]},
    {code:"tricks = {\"ollie\": 10, \"kickflip\": 25}\nprint(tricks[\"kickflip\"] * 2)", q:"What does this print?", a:"50", w:["25","kickflipkickflip","An error"]},
    {code:"score = 0\nwhile score < 100:\n    score = score + 30\nprint(score)", q:"What does this print?", a:"120", w:["100","90","30"]},
    {code:"name = \"orange\"\nprint(name[::-1])", q:"What does this print?", a:"egnaro", w:["orange","o","ORANGE"]}]),
  ...Q("Real world: skate, bass and games","Data in games and music",[
    "A 1920 × 1080 frame at 24-bit colour is how many bits?|49 766 400|2 073 600|6 220 800|1 944 000",
    "Why does a music file get bigger at a higher sample rate?|More samples are stored each second|The song is longer|The volume is higher|It is compressed",
    "MP3 music is compressed with…|Lossy compression|Lossless compression|No compression|Encryption",
    "Online games send data in small chunks called…|Packets|Pixels|Bytes only|Frames"])
]);
add("fr", [
  ...M("Real world: skate, bass and games","My interests in French",["faire du skate|to skateboard","jouer de la basse|to play bass","le groupe|band","le concert|gig / concert","la musique métal|metal music","le jeu vidéo|video game","la console|games console","le dessin animé japonais|anime"]),
  ...B("Real world: skate, bass and games","Talk about yourself",[
    "Je joue ___ la basse depuis trois ans|de|Jouer de + instrument",
    "Je ___ du skate le week-end|fais|Faire du skate",
    "Ma couleur préférée est l’___|orange|Easy one",
    "Hier, j’___ joué aux jeux vidéo pendant deux heures|ai|Perfect tense",
    "L’année prochaine, je ___ aller à un concert de métal|vais|Near future"])
]);

add("sci", [
  ...Q("Real world: engineering","Aeronautical and rollercoaster physics",[
    "The four forces on a plane in flight?|Lift, weight, thrust and drag|Lift, mass, speed and friction|Thrust, gravity, momentum and pressure|Weight, friction, tension and drag",
    "A plane flies level at a steady speed. Resultant force?|Zero|Equal to thrust|Equal to lift|Upwards",
    "To speed up along the runway, thrust must be…|Greater than drag|Equal to drag|Less than drag|Zero",
    "A jet pushes hot gas backwards and the plane moves forwards. Which law?|Newton’s third law|Newton’s first law|Hooke’s law|Ohm’s law",
    "A 80 000 kg plane: thrust 240 000 N, drag 80 000 N. Acceleration?|2 m/s²|3 m/s²|4 m/s²|0.5 m/s²",
    "A 600 kg coaster train at the top of a 50 m hill (g = 9.8 N/kg). GPE?|294 000 J|30 000 J|29 400 J|2 940 J",
    "If that GPE all becomes KE, speed at the bottom (v = √(2gh))?|About 31 m/s|50 m/s|980 m/s|9.8 m/s",
    "Why is each coaster hill lower than the one before?|Energy is transferred to the surroundings by friction and air resistance|Gravity gets weaker|The train loses mass|Speed always increases",
    "A chain lift raises a 6 000 N train 40 m in 30 s. Power?|8 000 W|240 000 W|200 W|7 200 W",
    "Coaster brakes slow the train by…|Transferring kinetic energy to thermal energy|Destroying energy|Reducing mass|Adding GPE",
    "Riders feel heavier at the bottom of a dip because…|The seat pushes up with more force than their weight|Gravity increases|Their mass increases|Air pushes down"]),
  ...O("Real world: engineering","Rollercoaster energy in order",["The chain lift does work on the train","The train has its most GPE at the top","GPE transfers to KE on the drop","The train is fastest at the lowest point","Some energy is lost as heat and sound","Brakes transfer the remaining KE to thermal energy"])
]);
add("maths", [
  ...Q("Real world: engineering","Maths for engineers",[
    "A coaster track drops 30 m over 40 m horizontally. Length of the straight drop?|50 m|70 m|10 m|35 m",
    "Angle of that drop (nearest degree)?|37°|53°|30°|45°",
    "A loop is a circle of diameter 20 m. Track length of one loop (nearest m)?|63 m|31 m|126 m|314 m",
    "A plane flies 600 km in 45 minutes. Speed in km/h?|800|450|13.3|750",
    "A bridge drawing is at scale 1 : 500. A 12 cm line represents…|60 m|6 m|600 m|12 m",
    "A plane accelerates from rest at 2 m/s² for 30 s. Speed?|60 m/s|15 m/s|30 m/s|120 m/s",
    "A model wing is at scale 1 : 20. The real wing’s area is how many times bigger?|400|20|40|8 000",
    "The bearing from airport A to B is 070°. Bearing from B back to A?|250°|110°|290°|070°"])
]);
add("dt", [
  ...Q("Real world: engineering","Civil engineering and structures",[
    "A loaded beam bridge: its bottom edge is in…|Tension|Compression|Torsion|Shear only",
    "Concrete is strong in…|Compression|Tension|Torsion|Bending",
    "Why put steel bars in concrete beams?|Steel is strong in tension|To make it lighter|To conduct heat|For colour",
    "Why are trusses made of triangles?|A triangle can’t change shape unless a side changes length, so it’s rigid|They are cheaper|They look better|They are lighter only",
    "An arch bridge carries its load mainly through…|Compression|Tension|Magnetism|Torsion",
    "The main cables of a suspension bridge are in…|Tension|Compression|Shear|Torsion",
    "Why do bridges have expansion joints?|Materials expand and contract with temperature|For drainage|To save steel|For decoration",
    "Which material suits a lightweight aircraft frame?|Aluminium alloy or carbon fibre|Cast iron|Concrete|Oak"])
]);

