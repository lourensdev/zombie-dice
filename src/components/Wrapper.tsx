import * as React from "react";

import { Dice } from "./Dice";

export interface ISingleDiceProps {
    totalCount?: number;
    colour?: string;
    brains?: number;
    shots?: number;
    runs?: number;
}

export interface IRolledDiceState {
    rolledDiceType: number;
    totalGreenDice: number;
    totalYellowDice: number;
    totalRedDice: number;
    dice: [ISingleDiceProps];
    remaingDice: number[];
    gameActiveState: boolean;
}

export class Wrapper extends React.Component<{}, IRolledDiceState> {

    constructor(){
        super();

        this.state = {
            rolledDiceType: null,
            totalGreenDice: 6,
            totalYellowDice: 4,
            totalRedDice: 3,
            dice: [{
                    totalCount: 6,
                    colour: "Green",
                    brains: 3,
                    shots: 1,
                    runs: 2
                },{
                    totalCount: 4,
                    colour: "Yellow",
                    brains: 2,
                    shots: 2,
                    runs: 2
                },{
                    totalCount: 3,
                    colour: "Red",
                    brains: 1,
                    shots: 3,
                    runs: 2
                }],
            remaingDice: [],
            gameActiveState: false
        };
    }

    componentWillMount(){
        this.remaingDiceList(this.state.dice[0].totalCount, this.state.dice[1].totalCount, this.state.dice[2].totalCount);
    }

    private diceListBuilder(diceList: number[], diceCount: number, totalDiceCount: number){
        for (let i = 0; i < diceCount; i++){
            diceList.push(totalDiceCount);
        }
    }

    private remaingDiceList(greenDice: number, yellowDice: number, redDice: number){
        let allDice: number[] = [];

        this.diceListBuilder(allDice, greenDice, greenDice);
        this.diceListBuilder(allDice, yellowDice, yellowDice);
        this.diceListBuilder(allDice, redDice, redDice);
        this.setState({
            remaingDice: allDice
        });
        return allDice;
    }

    private handleDiceRoll(e: any, diceLeft: number[]){

        let diceList: number[] = diceLeft;
        let rolledDice: number = diceList[Math.floor(Math.random() * diceList.length)];

        let greenDice: number = this.state.totalGreenDice;
        let yellowDice: number = this.state.totalYellowDice;
        let redDice: number = this.state.totalRedDice;

        diceList.splice(diceList.indexOf(rolledDice), 1);
        
        if(diceList.length < 0){
            this.checkRoll(diceList.length);
        } else {
            switch(rolledDice){
                case this.state.dice[0].totalCount:
                    greenDice -= 1; 
                    this.setState({
                        totalGreenDice: greenDice,
                        rolledDiceType: 0,
                        gameActiveState: true
                    });
                    this.checkRoll(diceList.length);
                    break;
                case this.state.dice[1].totalCount:
                    yellowDice -= 1;
                    this.setState({
                        totalYellowDice: yellowDice,
                        rolledDiceType: 1,
                        gameActiveState: true
                    });
                    this.checkRoll(diceList.length);
                    break;
                case this.state.dice[2].totalCount:
                    redDice -= 1;
                    this.setState({
                        totalRedDice: redDice,
                        rolledDiceType: 2,
                        gameActiveState: true
                    });
                    this.checkRoll(diceList.length);
                    break;
            }
        }
    }

    private checkRoll(remaingDice: number){
        if(remaingDice == 0){
            this.setState({
                rolledDiceType: null,
                gameActiveState: false
            });
        }
    }

    private renderButtonAction(currentGameState: boolean){
        let buttonLabel: string;

        if(currentGameState){
            buttonLabel = "Roll Dice";
        } else {
            buttonLabel = "Start Game";
        }

        return (<button onClick={(e) => this.handleDiceRoll(e, this.state.remaingDice)} className="mui-btn mui-btn--primary">{buttonLabel}</button>);
    }

    private renderRolledDice(rolledDice: number){
        if(rolledDice != null){
            return (<Dice totalCount={this.state.dice[rolledDice].totalCount}
                        diceColour={this.state.dice[rolledDice].colour}
                        brains={this.state.dice[rolledDice].brains}
                        shots={this.state.dice[rolledDice].shots}
                        runs={this.state.dice[rolledDice].runs} />);
        }
    }

    render() {
        return(
            <div className="mui-container">
                <div className="mui-row">
                    <div className="mui-col-md-12">
                        Green: {this.state.totalGreenDice}, Yellow: {this.state.totalYellowDice}, Red: {this.state.totalRedDice} <br/>
                        Remaining: {this.state.remaingDice}
                    </div>
                </div>
                <div className="mui-row">
                    <div className="mui-col-md-12">
                        {this.renderButtonAction(this.state.gameActiveState)}
                    </div>
                </div>
                <div className="mui-row">
                    {this.renderRolledDice(this.state.rolledDiceType)}
                </div>
            </div>
        );
    }
}