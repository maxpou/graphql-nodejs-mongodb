var chai     = require('chai');
var chaiHttp = require('chai-http');
var should   = chai.should();

var server   = require('../index');
var Beer     = require('../models/beer.model');
var BeerList = require('../data.json');

chai.use(chaiHttp);

describe('GraphQL Beers', function() {

  beforeEach(function(done){
    BeerList.forEach(function (aBeer) {
      var newBeer = new Beer(aBeer);
      newBeer.save();
    });
    done();
  });

  afterEach(function(done){
    Beer.collection.drop();
    done();
  });

  it('should get all the beers', function(done) {
    var graphqlQuery = `
    {
      beers {
        name
        brewery
        alcohol
        description
      }
    }`;

    chai.request(server)
      .post('/graphql')
      .send({query: graphqlQuery})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body['data']['beers'].should.be.a('array');
        res.body['data']['beers'][0].should.have.property('name');
        res.body['data']['beers'][0].should.have.property('brewery');
        res.body['data']['beers'][0].should.have.property('alcohol');
        done();
      });
  });

  it('should display only beers from Duvel Brewery', function(done) {
    var graphqlQuery = `
    {
      beers(brewery: "Duvel") {
        name
        alcohol
        brewery
      }
    }`;

    chai.request(server)
      .post('/graphql')
      .send({query: graphqlQuery})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        for (var beer of res.body['data']['beers']) {
          beer.brewery.should.equal('Duvel');
        }
        done();
      });
  });

  it('should display beers ordered by alcohol', function(done) {
    var graphqlQuery = `
    {
      beers(orderBy: ALCOHOL) {
        name
        alcohol
      }
    }`;

    chai.request(server)
      .post('/graphql')
      .send({query: graphqlQuery})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        var previousAlcohol = 1;
        for (var beer of res.body['data']['beers']) {
          beer.alcohol.should.be.at.least(previousAlcohol);
          previousAlcohol = beer.alcohol;
        }
        done();
      });
  });

  it('should display only beers from Duvel Brewery and ordered by alcohol', function(done) {
    var graphqlQuery = `
    {
      beers(brewery: "Duvel", orderBy: ALCOHOL) {
        name
        brewery
        alcohol
      }
    }`;

    chai.request(server)
      .post('/graphql')
      .send({query: graphqlQuery})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        var previousAlcohol = 1;
        for (var beer of res.body['data']['beers']) {
          beer.brewery.should.equal('Duvel');
          beer.alcohol.should.be.at.least(previousAlcohol);
          previousAlcohol = beer.alcohol;
        }
        done();
      });
  });

  it('should display a SINGLE beer', function(done) {
      var newBeer = new Beer({
        name: 'Custom Beer',
        brewery: 'Custom Brewery',
        alcohol: 9.5,
        description: 'miam miam'
      });

      newBeer.save(function(err, data) {

        var graphqlQuery = `
        {
          beer(id: "${data._id}") {
            name
          }
        }`;

        chai.request(server)
          .post('/graphql')
          .send({query: graphqlQuery})
          .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body['data']['beer']['name'].should.equal('Custom Beer');
            done();
          });
      });
    });
});
