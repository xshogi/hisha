
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
	 })
	 .fail(function(error, message){
	 	console.error(error, message);
	 })
});

$('#connect').click(function(){
	$('#connection').submit();
});