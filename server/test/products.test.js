const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');

chai.use(chaiHttp);
var expect = require('chai').expect

describe('Products CRUD', () => {
	//first create admin user and login to get access token
	let access_token_admin = "";
	let access_token = "";
	describe('POST /users and POST /users/login', () => {
		it('to return user (admin) object with 201 status', done => {
			chai.request(app)
			.post('/users')
			.send({
				name: "admin1", 
				email: "admin1@ecommerce.com", 
				address: "alamat admin",
				password: "password admin"
			})
			.then( res => {
				expect(res).to.have.status(201)

				let newUser = res.body
				expect(newUser).to.be.a('object')

				expect(newUser).to.have.property('name')
				expect(newUser).to.have.property('email')
				expect(newUser).to.have.property('address')
				expect(newUser).to.have.property('password')

          		expect(newUser.name).to.equal('admin1');
          		expect(newUser.email).to.equal('admin1@ecommerce.com');
          		expect(newUser.address).to.equal('alamat admin');

          		done()
			})
			.catch(err => {
				console.log(err)
			})
		})

		it('to return access_token with 200 status', done => {
			chai.request(app)
			.post('/users/login')
			.send({
				email: "admin1@ecommerce.com",
				password: "password admin"
			})
			.then( res => {
				expect(res).to.have.status(200)
				expect(res.body).to.have.property('access_token')
				expect(res.body.access_token).to.be.a('string')

				access_token_admin = (res.body.access_token)
          		done()
			})
			.catch(err => {
				console.log(err)
			})
		})

		it('to return user (regular) object with 201 status', done => {
			chai.request(app)
			.post('/users')
			.send({
				email: "b@b.com",
				password: "password b"
			})
			.then( res => {
				expect(res).to.have.status(201)

				let newUser = res.body
				expect(newUser).to.be.a('object')

				expect(newUser).to.have.property('email')
				expect(newUser).to.have.property('password')

          		expect(newUser.email).to.equal('b@b.com');

          		done()
			})
			.catch(err => {
				console.log(err)
			})
		})

		it('to return access_token with 200 status', done => {
			chai.request(app)
			.post('/users/login')
			.send({
				email: "b@b.com",
				password: "password b"
			})
			.then( res => {
				expect(res).to.have.status(200)
				expect(res.body).to.have.property('access_token')
				expect(res.body.access_token).to.be.a('string')

				access_token = (res.body.access_token)
          		done()
			})
			.catch(err => {
				console.log(err)
			})
		})
	})

	describe('GET /products', () => {
		// console.log(access_token)
		it('to send array of products with 200 status', done => {
			chai.request(app)
			.get('/products')
			.then( res => {
				//return list of products
				expect(res).to.have.status(200);
				expect(res.body).to.be.an('array');
				done()
			})
			.catch( err => {
				console.log(err)
			})
		})
	})

	let productId

	describe('POST /products', () => {
		it('to send an object with 201 status (for admin)', done => {
			chai.request(app)
			.post('/products')
			.set('access_token', access_token_admin)
			.send({
				name: "nama produk",
				image: "url image",
				price: 200000,
				stock: 2
			})
			.then( res => {
				expect(res).to.have.status(201)

				let newProduct = res.body
				expect(newProduct).to.be.an('object')

				expect(newProduct).to.have.property('name')
				expect(newProduct).to.have.property('image')
				expect(newProduct).to.have.property('price')
				expect(newProduct).to.have.property('stock')

          		expect(newProduct.name).to.equal('nama produk');
          		expect(newProduct.image).to.equal('url image');
          		expect(newProduct.price).to.equal(200000);
          		expect(newProduct.stock).to.equal(2);

          		productId = newProduct._id

          		done()
			})
			.catch(err => {
				console.log(err)
			})
		})

		it('to get error because product price cannot be negative', done => {
			chai.request(app)
			.post('/products')
			.set('access_token', access_token_admin)
			.send({
				name: "nama produk",
				image: "url image",
				price: -1,
				stock: 2
			})
			.then( res => {
				expect(res).to.have.property('text')
				expect(res.text).to.equal('"Product validation failed: price: It is already free. It cannot be a negative price."')
          		done()
			})
			.catch(err => {
				console.log(err)
			})
		})

		it('to get error because stock cannot be negative', done => {
			chai.request(app)
			.post('/products')
			.set('access_token', access_token_admin)
			.send({
				name: "nama produk",
				image: "url image",
				price: 1,
				stock: -1
			})
			.then( res => {
				expect(res).to.have.property('text')
				expect(res.text).to.equal('"Product validation failed: stock: Min. stock is out of stock (for pre-sale purposes) to register new product"')
          		done()
			})
			.catch(err => {
				console.log(err)
			})
		})

		it('to get error 403 because regular user cannot add products', done => {
			chai.request(app)
			.post('/products')
			.set('access_token', access_token)
			.send({
				name: "nama produk",
				image: "url image",
				price: 210000,
				stock: 3
			})
			.then( res => {
				expect(res).to.have.status(403)
				expect(res).to.have.property('text')
				expect(res).to.have.property('statusCode')
				expect(res.statusCode).to.equal(403)
				expect(res.text).to.equal('"you are not an admin"')

          		done()
			})
			.catch(err => {
				console.log(err)
			})
		})
	})

	describe('GET /products/:id', () => {
		it('to send one product with selected id 200 status', done => {
			chai.request(app)
			.get('/products/'+productId)
			.set('access_token', access_token)
			.then( res => {
				expect(res).to.have.status(200);

				let foundProduct = res.body
				expect(foundProduct).to.be.an('object')

				expect(foundProduct).to.have.property('name')
				expect(foundProduct).to.have.property('image')
				expect(foundProduct).to.have.property('price')
				expect(foundProduct).to.have.property('stock')

          		expect(foundProduct.name).to.equal('nama produk');
          		expect(foundProduct.image).to.equal('url image');
          		expect(foundProduct.price).to.equal(200000);
          		expect(foundProduct.stock).to.equal(2);
				done()
			})
			.catch( err => {
				console.log(err)
			})
		})
	})

	describe('PATCH /products/:id', () => {
		it('to send object with updated values, and status 200', done => {
			chai.request(app)
			.patch('/products/'+productId)
			.set('access_token', access_token_admin)
			.send({
				name: "nama baru produk",
				image: "url baru image",
				price: 300000,
				stock: 3
			})
			.then( res => {
				expect(res).to.have.status(200)

				let newProduct = res.body
				expect(newProduct).to.be.an('object')

				expect(newProduct).to.have.property('name')
				expect(newProduct).to.have.property('image')
				expect(newProduct).to.have.property('price')
				expect(newProduct).to.have.property('stock')

          		expect(newProduct.name).to.equal('nama baru produk');
          		expect(newProduct.image).to.equal('url baru image');
          		expect(newProduct.price).to.equal(300000);
          		expect(newProduct.stock).to.equal(3);
          		expect(newProduct._id).to.equal(productId);

          		done()
			})
			.catch(err => {
				console.log(err)
			})
		})

		it('to get error 403 because user is not admin', done => {
			chai.request(app)
			.patch('/products/'+productId)
			.set('access_token', access_token)
			.send({
				name: "nama baru produk",
				image: "url baru image",
				price: 300000,
				stock: 3
			})
			.then( res => {
				expect(res).to.have.status(403)
				expect(res).to.have.property('text')
				expect(res).to.have.property('statusCode')
				expect(res.statusCode).to.equal(403)
				expect(res.text).to.equal('"you are not an admin"')

          		done()
			})
			.catch(err => {
				console.log(err)
			})
		})
	})

	describe('DELETE /products/:id', () => {
		it('to send deletedCount 1 with status 200', done => {
			chai.request(app)
			.delete('/products/'+productId)
			.set('access_token', access_token_admin)
			.then( res => {
				expect(res).to.have.status(200);

				let deletedProduct = res.body
				expect(deletedProduct).to.be.an('object')

				expect(deletedProduct).to.have.property('name')
				expect(deletedProduct).to.have.property('image')
				expect(deletedProduct).to.have.property('price')
				expect(deletedProduct).to.have.property('stock')

          		expect(deletedProduct.name).to.equal('nama baru produk');
          		expect(deletedProduct.image).to.equal('url baru image');
          		expect(deletedProduct.price).to.equal(300000);
          		expect(deletedProduct.stock).to.equal(3);
          		expect(deletedProduct._id).to.equal(productId);

          		done()
			})
			.catch(err => {
				console.log(err)
			})
		})

		it('to get error 403 because user is not admin', done => {
			chai.request(app)
			.delete('/products/'+productId)
			.set('access_token', access_token)
			.then( res => {
				expect(res).to.have.status(403)
				expect(res).to.have.property('text')
				expect(res).to.have.property('statusCode')
				expect(res.statusCode).to.equal(403)
				expect(res.text).to.equal('"you are not an admin"')

          		done()
			})
			.catch(err => {
				console.log(err)
			})
		})
	})

})