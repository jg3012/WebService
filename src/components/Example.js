import "../css/question.css"
import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import { Link } from 'react-router-dom';


function Example() {
    let [percent, setPercent] = useState(0);
    let axios = require('axios');
    let [item, setItem] = useState([]);
    let [answer, setAnswer] = useState('');
    let [disabled, setDisabled] = useState(true);

    let res;
    let config = {
        method: 'get',
        url: 'https://www.career.go.kr/inspct/openapi/test/questions?apikey=a1a6bd295f99062830aa64111bebad81&q=6',
        headers: { 
            'Cookie': 'KHANUSER=z1nls2tqru7fkd'
        }
    };

    axios(config)
    .then(function (response) {
        res = JSON.stringify(response.data)
        let arr = [JSON.parse(res).RESULT[0].question,JSON.parse(res).RESULT[0].answer01,JSON.parse(res).RESULT[0].answer02]
        setItem(arr)
        
    })
    .catch(function (error) {
        console.log(error);
    });

    function handleClick(e){
        setAnswer(e.target.value)
        if (answer !== null) {
            setDisabled(false)
        } 
    }

    function updatePercent(field, val) {
        setPercent({[field]: val});    
    }
    
    return (
        
        <div className="main-box">
            <div>
                <p>검사예시</p>
                <ProgressBar width={400} percent={1} />
            </div>
            <div>
            <div>
                <div>
                    {item[0]} <br />
                    <label><input type='radio' name='ans' value='1' onClick={handleClick} />{item[1]}</label>
                    <label><input type='radio' name='ans' value='2' onClick={handleClick} />{item[2]}</label>
                </div>
                <div>
                    <Link to="./test">
                        <button type="submit" disabled={disabled}>검사시작</button>
                    </Link>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Example;