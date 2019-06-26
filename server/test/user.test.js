const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');

chai.use(chaiHttp);
var expect = require('chai').expect

describe('Users CRUD', () => {
	describe('GET /users', () => {
		it('to send array of users with 200 status', done => {
			chai.request(app)
			.get('/users')
			.then( res => {
				//return list of users
				expect(res).to.have.status(200);
				expect(res.body).to.be.an('array');
				done()
			})
			.catch( err => {
				console.log(err)
			})
		})
	})

	describe('POST /users', () => {
		it('to send an object with 201 status', done => {
			chai.request(app)
			.post('/users')
			.send({
				name: "nama user", 
				email: "a@a.com", 
				address: "alamat user",
				password: "password user"
			})
			.then( res => {
				expect(res).to.have.status(201)

				let newUser = res.body
				expect(newUser).to.be.an('object')

				expect(newUser).to.have.property('name')
				expect(newUser).to.have.property('email')
				expect(newUser).to.have.property('address')
				expect(newUser).to.have.property('password')

          		expect(newUser.name).to.equal('nama user');
          		expect(newUser.email).to.equal('a@a.com');
          		expect(newUser.address).to.equal('alamat user');

          		//to also create a new cart with this user ID and status ""

          		done()
			})
			.catch(err => {
				console.log(err)
			})
		})
	})

	let access_token

	describe('POST /users/login', () => {
		it('to send array of users with 200 status', done => {
			chai.request(app)
			.post('/users/login')
			.send({
				email: "a@a.com", 
				password: "password user"
			})
			.then( res => {
				expect(res).to.have.status(200)
				expect(res.body).to.have.property('access_token')
				expect(res.body.access_token).to.be.a('string')

				access_token = (res.body.access_token)
				done()
			})
			.catch( err => {
				console.log(err)
			})
		})
	})

	describe('PATCH /users', () => {
		it('to send array of users with 200 status', done => {
			chai.request(app)
			.patch('/users')
			.set('access_token', access_token)
			.send({
				name: "new name", 
				address: "new address", 
				password: "new password"
			})
			.then( res => {
				expect(res).to.have.status(200)

				let updatedUser = res.body
				expect(updatedUser).to.be.a('object')

				expect(updatedUser).to.have.property('name')
				expect(updatedUser).to.have.property('email')
				expect(updatedUser).to.have.property('address')
				expect(updatedUser).to.have.property('password')

          		expect(updatedUser.name).to.equal('new name');
          		expect(updatedUser.email).to.equal('a@a.com');
          		expect(updatedUser.address).to.equal('new address');

				done()
			})
			.catch( err => {
				console.log(err)
			})
		})
	})

})