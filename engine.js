/* Tarp math - exact pitch geometry, unit-agnostic. No weather or storm-worthiness verdicts. */
const r2 = x => Math.round(x * 100) / 100;
const bad = m => { throw new Error(m); };
const pos = (v, m) => { if (!Number.isFinite(v) || v <= 0) bad(m); };
const sleepVerdict = w =>
  w < 1 ? 'a crawl-in slot (labeled)' :
  w < 2 ? 'one sleeper, cozy (labeled)' :
  w < 3 ? 'two sleepers (labeled)' : 'a social shelter (labeled)';

function aframe(width, length, ridgeH) {
  pos(width, 'tarp width must be positive'); pos(length, 'tarp length must be positive'); pos(ridgeH, 'ridge height must be positive');
  const drape = width / 2;
  if (ridgeH >= drape) bad('ridge must be lower than half the tarp width (the drape)');
  const floorWidth = 2 * Math.sqrt(drape * drape - ridgeH * ridgeH);
  const floorLength = length;
  return { floorWidth: r2(floorWidth), floorLength: r2(floorLength), coverage: r2(floorWidth * floorLength), verdict: sleepVerdict(floorWidth) };
}

function leanto(width, length, ridgeH) {
  pos(width, 'tarp width must be positive'); pos(length, 'tarp length must be positive'); pos(ridgeH, 'ridge height must be positive');
  if (ridgeH >= width) bad('ridge must be lower than the tarp width (the slope panel)');
  const depth = Math.sqrt(width * width - ridgeH * ridgeH);
  const floorWidth = length;
  return { floorDepth: r2(depth), floorWidth: r2(floorWidth), coverage: r2(depth * floorWidth), verdict: sleepVerdict(depth) };
}

function diamond(side, ridgeH) {
  pos(side, 'tarp side must be positive'); pos(ridgeH, 'ridge height must be positive');
  const diag = side * Math.SQRT2, half = diag / 2;
  if (ridgeH >= half) bad('ridge must be lower than half the diagonal');
  const floorWidth = 2 * Math.sqrt(half * half - ridgeH * ridgeH);
  const floorLength = diag;
  return { diagonal: r2(diag), floorWidth: r2(floorWidth), floorLength: r2(floorLength), coverage: r2(floorWidth * floorLength), verdict: sleepVerdict(floorWidth) };
}

function guyline(attachH, stakeDist) {
  pos(attachH, 'attachment height must be positive'); pos(stakeDist, 'stake distance must be positive');
  const line = Math.sqrt(attachH * attachH + stakeDist * stakeDist);
  const angle = Math.atan2(attachH, stakeDist) * 180 / Math.PI;
  const verdict = angle > 60 ? 'steep geometry - long pull on the stake (labeled)' :
    angle >= 35 ? 'near 45 degrees - the classic guy angle (labeled)' :
    'shallow geometry - mostly sideways pull (labeled)';
  return { line: r2(line), angleDeg: r2(angle), verdict };
}

const api = { aframe, leanto, diamond, guyline };
if (typeof module !== 'undefined' && module.exports) module.exports = api;
if (typeof window !== 'undefined') window.Tarpmath = api;
