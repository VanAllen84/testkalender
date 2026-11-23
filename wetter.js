// Wetter-Modul: Platzhalter {{w:id}} in den Geschichten werden durch Texte passend zum echten Wetter ersetzt.
// Datenquelle: Open-Meteo (stuendlich, Wohnort). Ohne Netz: zuletzt gemerkte Werte, sonst neutraler Text.
// Vorschau: ?wetter=regen | schnee | nebel | klar | frost | bewoelkt | neutral (an die Adresse anhaengen), optional &temp=-3
// Marken: {{w:id}} = Wetter jetzt, {{p:id}} = Tageswetter (beim ersten Lesen festgehalten), {{v:id}} = Wetter des Vortags (so wie dort gelesen)
// Texte: x=neutral, r=Regen, k=klar, kf=klar mit Frost (optional), b=bedeckt, n=Nebel, s=Schnee; [[T]] wird durch die Temperatur in Worten ersetzt
(function () {
    "use strict";
    var LAT = 51.0885, LON = 6.5879, KEY = "adventWetter26", MAXALTER = 6 * 3600 * 1000;
    var MEM = null;
    function klasseVon(c) {
        if (c === 0 || c === 1 || c === 2) return "k";
        if (c === 3) return "b";
        if (c === 45 || c === 48) return "n";
        if ((c >= 71 && c <= 77) || c === 85 || c === 86) return "s";
        if ((c >= 51 && c <= 67) || (c >= 80 && c <= 82) || c >= 95) return "r";
        return "b";
    }
    function lesen() { try { var j = JSON.parse(localStorage.getItem(KEY) || "null"); if (j && j.codes) return j; } catch (e) {} return MEM; }
    function speichern(o) { MEM = o; try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }
    function stunde() { try { return (typeof jetzt === "function" ? jetzt() : new Date()).getHours(); } catch (e) { return new Date().getHours(); } }
    var WORTE = ["null", "ein", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zwölf", "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn", "neunzehn", "zwanzig"];
    function tempWort(t) {
        var r = Math.round(t), a = Math.abs(r), w = a <= 20 ? WORTE[a] : String(a);
        return (r < 0 ? "minus " : "") + w + (a === 1 ? " Grad" : " Grad");
    }
    function vorschau() {
        try {
            var m = /[?&]wetter=([a-z]+)/.exec(location.search); if (!m) return null;
            var k = { regen: ["r", 6], schnee: ["s", -1], nebel: ["n", 2], klar: ["k", 5], frost: ["k", -3], bewoelkt: ["b", 7], neutral: ["x", null] }[m[1]];
            if (!k) return null;
            var t = /[?&]temp=(-?\d+)/.exec(location.search);
            return { kl: k[0], temp: t ? Number(t[1]) : k[1] };
        } catch (e) { return null; }
    }
    // aktuelle Lage: Vorschau > gemerkte Stunde > neutral (x)
    function aktuell() {
        var v = vorschau(); if (v) return v;
        var d = lesen();
        if (!d || Date.now() - d.t > MAXALTER) return { kl: "x", temp: null };
        var h = stunde(), c = d.codes[h];
        if (c === undefined || c === null) return { kl: "x", temp: null };
        var tp = d.temps ? d.temps[h] : null;
        return { kl: klasseVon(c), temp: (tp === undefined || tp === null) ? null : tp };
    }
    function text(id, a) {
        var T = window.WETTER_TEXTE || {}, e = T[id];
        if (!e) return "";
        var kl = a.kl;
        if (kl === "k" && a.temp !== null && a.temp <= 0.5 && e.kf !== undefined) kl = "kf";
        if (kl === "n" && e.n === undefined) kl = "b";
        if (kl === "s" && e.s === undefined) kl = "b";
        var t = e[kl];
        if (t === undefined) t = e.x;
        if (t === undefined) return "";
        if (t.indexOf("[[T]]") >= 0) t = t.split("[[T]]").join(a.temp === null ? "kalt" : tempWort(a.temp));
        return t;
    }
    // Festgehaltenes Tageswetter (fuer Szenen, in denen das Wetter die Handlung traegt) und Wetter des Vortags
    var REC = "adventWetterTag26", recMem = {};
    function recAlle() { try { return JSON.parse(localStorage.getItem(REC) || "{}") || {}; } catch (e) { return recMem; } }
    function recSpeichern(o) { recMem = o; try { localStorage.setItem(REC, JSON.stringify(o)); } catch (e) {} }
    function recKlasse(a) { if (a.kl === "x") return null; if (a.kl === "k" && a.temp !== null && a.temp <= 0.5) return "kf"; return a.kl; }
    function alsLage(k) { return k === "kf" ? { kl: "k", temp: -1 } : { kl: k, temp: 5 }; }
    function lageTag(day) {
        var v = vorschau(); if (v) return v;
        if (!day) return aktuell();
        var rec = recAlle(); if (rec[day]) return alsLage(rec[day]);
        var a = aktuell(), k = recKlasse(a);
        if (k) { rec[day] = k; recSpeichern(rec); }
        return a;
    }
    function lageVortag(day) {
        var v = vorschau(); if (v) return v;
        var rec = recAlle(); return (day && rec[day - 1]) ? alsLage(rec[day - 1]) : { kl: "x", temp: null };
    }
    function lageFuer(art, day) { return art === "p" ? lageTag(day) : (art === "v" ? lageVortag(day) : aktuell()); }
    function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
    window.wetterErsetzen = function (html, day) {
        return String(html).replace(/\{\{([wpv]):(\w+)\}\}/g, function (_, art, id) {
            return '<span class="wx" data-w="' + id + '" data-a="' + art + '"' + (day ? ' data-d="' + day + '"' : "") + ">" + esc(text(id, lageFuer(art, day))) + "</span>";
        });
    };
    window.wetterAktualisieren = function () {
        var l = document.querySelectorAll(".wx[data-w]");
        for (var i = 0; i < l.length; i++) {
            var art = l[i].getAttribute("data-a") || "w", d = Number(l[i].getAttribute("data-d")) || 0;
            if (art === "v") continue;
            var t = text(l[i].getAttribute("data-w"), lageFuer(art, d));
            if (l[i].textContent !== t) l[i].textContent = t;
        }
    };
    var laedt = false;
    window.wetterLaden = function () {
        var d = lesen();
        if (laedt || (d && Date.now() - d.t < 45 * 60 * 1000)) return;
        laedt = true;
        var url = "https://api.open-meteo.com/v1/forecast?latitude=" + LAT + "&longitude=" + LON + "&hourly=weather_code,temperature_2m&forecast_days=1&timezone=Europe%2FBerlin";
        try {
            fetch(url, { referrerPolicy: "no-referrer" }).then(function (r) { return r.json(); }).then(function (j) {
                if (j && j.hourly && j.hourly.weather_code && j.hourly.weather_code.length >= 24) {
                    speichern({ t: Date.now(), codes: j.hourly.weather_code.slice(0, 24), temps: (j.hourly.temperature_2m || []).slice(0, 24) });
                    window.wetterAktualisieren();
                }
            }).catch(function () {}).then(function () { laedt = false; });
        } catch (e) { laedt = false; }
    };
    window.wetterLaden();
})();
