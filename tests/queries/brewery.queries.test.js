var chai     = require('chai');
var chaiHttp = require('chai-http');
var should   = chai.should();

var server      = require('../../index');
var Beer        = require('../../models/beer.model');
var Brewery     = require('../../models/brewery.model');
var BeerData    = require('../../beers.json');
var BreweryData = require('../../breweries.json');

chai.use(chaiHttp);

describe('GraphQL Brewery (queries)', function() {

  beforeEach(function(done){
    BreweryData.forEach(function (aBeer) {
      var newBrewery = new Brewery(aBeer);
      newBrewery.save();
    });
    BeerData.forEach(function (aBeer) {
      var newBeer = new Beer(aBeer);
      newBeer.save();
    });
    done();
  });

  afterEach(function(done){
    Beer.collection.drop();
    Brewery.collection.drop();
    done();
  });

  it('should display all the breweries', function(done) {
    var graphqlQuery = `
      {
        breweries {
          name
          location
        }
      }
    `;

    chai.request(server)
      .post('/graphql')
      .send({query: graphqlQuery})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.a.json;
        res.body['data']['breweries'].should.be.an('array');
        res.body['data']['breweries'][0].should.have.property('name');
        res.body['data']['breweries'][0].should.have.property('location');
        done();
      });
  });

  it('should display a SINGLE brewery', function(done) {
    var newBrewery = new Brewery({
      _id: 'test_brewery',
      name: 'Test Brewery',
      location: 'Beerland'
    });

    newBrewery.save(function(err, data) {

      var graphqlQuery = `
      {
        brewery(id: "${data._id}") {
          name
          location
        }
      }`;

      chai.request(server)
        .post('/graphql')
        .send({query: graphqlQuery})
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.a.json;
          res.body.should.be.an('object');
          res.body['data']['brewery']['name'].should.equal('Test Brewery');
          res.body['data']['brewery']['location'].should.equal('Beerland');
          done();
        });
    });
  });
});
