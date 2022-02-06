import React from 'react';
import RadioWithLabel from "./RadioWithLabel";

export default function RadioGroup(props) {
  return ( 
    <div>
        <h6 style ={{textTransform: 'uppercase'}}>{props.name}</h6>
        <RadioWithLabel name = {props.name} radiolabels = {props.tags}/>
    </div>
  );
}
