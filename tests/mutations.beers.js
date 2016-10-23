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

  it('should add a new beer', function(done) {

    var graphqlQuery = `
      mutation {
        addBeer(data: {name: "Delirium Tremens", brewery: "Huyghe Brewery test", alcohol: 8.5})
      }
    `;

    chai.request(server)
      .post('/graphql')
      .send({query: graphqlQuery})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.data.addBeer.should.be.true;
      });

    // find this new beer
    var graphqlQuery = `
    {
      beers(brewery: "Huyghe Brewery test") {
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
        res.body['data']['beers'][0]['name'].should.equal('Delirium Tremens');
        res.body['data']['beers'][0]['brewery'].should.equal('Huyghe Brewery test');
        res.body['data']['beers'][0]['alcohol'].should.equal(8.5);
        done();
      });
  });

  it('should delete a SINGLE beer', function(done) {
      var newBeer = new Beer({
        name: 'Custom Beer',
        brewery: 'Custom Brewery',
        alcohol: 9.5,
        description: 'hummmmmmm'
      });

      newBeer.save(function(err, data) {

        var graphqlQuery = `
        mutation {
          removeBeer(_id: "${data._id}") {
            name
          }
        }`;

        chai.request(server)
          .post('/graphql')
          .send({query: graphqlQuery})
          .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.an('object');
            res.body.data.removeBeer.name.should.equal('Custom Beer');
            done();
          });

        // try to retrieve the deleted beer
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
            res.body.should.be.an('object');
            res.body.data.beer.should.be.null;
            done();
          });
      });
  });

  it('should delete all beers', function(done) {

    var graphqlQuery = `
      mutation {
        removeAllBeers
      }
    `;

    chai.request(server)
      .post('/graphql')
      .send({query: graphqlQuery})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.data.removeAllBeers.should.be.true;
      });

    // retrieve all beers
    var graphqlQuery = `
    {
      beers {
        name
      }
    }`;

    chai.request(server)
      .post('/graphql')
      .send({query: graphqlQuery})
      .end(function(err, res){
        res.should.have.status(200);
        res.body.data.beers.should.be.an('array');
        res.body.data.beers.should.have.lengthOf(0);
        done();
      });
  });

});
