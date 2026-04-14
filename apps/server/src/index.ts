import http from 'http'

const PORT = process.env.PORT ?? 8080

const server = http.createServer((_req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ status: 'ok', version: '0.0.1' }))
})

server.listen(PORT, () => {
  console.log(`[server] listening on port ${PORT}`)
})
