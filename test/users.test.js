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
				newUser.should.have.property('cart')
				newUser.should.have.property('transaction')

          		(newUser.name).should.equal('nama user');
          		(newUser.email).should.equal('a@a.com');
          		(newUser.address).should.equal('alamat user');
          		(newUser.address).should.equal('password user');
          		(newUser.cart).should.be.a('object');
          		(newUser.transaction).should.be.a('array');

          		done()
			})
		})
	})

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

				done()
			})
			.catch( err => {
				console.log(err)
			})
		})
	})

})