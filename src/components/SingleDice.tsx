import * as React from "react";

interface IDiceProps {
    type: number;
    side: number;
}

export class SingleDice extends React.Component<IDiceProps, {}>{
    render (){

        let classNames: string = "e-dice-fill";
        let typeClass: string = "";
        let sideClass: string = "";
        let diceTypeImgUrl: string;
        
        switch(this.props.type) {
            case 0:
                typeClass += " m-green";
                break;
            case 1:
                typeClass += " m-yellow";
                break;
            case 2:
                typeClass += " m-red";
                break;
            default:
                typeClass;
                break;
        }

        switch(this.props.side) {
            case 0:
            sideClass += " m-brain";
            diceTypeImgUrl = "./src/images/brain-icon.svg";
            break;
        case 1:
            sideClass += " m-run";
            diceTypeImgUrl = "./src/images/run-icon.svg";
            break;
        case 2:
            sideClass += " m-shot";
            diceTypeImgUrl = "./src/images/shot-icon.svg";
            break;
        default:
            typeClass;
            diceTypeImgUrl = "./src/images/blank-icon.svg";
            break;
        }

        classNames += typeClass;
        classNames += sideClass;

        return (
            <div className="e-single-dice">
                <div className={classNames}>
                    <img src={diceTypeImgUrl} />
                </div>
            </div>
        );
    }
}