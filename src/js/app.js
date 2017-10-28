
/* exported windowLoad */
function windowLoad() {
    // function executed on window.load event

    // add click event listener to add-list button
    toggleDisplay('add-list', 'lists--add-list');

    onInputEnter('input[name="task"]', 'task--button');
    onInputEnter('input[name="search"]', 'search--button');

}

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

var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};

class List {
    constructor(title, tags) {
        this.id = ID;
        this.title = title;
        this.tags = [tags];
        this.tasks = [];
    }

    get title() {
        return this.title;
    }

    get tags() {
        return this.tags;
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
