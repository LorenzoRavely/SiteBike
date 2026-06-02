// ── RENDER DYNAMIC BIKES ──
function renderBikes() {
  const bikesGrid = document.getElementById('bikesGrid');
  if (!bikesGrid) return;

  const bikes = window.DoctorDB.getBikes();
  bikesGrid.innerHTML = '';

  bikes.forEach((bike, index) => {
    const badgeHtml = bike.badge ? `<div class="bv-badge-top">${bike.badge}</div>` : '';
    
    // Bike highlight config
    const isDestaque = bike.id === 'bike-2' || bike.destaque;
    const cardClass = `bv-card fade ${isDestaque ? 'bv-destaque' : ''} ${index === 1 ? 'fade-d1' : index === 2 ? 'fade-d2' : ''}`;
    const highlightLabelHtml = isDestaque ? `<div class="bv-label-destaque">⭐ Mais procurada</div>` : '';

    // Specs ring
    let specsRingHtml = '';
    if (bike.specsRing && bike.specsRing.length > 0) {
      specsRingHtml = `
        <div class="bv-specs-ring">
          ${bike.specsRing.map(dot => `
            <span class="spec-dot" style="--ang:${dot.ang}" title="${dot.title}">${dot.label}</span>
          `).join('')}
        </div>
      `;
    }

    // Specific specs
    let specsGridHtml = '';
    if (bike.especificacoes) {
      specsGridHtml = `
        <div class="bv-especificacoes">
          ${Object.entries(bike.especificacoes).map(([key, val]) => `
            <div class="bv-spec"><span>${key.charAt(0).toUpperCase() + key.slice(1)}</span><strong>${val}</strong></div>
          `).join('')}
        </div>
      `;
    }

    const priceDeHtml = bike.precoDe ? `<div class="bv-preco-de">De R$ ${bike.precoDe.toLocaleString('pt-BR')}</div>` : '';
    const priceHtml = `R$ ${bike.preco.toLocaleString('pt-BR')}`;
    const waText = encodeURIComponent(`Olá! Tenho interesse na ${bike.marca} ${bike.nome}`);
    const waUrl = `https://wa.me/5511976527640?text=${waText}`;
    const tagsHtml = bike.tags.map(t => `<span>${t}</span>`).join('');

    const cardHtml = `
      <div class="${cardClass}" data-categoria="${bike.categoria}">
        ${highlightLabelHtml}
        <div class="bv-circulo-wrap">
          <div class="bv-circulo">
            <div class="bv-arco"></div>
            <div class="bv-emoji">
              <img src="${bike.imagem}" alt="${bike.nome}">
            </div>
            ${badgeHtml}
            <button class="bv-like" title="Favoritar">♡</button>
          </div>
          ${specsRingHtml}
        </div>
        <div class="bv-info">
          <div class="bv-marca">${bike.marca}</div>
          <h3 class="bv-nome">${bike.nome}</h3>
          <div class="bv-tags">
            ${tagsHtml}
          </div>
          ${specsGridHtml}
          <div class="bv-preco-wrap">
            <div>
              ${priceDeHtml}
              <div class="bv-preco">${priceHtml}</div>
            </div>
            <a href="${waUrl}" class="bv-btn">
              Tenho interesse →
            </a>
          </div>
        </div>
      </div>
    `;
    
    bikesGrid.insertAdjacentHTML('beforeend', cardHtml);
  });
}

// Invoke rendering first
renderBikes();

// ── MENU MOBILE ──
function toggleMenu() {
  const nav = document.getElementById('nav');
  nav.classList.toggle('menu-open');
}

function closeMenu() {
  const nav = document.getElementById('nav');
  // Desativa transições temporariamente ao fechar
  document.body.classList.add('no-transition');
  nav.classList.remove('menu-open');
  setTimeout(() => document.body.classList.remove('no-transition'), 50);
}

// ── RODA — gera os raios dinamicamente ──
const wheelOuter = document.getElementById('wheelOuter');

if (wheelOuter) {
  for (let i = 0; i < 12; i++) {
    const spoke = document.createElement('div');
    spoke.className = 'spoke';
    spoke.style.transform = `rotate(${i * 30}deg)`;
    wheelOuter.appendChild(spoke);
  }
}

// ── NAVBAR — muda fundo ao rolar ──
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(13,13,13,0.97)';
  } else {
    nav.style.background = 'rgba(13,13,13,0.85)';
  }
});

// ── FAQ — abre/fecha itens ──
function toggleFaq(el) {
  const isOpen = el.classList.contains('open');

  // fecha todos
  document.querySelectorAll('.faq-item').forEach(item => {
    item.classList.remove('open');
  });

  // se estava fechado, abre o clicado
  if (!isOpen) {
    el.classList.add('open');
  }
}

// ── FADE IN — anima elementos ao entrar na tela ──
const fades = document.querySelectorAll('.fade');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // para de observar depois de animar
      }
    });
  },
  { threshold: 0.12 }
);

fades.forEach(el => observer.observe(el));

// ── FILTRO DE CATEGORIAS ──
document.querySelectorAll('.filtro').forEach(btn => {
  btn.addEventListener('click', () => {

    // Marca o botão ativo
    document.querySelectorAll('.filtro').forEach(b => b.classList.remove('ativo'));
    btn.classList.add('ativo');

    const filtro = btn.dataset.filtro;

    document.querySelectorAll('.bv-card').forEach(card => {
      if (filtro === 'todos' || card.dataset.categoria === filtro) {
        card.classList.remove('oculto');
      } else {
        card.classList.add('oculto');
      }
    });
  });
});

// ── BOTÃO LIKE / FAVORITAR — Event Delegation ──
const bikesGrid = document.getElementById('bikesGrid');
if (bikesGrid) {
  bikesGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.bv-like');
    if (btn) {
      btn.classList.toggle('liked');
      btn.textContent = btn.classList.contains('liked') ? '♥' : '♡';
    }
  });
}