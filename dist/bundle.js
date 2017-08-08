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
var Wrapper_1 = __webpack_require__(3);
ReactDOM.render(React.createElement(Wrapper_1.Wrapper, null), document.getElementById("app"));


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 3 */
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
var Dice_1 = __webpack_require__(4);
var Wrapper = (function (_super) {
    __extends(Wrapper, _super);
    function Wrapper() {
        var _this = _super.call(this) || this;
        _this.state = {
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
                }, {
                    totalCount: 4,
                    colour: "Yellow",
                    brains: 2,
                    shots: 2,
                    runs: 2
                }, {
                    totalCount: 3,
                    colour: "Red",
                    brains: 1,
                    shots: 3,
                    runs: 2
                }],
            remaingDice: [],
            gameActiveState: false
        };
        return _this;
    }
    Wrapper.prototype.componentWillMount = function () {
        this.remaingDiceList(this.state.dice[0].totalCount, this.state.dice[1].totalCount, this.state.dice[2].totalCount);
    };
    Wrapper.prototype.diceListBuilder = function (diceList, diceCount, totalDiceCount) {
        for (var i = 0; i < diceCount; i++) {
            diceList.push(totalDiceCount);
        }
    };
    Wrapper.prototype.remaingDiceList = function (greenDice, yellowDice, redDice) {
        var allDice = [];
        this.diceListBuilder(allDice, greenDice, greenDice);
        this.diceListBuilder(allDice, yellowDice, yellowDice);
        this.diceListBuilder(allDice, redDice, redDice);
        this.setState({
            remaingDice: allDice
        });
        return allDice;
    };
    Wrapper.prototype.handleDiceRoll = function (e, diceLeft) {
        var diceList = diceLeft;
        var rolledDice = diceList[Math.floor(Math.random() * diceList.length)];
        var greenDice = this.state.totalGreenDice;
        var yellowDice = this.state.totalYellowDice;
        var redDice = this.state.totalRedDice;
        diceList.splice(diceList.indexOf(rolledDice), 1);
        if (diceList.length < 0) {
            this.checkRoll(diceList.length);
        }
        else {
            switch (rolledDice) {
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
    };
    Wrapper.prototype.checkRoll = function (remaingDice) {
        if (remaingDice == 0) {
            this.setState({
                rolledDiceType: null,
                gameActiveState: false
            });
        }
    };
    Wrapper.prototype.renderButtonAction = function (currentGameState) {
        var _this = this;
        var buttonLabel;
        if (currentGameState) {
            buttonLabel = "Roll Dice";
        }
        else {
            buttonLabel = "Start Game";
        }
        return (React.createElement("button", { onClick: function (e) { return _this.handleDiceRoll(e, _this.state.remaingDice); }, className: "mui-btn mui-btn--primary" }, buttonLabel));
    };
    Wrapper.prototype.renderRolledDice = function (rolledDice) {
        if (rolledDice != null) {
            return (React.createElement(Dice_1.Dice, { totalCount: this.state.dice[rolledDice].totalCount, diceColour: this.state.dice[rolledDice].colour, brains: this.state.dice[rolledDice].brains, shots: this.state.dice[rolledDice].shots, runs: this.state.dice[rolledDice].runs }));
        }
    };
    Wrapper.prototype.render = function () {
        return (React.createElement("div", { className: "mui-container" },
            React.createElement("div", { className: "mui-row" },
                React.createElement("div", { className: "mui-col-md-12" },
                    "Green: ",
                    this.state.totalGreenDice,
                    ", Yellow: ",
                    this.state.totalYellowDice,
                    ", Red: ",
                    this.state.totalRedDice,
                    " ",
                    React.createElement("br", null),
                    "Remaining: ",
                    this.state.remaingDice)),
            React.createElement("div", { className: "mui-row" },
                React.createElement("div", { className: "mui-col-md-12" }, this.renderButtonAction(this.state.gameActiveState))),
            React.createElement("div", { className: "mui-row" }, this.renderRolledDice(this.state.rolledDiceType))));
    };
    return Wrapper;
}(React.Component));
exports.Wrapper = Wrapper;


/***/ }),
/* 4 */
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
var Dice = (function (_super) {
    __extends(Dice, _super);
    function Dice() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dice.prototype.render = function () {
        return (React.createElement("div", { className: "mui-col-md-4" },
            React.createElement("table", { className: "mui-table" },
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null, this.props.diceColour))),
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            "Total: ",
                            this.props.totalCount)),
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            "Brains: ",
                            this.props.brains)),
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            "Shots: ",
                            this.props.shots)),
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            "Runs: ",
                            this.props.runs))))));
    };
    return Dice;
}(React.Component));
exports.Dice = Dice;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map