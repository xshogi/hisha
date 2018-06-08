var express = require('express');
var router = express.Router();
const { Client } = require('pg')

/* GET home page. */
router.get('/create', function(req, res, next) {
	// TODO: Parse fields configurations and use SQL to create table

  res.render('', { });
});


/* GET delete a specific table */
router.get('/delete', function(req, res, next) {
  res.render('', { });
});

/* GET delete a specific entry of a specific table */
// Refer view: https://bootsnipp.com/snippets/featured/table-panel-with-pagination
router.get('/new', function(req, res, next) {
  res.render('', { });
});


/* GET list tables of current database */
/* This is the same as /connect in index.js */
router.get('/lists', function(req, res, next) {

  if(req.session.username == undefined){
    res.render('index', { title: 'Hisha' })
  } else {
    var session = req.session
    const client = new Client({
      user: session.username,
      host: session.host,
      database: session.database,
      password: session.password,
      port: session.port,
      ssl : true
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
  }
});

/* GET read content of secific table */
router.get('/read', function(req, res, next) {
	const table_name = req.request.table_name;


  res.render('', { });
});

/* POST save cell data */
router.post('/save', function(req, res, next) {
	// TODO: Parse passing the number of row, field name and new value
	// It should be only one field and value since this 
	// API will be call only for single cell updating

  res.send({ result: true });
});


module.exports = router;
