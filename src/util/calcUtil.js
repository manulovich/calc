function addClickEvent(element, fn) {
    element.addEventListener('click', function () {
        fn(this);
    });
}

function elEvent(domElements, fn) {
    [...domElements].forEach(el => {
        addClickEvent(el, fn);
    });
};

function clear(el) {
    el.innerHTML = '';
}