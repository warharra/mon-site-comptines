// ---------- Données ----------
const themes = {
  animaux: [
    {id:1, name:"Chat", icon:"🐱"},
    {id:2, name:"Chien", icon:"🐶"},
    {id:3, name:"Lion", icon:"🦁"},
    {id:4, name:"Ours", icon:"🐻"},
    {id:5, name:"Lapin", icon:"🐰"},
    {id:6, name:"Singe", icon:"🐵"},
    {id:7, name:"Éléphant", icon:"🐘"},
    {id:8, name:"Panda", icon:"🐼"},
    {id:9, name:"Souris", icon:"🐭"},
    {id:10, name:"Renard", icon:"🦊"}
  ],
  fruits: [
    {id:1, name:"Pomme", icon:"🍎"},
    {id:2, name:"Banane", icon:"🍌"},
    {id:3, name:"Raisin", icon:"🍇"},
    {id:4, name:"Pastèque", icon:"🍉"},
    {id:5, name:"Cerise", icon:"🍒"},
    {id:6, name:"Citron", icon:"🍋"},
    {id:7, name:"Fraise", icon:"🍓"},
    {id:8, name:"Kiwi", icon:"🥝"},
    {id:9, name:"Orange", icon:"🍊"},
    {id:10, name:"Poire", icon:"🍐"}
  ],
  legumes: [
    {id:1, name:"Carotte", icon:"🥕"},
    {id:2, name:"Brocoli", icon:"🥦"},
    {id:3, name:"Maïs", icon:"🌽"},
    {id:4, name:"Aubergine", icon:"🍆"},
    {id:5, name:"Piment", icon:"🌶️"},
    {id:6, name:"Tomate", icon:"🍅"},
    {id:7, name:"Champignon", icon:"🍄"},
    {id:8, name:"Poivron", icon:"🫑"},
    {id:9, name:"Oignon", icon:"🧅"},
    {id:10, name:"Radis", icon:"🍠"}
  ]
};

// ---------- Variables ----------
let level = 1;
let totalPairs = 6;
let theme = 'animaux';
let cardsData = [];
let flippedCards = [];
let pairsFound = 0;

const gameContainer = document.getElementById('game-container');
const txtInstructions = document.getElementById('txtInstructions');
const txtCounter = document.getElementById('txtCounter');
const txtVictory = document.getElementById('txtVictory');
const confettiCanvas = document.getElementById('confetti');
const sndPop = document.getElementById('sndPop');
const sndDing = document.getElementById('sndDing');
const sndApplause = document.getElementById('sndApplause');
const themeSelect = document.getElementById('themeSelect');
const levelBtns = [
  document.getElementById('level1'),
  document.getElementById('level2'),
  document.getElementById('level3')
];

// Shuffle util
function shuffle(a){ let i=a.length; while(i){ const j=Math.floor(Math.random()*i); i--; [a[i],a[j]]=[a[j],a[i]]; } return a; }

// ---------- Calcul dynamique de la grille ----------
// but: trouver (cols, rows, sizePx) qui maximise sizePx tout en tenant dans l'espace disponible
function adjustGrid(totalCards) {
  // Calculer l'espace vertical disponible au-dessous du header (distance du top du container)
  const containerRect = gameContainer.getBoundingClientRect();
  const headerTop = containerRect.top; // distance depuis le haut de la fenêtre
  const availableHeight = Math.max( Math.floor(window.innerHeight - headerTop - 12), 80 ); // px
  // largeur disponible pour la zone jeu (elle est basée sur #game-container width)
  // (gameContainer.clientWidth prend en compte padding intérieur)
  const containerWidth = Math.max(gameContainer.clientWidth, 80);

  // Récupérer gap en px (fallback 10)
  const gap = parseFloat(getComputedStyle(gameContainer).gap) || 10;

  // borne supérieure pour le nombre de colonnes (ne pas dépasser totalCards)
  // on évite des colonnes énormes sur très grand écran en limitant la taille min par carte
  const MIN_CARD = 40; // px minimal acceptable
  const colsMax = Math.min(totalCards, Math.max(1, Math.floor((containerWidth + gap) / (MIN_CARD + gap))));

  let best = { cols: 1, rows: totalCards, size: 0 };

  for (let cols = 1; cols <= colsMax; cols++) {
    const rows = Math.ceil(totalCards / cols);
    // espace disponible pour les cartes (enlevant gaps)
    const wAvailForCards = containerWidth - (cols - 1) * gap;
    const hAvailForCards = availableHeight - (rows - 1) * gap;
    if (wAvailForCards <= 0 || hAvailForCards <= 0) continue;
    const sizeW = wAvailForCards / cols;
    const sizeH = hAvailForCards / rows;
    const size = Math.floor(Math.min(sizeW, sizeH));
    if (size > best.size) best = { cols, rows, size };
  }

  // si pas trouvé, fallback
  if (best.size <= 0) {
    best = { cols: Math.min(4, totalCards), rows: Math.ceil(totalCards / Math.min(4,totalCards)), size: 60 };
  }

  // On met la hauteur du container au pixel dispo pour que le grid puisse être dimensionné proprement
  gameContainer.style.height = `${availableHeight}px`;

  // Appliquer la grille en px (colonnes/rows explicitement en px)
  gameContainer.style.gridTemplateColumns = `repeat(${best.cols}, ${best.size}px)`;
  gameContainer.style.gridTemplateRows = `repeat(${best.rows}, ${best.size}px)`;

  // Mettre la taille dans la variable CSS pour adapter le font-size des faces
  gameContainer.style.setProperty('--card-size', `${best.size}px`);
}

// ---------- Initialisation du jeu ----------
function initGame() {
  // reset
  gameContainer.innerHTML = '';
  flippedCards = [];
  pairsFound = 0;
  txtVictory.classList.add('hidden');
  confettiCanvas.classList.add('hidden');
  txtInstructions.textContent = "Clique sur une carte !";
  txtCounter.textContent = `Paires à trouver : ${totalPairs}`;

  // préparer les cartes (chaque paire deux cartes)
  const themeCards = themes[theme].slice(0, totalPairs);
  cardsData = shuffle(themeCards.concat(themeCards).map((c, idx) => ({
    pairID: c.id,
    name: c.name,
    icon: c.icon,
    idx,
    matched: false
  })));

  // Génère les divs (préalablement vides, on calcule la grille après insertion)
  cardsData.forEach((card, i) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.dataset.pairid = card.pairID;
    cardDiv.dataset.idx = i;

    const front = document.createElement('div');
    front.className = 'front';
    front.innerHTML = `<span aria-hidden="true">${card.icon}</span>`;

    const back = document.createElement('div');
    back.className = 'back';
    back.innerHTML = `<span aria-hidden="true">?</span>`;

    cardDiv.appendChild(front);
    cardDiv.appendChild(back);

    cardDiv.addEventListener('click', () => flipCard(cardDiv));
    gameContainer.appendChild(cardDiv);
  });

  // Ajuster la grille *après* que les cartes aient été ajoutées (mesures fiables)
  adjustGrid(cardsData.length);

  // Afficher temporairement puis cacher (après 3s)
  document.querySelectorAll('.card').forEach(c => c.classList.add('flipped'));
  setTimeout(() => {
    document.querySelectorAll('.card').forEach(c => c.classList.remove('flipped'));
  }, 3000);
}

// ---------- Flip / logique ----------
function flipCard(cardDiv) {
  const idx = parseInt(cardDiv.dataset.idx, 10);
  const card = cardsData[idx];
  if (!card || card.matched) return;
  if (cardDiv.classList.contains('flipped')) return;
  if (flippedCards.length === 2) return;

  cardDiv.classList.add('flipped');
  try { sndPop.currentTime = 0; sndPop.play(); } catch(e){}

  flippedCards.push(cardDiv);

  if (flippedCards.length === 2) {
    const [c1, c2] = flippedCards;
    const id1 = c1.dataset.pairid;
    const id2 = c2.dataset.pairid;
    if (id1 === id2) {
      setTimeout(() => {
        c1.classList.add('matched');
        c2.classList.add('matched');
        cardsData[parseInt(c1.dataset.idx,10)].matched = true;
        cardsData[parseInt(c2.dataset.idx,10)].matched = true;
        try { sndDing.currentTime = 0; sndDing.play(); } catch(e){}
        pairsFound++;
        txtCounter.textContent = `Paires à trouver : ${totalPairs - pairsFound}`;
        if (pairsFound === totalPairs) victory();
        flippedCards = [];
      }, 350);
    } else {
      setTimeout(() => {
        c1.classList.remove('flipped');
        c2.classList.remove('flipped');
        flippedCards = [];
      }, 900);
    }
  }
}

// ---------- Victoire + confetti ----------
function victory() {
  txtVictory.classList.remove('hidden');
  txtInstructions.textContent = "Bravo !! Tu as trouvé toutes les cartes ! 🎉";
  try { sndApplause.currentTime = 0; sndApplause.play(); } catch(e){}
  showConfetti();
}

/* Confetti simple (ne bloque pas) */
function showConfetti() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  confettiCanvas.classList.remove('hidden');
  const ctx = confettiCanvas.getContext('2d');
  const confettis = [];
  for(let i=0;i<80;i++){
    confettis.push({
      x: Math.random()*confettiCanvas.width,
      y: Math.random()*-confettiCanvas.height,
      r: Math.random()*6+4,
      color: `hsl(${Math.random()*360},70%,60%)`,
      vx: Math.random()*2-1, vy: Math.random()*3+1
    });
  }
  let alive = true;
  function draw(){
    if(!alive) return;
    ctx.clearRect(0,0,confettiCanvas.width, confettiCanvas.height);
    confettis.forEach(c=>{
      ctx.beginPath();
      ctx.arc(c.x,c.y,c.r,0,2*Math.PI);
      ctx.fillStyle = c.color;
      ctx.fill();
      c.x += c.vx; c.y += c.vy;
      if(c.y > confettiCanvas.height) c.y = Math.random()*-100;
    });
    requestAnimationFrame(draw);
  }
  draw();
  setTimeout(()=>{ confettiCanvas.classList.add('hidden'); alive=false; }, 3000);
}

// ---------- Events UI ----------
themeSelect.addEventListener('change', e => { theme = e.target.value; initGame(); });
levelBtns[0].addEventListener('click', () => { level = 1; totalPairs = 6; initGame(); });
levelBtns[1].addEventListener('click', () => { level = 2; totalPairs = 8; initGame(); });
levelBtns[2].addEventListener('click', () => { level = 3; totalPairs = 10; initGame(); });

let resizeTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // recalcule la grille (le nombre total de cartes = totalPairs*2)
    if (gameContainer.children.length) adjustGrid(totalPairs * 2);
  }, 120);
});

// initialisation
window.addEventListener('DOMContentLoaded', initGame);

