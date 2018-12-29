const Promise = require('bluebird')
const child_process = Promise.promisifyAll(require('child_process'))
const process = require('process')
const express = require('express')
const app = express()

function init() {
    if (process.platform === 'win32')
        return child_process.execAsync('python bootstrap.py')
    else
        return child_process.execAsync('python3 bootstrap.py')
}

function serve() {
    return new Promise((resolve, reject) => {
        try {
            const UnitApiRouter = require('./router/unit.js')
            const EventApiRouter = require('./router/event.js')
            const PairApiRouter = require('./router/pair.js')
            app.use('/event', EventApiRouter)
            app.use('/unit', UnitApiRouter)
            app.use('/pair', PairApiRouter)
            app.listen(32812, 'localhost', function () { resolve() })
        }
        catch(err) {
            reject(err)
        }
    })
}

init()
.then(serve)