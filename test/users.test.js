const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');

chai.use(chaiHttp);
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
			.send({
				name: "nama user", 
				email: "a@a.com", 
				address: "alamat user",
				password: "password user"
			})
			.then( res => {
				res.should.have.status(201)

				let newUser = res.body
				newUser.should.be.a('object')

				newUser.should.have.property('name')
				newUser.should.have.property('email')
				newUser.should.have.property('address')
				newUser.should.have.property('password')
				newUser.should.have.property('transaction')

          		(newUser.name).should.equal('nama user');
          		(newUser.email).should.equal('a@a.com');
          		(newUser.address).should.equal('alamat user');
          		(newUser.address).should.equal('password user');
          		(newUser.transaction).should.be.a('array');

          		//should also create a new cart with this user ID and status ""

          		done()
			})
		})
	})

	let access_token

	describe('POST /users/login', () => {
		it('should send array of users with 200 status', done => {
			chai.request(app)
			.post('/users/login')
			.send({
				email: "a@a.com", 
				password: "password user"
			})
			.then( res => {
				res.should.have.status(200)
				(res.body).should.have.property('access_token')
				(res.body.access_token).should.be.a('string')

				access_token = (res.body.access_token)
				done()
			})
			.catch( err => {
				console.log(err)
			})
		})
	})

	describe('PATCH /users', () => {
		it('should send array of users with 200 status', done => {
			chai.request(app)
			.patch('/users')
			.set('access_token', access_token)
			.send({
				name: "new name", 
				address: "new address", 
				password: "new password"
			})
			.then( res => {
				res.should.have.status(200)

				let updatedUser = res.body
				updatedUser.should.be.a('object')

				updatedUser.should.have.property('name')
				updatedUser.should.have.property('email')
				updatedUser.should.have.property('address')
				updatedUser.should.have.property('password')
				updatedUser.should.have.property('transaction')

          		(updatedUser.name).should.equal('new name');
          		(updatedUser.email).should.equal('a@a.com');
          		(updatedUser.address).should.equal('new address');
          		(updatedUser.address).should.equal('new password');
          		(updatedUser.transaction).should.be.a('array');

				done()
			})
			.catch( err => {
				console.log(err)
			})
		})
	})

})