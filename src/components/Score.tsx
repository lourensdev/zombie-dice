import * as React from "react";

interface IScoreProps {
    count: number;
}

export class Score extends React.Component<IScoreProps, {}>{
    render (){
        return (
            <div className="b-score m-score">
                <div className="e-score-count">
                    {this.props.count}
                </div>
                <div className="e-score-label">
                    Delivered
                </div>
            </div>
        );
    }
}