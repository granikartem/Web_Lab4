
import React, {useEffect, useState} from "react";
import Logout from "./Logout";
import CoordinatesForm from "./Form";
import Resulttable from "./Table";
import Graph from "./Graph";
import "./main.css"
import store from "../../app/store";

function Mainpage() {
    const [x_form, setX] = useState('1');
    const [y_form, setY] = useState('1');
    const [r_form, setR] = useState('1');
    const [checks, setChecks] = useState(null);
    useEffect(() => {
        let information = {
            "login": store.getState().login
        };
        let body = [];
        for (const inf in information) {
            body.push(inf + "=" + information[inf]);
        }
        body = "?" + body;
        if (checks === null) {
            fetch("http://localhost:8080/all" + body, {
                method: "POST"
            }).then(response => response.text().then(text => {
                console.log(JSON.parse(text));
                setChecks(JSON.parse(text));
            }))
        }
    })

    const checkNumbers = (q, a, b) => {
        return ((q >= a) && (q <= b));
    }
    const validate = () => {
        return (checkNumbers(x_form, -5, 3) && checkNumbers(y_form, -5, 3) && checkNumbers(r_form, -5, 3));
    }
    const showChecks = () => {
        console.log(checks);
    }

    return (<div id="maindiv">
            <Logout/>
            <CoordinatesForm validate={validate} x_form={x_form} y_form={y_form} r_form={r_form} setX={setX} setY={setY}
                         setR={setR} setChecks={setChecks} checks={checks} showChecks={showChecks()}/>
            <Graph r={r_form} setChecks={setChecks} checks={checks}/>  
            
            <Resulttable checks={checks}/>
                       
                      
            
            
            
            
            
        </div>)
}

export default Mainpage