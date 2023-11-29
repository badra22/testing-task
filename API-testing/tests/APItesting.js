const request = require('supertest');
const expect = require('chai').expect;

describe('mock-user-auth API tests', () => {
    const baseurl = 'http://localhost:3000/api/v1';
    let token;
    let usr_id;
    let usr_name = 'user';
    let usr_email = 'user2@gmail.com';
    let usr_password = 'user123';
    const key_admin = "keyadmin123";
    const fake_key_admin = "KeyAdmin123";

    it('should create new user successfully in case of valid credentials', (done) => {
        request(baseurl)
            .post('/users')
            .send({
                name: usr_name,
                email: usr_email,
                password: usr_password
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

    it('should not create same user twice', (done) => {
        request(baseurl)
            .post('/users')
            .send({
                name: usr_name,
                email: usr_email,
                password: usr_password
            })
            .set('Accept', 'application/json')
            .set('content-type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).not.to.be.equal(200);
                if(err){
                    throw err;
                }
                done();
            })
    })

    it('should fail to authenticate non-existing users', (done) => {
        let usr2_email = 'ahmed.mohamed@gmail.com'
        let usr2_password = '123456'

        request(baseurl)
            .post('/auth')
            .send({
                email: usr2_email,
                password: usr2_password
            })
            .set('Accept', 'application/json')
            .set('content-type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).not.to.be.equal(200);
                if(err){
                    throw err;
                }
                done();
            })
    })

    it('should fail to authenticate existing users using incomplete credentials', (done) => {
        let usr2_email = 'ahmed.mohamed@gmail.com'

        request(baseurl)
            .post('/auth')
            .send({
                email: usr2_email
            })
            .set('Accept', 'application/json')
            .set('content-type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).not.to.be.equal(200);
                if(err){
                    throw err;
                }
                done();
            })
    })

    it('should authenticate existing user successfully', (done) => {
        request(baseurl)
            .post('/auth')
            .send({
                email: usr_email,
                password: usr_password
            })
            .set('Accept', 'application/json')
            .set('content-type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body).not.to.be.null;
                expect(res.body.token).not.to.be.null;
                token = res.body.token;
                if(err){
                    throw err;
                }
                done();
            })
    })

    it('should get currently authenticated user info successfully and correctly', (done) => {
        request(baseurl)
            .get('/users')
            .set('Authorization', token)            
            .set('content-type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body).not.to.be.null;
                expect(res.body.id).not.to.be.null;
                expect(res.body.name).to.be.equal(usr_name);
                expect(res.body.email).to.be.equal(usr_email);
                usr_id = res.body.id;
                if(err){
                    throw err;
                }
                done();
            })
    })

        //fails
    it('should get currently authenticated user hashed password instead of the real password', (done) => {
        request(baseurl)
            .get('/users')
            .set('Authorization', token)            
            .set('content-type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body).not.to.be.null;
                expect(res.body.password).not.to.be.equal(usr_password);
                if(err){
                    throw err;
                }
                done();
            })
    })


    it('should fail to get user info with invalid authorization', (done) => {
        request(baseurl)
            .get('/users')
            .set('Authorization', '')
            .set('content-type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(403);
                if(err){
                    throw err;
                }
                done();
            })
    })


    it('should fail to get user info with missing authorization', (done) => {
        request(baseurl)
            .get('/users')
            .set('content-type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(403);
                if(err){
                    throw err;
                }
                done();
            })
    })

    it('should update currently authenticated user info successfully in case of valid authorization', (done) => {
        usr_name = "newName";
        usr_email = "new_email@gmail.com";
        usr_password = "newpassword123";

        request(baseurl)
            .patch('/users')
            .send({
                name: usr_name,
                email: usr_email,
                password: usr_password
            })
            .set('Authorization', token)    
            .set('Accept', 'application/json')
            .set('content-type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body).not.to.be.null;
                expect(res.body.message).to.be.equal("User updated with success!");
                if(err){
                    throw err;
                }
                done();
            })
    })

    it('should fail to update currently authenticated user info in case of invalid authorization', (done) => {
        request(baseurl)
            .patch('/users')
            .send({
                name: usr_name,
                email: usr_email,
                password: usr_password
            })
            .set('Authorization', token)    
            .set('Accept', 'application/json')
            .set('content-type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(403);
                if(err){
                    throw err;
                }
                done();
            })
    })

    it('should fail to update currently authenticated user info in case of incomplete info', (done) => {
        request(baseurl)
            .patch('/users')
            .send({
                name: usr_name,
            })
            .set('Authorization', token)    
            .set('Accept', 'application/json')
            .set('content-type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).not.to.be.equal(200);
                if(err){
                    throw err;
                }
                done();
            })
    })

    it('should require reAuthentication after updating user info', (done) => {
        request(baseurl)
            .get('/users')
            .set('Authorization', token)
            .set('content-type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(403);
                if(err){
                    throw err;
                }
                done();
            })
    })

    it('should get the latest updated info of currently authenticated user correctly', (done) => {
        // reAuthenticate the user
        request(baseurl)
            .post('/auth')
            .send({
                email: usr_email,
                password: usr_password
            })
            .set('Accept', 'application/json')
            .set('content-type', 'application/json')
            .end(function(err, res) {
                token = res.body.token;
                // Get and validate user data
                request(baseurl)
                    .get('/users')
                    .set('Authorization', token)
                    .set('content-type', 'application/json')
                    .end(function(err, res) {
                        expect(res.statusCode).to.be.equal(200);
                        expect(res.body).not.to.be.null;
                        expect(res.body.id).not.to.be.null;
                        expect(res.body.id).to.be.equal(usr_id);
                        expect(res.body.name).to.be.equal(usr_name);
                        expect(res.body.email).to.be.equal(usr_email);
                        expect(res.body.password).to.be.equal(usr_password);
                        if(err){
                            throw err;
                        }
                        done();
                    });
            });
    })

    it('should delete currently authenticated user successfully with valid authorization', (done) => {
        request(baseurl)
            .delete('/users')
            .set('Authorization', token)
            .set('content-type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body).not.to.be.null;
                expect(res.body.message).to.be.equal("User deleted with success!");
                if(err){
                    throw err;
                }
                done();
            })
    })

    it('should fail to delete user with invalid authorization', (done) => {
        request(baseurl)
            .delete('/users')
            .set('Authorization', '')
            .set('content-type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).not.to.be.equal(200);
                if(err){
                    throw err;
                }
                done();
            })
    })

    it('should fail to delete user with missing authorization', (done) => {
        request(baseurl)
            .delete('/users')
            .set('content-type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).not.to.be.equal(200);
                if(err){
                    throw err;
                }
                done();
            })
    })

    it('should fail to delete all users using invalid admin key', (done) => {
        request(baseurl)
            .delete('/all-users')
            .send({
                key_admin: fake_key_admin
            })
            .set('Accept', 'application/json')
            .set('content-type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).not.to.be.equal(200);
                if(err){
                    throw err;
                }
                done();
            })
    })

    it('should fail to get deleted user info with valid authorization', (done) => {
        request(baseurl)
            .get('/users')
            .set('Authorization', token)            
            .set('content-type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).not.to.be.equal(200);
                if(err){
                    throw err;
                }
                done();
            })
    })

        //fails
        it('should fail to create new user in case of invalid credentials', (done) => {
            request(baseurl)
                .post('/users')
                .send({
                    name: '',
                    email: 'ahmedbadra',
                    password: ''
                })
                .set('Accept', 'application/json')
                .set('content-type', 'application/json')
                .end(function(err, res) {
                    expect(res.statusCode).not.to.be.equal(200);
                    if(err){
                        throw err;
                    }
                    done();
                })
        })
    
    
        //fails
        it('should fail to create new user in case of missing credentials', (done) => {
            request(baseurl)
                .post('/users')
                .send({
                    name: 'ahmed',
                    password: 'sdafsfdgd'
                })
                .set('Accept', 'application/json')
                .set('content-type', 'application/json')
                .end(function(err, res) {
                    expect(res.statusCode).not.to.be.equal(200);
                    if(err){
                        throw err;
                    }
                    done();
                })
        })

    it('should delete all users successfully using valid admin key', (done) => {
        request(baseurl)
            .delete('/all-users')
            .send({
                key_admin: key_admin
            })
            .set('Accept', 'application/json')
            .set('content-type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body).not.to.be.null;
                expect(res.body.message).to.be.equal("Users deleted with success");
                if(err){
                    throw err;
                }
                done();
            })
    })

    it('should fail to delete all users in case of invalid admin key', (done) => {
        request(baseurl)
            .delete('/all-users')
            .set('Accept', 'application/json')
            .set('content-type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).not.to.be.equal(200);
                if(err){
                    throw err;
                }
                done();
            })
    })

});