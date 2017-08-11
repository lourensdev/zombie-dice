import * as React from "react";

interface IDiceProps {
    type: number;
}

export class SingleDice extends React.Component<IDiceProps, {}>{
    render (){

        let classNames: string = "e-dice-fill";
        let typeClass: string;
        let diceTypeImgUrl: string;

        typeClass = classNames;
        
        switch(this.props.type) {
            case 0:
                typeClass += " m-brain";
                diceTypeImgUrl = "./src/images/newspaper-icon.svg";
                break;
            case 1:
                typeClass += " m-run";
                diceTypeImgUrl = "./src/images/run-icon.svg";
                break;
            case 2:
                typeClass += " m-shot";
                diceTypeImgUrl = "./src/images/shot-icon.svg";
                break;
            default:
                typeClass;
                diceTypeImgUrl = "./src/images/blank-icon.svg";
                break;
        }

        return (
            <div className="e-single-dice">
                <div className={typeClass}>
                    <img src={diceTypeImgUrl} />
                </div>
            </div>
        );
    }
}