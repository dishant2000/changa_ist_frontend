// import $ from 'jquery';
class Piece{
    constructor(id, color, idxIni, idxCurr){
        this.id = id;
        this.color = color;
        this.idxIni = idxIni;
        this.idxCurr = idxCurr;
        this.domCom = document.createElement('div');
    }
    static iniComp(a){
        a.domCom.setAttribute("style",`height : 30px; width : 30px; background-color : ${a.color};border-radius:50%`)        
    }
    moveTo(steps){
        //todo
    }

}

export default Piece;