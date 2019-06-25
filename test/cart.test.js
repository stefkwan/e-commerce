const chai = require('chai');
const chaiHttp = require('chai-http');
let clearUser = require('../helpers/clear').clearUser

const app = require('../app');

chai.use(chaiHttp);
var expect = require('chai').expect

describe('User adding/deleting products to Cart', () => {
    //create a new cart when user register or checks out,
	let access_token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0Y2FydEBlY29tbWVyY2UuY29tIn0.TVEsf4-9QIylxQjSVCaFQVyQVfrVCNDFYRUtEEUcYOE`
    //cart has userID of new/logged in user and status ""
	describe('POST /cart', () => {
		describe('create new user first POST /users', () => {
			it.only('should send an object with 201 status', done => {
				chai.request(app)
				.post('/users')
				.send({
					name: "nama user", 
					email: "testcart@ecommerce.com", 
					address: "alamat user",
					password: "password user"
				})
				.then( res => {
					console.log(res.status)
					expect(res).to.have.status(201)

					let newUser = res.body
					expect(newUser).to.be.an('object')


					expect(newUser).to.have.property('name')
					expect(newUser).to.have.property('name')
					expect(newUser).to.have.property('email')
					expect(newUser).to.have.property('address')
					expect(newUser).to.have.property('password')
					expect(newUser).to.have.property('transaction')

	          		expect(newUser.name).to.equal('nama user');
	          		expect(newUser.email).to.equal('testcart@ecommerce.com');
	          		expect(newUser.address).to.equal('alamat user');
	          		// expect(newUser.password).to.equal('password user');
	          		expect(newUser.transaction).to.be.an('array');

	          		//should also create a new cart with this user ID and status ""
	          		done()
				})
				.catch(err => {
					console.log(err)
				})
			})
		})

		describe('then login to get access token POST /users/login', () => {
			it.only('should send logged in user with 200 status', done => {
				chai.request(app)
				.post('/users/login')
				.send({
					email: "testcart@ecommerce.com", 
					password: "password user"
				})
				.then( res => {
					expect(res).to.have.status(200)
					expect(res.body).to.have.property('access_token')
					expect(res.body.access_token).to.be.a('string')

					access_token = (res.body.access_token)
					console.log(access_token)
					done()
				})
				.catch( err => {
					console.log(err)
				})
			})
		})

		describe('then create cart for the user POST /cart', () => {
		
			it.only('should send an object with 200 status', done => {
				chai.request(app)
				.post('/cart')
				.set('access_token', access_token)
				.then( res => {
					expect(res).to.have.status(201)

					//check from access token who is logged in, 
					//then add to logged in user's cart
					let newCart = res.body
					expect(newCart).to.have.property('products') //ref to products schema
					expect(newCart).to.have.property('count')
					expect(newCart).to.have.property('dateAdded')
					expect(newCart).to.have.property('status')
					expect(newCart).to.have.property('userId')

	          		expect(newCart.products).to.be.an('array')
	          		expect(newCart.count).to.be.an('array')
	          		expect(newCart.dateAdded).to.be.an('array')
	          		expect(newCart.status).to.be.a('string') //"" initial value
	          		expect(newCart.status).to.be.a('string') // user ID

	          		expect(newCart.status).to.equal('')

	          		done()
				})
				.catch(err => {
					console.log(err)
				})
			})
		})
	})

	describe('GET /cart', () => {
		it.only('should send array of users with 200 status', done => {
			chai.request(app)
			.get('/cart') //get cart with correct userId and "" status
			.set('access_token', access_token)
			.then( res => {
				expect(res).to.have.status(200);

				let cart = res.body;
				expect(cart).to.be.an('object');

				expect(cart).to.have.property('products')
				expect(cart).to.have.property('count')
				expect(cart).to.have.property('dateAdded')
				expect(cart).to.have.property('status')
				expect(cart).to.have.property('userId')

          		expect(cart.products).to.be.an('array')
          		expect(cart.count).to.be.an('array')
          		expect(cart.dateAdded).to.be.an('array')
          		expect(cart.status).to.be.a('string') //"" or "checked-out"

          		expect(cart.status).to.equal('')

				done()
			})
			.catch( err => {
				console.log(err)
			})
		})
	})

	describe('PATCH /cart/checkout', () => {
		it('should send object with 200 status', done => {
			chai.request(app)
			.post('/cart/checkout')
			.set('access_token', access_token)
			.send({
				cartId: cartId	//mark cart as checked-out, 
								//then create new cart for user
			})
			.then( res => {
				expect(res).to.have.status(200)

				//check from access token who is logged in, 
				//then add to logged in user's cart
				let cart = res.body
				expect(cart).to.have.property('products') //ref to products schema
				expect(cart).to.have.property('count')
				expect(cart).to.have.property('dateAdded')
				expect(cart).to.have.property('status')
				expect(cart).to.have.property('userId')

          		expect(cart.products).to.be.an('array')
          		expect(cart.count).to.be.an('array')
          		expect(cart.dateAdded).to.be.an('array')
          		expect(cart.status).to.be.a('string') //"" or "checked-out"

          		expect(cart.status).to.equal('checked-out')
          		done()

			})
			.catch(err => {
				console.log(err)
			})
		})
	})

	let productId = "product ID"
	//adding/deleting products from cart
	describe('PATCH /cart/add', () => {
		it('should send an object with 200 status', done => {
			chai.request(app)
			.patch('/cart/add')
			.set('access_token', access_token)
			.send({
				productId: productId
			})
			.then( res => {
				expect(res).to.have.status(200)

				//check from access token who is logged in, 
				//then add to logged in user's cart
				let cart = res.body
				expect(cart).to.have.property('products') //ref to products schema
				expect(cart).to.have.property('count')
				expect(cart).to.have.property('dateAdded')
				expect(cart).to.have.property('status')
				expect(cart).to.have.property('userId')

          		expect(cart.products).to.be.a('array')
          		expect(cart.count).to.be.a('array')
          		expect(cart.dateAdded).to.be.a('array')
          		expect(cart.status).to.be.a('string') //"" or "checked-out"

          		expect(cart.products).to.have.length.of(1)
          		expect(cart.count).to.have.length.of(1)
          		expect(cart.dateAdded).to.have.length.of(1)
          		expect(cart.status).to.equal('')
          		done()
			})
			.catch(err => {
				console.log(err)
			})
		})
	})

	describe('PATCH /cart/del', () => {
		it('should send an object with 200 status', done => {
			chai.request(app)
			.patch('/cart/del')
			.set('access_token', access_token)
			.send({
				productId: productId
			})
			.then( res => {
				expect(res).to.have.status(200)

				//check from access token who is logged in, 
				//then add to logged in user's cart
				let cart = res.body
				expect(cart).to.have.property('products') //ref to products schema
				expect(cart).to.have.property('count')
				expect(cart).to.have.property('dateAdded')
				expect(cart).to.have.property('status')
				expect(cart).to.have.property('userId')

          		expect(cart.products).to.be.an('array')
          		expect(cart.count).to.be.an('array')
          		expect(cart.dateAdded).to.be.an('array')
          		expect(cart.status).to.be.a('string') //"" or "checked-out"

          		expect(cart.products).to.have.length.of(0)
          		expect(cart.count).to.have.length.of(0)
          		expect(cart.dateAdded).to.have.length.of(0)
          		expect(cart.status).to.equal('')
          		done()
			})
			.catch(err => {
				console.log(err)
			})
		})
	})
})