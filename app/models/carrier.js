/**
 * Arquivo: parking.js
 * Author: Michel Ferreira Souza and Jonathan Nizer
 * Description: Arquivo onde trataremos o modelo do projeto.
 * Definição dos esquemas para serem utilizadas na Base de Dados (MongoDb)
 * Data: 05/12/2016
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarrierSchema = new Schema({
    board: { type: String, required: true }
});

module.exports = mongoose.model('Carrier', CarrierSchema);
