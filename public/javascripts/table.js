
function saveUpdate(object, event) {
	// press enter/return key equals to key value 13
  if (event.which == 13 && event.shiftKey == false) {
  	event.preventDefault();	// prevent insertion of a return(new line break)

    // ajax to save
    $.ajax({
    	url: '/tables/save',
    	method: 'POST',
    	data: {
    		table_name: table_name,
    		row_id: object.dataset.row,	    		
    		column: object.dataset.column,
    		value: object.dataset.value
    	}
    })
     .done(function(response){
     	console.log(response);
     })
     .fail(function(error, message){

     })

    return false;
  }
}