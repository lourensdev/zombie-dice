import * as React from "react";

interface IActionProps {
    gameState: boolean;
    onRollClick: (e: any) => void;
}

export class Actions extends React.Component<IActionProps, {}>{
    render (){
        if(!this.props.gameState){
            return (<button onClick={(e) => this.props.onRollClick(e)} className="mui-btn mui-btn--primary">Roll Dice</button>);
        } else {
            return (<button onClick={(e) => this.props.onRollClick(e)} className="mui-btn mui-btn--primary" disabled>Game Over</button>);
        }
    }
}