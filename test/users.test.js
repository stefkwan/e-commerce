const chai = require('chai');

const should = chai.should()

describe('Users CRUD', () => {
	describe('GET /users', () => {
		it('should send array of users with 200 status', done => {
			chai.request(app)
			.get('/users')
			.then( res => {
				//return list of users
				res.should.have.status(200);
				(res.body).should.be.a('array');
				done()
			})
			.catch( err => {
				console.log(err)
			})
		})
	})

	describe('POST /users', () => {
		it('should send an object with 201 status', done => {
			chai.request(app)
			.post('/users')
		})
	})
})