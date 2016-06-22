import bunyan from 'bunyan'
import uuid from 'uuid'

export default function (req, res, next) {
    req.id = req.get('X-Request-ID')

    if (!req.id) {
        let id = uuid.v1()
        req.headers['X-Request-ID'] = id
        req.id = id
    }

    res.set('X-Request-ID', req.id)

    next()
}
