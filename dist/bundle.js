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
var GameContainer_1 = __webpack_require__(3);
ReactDOM.render(React.createElement(GameContainer_1.GameContainer, null), document.getElementById("app"));


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
var Score_1 = __webpack_require__(4);
var Damage_1 = __webpack_require__(5);
var SingleDice_1 = __webpack_require__(6);
var Actions_1 = __webpack_require__(7);
var GameContainer = (function (_super) {
    __extends(GameContainer, _super);
    function GameContainer() {
        var _this = _super.call(this) || this;
        _this.state = {
            gameScore: 0,
            gameShots: 0,
            gameOver: false,
            totalGreenDice: 6,
            totalYellowDice: 4,
            totalRedDice: 3,
            remaingDice: [],
            rolledHand: [],
            dice: [{
                    type: 0,
                    brains: 3,
                    shots: 1,
                    runs: 2,
                    total: 6
                }, {
                    type: 1,
                    brains: 2,
                    shots: 2,
                    runs: 2,
                    total: 4
                }, {
                    type: 2,
                    brains: 1,
                    shots: 3,
                    runs: 2,
                    total: 3
                }],
            winningScore: 12
        };
        return _this;
    }
    GameContainer.prototype.componentWillMount = function () {
        this.remaingDiceList(this.state.dice[0], this.state.dice[1], this.state.dice[2]);
    };
    GameContainer.prototype.diceListBuilder = function (allDiceList, diceTotal, diceType) {
        for (var i = 0; i < diceTotal; i++) {
            allDiceList.push(diceType);
        }
    };
    GameContainer.prototype.remaingDiceList = function (greenDice, yellowDice, redDice) {
        var allDice = [];
        this.diceListBuilder(allDice, greenDice.total, greenDice.type);
        this.diceListBuilder(allDice, yellowDice.total, yellowDice.type);
        this.diceListBuilder(allDice, redDice.total, redDice.type);
        this.setState({
            remaingDice: allDice
        });
    };
    GameContainer.prototype.getDice = function (remaingDice, totalGet) {
        var diceList = remaingDice;
        var allRolledDice = [];
        var diceToKeep = [];
        var currentPoints = this.state.gameScore;
        var currentShots = this.state.gameShots;
        if (diceList.length >= 2) {
            for (var i = 0; i < totalGet; i++) {
                var rolledDice = diceList[Math.floor(Math.random() * diceList.length)];
                allRolledDice.push(rolledDice);
                switch (rolledDice) {
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
        if (currentShots >= 3) {
            this.setState({
                gameOver: true,
                gameShots: currentShots,
                remaingDice: diceList,
                rolledHand: allRolledDice
            });
        }
        else {
            this.setState({
                gameScore: currentPoints,
                gameShots: currentShots,
                remaingDice: diceList,
                rolledHand: allRolledDice
            });
        }
    };
    GameContainer.prototype.handleDiceRoll = function (e) {
        this.getDice(this.state.remaingDice, 3);
    };
    GameContainer.prototype.render = function () {
        var _this = this;
        var isGameOver = this.state.gameOver;
        var rollButton = null;
        if (!isGameOver) {
            rollButton = React.createElement("button", { onClick: function (e) { return _this.handleDiceRoll(e); }, className: "mui-btn mui-btn--primary" }, "Roll Dice");
        }
        return (React.createElement("div", { className: "e-main-content" },
            React.createElement(Score_1.Score, { count: this.state.gameScore }),
            React.createElement(Damage_1.Damage, { count: this.state.gameShots }),
            React.createElement("div", null,
                React.createElement(SingleDice_1.SingleDice, { type: this.state.rolledHand[0] }),
                React.createElement(SingleDice_1.SingleDice, { type: this.state.rolledHand[1] }),
                React.createElement(SingleDice_1.SingleDice, { type: this.state.rolledHand[2] })),
            React.createElement(Actions_1.Actions, { gameState: this.state.gameOver, onRollClick: function (e) { return _this.handleDiceRoll(e); } })));
    };
    return GameContainer;
}(React.Component));
exports.GameContainer = GameContainer;


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
var Score = (function (_super) {
    __extends(Score, _super);
    function Score() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Score.prototype.renderScore = function (scoreCount) {
        var blankArray = [];
        for (var i = 0; i < scoreCount; i++) {
            blankArray.push(scoreCount);
        }
        ;
        return blankArray.map(function (item, index) {
            return (React.createElement("div", { className: "e-score-item" },
                React.createElement("div", { className: "e-score-fill" })));
        });
    };
    Score.prototype.render = function () {
        return (React.createElement("div", { className: "b-score clearfix" }, this.renderScore(this.props.count)));
    };
    return Score;
}(React.Component));
exports.Score = Score;


/***/ }),
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
var Damage = (function (_super) {
    __extends(Damage, _super);
    function Damage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Damage.prototype.renderDamage = function (scoreCount) {
        var blankArray = [];
        for (var i = 0; i < scoreCount; i++) {
            blankArray.push(scoreCount);
        }
        ;
        return blankArray.map(function (item, index) {
            return (React.createElement("div", { className: "e-damage-item" },
                React.createElement("div", { className: "e-damage-fill" })));
        });
    };
    Damage.prototype.render = function () {
        return (React.createElement("div", { className: "b-damage clearfix" }, this.renderDamage(this.props.count)));
    };
    return Damage;
}(React.Component));
exports.Damage = Damage;


/***/ }),
/* 6 */
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
var SingleDice = (function (_super) {
    __extends(SingleDice, _super);
    function SingleDice() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SingleDice.prototype.render = function () {
        var classNames = "mui-btn";
        var typeClass;
        var label;
        typeClass = classNames;
        switch (this.props.type) {
            case 0:
                typeClass += " mui-btn--primary";
                label = "Brain";
                break;
            case 1:
                typeClass += " mui-btn--accent";
                label = "Runner";
                break;
            case 2:
                typeClass += " mui-btn--danger";
                label = "Shot";
                break;
            default:
                typeClass;
                label = "None";
                break;
        }
        return (React.createElement("button", { className: typeClass }, label));
    };
    return SingleDice;
}(React.Component));
exports.SingleDice = SingleDice;


/***/ }),
/* 7 */
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
var Actions = (function (_super) {
    __extends(Actions, _super);
    function Actions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Actions.prototype.render = function () {
        var _this = this;
        if (!this.props.gameState) {
            return (React.createElement("button", { onClick: function (e) { return _this.props.onRollClick(e); }, className: "mui-btn mui-btn--primary" }, "Roll Dice"));
        }
        else {
            return (React.createElement("button", { onClick: function (e) { return _this.props.onRollClick(e); }, className: "mui-btn mui-btn--primary", disabled: true }, "Game Over"));
        }
    };
    return Actions;
}(React.Component));
exports.Actions = Actions;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map