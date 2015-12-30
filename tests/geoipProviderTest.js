var assert = require('chai').assert;
var geoipProvider = require('../src/geoipProvider.js');

describe('geoipProvider', function() {
  var goodIP = '75.11.25.25';
  var badIP = '256.1.5.56';
  var badIP2 = 'edza.48d.d.469';
  var badIP3 = '""ofr\'"})?$^odpza;;,';

  describe('#getAll(ip,callback)',function() {
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
    it('should return all informations without error for ip '+goodIP, function(done) {
      geoipProvider.getAll(goodIP,function(informations,error){
        if (error) return done(error);
        assert.deepEqual(Object.keys(infoKeys),Object.keys(informations));
        assert.deepEqual(Object.keys(infoKeys.country),Object.keys(informations.country));
        assert.deepEqual(Object.keys(infoKeys.city),Object.keys(informations.city));
        done();
      });
    });

    it('should return an error for ip '+badIP, function(done) {
      geoipProvider.getAll(badIP,function(informations,error){
        assert.isNull(informations);
        assert.isNotNull(error,'IP or host does not comply !');
        done();
      });
    });

    it('should return an error for ip '+badIP2, function(done) {
      geoipProvider.getAll(badIP2,function(informations,error){
        assert.isNull(informations);
        assert.isNotNull(error,'IP or host does not comply !');
        done();
      });
    });

    it('should return an error for ip '+badIP3, function(done) {
      geoipProvider.getAll(badIP3,function(informations,error){
        assert.isNull(informations);
        assert.isNotNull(error,'IP or host does not comply !');
        done();
      });
    });
  });


  describe('#getCountry(ip,callback)',function() {
    var infoKeys = {
      code:'',
      name:''
    };
    it('should return country informations without error for ip '+goodIP, function(done) {
      geoipProvider.getCountry(goodIP,function(informations,error){
        if (error) return done(error);
        assert.deepEqual(Object.keys(infoKeys),Object.keys(informations));
        done();
      });
    });

    it('should return an error for ip '+badIP, function(done) {
      geoipProvider.getCountry(badIP,function(informations,error){
        assert.isNull(informations);
        assert.isNotNull(error,'IP or host does not comply !');
        done();
      });
    });

    it('should return an error for ip '+badIP2, function(done) {
      geoipProvider.getCountry(badIP2,function(informations,error){
        assert.isNull(informations);
        assert.isNotNull(error,'IP or host does not comply !');
        done();
      });
    });

    it('should return an error for ip '+badIP3, function(done) {
      geoipProvider.getCountry(badIP3,function(informations,error){
        assert.isNull(informations);
        assert.isNotNull(error,'IP or host does not comply !');
        done();
      });
    });
  });


  describe('#getCity(ip,callback)',function() {
    var infoKeys = {
      name1:'',
      name2:'',
      postal:'',
      latitude:'',
      longitude:'',
    };
    it('should return city informations without error for ip '+goodIP, function(done) {
      geoipProvider.getCity(goodIP,function(informations,error){
        if (error) return done(error);
        assert.deepEqual(Object.keys(infoKeys),Object.keys(informations));
        done();
      });
    });

    it('should return an error for ip '+badIP, function(done) {
      geoipProvider.getCity(badIP,function(informations,error){
        assert.isNull(informations);
        assert.isNotNull(error,'IP or host does not comply !');
        done();
      });
    });

    it('should return an error for ip '+badIP2, function(done) {
      geoipProvider.getCity(badIP2,function(informations,error){
        assert.isNull(informations);
        assert.isNotNull(error,'IP or host does not comply !');
        done();
      });
    });

    it('should return an error for ip '+badIP3, function(done) {
      geoipProvider.getCity(badIP3,function(informations,error){
        assert.isNull(informations);
        assert.isNotNull(error,'IP or host does not comply !');
        done();
      });
    });

  });


  describe('#getAs(ip,callback)',function() {
    it('should return as information without error for ip '+goodIP, function(done) {
      geoipProvider.getAs(goodIP,function(as,error){
        if (error) return done(error);
        assert.isString(as);
        done();
      });
    });

    it('should return an error for ip '+badIP, function(done) {
      geoipProvider.getAs(badIP,function(informations,error){
        assert.isNull(informations);
        assert.isNotNull(error,'IP or host does not comply !');
        done();
      });
    });

    it('should return an error for ip '+badIP2, function(done) {
      geoipProvider.getAs(badIP2,function(informations,error){
        assert.isNull(informations);
        assert.isNotNull(error,'IP or host does not comply !');
        done();
      });
    });

    it('should return an error for ip '+badIP3, function(done) {
      geoipProvider.getAs(badIP3,function(informations,error){
        assert.isNull(informations);
        assert.isNotNull(error,'IP or host does not comply !');
        done();
      });
    });

  });


  describe('#getLocation(ip,callback)',function() {
    it('should return location informations without error for ip '+goodIP, function(done) {
      geoipProvider.getLocation(goodIP,function(lat,long,error){
        if (error) return done(error);
        assert.ok(!isNaN(parseFloat(lat)),'expect longitude to be a number');
        assert.ok(!isNaN(parseFloat(long)),'expect latitude to be a number');
        done();
      });
    });

    it('should return an error for ip '+badIP, function(done) {
      geoipProvider.getLocation(badIP,function(informations,error){
        assert.isNull(informations);
        assert.isNotNull(error,'IP or host does not comply !');
        done();
      });
    });

    it('should return an error for ip '+badIP2, function(done) {
      geoipProvider.getLocation(badIP2,function(informations,error){
        assert.isNull(informations);
        assert.isNotNull(error,'IP or host does not comply !');
        done();
      });
    });

    it('should return an error for ip '+badIP3, function(done) {
      geoipProvider.getLocation(badIP3,function(informations,error){
        assert.isNull(informations);
        assert.isNotNull(error,'IP or host does not comply !');
        done();
      });
    });

  });


});
