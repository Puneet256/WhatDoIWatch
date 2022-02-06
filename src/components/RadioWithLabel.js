import React, {useState} from 'react';

export default function RadioWithLabel(props) {
  const [tagValues, setTagValues] = useState({"mood":"","lang":"","len":""});
  const [inputMood, setMood] = useState();
  const [inputLength, setLength] = useState();
  const [inputLanguage, setLanguage] = useState();


  const radiolabels = props.radiolabels;
  // var querytags = {"mood":inputMood,"len":inputLength,"lang":inputLanguage}
  console.log(inputMood, inputLanguage, inputLength)
  var keyCount = 0;
  function getKey(){
    return keyCount++;
  }

  function handleChange(e){

    if (e.target.name === "mood") {
      console.log('changing mood to ' + e.target.value)
          setMood(e.target.value);
    
      }
      else if (e.target.name === "length") {
        console.log('changing len to ' + e.target.value)
          setLength(e.target.value);
      }
      
      else {
        console.log('changing lang to ' + e.target.value)
          setLanguage(e.target.value);
      }

}

  return ( 
    <div>
        {
            radiolabels.map((label) => (
                <div key = {getKey()}>
                    <input type="radio" id={label} value={label} name={props.name} onChange= {handleChange}/>
                    <label htmlFor={label}>{label}</label>
                    <br/>
                </div>
            )
                
            )
        }
    </div>
  );
}
