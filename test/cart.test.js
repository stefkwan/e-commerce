const chai = require('chai');

const should = chai.should()


describe('User adding/deleting items to Cart', () => {
	let access_token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhQGEuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ._1GvX98Xj3HiGvTilEoAkj5bPR1bhvfPaVFdjcjBtSA`

	describe('GET /cart', () => {
		it('should send array of users with 200 status', done => {
			chai.request(app)
			.get('/cart')
			.set('access_token', access_token)
			.then( res => {
				res.should.have.status(200);

				let cart = res.body;
				cart.should.be.a('object');

				cart.should.have.property('items')
				cart.should.have.property('count')
				cart.should.have.property('dateAdded')

          		(cart.items).should.be.a('array')
          		(cart.count).should.be.a('array')
          		(cart.dateAdded).should.be.a('array')

				done()
			})
			.catch( err => {
				console.log(err)
			})
		})
	})

	describe('POST /cart', () => {
		it('should send an object with 200 status', done => {
			chai.request(app)
			.post('/cart')
			.set('access_token', access_token)
			.send({
				item: "id item"
			})
			.then( res => {
				res.should.have.status(201)

				//check from access token who is logged in, then add to logged in user's cart
				
          		done()
			})
		})
	})

})