var syzet = [];
var syzetD = [];
var syzetO = [];
var syzetK = [];
var syzetL = [];
var syzetSearch = [];
var mailer = require('nodemailer');
var pg = require('pg');
var connectionStr = 'postgres://dekixmpqcprkpu:MNbCC56WQ1ZaNRqX8GHmTBaUv-@ec2-23-21-55-25.compute-1.amazonaws.com:5432/d3fn4lugik4eop';
pg.defaults.ssl = true;

exports.getCmimiFilter = function (req, res, next) {

    pg.connect(connectionStr, function(err, client) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgres! 1');

      client
        .query('SELECT * FROM cmimifilter ')
        .on('end',function(end){
          res.send(end);
          client.end();
        });
    });
    pg.end(function(err) {
        if (err) throw err;
        console.log('closed connection');
    });

};

exports.findAll = function (req, res, next) {
  //TODO : in localhost the response stucks at offset = 180, if the same thing happens in Heroku
  //TODO : than it means that the function needs to be changed in  order to handle all request
    var offset = parseInt(req.body.offset);
    var response;
    console.log(offset);
    pg.connect(connectionStr, function(err, client) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgres! 1');

      client
        .query('SELECT products2.grupi, products2.kodartikulli,products2.kodifikimartikulli2,products2.pershkrimartikulli, cmime2.cmimi, cmime2.monedha FROM products2 INNER JOIN cmime2 ON (products2.kodartikulli=cmime2.idprodukti) WHERE products2.grupi=\'Syze Dielli\'  limit 20 offset ' + offset)
        .on('row', function(row) {
          syzet.push(row);
          console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        }).on('end',function(){
          //console.log(syzet.length);
          if(offset !== 0){
            response = syzet.splice(0,offset);
          }else{
            response = syzet;
          }

          //console.log('------------------ ',response.length);
          //console.log(response);
          res.send(response);
          client.end();
        });
    });
    pg.end(function(err) {
        if (err) throw err;
        console.log('closed connection');
    });
    console.log('too early');
    //res.send(products2);
    console.log('test');
    //console.log(products2);
};


exports.findAllDielli = function (req, res, next) {
  //TODO : in localhost the response stucks at offset = 180, if the same thing happens in Heroku
  //TODO : than it means that the function needs to be changed in  order to handle all request
    var offset = parseInt(req.body.offset);
    var responseD;
    console.log(offset);
    pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgres! 2');

      client
        .query('SELECT DISTINCT ON (products2.pershkrimiangartikulli) * FROM products2 INNER JOIN cmime2 ON (products2.kodartikulli=cmime2.idprodukti) INNER JOIN magazina ON (products2.kodartikulli=magazina.kodartikull) WHERE magazina.sasia>0 AND products2.grupi=\'Syze Dielli\'  limit 20 offset ' + offset)
        .on('row', function(row) {
          syzetD.push(row);
          console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        }).on('end',function(){
          console.log(syzetD.length);
          if(offset !== 0){
            responseD = syzetD.splice(0,offset);
          }else{
            responseD = syzetD;
          }

          console.log('------------------ ',responseD.length);
          console.log(responseD);
          res.send(responseD);
          client.end();
          done();
        });
    });
    pg.end(function(err) {
        if (err) throw err;
        console.log('closed connection');
    });
    syzetD = [];
    console.log('too early');
    //res.send(products2);
    console.log('test');
    //console.log(products2);
};

exports.getSlider1 = function (req, res, next) {
  //TODO : in localhost the response stucks at offset = 180, if the same thing happens in Heroku
  //TODO : than it means that the function needs to be changed in  order to handle all request
    var offset = parseInt(req.body.offset);
    var responseD;
    console.log(offset);
    pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgres! slider 1');

      client
        .query('SELECT DISTINCT ON (products2.pershkrimiangartikulli) * FROM products2 INNER JOIN cmime2 ON (products2.kodartikulli=cmime2.idprodukti) INNER JOIN magazina ON (products2.kodartikulli=magazina.kodartikull) WHERE magazina.sasia>0 AND products2.marka=\'slider1\' AND products2.grupi=\'Syze Dielli\'  limit 20 offset ' + offset)
        .on('row', function(row) {
          syzetD.push(row);
          console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        }).on('end',function(){
          console.log(syzetD.length);
          if(offset !== 0){
            responseD = syzetD.splice(0,offset);
          }else{
            responseD = syzetD;
          }

          console.log('------------------ ',responseD.length);
          console.log(responseD);
          res.send(responseD);
          client.end();
          done();
        });
    });
    pg.end(function(err) {
        if (err) throw err;
        console.log('closed connection');
    });
    syzetD = [];
    console.log('too early');
    //res.send(products2);
    console.log('test');
    //console.log(products2);
};

exports.getSlider2 = function (req, res, next) {
  //TODO : in localhost the response stucks at offset = 180, if the same thing happens in Heroku
  //TODO : than it means that the function needs to be changed in  order to handle all request
    var offset = parseInt(req.body.offset);
    var responseD;
    console.log(offset);
    pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgres! slider 1');

      client
        .query('SELECT DISTINCT ON (products2.pershkrimiangartikulli) * FROM products2 INNER JOIN cmime2 ON (products2.kodartikulli=cmime2.idprodukti) INNER JOIN magazina ON (products2.kodartikulli=magazina.kodartikull) WHERE magazina.sasia>0 AND products2.marka=\'slider2\' AND products2.grupi=\'Syze Dielli\'  limit 20 offset ' + offset)
        .on('row', function(row) {
          syzetD.push(row);
          console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        }).on('end',function(){
          console.log(syzetD.length);
          if(offset !== 0){
            responseD = syzetD.splice(0,offset);
          }else{
            responseD = syzetD;
          }

          console.log('------------------ ',responseD.length);
          console.log(responseD);
          res.send(responseD);
          client.end();
          done();
        });
    });
    pg.end(function(err) {
        if (err) throw err;
        console.log('closed connection');
    });
    syzetD = [];
    console.log('too early');
    //res.send(products2);
    console.log('test');
    //console.log(products2);
};
exports.findAllOptike = function (req, res, next) {
  //TODO : in localhost the response stucks at offset = 180, if the same thing happens in Heroku
  //TODO : than it means that the function needs to be changed in  order to handle all request
    var offset = parseInt(req.body.offset);
    var responseO;
    console.log(offset);
    pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgres! 4');

      client
        .query('SELECT DISTINCT ON (products2.pershkrimiangartikulli) * FROM products2 INNER JOIN cmime2 ON (products2.kodartikulli=cmime2.idprodukti) INNER JOIN magazina ON (products2.kodartikulli=magazina.kodartikull) WHERE magazina.sasia>0 AND products2.grupi=\'Syze Optike\'  limit 20 offset ' + offset)
        .on('row', function(row) {
          syzetO.push(row);
          console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        }).on('end',function(){
          console.log(syzetO.length);
          if(offset !== 0){
            responseO = syzetO.splice(0,offset);
          }else{
            responseO = syzetO;
          }

          console.log('------------------ ',responseO.length);
          console.log(responseO);
          res.send(responseO);
          client.end();
          done();
        });
    });
    pg.end(function(err) {
        if (err) throw err;
        console.log('closed connection');
    });
    syzetO = [];
    console.log('too early');
    //res.send(products2);
    console.log('test');
    //console.log(products2);
};
exports.findAllKoleksion = function (req, res, next) {
  //TODO : in localhost the response stucks at offset = 180, if the same thing happens in Heroku
  //TODO : than it means that the function needs to be changed in  order to handle all request
    var offset = parseInt(req.body.offset);
    var responseK;
    console.log(offset);
    pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgres! 4');

      client
        .query('SELECT DISTINCT ON (products2.pershkrimiangartikulli) * FROM products2 INNER JOIN cmime2 ON (products2.kodartikulli=cmime2.idprodukti) INNER JOIN magazina ON (products2.kodartikulli=magazina.kodartikull) WHERE magazina.sasia>0 AND products2.grupi=\'Aksesorë\'  limit 20 offset ' + offset)
        .on('row', function(row) {
          syzetK.push(row);
          console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        }).on('end',function(){
          console.log(syzetK.length);
          if(offset !== 0){
            responseK = syzetK.splice(0,offset);
          }else{
            responseK = syzetK;
          }

          console.log('------------------ ',responseK.length);
          console.log(responseK);
          res.send(responseK);
          client.end();
          done();
        });
    });
    pg.end(function(err) {
        if (err) throw err;
        console.log('closed connection');
    });
    syzetK = [];
    console.log('too early');
    //res.send(products2);
    console.log('test');
    //console.log(products2);
};
exports.findAllLente = function (req, res, next) {
  //TODO : in localhost the response stucks at offset = 180, if the same thing happens in Heroku
  //TODO : than it means that the function needs to be changed in  order to handle all request
    var offset = parseInt(req.body.offset);
    var marka = req.body.markaa;
    console.log('marka eshte '+marka);
    console.log(marka);
    var responseL;
    console.log(offset);
    var queryTextLente='SELECT * FROM products2 INNER JOIN cmime2 ON (products2.kodartikulli=cmime2.idprodukti) INNER JOIN magazina ON (products2.kodartikulli=magazina.kodartikull) WHERE magazina.sasia>0 and products2.kodifikimartikulli2=\''+marka+'\' and products2.grupi=\'Lente Kontakti\'  limit 20 offset ' + offset;
    pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgres! 5');

      client
        .query(queryTextLente)
        .on('row', function(row) {
          syzetL.push(row);
          console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        }).on('end',function(){
          console.log(syzetL.length);
          if(offset !== 0){
            responseL = syzetL.splice(0,offset);
          }else{
            responseL = syzetL;
          }

          console.log('------------------ ',responseL.length);
          console.log(responseL);
          res.send(responseL);
          client.end();
          done();
        });
    });
    pg.end(function(err) {
        if (err) throw err;
        console.log('closed connection');
    });
    syzetL = [];
    console.log('too early');
    //res.send(products2);
    console.log('test');
    //console.log(products2);
};

exports.findAllSearch = function (req, res, next) {
  //TODO : in localhost the response stucks at offset = 180, if the same thing happens in Heroku
  //TODO : than it means that the function needs to be changed in  order to handle all request
    var kerkimiFjala = req.body.kerkimiFjala;
    var responseSearch;
    var offset=20;
    var kerkimiFjala2=[];
    kerkimiFjala2=kerkimiFjala.split(",");

    console.log(kerkimiFjala2);
    console.log(typeof(kerkimiFjala2));

    var params = [];
      for(var i = 0; i < kerkimiFjala2.length; i++) {
        console.log(i);
        if (i!=kerkimiFjala2.length-1) {
        params.push('products2.kodartikulli ILIKE \'%' + kerkimiFjala2[i] +'%\' OR products2.grupi ILIKE \'%' + kerkimiFjala2[i] +'%\' OR products2.pershkrimartikulli ILIKE \'%' + kerkimiFjala2[i] +'%\' OR products2.kodifikimartikulli2 ILIKE \'%' + kerkimiFjala2[i] +'%\' OR ');
        }else {
          // params.push('products2.kodartikulli LIKE \'%' + kerkimiFjala2[i] +'%\'');
          // params.push('products2.kodartikulli LIKE \'%' + kerkimiFjala2[i] +'%\' OR products2.grupi LIKE \'%' + kerkimiFjala2[i] +'%\'');
          params.push('products2.kodartikulli ILIKE \'%' + kerkimiFjala2[i] +'%\' OR products2.grupi ILIKE \'%' + kerkimiFjala2[i] +'%\' OR products2.pershkrimartikulli ILIKE \'%' + kerkimiFjala2[i] +'%\' OR products2.kodifikimartikulli2 ILIKE \'%' + kerkimiFjala2[i] +'%\' ');
        }
      }

    // var queryTextS = 'SELECT distinct on(products2.kodartikulli) products2.kodartikulli, products2.grupi, products2.kodifikimartikulli2,products2.pershkrimartikulli, cmime2.cmimi, cmime2.monedha FROM products2 INNER JOIN cmime2 ON (products2.kodartikulli=cmime2.idprodukti) WHERE ' + params.join(' ') + ' ORDER BY products2.kodartikulli';

    var queryTextS = 'SELECT distinct on(products2.kodartikulli) * FROM products2 INNER JOIN cmime2 ON (products2.kodartikulli=cmime2.idprodukti) WHERE ' + params.join(' ') + ' ORDER BY products2.kodartikulli';

    console.log(queryTextS);
    
    pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgres! 6');

      client
        .query(queryTextS)
        .on('row', function(row) {
          syzetSearch.push(row);
          console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        }).on('end',function(){
          console.log(syzetSearch.length);
          // if(offset !== 0){
          //   responseSearch = syzetSearch.splice(0,offset);
          // }else{
          //   responseSearch = syzetSearch;
          // }
          responseSearch = syzetSearch;

          console.log('------------------ ',responseSearch.length);
          console.log(responseSearch);
          res.send(responseSearch);
          client.end();
          done();
          syzetSearch=[];
        });
    });
    pg.end(function(err) {
        if (err) throw err;
        console.log('closed connection');
    });
    console.log('too early');
    //res.send(products2);
    console.log('test');
    //console.log(products2);
};

exports.regjistroUser = function (req, res, next) {
  //TODO : in localhost the response stucks at offset = 180, if the same thing happens in Heroku
  //TODO : than it means that the function needs to be changed in  order to handle all request
    var emer = req.body.emer;
    var mbiemer = req.body.mbiemer;
    var tel = req.body.tel;
    var email = req.body.email;
    var fjalekalimi = req.body.fjalekalimi;
    var date = req.body.date;

    var queryTextRegister = 'insert into users(name,username,password,emailval) values(\''+emer+'\',\''+emer+'.'+mbiemer+'\',\''+fjalekalimi+'\',\''+email+'\')';
    var queryTextEmailCheck = 'SELECT * FROM users WHERE emailval = \''+email+'\'';
    //var queryTextRegisterClients = 'insert into clients(emer,mbiemer,mosha,gjinia,vendlindja,celular,email,user_id) values(\''+emer+'\',\''+emer+'.'+mbiemer+'\',\''+tel+'\',\''+email+'\',\''+fjalekalimi+'\',\''+date+'\')';
    

    // console.log(queryTextRegister);
    console.log(queryTextEmailCheck);
    var emailNjejt = [];
    var emailNjejt2 = [];
    var sukses;
    
    pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgres! 7');

      client
        .query(queryTextEmailCheck)
        .on('row', function(row) {
          emailNjejt.push(row);
          // done();
          // client.end();
      }).on('end',function(){
          console.log(emailNjejt);
          if (emailNjejt.length==0) {
            console.log('bosh');

            client.query(queryTextRegister, function(err, result, done) {
              if (err) {
                console.log(err);
              } else {
                console.log("brenda 1");
                    //client.end();
                    //done();
                  //   client.query(queryTextEmailCheck, function(err, result, done) {
                  //     if (err) {
                  //       console.log(err);
                  //     } else {
                  //       //console.log('Regjistrimi perfundoi me sukses');
                  //       //res.send(JSON.stringify({regjistrimi:1}));
                  //       //client.end();
                  //       console.log(result.id);
                  //       console.log("brenda2")
                  //     }

                  // });


                   client
                    .query(queryTextEmailCheck)
                    .on('row', function(row) {
                      emailNjejt2.push(row);
                      // done();
                      // client.end();
                  }).on('end',function(){
                     //console.log(emailNjejt2);
                     //console.log("brenda2");
                     //console.log(emailNjejt2[0].id);

                     var queryTextRegisterClients = 'insert into clients(emer,mbiemer,mosha,gjinia,vendlindja,celular,email,user_id) values(\''+emer+'\',\''+mbiemer+'\',\'0\',\'a\',\'Pa Percaktuar\',\''+tel+'\',\''+email+'\',\''+emailNjejt2[0].id+'\')';



                     client.query(queryTextRegisterClients, function(err, result, done) {
                      if (err) {
                        console.log(err);
                      } else {

                        console.log('u shtuan tek klientet');
                        console.log('Regjistrimi perfundoi me sukses');
                        res.send(JSON.stringify({regjistrimi:1}));
                        // client.end();
                        //done();
                      }
                      });


                  });



                
              }

            });

          }else {
            console.log('jo bosh');
            res.send(JSON.stringify({regjistrimi:0}));
            //client.end();
          }
          //done();
        });

      // done();
    });
    pg.end(function(err) {
        if (err) throw err;
        console.log('closed connection');
    });
    // res.send(sukses);
    console.log('too early');
    //res.send(products2);
    console.log('test');
    //console.log(products2);
};


exports.modifikoUser = function (req, res, next) {
  //TODO : in localhost the response stucks at offset = 180, if the same thing happens in Heroku
  //TODO : than it means that the function needs to be changed in  order to handle all request
    var emer = req.body.emer;
    var mbiemer = req.body.mbiemer;
    var tel = req.body.tel;
    var email = req.body.email;


    //var queryTextRegister = 'insert into users(name,username,password,emailval) values(\''+emer+'\',\''+emer+'.'+mbiemer+'\',\''+fjalekalimi+'\',\''+email+'\')';
    // update users set name='alfred2' ,  username='alfred2.gjini' where emailval='sdvb@gmail.com'
    var queryTextupdateUsers = 'update users set name=\''+emer+'\', username=\''+emer+'.'+mbiemer+'\' where emailval=\''+email+'\'';
    var queryTextupdateClients = 'update clients set emer=\''+emer+'\', mbiemer=\''+mbiemer+'\' , celular=\''+tel+'\' where email=\''+email+'\'';
    // var queryTextEmailCheck = 'SELECT * FROM users WHERE emailval = \''+email+'\'';
    //var queryTextRegisterClients = 'insert into clients(emer,mbiemer,mosha,gjinia,vendlindja,celular,email,user_id) values(\''+emer+'\',\''+emer+'.'+mbiemer+'\',\''+tel+'\',\''+email+'\',\''+fjalekalimi+'\',\''+date+'\')';
    

    // console.log(queryTextRegister);
    console.log(queryTextupdateUsers);
    var emailNjejt = [];
    var emailNjejt2 = [];
    var sukses;
    
    pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgres! 7');

      client
        .query(queryTextupdateUsers)
        .on('end',function(){
          console.log("mbaroi e para");

            client.query(queryTextupdateClients, function(err, result, done) {
              if (err) {
                console.log(err);
              } else {
                console.log("mbaroi e dyta");


              }

            });


            console.log('jo bosh');
            res.send(JSON.stringify({regjistrimi:1}));
            //client.end();
    
          //done();
        });

      // done();
    });
    pg.end(function(err) {
        if (err) throw err;
        console.log('closed connection');
    });
    // res.send(sukses);
    console.log('too early');
    //res.send(products2);
    console.log('test');
    //console.log(products2);
};


exports.loginUser = function (req, res, next) {
  //TODO : in localhost the response stucks at offset = 180, if the same thing happens in Heroku
  //TODO : than it means that the function needs to be changed in  order to handle all request
    var email = req.body.email;
    var fjalekalimi = req.body.fjalekalimi;

    var queryTextEmailAndPassCheck = 'SELECT * FROM users INNER JOIN clients ON (users.id=clients.user_id) WHERE users.emailval = \''+email+'\' AND users.password = \''+fjalekalimi+'\' ';
    // var queryTextEmailAndPassCheck = 'SELECT * FROM users WHERE emailval = \''+email+'\' AND password = \''+fjalekalimi+'\' ';
    // console.log(queryTextRegister);
    console.log(queryTextEmailAndPassCheck);
    var emailNjejtPass = [];
    var sukses;
    
    pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgres! 8');

      client
        .query(queryTextEmailAndPassCheck)
        .on('row', function(row) {
          emailNjejtPass.push(row);
          // done();
          // client.end();
      }).on('end',function(){
          // console.log(emailNjejtPass);
          if (emailNjejtPass.length==0) {
            console.log('bosh');
            console.log('Ky user nuk u gjet');
            var login = {login:0};
            emailNjejtPass.push(login);
            // console.log(emailNjejtPass);

            res.send(emailNjejtPass);


          }else {
            console.log('jo bosh');
            // res.send(JSON.stringify({login:1}));
            emailNjejtPass[0].login=1;
            // console.log(emailNjejtPass);
            res.send(emailNjejtPass);
            client.end();
            console.log('Ky user ekziston');
          }
          done();
        });

      // done();
    });
    pg.end(function(err) {
        if (err) throw err;
        console.log('closed connection');
    });
    // res.send(sukses);
    console.log('too early');
    //res.send(products2);
    console.log('test');
    //console.log(products2);
};


exports.forgotPassword = function (req, res, next) {
  //TODO : in localhost the response stucks at offset = 180, if the same thing happens in Heroku
  //TODO : than it means that the function needs to be changed in  order to handle all request
    var email = req.body.email;


    var queryEmailCheck = 'SELECT * FROM users WHERE emailval = \''+email+'\'';
    // console.log(queryTextRegister);
    console.log(queryEmailCheck);
    var passData = [];
    var sukses;
    // var transporter = mailer.createTransport('smtps://tarzanprenga17%40gmail.com:M3tall1ca!@smtp.gmail.com');
          var transporter = mailer.createTransport( {
        host: "smtp.gmail.com", // hostname
        secureConnection: true, // use SSL
        port: 465, // port for secure SMTP
        auth: {
            user: "maxoptikasmtp@gmail.com",
            pass: "maxoptika.1A"
        }
    });
    //     var transporter = mailer.createTransport( {
    //     host: "smtp-mail.outlook.com", // hostname
    //     secureConnection: true, // use SSL
    //     port: 587, // port for secure SMTP
    //     auth: {
    //         user: "maxoptikasmtpnew@outlook.com",
    //         pass: "maxoptika.1A"
    //     }
    // });
    var mailOptions = {
      from: '"MaxOptika App" <maxoptikasmtpnew@outlook.com>', // sender address
      to: 'agjini@dea.com.al', // list of receivers
      subject: 'Rikthim Fjalekalimi!', // Subject line
      text: 'Hello world', // plaintext body
      html: 'First Html body!'// html body
    };
    
    pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgres! 8');

      client
        .query(queryEmailCheck)
        .on('row', function(row) {
          passData.push(row);
          // done();
          // client.end();
      }).on('end',function(){
          // console.log(emailNjejtPass);
          if (passData.length==0) {
            console.log('bosh');
            console.log('Ky user nuk u gjet');
            res.send(JSON.stringify({forgot:0}));


          }else {
            console.log('jo bosh');
            // res.send(JSON.stringify({login:1}));
            passData[0].forgot=1;
            console.log(passData);
            // Send Email
            // mailOptions.to='\''+passData[0].email+'\'';
            mailOptions.to=passData[0].emailval;
            // mailOptions.html = 'Pershendetje!</b><br>Klienti ' + passData[0].emer + " " + passData[0].mbiemer + " kerkon te rezervoje nje takim si meposhte.<br><br>"+ "<b>Data</b> : " + passData[0].fjalekalimi + "<br><b>Ora</b> : "+ passData[0].fjalekalimi + "<br>" + "<b>Dyqani</b> : " + passData[0].fjalekalimi + "<br><b>Shenime</b> : " + passData[0].fjalekalimi + "<br><b>Celular</b> : " + passData[0].fjalekalimi + "<br><br><br><i>Powered by <a href='http://dea.com.al'>DEA</a><i>"// html body
            mailOptions.html = 'Pershendetje ' + passData[0].name  + " <br>Fjalekalimi juaj eshte si me poshte.<br><br>"+ "<b>Fjalekalimi</b> : " + passData[0].password + "<br><br><br><i>Powered by <a href='http://dea.com.al'>DEA</a><i>"// html body
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                  res.send(JSON.stringify({forgot:2}));
                  console.log(error);
                }else{
                  res.send(JSON.stringify({forgot:1}));
                  console.log('Message sent: ' + info.response);
                }
                
            });

            // res.send(JSON.stringify({forgot:1}));
            client.end();
            console.log('Ky user ekziston');
          }
          done();
        });

      // done();
    });
    pg.end(function(err) {
        if (err) throw err;
        console.log('closed connection');
    });
    // res.send(sukses);
    console.log('too early');
    //res.send(products2);
    console.log('test');
    //console.log(products2);
};


exports.pickUpStore = function (req, res, next) {
  //TODO : in localhost the response stucks at offset = 180, if the same thing happens in Heroku
  //TODO : than it means that the function needs to be changed in  order to handle all request
    var emer = req.body.emer;
    var mbiemer = req.body.mbiemer;
    var tel = req.body.tel;
    var email = req.body.email;
    var emailTo = req.body.emailTo;
    var eailToCorrect='';
    var shportaElem = req.body.shportaElem;
    var dyqani=req.body.dyqani;
    var elementet=req.body.response;
    var sasiaBlerjes=req.body.example;
    console.log(elementet);
    console.log('hapsireeee');
    console.log(sasiaBlerjes);
    elementet=JSON.parse(elementet);
    sasiaBlerjes=JSON.parse(sasiaBlerjes);
    console.log(typeof elementet);

    elementet.forEach( function(element, index) {
      sasiaBlerjes[element.kodartikull]=element.sasia-sasiaBlerjes[element.kodartikull];
    });
    //elementet=JSON.stringify(elementet);
    //console.log(elementet);
    //sasiaBlerjes=JSON.stringify(sasiaBlerjes);
    //console.log(sasiaBlerjes);

    //     update test as t set
    //     column_a = c.column_a
    // from (values
    //     ('123', 1),
    //     ('345', 2)  
    // ) as c(column_b, column_a) 
    // where c.column_b = t.column_b;
    var result = "(";

    for (var p in sasiaBlerjes) {
    if( sasiaBlerjes.hasOwnProperty(p) ) {
      result += "'"+p + "' , " + sasiaBlerjes[p] + "),(";
    } 
  }



  console.log(result);
  result=result.slice(0, -2);
  console.log(result);
  //sasiaBlerjes=JSON.stringify(sasiaBlerjes);
  //console.log(sasiaBlerjes);
  //var query_text="update magazina as t set sasia=c.sasia from (values "+result+" ) as c(kodartikull, sasia) where c.kodartikull=t.kodartikull";
  //console.log(query_text);



    if (dyqani=="21 Dhjetori") {
      eailToCorrect='21dhjetori@maxoptika.al';
    }else if(dyqani=="Sheshi Willson") {
      eailToCorrect='sheshi.wilson@maxoptika.al';
    }else if(dyqani=="Myslym Shyri") {
      eailToCorrect='m.shyri@maxoptika.al';
    }else if(dyqani=="City Park") {
      eailToCorrect='citypark@maxoptika.al';
    }else if(dyqani=="QTU") {
      eailToCorrect='qtu@maxoptika.al';
    }else if(dyqani=="Durres") {
      eailToCorrect='durres@maxoptika.al';
    }else if(dyqani=="Shkoder") {
      eailToCorrect='shkoder@maxoptika.al';
    }else if(dyqani=="Vlore") {
      eailToCorrect='vlore@maxoptika.al';
    }else if(dyqani=="Fier") {
      eailToCorrect='fier@maxoptika.al';
    }else if(dyqani=="Sarandë") {
      eailToCorrect='maxoptika.sarande@gmail.com';
    }else if(dyqani=="Lushnje") {
      eailToCorrect='lushnje@maxoptika.al';
    }else if(dyqani=="Pogradec") {
      eailToCorrect='maxoptika.pogradec@gmail.com';
    }else if(dyqani=="Medrese") {
      eailToCorrect='medrese@maxoptika.al';
    }else if(dyqani=="Prishtine") {
      eailToCorrect='prishtine@maxoptika.al';
    }else if(dyqani=="Minimax") {
      eailToCorrect='prishtine@maxoptika.al';
    }else if(dyqani=="Lezhe") {
      eailToCorrect='lezhe@maxoptika.al';
    }else if(dyqani=="Kruje") {
      eailToCorrect='maxoptika.kruje@gmail.com';
    }else if(dyqani=="Korce") {
      eailToCorrect='korce@maxoptika.al';
    }else if(dyqani=="test") {
      eailToCorrect='alfred.gjini93@gmail.com';
    }else{
      eailToCorrect='agjini@dea.com.al';
    }
    console.log(eailToCorrect);
    var qendraMax="online@maxoptika.al";
    //var qendraMax="a.gjini@live.com";
    var toAllCorrectEmails=qendraMax+","+eailToCorrect+","+email;
    console.log(toAllCorrectEmails);

    pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }

  //var query_text="update magazina as t set sasia=c.sasia from (values "+result+" ) as c(kodartikull, sasia) where c.kodartikull=t.kodartikull";
  //console.log(query_text);


      var queryTextupdateOrders="update magazina as t set sasia=c.sasia from (values "+result+" ) as c(kodartikull, sasia) where c.kodartikull=t.kodartikull";
      console.log(queryTextupdateOrders);
      client.query(queryTextupdateOrders, function(err, result, done) {
        if (err) {
          console.log(err);
        } else {
          //console.log("mbaroi e dyta");
          // responseSh.pergjigje1=end.rows["0"];
          // responseSh.pergjigje2='sukses';
          //console.log(result);

              console.log(emer+' '+mbiemer+' '+tel+' '+email+' '+eailToCorrect+' '+shportaElem+' '+dyqani);

            // var transporter = mailer.createTransport('smtps://tarzanprenga17%40gmail.com:M3tall1ca!@smtp.gmail.com');
              var transporter = mailer.createTransport( {
                host: "smtp.gmail.com", // hostname
                secureConnection: true, // use SSL
                port: 465, // port for secure SMTP
                auth: {
                    user: "maxoptikasmtp@gmail.com",
                    pass: "maxoptika.1A"
                }
            });

          var mailOptions = {
            from: '"MaxOptika App" <maxoptikasmtpnew@outlook.com>', // sender address
            to: toAllCorrectEmails, // list of receivers
            subject: 'Pick Up On Store!', // Subject line
            text: 'Hello world', // plaintext body
            html: 'First Html body!'// html body
          };
          
          // mailOptions.to=passData[0].email;
          // mailOptions.html = 'Pershendetje!</b><br>Klienti ' + passData[0].emer + " " + passData[0].mbiemer + " kerkon te rezervoje nje takim si meposhte.<br><br>"+ "<b>Data</b> : " + passData[0].fjalekalimi + "<br><b>Ora</b> : "+ passData[0].fjalekalimi + "<br>" + "<b>Dyqani</b> : " + passData[0].fjalekalimi + "<br><b>Shenime</b> : " + passData[0].fjalekalimi + "<br><b>Celular</b> : " + passData[0].fjalekalimi + "<br><br><br><i>Powered by <a href='http://dea.com.al'>DEA</a><i>"// html body
          mailOptions.html = 'Pershendetje <br> Klienti ' + emer + " " + mbiemer + " me nr.tel: "+tel +" dhe Email: "+email +" ka zgjedhur dyqanin " + dyqani + " per te blere produktet me ID <br><br>" + shportaElem + "<br><br><br><i>Powered by <a href='http://dea.com.al'>DEA</a><i>"// html body
          transporter.sendMail(mailOptions, function(error, info){
            if(error){
              console.log(error);
              res.send(JSON.stringify({sentPickUp:0}));
            }else{
            console.log('Message sent: ' + info.response);
            res.send(JSON.stringify({sentPickUp:1}));
            }
          });



          //res.send(responseSh);


            
            client.end();
            //done();
            }

          });

        // client.end();
        // done();

      });

      pg.end(function(err) {
      if (err) throw err;
      });








    // var transporter = mailer.createTransport( {
    //     host: "smtp-mail.outlook.com", // hostname
    //     secureConnection: false, // use SSL
    //     port: 587, // port for secure SMTP
    //     tls: {
    //        ciphers:'SSLv3'
    //     },
    //     auth: {
    //         user: "maxoptikasmtp@outlook.com",
    //         pass: "maxoptika.1A"
    //     }
    // });

    // var transporter = mailer.createTransport( {
    //     host: "smtp-mail.outlook.com", // hostname
    //     //secureConnection: true, // use SSL
    //     port: 25, // port for secure SMTP
    //     auth: {
    //         user: "agjini@dea.com.al",
    //         pass: "aldodea1234@rafaelo.dea"
    //     }
    // });


};

exports.payOnDelivery = function (req, res, next) {
  //TODO : in localhost the response stucks at offset = 180, if the same thing happens in Heroku
  //TODO : than it means that the function needs to be changed in  order to handle all request
    var emer = req.body.emer;
    var mbiemer = req.body.mbiemer;
    var tel = req.body.tel;
    var email = req.body.email;
    var emailTo = req.body.emailTo;
    var adresa = req.body.adresa;
    var shportaElem = req.body.shportaElem;
    console.log(emer+' '+mbiemer+' '+tel+' '+email+' '+adresa+' '+shportaElem);
    var qendraMax="online@maxoptika.al";
    //var qendraMax="a.gjini@live.com";
    var toAllCorrectEmails=qendraMax+","+email;
    var elementet=req.body.response;
    var sasiaBlerjes=req.body.example;
    console.log(elementet);
    console.log('hapsireeee');
    console.log(sasiaBlerjes);
    elementet=JSON.parse(elementet);
    sasiaBlerjes=JSON.parse(sasiaBlerjes);
    console.log(typeof elementet);

    elementet.forEach( function(element, index) {
      sasiaBlerjes[element.kodartikull]=element.sasia-sasiaBlerjes[element.kodartikull];
    });
    //elementet=JSON.stringify(elementet);
    //console.log(elementet);
    //sasiaBlerjes=JSON.stringify(sasiaBlerjes);
    //console.log(sasiaBlerjes);

    //     update test as t set
    //     column_a = c.column_a
    // from (values
    //     ('123', 1),
    //     ('345', 2)  
    // ) as c(column_b, column_a) 
    // where c.column_b = t.column_b;
    var result = "(";

    for (var p in sasiaBlerjes) {
    if( sasiaBlerjes.hasOwnProperty(p) ) {
      result += "'"+p + "' , " + sasiaBlerjes[p] + "),(";
    } 
  }



  console.log(result);
  result=result.slice(0, -2);
  console.log(result);



  pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }

  //var query_text="update magazina as t set sasia=c.sasia from (values "+result+" ) as c(kodartikull, sasia) where c.kodartikull=t.kodartikull";
  //console.log(query_text);


      var queryTextupdateOrders="update magazina as t set sasia=c.sasia from (values "+result+" ) as c(kodartikull, sasia) where c.kodartikull=t.kodartikull";
      console.log(queryTextupdateOrders);
      client.query(queryTextupdateOrders, function(err, result, done) {
        if (err) {
          console.log(err);
        } else {
          //console.log("mbaroi e dyta");
          // responseSh.pergjigje1=end.rows["0"];
          // responseSh.pergjigje2='sukses';
          //console.log(result);

            // var transporter = mailer.createTransport('smtps://tarzanprenga17%40gmail.com:M3tall1ca!@smtp.gmail.com');
                  var transporter = mailer.createTransport( {
                    host: "smtp.gmail.com", // hostname
                    secureConnection: true, // use SSL
                    port: 465, // port for secure SMTP
                    auth: {
                        user: "maxoptikasmtp@gmail.com",
                        pass: "maxoptika.1A"
                    }
                });
            //       var transporter = mailer.createTransport( {
            //     host: "smtp-mail.outlook.com", // hostname
            //     secureConnection: false, // use SSL
            //     port: 587, // port for secure SMTP
            //     tls: {
            //        ciphers:'SSLv3'
            //     },
            //     auth: {
            //         user: "maxoptikasmtpnew@outlook.com",
            //         pass: "maxoptika.1A"
            //     }
            // });
            var mailOptions = {
              from: '"MaxOptika App" <maxoptikasmtp@gmail.com>', // sender address
              to: toAllCorrectEmails, // list of receivers
              subject: 'Pay On Delivery!', // Subject line
              text: 'Hello world', // plaintext body
              html: 'First Html body!'// html body
            };
            
            // mailOptions.to=passData[0].email;
            // mailOptions.html = 'Pershendetje!</b><br>Klienti ' + passData[0].emer + " " + passData[0].mbiemer + " kerkon te rezervoje nje takim si meposhte.<br><br>"+ "<b>Data</b> : " + passData[0].fjalekalimi + "<br><b>Ora</b> : "+ passData[0].fjalekalimi + "<br>" + "<b>Dyqani</b> : " + passData[0].fjalekalimi + "<br><b>Shenime</b> : " + passData[0].fjalekalimi + "<br><b>Celular</b> : " + passData[0].fjalekalimi + "<br><br><br><i>Powered by <a href='http://dea.com.al'>DEA</a><i>"// html body
            mailOptions.html = "Pershendetje <br> Klienti " + emer + " " + mbiemer + " me te dhena si me poshte: <br>Tel: "+tel +"<br> Email: "+email +"<br>Adrese: "+adresa +"<br> Ka zgjedhur per te blere produktet me ID: " + shportaElem + "<br><br><br><i>Powered by <a href='http://dea.com.al'>DEA</a><i>"// html body
            transporter.sendMail(mailOptions, function(error, info){
              if(error){
                console.log(error);
                res.send(JSON.stringify({sentPayD:0}));
              }else {
              console.log('Message sent: ' + info.response);
              res.send(JSON.stringify({sentPayD:1}));
              }
            });



          //res.send(responseSh);


            
            client.end();
            //done();
            }

          });

        // client.end();
        // done();

      });

      pg.end(function(err) {
      if (err) throw err;
      });





};


exports.payLente = function (req, res, next) {
  //TODO : in localhost the response stucks at offset = 180, if the same thing happens in Heroku
  //TODO : than it means that the function needs to be changed in  order to handle all request
    var emer = req.body.emer;
    var mbiemer = req.body.mbiemer;
    var tel = req.body.tel;
    var email = req.body.email;
    var emailTo = req.body.emailTo;
    var produkti = req.body.produkti;
    var lente = req.body.lente;
    var sasia=req.body.sasia-1;
    lente=lente.slice(1, -1);
    console.log(emer+' '+mbiemer+' '+tel+' '+email+' '+produkti);
    console.log(lente);
    //console.log(lente.parse());
    var qendraMax="online@maxoptika.al";
    //var qendraMax="a.gjini@live.com";
    var toAllCorrectEmails=qendraMax+","+email;


      pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }


      var queryTextupdateOrders='UPDATE magazina SET sasia='+sasia+' where kodartikull=\''+produkti+'\'';
      client.query(queryTextupdateOrders, function(err, result, done) {
        if (err) {
          console.log(err);
        } else {
          //console.log("mbaroi e dyta");
          // responseSh.pergjigje1=end.rows["0"];
          // responseSh.pergjigje2='sukses';
          //console.log(result);





    // var transporter = mailer.createTransport('smtps://tarzanprenga17%40gmail.com:M3tall1ca!@smtp.gmail.com');
          var transporter = mailer.createTransport( {
            host: "smtp.gmail.com", // hostname
            secureConnection: true, // use SSL
            port: 465, // port for secure SMTP
            auth: {
                user: "maxoptikasmtp@gmail.com",
                pass: "maxoptika.1A"
            }
        });
    //       var transporter = mailer.createTransport( {
    //     host: "smtp-mail.outlook.com", // hostname
    //     secureConnection: false, // use SSL
    //     port: 587, // port for secure SMTP
    //     tls: {
    //        ciphers:'SSLv3'
    //     },
    //     auth: {
    //         user: "maxoptikasmtpnew@outlook.com",
    //         pass: "maxoptika.1A"
    //     }
    // });
    var mailOptions = {
      from: '"MaxOptika App" <maxoptikasmtpnew@outlook.com>', // sender address
      to: toAllCorrectEmails, // list of receivers
      subject: 'Porosi per Lente', // Subject line
      text: 'Hello world', // plaintext body
      html: 'First Html body!'// html body
    };
    
    // mailOptions.to=passData[0].email;
    // mailOptions.html = 'Pershendetje!</b><br>Klienti ' + passData[0].emer + " " + passData[0].mbiemer + " kerkon te rezervoje nje takim si meposhte.<br><br>"+ "<b>Data</b> : " + passData[0].fjalekalimi + "<br><b>Ora</b> : "+ passData[0].fjalekalimi + "<br>" + "<b>Dyqani</b> : " + passData[0].fjalekalimi + "<br><b>Shenime</b> : " + passData[0].fjalekalimi + "<br><b>Celular</b> : " + passData[0].fjalekalimi + "<br><br><br><i>Powered by <a href='http://dea.com.al'>DEA</a><i>"// html body
    mailOptions.html = "Pershendetje <br> Klienti " + emer + " " + mbiemer + " me te dhena si me poshte: <br>Tel: "+tel +"<br> Email: "+email +"<br> Ka zgjedhur per te blere lenten me ID: " + produkti + "<br> Specifikimet: "+lente+"<br><br><br><i>Powered by <a href='http://dea.com.al'>DEA</a><i>"// html body
    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        console.log(error);
        res.send(JSON.stringify({sentPayL:0}));
      }else {
      console.log('Message sent: ' + info.response);
      res.send(JSON.stringify({sentPayL:1}));
      }
    });







          //res.send(responseSh);


            
            client.end();
            //done();
            }

          });

        // client.end();
        // done();

      });

      pg.end(function(err) {
      if (err) throw err;
      });



};





exports.payByPayPal = function (req, res, next) {
  //TODO : in localhost the response stucks at offset = 180, if the same thing happens in Heroku
  //TODO : than it means that the function needs to be changed in  order to handle all request
    var emer = req.body.emer;
    var mbiemer = req.body.mbiemer;
    var tel = req.body.tel;
    var email = req.body.email;
    var emailTo = req.body.emailTo;
    var adresa = req.body.adresa;
    var shportaElem = req.body.shportaElem;
    console.log(emer+' '+mbiemer+' '+tel+' '+email+' '+adresa+' '+shportaElem);
    var qendraMax="online@maxoptika.al";
    //var qendraMax="a.gjini@live.com";
    var toAllCorrectEmails=qendraMax+","+email;

    var elementet=req.body.response;
    var sasiaBlerjes=req.body.example;
    console.log(elementet);
    console.log('hapsireeee');
    console.log(sasiaBlerjes);
    elementet=JSON.parse(elementet);
    sasiaBlerjes=JSON.parse(sasiaBlerjes);
    console.log(typeof elementet);

    elementet.forEach( function(element, index) {
      sasiaBlerjes[element.kodartikull]=element.sasia-sasiaBlerjes[element.kodartikull];
    });
    //elementet=JSON.stringify(elementet);
    //console.log(elementet);
    //sasiaBlerjes=JSON.stringify(sasiaBlerjes);
    //console.log(sasiaBlerjes);

    //     update test as t set
    //     column_a = c.column_a
    // from (values
    //     ('123', 1),
    //     ('345', 2)  
    // ) as c(column_b, column_a) 
    // where c.column_b = t.column_b;
    var result = "(";

    for (var p in sasiaBlerjes) {
    if( sasiaBlerjes.hasOwnProperty(p) ) {
      result += "'"+p + "' , " + sasiaBlerjes[p] + "),(";
    } 
  }



  console.log(result);
  result=result.slice(0, -2);
  console.log(result);



  pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }

  //var query_text="update magazina as t set sasia=c.sasia from (values "+result+" ) as c(kodartikull, sasia) where c.kodartikull=t.kodartikull";
  //console.log(query_text);


      var queryTextupdateOrders="update magazina as t set sasia=c.sasia from (values "+result+" ) as c(kodartikull, sasia) where c.kodartikull=t.kodartikull";
      console.log(queryTextupdateOrders);
      client.query(queryTextupdateOrders, function(err, result, done) {
        if (err) {
          console.log(err);
        } else {
           // var transporter = mailer.createTransport('smtps://tarzanprenga17%40gmail.com:M3tall1ca!@smtp.gmail.com');
                  var transporter = mailer.createTransport( {
                    host: "smtp.gmail.com", // hostname
                    secureConnection: true, // use SSL
                    port: 465, // port for secure SMTP
                    auth: {
                        user: "maxoptikasmtp@gmail.com",
                        pass: "maxoptika.1A"
                    }
                });
            //       var transporter = mailer.createTransport( {
            //     host: "smtp-mail.outlook.com", // hostname
            //     secureConnection: false, // use SSL
            //     port: 587, // port for secure SMTP
            //     tls: {
            //        ciphers:'SSLv3'
            //     },
            //     auth: {
            //         user: "maxoptikasmtpnew@outlook.com",
            //         pass: "maxoptika.1A"
            //     }
            // });
            var mailOptions = {
              from: '"MaxOptika App" <maxoptikasmtpnew@outlook.com>', // sender address
              to: toAllCorrectEmails, // list of receivers
              subject: 'PayPal Successful Payment!', // Subject line
              text: 'Hello world', // plaintext body
              html: 'First Html body!'// html body
            };
            
            // mailOptions.to=passData[0].email;
            // mailOptions.html = 'Pershendetje!</b><br>Klienti ' + passData[0].emer + " " + passData[0].mbiemer + " kerkon te rezervoje nje takim si meposhte.<br><br>"+ "<b>Data</b> : " + passData[0].fjalekalimi + "<br><b>Ora</b> : "+ passData[0].fjalekalimi + "<br>" + "<b>Dyqani</b> : " + passData[0].fjalekalimi + "<br><b>Shenime</b> : " + passData[0].fjalekalimi + "<br><b>Celular</b> : " + passData[0].fjalekalimi + "<br><br><br><i>Powered by <a href='http://dea.com.al'>DEA</a><i>"// html body
            mailOptions.html = "Pershendetje <br> Klienti " + emer + " " + mbiemer + " me te dhena si me poshte: <br>Tel: "+tel +"<br> Email: "+email +"<br>Adrese: "+adresa +"<br> Ka zgjedhur per te blere produktet me ID: " + shportaElem + "<br><br><br><i>Powered by <a href='http://dea.com.al'>DEA</a><i>"// html body
            transporter.sendMail(mailOptions, function(error, info){
              if(error){
                console.log(error);
                res.send(JSON.stringify({sentPayD:0}));
              }else {
              console.log('Message sent: ' + info.response);
              res.send(JSON.stringify({sentPayD:1}));
              }
            });



          //res.send(responseSh);


            
            client.end();
            //done();
            }

          });

        // client.end();
        // done();

      });

      pg.end(function(err) {
      if (err) throw err;
      });





















 

};



exports.findById = function (req, res, next) {
    var id = req.params.id;
    res.send(syzet[id]);
};

exports.getSingleProduct = function(req, res, next){
  var productId = req.body.productId;
  var productResponse={};
  var pergjigje=[];
  console.log(productId);
  pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgresss! 9');

      client
        .query('SELECT * FROM products2 INNER JOIN cmime2 ON (products2.kodartikulli=cmime2.idprodukti) INNER JOIN magazina ON (products2.kodartikulli=magazina.kodartikull) WHERE products2.kodartikulli = $1',[productId])
        // .query('SELECT products2.grupi, products2.kodartikulli,products2.kodifikimartikulli2,products2.pershkrimartikulli, cmime2.cmimi, cmime2.monedha FROM products2 INNER JOIN cmime2 ON (products2.kodartikulli=cmime2.idprodukti) WHERE products2.kodartikulli = $1',[productId])
         // .query('SELECT grupi,kodartikulli,kodifikimartikulli2,pershkrimartikulli FROM products2 WHERE kodartikulli = $1',[productId])
        
        .on('end', function(end) {
          //console.log(end);
          //console.log('Single item : ', productId);
          
          productResponse.produkti=end.rows[0];
          pergjigje.push(productResponse);
          //console.log(pergjigje);
          //console.log("ndarje");
          //console.log(pergjigje[0].produkti.pershkrimiangartikulli);
          var pershkrim_artikulli=pergjigje[0].produkti.pershkrimiangartikulli;
          var kod_artikulli=pergjigje[0].produkti.kodartikulli;
          var query_text_new='SELECT * FROM products2 INNER JOIN cmime2 ON (products2.kodartikulli=cmime2.idprodukti) INNER JOIN magazina ON (products2.kodartikulli=magazina.kodartikull) WHERE products2.pershkrimiangartikulli =\''+pershkrim_artikulli+'\' AND products2.kodartikulli!=\''+kod_artikulli+'\'';



          client.query(query_text_new,
                  function(err, result,done) {
                    if (err) {
                      console.log(err);
                    } else {
                      //console.log('Inserted successfully to the reservations table case 2...');
                      //done();
                      //console.log("para result");
                      console.log(result.rows);
                      pergjigje.push(result.rows);
                      res.send(pergjigje);

                      client.end();


                    }
                  });







          //res.send(end);
          // client.end();
          done();
        });
    });
  pg.end(function(err) {
        if (err) throw err;
    });
}

exports.shnamo = function (req, res, next) {
  //TODO : in localhost the response stucks at offset = 180, if the same thing happens in Heroku
  //TODO : than it means that the function needs to be changed in  order to handle all request
    var action = req.body.action;
    var idRe = req.body.idd;
    console.log('action eshte '+action);
    console.log('id eshte '+idRe);
    console.log(action);
    var responseSh={};
    if(action=='merr'){

    var queryTextLente='SELECT * FROM shnamo';
    pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgres! 5');

      client
        .query(queryTextLente)
        .on('end',function(end){
          responseSh.pergjigje1=end.rows["0"];
          responseSh.pergjigje2='sukses';
          res.send(responseSh);
          client.end();
          done();
        });
    });
    pg.end(function(err) {
        if (err) throw err;
        console.log('closed connection');
    });

    }else if(action=='perditeso'){

    var queryTextLente='UPDATE shnamo SET shnamo=\''+idRe+'\'';
    pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgres! 5');

      client
        .query(queryTextLente)
        .on('end',function(end){
          responseSh.pergjigje1='perditesim';
          responseSh.pergjigje2='sukses';
          res.send(responseSh);
          client.end();
          done();
        });
    });
    pg.end(function(err) {
        if (err) throw err;
        console.log('closed connection');
    });

    }


    console.log('too earlyyt');

}

exports.historiku = function (req, res, next) {
  //TODO : in localhost the response stucks at offset = 180, if the same thing happens in Heroku
  //TODO : than it means that the function needs to be changed in  order to handle all request
    var action = req.body.action;
    var idRe = req.body.idd;
    console.log('action eshte '+action);
    console.log('id eshte '+idRe);
    console.log(action);
    var responseSh={};
    if(action=='merr'){

    var queryTextLente='SELECT * FROM historiku where client_id=\''+idRe+'\'';
    pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgres! 5');

      client
        .query(queryTextLente)
        .on('end',function(end){
          responseSh.pergjigje1=end.rows["0"];
          responseSh.pergjigje2='sukses';
          res.send(responseSh);
          client.end();
          done();
        });
    });
    pg.end(function(err) {
        if (err) throw err;
        console.log('closed connection');
    });

    }else if(action=='perditeso'){
      var newOrders = req.body.orders;
      

    var queryTextLente='SELECT * FROM historiku where client_id=\''+idRe+'\'';
    pg.connect(connectionStr, function(err, client, done) {
      if (err) {
        //console.log();
        throw err;
      }
      console.log('Connected to postgres! 5');

      client
        .query(queryTextLente)
        .on('end',function(end){
          if(end.rows.length!=0){
          var oldOrders=end.rows["0"].orders_code;
          //console.log(oldOrders);
          //console.log(end);
          var allOrders=oldOrders+','+newOrders;
          allOrders=allOrders.split(',');


          var uniqueOrders = allOrders.filter(function(item, pos) {
              return allOrders.indexOf(item) == pos;
          })
          console.log(uniqueOrders);
          var allOrderString='';
          for (var i = 0; i < uniqueOrders.length; i++) {
            if (i==0) {
              allOrderString=allOrderString+uniqueOrders[i];
            }else{
              allOrderString=allOrderString+','+uniqueOrders[i];
              }
              //Do something
          }
          console.log(allOrderString);
          
          var queryTextupdateOrders='UPDATE historiku SET orders_code=\''+allOrderString+'\' where client_id=\''+idRe+'\'';
            client.query(queryTextupdateOrders, function(err, result, done) {
              if (err) {
                console.log(err);
              } else {
                console.log("mbaroi e dyta");
                responseSh.pergjigje1=end.rows["0"];
                responseSh.pergjigje2='sukses';
                res.send(responseSh);


              }

            });

          client.end();
          done();
        }else{
          //newOrders

          console.log(newOrders);
          var queryTextupdateOrders='insert into historiku (client_id,orders_code) values('+idRe+',\''+newOrders+'\')';
          
            client.query(queryTextupdateOrders, function(err, result, done) {
              if (err) {
                console.log(err);
              } else {
                console.log("mbaroi e treta");
                responseSh.pergjigje1=end.rows["0"];
                responseSh.pergjigje2='sukses';
                res.send(responseSh);


              }

            });

          client.end();
          done();









        }
        });
    });
    pg.end(function(err) {
        if (err) throw err;
        console.log('closed connection');
    });

    }


    console.log('too earlyyt');

}
exports.doMathCalc = function (req, res, next) {

    var dhena = req.body.dhena;
    //console.log(dhena);
    dhena=JSON.parse(dhena);
    //console.log(dhena);

    //  var mapObj = {};
    //  for(var a of dhena){
    //     if(mapObj[a["KODARTIKULLI"]]== undefined)
    //       {mapObj[a["KODARTIKULLI"]] = 0;
    //     }else{mapObj[a["KODARTIKULLI"]] += a["gjendje"]}
    //  }
    //  console.log('testgb');
    //  console.log(mapObj);

    // var data2 = [];
    // for(var a of newArrMagGjendje){
    //   if(mapObj[a["KODARTIKULLI"]] == undefined)
    //      continue;
    //   a["gjendje"] = mapObj[a["KODARTIKULLI"]];
    //   data2.push(a)
    //   delete mapObj[a["KODARTIKULLI"]];
    // }
    // console.log('hopefully 2');
    // console.log(data2);





    let output = dhena.reduce(function(res, el) {
      if(res[el.KODARTIKULLI]) {
        res[el.KODARTIKULLI].gjendje += el.gjendje;
      } else {
        res[el.KODARTIKULLI] = el;
      }
      return res;
    }, {});

    // objKeysMap = Object.keys(obj).map((k) => obj[k]);
    // let outputArr = Object.values(output);
    let outputArr = Object.keys(output).map((k) => output[k]);
    res.send(outputArr);

    console.log(outputArr);
    console.log('me te dhena te gatshme');



    console.log('too earlyyt');

};