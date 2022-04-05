const {db} = require('../database/database');
const {DateTime} = require("./scalar/datetime");

const resolvers = {
    Query: {
            clients: async () => db.client.findAll({include:[db.case_af]}),
            client: async (obj, args, context, info) => db.client.findByPk(args.id, {include:[db.case_af]}),
            // clientByName: async (obj, args, context, info) => db.users.findOne({where: {name: args.name}}),
            case_af: async (obj, args, context, info) => {
                 return db.case_af.findByPk(args.id,{include:[db.client, db.event]})    
            },
            case_afs: async () => {
                return db.case_af.findAll({include:[db.client, db.event]});
            },
            events: async () => db.event.findAll(),
            event: async (obj, args, context, info) => db.event.findByPk(args.id)
            
                // db.eq_client_case.findOne({where:{id_case: find.id }})
                
            
        },
    Mutation: {
            createClient: async (root, args, context) =>{
                const { lastname, firstname, address, birthDate, createdDate } = args.input;
                let client = db.client.create({ lastname, firstname, address, birthDate, createdDate });
                return client;
            },

            createEvent: async (root, args, context) =>{
                const { description,createdDate,duration,idCase } = args.input;
                let event = db.event.create({ description,createdDate,duration, idCase });
                return event;
            },

            createCase_af: async(root, args, context) => {
                const { description,startedAt, status,endedAt,code } = args.input;
                let case_af = db.case_af.create({ description,startedAt, status,endedAt, code });
                return case_af;
            },

            deleteEvent: async(root, args, context) => {
                db.event.destroy({where: {id:args.id}})
            },
            deleteCase_af: async(root, args, context) => {
                db.case_af.destroy({where: {id:args.id}})
            },
            deleteClient: async(root, args, context) => {
                db.client.destroy({where : {id:args.id}})
            },
            updateEvent: async(root, args, context) => {
                const { id,description,createdDate,duration,idCase } = args.input;
                db.event.update({
                               description:description,
                               createdDate:createdDate,
                               duration:duration,
                               idCase:idCase},{where: {id:id}});
                return "true";
            },
            updateCase_af: async(root, args, context) => {
                const { id, description,startedAt, status,endedAt,code } = args.input;
                db.case_af.update(
                    {
                    description:description, 
                    startedAt:startedAt,
                    status:status, 
                    code:code,
                    endedAt:endedAt},{where: {id:id}});
                return "true";
            },
            updateClient: async(root, args, context) => {
                const { id, lastname, firstname, address, birthDate, createdDate } = args.input;
                
                db.client.update({
                    lastname:lastname,
                    firstname:firstname,
                    address:address,
                    birthDate:birthDate,
                    createdDate:createdDate
                }, {where: {id:id}});

                return "true";
                // return db.client.findOne({where: {id:id}})
            },
            linkClientAff: async(root, args, context) => {
                const {caseAfId, clientId} = args.input;
                db.eq_client_case.create({caseAfId, clientId});
            }



    }
};




module.exports = {resolvers, DateTime};