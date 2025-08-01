const I = [
  "#0f380f",
  "#306230",
  "#8bac0f",
  "#9bbc0f"
], M = [
  "#212122",
  "#b9b1b1",
  "#4152a0",
  "#193d1e",
  "#610e0e",
  "#c8af4b"
], R = [
  "#191E21",
  "#F1F1F1",
  "#31318F",
  "#53A428",
  "#D20E13",
  "#B85E1C",
  "#F3CF11"
], b = {
  default: [
    "#000",
    "#fff"
  ],
  gameboy: I,
  "spectra6-legacy": [
    "#191E21",
    "#F1F1F1",
    "#31318F",
    "#53A428",
    "#D20E13",
    "#F3CF11"
  ],
  spectra6: M,
  acep: R
}, k = [
  "#0F0",
  "#3F0",
  "#7F0",
  "#FF0"
], A = [
  "#000000",
  "#FFFFFF",
  "#0000FF",
  "#00FF00",
  "#FF0000",
  "#FFFF00"
], S = [
  "#000",
  "#fff",
  "#0000FF",
  "#00FF00",
  "#FF0000",
  "#FF8000",
  "#FFFF00"
], D = {
  default: [
    "#e6e6e6",
    "#212121"
  ],
  gameboy: k,
  spectra6: A,
  acep: S
}, x = (t) => t.replace(
  /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
  (e, r, a, o) => "#" + r + r + a + a + o + o
).substring(1).match(/.{2}/g).map((e) => parseInt(e, 16)), J = (t, e, { originalColors: r, replaceColors: a }) => {
  const o = t.getContext("2d"), f = t.width, g = t.height, d = e.getContext("2d"), s = o.getImageData(0, 0, f, g);
  var l = 0;
  const p = r.map((i) => x(i)), n = a.map((i) => x(i));
  for (let i = 0; i < s.data.length; i += 4) {
    const u = p.find((c) => s.data[i] == c[0] && s.data[i + 1] == c[1] && s.data[i + 2] == c[2]);
    if (u) {
      const c = p.indexOf(u), h = n[c];
      if (!h)
        return;
      s.data[i] = h[0], s.data[i + 1] = h[1], s.data[i + 2] = h[2];
    } else
      l++;
  }
  l > 0 && console.warn(
    `replaceColors: ${l} pixels were not replaced. Check if the colors match exactly.`
  ), e.width = f, e.height = g, d.putImageData(s, 0, 0);
}, C = {
  floydSteinberg: () => [
    { offset: [1, 0], factor: 7 / 16 },
    { offset: [-1, 1], factor: 3 / 16 },
    { offset: [0, 1], factor: 5 / 16 },
    { offset: [1, 1], factor: 1 / 16 }
  ],
  falseFloydSteinberg: () => [
    { offset: [1, 0], factor: 3 / 8 },
    { offset: [0, 1], factor: 3 / 8 },
    { offset: [1, 1], factor: 2 / 8 }
  ],
  jarvis: () => [
    { offset: [1, 0], factor: 7 / 48 },
    { offset: [2, 0], factor: 5 / 48 },
    { offset: [-2, 1], factor: 3 / 48 },
    { offset: [-1, 1], factor: 5 / 48 },
    { offset: [0, 1], factor: 7 / 48 },
    { offset: [1, 1], factor: 5 / 48 },
    { offset: [2, 1], factor: 3 / 48 },
    { offset: [-2, 2], factor: 1 / 48 },
    { offset: [-1, 2], factor: 3 / 48 },
    { offset: [0, 2], factor: 4 / 48 },
    { offset: [1, 2], factor: 3 / 48 },
    { offset: [2, 2], factor: 1 / 48 }
  ],
  stucki: () => [
    { offset: [1, 0], factor: 8 / 42 },
    { offset: [2, 0], factor: 4 / 42 },
    { offset: [-2, 1], factor: 2 / 42 },
    { offset: [-1, 1], factor: 4 / 42 },
    { offset: [0, 1], factor: 8 / 42 },
    { offset: [1, 1], factor: 4 / 42 },
    { offset: [2, 1], factor: 2 / 42 },
    { offset: [-2, 2], factor: 1 / 42 },
    { offset: [-1, 2], factor: 2 / 42 },
    { offset: [0, 2], factor: 4 / 42 },
    { offset: [1, 2], factor: 2 / 42 },
    { offset: [2, 2], factor: 1 / 42 }
  ],
  burkes: () => [
    { offset: [1, 0], factor: 8 / 32 },
    { offset: [2, 0], factor: 4 / 32 },
    { offset: [-2, 1], factor: 2 / 32 },
    { offset: [-1, 1], factor: 4 / 32 },
    { offset: [0, 1], factor: 8 / 32 },
    { offset: [1, 1], factor: 4 / 32 },
    { offset: [2, 1], factor: 2 / 32 }
  ],
  sierra3: () => [
    { offset: [1, 0], factor: 5 / 32 },
    { offset: [2, 0], factor: 3 / 32 },
    { offset: [-2, 1], factor: 2 / 32 },
    { offset: [-1, 1], factor: 4 / 32 },
    { offset: [0, 1], factor: 5 / 32 },
    { offset: [1, 1], factor: 4 / 32 },
    { offset: [2, 1], factor: 2 / 32 },
    { offset: [-1, 2], factor: 2 / 32 },
    { offset: [0, 2], factor: 3 / 32 },
    { offset: [1, 2], factor: 2 / 32 }
  ],
  sierra2: () => [
    { offset: [1, 0], factor: 4 / 16 },
    { offset: [2, 0], factor: 3 / 16 },
    { offset: [-2, 1], factor: 1 / 16 },
    { offset: [-1, 1], factor: 2 / 16 },
    { offset: [0, 1], factor: 3 / 16 },
    { offset: [1, 1], factor: 2 / 16 },
    { offset: [2, 1], factor: 1 / 16 }
  ],
  "Sierra2-4A": () => [
    { offset: [1, 0], factor: 2 / 4 },
    { offset: [-2, 1], factor: 1 / 4 },
    { offset: [-1, 1], factor: 1 / 4 }
  ]
}, $ = (t) => {
  const e = t[0] < 8 ? t[0] : 8, r = t[1] < 8 ? t[1] : 8, a = [
    [0, 48, 12, 60, 3, 51, 15, 63],
    [32, 16, 44, 28, 35, 19, 47, 31],
    [8, 56, 4, 52, 11, 59, 7, 55],
    [40, 24, 36, 20, 43, 27, 39, 32],
    [2, 50, 14, 62, 1, 49, 13, 61],
    [34, 18, 46, 30, 33, 17, 45, 29],
    [10, 58, 6, 54, 9, 57, 5, 53],
    [42, 26, 38, 22, 41, 25, 37, 21]
  ];
  if (e === 8 && r === 8)
    return a;
  const o = [];
  let f = 0;
  for (f; f < r; f++)
    o.push([]);
  o.forEach((d, s) => {
    let l = 0;
    for (l; l < e; l++)
      d.push(a[l][s]);
  });
  const g = {};
  return o.flat().sort((d, s) => d - s).forEach((d, s) => g[d] = s), o.forEach((d, s) => {
    d.forEach((l, p) => {
      o[s][p] = g[l];
    });
  }), o;
};
function q(t) {
  const e = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  t = t.replace(e, (a, o, f, g) => o + o + f + f + g + g);
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
  return r ? [
    parseInt(r[1], 16),
    parseInt(r[2], 16),
    parseInt(r[3], 16)
  ] : null;
}
const B = { hexToRgb: q };
function O(t, e) {
  return Math.floor(Math.random() * (e - t + 1)) + t;
}
const E = { randomInteger: O }, y = (t, e) => {
  const r = e.map((o) => ({
    distance: V(o, t),
    color: o
  }));
  let a;
  return r.forEach((o) => {
    a ? o.distance < a.distance && (a = o) : a = o;
  }), a.color[3] || a.color.push(255), a.color;
}, V = (t, e) => {
  const r = t[0] - e[0], a = t[1] - e[1], o = t[2] - e[2];
  return Math.sqrt(r * r + a * a + o * o);
}, W = {
  ditheringType: "errorDiffusion",
  errorDiffusionMatrix: "floydSteinberg",
  serpentine: !1,
  orderedDitheringType: "bayer",
  orderedDitheringMatrix: [4, 4],
  randomDitheringType: "blackAndWhite",
  palette: "default",
  sampleColorsFromImage: !1,
  numberOfSampleColors: 10
}, K = async (t, e, r) => {
  if (!t || !e)
    return;
  const o = t.getContext("2d").getImageData(0, 0, t.width, t.height), f = { ...W, ...r }, g = o.width;
  let d = [];
  !f.palette || f.sampleColorsFromImage === !0 || (d = X(f.palette));
  function s(c, h) {
    o.data[c] = h[0], o.data[c + 1] = h[1], o.data[c + 2] = h[2], o.data[c + 3] = h[3];
  }
  const l = $([
    f.orderedDitheringMatrix[0],
    f.orderedDitheringMatrix[1]
  ]);
  let p, n, i, u;
  for (p = 0; p <= o.data.length; p += 4) {
    const c = p;
    u = T(c, o.data), (!f.ditheringType || f.ditheringType === "quantizationOnly") && (n = y(u, d), s(c, n)), f.ditheringType === "random" && f.randomDitheringType === "rgb" && (n = Q(u), s(c, n)), f.ditheringType === "random" && f.randomDitheringType === "blackAndWhite" && (n = Y(u), s(c, n)), f.ditheringType === "ordered" && (n = j(
      u,
      H(c / 4, g),
      l,
      64
    ), n = y(n, d), s(c, n));
    const h = C[f.errorDiffusionMatrix]() || C.floydSteinberg();
    f.ditheringType === "errorDiffusion" && (n = y(u, d), s(c, n), i = G(u, n), h.forEach((F) => {
      const w = F.offset[0] * 4 + F.offset[1] * 4 * g, m = c + w;
      if (!o.data[m])
        return;
      const P = L(
        T(m, o.data),
        i,
        F.factor
      );
      s(m, P);
    }));
  }
  return _(o, e);
}, T = (t, e) => [
  e[t],
  e[t + 1],
  e[t + 2],
  e[t + 3]
], G = (t, e) => t.map((a, o) => a - e[o]), L = (t, e, r) => t.map((a, o) => a + e[o] * r), Q = (t) => t.map(
  (e) => e < E.randomInteger(0, 255) ? 0 : 255
), Y = (t) => (t[0] + t[1] + t[2]) / 3 < E.randomInteger(0, 255) ? [0, 0, 0, 255] : [255, 255, 255, 255], j = (t, e, r, a) => {
  const o = r[e[1] % r.length][e[0] % r[0].length] / (r.length * r[0].length);
  return t.map((f) => f + o * a);
}, H = (t, e) => [t % e, Math.floor(t / e)], X = (t) => (typeof t == "string" ? b[t] : t).map((r) => B.hexToRgb(r)), _ = (t, e) => (e.width = t.width, e.height = t.height, e.getContext("2d").putImageData(t, 0, 0), e);
function N(t) {
  const e = t.toLowerCase();
  return b[e] || b.default;
}
function U(t) {
  const e = t.toLowerCase();
  return D[e] || D.default;
}
export {
  K as ditherImage,
  N as getDefaultPalettes,
  U as getDeviceColors,
  J as replaceColors
};
//# sourceMappingURL=index.es.js.map
