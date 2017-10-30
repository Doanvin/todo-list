/* exported windowLoad */
function windowLoad() {
    // function executed on window.load event

    // add click event listener to add-list button
    toggleDisplay('add-list', 'lists--add-list');

    onInputEnter('input[name="task"]', 'task--button');
    onInputEnter('input[name="search"]', 'search--button');
    onInputEnter('input[name="lists--title"]', 'lists--button');
    onInputEnter('input[name="lists--tags"]', 'lists--button');

    currentUser.renderLists();
}

// SHARED JS SECTION //
function onInputEnter(inputName, buttonId) {
    // param: inputName = string, querySelector
    // param: buttonId = string, button id
    document.querySelector(inputName)
        .addEventListener('keyup', (event) => {
            event.preventDefault();
            if (event.keyCode == 13) {
                document.getElementById(buttonId).click();
            }
        });
}


// toggles display: none using hide class
function toggleDisplay(buttonId, targetId) {
    document.getElementById(buttonId).addEventListener('click', () => {
        document.getElementById(targetId).classList.toggle('hide');
    });
}


/* exported togglePlusMinus */
function togglePlusMinus(buttonId) {
    document.getElementById(buttonId).firstChild.classList.toggle('fa-plus');
    document.getElementById(buttonId).firstChild.classList.toggle('fa-minus');
}


function toCamelCase(el) {
    el.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
}


function createList(listTitle, tags) {
    let title = toCamelCase(listTitle);
    (listTitle == title)
        ? listTitle = new List(listTitle, tags)
        : title = new List(listTitle, tags);
}


// DATA & TO DO LIST SECTION
var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};


class User {
    constructor(email, username, password) {
        this.userId = ID();
        this.email = email;
        this.username = username;
        this.password = password;
        this.lists = [];
    }

    addList(list) {
        this.lists.push(list);
    }

    removeList(list) {
        const index = this.lists.indexOf(list);
        this.lists.splice(index, 1);
    }

    createLists() {
        let lists = [];
        for (let i = 0; i < this.lists.length; i++) {
            let listsTemplate =
            '<li class="lists__item">' +
              this.lists[i].title +
            '</li>';
            lists.push(listsTemplate);
        }
        return ''.concat(...lists);
    }

    renderLists(listsId = 'lists') {
        const lists = this.createLists();
        let listOfLists = document.getElementById(listsId);
        if (listOfLists === null) {listOfLists = document.getElementsByClassName('lists__list')[0];}
        return listOfLists.innerHTML = lists;

    }

}


class List {
    constructor(title, tags, username = currentUser) {
        this.listId = ID();
        this.userId = username.userId;
        this.title = title;
        this.tags = tags.replace(/\w+/, '').split(',');
        this.tasks = [];
    }

    getId() {
        return this.id;
    }

    getTags() {
        return this.tags;
    }

    getTitle() {
        return this.title;
    }

    addTask(task) {
        if (typeof task == 'string') {
            return this.tasks.push(task);
        }
    }

    removeTask(task) {
        return this.tasks.pop(task);
    }

    createTodoList() {
        let todoList = [];
        for (let i = 0; i < this.tasks.length; i++) {
            let taskTemplate =
            `<div class="todo__item grid">
              <div class="grid__col is-1">
                <i class="fa fa-sort"></i>
                <input type="checkbox">
              </div>
              <div ondblclick="editable(this)" class="todo__task grid__col is-9">` + this.tasks[i] + `</div>
              <div class="todo__actions grid__col is-2">
                <i class="fa fa-pencil"></i>
                <i class="fa fa-trash"></i>
              </div>
            </div>`;
            todoList.push(taskTemplate);
        }
        return ''.concat(...todoList);
    }

    renderTodoList(listsId = 'todo-list') {
        const todos = this.createTodoList;
        document.getElementById(listsId).innerHTML = todos;
    }

}


/* exported editable */
function editable(el) {
    el.setAttribute('contentEditable', 'true');
    el.addEventListener('keyup', (event) => {
        event.preventDefault();
        if (event.keyCode == 13) el.setAttribute('contentEditable', 'false');
    });
}

// TEST USER
let Donavin = new User('example@mail.com','Donavin', 'password');
let currentUser = Donavin;


// TEST LISTS
let Dog = new List('Dog', 'animal, pet');
Dog.addTask('walk');
Dog.addTask('bring to park');
Dog.addTask('give food');
currentUser.addList(Dog);

let JsNinja = new List('Javascript Ninja', 'web dev, development, front-end');
JsNinja.addTask('drag and drop functionality');
JsNinja.addTask('filter by tags');
JsNinja.addTask('local storage');
currentUser.addList(JsNinja);
