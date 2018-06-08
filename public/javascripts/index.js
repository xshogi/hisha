
$('#test-connect').click(function(){
	$.ajax({
		url: '/test',
		method: 'POST',
		data: {
			host: $('#host').val(),
			port: $('#port').val(),
			username: $('#username').val(),
			password: $('#password').val(),
			database: $('#database').val(),
		}
	})
	 .done(function(response){
	 	console.log(response);
	 	if(response.result == false){
	 		alert('Connect failed..<br>Please check your connection information.');
	 	} else {
	 		alert('Database Connected!');
	 	}
	 })
	 .fail(function(error, message){
	 	console.error(error, message);
	 })
});

$('#connect').click(function(){
	$('#connection').submit();
});