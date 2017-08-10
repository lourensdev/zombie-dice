import * as React from "react";

import { Score } from "./Score";
import { Damage } from "./Damage";
import { SingleDice } from "./SingleDice";

import { Actions } from "./Actions";

import { Debugger } from "./DebugInfo";

interface ISingleDiceProps {
    type?: number;
    brains?: number;
    shots?: number;
    runs?: number;
    total?: number;
}

interface IPaperBoyState {
    gameScore: number;
    gameShots: number;
    gameOver: boolean;
    totalGreenDice: number;
    totalYellowDice: number;
    totalRedDice: number;
    remaingDice: number[],
    rolledHand: number[];
    keptHand: number[];
    dice: [ISingleDiceProps];
    winningScore: number;
}

export class GameContainer extends React.Component<{}, IPaperBoyState> {
    constructor(){
        super();

        this.state = {
            gameScore: 0,
            gameShots: 0,
            gameOver: false,
            totalGreenDice: 6,
            totalYellowDice: 4,
            totalRedDice: 3,
            remaingDice: [],
            rolledHand: [],
            keptHand: [0,0,0],
            dice: [{ //Green
                    type: 0,
                    brains: 3,
                    shots: 1,
                    runs: 2,
                    total: 6
                },{ //Yellow
                    type: 1,
                    brains: 2,
                    shots: 2,
                    runs: 2,
                    total: 4
                },{ //Red
                    type: 2,
                    brains: 1,
                    shots: 3,
                    runs: 2,
                    total: 3
                }],
            winningScore: 12
        }
    }

    componentWillMount(){
        this.remaingDiceList(this.state.dice[0], this.state.dice[1], this.state.dice[2]);
    }

    private diceListBuilder(allDiceList: number[], diceTotal: number, diceType: number){
        for (let i = 0; i < diceTotal; i++){
            allDiceList.push(diceType);
        }
    }

    private remaingDiceList(greenDice: any, yellowDice: any, redDice: any){
        let allDice: number[] = [];

        this.diceListBuilder(allDice, greenDice.total, greenDice.type);
        this.diceListBuilder(allDice, yellowDice.total, yellowDice.type);
        this.diceListBuilder(allDice, redDice.total, redDice.type);
        this.setState({
            remaingDice: allDice
        });
    }

    private getDice(remaingDice: number[], totalGet: number) {

        let diceList: number[] = remaingDice;
        let allRolledDice: number[] = [];
        let diceToKeep: number[] = [];

        let currentPoints: number = this.state.gameScore;
        let currentShots: number = this.state.gameShots;

        if(diceList.length >= 2 ) {
            for(let i = 0; i < totalGet; i++){
                let rolledDice: number = diceList[Math.floor(Math.random() * diceList.length)];
                allRolledDice.push(rolledDice);
                switch(rolledDice) {
                    case 0:
                        currentPoints++;
                        diceList.splice(diceList.indexOf(rolledDice), 1);
                        break;
                    case 1:
                        diceToKeep.push(rolledDice);
                        break;
                    case 2:
                        currentShots++;
                        diceList.splice(diceList.indexOf(rolledDice), 1);
                        break;
                }
            }
        }

        if(currentShots >= 3){
            this.setState({
                gameOver: true,
                gameShots: currentShots,
                remaingDice: diceList,
                rolledHand: allRolledDice,
                keptHand: diceToKeep
            });
        } else {
            this.setState({
                gameScore: currentPoints,
                gameShots: currentShots,
                remaingDice: diceList,
                rolledHand: allRolledDice,
                keptHand: diceToKeep
            });
        }
    }

    private handleDiceRoll(e: any) {
        this.getDice(this.state.remaingDice, 3);
    }

    render(){
        return (
            <div className="e-main-content">
                <Score count={this.state.gameScore} />
                <Damage count={this.state.gameShots} />
                <div>
                    <SingleDice type={this.state.rolledHand[0]} />
                    <SingleDice type={this.state.rolledHand[1]} />
                    <SingleDice type={this.state.rolledHand[2]} />
                </div>
                <Actions gameState={this.state.gameOver} onRollClick={(e) => this.handleDiceRoll(e)} />
                {/* <Debugger info={[this.state.remaingDice, this.state.rolledHand]} /> */}        
            </div>
        )
    }
}