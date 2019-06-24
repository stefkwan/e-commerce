const chai = require('chai');

const should = chai.should()

describe('Products CRUD', () => {
	describe('GET /products', () => {
		it('should send array of products with 200 status', done => {
			chai.request(app)
			.get('/products')
			.then( res => {
				//return list of products
				res.should.have.status(200);
				(res.body).should.be.a('array');
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
			.send({
				name: "nama produk",
				image: "url image",
				price: 200000,
				stock: 2
			})
			.then( res => {
				res.should.have.status(201)

				let newProduct = res.body
				newProduct.should.be.a('object')

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
		})
	})

	describe('GET /products/:id', () => {
		it('should send array of products with 200 status', done => {
			chai.request(app)
			.get('/products/'+productId)
			.then( res => {
				res.should.have.status(200);

				let foundProduct = res.body
				foundProduct.should.be.a('object')

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
			.send({
				name: "nama baru produk",
				image: "url baru image",
				price: 300000,
				stock: 3
			})
			.then( res => {
				res.should.have.status(200)

				let newProduct = res.body
				newProduct.should.be.a('object')

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
		})
	})

	describe('DELETE /products/:id', () => {
		it('should send deletedCount 1 with status 200', done => {
			chai.request(app)
			.delete('/products/'+productId)
			.then( res => {
				res.should.have.status(200);

				let body = res.body;
				body.should.be.a('object');

				body.should.have.property('deletedCount');
          		(body.deletedCount).should.equal(1);

          		done()
			})
		})
	})

})