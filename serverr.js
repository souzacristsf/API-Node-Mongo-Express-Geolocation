/**
 * Arquivo: server.js
 * Descrição: Arquivo responsável por levantar o serviço do Node.Js para poder
 * executar a aplicação e a API através do Express.Js.
 * Author: Michel Ferreira Souza and Jonathan Nizer
 * Data de Criação: 06/12/2016
 */

//Base do Setup da Aplicação:

/* Chamada das Packages que iremos precisar para a nossa aplicação */
var express     = require('express'); //chamando o pacote express
var app         = express(); //definção da nossa aplicação através do express
var bodyParser  = require('body-parser');  //chamando o pacote body-parser
var mongoose = require('mongoose');
var moment = require('moment');
var User = require('./app/models/user');
var Carrier = require('./app/models/carrier');
var Point = require('./app/models/point');
var Parking = require('./app/models/parking');

//Configuração Base da Aplicação:
//====================================================================================

//mongoose.connect('mongodb://root:891866@jello.modulusmongo.net:27017/bonyW7yd');
mongoose.connect('mongodb://localhost/geolocation');

/** Configuração da variável 'app' para usar o 'bodyParser()'.
 * Ao fazermos isso nos permitirá retornar os dados a partir de um POST
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Definição da porta onde será executada a nossa aplicação */
var port = process.env.PORT || 8000;

//Rotas da nossa API:
//==============================================================

/* Aqui o 'router' irá pegar as instâncias das Rotas do Express */
var router  = express.Router();

/* Middleware para usar em todos os requests enviados para a nossa API- Mensagem Padrão */
router.use(function(req, res, next) {
    console.log('Algo está acontecendo aqui........');
    next(); //aqui é para sinalizar de que prosseguiremos para a próxima rota. E que não irá parar por aqui!!!
});

/* Rota de Teste para sabermos se tudo está realmente funcionando (acessar através: GET: http://localhost:8000/api) */
router.get('/', function(req, res) {
    res.json({ message: 'YEAH! Seja Bem-Vindo a nossa API' });
});

// router.route('/parking')
//
//     /* 1) Método: Criar Usuario (acessar em: POST http://localhost:8080/api/usuarios */
//     .post(function(req, res) {
//         var parking = new Parking();
//
//         // get coordinates [ <longitude> , <latitude> ]
//         var coords = [];
//         coords[0] = req.body.area.longitude || 0;
//         coords[1] = req.body.area.latitude || 0;
//
//         //aqui setamos os campos do usuario (que virá do request)
//         parking.name = req.body.name;
//         parking.price = req.body.price;
//         parking.area = { type: "Polygon", coordinates: coords };
//
//         console.log(parking);
//
//         parking.save(function(error, post) {
//             if(error)
//                 res.send(error);
//
//             // res.json({ message: 'Veiculo cadastrado com sucesso!!!' });
//             res.json(post);
//         });
//     })
//
//     /* 2) Método: Selecionar Todos (acessar em: GET http://locahost:8080/api/usuarios) */
//     .get(function(req, res) {
//
//         //Função para Selecionar Todos os 'usuarios' e verificar se há algum erro:
//         Parking.find(function(err, parking) {
//             if(err)
//                 res.send(err);
//
//             res.json(parking);
//         });
//     });

router.route('/point')

    /* 1) Método: Criar Usuario (acessar em: POST http://localhost:8080/api/usuarios */
    .post(function(req, res) {

        var point = {};
        // var parkings = new Parking();

        // get coordinates [ <longitude> , <latitude> ]
        var coords = [];
        coords[0] = parseFloat(req.body.loc.latitude) || 0;
        coords[1] = parseFloat(req.body.loc.longitude) || 0;

        // const documents = (post) => {
        //   var query = [{
        //       area: {
        //         $nearSphere: {
        //           $geometry: {
        //             type: "Point",
        //             coordinates: post.loc
        //           }
        //         }
        //       }},
        //       {
        //         "skip": 0, "limit": 2
        //       }
        //   ];
        //
        //   return Point.find(query).exec()
        // }

        const updateOne = (update) => {

        }

        const success = (post) => {

          var query = { area: {
              $geoIntersects: {
                 $geometry: {
                    type: "Point" ,
                    coordinates:  post.loc
                 }
              }
            }
          };
          return Parking.find(query).exec().then( (data) => {
            var query = [
               {
               $geoNear: {
                       near: post.loc,
                       distanceField: "dist",
                       distanceMultiplier: 6378.1,
                       query: { "carrierId": post.carrierId },
                       limit: 2,
                       spherical: true
                    }
               }
            ];
            const getDurationInMinutes = (previousData, currentData, index, array)  => {
              let ms = currentData.dataIn.getTime() - previousData.dataIn.getTime();
              return Math.abs(((ms) /1000) / 60);
              // return (((previousData.data.getTime() - (currentData.data.getTime())/1000))/60);
            //  return moment.utc(moment(currentData.data,"HH:mm:ss").diff(moment(previousData.data,"HH:mm:ss"))).format("HH:mm:ss")
            }

            const getDates = (previousData, currentData, index, array)  => {
                return (currentData.dist / (moment(previousData.dataIn).valueOf() - moment(currentData.dataIn).valueOf())) * 3.6;
            }

          return  Point.aggregate(query).exec().then( (dados) => {
              if(dados.length == 2){
                var speed = dados.reduce(getDates)
                // console.log(dados);
                var durationInMinutes = dados.reduce(getDurationInMinutes)
                // console.log(durationInMinutes.toString().replice('.',','))
                var queryUpdate = {
                  $set: {
                        dateOut: dados[0].dataIn,
                        durationInMinutes: durationInMinutes,
                        price: parseFloat((10/60)*durationInMinutes)//Math.round((10/60)*durationInMinutes).toFixed(2)
                      }
                };
                // console.log('dados',dados);
                // var id = { "_id": mongoose.Types.ObjectId(dados[1]._id) };
                var query = {dateOut: {$exists : false}};


                // console.log(id);

                Point.update(query ,queryUpdate).then( (data) => {
                    // console.log(data);
                })
                .catch( err => console.log(err))


                var result = {
                  _id: post._id,
                  dataIn: post.dataIn,
                  loc: post.loc,
                  carrierId: post.carrierId,
                  parking: data[0].name,
                  absoluteSpeed: speed
                };

                return result;
              }
              else {
                return result = {
                  _id: post._id,
                  dataIn: post.dataIn,
                  loc: post.loc,
                  carrierId: post.carrierId,
                  parking: data[0].name,
                  absoluteSpeed: 0
                };
              }
            })
          }).catch((error) => res.send(error))
        }

        //aqui setamos os campos do usuario (que virá do request)
        point.loc = coords;
        point.carrierId = req.body.carrierId;

        Point.create(point)
          .then(success)
          .then( (data) => {
            return res.status(200).json(data);
          })
          .catch((error) => res.send(error))
    })



    /* 2) Método: Selecionar Todos (acessar em: GET http://locahost:8080/api/usuarios) */
    .get(function(req, res) {

        //Função para Selecionar Todos os 'usuarios' e verificar se há algum erro:
        Point.find({carrierId: req.body.carrierId}).exec().then( data => {
            res.json(data);
        }).catch((error) => res.send(error))
    });

router.route('/carrier')

    /* 1) Método: Criar carrier (acessar em: POST http://localhost:8080/api/carrier */
    .post(function(req, res) {
        var carrier = new Carrier();

        //aqui setamos os campos do usuario (que virá do request)
        carrier.board = req.body.board;

        carrier.save(function(error, post) {
            if(error)
                res.send(error);

            // res.json({ message: 'Veiculo cadastrado com sucesso!!!' });
            res.json(post);
        });
    })

    /* 2) Método: Selecionar Todos (acessar em: GET http://locahost:8080/api/carrier) */
    .get(function(req, res) {

        //Função para Selecionar Todos os 'usuarios' e verificar se há algum erro:
        Carrier.find(function(err, carrier) {
            if(err)
                res.send(err);

            res.json(carrier);
        });
    });

// Rotas que irão terminar em '/usuarios' - (servem tanto para: GET All & POST)
router.route('/user')

    /* 1) Método: Criar Usuario (acessar em: POST http://localhost:8080/api/usuarios */
    .post(function(req, res) {
        var user = new User();

        //aqui setamos os campos do usuario (que virá do request)
        user.nome = req.body.nome;
        user.login = req.body.login;
        user.senha = req.body.senha;

        user.save(function(error) {
            if(error)
                res.send(error);

            res.json({ message: 'Usuário criado!' });
        });
    })

    /* 2) Método: Selecionar Todos (acessar em: GET http://locahost:8080/api/usuarios) */
    .get(function(req, res) {

        //Função para Selecionar Todos os 'usuarios' e verificar se há algum erro:
        User.find(function(err, user) {
            if(err)
                res.send(err);

            res.json(user);
        });
    });
    // Rotas que irão terminar em '/usuarios/:usuario_id' - (servem tanto para GET by Id, PUT, & DELETE)
    router.route('/user/:user_id')

        /* 3) Método: Selecionar Por Id (acessar em: GET http://localhost:8080/api/usuarios/:usuario_id) */
        .get(function(req, res) {

            //Função para Selecionar Por Id e verificar se há algum erro:
            User.findById(req.params.user_id, function(error, user) {
                if(error)
                    res.send(error);

                res.json(user);
            });
        })

        /* 4) Método: Atualizar (acessar em: PUT http://localhost:8080/api/usuarios/:usuario_id) */
        .put(function(req, res) {

           //Primeiro: Para atualizarmos, precisamos primeiro achar o Usuario. Para isso, vamos selecionar por id:
           User.findById(req.params.user_id, function(error, user) {
               if(error)
                   res.send(error);

               //Segundo: Diferente do Selecionar Por Id... a resposta será a atribuição do que encontramos na classe modelo:
               user.nome = req.body.nome;
               user.login = req.body.login;
               user.senha = req.body.senha;

               //Terceiro: Agora que já atualizamos os campos, precisamos salvar essa alteração....
               user.save(function(error) {
                   if(error)
                       res.send(error);

                   res.json({ message: 'Usuário Atualizado!' });
               });
           });
        })

        /* 5) Método: Excluir (acessar em: http://localhost:8080/api/usuarios/:usuario_id) */
       .delete(function(req, res) {

           //Função para excluir os dados e também verificar se há algum erro no momento da exclusão:
           User.remove({
           _id: req.params.user_id
           }, function(error) {
               if(error)
                   res.send(error);

               res.json({ message: 'Usuário excluído com Sucesso! '});
           });
       });

/* Todas as nossas rotas serão prefixadas com '/api' */
app.use('/api', router);

//Iniciando o Servidor (Aplicação):
//==============================================================
app.listen(port);
console.log('Iniciando a aplicação na porta ' + port);
