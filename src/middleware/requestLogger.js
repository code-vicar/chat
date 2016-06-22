import bunyan from 'bunyan'

let log = bunyan.createLogger({ name: 'request', serializers: bunyan.stdSerializers })

export default function (req, res, next) {
    log.info({ req: req })

    if (req.id) {
        req.log = log.child({ requestID: req.id })
    } else {
        req.log = log
    }

    next()
}
