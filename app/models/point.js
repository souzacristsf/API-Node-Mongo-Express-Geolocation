/**
 * Arquivo: parking.js
 * Author: Michel Ferreira Souza and Jonathan Nizer
 * Description: Arquivo onde trataremos o modelo do projeto.
 * Definição dos esquemas para serem utilizadas na Base de Dados (MongoDb)
 * Data: 05/12/2016
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PointSchema = new Schema({
    data: { type: Date, default: Date.now },
    loc: {
    type: [Number],  // [<longitude>, <latitude>]
    index: '2d',    // create the geospatial index
    required: true
    }
  }
});

module.exports = mongoose.model('Point', PointSchema);
