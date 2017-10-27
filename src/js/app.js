/* exported windowLoad */
const windowLoad = {
    initListeners: function() {
        let inputs = document.getElementsByTagName('input');
        let submits = document.querySelectorAll('button [type="submit"]');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener('keyup', (event) => {
                event.preventDefault();
                if (event.keyCode == 13) {
                    submits[i].click();
                }
            });
        }
    }
};
