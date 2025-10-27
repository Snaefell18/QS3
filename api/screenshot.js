import mql from '@microlink/mql'
import { put } from '@vercel/blob'


// Optional: set with a Vercel env var MICROLINK_API_KEY
const MICROLINK_API_KEY = process.env.MICROLINK_API_KEY


export default async function handler(req, res) {
if (req.method !== 'POST') {
res.setHeader('Allow', 'POST')
return res.status(405).json({ message: 'Method Not Allowed' })
}


try {
const { email, url } = req.body || {}
if (!email || !url) {
return res.status(400).json({ message: 'email und url sind erforderlich' })
}


// Call Microlink to create a screenshot
const opts = { screenshot: true }
if (MICROLINK_API_KEY) opts.apiKey = MICROLINK_API_KEY


const { data } = await mql(url, opts)


// Microlink returns an URL to the generated screenshot (PNG)
const screenshotUrl = data?.screenshot?.url
if (!screenshotUrl) throw new Error('Konnte Screenshot-URL nicht erhalten')


// Download the image and upload it to Vercel Blob
const imgRes = await fetch(screenshotUrl)
if (!imgRes.ok) throw new Error('Screenshot konnte nicht geladen werden')


const arrayBuffer = await imgRes.arrayBuffer()


// A simple, readable filename
const safeHost = new URL(url).host.replace(/[^a-z0-9.-]/gi, '-')
const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
const filename = `screenshots/${safeHost}__${timestamp}.png`


const { url: blobUrl } = await put(filename, new Uint8Array(arrayBuffer), {
access: 'public',
contentType: 'image/png',
})


// Optionally: you could store (email, url, blobUrl) somewhere persistent
// (KV/DB). For this simple app we rely on localStorage on the client.


return res.status(200).json({ blobUrl })
} catch (err) {
console.error(err)
return res.status(500).json({ message: err.message || 'Interner Fehler' })
}
}
