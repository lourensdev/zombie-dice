import * as React from "react";

interface IDamageProps {
    count: number;
}

export class Damage extends React.Component<IDamageProps, {}>{
    private renderDamage(scoreCount: number){

        let blankArray: number[] = [];
        for(let i = 0; i < scoreCount; i++) {
            blankArray.push(scoreCount);
        };

        return blankArray.map((item, index) => {
            return (
                <div className="e-damage-item">
                    <div className="e-damage-fill"></div>
                </div>
            );
        });
    }
    render (){
        return (
            <div className="b-damage clearfix">
                {this.renderDamage(this.props.count)}
            </div>
        );
    }
}