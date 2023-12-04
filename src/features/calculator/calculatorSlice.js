import { createSlice } from '@reduxjs/toolkit'

const op = ["+", "-", "/", "*"];

function appendOperator (expression, operator) {
    const length = expression.length;
    const last = expression[length - 1];
    const lastButOne = expression[length - 2];
    if (operator === "-") {
        return length < 1 ? [...expression, operator]
        : !op.includes(lastButOne) && op.includes(last) ? [...expression, operator]
        : op.includes(last) ? expression.toSpliced(length - 1, 1, operator)
        : [...expression, operator]
    } else {
        return length < 1 ? expression 
            : op.includes(lastButOne) && op.includes(last) ? expression.toSpliced(length - 2, 2, operator)
            : op.includes(last) ? expression.toSpliced(length - 1, 1, operator)
            : [...expression, operator]
    }
}

function appendNumber (expression, input) {
    const length = expression.length;
    const last = expression[length - 1];
    const lastButOne = expression[length - 2];
    return length < 1 ? [...expression, input]
        : length === 2 && op.includes(last) && op.includes(lastButOne) ? expression.toSpliced(length - 2, 2, input)
        : op.includes(lastButOne) && last === "-" ? expression.toSpliced(length - 1, 1, "-".concat(input))
        : op.includes(last) ? [...expression, input]
        : expression.toSpliced(length - 1, 1, input)
}

function multDiv(array) {
    for (let i = 1; i < array.length; i += 2) {
        if (array[i] === "*") {
            array.splice(i -1, 3, array[i - 1] * array[i + 1]);
            i = - 1;
        } else if (array[i] === "/") {
            array.splice(i -1, 3, array[i - 1] / array[i + 1]);
            i = - 1;
        }
    }
    return array
}

function addSub(array) {
    for (let i = 1; i < array.length; i += 2) {
        if (array[i] === "+") {
            array.splice(i -1, 3, array[i - 1] + array[i + 1]);
            i = - 1;
        } else if (array[i] === "-") {
            array.splice(i -1, 3, array[i - 1] - array[i + 1]);
            i = - 1;
        }
    }
    return array
}

export const calculatorSlice = createSlice({
    name: 'calculator',
    initialState: {
        input: "0",
        expression: []
    },
    reducers: {
        clear: state => {
            state.input = "0";
            state.expression = []
        },
        appendExpression: (state, action) => {
            if (state.input === "0" || op.includes(state.input)) {
                state.input = action.payload;
                state.expression = appendNumber(state.expression, state.input);
            } else {
                state.input = state.input.concat(action.payload);
                state.expression = appendNumber(state.expression, state.input);
            }
        },
        appendSignal: (state, action) => {
            state.input = action.payload;
            state.expression = appendOperator(state.expression, action.payload);
        },
        decimal: state => {
            if (!state.input.includes(".") && !op.includes(state.expression[state.expression.length - 1])) {
                state.input = state.input.concat(".");
                state.expression[state.expression.length - 1] = state.input;
            }
        },
        calculate: state => {
            let expr = [...state.expression];

            expr = expr.map(x => {
                return op.includes(x) ? x : parseFloat(x);
            })
            
            let result = multDiv(expr);

            result = addSub(result);

            let [finalValue] = [...result];
            finalValue = parseFloat(finalValue.toFixed(4))

            state.expression = [finalValue];
            state.input = finalValue.toString();
        }
    }
})

export const selectInput = (state) => state.calculator.input;
export const selectExpression = (state) => state.calculator.expression;

export const { clear, appendExpression, calculate, appendSignal, decimal } = calculatorSlice.actions

export default calculatorSlice.reducer