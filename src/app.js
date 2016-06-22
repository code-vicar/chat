import express from 'express'
import swaggerize from 'swaggerize-express'
import { resolve } from 'path'

import requestID from './middleware/requestID'
import requestLogger from './middleware/requestLogger'
import responseLogger from './middleware/responseLogger'

let app = express()

app.use(requestID)
app.use(requestLogger)
app.use(responseLogger)

app.use(swaggerize({
    api: resolve(__dirname, './swagger.json'),
    handlers: resolve(__dirname, './handlers')
}))

export default app
