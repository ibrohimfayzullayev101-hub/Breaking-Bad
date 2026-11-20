const translations={ru:{navHome:'Главная',navSeries:'Сериал',navCast:'Персонажи',navEpisodes:'Сезоны',tag:'КУЛЬТОВЫЙ СЕРИАЛ',summary:'Учитель химии принимает решения, которые навсегда меняют его жизнь. История о власти, семье, последствиях и границах, которые легко переступить.',play:'Трейлеры',more:'Подробнее',trending:'Популярное в мире Breaking Bad',characters:'Главные персонажи',seasonTitle:'Пять сезонов.<br>Одна история.',seasonText:'От первого решения до последствий — исследуй историю в пяти главах.',footer:'Фан-сайт · Неофициальный проект · Не связан с правообладателями',up:'Наверх',trailer:'Открыть трейлеры'},en:{navHome:'Home',navSeries:'Series',navCast:'Characters',navEpisodes:'Seasons',tag:'THE CULT TV SERIES',summary:'A chemistry teacher makes decisions that change his life forever. A story about power, family, consequences and the lines people cross.',play:'Trailers',more:'More info',trending:'Trending in the Breaking Bad universe',characters:'Main characters',seasonTitle:'Five seasons.<br>One story.',seasonText:'From the first decision to its consequences — explore the story across five chapters.',footer:'Fan site · Unofficial · Not affiliated with rights holders',up:'Back to top',trailer:'Explore trailers'},uz:{navHome:'Bosh sahifa',navSeries:'Serial',navCast:'Qahramonlar',navEpisodes:'Fasllar',tag:'MASHHUR SERIAL',summary:'Kimyo o‘qituvchisi hayotini butunlay o‘zgartiradigan qarorlar qabul qiladi. Kuch, oila, oqibatlar va chegaralar haqidagi hikoya.',play:'Treylerlar',more:'Batafsil',trending:'Breaking Bad olamida mashhur',characters:'Asosiy qahramonlar',seasonTitle:'Besh fasl.<br>Bitta hikoya.',seasonText:'Birinchi qarordan uning oqibatlarigacha — hikoyani besh faslda kashf eting.',footer:'Fan-sayt · Norasmiy · Huquq egalari bilan bog‘liq emas',up:'Yuqoriga',trailer:'Treylerlarni ochish'}};
let lang='ru';const langBtn=document.getElementById('lang');function setLang(){document.querySelectorAll('[data-t]').forEach(el=>{const key=el.dataset.t;if(translations[lang][key])el.innerHTML=translations[lang][key]});langBtn.textContent=lang.toUpperCase()+' ▾'}langBtn.addEventListener('click',()=>{lang=lang==='ru'?'en':lang==='en'?'uz':'ru';setLang()});
const modal=document.getElementById('modal'),title=document.getElementById('modalTitle'),desc=document.getElementById('modalDesc');function showModal(t,d){title.textContent=t;desc.textContent=d;modal.classList.add('show')}document.getElementById('close').addEventListener('click',()=>modal.classList.remove('show'));modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('show')});document.addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.remove('show')});document.querySelectorAll('.tile,.poster,.season').forEach(el=>el.addEventListener('click',()=>showModal(el.dataset.title||el.querySelector('strong')?.textContent||'Breaking Bad',el.dataset.desc||'Explore this part of the series universe.')));document.getElementById('info').addEventListener('click',()=>showModal('Breaking Bad',translations[lang].summary));document.getElementById('play').addEventListener('click',()=>window.open('https://www.youtube.com/results?search_query=Breaking+Bad+official+trailer','_blank','noopener'));document.getElementById('modalAction').addEventListener('click',()=>window.open('https://www.youtube.com/results?search_query=Breaking+Bad+official+trailer','_blank','noopener'));const save=document.getElementById('save');save.addEventListener('click',()=>{save.classList.toggle('saved');save.textContent=save.classList.contains('saved')?'✓':'＋';save.title=save.classList.contains('saved')?'В списке':'Добавить в список'});setLang();

// Load actor portraits independently, so one missing cast image cannot blank the whole rail.
(async function loadCastPortraits(){
  const rail=document.getElementById('castRail'); if(!rail)return;
  const castMap={
    'Walter White':'Bryan Cranston','Jesse Pinkman':'Aaron Paul','Skyler White':'Anna Gunn',
    'Hank Schrader':'Dean Norris','Saul Goodman':'Bob Odenkirk',
    'Mike Ehrmantraut':'Jonathan Banks','Gustavo Fring':'Giancarlo Esposito'
  };
  const cards=[...rail.querySelectorAll('.cast-card')];
  await Promise.all(cards.map(async card=>{
    const character=card.querySelector('h3')?.textContent?.trim();
    const actor=castMap[character]; if(!actor)return;
    try{
      const response=await fetch('https://api.tvmaze.com/search/people?q='+encodeURIComponent(actor));
      if(!response.ok)throw new Error('portrait lookup failed');
      const results=await response.json();
      const person=results.find(item=>item.person?.name?.toLowerCase()===actor.toLowerCase())?.person||results[0]?.person;
      const image=person?.image?.original||person?.image?.medium;
      if(image){const photo=card.querySelector('.cast-photo');photo.style.backgroundImage=`url("${image}")`;card.classList.add('loaded');card.querySelector('.cast-copy p').textContent=actor;}
    }catch(e){console.info('Portrait unavailable for '+actor);}
  }));
})();
