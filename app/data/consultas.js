
//consulta responsavel por trazer dois documentos por ordem da distancia do ponto
/*
db.runCommand( { geoNear: "points",
                    near: [-48.66327524185181, -26.914531594671345 ],
                    spherical: true,
                    distanceMultiplier: 6378.1*1000

                  }  )

                  //query: { "loc": [-48.66990566253662, -26.91914265858154 ]  },
                  num: 10 //serve para limitar a quantidade de documentos

db.points.aggregate([
   {
   $geoNear: {
           near: [-48.665498793125145, -26.91680605897384 ],
           distanceField: "dist",
           distanceMultiplier: 6378.1,
           query: { "carrierId": post.carrierId },
           //limit: 2,
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
/*
consultar pela distancia
db.parkings.aggregate([
   {
     $geoNear: {
        near: { type: "Point", coordinates: [ -73.99279 , 40.719296 ] },
        distanceField: "dist.calculated",
        distanceMultiplier: 6378.1*1000,
        includeLocs: "dist.location",
        spherical: true
     }
   }
]).pretty()
*/
/*
regra do calculo para a velocidade entre dois ponto, pegar a distancia entre dois pontos e o tempo,
dividir a distancia pelo tempo e multiplicar por 3.6
*/

// -----------------------------------------------inserir estacionamentos ------------------------------------
/*
db.parkings.find(
   {
     area: {
        $nearSphere: {
           $geometry: {
              type : "Point",
              coordinates : [ -73.9667, 40.78 ]
           }
        }
     }
   }
)
*/
// db.parkings.createIndex({area: "2dsphere"});
//
db.parkings.insert({
  name: "univali",
  price: 15,
  area: {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -48.66589307785033,
              -26.917387223887733
            ],
            [
              -48.66589307785033,
              -26.916894549297925
            ],
            [
              -48.665217161178575,
              -26.916894549297925
            ],
            [
              -48.665217161178575,
              -26.917387223887733
            ],
            [
              -48.66589307785033,
              -26.917387223887733
            ]
          ]
        ]
      }
});

db.parkings.insert({
  name: "centro park",
  price: 10,
  area: {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -48.66700887680053,
              -26.91378538819522
            ],
            [
              -48.66700887680053,
              -26.913307048115687
            ],
            [
              -48.666322231292725,
              -26.913307048115687
            ],
            [
              -48.666322231292725,
              -26.91378538819522
            ],
            [
              -48.66700887680053,
              -26.91378538819522
            ]
          ]
        ]
      }
});

db.parkings.insert({
  name: "angeloni",
  price: 8,
  area: {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -48.66720199584961,
              -26.910934451358365
            ],
            [
              -48.66720199584961,
              -26.910264757765173
            ],
            [
              -48.66623640060425,
              -26.910264757765173
            ],
            [
              -48.66623640060425,
              -26.910934451358365
            ],
            [
              -48.66720199584961,
              -26.910934451358365
            ]
          ]
        ]
      }
});


db.parkings.insert({
  name: "park brusque",
  price: 20,
  area: {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -48.66177320480347,
              -26.910647440304917
            ],
            [
              -48.66177320480347,
              -26.909920342370217
            ],
            [
              -48.66089344024658,
              -26.909920342370217
            ],
            [
              -48.66089344024658,
              -26.910647440304917
            ],
            [
              -48.66177320480347,
              -26.910647440304917
            ]
          ]
        ]
      }
});
