# Microlink Screenshot App (Vercel + Blob)


Einfaches HTML/JS-Frontend + Vercel Function:


- E-Mail & URL (vorgefüllt) im Formular
- Speichern der letzten Eingaben via `localStorage`
- Screenshot mit **Microlink** erstellen
- Ergebnis in **Vercel Blob** speichern und anzeigen


## Setup


1. **Repository anlegen**
- Dateien aus diesem Projekt committen und zu GitHub pushen.


2. **Auf Vercel importieren**
- Repo in Vercel importieren.
- Optional: `MICROLINK_API_KEY` als Environment Variable hinterlegen (Project → Settings → Environment Variables).


3. **Blob aktivieren**
- In Vercel im Projekt auf **Storage → Blob** gehen und ein Bucket erstellen (kostenloser Tarif reicht).
- Keine extra Konfig notwendig – `@vercel/blob` kümmert sich um den Upload.


4. **Entwickeln lokal (optional)**
```bash
npm install
npx vercel login
npx vercel link
npm run dev
