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

interface IDiceOdds {
    odds: number[];
}

interface IZombieDiceState {
    gameScore: number;
    gameShots: number;
    gameOver: boolean;
    totalGreenDice: number;
    totalYellowDice: number;
    totalRedDice: number;
    diceOdds: [IDiceOdds],
    remaingDice: number[],
    rolledDice: number[];
    rolledSide: number[];
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
            diceOdds: [{
                odds: [0,0,0,1,1,2] //Green Dice | Brains = 0; Runs = 1; Shots = 2
            },{
                odds: [0,0,1,1,2,2] //Yellow Dice | Brains = 0; Runs = 1; Shots = 2
            },{
                odds: [0,1,1,2,2,2] //Red Dice | Brains = 0; Runs = 1; Shots = 2
            }],
            remaingDice: [],  //Dice Type Numbers
            rolledDice: [],  //Dice Type Numbers
            rolledSide: [], //Dice Side Numbers
            keptHand: [0,0,0], //Dice Type Numbers
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
        let allDice: number[] = [];

        this.diceListBuilder(allDice, this.state.dice[0].total, this.state.dice[0].type);
        this.diceListBuilder(allDice, this.state.dice[1].total, this.state.dice[1].type);
        this.diceListBuilder(allDice, this.state.dice[2].total, this.state.dice[2].type);

        this.setState({
            remaingDice: allDice
        });
    }

    private diceListBuilder(allDiceList: number[], diceTotal: number, diceType: number){
        for (let i = 0; i < diceTotal; i++){
            allDiceList.push(diceType);
        }
    }

    private getRandomDice(arr: number[]){
        return arr[Math.floor(Math.random() * arr.length)];
    }

    private getRandomDiceSide(diceType: number){
        if(typeof diceType !== "undefined"){
            let diceOdds: number[] = this.state.diceOdds[diceType].odds;
            let randomSide: number = this.getRandomDice(diceOdds);
            return randomSide;
        }
    }

    private getDice(remaingDice: number[], totalGet: number) {

        let diceList: number[] = remaingDice;
        let rolledDiceHand: number[] = [];
        let rolledDiceSide: number[] = [];
        let diceToKeep: number[] = [];

        let currentScore: number = this.state.gameScore;
        let currentShots: number = this.state.gameShots;

        if(diceList.length >= 2 ) {
            for(let i = 0; i < totalGet; i++){

                let rolledDice: number = this.getRandomDice(diceList);
                let rolledSide: number = this.getRandomDiceSide(rolledDice)

                rolledDiceHand.push(rolledDice);
                rolledDiceSide.push(rolledSide);

                switch(rolledDice) {
                    case 0:
                        diceList.splice(diceList.indexOf(rolledDice), 1);
                        break;
                    case 1:
                        diceToKeep.push(rolledDice);
                        break;
                    case 2:
                        diceList.splice(diceList.indexOf(rolledDice), 1);
                        break;
                }

                switch(rolledSide) {
                    case 0:
                        currentScore++;
                        break;
                    case 2:
                        currentShots++;
                        break;
                }
            }
        }

        this.animate( 0, () => {
            this.updateScore( currentShots, currentScore, remaingDice, rolledDiceHand, rolledDiceSide, diceToKeep )
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

    private updateScore(gameShots: number, gameScore: number, remaingDice: number[], rolledDice: number[], rolledSide: number[], keptHand: number[]){
        if(gameShots >= this.state.deathScore){
            this.setState({
                gameOver: true,
                gameShots: gameShots,
                remaingDice: remaingDice,
                rolledDice: rolledDice,
                rolledSide: rolledSide,
                keptHand: keptHand
            });
        } else {
            this.setState({
                gameShots: gameShots,
                gameScore: gameScore,
                remaingDice: remaingDice,
                rolledDice: rolledDice,
                rolledSide: rolledSide,
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
                        <SingleDice type={this.state.rolledDice[0]} side={this.state.rolledSide[0]} key={0} />
                        <SingleDice type={this.state.rolledDice[1]} side={this.state.rolledSide[1]} key={1} />
                        <SingleDice type={this.state.rolledDice[2]} side={this.state.rolledSide[2]} key={2} />
                    </Animate>
                    <Actions gameState={this.state.gameOver} onRollClick={(e) => this.handleDiceRoll(e)} />
                    {/* <Debugger info={[this.state.remaingDice, this.state.rolledHand]} /> */}
                </div>
            </div>
        )
    }
}