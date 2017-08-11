import * as React from "react";

interface IGraphicsProps {
    gameOver: boolean;
    imgUrl: string;
    classNames: string;
}

export class Graphics extends React.Component<IGraphicsProps, {}>{
    render (){
        let gameOverModifier:string = "";
        if(this.props.gameOver){
            gameOverModifier = " m-game-over"; 
        }
        return (
            <div className={this.props.classNames + gameOverModifier}>
                <div className="e-img-float">
                    <img src="./src/images/death-icon.svg" className="e-img-death" alt="Paperboy" />
                    <img src={this.props.imgUrl} className="e-img-animaiton" alt="Paperboy" />
                </div>
            </div>
        );
    }
}