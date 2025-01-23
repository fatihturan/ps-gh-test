webpackHotUpdate("main",{

/***/ "./static/popups/create/CreateWinsorize.jsx":
/*!**************************************************!*\
  !*** ./static/popups/create/CreateWinsorize.jsx ***!
  \**************************************************/
/*! exports provided: CreateWinsorize, validateWinsorizeCfg, buildCode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateWinsorize", function() { return CreateWinsorize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateWinsorizeCfg", function() { return validateWinsorizeCfg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildCode", function() { return buildCode; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-slider */ "./node_modules/react-slider/es/components/ReactSlider/ReactSlider.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _ColumnSelect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ColumnSelect */ "./static/popups/create/ColumnSelect.jsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  top: 0;\n  bottom: 0;\n  background: ", ";\n  border-radius: 999px;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  height: 25px;\n  line-height: 25px;\n  width: 25px;\n  text-align: center;\n  background-color: #000;\n  color: #fff;\n  border-radius: 50%;\n  cursor: grab;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 25px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }








__webpack_require__(/*! ./CreateWinsorize.css */ "./static/popups/create/CreateWinsorize.css");

var StyledSlider = Object(styled_components__WEBPACK_IMPORTED_MODULE_4__["default"])(react_slider__WEBPACK_IMPORTED_MODULE_3__["default"])(_templateObject());
var StyledThumb = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div(_templateObject2());

var Thumb = function Thumb(props, state) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(StyledThumb, props, state.valueNow);
};

var StyledTrack = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div(_templateObject3(), function (props) {
  return props.index === 1 ? "#274970" : "#ddd";
});

var Track = function Track(props, state) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(StyledTrack, _extends({}, props, {
    index: state.index
  }));
};

function validateWinsorizeCfg(_ref) {
  var col = _ref.col;

  if (!col) {
    return "Please select a column to winsorize!";
  }

  return null;
}

function buildCode(_ref2) {
  var col = _ref2.col,
      group = _ref2.group,
      limits = _ref2.limits,
      inclusive = _ref2.inclusive;

  if (!col) {
    return null;
  }

  var winsorizeParams = ["limits=[".concat(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.join(limits, ", "), "]")];

  if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.some(inclusive)) {
    winsorizeParams.push("inclusive=[".concat(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.join(inclusive, ", "), "]"));
  }

  winsorizeParams = ", ".concat(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.join(winsorizeParams, ", "));
  var code = ["from scipy.stats import mstats\n"];

  if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.size(group)) {
    code.push("def winsorize_series(group):");
    code.push("\treturn mstats.winsorize(group".concat(winsorizeParams, ")\n"));
    code.push("df.groupby(['".concat(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.join(group, "', '"), "'])['").concat(col, "'].transform(winsorize_series)\n"));
  } else {
    code.push("mstats.winsorize(df['".concat(col, "']").concat(winsorizeParams, ")"));
  }

  return code;
}

var CreateWinsorize = /*#__PURE__*/function (_React$Component) {
  _inherits(CreateWinsorize, _React$Component);

  var _super = _createSuper(CreateWinsorize);

  function CreateWinsorize(props) {
    var _this;

    _classCallCheck(this, CreateWinsorize);

    _this = _super.call(this, props);
    _this.state = {
      group: null,
      col: null,
      limits: [10, 90],
      includeLower: true,
      includeUpper: true
    };
    _this.updateState = _this.updateState.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CreateWinsorize, [{
    key: "updateState",
    value: function updateState(state) {
      var _this2 = this;

      var currState = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.assignIn(this.state, state);

      var updatedState = {
        cfg: {
          col: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(currState, "col.value") || null,
          group: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(currState.group, "value") || null,
          limits: [lodash__WEBPACK_IMPORTED_MODULE_0___default.a.round(currState.limits[0] / 100.0, 2), lodash__WEBPACK_IMPORTED_MODULE_0___default.a.round(1.0 - currState.limits[1] / 100.0, 2)],
          inclusive: [currState.includeLower, currState.includeUpper]
        }
      };
      updatedState.code = buildCode(updatedState.cfg);

      if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(state, "col") && !this.props.namePopulated) {
        updatedState.name = "".concat(updatedState.cfg.col, "_winsorize");
      }

      this.setState(currState, function () {
        return _this2.props.updateState(updatedState);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ColumnSelect__WEBPACK_IMPORTED_MODULE_5__["default"], {
        label: "Col",
        prop: "col",
        otherProps: ["group"],
        parent: this.state,
        updateState: this.updateState,
        columns: this.props.columns,
        dtypes: ["int", "float"]
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ColumnSelect__WEBPACK_IMPORTED_MODULE_5__["default"], {
        label: "Group By",
        prop: "group",
        otherProps: ["col"],
        parent: this.state,
        updateState: this.updateState,
        columns: this.props.columns,
        isMulti: true
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "form-group row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("label", {
        className: "col-md-3 col-form-label text-right"
      }, "Limits"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "col-md-8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "input-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("input", {
        type: "text",
        className: "form-control mr-3 slider-input",
        value: this.state.limits[0],
        onChange: function onChange(e) {
          return _this3.updateState({
            limits: [parseInt(e.target.value), _this3.state.limits[1]]
          });
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(StyledSlider, {
        defaultValue: this.state.limits,
        renderTrack: Track,
        renderThumb: Thumb,
        value: this.state.limits,
        onAfterChange: function onAfterChange(limits) {
          return _this3.updateState({
            limits: limits
          });
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("input", {
        type: "text",
        className: "form-control ml-3 slider-input",
        value: this.state.limits[1],
        onChange: function onChange(e) {
          return _this3.updateState({
            limits: [_this3.state.limits[0], parseInt(e.target.value)]
          });
        }
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "form-group row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("label", {
        className: "col-md-3 col-form-label text-right"
      }, "Include Limits"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "col-md-8 mt-auto mb-auto"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, "Lower:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", {
        className: "ico-check-box".concat(this.state.includeLower ? "" : "-outline-blank", " pointer pl-3 pr-5"),
        onClick: function onClick() {
          return _this3.updateState({
            includeLower: !_this3.state.includeLower
          });
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, "Upper:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", {
        className: "ico-check-box".concat(this.state.includeUpper ? "" : "-outline-blank", " pointer pl-3"),
        onClick: function onClick() {
          return _this3.updateState({
            includeUpper: !_this3.state.includeUpper
          });
        }
      }))));
    }
  }]);

  return CreateWinsorize;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

CreateWinsorize.displayName = "CreateWinsorize";
CreateWinsorize.propTypes = {
  updateState: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  columns: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  namePopulated: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
};


/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdGF0aWMvcG9wdXBzL2NyZWF0ZS9DcmVhdGVXaW5zb3JpemUuanN4Il0sIm5hbWVzIjpbInJlcXVpcmUiLCJTdHlsZWRTbGlkZXIiLCJzdHlsZWQiLCJSZWFjdFNsaWRlciIsIlN0eWxlZFRodW1iIiwiZGl2IiwiVGh1bWIiLCJwcm9wcyIsInN0YXRlIiwidmFsdWVOb3ciLCJTdHlsZWRUcmFjayIsImluZGV4IiwiVHJhY2siLCJ2YWxpZGF0ZVdpbnNvcml6ZUNmZyIsImNvbCIsImJ1aWxkQ29kZSIsImdyb3VwIiwibGltaXRzIiwiaW5jbHVzaXZlIiwid2luc29yaXplUGFyYW1zIiwiXyIsImpvaW4iLCJzb21lIiwicHVzaCIsImNvZGUiLCJzaXplIiwiQ3JlYXRlV2luc29yaXplIiwiaW5jbHVkZUxvd2VyIiwiaW5jbHVkZVVwcGVyIiwidXBkYXRlU3RhdGUiLCJiaW5kIiwiY3VyclN0YXRlIiwiYXNzaWduSW4iLCJ1cGRhdGVkU3RhdGUiLCJjZmciLCJnZXQiLCJtYXAiLCJyb3VuZCIsIm5hbWVQb3B1bGF0ZWQiLCJuYW1lIiwic2V0U3RhdGUiLCJjb2x1bW5zIiwiZSIsInBhcnNlSW50IiwidGFyZ2V0IiwidmFsdWUiLCJSZWFjdCIsIkNvbXBvbmVudCIsImRpc3BsYXlOYW1lIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiZnVuYyIsImFycmF5IiwiYm9vbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQUEsbUJBQU8sQ0FBQyx5RUFBRCxDQUFQOztBQUVBLElBQU1DLFlBQVksR0FBR0MsaUVBQU0sQ0FBQ0Msb0RBQUQsQ0FBVCxtQkFBbEI7QUFLQSxJQUFNQyxXQUFXLEdBQUdGLHlEQUFNLENBQUNHLEdBQVYsb0JBQWpCOztBQVdBLElBQU1DLEtBQUssR0FBRyxTQUFSQSxLQUFRLENBQUNDLEtBQUQsRUFBUUMsS0FBUjtBQUFBLHNCQUFrQiwyREFBQyxXQUFELEVBQWlCRCxLQUFqQixFQUF5QkMsS0FBSyxDQUFDQyxRQUEvQixDQUFsQjtBQUFBLENBQWQ7O0FBRUEsSUFBTUMsV0FBVyxHQUFHUix5REFBTSxDQUFDRyxHQUFWLHFCQUdELFVBQUFFLEtBQUs7QUFBQSxTQUFLQSxLQUFLLENBQUNJLEtBQU4sS0FBZ0IsQ0FBaEIsR0FBb0IsU0FBcEIsR0FBZ0MsTUFBckM7QUFBQSxDQUhKLENBQWpCOztBQU9BLElBQU1DLEtBQUssR0FBRyxTQUFSQSxLQUFRLENBQUNMLEtBQUQsRUFBUUMsS0FBUjtBQUFBLHNCQUFrQiwyREFBQyxXQUFELGVBQWlCRCxLQUFqQjtBQUF3QixTQUFLLEVBQUVDLEtBQUssQ0FBQ0c7QUFBckMsS0FBbEI7QUFBQSxDQUFkOztBQUVBLFNBQVNFLG9CQUFULE9BQXVDO0FBQUEsTUFBUEMsR0FBTyxRQUFQQSxHQUFPOztBQUNyQyxNQUFJLENBQUNBLEdBQUwsRUFBVTtBQUNSLFdBQU8sc0NBQVA7QUFDRDs7QUFDRCxTQUFPLElBQVA7QUFDRDs7QUFFRCxTQUFTQyxTQUFULFFBQXNEO0FBQUEsTUFBakNELEdBQWlDLFNBQWpDQSxHQUFpQztBQUFBLE1BQTVCRSxLQUE0QixTQUE1QkEsS0FBNEI7QUFBQSxNQUFyQkMsTUFBcUIsU0FBckJBLE1BQXFCO0FBQUEsTUFBYkMsU0FBYSxTQUFiQSxTQUFhOztBQUNwRCxNQUFJLENBQUNKLEdBQUwsRUFBVTtBQUNSLFdBQU8sSUFBUDtBQUNEOztBQUNELE1BQUlLLGVBQWUsR0FBRyxtQkFBWUMsNkNBQUMsQ0FBQ0MsSUFBRixDQUFPSixNQUFQLEVBQWUsSUFBZixDQUFaLE9BQXRCOztBQUNBLE1BQUlHLDZDQUFDLENBQUNFLElBQUYsQ0FBT0osU0FBUCxDQUFKLEVBQXVCO0FBQ3JCQyxtQkFBZSxDQUFDSSxJQUFoQixzQkFBbUNILDZDQUFDLENBQUNDLElBQUYsQ0FBT0gsU0FBUCxFQUFrQixJQUFsQixDQUFuQztBQUNEOztBQUNEQyxpQkFBZSxlQUFRQyw2Q0FBQyxDQUFDQyxJQUFGLENBQU9GLGVBQVAsRUFBd0IsSUFBeEIsQ0FBUixDQUFmO0FBQ0EsTUFBTUssSUFBSSxHQUFHLENBQUMsa0NBQUQsQ0FBYjs7QUFDQSxNQUFJSiw2Q0FBQyxDQUFDSyxJQUFGLENBQU9ULEtBQVAsQ0FBSixFQUFtQjtBQUNqQlEsUUFBSSxDQUFDRCxJQUFMLENBQVUsOEJBQVY7QUFDQUMsUUFBSSxDQUFDRCxJQUFMLDBDQUE0Q0osZUFBNUM7QUFDQUssUUFBSSxDQUFDRCxJQUFMLHdCQUEwQkgsNkNBQUMsQ0FBQ0MsSUFBRixDQUFPTCxLQUFQLEVBQWMsTUFBZCxDQUExQixrQkFBdURGLEdBQXZEO0FBQ0QsR0FKRCxNQUlPO0FBQ0xVLFFBQUksQ0FBQ0QsSUFBTCxnQ0FBa0NULEdBQWxDLGVBQTBDSyxlQUExQztBQUNEOztBQUNELFNBQU9LLElBQVA7QUFDRDs7SUFFS0UsZTs7Ozs7QUFDSiwyQkFBWW5CLEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7QUFDakIsOEJBQU1BLEtBQU47QUFDQSxVQUFLQyxLQUFMLEdBQWE7QUFDWFEsV0FBSyxFQUFFLElBREk7QUFFWEYsU0FBRyxFQUFFLElBRk07QUFHWEcsWUFBTSxFQUFFLENBQUMsRUFBRCxFQUFLLEVBQUwsQ0FIRztBQUlYVSxrQkFBWSxFQUFFLElBSkg7QUFLWEMsa0JBQVksRUFBRTtBQUxILEtBQWI7QUFPQSxVQUFLQyxXQUFMLEdBQW1CLE1BQUtBLFdBQUwsQ0FBaUJDLElBQWpCLCtCQUFuQjtBQVRpQjtBQVVsQjs7OztnQ0FFV3RCLEssRUFBTztBQUFBOztBQUNqQixVQUFNdUIsU0FBUyxHQUFHWCw2Q0FBQyxDQUFDWSxRQUFGLENBQVcsS0FBS3hCLEtBQWhCLEVBQXVCQSxLQUF2QixDQUFsQjs7QUFDQSxVQUFNeUIsWUFBWSxHQUFHO0FBQ25CQyxXQUFHLEVBQUU7QUFDSHBCLGFBQUcsRUFBRU0sNkNBQUMsQ0FBQ2UsR0FBRixDQUFNSixTQUFOLEVBQWlCLFdBQWpCLEtBQWlDLElBRG5DO0FBRUhmLGVBQUssRUFBRUksNkNBQUMsQ0FBQ2dCLEdBQUYsQ0FBTUwsU0FBUyxDQUFDZixLQUFoQixFQUF1QixPQUF2QixLQUFtQyxJQUZ2QztBQUdIQyxnQkFBTSxFQUFFLENBQUNHLDZDQUFDLENBQUNpQixLQUFGLENBQVFOLFNBQVMsQ0FBQ2QsTUFBVixDQUFpQixDQUFqQixJQUFzQixLQUE5QixFQUFxQyxDQUFyQyxDQUFELEVBQTBDRyw2Q0FBQyxDQUFDaUIsS0FBRixDQUFRLE1BQU1OLFNBQVMsQ0FBQ2QsTUFBVixDQUFpQixDQUFqQixJQUFzQixLQUFwQyxFQUEyQyxDQUEzQyxDQUExQyxDQUhMO0FBSUhDLG1CQUFTLEVBQUUsQ0FBQ2EsU0FBUyxDQUFDSixZQUFYLEVBQXlCSSxTQUFTLENBQUNILFlBQW5DO0FBSlI7QUFEYyxPQUFyQjtBQVFBSyxrQkFBWSxDQUFDVCxJQUFiLEdBQW9CVCxTQUFTLENBQUNrQixZQUFZLENBQUNDLEdBQWQsQ0FBN0I7O0FBQ0EsVUFBSWQsNkNBQUMsQ0FBQ2UsR0FBRixDQUFNM0IsS0FBTixFQUFhLEtBQWIsS0FBdUIsQ0FBQyxLQUFLRCxLQUFMLENBQVcrQixhQUF2QyxFQUFzRDtBQUNwREwsb0JBQVksQ0FBQ00sSUFBYixhQUF1Qk4sWUFBWSxDQUFDQyxHQUFiLENBQWlCcEIsR0FBeEM7QUFDRDs7QUFDRCxXQUFLMEIsUUFBTCxDQUFjVCxTQUFkLEVBQXlCO0FBQUEsZUFBTSxNQUFJLENBQUN4QixLQUFMLENBQVdzQixXQUFYLENBQXVCSSxZQUF2QixDQUFOO0FBQUEsT0FBekI7QUFDRDs7OzZCQUVRO0FBQUE7O0FBQ1AsMEJBQ0UsMkRBQUMsNENBQUQsQ0FBTyxRQUFQLHFCQUNFLDJEQUFDLHFEQUFEO0FBQ0UsYUFBSyxFQUFDLEtBRFI7QUFFRSxZQUFJLEVBQUMsS0FGUDtBQUdFLGtCQUFVLEVBQUUsQ0FBQyxPQUFELENBSGQ7QUFJRSxjQUFNLEVBQUUsS0FBS3pCLEtBSmY7QUFLRSxtQkFBVyxFQUFFLEtBQUtxQixXQUxwQjtBQU1FLGVBQU8sRUFBRSxLQUFLdEIsS0FBTCxDQUFXa0MsT0FOdEI7QUFPRSxjQUFNLEVBQUUsQ0FBQyxLQUFELEVBQVEsT0FBUjtBQVBWLFFBREYsZUFVRSwyREFBQyxxREFBRDtBQUNFLGFBQUssRUFBQyxVQURSO0FBRUUsWUFBSSxFQUFDLE9BRlA7QUFHRSxrQkFBVSxFQUFFLENBQUMsS0FBRCxDQUhkO0FBSUUsY0FBTSxFQUFFLEtBQUtqQyxLQUpmO0FBS0UsbUJBQVcsRUFBRSxLQUFLcUIsV0FMcEI7QUFNRSxlQUFPLEVBQUUsS0FBS3RCLEtBQUwsQ0FBV2tDLE9BTnRCO0FBT0UsZUFBTztBQVBULFFBVkYsZUFtQkU7QUFBSyxpQkFBUyxFQUFDO0FBQWYsc0JBQ0U7QUFBTyxpQkFBUyxFQUFDO0FBQWpCLGtCQURGLGVBRUU7QUFBSyxpQkFBUyxFQUFDO0FBQWYsc0JBQ0U7QUFBSyxpQkFBUyxFQUFDO0FBQWYsc0JBQ0U7QUFDRSxZQUFJLEVBQUMsTUFEUDtBQUVFLGlCQUFTLEVBQUMsZ0NBRlo7QUFHRSxhQUFLLEVBQUUsS0FBS2pDLEtBQUwsQ0FBV1MsTUFBWCxDQUFrQixDQUFsQixDQUhUO0FBSUUsZ0JBQVEsRUFBRSxrQkFBQXlCLENBQUM7QUFBQSxpQkFDVCxNQUFJLENBQUNiLFdBQUwsQ0FBaUI7QUFDZlosa0JBQU0sRUFBRSxDQUFDMEIsUUFBUSxDQUFDRCxDQUFDLENBQUNFLE1BQUYsQ0FBU0MsS0FBVixDQUFULEVBQTJCLE1BQUksQ0FBQ3JDLEtBQUwsQ0FBV1MsTUFBWCxDQUFrQixDQUFsQixDQUEzQjtBQURPLFdBQWpCLENBRFM7QUFBQTtBQUpiLFFBREYsZUFXRSwyREFBQyxZQUFEO0FBQ0Usb0JBQVksRUFBRSxLQUFLVCxLQUFMLENBQVdTLE1BRDNCO0FBRUUsbUJBQVcsRUFBRUwsS0FGZjtBQUdFLG1CQUFXLEVBQUVOLEtBSGY7QUFJRSxhQUFLLEVBQUUsS0FBS0UsS0FBTCxDQUFXUyxNQUpwQjtBQUtFLHFCQUFhLEVBQUUsdUJBQUFBLE1BQU07QUFBQSxpQkFBSSxNQUFJLENBQUNZLFdBQUwsQ0FBaUI7QUFBRVosa0JBQU0sRUFBTkE7QUFBRixXQUFqQixDQUFKO0FBQUE7QUFMdkIsUUFYRixlQWtCRTtBQUNFLFlBQUksRUFBQyxNQURQO0FBRUUsaUJBQVMsRUFBQyxnQ0FGWjtBQUdFLGFBQUssRUFBRSxLQUFLVCxLQUFMLENBQVdTLE1BQVgsQ0FBa0IsQ0FBbEIsQ0FIVDtBQUlFLGdCQUFRLEVBQUUsa0JBQUF5QixDQUFDO0FBQUEsaUJBQ1QsTUFBSSxDQUFDYixXQUFMLENBQWlCO0FBQ2ZaLGtCQUFNLEVBQUUsQ0FBQyxNQUFJLENBQUNULEtBQUwsQ0FBV1MsTUFBWCxDQUFrQixDQUFsQixDQUFELEVBQXVCMEIsUUFBUSxDQUFDRCxDQUFDLENBQUNFLE1BQUYsQ0FBU0MsS0FBVixDQUEvQjtBQURPLFdBQWpCLENBRFM7QUFBQTtBQUpiLFFBbEJGLENBREYsQ0FGRixDQW5CRixlQXFERTtBQUFLLGlCQUFTLEVBQUM7QUFBZixzQkFDRTtBQUFPLGlCQUFTLEVBQUM7QUFBakIsMEJBREYsZUFFRTtBQUFLLGlCQUFTLEVBQUM7QUFBZixzQkFDRSxrRkFERixlQUVFO0FBQ0UsaUJBQVMseUJBQWtCLEtBQUtyQyxLQUFMLENBQVdtQixZQUFYLEdBQTBCLEVBQTFCLEdBQStCLGdCQUFqRCx1QkFEWDtBQUVFLGVBQU8sRUFBRTtBQUFBLGlCQUFNLE1BQUksQ0FBQ0UsV0FBTCxDQUFpQjtBQUFFRix3QkFBWSxFQUFFLENBQUMsTUFBSSxDQUFDbkIsS0FBTCxDQUFXbUI7QUFBNUIsV0FBakIsQ0FBTjtBQUFBO0FBRlgsUUFGRixlQU1FLGtGQU5GLGVBT0U7QUFDRSxpQkFBUyx5QkFBa0IsS0FBS25CLEtBQUwsQ0FBV29CLFlBQVgsR0FBMEIsRUFBMUIsR0FBK0IsZ0JBQWpELGtCQURYO0FBRUUsZUFBTyxFQUFFO0FBQUEsaUJBQU0sTUFBSSxDQUFDQyxXQUFMLENBQWlCO0FBQUVELHdCQUFZLEVBQUUsQ0FBQyxNQUFJLENBQUNwQixLQUFMLENBQVdvQjtBQUE1QixXQUFqQixDQUFOO0FBQUE7QUFGWCxRQVBGLENBRkYsQ0FyREYsQ0FERjtBQXVFRDs7OztFQXRHMkJrQiw0Q0FBSyxDQUFDQyxTOztBQXdHcENyQixlQUFlLENBQUNzQixXQUFoQixHQUE4QixpQkFBOUI7QUFDQXRCLGVBQWUsQ0FBQ3VCLFNBQWhCLEdBQTRCO0FBQzFCcEIsYUFBVyxFQUFFcUIsaURBQVMsQ0FBQ0MsSUFERztBQUUxQlYsU0FBTyxFQUFFUyxpREFBUyxDQUFDRSxLQUZPO0FBRzFCZCxlQUFhLEVBQUVZLGlEQUFTLENBQUNHO0FBSEMsQ0FBNUIiLCJmaWxlIjoibWFpbi5lMjM3ZWZjMDY4YTBlOWQ5OGUwMi5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFJlYWN0U2xpZGVyIGZyb20gXCJyZWFjdC1zbGlkZXJcIjtcclxuaW1wb3J0IHN0eWxlZCBmcm9tIFwic3R5bGVkLWNvbXBvbmVudHNcIjtcclxuXHJcbmltcG9ydCBDb2x1bW5TZWxlY3QgZnJvbSBcIi4vQ29sdW1uU2VsZWN0XCI7XHJcblxyXG5yZXF1aXJlKFwiLi9DcmVhdGVXaW5zb3JpemUuY3NzXCIpO1xyXG5cclxuY29uc3QgU3R5bGVkU2xpZGVyID0gc3R5bGVkKFJlYWN0U2xpZGVyKWBcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDI1cHg7XHJcbmA7XHJcblxyXG5jb25zdCBTdHlsZWRUaHVtYiA9IHN0eWxlZC5kaXZgXHJcbiAgaGVpZ2h0OiAyNXB4O1xyXG4gIGxpbmUtaGVpZ2h0OiAyNXB4O1xyXG4gIHdpZHRoOiAyNXB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xyXG4gIGNvbG9yOiAjZmZmO1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBjdXJzb3I6IGdyYWI7XHJcbmA7XHJcblxyXG5jb25zdCBUaHVtYiA9IChwcm9wcywgc3RhdGUpID0+IDxTdHlsZWRUaHVtYiB7Li4ucHJvcHN9PntzdGF0ZS52YWx1ZU5vd308L1N0eWxlZFRodW1iPjtcclxuXHJcbmNvbnN0IFN0eWxlZFRyYWNrID0gc3R5bGVkLmRpdmBcclxuICB0b3A6IDA7XHJcbiAgYm90dG9tOiAwO1xyXG4gIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gKHByb3BzLmluZGV4ID09PSAxID8gXCIjMmE5MWQxXCIgOiBcIiNkZGRcIil9O1xyXG4gIGJvcmRlci1yYWRpdXM6IDk5OXB4O1xyXG5gO1xyXG5cclxuY29uc3QgVHJhY2sgPSAocHJvcHMsIHN0YXRlKSA9PiA8U3R5bGVkVHJhY2sgey4uLnByb3BzfSBpbmRleD17c3RhdGUuaW5kZXh9IC8+O1xyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVXaW5zb3JpemVDZmcoeyBjb2wgfSkge1xyXG4gIGlmICghY29sKSB7XHJcbiAgICByZXR1cm4gXCJQbGVhc2Ugc2VsZWN0IGEgY29sdW1uIHRvIHdpbnNvcml6ZSFcIjtcclxuICB9XHJcbiAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJ1aWxkQ29kZSh7IGNvbCwgZ3JvdXAsIGxpbWl0cywgaW5jbHVzaXZlIH0pIHtcclxuICBpZiAoIWNvbCkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG4gIGxldCB3aW5zb3JpemVQYXJhbXMgPSBbYGxpbWl0cz1bJHtfLmpvaW4obGltaXRzLCBcIiwgXCIpfV1gXTtcclxuICBpZiAoXy5zb21lKGluY2x1c2l2ZSkpIHtcclxuICAgIHdpbnNvcml6ZVBhcmFtcy5wdXNoKGBpbmNsdXNpdmU9WyR7Xy5qb2luKGluY2x1c2l2ZSwgXCIsIFwiKX1dYCk7XHJcbiAgfVxyXG4gIHdpbnNvcml6ZVBhcmFtcyA9IGAsICR7Xy5qb2luKHdpbnNvcml6ZVBhcmFtcywgXCIsIFwiKX1gO1xyXG4gIGNvbnN0IGNvZGUgPSBbXCJmcm9tIHNjaXB5LnN0YXRzIGltcG9ydCBtc3RhdHNcXG5cIl07XHJcbiAgaWYgKF8uc2l6ZShncm91cCkpIHtcclxuICAgIGNvZGUucHVzaChcImRlZiB3aW5zb3JpemVfc2VyaWVzKGdyb3VwKTpcIik7XHJcbiAgICBjb2RlLnB1c2goYFxcdHJldHVybiBtc3RhdHMud2luc29yaXplKGdyb3VwJHt3aW5zb3JpemVQYXJhbXN9KVxcbmApO1xyXG4gICAgY29kZS5wdXNoKGBkZi5ncm91cGJ5KFsnJHtfLmpvaW4oZ3JvdXAsIFwiJywgJ1wiKX0nXSlbJyR7Y29sfSddLnRyYW5zZm9ybSh3aW5zb3JpemVfc2VyaWVzKVxcbmApO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb2RlLnB1c2goYG1zdGF0cy53aW5zb3JpemUoZGZbJyR7Y29sfSddJHt3aW5zb3JpemVQYXJhbXN9KWApO1xyXG4gIH1cclxuICByZXR1cm4gY29kZTtcclxufVxyXG5cclxuY2xhc3MgQ3JlYXRlV2luc29yaXplIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgZ3JvdXA6IG51bGwsXHJcbiAgICAgIGNvbDogbnVsbCxcclxuICAgICAgbGltaXRzOiBbMTAsIDkwXSxcclxuICAgICAgaW5jbHVkZUxvd2VyOiB0cnVlLFxyXG4gICAgICBpbmNsdWRlVXBwZXI6IHRydWUsXHJcbiAgICB9O1xyXG4gICAgdGhpcy51cGRhdGVTdGF0ZSA9IHRoaXMudXBkYXRlU3RhdGUuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVN0YXRlKHN0YXRlKSB7XHJcbiAgICBjb25zdCBjdXJyU3RhdGUgPSBfLmFzc2lnbkluKHRoaXMuc3RhdGUsIHN0YXRlKTtcclxuICAgIGNvbnN0IHVwZGF0ZWRTdGF0ZSA9IHtcclxuICAgICAgY2ZnOiB7XHJcbiAgICAgICAgY29sOiBfLmdldChjdXJyU3RhdGUsIFwiY29sLnZhbHVlXCIpIHx8IG51bGwsXHJcbiAgICAgICAgZ3JvdXA6IF8ubWFwKGN1cnJTdGF0ZS5ncm91cCwgXCJ2YWx1ZVwiKSB8fCBudWxsLFxyXG4gICAgICAgIGxpbWl0czogW18ucm91bmQoY3VyclN0YXRlLmxpbWl0c1swXSAvIDEwMC4wLCAyKSwgXy5yb3VuZCgxLjAgLSBjdXJyU3RhdGUubGltaXRzWzFdIC8gMTAwLjAsIDIpXSxcclxuICAgICAgICBpbmNsdXNpdmU6IFtjdXJyU3RhdGUuaW5jbHVkZUxvd2VyLCBjdXJyU3RhdGUuaW5jbHVkZVVwcGVyXSxcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgICB1cGRhdGVkU3RhdGUuY29kZSA9IGJ1aWxkQ29kZSh1cGRhdGVkU3RhdGUuY2ZnKTtcclxuICAgIGlmIChfLmdldChzdGF0ZSwgXCJjb2xcIikgJiYgIXRoaXMucHJvcHMubmFtZVBvcHVsYXRlZCkge1xyXG4gICAgICB1cGRhdGVkU3RhdGUubmFtZSA9IGAke3VwZGF0ZWRTdGF0ZS5jZmcuY29sfV93aW5zb3JpemVgO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRTdGF0ZShjdXJyU3RhdGUsICgpID0+IHRoaXMucHJvcHMudXBkYXRlU3RhdGUodXBkYXRlZFN0YXRlKSk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8UmVhY3QuRnJhZ21lbnQ+XHJcbiAgICAgICAgPENvbHVtblNlbGVjdFxyXG4gICAgICAgICAgbGFiZWw9XCJDb2xcIlxyXG4gICAgICAgICAgcHJvcD1cImNvbFwiXHJcbiAgICAgICAgICBvdGhlclByb3BzPXtbXCJncm91cFwiXX1cclxuICAgICAgICAgIHBhcmVudD17dGhpcy5zdGF0ZX1cclxuICAgICAgICAgIHVwZGF0ZVN0YXRlPXt0aGlzLnVwZGF0ZVN0YXRlfVxyXG4gICAgICAgICAgY29sdW1ucz17dGhpcy5wcm9wcy5jb2x1bW5zfVxyXG4gICAgICAgICAgZHR5cGVzPXtbXCJpbnRcIiwgXCJmbG9hdFwiXX1cclxuICAgICAgICAvPlxyXG4gICAgICAgIDxDb2x1bW5TZWxlY3RcclxuICAgICAgICAgIGxhYmVsPVwiR3JvdXAgQnlcIlxyXG4gICAgICAgICAgcHJvcD1cImdyb3VwXCJcclxuICAgICAgICAgIG90aGVyUHJvcHM9e1tcImNvbFwiXX1cclxuICAgICAgICAgIHBhcmVudD17dGhpcy5zdGF0ZX1cclxuICAgICAgICAgIHVwZGF0ZVN0YXRlPXt0aGlzLnVwZGF0ZVN0YXRlfVxyXG4gICAgICAgICAgY29sdW1ucz17dGhpcy5wcm9wcy5jb2x1bW5zfVxyXG4gICAgICAgICAgaXNNdWx0aVxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIHJvd1wiPlxyXG4gICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImNvbC1tZC0zIGNvbC1mb3JtLWxhYmVsIHRleHQtcmlnaHRcIj5MaW1pdHM8L2xhYmVsPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtOFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgbXItMyBzbGlkZXItaW5wdXRcIlxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUubGltaXRzWzBdfVxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT5cclxuICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbGltaXRzOiBbcGFyc2VJbnQoZS50YXJnZXQudmFsdWUpLCB0aGlzLnN0YXRlLmxpbWl0c1sxXV0sXHJcbiAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8U3R5bGVkU2xpZGVyXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e3RoaXMuc3RhdGUubGltaXRzfVxyXG4gICAgICAgICAgICAgICAgcmVuZGVyVHJhY2s9e1RyYWNrfVxyXG4gICAgICAgICAgICAgICAgcmVuZGVyVGh1bWI9e1RodW1ifVxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUubGltaXRzfVxyXG4gICAgICAgICAgICAgICAgb25BZnRlckNoYW5nZT17bGltaXRzID0+IHRoaXMudXBkYXRlU3RhdGUoeyBsaW1pdHMgfSl9XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCBtbC0zIHNsaWRlci1pbnB1dFwiXHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5saW1pdHNbMV19XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PlxyXG4gICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBsaW1pdHM6IFt0aGlzLnN0YXRlLmxpbWl0c1swXSwgcGFyc2VJbnQoZS50YXJnZXQudmFsdWUpXSxcclxuICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCByb3dcIj5cclxuICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJjb2wtbWQtMyBjb2wtZm9ybS1sYWJlbCB0ZXh0LXJpZ2h0XCI+SW5jbHVkZSBMaW1pdHM8L2xhYmVsPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtOCBtdC1hdXRvIG1iLWF1dG9cIj5cclxuICAgICAgICAgICAgPHNwYW4+TG93ZXI6PC9zcGFuPlxyXG4gICAgICAgICAgICA8aVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGljby1jaGVjay1ib3gke3RoaXMuc3RhdGUuaW5jbHVkZUxvd2VyID8gXCJcIiA6IFwiLW91dGxpbmUtYmxhbmtcIn0gcG9pbnRlciBwbC0zIHByLTVgfVxyXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMudXBkYXRlU3RhdGUoeyBpbmNsdWRlTG93ZXI6ICF0aGlzLnN0YXRlLmluY2x1ZGVMb3dlciB9KX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPHNwYW4+VXBwZXI6PC9zcGFuPlxyXG4gICAgICAgICAgICA8aVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGljby1jaGVjay1ib3gke3RoaXMuc3RhdGUuaW5jbHVkZVVwcGVyID8gXCJcIiA6IFwiLW91dGxpbmUtYmxhbmtcIn0gcG9pbnRlciBwbC0zYH1cclxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLnVwZGF0ZVN0YXRlKHsgaW5jbHVkZVVwcGVyOiAhdGhpcy5zdGF0ZS5pbmNsdWRlVXBwZXIgfSl9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9SZWFjdC5GcmFnbWVudD5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbkNyZWF0ZVdpbnNvcml6ZS5kaXNwbGF5TmFtZSA9IFwiQ3JlYXRlV2luc29yaXplXCI7XHJcbkNyZWF0ZVdpbnNvcml6ZS5wcm9wVHlwZXMgPSB7XHJcbiAgdXBkYXRlU3RhdGU6IFByb3BUeXBlcy5mdW5jLFxyXG4gIGNvbHVtbnM6IFByb3BUeXBlcy5hcnJheSxcclxuICBuYW1lUG9wdWxhdGVkOiBQcm9wVHlwZXMuYm9vbCxcclxufTtcclxuXHJcbmV4cG9ydCB7IENyZWF0ZVdpbnNvcml6ZSwgdmFsaWRhdGVXaW5zb3JpemVDZmcsIGJ1aWxkQ29kZSB9O1xyXG4iXSwic291cmNlUm9vdCI6IiJ9