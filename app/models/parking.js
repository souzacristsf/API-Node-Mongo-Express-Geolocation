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

//consulta responsavel por trazer dois documentos por ordem da distancia do ponto
/*
db.points.aggregate([
   {
   $geoNear: {
           near: [-48.665498793125145, -26.91680605897384 ],
           distanceField: "dist",
           distanceMultiplier: 6378.1,
           query: { "carrierId": post.carrierId },
           limit: 2,
           spherical: true
        }
   }
]).pretty()
*/


//radius = 3,963.2 miles or 6,378.1 kilometers.
/*
db.points.aggregate([
   {
     $geoNear: {
        near: [-48.665219843387604, -26.916997389317107 ],
        distanceField: "dist.calculated",
        query: { "carrierId": ObjectId("5848adf3e8b171167d8e16f1") },
        includeLocs: "dist.location",
        num: 2,
        spherical: true
     }
   }
])
*/



//essa consulta traz todos os documentos dentro de um determinado array de coordenadas
/*
box = [ [[-48.665555119514465, -26.917243726656398],
        [-48.665555119514465, -26.916751051440123],
        [-48.66487920284271,  -26.916751051440123],
        [-48.66487920284271,  -26.917243726656398],
        [-48.665555119514465, -26.917243726656398]]
      ];
db.points.find({
    "loc": {
      $geoWithin: {
        $geometry: {
          type : "Polygon" ,
          coordinates: box
        }
      }
    }
});
*/

//para criar um index utilizamos db.points.createIndex({loc: "2d"})
//pesquisa se tem esse ponto.
//db.points.find({loc: [ -48.66527080535889, -26.91697825629738 ]}).limit(2);

//pega os pontos mais proximos
//db.points.find({loc: {$near: [ -48.66527080535889, -26.91697825629738 ]}}).limit(2);

  // db.runCommand( {
  //    geoNear: "points",
  //    near : [-48.66667628288268, -26.916923248847592 ] ,
  //    spherical: true
  // } )

//retorna a quantidade de documentos proximos ao ponto enviado e por ordem da distancia crescente.
// db.runCommand( { geoNear: "points",
//                     near: [-48.665308356285095, -26.917164803101368 ],
//                     spherical: true,
//                     distanceMultiplier: 6378.1,
//                     query: { "carrierId" : ObjectId("5848adf3e8b171167d8e16f1") },
//                     num: 2 //serve para limitar a quantidade de documentos
//                   }  )

//faz uma consulta de um determinado id trazer o ponto mais proximo do mesmo
// db.runCommand(
//    {
//      geoNear: "points",
//      near: [ -48.665367364883416, -26.917162411477626 ],
//      spherical: true,
//      query: { "carrierId": ObjectId("5848adf3e8b171167d8e16f1") }
//    }
// )
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

/*
regra do calculo para a velocidade entre dois ponto, pegar a distancia entre dois pontos e o tempo,
dividir a distancia pelo tempo e multiplicar por 3.6
*/
