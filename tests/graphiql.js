var chai     = require('chai');
var chaiHttp = require('chai-http');
var should   = chai.should();

var server   = require('../index');

chai.use(chaiHttp);

describe('GraphiQL', function() {

  it('should display the GraphiQL app', function(done) {
    chai.request(server)
      .get('/graphql')
      .set('Accept', 'text/html')
      .end(function(err, res){
        res.should.have.status(200);
        res.text.should.contain('GraphiQL');
        done();
      });
  });

});
