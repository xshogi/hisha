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

  const query = 'SELECT relid as table_id, relname as table_name,n_live_tup as rows FROM pg_stat_user_tables';
  build_connection(req.session, query, (result)=>{
    if(result == false)
      res.render('index', { title: 'Hisha' })
    else
      res.render('dashboard', { title: 'Dashboard - Hisha', tables: result.rows }); 
  })
  
});

/* GET read content of secific table */
router.get('/read/:table_name', function(req, res, next) {
	const table_name = req.params.table_name;
  const query = 'SELECT * FROM ' + table_name;
  build_connection(req.session, query, (result)=>{
    if(result == false)
      res.render('index', { title: 'Hisha' })
    else{
      const query = "select column_name from information_schema.columns where table_name = '" + table_name + "'";
      build_connection(req.session, query, (columns)=>{
        if(columns == false)
          res.render('index', { title: 'Hisha' })
        else{
          res.render('table', { 
            title: 'Table ' + table_name + ' - Hisha', 
            table_name: table_name,
            columns: columns.rows,
            rows: result.rows 
          });
        }
      }); 
    }
  })
});

/* POST save cell data */
router.post('/save', function(req, res, next) {
	// TODO: Parse passing the number of row, field name and new value
	// It should be only one field and value since this 
	// API will be call only for single cell updating

  res.send({ result: true });
});

var build_connection = (session, query, callback)=>{
  if(session.username == undefined){
    console.error('connect without username')
    callback(false)
  } else {
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
    client.query(query, (error, response) => {
      client.end()
      if(error){
        console.error(error)
        callback(false)
      } else {
        callback(response)  
      }        
    })
  }
};

module.exports = router;
