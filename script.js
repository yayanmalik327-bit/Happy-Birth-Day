const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
let W = canvas.width = innerWidth, H = canvas.height = innerHeight;

const colors = ['#ffd166','#ff7eb6','#b8f2e6','#9bf6ff','#c7a0ff','#fff2bf'];
let pieces = [];

const rand = (min, max) => Math.random() * (max - min) + min;

function fireworks(x = rand(W*0.2,W*0.8), y = rand(H*0.2,H*0.5)) {
  const sparks = 200;
  for (let i = 0; i < sparks; i++) {
    const angle = (Math.PI * 2 * i) / sparks;
    pieces.push({x, y, s: rand(2,5), a: angle, v: rand(2.5,7.5), c: colors[Math.floor(Math.random()*colors.length)]});
  }
}

function loop() {
  ctx.clearRect(0,0,W,H);
  pieces.forEach((p,i)=>{
    p.x += Math.cos(p.a) * p.v;
    p.y += Math.sin(p.a) * p.v + 0.3;
    p.v *= 0.97;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.fillStyle = p.c;
    ctx.shadowColor = p.c;
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(0,0,p.s,0,Math.PI*2);
    ctx.fill();
    ctx.restore();
    if(p.v < 0.4) pieces.splice(i,1);
  });
  requestAnimationFrame(loop);
}
loop();

window.addEventListener('resize', () => {
  W = canvas.width = innerWidth;
  H = canvas.height = innerHeight;
});

const btn = document.getElementById('btnShow');
const msg = document.getElementById('messageBox');

btn.addEventListener('click', () => {
  msg.classList.remove('hidden');
  btn.style.display = 'none';
  for (let i = 0; i < 5; i++) {
    setTimeout(() => fireworks(rand(W*0.2,W*0.8), rand(H*0.2,H*0.6)), i * 400);
  }
});
