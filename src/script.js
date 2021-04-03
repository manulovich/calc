const buttons = document.querySelectorAll('.calc button');
const output = document.querySelector('.calc__output');

elEvent(buttons, btn => {
    if (btn.innerHTML === 'c') {
        clear(output);
        return;
    } else if (btn.innerHTML === '=') {
        output.innerHTML = parse(output.innerHTML);
        return;
    };

    output.innerHTML += btn.innerHTML;
});


function parse(exp) {
    let result = exp,
        regForMatch = /(\d+)([\+\-\*\/])(\d+)/,
        match;

    while (match = getMatch(result)) {
        let [_, firstNum, act, lastNum] = regForMatch.exec(match[0]);

        result =
            result.slice(0, match.index) +
            actions(firstNum, act, lastNum) +
            result.slice(match.index + match[0].length);
    }

    return Number(result);
}