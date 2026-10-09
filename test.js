const M = require('./engine.js');
const E = require('./expected.json');
let n = 0, fail = 0;
const eq = (a, b, tag) => {
  n++;
  if (JSON.stringify(a) !== JSON.stringify(b)) { fail++; console.error('FAIL', tag, JSON.stringify(a), '!=', JSON.stringify(b)); }
};
for (const c of E.aframe) { let r; try { r = M.aframe(...c.in); } catch (e) { r = { error: e.message }; } eq(r, c.out, 'aframe ' + c.in); }
for (const c of E.leanto) { let r; try { r = M.leanto(...c.in); } catch (e) { r = { error: e.message }; } eq(r, c.out, 'leanto ' + c.in); }
for (const c of E.diamond) { let r; try { r = M.diamond(...c.in); } catch (e) { r = { error: e.message }; } eq(r, c.out, 'diamond ' + c.in); }
for (const c of E.guyline) { let r; try { r = M.guyline(...c.in); } catch (e) { r = { error: e.message }; } eq(r, c.out, 'guyline ' + c.in); }
// anchors
const a = M.aframe(3, 3, 1.2);
eq(a.floorWidth, 1.8, 'anchor aframe width'); eq(a.coverage, 5.4, 'anchor aframe coverage');
const lt = M.leanto(3, 3, 1.5);
eq(lt.floorDepth, 2.6, 'anchor leanto depth');
const di = M.diamond(3, 1);
eq(di.floorLength, 4.24, 'anchor diamond length'); eq(di.floorWidth, 3.74, 'anchor diamond width');
const g = M.guyline(1.5, 2);
eq(g.line, 2.5, 'anchor guy line'); eq(g.angleDeg, 36.87, 'anchor guy angle');
// monotonicity: higher ridge -> narrower floor (aframe)
n++;
if (!(M.aframe(3, 3, 1.4).floorWidth < M.aframe(3, 3, 1.0).floorWidth)) { fail++; console.error('FAIL monotonic'); }
// errors
const errs = [
  () => M.aframe(0, 3, 1), () => M.aframe(3, 0, 1), () => M.aframe(3, 3, 0), () => M.aframe(3, 3, 1.5), () => M.aframe(3, 3, 2),
  () => M.leanto(0, 3, 1), () => M.leanto(3, 3, 3), () => M.leanto(3, 3, 4),
  () => M.diamond(0, 1), () => M.diamond(3, 0), () => M.diamond(3, 2.13), () => M.diamond(3, 3),
  () => M.guyline(0, 2), () => M.guyline(1.5, 0), () => M.guyline(-1, 2),
];
const msgs = ['tarp width must be positive','tarp length must be positive','ridge height must be positive','ridge must be lower than half the tarp width (the drape)','ridge must be lower than half the tarp width (the drape)',
  'tarp width must be positive','ridge must be lower than the tarp width (the slope panel)','ridge must be lower than the tarp width (the slope panel)',
  'tarp side must be positive','ridge height must be positive','ridge must be lower than half the diagonal','ridge must be lower than half the diagonal',
  'attachment height must be positive','stake distance must be positive','attachment height must be positive'];
errs.forEach((f, i) => {
  n++;
  try { f(); fail++; console.error('FAIL no-throw', i); }
  catch (e) { if (e.message !== msgs[i]) { fail++; console.error('FAIL msg', i, e.message, 'want', msgs[i]); } }
});
console.log(fail ? fail + ' FAILURES / ' + n : n + '/' + n + ' checks pass');
process.exit(fail ? 1 : 0);
