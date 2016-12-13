/**
 * Arquivo: parking.js
 * Author: Michel Ferreira Souza and Jonathan Nizer
 * Description: Arquivo onde trataremos o modelo do projeto.
 * Definição dos esquemas para serem utilizadas na Base de Dados (MongoDb)
 * Data: 05/12/2016
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var ParkingSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Currency, required: true },
    area: { type: { type: String, "enum": [
            "Point",
            "MultiPoint",
            "LineString",
            "MultiLineString",
            "Polygon",
            "MultiPolygon"
        ] },
    coords: { type: [Number]}
  }
});

module.exports = mongoose.model('Parking', ParkingSchema);
