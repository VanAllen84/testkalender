/* Offline-Speicher: Seite, Geschichten und Bilder werden beim ersten Besuch abgelegt. */
const VERSION = "v1795615788";
const KERN = ["./", "index.html", "er-editor.html", "manifest-er.json", "icon-er-180.png", "icon-er-192.png", "icon-er-512.png", "manifest.json", "icon-192.png", "icon-512.png", "apple-touch-icon.png", "data.js", "er.js", "wetter.js", "wetter-texte.js", "sicherung-config.js", "sicherung.js", "story-day1.js", "story-day2.js", "story-day3.js", "story-day4.js", "story-day5.js", "story-day6.js", "story-day7.js", "story-day8.js", "story-day9.js", "story-day10.js", "story-day11.js", "story-day12.js", "story-day13.js", "story-day14.js", "story-day15.js", "story-day16.js", "story-day17.js", "story-day18.js", "story-day19.js", "story-day20.js", "story-day21.js", "story-day22.js", "story-day23.js", "story-day24.js"];
const TON = ["ton/knarren.mp3", "ton/wirbel.mp3", "ton/auspacken.mp3", "ton/finale.mp3"];
const BILDER = ["bilder/finale.jpg", "bilder/karte-01.jpg", "bilder/karte-02.jpg", "bilder/karte-03.jpg", "bilder/karte-04.jpg", "bilder/karte-05.jpg", "bilder/karte-06.jpg", "bilder/karte-07.jpg", "bilder/karte-08.jpg", "bilder/karte-09.jpg", "bilder/karte-10.jpg", "bilder/karte-11.jpg", "bilder/karte-12.jpg", "bilder/karte-13.jpg", "bilder/karte-14.jpg", "bilder/karte-15.jpg", "bilder/karte-16.jpg", "bilder/karte-17.jpg", "bilder/karte-18.jpg", "bilder/karte-19.jpg", "bilder/karte-20.jpg", "bilder/karte-21.jpg", "bilder/karte-22.jpg", "bilder/karte-23.jpg", "bilder/karte-24.jpg", "bilder/landing.jpg", "bilder/pix-lock-01.png", "bilder/pix-lock-02.png", "bilder/pix-lock-03.png", "bilder/pix-lock-04.png", "bilder/pix-lock-05.png", "bilder/pix-lock-06.png", "bilder/pix-lock-07.png", "bilder/pix-lock-08.png", "bilder/pix-lock-09.png", "bilder/pix-lock-10.png", "bilder/pix-lock-11.png", "bilder/pix-lock-12.png", "bilder/pix-lock-13.png", "bilder/pix-lock-14.png", "bilder/pix-lock-15.png", "bilder/pix-lock-16.png", "bilder/pix-lock-17.png", "bilder/pix-lock-18.png", "bilder/pix-lock-19.png", "bilder/pix-lock-20.png", "bilder/pix-lock-21.png", "bilder/pix-lock-22.png", "bilder/pix-lock-23.png", "bilder/pix-lock-24.png", "bilder/pix-mid-01.png", "bilder/pix-mid-02.png", "bilder/pix-mid-03.png", "bilder/pix-mid-04.png", "bilder/pix-mid-05.png", "bilder/pix-mid-06.png", "bilder/pix-mid-07.png", "bilder/pix-mid-08.png", "bilder/pix-mid-09.png", "bilder/pix-mid-10.png", "bilder/pix-mid-11.png", "bilder/pix-mid-12.png", "bilder/pix-mid-13.png", "bilder/pix-mid-14.png", "bilder/pix-mid-15.png", "bilder/pix-mid-16.png", "bilder/pix-mid-17.png", "bilder/pix-mid-18.png", "bilder/pix-mid-19.png", "bilder/pix-mid-20.png", "bilder/pix-mid-21.png", "bilder/pix-mid-22.png", "bilder/pix-mid-23.png", "bilder/pix-mid-24.png"];
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) {
    return Promise.all(KERN.map(function (u) { return c.add(u).catch(function () {}); }))
      .then(function () { return Promise.all(BILDER.map(function (u) { return c.add(u).catch(function () {}); })); })
      .then(function () { return Promise.all(TON.map(function (u) { return c.add(u).catch(function () {}); })); });
  }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  const r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== location.origin) return;
  if (/\/ton\//.test(r.url)) {
    // Toene: aus dem Speicher, auch fuer Bereichsanfragen der Audio-Elemente (iPhone)
    e.respondWith(caches.match(r.url, { ignoreSearch: true }).then(function (m) {
      if (!m) return fetch(r);
      const rg = r.headers.get("range");
      if (!rg) return m;
      return m.arrayBuffer().then(function (buf) {
        const mm = /bytes=(\d*)-(\d*)/.exec(rg), len = buf.byteLength;
        let s = mm && mm[1] ? +mm[1] : 0, en = mm && mm[2] ? +mm[2] : len - 1;
        if (mm && !mm[1] && mm[2]) { s = Math.max(0, len - +mm[2]); en = len - 1; }
        en = Math.min(en, len - 1);
        return new Response(buf.slice(s, en + 1), { status: 206, headers: { "Content-Type": "audio/mpeg", "Content-Range": "bytes " + s + "-" + en + "/" + len, "Content-Length": String(en - s + 1), "Accept-Ranges": "bytes" } });
      });
    }));
    return;
  }
  if (/\/bilder\//.test(r.url)) {
    // Bilder: zuerst aus dem Speicher
    e.respondWith(caches.match(r).then(function (m) { return m || fetch(r).then(function (res) { const k = res.clone(); caches.open(VERSION).then(function (c) { c.put(r, k); }); return res; }); }));
  } else {
    // Seite und Geschichten: zuerst Netz (damit Aenderungen sofort erscheinen), ohne Netz aus dem Speicher
    e.respondWith(fetch(r).then(function (res) { const k = res.clone(); caches.open(VERSION).then(function (c) { c.put(r, k); }); return res; }).catch(function () { return caches.match(r, { ignoreSearch: true }).then(function (m) { return m || caches.match("index.html"); }); }));
  }
});

// Push-Erinnerung: feste, neutrale Meldung (die Nachricht selbst enthaelt keinen Text)
self.addEventListener("push", function (e) {
  e.waitUntil(self.registration.showNotification("Adventskalender", { body: "Dein Türchen für heute wartet ✨", icon: "icon-192.png", badge: "icon-192.png", tag: "tuerchen", data: { url: "./" } }));
});
self.addEventListener("notificationclick", function (e) {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (cs) {
    for (const c of cs) { if ("focus" in c) return c.focus(); }
    return self.clients.openWindow("./");
  }));
});
