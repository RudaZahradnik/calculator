(() => {
"use strict";

const PRESETS = {
  CZ:{locale:"cs-CZ",currency:"CZK",xlsxFilename:"Calculator_Data_CZ.xlsx",
    texts:{title:"Práce navíc, kde si výši výdělku určujete sami",subtitle:"Spočítejte si orientační měsíční provizi podle počtu klientů.",client_question:"Kolik času týdně můžete této práci věnovat?",slider_min_label:"15 h/týden",slider_max_label:"37,5+ h/týden",badge:"ORIENTAČNÍ VÝPOČET",commission_title:"Odhad provize",monthly_commission:"měsíční provize",clients_label:"Počet klientů",time_label:"Časová náročnost",note:"Výpočet je orientační a slouží pouze pro prezentaci možností výdělku obchodního zástupce.",top_performer_label:"Top performer",top_performer_description:"Nejvyšší měsíční provize (H1 2026)",benefits_title:"Co dalšího získáte",tooltip_close:"Zavřít",cta_text:"Mám zájem o spolupráci",cta_url:"https://example.com/cz-career",cta_target:"_blank"},
    tiers:[{range:"40–60 klientů",time:"15 h/týden",commission:9000,top:18000},{range:"61–110 klientů",time:"15–25 h/týden",commission:19000,top:32000},{range:"111–150 klientů",time:"25–37,5 h/týden",commission:28000,top:40000},{range:"151+ klientů",time:"37,5+ h/týden",commission:43000,top:55000}],
    benefits:["Flexibilní pracovní doba","Možnost přivýdělku i při zaměstnání","Výdělek podle vlastní aktivity"]},
  EN:{locale:"en-GB",currency:"GBP",xlsxFilename:"Calculator_Data_EN.xlsx",
    texts:{title:"Extra work where you decide how much you earn",subtitle:"Calculate your estimated monthly commission based on the number of clients.",client_question:"How much time can you dedicate per week?",slider_min_label:"15 hrs/week",slider_max_label:"37.5+ hrs/week",badge:"INDICATIVE ESTIMATE",commission_title:"Commission estimate",monthly_commission:"monthly commission",clients_label:"Number of clients",time_label:"Time commitment",note:"The calculation is indicative and is intended only to demonstrate the earning potential of a field sales representative.",top_performer_label:"Top performer",top_performer_description:"Best monthly commission (H1 2026)",benefits_title:"What else you get",tooltip_close:"Close",cta_text:"I’m interested in cooperation",cta_url:"https://example.com/en-career",cta_target:"_blank"},
    tiers:[{range:"40–60 clients",time:"15 hrs/week",commission:300,top:600},{range:"61–110 clients",time:"15–25 hrs/week",commission:650,top:1100},{range:"111–150 clients",time:"25–37.5 hrs/week",commission:950,top:1400},{range:"151+ clients",time:"37.5+ hrs/week",commission:1450,top:1900}],
    benefits:["Flexible working hours","Opportunity to earn extra income alongside employment","Earnings based on your own activity"]},
  PL:{locale:"pl-PL",currency:"PLN",xlsxFilename:"Calculator_Data_PL.xlsx",
    texts:{title:"Dodatkowa praca, w której sam decydujesz o wysokości zarobków",subtitle:"Oblicz orientacyjną miesięczną prowizję na podstawie liczby klientów.",client_question:"Ile czasu tygodniowo możesz poświęcić na tę pracę?",slider_min_label:"15 godz./tydz.",slider_max_label:"37,5+ godz./tydz.",badge:"ORIENTACYJNE WYLICZENIE",commission_title:"Szacowana prowizja",monthly_commission:"miesięczna prowizja",clients_label:"Liczba klientów",time_label:"Czas pracy",note:"Wyliczenie ma charakter orientacyjny i służy wyłącznie do przedstawienia możliwości zarobkowych przedstawiciela handlowego w terenie.",top_performer_label:"Top performer",top_performer_description:"Najwyższa miesięczna prowizja (H1 2026)",benefits_title:"Co jeszcze zyskujesz",tooltip_close:"Zamknij",cta_text:"Jestem zainteresowany współpracą",cta_url:"https://example.com/pl-career",cta_target:"_blank"},
    tiers:[{range:"40–60 klientów",time:"15 godz./tydz.",commission:1200,top:2200},{range:"61–110 klientów",time:"15–25 godz./tydz.",commission:2600,top:4300},{range:"111–150 klientów",time:"25–37,5 godz./tydz.",commission:3800,top:5500},{range:"151+ klientów",time:"37,5+ godz./tydz.",commission:5800,top:8000}],
    benefits:["Elastyczne godziny pracy","Możliwość dodatkowego zarobku przy jednoczesnym zatrudnieniu","Zarobki zależne od własnej aktywności"]},
  RO:{locale:"ro-RO",currency:"RON",xlsxFilename:"Calculator_Data_RO.xlsx",
    texts:{title:"Lucrează suplimentar și decide singur cât câștigi",subtitle:"Calculează comisionul lunar estimativ în funcție de numărul de clienți.",client_question:"Cât timp poți aloca acestei activități pe săptămână?",slider_min_label:"15 ore/săptămână",slider_max_label:"37,5+ ore/săptămână",badge:"CALCUL ESTIMATIV",commission_title:"Comision estimat",monthly_commission:"comision lunar",clients_label:"Număr de clienți",time_label:"Timp alocat",note:"Calculul este orientativ și are doar scopul de a prezenta posibilitățile de câștig ale unui reprezentant de vânzări pe teren.",top_performer_label:"Top performer",top_performer_description:"Cel mai mare comision lunar (H1 2026)",benefits_title:"Ce mai primești",tooltip_close:"Închide",cta_text:"Sunt interesat de colaborare",cta_url:"https://example.com/ro-career",cta_target:"_blank"},
    tiers:[{range:"40–60 clienți",time:"15 ore/săptămână",commission:1500,top:2800},{range:"61–110 clienți",time:"15–25 ore/săptămână",commission:3200,top:5200},{range:"111–150 clienți",time:"25–37,5 ore/săptămână",commission:4700,top:6800},{range:"151+ clienți",time:"37,5+ ore/săptămână",commission:7200,top:9800}],
    benefits:["Program de lucru flexibil","Posibilitatea de a obține venituri suplimentare în paralel cu un alt loc de muncă","Câștiguri în funcție de propria activitate"]},
  HU:{locale:"hu-HU",currency:"HUF",xlsxFilename:"Calculator_Data_HU.xlsx",
    texts:{title:"Vállalj plusz munkát, és döntsd el, mennyit keresel",subtitle:"Számítsd ki a becsült havi jutalékodat az ügyfelek száma alapján.",client_question:"Hetente mennyi időt tudsz erre a munkára fordítani?",slider_min_label:"15 óra/hét",slider_max_label:"37,5+ óra/hét",badge:"TÁJÉKOZTATÓ SZÁMÍTÁS",commission_title:"Becsült jutalék",monthly_commission:"havi jutalék",clients_label:"Ügyfelek száma",time_label:"Időráfordítás",note:"A számítás tájékoztató jellegű, és kizárólag a területi értékesítési képviselő lehetséges kereseti lehetőségeit szemlélteti.",top_performer_label:"Top performer",top_performer_description:"Legmagasabb havi jutalék (H1 2026)",benefits_title:"Mit kapsz még",tooltip_close:"Bezárás",cta_text:"Érdekel az együttműködés",cta_url:"https://example.com/hu-career",cta_target:"_blank"},
    tiers:[{range:"40–60 ügyfél",time:"15 óra/hét",commission:120000,top:220000},{range:"61–110 ügyfél",time:"15–25 óra/hét",commission:250000,top:420000},{range:"111–150 ügyfél",time:"25–37,5 óra/hét",commission:370000,top:560000},{range:"151+ ügyfél",time:"37,5+ óra/hét",commission:570000,top:820000}],
    benefits:["Rugalmas munkaidő","Plusz jövedelem lehetősége munkaviszony mellett is","A kereseted a saját aktivitásodtól függ"]}
};

const TEXT_FIELDS = [
  ["title","Headline",true],["subtitle","Subtitle",true],["client_question","Time commitment question",false],
  ["slider_min_label","Slider minimum label (shown below slider)",false],["slider_max_label","Slider maximum label (shown below slider)",false],
  ["clients_label","Number of clients label",false],["time_label","Time commitment label",false],
  ["badge","Calculation badge",false],["commission_title","Commission title",false],["monthly_commission","Monthly commission label",false],
  ["top_performer_label","Top performer label",false],["top_performer_description","Top performer tooltip text",true],["tooltip_close","Tooltip close button (mobile)",false],["benefits_title","Benefits heading (mobile)",false],
  ["note","Disclaimer",true],["cta_text","CTA button text",false],["cta_url","CTA URL",false]
];

let state = clone(PRESETS.CZ);

function clone(o){return JSON.parse(JSON.stringify(o));}
function q(s){return document.querySelector(s);}
function nums(s){return String(s||"").match(/\d+(?:[.,]\d+)?/g)?.map(x=>Number(x.replace(",",".")))||[];}
function parseRange(s){
  const n=nums(s);
  if(!n.length)return {min:0,max:0};
  return n.length>1?{min:n[0],max:n[1]}:{min:n[0],max:n[0]};
}
function esc(v){
  return String(v??"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

/* =========================================================
   Calculator markup - shared by the Live Preview and the export
   ========================================================= */
function calcMarkup(t){
  const desc=String(t.top_performer_description||"").trim();
  const tip=desc?`<span class="prov-calc__tip"><button class="prov-calc__info" type="button" data-tip-trigger aria-label="${esc(t.top_performer_label)}: ${esc(desc)}" aria-expanded="false"><svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><circle cx="10" cy="10" r="8.25" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M7.9 7.7a2.15 2.15 0 1 1 3 2c-.6.3-.9.7-.9 1.3v.4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="10" cy="14.1" r=".95" fill="currentColor"/></svg></button><span class="prov-calc__tooltip" role="tooltip" data-tooltip>${esc(desc)}</span></span>`:"";
  const sheet=desc?`<div class="prov-calc__sheet" data-sheet hidden>
<div class="prov-calc__sheet-backdrop" data-sheet-close></div>
<div class="prov-calc__sheet-panel" role="dialog" aria-modal="true" data-sheet-panel>
<span class="prov-calc__sheet-handle" aria-hidden="true"></span>
<button class="prov-calc__sheet-x" type="button" data-sheet-close aria-label="${esc(t.tooltip_close||"Close")}"><svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>
<h4 class="prov-calc__sheet-title" data-sheet-title>${esc(t.top_performer_label)}</h4>
<p class="prov-calc__sheet-text">${esc(desc)}</p>
<button class="prov-calc__sheet-close" type="button" data-sheet-close>${esc(t.tooltip_close||"Close")}</button>
</div>
</div>`:"";
  return `<div class="prov-calc__wrap">
<header class="prov-calc__intro">
<h2 class="prov-calc__title">${esc(t.title)}</h2>
<p class="prov-calc__subtitle">${esc(t.subtitle)}</p>
</header>
<div class="prov-calc__box">
<div class="prov-calc__controls">
<h3 class="prov-calc__question" data-question>${esc(t.client_question)}</h3>
<div class="prov-calc__slider-row">
<button class="prov-calc__step" type="button" data-step="minus" aria-label="−"><span aria-hidden="true">-</span></button>
<input class="prov-calc__range" type="range" min="0" max="0" value="0" step="1" data-range aria-label="${esc(t.client_question)}">
<button class="prov-calc__step" type="button" data-step="plus" aria-label="+"><span aria-hidden="true">+</span></button>
</div>
<div class="prov-calc__scale"><span>${esc(t.slider_min_label)}</span><span>${esc(t.slider_max_label)}</span></div>
<dl class="prov-calc__stats">
<div class="prov-calc__stat"><dt>${esc(t.clients_label)}</dt><dd data-clients></dd></div>
<div class="prov-calc__stat"><dt>${esc(t.time_label)}</dt><dd data-time></dd></div>
</dl>
</div>
<div class="prov-calc__result">
<div class="prov-calc__badge">${esc(t.badge)}</div>
<div class="prov-calc__card">
<div class="prov-calc__card-head"><span class="prov-calc__card-title">${esc(t.commission_title)}</span><span data-time></span></div>
<div class="prov-calc__card-body">
<div class="prov-calc__amounts" aria-live="polite">
<div class="prov-calc__amount prov-calc__amount--main"><span>${esc(t.monthly_commission)}</span><strong data-commission></strong></div>
<div class="prov-calc__amount prov-calc__amount--top"><span class="prov-calc__amount-label">${esc(t.top_performer_label)}${tip}</span><strong data-top></strong></div>
</div>
<ul class="prov-calc__benefits prov-calc__benefits--card" data-benefits></ul>
<a class="prov-calc__cta" href="${esc(t.cta_url||"#")}" target="${esc(t.cta_target||"_blank")}" rel="noopener">${esc(t.cta_text)}</a>
</div>
</div>
</div>
<p class="prov-calc__note">${esc(t.note)}</p>
<div class="prov-calc__more" data-benefits-block>
<h4 class="prov-calc__more-title">${esc(t.benefits_title||"What else you get")}</h4>
<ul class="prov-calc__benefits prov-calc__benefits--list" data-benefits></ul>
</div>
</div>
${sheet}
</div>`;
}

/* =========================================================
   Calculator runtime - serialised into the exported HTML.
   Must stay self-contained (no references to generator code).
   ========================================================= */
function provCalcRuntime(root, cfg){
  var tiers=cfg.tiers||[], benefits=cfg.benefits||[];
  var ICON='<svg class="prov-calc__check" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><circle cx="10" cy="10" r="8.25" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6.3 10.2l2.5 2.5 4.9-5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var range=root.querySelector('[data-range]'),minus=root.querySelector('[data-step="minus"]'),plus=root.querySelector('[data-step="plus"]');
  function money(v){
    try{return new Intl.NumberFormat(cfg.locale,{style:'currency',currency:cfg.currency,maximumFractionDigits:0}).format(Number(v)||0);}
    catch(e){return (Number(v)||0).toLocaleString(cfg.locale)+' '+cfg.currency;}
  }
  function setAll(sel,text){var els=root.querySelectorAll(sel);for(var i=0;i<els.length;i++)els[i].textContent=text;}
  function renderBenefits(){
    var lists=root.querySelectorAll('[data-benefits]');
    for(var i=0;i<lists.length;i++){
      lists[i].innerHTML='';
      benefits.forEach(function(b){var li=document.createElement('li');li.className='prov-calc__benefit';li.innerHTML=ICON;var s=document.createElement('span');s.textContent=b;li.appendChild(s);lists[i].appendChild(li);});
      lists[i].hidden=!benefits.length;
    }
    var block=root.querySelector('[data-benefits-block]');if(block)block.hidden=!benefits.length;
  }
  function update(){
    var max=Math.max(0,tiers.length-1);
    range.min=0;range.max=max;range.step=1;
    var i=Math.max(0,Math.min(max,Math.round(+range.value||0)));
    range.value=i;
    var t=tiers[i]||{range:'',time:'',commission:0,top:0};
    range.style.setProperty('--prov-pct',(max?i/max*100:100)+'%');
    setAll('[data-clients]',t.range||'');
    setAll('[data-time]',t.time||'');
    setAll('[data-commission]',money(t.commission));
    setAll('[data-top]',money(t.top));
    range.setAttribute('aria-valuetext',[t.time,t.range].filter(Boolean).join(', '));
    minus.disabled=i<=0;plus.disabled=i>=max;
    root.dispatchEvent(new CustomEvent('provcalc:change',{detail:{index:i,tier:t}}));
  }
  minus.addEventListener('click',function(){range.value=+range.value-1;update();});
  plus.addEventListener('click',function(){range.value=+range.value+1;update();});
  range.addEventListener('input',update);
  function setData(t,b){if(t&&t.length)tiers=t;if(b)benefits=b;renderBenefits();update();}
  if(cfg.dataUrl&&cfg.dataUrl.indexOf('PASTE_')!==0&&window.fetch){
    fetch(cfg.dataUrl,{cache:'no-store'}).then(function(r){return r.arrayBuffer();}).then(function(buf){
      var X=window.XLSX;if(!X)throw new Error('SheetJS not loaded');
      var wb=X.read(new Uint8Array(buf),{type:'array'}),nt=null,nb=null;
      if(wb.Sheets.Tiers){nt=X.utils.sheet_to_json(wb.Sheets.Tiers,{header:1,blankrows:false}).slice(1).filter(function(r){return r&&r[0]!==undefined&&r[0]!=='';}).map(function(r){return{range:String(r[0]||''),time:String(r[1]||''),commission:+r[2]||0,top:+r[3]||0};});}
      if(wb.Sheets.Benefits){nb=X.utils.sheet_to_json(wb.Sheets.Benefits,{header:1,blankrows:false}).slice(1).map(function(r){return String((r&&r[0])||'').trim();}).filter(Boolean);if(!nb.length)nb=null;}
      range.value=0;setData(nt,nb);
    }).catch(function(e){console.error('[Prov Calculator] XLSX load failed',e);});
  }
  /* Top performer tooltip: desktop = hover/focus tooltip, mobile = bottom sheet */
  var tipBtn=root.querySelector('[data-tip-trigger]'),tipBox=root.querySelector('[data-tooltip]'),sheet=root.querySelector('[data-sheet]');
  if(tipBtn&&tipBox&&sheet){
    var uid='pc'+Math.random().toString(36).slice(2,9);
    tipBox.id=uid+'-tip';tipBtn.setAttribute('aria-describedby',tipBox.id);
    var sheetTitle=sheet.querySelector('[data-sheet-title]'),panel=sheet.querySelector('[data-sheet-panel]');
    sheetTitle.id=uid+'-title';panel.setAttribute('aria-labelledby',sheetTitle.id);
    var isMobile=function(){return root.clientWidth<800;};
    var setTip=function(open){root.classList.toggle('prov-calc--tip-open',open);tipBtn.setAttribute('aria-expanded',open?'true':'false');};
    var openSheet=function(){sheet.hidden=false;tipBtn.setAttribute('aria-expanded','true');requestAnimationFrame(function(){sheet.classList.add('is-open');});var x=sheet.querySelector('.prov-calc__sheet-x');if(x)x.focus();};
    var closeSheet=function(){sheet.classList.remove('is-open');tipBtn.setAttribute('aria-expanded','false');sheet.hidden=true;tipBtn.focus();};
    tipBtn.addEventListener('click',function(e){e.stopPropagation();if(isMobile())openSheet();else setTip(!root.classList.contains('prov-calc--tip-open'));});
    var closers=sheet.querySelectorAll('[data-sheet-close]');for(var c=0;c<closers.length;c++)closers[c].addEventListener('click',closeSheet);
    document.addEventListener('click',function(e){if(tipBtn.isConnected&&!tipBtn.contains(e.target))setTip(false);});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&tipBtn.isConnected){setTip(false);if(!sheet.hidden)closeSheet();}});
    sheet.addEventListener('keydown',function(e){
      if(e.key!=='Tab')return;
      var f=panel.querySelectorAll('button');if(!f.length)return;
      var first=f[0],last=f[f.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
    });
  }
  range.max=Math.max(0,tiers.length-1);range.value=cfg.index||0;
  renderBenefits();update();
  return {update:update,setData:setData};
}

/* =========================================================
   Calculator CSS - exported to Teamtailor/CMS and injected
   into the generator for the Live Preview.
   Desktop layout = Layout 1440 px, mobile layout = 375-639 px.
   Breakpoint uses a container query, so the calculator adapts
   to the width of the CMS column it is placed in.
   ========================================================= */
const CSS = `/* Provident commission calculator - generated CSS */
.prov-calc{
  --pc-blue:#0063E8;--pc-blue-hover:#0053C4;--pc-blue-pressed:#0045A3;
  --pc-black:#1A1A1A;--pc-text-2:#4A4A4C;--pc-border:#D3D3D3;--pc-divider:#F3F3F3;--pc-track:#D3D3D3;
  --pc-green:#8CD901;--pc-check:#08B5F7;--pc-disabled-bg:#E9E9E9;--pc-disabled-fg:#A3A3A5;
  --pc-radius:10px;
  container-type:inline-size;container-name:provcalc;
  width:100%;color:var(--pc-black);background:#fff;
  font-family:'Nunito',Arial,sans-serif;font-size:16px;line-height:1.4;
  -webkit-font-smoothing:antialiased;
}
.prov-calc *,.prov-calc *::before,.prov-calc *::after{box-sizing:border-box}
.prov-calc__wrap{width:100%;max-width:1280px;margin:0 auto}

/* Intro */
.prov-calc__title{margin:0 0 20px;font-family:var(--company-header-font-family,'Nunito'),'Nunito',Arial,sans-serif;font-weight:600;font-size:clamp(30px,3.6cqw,46px);line-height:1.1;letter-spacing:-.01em;color:var(--pc-black)}
.prov-calc__subtitle{margin:0 0 26px;font-size:16px;line-height:1.5;color:var(--pc-black)}

/* Outer box */
.prov-calc__box{
  display:grid;grid-template-columns:minmax(0,504fr) minmax(0,550fr);
  grid-template-areas:"controls result" "note result";grid-template-rows:auto 1fr;
  column-gap:clamp(40px,8cqw,106px);
  padding:40px clamp(28px,4.7cqw,60px) 48px;
  border:1px solid var(--pc-border);border-radius:var(--pc-radius);background:#fff;
}
.prov-calc__controls{grid-area:controls;padding-top:8px;min-width:0}
.prov-calc__result{grid-area:result;position:relative;align-self:start;padding-top:0;min-width:0}
.prov-calc__note{grid-area:note;align-self:start;margin:44px 0 0;max-width:500px;font-size:11px;line-height:1.5;color:var(--pc-text-2)}
.prov-calc__more{display:none}

/* Question + slider */
.prov-calc__question{margin:0 0 30px;font-family:inherit;font-size:22px;font-weight:600;line-height:1.3;color:var(--pc-black)}
.prov-calc__slider-row{display:flex;align-items:center;gap:16px}
.prov-calc__step{
  flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;
  width:44px;height:44px;padding:0;border:1.5px solid var(--pc-blue);border-radius:50%;
  background:#fff;color:var(--pc-black);font:600 22px/1 'Nunito',Arial,sans-serif;cursor:pointer;
  transition:background-color .15s ease,border-color .15s ease,color .15s ease;
}
.prov-calc__step span{display:block;transform:translateY(-1px)}
.prov-calc__step:hover{background:#EAF2FE}
.prov-calc__step:active{background:#CFE1FB;border-color:var(--pc-blue-pressed)}
.prov-calc__step:focus-visible{outline:2px solid var(--pc-blue);outline-offset:2px}
.prov-calc__step:disabled{border-color:var(--pc-border);color:var(--pc-disabled-fg);background:#fff;cursor:default}
.prov-calc__range{
  --prov-pct:0%;
  flex:1 1 auto;width:auto;min-width:0;height:42px;margin:0;padding:0;border:0;border-radius:0;box-shadow:none;background:transparent;
  -webkit-appearance:none;appearance:none;cursor:pointer;
}
.prov-calc__range:focus{outline:none}
.prov-calc__range::-webkit-slider-runnable-track{height:10px;border-radius:999px;background:linear-gradient(90deg,var(--pc-blue) 0,var(--pc-blue) var(--prov-pct),var(--pc-track) var(--prov-pct),var(--pc-track) 100%)}
.prov-calc__range::-moz-range-track{height:10px;border-radius:999px;background:var(--pc-track)}
.prov-calc__range::-moz-range-progress{height:10px;border-radius:999px;background:var(--pc-blue)}
.prov-calc__range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:42px;height:42px;margin-top:-16px;border-radius:50%;background:#fff;border:4px solid var(--pc-blue);box-shadow:0 1px 4px rgba(0,0,0,.18);transition:box-shadow .15s ease}
.prov-calc__range::-moz-range-thumb{width:34px;height:34px;border-radius:50%;background:#fff;border:4px solid var(--pc-blue);box-shadow:0 1px 4px rgba(0,0,0,.18)}
.prov-calc__range:focus-visible::-webkit-slider-thumb{box-shadow:0 0 0 4px rgba(0,99,232,.25)}
.prov-calc__range:focus-visible::-moz-range-thumb{box-shadow:0 0 0 4px rgba(0,99,232,.25)}
.prov-calc__scale{display:flex;justify-content:space-between;gap:16px;margin:12px 0 34px;font-size:15px;line-height:1.3;color:var(--pc-black)}

/* Stats */
.prov-calc__stats{margin:0;display:grid;gap:18px}
.prov-calc__stat{display:flex;justify-content:space-between;align-items:baseline;gap:16px;min-width:0}
.prov-calc__stat dt{font-size:15px;color:var(--pc-black)}
.prov-calc__stat dd{margin:0;font-size:19px;font-weight:700;text-align:right;white-space:nowrap}

/* Result card */
.prov-calc__badge{
  position:absolute;right:0;top:-27px;z-index:0;
  padding:5px 16px 15px;border-radius:4px 4px 0 0;background:var(--pc-green);
  font-size:13px;line-height:19px;font-weight:500;letter-spacing:.01em;text-transform:uppercase;color:var(--pc-black);white-space:nowrap;
}
.prov-calc__card{position:relative;z-index:1;border:1px solid var(--pc-border);border-radius:var(--pc-radius);background:#fff}
.prov-calc__card-head{display:flex;justify-content:space-between;align-items:baseline;gap:16px;padding:18px 24px 14px;border-bottom:2px solid var(--pc-divider);font-size:15px}
.prov-calc__card-title{font-weight:700}
.prov-calc__card-head [data-time]{white-space:nowrap}
.prov-calc__card-body{padding:14px 24px 22px}
.prov-calc__amounts{display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:4px 24px}
.prov-calc__amount{display:flex;align-items:baseline;gap:6px;font-size:16px}
.prov-calc__amount strong{font-weight:700;white-space:nowrap}
.prov-calc__amount--main strong{font-size:24px;line-height:1.1}
.prov-calc__amount--top strong{font-size:18px}

/* Top performer tooltip (Provident plain tooltip) */
.prov-calc__amount-label{display:inline-flex;align-items:center;gap:6px}
.prov-calc__tip{position:relative;display:inline-flex}
.prov-calc__info{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;margin:-3px -3px -3px 0;padding:0;border:0;border-radius:50%;background:transparent;color:var(--pc-blue);cursor:pointer}
.prov-calc__info svg{width:18px;height:18px}
.prov-calc__info:hover{background:#EAF2FE}
.prov-calc__info:focus-visible{outline:2px solid var(--pc-blue);outline-offset:1px}
.prov-calc__tooltip{
  position:absolute;right:-8px;bottom:calc(100% + 8px);z-index:5;
  width:max-content;max-width:280px;padding:8px 10px;
  border:1px solid var(--pc-border);border-radius:4px;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.12);
  font-size:12px;font-weight:400;line-height:1.45;color:var(--pc-black);text-align:left;white-space:normal;
  opacity:0;visibility:hidden;transform:translateY(2px);transition:opacity .12s ease,transform .12s ease,visibility .12s;pointer-events:none;
}
.prov-calc__tip:hover .prov-calc__tooltip,
.prov-calc__info:focus-visible + .prov-calc__tooltip,
.prov-calc--tip-open .prov-calc__tooltip{opacity:1;visibility:visible;transform:none}

/* Mobile bottom sheet for the tooltip */
.prov-calc__sheet{position:fixed;inset:0;z-index:1000}
.prov-calc__sheet[hidden]{display:none}
.prov-calc__sheet-backdrop{position:absolute;inset:0;background:rgba(26,26,26,.45);opacity:0;transition:opacity .2s ease}
.prov-calc__sheet-panel{
  position:absolute;left:0;right:0;bottom:0;max-height:80%;overflow:auto;
  padding:12px 16px 12px;border-radius:16px 16px 0 0;background:#fff;box-shadow:0 -4px 16px rgba(0,0,0,.12);
  transform:translateY(100%);transition:transform .22s ease;
}
.prov-calc__sheet.is-open .prov-calc__sheet-backdrop{opacity:1}
.prov-calc__sheet.is-open .prov-calc__sheet-panel{transform:none}
.prov-calc__sheet-handle{display:block;width:22px;height:4px;margin:0 auto 14px;border-radius:2px;background:#BDBDBD}
.prov-calc__sheet-x{position:absolute;top:6px;right:8px;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;border:0;border-radius:50%;background:transparent;color:var(--pc-black);cursor:pointer}
.prov-calc__sheet-x svg{width:18px;height:18px}
.prov-calc__sheet-title{margin:0 0 12px;font-family:inherit;font-size:16px;font-weight:700}
.prov-calc__sheet-text{margin:0;font-size:14px;line-height:1.5}
.prov-calc__sheet-close{display:block;margin:18px auto 0;padding:10px 16px;border:0;background:transparent;color:var(--pc-blue);font:600 15px/1.2 'Nunito',Arial,sans-serif;cursor:pointer}
.prov-calc__sheet-x:focus-visible,.prov-calc__sheet-close:focus-visible{outline:2px solid var(--pc-blue);outline-offset:2px;border-radius:6px}

/* Benefits */
.prov-calc__benefits{list-style:none;margin:0;padding:0}
.prov-calc__benefits--card{display:flex;flex-wrap:wrap;gap:12px 28px;margin-top:16px;font-size:13px}
.prov-calc__benefit{display:flex;align-items:flex-start;gap:8px;line-height:1.4}
.prov-calc__check{flex:0 0 auto;width:18px;height:18px;color:var(--pc-check)}
.prov-calc__benefits--card .prov-calc__check{margin-top:-1px}

/* CTA - Provident primary button, large (50px) */
.prov-calc__cta{
  display:flex;align-items:center;justify-content:center;
  width:100%;max-width:343px;min-height:50px;margin:22px auto 0;padding:10px 24px;
  border:2px solid transparent;border-radius:999px;background:var(--pc-blue);color:#fff;
  font-size:16px;font-weight:600;line-height:1.2;text-align:center;text-decoration:none;
  transition:background-color .15s ease,border-color .15s ease,box-shadow .15s ease;
}
.prov-calc__cta:hover{background:var(--pc-blue-hover);color:#fff}
.prov-calc__cta:focus-visible{outline:none;background:var(--pc-blue-hover);border-color:#fff;box-shadow:0 0 0 2px var(--pc-blue-hover)}
.prov-calc__cta:active{background:var(--pc-blue-pressed)}

/* =========================================================
   Mobile layout (calculator width up to 799px)
   ========================================================= */
@container provcalc (max-width:799px){
  .prov-calc__title{margin-bottom:10px;font-size:clamp(22px,6cqw,30px);line-height:1.2}
  .prov-calc__subtitle{margin:0;padding-bottom:18px;border-bottom:2px solid #E9E9E9;font-size:14px}
  .prov-calc__box{display:block;padding:20px 0 0;border:0;border-radius:0}
  .prov-calc__controls{padding-top:0}
  .prov-calc__question{margin-bottom:14px;font-size:16px}
  .prov-calc__slider-row{gap:8px}
  .prov-calc__step{width:36px;height:36px;font-size:20px}
  .prov-calc__range::-webkit-slider-thumb{width:38px;height:38px;margin-top:-14px}
  .prov-calc__range::-moz-range-thumb{width:30px;height:30px}
  .prov-calc__scale{margin:8px 0 22px;font-size:13px}
  .prov-calc__stats{gap:8px}
  .prov-calc__stat dt{font-size:16px}
  .prov-calc__stat dd{font-size:18px}
  .prov-calc__result{margin-top:48px}
  .prov-calc__badge{top:-23px;padding:3px 14px 14px;font-size:12px;line-height:18px}
  .prov-calc__card-head{margin:0 16px;padding:16px 0 12px;font-size:15px}
  .prov-calc__card-body{padding:12px 16px 16px}
  .prov-calc__amounts{display:grid;grid-template-columns:minmax(0,1fr);gap:6px}
  .prov-calc__amount{justify-content:space-between;font-size:15px}
  .prov-calc__amount--main strong{font-size:24px}
  .prov-calc__amount--top strong{font-size:16px}
  .prov-calc__benefits--card{display:none}
  .prov-calc__tooltip{display:none}
  .prov-calc__cta{max-width:none;margin-top:14px;font-size:17px}
  .prov-calc__note{max-width:none;margin:16px 0 0}
  .prov-calc__more{display:block;margin-top:28px}
  .prov-calc__more[hidden]{display:none}
  .prov-calc__more-title{margin:0 0 10px;font-size:15px;font-weight:700;font-family:inherit}
  .prov-calc__benefits--list{display:grid;gap:10px;font-size:14px}
}
@media (prefers-reduced-motion:reduce){.prov-calc *{transition:none!important}}
`;

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
      <td><button class="icon-button" data-remove-tier="${i}" type="button" aria-label="Remove tier">×</button></td>`;
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
    const btn=document.createElement("button");btn.className="icon-button";btn.type="button";btn.textContent="×";btn.setAttribute("aria-label","Remove benefit");
    btn.addEventListener("click",()=>{state.benefits.splice(i,1);renderBenefits();renderPreview();});
    row.append(input,btn);wrap.appendChild(row);
  });
}

function renderEditor(){
  q("#locale").value=state.locale;q("#currency").value=state.currency;q("#xlsxFilename").value=state.xlsxFilename;
  q("#ctaTarget").value=state.texts.cta_target||"_blank";
  buildTextEditor();renderTiers();renderBenefits();
}

/* ---------- Live Preview ---------- */
let previewIndex=0;
function renderPreview(reset=false){
  if(reset)previewIndex=0;
  previewIndex=Math.min(previewIndex,Math.max(0,state.tiers.length-1));
  q("#previewMeta").textContent=`${state.locale} · ${state.currency}`;
  const root=q("#previewCalc");
  root.innerHTML=calcMarkup(state.texts);
  root.querySelector(".prov-calc__cta").addEventListener("click",e=>e.preventDefault());
  provCalcRuntime(root,{tiers:state.tiers,benefits:state.benefits.filter(Boolean),locale:state.locale,currency:state.currency,index:previewIndex});
  fitPreview();
}
q("#previewCalc").addEventListener("provcalc:change",onPreviewChange);
function onPreviewChange(e){
  previewIndex=e.detail.index;
  q("#sliderInfo").textContent=`Slider positions: ${state.tiers.length} (one per tier)`;
  q("#activeTierInfo").textContent=e.detail.tier?.range?`Active tier ${previewIndex+1}: ${e.detail.tier.range}`:"No active tier";
}

let previewDevice="desktop";
function fitPreview(){
  const frame=q(".preview-frame"), canvas=q("#previewScale");
  if(!frame||!canvas)return;
  const isMobile=previewDevice==="mobile";
  const designWidth=isMobile?375:1280;
  canvas.classList.toggle("is-mobile",isMobile);
  frame.classList.toggle("is-mobile",isMobile);
  const available=Math.max(0, frame.clientWidth-(isMobile?40:32));
  const scale=Math.min(1, available/designWidth);
  canvas.style.transform=`scale(${scale})`;
  canvas.style.width=`${designWidth}px`;
  const height=Math.ceil(canvas.offsetHeight*scale);
  frame.style.height=`${Math.max(isMobile?600:200,height+(isMobile?40:32))}px`;
}

function injectCalcCss(){
  let s=q("#calcStyles");
  if(!s){s=document.createElement("style");s.id="calcStyles";document.head.appendChild(s);}
  s.textContent=CSS;
}

const previewRO=new ResizeObserver(()=>fitPreview());previewRO.observe(q(".preview-frame"));previewRO.observe(q("#previewScale"));
window.addEventListener("resize",fitPreview);
window.addEventListener("load",()=>requestAnimationFrame(fitPreview));
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fitPreview);

function setPreset(code){state=clone(PRESETS[code]);renderEditor();renderPreview(true);}
function addTier(){
  const last=state.tiers[state.tiers.length-1], r=parseRange(last?.range||"0–10"), start=r.max+1;
  state.tiers.push({range:`${start}–${start+20}`,time:"",commission:0,top:0});renderTiers();renderPreview();
}
function addBenefit(){state.benefits.push("");renderBenefits();renderPreview();const xs=q("#benefitsList").querySelectorAll("input");xs[xs.length-1]?.focus();}
function setStatus(s){q("#status").textContent=s;}

function config(){
  return {version:3,country:q("#country").value,locale:state.locale,currency:state.currency,xlsxFilename:state.xlsxFilename,texts:state.texts,tiers:state.tiers,benefits:state.benefits};
}

function makeXlsx(){
  const wb=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet([["Client volume","Weekly time","Commission","Top performer"],...state.tiers.map(t=>[t.range,t.time,+t.commission||0,+t.top||0])]),"Tiers");
  XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet([["Benefit"],...state.benefits.filter(Boolean).map(x=>[x])]),"Benefits");
  XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet([["Key","Value"],...Object.entries({...state.texts,locale:state.locale,currency:state.currency}).map(([k,v])=>[k,v])]),"Texts");
  return XLSX.write(wb,{bookType:"xlsx",type:"array"});
}

function makeHtml(){
  const cfg={dataUrl:"PASTE_PUBLIC_XLSX_URL_HERE",locale:state.locale,currency:state.currency,tiers:state.tiers,benefits:state.benefits.filter(Boolean)};
  const cfgJson=JSON.stringify(cfg,null,0).replace(/</g,"\\u003c").replace('"dataUrl":"PASTE_PUBLIC_XLSX_URL_HERE"','dataUrl:DATA_URL');
  return `<!-- Generated by Provident Calculator Generator -->
<section class="prov-calc">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet">
<script src="https://cdn.sheetjs.com/xlsx-0.20.2/package/dist/xlsx.full.min.js"></script>
${calcMarkup(state.texts)}
<script>
(function(){
var DATA_URL='PASTE_PUBLIC_XLSX_URL_HERE';
var root=document.currentScript.closest('.prov-calc');
(${provCalcRuntime.toString()})(root,${cfgJson});
})();
</script>
</section>`;
}

function blobDownload(blob,name){const u=URL.createObjectURL(blob),a=document.createElement("a");a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000)}
function textDownload(text,name,type="text/plain"){blobDownload(new Blob([text],{type}),name)}

q("#country").addEventListener("change",e=>setPreset(e.target.value));
q("#locale").addEventListener("input",e=>{state.locale=e.target.value||"en-GB";renderPreview()});
q("#currency").addEventListener("input",e=>{state.currency=e.target.value.toUpperCase()||"EUR";e.target.value=state.currency;renderPreview()});
q("#xlsxFilename").addEventListener("input",e=>state.xlsxFilename=e.target.value||"Calculator_Data.xlsx");
q("#ctaTarget").addEventListener("change",e=>{state.texts.cta_target=e.target.value;renderPreview()});
q("#addTierBtn").addEventListener("click",addTier);
q("#addBenefitBtn").addEventListener("click",addBenefit);
document.querySelectorAll("[data-preview-device]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    previewDevice=btn.dataset.previewDevice==="mobile"?"mobile":"desktop";
    document.querySelectorAll("[data-preview-device]").forEach(x=>x.classList.toggle("is-active",x===btn));
    fitPreview();
  });
});

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

injectCalcCss();
renderEditor();
renderPreview(true);
})();