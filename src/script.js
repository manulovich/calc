const buttons = document.querySelectorAll('.calc button');
const output = document.querySelector('.calc__output');

function addClickEvent(element, fn) {
    element.addEventListener('click', function () {
        fn(this);
    });
}

function btnEvent(fn) {
    [...buttons].forEach(btn => {
        addClickEvent(btn, fn);
    });
};

btnEvent(btn => {
    if (btn.innerHTML === 'c') {
        clear();
        return;
    } else if (btn.innerHTML === '=') {
        return;
    };

    output.innerHTML += btn.innerHTML;
});

function clear() {
    output.innerHTML = '';
}

