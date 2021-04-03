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

const getMatch = expression => {
    const reg = {
        get highPriority() {
            return /\d+[\*\/]\d+/g.exec(expression);
        },
        get lowPriority() {
            return /\d+[\+\-]\d+/g.exec(expression) 
        }
    };

    return reg.highPriority ? reg.highPriority : reg.lowPriority;
}

const actions = (firstNum, action, lastNum) => {
    const act = {
        '+': () => Number(firstNum) + Number(lastNum),
        '-': () => Number(firstNum) - Number(lastNum),
        '*': () => Number(firstNum) * Number(lastNum),
        '/': () => Number(firstNum) / Number(lastNum),
    };

    return act[action]();
}