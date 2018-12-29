const express = require('express')
const UnitApiRouter = express.Router()
const UnitModel = require('../model').Unit
const Model = require('objection').Model

const PROPS = ['unit_normal_navi_asset', 'unit_rank_max_navi_asset', 'unit_pair', 'unit_attribute', 'unit_type', 'unit_level_up_pattern', 'unit_skill.[unit_skill_level,unit_skill_level_up_pattern]', 'unit_leader_skill', 'unit_leader_skill_extra.[member_tag]']
const UNIT_EAGER_EXPRESSION = `[${PROPS.join(', ')}]`

UnitApiRouter.get('/', function (req, res) {
    UnitModel.query()
        .then(events => res.send(events))
})

UnitApiRouter.get('/:unit_id', function (req, res) {
    let unit_id = parseInt(req.params['unit_id'])
    UnitModel
        .query()
        .where({ unit_id })
        .eager(UNIT_EAGER_EXPRESSION)
        .then(events => res.send(events[0]))
})

module.exports = UnitApiRouter

