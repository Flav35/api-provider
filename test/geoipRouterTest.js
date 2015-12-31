var assert = require('chai').assert;
var expect = require('chai').expect;
var request = require('request');

//////////////////////////
// Start geoipRouter UT //
//////////////////////////
describe('geoipRouter', function() {
  /* Init */
  var server;
  var port = 3001;
  var goodIP = '75.11.25.25';
  var badIP = '256.1.5.56';
  var badIP2 = 'edza.48d.d.469';
  var badIP3 = '""ofr\'"})?$^odpza;;,';
  var errorMessage = 'IP does not comply !';

  /* Start server */
  before(function() {
    server = require('../bin/www');
  });

  /* Close server */
  after(function(){
    server.close();
  });


  /**
   * GET /
   */
  describe('GET /', function() {
    it('should get status 200', function(done){
      request.get('http://localhost:'+port+'/', function (err, res, body){
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
    it('should send a json with {error : "Not Found"}', function(done){
      request.get('http://localhost:'+port+'/', function (err, res, body){
        assert.deepEqual(JSON.parse(res.body),{error:'Not Found'});
        done();
      });
    });
  });

  /**
   * GET /api/geoip/:ip
   */
  describe('GET /api/geoip/:ip', function() {
    it('should get status 200 with ip '+goodIP, function(done) {
      request.get('http://localhost:'+port+'/api/geoip/'+goodIP, function(err,res,body) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
    var infoKeys = {
      country: {
        code:'',
        name:''
      },
      city:{
        name1:'',
        name2:'',
        postal:'',
        latitude:'',
        longitude:'',
      },
      as:''
    };

    it('should get informations correctly with ip '+goodIP, function(done) {
      request.get('http://localhost:'+port+'/api/geoip/'+goodIP, function(err,res,body) {
        assert.deepEqual(Object.keys(JSON.parse(body)),Object.keys(infoKeys));
        assert.deepEqual(Object.keys(JSON.parse(body).country),Object.keys(infoKeys.country));
        assert.deepEqual(Object.keys(JSON.parse(body).city),Object.keys(infoKeys.city));
        done();
      });
    });

    it('should get json error {error : "IP doest not comply"} with ip '+badIP, function(done) {
      request.get('http://localhost:'+port+'/api/geoip/'+badIP, function(err,res,body) {
        assert.deepEqual(JSON.parse(body),{error: errorMessage});
        done();
      });
    });

    it('should get json error {error : "IP doest not comply"} with ip '+badIP2, function(done) {
      request.get('http://localhost:'+port+'/api/geoip/'+badIP2, function(err,res,body) {
        assert.deepEqual(JSON.parse(body),{error: errorMessage});
        done();
      });
    });

    it('should get json error {error : "IP doest not comply"} with ip '+badIP3, function(done) {
      request.get('http://localhost:'+port+'/api/geoip/'+badIP3, function(err,res,body) {
        assert.deepEqual(JSON.parse(body),{error: errorMessage});
        done();
      });
    });
  });

  /**
   * GET /api/geoip/country/:ip
   */
  describe('GET /api/geoip/country/:ip', function() {
    it('should get status 200 with ip '+goodIP, function(done) {
      request.get('http://localhost:'+port+'/api/geoip/country/'+goodIP, function(err,res,body) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
    var infoKeys = {
      code:'',
      name:''
    };

    it('should get informations correctly with ip '+goodIP, function(done) {
      request.get('http://localhost:'+port+'/api/geoip/country/'+goodIP, function(err,res,body) {
        assert.deepEqual(Object.keys(JSON.parse(body)),Object.keys(infoKeys));
        done();
      });
    });

    it('should get json error {error : "IP doest not comply"} with ip '+badIP, function(done) {
      request.get('http://localhost:'+port+'/api/geoip/country/'+badIP, function(err,res,body) {
        assert.deepEqual(JSON.parse(body),{error: errorMessage});
        done();
      });
    });

    it('should get json error {error : "IP doest not comply"} with ip '+badIP2, function(done) {
      request.get('http://localhost:'+port+'/api/geoip/country/'+badIP2, function(err,res,body) {
        assert.deepEqual(JSON.parse(body),{error: errorMessage});
        done();
      });
    });

    it('should get json error {error : "IP doest not comply"} with ip '+badIP3, function(done) {
      request.get('http://localhost:'+port+'/api/geoip/country/'+badIP3, function(err,res,body) {
        assert.deepEqual(JSON.parse(body),{error: errorMessage});
        done();
      });
    });
  });

  /**
   * GET /api/geoip/city/:ip
   */
  describe('GET /api/geoip/city/:ip', function() {
    it('should get status 200 with ip '+goodIP, function(done) {
      request.get('http://localhost:'+port+'/api/geoip/city/'+goodIP, function(err,res,body) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
    var infoKeys = {
      name1:'',
      name2:'',
      postal:'',
      latitude:'',
      longitude:'',
    };

    it('should get informations correctly with ip '+goodIP, function(done) {
      request.get('http://localhost:'+port+'/api/geoip/city/'+goodIP, function(err,res,body) {
        assert.deepEqual(Object.keys(JSON.parse(body)),Object.keys(infoKeys));
        done();
      });
    });

    it('should get json error {error : "IP doest not comply"} with ip '+badIP, function(done) {
      request.get('http://localhost:'+port+'/api/geoip/city/'+badIP, function(err,res,body) {
        assert.deepEqual(JSON.parse(body),{error: errorMessage});
        done();
      });
    });

    it('should get json error {error : "IP doest not comply"} with ip '+badIP2, function(done) {
      request.get('http://localhost:'+port+'/api/geoip/city/'+badIP2, function(err,res,body) {
        assert.deepEqual(JSON.parse(body),{error: errorMessage});
        done();
      });
    });

    it('should get json error {error : "IP doest not comply"} with ip '+badIP3, function(done) {
      request.get('http://localhost:'+port+'/api/geoip/city/'+badIP3, function(err,res,body) {
        assert.deepEqual(JSON.parse(body),{error: errorMessage});
        done();
      });
    });

  });

  /**
   * GET /api/geoip/location/:ip
   */
  describe('GET /api/geoip/location/:ip', function() {
    it('should get status 200 with ip '+goodIP, function(done) {
      request.get('http://localhost:'+port+'/api/geoip/location/'+goodIP, function(err,res,body) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
    var infoKeys = {
      latitude:'',
      longitude:'',
    };

    it('should get informations correctly with ip '+goodIP, function(done) {
      request.get('http://localhost:'+port+'/api/geoip/location/'+goodIP, function(err,res,body) {
        assert.deepEqual(Object.keys(JSON.parse(body)),Object.keys(infoKeys));
        done();
      });
    });

    it('should get json error {error : "IP doest not comply"} with ip '+badIP, function(done) {
      request.get('http://localhost:'+port+'/api/geoip/location/'+badIP, function(err,res,body) {
        assert.deepEqual(JSON.parse(body),{error: errorMessage});
        done();
      });
    });

    it('should get json error {error : "IP doest not comply"} with ip '+badIP2, function(done) {
      request.get('http://localhost:'+port+'/api/geoip/location/'+badIP2, function(err,res,body) {
        assert.deepEqual(JSON.parse(body),{error: errorMessage});
        done();
      });
    });

    it('should get json error {error : "IP doest not comply"} with ip '+badIP3, function(done) {
      request.get('http://localhost:'+port+'/api/geoip/location/'+badIP3, function(err,res,body) {
        assert.deepEqual(JSON.parse(body),{error: errorMessage});
        done();
      });
    });
  });

  /**
   * GET /api/geoip/as/:ip
   */
  describe('GET /api/geoip/as/:ip', function() {
    it('should get status 200 with ip '+goodIP, function(done) {
      request.get('http://localhost:'+port+'/api/geoip/as/'+goodIP, function(err,res,body) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
    var infoKeys = {
      as:'',
    };

    it('should get informations correctly with ip '+goodIP, function(done) {
      request.get('http://localhost:'+port+'/api/geoip/as/'+goodIP, function(err,res,body) {
        assert.deepEqual(Object.keys(JSON.parse(body)),Object.keys(infoKeys));
        done();
      });
    });

    it('should get json error {error : "IP doest not comply"} with ip '+badIP, function(done) {
      request.get('http://localhost:'+port+'/api/geoip/as/'+badIP, function(err,res,body) {
        assert.deepEqual(JSON.parse(body),{error: errorMessage});
        done();
      });
    });

    it('should get json error {error : "IP doest not comply"} with ip '+badIP2, function(done) {
      request.get('http://localhost:'+port+'/api/geoip/as/'+badIP2, function(err,res,body) {
        assert.deepEqual(JSON.parse(body),{error: errorMessage});
        done();
      });
    });

    it('should get json error {error : "IP doest not comply"} with ip '+badIP3, function(done) {
      request.get('http://localhost:'+port+'/api/geoip/as/'+badIP3, function(err,res,body) {
        assert.deepEqual(JSON.parse(body),{error: errorMessage});
        done();
      });
    });
  });

});
////////////////////////
// End geoipRouter UT //
////////////////////////
