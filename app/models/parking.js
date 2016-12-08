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
    coords: { type: [Number], index: '2dsphere' }
  }
});

module.exports = mongoose.model('Parking', ParkingSchema);

// db.parkings.find(
//    {
//      area:
//        { $near :
//           {
//             $geometry: { type: "Polygon",  coordinates: [-48.66527080535889,-26.91697825629738] }
//           }
//        }
//    }
// ).pretty();


// db.parkings.createIndex({area: "2dsphere"});
//
// db.parkings.insert({
//   name: "univali",
//   price: 15,
//   area: {
//         "type": "Polygon",
//         "coordinates": [
//           [
//             [
//               -48.665555119514465,
//               -26.917243726656398
//             ],
//             [
//               -48.665555119514465,
//               -26.916751051440123
//             ],
//             [
//               -48.66487920284271,
//               -26.916751051440123
//             ],
//             [
//               -48.66487920284271,
//               -26.917243726656398
//             ],
//             [
//               -48.665555119514465,
//               -26.917243726656398
//             ]
//           ]
//         ]
//       }
// });
