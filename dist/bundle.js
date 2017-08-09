/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(2);
var GameContainer_1 = __webpack_require__(5);
ReactDOM.render(React.createElement(GameContainer_1.GameContainer, null), document.getElementById("app"));


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var GameContainer = (function (_super) {
    __extends(GameContainer, _super);
    function GameContainer() {
        var _this = _super.call(this) || this;
        _this.state = {
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
                }, {
                    total: 4,
                    colour: "Yellow",
                    brains: 2,
                    shots: 2,
                    runs: 2
                }, {
                    total: 3,
                    colour: "Red",
                    brains: 1,
                    shots: 3,
                    runs: 2
                }]
        };
        return _this;
    }
    GameContainer.prototype.componentWillMount = function () {
        this.remaingDiceList(this.state.dice[0].total, this.state.dice[1].total, this.state.dice[2].total);
    };
    GameContainer.prototype.diceListBuilder = function (diceList, diceCount, totalDiceCount) {
        for (var i = 0; i < diceCount; i++) {
            diceList.push(totalDiceCount);
        }
    };
    GameContainer.prototype.remaingDiceList = function (greenDice, yellowDice, redDice) {
        var allDice = [];
        this.diceListBuilder(allDice, greenDice, greenDice);
        this.diceListBuilder(allDice, yellowDice, yellowDice);
        this.diceListBuilder(allDice, redDice, redDice);
        this.setState({
            remaingDice: allDice
        });
    };
    GameContainer.prototype.getDice = function (remaingDice, totalGet) {
        var diceList = remaingDice;
        var allRolledDice = [];
        for (var i = 0; i < totalGet; i++) {
            if (diceList.length > -1) {
                var rolledDice = diceList[Math.floor(Math.random() * diceList.length)];
                allRolledDice.push(rolledDice);
                diceList.splice(diceList.indexOf(rolledDice), 1);
            }
        }
        this.setState({
            remaingDice: diceList,
            rolledHand: allRolledDice
        });
    };
    GameContainer.prototype.handleDiceRoll = function (e) {
        this.getDice(this.state.remaingDice, 3);
    };
    GameContainer.prototype.renderGameScore = function (totalScore) {
        return (React.createElement("h3", null,
            "Score: ",
            totalScore));
    };
    GameContainer.prototype.renderGameShots = function (totalShots) {
        return (React.createElement("h3", null,
            "Shots: ",
            totalShots));
    };
    GameContainer.prototype.renderSingleDice = function (diceType, diceReveal) {
        var labelString;
        diceReveal ? labelString = "Revealed" : labelString = "Hidden";
        var classNames = "mui-btn";
        var typeClass;
        typeClass = classNames;
        switch (diceType) {
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
        return (React.createElement("button", { className: typeClass }, labelString));
    };
    GameContainer.prototype.renderCurrentHand = function (currentHand, revealCurrentHand) {
        return (React.createElement("div", null,
            this.renderSingleDice(currentHand[0], revealCurrentHand),
            this.renderSingleDice(currentHand[1], revealCurrentHand),
            this.renderSingleDice(currentHand[2], revealCurrentHand)));
    };
    GameContainer.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            this.renderGameScore(this.state.gameScore),
            this.renderGameShots(this.state.gameShots),
            "Remaining Dice: ",
            this.state.remaingDice,
            " ",
            React.createElement("br", null),
            "Rolled Hand: ",
            this.state.rolledHand,
            this.renderCurrentHand(this.state.rolledHand, this.state.revealHand),
            " ",
            React.createElement("br", null),
            React.createElement("button", { onClick: function (e) { return _this.handleDiceRoll(e); }, className: "mui-btn mui-btn--primary" }, "Roll Dice")));
    };
    return GameContainer;
}(React.Component));
exports.GameContainer = GameContainer;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map