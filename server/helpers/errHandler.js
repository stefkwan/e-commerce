module.exports = function(err){
	if (err.status == null) err.status = 400
	let errorDetail = {status: err.status, message: err.message}
	if (err.message == null){
		switch (err.status){
			case (401):
				errorDetail.message = 'Unauthorized access'
				break;
			case (403):
				errorDetail.message = 'Forbidden access'
				break;
			case (404):
				errorDetail.message = 'Page not found'
				break;
			case (500):
				errorDetail.message = 'Internal server error'
				break;
			default:
				errorDetail.message = err.message
		}
	}
	return errorDetail
}