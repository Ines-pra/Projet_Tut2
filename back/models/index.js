// Pour réparer la base de données se besoin
const {db, connection} = require('../database/database');
require('dotenv').config()

connection.sync({force:true}).then((result) => {
    console.log(result);
})
.catch((err) => {
    console.log(err);
})

// async function main(){
//     const cli = await db.case_af.findAll({include:[db.client]});
//     console.log(cli);
// }

// main();