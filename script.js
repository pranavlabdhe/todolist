// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption =document.querySelector('.filter-todo');
const UndoButton =document.querySelector('.undo-button');
//Event Listeners
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodos);
UndoButton.addEventListener('click',Undo);
//Functions
function addTodo(){
    //Prevent form from submitting
    event.preventDefault();
    //ToDo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Add todo to local storage

    //checked button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    //delete button

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);
    //Append to list
    todoList.appendChild(todoDiv);
    //Clear the input value
    todoInput.value = "";
}
var deletedToDos = [];

function deleteCheck(e){
    const item = e.target;
    //Delete todo
    if(item.classList[0] === 'delete-btn'){
        const todo = item.parentElement;
        //animation
        todo.classList.add('fall');

        // add the value of the deleted to-do to an array which in this case will work as a trash can.
        deletedToDos = [];
        deletedToDos.push(todo.children[0].innerHTML);

        todo.addEventListener('transitionend',function(){
            todo.remove();
        });
    }

    //Check List
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}


//undo
function Undo(){
    if (!(deletedToDos == "")) {
        todoInput.value = deletedToDos[0];
        addTodo();
    }
}
function filterTodos(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch (e.target.value){
            case "all":
                todo.style.display = "flex";
            break;
            case 'completed':
            if(todo.classList.contains('completed')){
                todo.style.display = "flex";
            }else{
                todo.style.display = "none";
                    }
               break;
               case "uncompleted":
                   if(!todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                        }  
                        break;
                    }
                });
}
