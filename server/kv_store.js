import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DB_FILE = path.join(__dirname, 'kv_store.json')

async function initDB() {
  try { await fs.access(DB_FILE) }
  catch { await fs.writeFile(DB_FILE, JSON.stringify({}), 'utf8') }
}

async function readDB() {
  await initDB()
  const data = await fs.readFile(DB_FILE, 'utf8')
  return JSON.parse(data || '{}')
}

async function writeDB(data) {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), 'utf8')
}

export async function set(key, value) {
  const db = await readDB()
  db[key] = value
  await writeDB(db)
  return true
}

export async function get(key) {
  const db = await readDB()
  return db[key] ?? null
}

export async function del(key) {
  const db = await readDB()
  delete db[key]
  await writeDB(db)
  return true
}

export async function getByPrefix(prefix) {
  const db = await readDB()
  return Object.entries(db)
    .filter(([k]) => k.startsWith(prefix))
    .map(([, v]) => v)
}
