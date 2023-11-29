const request = require('supertest');
const expect = require('chai').expect;

describe('mock-user-auth API tests', () => {
    const baseurl = 'http://localhost:3000/api/v1';
    let token;

    it('should create new user successfully', (done) => {
        request(baseurl)
            .post('/users')
            .send({
                name: "user",
                email: "user2@gmail.com",
                password: "user123"
            })
            .set('Accept', 'application/json')
            .set('content-type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body).not.to.be.null;
                expect(res.body.message).to.be.equal("User registered with success");
                expect(res.body.token).not.to.be.null;
                token = res.body.token;
                if(err){
                    throw err;
                }
                done();
            })
    })

});