const Knex = require('knex')

const knex = Knex({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: 'runtime/external/db/event/event_common.db_'
    }
})

const Model = require('objection').Model.bindKnex(knex)

class EventLiveRankingReward extends Model {
    static get tableName() { return 'event_live_ranking_reward_m' }
}

class EventLiveRanking extends Model {
    static get tableName() { return 'event_live_ranking_m' }
    static get relationMappings() {
        return {
            rewards: {
                relation: Model.HasManyRelation,
                modelClass: EventLiveRankingReward,
                join: {
                    from: 'event_live_ranking_m.event_live_ranking_id',
                    to: 'event_live_ranking_reward_m.event_live_ranking_id'
                }
            }
        }
    }
}

class EventPointRankingReward extends Model {
    static get tableName() { return 'event_point_ranking_reward_m' }
}

class EventPointRanking extends Model {
    static get tableName() { return 'event_point_ranking_m' }
    static get relationMappings() {
        return {
            rewards: {
                relation: Model.HasManyRelation,
                modelClass: EventPointRankingReward,
                join: {
                    from: 'event_point_ranking_m.event_point_ranking_id',
                    to: 'event_point_ranking_reward_m.event_point_ranking_id'
                }
            }
        }
    }
}

class EventPointCountReward extends Model {
    static get tableName() { return 'event_point_count_reward_m' }
}

class EventPointCount extends Model {
    static get tableName() { return 'event_point_count_m' }
    static get relationMappings() {
        return {
            rewards: {
                relation: Model.HasManyRelation,
                modelClass: EventPointCountReward,
                join: {
                    from: 'event_point_count_m.event_point_count_id',
                    to: 'event_point_count_reward_m.event_point_count_id'
                }
            }
        }
    }
}

class Event extends Model {
    static get tableName() { return 'event_m' }
    static get relationMappings() {
        return {
            event_live_rankings: {
                relation: Model.HasManyRelation,
                modelClass: EventLiveRanking,
                join: {
                    from: 'event_m.event_id',
                    to: 'event_live_ranking_m.event_id'
                }
            },
            event_point_rankings: {
                relation: Model.HasManyRelation,
                modelClass: EventPointRanking,
                join: {
                    from: 'event_m.event_id',
                    to: 'event_point_ranking_m.event_id'
                }
            },
            event_point_counts: {
                relation: Model.HasManyRelation,
                modelClass: EventPointCount,
                join: {
                    from: 'event_m.event_id',
                    to: 'event_point_count_m.event_id'
                }
            }
        }
    }
}

module.exports = { Event }
