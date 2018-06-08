var express = require('express')
var router = express.Router()
const { Client } = require('pg')

/* GET Portal - connection form */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' })
});


/* GET test connecting to database in Portal */
router.post('/test', function(req, res, next) {

	const connection_info = req.body
	
	// TODO: check validation of connetion_info one by one

	const client = new Client({
		user: connection_info.username.replace(/\s/g, ''),
	  host: connection_info.host.replace(/\s/g, ''),
	  database: connection_info.database.replace(/\s/g, ''),
	  password: connection_info.password,
	  port: connection_info.port,
	  ssl : true
	})
	
	client.connect()

	client.query('SELECT NOW()', (error, response) => {
		client.end()

	  console.log(error ? error.stack : response)	  
	  if(error){
	  	res.send({ result: false })
	  } else {
	  	res.send({ result: true })
	  }	  
	})
});


/* POST connect to a postgres database  */
router.post('/connect', function(req, res, next) {

	const client = new Client()

	client.connect()

	// client.query('SELECT $1 FROM users', [/* column name */], (err, res) => {
	//   console.log(err ? err.stack : res.rows[0].message) // Hello World!
	//   client.end()
	  res.render('index', { title: 'Express' });
	// })
 
});

module.exports = router;
