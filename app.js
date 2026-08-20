(() => {
"use strict";

const PRESETS = {
  CZ:{locale:"cs-CZ",currency:"CZK",xlsxFilename:"Calculator_Data_CZ.xlsx",
    texts:{title:"Práce navíc, kde si výši výdělku určujete sami",subtitle:"Spočítejte si orientační měsíční provizi podle počtu klientů.",client_question:"Kolik času týdně můžete této práci věnovat?",slider_min_label:"15 h/týden",slider_max_label:"37,5+ h/týden",badge:"ORIENTAČNÍ VÝPOČET",commission_title:"Odhad provize",monthly_commission:"měsíční provize",clients_label:"Počet klientů",time_label:"Časová náročnost",note:"Výpočet je orientační a slouží pouze pro prezentaci možností výdělku obchodního zástupce.",top_performer_label:"TOP PERFORMER",top_performer_description:"Nejvyšší měsíční provize (H1 2026)",benefits_title:"Co dalšího získáte",cta_text:"Mám zájem o spolupráci",cta_url:"https://example.com/cz-career",cta_target:"_blank"},
    tiers:[{range:"40–60 klientů",time:"15 h/týden",commission:9000,top:18000},{range:"61–110 klientů",time:"15–25 h/týden",commission:19000,top:32000},{range:"111–150 klientů",time:"25–37,5 h/týden",commission:28000,top:40000},{range:"151+ klientů",time:"37,5+ h/týden",commission:43000,top:55000}],
    benefits:["Flexibilní pracovní doba","Možnost přivýdělku i při zaměstnání","Výdělek podle vlastní aktivity"]},
  EN:{locale:"en-GB",currency:"GBP",xlsxFilename:"Calculator_Data_EN.xlsx",
    texts:{title:"Extra work where you decide how much you earn",subtitle:"Calculate your estimated monthly commission based on the number of clients.",client_question:"How much time can you dedicate per week?",slider_min_label:"15 hrs/week",slider_max_label:"37.5+ hrs/week",badge:"INDICATIVE ESTIMATE",commission_title:"Commission estimate",monthly_commission:"monthly commission",clients_label:"Number of clients",time_label:"Time commitment",note:"The calculation is indicative and is intended only to demonstrate the earning potential of a field sales representative.",top_performer_label:"TOP PERFORMER",top_performer_description:"Best monthly commission (H1 2026)",benefits_title:"What else you get",cta_text:"I’m interested in cooperation",cta_url:"https://example.com/en-career",cta_target:"_blank"},
    tiers:[{range:"40–60 clients",time:"15 hrs/week",commission:300,top:600},{range:"61–110 clients",time:"15–25 hrs/week",commission:650,top:1100},{range:"111–150 clients",time:"25–37.5 hrs/week",commission:950,top:1400},{range:"151+ clients",time:"37.5+ hrs/week",commission:1450,top:1900}],
    benefits:["Flexible working hours","Opportunity to earn extra income alongside employment","Earnings based on your own activity"]},
  PL:{locale:"pl-PL",currency:"PLN",xlsxFilename:"Calculator_Data_PL.xlsx",
    texts:{title:"Dodatkowa praca, w której sam decydujesz o wysokości zarobków",subtitle:"Oblicz orientacyjną miesięczną prowizję na podstawie liczby klientów.",client_question:"Ile czasu tygodniowo możesz poświęcić na tę pracę?",slider_min_label:"15 godz./tydz.",slider_max_label:"37,5+ godz./tydz.",badge:"ORIENTACYJNE WYLICZENIE",commission_title:"Szacowana prowizja",monthly_commission:"miesięczna prowizja",clients_label:"Liczba klientów",time_label:"Czas pracy",note:"Wyliczenie ma charakter orientacyjny i służy wyłącznie do przedstawienia możliwości zarobkowych przedstawiciela handlowego w terenie.",top_performer_label:"TOP PERFORMER",top_performer_description:"Najwyższa miesięczna prowizja (H1 2026)",cta_text:"Jestem zainteresowany współpracą",cta_url:"https://example.com/pl-career",cta_target:"_blank"},
    tiers:[{range:"40–60 klientów",time:"15 godz./tydz.",commission:1200,top:2200},{range:"61–110 klientów",time:"15–25 godz./tydz.",commission:2600,top:4300},{range:"111–150 klientów",time:"25–37,5 godz./tydz.",commission:3800,top:5500},{range:"151+ klientów",time:"37,5+ godz./tydz.",commission:5800,top:8000}],
    benefits:["Elastyczne godziny pracy","Możliwość dodatkowego zarobku przy jednoczesnym zatrudnieniu","Zarobki zależne od własnej aktywności"]},
  RO:{locale:"ro-RO",currency:"RON",xlsxFilename:"Calculator_Data_RO.xlsx",
    texts:{title:"Lucrează suplimentar și decide singur cât câștigi",subtitle:"Calculează comisionul lunar estimativ în funcție de numărul de clienți.",client_question:"Cât timp poți aloca acestei activități pe săptămână?",slider_min_label:"15 ore/săptămână",slider_max_label:"37,5+ ore/săptămână",badge:"CALCUL ESTIMATIV",commission_title:"Comision estimat",monthly_commission:"comision lunar",clients_label:"Număr de clienți",time_label:"Timp alocat",note:"Calculul este orientativ și are doar scopul de a prezenta posibilitățile de câștig ale unui reprezentant de vânzări pe teren.",top_performer_label:"TOP PERFORMER",top_performer_description:"Cel mai mare comision lunar (H1 2026)",cta_text:"Sunt interesat de colaborare",cta_url:"https://example.com/ro-career",cta_target:"_blank"},
    tiers:[{range:"40–60 clienți",time:"15 ore/săptămână",commission:1500,top:2800},{range:"61–110 clienți",time:"15–25 ore/săptămână",commission:3200,top:5200},{range:"111–150 clienți",time:"25–37,5 ore/săptămână",commission:4700,top:6800},{range:"151+ clienți",time:"37,5+ ore/săptămână",commission:7200,top:9800}],
    benefits:["Program de lucru flexibil","Posibilitatea de a obține venituri suplimentare în paralel cu un alt loc de muncă","Câștiguri în funcție de propria activitate"]},
  HU:{locale:"hu-HU",currency:"HUF",xlsxFilename:"Calculator_Data_HU.xlsx",
    texts:{title:"Vállalj plusz munkát, és döntsd el, mennyit keresel",subtitle:"Számítsd ki a becsült havi jutalékodat az ügyfelek száma alapján.",client_question:"Hetente mennyi időt tudsz erre a munkára fordítani?",slider_min_label:"15 óra/hét",slider_max_label:"37,5+ óra/hét",badge:"TÁJÉKOZTATÓ SZÁMÍTÁS",commission_title:"Becsült jutalék",monthly_commission:"havi jutalék",clients_label:"Ügyfelek száma",time_label:"Időráfordítás",note:"A számítás tájékoztató jellegű, és kizárólag a területi értékesítési képviselő lehetséges kereseti lehetőségeit szemlélteti.",top_performer_label:"TOP PERFORMER",top_performer_description:"Legmagasabb havi jutalék (H1 2026)",cta_text:"Érdekel az együttműködés",cta_url:"https://example.com/hu-career",cta_target:"_blank"},
    tiers:[{range:"40–60 ügyfél",time:"15 óra/hét",commission:120000,top:220000},{range:"61–110 ügyfél",time:"15–25 óra/hét",commission:250000,top:420000},{range:"111–150 ügyfél",time:"25–37,5 óra/hét",commission:370000,top:560000},{range:"151+ ügyfél",time:"37,5+ óra/hét",commission:570000,top:820000}],
    benefits:["Rugalmas munkaidő","Plusz jövedelem lehetősége munkaviszony mellett is","A kereseted a saját aktivitásodtól függ"]}
};

const TEXT_FIELDS = [
  ["title","Headline",true],["subtitle","Subtitle",true],["client_question","Time commitment question",false],["benefits_title","Benefits heading",false],
  ["badge","Calculation badge",false],["commission_title","Commission title",false],["monthly_commission","Monthly commission label",false],
  ["clients_label","Number of clients label",false],["time_label","Time commitment label",false],["slider_min_label","Slider minimum label (shown below slider)",false],["slider_max_label","Slider maximum label (shown below slider)",false],["note","Disclaimer",true],
  ["top_performer_label","Top performer label",false],["top_performer_description","Top performer description",false],
  ["cta_text","CTA button text",false],["cta_url","CTA URL",false]
];

let state = clone(PRESETS.CZ);

function clone(o){return JSON.parse(JSON.stringify(o));}
function q(s){return document.querySelector(s);}
function money(v){
  try{return new Intl.NumberFormat(state.locale,{style:"currency",currency:state.currency,maximumFractionDigits:0}).format(Number(v)||0);}
  catch{return `${Number(v||0).toLocaleString(state.locale)} ${state.currency}`;}
}
function nums(s){return String(s||"").match(/\d+(?:[.,]\d+)?/g)?.map(x=>Number(x.replace(",",".")))||[];}
function parseRange(s){
  const n=nums(s);
  if(!n.length)return {min:0,max:0,open:false};
  if(/[+]|more than|above|over|powyżej|peste|felett|více než/i.test(s))return {min:n[0],max:n[0],open:true};
  if(n.length>1)return {min:n[0],max:n[1]};
  return {min:n[0],max:n[0]};
}
function parseTime(s){
  const n=String(s||"").match(/\d+(?:[.,]\d+)?/g)?.map(x=>Number(x.replace(",",".")))||[];
  if(!n.length)return {min:0,max:0,open:false};
  if(/[+]|more than|above|over|powyżej|peste|felett|více než/i.test(s))return {min:n[0],max:n[0],open:true};
  return n.length>1?{min:n[0],max:n[1]}:{min:n[0],max:n[0]};
}
function bounds(){
  const rs=state.tiers.map(x=>parseTime(x.time)).filter(x=>Number.isFinite(x.min));
  if(!rs.length)return {min:0,max:40};
  const min=Math.min(...rs.map(x=>x.min));
  const max=Math.max(...rs.map(x=>x.min));
  return {min,max:Math.max(min+0.5,max)};
}
function tierForHours(v){
  if(!state.tiers.length)return null;
  const mins=state.tiers.map(t=>parseTime(t.time).min);
  if(v<=mins[0])return state.tiers[0];
  let index=0;
  for(let i=1;i<state.tiers.length;i++){
    if(v>mins[i])index=i;
    else break;
  }
  return state.tiers[index]||state.tiers[0];
}
function esc(v){
  return String(v??"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

function buildTextEditor(){
  const wrap=q("#textFields");
  wrap.innerHTML="";
  TEXT_FIELDS.forEach(([key,label,multi])=>{
    const l=document.createElement("label");
    l.textContent=label;
    const el=document.createElement(multi?"textarea":"input");
    el.dataset.key=key;
    el.value=state.texts[key]||"";
    el.addEventListener("input",()=>{state.texts[key]=el.value;renderPreview();});
    l.appendChild(el);
    wrap.appendChild(l);
  });
}

function renderTiers(){
  const body=q("#tiersBody");
  body.innerHTML="";
  state.tiers.forEach((t,i)=>{
    const tr=document.createElement("tr");
    tr.innerHTML=`<td><input data-field="range" data-i="${i}" value="${esc(t.range)}"></td>
      <td><input data-field="time" data-i="${i}" value="${esc(t.time)}"></td>
      <td><input type="number" data-field="commission" data-i="${i}" value="${Number(t.commission)||0}"></td>
      <td><input type="number" data-field="top" data-i="${i}" value="${Number(t.top)||0}"></td>
      <td><button class="icon-button" data-remove-tier="${i}" type="button">×</button></td>`;
    body.appendChild(tr);
  });
  body.querySelectorAll("[data-field]").forEach(el=>{
    el.addEventListener("input",()=>{
      const i=+el.dataset.i, f=el.dataset.field;
      state.tiers[i][f]=(f==="commission"||f==="top")?Number(el.value)||0:el.value;
      renderPreview();
    });
  });
  body.querySelectorAll("[data-remove-tier]").forEach(el=>{
    el.addEventListener("click",()=>{
      if(state.tiers.length<=1){setStatus("At least one tier is required.");return;}
      state.tiers.splice(+el.dataset.removeTier,1);renderTiers();renderPreview(true);
    });
  });
}

function renderBenefits(){
  const wrap=q("#benefitsList");
  wrap.innerHTML="";
  state.benefits.forEach((b,i)=>{
    const row=document.createElement("div");row.className="benefit-row";
    const input=document.createElement("input");input.value=b;input.dataset.i=i;
    input.addEventListener("input",()=>{state.benefits[i]=input.value;renderPreview();});
    const btn=document.createElement("button");btn.className="icon-button";btn.type="button";btn.textContent="×";
    btn.addEventListener("click",()=>{state.benefits.splice(i,1);renderBenefits();renderPreview();});
    row.append(input,btn);wrap.appendChild(row);
  });
}

function renderEditor(){
  q("#locale").value=state.locale;q("#currency").value=state.currency;q("#xlsxFilename").value=state.xlsxFilename;
  q("#ctaTarget").value=state.texts.cta_target||"_blank";
  buildTextEditor();renderTiers();renderBenefits();
}

function renderPreview(reset=false){
  const t=state.texts,b=bounds(),r=q("#previewRange");
  q("#previewMeta").textContent=`${state.locale} · ${state.currency}`;
  q("#pTitle").textContent=t.title;q("#pSubtitle").textContent=t.subtitle;q("#pQuestion").textContent=t.client_question;
  q("#pBadge").textContent=t.badge;q("#pCommissionTitle").textContent=t.commission_title;q("#pMonthly").textContent=t.monthly_commission;
  q("#pClientsLabel").textContent=t.clients_label;q("#pTimeLabel").textContent=t.time_label;q("#pNote").textContent=t.note;q("#pBenefitsTitle").textContent=t.benefits_title||"What else you get";
  q("#pTopLabel").textContent=t.top_performer_label;q("#pTopDescription").textContent=t.top_performer_description;q("#pCtaText").textContent=t.cta_text;
  r.min=b.min;r.max=b.max;r.step=0.5;
  if(reset||+r.value<b.min||+r.value>b.max)r.value=b.min;
  const v=+r.value, tier=tierForHours(v), tr=tier?parseTime(tier.time):null;
  q("#pScaleMin").textContent=t.slider_min_label||`${formatHours(b.min)} h`;q("#pScaleMax").textContent=t.slider_max_label||`${formatHours(b.max)}+ h`;
  q("#pClients").textContent=tier?.range||"";
  q("#pTime").textContent=tier?.time||"";
  q("#pClientLabel").textContent=tier?.time||"";
  q("#pCommission").textContent=money(tier?.commission||0);q("#pTopAmount").textContent=money(tier?.top||0);
  const pct=((v-b.min)/(b.max-b.min))*100;r.style.background=`linear-gradient(90deg,#1ea7e1 0%,#1ea7e1 ${pct}%,#d9e2ea ${pct}%,#d9e2ea 100%)`;
  const list=q("#pBenefits");list.innerHTML="";
  state.benefits.filter(Boolean).forEach(x=>{const d=document.createElement("div");d.className="prov-calc__feature";d.innerHTML="<span></span>";d.appendChild(document.createTextNode(x));list.appendChild(d);});
  const c=q("#pCta");c.href=t.cta_url||"#";c.target=t.cta_target||"_blank";
  q("#sliderInfo").textContent=`Slider limits: ${formatHours(b.min)}–${formatHours(b.max)} h/week · endpoint labels are editable separately`;q("#activeTierInfo").textContent=tier?`Active tier: ${tier.range}`:"No active tier";
  fitPreview();
}
function formatHours(v){return Number.isInteger(v)?String(v):String(v).replace(".",",");}

function fitPreview(){
  const frame=q(".preview-frame"), canvas=q("#previewScale");
  if(!frame||!canvas)return;
  const available=Math.max(0, frame.clientWidth-32);
  const designWidth=1180;
  const scale=Math.min(1, available/designWidth);
  canvas.style.transform=`scale(${scale})`;
  canvas.style.width=`${designWidth}px`;
  const height=Math.ceil(canvas.scrollHeight*scale);
  frame.style.height=`${Math.max(620,height+32)}px`;
}

const previewResizeObserver=new ResizeObserver(()=>fitPreview());
previewResizeObserver.observe(q(".preview-frame"));
window.addEventListener("resize",fitPreview);
window.addEventListener("load",()=>requestAnimationFrame(fitPreview));

function setPreset(code){state=clone(PRESETS[code]);renderEditor();renderPreview(true);}
function addTier(){
  const last=state.tiers[state.tiers.length-1], r=parseRange(last?.range||"0–10"), start=r.max===999999?r.min+1:r.max+1;
  state.tiers.push({range:`${start}–${start+20}`,time:"",commission:0,top:0});renderTiers();renderPreview(true);
}
function addBenefit(){state.benefits.push("");renderBenefits();renderPreview();const xs=q("#benefitsList").querySelectorAll("input");xs[xs.length-1]?.focus();}
function setStatus(s){q("#status").textContent=s;}

function config(){
  return {version:2,country:q("#country").value,locale:state.locale,currency:state.currency,xlsxFilename:state.xlsxFilename,texts:state.texts,tiers:state.tiers,benefits:state.benefits};
}

function makeXlsx(){
  const wb=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet([["Client volume","Weekly time","Commission","Top performer"],...state.tiers.map(t=>[t.range,t.time,+t.commission||0,+t.top||0])]),"Tiers");
  XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet([["Benefit"],...state.benefits.filter(Boolean).map(x=>[x])]),"Benefits");
  XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet([["Key","Value"],...Object.entries({...state.texts,locale:state.locale,currency:state.currency}).map(([k,v])=>[k,v])]),"Texts");
  return XLSX.write(wb,{bookType:"xlsx",type:"array"});
}

function makeHtml(){
  const b=bounds(), t=state.texts;
  return `<!-- Generated by Provident Calculator Generator -->
<section class="prov-calc">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<script src="https://cdn.sheetjs.com/xlsx-0.20.2/package/dist/xlsx.full.min.js"></script>
<div class="prov-calc__wrap"><div class="prov-calc__hero">
<h2 class="prov-calc__title">${esc(t.title)}</h2><p class="prov-calc__subtitle">${esc(t.subtitle)}</p>
<div class="prov-calc__grid">
<div class="prov-calc__card"><div class="prov-calc__label">${esc(t.client_question)}</div>
<div class="prov-calc__slider-row"><button class="prov-calc__step" type="button" data-step="minus">−</button><input class="prov-calc__range" type="range" min="${b.min}" max="${b.max}" value="${b.min}" step="0.5"><button class="prov-calc__step" type="button" data-step="plus">+</button></div>
<div class="prov-calc__scale"><span>${esc(t.slider_min_label||`${formatHours(b.min)} h`)}</span><span>${esc(t.slider_max_label||`${formatHours(b.max)}+ h`)}</span></div>
<div class="prov-calc__stats">
<div class="prov-calc__stat"><div class="prov-calc__stat-title">${esc(t.time_label)}</div><div class="prov-calc__stat-value" data-hours></div></div>
<div class="prov-calc__stat"><div class="prov-calc__stat-title">${esc(t.clients_label)}</div><div class="prov-calc__stat-value" data-clients></div></div>
</div>
<div class="prov-calc__note">${esc(t.note)}</div>
<div class="prov-calc__benefits"><div class="prov-calc__benefits-title">${esc(t.benefits_title||"What else you get")}</div><div class="prov-calc__features" data-benefits></div></div></div>
<div class="prov-calc__result"><div class="prov-calc__badge">${esc(t.badge)}</div>
<div class="prov-calc__result-head"><h3 class="prov-calc__result-title">${esc(t.commission_title)}</h3><div class="prov-calc__client-label" data-client-label></div></div>
<div class="prov-calc__amount" data-commission></div><div class="prov-calc__amount-sub">${esc(t.monthly_commission)}</div>
<div class="prov-calc__top-performer"><div class="prov-calc__top-label">${esc(t.top_performer_label)}</div><div class="prov-calc__top-amount" data-top></div><div class="prov-calc__top-description">${esc(t.top_performer_description)}</div></div>
<a class="prov-calc__cta" href="${esc(t.cta_url)}" target="${esc(t.cta_target||"_blank")}" rel="noopener">${esc(t.cta_text)}</a></div></div>
</div></div>
<script>
(function(){
const DATA_URL='PASTE_PUBLIC_XLSX_URL_HERE',LOCALE=${JSON.stringify(state.locale)},CURRENCY=${JSON.stringify(state.currency)};
let TIERS=${JSON.stringify(state.tiers)},BENEFITS=${JSON.stringify(state.benefits.filter(Boolean))};
const root=document.currentScript.closest('.prov-calc'),range=root.querySelector('.prov-calc__range'),minus=root.querySelector('[data-step="minus"]'),plus=root.querySelector('[data-step="plus"]'),clients=root.querySelector('[data-clients]'),hours=root.querySelector('[data-hours]'),commission=root.querySelector('[data-commission]'),top=root.querySelector('[data-top]'),label=root.querySelector('[data-client-label]'),benefits=root.querySelector('[data-benefits]');
function parse(s){const n=String(s||'').match(/\\d+(?:[.,]\\d+)?/g)?.map(x=>Number(x.replace(',','.')))||[];if(!n.length)return{min:0,max:0,open:false};if(/[+]|more than|above|over|powyżej|peste|felett|více než/i.test(s))return{min:n[0],max:n[0],open:true};return n.length>1?{min:n[0],max:n[1]}:{min:n[0],max:n[0]};}
function tier(v){if(!TIERS.length)return null;const mins=TIERS.map(t=>parse(t.time).min);if(v<=mins[0])return TIERS[0];let index=0;for(let i=1;i<TIERS.length;i++){if(v>mins[i])index=i;else break}return TIERS[index]||TIERS[0]}
function money(v){try{return new Intl.NumberFormat(LOCALE,{style:'currency',currency:CURRENCY,maximumFractionDigits:0}).format(+v||0)}catch{return(+v||0).toLocaleString(LOCALE)+' '+CURRENCY}}
function fmt(v){return Number.isInteger(+v)?String(v):String(v).replace('.',',')}
function fitStatValue(el){
  if(!el)return;
  el.style.fontSize='';
  const base=parseFloat(getComputedStyle(el).fontSize)||32;
  let size=base;
  while(el.scrollWidth>el.clientWidth&&size>16){size-=1;el.style.fontSize=size+'px'}
}
function fitStatValues(){fitStatValue(hours);fitStatValue(clients)}
function update(){const v=+range.value,t=tier(v),pct=((v-+range.min)/(+range.max-+range.min))*100;clients.textContent=t?.range||'';hours.textContent=t?.time||fmt(v)+' h/week';label.textContent=t?.time||'';commission.textContent=money(t?.commission);top.textContent=money(t?.top);benefits.innerHTML='';BENEFITS.forEach(x=>{const d=document.createElement('div');d.className='prov-calc__feature';d.innerHTML='<span></span>';d.appendChild(document.createTextNode(x));benefits.appendChild(d)});fitStatValues();range.style.background='linear-gradient(90deg,#1ea7e1 0%,#1ea7e1 '+pct+'%,#d9e2ea '+pct+'%,#d9e2ea 100%)'}
function load(){if(!DATA_URL||DATA_URL.indexOf('PASTE_')===0){update();return}fetch(DATA_URL,{cache:'no-store'}).then(r=>r.arrayBuffer()).then(b=>{const wb=XLSX.read(new Uint8Array(b),{type:'array'});if(wb.Sheets.Tiers){const rows=XLSX.utils.sheet_to_json(wb.Sheets.Tiers,{header:1,blankrows:false});const x=rows.slice(1).filter(r=>r?.[0]!==undefined&&r?.[0]!=='').map(r=>({range:String(r[0]||''),time:String(r[1]||''),commission:+r[2]||0,top:+r[3]||0}));if(x.length)TIERS=x}if(wb.Sheets.Benefits){const rows=XLSX.utils.sheet_to_json(wb.Sheets.Benefits,{header:1,blankrows:false});const x=rows.slice(1).map(r=>String(r?.[0]||'').trim()).filter(Boolean);if(x.length)BENEFITS=x}const rs=TIERS.map(t=>parse(t.time)).filter(x=>Number.isFinite(x.min));range.min=Math.min(...rs.map(x=>x.min));range.max=Math.max(...rs.map(x=>x.min));range.value=range.min;update()}).catch(e=>{console.error('[Prov Calculator] XLSX load failed',e);update()})}
minus.onclick=()=>{range.value=Math.max(+range.min,+range.value-0.5);update()};plus.onclick=()=>{range.value=Math.min(+range.max,+range.value+0.5);update()};range.oninput=update;
if(window.ResizeObserver){new ResizeObserver(()=>fitStatValues()).observe(root.querySelector('.prov-calc__stats'))}
update();load();
})();
</script></section>`;
}


const CSS = `/* Generated calculator CSS */
.prov-calc,.prov-calc *{box-sizing:border-box}.prov-calc{--text:#16324f;--muted:#5f7488;--blue:#1ea7e1;--blue-soft:#eef8ff;--green:#9ad900;width:100%;padding:20px 0;background:transparent;color:var(--text);font-family:'Nunito',Arial,sans-serif}.prov-calc__wrap{width:100%;max-width:1180px;margin:0 auto}.prov-calc__hero{border:1px solid #dcecf5;border-radius:32px;padding:clamp(24px,4vw,50px);background:#fff;box-shadow:0 18px 50px rgba(22,50,79,.12)}.prov-calc__title{margin:0 0 16px;max-width:820px;font-size:clamp(34px,5vw,58px);line-height:1.05;letter-spacing:-.03em}.prov-calc__title,.prov-calc__result-title{font-family:var(--company-header-font-family,'Nunito'),'Nunito',Arial,sans-serif}.prov-calc__subtitle{max-width:700px;margin:0 0 36px;color:var(--muted);font-size:clamp(16px,2vw,22px);line-height:1.6}.prov-calc__grid{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(340px,.9fr);gap:24px}.prov-calc__card,.prov-calc__result{background:#fff;border-radius:30px;padding:clamp(22px,3vw,34px);box-shadow:0 10px 30px rgba(22,50,79,.06)}.prov-calc__card{border:1px solid #edf3f7}.prov-calc__result{position:relative;align-self:start;border:2px solid var(--blue)}.prov-calc__badge{position:absolute;top:-16px;right:24px;background:var(--green);color:#16324f;padding:12px 18px;border-radius:16px;font-size:13px;font-weight:700}.prov-calc__label{margin-bottom:24px;font-size:18px;font-weight:700}.prov-calc__slider-row{display:flex;align-items:center;gap:16px;margin-bottom:20px}.prov-calc__step{width:54px;height:54px;border:0;border-radius:50%;background:var(--blue-soft);color:var(--blue);font-size:30px;font-weight:700;cursor:pointer}.prov-calc__range{flex:1;min-width:0;appearance:none;height:8px;border-radius:999px;background:#d9e2ea;outline:none}.prov-calc__range::-webkit-slider-thumb{appearance:none;width:34px;height:34px;border-radius:50%;background:#fff;border:5px solid var(--blue);box-shadow:0 4px 12px rgba(0,0,0,.15);cursor:pointer}.prov-calc__scale{display:flex;justify-content:space-between;align-items:center;margin:10px 0 32px;color:#5f7488;font-size:15px;line-height:1.3;font-weight:700;min-height:20px}.prov-calc__stats{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.prov-calc__stat{border:1px solid #e5edf4;border-radius:24px;padding:18px 20px;background:#fff;min-width:0;overflow:hidden}.prov-calc__stat-title{margin-bottom:8px;color:#7b8c9d;font-size:14px;line-height:1.35}.prov-calc__stat-value{font-size:clamp(24px,2.5vw,32px);font-weight:700;line-height:1.1;white-space:nowrap;min-width:0;max-width:100%;overflow:hidden}.prov-calc__note{margin-top:24px;color:#7b8c9d;font-size:14px;line-height:1.7}.prov-calc__result-head{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;margin-bottom:24px}.prov-calc__result-title{margin:0;font-size:clamp(24px,3vw,38px);line-height:1.1}.prov-calc__client-label{font-weight:700;white-space:nowrap}.prov-calc__amount{margin-bottom:10px;font-size:clamp(52px,6vw,78px);line-height:1;font-weight:700;letter-spacing:-.04em}.prov-calc__amount-sub{margin-bottom:30px;color:var(--muted);font-size:20px}.prov-calc__top-performer{border-top:1px solid #e1e8ee;padding-top:20px;margin-bottom:30px}.prov-calc__top-label{color:#71879b;font-size:13px;font-weight:800;letter-spacing:.1em}.prov-calc__top-amount{margin:6px 0 3px;color:#8bb42f;font-size:44px;font-weight:700;line-height:1.05}.prov-calc__top-description{color:var(--muted);font-size:15px}.prov-calc__features{display:grid;gap:16px;margin-bottom:36px}.prov-calc__feature{display:flex;align-items:flex-start;gap:12px;line-height:1.5;font-weight:600}.prov-calc__feature span{width:12px;height:12px;min-width:12px;margin-top:6px;border-radius:50%;background:var(--green)}.prov-calc__cta{display:block;width:100%;text-align:center;text-decoration:none;background:#91b934;color:#fff;border-radius:999px;padding:15px 18px;font-weight:700}@media(max-width:1024px){.prov-calc__grid{grid-template-columns:1fr}}@media(max-width:640px){.prov-calc__hero{border-radius:24px;padding:20px}.prov-calc__card,.prov-calc__result{border-radius:24px;padding:20px}.prov-calc__stats{grid-template-columns:1fr}.prov-calc__result-head{flex-direction:column;gap:8px}.prov-calc__badge{position:static;display:inline-block;margin-bottom:18px}.prov-calc__amount{font-size:52px}.prov-calc__top-amount{font-size:36px}}.prov-calc__benefits{margin-top:24px;border:1px solid #e5edf4;border-radius:24px;padding:18px 20px;background:#f7fafc}.prov-calc__benefits-title{margin-bottom:12px;font-size:16px;font-weight:700}.prov-calc__benefits .prov-calc__features{gap:10px;margin:0}.prov-calc__benefits .prov-calc__feature{font-weight:500}
.prov-calc__cta {
  transition:
    transform .2s ease,
    box-shadow .2s ease,
    filter .2s ease;
}

.prov-calc__cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 22px rgba(145,185,52,.28);
  filter: brightness(1.04);
}

.prov-calc__cta:active {
  transform: translateY(0);
  box-shadow: 0 5px 12px rgba(145,185,52,.2);
}
`;

function blobDownload(blob,name){const u=URL.createObjectURL(blob),a=document.createElement("a");a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000)}
function textDownload(text,name,type="text/plain"){blobDownload(new Blob([text],{type}),name)}

q("#country").addEventListener("change",e=>setPreset(e.target.value));
q("#locale").addEventListener("input",e=>{state.locale=e.target.value||"en-GB";renderPreview()});
q("#currency").addEventListener("input",e=>{state.currency=e.target.value.toUpperCase()||"EUR";e.target.value=state.currency;renderPreview()});
q("#xlsxFilename").addEventListener("input",e=>state.xlsxFilename=e.target.value||"Calculator_Data.xlsx");
q("#ctaTarget").addEventListener("change",e=>{state.texts.cta_target=e.target.value;renderPreview()});
q("#addTierBtn").addEventListener("click",addTier);
q("#addBenefitBtn").addEventListener("click",addBenefit);
q("#previewRange").addEventListener("input",()=>renderPreview());
q("#previewMinus").addEventListener("click",()=>{const r=q("#previewRange");r.value=Math.max(+r.min,+r.value-1);renderPreview()});
q("#previewPlus").addEventListener("click",()=>{const r=q("#previewRange");r.value=Math.min(+r.max,+r.value+1);renderPreview()});

q("#downloadHtmlBtn").addEventListener("click",()=>textDownload(makeHtml(),`HTML_CODE_${q("#country").value}.txt`));
q("#downloadCssBtn").addEventListener("click",()=>textDownload(CSS,"CSS_CODE.txt"));
q("#downloadXlsxBtn").addEventListener("click",()=>blobDownload(new Blob([makeXlsx()],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),state.xlsxFilename));

q("#generateBtn").addEventListener("click",async()=>{
  try{
    setStatus("Generating package…");
    const zip=new JSZip();
    zip.file(`HTML_CODE_${q("#country").value}.txt`,makeHtml());
    zip.file("CSS_CODE.txt",CSS);
    zip.file(state.xlsxFilename,makeXlsx());
    zip.file("README.txt",`Upload ${state.xlsxFilename} to Sanity or another public HTTPS host, copy its public URL into DATA_URL in the generated HTML, then paste HTML and CSS into Teamtailor/CMS. Edit values in the XLSX for future updates.`);
    blobDownload(await zip.generateAsync({type:"blob"}),`Provident_Calculator_${q("#country").value}.zip`);
    setStatus("Package generated successfully.");
  }catch(e){console.error(e);setStatus("Generation failed: "+e.message);}
});

q("#exportConfigBtn").addEventListener("click",()=>textDownload(JSON.stringify(config(),null,2),`calculator-config-${q("#country").value}.json`));
q("#importConfigBtn").addEventListener("click",()=>q("#configFileInput").click());
q("#configFileInput").addEventListener("change",async e=>{
  const f=e.target.files[0];if(!f)return;
  try{
    const x=JSON.parse(await f.text());
    state={locale:x.locale||"en-GB",currency:x.currency||"EUR",xlsxFilename:x.xlsxFilename||"Calculator_Data.xlsx",texts:x.texts||{},tiers:x.tiers||[],benefits:x.benefits||[]};
    q("#country").value=x.country||"EN";renderEditor();renderPreview(true);setStatus("Configuration imported.");
  }catch(err){setStatus("Invalid configuration file.");}
});

renderEditor();
renderPreview(true);
})();