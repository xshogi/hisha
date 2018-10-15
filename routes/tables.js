var express = require('express');
var router = express.Router();
const { Client } = require('pg')


/* GET list tables of current database */
/* This is the same as /connect in index.js */
router.get('/lists', function(req, res, next) {

  const query = 'SELECT relid as table_id, relname as table_name,n_live_tup as rows FROM pg_stat_user_tables';
  build_connection('lists', req.session, query, [], (result)=>{
    if(result == false)
      res.render('index', { title: 'Hisha' })
    else
      res.render('dashboard', { title: 'Dashboard - Hisha', tables: result.rows }); 
  })
  
});

/* GET home page. */
router.get('/create', function(req, res, next) {
	// TODO: Parse fields configurations and use SQL to create table

  res.render('', { });
});


/* GET delete a specific table */
router.get('/drop', function(req, res, next) {
  
});

/* GET create a new entry of a specific table (create) */
router.get('/new/:table_name', function(req, res, next) {
  const table_name = req.params.table_name
  const query = "select column_name,udt_name as data_type, is_nullable as nullable " 
              + "from information_schema.columns where table_name = '" + table_name + "'";
  build_connection('new', req.session, query, [], (result)=>{
    if(result == false)
      res.render('index', { title: 'Hisha' })
    else{
      res.render('new_row', { 
        title: 'Create new row - Hisha', 
        columns: result.rows, 
        table_name: table_name 
      });
    }
  });
});

/* POST create a new entry of a specific table (insert) */
router.post('/insert/:table_name', function(req, res, next) {
  const table_name = req.params.table_name    
  const row_content = req.body
  let columns = ''
  let values = ''
  for(let key in row_content){
    columns = columns + key + ", "
    if(row_content[key] == ''){
      values = values + "NULL, "
    } else {
      values = values + "'" + row_content[key] + "', "
    }
  }  
  
  // remove last period sign and space
  columns = columns.slice(0, columns.length-2)
  values = values.slice(0, values.length-2)
  const query = `INSERT INTO ${table_name} ( ${columns} ) VALUES ( ${values} )`;
  // console.log(query)  
  build_connection('insert', req.session, query, [], (result)=>{
    if(result == false)
      res.redirect('/tables/read/' + table_name)
    else
      res.redirect('/tables/read/' + table_name)    
  }) 
});


/* GET read content of secific table */
router.get('/read/:table_name', function(req, res, next) {
	const table_name = req.params.table_name;
  const query = 'SELECT * FROM ' + table_name;
  build_connection('read', req.session, query, [], (result)=>{
    if(result == false)
      res.render('index', { title: 'Hisha' })
    else{
      const query = "select column_name from information_schema.columns where table_name = '" + table_name + "'";
      build_connection('read', req.session, query, [], (columns)=>{
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
	// Parse passing the number of row, field name and new value
	// It should be only one field and value since this 
	// API will be call only for single cell updating
  const table_name = req.body.table_name
  const row_id = req.body.row_id
  const column_name = req.body.column
  const new_value = value = req.body.value  
  const query = "UPDATE " + table_name 
              + " SET " + column_name + " = '" + new_value 
              + "' WHERE id = '" + row_id + "'";
  build_connection('save', req.session, query, [], (result)=>{
    if(result == false)
      res.send({ result: false })
    else{
      res.send({ result: true })
    }
  })  
});

/* POST specific record of */
router.post('/delete', function(req, res, next) {
  const table_name = req.body.table_name
  const row_id = req.body.row_id
  const query = "DELETE FROM " + table_name + " WHERE id = '" + row_id + "'"; 
  build_connection('delete', req.session, query, [], (result)=>{
    if(result == false)
      res.send({ result: false })
    else{
      res.send({ result: true })
    }
  })  
});

var build_connection = (api, session, query, params, callback)=>{
  // console.log('Invoke API: ', api);

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
    client.query(query, params, (error, response) => {
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
