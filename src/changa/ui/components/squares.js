import React, { useState, useContext, useEffect } from 'react'
import '../css/squares.css'
import { squareContext } from './board'
import Piece from '../../model/piecesModel.js';
import Goti from './goti'
function Squares(props) {
    const { stateSQ, setStateSQ } = useContext(squareContext);
    const [gArray, setGArray] = useState([]);
    useEffect(() => {
        // console.log("stateSQ = ",stateSQ);
        // console.log("yae chala tha")
        if (stateSQ.squares[props.index].enableGoti) {
            let ggArr = [];
            for (let i = 0; i < stateSQ.squares[props.index].noOfGoti; i++) {
                ggArr.push({color : stateSQ.squares[props.index].color});
            }
            //console.log(ggArr);
            setGArray(ggArr);
        }
    }, [stateSQ])
    return (
        <div className="square-wrapper">
            {
                (stateSQ.squares[props.index].enableGoti && gArray.length !== 0) && <div className="goti-wrapper">
                    {
                        gArray.map((item,index) => {
                            //console.log("color = ",item.color)
                            return (
                                <React.Fragment key = {index}>
                                    <Goti color = {item.color[index]} squareIdx = {props.index}/>
                                </React.Fragment>
                            )
                        })
                    }
                </div> 
            }
        </div>
    )
}

export default Squares
