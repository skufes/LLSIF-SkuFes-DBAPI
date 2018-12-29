const express = require('express')
const EventApiRouter = express.Router()
const EventModel = require('../model').Event
const Model = require('objection').Model

const EVENT_EAGER_EXPRESSION = '[event_live_rankings.[rewards],event_point_rankings.[rewards],event_point_counts.[rewards]]'

EventApiRouter.get('/', function (req, res) {
    EventModel.query()
        .then(events => res.send(events))
})

EventApiRouter.get('/:event_id', function (req, res) {
    let event_id = parseInt(req.params['event_id'])
    EventModel
        .query()
        .where({ event_id })
        .eager(EVENT_EAGER_EXPRESSION)
        .then(events => res.send(events[0]))
})

module.exports = EventApiRouter
