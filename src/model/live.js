const objection = require('objection')
const Model = objection.Model
const Knex = require('knex')

const knex = Knex({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: 'runtime/external/db/live/live.db_'
    }
})

Model.knex(knex)

class LiveSetting {
    static get tableName() { return 'live_setting_m' }
}

class LiveTrack {
    static get tableName() { return 'live_track_m' }
}
