document.addEventListener('DOMContentLoaded', function () {
    var todos = {}
    var submitNewTodo = document.querySelector('.submit');
    var newTodoInput = document.querySelector('.new-todo');
    var todoForm = document.querySelector('form');
    var todos = JSON.parse(localStorage.getItem('todos'));

    function createEmptyTodoList() {
        var todoListContainer = document.createElement('ul');
        todoListContainer.classList.add('todo-list-container');
        document.querySelector('body').appendChild(todoListContainer);
    }

    function setupExistingTodos() {
        if (localStorage.getItem('todos')) {
            for (var todo in todos) {
                var newTodo = todos[todo];
                createNewTodo(todo, newTodo);
            }
        }
    }

    function createNewTodo(index, todoObject) {
        if (!document.querySelector('.todo-list-container')) {
            createEmptyTodoList();
        }

        var todoListContainer = document.querySelector('.todo-list-container');
        var newTodoItem = document.createElement('li');

        newTodoItem.innerText = todoObject.content;
        newTodoItem.setAttribute('data-id', index);
        todoListContainer.appendChild(newTodoItem);
        newTodoItem.prepend(document.createElement('input'));
        newTodoItem.append(document.createElement('a'));
        newTodoItem.querySelector('a').setAttribute('href', '#');
        newTodoItem.querySelector('a').innerText = 'delete';
        newTodoItem.querySelector('a').classList.add('delete-button');
        newTodoItem.querySelector('input').setAttribute('type', 'checkbox');

        if (todoObject.completed) {
            newTodoItem.querySelector('input').setAttribute('checked', '');
            newTodoItem.classList.add('completed');
        }

        if (todoObject.deleted) {
            newTodoItem.classList.add('deleted');
        }


        newTodoItem.querySelector('input').classList.add('todo-checkbox');

        if (document.querySelectorAll('.todo-checkbox').length > 1) {
            var todoCheckbox = document.querySelectorAll('.todo-checkbox');
            var todoDeleteButton = document.querySelectorAll('.delete-button');
            var tempTodosObject = JSON.parse(localStorage.getItem('todos'));

            for (i = 0; i < todoCheckbox.length; i++) {
                todoCheckbox[i].addEventListener('click', function (e) {
                    if (e.target.checked) {
                        e.target.parentNode.classList.add('completed');
                        tempTodosObject[e.target.parentNode.getAttribute('data-id')].completed = true;
                        localStorage.setItem('todos', JSON.stringify(tempTodosObject));
                    } else {
                        e.target.parentNode.classList.remove('completed');
                        tempTodosObject[e.target.parentNode.getAttribute('data-id')].completed = false;
                        localStorage.setItem('todos', JSON.stringify(tempTodosObject));
                    }
                });
            }

            for (i = 0; i < todoDeleteButton.length; i++) {
                todoDeleteButton[i].addEventListener('click', function (e) {
                    var tempTodosObject = JSON.parse(localStorage.getItem('todos'));
                    tempTodosObject[e.target.parentNode.getAttribute('data-id')].deleted = true;
                    localStorage.setItem('todos', JSON.stringify(tempTodosObject));
                    e.target.parentNode.remove();
                });
            }
        } else {
            var todoCheckbox = document.querySelector('.todo-checkbox');
            var todoDeleteButton = document.querySelector('.delete-button');

            todoCheckbox.addEventListener('click', function (e) {
                var tempTodosObject = JSON.parse(localStorage.getItem('todos'));
                if (e.target.checked) {
                    e.target.parentNode.classList.add('completed');
                    tempTodosObject[e.target.parentNode.getAttribute('data-id')].completed = true;
                    localStorage.setItem('todos', JSON.stringify(tempTodosObject));
                } else {
                    e.target.parentNode.classList.remove('completed');
                    tempTodosObject[e.target.parentNode.getAttribute('data-id')].completed = false;
                    localStorage.setItem('todos', JSON.stringify(tempTodosObject));
                }
            });

            todoDeleteButton.addEventListener('click', function (e) {
                var tempTodosObject = JSON.parse(localStorage.getItem('todos'));
                tempTodosObject[e.target.parentNode.getAttribute('data-id')].deleted = true;
                localStorage.setItem('todos', JSON.stringify(tempTodosObject));
                e.target.parentNode.remove();
            });
        }
    }

    setupExistingTodos();

    submitNewTodo.addEventListener('click', function (e) {
        var todos = JSON.parse(localStorage.getItem('todos'));
        e.preventDefault();
        if (newTodoInput.value) {
            var newTodo = {
                'id': todos ? Object.keys(todos).length + 1 : 1,
                'content': newTodoInput.value,
                'completed': false,
                'dateCompleted': null,
                'dateAdded': new Date(),
                'deleted': false
            }

            if (todos) {
                todos[Object.keys(todos).length + 1] = newTodo;
            } else {
                var todos = {}
                todos[1] = newTodo;
                localStorage.setItem('todos', JSON.stringify(todos));
            }

            localStorage.setItem('todos', JSON.stringify(todos));

            newTodoInput.value = '';
            var newTodoItem = document.createElement('li');

            createNewTodo(Object.keys(todos).length, newTodo);
        }
    });
});