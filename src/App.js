import { Button } from "@material-ui/core";
import React, { useState } from "react";
import './App.css';
import {first_person, everybody_tranlated, openings, prefixes, postfixes} from "./dataset";

function App() {
  const [otakuLevel, setOtakuLevel] = useState(30);
  const [originalText, setOriginalText] = useState("");
  const [tranlatedText, setTranslatedText] = useState("");

  const handleOtakuChange = (e) => {
    setOtakuLevel(e.target.value);
  }

  const handletextOnChange = (e) => {
    setOriginalText(e.target.value);
  }

  const hangleTranslate = () => {
    translate(originalText);
  }

  const randomBoolean = () => (Math.random() < (otakuLevel * 0.01));

  const translate = (text) => {
    if (text == ''){
      alert("呀咧呀咧 不打點字嗎www(歪頭");
      return;
    }
    let text_line_array = text.split('\n');
    console.log(text_line_array);
    let output_text = "";

    let opening_b = randomBoolean();
    if (opening_b){
      let random_opening = openings[Math.floor( Math.random() * openings.length )];
      output_text += `${random_opening}\n`;
    }
    
    let first_person_bool = randomBoolean();
    let we_bool = randomBoolean();

    text_line_array.forEach(line => {
      let w_bool = randomBoolean();
      let prefix_bool = randomBoolean();
      let postfix_bool = randomBoolean();

      // first person
      if (first_person_bool){
        line = line.replace(/我(?!們)/g, first_person);
      }

      if (we_bool){
        line = line.replace("大家", everybody_tranlated);
      }

      // w
      let w_number = ( Math.floor ( Math.random() * 4 ) + 2 ) * w_bool;
      let w_text = "w".repeat(w_number); 

      // prefix
      let prefix_text = prefix_bool ? (prefixes[Math.floor( Math.random() * prefixes.length )]) : '';

      // postfix
      let postfix_text = postfix_bool ? ('(' + postfixes[Math.floor( Math.random() * postfixes.length )]) : '';

      output_text += `${prefix_text}${line} ${w_text} ${postfix_text} \n`;
    });

    setTranslatedText(output_text);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>肥宅對話轉換器 Pro</h1>
        <textarea className="text-input" placeholder="輸入對話..." cols="100" rows="15" onChange={handletextOnChange}></textarea>
        <div className="form-group">
        <input type="range" className="form-control-range pantoneZOZ1-range" id="formControlRange" min="0" max="100" step="10" defaultValue={otakuLevel} onMouseUp={handleOtakuChange}/>
        <label className="otaku-level-show" htmlFor="formControlRange">肥宅度 = {otakuLevel}</label>
        
        
        </div>
        <Button variant="contained" color="secondary" onClick={hangleTranslate}>
          轉換
        </Button>
        <hr />
        <textarea readOnly className="text-input" placeholder="轉換結果" cols="100" rows="15" value={tranlatedText}></textarea>
        <a className="developer" href ="https://github.com/Kaminyou" target="_blank">Developed by Kaminyou</a>
      </header>
    </div>
  );
}

export default App;
