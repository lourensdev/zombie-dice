import * as React from "react";

interface ISingleDiceProps {
    total?: number;
    colour?: string;
    brains?: number;
    shots?: number;
    runs?: number;
}

interface IPaperBoyState {
    gameScore: number;
    gameShots: number;
    totalGreenDice: number;
    totalYellowDice: number;
    totalRedDice: number;
    remaingDice: number[],
    rolledHand: number[];
    revealHand: boolean;
    dice: [ISingleDiceProps];
}

export class GameContainer extends React.Component<{}, IPaperBoyState> {
    constructor(){
        super();

        this.state = {
            gameScore: 0,
            gameShots: 0,
            totalGreenDice: 6,
            totalYellowDice: 4,
            totalRedDice: 3,
            remaingDice: [],
            rolledHand: [],
            revealHand: false,
            dice: [{
                    total: 6,
                    colour: "Green",
                    brains: 3,
                    shots: 1,
                    runs: 2
                },{
                    total: 4,
                    colour: "Yellow",
                    brains: 2,
                    shots: 2,
                    runs: 2
                },{
                    total: 3,
                    colour: "Red",
                    brains: 1,
                    shots: 3,
                    runs: 2
                }]
        }
    }

    componentWillMount(){
        this.remaingDiceList(this.state.dice[0].total, this.state.dice[1].total, this.state.dice[2].total);
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
    }

    private getDice(remaingDice: number[], totalGet: number) {
        let diceList: number[] = remaingDice;
        let allRolledDice: number[] = [];

        for(let i = 0; i < totalGet; i++){
            if(diceList.length > -1 ) {
                let rolledDice: number = diceList[Math.floor(Math.random() * diceList.length)];
                allRolledDice.push(rolledDice);
                diceList.splice(diceList.indexOf(rolledDice), 1);
            }
        }

        this.setState({
            remaingDice: diceList,
            rolledHand: allRolledDice
        });
    }

    private handleDiceRoll(e: any) {
        this.getDice(this.state.remaingDice, 3);
    }

    private renderGameScore(totalScore: number) {
        return (<h3>Score: {totalScore}</h3>);
    }

    private renderGameShots(totalShots: number) {
        return (<h3>Shots: {totalShots}</h3>);
    }

    private renderSingleDice(diceType: number, diceReveal: boolean) {
        let labelString: string;
        diceReveal ? labelString = "Revealed" : labelString = "Hidden"; 

        let classNames: string = "mui-btn";
        let typeClass: string;

        typeClass = classNames;

        switch(diceType) {
            case 6:
                typeClass += " mui-btn--primary";
                break;
            case 4:
                typeClass += " mui-btn--accent";
                break;
            case 3:
                typeClass += " mui-btn--danger";
                break;
            default:
                typeClass;
                break;
        }

        return (
            <button className={typeClass}>{labelString}</button>
        );
    }

    private renderCurrentHand(currentHand: number[], revealCurrentHand: boolean){
        return (
            <div>
                {this.renderSingleDice(currentHand[0], revealCurrentHand)}
                {this.renderSingleDice(currentHand[1], revealCurrentHand)}
                {this.renderSingleDice(currentHand[2], revealCurrentHand)}
            </div>
        );
    }

    render(){
        return (
            <div>
                {this.renderGameScore(this.state.gameScore)}
                {this.renderGameShots(this.state.gameShots)}
                Remaining Dice: {this.state.remaingDice} <br />
                Rolled Hand: {this.state.rolledHand}
                {this.renderCurrentHand(this.state.rolledHand, this.state.revealHand)} <br />
                <button onClick={(e) => this.handleDiceRoll(e)}
                    className="mui-btn mui-btn--primary">Roll Dice</button>
            </div>
        )
    }
}