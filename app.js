'use strict';
const $ = selector => document.querySelector(selector);
const copy = {
 pt:{home:'Início',notebook:'O caderno',questions:'Perguntas',sessions:'Consultas',kicker:'Astrologia & cultura persa',title:'Entre o céu',title2:'e a terra.',intro:'Um caderno de astrologia, símbolos e reflexões, inspirado pela tradição persa e pela vida cotidiana.',explore:'Explorar o caderno',book:'Agendar uma conversa',journal:'Páginas de Setareh',all:'Todos',tradition:'Tradição',symbols:'Símbolos',notes:'Reflexões',mail:'Cartas ao caderno',qIntro:'Uma dúvida sobre um símbolo, um texto ou uma leitura? A conversa pode começar por aqui.',ask:'Escrever uma pergunta',one:'Hora marcada',private:'Uma conversa particular',bookingIntro:'Escolha um dia e um horário de preferência. A confirmação é combinada diretamente por e-mail.',foot:'Astrologia, cultura e reflexão',edit:'Área da autora',read:'min de leitura',back:'Voltar ao caderno',close:'Fechar',name:'Seu nome',date:'Data de preferência',time:'Horário de preferência',zone:'Fuso horário',message:'Sua mensagem',open:'Abrir no meu e-mail',contactIntro:'Escreva sua pergunta e continue no seu aplicativo de e-mail.',inactive:'O contato por e-mail estará disponível quando a autora abrir a correspondência.',opened:'Rascunho preparado. Confira e envie pelo seu aplicativo de e-mail.',empty:'Ainda não há textos nesta categoria.',noPost:'Texto indisponível',skip:'Pular para o conteúdo',heading:'Caderno de astrologia',copied:'Copiar endereço de e-mail',done:'Endereço copiado',zoneHint:'Ex.: São Paulo, UTC−3',preferred:'Preferência',failed:'Não foi possível carregar o caderno. Recarregue a página para tentar novamente.'},
 en:{home:'Home',notebook:'The journal',questions:'Questions',sessions:'Sessions',kicker:'Astrology & Persian culture',title:'Between sky',title2:'and earth.',intro:'A journal of astrology, symbols and reflections, inspired by Persian tradition and everyday life.',explore:'Explore the journal',book:'Book a conversation',journal:'Pages of Setareh',all:'All',tradition:'Tradition',symbols:'Symbols',notes:'Reflections',mail:'Letters to the journal',qIntro:'A question about a symbol, an essay or a reading? Our conversation can begin here.',ask:'Write a question',one:'By appointment',private:'A private conversation',bookingIntro:'Suggest a day and time that suit you. The author will confirm your session by email.',foot:'Astrology, culture and reflection',edit:'Author access',read:'min read',back:'Back to the journal',close:'Close',name:'Your name',date:'Preferred date',time:'Preferred time',zone:'Time zone',message:'Your message',open:'Open in my email app',contactIntro:'Write your question and continue in your email app.',inactive:'Email contact will be available when the author opens correspondence.',opened:'Draft prepared. Review and send it from your email app.',empty:'There are no entries in this category yet.',noPost:'Entry unavailable',skip:'Skip to content',heading:'An astrology journal',copied:'Copy email address',done:'Address copied',zoneHint:'e.g. London, UTC+0',preferred:'Preference',failed:'The journal could not load. Please refresh the page to try again.'}
};
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
let lang = new URLSearchParams(location.search).get('lang');
if (!['en','pt'].includes(lang)) {try{lang=localStorage.getItem('setareh-language')}catch{}}
if (!['en','pt'].includes(lang)) lang = navigator.language.startsWith('en') ? 'en' : 'pt';
let articles=[], questions=[], site={}, filter='all', ready=false;
const categories=['all','tradition','symbols','notes'];
const sections={inicio:'home',caderno:'notebook',perguntas:'questions',consultas:'sessions'};
const t=key=>copy[lang][key];
const imageFor=a=>'assets/'+(['chart','sun','garden'].includes(a.art)?a.art:'chart')+'.webp';
const paragraphs=value=>String(value||'').split(/\n\s*\n/).map(p=>'<p>'+esc(p)+'</p>').join('');
function menu(open){$('#nav').classList.toggle('open',open);$('#menu').setAttribute('aria-expanded',open)}
function render(){
 document.documentElement.lang=lang==='pt'?'pt-BR':'en';document.title='Setareh · '+t('heading');$('.skip').textContent=t('skip');
 document.querySelectorAll('[data-t]').forEach(el=>el.textContent=t(el.dataset.t));
 $('#nav').innerHTML=Object.entries(sections).map(([id,key])=>'<a href="#'+id+'">'+esc(t(key))+'</a>').join('');
 document.querySelectorAll('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.lang===lang));
 $('#close').ariaLabel=t('close');$('#filters').innerHTML=categories.map(key=>'<button data-filter="'+key+'" aria-pressed="'+(filter===key)+'">'+t(key)+'</button>').join('');
 const rows=articles.filter(a=>a[lang]?.title&&(filter==='all'||a.category===filter));
 $('#cards').innerHTML=rows.map(a=>{
  const p=a[lang], mins=Math.max(1,Math.ceil(p.body.trim().split(/\s+/).length/190));
  return '<a class="card" href="#post/'+encodeURIComponent(a.id)+'"><div class="cover"><img src="'+imageFor(a)+'" alt=""></div><div class="meta">'+esc(t(a.category)||t('notes'))+' <span> · '+mins+' '+t('read')+'</span></div><h3>'+esc(p.title)+'</h3><p>'+esc(p.summary)+'</p></a>';
 }).join('')||(ready?'<p class="empty">'+t('empty')+'</p>':'');
 $('#qa').innerHTML=questions.filter(q=>q[lang]?.title).map(q=>'<details><summary>'+esc(q[lang].title)+'</summary>'+paragraphs(q[lang].body)+'</details>').join('');
 activateNav();
}
function activateNav(){const current=location.hash.slice(1)||'inicio';document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+(current.startsWith('post/')?'caderno':current)))}
function showPanel(html){$('#panelBody').innerHTML=html;if(!$('#panel').open)$('#panel').showModal();$('#panel').scrollTop=0}
function route(){
 menu(false);activateNav();
 if(location.hash.startsWith('#post/')&&ready){
  const a=articles.find(x=>'#post/'+encodeURIComponent(x.id)===location.hash),p=a?.[lang];showPanel(p?'<div class="eyebrow">'+esc(t(a.category))+'</div><h2 id="dialogTitle">'+esc(p.title)+'</h2><img class="dialog-cover" src="'+imageFor(a)+'" alt="">'+paragraphs(p.body)+'<a class="btn ink" href="#caderno">'+t('back')+'</a>':'<h2 id="dialogTitle">'+t('noPost')+'</h2>');
 }else if($('#panel').open)$('#panel').close();
}
const validEmail=()=>/^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(site.email||'');
function contact(kind){
 const booking=kind==='booking',title=t(booking?'book':'ask'),desc=t(booking?'bookingIntro':'contactIntro');
 const field=(key,type,extra='')=>'<label>'+t(key)+'<input name="'+key+'" type="'+type+'" required '+extra+'></label>';
 let content='<div class="eyebrow">Setareh</div><h2 id="dialogTitle">'+title+'</h2><p>'+desc+'</p>';
 if(!validEmail()){showPanel(content+'<p class="note">'+t('inactive')+'</p>');return}
 const today=new Date(), localDate=new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().slice(0,10);
 const zone=Intl.DateTimeFormat().resolvedOptions().timeZone||'';
 content+='<form id="contactForm">'+field('name','text','autocomplete="given-name" maxlength="80"')+(booking?field('date','date','min="'+localDate+'"')+field('time','time')+field('zone','text','value="'+esc(zone)+'" maxlength="80"'):'')+'<label>'+t('message')+'<textarea name="message" maxlength="1200" '+(booking?'':'required')+'></textarea></label><button class="btn ink">'+t('open')+'</button><p class="feedback" role="status"></p></form><small>'+esc(site.email)+'</small>';
 showPanel(content);
 $('#contactForm').onsubmit=e=>{e.preventDefault();const form=new FormData(e.currentTarget),body=[t('name')+' — '+form.get('name'),...(booking?[t('preferred')+' — '+form.get('date')+' '+form.get('time')+' ('+form.get('zone')+')']:[]),form.get('message')].join('\n\n');location.href='mailto:'+encodeURIComponent(site.email).replace('%40','@')+'?subject='+encodeURIComponent('Setareh · '+title)+'&body='+encodeURIComponent(body);$('.feedback').textContent=t('opened')};
}
document.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;
 if(b.dataset.lang){lang=b.dataset.lang;try{localStorage.setItem('setareh-language',lang)}catch{}const u=new URL(location.href);u.searchParams.set('lang',lang);history.replaceState(null,'',u);render();route()}
 if(b.dataset.filter){filter=b.dataset.filter;render();document.querySelector('[data-filter="'+filter+'"]').focus()}
 if(b.dataset.contact)contact(b.dataset.contact);
 if(b.id==='menu')menu(!$('#nav').classList.contains('open'));
 if(b.id==='close')$('#panel').close();
});
$('#nav').onclick=()=>menu(false);
$('#panel').addEventListener('close',()=>{if(location.hash.startsWith('#post/')){history.replaceState(null,'','#caderno');activateNav()}});
$('#panel').addEventListener('click',e=>{if(e.target!==$('#panel'))return;const r=$('#panel').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('#panel').close()});
window.addEventListener('hashchange',route);
async function init(){render();try{
 const load=name=>fetch('data/'+name+'.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error();return r.json()});
 [articles,questions,site]=await Promise.all(['articles','questions','site'].map(load));ready=true;render();route();
}catch{$('#cards').textContent=t('failed')}}
init();
