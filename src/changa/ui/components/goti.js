import React,{useEffect,useContext} from 'react'
import '../css/goti.css';
import {squareContext} from './board'
function Goti(props) {
    const {generateNextIdx} = useContext(squareContext);
    return (
        <div className = "g-wrapper" style = {{
            height : "30px",
            width : "30px",
            borderRadius : "50%",
            backgroundColor : props.color,
            border : "3px solid grey"
        }} onClick = {()=>generateNextIdx(props.squareIdx,props.color)}>
            {props.squareIdx}
        </div>
    )
}

export default Goti
