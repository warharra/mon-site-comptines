/* app.js
   Colle le PROMPT en haut du fichier (voir le bloc de prompt).
   Ce fichier doit :
   - charger levels.json (ou les niveaux inline)
   - initialiser l'UI et gérer les événements
   - rendre la scène SVG avec les objets (ex: cadeaux) en fonction du level
   - proposer 3 boutons de réponse, gérer clic/drag, vérifier la réponse
   - animer et sauvegarder la progression dans localStorage
   - implémenter mode libre canvas
*/

// -------------------- Initialisation et données --------------------
const APP = {
  levels: [],          // sera rempli depuis levels.json
  currentLevel: null,
  stars: 0,
  settings: {
    sound: true,
    difficulty: 'easy'
  }
};

// Charger levels.json (si disponible) sinon utiliser un tableau par défaut.
// Utiliser fetch pour charger levels.json ; pour un usage local sans serveur, on peut aussi inline les levels.
async function loadLevels() {
  try {
    const resp = await fetch('levels.json');
    if (!resp.ok) throw new Error('levels.json non trouvé');
    APP.levels = await resp.json();
  } catch (e) {
    console.warn('Erreur chargement levels.json, utilisation de niveaux par défaut', e);
    // Niveau par défaut au cas où :
    APP.levels = [
      {"id":1,"title":"Maison - facile","difficulty":"easy","leftCount":3,"rightCount":2,"visual":"house","options":[4,5,6]},
      {"id":2,"title":"Voiture - facile","difficulty":"easy","leftCount":1,"rightCount":3,"visual":"car","options":[3,4,5]}
    ];
  }
}

// -------------------- Utilitaires --------------------
function $(sel){ return document.querySelector(sel); }
function $all(sel){ return document.querySelectorAll(sel); }

function saveProgress() {
  localStorage.setItem('jeu-additions-v1', JSON.stringify({
    stars: APP.stars,
    currentLevelId: APP.currentLevel ? APP.currentLevel.id : null
  }));
}

function loadProgress() {
  try {
    const raw = localStorage.getItem('jeu-additions-v1');
    if (!raw) return;
    const obj = JSON.parse(raw);
    APP.stars = obj.stars || 0;
    // on ne force pas le niveau dessus afin de laisser l'enfant choisir
  } catch(e){ console.warn(e); }
}

// -------------------- UI : Ecrans --------------------
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// -------------------- Galerie / sélection de niveaux --------------------
function renderGallery() {
  const gallery = document.querySelector('.gallery-preview');
  gallery.innerHTML = '';
  const filtered = APP.levels.filter(l => {
    // Filtrer par difficulté si besoin
    if (APP.settings.difficulty === 'easy') return l.difficulty === 'easy';
    if (APP.settings.difficulty === 'medium') return l.difficulty !== 'hard';
    return true;
  });
  filtered.forEach(l => {
    const card = document.createElement('div');
    card.className = 'level-card';
    card.innerHTML = `
      <div class="thumb">${renderMiniSVG(l.visual)}</div>
      <div class="meta"><strong>${l.title}</strong><div>${l.leftCount} + ${l.rightCount}</div></div>
      <button class="btn start-level" data-id="${l.id}">Démarrer</button>
    `;
    gallery.appendChild(card);
  });
  // add event listeners
  document.querySelectorAll('.start-level').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = Number(e.currentTarget.dataset.id);
      startLevelById(id);
    });
  });
}

// Petit helper qui renverra un SVG miniature selon "visual" (house, car, flowers)
function renderMiniSVG(name) {
  // On renvoie un petit SVG inline simple. Copilot peut enrichir ces SVG.
  if (name === 'house') {
    return `<svg width="64" height="48" viewBox="0 0 64 48" aria-hidden="true">
      <rect x="8" y="20" width="48" height="24" fill="#ffd18c" stroke="#333"/>
      <polygon points="32,4 4,20 60,20" fill="#ff8a8a" stroke="#333"/>
    </svg>`;
  } else if (name === 'car') {
    return `<svg width="64" height="48" viewBox="0 0 64 48">
      <rect x="6" y="18" width="52" height="16" fill="#8ad3ff" stroke="#333" rx="4"/>
      <circle cx="20" cy="36" r="4" fill="#333"/><circle cx="44" cy="36" r="4" fill="#333"/>
    </svg>`;
  } else {
    // default flower
    return `<svg width="64" height="48" viewBox="0 0 64 48"><circle cx="32" cy="24" r="8" fill="#ffda77"/></svg>`;
  }
}

// -------------------- Démarrage d'un niveau --------------------
function startLevelById(id) {
  const lvl = APP.levels.find(x => x.id === id);
  if (!lvl) return alert('Niveau introuvable');
  APP.currentLevel = lvl;
  document.getElementById('level-num').textContent = lvl.id;
  renderLevelScene(lvl);
  showScreen('game');
}

// -------------------- Rendu de la scène & options réponses --------------------
function renderLevelScene(lvl) {
  // Construire un SVG composé de deux zones (left / right) affichant leftCount et rightCount objets
  // On affichera des icônes (cadeau, voiture, fleur) en répétition.
  const scene = document.getElementById('scene');
  scene.innerHTML = ''; // clear

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS,'svg');
  svg.setAttribute('viewBox','0 0 400 280');
  svg.setAttribute('width','100%');
  svg.setAttribute('height','100%');
  svg.setAttribute('role','img');
  svg.setAttribute('aria-label', `Représentation : ${lvl.leftCount} et ${lvl.rightCount}`);

  // Zone gauche
  const leftGroup = document.createElementNS(svgNS,'g');
  leftGroup.setAttribute('transform','translate(30,40)');
  const rightGroup = document.createElementNS(svgNS,'g');
  rightGroup.setAttribute('transform','translate(230,40)');

  // Helper pour dessiner des "cadeaux" (ou autres) dans un groupe
  function drawObjects(group,count, type){
    for(let i=0;i<count;i++){
      const x = (i%3)*40;
      const y = Math.floor(i/3)*40;
      const gift = document.createElementNS(svgNS,'rect');
      gift.setAttribute('x', x);
      gift.setAttribute('y', y);
      gift.setAttribute('width', 32);
      gift.setAttribute('height', 32);
      gift.setAttribute('rx',6);
      gift.setAttribute('fill', i%2===0 ? '#7ee8a6' : '#7ed0ff');
      gift.setAttribute('stroke','#2b2b2b');
      group.appendChild(gift);
    }
  }

  drawObjects(leftGroup, lvl.leftCount, lvl.visual);
  drawObjects(rightGroup, lvl.rightCount, lvl.visual);

  svg.appendChild(leftGroup);
  svg.appendChild(rightGroup);
  scene.appendChild(svg);

  // Générer les options de réponses (3 boutons), mélanger
  const answersContainer = document.getElementById('answers');
  answersContainer.innerHTML = '';
  // S'assurer que la vraie réponse est incluse
  const correct = lvl.leftCount + lvl.rightCount;
  const opts = new Set(lvl.options || []);
  opts.add(correct);
  // prendre 3 valeurs
  const arr = Array.from(opts).slice(0,3);
  shuffleArray(arr);

  arr.forEach(val => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.textContent = val;
    btn.setAttribute('aria-label', `Réponse ${val}`);
    btn.dataset.value = val;
    // click handler
    btn.addEventListener('click', () => onAnswerSelected(Number(btn.dataset.value)));
    // enable drag for fun (mobile & desktop)
    btn.draggable = true;
    btn.addEventListener('dragstart', (ev) => {
      ev.dataTransfer.setData('text/plain', btn.dataset.value);
    });
    answersContainer.appendChild(btn);
  });

  // Setup drop area on SVG (simple spot near bottom-right)
  setupDropTargets(svg);
}

// -------------------- Drag & Drop handling --------------------
function setupDropTargets(svg) {
  // créer une zone "drop" en bas à droite
  const svgNS = "http://www.w3.org/2000/svg";
  // supprimer anciens drop si existent
  const old = svg.querySelector('.drop-target');
  if (old) old.remove();

  const rt = document.createElementNS(svgNS,'rect');
  rt.setAttribute('x', 320);
  rt.setAttribute('y', 220);
  rt.setAttribute('width', 56);
  rt.setAttribute('height', 40);
  rt.setAttribute('fill','rgba(255,255,255,0.05)');
  rt.setAttribute('stroke','#222');
  rt.classList.add('drop-target');
  svg.appendChild(rt);

  // Events pour drop - utiliser zone HTML overlay pour compatibilité mobile
  const sceneEl = document.getElementById('scene');
  sceneEl.addEventListener('dragover', (e) => e.preventDefault());
  sceneEl.addEventListener('drop', (e) => {
    e.preventDefault();
    const val = Number(e.dataTransfer.getData('text/plain'));
    if (!isNaN(val)) onAnswerSelected(val);
  });
}

// -------------------- Réponse sélectionnée --------------------
function onAnswerSelected(value) {
  const lvl = APP.currentLevel;
  if (!lvl) return;
  const correct = lvl.leftCount + lvl.rightCount;
  if (value === correct) {
    // succès : jouer son, animation, ajouter étoile, sauvegarder
    APP.stars++;
    saveProgress();
    playSound('success');
    showCongrats(`Bravo ! ${value} est la bonne réponse`);
    // animation simple : confetti CSS
    triggerConfetti();
  } else {
    // échec : jouer son d'erreur, encourager
    playSound('fail');
    showTemporaryMessage('Oups, essaie encore !');
  }
}

// -------------------- Sons & musique --------------------
function playSound(name) {
  if (!APP.settings.sound) return;
  // Pour simplicité, on peut créer <audio> éléments dans assets/sounds
  // Copilot : instancier audio si présent
  try {
    const audio = new Audio(`assets/sounds/${name}.mp3`);
    audio.volume = 0.7;
    audio.play();
  } catch(e){ console.warn('audio non trouvé', e); }
}

// -------------------- UI helpers : messages, modal --------------------
function showCongrats(msg) {
  const modal = document.getElementById('modal');
  document.getElementById('modal-msg').textContent = msg;
  modal.classList.remove('hidden');
  // quand on clique continuer : avancer au prochain niveau
  document.getElementById('modal-close').onclick = () => {
    modal.classList.add('hidden');
    // avancer niveau si existe
    goToNextLevel();
  };
}

function showTemporaryMessage(msg) {
  // implémenter un message temporaire dans la page (toast simple)
  let toast = document.getElementById('temp-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'temp-toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform='translateX(-50%)';
    toast.style.background='rgba(0,0,0,0.7)';
    toast.style.color='white';
    toast.style.padding='10px 14px';
    toast.style.borderRadius='10px';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  setTimeout(()=>{ toast.style.opacity='0'; }, 1500);
}

// -------------------- Progression --------------------
function goToNextLevel() {
  const currentId = APP.currentLevel.id;
  // chercher next by id
  const idx = APP.levels.findIndex(l => l.id === currentId);
  if (idx === -1 || idx === APP.levels.length - 1) {
    // fin du jeu
    showTemporaryMessage('Tu as fini tous les niveaux disponibles !');
    showScreen('home');
  } else {
    const next = APP.levels[idx+1];
    startLevelById(next.id);
  }
}

// -------------------- Confetti simple --------------------
function triggerConfetti() {
  // Effet simple: créer quelques éléments colorés animés en JS/CSS
  for(let i=0;i<12;i++){
    const d = document.createElement('div');
    d.className = 'confetti';
    d.style.position='fixed';
    d.style.left = `${50 + (Math.random()*40 - 20)}%`;
    d.style.top = '20%';
    d.style.width='10px';
    d.style.height='14px';
    d.style.background = ['#ff6b6b','#ffd166','#06d6a0','#4ecdc4','#7b2cbf'][Math.floor(Math.random()*5)];
    d.style.opacity='0.9';
    d.style.borderRadius='2px';
    d.style.transform = `rotate(${Math.random()*360}deg)`;
    document.body.appendChild(d);
    // anim simple
    d.animate([
      { transform: `translateY(0) rotate(0)`, opacity:1 },
      { transform: `translateY(300px) rotate(360deg)`, opacity:0 }
    ], { duration: 1400 + Math.random()*800, easing:'ease-out'});
    setTimeout(()=>d.remove(), 2200);
  }
}

// -------------------- Mode libre : canvas drawing --------------------
function initFreeDraw() {
  const canvas = document.getElementById('draw-canvas');
  resizeCanvasToContainer(canvas);
  const ctx = canvas.getContext('2d');
  ctx.lineJoin = ctx.lineCap = 'round';
  let drawing = false;
  let last = {x:0,y:0};
  let colorInput = document.getElementById('brush-color');
  let sizeInput = document.getElementById('brush-size');

  function setBrush(){
    ctx.strokeStyle = colorInput.value;
    ctx.lineWidth = sizeInput.value;
  }
  setBrush();
  colorInput.onchange = setBrush;
  sizeInput.oninput = setBrush;

  function getPos(e){
    if(e.touches && e.touches[0]) {
      const rect=canvas.getBoundingClientRect();
      return {x: e.touches[0].clientX-rect.left, y: e.touches[0].clientY-rect.top};
    }
    const rect = canvas.getBoundingClientRect();
    return {x: e.clientX-rect.left, y: e.clientY-rect.top};
  }

  canvas.addEventListener('mousedown', (e) => { drawing=true; last=getPos(e); });
  canvas.addEventListener('touchstart', (e) => { drawing=true; last=getPos(e); e.preventDefault(); });

  canvas.addEventListener('mousemove', (e) => { if (!drawing) return; const p=getPos(e); ctx.beginPath(); ctx.moveTo(last.x,last.y); ctx.lineTo(p.x,p.y); ctx.stroke(); last=p; });
  canvas.addEventListener('touchmove', (e) => { if (!drawing) return; const p=getPos(e); ctx.beginPath(); ctx.moveTo(last.x,last.y); ctx.lineTo(p.x,p.y); ctx.stroke(); last=p; e.preventDefault(); });

  function stop(){ drawing=false; }
  canvas.addEventListener('mouseup', stop);
  canvas.addEventListener('mouseleave', stop);
  canvas.addEventListener('touchend', stop);

  document.getElementById('btn-erase').addEventListener('click', () => {
    // gomme : nettoie le canvas
    ctx.clearRect(0,0,canvas.width,canvas.height);
  });

  document.getElementById('btn-download').addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'mon-dessin.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });

  // handle window resize
  window.addEventListener('resize', () => resizeCanvasToContainer(canvas, ctx));
}

function resizeCanvasToContainer(canvas, ctx) {
  const parent = canvas.parentElement || document.body;
  canvas.width = parent.clientWidth - 36; // padding compensation
  canvas.height = Math.max(400, window.innerHeight * 0.5);
  // if want to keep drawing on resize, need to copy image; skip for simplicity
}

// -------------------- Helpers --------------------
function shuffleArray(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }

// -------------------- Bind UI events --------------------
function bindUI() {
  $('#btn-play').addEventListener('click', () => {
    renderGallery();
    showScreen('home'); // ouvre la galerie (déjà sur home)
    // scroll to gallery
    document.querySelector('.gallery-preview').scrollIntoView({behavior:'smooth'});
  });
  $('#btn-free').addEventListener('click', () => {
    showScreen('freedraw');
    initFreeDraw();
  });
  $('#btn-back').addEventListener('click', () => showScreen('home'));
  $('#btn-back-fd').addEventListener('click', () => showScreen('home'));

  $('#toggle-sound').addEventListener('change', (e) => {
    APP.settings.sound = e.target.checked;
  });
  $('#select-diff').addEventListener('change', (e) => {
    APP.settings.difficulty = e.target.value;
    renderGallery();
  });

  $('#btn-reset').addEventListener('click', () => {
    // relancer même niveau
    if (APP.currentLevel) startLevelById(APP.currentLevel.id);
  });

  $('#btn-save').addEventListener('click', () => {
    // sauver l'aperçu du SVG en image -> utiliser XMLSerializer + canvas
    exportSceneToPNG();
  });
}

// Exporter la scène SVG en PNG
function exportSceneToPNG() {
  const scene = document.getElementById('scene');
  const svg = scene.querySelector('svg');
  if (!svg) return;
  const xml = new XMLSerializer().serializeToString(svg);
  const svg64 = btoa(unescape(encodeURIComponent(xml)));
  const b64start = 'data:image/svg+xml;base64,';
  const img = new Image();
  img.onload = function(){
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img,0,0);
    const png = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = png;
    a.download = 'niveau.png';
    a.click();
  };
  img.src = b64start + svg64;
}

// -------------------- Bootstrap --------------------
async function initApp() {
  loadProgress();
  await loadLevels();
  bindUI();
  // Afficher home par défaut
  renderGallery();
  showScreen('home');
}

initApp();
