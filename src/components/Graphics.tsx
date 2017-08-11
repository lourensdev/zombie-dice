import * as React from "react";

interface IGraphicsProps {
    gameOver: boolean;
    imgUrl: string;
    classNames: string;
}

export class Graphics extends React.Component<IGraphicsProps, {}>{
    render (){
        if(this.props.gameOver){
            return (
                <div className={this.props.classNames}>
                    <div className="e-img-float">
                        <img src="./src/images/death-icon.svg" alt="Paperboy" />
                    </div>
                </div>
            );
        } else {
            return (
                <div className={this.props.classNames}>
                    <div className="e-img-float">
                        <img src={this.props.imgUrl} className="e-img-animaiton" alt="Paperboy" />
                    </div>
                </div>
            );
        }
    }
}