document.addEventListener('DOMContentLoaded', function() {
  var todos = []  
  var submitNewTodo = document.querySelector('.submit'); 
  var newTodoInput =  document.querySelector('.new-todo');  
  var todoForm = document.querySelector('form');
  
  function createEmptyTodoList() {
    var todoListContainer = document.createElement('ul');
    todoListContainer.classList.add('todo-list-container');    
    document.querySelector('body').appendChild(todoListContainer);    
  }
  
  submitNewTodo.addEventListener('click', function(e) {
    e.preventDefault();
    if(newTodoInput.value) {
    	var newTodo = {
    		'id' : Math.floor(Math.random()*1000000),
    	  	'contents' 		: newTodoInput.value,
    	  	'completed'		: false,
    	  	'dateCompleted' : null,
    	  	'dateAdded'		: new Date()
    	}

    	todos.push(newTodo);

    	console.log(todos);
    	
		var newTodoContent = newTodoInput.value;
		newTodoInput.value = '';
		var newTodo = document.createElement('li');    
    }
   
    if(!document.querySelector('.todo-list-container')) {
      createEmptyTodoList();      
    }
    
    var todoListContainer = document.querySelector('.todo-list-container');
    
    newTodo.innerText = newTodoContent;
    todoListContainer.appendChild(newTodo);
    newTodo.prepend(document.createElement('input'));
    newTodo.append(document.createElement('a'));
    newTodo.querySelector('a').setAttribute('href', '#');
    newTodo.querySelector('a').innerText = 'delete';
    newTodo.querySelector('a').classList.add('delete-button');
    newTodo.querySelector('input').setAttribute('type', 'checkbox');
    newTodo.querySelector('input').classList.add('todo-checkbox');        
    
    if(document.querySelectorAll('.todo-checkbox').length > 1 ) {
	    var todoCheckbox = document.querySelectorAll('.todo-checkbox');
	    var todoDeleteButton = document.querySelectorAll('.delete-button');

	    for(i=0; i<todoCheckbox.length; i++) {
	    	todoCheckbox[i].addEventListener('click', function(e) {
	    		if(e.target.checked) {
	    		  e.target.parentNode.classList.add('completed');
	    		} else {
	    		  e.target.parentNode.classList.remove('completed');
	    		}
	    	});
	    }

	    for(i=0; i<todoDeleteButton.length; i++) {
	    	todoDeleteButton[i].addEventListener('click', function(e) {
	    		e.target.parentNode.remove();
	    	});
	    }
    } else {
    	var todoCheckbox = document.querySelector('.todo-checkbox');
    	var todoDeleteButton = document.querySelector('.delete-button');

    	todoCheckbox.addEventListener('click', function(e) {
    		if(e.target.checked) {
    		  e.target.parentNode.classList.add('completed');
    		} else {
    		  e.target.parentNode.classList.remove('completed');
    		}
    	});

    	todoDeleteButton.addEventListener('click', function(e) {
    		e.target.parentNode.remove();
    	});
    }         
  });
});