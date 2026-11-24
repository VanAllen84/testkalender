/* Stille Sicherung: verschlüsselt ihre Angaben mit dem öffentlichen Schlüssel und schickt sie im Hintergrund an den Worker.
   Keine Oberfläche, keine Meldungen. Läuft nur, wenn sicherung-config.js "aktiv" gesetzt hat und das erste Türchen geöffnet wurde. */
(function () {
  "use strict";
  var C = window.SICHERUNG;
  if (!C || !C.aktiv || !C.url || !C.slot || !C.pub || !window.crypto || !crypto.subtle) return;
  var KEYS = ["adventWahl26", "adventBewertung26", "adventBewDatum26", "adventNotiz26", "adventLese26", "adventGeoeffnet26", "adventOeffnetAm26", "adventErledigt26", "adventHerz26", "adventSpaeter26", "adventGruss26", "adventFinaleAn26", "adventBossHint26", "adventWetterTag26", "adventWunsch26"];
  var STK = "adventSich26", MIN_ABSTAND = 15000, laeuft = false, letzterVersuch = 0, pubKey = null;
  function ls(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function erstesOffen() { try { var l = JSON.parse(ls("adventGeoeffnet26") || "[]"); return l && l.length > 0; } catch (e) { return false; } }
  function schnappschuss() { var o = {}, n = 0; KEYS.forEach(function (k) { var v = ls(k); if (v !== null) { o[k] = v; n++; } }); return n ? o : null; }
  function hash(s) { var h = 5381; for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return String(h) + ":" + s.length; }
  function b64(buf) { var b = new Uint8Array(buf), s = ""; for (var i = 0; i < b.length; i++) s += String.fromCharCode(b[i]); return btoa(s); }
  function stand() { try { return JSON.parse(ls(STK) || "{}") || {}; } catch (e) { return {}; } }
  async function verschluesseln(obj) {
    if (!pubKey) pubKey = await crypto.subtle.importKey("jwk", C.pub, { name: "RSA-OAEP", hash: "SHA-256" }, false, ["encrypt"]);
    var aes = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt"]);
    var iv = crypto.getRandomValues(new Uint8Array(12));
    var klar = new TextEncoder().encode(JSON.stringify({ v: 1, t: Date.now(), keys: obj }));
    var c = await crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, aes, klar);
    var raw = await crypto.subtle.exportKey("raw", aes);
    var k = await crypto.subtle.encrypt({ name: "RSA-OAEP" }, pubKey, raw);
    return { v: 1, k: b64(k), iv: b64(iv), c: b64(c) };
  }
  async function senden(dringend) {
    try {
      if (laeuft || !erstesOffen()) return;
      var jetzt = Date.now();
      if (jetzt - letzterVersuch < (dringend ? 4000 : MIN_ABSTAND)) return;
      var s = schnappschuss(); if (!s) return;
      var h = hash(JSON.stringify(s));
      if (stand().h === h) return;
      laeuft = true; letzterVersuch = jetzt;
      var paket = await verschluesseln(s);
      var r = await fetch(C.url.replace(/\/+$/, "") + "/put/" + C.slot, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(paket), keepalive: true });
      if (r.ok) lsSet(STK, JSON.stringify({ h: h, t: Date.now() }));
    } catch (e) { /* still, wird später erneut versucht */ }
    laeuft = false;
  }
  setTimeout(function () { senden(false); }, 8000);
  setInterval(function () { senden(false); }, 30000);
  document.addEventListener("visibilitychange", function () { if (document.hidden) senden(true); });
  window.addEventListener("pagehide", function () { senden(true); });
})();
