# Калькулятор, version 1.0

Я очень плохой программист и не очень понимаю, как написать даже простейший калькулятор.

И единственное, что мне пришло в голову сразу - распарсить строку выражения при помощи регулярок.
Код получился простым, но без минусов.

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

Минус моего кода в том, что вычисления происходят _относительно_ result, и если с действиями '+', '-', '%' все впорядке, то с умножением и делением вышел конфуз.

Так в строке '1+3*2' тройка не умножиться на 2, а вначале сложиться с единицей.

Ну что ж, исправим, как будет желание.