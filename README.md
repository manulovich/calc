br# Калькулятор, version 1.0

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

# Калькулятор, version 2.0

Решение проблемы зародилось сразу после пуша предыдущей версии. 

Суть алгоритма новой версии такова: 

Мы можем разбивать строку на пары вида _a+b_, где _а_ и _б_ - числа, а вместо _+_ - любое действие, ну почти.

Я чутка не знаю, как правильно должно работать знак _%_ на калькуляторе:)

Ну и все, дальше делаем так, чтобы действия _*, /_ имели более высокий приоритет:

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

Регулярные выражение, конечно, штука классная, они как ракетницы в лапах обезьян.

Ну и вот наша функия-парсер:

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

___
p.s.
Я хоть и рад, что у меня получилось написать алгоритм, но нашел в интернете куда лучшую реализацию калькулятора и с количеством строк в 42 кода.

Мнда, удасться ли мне стать хорошим программистом?