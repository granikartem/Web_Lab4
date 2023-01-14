import React from "react";
import {InputNumber} from 'primereact/inputnumber';import store from "../../app/store";

function CoordinatesForm(props) {
    const submit = () => {
        let information = {
            "login": store.getState().login,
            "x": props.x_form,
            "y": props.y_form,
            "r": props.r_form
        };
        let body = [];
        for (const inf in information) {
            body.push(inf + "=" + information[inf]);
        }
        console.log(body);
        body = "?" + body.join("&");
        if (props.validate()) {
            fetch("http://localhost:8080/point" + body, {
                method: "POST"
            }).then(response => response.text().then(text => {
                console.log(JSON.parse(text));
                props.setChecks(JSON.parse(text));
            }))
        }
    }

    return (
        <div>
            <form id="form">
                <div className="nums-field">
                    <input type="radio" name="X" value="-5" style={{marginRight: "1px"}}  onClick={(e) => props.setX(-5)}/>
                    <label for="-5">-5 </label>
                    <input type="radio" name="X" value="-4" style={{marginRight: "1px"}}  onClick={(e) => props.setX(-4)}/>
                    <label htmlFor="-4">-4 </label>
                    <input type="radio" name="X" value="-3" style={{marginRight: "1px"}}  onClick={(e) => props.setX(-3)}/>
                    <label htmlFor="-3">-3 </label>
                    <input type="radio" name="X" value="-2" style={{marginRight: "1px"}}  onClick={(e) => props.setX(-2)}/>
                    <label htmlFor="-2">-2 </label>
                    <input type="radio" name="X" value="-1" style={{marginRight: "1px"}}  onClick={(e) => props.setX(-1)}/>
                    <label htmlFor="-1">-1 </label>
                    <input type="radio" name="X" value="0" style={{marginRight: "1px"}}  onClick={(e) => props.setX(0)}/>
                    <label htmlFor="0">0 </label>
                    <input type="radio" name="X" value="1" style={{marginRight: "1px"}}  onClick={(e) => props.setX(1)}/>
                    <label htmlFor="1">1 </label>
                    <input type="radio" name="X" value="2" style={{marginRight: "1px"}}  onClick={(e) => props.setX(2)}/>
                    <label htmlFor="2">2 </label>
                    <input type="radio" name="X" value="3"  onClick={(e) => props.setX(3)}/>
                    <label htmlFor="3">3 </label>
                </div>
                <div className="nums-field">
                <InputNumber placeholder="Введите Y(-5 .. 3)" value={props.y_form} onValueChange={(e) => props.setY(e.value)} mode="decimal"
                             min={-3} max={3}
                             minFractionDigits={0} maxFractionDigits={3} />
                             <br/>
                </div>
                <div className="nums-field">
                    <input type="radio" name="R" value="-5" style={{marginRight: "1px"}} onClick={(e) => props.setR(-5)}/>
                    <label htmlFor="-5">-5 </label>
                    <input type="radio" name="R" value="-4" style={{marginRight: "1px"}} onClick={(e) => props.setR(-4)}/>
                    <label htmlFor="-4">-4 </label>
                    <input type="radio" name="R" value="-3" style={{marginRight: "1px"}} onClick={(e) => props.setR(-3)}/>
                    <label htmlFor="-3">-3 </label>
                    <input type="radio" name="R" value="-2" style={{marginRight: "1px"}} onClick={(e) => props.setR(-2)}/>
                    <label htmlFor="-2">-2 </label>
                    <input type="radio" name="R" value="-1" style={{marginRight: "1px"}} onClick={(e) => props.setR(-1)}/>
                    <label htmlFor="-1">-1 </label>
                    <input type="radio" name="R" value="0" style={{marginRight: "1px"}} onClick={(e) => props.setR(0)}/>
                    <label htmlFor="0">0 </label>
                    <input type="radio" name="R" value="1" style={{marginRight: "1px"}} onClick={(e) => props.setR(1)}/>
                    <label htmlFor="1">1 </label>
                    <input type="radio" name="R" value="2" style={{marginRight: "1px"}} onClick={(e) => props.setR(2)}/>
                    <label htmlFor="2">2 </label>
                    <input type="radio" name="R" value="3" onClick={(e) => props.setR(3)}/>
                    <label htmlFor="3">3 </label>
                </div>
                <div className="nums-field">
                <button primary type="button" onClick={submit} icon="pi">OK</button>
                </div>
            </form>
        </div>
    )
}

export default CoordinatesForm
