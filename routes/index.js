var express = require('express')
var router = express.Router()
const { Client } = require('pg')

/* GET Portal - connection form */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Hisha' })
});


/* GET test connecting to database in Portal */
router.post('/test', function(req, res, next) {

	const connection_info = req.body
	const useSSL = process.env.SSL !== 'false'
	// TODO: check validation of connetion_info one by one

	const client = new Client({
		user: connection_info.username.replace(/\s/g, ''),
	  host: connection_info.host.replace(/\s/g, ''),
	  database: connection_info.database.replace(/\s/g, ''),
	  password: connection_info.password,
	  port: connection_info.port,
	  ssl : useSSL
	})
	
	client.connect()

	client.query('SELECT NOW()', (error, response) => {
		client.end()

	  if(error){
	  	console.error(error.stack)
	  	res.send({ result: false })
	  } else {
	  	res.send({ result: true })
	  }	  
	})
});


/* POST connect to a postgres database  */
router.post('/connect', function(req, res, next) {
	
	const connection_info = req.body 
	const useSSL = process.env.SSL !== 'false'

	// TODO: check validation of connetion_info one by one
	var session = req.session
	session.username = connection_info.username.replace(/\s/g, '')
	session.host = connection_info.host.replace(/\s/g, '')
	session.port = connection_info.port
	session.database = connection_info.database.replace(/\s/g, '')
	session.password = connection_info.password
	session.useSSL = useSSL

	const client = new Client({
		user: session.username,
	  host: session.host,
	  database: session.database,
	  password: session.password,
	  port: session.port,
	  ssl: session.useSSL
	})

	client.connect()

	// Here we select from pg_stat_user_tables which is the same as
	// pg_stat_all_tables, except that only user tables are shown.
	client.query('SELECT relid as table_id, relname as table_name,n_live_tup as rows FROM pg_stat_user_tables', (error, response) => {
		client.end()
	  if(error){
	  	console.error(error)
	  	res.send({ result: false })
	  } else {
	  	res.render('dashboard', { title: 'Dashboard - Hisha', tables: response.rows });
	  }	  
	})
 
});

/* TODO: connecting with connection URL */
// postgres://<username>:<password>@<host>:<port>/<database>


router.get('/disconnect', (req, res, next)=>{
	req.session.destroy((err)=>{
		res.render('index', { title: 'Hisha' })
	});
	
})

module.exports = router;
