import * as React from "react";

interface IDamageProps {
    count: number;
}

export class Damage extends React.Component<IDamageProps, {}>{
    render (){
        return (
            <div className="b-score m-damage">
                <div className="e-score-count">
                    {this.props.count}
                </div>
                <div className="e-score-label">
                    Shots
                </div>
            </div>
        );
    }
}