import React,{useState,useContext} from 'react'
import '../css/dice.css'
import {diceContext} from '../../../App'
function Dice() {
    const {count,randGenerate} = useContext(diceContext);
    
    return (
        <button className = "dice-wrapper" onClick = {()=>randGenerate()}>
            {
                count
            }
        </button>
    )
}

export default Dice
