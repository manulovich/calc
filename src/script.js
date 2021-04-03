const buttons = document.querySelectorAll('.calc button');
const output = document.querySelector('.calc__output');

elEvent(buttons, btn => {
    if (btn.innerHTML === 'c') {
        clear(output);
        return;
    } else if (btn.innerHTML === '=') {
        output.innerHTML = parseExpr(output.innerHTML);
        return;
    };

    output.innerHTML += btn.innerHTML;
});


function parseExpr(exp) {
    let result = 0;
    let currentActions = `+`;
    let reg = /\d+|[\+\-\*\/\%]/g;
    let match;

    while (match = reg.exec(exp)) {
        if (Number(match[0])) {
            result = actions(currentActions, result, Number(match[0]));
        } else {
            currentActions = match[0];
        }
    }


    return result;
}

function actions(curAct, acc, value) {
    let act = {
        '+': () => acc + value,
        '-': () => acc - value,
        '*': () => acc * value,
        '/': () => acc / value,
        '%': () => value / 100,
    };

    return act[curAct]();
}