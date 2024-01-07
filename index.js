import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))


const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(cors())

app.use(express.static('dist'))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})


app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})