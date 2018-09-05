
//var Feed = require('rss-to-json');
var urlMVD ='http://www.montevideo.com.uy/anxml.aspx?58';
var urlElPais = 'https://www.elpais.com.uy/rss/';
var urlObserva = 'https://www.elobservador.com.uy/rss/home.xml';
var urlWCGroupResult = "http://worldcup.sfg.io/teams/group_results"
var urlWCURUGUAY = 'http://worldcup.sfg.io/matches/country?fifa_code='
const request = require('request');
var dateformat = require('dateformat');
var path = require("path");
var fs = require('fs');
var pdf = require('html-pdf');


exports.home = function(req, res, next) {

  var objMenu =  [{
    "id" : "1",
    "Title" : "Hola mundo!",
  }];
return res.sendFile('/public/index.html', {"root": '.'});

 //res.send(objMenu);
};



exports.getWCResults = function (req,res) {
  var urlRss = "";
  var parametro = req.params.param1;
  if(typeof parametro === 'undefined'){
    res.status(404).send("URL Not found, my friend " + req.originalUrl);

  } else {
    urlRss = urlWCURUGUAY.concat(parametro);
  }

    console.log("LA URL ES " + urlRss);
    try {
      var decimeloco;

      const options = {
          url: urlRss,
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Accept-Charset': 'utf-8',
              'User-Agent': 'myBot'
          }
      };

    request(options, function(err, resp, body) {
          let json = JSON.parse(body);
          let matches =[];
          for (var i = 0; i < json.length; i++) {
            var status = "";
            if (json[i].status == "completed") {
              status = "Finalizado"
            } else {
              status = "Por jugar"
            };

            let tmpMatch = {
              "location" : json[i].location,
              "hour" : dateformat(new Date(json[i].datetime).toLocaleString()),
              "team1" : json[i].home_team.country,
              "goalsTeam1" : json[i].home_team.goals,
              "team2" : json[i].away_team.country,
              "goalsTeam2" : json[i].away_team.goals,
              "matchStatus" : status
            }
            matches.push(tmpMatch);


            console.log(matches);
          }




          res.status(200).send(matches);
    });
    //  res.send(json);
//
// request(urlRss, { json: true }, (err, res, body) => {
//   if (err) { return console.log(err); }
//   console.log(body.url);
//   console.log(body.explanation);
// });



  } catch (e) {
    console.log("El error es: " + e.message) ;
  }
}




exports.toPdf = function(req, res){
  //var html = fs.readFileSync('./public/test.html', 'utf8');
  var options = { format: 'Letter' };
  var info = {
    "company": "Cualquiera inc",
    "name": "pablito"
  }
//  var html = "<h1> hola que tal </h1>"

//   '<!DOCTYPE html>' .
// '  <html lang="en" dir="ltr">'.
// '    <head>'.
// '      <meta charset="utf-8">'
// '      <title></title>'
//   '  </head>'
// '    <body>'
// '      <h1> hello pdf </h1>'
//   '  <table>'
//   '  <tr>Company</tr>'
// '  {{{company}}}'
//   '  <tr>Team</tr>'
//   '  {compn}'
//   '  </table>'
//  '  </body>'
//   '</html>'
//console.log(html);



// var html = res.render('./pages/index.ejs');
// pdf.create(html).toStream(function(err, stream){
//   if (err) return res.end(err.stack)
//    res.setHeader('Content-Type', 'application/pdf')
//    stream.pipe(res)
// });


res.render('./pages/index.ejs', {
    info: info,
}, function (err, HTML) {
    pdf.create(HTML, options).toFile('./employee.pdf', function (err, result) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
    })
  })















}

























// exports.rss = function(req, res) {
//   var urlRss = "";
//   var parametro = req.params.param1;
//   if ( parametro == "mvd") {
//     urlRss = urlMVD;
//   } else if (parametro == "elpais" ){
//     urlRss = urlElPais;
//   } else if (parametro == "observa" ){
//     urlRss = urlObserva;
//   } else if (parametro == "groupResults" ){
//     console.log("La url es " + urlWCGroupResult);
//      urlRss = urlWCGroupResult;
//   } else {
//     res.status(404).send("URL Not found, my friend " + req.originalUrl);
//   }
//
//   //Get the feed
//   Feed.load(urlRss, function(err, rss){
//     res.send(rss);
//   });
// };
