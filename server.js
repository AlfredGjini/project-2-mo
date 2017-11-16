var express     = require('express'),
    syzet       = require('./routes/syzet'),
    app         = express(),
    users       = require('./routes/users'),
    wishlist    = require('./routes/wishlist'),
    reservation = require('./routes/rezervim'),
    clinic      = require('./routes/clinic-card');
var bodyParser  = require('body-parser');
app.use(bodyParser.json({limit: '50mb'})); // support json encoded bodies
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit:50000
})); // support encoded bodies
app.use(express.static('www')); 

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.post('/kreu', syzet.findAll);
app.post('/syze-dielli', syzet.findAllDielli);
app.post('/slider1', syzet.getSlider1);
app.post('/slider2', syzet.getSlider2);
app.post('/syze-optike', syzet.findAllOptike);
app.post('/syze-koleksion', syzet.findAllKoleksion);
app.post('/syze-lente', syzet.findAllLente);
app.post('/search-result', syzet.findAllSearch);
app.post('/register', syzet.regjistroUser);
app.post('/modifiko', syzet.modifikoUser);
app.post('/login-real', syzet.loginUser);
app.post('/forgot-password', syzet.forgotPassword);
app.post('/pick-up-store', syzet.pickUpStore);
app.post('/pay-on-delivery', syzet.payOnDelivery);
app.post('/pay-paypal', syzet.payByPayPal);
app.post('/getCmimiFilter', syzet.getCmimiFilter);
app.post('/shnamo', syzet.shnamo);
app.post('/get-orders', syzet.historiku);
app.post('/rasti3', syzet.doMathCalc);
app.post('/payLente', syzet.payLente);


app.post('/kartela-klinike', clinic.getClinicCard);

app.post('/product-single',syzet.getSingleProduct);

app.post('/wishlist', wishlist.find);

app.post('/login', users.getUser);

app.post('/getTakim',reservation.getReservations);

app.post('/getOrariDyqan',reservation.getOrariDyqan);


app.post('/takim',reservation.setReservation);

app.post('/takimOrari',reservation.getOrariTakim);

app.post('/oraretZene',reservation.getOraretZene);

app.get('/test', function(req, res) {
    res.send("Testgh");
});

app.post('/test', function(req, res) {
    res.send("Testgh numer");
});
app.get('/test/:id', function(req, res) {
    res.send("Test : " + req.params.id);
});
app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
