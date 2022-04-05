const Sequelize = require('sequelize');
require('dotenv').config()

var db = {}

const connection = new Sequelize(
    process.env.APP_DBNAME,
    process.env.APP_DBUSERNAME,
    process.env.APP_DBPASS,
    {
        host: process.env.APP_HOST,
        port: process.env.APP_PORT,
        dialect: 'mysql',
        define: {
            freezeTableName: true,
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        // <http://docs.sequelizejs.com/manual/tutorial/querying.html#operators>
        // operatorsAliases: false,
    },
)

let models = [
    require('../models/client.js'),
    require('../models/event'),
    require('../models/eq_client_case'),
    require('../models/case_af'),
]

// Initialize models
models.forEach(model => {
    const seqModel = model(connection, Sequelize)
    db[seqModel.name] = seqModel
})

// Apply associations
Object.keys(db).forEach(key => {
    if ('associate' in db[key]) {
        db[key].associate(db)
    }
})

db.sequelize = connection
db.Sequelize = Sequelize

db.case_af.belongsToMany(db.client, { through: db.eq_client_case });
db.client.belongsToMany(db.case_af, { through: db.eq_client_case });

db.case_af.hasMany(db.event, {foreignKey: 'idCase', onDelete:"cascade"});
db.event.belongsTo(db.case_af, {foreignKey: 'idCase', onDelete:"cascade"});


module.exports = {db, connection};

// idCase