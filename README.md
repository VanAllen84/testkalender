# testkalender

Adventskalender 2026 – TEST-Version

Testumgebung zum persönlichen, erotischen Adventskalender für Anja (Konzept siehe README_LIVE.md). Hier werden neue Funktionen gebaut und ausprobiert, bevor sie in die LIVE-Version (https://kalender2026.tkagel.de) übernommen werden. Die TEST-Adresse trägst du hier ein: <TEST-ADRESSE EINTRAGEN>

1. Unterschiede zu LIVE
  Thema	| TEST	| LIVE
  VORTEST_NOVEMBER	| true – der November 2026 wird wie Dezember behandelt (1. Nov = Türchen 1 … 25. Nov = „25. Dezember“) |	gibt es nicht, es gilt das echte Datum
  testModus	im Code vorhanden, standardmäßig | false |	false
  er-editor.html	| vorhanden | nicht vorhanden
  Finale	| läuft in TEST immer (auch wiederholt) und lässt sich per Vorschau-Link zeigen	| nur einmal
  Test-Diagnose | in der Auswertung	sichtbar (zeigt, ob er.js geladen wurde und wie viele Bewertungen gültig sind)	| nicht sichtbar
  sw.js, er.js	| eigene Kopien | eigene Kopien

  Alles andere (Geschichten, Karten, Bilder, Funktionen) ist gleich. Neues wird immer erst hier gebaut.

2. Die zwei Schalter
  a) VORTEST_NOVEMBER (Zeile mit const VORTEST_NOVEMBER = true;)

    Funktion jetzt() liefert das „aktuelle“ Datum. Ist der Schalter an und ist es November 2026, wird der Monat auf Dezember gesetzt. Damit gilt:

    1.11. = Türchen 1, 2.11. = Türchen 2 … 24.11. = Türchen 24.  
    25.11. = 25. Dezember: alle Türchen frei, andere Stimmungen lesbar, Auswertung, Rückblick, Finale.
    Der Countdown auf der Startseite zählt bis zum 1. November statt 1. Dezember.
    Ab dem 1. Dezember (echt) greift die Verschiebung nicht mehr, TEST verhält sich dann wie LIVE.
    Ausschalten: VORTEST_NOVEMBER = false (oder den Block entfernen). Dann verhält sich TEST wie LIVE.
    Wirkung auf die Gesamtumgebung: Der Schalter betrifft nur diese Seite im Browser. Er verändert weder LIVE noch gespeicherte Daten.

  b) testModus (Zeile const testModus = false;)
  
    true: alle Türchen sind sofort offen, die Entwickler-Leiste („🧪 Test-Modus“ mit Tagesauswahl) ist sichtbar, alleFreigegeben() ist immer wahr, die Wolke rutscht nach unten, und die Auswertung zeigt Diagnose und Testhinweise.
    false: normales Verhalten (nur freigeschaltete Türchen).
    Zum Testen einzelner Tage reicht meist VORTEST_NOVEMBER (echte Freischaltlogik). testModus ist für schnelles Durchklicken.
    Vor einer Übernahme nach LIVE muss testModus false sein. In LIVE gibt es den Schalter ebenfalls, aber er steht auf false.

3. Hilfs-Links (Parameter an die Adresse hängen)
  Link	| Wirkung
  …/index.html?reset=1	| Löscht Geöffnet, Wahl, Bewertungen, Datum, Später, Notizen, Gelesen im Browser und lädt ohne Zusatz neu. Nicht gelöscht: Begrüßung (adventGruss26), Wolken-Hinweis (adventBossHint26) und Finale-Marker (adventFinaleAn26). Wer die auch löschen will: Browserdaten für die Seite löschen.
  …/?finalevorschau=a bzw. =b | Spielt das Finale (Variante A oder B) direkt ab.
  …/?finale=a bzw. =b	| Legt die Finale-Variante fest, ohne es sofort abzuspielen.

  Reset gilt pro Adresse und Browser: TEST und LIVE haben getrennte Speicher, weil es verschiedene Adressen sind. Ein Reset in TEST berührt LIVE nicht.

4. Typischer Testablauf
  TEST-Adresse mit ?reset=1 öffnen.
  Mit VORTEST_NOVEMBER = true stimmt das Datum, solange es November ist: Türchen des Tages öffnen, Stimmung wählen, Geschichte lesen, Umschlag/Aufgabe prüfen.
  Am Folgetag (oder per Systemdatum/Browser-Test) die Bewertungsabfrage prüfen.
  Am 25.11. (= „25.12.“) Auswertung, Rückblick, Erinnerung speichern und Finale prüfen.
  Mit testModus = true sämtliche Tage durchklicken, falls nötig.
  Auf dem Handy als Home-Bildschirm-App prüfen (Zwischenspeicher, Animationen, Wolke).

5. er-editor.html und er.js (Thilos Bewertung)
  er-editor.html ist ein kleines Werkzeug, in dem Thilo seine Bewertung (👍 / 😐 / 👎) je Aufgabe und Alternative anklickt. Es liest dafür data.js (muss im selben Ordner liegen) und erzeugt den fertigen Text für er.js.
  Der erzeugte Text wird als er.js gespeichert und committet (TEST und später LIVE).
  Wichtig: Nach dem Eintragen die Daten prüfen. In der TEST-Auswertung zeigt die Diagnose („er.js gelesen: N gültige Bewertung(en)“), ob alles gelesen wurde. Erlaubt sind nur A, B, C oder leer.
  Ihre Daten sind dem Editor nicht zugänglich: Er läuft eigenständig und liest keine Browserdaten der App.
  er.js wird in der App erst geladen, wenn alleFreigegeben() wahr ist (in TEST also ab 25.11. bzw. mit testModus).

6. Dateien (wie LIVE, plus Editor)
  index.html, story-day1…24.js, data.js, er.js, er-editor.html, sw.js, manifest.json, Icons, bilder/, erinnerung/*.ics. Die Beschreibung der Dateien steht in README_LIVE.md.

7. Funktionen (Kurzfassung, Details in README_LIVE.md)
  Landing-Seite mit Anleitung (sieben Punkte), Erinnerungs-Termine (.ics), Türchen-Kacheln mit Zuständen und Kurzbeschreibungen, Entpixel-Animation mit Zoom und Wasserzeichen, Buchstabenwirbel, drei Stimmungen je Tag,   Bewertung (👍/😐/👎, bis zum Folgetag änderbar, nachholbar), Notizen (nur lokal), Auswertung mit Top-Favoriten/Favoriten, Rückblick, „Erinnerung speichern“ (Bilder + Textdatei), Finale A/B, Wolken-Knopf als Chef-Taste.

8. Service Worker
  Wie in LIVE: Netzwerk zuerst für Seiten und Geschichten, Zwischenspeicher zuerst für bilder/.
  Auch in TEST gilt: Nach jeder Änderung VERSION in sw.js erhöhen, sonst zeigt der Browser alte Inhalte. Bei hartnäckigem Zwischenspeicher: Seite schließen/neu öffnen oder die Website-Daten im Browser löschen.

9. Änderungen von TEST nach LIVE übernehmen
  In TEST fertig testen, auch auf dem Handy.
  Nicht die ganze TEST-index.html nach LIVE kopieren, sondern darauf achten, dass der Block VORTEST_NOVEMBER und die Test-Diagnose nicht in LIVE gelangen. Der bisher verwendete Weg: dieselben Änderungen per Skript in beide Dateien einbauen.
  er.js mit den echten Bewertungen in LIVE legen.
  VERSION in LIVE-sw.js erhöhen.
  Hochladen, ein, zwei Minuten warten, in LIVE prüfen.

10. Hinweise
  Beim Testen am Handy: Vor einer Übergabe an sie einmal ?reset=1 auf ihrem Gerät nur dann, wenn wirklich gewollt ist, dass alles zurückgesetzt wird. In LIVE gilt: nie ohne Not.
Das zweite, nicht erotische Projekt „Adventsgeschichten“ (adventsgeschichten.tkagel.de) wird separat in einem neuen Chat gebaut; die Vorlage dafür ist der Prompt in den Docs („Prompt: Advents-Geschichten-Kalender“).
