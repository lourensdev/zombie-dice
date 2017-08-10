import * as React from "react";

interface IDiceProps {
    type: number;
}

export class SingleDice extends React.Component<IDiceProps, {}>{
    render (){

        let classNames: string = "mui-btn";
        let typeClass: string;
        let label: string;

        typeClass = classNames;

        switch(this.props.type) {
            case 0:
                typeClass += " mui-btn--primary";
                label = "Brain";
                break;
            case 1:
                typeClass += " mui-btn--accent";
                label = "Runner";
                break;
            case 2:
                typeClass += " mui-btn--danger";
                label = "Shot";
                break;
            default:
                typeClass;
                label = "None";
                break;
        }

        return (<button className={typeClass}>{label}</button>);
    }
}