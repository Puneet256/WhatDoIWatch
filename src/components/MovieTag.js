import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags } from '@fortawesome/free-solid-svg-icons'


export default function MovieTag(props) {
  return (
  <div className = "pill">
    <FontAwesomeIcon className = "tagicon" icon={faTags} />
    {props.tag}
  </div>
  
  );
}
