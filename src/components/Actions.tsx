import * as React from "react";

interface IActionProps {
    gameState: boolean;
    onRollClick: (e: any) => void;
}

export class Actions extends React.Component<IActionProps, {}>{

    private handleRestart(e: any){
        window.location.reload(true);
    }
    
    render (){
        if(!this.props.gameState){
            return (<button onClick={(e) => this.props.onRollClick(e)} className="b-button m-blue">Roll</button>);
        } else {
            return (<button className="b-button m-red" onClick={(e) => this.handleRestart(e)}>Restart</button>);
        }
    }
}