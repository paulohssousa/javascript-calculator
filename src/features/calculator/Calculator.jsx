import "./calculator.css";
import { useSelector, useDispatch } from 'react-redux'
import { 
    clear, 
    appendSignal,
    appendExpression, 
    selectInput, 
    selectExpression, 
    calculate,
    decimal
} from "./calculatorSlice";

export default function Calculator() {
    const input = useSelector(selectInput);
    const expression = useSelector(selectExpression);
    const dispatch = useDispatch();

    return (
        <div id="calculator">
            <div id="input-exp-display">
                <div id="expr">{expression}</div>
                <div id="display">{input}</div>
            </div>
            <div id="keyboard-wrapper">
                <button className="btns" id="clear" onClick={() => dispatch(clear())}>AC</button>
                <button className="btns" id="divide" onClick={() => dispatch(appendSignal("/"))}>/</button>
                <button className="btns" id="multiply" onClick={() => dispatch(appendSignal("*"))}>x</button>
                <button className="btns" id="seven" onClick={() => dispatch(appendExpression("7"))}>7</button>
                <button className="btns" id="eight" onClick={() => dispatch(appendExpression("8"))}>8</button>
                <button className="btns" id="nine" onClick={() => dispatch(appendExpression("9"))}>9</button>
                <button className="btns" id="subtract" onClick={() => dispatch(appendSignal("-"))}>-</button>
                <button className="btns" id="four" onClick={() => dispatch(appendExpression("4"))}>4</button>
                <button className="btns" id="five" onClick={() => dispatch(appendExpression("5"))}>5</button>
                <button className="btns" id="six" onClick={() => dispatch(appendExpression("6"))}>6</button>
                <button className="btns" id="add" onClick={() => dispatch(appendSignal("+"))}>+</button>
                <button className="btns" id="one" onClick={() => dispatch(appendExpression("1"))}>1</button>
                <button className="btns" id="two" onClick={() => dispatch(appendExpression("2"))}>2</button>
                <button className="btns" id="three" onClick={() => dispatch(appendExpression("3"))}>3</button>
                <button className="btns" id="equals" onClick={() => dispatch(calculate())}>=</button>
                <button className="btns" id="zero" onClick={() => dispatch(appendExpression("0"))}>0</button>
                <button className="btns" id="decimal" onClick={() => dispatch(decimal())}>.</button>
            </div>
        </div>
    );
}
