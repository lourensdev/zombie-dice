import * as React from "react";

import { Animate } from "./Animate";
import { Score } from "./Score";
import { Damage } from "./Damage";
import { Graphics } from "./Graphics";
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

interface IZombieDiceState {
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
    deathScore: number;
    animated: boolean;
}

export class GameContainer extends React.Component<{}, IZombieDiceState> {
    constructor(){
        super();

        let initialTotalGreen: number = 6;
        let initialTotalYellow: number = 4;
        let initialTotalRed: number = 3;

        this.state = {
            gameScore: 0,
            gameShots: 0,
            gameOver: false,
            totalGreenDice: initialTotalGreen,
            totalYellowDice: initialTotalYellow,
            totalRedDice: initialTotalRed,
            remaingDice: [],
            rolledHand: [],
            keptHand: [0,0,0],
            dice: [{ //Green
                    type: 0,
                    brains: 3,
                    shots: 1,
                    runs: 2,
                    total: initialTotalGreen
                },{ //Yellow
                    type: 1,
                    brains: 2,
                    shots: 2,
                    runs: 2,
                    total: initialTotalYellow
                },{ //Red
                    type: 2,
                    brains: 1,
                    shots: 3,
                    runs: 2,
                    total: initialTotalRed
                }],
            winningScore: 12,
            deathScore: 3,
            animated: false
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

        let currentScore: number = this.state.gameScore;
        let currentShots: number = this.state.gameShots;

        if(diceList.length >= 2 ) {
            for(let i = 0; i < totalGet; i++){
                let rolledDice: number = diceList[Math.floor(Math.random() * diceList.length)];
                allRolledDice.push(rolledDice);
                switch(rolledDice) {
                    case 0:
                        currentScore++;
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

        this.animate( 2000, () => {
            this.updateScore( currentShots, currentScore, remaingDice, allRolledDice, diceToKeep )
        });
    }

    private animate(delay: number, callback: any){
        this.setState({
            animated: true
        });
        setTimeout(() => {
            this.setState({
                animated: false
            });
            callback();
        }, delay);
    }

    private updateScore(gameShots: number, gameScore: number, remaingDice: number[], rolledHand: number[], keptHand: number[]){
        if(gameShots >= this.state.deathScore){
            this.setState({
                gameOver: true,
                gameShots: gameShots,
                remaingDice: remaingDice,
                rolledHand: rolledHand,
                keptHand: keptHand
            });
        } else {
            this.setState({
                gameShots: gameShots,
                gameScore: gameScore,
                remaingDice: remaingDice,
                rolledHand: rolledHand,
                keptHand: keptHand
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
                <Graphics gameOver={this.state.gameOver} imgUrl="./src/images/walking-animation.gif" classNames="b-main-image" />
                <div className="e-actions">
                    <Animate animate={this.state.animated} baseClass="b-dice clearfix" animateActive="m-animate" animateDone="m-animate-done">
                        <SingleDice type={this.state.rolledHand[0]} key={0} />
                        <SingleDice type={this.state.rolledHand[1]} key={1} />
                        <SingleDice type={this.state.rolledHand[2]} key={2} />
                    </Animate>
                    <Actions gameState={this.state.gameOver} onRollClick={(e) => this.handleDiceRoll(e)} />
                    {/* <Debugger info={[this.state.remaingDice, this.state.rolledHand]} /> */}
                </div>
            </div>
        )
    }
}