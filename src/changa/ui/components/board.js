import React,{useEffect,useState,createContext,useContext} from 'react'
import '../css/board.css'
import Squares from './squares'
import {diceContext} from '../../../App'
import Modal from 'react-modal'
const p1 = [2,1,0,5,10,15,20,21,22,23,24,19,14,9,4,3,8,13,18,17,16,11,6,7,12]; //red
const p2 = [10,15,20,21,22,23,24,19,14,9,4,3,2,1,0,5,6,7,8,13,18,17,16,11,12]; //blue
const p3 = [22,23,24,19,14,9,4,3,2,1,0,5,10,15,20,21,16,11,6,7,8,13,18,17,12]; //pink
const p4 = [14,9,4,3,2,1,0,5,10,15,20,21,22,23,24,19,18,17,16,11,6,7,8,13,12]; //yellow
const iniSQState = [
    {
        noOfGoti : 0,
        color : [],
        enableGoti : false
    },
    {
        noOfGoti : 0,
        color : [],
        enableGoti : false
    },
    {
        noOfGoti : 4,
        color : ["red","red","red","red"],
        enableGoti : true
    },
    {
        noOfGoti : 0,
        color : [],
        enableGoti : false
    },
    {
        noOfGoti : 0,
        color : [],
        enableGoti : false
    },
    {
        noOfGoti : 0,
        color : [],
        enableGoti : false
    },
    {
        noOfGoti : 0,
        color : [],
        enableGoti : false
    },
    {
        noOfGoti : 0,
        color : [],
        enableGoti : false
    },
    {
        noOfGoti : 0,
        color : [],
        enableGoti : false
    },
    {
        noOfGoti : 0,
        color : [],
        enableGoti : false
    },
    {
        noOfGoti : 4,
        color : ["blue","blue","blue","blue"],
        enableGoti : true
    },
    {
        noOfGoti : 0,
        color : [],
        enableGoti : false
    },
    {
        noOfGoti : 0,
        color : [],
        enableGoti : false
    },
    {
        noOfGoti : 0,
        color : [],
        enableGoti : false
    },
    {
        noOfGoti : 4,
        color : ["yellow","yellow","yellow","yellow"],
        enableGoti : true
    },
    {
        noOfGoti : 0,
        color : [],
        enableGoti : false
    },
    {
        noOfGoti : 0,
        color : [],
        enableGoti : false
    },
    {
        noOfGoti : 0,
        color : [],
        enableGoti : false
    },
    {
        noOfGoti : 0,
        color : [],
        enableGoti : false
    },
    {
        noOfGoti : 0,
        color : [],
        enableGoti : false
    },
    {
        noOfGoti : 0,
        color : [],
        enableGoti : false
    },
    {
        noOfGoti : 0,
        color : [],
        enableGoti : false
    },
    {
        noOfGoti : 4,
        color : ["pink","pink","pink","pink"],
        enableGoti : true
    },
    {
        noOfGoti : 0,
        color : [],
        enableGoti : false
    },
    {
        noOfGoti : 0,
        color : [],
        enableGoti : false
    }
]
const safeZone = [2,10,22,14,12];
const safeMap = new Map([['red', 2], ['blue', 10], ['pink', 22],['yellow',14],['home',12]]);
export const squareContext = createContext();
function Board() {
    //const [, updateState] = React.useState();
    //const forceUpdate = React.useCallback(() => updateState({}), []);
    const {count} = useContext(diceContext);
    const [stateSQ,setStateSQ] = useState({squares : iniSQState});
    const [winner,setWinner] = useState("None");
    //const [isModelOpen,setIsModelOpener] = useState(false);
    
    const winCheck = ()=>{
        let currState = stateSQ.squares;
        console.log(currState[12].color);
        if(currState[12].noOfGoti >= 4){
            let winArr = currState[12].color;
            winArr.sort();
            let ct = 0;
            let currC = winArr[0];
            console.log("currC ",currC);
            for(let i = 0; i < winArr.length; i++){
                if(winArr[i] === currC){
                    ct++;
                    
                }
                else{
                    ct = 1;
                    currC = winArr[i];
                }
                if(ct >= 4){
                    console.log("yea to chla hai")
                    return currC;
                }
            }
        }
        return "None";
    }
    
    useEffect(() => {
        console.log("checking winner")
        let win = winCheck();
        setWinner(win)
        
    },[stateSQ])
    
    const generateNextIdx = (idx,color)=>{
        //console.log(idx," ",color);
        switch(color){
            case 'red' : {
                let currAIdx = p1.findIndex((ele) => ele === idx);
                let nextIdx = p1[currAIdx + count];
                let currState = stateSQ.squares;
                //curr idx chamged
                currState[idx].noOfGoti -= 1;
                if(currState[idx].noOfGoti === 0) currState[idx].enableGoti = false;
                let nc = currState[idx].color;
                let ri = nc.findIndex(ele => ele === color);
                nc.splice(ri,1);
                currState[idx].color = nc;

                //update nxtidx state
                if(currState[nextIdx].noOfGoti !== 0 && !safeZone.find(next => next === nextIdx)){
                    let clr = currState[nextIdx].color;
                    let inin = clr.length;
                    let repColor;
                    for(let i = 0 ;i < inin ;i++){
                        if(clr[i] !== color){
                            repColor = clr[i];
                            break;
                        }
                    }
                    let flag = 0;
                    let repIdx;
                    if(repColor){
                        repIdx = safeMap.get(repColor);
                        flag = 1;
                    }
                    
                    clr = clr.filter(item => item === color);
                    let newn = clr.length;

                    let diff = Math.abs(inin - newn);
                    currState[nextIdx].noOfGoti -= diff;
                    if(flag){
                        currState[repIdx].noOfGoti += diff;
                        for(let i = 0; i < diff ;i++){
                            currState[repIdx].color.push(repColor);
                        }
                    }
                    clr.push(color);
                    currState[nextIdx].noOfGoti += 1;
                    currState[nextIdx].color = clr;
                    currState[nextIdx].enableGoti = true;     
                }
                else{
                    currState[nextIdx].noOfGoti += 1;
                    currState[nextIdx].color.push(color);
                    currState[nextIdx].enableGoti = true;
                }
                
                //console.log(currState);
                setStateSQ({squares : currState});
                // forceUpdater()
            }
            break;
            case "blue":{
                let currAIdx = p2.findIndex((ele) => ele === idx);
                let nextIdx = p2[currAIdx + count];
                let currState = stateSQ.squares;
                //curr idx chamged
                currState[idx].noOfGoti -= 1;
                if(currState[idx].noOfGoti === 0) currState[idx].enableGoti = false;
                let nc = currState[idx].color;
                let ri = nc.findIndex(ele => ele === color);
                nc.splice(ri,1);
                currState[idx].color = nc;

                //update nxtidx state
                if(currState[nextIdx].noOfGoti !== 0 && !safeZone.find(next => next === nextIdx)){
                    let clr = currState[nextIdx].color;
                    let inin = clr.length;
                    let repColor;
                    for(let i = 0 ;i < inin ;i++){
                        if(clr[i] !== color){
                            repColor = clr[i];
                            break;
                        }
                    }
                    let flag = 0;
                    let repIdx;
                    if(repColor){
                        repIdx = safeMap.get(repColor);
                        flag = 1;
                    }
                    
                    clr = clr.filter(item => item === color);
                    let newn = clr.length;

                    let diff = Math.abs(inin - newn);
                    currState[nextIdx].noOfGoti -= diff;
                    if(flag){
                        currState[repIdx].noOfGoti += diff;
                        for(let i = 0; i < diff ;i++){
                            currState[repIdx].color.push(repColor);
                        }
                    }
                    clr.push(color);
                    currState[nextIdx].noOfGoti += 1;
                    currState[nextIdx].color = clr;
                    currState[nextIdx].enableGoti = true;     
                }
                else{
                    currState[nextIdx].noOfGoti += 1;
                    currState[nextIdx].color.push(color);
                    currState[nextIdx].enableGoti = true;
                }
                
                //console.log(currState);
                setStateSQ({squares : currState});

            } 
            break;
            case "pink":{
                let currAIdx = p3.findIndex((ele) => ele === idx);
                let nextIdx = p3[currAIdx + count];
                let currState = stateSQ.squares;
                //curr idx chamged
                currState[idx].noOfGoti -= 1;
                if(currState[idx].noOfGoti === 0) currState[idx].enableGoti = false;
                let nc = currState[idx].color;
                let ri = nc.findIndex(ele => ele === color);
                nc.splice(ri,1);
                currState[idx].color = nc;

                //update nxtidx state
                if(currState[nextIdx].noOfGoti !== 0 && !safeZone.find(next => next === nextIdx)){
                    let clr = currState[nextIdx].color;
                    let inin = clr.length;
                    let repColor;
                    for(let i = 0 ;i < inin ;i++){
                        if(clr[i] !== color){
                            repColor = clr[i];
                            break;
                        }
                    }
                    let flag = 0;
                    let repIdx;
                    if(repColor){
                        repIdx = safeMap.get(repColor);
                        flag = 1;
                    }
                    
                    clr = clr.filter(item => item === color);
                    let newn = clr.length;

                    let diff = Math.abs(inin - newn);
                    currState[nextIdx].noOfGoti -= diff;
                    if(flag){
                        currState[repIdx].noOfGoti += diff;
                        for(let i = 0; i < diff ;i++){
                            currState[repIdx].color.push(repColor);
                        }
                    }
                    clr.push(color);
                    currState[nextIdx].noOfGoti += 1;
                    currState[nextIdx].color = clr;
                    currState[nextIdx].enableGoti = true;     
                }
                else{
                    currState[nextIdx].noOfGoti += 1;
                    currState[nextIdx].color.push(color);
                    currState[nextIdx].enableGoti = true;
                }
                
                //console.log(currState);
                setStateSQ({squares : currState});
                
            } 
            break;
            case "yellow":{
                let currAIdx = p4.findIndex((ele) => ele === idx);
                let nextIdx = p4[currAIdx + count];
                let currState = stateSQ.squares;
                //curr idx chamged
                currState[idx].noOfGoti -= 1;
                if(currState[idx].noOfGoti === 0) currState[idx].enableGoti = false;
                let nc = currState[idx].color;
                let ri = nc.findIndex(ele => ele === color);
                nc.splice(ri,1);
                currState[idx].color = nc;

                //update nxtidx state
                if(currState[nextIdx].noOfGoti !== 0 && !safeZone.find(next => next === nextIdx)){
                    let clr = currState[nextIdx].color;
                    let inin = clr.length;
                    let repColor;
                    for(let i = 0 ;i < inin ;i++){
                        if(clr[i] !== color){
                            repColor = clr[i];
                            break;
                        }
                    }
                    let flag = 0;
                    let repIdx;
                    if(repColor){
                        repIdx = safeMap.get(repColor);
                        flag = 1;
                    }
                    
                    clr = clr.filter(item => item === color);
                    let newn = clr.length;

                    let diff = Math.abs(inin - newn);
                    currState[nextIdx].noOfGoti -= diff;
                    if(flag){
                        currState[repIdx].noOfGoti += diff;
                        for(let i = 0; i < diff ;i++){
                            currState[repIdx].color.push(repColor);
                        }
                    }
                    clr.push(color);
                    currState[nextIdx].noOfGoti += 1;
                    currState[nextIdx].color = clr;
                    currState[nextIdx].enableGoti = true;     
                }
                else{
                    currState[nextIdx].noOfGoti += 1;
                    currState[nextIdx].color.push(color);
                    currState[nextIdx].enableGoti = true;
                }
                
                //console.log(currState);
                setStateSQ({squares : currState});
                
            } 
            break;

            default : console.log("something went wrong");
        }
        //console.log(stateSQ);
        
    }
    const resetBoard = ()=>{
        console.log("reset wala chala");
        setStateSQ({squares : iniSQState});
        console.log(iniSQState)
    }
    return (
        <squareContext.Provider value = {{
            stateSQ : stateSQ,
            setStateSQ : setStateSQ,
            generateNextIdx : generateNextIdx
        }}>
            <div className="board-wrapper">
                <div className="board-row">
                    <Squares index = {0}/>
                    <Squares index = {1}/>
                    <Squares index = {2} />
                    <Squares index = {3}/>
                    <Squares index = {4}/>
                </div>
                <div className="board-row">
                    <Squares index = {5}/>
                    <Squares index = {6}/>
                    <Squares index = {7}/>
                    <Squares index = {8}/>
                    <Squares index = {9}/>
                </div>
                <div className="board-row">
                    <Squares index = {10} />
                    <Squares index = {11}/>
                    <Squares index = {12} />
                    <Squares index = {13}/>
                    <Squares index = {14} />
                </div>
                <div className="board-row">
                    <Squares index = {15}/>
                    <Squares index = {16}/>
                    <Squares index = {17}/>
                    <Squares index = {18}/>
                    <Squares index = {19}/>
                </div>
                <div className="board-row">
                    <Squares index = {20} />
                    <Squares index = {21}/>
                    <Squares index = {22} />
                    <Squares index = {23}/>
                    <Squares index = {24}/>
                </div>
                <div className = "test-w">
                    <span>Winner is {winner}  </span>
                    {/*<button onClick = {() => resetBoard()}>reset</button>*/}
                </div>

            </div>
        </squareContext.Provider>
    )
}

export default Board
