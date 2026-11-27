# Erotischer Adventskalender 2026 – TEST-Version

Persönlicher, erotischer Adventskalender für die Partnerin („Schatz“), geschrieben und gebaut vom Partner. Alles auf Deutsch.
Eine statische Web-App aus HTML, CSS und JavaScript, **ohne eigenen Server, ohne Datenbank, ohne Anmeldung**. Alles, was sie eingibt oder auswählt, liegt im Browser ihres Geräts. Zwei Dinge laufen **zusätzlich und freiwillig** über einen kleinen Cloudflare-Worker (liegt nicht im Repository, [Abschnitt 14](#14-seine-bewertung-erjs-und-er-editorhtml) und [15](#15-kalender-erinnerungen-ics)): eine verschlüsselte Sicherung ihrer Angaben und die Push-Erinnerung. Fällt der Worker aus, funktioniert der Kalender weiter, nur Sicherung und Erinnerung ruhen.

Vom 1. bis 24. Dezember öffnet sich jeden Tag ein Türchen. Dahinter steckt:

1. **eine Geschichte in drei Stimmungen** (Geborgen, Verspielt, Intensiv), von denen sie jeden Tag eine wählt,
2. **eine Aufgabe** auf einer Karte („Umschlag“), deren Nummer am Ende der Geschichte steht, und eine **Alternative**,
3. **eine Bewertung** (Daumen) am nächsten Tag,
4. ab dem 25. Dezember eine **Auswertung der Favoriten**, abgeglichen mit seinen eigenen Bewertungen, ein Rückblick und ein Finale.

Dazu gehören gedruckte Teile (24 Faltkarten, Beipackzettel, Röllchen, Päckchen, Gimmick-Zettel, siehe [Abschnitt 27](#27-begleitmaterial-gedruckt-und-gebastelt)).

> **Dies ist die TEST-Version.** Sie ist eine eigene Instanz mit eigenem Repository. Hier werden Änderungen gebaut und geprüft, **bevor** sie in die LIVE-Version (https://kalender2026.tkagel.de, ebenfalls eigenes Repository) übernommen werden.
> Der Gesamtüberblick unten gilt für beide Versionen; die Unterschiede stehen in [Abschnitt 4](#4-live--und-test-version).

| | Adresse |
|---|---|
| **TEST** | https://vanallen84.github.io/testkalender/ |
| GitHub-Repository TEST | `vanallen84/testkalender` |
| LIVE (eigene Instanz) | https://kalender2026.tkagel.de |

Stand dieser Beschreibung: November 2026, Service-Worker-Version `v1795778804`.

---

## Inhalt

1. [Schnellstart: Was muss ich wann tun?](#1-schnellstart-was-muss-ich-wann-tun)
2. [Dateien im Überblick](#2-dateien-im-überblick)
3. [Einstellungen und Schalter im Code](#3-einstellungen-und-schalter-im-code)
4. [LIVE- und TEST-Version](#4-live--und-test-version)
5. [Datum und Freischaltung](#5-datum-und-freischaltung)
6. [Ablauf für sie](#6-ablauf-für-sie)
7. [Die Seiten im Einzelnen](#7-die-seiten-im-einzelnen)
8. [Animationen](#8-animationen)
9. [Farbwelten und Kategorien](#9-farbwelten-und-kategorien)
10. [Bilder](#10-bilder)
11. [Geschichten und Karten](#11-geschichten-und-karten)
12. [Kurzbeschreibungen unter den Türchen](#12-kurzbeschreibungen-unter-den-türchen)
13. [Bewertung, Notizen und Auswertung](#13-bewertung-notizen-und-auswertung)
14. [Seine Bewertung: er.js und er-editor.html](#14-seine-bewertung-erjs-und-er-editorhtml)
15. [Kalender-Erinnerungen (.ics)](#15-kalender-erinnerungen-ics)
16. [Was im Browser gespeichert wird](#16-was-im-browser-gespeichert-wird)
17. [Code-Sperre](#17-code-sperre)
18. [Wolke: die Chef-Taste](#18-wolke-die-chef-taste)
19. [Offline-Fähigkeit und Updates (Service Worker)](#19-offline-fähigkeit-und-updates-service-worker)
20. [Als App auf dem Startbildschirm](#20-als-app-auf-dem-startbildschirm)
21. [Hosting: GitHub Pages und Domain](#21-hosting-github-pages-und-domain)
22. [Testen](#22-testen)
23. [Besonderheiten, Stolperfallen und Lösungen](#23-besonderheiten-stolperfallen-und-lösungen)
24. [Interne Schalter und Adress-Zusätze](#24-interne-schalter-und-adress-zusätze)
25. [Wichtige Funktionen in index.html](#25-wichtige-funktionen-in-indexhtml)
26. [Verlauf der Änderungen](#26-verlauf-der-änderungen)
27. [Begleitmaterial (gedruckt und gebastelt)](#27-begleitmaterial-gedruckt-und-gebastelt)
28. [Datenschutz und Hinweise](#28-datenschutz-und-hinweise)
29. [Skripte (tools)](#29-skripte-tools)
30. [Entscheidungen und Begründungen](#30-entscheidungen-und-begründungen)
31. [Glossar](#31-glossar)
32. [Offene Punkte und Ideen](#32-offene-punkte-und-ideen)
33. [Neuaufbau-Anleitung (für ein neues Jahr oder einen neuen Chat)](#33-neuaufbau-anleitung)

---

## 1. Schnellstart: Was muss ich wann tun?

### Vor dem 1. Dezember 2026
1. In **LIVE** prüfen, dass `er.js` **seine echten Bewertungen** enthält (siehe [Abschnitt 14](#14-seine-bewertung-erjs-und-er-editorhtml)). Sie wird erst ab dem 25.12. gelesen, steht aber schon im Repository.
2. In **LIVE** prüfen: `testModus = false` und **kein** `VORTEST_NOVEMBER` im Code.
3. Auf dem eigenen Handy `https://kalender2026.tkagel.de` öffnen, den Code eingeben, Seite und Türchen-Übersicht prüfen. **Nicht** `?reset=1` auf ihrem Gerät benutzen.
4. Dafür sorgen, dass sie den **Code** kennt (steht im Beipackzettel und auf dem Code-Zettel, siehe Abschnitt 27).
5. Ihr Handy ggf. auf Datum und Uhrzeit „automatisch“ stellen lassen (Freischaltung hängt an der Geräteuhr).
6. **Sicherung (Cloudflare) einrichten:** Worker und Speicher (KV) anlegen, im Editor „Sicherung einrichten“ durchgehen (Passwort, Zugangs-Hash, Worker-Adresse) und die Konfiguration über „An TEST und LIVE senden“ übertragen. `sicherung-config.js` im Repository ist nur ein Platzhalter (`aktiv: false`); die echte Konfiguration schreibt der Editor. Diese Datei **nicht** durch ein Update überschreiben. Danach in TEST ausprobieren (bewerten, im Editor „Ihre Antworten ansehen“).
7. **Töne hochladen:** Den Ordner `ton/` in **beiden** Repositories anlegen und die Dateien `knarren.mp3`, `wirbel.mp3`, `auspacken.mp3`, `finale.mp3`, `zuklappen.mp3`, `umschlag.mp3` und `aufschliessen.mp3` hineinlegen (`finale.mp3` enthält den Herzschlag bereits eingemischt) (Abschnitt 7.8). Ohne die Dateien läuft alles lautlos. Danach in TEST einmal die Enthüllung der Auswertung und das Finale mit Ton ansehen (Tipp: in TEST ist der November wie der Dezember).
8. **Push-Erinnerung einrichten (Cloudflare, optional):** im Worker die Variable `VAPID_PUBLIC` (Text), das Secret `VAPID_PRIVATE` und den Cron-Trigger `* * * * *` (jede Minute, einen alten `*/15` löschen) eintragen und den Worker neu veröffentlichen. Dann in der installierten App den Schalter „Erinnerung“ einschalten und „Testnachricht senden“ drücken (Abschnitt 15, Schlüssel erzeugen siehe Abschnitt 33).
9. **Health-Check ansehen** (Editor `er-editor.html#status`, nur TEST): Ampel oben soll grün sein (Abschnitt 15).
10. **Startbilder:** Ordner `startup/` (14 PNGs) in beide Repositories hochladen. iOS liest sie nur beim Anlegen der Startbildschirm-App; wer die App schon angelegt hat, muss sie löschen und neu anlegen, um sie zu sehen (Abschnitt 8.5).
11. **Ab dem 1. Dezember gilt Code-Freeze:** Es kommt nichts Neues mehr hinzu, nur noch Fehlerbehebung (jede Änderung mit `VERSION`-Erhöhung, erst TEST, dann LIVE).

### Nach einer Änderung (LIVE oder TEST)
1. `index.html` bzw. die betroffenen Dateien ändern.
2. **`VERSION` in `sw.js` erhöhen** (Abschnitt 19).
3. Hochladen. Beide Repositories haben je eigene `index.html` und `sw.js`. Beim Hochladen auf die Dateinamen achten: Download-Dateien heißen `index_TEST_ascii.html` / `index_LIVE_ascii.html` und `sw_TEST.js` / `sw_LIVE.js` und müssen vor dem Hochladen in `index.html` bzw. `sw.js` umbenannt werden.
4. GitHub Pages braucht ein bis zwei Minuten. Dann am Handy prüfen.

### Im nächsten Jahr (falls der Kalender wiederverwendet wird)
- Alle Speicher-Schlüssel enden auf `26` (`adventGeoeffnet26` …). Für ein neues Jahr die Endung ändern, sonst sieht sie ihren alten Stand.
- Das Jahr 2026 steckt in der Freischaltung (`jetzt()`, `tagOffen`), in den `.ics`-Dateien, in den Dateinamen der Erinnerungs-Bilder („Advent2026_…“) und in den Speicher-Schlüsseln. Die Geschichten enthalten Wochentage und Daten von 2026. **Prüfen und anpassen.**
- `er.js` neu befüllen, Bewertungen zurücksetzen (`?reset=1` bzw. neue Schlüssel).

---

## 2. Dateien im Überblick

```
/
├── index.html            Die ganze Seite: HTML, CSS und JavaScript in einer Datei
├── sw.js                 Service Worker: Offline-Speicher und Updates
├── manifest.json         App-Manifest (Name, Symbole, Startadresse)
├── icon-192.png, icon-512.png, apple-touch-icon.png   App-Symbole
├── startup/                                         dunkle Startbilder (iPhone-Größen)
├── data.js               Aufgabentexte der 24 Karten (Base64, siehe Abschnitt 11)
├── er.js                 Seine Bewertungen (A/B/C je Aufgabe und Alternative)
├── wetter.js             Wetter-Modul (Abruf, Klassen, Platzhalter ersetzen)  [Wetter-Ergänzung, Abschnitt 7.9]
├── wetter-texte.js       Textbausteine je Wetter für die Geschichten (Platzhalter {{w:…}})
├── er-editor.html        Werkzeug zum Eintragen von er.js (nur in TEST)
├── sicherung.js          stille Sicherung der App-Daten (verschlüsselt)
├── sicherung-config.js   Einstellungen der Sicherung (vom Editor erzeugt)
├── wiederherstellung.html  nicht verlinkte Seite für den Handywechsel
├── manifest-er.json      App-Manifest des Editors „His Rating“ (nur in TEST)
├── icon-er-180/192/512.png  Icons des Editors (nur in TEST)
├── ton/                  Töne: knarren.mp3 (Tür), wirbel.mp3 (Wind beim Wirbel), auspacken.mp3 (Enthüllung), finale.mp3 (Finale-Melodie mit Herzschlag), zuklappen.mp3 (Tür rückwärts), umschlag.mp3 (Umschlag), aufschliessen.mp3 (richtiger Code); ohne die Dateien läuft alles lautlos
├── story-day1.js … story-day24.js   Die 24 Geschichten (je drei Stimmungen)
├── bilder/
│   ├── landing.jpg           Bild der Startseite und der Sperre
│   ├── finale.jpg            Bild der Finale-Seite
│   ├── karte-01.jpg … karte-24.jpg     Tagesbilder (nach Kartennummer, nicht nach Türchen!)
│   ├── pix-mid-01.png … pix-mid-24.png     leicht verpixelt
│   └── pix-lock-01.png … pix-lock-24.png   stark verpixelt (gesperrte Kacheln)
└── erinnerung/
    └── 1700.ics … 2200.ics   Kalender-Termine, je eine Datei pro Uhrzeit
```

- Es gibt **keinen Build-Schritt und keine Abhängigkeiten**. Die Seite läuft so, wie die Dateien im Repository liegen.
- Bildnamen folgen der **Kartennummer** (`calendarData[Tag].cardNum`), nicht der Türchen-Nummer (siehe [Abschnitt 11](#11-geschichten-und-karten)).
- `er-editor.html` ist nur in der TEST-Version vorhanden. In LIVE wird die Datei nicht hochgeladen.
- Die Skripte, mit denen Bilder, PDFs und `.ics`-Dateien erzeugt wurden, liegen **nicht** im Repository (sie wurden im Chat mit Claude erzeugt). Die Ergebnisse (Bilder, `.ics`, PDFs) sind dagegen vorhanden.

---

## 3. Einstellungen und Schalter im Code

Es gibt keine eigene Konfigurationsdatei; die Schalter stehen in `index.html`.

| Schalter | Wo | Bedeutung |
|---|---|---|
| `const testModus = false;` | oberer Skriptbereich | `true`: **alle** Türchen offen, Entwickler-Leiste („🧪 Test-Modus“ mit Tagesauswahl), Sperre aus, Diagnose in der Auswertung. **Niemals mit `true` hochladen.** |
| `const VORTEST_NOVEMBER = true;` | nur TEST | Der November 2026 zählt als Dezember (siehe Abschnitt 4). In LIVE gibt es den Block nicht. |
| `window.FINALE_VAR = "B";` | Finale-Skript | `"B"` = „Die 24 Lichter“, `"A"` = „Vier Kerzen“ |
| `CODE` (Base64) | Sperre, Skript am Seitenanfang | Der Sperr-Code (siehe Abschnitt 17) |
| `PAUSE = 3 * 60 * 1000` | Sperre | Pause im Hintergrund, nach der die Sperre erneut kommt |
| `KURZ` | vor `tuerStilAktualisieren` | Kurzbeschreibungen unter den Kacheln (Abschnitt 12) |
| `calendarData` | oberer Skriptbereich | Zuordnung Türchen → Kategorie und Kartennummer |

---

## 4. LIVE- und TEST-Version

Beide Versionen sind **getrennte Repositories mit getrennten Adressen** und (bis auf wenige Stellen) derselbe Code. Deshalb haben sie auch getrennten Browser-Speicher.

| | LIVE | TEST |
|---|---|---|
| Adresse | https://kalender2026.tkagel.de | https://vanallen84.github.io/testkalender/ |
| Datum | echtes Datum (`new Date()`) | **November 2026 wird wie Dezember behandelt** (1. Nov = Türchen 1 … 24. Nov = Türchen 24, **25. Nov = „25. Dezember“**) über `VORTEST_NOVEMBER` und `jetzt()` |
| `er-editor.html` | nicht vorhanden | vorhanden (inkl. Health-Check mit Ampel) |
| Push-Modus | Anmeldung mit `modus: live` (nur 1.–24.12.) | `modus: test` (Worker sendet auch im November, zum Ausprobieren) |
| „Heute“ ohne Türchen (25.–30.11.) | – | Deep-Link und Test-Auswahl nehmen das erste ungeöffnete, sonst ein zufälliges Türchen (nur zum Testen) |
| App-Name auf dem Startbildschirm | „Dezember“ | „Dez TEST“ (Manifest: „Dezember TEST“) |
| App-Symbol | Tür mit goldenem Licht | dasselbe mit rotem Band „TEST“ |
| Finale | läuft einmal von selbst | läuft in TEST immer wieder (wegen `VORTEST_NOVEMBER`) |
| Diagnose in der Auswertung | nicht sichtbar | nur mit `testModus = true` |
| Countdown auf der Startseite | zählt bis 1. Dezember | zählt bis 1. November |

Wesentliche Code-Unterschiede (zum Abgleich, wenn Änderungen von TEST nach LIVE übertragen werden):
- In TEST gibt es den Block `VORTEST_NOVEMBER` mit `jetzt()`. LIVE benutzt an allen Stellen `new Date()` statt `jetzt()`.
- Meta-Tag `apple-mobile-web-app-title`: „Dez TEST“ in TEST, „Dezember“ in LIVE.
- `manifest.json` und die drei Symbole sind in TEST andere Dateien (rotes Band).
- `sw.js` und `er.js` sind je Version eigene Dateien.

**Übertragen von TEST nach LIVE:** nicht die ganze TEST-`index.html` kopieren (sonst gelangt `VORTEST_NOVEMBER` nach LIVE), sondern dieselben Änderungen in beide Dateien einbauen. In diesem Projekt geschah das bisher über Patch-Skripte, die beide Dateien in einem Schritt ändern.

Im Dezember verhält sich TEST wie LIVE (nur mit eigenem Speicher). Zum Vorab-Testen also im November testen.

---

## 5. Datum und Freischaltung

- Maßgeblich ist das **Datum auf dem Gerät**, nicht eine Serverzeit.
- Türchen N ist ab dem **N. Dezember 0:00 Uhr** frei (`tagOffen(N)`). Frühere Türchen bleiben frei.
- Vor dem 1. Dezember sind alle gesperrt.
- **Ab dem 25. Dezember 2026** (und in späteren Jahren) sind **alle 24 Türchen frei** (`alleFreigegeben()`). Dann können auch die anderen Stimmungen gelesen werden, die Auswertung erscheint und die Bewertung ist nachholbar.
- **Weiter-Knopf:** Unter einer Geschichte erscheint „Weiter durch das nächste Türchen“ nur, wenn das **nächste Türchen schon frei** ist. Bei Türchen 24 heißt er „Zum Finale …“ und ist immer sichtbar. Beispiel: Am 5. Dezember zeigt Türchen 4 den Knopf, Türchen 5 nicht.
- **Bewertungsgrenze:** Ein Tag gilt als „vergangen“, wenn er vor dem heutigen Tag liegt (`bewertungsGrenze`, `tagVergangen`). Nach dem 25.12. gelten alle als vergangen.
- Kommt die Seite aus dem Hintergrund und ist ein anderer Tag, aktualisiert sich der Zustand (z. B. neues Türchen).
- Auf der Startseite steht ein Hinweis: Lässt sich ein Türchen nicht öffnen, obwohl der Tag da ist, stimmt vermutlich das Datum am Handy.

---

## 6. Ablauf für sie

```
Sperre (Code) ──▶ Startseite ──„Tauche ein in den Advent!“──▶ Türchen-Übersicht
                                                                         │ Tipp auf ein freies Türchen
                                                                         ▼
                                                          Portal-Animation (Tür geht auf, Bild entpixelt sich, Zoom)
                                                                         │
                                       noch keine Stimmung gewählt ──────┴── Stimmung schon gewählt
                                                  ▼                                    ▼
                                       Stimmungsauswahl (Geborgen / Verspielt / Intensiv)   Geschichte
                                                  │ „Tauche ein in die heutige Geschichte!“       ▲
                                                  ▼                                                │
                                       Buchstaben-Wirbel ─────────────────────────────────────────┘
                                                                         │
                          Weiter-Knopf (nur wenn nächstes Türchen frei) → Portal → nächstes Türchen
                          bei Türchen 24: „Zum Finale …“ → Finale-Animation → Finale-Seite
```

1. Sie wählt die **Stimmung** (einmal pro Tag, danach festgeschrieben).
2. Sie liest die **Geschichte** und erfährt am Ende die **Nummer des Umschlags**.
3. Sie zieht den Umschlag mit dieser Nummer aus dem Beutel (Aufgabe und Alternative stehen auf der Karte).
4. Am **nächsten Tag** fragt das Türchen, wie die Aufgabe war (Bewertung mit Daumen). Der Originaltext der Aufgabe und der Alternative wird dabei noch einmal angezeigt.
5. Ab dem **25. Dezember** gibt es Auswertung, Rückblick, andere Stimmungen und Finale.

**Einstieg über die Push-Nachricht:** Tippt sie auf die Erinnerung, öffnet sich die App, es folgt die Code-Abfrage und danach läuft direkt die Tür-Animation des heutigen Türchens (Abschnitt 15). Öffnet sie das Türchen, verschwindet die Benachrichtigung wieder.

Päckchen: Kleine Extras liegen in Päckchen, die am Umschlag hängen. **Erst die Aufgabe lesen, dann auspacken** (steht im Beipackzettel und auf einzelnen Zetteln).

---

## 7. Die Seiten im Einzelnen

Alle Seiten sind `<div>`-Bereiche in `index.html`; ein- und ausgeblendet wird über die Klasse `hidden`.

| ID | Seite |
|---|---|
| `codeSperre` | Sperre (Overlay über allem) |
| `landingScreen` | Startseite |
| `calendar-overview` | Türchen-Übersicht |
| `setupScreen` | Stimmungsauswahl |
| `storyScreen` | Geschichte mit Bewertung |
| `auswertungScreen` | Auswertung der Favoriten |
| `finaleScreen` | Finale mit Rückblick |
| `lock-modal` | Hinweis für gesperrte Türchen |
| `bossOverlay`, `bossHint` | Wolke (Wetteransicht) und ihr Hinweis |

### 7.1 Startseite
- Überschrift „Dein ganz persönlicher Adventskalender“, darunter die Widmung („Von deinem dich liebenden Ehemann, nur für dich ganz persönlich entwickelt!“).
- **Countdown** („Noch N Tage, dann öffnet sich das erste Türchen.“) nur kurz vor dem Start.
- **Bild** `bilder/landing.jpg`, blendet bei jedem Besuch erneut ein.
- **Einleitung** („Willkommen zu deinem ganz persönlichen und intimen Adventskalender …“).
- Karte **„Bevor es losgeht“** mit zwei Schritten: Auf den Startbildschirm legen (Anleitung für iPhone/Safari und Android/Chrome) und **Erinnerung** (Uhrzeit wählen, „Termine hinzufügen“ lädt eine `.ics`-Datei). In der **installierten App** ersetzt ein Kasten mit **Toggle-Schalter** („Erinnerung einschalten“, Uhrzeit, „Testnachricht senden“) diese Kalender-Termine; das ist die Push-Erinnerung (Abschnitt 15). Ein Tipp auf die Nachricht öffnet nach der Code-Abfrage direkt das heutige Türchen.
- Kasten **„Und so funktioniert das Ganze“** mit sieben Punkten: 1 Stimmung wählen, 2 Geschichte, 3 Umschlag aus dem Beutel, 4 Bewerten, 5 Notizen, 6 Nachholen und Wiederfinden, 7 Ab dem 25. Dezember (Auswertung, Abgleich mit seinen Bewertungen auf eigener Oberfläche, Favoritenliste, Erinnerung speichern).
- Hinweis zum Datum auf dem Handy und der Knopf **„Tauche ein in den Advent!“**.
- Ab dem 25.12.: Knopf „Zur Auswertung der Favoriten“.

### 7.2 Türchen-Übersicht
- Überschrift „Wähle das heutige Türchen“, darunter ein **Begrüßungssatz** nach Tageszeit (morgens, mittags, abends, nachts; Liste `BEGRUESSUNG`, pro Tag und Tageszeit ein fester Satz, verwaltet in `adventGruss26`).
- Am 24. Dezember erscheint der Hinweis „Morgen wartet noch etwas auf dich“ (`teaserMorgen`).
- **24 Kacheln.** Zustände:

| Zustand | Aussehen |
|---|---|
| gesperrt (Tag noch nicht erreicht) | stark verpixeltes Bild (`pix-lock`), dunkel, Schloss |
| heute / nicht geöffnet | leicht verpixelt (`pix-mid`), goldener Rahmen, Leuchten |
| früherer Tag, ausgelassen | „Noch ungeöffnet“ |
| geöffnet | Bild scharf, goldener Rand, **Kurzbeschreibung der Aufgabe** unten |
| ab 25.12., geöffnet (`frei`) | wie geöffnet, grauer Rand, Kurzbeschreibung bleibt |

- Beim Öffnen der Übersicht wird zur Kachel des heutigen Tages gescrollt.
- Als „geöffnet“ zählt ein Türchen, sobald es angeklickt und die Geschichte geladen wurde (`adventGeoeffnet26`).
- Knopf „Zum Finale“ ab dem 25.12. oder sobald Türchen 24 geöffnet wurde.

### 7.3 Stimmungsauswahl
Sichtbar, wenn für den Tag noch keine Stimmung gewählt wurde.
- **Geborgen** („Langsam, warm und voller Vertrauen“, intern `hingabe`)
- **Verspielt** („Frech, spielerisch und voller Flirt“, intern `naehe`)
- **Intensiv** („Direkt, heiß und ohne Zurückhaltung“, intern `feuer`)
- Die Wahl gilt für diesen Tag und kann **nicht mehr geändert** werden. Erst ab dem 25.12. lässt sich die Stimmung wieder ändern und andere Versionen lesen (`btnStimmungNeu`).
- Die ursprüngliche Wahl bleibt für den Rückblick gespeichert (`o` in `adventWahl26`).

### 7.4 Geschichte
- „Türchen N“, Name der Kategorie, Geschichte in der gewählten Stimmung.
- Am Ende: ein **geschlossener Umschlag** in der Farbe der Kategorie („Tippe auf den Umschlag“). Beim Antippen klappt die Klappe auf, eine Karte mit der **Umschlag-Nummer** gleitet heraus, dazu spielt `ton/umschlag.mp3` (`karteninfoSetzen`, `umschlagOeffnen`). Geöffnete Umschläge merkt sich die App je Türchen (`adventUmschlag26`); beim Wiedersehen ist die Karte sofort sichtbar.
- **Bild** des Tages (`karte-NN.jpg`) blendet beim Lesen ein, zusätzlich liegt es als dezentes **Wasserzeichen** im Hintergrund.
- Oben (am Folgetag): **Abfrage zum Vortag** („Wie war gestern die Aufgabe?“) mit **Originaltext der Aufgabe und der Alternative** und je drei Daumen-Knöpfen.
- Unten: **Bewertungskasten** („Wie war es?“) und **Notizfelder** (je Version eines: „Meine Notiz zur Aufgabe“ / „… zur Alternative“, ohne weiteren Hinweis). Bei der Bewertung am selben Tag steht dort **kein** Aufgabentext, damit nichts vorweggenommen wird. Der Text steht dort erst, wenn das Türchen schon an einem **früheren Tag** einmal geöffnet war (siehe „Wann der Aufgabentext erscheint“ unten). Wer an einem späteren Tag ein Türchen zum ersten Mal öffnet, sieht ihn noch nicht.

**Wann der Aufgabentext erscheint:** Der Wortlaut von Aufgabe und Alternative steht im Bewertungskasten (und im Banner zum Vortag) nur, wenn das Türchen an einem **früheren Kalendertag** schon einmal geöffnet war. Gespeichert wird dafür der Tag der ersten Öffnung (`adventOeffnetAm26`).

| Situation | Text sichtbar? |
|---|---|
| Türchen heute zum ersten Mal geöffnet | nein |
| Ein älteres Türchen (z. B. vom 18. am 20.) heute zum **ersten** Mal geöffnet | nein |
| Dasselbe Türchen am nächsten Tag oder später erneut geöffnet | ja |
| Dasselbe Türchen am selben Tag der ersten Öffnung noch einmal geöffnet | nein |
| Ab dem 25.12. | ja, bei allen |

Hintergrund: Wer ein Türchen verpasst und nachholt, soll die Aufgabe erst als Überraschung lesen (in der Geschichte) und nicht schon vorher im Kasten. Bewerten ist weiterhin möglich. Die Bewertung selbst ist davon unabhängig.
- **Weiter-Knopf** (siehe Abschnitt 5).
- Lesefortschritt und Leseposition (`adventLese26`) werden gespeichert.

### 7.5 Auswertung (ab 25.12.)
Siehe [Abschnitt 13](#13-bewertung-notizen-und-auswertung).

### 7.6 Finale
- Überschrift „Frohe Weihnachten“, vier Absätze Dank und Ausblick, Signatur „Frohe Weihnachten, mein Schatz. Ich liebe dich!“, Bild `finale.jpg`.
- **Rückblick** (Zähler: Türchen, Stimmungen, Bewertungen, Notizen), Knopf zur Auswertung, **„Meine Erinnerung speichern (Bilder + Text)“** und „Animation noch einmal ansehen“.
- Die Finale-Animation läuft nur einmal von selbst (`adventFinaleAn26`), in TEST wegen des November-Modus immer.

### 7.7 Browser-Tab
Titel und Symbol wechseln mit der Seite („Intro“, „Die Türchen“, „N. Dezember“, „Auswertung“, „Finale“; in der Wolke „Wetter“, in der Sperre „Dezember“). Die Farbe der Browserleiste (`theme-color`) folgt dem Hintergrund.

### 7.8 Komfort-Funktionen (Dezember-Ergänzung)
**Status: in TEST und LIVE umgesetzt.**

- **Lesen anpassen („Aa“):** Kleiner runder Knopf unten rechts auf der Geschichtsseite. Drei Schriftgrößen und der Schalter „Warm & gedimmt“ (leichter Orangeton, abgedunkelt, abends augenschonend). Die Wahl wird gespeichert und gilt für die ganze App (`adventLeseFs26`, `adventLeseWarm26`).
- **Countdown:** Auf der Türchen-Übersicht steht „Das nächste Türchen öffnet sich in 5 Std 12 Min“. Vor dem 1. Dezember bezieht er sich auf Türchen 1. Er erscheint nur, wenn das heutige Türchen schon geöffnet wurde; am 24.12. übernimmt der bekannte Hinweis „Morgen wartet noch etwas“, ab dem 25.12. gibt es keinen Countdown mehr. Aktualisierung alle 30 Sekunden.
- **Offene Aufgaben (nur verschiebbare Karten):** Verschiebbar sind nur die Karten 3, 4, 8, 15, 17, 19 und 23 (das sind die Türchen 7, 15, 1, 24, 8, 16 und 2). Nur dort steht unter der Bewertung der Knopf „Aufgabe erledigt?“ mit dem Hinweis, dass sie bis zum 31. Dezember nachgeholt werden darf. Wird bewertet, gilt die Aufgabe automatisch als erledigt. Offene Türchen erhalten ein Sanduhr-Zeichen auf der Kachel und eine Zeile „Noch offen bis 31. Dezember: Türchen …“ mit direkten Sprungknöpfen. Nach dem 31.12. verschwindet alles.
- **Lieblingsgeschichten (Herz):** Unter jeder Geschichte ein Herz-Knopf „Diese Geschichte gefällt mir“. Ein Herz je Türchen und Stimmung; weitere Stimmungen kann sie erst ab dem 25.12. lesen und dann auch dort ein Herz vergeben (dieselbe Geschichte kann also mehrfach in der Liste stehen). Herzchen erscheinen auf der Kachel; ab dem 25.12. zeigt die Übersicht den Bereich „Meine Lieblingsgeschichten“ (Sprungknöpfe zu Türchen und Stimmung).
- **Tür-Knarren:** Liegt die Datei `ton/knarren.mp3` im Repository, spielt sie beim Öffnen eines Türchens (immer aktiv, kein Schalter; Lautstärke über das Gerät). Fehlt die Datei, passiert nichts (kein Fehler). Die sieben Tondateien stehen in der Vorab-Liste des Service Workers (`TON`) und werden einzeln mit Fehlertoleranz abgelegt, fehlt eine Datei, scheitert nicht die Installation. Damit laufen die Töne auch offline; der Service Worker beantwortet dabei auch die Bereichsanfragen (Range) der Audio-Elemente aus dem Speicher (nötig für iPhone). Nach dem Hochladen neuer Töne muss `VERSION` in `sw.js` erhöht werden. Die Töne laufen bewusst unabhängig vom Stumm-Schalter (Abschnitt 8.5 und 30).
- **Enthüllung (optional):** Liegt `ton/auspacken.mp3` im Repository (ca. 14 s, nur die ersten fünf Sekunden sind hörbar), spielt sie beim Tipp auf „Enthüllen“ in der Auswertung und wird am Ende der Animation ausgeblendet. Fehlt die Datei, läuft die Animation lautlos (siehe Abschnitt 13.3).
- **Finale-Melodie (optional):** Liegt `ton/finale.mp3` (ca. 26 s) im Repository, startet sie mit der Finale-Animation und klingt unter der Finale-Seite aus; beim Überspringen wird sie ausgeblendet (`tonFinale`). Fehlt die Datei, läuft die Animation lautlos.
- **Herzschlag:** Die sechs Herzschläge (Lub-Dub, Abstand 1,1 s, ab 16,57 s, der Lub fällt jeweils auf 16,85 s + n·1,1 s) sind fest in `ton/finale.mp3` eingemischt, damit sie auf allen Geräten gleichzeitig mit der Melodie laufen (iPhone: Web Audio wird vom Stumm-Schalter gedämpft, normale Audio-Elemente nicht). Das Original `herzschlag.mp3` liegt fast nur im Tiefbass (unter 120 Hz), den Handy-Lautsprecher kaum wiedergeben; für die Mischung wurde es mit Obertönen im Bereich 120–500 Hz angereichert. Die Pulse des Herzens im Bild laufen weiter über die Animationsschleife. `herzschlag.mp3` wird nicht mehr gebraucht.
- **Lautstärke angeglichen:** Alle Töne sind auf etwa −18 LUFS normalisiert (Spitzen unter −1,5 dBFS) und werden mit Lautstärke 0,8 abgespielt, damit man die Gerätelautstärke nicht ständig anpassen muss. `knarren.mp3` und `wirbel.mp3` waren zuvor rund 14 dB leiser als die anderen; die angeglichenen Fassungen liegen im Update-Paket. Werden Töne später getauscht, vorher auf denselben Pegel bringen.
- **Aufschließton:** Bei richtigem Code der Sperre spielt `ton/aufschliessen.mp3` (ca. 0,7 s, `tonAufschliessen`, aufgerufen in `oeffnen()` der Code-Sperre). Bei falschem Code gibt es nur das Wackeln und eine kurze Vibration, keinen Ton.
- **Wirbel-Wind (optional):** Liegt `ton/wirbel.mp3` im Repository, spielt sie beim Wirbel-Übergang von der Stimmungswahl in die Geschichte. Ebenfalls ohne Schalter; fehlt die Datei, passiert nichts.
- **Ausblenden beim Überspringen:** Wird eine Animation durch Antippen übersprungen oder endet sie, blendet der Ton in ca. einer halben Sekunde aus (`tonAusblenden` in `index.html`), damit beim Lesen nichts nachklingt. Das gilt für das Knarren beim Tür-Übergang und den Wind beim Wirbel.

### 7.9 Wetter in den Geschichten (Dezember-Ergänzung)
**Status: in TEST und LIVE umgesetzt.**

#### Warum
Viele Geschichten spielen an einem bestimmten Tag mit einem bestimmten Wetter: Schnee am 13., Frost am 8., Sturm am 18. Liest sie so eine Geschichte bei Sonne oder bei Regen, fühlt sich der Satz „Draußen fällt der Schnee“ falsch an und holt sie aus der Geschichte. Deshalb passen sich die Wettersätze dem echten Wetter an ihrem Wohnort an, damit die Geschichte zu dem passt, was sie gerade aus dem Fenster sieht.

#### Was sie davon bemerkt
- Wetterstellen, die nebenbei vorkommen („Draußen prasselt der Regen“, „der Himmel ist grau“), zeigen das echte Wetter. Sie sieht keinen Hinweis darauf, dass Text getauscht wurde.
- In mehreren Türchen (8, 13, 14, 18 und der dritten Stimmung von Türchen 10) ändert sich eine ganze Szene. Beispiel: Türchen 13 ist im Original ein Schneetag mit Schlittenhügel. Regnet es, wird daraus ein Regentag mit Matsch-Rutschbahn; ist es trocken und kalt, ein Tag mit Drachen und Rollen im Gras. Ablauf, Gespräche und Höhepunkte bleiben gleich, nur die Kulisse passt zum Wetter.
- Weiß die App das Wetter nicht (kein Netz, Abruf gescheitert), läuft immer der Originaltext. Es gibt keine Fehlermeldung.
- Türchen 8 (Sternenhimmel) hat Fassungen für das Wetter des Tages: klar mit Frost (Original), klar ohne Frost (Tau statt Frost, die Sterne bleiben), Regen (Regentropfen am Fenster), bedeckt oder Nebel (keine Sterne, stattdessen die Lichter im Dorf) und Schnee (Flocken im Laternenlicht). Ablauf, Gespräche und Höhepunkte bleiben in allen Fassungen gleich.

#### Woher das Wetter kommt
Open-Meteo (frei nutzbar, kein Schlüssel, keine Anmeldung), stündlich, für Grevenbroich. Das ist dieselbe Quelle wie die Wolke. Es werden nur die Koordinaten des Ortes übertragen, keine Daten über sie oder ihr Gerät. `wetter.js` ruft beim Start einmal die Werte des Tages ab (Wettercode und Temperatur je Stunde) und merkt sie sich im Browser (`adventWetter26`). Nach 45 Minuten wird neu abgerufen; ohne Netz gelten die gemerkten Werte bis zu 6 Stunden. Für die laufenden Wettersätze (`w`) zählt die Stunde, in der sie gerade liest. Für festgehaltene Szenen (`p`) zählt das **Tageswetter**: Aus den Stunden von 8 bis 18 Uhr wird das vorherrschende Wetter gewählt (Schnee ab 2 Stunden, Regen ab 3, Nebel ab 4, sonst die Mehrheit aus klar oder bedeckt; klar bei höchstens 0,5 °C gilt als Frost). So entscheidet nicht die eine Lesestunde über den ganzen Tag. Liegen nicht genug Stundenwerte vor, gilt das Wetter der Lesestunde.

**Wetterklassen:** `r` Regen (auch Niesel, Schauer, Gewitter), `s` Schnee, `n` Nebel, `k` klar oder heiter, `b` bedeckt, `kf` klar mit Frost (Temperatur ≤ 0,5 °C), `x` unbekannt.

#### Wie es umgesetzt ist
- **Marken im Text:** In den Dateien `story-dayN.js` ist jeder Wettersatz durch eine Marke ersetzt, z. B. `{{w:d5_boden}}`. In `wetter-texte.js` steht zu jeder Marke der Text je Wetterklasse. Fehlt eine Klasse, gilt die neutrale (`x`); Nebel und Schnee fallen zur Not auf `b` zurück, Frost auf `k`.
- **Drei Arten von Marken:**
  - `w` zeigt das Wetter **jetzt**. Kommt der Abruf erst nach dem Aufbau der Seite, tauscht `wetterAktualisieren` nur den Text aus, die Seite springt nicht.
  - `p` zeigt das Wetter beim **ersten Lesen** des Türchens und hält es fest (`adventWetterTag26`). So bleibt eine Szene stehen, wenn sie dieselbe Geschichte später noch einmal liest. Das gilt für die ganzen Szenen in den Türchen 8, 10, 13 und 18.
  - `v` liest das festgehaltene Wetter des **Vortags**. So greift Türchen 14 auf, was gestern passiert ist („Schnee von gestern“, „Regen von gestern“, „kalte Luft von gestern“). Fehlt der Vortag (z. B. Türchen 13 nicht gelesen), gilt das Original.
- **Einbau in `index.html`:** Die Funktion, die die Geschichte anzeigt, ruft `wetterErsetzen(text, tag)` auf und ersetzt die Marken durch `<span class="wx" …>`. Das Modul `wetter.js` wird am Seitenende geladen. Fehlt es, werden die Marken entfernt und die Geschichte bleibt lesbar.
- **Temperatur:** Ein Baustein darf `[[T]]` enthalten; das wird durch die Temperatur in Worten ersetzt („minus drei Grad“).
- **Service Worker:** `wetter.js` und `wetter-texte.js` stehen in der Vorab-Liste von `sw.js`, damit die Seite auch offline funktioniert.

#### Welche Türchen wie reagieren
| Türchen | Verhalten |
|---|---|
| 1 bis 7, 9, 12, 15, 17, 20 bis 24 | Einzelne Wettersätze folgen dem echten Wetter. |
| 10 (Intensiv) | Nebel-Nachmittag im Original (bei Nebel oder unbekanntem Wetter). Bei Regen oder trocken-kalt eine eigene Szene im Garten. |
| 3, 6, 7, 11, 24 | Rückbezüge und Randdetails (Eis auf der Windschutzscheibe, Scheibe, Mantel, Rätsellösung, Abendhimmel an Heiligabend) passen sich dem Wetter an. Nieselregen, Heimkehr und Geruch in Türchen 11 ebenfalls. |
| 13 | Schneetag im Original (Schnee oder unbekannt). Fassung R für Regen (Matsch-Rutschbahn, Wasserschlacht, Staudamm), Fassung T für klar, Frost, bedeckt und Nebel (Hügel zum Rollen, Drachen, Laubschlacht). In allen drei Stimmungen. |
| 14 | Greift das Wetter von Türchen 13 auf (`v`) und passt den heutigen Himmel an. |
| 15 bis 17 | Keine Schnee-Rückbezüge nötig; einzelne Wettersätze sind angepasst. |
| 18, 19 | Türchen 18 ist im Original ein Sturmtag mit Stromausfall (nur bei unbekanntem Wetter). Bei bekanntem Wetter fällt der Strom wegen Baggerarbeiten vor der Schule aus (der Hausmeister warnt davor), dazu passen Regen oder kalte Stille. Türchen 19 passt seinen Himmel dem Wetter an. |
| 8 | Sternenhimmel-Tag. Original bei klar mit Frost oder unbekanntem Wetter. Klar ohne Frost: Tau statt Frost. Regen: Regentropfen am Fenster statt Sterne. Bedeckt oder Nebel: Lichter im Dorf statt Sterne. Schnee: Flocken im Laternenlicht. In allen drei Stimmungen; die Wette, die Gespräche und der Abend bleiben gleich. |

Insgesamt gibt es 196 Bausteine in 72 Fassungen (24 Türchen mal drei Stimmungen).

#### Standort statt fest Grevenbroich (optional)
**Status: in TEST und LIVE umgesetzt.**

Auf der Startseite gibt es unter „Bevor es losgeht“ den Schritt „Das Wetter in den Geschichten“ mit der Erklärung **„Warum dein Handy dich nach dem Standort fragt“** und dem Knopf „Standort für das Wetter freigeben“.
- **Ohne Freigabe** ändert sich nichts: Das Wetter kommt für Grevenbroich.
- **Mit Freigabe** fragt `wetter.js` bei jedem Start die Position ab (`navigator.geolocation`, ungenau und ohne GPS-Zwang, bis zu 30 Minuten alte Werte erlaubt, Zeitlimit 10 Sekunden). Die Koordinaten werden auf 0,1 Grad (ca. 10 km) gerundet (`adventOrt26`), der Schalter steht in `adventOrtAn26` (`1` = an). Nur diese gerundeten Koordinaten gehen an Open-Meteo; sie werden sonst nirgends hingeschickt.
- **Ortswechsel:** Weicht der neue Ort um mehr als ca. 0,25 Grad ab, wird das Wetter neu geladen. Der Zwischenspeicher `adventWetter26` merkt sich den Ort, für den er gilt. Stimmt er nicht zum aktuellen Ort, wird bis zum neuen Abruf der neutrale Text gezeigt.
- **Verweigert oder nicht möglich:** Der Schalter geht auf „aus“, es gilt wieder Grevenbroich, die Seite zeigt einen kurzen Hinweis. Sie kann den Knopf später erneut tippen (und muss den Standort ggf. in den Browser-Einstellungen für diese Seite wieder erlauben).
- **Hinweis zur Freigabe:** Der Text auf der Startseite empfiehlt „Beim Verwenden der App erlauben“ bzw. „Erlauben“ statt „Einmal erlauben“, damit das Handy nicht bei jedem Start neu fragt. Auf dem iPhone kann die Abfrage bei einer als App gespeicherten Seite trotzdem öfter kommen; das lässt sich von der Seite aus nicht ändern.
- **Festgehaltene Szenen (`p`):** Sie bleiben bei dem Wetter, das beim ersten Lesen am jeweiligen Ort galt.
- **Die „Wolke“** (Wetter-Tarnseite) nutzt denselben freigegebenen Ort und nennt ihn dann „Dein Standort“; ohne Freigabe zeigt sie Grevenbroich.
- **Ort-Zeile:** Auf der Türchen-Übersicht steht unter der Begrüßung klein „Wetter in den Geschichten: dein aktueller Ort“ bzw. „… Grevenbroich“, damit klar ist, wonach sich die Geschichten richten.
- **Vorschau (`?wetter=…`)** ignoriert den Standort.

#### Vorschau (nur zum Prüfen)
Adresse mit Zusatz öffnen, z. B. `…/index.html?wetter=regen`. Möglich sind `regen`, `schnee`, `nebel`, `klar`, `frost`, `bewoelkt`, `neutral`; dazu optional `&temp=-3`. Dann zeigen alle Geschichten dieses Wetter. Die Vorschau schreibt nichts in `adventWetterTag26`. Sie sieht davon nichts, solange sie die Adresse nicht mit dem Zusatz öffnet.

#### Neue Bausteine anlegen oder ändern
Satz in `story-dayN.js` durch `{{w:dN_name}}` ersetzen und in `wetter-texte.js` einen Eintrag `dN_name` mit `x`, `r`, `k`, `b` (optional `n`, `s`, `kf`) anlegen. Bei Änderungen an Texten danach `VERSION` in `sw.js` erhöhen. Die Skripte `apply.py` und `tok/` im Archiv `tools_TEST.zip` erzeugen Geschichten und Texte aus den Originalen und prüfen sie.

#### Wenn etwas nicht stimmt
- Die Geschichte zeigt das falsche Wetter: Wetter prüfen (Vorschau-Adresse mit `?wetter=…`) und `wetter-texte.js` ansehen. Nach einem Wechsel des Wetters im selben Türchen bleiben nur `p`-Stellen stehen, das ist gewollt.
- Es erscheint ein Text wie `{{p:…}}`: `wetter.js` konnte nicht geladen werden oder ist nicht aktuell. Die Dateien `wetter.js`, `wetter-texte.js` und `sw.js` gemeinsam hochladen.
- Das festgehaltene Wetter eines Tages soll neu gelesen werden: Im Browser den Speichereintrag `adventWetterTag26` löschen (Entwicklerwerkzeuge, Anwendung/Speicher). `?reset=1` löscht dagegen den **gesamten** Fortschritt und ist hier nicht gemeint.

---

## 8. Animationen

Alle lassen sich durch Antippen überspringen. Bei „Bewegung reduzieren“ am Gerät entfallen sie (`prefers-reduced-motion`).

### 8.1 Portal: das Türchen geht auf (`portalDurch`)
- Beim Antippen eines freien Türchens und beim Weiter-Knopf.
- **Erstes Öffnen:** Die Tür mit dem **leicht verpixelten** Bild klappt auf, das Bild dahinter **entpixelt** sich in mehreren Stufen (Canvas), dann **taucht man per Zoom ins Bild ein**. Danach geht es in die Stimmungsauswahl bzw. in die Geschichte (wenn die Stimmung schon gewählt ist).
- **Schon geöffnetes Türchen:** kürzere Variante ohne Entpixeln.
- Mit `window.PORTAL_AUS = true` (Konsole) lässt sich das Portal abschalten (siehe Abschnitt 24).
- **Rückwärts (`portalZurueck`):** „Zurück zur Türchen-Auswahl“ auf der Geschichte und auf der Stimmungsauswahl (auch per Zurück-Wischgeste) spielt die Tür rückwärts: Bild zoomt heraus, die Flügel schließen sich, die Tür landet an ihrem Platz in der Übersicht (ca. 2 s, Tippen überspringt, `ton/zuklappen.mp3`). Bei „Bewegung reduzieren“ und mit `PORTAL_AUS` wechselt die Seite ohne Animation. Von Auswertung und Finale aus bleibt der normale Wechsel.

### 8.2 Buchstaben-Wirbel (`wirbelUebergang`)
Nach „Tauche ein in die heutige Geschichte!“ lösen sich die Buchstaben der Seite, kreisen um die Mitte und setzen sich zur Geschichte zusammen. Antippen überspringt.

### 8.3 Finale-Animation
Variante B „Die 24 Lichter“ (ca. 22,8 Sekunden, auf die Melodie `ton/finale.mp3` abgestimmt): 24 Lichter erscheinen einzeln (ruhiger Teil der Melodie), formen ab ca. 8 s einen Tannenbaum, der mit dem Einsatz der Musik bei 11 s einen goldenen Stern bekommt, wandeln sich ab ca. 14 s zum Herz, das ab ca. 16,85 s im Takt des eingemischten Herzschlags schlägt (sechs Schläge im Abstand von 1,1 s, der letzte fällt auf den Höhepunkt; jeder Schlag lässt das Herz zweimal pulsieren: Lub, Dub), zoomen ab ca. 18,4 s hinein und enden mit dem Lichtblitz beim Höhepunkt der Melodie (ca. 22,3 s). Dann erscheint die Finale-Seite, während die Melodie ausklingt. Ein Tipp überspringt die Animation und blendet den Ton aus. Die Zeiten stehen in `bildB`; wird die Melodie getauscht, müssen sie angepasst werden. Variante A „Vier Kerzen“ ist noch im Code (`FINALE_VAR`).

### 8.4 Kleinere Effekte
- Wasserzeichen-Bild im Hintergrund (`wm-anker`, `wm-img`).
- Kachel wackelt, wenn sie noch gesperrt ist.
- Heutige und ungeöffnete Kacheln leuchten.
- Bewertungskasten blendet sanft ein, wenn man ihn erreicht.
- Sperre: Punkte wackeln bei falschem Code; beim richtigen Code **entpixelt sich das Hintergrundbild** (vier Stufen) und die Maske blendet aus.

### 8.5 Haptik, Startbild, Tippflächen
- **Haptik:** Auf dem **iPhone** löst nur eine **echte Berührung eines Schalters** (`<input type="checkbox" switch>`) Haptik aus. Per Skript ausgelöste Klicks bleiben stumm (auf einem iPhone mit Systemhaptik an in zehn Varianten geprüft: versteckt, mit/ohne Timeout, `dispatchEvent`, `pointerdown`, `touchend`, mehrere Klicks hintereinander). Deshalb legt ein kleines Skript (Block „Haptik“ im frühen Skript) über die Tippflächen einen fast durchsichtigen Schalter (`.hz-sw`, Deckkraft 0,02, `aria-hidden`): Sperr-Tasten, Türchen-Kacheln, Bewertungs-Knöpfe, Herz und große Knöpfe (`.btn-primary`). Eine Berührung trifft den Schalter, der gibt einen kurzen Impuls und reicht den Klick an den Knopf weiter (`host.click()`). Neu erzeugte Elemente werden per `MutationObserver` ergänzt. Aktiv nur auf Touch-Geräten ohne `navigator.vibrate` und nicht bei „Bewegung reduzieren“. **Grenzen:** je Berührung **ein** Impuls (mehrere hintereinander, etwa dreimal bei falschem Code, gehen auf dem iPhone nicht); Haptik ohne Berührung (z. B. nach einer Animation) geht nicht. Auf Android bleibt `window.haptik(art)` mit `navigator.vibrate` (falscher Code dreifach, richtiger zweifach). Fehlersignal beim falschen Code auf dem iPhone: Impuls der vierten Ziffer, Wackeln der Punkte und Hinweistext. Test: Diagnoseseite `haptik-test.html` (nur zum Probieren, nicht ins Repository).
- **Töne und Stumm-Schalter:** Die Töne laufen als normale Audio-Wiedergabe und sind **unabhängig vom Stumm-Schalter** des iPhones (bewusste Entscheidung). Eine Mischung mit laufender Musik ist deshalb nicht eingestellt; ein Ton kann Musik oder Video kurz anhalten.
- **Startbild:** Ordner `startup/` mit dunklen Startbildern (Symbol auf #060608) für gängige iPhone-Größen, eingebunden mit `apple-touch-startup-image`. iOS liest sie beim Hinzufügen zum Home-Bildschirm; bei einer schon installierten App greifen sie erst nach erneutem Hinzufügen.
- **Tippflächen:** Schaltflächen sind mindestens 44 px hoch (`.btn-option`, `.herz-btn`, aufklappbare Titel).

---

## 9. Farbwelten und Kategorien

Die 24 Türchen sind in **vier Blöcke zu je sechs Türchen** gegliedert, jeder Block hat eine Farbwelt. Innerhalb eines Blocks wird der Hintergrund von Tag zu Tag etwas dunkler.

| Kategorie | Türchen | Titel | Akzentfarbe |
|---|---|---|---|
| 1 | 1–6 | Vorfreude & Verführung | Violett `#8b78e6` |
| 2 | 7–12 | Spiel & Abenteuer | Grün `#4fa874` |
| 3 | 13–18 | Hingabe & Intensität | Orange `#d99b41` |
| 4 | 19–24 | Wild & Leidenschaftlich | Rot `#c23b4c` |

Die Landing- und Übersichtsseite sind schwarz-rot gehalten (`applyLandingTheme`).

---

## 10. Bilder

| Datei | Verwendung |
|---|---|
| `karte-NN.jpg` | Tagesbild (geöffnete Kachel, Portal, unter der Geschichte, Wasserzeichen), **NN = Kartennummer** |
| `pix-mid-NN.png` | leicht verpixelte Kachel und Türflügel im Portal |
| `pix-lock-NN.png` | stark verpixelte, gesperrte Kachel |
| `landing.jpg` | Startseite, Hintergrund der Sperre (leicht verpixelt, entpixelt sich beim Entsperren) |
| `finale.jpg` | Finale-Seite |

- Die Bilder sind Illustrationen im Zeichnungsstil, überwiegend in Schwarz-Weiß.
- Neue Bilder einbauen: `karte-NN.jpg`, `pix-mid-NN.png`, `pix-lock-NN.png` ersetzen und **die Version in `sw.js` erhöhen**, denn Bilder kommen zuerst aus dem Speicher (Abschnitt 19). Die Pixelbilder entstehen, indem das Tagesbild auf sehr wenige Pixel verkleinert und vom Browser hochskaliert wird.
- Wichtige Bildinhalte gehören in die Mitte, da die Kacheln das Bild beschneiden.

---

## 11. Geschichten und Karten

### 11.1 Geschichten (`story-dayN.js`)
Jede Datei enthält eine Funktion, die je nach Stimmung den Text liefert:

```js
window.getStoryText = function(vibe) {
    if (vibe === 'hingabe') { return `Text …`; }   // Geborgen
    if (vibe === 'naehe')   { return `Text …`; }   // Verspielt
    if (vibe === 'feuer')   { return `Text …`; }   // Intensiv
};
```

- Leerzeile = neuer Absatz. Texte stehen in Backticks; Backticks und `${` dürfen im Text nicht vorkommen.
- Die Geschichten werden erst beim Öffnen des Tages nachgeladen. Fehler führen zu einer Meldung mit „Nochmal versuchen“.
- Die Geschichten nennen am Ende die Umschlagnummer; die Nummer selbst blendet die App ein (`karteninfoSetzen`).

### 11.2 Karten (`data.js`)
`window.KARTEN_B64` enthält Base64-kodiertes JSON: je Kartennummer `a` (Aufgabe), `b` (Alternative, kann fehlen) und `w` (Kennzeichnung, für wen die Aufgabe gedacht ist, z. B. „Sie“ für Her Pleasure). Geladen wird die Datei erst, wenn Texte gebraucht werden (Rückblick, Auswertung, Erinnerung speichern). Neue Texte ändern: JSON → Base64 → `data.js`.

### 11.3 Zuordnung Türchen → Karte
`calendarData` ordnet jedem Türchen Kategorie und **Kartennummer** zu. Die Kartennummer steht in der Geschichte, im Bildnamen und in den gedruckten Karten.

| Türchen | Umschlag (Karte) | Kategorie |
|---|---|---|
| 1 | 8 | 1 |
| 2 | 23 | 1 |
| 3 | 10 | 1 |
| 4 | 24 | 1 |
| 5 | 7 | 1 |
| 6 | 20 | 1 |
| 7 | 3 | 2 |
| 8 | 17 | 2 |
| 9 | 9 | 2 |
| 10 | 18 | 2 |
| 11 | 12 | 2 |
| 12 | 21 | 2 |
| 13 | 6 | 3 |
| 14 | 14 | 3 |
| 15 | 4 | 3 |
| 16 | 19 | 3 |
| 17 | 11 | 3 |
| 18 | 22 | 3 |
| 19 | 1 | 4 |
| 20 | 13 | 4 |
| 21 | 2 | 4 |
| 22 | 16 | 4 |
| 23 | 5 | 4 |
| 24 | 15 | 4 |

Die Kurzbeschreibungen selbst stehen bewusst nicht in dieser Beschreibung (siehe `KURZ` im Quelltext und die Excel-Tabelle).

---

## 12. Kurzbeschreibungen unter den Türchen

- Unter geöffneten Kacheln (und nach dem 25.12.) steht in kleiner Schrift ein bis drei Wörter zur Aufgabe, (Aufgabe / Alternative). Sie helfen, ein Türchen wiederzufinden, das noch bewertet werden soll.
- Gleicht die Alternative der Aufgabe, steht nur **eine** Beschreibung.
- Die Texte stehen im Objekt `const KURZ = {"1": "...", …}` direkt vor `function tuerStilAktualisieren()`. Zeigen sie sich nicht, fehlt die Klasse `geoeffnet` oder `frei` an der Kachel.
- Die Texte lassen sich in `Kurzbeschreibungen_Tuerchen.xlsx` (mit den Kartentexten) bearbeiten und dann ins Objekt übertragen.
- Stil: `.tuer-card .tag-kurz` (Schriftgröße 0,6 rem, unten zentriert).

---

## 13. Bewertung, Notizen und Auswertung

### 13.1 Bewertung
- Pro Türchen zwei Zeilen: **Die Aufgabe** und **Die Alternative**. Je Zeile 👍 Gefiel mir, 😐 War OK, 👎 Nicht nochmal.
- Möglich: nur Aufgabe, nur Alternative oder beides.
- **Am Folgetag** erscheint oben die Abfrage zum Vortag (Banner) mit dem **Originaltext** der Aufgabe und Alternative.
- Eine abgegebene Bewertung lässt sich **noch bis zum Tag danach ändern**, danach ist sie festgeschrieben (außer ab 25.12.).
- **Nachholen:** Türchen noch einmal öffnen; der Bewertungskasten steht unten. Der Aufgabentext erscheint nur, wenn das Türchen schon an einem früheren Tag offen war.
- Speicherung: `adventBewertung26` (Werte 1, 0, -1) und `adventBewDatum26` (wann bewertet).

### 13.2 Notizen
- Pro Türchen **zwei getrennte Textfelder** (je max. 600 Zeichen): „Meine Notiz zur Aufgabe“ und „Meine Notiz zur Alternative“, jeweils direkt unter der Bewertung der Version. Sie liegen im Browser und werden mit der Sicherung (Abschnitt 14) verschlüsselt mitgesichert; er sieht sie im Editor unter „Ihre Antworten“ (bekannt und gewollt).
- Die Notizen erscheinen in der Auswertung („Alle meine Notizen kopieren“) und in der Textdatei von „Erinnerung speichern“.
- Speicherung: `adventNotiz26`, Schlüssel `"5"` = Aufgabe, `"5b"` = Alternative (`notizKey`). Frühere gemeinsame Notizen gelten als Notiz zur Aufgabe. In der Auswertung zeigt jede Karte die Notiz ihrer Version; Kopieren und die Textdatei führen beide getrennt auf.

### 13.3 Auswertung (ab 25.12.)
- Nur wenn **er ebenfalls bewertet hat** (`er.js`), gibt es einen **Abgleich**. Er bewertet auf einer eigenen Oberfläche und sieht dort **keine** ihrer Daten.
- Gruppen (`AW_GRUPPEN`):
  - 🌟 **Top-Favoriten:** beide 👍
  - 💛 **Favoriten:** einer 👍, der andere 😐
  - 🎭 **Geschmackssache:** einer 👍, der andere 👎
  - 🙂 **Solide:** beide 😐
  - ⚠️ **Flops:** einer 😐, der andere 👎
  - 🚫 **No-Gos:** beide 👎
- Zusätzlich: „Bisher nur von dir bewertet“ und „Noch nicht von dir bewertet“. Seine Bewertungen erscheinen nur bei Aufgaben oder Alternativen, die sie selbst bewertet hat. Ob er etwas bewertet hat, das sie noch nicht bewertet hat, erfährt sie nicht.
- Ohne `er.js` zeigt die Auswertung nur ihre eigenen Bewertungen.
- Die Auswertung blättert gruppenweise („Weiter: …“). Man kann auch **links/rechts wischen**; die Punkte oben (je Gruppe einer, am Ende die Übersicht) sind antippbar (`awGehe`, `awSwipeInit`).
- **Enthüllung (`awEnthuellen`):** Der Knopf „Enthüllen“ startet eine Animation von ca. 4,7 Sekunden: Das Päckchen der Einleitung (ein gezeichnetes Element, das leicht wippt) wandert von seinem Platz in die Bildmitte und wird größer, die Schleife lockert sich, hebt sich ab und fällt zur Seite, der Deckel hebt ab, goldenes Licht und Funken steigen auf, das Licht füllt den Bildschirm und blendet in die erste Gruppe über. Ein Tipp auf den Bildschirm (nach einer halben Sekunde) überspringt sie. Sie läuft auch bei „Enthüllung noch einmal ansehen“. Bei eingeschalteter Systemeinstellung „Bewegung reduzieren“ entfällt sie. Dazu spielt `ton/auspacken.mp3` (siehe Abschnitt 8) und wird am Ende ausgeblendet (`tonAuspacken`, `tonAusblenden("auspacken")`).
- **Zuordnung:** Bewertungen gehören immer zur Aufgabe oder Alternative **einer Karte**. Die Türchenzahl dient nur als Schlüssel und steht als Information in der kleinen Zeile der Kachel („Aufgabe · Karte 20 · Türchen 6“).
- **Kachel (`auswKarte`):** kleine graue Zeile (Her/His, Aufgabe/Alternative, Karte, Türchen), farbiger Streifen links (Her beerig, His blau, keine Kategorie-Farben), Text auf drei Zeilen gekürzt, Tipp auf die Kachel klappt ihn auf. In gemischten Gruppen (Favoriten, Geschmackssache, Flops) steht unter dem Text „Meine 👍 · Seine 😐“; in Gruppen mit gleicher Bewertung steht das einmal in der Überschrift („Beide 👍“, `AW_GRUPPEN[].wer`).
- **Beschriftung:** „Meine“ steht für ihre Bewertung, „Seine“ für seine (Kacheln, Tabelle „Meine und seine Bewertung“, Filter, Textdatei der Erinnerung). In der Karte „Für ein nächstes Mal“ spricht die App über ihn in der dritten Person („Was soll er sich merken?“).

### 13.4 Rückblick und „Erinnerung speichern“
- **Rückblick** (Finale-Seite): Zähler für geöffnete Türchen, gewählte Stimmungen, Bewertungen und Notizen.
- **„Meine Erinnerung speichern (Bilder + Text)“** erzeugt Bilder (Rückblick und Favoriten) und eine Textdatei mit Bewertungen und Notizen als Download (Dateinamen `Advent2026_…`). Die Dateien entstehen auf dem Gerät und gehen nicht an den Worker.

---

## 14. Seine Bewertung: er.js und er-editor.html

- `er.js` enthält seine Bewertung je Türchen als zwei Buchstaben (Aufgabe, Alternative): `"A"` = 👍, `"B"` = 😐, `"C"` = 👎, `""` = nicht gemacht.

```js
window.ER_BEWERTUNG = {
    1:  ["B", ""],   // T1 · Karte 8
    …
};
```

- Die Datei wird **erst ab dem 25.12.** geladen (`erLaden`). Fehler (fehlendes Komma, falsche Anführungszeichen) führen dazu, dass der Abgleich fehlt; die Seite stürzt nicht ab.
- **`er-editor.html`** (nur TEST) ist ein Werkzeug, in dem er seine Bewertung anklickt. Es liest `data.js` (muss im selben Ordner liegen), speichert den Zwischenstand im Browser (`adventErEditor26`), erzeugt den Text für `er.js` (Kopieren oder Herunterladen) und kann `er.js` als Vergleichsstand laden.
- **Aufbau (Auswahl und Einzelansicht):** Beim Öffnen zeigt der Editor alle 24 Türchen als Raster mit Vorschaubild, Nummer, Kurzbeschreibung (erster Satz der Aufgabe) und den bisherigen Bewertungen von A und B. Die Farbe zeigt, für wen das Türchen ist: beerenfarben für „For Her“, blau für „For Him“. Das Türchen von **gestern** ist golden hervorgehoben (leichtes Pulsieren, Band „Gestern“), die Seite springt beim Öffnen dorthin, und oben steht ein Knopf direkt zu diesem Türchen. „Gestern“ bezieht sich auf den echten Dezember (am 12.12. also Türchen 11); im November gibt es keine Hervorhebung. Zum Ausprobieren: `er-editor.html?heute=12`. Ein Schalter „Nur offene anzeigen“ blendet bereits bewertete Türchen aus. Ein Tipp auf ein Türchen öffnet die Bewertung ohne Bild, mit einem schmalen Randbanner „For Her“ oder „For Him“ und den Knöpfen „Tag zurück“, „Übersicht“, „Tag weiter“ darunter. Nichts ist gesperrt. Das Erzeugen der `er.js` liegt unter dem Raster. Der Editor liegt im Offline-Speicher (`sw.js`).
- **Detailansicht:** Ohne Titel und ohne Fortschrittsleiste, damit auch lange Aufgabentexte samt Knöpfen auf einen Bildschirm passen.
- **An GitHub senden:** Unter dem Raster schreibt der Editor die `er.js` direkt in die Repositories (Auswahl TEST und/oder LIVE; Voreinstellung nur TEST). Das geht über die GitHub-Schnittstelle (Commit auf den Standardzweig, Commit-Text „er.js aktualisiert (His Rating, N Bewertungen)“). Dafür braucht der Editor einmalig ein **fein abgestuftes Zugriffstoken** (GitHub, Settings, Developer settings, Personal access tokens, Fine-grained tokens): nur die beiden Repositories, Berechtigung „Contents: Read and write“, Ablaufdatum kurz nach dem 25.12. Das Token wird nur im Browser des Geräts gespeichert (`adventErGhToken26`), steht in keiner Datei und lässt sich im Editor entfernen. Vor dem Senden fragt der Editor nach. Nach dem Senden braucht GitHub Pages etwa eine Minute. Als Ersatz gibt es weiterhin Kopieren, Herunterladen und (wo das Gerät es kann) „er.js teilen“.
- **Ihre Antworten (Sicherung und Ansicht):** Ihre App sichert ihre Angaben still im Hintergrund (Stimmungswahl, Bewertungen, Notizen, Lesestand, geöffnete Türchen, Herzen, Erledigt-Markierungen, festgehaltenes Wetter; nicht der Standort). Gesendet wird erst, wenn das erste Türchen geöffnet wurde, und nur bei Änderungen. Die Daten werden schon im Browser mit einem öffentlichen Schlüssel verschlüsselt (`sicherung.js`, Konfiguration in `sicherung-config.js`) und an einen Cloudflare-Worker geschickt, der sie in einem KV-Speicher ablegt (die letzten 20 Versionen). Lesen kann sie nur der Editor: mit dem Passwort wird der geheime Schlüssel geöffnet, der Zugangscode dazu wird aus demselben Passwort abgeleitet. Im Editor gibt es unter „Ihre Antworten“ eine Ansicht mit ihren Bewertungen neben deinen, optional ihren Notizen (Schalter, standardmäßig aus), eigenen Notizen „Für nächstes Mal“ und einem Text für den Rückblick. Die Einrichtung (Passwort, Schlüssel, Worker-Adresse, Konfiguration an GitHub senden) steht unter „Sicherung einrichten“. Worker-Code und Anleitung liegen separat vor und gehören nicht ins Repository.
- **Wünsche für ein nächstes Mal:** Im Finale (nach Türchen 24) und in der Auswertung gibt es die Karte „Für ein nächstes Mal“ mit vier Feldern (mehr davon, lieber nicht mehr, neu ausprobieren, Änderungen an der App). Sie speichert automatisch (`adventWunsch26`), geht mit der Sicherung an den Editor und bleibt auch nach dem 25.12. bearbeitbar. Im Editor erscheint sie unter „Ihre Antworten“.
- **Ansicht „Ihre Antworten“ (Sicherheit):** Die Ansicht startet leer und zeigt erst nach einem Abruf mit Passwort etwas. Entschlüsselte Daten, Schlüssel und Zugangscode liegen nur im Arbeitsspeicher und werden gelöscht, wenn die Ansicht verlassen wird, die Seite schließt oder die App länger als 5 Minuten im Hintergrund war. Für „Neu seit dem letzten Abruf“ merkt sich der Editor nur Prüfsummen (`adventErGesehen26`), keine lesbaren Inhalte. Oben steht, wann die letzte Sicherung ankam, mit einer Warnung, wenn sie im Dezember älter als zwei Tage ist.
- **Handywechsel:** Im Editor erzeugst du aus der letzten Sicherung einen Wiederherstellungs-Link (oder eine Datei). Er führt auf `wiederherstellung.html`, eine nicht verlinkte Seite, die die Angaben auf dem neuen Gerät einspielt (mit Rückfrage, falls dort schon Daten liegen) und zur App weiterleitet. In der App selbst gibt es keine Oberfläche dafür. Der Link enthält die Angaben im Klartext und gehört nur direkt an sie.
- **App-Icon:** Der Editor hat ein eigenes Manifest (`manifest-er.json`, Name „His Rating“) und eigene Icons (`icon-er-180.png`, `icon-er-192.png`, `icon-er-512.png`), damit er als eigene App auf den Homescreen gelegt werden kann (iPhone: Teilen, Zum Home-Bildschirm). Das Motiv ist ein Ring aus 24 Punkten mit einem goldenen Punkt und einem kleinen Herz in der Mitte, bewusst nicht als Kalender erkennbar.
- **Ablauf:** In TEST `er-editor.html` öffnen → bewerten → **An GitHub senden** (schreibt `er.js` direkt in beide Repositories; dafür einmalig das GitHub-Token unter „An GitHub senden“ speichern) oder alternativ Text erzeugen bzw. über den Teilen-Knopf weitergeben → als `er.js` speichern → in **beiden** Repositories hochladen.
- In TEST (mit `testModus = true`) zeigt die Auswertung eine Diagnose („er.js gelesen: N gültige Bewertung(en)“).
- **Vor dem Dezember prüfen**, dass die `er.js` in LIVE die echten Bewertungen enthält.

---

## 15. Kalender-Erinnerungen (.ics)

- Im Ordner `erinnerung/` liegen 11 Dateien: `1700.ics`, `1730.ics`, … `2200.ics` (17:00 bis 22:00 im Halbstundentakt).
- Jede enthält **24 Termine** „Türchen 1“ bis „Türchen 24“ am 1. bis 24. Dezember 2026, je 15 Minuten, Erinnerung zum Beginn, mit Link zu `https://kalender2026.tkagel.de`.
- Auf der Startseite lädt „Termine hinzufügen“ die gewählte Datei (`ladeErinnerung`). Das Handy fragt dann, ob die Termine übernommen werden sollen.
- Die Termine enthalten die LIVE-Adresse. Die Dateien in TEST und LIVE sind gleich.
- Die Dateien wurden mit einem Skript erzeugt, das nicht im Repository liegt. Bei einer Änderung der Adresse müssen sie neu erzeugt werden.
- Der Service Worker speichert `.ics`-Dateien nicht zwischen.

**Push-Erinnerung (nur in der installierten App)**

- **Wer sieht was:** Im normalen Browser (nicht auf dem Home-Bildschirm installiert) bleibt der Kasten „Erinnerung“ mit den Kalender-Terminen. In der installierten App ersetzt ihn ein Kasten mit Schalter „Erinnerung einschalten“, Uhrzeit (15-Minuten-Schritte, 06:00 bis 23:45, Voreinstellung 20:00) und „Testnachricht senden“. Er erscheint nur, wenn zusätzlich die Sicherung konfiguriert ist (`sicherung-config.js`, dieselbe Worker-Adresse und Kennung) und der Browser Push kann (`pushStart`).
- **Bewusste Zustimmung:** Der Schalter steht auf Aus. Die Systemfrage „Mitteilungen erlauben?“ kommt erst, wenn sie ihn selbst einschaltet. Lehnt sie ab, springt er zurück, ein Hinweis nennt die Handy-Einstellungen, und der Kalender-Kasten erscheint wieder.
- **Bedingung:** Gesendet wird täglich vom 1. bis 24. Dezember (Berliner Zeit) zu ihrer Uhrzeit, aber nur, wenn das heutige Türchen noch nicht geöffnet ist. Öffnet sie es, meldet die App das still an den Worker (`popen`, ausgelöst in `merkeGeoeffnet`, beim Start und beim Zurückkehren in die App). Pro Tag höchstens eine Nachricht.
- **Worker:** `worker.js` hat für Push diese Aktionen (POST): `psub` anmelden oder Uhrzeit ändern, `poff` abmelden, `popen` heute geöffnet, `ptest` Testnachricht, `pstate` eigenen Stand abfragen; dazu `GET /pstatus/<Kennung>` (nur mit Passwort-Zugang, für den Health-Check). Für die Sicherung: `put`, `list`, `get` (Kopfzeile `X-Admin`) und einen Cron-Lauf (`laufePush`, jede Minute; liest dafür nur einen kleinen Index `pushidx`, der bei An- und Abmeldung gepflegt und nachts neu aufgebaut wird). Je Kennung liegt ein Eintrag `push:<Kennung>` im KV (Anmeldung, Uhrzeit, Modus, zuletzt geöffnet, zuletzt gesendet). Der Lauf sendet zur Minute ihrer Uhrzeit, ein verpasster Lauf wird innerhalb von 30 Minuten nachgeholt; ungültige Anmeldungen (404, 410) werden gelöscht.
- **Nachricht:** Der Worker sendet den Text verschlüsselt mit (Web Push, RFC 8291), signiert mit VAPID (ES256): Titel „Adventskalender“, Text **„Türchen N wartet ✨“** (N = heutiger Tag). Fehlt die Verschlüsselung (ungültige Schlüssel), sendet er einen leeren Push, und der Service Worker zeigt den festen Text „Dein Türchen für heute wartet ✨“. Ein Tipp öffnet die App.
- **Schlüssel:** Der öffentliche VAPID-Schlüssel steht in `index.html` (`PUSH_PUB`) und im Worker (Variable `VAPID_PUBLIC`). Der private Schlüssel ist ein Secret im Worker (`VAPID_PRIVATE`) und steht nirgends im Repository.
- **TEST:** Die TEST-App meldet sich im Modus „test“ an; der Worker sendet dann auch außerhalb des Dezembers (zum Ausprobieren).
- **Nicht geprüft:** Die tatsächliche Zustellung auf einem echten iPhone konnte nicht getestet werden (Worker, Signatur und App-Ablauf sind mit simulierten Gegenstellen geprüft). Voraussetzung auf dem iPhone: iOS 16.4 oder neuer, App auf dem Home-Bildschirm.
- **Hinweis:** Hat sie zusätzlich die Kalender-Termine importiert, bekommt sie beides; die Termine kann sie im Kalender löschen.

**Erinnerung für ihn (Editor „His Rating“, nur TEST)**

- Im Editor gibt es unten den Kasten **„Erinnerung zum Bewerten“** (nur sichtbar in der installierten Editor-App und mit eingetragener Worker-Adresse; sonst steht dort ein Hinweis). Schalter „Erinnerung einschalten“ und „Testnachricht senden“. Die Uhrzeit ist fest 20:00 Uhr.
- **Bedingung:** Vom 2. bis 25. Dezember schickt der Worker um 20:00 Uhr eine Nachricht, aber nur, wenn das **Türchen von gestern** noch nicht von ihm bewertet ist (Aufgabe oder Alternative genügt, wie in der Kachel „Gestern war Türchen N – hier bewerten“). Bewertet er, meldet der Editor die Liste seiner bewerteten Türchen still an den Worker (`pstate`, nach jeder Änderung mit kurzer Verzögerung).
- **Text:** „Bewertung – Vergiss nicht zu bewerten.“ Weil Kalender und Editor dieselbe Adresse und denselben Service Worker nutzen, schickt der Worker diesen Text **verschlüsselt** mit (Web Push, RFC 8291, aes128gcm). Der Service Worker zeigt ihn an; ohne Text zeigt er den festen Kalender-Text.
- **Kennung:** Der Editor nutzt die Kennung seines TEST-Speicherplatzes plus `-er` (`psub` mit `art: "er"`). Die Einträge von App und Editor sind getrennt (`push:<Kennung>`).
- **Prüfung:** Die Verschlüsselung stimmt mit dem Testvektor aus RFC 8291 überein und lässt sich mit einer unabhängigen Entschlüsselung lesen. Die Zustellung auf einem echten iPhone ist nicht getestet.
- **Hinweis:** Auf einem Gerät teilen Kalender-App und Editor dieselbe Push-Anmeldung. Schaltet man dort in der Kalender-App die Erinnerung aus, wird die Anmeldung beendet; der Editor erneuert sie beim nächsten Start still.



**Klick auf die Erinnerung führt direkt zum Türchen**

- Tippt sie auf die Push-Nachricht, öffnet sich die App mit der Adresse `./?tuerchen=heute` (oder `?tuerchen=N`, wenn der Worker die Nummer mitschickt). Es erscheint zuerst die Code-Abfrage; nach dem richtigen Code läuft sofort die Tür-Animation des heutigen Türchens, danach geht es wie gewohnt weiter (Stimmungsauswahl oder Geschichte).
- Ist die App schon geöffnet, wird dieses Fenster genutzt und auf die neue Adresse gesetzt. Läuft der Code-Schutz noch nicht (z. B. innerhalb der 3 Minuten Pause), geht es ohne Code-Abfrage direkt weiter.
- Nur in der TEST-Fassung während des Vortests (November als Dezember): Ist „heute“ kein Türchen (25.–30. November), öffnet der Direktsprung das erste noch nicht geöffnete Türchen (sind alle geöffnet, ein zufälliges), damit sich die Funktion jederzeit ausprobieren lässt.
- **Aufräumen:** Sobald das heutige Türchen geöffnet ist, entfernt die App die Erinnerung aus dem Sperrbildschirm. Nur das Öffnen des Türchens zählt; ein bloßes Starten der App lässt die Mitteilung stehen.
- Es passiert nichts Besonderes, wenn das Türchen noch nicht erreicht ist, wenn sie gerade in einer Geschichte ist oder wenn „Bewegung reduzieren“ aktiv ist (dann ohne Animation, aber ebenfalls direkt zum Türchen). Die Adresse wird nach dem Auslesen aus der Browserzeile entfernt, ein Neuladen wiederholt das nicht.
- Für dich im Editor: Die Bewertungs-Erinnerung öffnet `er-editor.html#t=N` mit der Nummer des gestrigen Türchens.
- Sicherheit: Der Service Worker akzeptiert als Ziel nur diese festen Adressformen, nie fremde Adressen.

**Health-Check (Editor, nur TEST)**

- Im Editor gibt es unten den Kasten **„Health-Check“** (Adresse `er-editor.html#status`). Nach Eingabe des Passworts zeigt er je eine Karte für „Ihre App · LIVE“, „Ihre App · TEST“ und „Dein Gerät · Editor“: Push-Anmeldung (eingerichtet ja/nein, Uhrzeit, seit wann), **letzter Kontakt** der App mit dem Worker, **zuletzt geöffnetes Türchen** (nur die Nummer), **letzte gesendete Erinnerung** und eine Zeile **„Heute“** (z. B. „Heute schon geöffnet – keine Erinnerung nötig“, „Wird heute um 20:00 Uhr gesendet“, „Heute nicht gesendet“). Oben steht eine **Gesamtampel** (grün „Alles in Ordnung“, gelb „Bitte kurz ansehen“, rot „Hier ist Handeln nötig“, mit Begründung), und jede Karte hat zusätzlich ihre eigene Ampel mit Wort. Gelb bedeutet z. B. Erinnerung nicht eingeschaltet, Erinnerung überfällig, seit mehr als 3 Tagen kein Kontakt oder letzte Sicherung älter als 3 Tage; rot bedeutet „heute nicht gesendet“ oder fehlende Push-Schlüssel im Worker. Die TEST-App hat eine eigene Ampel, zählt aber nicht zur Gesamtampel. Dazu eine Karte zur Sicherung (letzter Stand, Anzahl) und der Hinweis, ob die Push-Schlüssel im Worker vorhanden sind. „Aktualisieren“ lädt neu.
- **Technik:** Der Worker speichert pro Anmeldung `kontakt`, `offenTs`, `tag` (1–24) und `gesendetTs`. Die Seite fragt den nur mit Passwort-Zugang (Kopfzeile `X-Admin`) erreichbaren Aufruf `GET /pstatus/<Kennung>` ab. Er liefert nur Status, **keine** Adressen, Schlüssel, Notizen oder Bewertungsinhalte. Die App meldet beim Öffnen eines Türchens `popen` mit der Nummer des Türchens.
- Der „letzte Kontakt“ wird nur bei Anmeldung, Öffnen eines Türchens, Bewertungsänderung (Editor) und alle 10 Minuten bei erneuter Meldung aktualisiert; er zeigt also nicht jedes App-Öffnen.

---

## 16. Was im Browser gespeichert wird

Alles liegt im Browser des Geräts. Eine **verschlüsselte Sicherung** (Schlüssel `adventSich26`, Abschnitt 14) und die **Push-Anmeldung** (`adventPush26`) gehen an den Cloudflare-Worker; sonst findet keine Übertragung statt. Jedes Gerät und jeder Browser (auch Safari und installierte App) hat seinen eigenen Stand.

| Schlüssel | Speicher | Inhalt |
|---|---|---|
| `adventGeoeffnet26` | localStorage | geöffnete Türchen, z. B. `[1,2,3]` |
| `adventOrtAn26` | localStorage | Standort für das Wetter: `1` = an, `0` = aus |
| `adventOrt26` | localStorage | zuletzt genutzter Ort, auf 0,1° gerundet, z. B. `{"lat":48.1,"lon":11.6}` (nur wenn freigegeben) |
| `adventOeffnetAm26` | localStorage | Tag der ersten Öffnung je Türchen als Zahl `JJJJMMTT`, z. B. `{"18":20261218}` (bestimmt, wann der Aufgabentext erscheint) |
| `adventWahl26` | localStorage | gewählte Stimmung je Tag (`v`), ursprüngliche Wahl (`o`) |
| `adventBewertung26` | localStorage | Bewertungen `{tag: {a: 1\|0\|-1, b: …}}` |
| `adventBewDatum26` | localStorage | Datum der Bewertung (für die Änderungsfrist) |
| `adventNotiz26` | localStorage | Notizen je Türchen und Version (`5` Aufgabe, `5b` Alternative) |
| `adventLese26` | localStorage | Leseposition je Türchen |
| `adventGruss26` | localStorage | Begrüßungssätze (fester Satz je Tag und Tageszeit) |
| `adventBossHint26` | localStorage | Hinweis zur Wolke bereits gelesen |
| `adventFinaleAn26` | localStorage | Finale-Animation gelaufen |
| `adventSpaeter26` | localStorage | „Später bewerten“ (nur Altlast) |
| `adventSperreTs26` | sessionStorage | Zeitpunkt der letzten Nutzung (für die Sperre) |
| `adventLeseFs26` | localStorage | Schriftgröße (0, 1, 2) |
| `adventLeseWarm26` | localStorage | „Warm & gedimmt“ an/aus |
| `adventHerz26` | localStorage | Lieblingsgeschichten, je Türchen und Stimmung |
| `adventErledigt26` | localStorage | als erledigt markierte verschiebbare Aufgaben |
| `adventWetter26` | localStorage | zuletzt abgerufene Stundenwerte des Wetters (Wettercode, Temperatur) |
| `adventErEditor26` | localStorage | Zwischenstand von `er-editor.html` (nur TEST) |
| `adventErGhToken26`, `adventErGhAuswahl26` | localStorage | GitHub-Token und Auswahl TEST/LIVE für den Upload im Editor (nur TEST) |
| `adventPush26` | localStorage | Zustand der Push-Erinnerung (an/aus, Uhrzeit, Anmeldung) |
| `adventUmschlag26` | localStorage | Türchen, deren Umschlag-Animation schon lief |
| `adventErPush26` | localStorage | Push-Zustand des Editors (nur TEST) |
| `adventSich26` | localStorage | Merker, welcher Stand zuletzt gesichert wurde (App) |
| `adventWunsch26` | localStorage | ihre Wünsche für ein nächstes Mal (App, wird mitgesichert) |
| `adventErKey26`, `adventErSich26`, `adventErVerb26`, `adventErNotizSehen26`, `adventErGesehen26` | localStorage | geschützter Schlüssel, Einstellungen, eigene Notizen, Schalter und Prüfsummen für „Neu“ im Editor (nur TEST) |

- Funktioniert der Speicher nicht (privater Modus), arbeitet die Seite mit einem Ersatz im Arbeitsspeicher. Dann geht der Stand beim Schließen verloren.
- **iPhone:** Die installierte Web-App hat **einen anderen Speicher** als Safari.
- **Zurücksetzen** mit `?reset=1` (Abschnitt 24). Es löscht Geöffnet, Wahl, Bewertungen, Datum, Später, Notizen, Erledigt, Herzen und Gelesen. **Nicht** gelöscht werden Begrüßung, Wolken-Hinweis und Finale-Marker.
- Löscht sie die Browserdaten oder wechselt das Gerät, sind alle ihre Daten weg.

---

## 17. Code-Sperre

Schutz gegen zufälliges Öffnen (z. B. durch die Kinder), kein echter Schutz gegen technisch versierte Angreifer.

- **Code:** vierstellig, fest, ohne Änderungsoption. Er steht **bewusst nicht in dieser Beschreibung**, sondern im Beipackzettel, auf dem Code-Zettel und (als Base64) im Quelltext in der Konstante `CODE`.
- **Optik:** Vollbild mit dem Landing-Bild, leicht verpixelt und abgedunkelt; darüber ein goldener Stern, „Dezember“, „Bitte gib deinen Code ein“, vier Punkte und ein Ziffernblock mit runden Glas-Tasten. Auch Tastatureingabe geht.
- **Falscher Code:** Die Punkte wackeln rot, die Eingabe wird geleert.
- **Richtiger Code:** Das Bild entpixelt sich in vier Stufen, die Maske blendet aus, die Seite erscheint.
- **Wann sie erscheint:**
  - beim **Start** der App (neue Sitzung),
  - nach mehr als **3 Minuten im Hintergrund** (`PAUSE`),
  - beim **Verlassen der Wolke** (sofort).
  - Ein Neuladen innerhalb derselben Sitzung innerhalb der 3 Minuten bleibt entsperrt.
- Solange die Sperre sichtbar ist, ist der Seiteninhalt gesperrt (`inert`).
- Bei `testModus = true` ist die Sperre aus.
- Das Bild `bilder/landing.jpg` muss vorhanden sein; fehlt es, bleibt der Hintergrund dunkel.
- Den Code bekommt sie über den **Beipackzettel** (Zeile „Code Online-Teil“) und den **Code-Zettel** der Gimmick-Vorlagen. Um ihn zu ändern: `CODE` im Quelltext (Base64 des neuen Codes), Beipackzettel und Code-Zettel neu erzeugen.
- Das Verhalten wurde im simulierten Handy-Browser getestet, nicht auf einem echten iPhone.

---

## 18. Wolke: die Chef-Taste

- Der Knopf oben rechts (Wolke) versteckt die Seite sofort hinter einer **Wetteransicht** (Grevenbroich, bei Freigabe des Standorts „Dein Standort“; Daten von `api.open-meteo.com`, siehe Abschnitt 28).
- Beim ersten Mal erscheint ein Hinweis („Kleiner Tipp“); danach öffnet die Wolke direkt.
- **Zurück:** Doppeltipp auf die Temperatur (oder Esc am Rechner).
- Nach dem Schließen erscheint die **Code-Sperre**.
- Der Tab-Titel wechselt zu „Wetter“.

---

## 19. Offline-Fähigkeit und Updates (Service Worker)

`sw.js` wird nur über `https` registriert.

- **Beim ersten Besuch** speichert er `index.html`, Manifest, Symbole, `data.js`, `er.js`, `wetter.js`, `wetter-texte.js`, `sicherung.js`, `sicherung-config.js`, die 24 Geschichten und alle Bilder. In TEST kommen `er-editor.html`, `manifest-er.json` und die Icons `icon-er-*` dazu.
- **Seiten und Geschichten:** zuerst aus dem Netz; ohne Netz aus dem Speicher.
- **Bilder (`/bilder/`):** zuerst aus dem Speicher.
- Nur Anfragen an die eigene Adresse werden bearbeitet (die Wetter-Anfrage nicht).

> **Bei jeder Änderung `VERSION` in `sw.js` erhöhen** (z. B. `const VERSION = "v1795778804";`). Ohne neue Version können Handys alte Bilder oder Seiten behalten.

- Eine neue Version löscht beim Aktivieren den alten Speicher.
- **Jedes Repository hat seine eigene `sw.js`**, in beiden die Version erhöhen.
- GitHub Pages hält Dateien einige Minuten im Zwischenspeicher.
- **Töne im Offline-Speicher:** Die Dateien in `ton/` stehen in der Liste `TON` und werden einzeln mit Fehlertoleranz abgelegt (eine fehlende Datei bricht die Installation nicht ab). Anfragen an `/ton/` beantwortet der Service Worker aus dem Speicher, auch Bereichsanfragen (`Range`, Antwort 206), die iPhones für Audio stellen. Neue Töne: `TON` ergänzen und `VERSION` erhöhen.
- **Push im Service Worker:** Der `push`-Handler zeigt die (verschlüsselt gesendete) Nachricht an; fehlt sie, erscheint ein neutraler Standardtext mit Ziel `./?tuerchen=heute`. Der `notificationclick`-Handler öffnet oder fokussiert die App (bzw. den Editor) und navigiert zum Ziel. Erlaubt sind nur die Adressformen `./?tuerchen=N` und `er-editor.html(#t=N)` (Prüfung per festem regulären Ausdruck).
- **Startbilder** (`startup/`) stehen **nicht** in der Liste; iOS liest sie ohnehin nur beim Anlegen der App.
- **Nicht im Repository:** `worker.js` (Cloudflare-Worker) und `ANLEITUNG_Cloudflare.md` liegen nur bei dir und werden nicht hochgeladen. Der Worker läuft bei Cloudflare, nicht auf GitHub Pages.
- Hängt ein Handy fest: Seite neu laden, App ganz schließen und neu öffnen, im Notfall Website-Daten löschen.

---

## 20. Als App auf dem Startbildschirm

- `manifest.json`: Name „Dezember“ (TEST: „Dezember TEST“, Kurzname „Dez TEST“), Vollbild (`standalone`), Startadresse `./index.html`, dunkler Hintergrund.
- **TEST-Symbole** (`icon-192.png`, `icon-512.png`, `apple-touch-icon.png`) tragen ein rotes **TEST-Band** quer über dem unteren Drittel, damit man die Versionen auf dem Startbildschirm unterscheidet.
- In TEST lautet der iPhone-App-Titel „Dez TEST“.
- **Symbol und Name werden nur beim Anlegen übernommen.** Auf dem iPhone aktualisiert sich ein bestehendes Symbol nie; die App muss entfernt und neu hinzugefügt werden. Bei Android/Chrome ändert sich das Symbol nach einiger Zeit eventuell von selbst.
- iPhone: zusätzlich `apple-touch-icon.png` und die `apple-mobile-web-app-…`-Angaben.
- Die iOS-eigene App-Sperre per Face ID wurde geprüft, wird für diese Web-App aber nicht angeboten. Deshalb gibt es die Code-Sperre (Abschnitt 17).

---

## 21. Hosting: GitHub Pages und Domain

- LIVE und TEST liegen in **zwei getrennten GitHub-Repositories** (Veröffentlichung über GitHub Pages aus dem Hauptzweig).
- **TEST:** Repository `vanallen84/testkalender`, Veröffentlichung über GitHub Pages ohne eigene Domain unter `https://vanallen84.github.io/testkalender/` (Projektseite, deshalb liegt die Seite in einem Unterpfad; alle Dateiverweise sind relativ, das Manifest nutzt `./index.html`).
- **Achtung `.ics`:** Die Kalender-Termine enthalten die **LIVE-Adresse**. Wer sie in TEST in den Kalender übernimmt, landet später auf LIVE.
- LIVE: `https://kalender2026.tkagel.de` (Subdomain von `tkagel.de`). Die Datei `CNAME` im Repository wird von GitHub angelegt und darf **nicht gelöscht** werden.
- „Enforce HTTPS“ ist aktiviert.
- Die Seiten tragen `noindex, nofollow` und sind nicht verlinkt. Geheim ist die Adresse dadurch nicht: wer sie kennt, kann die Sperre sehen.
- **Hochladen:** über die GitHub-Weboberfläche („Add file → Upload files“). Gleichnamige Dateien werden ersetzt. Dateien aus alten ZIPs nicht versehentlich über neuere hochladen.
- Backups: `advent26-LIVE_komplett.zip` (Stand der LIVE-Version), `advent26-live.zip`, `advent26-test.zip`. Die LIVE-ZIP wird auf Wunsch aktualisiert und ist deshalb nicht immer ganz aktuell.

---

## 22. Testen

### 22.1 Im November auf dem Handy (TEST)
1. https://vanallen84.github.io/testkalender/ öffnen. Am 3. November ist dort Türchen 3 frei.
2. Zum Neuanfang `…/index.html?reset=1` aufrufen.
3. **Am 25. November** (= „25. Dezember“) Auswertung, Rückblick, Erinnerung speichern und Finale prüfen.
4. Auf dem Handy als Startbildschirm-App prüfen (Symbol mit TEST-Band, Sperre, Wolke, Animationen).

### 22.2 Im Entwicklermodus
`testModus = true`: alle Türchen offen, Tagesauswahl oben, Sperre aus. Nur lokal benutzen, nie hochladen.

### 22.3 Lokal am Rechner
```bash
cd <ordner mit index.html>
python3 -m http.server 8210
# Browser: http://localhost:8210/index.html
```
Der Service Worker ist lokal nicht aktiv.

### 22.4 Automatische Tests
Entwickelt und geprüft wurde mit Playwright in der Handy-Ansicht (390×844): Uhrzeit fälschen (`page.clock`), Speicherstand vorgeben, Screenshots der Animationen, Kachelzustände zu verschiedenen Tagen, Weiter-Knopf, Sperre (Eingabe, Wolke, Pause), Bewertungsbanner mit Aufgabentext, keine Fehler in der Konsole.

### 22.5 Nur auf echten Geräten prüfbar
- Flüssigkeit der Animationen, besonders auf älteren iPhones.
- Startbildschirm-App und Symbole auf iPhone/Android.
- Verhalten der Code-Sperre beim App-Wechsel und Wegwischen.
- Übernahme der `.ics`-Termine.

---

## 23. Besonderheiten, Stolperfallen und Lösungen

- **Neue Seite wird nicht angezeigt:** `VERSION` in `sw.js` nicht erhöht oder GitHub-Cache noch aktiv.
- **Falsche Datei am falschen Ort:** `sw_TEST.js`/`sw_LIVE.js` und `index_TEST_ascii.html`/`index_LIVE_ascii.html` heißen nur beim Download so, im Repository müssen sie `sw.js` und `index.html` heißen.
- **Excel-Dateien mit Vertraulichkeitslabel** (Microsoft MIP) sind verschlüsselt und können von Claude nicht gelesen werden; unverschlüsselt weitergeben.
- **Zuordnung prüfen:** Gimmicks und Zettel gehören zum **Türchen** (nicht zur Kartennummer). Bei der Zuordnung gab es einmal eine Verwechslung; im Zweifel `calendarData` und die Röhren-Packliste vergleichen.
- **Bildnamen = Kartennummer**, nicht Türchen-Nummer.
- **Falsches Handy-Datum** schaltet Türchen zu früh oder zu spät frei. Es gibt keine Serverzeit.
- **Safari und installierte App** haben getrennte Speicher. Wer erst im Browser und dann in der App liest, beginnt dort von vorn.
- **Kurzbeschreibung fehlt:** Kachel muss `geoeffnet` oder `frei` sein (Abschnitt 12).
- **Wolke:** nicht auf ihrem Gerät testen, wenn sie dort noch nichts gesehen hat (der Hinweis wird dann „verbraucht“).
- **Rückblick-Aufgabentext:** `data.js` muss erreichbar sein, sonst fehlt der Text im Banner (die Daumen funktionieren trotzdem).
- **Pixelbilder:** Das Bild der Sperre ist `landing.jpg`. Ein Austausch betrifft auch die Startseite.

---

## 24. Interne Schalter und Adress-Zusätze

| Schalter | Ort | Wirkung |
|---|---|---|
| `testModus` | index.html | alle Türchen offen, Entwickler-Leiste, Sperre aus |
| `VORTEST_NOVEMBER` | index.html (nur TEST) | November = Dezember |
| `FINALE_VAR` | index.html | Finale-Variante A/B |
| `window.PORTAL_AUS = true` | Konsole | Portal, Wirbel und Finale-Animation abschalten |
| `?reset=1` | Adresse | gespeicherten Stand dieser Version löschen (Begrüßung, Wolken-Hinweis und Finale-Marker bleiben) |
| `?finale=a` / `?finale=b` | Adresse | Finale-Variante festlegen |
| `?finalevorschau=a` / `=b` | Adresse | Finale direkt abspielen |

`?reset=1` gilt **pro Adresse und Browser**; ein Reset in TEST berührt LIVE nicht.

---

## 25. Wichtige Funktionen in index.html

`index.html` ist bewusst eine einzige Datei: zuerst CSS, dann das HTML der Seiten, dann der Skriptbereich.

| Bereich | Funktionen |
|---|---|
| Sperre | Skript direkt hinter `<body>` (`sperreZeigen`, `taste`, `oeffnen`, `pruefen`, `zeichnen`) |
| Einstellungen | `testModus`, `calendarData`, `categoryTitles`, `VORTEST_NOVEMBER` (nur TEST) |
| Datum | `jetzt`, `tagOffen`, `alleFreigegeben`, `heuteTag`, `istTagErreicht`, `bewertungsGrenze`, `tagVergangen` |
| Seitenwechsel | `alleScreensAus`, `resetToLanding`, `zeigeTuerenUebersicht`, `waehleTag`, `oeffneTag`, `zeigeStory`, `nextDaySetup`, `zeigeFinale`, `schliesseModal` |
| Kacheln | `tuerStilAktualisieren`, `KURZ`, `pixelSetzen`, `geoeffnetListe`, `merkeGeoeffnet` |
| Geschichten | `loadStoryContent`, `karteninfoSetzen`, `geschichteFehler`, `geschichteNochmal` |
| Bewertung | `bewertungZeilenHtml`, `aufgabenText`, `bewerteVersion`, `bewertungUI`, `bannerKandidat`, `bannerRendern`, `bewAenderbar` |
| Notizen | `notizAlle`, `notizKey`, `notizSetzen`, `notizHtml`, `notizenKopieren` |
| Auswertung | `auswertungRendern`, `gemeinsameAuswertung`, `AW_GRUPPEN`, `auswKarte`, `awPunkte`, `awGehe`, `awSwipeInit`, `awEnthuellen`, `giftHtml`, `erLaden`, `erDaten`, `kartenLaden`, `kartenDaten` |
| Erinnerung/Export | `erinnerungSpeichern`, `erinnerungDaten`, `erinnerungBildRueckblick`, `erinnerungBildFavoriten` |
| Animationen | `portalDurch`, `portalZurueck`, `wirbelUebergang`, `finaleDurch` (Zeiten in `bildB`), `awEnthuellen`, `wmAn`, `bildEinblenden` |
| Töne | `tonSpielen`, `tonWirbel`, `tonAuspacken`, `tonFinale`, `tonHerzschlag`, `tonHerzBereit`, `tonHerzStopp`, `tonAusblenden` |
| Startseite | `rulesAktualisieren`, `rulesUmschalten`, `vorabUmschalten`, `ladeErinnerung`, Countdown |
| Übersicht | `begruessungWaehlen`, `begruessungZeigen`, `teaserAktualisieren` |
| Wetter (`wetter.js`) | `wetterErsetzen`, `wetterAktualisieren`, `wetterLaden`, `klasseVon`, `aktuell`, `tempWort`; Texte in `window.WETTER_TEXTE` |
| Komfort (eigenes Skript am Dateiende) | `leseAnwenden`, `leseSchrift`, `leseWarmSetzen`, `herzUmschalten`, `herzOeffnen`, `erledigtUmschalten`, `erledigtRendern`, `offeneTage`, `cdAktualisieren`, `uebersichtErgaenzen`, `storyErgaenzen`, `tonSpielen`; Liste `VERSCHIEBBAR` |
| Wolke | Skript mit `bossOeffnen`, `schliessen`, Wetterabruf |
| Push und Deep-Link | früher Skript: `window.__deepLink` aus `?tuerchen=`; `deepLinkVersuch` (nach der Sperre), `pushMitteilungenWeg` (Benachrichtigung schließen, wenn heutiges Türchen geöffnet), `pushStand`, `pushStandSetzen`, `pushStart` |
| Haptik | `window.haptik(art)` (nur Android, `navigator.vibrate`); iPhone: Block „Haptik“ im frühen Skript mit `bestuecken` (durchsichtige Schalter `.hz-sw` über `.cs-taste`, `.tuer-card`, `.bew-btn`, `.herz-btn`, `.btn-primary`) und `MutationObserver` |
| Sonstiges | `seiteAktualisieren` (Tab-Titel/Symbol), Lesefortschritt, Service-Worker-Registrierung |

---

## 26. Verlauf der Änderungen

Grob in der Reihenfolge der Entstehung:

1. **Grundlage:** 24 Geschichten in drei Stimmungen, 24 Karten (Aufgabe und Alternative), Farbwelten in vier Kategorien, Türchen-Übersicht, Freischaltung nach Datum.
2. **Bewertung** der Aufgaben mit Daumen, Notizen, Auswertung der Favoriten, Abgleich mit seiner Bewertung (`er.js`, `er-editor.html`), Rückblick, „Erinnerung speichern“.
3. **Startseite** mit Anleitung, Kalender-Erinnerung (`.ics`), Countdown, Wolke als Chef-Taste.
4. **TEST-Umgebung** mit November = Dezember (`VORTEST_NOVEMBER`), Entwickler-Leiste, Reset per `?reset=1`, später eigene Symbole mit TEST-Band und eigener App-Name.
5. **Service Worker** für Offline-Nutzung und Updates.
6. **Entpixel-Animation:** Das verpixelte Bild entpixelt sich beim Öffnen und man taucht per Zoom in das Bild ein; bei noch fehlender Stimmung geht es in die Stimmungsauswahl. Dazu das Bild als dezentes Wasserzeichen im Hintergrund (TEST und LIVE).
7. **Kurzbeschreibungen** der Aufgaben unter geöffneten Türchen.
8. **Regelkasten der Startseite** auf sieben Punkte erweitert (Bewerten, Notizen, Nachholen, ab 25.12. inkl. Abgleich und Export).
9. **Weiter-Knopf** erscheint nur, wenn das nächste Türchen freigeschaltet ist.
10. **Rückblick auf die Aufgabe:** Beim Bewerten am Folgetag oder beim erneuten Öffnen eines vergangenen Türchens stehen Aufgabe und Alternative im Originalwortlaut dabei (nie am Tag der ersten Öffnung).
11. **Code-Sperre** beim Start, nach Pause und nach der Wolke, mit leicht verpixeltem Hintergrundbild, das sich beim Entsperren entpixelt (TEST und LIVE).
12. **Begleitmaterial:** Beipackzettel (v10, mit Code und Umschlag-zuerst-Hinweis), Gimmick-Vorlagen (Zettel für einzelne Türchen, Code-Zettel; ohne Verweis auf weitere Kalender), Röhren-Packliste, Kurzbeschreibungen-Tabelle.
14b. **Wetter in den Geschichten** (Abschnitt 7.9): Wettersätze passen sich dem echten Wetter an; Vorschau per `?wetter=…`. **Status: in TEST und LIVE umgesetzt.**
13. **Komfort-Funktionen** (Abschnitt 7.8): Lesen anpassen, Countdown, offene Aufgaben mit Frist 31.12., Lieblingsgeschichten, Tür-Knarren. **Status: in TEST und LIVE umgesetzt.**
15. **Sicherung und Editor** (Abschnitt 14): verschlüsselte Sicherung über einen Cloudflare-Worker, „Ihre Antworten“, Wiederherstellungs-Link, Wünsche für ein nächstes Mal, GitHub-Upload aus dem Editor, Beschriftung „Sie“ statt Namen.
16. **Auswertung überarbeitet** (Abschnitt 13.3): Wischen zwischen den Gruppen, straffere Kacheln, „Meine“ und „Seine“ statt „Du“ und „Ich“, Zuordnung nach Karte statt nach Türchenzahl (Türchen nur als Information).
17. **Enthüllung und Finale mit Ton** (Abschnitte 7.8, 8.3, 13.3): Päckchen-Animation mit `auspacken.mp3`, Finale-Animation (22,8 s) auf die Melodie `finale.mp3` abgestimmt, sechs Herzschläge (in `finale.mp3` eingemischt). Alle Töne sind optional.
18. **Begleitmaterial überarbeitet** (Abschnitt 27): Beipackzettel v10 (Umschlag zuerst öffnen), Gimmick-Zettel liegen in den Päckchen, größere und fettere Schrift, keine Verweise auf weitere Kalender.

---
19. **Push-Erinnerung** (Abschnitt 15): Schalter und Uhrzeit in der installierten App, tägliche Nachricht nur bei noch nicht geöffnetem Türchen, Cron im Cloudflare-Worker. Töne offline und in der Lautstärke angeglichen (Abschnitt 7.8).
20. **Notizen getrennt** (Abschnitt 13.2): eigenes Notizfeld je Aufgabe und Alternative; Auswertung, Kopieren, Textdatei und Editor zeigen sie getrennt.
21. **Erinnerung für ihn** (Abschnitt 15): Push um 20:00 Uhr, wenn das Türchen von gestern im Editor noch nicht bewertet ist; Text verschlüsselt vom Worker.
22. **Tür rückwärts und Umschlag** (Abschnitte 7.4, 8.1): „Zurück zur Türchen-Auswahl“ spielt die Tür-Animation rückwärts mit `zuklappen.mp3`; der Umschlag auf der Geschichtenseite öffnet sich in Kategorie-Farbe mit `umschlag.mp3`. Push-Text für sie mit Tag, für ihn „Vergiss nicht zu bewerten“. Reste des Herzschlag-Ladens entfernt.
23. **Aufschließton** bei richtigem Code (Abschnitt 7.8).
24. **Health-Check** im Editor (nur TEST): Status von Push-Anmeldungen, letzten Kontakten und Erinnerungen (Abschnitt 15).
25. **Push-Klick führt direkt zum Türchen** (Code-Abfrage, dann Tür-Animation des heutigen Türchens; Abschnitt 15), Toggle-Schalter statt Häkchen für die Erinnerung.
26. **Feinschliff:** Haptik, dunkle Startbilder, größere Tippflächen, kontrastreichere Signaturzeile (Abschnitt 8.5).
27. **Haptik auf dem iPhone korrigiert:** Skript-Klicks erzeugten dort keine Haptik; jetzt durchsichtige echte Schalter über den Tippflächen (Abschnitt 8.5).

## 27. Begleitmaterial (gedruckt und gebastelt)

| Material | Inhalt |
|---|---|
| `Her_His_Pleasure_Faltkarten_SW_FINAL.pdf` | 24 gedruckte Faltkarten (Aufgabe und Alternative, Stempel-Hinweise, Joker) |
| `Beipackzettel_Advent_SW_v10.pdf` | „Gebrauchsanweisung“: Zugang (Adresse, QR-Code), **Zugangscode**, Ablauf, Regeln, Hinweis „Umschlag immer zuerst öffnen, Päckchen daran danach“; bleibt im Beutel, nicht für die Kinder sichtbar |
| `Gimmick_Vorlagen_v2.pdf` | Zettel, die als Ergänzung zur Aufgabe in den Päckchen liegen (siehe unten) |
| Röhren-Packliste (Docs-Dokument) | Was in welches Röllchen kommt (Pappröhren Ø 5 cm × 10 cm) |
| `Kurzbeschreibungen_Tuerchen.xlsx` | Kurzbeschreibungen mit den kompletten Kartentexten (bearbeitbar) |

Gimmick-Vorlagen (Zettel, Ausschneiden entlang der gestrichelten Linie, 100 % drucken):
- **Türchen 1:** Zettel mit QR-Code (Hilfe, falls ihr spontan nichts einfällt).
- **Türchen 3:** Rätsel.
- **Türchen 7:** Zettel mit Hinweis auf das Päckchen (zusätzlich eine Info-Seite zur Beschriftung, nur zur Information, nicht ausschneiden).
- **Türchen 13:** Zettel zur Alternative (QR-Code).
- **Türchen 18:** Zählkarte.
- **Code-Zettel:** Zettel mit dem Zugangscode für den Kalender.

Es gibt keinen Verweis auf weitere Kalender mehr: Die Gimmicks gehören ausschließlich zu diesem Kalender (der Schokoladen-Kalender ist komplett getrennt). Die Schrift auf den Zetteln ist fett und größer, damit sie gut lesbar ist.

**Grundregel für alle Zettel:** Sie dürfen nichts vorwegnehmen, weil sie diese ggf. morgens liest, bevor sie die Geschichte und die Aufgabe kennt. Päckchen werden erst nach dem Lesen der Aufgabe geöffnet.

Die kleinen Extras je Türchen stehen in der Röhren-Packliste. Die Zettel liegen in den Päckchen, an denen der Umschlag mit der Aufgabe hängt, und ergänzen die Aufgabe. Der Umschlag wird immer zuerst geöffnet.

---

## 28. Datenschutz und Hinweise

- Die Seite hat keine Analyse und keine Werbung. Ihre Angaben liegen im Browser. **Zusätzlich** (nur mit eingerichtetem Worker): eine **Ende-zu-Ende-verschlüsselte Sicherung** (der Worker kann sie nicht lesen; Schlüssel nur im Editor und im Passwortmanager) und die **Push-Anmeldung** (Push-Adresse des Geräts, Uhrzeit, Modus, Zeitpunkt der letzten Öffnung und des letzten Versands, Türchen-Nummer). Beides liegt in Cloudflare KV; der Health-Check zeigt nur Status, nie Adressen oder Schlüssel.
- **Einzige externe Anfrage:** die Wolke ruft Wetterdaten von `api.open-meteo.com` ab (Koordinaten für Grevenbroich, bei Freigabe des Standorts die auf 0,1 Grad gerundeten Koordinaten; ohne Referrer). Dabei wird die IP-Adresse des Geräts übermittelt. Der Abruf passiert auch ohne Öffnen der Wolke im Hintergrund (nach wenigen Sekunden).
- Die Seite ist privat, nicht in Suchmaschinen gelistet; trotzdem ist sie kein Geheimnis, wenn die Adresse bekannt ist. Die Code-Sperre schützt vor zufälligem Öffnen.
- Alle Inhalte sind nur für Erwachsene.

---

## 29. Skripte (tools)

Zu dieser Version gehört ein Archiv `tools_TEST.zip` mit den Skripten, die im Chat mit Claude entstanden sind. Es ist ein **privates Archiv** und gehört **nicht** in das öffentliche GitHub-Repository (die Druck-Skripte enthalten Kartentexte, die Patch-Skripte den Quelltext der Seite).

| Ordner | Inhalt |
|---|---|
| `patches/` | Einmal-Skripte, die `index.html` Schritt für Schritt geändert haben (nach Datum sortiert). Sie sind ein **Änderungsprotokoll**; erneut ausführen lassen sie sich nur auf dem damaligen Stand (sie suchen feste Textstellen und brechen ab, wenn die nicht mehr stimmen). Skripte mit Namen `…_live` bzw. dem Argument `live` bearbeiten die LIVE-Dateien, die übrigen die TEST-Dateien. |
| `druck/` | Erzeugen die gedruckten Teile: Faltkarten (`build*.py`), Beipackzettel (`leaflet.py`), Gimmick-Zettel (`gimmicks.py`, `var.py`, `zettel1.py`) und die Excel-Tabelle der Kurzbeschreibungen (`mk.py`). Benötigen Python 3 mit `reportlab` (PDF), `openpyxl` (Excel) und Schriften (Carlito, Caladea). |
| `tests/` | Playwright-Tests (Handy-Ansicht, gefälschte Uhrzeit): Portal, Bewertung mit Aufgabentext, Code-Sperre. |
| `test-symbole/` | Erzeugt die App-Symbole mit rotem TEST-Band aus den normalen Symbolen (`banner.py`). |

**Nicht** als Skript vorhanden (im Chat erzeugt, dann verloren): die Erzeugung der `.ics`-Dateien, der Pixelbilder (`pix-mid`, `pix-lock`) und der QR-Codes. Die Ergebnisse liegen aber im Repository bzw. in den PDFs. `.ics` und Pixelbilder lassen sich bei Bedarf leicht neu schreiben (Beschreibung in den Abschnitten 10 und 15).

Wichtig: Die Skripte haben **feste Pfade** aus der Chat-Umgebung (`/home/claude/…`, `/mnt/user-data/outputs/…`). Vor dem Benutzen die Pfade am Skriptanfang anpassen.

---

## 30. Entscheidungen und Begründungen

Warum es so gebaut ist, wie es ist:

- **Statische Seite, Worker nur als Beiwerk:** Der Kalender selbst braucht keinen Server (keine Wartung, nichts fällt aus). Nur Sicherung und Push brauchen den kleinen Worker; ohne ihn läuft alles weiter. Preis: kein Abgleich zwischen Geräten, falsche Handy-Uhr wirkt sich aus.
- **Eine einzige `index.html`:** Einfach zu sichern, zu patchen und hochzuladen, ohne Build-Schritt.
- **Stimmung wird pro Tag festgeschrieben:** Die Geschichte soll ein Ereignis sein, kein Durchklicken. Erst ab dem 25.12. dürfen die anderen Versionen gelesen werden.
- **Erst Geschichte, dann Umschlag:** Die Stimmung soll da sein, bevor es ernst wird. Der Umschlag wird erst nach der Geschichte gezogen; Päckchen erst nach dem Lesen der Aufgabe.
- **Bewertung erst am Folgetag und änderbar:** Sie soll es wirken lassen können. Der Aufgabentext wird beim Bewerten wiederholt, weil man nach Stunden oder am nächsten Morgen nicht mehr genau weiß, was gemeint war. Am Tag der ersten Öffnung wird er nicht gezeigt, um nichts vorwegzunehmen.
- **Seine Bewertung in `er.js`:** Sie wird erst ab dem 25.12. geladen und läuft über eine eigene Oberfläche (`er-editor.html`), damit weder er ihre noch sie seine Bewertung vorher sieht. Das ist kein technischer Schutz (die Datei liegt im Repository), sondern eine Vereinbarung.
- **Notizen:** Persönlich, im Browser; sie werden verschlüsselt mitgesichert und sind für ihn im Editor sichtbar (ihr bekannt und gewollt). In eine Datei wandern sie nur bei „Erinnerung speichern“.
- **Code-Sperre statt Face ID:** Face ID über WebAuthn wäre aufwendig, für die Erstnutzung ungewohnt und ohne Server ohnehin nur ein Sichtschutz. Die iOS-eigene App-Sperre wird für Web-Apps nicht angeboten. Ein fester vierstelliger Code reicht gegen zufälliges Öffnen (Kinder) und kann nicht verloren gehen (kein Aussperren, anders als bei einem selbst vergebenen Code).
- **Wolke als Chef-Taste:** Schnelles Verstecken, wenn jemand ins Zimmer kommt. Nach der Wolke kommt die Sperre.
- **Zettel dürfen nichts verraten:** Sie liest diese ggf. morgens, bevor sie die Geschichte kennt. Deshalb sind sie neutral formuliert.
- **TEST als eigene Instanz:** So kann nichts versehentlich auf LIVE landen; Speicher und Adresse sind getrennt. `VORTEST_NOVEMBER` macht den November testbar.
- **Kurzbeschreibungen unter den Kacheln:** Damit sie nach Tagen noch weiß, was sie bewerten möchte.
- **Weiter-Knopf nur bei freigeschaltetem Folgetürchen:** Ein Knopf, der nur „noch nicht“ sagt, wirkt kaputt.
- **Seine Bewertung ohne Backend, keine Statistik:** `er.js` liegt als Datei im Repository. Der Worker kennt keine Bewertungen.
- **Nachholen nur bei sieben Karten:** Nur Aufgaben, die sich sinnvoll verschieben lassen (Karten 3, 4, 8, 15, 17, 19, 23), bekommen die Erledigt-Funktion; bei allen anderen gilt „heute“.
- **Ein Herz je Geschichte und Stimmung:** Keine Mehrfachvergabe pro Türchen, dafür darf nach dem 25.12. jede gelesene Stimmung ein eigenes Herz bekommen.
- **Ton immer aktiv, ohne Schalter, unabhängig vom Stumm-Schalter:** Gewollter Überraschungseffekt; leiser machen geht über die Handy-Lautstärke. `audioSession` „ambient“ wurde ausprobiert und **verworfen** (es würde die Töne beim Stummschalten verstummen lassen). Ohne Audiodatei passiert nichts.
- **Wetter folgt der Realität, Handlung bleibt fest:** Nur Nebenbei-Wetter wird angepasst. Wo das Wetter die Szene trägt (Sternenhimmel, Schneetag, Sturm, Regentag), gibt es eigene Fassungen mit gleichem Ablauf und gleichen Gesprächen; Höhepunkte und Beziehung bleiben unverändert.
- **Wetter der Lesestunde für Nebenbei-Sätze, Tageswetter für ganze Szenen:** Ein einzelner Satz soll zu dem passen, was sie gerade draußen sieht. Eine ganze Szene (Schneetag, Sternenhimmel) beschreibt dagegen den Tag, deshalb zählt dort das vorherrschende Wetter von 8 bis 18 Uhr. Open-Meteo stündlich, kein Abruf am Vortag (der würde nur bei geöffneter App klappen und ist ungenauer).
- **Stand zwischen Geräten:** Ein manueller Export/Import wurde verworfen; stattdessen gibt es die verschlüsselte Sicherung mit Wiederherstellungs-Link.
- **Push pro Minute statt alle 15 Minuten:** Bei `*/15` kam die Nachricht bis zu 29 Minuten nach der gewählten Zeit. Der Cron läuft jetzt jede Minute und liest nur einen kleinen Index (`pushidx`), damit die KV-Zugriffe gering bleiben.
- **Benachrichtigung verschwindet nur, wenn sie das Türchen geöffnet hat:** Nicht schon beim bloßen Öffnen der App.
- **Kein Mehrmandanten-Betrieb, keine „Prüfinstanz“ für Fernhilfe:** Getestet wird im selben Code in TEST; eine zweite Instanz pro Person wurde verworfen.
- **Kein zusätzlicher Freiheits-Hinweistext in der App:** „Nichts ist Pflicht“ steht im Beipackzettel, nicht in der App. Der Beipackzettel regelt auch, welche Aufgaben bewusst nicht verschoben werden.
- **Code-Freeze ab 1. Dezember:** Was dann nicht da ist, kommt nicht mehr neu; nur Fehlerbehebung.
- **Haptik über echte Schalter:** Auf dem iPhone geht Haptik nur bei echter Berührung eines `switch`-Elements, nicht per Skript. Darum durchsichtige Schalter über den Tippflächen; dreifaches Vibrieren bei falschem Code ist dort nicht möglich (siehe 8.5).
- **Tippflächen, dunkle Startbilder:** Mindestens 44 px, dunkle Startbilder gegen weißes Aufblitzen beim Start der installierten App.

---

## 31. Glossar

| Begriff | Bedeutung |
|---|---|
| Türchen | Ein Tag im Online-Kalender (1–24) |
| Umschlag / Karte | Die Karte mit Aufgabe und Alternative; die Nummer steht am Ende der Geschichte |
| Beutel | Behälter, aus dem sie den Umschlag zieht |
| Aufgabe / Alternative | Option A und Option B einer Karte |
| Päckchen | Kleine Extras, an denen der Umschlag hängt (erst nach dem Lesen der Aufgabe öffnen) |
| Röllchen | Pappröhren Ø 5 cm × 10 cm mit Zetteln |
| Stimmung | Geborgen, Verspielt oder Intensiv (intern `hingabe`, `naehe`, `feuer`) |
| Kategorie | Block von sechs Türchen mit eigener Farbwelt |
| Bewertung | Daumen je Aufgabe und Alternative |
| Auswertung | Abgleich mit seiner Bewertung, ab dem 25.12. |
| Wolke | Chef-Taste mit Wetteransicht |
| Sperre | Code-Abfrage beim Start |
| Her/His Pleasure | Kennzeichnung der Karten (mehr für Sie / mehr für Ihn) |
| Joker, Stempel | Regeln und Hinweise auf den gedruckten Karten (siehe Beipackzettel) |
| `er.js` | Seine Bewertungen |
| Worker | Kleiner Cloudflare-Dienst für Sicherung, Push und Health-Check (nicht im Repository) |
| KV | Cloudflare-Speicher des Workers (Namespace `BACKUP`) |
| VAPID | Schlüsselpaar, mit dem der Worker Push-Nachrichten signiert |
| Kennung (Slot) | Name einer Sicherung/Push-Gruppe im Worker (je Version, z. B. für LIVE und TEST, plus `-er` für den Editor) |
| Health-Check | Statusseite mit Ampel im Editor (nur TEST) |
| Deep-Link | `./?tuerchen=N` oder `=heute`, Ziel des Klicks auf die Push-Nachricht |

---

## 32. Offene Punkte und Ideen

- Ton und Bild laufen auf manchen iPhones minimal versetzt (Startverzögerung der Audiodatei). Bei Bedarf lässt sich der Takt in `bildB` und `finaleDurch` verschieben.
- Face ID / Passkey wurde bewusst verworfen (Abschnitt 30).
- Das LIVE-Backup `advent26-LIVE_komplett.zip` wird nur auf Wunsch aktualisiert.
- Vor dem 1. Dezember prüfen: `er.js` in LIVE mit echten Bewertungen, Code bekannt, ihr Handy mit automatischer Zeit, Erinnerungs-Termine eingerichtet.
- Push-Erinnerung: In TEST ist die Zustellung auf dem eigenen Gerät bestätigt (mit Minuten-Cron). Für ihr Gerät erst im Dezember sichtbar: Health-Check beobachten.
- Nur auf echten Geräten prüfbar: Haptik, Aussehen der Startbilder, Lautstärke und Takt der Animationen.
- Die ZIP-Sicherungen (Repo TEST/LIVE, außerhalb des Repos) vor dem 1. Dezember einmal neu erzeugen lassen.

---

## 33. Neuaufbau-Anleitung

Dieser Abschnitt ist für den Fall gedacht, dass der Kalender in einem neuen Chat (oder in einem neuen Jahr) **verstanden, geändert oder neu gebaut** werden soll. Wer diese Datei plus die Repository-Dateien kennt, hat alles, was für den Betrieb nötig ist. Die Kartentexte, der Code und die Namen stehen aus Absicht nicht hier.

### 33.1 Was der Kalender ist (in sechs Sätzen)
1. Eine statische Web-App (`index.html`, eine Datei mit CSS, HTML und JavaScript) auf GitHub Pages, in **zwei Repositories**: LIVE (Echtbetrieb, eigene Domain) und TEST (Vorab-Instanz mit „November = Dezember“).
2. 24 Türchen, je drei Geschichten (`story-dayN.js`), je eine Karte mit Aufgabe und Alternative (`data.js`, Base64), Freischaltung nach Gerätedatum.
3. Eine Code-Sperre am Start, eine Chef-Taste (Wolke) mit Wetteransicht, Tür-, Wirbel-, Umschlag- und Finale-Animationen mit Tönen.
4. Bewertung mit Daumen am Folgetag, Notizen, ab 25.12. Auswertung gegen seine Bewertungen (`er.js`, gepflegt über `er-editor.html` nur in TEST).
5. Ein kleiner **Cloudflare-Worker** (nicht im Repository): verschlüsselte Sicherung ihrer Angaben, Web-Push-Erinnerungen (für sie täglich, für ihn „Vergiss nicht zu bewerten“), Statusabfrage für den Health-Check.
6. Gedrucktes Begleitmaterial (Faltkarten, Beipackzettel, Gimmick-Zettel, Packliste, Abschnitt 27).

### 33.2 Datenmodell in Kürze
- **`calendarData`** (in `index.html`): je Türchen `cardNum` (Kartennummer, die Tabelle steht in Abschnitt 11), Kategorie, Bild, Kurztexte. Bildnamen folgen der **Kartennummer**, nicht dem Türchen.
- **`data.js`:** Aufgabentexte der 24 Karten als Base64 (`KARTEN_B64`). **`story-dayN.js`:** die drei Geschichten je Türchen (Stimmungen intern `hingabe`, `naehe`, `feuer`). **`er.js`:** seine Bewertungen je Karte.
- **Speicher:** nur `localStorage`/`sessionStorage`, alle Schlüssel enden auf `26` (Abschnitt 16). Für ein neues Jahr Endung ändern.
- **Worker-Speicher (KV `BACKUP`):** `<Kennung>:last`, `<Kennung>:v:*` (verschlüsselte Sicherungen), `push:<Kennung>` und `push:<Kennung>-er` (Push-Anmeldungen), `pushidx` (Index der fälligen Anmeldungen).

### 33.3 Bauen in sinnvoller Reihenfolge
1. **Inhalt:** Geschichten (24 × 3), Karten (24 × Aufgabe + Alternative), Zuordnung Türchen ↔ Karte, Kategorien/Farbwelten, Bilder (Tagesbild je Karte, verpixelte Varianten `pix-mid`/`pix-lock`, `landing.jpg`, `finale.jpg`).
2. **Grundgerüst:** Sperre, Startseite, Übersicht mit Freischaltung (`jetzt()`, `tagOffen`), Stimmungsauswahl, Geschichte, Weiter-Knopf, Finale.
3. **Bewertung und Auswertung** (Daumen, Notizen, `er.js`, Rückblick, „Erinnerung speichern“), danach Komfort (Lesen anpassen, Herzen, Erledigt, Countdown) und Wetter (`wetter.js`, `wetter-texte.js`).
4. **Animationen und Töne** (Portal, Wirbel, Umschlag, Enthüllung, Finale mit eingemischtem Herzschlag, Haptik).
5. **Service Worker** (`sw.js`: Kernliste, Bilder, Töne mit Range, Push- und Klick-Handler, `VERSION`) und Manifest/Symbole/Startbilder.
6. **Worker und Editor:** Sicherung (`sicherung.js`, `sicherung-config.js` vom Editor erzeugt), Push, Health-Check.
7. **Begleitmaterial** (Skripte in `tools_*.zip`, Abschnitt 29).
8. **TEST zuerst, dann LIVE** (siehe 33.5).

### 33.4 Cloudflare-Worker neu einrichten (Kurzfassung; Langfassung `ANLEITUNG_Cloudflare.md`)
1. Worker anlegen, Inhalt von `worker.js` einfügen, **KV-Namespace** anlegen und als Binding **`BACKUP`** verbinden.
2. **Secret `ADMIN_HASH`:** Zugangs-Hash aus dem Editor („Sicherung einrichten“, Schritt 2; Passwort wird nirgends gespeichert).
3. **Push:** VAPID-Schlüsselpaar (P-256) erzeugen, z. B. mit Node:
   ```js
   const c = require("crypto");
   const k = c.generateKeyPairSync("ec", { namedCurve: "prime256v1" });
   const j = k.privateKey.export({ format: "jwk" });
   const pub = Buffer.concat([Buffer.from([4]), Buffer.from(j.x, "base64url"), Buffer.from(j.y, "base64url")]).toString("base64url");
   console.log("VAPID_PUBLIC:", pub);   // 87 Zeichen
   console.log("VAPID_PRIVATE:", j.d); // 43 Zeichen
   ```
   `VAPID_PUBLIC` als **Variable (Text)**, `VAPID_PRIVATE` als **Secret** eintragen. Den öffentlichen Schlüssel zusätzlich in `index.html` (`PUSH_PUB`) eintragen, beide Pakete.
4. **Cron-Trigger** `* * * * *` (jede Minute). Optional Variable `ALLOWED_ORIGINS` (erlaubte Herkünfte für Aufrufe aus dem Browser).
5. Im Editor Worker-Adresse eintragen und die Konfiguration „An TEST und LIVE senden“.
6. Prüfen mit Testnachricht und Health-Check (Abschnitt 15).

### 33.5 Arbeitsweise bei Änderungen
- Erst in TEST bauen und prüfen, dann **dieselbe Änderung** in LIVE einbauen (nie die TEST-`index.html` kopieren: `VORTEST_NOVEMBER`, andere Symbole und App-Namen gehören nur in TEST).
- Bei **jeder** Änderung an einer gecachten Datei `VERSION` in `sw.js` erhöhen. README-Änderungen brauchen keine Erhöhung.
- Geänderte Dateien unter eindeutigen Namen ausliefern (Hinweis zum Umbenennen, z. B. `index_TEST.html` wird `index.html`).
- Hochgeladen wird per GitHub-Weboberfläche; Cloudflare wird vom Besitzer selbst bedient.
- **Nie** nach GitHub-Token, Cloudflare-Passwort oder Admin-Hash fragen.

### 33.6 Testwerkzeuge
- **Playwright** (Chromium, iPhone-Emulation 390×844), Uhrzeit mit `page.clock.install({ time })`, Speicherstand per `localStorage` vorgeben. Typische Prüfungen: Sperre, Portal und Wirbel (Screenshots), Bewertung am Folgetag, Auswertung (60 von 60 Kombinationen), Deep-Link, Offline-Verhalten des Service Workers, Konsole ohne Fehler.
- **Lokale Server:** zwei `python3 -m http.server` auf getrennten Ports, z. B. 8231 (TEST) und 8232 (LIVE), je aus dem Paketordner.
- **Worker-Tests:** `worker.js` als Modul laden mit simuliertem KV (`BACKUP`) und simulierten Push-Diensten; geprüft werden `psub`/`poff`/`popen`, Fälligkeit, Nachholfenster (30 Minuten), ein Versand pro Tag, Index, `pstatus`, 410-Bereinigung.
- Was nur auf echten Geräten geht: Haptik, Startbild-Optik, Lautstärke/Takt, Push auf ihrem iPhone.

### 33.7 Was **nicht** ins Repository gehört (und gesichert werden muss)
| Datei | Warum |
|---|---|
| `worker.js`, `ANLEITUNG_Cloudflare.md` | läuft bei Cloudflare, nicht auf GitHub Pages |
| Push-Schlüsseldatei (`PUSH_SCHLUESSEL_…`) | enthält den **privaten** Schlüssel |
| echte `sicherung-config.js` | vom Editor erzeugt; im Repository liegt nur ein Platzhalter. In keinem Update-Paket mitliefern |
| echte `er.js` | seine Bewertungen; ein Paket enthält nur eine Vorlage |
| `CNAME` (LIVE) | wird von GitHub angelegt; nicht löschen |
| `tools_*.zip`, Druck- und Testskripte | private Werkzeuge (Abschnitt 29) |

### 33.8 Inhaltliche Regeln für diese README
Diese Datei enthält **keinen Zugangscode, keine Kartentexte, keine Erklärung des Safewords und keine Namen** (weder ihren noch seinen). In der LIVE-Datei steht außerdem nichts über die Testinstanz-Adresse oder deren Repository. Beim Pflegen darauf achten.

### 33.9 Checkliste für ein neues Jahr
1. Neue Schlüssel-Endung statt `26` (Abschnitt 16), Jahreszahl in `jetzt()`/`tagOffen`, `.ics`-Dateien, Dateinamen „Advent2026_…“, Wochentage in den Geschichten prüfen.
2. `er.js` neu befüllen; Code neu festlegen (Konstante `CODE`, Base64) und auf Beipackzettel und Code-Zettel ändern.
3. Neue Kennung (Slot) in `sicherung-config.js`, neue VAPID-Schlüssel (oder bestehende weiter nutzen), Worker-KV leeren oder neuen Namespace anlegen.
4. TEST-Instanz neu aufsetzen, `VORTEST_NOVEMBER` im Auge behalten; Texte, Bilder und Begleitmaterial anpassen.
5. Alle Abschnitte dieser README gegen den Code prüfen (diese Datei wird mit `build_readme.py` erzeugt; er liegt in der „außerhalb des Repos“-Sicherung).
