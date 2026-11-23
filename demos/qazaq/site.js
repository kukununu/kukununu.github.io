// shared header, footer, reveals, cursor
const HERE = location.pathname.split('/').pop() || 'index.html';
const LOGO = `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-linecap="round" aria-hidden="true">${ORN.horn.svg}</svg>`;
const link = (href, t) => `<li><a href="${href}"${HERE === href ? ' aria-current="page"' : ''}>${t}</a></li>`;

document.body.insertAdjacentHTML('afterbegin', `
<a class="skip" href="#main">К содержанию</a>
<header class="nav${document.body.dataset.over ? ' over' : ''}" id="nav"><div class="in-row px">
  <nav aria-label="Разделы"><ul>${link('collection.html','Коллекция')}${link('ornaments.html','Орнаменты')}</ul></nav>
  <a class="logo" href="index.html" aria-label="ӨРНЕК, главная">${LOGO}ӨРНЕК</a>
  <nav aria-label="Ателье"><ul>${link('atelier.html','Ателье')}<li><a href="atelier.html#book">Примерка</a></li></ul></nav>
  <button class="burger" aria-label="Открыть меню" aria-expanded="false" aria-controls="menu"><span></span><span></span></button>
</div></header>
<div class="menu" id="menu"><a href="index.html">Главная</a><a href="collection.html">Коллекция</a><a href="ornaments.html">Орнаменты</a><a href="atelier.html">Ателье</a><a href="atelier.html#book">Записаться на примерку</a></div>`);

document.body.insertAdjacentHTML('beforeend', `
<footer><div class="px">
  <div class="fgrid">
    <div><p class="big">Одежда, в которой у каждого узора есть смысл.</p></div>
    <div><h4>Магазин</h4><a href="collection.html"><span class="u">Коллекция</span></a><a href="ornaments.html"><span class="u">Словарь орнаментов</span></a></div>
    <div><h4>Ателье</h4><p>Астана, район Есиль</p><p data-assumed>Вт–Сб, 11:00–20:00</p><a href="atelier.html#book"><span class="u">Записаться</span></a></div>
    <div><h4>Связь</h4><a href="mailto:hello@ornek.example"><span class="u">hello@ornek.example</span></a></div>
  </div>
  <div class="giant" aria-hidden="true">ӨРНЕК</div>
  <p class="credits">Демо-сайт. Фото: Aktanbay, Asemaitaizhan, Vyacheslav Kirillin, Ислам Мирсаитов, Екатерина Борисова (<a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>), Muzaffar Turgunov (CC0), Wikimedia Commons.</p>
</div></footer>
<div class="cursor" id="cursor" aria-hidden="true">Узнать смысл</div>`);

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const nav = document.getElementById('nav'); let lastY = 0;
const onScroll = () => {
  const y = scrollY, edge = document.body.dataset.over ? innerHeight * .8 : 10;
  nav.classList.toggle('solid', y > edge);
  nav.classList.toggle('hide', y > lastY && y > innerHeight * .6 && !document.getElementById('menu').classList.contains('open'));
  lastY = y;
};
addEventListener('scroll', onScroll, {passive:true}); onScroll();

const burger = nav.querySelector('.burger'), menu = document.getElementById('menu');
burger.onclick = () => { const o = menu.classList.toggle('open'); burger.setAttribute('aria-expanded', o); burger.setAttribute('aria-label', o ? 'Закрыть меню' : 'Открыть меню'); nav.classList.toggle('over', o); };

function observe(root = document){
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), {threshold:.2});
  root.querySelectorAll('.io').forEach(el => io.observe(el));
}

function cursor(){
  const cur = document.getElementById('cursor');
  if (!matchMedia('(pointer:fine)').matches) return;
  addEventListener('pointermove', e => cur.style.transform = `translate(${e.clientX}px,${e.clientY}px)`);
  document.querySelectorAll('.tile').forEach(t => { t.onpointerenter = () => cur.classList.add('on'); t.onpointerleave = () => cur.classList.remove('on'); });
}

const tile = (it, sizes = '(max-width:700px) 100vw, (max-width:1100px) 50vw, 33vw') => `
<a class="tile io" href="product.html?id=${it.id}" data-type="${it.type}">
  <div class="ph">${pic(it, sizes)}${svgOrn(it.orn)}</div>
  <div class="meta"><div><h3>${it.name}</h3><span class="word">${it.word} · ${it.wordRu}</span><p class="line">${it.line}</p></div><span class="price" data-assumed>${it.price}</span></div>
</a>`;

addEventListener('DOMContentLoaded', () => { observe(); cursor(); });
