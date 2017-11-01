/* exported windowLoad */
function windowLoad() {
    // function executed on window.load event

    // Render functions
    currentUser.renderLists();
    currentUser.renderSelectList();

    // add click event listener to add-list button
    toggleDisplay('add-list', 'lists--add-list');

    // add keyup listeners
    onInputEnter('task', 'task-button');
    onInputEnter('search', 'search--button');
    onInputEnter('lists--title', 'lists--button');
    onInputEnter('lists--tags', 'lists--button');

    // add click listeners
    onNewTaskClick();


}

// SHARED JS SECTION //
function onInputEnter(inputName, buttonId) {
    // param: inputName = string, querySelector
    // param: buttonId = string, button id
    const query = `input[name="${inputName}"]`;
    document.querySelector(query)
        .addEventListener('keyup', (event) => {
            event.preventDefault();
            if (event.keyCode == 13) {
                document.getElementById(buttonId).click();
            }
        });
}


function onNewTaskClick() {
    return document.getElementById('task-button').addEventListener('click', () => {
        let task = document.querySelector('input[name="task"]').value;
        let selectList = document.getElementById('select-list').value;
        currentUser.lists.forEach(list => {
            if (list.title == selectList) {
                list.addTask(task);
                list.renderTodoList();
            }
        });
    });
}


function toggleDisplay(buttonId, targetId) {
    // toggles display: none using hide class
    document.getElementById(buttonId).addEventListener('click', () => {
        document.getElementById(targetId).classList.toggle('hide');
    });
}


/* exported togglePlusMinus */
function togglePlusMinus(buttonId) {
    document.getElementById(buttonId).firstChild.classList.toggle('fa-plus');
    document.getElementById(buttonId).firstChild.classList.toggle('fa-minus');
}



// DATA & TO DO LIST SECTION
class User {
    constructor(email, username, password) {
        this.userId = Date.now().toString();
        this.email = email;
        this.username = username;
        this.password = password;
        this.lists = [];
    }

    addList(list) {
        // use unshift instaed of push to set it as the first index
        return this.lists.unshift(list);
    }

    removeList(list) {
        const index = this.lists.indexOf(list);
        return this.lists.splice(index, 1);
    }

    createSelectList() {
        // template for the select#select-list element
        let selectList = [];
        for (let i = 0; i < this.lists.length; i++) {
            let selectListTamplate =
            `<option value="${this.lists[i].title}">
              ${this.lists[i].title}
            </option>`;
            selectListTamplate.replace(/\\n|\\|\s{3,}/, '');
            selectList.push(selectListTamplate);
        }
        return ''.concat(...selectList);
    }

    renderSelectList() {
        const selectList = this.createSelectList();
        return document.getElementById('select-list').innerHTML = selectList;

    }

    createLists() {
        // template for the menu ul#lists displaying user.lists
        let lists = [];
        for (let i = 0; i < this.lists.length; i++) {
            let listsTemplate =
            `<li onclick="${this.lists[i].title}.renderTodoList();" class="lists__item">
              ${this.lists[i].title}
            </li>`;
            lists.push(listsTemplate);
        }
        return ''.concat(...lists);
    }

    renderLists(listsId = 'lists') {
        const lists = this.createLists();
        return document.getElementById(listsId).innerHTML = lists;

    }

}


class List {
    constructor(title, tags, username = currentUser) {
        this.listId = Date.now().toString();
        this.userId = username.userId;
        this.title = title;
        this.tags = tags.split(', ');
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
            return this.tasks.unshift(task);
        }
    }

    removeTask(task) {
        return this.tasks.pop(task);
    }

    createTodoList() {
        // template for main#todo-list section
        let todoList = [];
        for (let i = 0; i < this.tasks.length; i++) {
            let taskTemplate =
            `<div class="todo__item grid">
              <div class="grid__col is-1">
                <i class="fa fa-sort"></i>
                <input type="checkbox" data-key="task${i}">
              </div>
              <div ondblclick="editable(this)" data-index="task${i}" class="todo__task grid__col is-9">${this.tasks[i]}</div>
              <div class="todo__actions grid__col is-2">
                <i class="fa fa-pencil"></i>
                <i class="fa fa-trash"></i>
              </div>
            </div>`;
            todoList.push(taskTemplate);
        }
        return ''.concat(...todoList);
    }

    toggleComplete(el) {
        const query = `div[data-index="${el.dataset.key}"]`;
        const task = document.querySelector(query);
        task.classList.toggle('complete');
    }

    onCheckboxClick() {
        let checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((el) => {
            el.addEventListener('click', (ev) => {
                this.toggleComplete(ev.target);
            });
        });
    }

    renderTodoList(listsId = 'todo-list') {
        const todos = this.createTodoList();
        document.getElementById(listsId).innerHTML = todos;
        this.onCheckboxClick();
        return todos;
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
Dog.addTask('Walk');
Dog.addTask('Bring to park');
Dog.addTask('Give food');
currentUser.addList(Dog);

let Website = new List('Website', 'web dev, development, front-end');
Website.addTask('Drag and drop functionality');
Website.addTask('Filter by tags');
Website.addTask('Local storage');
Website.addTask('Create list functionality');
Website.addTask('Add task functionality');
Website.addTask('Trash (remove task) functionality');
Website.addTask('Strikethrough when checked');
Website.addTask('Mark completed when checked');
currentUser.addList(Website);
