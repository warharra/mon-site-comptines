const levelConfigs = [
{level:1, numButtons:4, maxSequence:4, speed:700},
{level:2, numButtons:5, maxSequence:5, speed:650},
{level:3, numButtons:6, maxSequence:6, speed:600},
{level:4, numButtons:7, maxSequence:7, speed:550},
{level:5, numButtons:8, maxSequence:8, speed:500},
];


// DOM refs
const board = document.getElementById('board');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const levelLabel = document.getElementById('level');
const stepLabel = document.getElementById('step');
const message = document.getElementById('message');


// Sounds
const sounds = {
pop: new Audio('sounds/pop.mp3'),
success: new Audio('../../sounds/applause.mp3'),
error: new Audio('../../sounds/error.mp3'),
};
// Ensure short sounds can overlap
Object.values(sounds).forEach(s=>{ s.preload = 'auto'; s.volume = 0.8 });


let currentLevelIndex = 0;
let config = levelConfigs[currentLevelIndex];
let numButtons = config.numButtons;
let sequence = []; 
let playerIndex = 0; 
let playingSequence = false;
let currentPlayLength = 1;


function setMessage(txt, tone=''){
message.textContent = txt;
if(tone==='success'){
message.classList.add('success');
}else{
message.classList.remove('success');
}
}


function buildBoard(n){
board.innerHTML = '';
board.className = 'board grid-' + Math.min(8, n);
for(let i=0;i<n;i++){
const btn = document.createElement('button');
btn.className = `tile c${i}`;
btn.setAttribute('data-index', i);
btn.setAttribute('aria-label', `Case ${i+1}`);
btn.innerHTML = `<span class="label">${i+1}</span>`;
btn.addEventListener('click', onTileClick);
board.appendChild(btn);
}
}


function playTone(sound){
try{
// clone to allow overlapping
const s = sound.cloneNode ? sound.cloneNode(true) : sound;
s.currentTime = 0;
s.play().catch(()=>{});
}catch(e){console.warn('sound play failed', e)}
}

function highlight(index, duration){
const btn = board.querySelector(`[data-index='${index}']`);
if(!btn) return;
btn.classList.add('highlight');
playTone(sounds.pop);
btn.style.boxShadow = '0 0 40px 20px rgba(255,255,255,0.8)';
btn.style.transform = 'scale(1.15)';
setTimeout(()=> {
btn.classList.remove('highlight');
btn.style.boxShadow = '0 6px 18px rgba(0,0,0,0.08)';
btn.style.transform = 'scale(1)';
}, Math.max(80, duration - 50));
}
function generateSequence(totalLength){
const arr = [];
for(let i=0;i<totalLength;i++){
arr.push(Math.floor(Math.random() * numButtons));
}
return arr;
}
async function playSequence(length){
playingSequence = true;
disableBoard(true);
playerIndex = 0;
stepLabel.textContent = `${playerIndex} / ${length}`;
const delay = config.speed;
for(let i=0;i<length;i++){
await new Promise(r => setTimeout(r, 300));
highlight(sequence[i], delay);
await new Promise(r => setTimeout(r, delay));
}
playingSequence = false;
disableBoard(false);
}
function disableBoard(disable){
const tiles = board.querySelectorAll('.tile');
tiles.forEach(t => t.disabled = disable);
}


function startLevel(index){
currentLevelIndex = index;
config = levelConfigs[currentLevelIndex];
numButtons = config.numButtons;
buildBoard(numButtons);
sequence = generateSequence(config.maxSequence);
currentPlayLength = 1;
levelLabel.textContent = config.level;
setMessage(`Niveau ${config.level} — Prêt ? Appuie sur Démarrer`);
stepLabel.textContent = `0 / ${currentPlayLength}`;
}


function restartCurrentLevel(){
currentPlayLength = 1;
playerIndex = 0;
stepLabel.textContent = `${playerIndex} / ${currentPlayLength}`;
setMessage(`Oups ! Essaie encore 😊`);
playTone(sounds.error);
setTimeout(()=>playSequence(currentPlayLength),700);
}
function nextRoundOrLevel(){
if(currentPlayLength < config.maxSequence){
currentPlayLength++;
setMessage(`Super ! Maintenant ${currentPlayLength} lumières`,'');
setTimeout(()=>playSequence(currentPlayLength),700);
}else{
// level complete
playTone(sounds.success);
setMessage('Bravo ! Tu as fini ce niveau 🎉','success');
currentLevelIndex++;
if(currentLevelIndex >= levelConfigs.length){
setTimeout(()=>{
setMessage('Félicitations ! Tu as terminé tous les niveaux ⭐');
startLevel(0);
},1200);
}else{
setTimeout(()=>startLevel(currentLevelIndex),1200);
}
}
}
function onTileClick(e){
if(playingSequence) return;
const idx = Number(e.currentTarget.dataset.index);
e.currentTarget.classList.add('pop');
setTimeout(()=>e.currentTarget.classList.remove('pop'),180);
playTone(sounds.pop);


if(idx === sequence[playerIndex]){
playerIndex++;
stepLabel.textContent = `${playerIndex} / ${currentPlayLength}`;
if(playerIndex >= currentPlayLength){
disableBoard(true);
setTimeout(()=>nextRoundOrLevel(),450);
}
}else{
disableBoard(true);
restartCurrentLevel();
}
}


startBtn.addEventListener('click', ()=>{
if(playingSequence) return;
setMessage('Regarde la séquence...');
setTimeout(()=>playSequence(currentPlayLength),400);
});


resetBtn.addEventListener('click', ()=>{
startLevel(0);
});


startLevel(0);