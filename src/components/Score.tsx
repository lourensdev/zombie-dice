import * as React from "react";

interface IScoreProps {
    count: number;
}

export class Score extends React.Component<IScoreProps, {}>{
    private renderScore(scoreCount: number){

        let blankArray: number[] = [];
        for(let i = 0; i < scoreCount; i++) {
            blankArray.push(scoreCount);
        };

        return blankArray.map((item, index) => {
            return (
                <div className="e-score-item">
                    <div className="e-score-fill"></div>
                </div>
            );
        });
    }
    render (){
        return (
            <div className="b-score clearfix">
                {this.renderScore(this.props.count)}
            </div>
        );
    }
}