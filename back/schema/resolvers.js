const {db} = require('../database/database');
const {DateTime} = require("./scalar/datetime");

const resolvers = {
    Query: {
            clients: async () => db.client.findAll({include:[db.case_af]}),
            client: async (obj, args, context, info) => db.clients.findByPk(args.id),
            // clientByName: async (obj, args, context, info) => db.users.findOne({where: {name: args.name}}),
            case_af: async (obj, args, context, info) => {
                 return db.case_af.findByPk(args.id,{include:[db.client, db.event]})    
            },
            case_afs: async function main(){
                const cli = await db.case_af.findAll({include:[db.client, db.event]});
                return cli;
            },
            events: async () => db.event.findAll(),
            event: async (obj, args, context, info) => db.event.findByPk(args.id)
            
                // db.eq_client_case.findOne({where:{id_case: find.id }})
                
            
        },
    Mutation: {
            createClient: async (root, args, context) =>{
                const { lastname, firstname, address, birthday, createddate } = args.input;
                let client = db.client.create({ lastname, firstname, address, birthday, createddate });
                return client;
            },
            // createEvent: async (root, args, context) =>{
            //     const {  } = args.input;
            //     let event = db.event.create({})
            //     return event;
            // },
            // createCase_af: async(root, args, context) => {
            //     const { description,date_begin, status,date_end } = args.input;
            //     let case_af = db.case_af.create({ description,date_begin, status,date_end });
            //     return case_af;
            // },
    }
};




module.exports = {resolvers, DateTime};