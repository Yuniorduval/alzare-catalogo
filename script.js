// ALZARE - script.js
document.getElementById('year').textContent = new Date().getFullYear();

const products = [
  {id:1, title:'Camiseta ALZARE - Negra', price:'RD$ 1,200', tag:'Nuevo', desc:'Camiseta de algodón premium, corte urbano.'},
  {id:2, title:'Chaqueta Gold Trim', price:'RD$ 3,500', tag:'Edición Limitada', desc:'Chaqueta con detalles dorados.'},
  {id:3, title:'Pantalón Cargo', price:'RD$ 2,100', tag:'Hombre', desc:'Cargo cómodo, tela resistente.'},
  {id:4, title:'Vestido Satin', price:'RD$ 2,800', tag:'Mujer', desc:'Vestido elegante con brillo sutil.'},
  {id:5, title:'Gorra ALZARE', price:'RD$ 800', tag:'Accesorio', desc:'Gorra ajustable, logo bordado.'},
  {id:6, title:'Sudadera Oversize', price:'RD$ 1,900', tag:'Unisex', desc:'Sudadera con capucha y bolsillo.'},
  {id:7, title:'Parka Negra', price:'RD$ 4,200', tag:'Nuevo', desc:'Parka impermeable con forro térmico.'},
  {id:8, title:'Bolso Crossbody', price:'RD$ 1,650', tag:'Accesorio', desc:'Bolso compacto con estampado interior.'}
];

const productGrid = document.getElementById('productGrid');

function svgPlaceholder(text){
  // Simple SVG data URI placeholder (no external images needed)
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'>
  <defs><linearGradient id='g' x1='0' x2='1'><stop offset='0' stop-color='#151515'/><stop offset='1' stop-color='#0a0a0a'/></linearGradient></defs>
  <rect width='100%' height='100%' fill='url(#g)'/>
  <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='34' fill='#c79a2f' font-family='Arial, sans-serif'>${text}</text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

function renderProducts(){
  products.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="thumb"><img src="${svgPlaceholder(p.title)}" alt="${p.title}" loading="lazy" /></div>
      <div class="prod-info">
        <h3>${p.title}</h3>
        <p>${p.price} · <small>${p.tag}</small></p>
      </div>
    `;
    card.addEventListener('click', () => openModal(p));
    card.addEventListener('keypress', (e) => { if(e.key === 'Enter') openModal(p); });
    productGrid.appendChild(card);
  });
}

function openModal(p){
  const modal = document.getElementById('modal');
  const body = document.getElementById('modalBody');
  body.innerHTML = `
    <div style="display:flex;gap:18px;flex-wrap:wrap;">
      <div style="flex:1;min-width:260px">
        <img src="${svgPlaceholder(p.title)}" alt="${p.title}" style="width:100%;border-radius:8px" />
      </div>
      <div style="flex:1;min-width:220px">
        <h2 style="margin-top:0;color:var(--gold)">${p.title}</h2>
        <p style="color:var(--muted)">${p.desc}</p>
        <p style="font-weight:800;margin:12px 0">${p.price}</p>
        <p><button id="whBtn" class="btn"> WhatsApp</button></p>
        <p style="margin-top:10px;color:var(--muted)">Etiqueta: ${p.tag}</p>
      </div>
    </div>
  `;
  modal.setAttribute('aria-hidden','false');
  document.getElementById('modalClose').focus();

  // WhatsApp button handler
  document.getElementById('whBtn').addEventListener('click', () => {
    const phone = '8492568555'; // Reemplaza por tu número sin + ni guiones, formato: countrycode + number
    const text = encodeURIComponent(`${p.title} - Estoy interesado. ¿Está disponible?`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  });
}

document.getElementById('modalClose').addEventListener('click', () => {
  document.getElementById('modal').setAttribute('aria-hidden','true');
});

document.addEventListener('click', (e) => {
  if(e.target === document.getElementById('modal')) document.getElementById('modal').setAttribute('aria-hidden','true');
});

// Mobile menu toggle
document.getElementById('menuToggle').addEventListener('click', () => {
  const nav = document.getElementById('mainNav');
  if(nav.style.display === 'block') nav.style.display = '';
  else nav.style.display = 'block';
});

renderProducts();