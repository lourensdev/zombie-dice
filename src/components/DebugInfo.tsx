import * as React from "react";

interface IDebugProps {
    info: any[];
}

export class Debugger extends React.Component<IDebugProps, {}>{

    private renderRows(infoList: any[]){
        return infoList.map((item, index) => {
            return (
                <tr>
                    <td key={index}>{item}</td>
                </tr>
            );
        });
    }

    render(){
        return (
            <table className="mui-table">
                <thead>
                    <tr>
                        <th>Debug Info</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows(this.props.info)}
                </tbody>
            </table>
        );
    }
}