/* exported windowLoad */
function windowLoad() {
    // function executed on window.load event

    // add click event listener to add-list button
    toggleDisplay('add-list', 'lists--add-list');

    onInputEnter('input[name="task"]', 'task--button');
    onInputEnter('input[name="search"]', 'search--button');
    onInputEnter('input[name="lists--title"]', 'lists--button');
    onInputEnter('input[name="lists--tags"]', 'lists--button');

}

// SHARED JS SECTION //
function onInputEnter(inputName, buttonId) {
    // param: inputName = string
    // param: buttonId = string
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


class List {
    constructor(title, tags) {
        this.id = ID();
        this.title = title;
        this.tags = tags.replace(/\w+/, '').split(',');
        this.tasks = [];
    }

    id() {
        return this.id;
    }

    tags() {
        return this.tags;
    }

    title() {
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

}

let Dog = new List('Dog', 'animal, pet');
Dog.addTask('walk');
Dog.addTask('bring to park');
Dog.addTask('give food');

let JsNinja = new List('JS', 'web dev, development, front-end');
JsNinja.addTask('drag and drop functionality');
JsNinja.addTask('filter by tags');
JsNinja.addTask('local storage');
