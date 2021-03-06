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
var Animate_1 = __webpack_require__(4);
var Score_1 = __webpack_require__(5);
var Damage_1 = __webpack_require__(6);
var Graphics_1 = __webpack_require__(7);
var SingleDice_1 = __webpack_require__(8);
var Actions_1 = __webpack_require__(9);
var GameContainer = (function (_super) {
    __extends(GameContainer, _super);
    function GameContainer() {
        var _this = _super.call(this) || this;
        var initialTotalGreen = 6;
        var initialTotalYellow = 4;
        var initialTotalRed = 3;
        _this.state = {
            gameScore: 0,
            gameShots: 0,
            gameOver: false,
            totalGreenDice: initialTotalGreen,
            totalYellowDice: initialTotalYellow,
            totalRedDice: initialTotalRed,
            diceOdds: [{
                    odds: [0, 0, 0, 1, 1, 2] //Green Dice | Brains = 0; Runs = 1; Shots = 2
                }, {
                    odds: [0, 0, 1, 1, 2, 2] //Yellow Dice | Brains = 0; Runs = 1; Shots = 2
                }, {
                    odds: [0, 1, 1, 2, 2, 2] //Red Dice | Brains = 0; Runs = 1; Shots = 2
                }],
            remaingDice: [],
            rolledDice: [],
            rolledSide: [],
            keptHand: [0, 0, 0],
            dice: [{
                    type: 0,
                    brains: 3,
                    shots: 1,
                    runs: 2,
                    total: initialTotalGreen
                }, {
                    type: 1,
                    brains: 2,
                    shots: 2,
                    runs: 2,
                    total: initialTotalYellow
                }, {
                    type: 2,
                    brains: 1,
                    shots: 3,
                    runs: 2,
                    total: initialTotalRed
                }],
            winningScore: 12,
            deathScore: 3,
            animated: false
        };
        return _this;
    }
    GameContainer.prototype.componentWillMount = function () {
        var allDice = [];
        this.diceListBuilder(allDice, this.state.dice[0].total, this.state.dice[0].type);
        this.diceListBuilder(allDice, this.state.dice[1].total, this.state.dice[1].type);
        this.diceListBuilder(allDice, this.state.dice[2].total, this.state.dice[2].type);
        this.setState({
            remaingDice: allDice
        });
    };
    GameContainer.prototype.diceListBuilder = function (allDiceList, diceTotal, diceType) {
        for (var i = 0; i < diceTotal; i++) {
            allDiceList.push(diceType);
        }
    };
    GameContainer.prototype.getRandomDice = function (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    };
    GameContainer.prototype.getRandomDiceSide = function (diceType) {
        if (typeof diceType !== "undefined") {
            var diceOdds = this.state.diceOdds[diceType].odds;
            var randomSide = this.getRandomDice(diceOdds);
            return randomSide;
        }
    };
    GameContainer.prototype.getDice = function (remaingDice, totalGet) {
        var _this = this;
        var diceList = remaingDice;
        var rolledDiceHand = [];
        var rolledDiceSide = [];
        var diceToKeep = [];
        var currentScore = this.state.gameScore;
        var currentShots = this.state.gameShots;
        if (diceList.length >= 2) {
            for (var i = 0; i < totalGet; i++) {
                var rolledDice = this.getRandomDice(diceList);
                var rolledSide = this.getRandomDiceSide(rolledDice);
                rolledDiceHand.push(rolledDice);
                rolledDiceSide.push(rolledSide);
                switch (rolledDice) {
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
                switch (rolledSide) {
                    case 0:
                        currentScore++;
                        break;
                    case 2:
                        currentShots++;
                        break;
                }
            }
        }
        this.animate(0, function () {
            _this.updateScore(currentShots, currentScore, remaingDice, rolledDiceHand, rolledDiceSide, diceToKeep);
        });
    };
    GameContainer.prototype.animate = function (delay, callback) {
        var _this = this;
        this.setState({
            animated: true
        });
        setTimeout(function () {
            _this.setState({
                animated: false
            });
            callback();
        }, delay);
    };
    GameContainer.prototype.updateScore = function (gameShots, gameScore, remaingDice, rolledDice, rolledSide, keptHand) {
        if (gameShots >= this.state.deathScore) {
            this.setState({
                gameOver: true,
                gameShots: gameShots,
                remaingDice: remaingDice,
                rolledDice: rolledDice,
                rolledSide: rolledSide,
                keptHand: keptHand
            });
        }
        else {
            this.setState({
                gameShots: gameShots,
                gameScore: gameScore,
                remaingDice: remaingDice,
                rolledDice: rolledDice,
                rolledSide: rolledSide,
                keptHand: keptHand
            });
        }
    };
    GameContainer.prototype.handleDiceRoll = function (e) {
        this.getDice(this.state.remaingDice, 3);
    };
    GameContainer.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "e-main-content" },
            React.createElement(Score_1.Score, { count: this.state.gameScore }),
            React.createElement(Damage_1.Damage, { count: this.state.gameShots }),
            React.createElement(Graphics_1.Graphics, { gameOver: this.state.gameOver, imgUrl: "./src/images/walking-animation.gif", classNames: "b-main-image" }),
            React.createElement("div", { className: "e-actions" },
                React.createElement(Animate_1.Animate, { animate: this.state.animated, baseClass: "b-dice clearfix", animateActive: "m-animate", animateDone: "m-animate-done" },
                    React.createElement(SingleDice_1.SingleDice, { type: this.state.rolledDice[0], side: this.state.rolledSide[0], key: 0 }),
                    React.createElement(SingleDice_1.SingleDice, { type: this.state.rolledDice[1], side: this.state.rolledSide[1], key: 1 }),
                    React.createElement(SingleDice_1.SingleDice, { type: this.state.rolledDice[2], side: this.state.rolledSide[2], key: 2 })),
                React.createElement(Actions_1.Actions, { gameState: this.state.gameOver, onRollClick: function (e) { return _this.handleDiceRoll(e); } }))));
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
var Animate = (function (_super) {
    __extends(Animate, _super);
    function Animate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Animate.prototype.render = function () {
        var classNames = "";
        var modifierClassNames = "";
        classNames += this.props.baseClass || "";
        if (this.props.animate && this.props.animateActive != undefined) {
            modifierClassNames += this.props.animateActive || "";
        }
        else {
            modifierClassNames += this.props.animateDone || "";
        }
        classNames += " " + modifierClassNames;
        return (React.createElement("div", { className: classNames }, this.props.children));
    };
    return Animate;
}(React.Component));
exports.Animate = Animate;


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
var Score = (function (_super) {
    __extends(Score, _super);
    function Score() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Score.prototype.render = function () {
        return (React.createElement("div", { className: "b-score m-score" },
            React.createElement("div", { className: "e-score-count" }, this.props.count),
            React.createElement("div", { className: "e-score-label" }, "Brains")));
    };
    return Score;
}(React.Component));
exports.Score = Score;


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
var Damage = (function (_super) {
    __extends(Damage, _super);
    function Damage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Damage.prototype.render = function () {
        return (React.createElement("div", { className: "b-score m-damage" },
            React.createElement("div", { className: "e-score-count" }, this.props.count),
            React.createElement("div", { className: "e-score-label" }, "Shots")));
    };
    return Damage;
}(React.Component));
exports.Damage = Damage;


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
var Graphics = (function (_super) {
    __extends(Graphics, _super);
    function Graphics() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Graphics.prototype.render = function () {
        var gameOverModifier = "";
        if (this.props.gameOver) {
            gameOverModifier = " m-game-over";
        }
        return (React.createElement("div", { className: this.props.classNames + gameOverModifier },
            React.createElement("div", { className: "e-img-float" },
                React.createElement("img", { src: "./src/images/death-icon.svg", className: "e-img-death", alt: "Paperboy" }),
                React.createElement("img", { src: this.props.imgUrl, className: "e-img-animaiton", alt: "Paperboy" }))));
    };
    return Graphics;
}(React.Component));
exports.Graphics = Graphics;


/***/ }),
/* 8 */
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
        var classNames = "e-dice-fill";
        var typeClass = "";
        var sideClass = "";
        var diceTypeImgUrl;
        switch (this.props.type) {
            case 0:
                typeClass += " m-green";
                break;
            case 1:
                typeClass += " m-yellow";
                break;
            case 2:
                typeClass += " m-red";
                break;
            default:
                typeClass;
                break;
        }
        switch (this.props.side) {
            case 0:
                sideClass += " m-brain";
                diceTypeImgUrl = "./src/images/brain-icon.svg";
                break;
            case 1:
                sideClass += " m-run";
                diceTypeImgUrl = "./src/images/run-icon.svg";
                break;
            case 2:
                sideClass += " m-shot";
                diceTypeImgUrl = "./src/images/shot-icon.svg";
                break;
            default:
                typeClass;
                diceTypeImgUrl = "./src/images/blank-icon.svg";
                break;
        }
        classNames += typeClass;
        classNames += sideClass;
        return (React.createElement("div", { className: "e-single-dice" },
            React.createElement("div", { className: classNames },
                React.createElement("img", { src: diceTypeImgUrl }))));
    };
    return SingleDice;
}(React.Component));
exports.SingleDice = SingleDice;


/***/ }),
/* 9 */
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
    Actions.prototype.handleRestart = function (e) {
        window.location.reload(true);
    };
    Actions.prototype.render = function () {
        var _this = this;
        if (!this.props.gameState) {
            return (React.createElement("button", { onClick: function (e) { return _this.props.onRollClick(e); }, className: "b-button m-blue" }, "Roll"));
        }
        else {
            return (React.createElement("button", { className: "b-button m-red", onClick: function (e) { return _this.handleRestart(e); } }, "Restart"));
        }
    };
    return Actions;
}(React.Component));
exports.Actions = Actions;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map