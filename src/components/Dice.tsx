import * as React from "react";

interface IDiceProps {
    totalCount?: number;
    diceColour?: string;
    brains?: number;
    shots?: number;
    runs?: number;
}

export class Dice extends React.Component<IDiceProps, undefined> {
    render() {
        return(
            <div className="mui-col-md-4">
                <table className="mui-table">
                    <thead>
                        <tr>
                            <th>{this.props.diceColour}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Total: {this.props.totalCount}</td>
                        </tr>
                        <tr>
                            <td>Brains: {this.props.brains}</td>
                        </tr>
                        <tr>
                            <td>Shots: {this.props.shots}</td>
                        </tr>
                        <tr>
                            <td>Runs: {this.props.runs}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}