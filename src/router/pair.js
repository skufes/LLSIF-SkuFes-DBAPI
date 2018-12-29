const express = require('express')
const PairApiRouter = express.Router()
const PairModel = require('../model').Pair
const Model = require('objection').Model
const _ = require('lodash')

PairApiRouter.get('/', function (req, res) {
    PairModel.query()
        .eager('unit')
        .then(pairUnits => {
            let pairs = _.map(_.groupBy(pairUnits, 'pair'),
                (pair, pair_id) => ({ pair_id, pair })
            )
            res.send(pairs)
        })
})

PairApiRouter.get('/:pair_id', function (req, res) {
    let pair_id = parseInt(req.params['pair_id'])
    PairModel
        .query()
        .where({ pair: pair_id })
        .eager('unit')
        .then(pairs => res.send(pairs))
})

module.exports = PairApiRouter

