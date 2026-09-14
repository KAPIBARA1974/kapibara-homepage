const challenges=[
["30 perc telefon nélkül.","Tedd félre a telefonod. Kapcsold ki az értesítéseket, és tölts el fél órát úgy, hogy nem nézed meg."],
["20 perc séta cél nélkül.","Nem edzés, nem bevásárlás, nem ügyintézés. Csak séta. Figyeld meg, mi történik körülötted."],
["Igyál meg egy kávét vagy teát képernyő nélkül.","Ne telefonozz, ne dolgozz, ne olvass. Csak idd meg, és figyeld meg az ízét."],
["Ülj le 5 percre és ne csinálj semmit.","Nem kell meditálnod. Nem kell teljesítened. Csak ülj és lélegezz."],
["Vacsorázz képernyő nélkül.","Tedd el a telefont, kapcsold ki a tévét, és figyelj arra, akivel együtt vagy."],
["Menj ki 10 percre a természetbe.","Nézz körül. Hallgasd meg a környezeted. Ne fényképezz, ne posztolj. Csak legyél ott."],
["Ma egy feladatot csinálj egyszerre.","Kapcsold ki a fölösleges füleket és értesítéseket. Egy dolog. Aztán a következő."]
];
let ci=Number(localStorage.getItem("capyChallenge")||0),done=Number(localStorage.getItem("capyWeek")||0);
const $=s=>document.querySelector(s);
function renderChallenge(){ $("#challenge-title").textContent=challenges[ci][0];$("#challenge-text").textContent=challenges[ci][1];$("#progress").style.width=Math.min(done/7*100,100)+"%";$("#status").textContent=`${done} / 7 teljesítve ezen a héten`; }
$("#next").onclick=()=>{ci=(ci+1)%challenges.length;localStorage.setItem("capyChallenge",ci);renderChallenge();toast("🦫 Új kihívás érkezett.");};
$("#done").onclick=()=>{done=Math.min(7,done+1);localStorage.setItem("capyWeek",done);renderChallenge();toast("✓ Szép volt. Egy apró lépés is számít.");};renderChallenge();

const articles=[
{cat:"Digitális",title:"Mi történik, ha egy órára eltűnsz a telefonodból?",body:"Az első percekben furcsa lehet. Aztán feltűnhet, mennyi apró üres hely marad a figyelmedben. Egy óra telefon nélkül egyszerű gyakorlat arra, hogy újra te döntsd el, mire figyelsz."},
{cat:"Lélek",title:"Miért érezzük bűntudatosnak a semmittevést?",body:"Mert megtanultuk, hogy az idő akkor értékes, ha eredményt termel. Pedig a pihenés nem jutalom a teljesítmény után. A regeneráció az élet része."},
{cat:"Természet",title:"A séta, aminek nincs célja",body:"Próbáld ki egyszer, hogy nem számolod a lépéseket, nem méred a tempót, és nem tartasz sehová. A cél nélküli séta visszaad valamit a nézelődés öröméből."},
{cat:"Egyszerűbb",title:"A kevesebb néha tényleg több",body:"Nem kell minimalista otthont létrehoznod egyik napról a másikra. Kezdd egyetlen fiókkal, polccal vagy digitális mappával. A könnyebb környezet könnyebb figyelmet adhat."},
{cat:"Test",title:"A pihenés a tested része, nem hibája",body:"A regeneráció nem időpazarlás. A mozgás, az alvás és a pihenés nem egymás ellen dolgoznak, hanem együtt tartják működésben a rendszert."},
{cat:"Kapcsolódás",title:"Tíz perc valódi figyelem",body:"Próbálj meg ma tíz percig úgy beszélgetni valakivel, hogy közben a telefonod nincs a közelben. Nem kell nagy beszélgetés. Csak valódi figyelem."}
];
let cat="Mind",query="";
function renderArticles(){const box=$("#articles"),empty=$("#empty");let list=articles.filter(a=>(cat==="Mind"||a.cat===cat)&&(`${a.title} ${a.body} ${a.cat}`.toLowerCase().includes(query.toLowerCase())));box.innerHTML=list.map((a,i)=>`<article><span class="tag">${a.cat}</span><h3>${a.title}</h3><p>${a.body}</p><a href="#" data-read="${articles.indexOf(a)}">Elolvasom →</a></article>`).join("");empty.style.display=list.length?"none":"block";box.querySelectorAll("[data-read]").forEach(x=>x.onclick=e=>{e.preventDefault();const a=articles[+x.dataset.read];$("#mcat").textContent=a.cat;$("#mtitle").textContent=a.title;$("#mbody").textContent=a.body;$("#modal").classList.add("open");});}
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");cat=b.dataset.cat;renderArticles()});
$("#search").oninput=e=>{query=e.target.value;renderArticles()};
document.querySelectorAll("[data-filter]").forEach(a=>a.onclick=()=>{cat=a.dataset.filter;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x.dataset.cat===cat));renderArticles()});
renderArticles();
$("#close").onclick=()=>$("#modal").classList.remove("open");$("#modal").onclick=e=>{if(e.target.id==="modal")$("#modal").classList.remove("open")};
const nav=document.querySelector(".nav");$(".hamb").onclick=()=>nav.classList.toggle("open");document.querySelectorAll(".nav a").forEach(a=>a.onclick=()=>nav.classList.remove("open"));
$("#signup").onsubmit=e=>{e.preventDefault();e.target.reset();toast("🦫 Feliratkozás rögzítve — ebben a demóban csak helyben működik.");};
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2400)}
$("#year").textContent=new Date().getFullYear();
