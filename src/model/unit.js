const Knex = require('knex')

const knex = Knex({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: 'runtime/external/db/unit/unit.db_'
    }
})

const Model = require('objection').Model.bindKnex(knex)

class Unit extends Model {
    static get tableName() {
        return 'unit_m'
    }
    static get relationMappings() {
        return {
            unit_normal_navi_asset: {
                relation: Model.HasOneRelation,
                modelClass: UnitNaviAsset,
                join: {
                    from: 'unit_m.normal_unit_navi_asset_id',
                    to: 'unit_navi_asset_m.unit_navi_asset_id',
                }
            },
            unit_rank_max_navi_asset: {
                relation: Model.HasOneRelation,
                modelClass: UnitNaviAsset,
                join: {
                    from: 'unit_m.rank_max_unit_navi_asset_id',
                    to: 'unit_navi_asset_m.unit_navi_asset_id',
                }
            },
            unit_pair: {
                relation: Model.HasOneRelation,
                modelClass: UnitPair,
                join: {
                    from: 'unit_m.unit_id',
                    to: 'unit_pair_m.unit_id',
                }
            },
            unit_attribute: {
                relation: Model.HasOneRelation,
                modelClass: UnitAttribute,
                join: {
                    from: 'unit_m.attribute_id',
                    to: 'unit_attribute_m.attribute_id',
                }
            },
            unit_type: {
                relation: Model.HasOneRelation,
                modelClass: UnitType,
                join: {
                    from: 'unit_m.unit_type_id',
                    to: 'unit_type_m.unit_type_id',
                }
            },

            unit_level_up_pattern: {
                relation: Model.HasManyRelation,
                modelClass: UnitLevelUpPattern,
                join: {
                    from: 'unit_m.unit_level_up_pattern_id',
                    to: 'unit_level_up_pattern_m.unit_level_up_pattern_id',
                }
            },

            unit_skill: {
                relation: Model.HasOneRelation,
                modelClass: UnitSkill,
                join: {
                    from: 'unit_m.default_unit_skill_id',
                    to: 'unit_skill_m.unit_skill_id',
                }
            },

            unit_leader_skill: {
                relation: Model.HasOneRelation,
                modelClass: UnitLeaderSkill,
                join: {
                    from: 'unit_m.default_leader_skill_id',
                    to: 'unit_leader_skill_m.unit_leader_skill_id',
                }
            },

            unit_leader_skill_extra: {
                relation: Model.HasOneRelation,
                modelClass: UnitLeaderSkillExtra,
                join: {
                    from: 'unit_m.default_leader_skill_id',
                    to: 'unit_leader_skill_extra_m.unit_leader_skill_id',
                }
            },

        }
    }
}

class UnitNaviAsset extends Model {
    static get tableName() {
        return 'unit_navi_asset_m'
    }
}

class UnitPair extends Model {
    static get tableName() {
        return 'unit_pair_m'
    }
    static get relationMappings() {
        return {
            unit: {
                relation: Model.HasOneRelation,
                modelClass: Unit,
                join: {
                    from: 'unit_pair_m.unit_id',
                    to: 'unit_m.unit_id',
                }
            }
        }
    }
}

class UnitAttribute extends Model {
    static get tableName() {
        return 'unit_attribute_m'
    }
}

class UnitType extends Model {
    static get tableName() {
        return 'unit_type_m'
    }
}

class UnitLevelUpPattern extends Model {
    static get tableName() {
        return 'unit_level_up_pattern_m'
    }
}

class UnitSkill extends Model {
    static get tableName() {
        return 'unit_skill_m'
    }

    static get relationMappings() {
        return {
            unit_skill_level: {
                relation: Model.HasManyRelation,
                modelClass: UnitSkillLevel,
                join: {
                    from: 'unit_skill_m.unit_skill_id',
                    to: 'unit_skill_level_m.unit_skill_id'
                }
            },

            unit_skill_level_up_pattern: {
                relation: Model.HasManyRelation,
                modelClass: UnitSkillLevelUpPattern,
                join: {
                    from: 'unit_skill_m.unit_skill_level_up_pattern_id',
                    to: 'unit_skill_level_up_pattern_m.unit_skill_level_up_pattern_id'
                }
            }
       }
    }
}

class UnitSkillLevel extends Model {
    static get tableName() {
        return 'unit_skill_level_m'
    }
}

class UnitSkillLevelUpPattern extends Model {
    static get tableName() {
        return 'unit_skill_level_up_pattern_m'
    }
}

class UnitLeaderSkill extends Model {
    static get tableName() {
        return 'unit_leader_skill_m'
    }
}

class UnitLeaderSkillExtra extends Model {
    static get tableName() {
        return 'unit_leader_skill_extra_m'
    }

    static get relationMappings() {
        return {
            member_tag: {
                relation: Model.HasOneRelation,
                modelClass: MemberTag,
                join: {
                    from: 'unit_leader_skill_extra_m.member_tag_id',
                    to: 'member_tag_m.member_tag_id'
                }
            }
        }
    }
}

class MemberTag extends Model {
    static get tableName() {
        return 'member_tag_m'
    }
}

module.exports = { Unit, UnitPair }