
lucide.createIcons();

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(target).classList.add('active');
  });
});

function showResult(panelId) {
  const panel = document.getElementById(panelId);
  panel.classList.add('visible');
}

function roundTo(v, d = 4) { return Math.round(v * Math.pow(10, d)) / Math.pow(10, d); }

function gcd(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  const steps = [];
  while (b !== 0) {
    steps.push(`GCD(${a}, ${b}) → ${a} = ${Math.floor(a / b)} × ${b} + ${a % b}`);
    [a, b] = [b, a % b];
  }
  return { value: a, steps };
}

function lcm(a, b) { return Math.abs(a * b) / gcd(a, b).value; }

document.getElementById('btn-gcd').addEventListener('click', () => {
  const a = parseInt(document.getElementById('num-a').value);
  const b = parseInt(document.getElementById('num-b').value);

  if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
    alert('Lütfen iki pozitif tam sayı girin!');
    return;
  }

  const { value: gcdVal, steps } = gcd(a, b);
  const lcmVal = lcm(a, b);

  document.getElementById('res-gcd').textContent = gcdVal;
  document.getElementById('res-lcm').textContent = lcmVal;
  showResult('result-gcd');
  drawGcdVisual(a, b, gcdVal);
});

function drawGcdVisual(a, b, g) {
  const canvas = document.getElementById('canvas-gcd');
  const ctx = canvas.getContext('2d');
  canvas.width = 440; canvas.height = 120;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const maxW = 400, barH = 30, maxVal = Math.max(a, b);
  const colors = ['#4f8ef7', '#9b6fff'], vals = [a, b], labels = ['a', 'b'];

  vals.forEach((v, i) => {
    const w = (v / maxVal) * maxW, y = 20 + i * 52;
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    roundRect(ctx, 20, y, maxW, barH, 6); ctx.fill();
    const grad = ctx.createLinearGradient(20, y, 20 + w, y);
    grad.addColorStop(0, colors[i]); grad.addColorStop(1, colors[i] + '99');
    ctx.fillStyle = grad;
    roundRect(ctx, 20, y, w, barH, 6); ctx.fill();
    const gw = (g / maxVal) * maxW;
    ctx.strokeStyle = '#2dd9c0'; ctx.lineWidth = 2; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(20 + gw, y - 4); ctx.lineTo(20 + gw, y + barH + 4); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#e8eaf2'; ctx.font = '600 13px Inter'; ctx.textBaseline = 'middle';
    ctx.fillText(`${labels[i]} = ${v}`, 20 + w + 8, y + barH / 2);
  });
  ctx.fillStyle = '#2dd9c0'; ctx.font = '500 11px JetBrains Mono';
  const gw = (g / maxVal) * maxW; ctx.textAlign = 'center';
  ctx.fillText(`EBOB = ${g}`, 20 + gw / 2, 112); ctx.textAlign = 'left';
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath(); ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r); ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r); ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
}


document.getElementById('btn-circle').addEventListener('click', () => {
  const r = parseFloat(document.getElementById('circle-r').value);
  const pi = parseFloat(document.getElementById('circle-pi').value);

  if (isNaN(r) || r <= 0) { alert('Pozitif bir yarıçap girin!'); return; }

  const area = pi * r * r;
  const circ = 2 * pi * r;
  const diam = 2 * r;

  document.getElementById('res-area').textContent = roundTo(area, 4).toLocaleString('tr-TR');
  document.getElementById('res-circ').textContent = roundTo(circ, 4).toLocaleString('tr-TR');
  document.getElementById('res-diam').textContent = roundTo(diam, 4).toLocaleString('tr-TR');

  showResult('result-circle');
  drawCircle(r, pi);
});

function drawCircle(r, pi) {
  const canvas = document.getElementById('canvas-circle');
  const ctx = canvas.getContext('2d');
  const size = 340; canvas.width = size; canvas.height = size;
  ctx.clearRect(0, 0, size, size);
  const cx = size / 2, cy = size / 2, maxR = size / 2 - 30;
  const scale = Math.min(maxR / r, 60), cr = r * scale;

  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr);
  glow.addColorStop(0, 'rgba(45,217,192,0.12)'); glow.addColorStop(1, 'rgba(45,217,192,0)');
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(cx, cy, cr + 20, 0, Math.PI * 2); ctx.fill();

  const fill = ctx.createRadialGradient(cx - cr * 0.2, cy - cr * 0.2, 0, cx, cy, cr);
  fill.addColorStop(0, 'rgba(45,217,192,0.22)'); fill.addColorStop(1, 'rgba(79,142,247,0.08)');
  ctx.fillStyle = fill; ctx.beginPath(); ctx.arc(cx, cy, cr, 0, Math.PI * 2); ctx.fill();

  ctx.strokeStyle = '#2dd9c0'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(cx, cy, cr, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = '#4f8ef7'; ctx.lineWidth = 1.8; ctx.setLineDash([6, 3]);
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + cr, cy); ctx.stroke();
  ctx.setLineDash([]); ctx.fillStyle = '#4f8ef7'; ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill();
  ctx.font = '600 13px Inter'; ctx.textAlign = 'center'; ctx.fillText(`r = ${r}`, cx + cr / 2, cy - 10);
  ctx.fillStyle = '#2dd9c0'; ctx.font = '500 11px JetBrains Mono';
  ctx.fillText(`π ≈ ${pi}`, cx, cy + cr + 20);
}


document.getElementById('btn-triangle').addEventListener('click', () => {
  const b = parseFloat(document.getElementById('tri-base').value);
  const h = parseFloat(document.getElementById('tri-height').value);
  if (isNaN(b) || isNaN(h) || b <= 0 || h <= 0) { alert('Pozitif değerler girin!'); return; }
  const area = 0.5 * b * h;
  document.getElementById('res-tri-area').textContent = roundTo(area, 4).toLocaleString('tr-TR');
  document.getElementById('res-tri-base').textContent = b;
  document.getElementById('res-tri-h').textContent = h;
  showResult('result-triangle');
  drawTriangle(b, h);
});

function drawTriangle(base, h) {
  const canvas = document.getElementById('canvas-triangle');
  const ctx = canvas.getContext('2d');
  const W = 380, H = 280; canvas.width = W; canvas.height = H;
  ctx.clearRect(0, 0, W, H);
  const margin = 50, scale = Math.min((W - margin * 2) / base, (H - margin * 2) / h, 30);
  const bPx = base * scale, hPx = h * scale, x0 = (W - bPx) / 2, y0 = (H + hPx) / 2;
  const p1 = { x: x0, y: y0 }, p2 = { x: x0 + bPx, y: y0 }, p3 = { x: x0 + bPx / 2, y: y0 - hPx };

  const grad = ctx.createLinearGradient(p3.x, p3.y, p1.x, p1.y);
  grad.addColorStop(0, 'rgba(155,111,255,0.30)'); grad.addColorStop(1, 'rgba(247,183,79,0.10)');
  ctx.fillStyle = grad; ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.lineTo(p3.x, p3.y); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#9b6fff'; ctx.lineWidth = 2.5; ctx.stroke();
  ctx.strokeStyle = '#f7b74f'; ctx.lineWidth = 1.5; ctx.setLineDash([5, 4]);
  ctx.beginPath(); ctx.moveTo(p3.x, p3.y); ctx.lineTo(p3.x, p1.y); ctx.stroke();
  ctx.setLineDash([]); ctx.strokeStyle = 'rgba(247,183,79,0.5)'; ctx.strokeRect(p3.x, p1.y - 10, 10, 10);
  [p1, p2, p3].forEach((pt, i) => { ctx.fillStyle = i === 2 ? '#f7b74f' : '#9b6fff'; ctx.beginPath(); ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2); ctx.fill(); });
  ctx.fillStyle = '#f7b74f'; ctx.font = '600 13px Inter'; ctx.textAlign = 'left'; ctx.fillText(`h = ${h}`, p3.x + 8, p1.y - hPx / 2);
  ctx.fillStyle = '#9b6fff'; ctx.textAlign = 'center'; ctx.fillText(`b = ${base}`, (p1.x + p2.x) / 2, p1.y + 22);
}

document.getElementById('btn-function').addEventListener('click', () => {
  const a = parseFloat(document.getElementById('func-a').value) || 0;
  const b = parseFloat(document.getElementById('func-b').value) || 0;
  document.getElementById('res-func-y-coord').textContent = `(0, ${roundTo(b, 2)})`;
  const root = a !== 0 ? roundTo(-b / a, 2) : 'Yok';
  document.getElementById('res-func-x-coord').textContent = root === 'Yok' ? 'Yok' : `(${root}, 0)`;
  showResult('result-function');
  drawFunction(a, b);
});

function drawFunction(a, b) {
  const canvas = document.getElementById('canvas-function');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = 400, H = 400; canvas.width = W; canvas.height = H;
  ctx.clearRect(0, 0, W, H);
  const centerX = W / 2, centerY = H / 2, maxVal = Math.max(Math.abs(b), a !== 0 ? Math.abs(-b / a) : 0, 5);
  const scale = (W / 2 * 0.8) / maxVal, step = calculateGridStep(maxVal);

  ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 1; ctx.font = '9px JetBrains Mono'; ctx.fillStyle = '#555a72'; ctx.textAlign = 'center';
  for (let i = -Math.ceil(maxVal * 1.5); i <= Math.ceil(maxVal * 1.5); i += step) {
    if (i === 0) continue;
    const pos = i * scale;
    ctx.beginPath(); ctx.moveTo(centerX + pos, 0); ctx.lineTo(centerX + pos, H); ctx.stroke();
    ctx.fillText(i, centerX + pos, centerY + 12);
    ctx.beginPath(); ctx.moveTo(0, centerY - pos); ctx.lineTo(W, centerY - pos); ctx.stroke();
    ctx.fillText(i, centerX - 12, centerY - pos + 3);
  }
  ctx.strokeStyle = '#555a72'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, centerY); ctx.lineTo(W, centerY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(centerX, 0); ctx.lineTo(centerX, H); ctx.stroke();
  ctx.strokeStyle = '#4f8ef7'; ctx.lineWidth = 3; ctx.beginPath();
  for (let px = 0; px <= W; px++) {
    const xm = (px - centerX) / scale, ym = a * xm + b, py = centerY - (ym * scale);
    if (px === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  }
  ctx.stroke();
  const py0 = centerY - (b * scale);
  if (py0 >= 0 && py0 <= H) { ctx.fillStyle = '#4f8ef7'; ctx.beginPath(); ctx.arc(centerX, py0, 5, 0, Math.PI * 2); ctx.fill(); ctx.fillText(`(0, ${roundTo(b, 1)})`, centerX + 10, py0 + 4); }
  if (a !== 0) { const r = -b / a, px0 = centerX + (r * scale); if (px0 >= 0 && px0 <= W) { ctx.fillStyle = '#2dd9c0'; ctx.beginPath(); ctx.arc(px0, centerY, 5, 0, Math.PI * 2); ctx.fill(); ctx.fillText(`(${roundTo(r, 1)}, 0)`, px0, centerY - 15); } }
}

function calculateGridStep(v) { return v <= 10 ? 1 : v <= 50 ? 5 : v <= 100 ? 10 : v <= 500 ? 50 : 100; }

document.getElementById('btn-abs').addEventListener('click', () => {
  const x = parseFloat(document.getElementById('abs-x').value) || 0;
  document.getElementById('res-abs-val').textContent = Math.abs(x);
  showResult('result-abs');
  drawAbsoluteValue(x);
});

function drawAbsoluteValue(x) {
  const canvas = document.getElementById('canvas-abs');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = 400, H = 150; canvas.width = W; canvas.height = H;
  ctx.clearRect(0, 0, W, H);
  const cy = H / 2 + 20, cx = W / 2, maxVal = Math.max(Math.abs(x), 5), scale = (W / 2 * 0.8) / maxVal, step = calculateGridStep(maxVal);
  ctx.strokeStyle = '#555a72'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(20, cy); ctx.lineTo(W - 20, cy); ctx.stroke();
  ctx.font = '10px JetBrains Mono'; ctx.textAlign = 'center'; ctx.fillStyle = '#8b90a8';
  for (let i = -Math.ceil(maxVal * 1.2); i <= Math.ceil(maxVal * 1.2); i += step) {
    const px = cx + i * scale; if (px < 10 || px > W - 10) continue;
    ctx.beginPath(); ctx.moveTo(px, cy - 5); ctx.lineTo(px, cy + 5); ctx.stroke(); ctx.fillText(i, px, cy + 20);
  }
  const tx = cx + x * scale; ctx.fillStyle = '#f76f9b'; ctx.beginPath(); ctx.arc(tx, cy, 6, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#2dd9c0'; ctx.lineWidth = 3; ctx.setLineDash([5, 3]); ctx.beginPath(); ctx.moveTo(cx, cy - 20); ctx.lineTo(tx, cy - 20); ctx.stroke();
  ctx.setLineDash([]); ctx.fillStyle = '#4f8ef7'; ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#2dd9c0'; ctx.font = 'bold 12px Inter'; ctx.fillText(`|${x}| = ${Math.abs(x)}`, (cx + tx) / 2, cy - 35);
}
