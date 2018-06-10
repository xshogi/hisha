
var previousClickCell = undefined;
function editMode(object){
	
	if(previousClickCell === object){	
		// the second click		
		previousClickCell = undefined;
	} else if(previousClickCell !== undefined) {	
		// here it the first in case there is previous cell was clicked but not current object
		previousClickCell.contentEditable = false;
		previousClickCell = object;
		object.contentEditable = true;
	} else {	
		// here it the first click in case there is not previous cell was clicked
		object.contentEditable = true;
		previousClickCell = object;
	}
}

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
    		value: object.innerText
    	}
    })
     .done(function(response){
     	console.log(response);
        if(response.result === false){
            alert('Cell update failed!');
            object.style.backgroundColor = '#f97979';
        } else {
            object.style.backgroundColor = '#c8f3cb';
        }
     })
     .fail(function(error, message){
        alert('Cell update failed!');
        console.error(error, message);
     })

    object.contentEditable=false;
    return false;
  }
}