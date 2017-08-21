import * as React from "react";

interface IAnimateProps {
    animate: boolean;
    baseClass?: string;
    animateActive?: string;
    animateDone?: string;
}

export class Animate extends React.Component<IAnimateProps, {}>{    
    render (){
        let classNames: string = "";
        let modifierClassNames: string = "";

        classNames += this.props.baseClass || "";

        if(this.props.animate && this.props.animateActive != undefined){
            modifierClassNames += this.props.animateActive || "";
        } else {
            modifierClassNames += this.props.animateDone || "";
        }

        classNames += " " + modifierClassNames;

        return (
            <div className={classNames}>
                {this.props.children}
            </div>
        );
    }
}