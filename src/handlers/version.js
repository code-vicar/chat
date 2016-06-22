import Promise from 'bluebird'
import fs from 'fs'
import { resolve } from 'path'

const readFile = Promise.promisify(fs.readFile)

export function get(req, res, next) {
    return Promise.try(function () {
        return readFile(resolve(__dirname, '../version.txt'), {
            encoding: 'utf-8'
        })
    }).then(function (version) {
        res.send(version)
    }).catch(next)
}
