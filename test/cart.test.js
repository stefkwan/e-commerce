const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');

chai.use(chaiHttp);
const should = chai.should()

describe('User adding/deleting products to Cart', () => {
	let access_token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhQGEuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ._1GvX98Xj3HiGvTilEoAkj5bPR1bhvfPaVFdjcjBtSA`

    //create a new cart when user register or checks out,
    //cart has userID of new/logged in user and status ""
	describe('POST /cart', () => {
		it('should send an object with 200 status', done => {
			chai.request(app)
			.post('/cart')
			.set('access_token', access_token)
			.then( res => {
				res.should.have.status(201)

				//check from access token who is logged in, 
				//then add to logged in user's cart
				let newCart = res.body
				cart.should.have.property('products') //ref to products schema
				cart.should.have.property('count')
				cart.should.have.property('dateAdded')
				cart.should.have.property('status')

          		(cart.products).should.be.a('array')
          		(cart.count).should.be.a('array')
          		(cart.dateAdded).should.be.a('array')
          		(cart.status).should.be.a('string') //"" initial value

          		(cart.status).should.equal('')

          		done()
			})
		})
	})

	describe('GET /cart', () => {
		it('should send array of users with 200 status', done => {
			chai.request(app)
			.get('/cart') //get cart with correct userId and "" status
			.set('access_token', access_token)
			.then( res => {
				res.should.have.status(200);

				let cart = res.body;
				cart.should.be.a('object');

				cart.should.have.property('products')
				cart.should.have.property('count')
				cart.should.have.property('dateAdded')
				cart.should.have.property('status')

          		(cart.products).should.be.a('array')
          		(cart.count).should.be.a('array')
          		(cart.dateAdded).should.be.a('array')
          		(cart.status).should.be.a('string') //"" or "checked-out"

          		(cart.status).should.equal('')

				done()
			})
			.catch( err => {
				console.log(err)
			})
		})
	})

	describe('POST /cart/checkout', () => {
		it('should send object with 200 status', done => {
			chai.request(app)
			.post('/card/checkout')
			.set('access_token', access_token)
			.send({
				cartId: cartId	//mark cart as checked-out, 
								//then create new cart for user
			})
			.then( res => {
				res.should.have.status(200)

				//check from access token who is logged in, 
				//then add to logged in user's cart
				let newCart = res.body
				cart.should.have.property('products') //ref to products schema
				cart.should.have.property('count')
				cart.should.have.property('dateAdded')
				cart.should.have.property('status')

          		(cart.products).should.be.a('array')
          		(cart.count).should.be.a('array')
          		(cart.dateAdded).should.be.a('array')
          		(cart.status).should.be.a('string') //"" or "checked-out"

          		(cart.status).should.equal('checked-out')
          		done()

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
				res.should.have.status(200)

				//check from access token who is logged in, 
				//then add to logged in user's cart
				let newCart = res.body
				cart.should.have.property('products') //ref to products schema
				cart.should.have.property('count')
				cart.should.have.property('dateAdded')
				cart.should.have.property('status')

          		(cart.products).should.be.a('array')
          		(cart.count).should.be.a('array')
          		(cart.dateAdded).should.be.a('array')
          		(cart.status).should.be.a('string') //"" or "checked-out"

          		(cart.products).should.have.length.of(1)
          		(cart.count).should.have.length.of(1)
          		(cart.dateAdded).should.have.length.of(1)
          		(cart.status).should.equal('')
          		done()
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
				res.should.have.status(200)

				//check from access token who is logged in, 
				//then add to logged in user's cart
				let newCart = res.body
				cart.should.have.property('products') //ref to products schema
				cart.should.have.property('count')
				cart.should.have.property('dateAdded')
				cart.should.have.property('status')

          		(cart.products).should.be.a('array')
          		(cart.count).should.be.a('array')
          		(cart.dateAdded).should.be.a('array')
          		(cart.status).should.be.a('string') //"" or "checked-out"

          		(cart.products).should.have.length.of(0)
          		(cart.count).should.have.length.of(0)
          		(cart.dateAdded).should.have.length.of(0)
          		(cart.status).should.equal('')
          		done()
			})
		})
	})
})