const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');

chai.use(chaiHttp);
chai.should()

describe('Products CRUD', () => {
	//first create admin user and login to get access token
	let access_token = "";
	describe('POST /users and POST /users/login', () => {
		it('should return user object with 201 status', done => {
			chai.request(app)
			.post('/users')
			.send({
				name: "admin1", 
				email: "admin1@ecommerce.com", 
				address: "alamat admin",
				password: "password admin"
			})
			.then( res => {
				res.should.have.status(201)

				let newUser = res.body
				newUser.should.be.a('object')

				newUser.should.have.property('name')
				newUser.should.have.property('email')
				newUser.should.have.property('address')
				newUser.should.have.property('password')

          		(newUser.name).should.equal('admin1');
          		(newUser.email).should.equal('admin1@ecommerce.com');
          		(newUser.address).should.equal('alamat admin');
          		(newUser.address).should.equal('password admin');

          		done()
			})
			.catch(err => {
				console.log(err)
			})
		})

		it('should return access_token with 200 statys', done => {
			chai.request(app)
			.post('/users/login')
			.send({
				email: "admin1@ecommerce.com",
				password: "password admin"
			})
			.then( res => {
				res.should.have.status(200)
				(res.body).should.have.property('access_token')
				(res.body.access_token).should.be.a('string')

				access_token = (res.body.access_token)
				console.log(access_token)
          		done()
			})
			.catch(err => {
				console.log(err)
			})
		})
	})

	describe('GET /products', () => {
		console.log(access_token)
		it('should send array of products with 200 status', done => {
			chai.request(app)
			.get('/products')
			.set('access_token', access_token)
			.then( res => {
				//return list of products
				res.should.have.status(200);
				(res.body).should.be.an('array');
				done()
			})
			.catch( err => {
				console.log(err)
			})
		})
	})

	let productId

	describe('POST /products', () => {
		it('should send an object with 201 status', done => {
			chai.request(app)
			.post('/products')
			.set('access_token', access_token)
			.send({
				name: "nama produk",
				image: "url image",
				price: 200000,
				stock: 2
			})
			.then( res => {
				res.should.have.status(201)

				let newProduct = res.body
				newProduct.should.be.an('object')

				newProduct.should.have.property('name')
				newProduct.should.have.property('image')
				newProduct.should.have.property('price')
				newProduct.should.have.property('stock')

          		(newProduct.name).should.equal('nama produk');
          		(newProduct.image).should.equal('url image');
          		(newProduct.price).should.equal(200000);
          		(newProduct.stock).should.equal(2);

          		productId = newProduct._id

          		done()
			})
			.catch(err => {
				console.log(err)
			})
		})
	})

	describe('GET /products/:id', () => {
		it('should send array of products with 200 status', done => {
			chai.request(app)
			.get('/products/'+productId)
			.set('access_token', access_token)
			.then( res => {
				res.should.have.status(200);

				let foundProduct = res.body
				foundProduct.should.be.an('object')

				foundProduct.should.have.property('name')
				foundProduct.should.have.property('image')
				foundProduct.should.have.property('price')
				foundProduct.should.have.property('stock')

          		(foundProduct.name).should.equal('nama produk');
          		(foundProduct.image).should.equal('url image');
          		(foundProduct.price).should.equal(200000);
          		(foundProduct.stock).should.equal(2);
				done()
			})
			.catch( err => {
				console.log(err)
			})
		})
	})

	describe('PATCH /products/:id', () => {
		it('should send object with updated values, and status 200', done => {
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
				res.should.have.status(200)

				let newProduct = res.body
				newProduct.should.be.an('object')

				newProduct.should.have.property('name')
				newProduct.should.have.property('image')
				newProduct.should.have.property('price')
				newProduct.should.have.property('stock')

          		(newProduct.name).should.equal('nama baru produk');
          		(newProduct.image).should.equal('url baru image');
          		(newProduct.price).should.equal(300000);
          		(newProduct.stock).should.equal(3);
          		(newProduct._id).should.equal(productId);

          		done()
			})
			.catch(err => {
				console.log(err)
			})
		})
	})

	describe('DELETE /products/:id', () => {
		it('should send deletedCount 1 with status 200', done => {
			chai.request(app)
			.delete('/products/'+productId)
			.set('access_token', access_token)
			.then( res => {
				res.should.have.status(200);

				let body = res.body;
				body.should.be.an('object');

				body.should.have.property('deletedCount');
          		(body.deletedCount).should.equal(1);

          		done()
			})
			.catch(err => {
				console.log(err)
			})
		})
	})

})