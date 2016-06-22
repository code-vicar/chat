import bunyan from 'bunyan'
import onHeaders from 'on-headers'

function responseSerializer(res) {
    if (!res) {
        return false
    }

    return {
        statusCode: res.statusCode,
        headers: res._headers,
        trailer: res._trailer || false
    }
}

let log = bunyan.createLogger({ name: 'response', serializers: { res: responseSerializer } })

export default function (req, res, next) {
    onHeaders(res, logResponse)
    next()
}

function logResponse() {
    log.info({ res: this })
}
