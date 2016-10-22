process.env.NODE_ENV = 'test';

var chai     = require('chai');
var chaiHttp = require('chai-http');
var should   = chai.should();

var server   = require('../index');

chai.use(chaiHttp);

describe('GraphiQL', function() {

  it('should display the GraphiQL app', function(done) {
    chai.request(server)
      .get('/graphql?query=%7BblogPosts%20%7B%0A%20%20_id%0A%20%20title%0A%20%20description%0A%7D%7D')
      .end(function(err, res){
        console.log(res.body);
        res.should.have.status(200);
        res.should.be.json;
        res.body['data']['blogPosts'].should.be.a('array');
        done();
      });
  });

});
