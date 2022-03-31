const Sequelize = require('sequelize');
const {client} = require("../models/client");
const {case_af} = require("../models/case_af");
const {event} = require("../models/event");
const {eq_client_case} = require("../models/eq_client_case");
const {db}  = require('../database/database');


 

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('eq_client_case', {}, { timestamps: false });
}