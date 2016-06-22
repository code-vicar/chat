import app from './app'
import http from 'http'
import socketio from 'socket.io'
import bunyan from 'bunyan'

let log = bunyan.createLogger({ name: 'server' })

let server = http.createServer(app)
let io = socketio(server)

io.on('connection', function (socket) {
    socket.on('event', function (data) {
        log.info('event', data)
    })

    socket.on('disconnect', function () {
        log.info('disconnect')
    })
})

let port = process.env.PORT || 3000

server.listen(port)
log.info(`listening at *:${port}`)
