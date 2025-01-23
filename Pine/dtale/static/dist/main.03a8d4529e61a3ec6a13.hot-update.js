webpackHotUpdate("main",{

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./static/filters/ColumnFilter.css":
/*!*************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-1!./node_modules/postcss-loader/src??ref--6-2!./static/filters/ColumnFilter.css ***!
  \*************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".column-filter .Select {\r\n  min-width: 11em;\r\n  max-width: 11em;\r\n}\r\n.column-filter .Select__control {\r\n  height: auto;\r\n}\r\n.column-filter .Select__value-container {\r\n  overflow: visible;\r\n  display: block;\r\n  padding: 0;\r\n}\r\n.column-filter .Select__indicator {\r\n  padding: 0 5px 0 0;\r\n}\r\n.column-filter .Select__control--is-disabled {\r\n  background-color: rgba(128, 128, 128, 0.3);\r\n}\r\n.column-filter span.bp3-popover-wrapper,\r\n.column-filter div.bp3-input-group {\r\n  width: 5.7em;\r\n  padding: 0;\r\n}\r\n\r\n.column-filter input.bp3-input {\r\n  height: 20px;\r\n  line-height: 20px;\r\n  font-size: 12px;\r\n}\r\n\r\n.column-filter .bp3-icon-double-caret-vertical {\r\n  margin-top: -5px;\r\n}\r\n", "",{"version":3,"sources":["ColumnFilter.css"],"names":[],"mappings":"AAAA;EACE,eAAe;EACf,eAAe;AACjB;AACA;EACE,YAAY;AACd;AACA;EACE,iBAAiB;EACjB,cAAc;EACd,UAAU;AACZ;AACA;EACE,kBAAkB;AACpB;AACA;EACE,0CAA0C;AAC5C;AACA;;EAEE,YAAY;EACZ,UAAU;AACZ;;AAEA;EACE,YAAY;EACZ,iBAAiB;EACjB,eAAe;AACjB;;AAEA;EACE,gBAAgB;AAClB","file":"ColumnFilter.css","sourcesContent":[".column-filter .Select {\r\n  min-width: 11em;\r\n  max-width: 11em;\r\n}\r\n.column-filter .Select__control {\r\n  height: auto;\r\n}\r\n.column-filter .Select__value-container {\r\n  overflow: visible;\r\n  display: block;\r\n  padding: 0;\r\n}\r\n.column-filter .Select__indicator {\r\n  padding: 0 5px 0 0;\r\n}\r\n.column-filter .Select__control--is-disabled {\r\n  background-color: rgba(128, 128, 128, 0.3);\r\n}\r\n.column-filter span.bp3-popover-wrapper,\r\n.column-filter div.bp3-input-group {\r\n  width: 5.7em;\r\n  padding: 0;\r\n}\r\n\r\n.column-filter input.bp3-input {\r\n  height: 20px;\r\n  line-height: 20px;\r\n  font-size: 12px;\r\n}\r\n\r\n.column-filter .bp3-icon-double-caret-vertical {\r\n  margin-top: -5px;\r\n}\r\n"]}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/react-select/async/dist/react-select.browser.esm.js":
/*!**************************************************************************!*\
  !*** ./node_modules/react-select/async/dist/react-select.browser.esm.js ***!
  \**************************************************************************/
/*! exports provided: default, defaultProps, makeAsyncSelect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultProps", function() { return defaultProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeAsyncSelect", function() { return makeAsyncSelect; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var memoize_one__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! memoize-one */ "./node_modules/memoize-one/dist/memoize-one.esm.js");
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/core */ "./node_modules/@emotion/core/dist/core.browser.esm.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _dist_utils_06b0d5a4_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../dist/utils-06b0d5a4.browser.esm.js */ "./node_modules/react-select/dist/utils-06b0d5a4.browser.esm.js");
/* harmony import */ var _dist_index_4322c0ed_browser_esm_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../dist/index-4322c0ed.browser.esm.js */ "./node_modules/react-select/dist/index-4322c0ed.browser.esm.js");
/* harmony import */ var _dist_Select_9fdb8cd0_browser_esm_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../dist/Select-9fdb8cd0.browser.esm.js */ "./node_modules/react-select/dist/Select-9fdb8cd0.browser.esm.js");
/* harmony import */ var _emotion_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @emotion/css */ "./node_modules/@emotion/css/dist/css.browser.esm.js");
/* harmony import */ var react_input_autosize__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-input-autosize */ "./node_modules/react-input-autosize/lib/AutosizeInput.js");
/* harmony import */ var react_input_autosize__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_input_autosize__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _dist_stateManager_04f734a2_browser_esm_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../dist/stateManager-04f734a2.browser.esm.js */ "./node_modules/react-select/dist/stateManager-04f734a2.browser.esm.js");












function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var defaultProps = {
  cacheOptions: false,
  defaultOptions: false,
  filterOption: null,
  isLoading: false
};

var makeAsyncSelect = function makeAsyncSelect(SelectComponent) {
  var _class, _temp;

  return _temp = _class = /*#__PURE__*/function (_Component) {
    _inheritsLoose(Async, _Component);

    function Async(props) {
      var _this;

      _this = _Component.call(this) || this;
      _this.select = void 0;
      _this.lastRequest = void 0;
      _this.mounted = false;
      _this.optionsCache = {};

      _this.handleInputChange = function (newValue, actionMeta) {
        var _this$props = _this.props,
            cacheOptions = _this$props.cacheOptions,
            onInputChange = _this$props.onInputChange; // TODO

        var inputValue = Object(_dist_utils_06b0d5a4_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__["k"])(newValue, actionMeta, onInputChange);

        if (!inputValue) {
          delete _this.lastRequest;

          _this.setState({
            inputValue: '',
            loadedInputValue: '',
            loadedOptions: [],
            isLoading: false,
            passEmptyOptions: false
          });

          return;
        }

        if (cacheOptions && _this.optionsCache[inputValue]) {
          _this.setState({
            inputValue: inputValue,
            loadedInputValue: inputValue,
            loadedOptions: _this.optionsCache[inputValue],
            isLoading: false,
            passEmptyOptions: false
          });
        } else {
          var request = _this.lastRequest = {};

          _this.setState({
            inputValue: inputValue,
            isLoading: true,
            passEmptyOptions: !_this.state.loadedInputValue
          }, function () {
            _this.loadOptions(inputValue, function (options) {
              if (!_this.mounted) return;

              if (options) {
                _this.optionsCache[inputValue] = options;
              }

              if (request !== _this.lastRequest) return;
              delete _this.lastRequest;

              _this.setState({
                isLoading: false,
                loadedInputValue: inputValue,
                loadedOptions: options || [],
                passEmptyOptions: false
              });
            });
          });
        }

        return inputValue;
      };

      _this.state = {
        defaultOptions: Array.isArray(props.defaultOptions) ? props.defaultOptions : undefined,
        inputValue: typeof props.inputValue !== 'undefined' ? props.inputValue : '',
        isLoading: props.defaultOptions === true,
        loadedOptions: [],
        passEmptyOptions: false
      };
      return _this;
    }

    var _proto = Async.prototype;

    _proto.componentDidMount = function componentDidMount() {
      var _this2 = this;

      this.mounted = true;
      var defaultOptions = this.props.defaultOptions;
      var inputValue = this.state.inputValue;

      if (defaultOptions === true) {
        this.loadOptions(inputValue, function (options) {
          if (!_this2.mounted) return;
          var isLoading = !!_this2.lastRequest;

          _this2.setState({
            defaultOptions: options || [],
            isLoading: isLoading
          });
        });
      }
    };

    _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
      // if the cacheOptions prop changes, clear the cache
      if (nextProps.cacheOptions !== this.props.cacheOptions) {
        this.optionsCache = {};
      }

      if (nextProps.defaultOptions !== this.props.defaultOptions) {
        this.setState({
          defaultOptions: Array.isArray(nextProps.defaultOptions) ? nextProps.defaultOptions : undefined
        });
      }
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      this.mounted = false;
    };

    _proto.focus = function focus() {
      this.select.focus();
    };

    _proto.blur = function blur() {
      this.select.blur();
    };

    _proto.loadOptions = function loadOptions(inputValue, callback) {
      var loadOptions = this.props.loadOptions;
      if (!loadOptions) return callback();
      var loader = loadOptions(inputValue, callback);

      if (loader && typeof loader.then === 'function') {
        loader.then(callback, function () {
          return callback();
        });
      }
    };

    _proto.render = function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          loadOptions = _this$props2.loadOptions,
          isLoadingProp = _this$props2.isLoading,
          props = _objectWithoutPropertiesLoose(_this$props2, ["loadOptions", "isLoading"]);

      var _this$state = this.state,
          defaultOptions = _this$state.defaultOptions,
          inputValue = _this$state.inputValue,
          isLoading = _this$state.isLoading,
          loadedInputValue = _this$state.loadedInputValue,
          loadedOptions = _this$state.loadedOptions,
          passEmptyOptions = _this$state.passEmptyOptions;
      var options = passEmptyOptions ? [] : inputValue && loadedInputValue ? loadedOptions : defaultOptions || [];
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SelectComponent, _extends({}, props, {
        ref: function ref(_ref) {
          _this3.select = _ref;
        },
        options: options,
        isLoading: isLoading || isLoadingProp,
        onInputChange: this.handleInputChange
      }));
    };

    return Async;
  }(react__WEBPACK_IMPORTED_MODULE_0__["Component"]), _class.defaultProps = defaultProps, _temp;
};

var SelectState = Object(_dist_stateManager_04f734a2_browser_esm_js__WEBPACK_IMPORTED_MODULE_10__["m"])(_dist_Select_9fdb8cd0_browser_esm_js__WEBPACK_IMPORTED_MODULE_7__["S"]);
var Async = makeAsyncSelect(SelectState);
/* harmony default export */ __webpack_exports__["default"] = (Async);


/***/ }),

/***/ "./static/dtale/column/ColumnMenu.jsx":
/*!********************************************!*\
  !*** ./static/dtale/column/ColumnMenu.jsx ***!
  \********************************************/
/*! exports provided: ColumnMenu, ReactColumnMenu, positionMenu, ignoreMenuClicks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColumnMenu", function() { return ReduxColumnMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactColumnMenu", function() { return ReactColumnMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "positionMenu", function() { return positionMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ignoreMenuClicks", function() { return ignoreMenuClicks; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js?a14b");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_hotkeys__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-hotkeys */ "./node_modules/react-hotkeys/index.es.js");
/* harmony import */ var react_hotkeys__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_hotkeys__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _ConditionalRender__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../ConditionalRender */ "./static/ConditionalRender.jsx");
/* harmony import */ var _actions_charts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../actions/charts */ "./static/actions/charts.js");
/* harmony import */ var _actions_dtale__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../actions/dtale */ "./static/actions/dtale.js");
/* harmony import */ var _actions_url_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../actions/url-utils */ "./static/actions/url-utils.js");
/* harmony import */ var _filters_ColumnFilter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../filters/ColumnFilter */ "./static/filters/ColumnFilter.jsx");
/* harmony import */ var _backgroundUtils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../backgroundUtils */ "./static/dtale/backgroundUtils.jsx");
/* harmony import */ var _gridUtils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../gridUtils */ "./static/dtale/gridUtils.jsx");
/* harmony import */ var _menu_dataViewerMenuUtils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../menu/dataViewerMenuUtils */ "./static/dtale/menu/dataViewerMenuUtils.jsx");
/* harmony import */ var _serverStateManagement__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../serverStateManagement */ "./static/dtale/serverStateManagement.jsx");
/* harmony import */ var _ColumnMenuOption__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./ColumnMenuOption */ "./static/dtale/column/ColumnMenuOption.jsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

















var ROW_HEIGHT = _gridUtils__WEBPACK_IMPORTED_MODULE_12__["exports"].ROW_HEIGHT,
    SORT_PROPS = _gridUtils__WEBPACK_IMPORTED_MODULE_12__["exports"].SORT_PROPS;
var MOVE_COLS = [["step-backward", _serverStateManagement__WEBPACK_IMPORTED_MODULE_14__["default"].moveToFront, "Move Column To Front", {}], ["caret-left", _serverStateManagement__WEBPACK_IMPORTED_MODULE_14__["default"].moveLeft, "Move Column Left", {
  fontSize: "1.2em",
  padding: 0,
  width: "1.3em"
}], ["caret-right", _serverStateManagement__WEBPACK_IMPORTED_MODULE_14__["default"].moveRight, "Move Column Right", {
  fontSize: "1.2em",
  padding: 0,
  width: "1.3em"
}], ["step-forward", _serverStateManagement__WEBPACK_IMPORTED_MODULE_14__["default"].moveToBack, "Move Column To Back", {}]];

function buildCaretClass() {
  var caretPct = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 90;

  var lastCaretStyle = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.get(jquery__WEBPACK_IMPORTED_MODULE_0___default()("head").find("style:last-child"), "0.innerHTML");

  if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.endsWith(lastCaretStyle || "", ".column-toggle__dropdown::after {right: " + caretPct + "%}")) {
    return; // don't continually add styling if its already set
  }

  var finalCaretPct = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isUndefined(caretPct) ? 90 : caretPct;
  var caretStyle = "<style>";
  caretStyle += ".column-toggle__dropdown::before {right: " + finalCaretPct + "%}";
  caretStyle += ".column-toggle__dropdown::after {right: " + finalCaretPct + "%}";
  caretStyle += "</style>";
  jquery__WEBPACK_IMPORTED_MODULE_0___default()("head").append(caretStyle);
}

function positionMenu(selectedToggle, menuDiv) {
  var currLeft = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.get(selectedToggle.offset(), "left", 0);

  var currTop = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.get(selectedToggle.offset(), "top", 0);

  var divWidth = menuDiv.width();
  var css = {};

  if (currLeft + divWidth > window.innerWidth) {
    var finalLeft = currLeft - (currLeft + divWidth + 20 - window.innerWidth);
    css.left = finalLeft;
    var overlapPct = (currLeft - (finalLeft - 20)) / divWidth;
    var caretPct = Math.floor(100 - overlapPct * 100);
    buildCaretClass(caretPct);
  } else {
    css.left = currLeft;
    buildCaretClass();
  }

  css.top = currTop + ROW_HEIGHT - 6;
  menuDiv.css(css);
}

function ignoreMenuClicks(e) {
  var colFilter = jquery__WEBPACK_IMPORTED_MODULE_0___default()("div.column-filter");

  if (colFilter && (colFilter.is(e.target) || colFilter.has(e.target).length > 0)) {
    return true; // ignore filter clicks
  }

  if (colFilter && jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).hasClass("Select__option")) {
    return true; // ignore option selection
  }

  if (colFilter && e.target.nodeName === "svg") {
    return true; // ignore option selection
  }

  return false;
}

var ReactColumnMenu = /*#__PURE__*/function (_React$Component) {
  _inherits(ReactColumnMenu, _React$Component);

  var _super = _createSuper(ReactColumnMenu);

  function ReactColumnMenu(props) {
    var _this;

    _classCallCheck(this, ReactColumnMenu);

    _this = _super.call(this, props);
    _this.updatePosition = _this.updatePosition.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ReactColumnMenu, [{
    key: "updatePosition",
    value: function updatePosition() {
      if (!lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isNull(this.props.selectedCol)) {
        positionMenu(jquery__WEBPACK_IMPORTED_MODULE_0___default()("div.".concat(this.props.selectedToggle)), jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._div));
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.updatePosition();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          columnMenuOpen = _this$props.columnMenuOpen,
          dataId = _this$props.dataId,
          selectedCol = _this$props.selectedCol,
          openChart = _this$props.openChart;

      if (!selectedCol) {
        return null;
      }

      var colCfg = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find(this.props.columns, {
        name: selectedCol
      }) || {};
      var unlocked = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.get(colCfg, "locked", false) === false;

      var currDir = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find(this.props.sortInfo, function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            col = _ref2[0],
            _dir = _ref2[1];

        return selectedCol === col;
      });

      currDir = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isUndefined(currDir) ? SORT_PROPS[2].dir : currDir[1];

      var openPopup = function openPopup(type) {
        var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 450;
        var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
        return function () {
          if (_menu_dataViewerMenuUtils__WEBPACK_IMPORTED_MODULE_13__["default"].shouldOpenPopup(height, width)) {
            _menu_dataViewerMenuUtils__WEBPACK_IMPORTED_MODULE_13__["default"].open(Object(_actions_url_utils__WEBPACK_IMPORTED_MODULE_9__["buildURLString"])(_menu_dataViewerMenuUtils__WEBPACK_IMPORTED_MODULE_13__["default"].fullPath("/dtale/popup/".concat(type), dataId), {
              selectedCol: selectedCol
            }), null, height, width);
          } else {
            openChart(lodash__WEBPACK_IMPORTED_MODULE_1___default.a.assignIn({
              type: type,
              title: lodash__WEBPACK_IMPORTED_MODULE_1___default.a.capitalize(type)
            }, lodash__WEBPACK_IMPORTED_MODULE_1___default.a.pick(_this2.props, ["selectedCol", "propagateState", "columns"])));
          }
        };
      };

      var openDescribe = function openDescribe() {
        return window.open(Object(_actions_url_utils__WEBPACK_IMPORTED_MODULE_9__["buildURLString"])(_menu_dataViewerMenuUtils__WEBPACK_IMPORTED_MODULE_13__["default"].fullPath("/dtale/popup/describe", dataId), {
          selectedCol: selectedCol
        }), "_blank");
      };

      var openFormatting = function openFormatting() {
        return _this2.props.propagateState({
          formattingOpen: true,
          selectedCols: [selectedCol]
        });
      };

      var hideCol = function hideCol() {
        var hideCallback = function hideCallback() {
          var updatedColumns = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(_this2.props.columns, function (c) {
            return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.assignIn({}, c, c.name === selectedCol ? {
              visible: !c.visible
            } : {});
          });

          _this2.props.propagateState({
            columns: updatedColumns
          });
        };

        _serverStateManagement__WEBPACK_IMPORTED_MODULE_14__["default"].toggleVisibility(dataId, selectedCol, hideCallback);
      };

      var deleteCol = function deleteCol() {
        var yesAction = function yesAction() {
          return _this2.props.propagateState({
            columns: lodash__WEBPACK_IMPORTED_MODULE_1___default.a.reject(_this2.props.columns, {
              name: selectedCol
            })
          }, _serverStateManagement__WEBPACK_IMPORTED_MODULE_14__["default"].deleteColumn(dataId, selectedCol));
        };

        var msg = "Are you sure you want to delete the column \"".concat(selectedCol, "\"?");
        var title = "Delete column - ".concat(selectedCol);
        openChart({
          type: "confirm",
          title: title,
          msg: msg,
          yesAction: yesAction,
          size: "modal-sm"
        });
      };

      var renameCol = function renameCol() {
        return openChart({
          type: "rename",
          selectedCol: selectedCol,
          columns: _this2.props.columns,
          size: "modal-sm"
        });
      };

      var openAction = function openAction(action) {
        return openPopup(action, 400, 770);
      };

      var closeMenu = function closeMenu() {
        return _this2.props.hideColumnMenu(selectedCol);
      };

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
        id: "column-menu-div",
        className: "column-toggle__dropdown",
        hidden: !columnMenuOpen,
        style: {
          minWidth: "11em"
        },
        ref: function ref(cm) {
          return _this2._div = cm;
        }
      }, columnMenuOpen && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_hotkeys__WEBPACK_IMPORTED_MODULE_4__["GlobalHotKeys"], {
        keyMap: {
          CLOSE_MENU: "esc"
        },
        handlers: {
          CLOSE_MENU: closeMenu
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("header", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", null, "Column \"".concat(selectedCol, "\"")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("ul", {
        className: "col-menu-descriptors"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("li", null, "Data Type:", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", null, colCfg.dtype)), colCfg.hasMissing > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("li", null, "# Missing:", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", null, colCfg.hasMissing)), colCfg.hasOutliers > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("li", null, "# Outliers:", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", null, colCfg.hasOutliers)), colCfg.lowVariance && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("li", null, "".concat(_backgroundUtils__WEBPACK_IMPORTED_MODULE_11__["default"].flagIcon, "Low Variance:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", null, "True")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
        className: "toggler-action"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("i", {
        className: "fa fa-sort ml-4 mr-4"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
        className: "btn-group compact m-auto font-weight-bold column-sorting"
      }, lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(SORT_PROPS, function (_ref3) {
        var dir = _ref3.dir,
            col = _ref3.col;
        var active = dir === currDir;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("button", {
          key: dir,
          style: active ? {} : {
            color: "#565b68"
          },
          className: "btn btn-primary ".concat(active ? "active" : "", " font-weight-bold"),
          onClick: active ? lodash__WEBPACK_IMPORTED_MODULE_1___default.a.noop : function () {
            return _menu_dataViewerMenuUtils__WEBPACK_IMPORTED_MODULE_13__["default"].updateSort([selectedCol], dir, _this2.props);
          },
          disabled: active
        }, col.label);
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
        className: "toggler-action"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("i", {
        className: "ico-swap-horiz"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
        className: "btn-group compact m-auto font-weight-bold column-sorting"
      }, lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(MOVE_COLS, function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 4),
            icon = _ref5[0],
            func = _ref5[1],
            hint = _ref5[2],
            icnStyle = _ref5[3];

        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("button", {
          key: icon,
          style: lodash__WEBPACK_IMPORTED_MODULE_1___default.a.assign({
            color: "#565b68",
            width: "2em"
          }, icnStyle),
          className: "btn btn-primary font-weight-bold",
          onClick: func(selectedCol, _this2.props),
          title: hint
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("i", {
          className: "fas fa-".concat(icon)
        }));
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_ConditionalRender__WEBPACK_IMPORTED_MODULE_6__["default"], {
        display: unlocked
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_ColumnMenuOption__WEBPACK_IMPORTED_MODULE_15__["default"], {
        open: _serverStateManagement__WEBPACK_IMPORTED_MODULE_14__["default"].lockCols([selectedCol], this.props),
        label: "Lock",
        iconClass: "fa fa-lock ml-3 mr-4"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_ConditionalRender__WEBPACK_IMPORTED_MODULE_6__["default"], {
        display: !unlocked
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_ColumnMenuOption__WEBPACK_IMPORTED_MODULE_15__["default"], {
        open: _serverStateManagement__WEBPACK_IMPORTED_MODULE_14__["default"].unlockCols([selectedCol], this.props),
        label: "Unlock",
        iconClass: "fa fa-lock-open ml-2 mr-4"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_ColumnMenuOption__WEBPACK_IMPORTED_MODULE_15__["default"], {
        open: hideCol,
        label: "Hide",
        iconClass: "ico-visibility-off"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_ColumnMenuOption__WEBPACK_IMPORTED_MODULE_15__["default"], {
        open: deleteCol,
        label: "Delete",
        iconClass: "ico-delete"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_ColumnMenuOption__WEBPACK_IMPORTED_MODULE_15__["default"], {
        open: renameCol,
        label: "Rename",
        iconClass: "ico-edit"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_ColumnMenuOption__WEBPACK_IMPORTED_MODULE_15__["default"], {
        open: openAction("replacement"),
        label: "Replacements",
        iconClass: "fas fa-backspace mr-3"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_ColumnMenuOption__WEBPACK_IMPORTED_MODULE_15__["default"], {
        open: openAction("type-conversion"),
        label: "Type Conversion",
        iconClass: "ico-swap-horiz"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_ColumnMenuOption__WEBPACK_IMPORTED_MODULE_15__["default"], {
        open: openAction("duplicates"),
        label: "Duplicates",
        iconClass: "fas fa-clone ml-2 mr-4"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_ColumnMenuOption__WEBPACK_IMPORTED_MODULE_15__["default"], {
        open: openDescribe,
        label: "Describe",
        iconClass: "ico-view-column"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_ColumnMenuOption__WEBPACK_IMPORTED_MODULE_15__["default"], {
        open: openPopup("column-analysis", 425, 810),
        label: "Column Analysis",
        iconClass: "ico-equalizer"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_ColumnMenuOption__WEBPACK_IMPORTED_MODULE_15__["default"], {
        open: openFormatting,
        label: "Formats",
        iconClass: "ico-palette"
      }), lodash__WEBPACK_IMPORTED_MODULE_1___default.a.has(colCfg, "lowVariance") && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_ColumnMenuOption__WEBPACK_IMPORTED_MODULE_15__["default"], {
        open: openPopup("variance", 400, 770),
        label: "Variance Report",
        iconClass: "fas fa-chart-bar ml-2 mr-4"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_filters_ColumnFilter__WEBPACK_IMPORTED_MODULE_10__["default"], this.props)));
    }
  }]);

  return ReactColumnMenu;
}(react__WEBPACK_IMPORTED_MODULE_3___default.a.Component);

ReactColumnMenu.displayName = "ReactColumnMenu";
ReactColumnMenu.propTypes = {
  selectedCol: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  selectedToggle: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  columns: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array,
  columnMenuOpen: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
  sortInfo: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array,
  propagateState: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  dataId: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired,
  noInfo: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
  openChart: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  hideColumnMenu: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  outlierFilters: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object
};
var ReduxColumnMenu = Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["connect"])(function (state) {
  return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.pick(state, ["dataId", "columnMenuOpen", "selectedCol", "selectedToggle"]);
}, function (dispatch) {
  return {
    openChart: function openChart(chartProps) {
      return dispatch(Object(_actions_charts__WEBPACK_IMPORTED_MODULE_7__["openChart"])(chartProps));
    },
    hideColumnMenu: function hideColumnMenu(colName) {
      return dispatch(_actions_dtale__WEBPACK_IMPORTED_MODULE_8__["default"].hideColumnMenu(colName));
    }
  };
})(ReactColumnMenu);


/***/ }),

/***/ "./static/dtale/column/ColumnMenuOption.jsx":
/*!**************************************************!*\
  !*** ./static/dtale/column/ColumnMenuOption.jsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
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




var ColumnMenuOption = /*#__PURE__*/function (_React$Component) {
  _inherits(ColumnMenuOption, _React$Component);

  var _super = _createSuper(ColumnMenuOption);

  function ColumnMenuOption(props) {
    _classCallCheck(this, ColumnMenuOption);

    return _super.call(this, props);
  }

  _createClass(ColumnMenuOption, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        className: "toggler-action"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
        className: "btn btn-plain",
        onClick: this.props.open
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
        className: this.props.iconClass
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        className: "font-weight-bold"
      }, this.props.label))));
    }
  }]);

  return ColumnMenuOption;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);

ColumnMenuOption.displayName = "ColumnMenuOption";
ColumnMenuOption.propTypes = {
  open: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  label: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  iconClass: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
};
/* harmony default export */ __webpack_exports__["default"] = (ColumnMenuOption);

/***/ }),

/***/ "./static/dtale/column/column-menu-descriptions.json":
/*!***********************************************************!*\
  !*** ./static/dtale/column/column-menu-descriptions.json ***!
  \***********************************************************/
/*! exports provided: filter, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"filter\":\"For more complex filters use \\\"Custom Filter\\\" popup on main menu.\"}");

/***/ }),

/***/ "./static/filters/AsyncValueSelect.jsx":
/*!*********************************************!*\
  !*** ./static/filters/AsyncValueSelect.jsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var querystring__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");
/* harmony import */ var querystring__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(querystring__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_select_async__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-select/async */ "./node_modules/react-select/async/dist/react-select.browser.esm.js");
/* harmony import */ var _fetcher__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../fetcher */ "./static/fetcher.js");
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








var AsyncValueSelect = /*#__PURE__*/function (_React$Component) {
  _inherits(AsyncValueSelect, _React$Component);

  var _super = _createSuper(AsyncValueSelect);

  function AsyncValueSelect(props) {
    var _this;

    _classCallCheck(this, AsyncValueSelect);

    _this = _super.call(this, props);
    _this.state = {
      selected: lodash__WEBPACK_IMPORTED_MODULE_1___default.a.get(props, "selected", null)
    };
    _this.updateState = _this.updateState.bind(_assertThisInitialized(_this));
    _this.loadOptions = _this.loadOptions.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(AsyncValueSelect, [{
    key: "updateState",
    value: function updateState(state) {
      var _this2 = this;

      this.setState(state, function () {
        return _this2.props.updateState(state);
      });
    }
  }, {
    key: "loadOptions",
    value: function loadOptions(input) {
      return Object(_fetcher__WEBPACK_IMPORTED_MODULE_5__["fetchJsonPromise"])("/dtale/async-column-filter-data/".concat(this.props.dataId, "/").concat(encodeURIComponent(this.props.selectedCol), "?").concat(querystring__WEBPACK_IMPORTED_MODULE_0___default.a.stringify({
        input: input
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_select_async__WEBPACK_IMPORTED_MODULE_4__["default"], {
        isMulti: true,
        isDisabled: this.props.missing,
        className: "Select is-clearable is-searchable Select--single",
        classNamePrefix: "Select",
        getOptionLabel: lodash__WEBPACK_IMPORTED_MODULE_1___default.a.property("value"),
        getOptionValue: lodash__WEBPACK_IMPORTED_MODULE_1___default.a.property("value"),
        value: this.state.selected,
        onChange: function onChange(selected) {
          return _this3.updateState({
            selected: selected
          });
        },
        isClearable: true,
        cacheOptions: true,
        defaultOptions: lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(this.props.uniques, function (u) {
          return {
            value: u
          };
        }),
        loadOptions: this.loadOptions
      });
    }
  }]);

  return AsyncValueSelect;
}(react__WEBPACK_IMPORTED_MODULE_3___default.a.Component);

AsyncValueSelect.displayName = "AsyncValueSelect";
AsyncValueSelect.propTypes = {
  uniques: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array,
  missing: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
  updateState: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  dataId: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  selectedCol: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string
};
/* harmony default export */ __webpack_exports__["default"] = (AsyncValueSelect);

/***/ }),

/***/ "./static/filters/ColumnFilter.css":
/*!*****************************************!*\
  !*** ./static/filters/ColumnFilter.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-1!../../node_modules/postcss-loader/src??ref--6-2!./ColumnFilter.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./static/filters/ColumnFilter.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);


if (true) {
  if (!content.locals || module.hot.invalidate) {
    var isEqualLocals = function isEqualLocals(a, b) {
  if (!a && b || a && !b) {
    return false;
  }

  var p;

  for (p in a) {
    if (a[p] !== b[p]) {
      return false;
    }
  }

  for (p in b) {
    if (!a[p]) {
      return false;
    }
  }

  return true;
};
    var oldLocals = content.locals;

    module.hot.accept(
      /*! !../../node_modules/css-loader/dist/cjs.js??ref--6-1!../../node_modules/postcss-loader/src??ref--6-2!./ColumnFilter.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./static/filters/ColumnFilter.css",
      function () {
        content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-1!../../node_modules/postcss-loader/src??ref--6-2!./ColumnFilter.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./static/filters/ColumnFilter.css");

              content = content.__esModule ? content.default : content;

              if (typeof content === 'string') {
                content = [[module.i, content, '']];
              }

              if (!isEqualLocals(oldLocals, content.locals)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = content.locals;

              update(content);
      }
    )
  }

  module.hot.dispose(function() {
    update();
  });
}

module.exports = content.locals || {};

/***/ }),

/***/ "./static/filters/ColumnFilter.jsx":
/*!*****************************************!*\
  !*** ./static/filters/ColumnFilter.jsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.browser.esm.js");
/* harmony import */ var _actions_url_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions/url-utils */ "./static/actions/url-utils.js");
/* harmony import */ var _dtale_column_column_menu_descriptions_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dtale/column/column-menu-descriptions.json */ "./static/dtale/column/column-menu-descriptions.json");
var _dtale_column_column_menu_descriptions_json__WEBPACK_IMPORTED_MODULE_5___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../dtale/column/column-menu-descriptions.json */ "./static/dtale/column/column-menu-descriptions.json", 1);
/* harmony import */ var _dtale_gridUtils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dtale/gridUtils */ "./static/dtale/gridUtils.jsx");
/* harmony import */ var _dtale_menu_dataViewerMenuUtils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../dtale/menu/dataViewerMenuUtils */ "./static/dtale/menu/dataViewerMenuUtils.jsx");
/* harmony import */ var _fetcher__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../fetcher */ "./static/fetcher.js");
/* harmony import */ var _DateFilter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./DateFilter */ "./static/filters/DateFilter.jsx");
/* harmony import */ var _NumericFilter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./NumericFilter */ "./static/filters/NumericFilter.jsx");
/* harmony import */ var _StringFilter__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./StringFilter */ "./static/filters/StringFilter.jsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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














__webpack_require__(/*! ./ColumnFilter.css */ "./static/filters/ColumnFilter.css");

function getStyles() {
  return {
    label: "loadingIndicator",
    color: "hsl(0, 0%, 40%)",
    display: "flex",
    padding: 8,
    transition: "color 150ms",
    alignSelf: "center",
    fontSize: 4,
    lineHeight: 1,
    marginRight: 4,
    textAlign: "center",
    verticalAlign: "middle"
  };
}

function buildState(_ref) {
  var columns = _ref.columns,
      selectedCol = _ref.selectedCol,
      outlierFilters = _ref.outlierFilters;
  var colCfg = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(columns, {
    name: selectedCol
  }) || {};
  var colType = _dtale_gridUtils__WEBPACK_IMPORTED_MODULE_6__["exports"].findColType(colCfg.dtype);
  return {
    colType: colType,
    uniqueCt: colCfg.unique_ct,
    dtype: colCfg.dtype,
    hasOutliers: colCfg.hasOutliers > 0,
    queryApplied: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.has(outlierFilters, selectedCol),
    hasMissing: false,
    missing: false,
    loadingState: true
  };
}

var ColumnFilter = /*#__PURE__*/function (_React$Component) {
  _inherits(ColumnFilter, _React$Component);

  var _super = _createSuper(ColumnFilter);

  function ColumnFilter(props) {
    var _this;

    _classCallCheck(this, ColumnFilter);

    _this = _super.call(this, props);
    _this.state = buildState(props);
    _this.fetchData = _this.fetchData.bind(_assertThisInitialized(_this));
    _this.updateState = _this.updateState.bind(_assertThisInitialized(_this));
    _this.renderMissingToggle = _this.renderMissingToggle.bind(_assertThisInitialized(_this));
    _this.renderOutlierToggle = _this.renderOutlierToggle.bind(_assertThisInitialized(_this));
    _this.renderIcon = _this.renderIcon.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ColumnFilter, [{
    key: "fetchData",
    value: function fetchData(state) {
      var _this2 = this;

      Object(_fetcher__WEBPACK_IMPORTED_MODULE_8__["fetchJson"])("/dtale/column-filter-data/".concat(this.props.dataId, "/").concat(encodeURIComponent(this.props.selectedCol)), function (data) {
        if (data.success) {
          var missing = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(_this2.props.columnFilters, [_this2.props.selectedCol, "missing"], false);

          _this2.setState(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.assignIn(state || {}, {
            loadingState: false,
            missing: missing
          }, data));
        }
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchData();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.selectedCol !== this.props.selectedCol) {
        this.fetchData(buildState(this.props));
      }
    }
  }, {
    key: "updateState",
    value: function updateState(cfg) {
      var _this3 = this;

      var url = Object(_actions_url_utils__WEBPACK_IMPORTED_MODULE_4__["buildURLString"])(Object(_actions_url_utils__WEBPACK_IMPORTED_MODULE_4__["saveColFilterUrl"])(this.props.dataId, this.props.selectedCol), {
        cfg: JSON.stringify(cfg)
      });
      var updatedState = {
        cfg: cfg
      };

      if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.has(cfg, "missing")) {
        updatedState.missing = cfg.missing;
      }

      this.setState(updatedState, Object(_fetcher__WEBPACK_IMPORTED_MODULE_8__["fetchJson"])(url, function (data) {
        return _this3.props.propagateState({
          columnFilters: data.currFilters || {}
        });
      }));
    }
  }, {
    key: "renderIcon",
    value: function renderIcon() {
      var showIcon = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var buttonHandlers = _dtale_menu_dataViewerMenuUtils__WEBPACK_IMPORTED_MODULE_7__["default"].buildHotkeyHandlers(this.props);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
        className: "toggler-action"
      }, showIcon && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", {
        className: "fa fa-filter align-bottom pointer",
        onClick: buttonHandlers.FILTER
      }));
    }
  }, {
    key: "renderMissingToggle",
    value: function renderMissingToggle(showIcon) {
      var _this4 = this;

      var _this$state = this.state,
          hasMissing = _this$state.hasMissing,
          missing = _this$state.missing,
          colType = _this$state.colType;

      if (hasMissing) {
        var toggleMissing = function toggleMissing() {
          return _this4.updateState(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.assignIn({}, _this4.state.cfg, {
            type: colType,
            missing: !missing
          }));
        };

        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null, this.renderIcon(showIcon), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          className: "m-auto"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          className: "column-filter m-2"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
          className: "font-weight-bold pr-3"
        }, "Show Only Missing"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", {
          className: "ico-check-box".concat(missing ? "" : "-outline-blank", " pointer"),
          onClick: toggleMissing
        }))));
      }

      return null;
    }
  }, {
    key: "renderOutlierToggle",
    value: function renderOutlierToggle(showIcon) {
      var _this5 = this;

      var _this$state2 = this.state,
          hasOutliers = _this$state2.hasOutliers,
          queryApplied = _this$state2.queryApplied;

      if (hasOutliers) {
        var toggleFilter = function toggleFilter() {
          var url = Object(_actions_url_utils__WEBPACK_IMPORTED_MODULE_4__["toggleOutlierFilterUrl"])(_this5.props.dataId, _this5.props.selectedCol);

          _this5.setState({
            queryApplied: !queryApplied
          }, Object(_fetcher__WEBPACK_IMPORTED_MODULE_8__["fetchJson"])(url, function (data) {
            return _this5.props.propagateState(data);
          }));
        };

        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null, this.renderIcon(showIcon), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          className: "m-auto"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          className: "column-filter m-2"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
          className: "font-weight-bold pr-3"
        }, "Filter Outliers"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", {
          className: "ico-check-box".concat(queryApplied ? "" : "-outline-blank", " pointer"),
          onClick: toggleFilter
        }))));
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.loadingState) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", {
          className: "hoverable"
        }, this.renderIcon(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          className: "m-auto"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          className: "column-filter m-2"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_3__["components"].LoadingIndicator, {
          getStyles: getStyles,
          cx: function cx() {
            return "";
          }
        }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          className: "hoverable__content col-menu-desc"
        }, _dtale_column_column_menu_descriptions_json__WEBPACK_IMPORTED_MODULE_5__.filter));
      }

      var colType = this.state.colType;
      var markup = null;

      switch (colType) {
        case "string":
        case "unknown":
          {
            if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.startsWith(this.state.dtype, "timedelta")) {
              markup = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_StringFilter__WEBPACK_IMPORTED_MODULE_11__["StringFilter"], _extends({}, lodash__WEBPACK_IMPORTED_MODULE_0___default.a.assignIn({}, this.props, this.state), {
                updateState: this.updateState
              }));
            }

            break;
          }

        case "date":
          markup = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_DateFilter__WEBPACK_IMPORTED_MODULE_9__["DateFilter"], _extends({}, lodash__WEBPACK_IMPORTED_MODULE_0___default.a.assignIn({}, this.props, this.state), {
            updateState: this.updateState
          }));
          break;

        case "int":
        case "float":
          markup = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_NumericFilter__WEBPACK_IMPORTED_MODULE_10__["NumericFilter"], _extends({}, lodash__WEBPACK_IMPORTED_MODULE_0___default.a.assignIn({}, this.props, this.state), {
            updateState: this.updateState
          }));
          break;
      }

      var missingToggle = null;

      if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isNull(markup)) {
        if (!this.state.hasMissing) {
          return null;
        }

        missingToggle = this.renderMissingToggle(true);
      } else {
        markup = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", {
          className: "hoverable"
        }, this.renderIcon(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          className: "m-auto"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          className: "column-filter m-2"
        }, markup)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          className: "hoverable__content col-menu-desc"
        }, _dtale_column_column_menu_descriptions_json__WEBPACK_IMPORTED_MODULE_5__.filter));
        missingToggle = this.renderMissingToggle(false);
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, markup, missingToggle, this.renderOutlierToggle(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isNull(markup) && lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isNull(missingToggle)));
    }
  }]);

  return ColumnFilter;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

ColumnFilter.displayName = "ColumnFilter";
ColumnFilter.propTypes = {
  columns: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  columnFilters: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  selectedCol: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  propagateState: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  dataId: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  outlierFilters: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object
};
/* harmony default export */ __webpack_exports__["default"] = (ColumnFilter);

/***/ }),

/***/ "./static/filters/DateFilter.jsx":
/*!***************************************!*\
  !*** ./static/filters/DateFilter.jsx ***!
  \***************************************/
/*! exports provided: DateFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DateFilter", function() { return DateFilter; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js?a14b");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _blueprintjs_datetime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @blueprintjs/datetime */ "./node_modules/@blueprintjs/datetime/lib/esm/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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








__webpack_require__(/*! @blueprintjs/core/lib/css/blueprint.css */ "./node_modules/@blueprintjs/core/lib/css/blueprint.css");

__webpack_require__(/*! @blueprintjs/datetime/lib/css/blueprint-datetime.css */ "./node_modules/@blueprintjs/datetime/lib/css/blueprint-datetime.css");

var DateFilter = /*#__PURE__*/function (_React$Component) {
  _inherits(DateFilter, _React$Component);

  var _super = _createSuper(DateFilter);

  function DateFilter(props) {
    var _this;

    _classCallCheck(this, DateFilter);

    _this = _super.call(this, props);

    var previousSelection = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.get(props.columnFilters, [props.selectedCol, "value"], {});

    var state = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.pick(props, ["min", "max"]);

    state.start = previousSelection.start || state.min;
    state.end = previousSelection.end || state.max;
    state = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.mapValues(state, function (v) {
      return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isNull(v) ? null : new Date(moment__WEBPACK_IMPORTED_MODULE_2___default()(v));
    });
    _this.state = state;
    _this.updateState = _this.updateState.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(DateFilter, [{
    key: "updateState",
    value: function updateState(prop, value) {
      var _this2 = this;

      var inputRef = this["".concat(prop, "Input")];
      var inputRefValue = jquery__WEBPACK_IMPORTED_MODULE_0___default()(inputRef)[0].value;

      if (inputRefValue.length > 0 && inputRefValue.length < 8) {
        return;
      }

      var cfgVal = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.assignIn({}, lodash__WEBPACK_IMPORTED_MODULE_1___default.a.pick(this.state, ["start", "end"]), _defineProperty({}, prop, value));

      cfgVal = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.mapValues(cfgVal, function (v) {
        return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isNull(v) ? v : moment__WEBPACK_IMPORTED_MODULE_2___default()(v).format("YYYYMMDD");
      });
      var cfg = null;

      if (!lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isNull(cfgVal.start) || !lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isNull(cfgVal.end)) {
        cfg = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.assignIn({
          type: "date"
        }, cfgVal);
      }

      this.setState(_defineProperty({}, prop, value), function () {
        return _this2.props.updateState(cfg);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          start = _this$state.start,
          end = _this$state.end;
      var inputProps = {
        formatDate: function formatDate(date) {
          return moment__WEBPACK_IMPORTED_MODULE_2___default()(date).format("YYYYMMDD");
        },
        parseDate: function parseDate(str) {
          return new Date(moment__WEBPACK_IMPORTED_MODULE_2___default()(str));
        },
        placeholder: "YYYYMMDD",
        popoverProps: {
          usePortal: false
        },
        minDate: this.state.min,
        maxDate: this.state.max,
        showActionsBar: false,
        disabled: this.props.missing
      };
      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_blueprintjs_datetime__WEBPACK_IMPORTED_MODULE_5__["DateInput"], _extends({
        key: 0,
        value: lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isNull(start) ? null : new Date(moment__WEBPACK_IMPORTED_MODULE_2___default()(start)),
        onChange: function onChange(date) {
          return _this3.updateState("start", date);
        },
        inputProps: {
          inputRef: function inputRef(c) {
            return _this3.startInput = c;
          }
        }
      }, inputProps)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("span", {
        key: 1
      }, "to"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_blueprintjs_datetime__WEBPACK_IMPORTED_MODULE_5__["DateInput"], _extends({
        key: 2,
        value: lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isNull(end) ? null : new Date(moment__WEBPACK_IMPORTED_MODULE_2___default()(end)),
        onChange: function onChange(date) {
          return _this3.updateState("end", date);
        },
        inputProps: {
          inputRef: function inputRef(c) {
            return _this3.endInput = c;
          }
        }
      }, inputProps))];
    }
  }]);

  return DateFilter;
}(react__WEBPACK_IMPORTED_MODULE_4___default.a.Component);

DateFilter.displayName = "DateFilter";
DateFilter.propTypes = {
  selectedCol: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,
  dataId: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string.isRequired,
  columnFilters: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object,
  updateState: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,
  min: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,
  max: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,
  missing: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool
};


/***/ }),

/***/ "./static/filters/NumericFilter.jsx":
/*!******************************************!*\
  !*** ./static/filters/NumericFilter.jsx ***!
  \******************************************/
/*! exports provided: NumericFilter, EQ_TOGGLE, NE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NumericFilter", function() { return NumericFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EQ_TOGGLE", function() { return EQ_TOGGLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NE", function() { return NE; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _AsyncValueSelect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AsyncValueSelect */ "./static/filters/AsyncValueSelect.jsx");
/* harmony import */ var _ValueSelect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ValueSelect */ "./static/filters/ValueSelect.jsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var NE = "\u2260";
var EQ_TOGGLE = [["=", "Equals"], [NE, "Not Equals"]];

var OPERANDS = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.concat(EQ_TOGGLE, [["<", "Less Than"], [">", "Greater Than"], ["<=", "Less Than or Equal"], [">=", "Greater Than or Equal"], ["[]", "Range (Inclusive)"], ["()", "Range (Exclusive)"]]);

function createValueInput(updateState, _ref, state, prop) {
  var missing = _ref.missing;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    key: prop,
    className: "row pt-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "col-auto m-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("input", {
    type: "text",
    placeholder: "Enter ".concat(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.capitalize(prop), "..."),
    className: "form-control numeric-filter",
    value: state[prop] || "",
    disabled: missing,
    onChange: function onChange(e) {
      return updateState(_defineProperty({}, prop, e.target.value));
    }
  })));
}

function buildState(_ref2) {
  var columnFilters = _ref2.columnFilters,
      selectedCol = _ref2.selectedCol,
      min = _ref2.min,
      max = _ref2.max;

  var cfg = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(columnFilters, selectedCol, {
    operand: "="
  });

  var selected = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.includes(["=", "ne"], cfg.operand) ? lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(cfg.value || null, function (v) {
    return {
      value: v
    };
  }) : null;
  var value = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.includes(["=", "ne"], cfg.operand) ? "" : cfg.value;
  var operand = cfg.operand;
  return {
    selected: selected,
    operand: operand === "ne" ? NE : "=",
    minimum: (cfg.min || min) + "",
    maximum: (cfg.max || max) + "",
    value: value + ""
  };
}

var NumericFilter = /*#__PURE__*/function (_React$Component) {
  _inherits(NumericFilter, _React$Component);

  var _super = _createSuper(NumericFilter);

  function NumericFilter(props) {
    var _this;

    _classCallCheck(this, NumericFilter);

    _this = _super.call(this, props);
    _this.state = buildState(props);
    _this.updateState = _this.updateState.bind(_assertThisInitialized(_this));
    _this.renderOperandInputs = _this.renderOperandInputs.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(NumericFilter, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.selectedCol !== prevProps.selectedCol) {
        this.setState(buildState(this.props));
      }
    }
  }, {
    key: "updateState",
    value: function updateState(state) {
      var _this2 = this;

      var updatedState = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.assignIn({}, this.state, state);

      var colType = this.props.colType;
      var parseFunc = colType === "int" ? parseInt : parseFloat;
      var cfg = {
        type: colType,
        operand: updatedState.operand
      };

      var updateCfgForVal = function updateCfgForVal() {
        var numVal = parseFunc(updatedState.value);

        if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isNaN(numVal)) {
          cfg = {
            type: colType
          };
          return;
        }

        cfg.value = numVal;
      };

      switch (cfg.operand) {
        case "=":
        case NE:
          {
            if (colType === "int") {
              cfg.value = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(updatedState.selected || [], "value");
              cfg.operand = cfg.operand === NE ? "ne" : cfg.operand;
            } else {
              updateCfgForVal();
            }

            break;
          }

        case "<":
        case ">":
        case "<=":
        case ">=":
          updateCfgForVal();
          break;

        case "[]":
        case "()":
          {
            var minimum = updatedState.minimum,
                maximum = updatedState.maximum;
            minimum = parseFunc(minimum);
            maximum = parseFunc(maximum);

            if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isNaN(minimum)) {
              cfg.min = minimum;
            }

            if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isNaN(maximum)) {
              cfg.max = maximum;
            }

            if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isUndefined(cfg.min) && lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isUndefined(cfg.max)) {
              cfg = {
                type: colType
              };
              break;
            }

            if (this.props.min == cfg.min && this.props.max == cfg.max) {
              cfg = {
                type: colType
              };
              break;
            }
          }
      }

      this.setState(updatedState, function () {
        return _this2.props.updateState(cfg);
      });
    }
  }, {
    key: "renderOperandInputs",
    value: function renderOperandInputs() {
      var operand = this.state.operand;
      var colType = this.props.colType;

      switch (operand) {
        case "<":
        case ">":
        case "<=":
        case ">=":
          return createValueInput(this.updateState, this.props, this.state, "value");

        case "[]":
        case "()":
          return [createValueInput(this.updateState, this.props, this.state, "minimum"), createValueInput(this.updateState, this.props, this.state, "maximum")];

        case "=":
        case NE:
        default:
          {
            if (colType === "float") {
              return createValueInput(this.updateState, this.props, this.state, "value");
            }

            var requiresAsync = this.props.uniqueCt > 500;
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
              key: 2,
              className: "row pt-3"
            }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
              className: "col-md-12"
            }, !requiresAsync && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ValueSelect__WEBPACK_IMPORTED_MODULE_4__["default"], _extends({}, this.props, {
              selected: this.state.selected,
              updateState: this.updateState
            })), requiresAsync && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_AsyncValueSelect__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({}, this.props, {
              selected: this.state.selected,
              updateState: this.updateState
            }))));
          }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        key: 0,
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "col-md-12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "btn-group compact m-auto font-weight-bold column-sorting",
        style: {
          fontSize: "16px"
        }
      }, lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(OPERANDS, function (_ref3, i) {
        var _ref4 = _slicedToArray(_ref3, 2),
            operand = _ref4[0],
            hint = _ref4[1];

        var active = _this3.state.operand === operand;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", {
          key: i,
          style: active ? {} : {
            color: "#565b68"
          },
          className: "btn btn-primary ".concat(active ? "active" : "", " font-weight-bold"),
          onClick: function onClick() {
            return _this3.updateState({
              operand: operand
            });
          },
          title: hint,
          disabled: active || _this3.props.missing
        }, operand);
      })))), this.renderOperandInputs()];
    }
  }]);

  return NumericFilter;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

NumericFilter.displayName = "NumericFilter";
NumericFilter.propTypes = {
  selectedCol: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  columnFilters: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  // eslint-disable-line react/no-unused-prop-types
  updateState: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  uniques: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  uniqueCt: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  colType: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  min: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  max: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  missing: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
};


/***/ }),

/***/ "./static/filters/StringFilter.jsx":
/*!*****************************************!*\
  !*** ./static/filters/StringFilter.jsx ***!
  \*****************************************/
/*! exports provided: StringFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StringFilter", function() { return StringFilter; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _AsyncValueSelect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AsyncValueSelect */ "./static/filters/AsyncValueSelect.jsx");
/* harmony import */ var _NumericFilter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NumericFilter */ "./static/filters/NumericFilter.jsx");
/* harmony import */ var _ValueSelect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ValueSelect */ "./static/filters/ValueSelect.jsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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








var StringFilter = /*#__PURE__*/function (_React$Component) {
  _inherits(StringFilter, _React$Component);

  var _super = _createSuper(StringFilter);

  function StringFilter(props) {
    var _this;

    _classCallCheck(this, StringFilter);

    _this = _super.call(this, props);

    var currFilter = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(props.columnFilters, props.selectedCol, {});

    currFilter.operand = currFilter.operand === "ne" ? _NumericFilter__WEBPACK_IMPORTED_MODULE_4__["NE"] : "=";

    var selected = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(currFilter, "value", null), function (v) {
      return {
        value: v
      };
    });

    _this.state = {
      selected: selected,
      operand: currFilter.operand
    };
    _this.updateState = _this.updateState.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(StringFilter, [{
    key: "updateState",
    value: function updateState(state) {
      var _this2 = this;

      var updatedState = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.assignIn({}, this.state, state);

      var cfg = {
        type: "string",
        value: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(updatedState.selected || [], "value"),
        operand: updatedState.operand
      };
      cfg.operand = cfg.operand === _NumericFilter__WEBPACK_IMPORTED_MODULE_4__["NE"] ? "ne" : cfg.operand;
      this.setState(updatedState, function () {
        return _this2.props.updateState(cfg);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var requiresAsync = this.props.uniqueCt > 500;
      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        key: 0,
        className: "row pb-3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "col-md-12 text-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "btn-group compact m-auto font-weight-bold column-sorting",
        style: {
          fontSize: "16px"
        }
      }, lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(_NumericFilter__WEBPACK_IMPORTED_MODULE_4__["EQ_TOGGLE"], function (_ref, i) {
        var _ref2 = _slicedToArray(_ref, 2),
            operand = _ref2[0],
            hint = _ref2[1];

        var active = _this3.state.operand === operand;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", {
          key: i,
          style: active ? {} : {
            color: "#565b68"
          },
          className: "btn btn-primary ".concat(active ? "active" : "", " font-weight-bold"),
          onClick: function onClick() {
            return _this3.updateState({
              operand: operand
            });
          },
          title: hint,
          disabled: active || _this3.props.missing
        }, operand);
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        key: 1,
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "col-md-12"
      }, !requiresAsync && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ValueSelect__WEBPACK_IMPORTED_MODULE_5__["default"], _extends({}, this.props, {
        selected: this.state.selected,
        updateState: this.updateState
      })), requiresAsync && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_AsyncValueSelect__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({}, this.props, {
        selected: this.state.selected,
        updateState: this.updateState
      }))))];
    }
  }]);

  return StringFilter;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

StringFilter.displayName = "StringFilter";
StringFilter.propTypes = {
  selectedCol: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  columnFilters: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  // eslint-disable-line react/no-unused-prop-types
  updateState: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  uniques: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  missing: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  uniqueCt: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number
};


/***/ }),

/***/ "./static/filters/ValueSelect.jsx":
/*!****************************************!*\
  !*** ./static/filters/ValueSelect.jsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.browser.esm.js");
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






var ValueSelect = /*#__PURE__*/function (_React$Component) {
  _inherits(ValueSelect, _React$Component);

  var _super = _createSuper(ValueSelect);

  function ValueSelect(props) {
    var _this;

    _classCallCheck(this, ValueSelect);

    _this = _super.call(this, props);
    _this.state = {
      selected: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(props, "selected", null)
    };
    _this.updateState = _this.updateState.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ValueSelect, [{
    key: "updateState",
    value: function updateState(state) {
      var _this2 = this;

      this.setState(state, function () {
        return _this2.props.updateState(state);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_3__["default"], {
        isMulti: true,
        isDisabled: this.props.missing,
        className: "Select is-clearable is-searchable Select--single",
        classNamePrefix: "Select",
        options: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(this.props.uniques, function (o) {
          return {
            value: o
          };
        }),
        getOptionLabel: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.property("value"),
        getOptionValue: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.property("value"),
        value: this.state.selected,
        onChange: function onChange(selected) {
          return _this3.updateState({
            selected: selected
          });
        },
        isClearable: true,
        filterOption: Object(react_select__WEBPACK_IMPORTED_MODULE_3__["createFilter"])({
          ignoreAccents: false
        }) // required for performance reasons!

      });
    }
  }]);

  return ValueSelect;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

ValueSelect.displayName = "ValueSelect";
ValueSelect.propTypes = {
  uniques: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  missing: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  updateState: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
};
/* harmony default export */ __webpack_exports__["default"] = (ValueSelect);

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdGF0aWMvZmlsdGVycy9Db2x1bW5GaWx0ZXIuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1zZWxlY3QvYXN5bmMvZGlzdC9yZWFjdC1zZWxlY3QuYnJvd3Nlci5lc20uanMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL2R0YWxlL2NvbHVtbi9Db2x1bW5NZW51LmpzeCIsIndlYnBhY2s6Ly8vLi9zdGF0aWMvZHRhbGUvY29sdW1uL0NvbHVtbk1lbnVPcHRpb24uanN4Iiwid2VicGFjazovLy8uL3N0YXRpYy9maWx0ZXJzL0FzeW5jVmFsdWVTZWxlY3QuanN4Iiwid2VicGFjazovLy8uL3N0YXRpYy9maWx0ZXJzL0NvbHVtbkZpbHRlci5jc3M/MDZlNSIsIndlYnBhY2s6Ly8vLi9zdGF0aWMvZmlsdGVycy9Db2x1bW5GaWx0ZXIuanN4Iiwid2VicGFjazovLy8uL3N0YXRpYy9maWx0ZXJzL0RhdGVGaWx0ZXIuanN4Iiwid2VicGFjazovLy8uL3N0YXRpYy9maWx0ZXJzL051bWVyaWNGaWx0ZXIuanN4Iiwid2VicGFjazovLy8uL3N0YXRpYy9maWx0ZXJzL1N0cmluZ0ZpbHRlci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL2ZpbHRlcnMvVmFsdWVTZWxlY3QuanN4Il0sIm5hbWVzIjpbIl9leHRlbmRzIiwiT2JqZWN0IiwiYXNzaWduIiwidGFyZ2V0IiwiaSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInNvdXJjZSIsImtleSIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImFwcGx5IiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UiLCJleGNsdWRlZCIsInNvdXJjZUtleXMiLCJrZXlzIiwiaW5kZXhPZiIsIl9pbmhlcml0c0xvb3NlIiwic3ViQ2xhc3MiLCJzdXBlckNsYXNzIiwiY3JlYXRlIiwiY29uc3RydWN0b3IiLCJfX3Byb3RvX18iLCJkZWZhdWx0UHJvcHMiLCJjYWNoZU9wdGlvbnMiLCJkZWZhdWx0T3B0aW9ucyIsImZpbHRlck9wdGlvbiIsImlzTG9hZGluZyIsIm1ha2VBc3luY1NlbGVjdCIsIlNlbGVjdENvbXBvbmVudCIsIl9jbGFzcyIsIl90ZW1wIiwiX0NvbXBvbmVudCIsIkFzeW5jIiwicHJvcHMiLCJfdGhpcyIsInNlbGVjdCIsImxhc3RSZXF1ZXN0IiwibW91bnRlZCIsIm9wdGlvbnNDYWNoZSIsImhhbmRsZUlucHV0Q2hhbmdlIiwibmV3VmFsdWUiLCJhY3Rpb25NZXRhIiwiX3RoaXMkcHJvcHMiLCJvbklucHV0Q2hhbmdlIiwiaW5wdXRWYWx1ZSIsInNldFN0YXRlIiwibG9hZGVkSW5wdXRWYWx1ZSIsImxvYWRlZE9wdGlvbnMiLCJwYXNzRW1wdHlPcHRpb25zIiwicmVxdWVzdCIsInN0YXRlIiwibG9hZE9wdGlvbnMiLCJvcHRpb25zIiwiQXJyYXkiLCJpc0FycmF5IiwidW5kZWZpbmVkIiwiX3Byb3RvIiwiY29tcG9uZW50RGlkTW91bnQiLCJfdGhpczIiLCJVTlNBRkVfY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwiZm9jdXMiLCJibHVyIiwiY2FsbGJhY2siLCJsb2FkZXIiLCJ0aGVuIiwicmVuZGVyIiwiX3RoaXMzIiwiX3RoaXMkcHJvcHMyIiwiaXNMb2FkaW5nUHJvcCIsIl90aGlzJHN0YXRlIiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50IiwicmVmIiwiX3JlZiIsIkNvbXBvbmVudCIsIlNlbGVjdFN0YXRlIiwibWFuYWdlU3RhdGUiLCJTZWxlY3QiLCJST1dfSEVJR0hUIiwiZ3UiLCJTT1JUX1BST1BTIiwiTU9WRV9DT0xTIiwic2VydmVyU3RhdGUiLCJtb3ZlVG9Gcm9udCIsIm1vdmVMZWZ0IiwiZm9udFNpemUiLCJwYWRkaW5nIiwid2lkdGgiLCJtb3ZlUmlnaHQiLCJtb3ZlVG9CYWNrIiwiYnVpbGRDYXJldENsYXNzIiwiY2FyZXRQY3QiLCJsYXN0Q2FyZXRTdHlsZSIsIl8iLCJnZXQiLCIkIiwiZmluZCIsImVuZHNXaXRoIiwiZmluYWxDYXJldFBjdCIsImlzVW5kZWZpbmVkIiwiY2FyZXRTdHlsZSIsImFwcGVuZCIsInBvc2l0aW9uTWVudSIsInNlbGVjdGVkVG9nZ2xlIiwibWVudURpdiIsImN1cnJMZWZ0Iiwib2Zmc2V0IiwiY3VyclRvcCIsImRpdldpZHRoIiwiY3NzIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImZpbmFsTGVmdCIsImxlZnQiLCJvdmVybGFwUGN0IiwiTWF0aCIsImZsb29yIiwidG9wIiwiaWdub3JlTWVudUNsaWNrcyIsImUiLCJjb2xGaWx0ZXIiLCJpcyIsImhhcyIsImhhc0NsYXNzIiwibm9kZU5hbWUiLCJSZWFjdENvbHVtbk1lbnUiLCJ1cGRhdGVQb3NpdGlvbiIsImJpbmQiLCJpc051bGwiLCJzZWxlY3RlZENvbCIsIl9kaXYiLCJjb2x1bW5NZW51T3BlbiIsImRhdGFJZCIsIm9wZW5DaGFydCIsImNvbENmZyIsImNvbHVtbnMiLCJuYW1lIiwidW5sb2NrZWQiLCJjdXJyRGlyIiwic29ydEluZm8iLCJjb2wiLCJfZGlyIiwiZGlyIiwib3BlblBvcHVwIiwidHlwZSIsImhlaWdodCIsIm1lbnVGdW5jcyIsInNob3VsZE9wZW5Qb3B1cCIsIm9wZW4iLCJidWlsZFVSTFN0cmluZyIsImZ1bGxQYXRoIiwiYXNzaWduSW4iLCJ0aXRsZSIsImNhcGl0YWxpemUiLCJwaWNrIiwib3BlbkRlc2NyaWJlIiwib3BlbkZvcm1hdHRpbmciLCJwcm9wYWdhdGVTdGF0ZSIsImZvcm1hdHRpbmdPcGVuIiwic2VsZWN0ZWRDb2xzIiwiaGlkZUNvbCIsImhpZGVDYWxsYmFjayIsInVwZGF0ZWRDb2x1bW5zIiwibWFwIiwiYyIsInZpc2libGUiLCJ0b2dnbGVWaXNpYmlsaXR5IiwiZGVsZXRlQ29sIiwieWVzQWN0aW9uIiwicmVqZWN0IiwiZGVsZXRlQ29sdW1uIiwibXNnIiwic2l6ZSIsInJlbmFtZUNvbCIsIm9wZW5BY3Rpb24iLCJhY3Rpb24iLCJjbG9zZU1lbnUiLCJoaWRlQ29sdW1uTWVudSIsIm1pbldpZHRoIiwiY20iLCJDTE9TRV9NRU5VIiwiZHR5cGUiLCJoYXNNaXNzaW5nIiwiaGFzT3V0bGllcnMiLCJsb3dWYXJpYW5jZSIsImJ1IiwiZmxhZ0ljb24iLCJhY3RpdmUiLCJjb2xvciIsIm5vb3AiLCJ1cGRhdGVTb3J0IiwibGFiZWwiLCJpY29uIiwiZnVuYyIsImhpbnQiLCJpY25TdHlsZSIsImxvY2tDb2xzIiwidW5sb2NrQ29scyIsImRpc3BsYXlOYW1lIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwic3RyaW5nIiwiYXJyYXkiLCJib29sIiwiaXNSZXF1aXJlZCIsIm5vSW5mbyIsIm91dGxpZXJGaWx0ZXJzIiwib2JqZWN0IiwiUmVkdXhDb2x1bW5NZW51IiwiY29ubmVjdCIsImRpc3BhdGNoIiwiY2hhcnRQcm9wcyIsImNvbE5hbWUiLCJhY3Rpb25zIiwiQ29sdW1uTWVudU9wdGlvbiIsImljb25DbGFzcyIsIkFzeW5jVmFsdWVTZWxlY3QiLCJzZWxlY3RlZCIsInVwZGF0ZVN0YXRlIiwiaW5wdXQiLCJmZXRjaEpzb25Qcm9taXNlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwicXMiLCJzdHJpbmdpZnkiLCJtaXNzaW5nIiwicHJvcGVydHkiLCJ1bmlxdWVzIiwidSIsInZhbHVlIiwicmVxdWlyZSIsImdldFN0eWxlcyIsImRpc3BsYXkiLCJ0cmFuc2l0aW9uIiwiYWxpZ25TZWxmIiwibGluZUhlaWdodCIsIm1hcmdpblJpZ2h0IiwidGV4dEFsaWduIiwidmVydGljYWxBbGlnbiIsImJ1aWxkU3RhdGUiLCJjb2xUeXBlIiwiZmluZENvbFR5cGUiLCJ1bmlxdWVDdCIsInVuaXF1ZV9jdCIsInF1ZXJ5QXBwbGllZCIsImxvYWRpbmdTdGF0ZSIsIkNvbHVtbkZpbHRlciIsImZldGNoRGF0YSIsInJlbmRlck1pc3NpbmdUb2dnbGUiLCJyZW5kZXJPdXRsaWVyVG9nZ2xlIiwicmVuZGVySWNvbiIsImZldGNoSnNvbiIsImRhdGEiLCJzdWNjZXNzIiwiY29sdW1uRmlsdGVycyIsInByZXZQcm9wcyIsImNmZyIsInVybCIsInNhdmVDb2xGaWx0ZXJVcmwiLCJKU09OIiwidXBkYXRlZFN0YXRlIiwiY3VyckZpbHRlcnMiLCJzaG93SWNvbiIsImJ1dHRvbkhhbmRsZXJzIiwiYnVpbGRIb3RrZXlIYW5kbGVycyIsIkZJTFRFUiIsInRvZ2dsZU1pc3NpbmciLCJ0b2dnbGVGaWx0ZXIiLCJ0b2dnbGVPdXRsaWVyRmlsdGVyVXJsIiwiRGVzY3JpcHRpb25zIiwiZmlsdGVyIiwibWFya3VwIiwic3RhcnRzV2l0aCIsIm1pc3NpbmdUb2dnbGUiLCJEYXRlRmlsdGVyIiwicHJldmlvdXNTZWxlY3Rpb24iLCJzdGFydCIsIm1pbiIsImVuZCIsIm1heCIsIm1hcFZhbHVlcyIsInYiLCJEYXRlIiwibW9tZW50IiwicHJvcCIsImlucHV0UmVmIiwiaW5wdXRSZWZWYWx1ZSIsImNmZ1ZhbCIsImZvcm1hdCIsImlucHV0UHJvcHMiLCJmb3JtYXREYXRlIiwiZGF0ZSIsInBhcnNlRGF0ZSIsInN0ciIsInBsYWNlaG9sZGVyIiwicG9wb3ZlclByb3BzIiwidXNlUG9ydGFsIiwibWluRGF0ZSIsIm1heERhdGUiLCJzaG93QWN0aW9uc0JhciIsImRpc2FibGVkIiwic3RhcnRJbnB1dCIsImVuZElucHV0IiwiTkUiLCJFUV9UT0dHTEUiLCJPUEVSQU5EUyIsImNvbmNhdCIsImNyZWF0ZVZhbHVlSW5wdXQiLCJvcGVyYW5kIiwiaW5jbHVkZXMiLCJtaW5pbXVtIiwibWF4aW11bSIsIk51bWVyaWNGaWx0ZXIiLCJyZW5kZXJPcGVyYW5kSW5wdXRzIiwicGFyc2VGdW5jIiwicGFyc2VJbnQiLCJwYXJzZUZsb2F0IiwidXBkYXRlQ2ZnRm9yVmFsIiwibnVtVmFsIiwiaXNOYU4iLCJyZXF1aXJlc0FzeW5jIiwibnVtYmVyIiwiU3RyaW5nRmlsdGVyIiwiY3VyckZpbHRlciIsIlZhbHVlU2VsZWN0IiwibyIsImNyZWF0ZUZpbHRlciIsImlnbm9yZUFjY2VudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFB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QUEwQixVQUFBa0csQ0FBQztBQUFBLGlCQUFLO0FBQUVoRyxpQkFBSyxFQUFFZ0c7QUFBVCxXQUFMO0FBQUEsU0FBM0IsQ0FMWDtBQU1FLHNCQUFjLEVBQUV2Tyw2Q0FBQyxDQUFDb0ksUUFBRixDQUFXLE9BQVgsQ0FObEI7QUFPRSxzQkFBYyxFQUFFcEksNkNBQUMsQ0FBQ29JLFFBQUYsQ0FBVyxPQUFYLENBUGxCO0FBUUUsYUFBSyxFQUFFLEtBQUtqTCxLQUFMLENBQVd5SyxRQVJwQjtBQVNFLGdCQUFRLEVBQUUsa0JBQUFBLFFBQVE7QUFBQSxpQkFBSSxNQUFJLENBQUNDLFdBQUwsQ0FBaUI7QUFBRUQsb0JBQVEsRUFBUkE7QUFBRixXQUFqQixDQUFKO0FBQUEsU0FUcEI7QUFVRSxtQkFBVyxNQVZiO0FBV0Usb0JBQVksRUFBRTRHLGlFQUFZLENBQUM7QUFBRUMsdUJBQWEsRUFBRTtBQUFqQixTQUFELENBWDVCLENBV3dEOztBQVh4RCxRQURGO0FBZUQ7Ozs7RUEzQnVCaFEsNENBQUssQ0FBQ0ksUzs7QUE2QmhDeVAsV0FBVyxDQUFDN0gsV0FBWixHQUEwQixhQUExQjtBQUNBNkgsV0FBVyxDQUFDNUgsU0FBWixHQUF3QjtBQUN0QjJCLFNBQU8sRUFBRTFCLGlEQUFTLENBQUNFLEtBREc7QUFFdEJzQixTQUFPLEVBQUV4QixpREFBUyxDQUFDRyxJQUZHO0FBR3RCZSxhQUFXLEVBQUVsQixpREFBUyxDQUFDUDtBQUhELENBQXhCO0FBTWVrSSwwRUFBZixFIiwiZmlsZSI6Im1haW4uMDNhOGQ0NTI5ZTYxYTNlYzZhMTMuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyh0cnVlKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi5jb2x1bW4tZmlsdGVyIC5TZWxlY3Qge1xcclxcbiAgbWluLXdpZHRoOiAxMWVtO1xcclxcbiAgbWF4LXdpZHRoOiAxMWVtO1xcclxcbn1cXHJcXG4uY29sdW1uLWZpbHRlciAuU2VsZWN0X19jb250cm9sIHtcXHJcXG4gIGhlaWdodDogYXV0bztcXHJcXG59XFxyXFxuLmNvbHVtbi1maWx0ZXIgLlNlbGVjdF9fdmFsdWUtY29udGFpbmVyIHtcXHJcXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xcclxcbiAgZGlzcGxheTogYmxvY2s7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbn1cXHJcXG4uY29sdW1uLWZpbHRlciAuU2VsZWN0X19pbmRpY2F0b3Ige1xcclxcbiAgcGFkZGluZzogMCA1cHggMCAwO1xcclxcbn1cXHJcXG4uY29sdW1uLWZpbHRlciAuU2VsZWN0X19jb250cm9sLS1pcy1kaXNhYmxlZCB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDEyOCwgMTI4LCAxMjgsIDAuMyk7XFxyXFxufVxcclxcbi5jb2x1bW4tZmlsdGVyIHNwYW4uYnAzLXBvcG92ZXItd3JhcHBlcixcXHJcXG4uY29sdW1uLWZpbHRlciBkaXYuYnAzLWlucHV0LWdyb3VwIHtcXHJcXG4gIHdpZHRoOiA1LjdlbTtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxufVxcclxcblxcclxcbi5jb2x1bW4tZmlsdGVyIGlucHV0LmJwMy1pbnB1dCB7XFxyXFxuICBoZWlnaHQ6IDIwcHg7XFxyXFxuICBsaW5lLWhlaWdodDogMjBweDtcXHJcXG4gIGZvbnQtc2l6ZTogMTJweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbHVtbi1maWx0ZXIgLmJwMy1pY29uLWRvdWJsZS1jYXJldC12ZXJ0aWNhbCB7XFxyXFxuICBtYXJnaW4tdG9wOiAtNXB4O1xcclxcbn1cXHJcXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJDb2x1bW5GaWx0ZXIuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsZUFBZTtFQUNmLGVBQWU7QUFDakI7QUFDQTtFQUNFLFlBQVk7QUFDZDtBQUNBO0VBQ0UsaUJBQWlCO0VBQ2pCLGNBQWM7RUFDZCxVQUFVO0FBQ1o7QUFDQTtFQUNFLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UsMENBQTBDO0FBQzVDO0FBQ0E7O0VBRUUsWUFBWTtFQUNaLFVBQVU7QUFDWjs7QUFFQTtFQUNFLFlBQVk7RUFDWixpQkFBaUI7RUFDakIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQlwiLFwiZmlsZVwiOlwiQ29sdW1uRmlsdGVyLmNzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIuY29sdW1uLWZpbHRlciAuU2VsZWN0IHtcXHJcXG4gIG1pbi13aWR0aDogMTFlbTtcXHJcXG4gIG1heC13aWR0aDogMTFlbTtcXHJcXG59XFxyXFxuLmNvbHVtbi1maWx0ZXIgLlNlbGVjdF9fY29udHJvbCB7XFxyXFxuICBoZWlnaHQ6IGF1dG87XFxyXFxufVxcclxcbi5jb2x1bW4tZmlsdGVyIC5TZWxlY3RfX3ZhbHVlLWNvbnRhaW5lciB7XFxyXFxuICBvdmVyZmxvdzogdmlzaWJsZTtcXHJcXG4gIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgcGFkZGluZzogMDtcXHJcXG59XFxyXFxuLmNvbHVtbi1maWx0ZXIgLlNlbGVjdF9faW5kaWNhdG9yIHtcXHJcXG4gIHBhZGRpbmc6IDAgNXB4IDAgMDtcXHJcXG59XFxyXFxuLmNvbHVtbi1maWx0ZXIgLlNlbGVjdF9fY29udHJvbC0taXMtZGlzYWJsZWQge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMjgsIDEyOCwgMTI4LCAwLjMpO1xcclxcbn1cXHJcXG4uY29sdW1uLWZpbHRlciBzcGFuLmJwMy1wb3BvdmVyLXdyYXBwZXIsXFxyXFxuLmNvbHVtbi1maWx0ZXIgZGl2LmJwMy1pbnB1dC1ncm91cCB7XFxyXFxuICB3aWR0aDogNS43ZW07XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4uY29sdW1uLWZpbHRlciBpbnB1dC5icDMtaW5wdXQge1xcclxcbiAgaGVpZ2h0OiAyMHB4O1xcclxcbiAgbGluZS1oZWlnaHQ6IDIwcHg7XFxyXFxuICBmb250LXNpemU6IDEycHg7XFxyXFxufVxcclxcblxcclxcbi5jb2x1bW4tZmlsdGVyIC5icDMtaWNvbi1kb3VibGUtY2FyZXQtdmVydGljYWwge1xcclxcbiAgbWFyZ2luLXRvcDogLTVweDtcXHJcXG59XFxyXFxuXCJdfV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0ICdtZW1vaXplLW9uZSc7XG5pbXBvcnQgJ0BlbW90aW9uL2NvcmUnO1xuaW1wb3J0ICdyZWFjdC1kb20nO1xuaW1wb3J0ICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGsgYXMgaGFuZGxlSW5wdXRDaGFuZ2UgfSBmcm9tICcuLi8uLi9kaXN0L3V0aWxzLTA2YjBkNWE0LmJyb3dzZXIuZXNtLmpzJztcbmltcG9ydCAnLi4vLi4vZGlzdC9pbmRleC00MzIyYzBlZC5icm93c2VyLmVzbS5qcyc7XG5pbXBvcnQgeyBTIGFzIFNlbGVjdCB9IGZyb20gJy4uLy4uL2Rpc3QvU2VsZWN0LTlmZGI4Y2QwLmJyb3dzZXIuZXNtLmpzJztcbmltcG9ydCAnQGVtb3Rpb24vY3NzJztcbmltcG9ydCAncmVhY3QtaW5wdXQtYXV0b3NpemUnO1xuaW1wb3J0IHsgbSBhcyBtYW5hZ2VTdGF0ZSB9IGZyb20gJy4uLy4uL2Rpc3Qvc3RhdGVNYW5hZ2VyLTA0ZjczNGEyLmJyb3dzZXIuZXNtLmpzJztcblxuZnVuY3Rpb24gX2V4dGVuZHMoKSB7IF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTsgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH1cblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCkgeyBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTsgdmFyIHRhcmdldCA9IHt9OyB2YXIgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7IHZhciBrZXksIGk7IGZvciAoaSA9IDA7IGkgPCBzb3VyY2VLZXlzLmxlbmd0aDsgaSsrKSB7IGtleSA9IHNvdXJjZUtleXNbaV07IGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTsgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cbnZhciBkZWZhdWx0UHJvcHMgPSB7XG4gIGNhY2hlT3B0aW9uczogZmFsc2UsXG4gIGRlZmF1bHRPcHRpb25zOiBmYWxzZSxcbiAgZmlsdGVyT3B0aW9uOiBudWxsLFxuICBpc0xvYWRpbmc6IGZhbHNlXG59O1xudmFyIG1ha2VBc3luY1NlbGVjdCA9IGZ1bmN0aW9uIG1ha2VBc3luY1NlbGVjdChTZWxlY3RDb21wb25lbnQpIHtcbiAgdmFyIF9jbGFzcywgX3RlbXA7XG5cbiAgcmV0dXJuIF90ZW1wID0gX2NsYXNzID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICAgIF9pbmhlcml0c0xvb3NlKEFzeW5jLCBfQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIEFzeW5jKHByb3BzKSB7XG4gICAgICB2YXIgX3RoaXM7XG5cbiAgICAgIF90aGlzID0gX0NvbXBvbmVudC5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICBfdGhpcy5zZWxlY3QgPSB2b2lkIDA7XG4gICAgICBfdGhpcy5sYXN0UmVxdWVzdCA9IHZvaWQgMDtcbiAgICAgIF90aGlzLm1vdW50ZWQgPSBmYWxzZTtcbiAgICAgIF90aGlzLm9wdGlvbnNDYWNoZSA9IHt9O1xuXG4gICAgICBfdGhpcy5oYW5kbGVJbnB1dENoYW5nZSA9IGZ1bmN0aW9uIChuZXdWYWx1ZSwgYWN0aW9uTWV0YSkge1xuICAgICAgICB2YXIgX3RoaXMkcHJvcHMgPSBfdGhpcy5wcm9wcyxcbiAgICAgICAgICAgIGNhY2hlT3B0aW9ucyA9IF90aGlzJHByb3BzLmNhY2hlT3B0aW9ucyxcbiAgICAgICAgICAgIG9uSW5wdXRDaGFuZ2UgPSBfdGhpcyRwcm9wcy5vbklucHV0Q2hhbmdlOyAvLyBUT0RPXG5cbiAgICAgICAgdmFyIGlucHV0VmFsdWUgPSBoYW5kbGVJbnB1dENoYW5nZShuZXdWYWx1ZSwgYWN0aW9uTWV0YSwgb25JbnB1dENoYW5nZSk7XG5cbiAgICAgICAgaWYgKCFpbnB1dFZhbHVlKSB7XG4gICAgICAgICAgZGVsZXRlIF90aGlzLmxhc3RSZXF1ZXN0O1xuXG4gICAgICAgICAgX3RoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaW5wdXRWYWx1ZTogJycsXG4gICAgICAgICAgICBsb2FkZWRJbnB1dFZhbHVlOiAnJyxcbiAgICAgICAgICAgIGxvYWRlZE9wdGlvbnM6IFtdLFxuICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIHBhc3NFbXB0eU9wdGlvbnM6IGZhbHNlXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2FjaGVPcHRpb25zICYmIF90aGlzLm9wdGlvbnNDYWNoZVtpbnB1dFZhbHVlXSkge1xuICAgICAgICAgIF90aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGlucHV0VmFsdWU6IGlucHV0VmFsdWUsXG4gICAgICAgICAgICBsb2FkZWRJbnB1dFZhbHVlOiBpbnB1dFZhbHVlLFxuICAgICAgICAgICAgbG9hZGVkT3B0aW9uczogX3RoaXMub3B0aW9uc0NhY2hlW2lucHV0VmFsdWVdLFxuICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIHBhc3NFbXB0eU9wdGlvbnM6IGZhbHNlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHJlcXVlc3QgPSBfdGhpcy5sYXN0UmVxdWVzdCA9IHt9O1xuXG4gICAgICAgICAgX3RoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaW5wdXRWYWx1ZTogaW5wdXRWYWx1ZSxcbiAgICAgICAgICAgIGlzTG9hZGluZzogdHJ1ZSxcbiAgICAgICAgICAgIHBhc3NFbXB0eU9wdGlvbnM6ICFfdGhpcy5zdGF0ZS5sb2FkZWRJbnB1dFZhbHVlXG4gICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMubG9hZE9wdGlvbnMoaW5wdXRWYWx1ZSwgZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgaWYgKCFfdGhpcy5tb3VudGVkKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5vcHRpb25zQ2FjaGVbaW5wdXRWYWx1ZV0gPSBvcHRpb25zO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKHJlcXVlc3QgIT09IF90aGlzLmxhc3RSZXF1ZXN0KSByZXR1cm47XG4gICAgICAgICAgICAgIGRlbGV0ZSBfdGhpcy5sYXN0UmVxdWVzdDtcblxuICAgICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBsb2FkZWRJbnB1dFZhbHVlOiBpbnB1dFZhbHVlLFxuICAgICAgICAgICAgICAgIGxvYWRlZE9wdGlvbnM6IG9wdGlvbnMgfHwgW10sXG4gICAgICAgICAgICAgICAgcGFzc0VtcHR5T3B0aW9uczogZmFsc2VcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbnB1dFZhbHVlO1xuICAgICAgfTtcblxuICAgICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICAgIGRlZmF1bHRPcHRpb25zOiBBcnJheS5pc0FycmF5KHByb3BzLmRlZmF1bHRPcHRpb25zKSA/IHByb3BzLmRlZmF1bHRPcHRpb25zIDogdW5kZWZpbmVkLFxuICAgICAgICBpbnB1dFZhbHVlOiB0eXBlb2YgcHJvcHMuaW5wdXRWYWx1ZSAhPT0gJ3VuZGVmaW5lZCcgPyBwcm9wcy5pbnB1dFZhbHVlIDogJycsXG4gICAgICAgIGlzTG9hZGluZzogcHJvcHMuZGVmYXVsdE9wdGlvbnMgPT09IHRydWUsXG4gICAgICAgIGxvYWRlZE9wdGlvbnM6IFtdLFxuICAgICAgICBwYXNzRW1wdHlPcHRpb25zOiBmYWxzZVxuICAgICAgfTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICB2YXIgX3Byb3RvID0gQXN5bmMucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdGhpcy5tb3VudGVkID0gdHJ1ZTtcbiAgICAgIHZhciBkZWZhdWx0T3B0aW9ucyA9IHRoaXMucHJvcHMuZGVmYXVsdE9wdGlvbnM7XG4gICAgICB2YXIgaW5wdXRWYWx1ZSA9IHRoaXMuc3RhdGUuaW5wdXRWYWx1ZTtcblxuICAgICAgaWYgKGRlZmF1bHRPcHRpb25zID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMubG9hZE9wdGlvbnMoaW5wdXRWYWx1ZSwgZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICBpZiAoIV90aGlzMi5tb3VudGVkKSByZXR1cm47XG4gICAgICAgICAgdmFyIGlzTG9hZGluZyA9ICEhX3RoaXMyLmxhc3RSZXF1ZXN0O1xuXG4gICAgICAgICAgX3RoaXMyLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRlZmF1bHRPcHRpb25zOiBvcHRpb25zIHx8IFtdLFxuICAgICAgICAgICAgaXNMb2FkaW5nOiBpc0xvYWRpbmdcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90by5VTlNBRkVfY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9IGZ1bmN0aW9uIFVOU0FGRV9jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgLy8gaWYgdGhlIGNhY2hlT3B0aW9ucyBwcm9wIGNoYW5nZXMsIGNsZWFyIHRoZSBjYWNoZVxuICAgICAgaWYgKG5leHRQcm9wcy5jYWNoZU9wdGlvbnMgIT09IHRoaXMucHJvcHMuY2FjaGVPcHRpb25zKSB7XG4gICAgICAgIHRoaXMub3B0aW9uc0NhY2hlID0ge307XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXh0UHJvcHMuZGVmYXVsdE9wdGlvbnMgIT09IHRoaXMucHJvcHMuZGVmYXVsdE9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgZGVmYXVsdE9wdGlvbnM6IEFycmF5LmlzQXJyYXkobmV4dFByb3BzLmRlZmF1bHRPcHRpb25zKSA/IG5leHRQcm9wcy5kZWZhdWx0T3B0aW9ucyA6IHVuZGVmaW5lZFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3Byb3RvLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICB0aGlzLm1vdW50ZWQgPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgX3Byb3RvLmZvY3VzID0gZnVuY3Rpb24gZm9jdXMoKSB7XG4gICAgICB0aGlzLnNlbGVjdC5mb2N1cygpO1xuICAgIH07XG5cbiAgICBfcHJvdG8uYmx1ciA9IGZ1bmN0aW9uIGJsdXIoKSB7XG4gICAgICB0aGlzLnNlbGVjdC5ibHVyKCk7XG4gICAgfTtcblxuICAgIF9wcm90by5sb2FkT3B0aW9ucyA9IGZ1bmN0aW9uIGxvYWRPcHRpb25zKGlucHV0VmFsdWUsIGNhbGxiYWNrKSB7XG4gICAgICB2YXIgbG9hZE9wdGlvbnMgPSB0aGlzLnByb3BzLmxvYWRPcHRpb25zO1xuICAgICAgaWYgKCFsb2FkT3B0aW9ucykgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICB2YXIgbG9hZGVyID0gbG9hZE9wdGlvbnMoaW5wdXRWYWx1ZSwgY2FsbGJhY2spO1xuXG4gICAgICBpZiAobG9hZGVyICYmIHR5cGVvZiBsb2FkZXIudGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBsb2FkZXIudGhlbihjYWxsYmFjaywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjaygpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICB2YXIgX3RoaXMkcHJvcHMyID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBsb2FkT3B0aW9ucyA9IF90aGlzJHByb3BzMi5sb2FkT3B0aW9ucyxcbiAgICAgICAgICBpc0xvYWRpbmdQcm9wID0gX3RoaXMkcHJvcHMyLmlzTG9hZGluZyxcbiAgICAgICAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKF90aGlzJHByb3BzMiwgW1wibG9hZE9wdGlvbnNcIiwgXCJpc0xvYWRpbmdcIl0pO1xuXG4gICAgICB2YXIgX3RoaXMkc3RhdGUgPSB0aGlzLnN0YXRlLFxuICAgICAgICAgIGRlZmF1bHRPcHRpb25zID0gX3RoaXMkc3RhdGUuZGVmYXVsdE9wdGlvbnMsXG4gICAgICAgICAgaW5wdXRWYWx1ZSA9IF90aGlzJHN0YXRlLmlucHV0VmFsdWUsXG4gICAgICAgICAgaXNMb2FkaW5nID0gX3RoaXMkc3RhdGUuaXNMb2FkaW5nLFxuICAgICAgICAgIGxvYWRlZElucHV0VmFsdWUgPSBfdGhpcyRzdGF0ZS5sb2FkZWRJbnB1dFZhbHVlLFxuICAgICAgICAgIGxvYWRlZE9wdGlvbnMgPSBfdGhpcyRzdGF0ZS5sb2FkZWRPcHRpb25zLFxuICAgICAgICAgIHBhc3NFbXB0eU9wdGlvbnMgPSBfdGhpcyRzdGF0ZS5wYXNzRW1wdHlPcHRpb25zO1xuICAgICAgdmFyIG9wdGlvbnMgPSBwYXNzRW1wdHlPcHRpb25zID8gW10gOiBpbnB1dFZhbHVlICYmIGxvYWRlZElucHV0VmFsdWUgPyBsb2FkZWRPcHRpb25zIDogZGVmYXVsdE9wdGlvbnMgfHwgW107XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3RDb21wb25lbnQsIF9leHRlbmRzKHt9LCBwcm9wcywge1xuICAgICAgICByZWY6IGZ1bmN0aW9uIHJlZihfcmVmKSB7XG4gICAgICAgICAgX3RoaXMzLnNlbGVjdCA9IF9yZWY7XG4gICAgICAgIH0sXG4gICAgICAgIG9wdGlvbnM6IG9wdGlvbnMsXG4gICAgICAgIGlzTG9hZGluZzogaXNMb2FkaW5nIHx8IGlzTG9hZGluZ1Byb3AsXG4gICAgICAgIG9uSW5wdXRDaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2VcbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEFzeW5jO1xuICB9KENvbXBvbmVudCksIF9jbGFzcy5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHMsIF90ZW1wO1xufTtcbnZhciBTZWxlY3RTdGF0ZSA9IG1hbmFnZVN0YXRlKFNlbGVjdCk7XG52YXIgQXN5bmMgPSBtYWtlQXN5bmNTZWxlY3QoU2VsZWN0U3RhdGUpO1xuXG5leHBvcnQgZGVmYXVsdCBBc3luYztcbmV4cG9ydCB7IGRlZmF1bHRQcm9wcywgbWFrZUFzeW5jU2VsZWN0IH07XG4iLCJpbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEdsb2JhbEhvdEtleXMgfSBmcm9tIFwicmVhY3QtaG90a2V5c1wiO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XHJcblxyXG5pbXBvcnQgQ29uZGl0aW9uYWxSZW5kZXIgZnJvbSBcIi4uLy4uL0NvbmRpdGlvbmFsUmVuZGVyXCI7XHJcbmltcG9ydCB7IG9wZW5DaGFydCB9IGZyb20gXCIuLi8uLi9hY3Rpb25zL2NoYXJ0c1wiO1xyXG5pbXBvcnQgYWN0aW9ucyBmcm9tIFwiLi4vLi4vYWN0aW9ucy9kdGFsZVwiO1xyXG5pbXBvcnQgeyBidWlsZFVSTFN0cmluZyB9IGZyb20gXCIuLi8uLi9hY3Rpb25zL3VybC11dGlsc1wiO1xyXG5pbXBvcnQgQ29sdW1uRmlsdGVyIGZyb20gXCIuLi8uLi9maWx0ZXJzL0NvbHVtbkZpbHRlclwiO1xyXG5pbXBvcnQgYnUgZnJvbSBcIi4uL2JhY2tncm91bmRVdGlsc1wiO1xyXG5pbXBvcnQgeyBleHBvcnRzIGFzIGd1IH0gZnJvbSBcIi4uL2dyaWRVdGlsc1wiO1xyXG5pbXBvcnQgbWVudUZ1bmNzIGZyb20gXCIuLi9tZW51L2RhdGFWaWV3ZXJNZW51VXRpbHNcIjtcclxuaW1wb3J0IHNlcnZlclN0YXRlIGZyb20gXCIuLi9zZXJ2ZXJTdGF0ZU1hbmFnZW1lbnRcIjtcclxuaW1wb3J0IENvbHVtbk1lbnVPcHRpb24gZnJvbSBcIi4vQ29sdW1uTWVudU9wdGlvblwiO1xyXG5cclxuY29uc3QgeyBST1dfSEVJR0hULCBTT1JUX1BST1BTIH0gPSBndTtcclxuY29uc3QgTU9WRV9DT0xTID0gW1xyXG4gIFtcInN0ZXAtYmFja3dhcmRcIiwgc2VydmVyU3RhdGUubW92ZVRvRnJvbnQsIFwiTW92ZSBDb2x1bW4gVG8gRnJvbnRcIiwge31dLFxyXG4gIFtcImNhcmV0LWxlZnRcIiwgc2VydmVyU3RhdGUubW92ZUxlZnQsIFwiTW92ZSBDb2x1bW4gTGVmdFwiLCB7IGZvbnRTaXplOiBcIjEuMmVtXCIsIHBhZGRpbmc6IDAsIHdpZHRoOiBcIjEuM2VtXCIgfV0sXHJcbiAgW1wiY2FyZXQtcmlnaHRcIiwgc2VydmVyU3RhdGUubW92ZVJpZ2h0LCBcIk1vdmUgQ29sdW1uIFJpZ2h0XCIsIHsgZm9udFNpemU6IFwiMS4yZW1cIiwgcGFkZGluZzogMCwgd2lkdGg6IFwiMS4zZW1cIiB9XSxcclxuICBbXCJzdGVwLWZvcndhcmRcIiwgc2VydmVyU3RhdGUubW92ZVRvQmFjaywgXCJNb3ZlIENvbHVtbiBUbyBCYWNrXCIsIHt9XSxcclxuXTtcclxuXHJcbmZ1bmN0aW9uIGJ1aWxkQ2FyZXRDbGFzcyhjYXJldFBjdCA9IDkwKSB7XHJcbiAgY29uc3QgbGFzdENhcmV0U3R5bGUgPSBfLmdldCgkKFwiaGVhZFwiKS5maW5kKFwic3R5bGU6bGFzdC1jaGlsZFwiKSwgXCIwLmlubmVySFRNTFwiKTtcclxuICBpZiAoXy5lbmRzV2l0aChsYXN0Q2FyZXRTdHlsZSB8fCBcIlwiLCBcIi5jb2x1bW4tdG9nZ2xlX19kcm9wZG93bjo6YWZ0ZXIge3JpZ2h0OiBcIiArIGNhcmV0UGN0ICsgXCIlfVwiKSkge1xyXG4gICAgcmV0dXJuOyAvLyBkb24ndCBjb250aW51YWxseSBhZGQgc3R5bGluZyBpZiBpdHMgYWxyZWFkeSBzZXRcclxuICB9XHJcbiAgY29uc3QgZmluYWxDYXJldFBjdCA9IF8uaXNVbmRlZmluZWQoY2FyZXRQY3QpID8gOTAgOiBjYXJldFBjdDtcclxuICBsZXQgY2FyZXRTdHlsZSA9IFwiPHN0eWxlPlwiO1xyXG4gIGNhcmV0U3R5bGUgKz0gXCIuY29sdW1uLXRvZ2dsZV9fZHJvcGRvd246OmJlZm9yZSB7cmlnaHQ6IFwiICsgZmluYWxDYXJldFBjdCArIFwiJX1cIjtcclxuICBjYXJldFN0eWxlICs9IFwiLmNvbHVtbi10b2dnbGVfX2Ryb3Bkb3duOjphZnRlciB7cmlnaHQ6IFwiICsgZmluYWxDYXJldFBjdCArIFwiJX1cIjtcclxuICBjYXJldFN0eWxlICs9IFwiPC9zdHlsZT5cIjtcclxuICAkKFwiaGVhZFwiKS5hcHBlbmQoY2FyZXRTdHlsZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBvc2l0aW9uTWVudShzZWxlY3RlZFRvZ2dsZSwgbWVudURpdikge1xyXG4gIGNvbnN0IGN1cnJMZWZ0ID0gXy5nZXQoc2VsZWN0ZWRUb2dnbGUub2Zmc2V0KCksIFwibGVmdFwiLCAwKTtcclxuICBjb25zdCBjdXJyVG9wID0gXy5nZXQoc2VsZWN0ZWRUb2dnbGUub2Zmc2V0KCksIFwidG9wXCIsIDApO1xyXG4gIGNvbnN0IGRpdldpZHRoID0gbWVudURpdi53aWR0aCgpO1xyXG4gIGNvbnN0IGNzcyA9IHt9O1xyXG4gIGlmIChjdXJyTGVmdCArIGRpdldpZHRoID4gd2luZG93LmlubmVyV2lkdGgpIHtcclxuICAgIGNvbnN0IGZpbmFsTGVmdCA9IGN1cnJMZWZ0IC0gKGN1cnJMZWZ0ICsgZGl2V2lkdGggKyAyMCAtIHdpbmRvdy5pbm5lcldpZHRoKTtcclxuICAgIGNzcy5sZWZ0ID0gZmluYWxMZWZ0O1xyXG4gICAgY29uc3Qgb3ZlcmxhcFBjdCA9IChjdXJyTGVmdCAtIChmaW5hbExlZnQgLSAyMCkpIC8gZGl2V2lkdGg7XHJcbiAgICBjb25zdCBjYXJldFBjdCA9IE1hdGguZmxvb3IoMTAwIC0gb3ZlcmxhcFBjdCAqIDEwMCk7XHJcbiAgICBidWlsZENhcmV0Q2xhc3MoY2FyZXRQY3QpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjc3MubGVmdCA9IGN1cnJMZWZ0O1xyXG4gICAgYnVpbGRDYXJldENsYXNzKCk7XHJcbiAgfVxyXG4gIGNzcy50b3AgPSBjdXJyVG9wICsgUk9XX0hFSUdIVCAtIDY7XHJcbiAgbWVudURpdi5jc3MoY3NzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaWdub3JlTWVudUNsaWNrcyhlKSB7XHJcbiAgY29uc3QgY29sRmlsdGVyID0gJChcImRpdi5jb2x1bW4tZmlsdGVyXCIpO1xyXG4gIGlmIChjb2xGaWx0ZXIgJiYgKGNvbEZpbHRlci5pcyhlLnRhcmdldCkgfHwgY29sRmlsdGVyLmhhcyhlLnRhcmdldCkubGVuZ3RoID4gMCkpIHtcclxuICAgIHJldHVybiB0cnVlOyAvLyBpZ25vcmUgZmlsdGVyIGNsaWNrc1xyXG4gIH1cclxuICBpZiAoY29sRmlsdGVyICYmICQoZS50YXJnZXQpLmhhc0NsYXNzKFwiU2VsZWN0X19vcHRpb25cIikpIHtcclxuICAgIHJldHVybiB0cnVlOyAvLyBpZ25vcmUgb3B0aW9uIHNlbGVjdGlvblxyXG4gIH1cclxuICBpZiAoY29sRmlsdGVyICYmIGUudGFyZ2V0Lm5vZGVOYW1lID09PSBcInN2Z1wiKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTsgLy8gaWdub3JlIG9wdGlvbiBzZWxlY3Rpb25cclxuICB9XHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5jbGFzcyBSZWFjdENvbHVtbk1lbnUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uID0gdGhpcy51cGRhdGVQb3NpdGlvbi5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlUG9zaXRpb24oKSB7XHJcbiAgICBpZiAoIV8uaXNOdWxsKHRoaXMucHJvcHMuc2VsZWN0ZWRDb2wpKSB7XHJcbiAgICAgIHBvc2l0aW9uTWVudSgkKGBkaXYuJHt0aGlzLnByb3BzLnNlbGVjdGVkVG9nZ2xlfWApLCAkKHRoaXMuX2RpdikpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xyXG4gICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBjb2x1bW5NZW51T3BlbiwgZGF0YUlkLCBzZWxlY3RlZENvbCwgb3BlbkNoYXJ0IH0gPSB0aGlzLnByb3BzO1xyXG4gICAgaWYgKCFzZWxlY3RlZENvbCkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGNvbnN0IGNvbENmZyA9IF8uZmluZCh0aGlzLnByb3BzLmNvbHVtbnMsIHsgbmFtZTogc2VsZWN0ZWRDb2wgfSkgfHwge307XHJcbiAgICBjb25zdCB1bmxvY2tlZCA9IF8uZ2V0KGNvbENmZywgXCJsb2NrZWRcIiwgZmFsc2UpID09PSBmYWxzZTtcclxuICAgIGxldCBjdXJyRGlyID0gXy5maW5kKHRoaXMucHJvcHMuc29ydEluZm8sIChbY29sLCBfZGlyXSkgPT4gc2VsZWN0ZWRDb2wgPT09IGNvbCk7XHJcbiAgICBjdXJyRGlyID0gXy5pc1VuZGVmaW5lZChjdXJyRGlyKSA/IFNPUlRfUFJPUFNbMl0uZGlyIDogY3VyckRpclsxXTtcclxuICAgIGNvbnN0IG9wZW5Qb3B1cCA9ICh0eXBlLCBoZWlnaHQgPSA0NTAsIHdpZHRoID0gNTAwKSA9PiAoKSA9PiB7XHJcbiAgICAgIGlmIChtZW51RnVuY3Muc2hvdWxkT3BlblBvcHVwKGhlaWdodCwgd2lkdGgpKSB7XHJcbiAgICAgICAgbWVudUZ1bmNzLm9wZW4oXHJcbiAgICAgICAgICBidWlsZFVSTFN0cmluZyhtZW51RnVuY3MuZnVsbFBhdGgoYC9kdGFsZS9wb3B1cC8ke3R5cGV9YCwgZGF0YUlkKSwge1xyXG4gICAgICAgICAgICBzZWxlY3RlZENvbCxcclxuICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgbnVsbCxcclxuICAgICAgICAgIGhlaWdodCxcclxuICAgICAgICAgIHdpZHRoXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBvcGVuQ2hhcnQoXHJcbiAgICAgICAgICBfLmFzc2lnbkluKFxyXG4gICAgICAgICAgICB7IHR5cGUsIHRpdGxlOiBfLmNhcGl0YWxpemUodHlwZSkgfSxcclxuICAgICAgICAgICAgXy5waWNrKHRoaXMucHJvcHMsIFtcInNlbGVjdGVkQ29sXCIsIFwicHJvcGFnYXRlU3RhdGVcIiwgXCJjb2x1bW5zXCJdKVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICBjb25zdCBvcGVuRGVzY3JpYmUgPSAoKSA9PlxyXG4gICAgICB3aW5kb3cub3BlbihcclxuICAgICAgICBidWlsZFVSTFN0cmluZyhtZW51RnVuY3MuZnVsbFBhdGgoXCIvZHRhbGUvcG9wdXAvZGVzY3JpYmVcIiwgZGF0YUlkKSwge1xyXG4gICAgICAgICAgc2VsZWN0ZWRDb2wsXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgXCJfYmxhbmtcIlxyXG4gICAgICApO1xyXG4gICAgY29uc3Qgb3BlbkZvcm1hdHRpbmcgPSAoKSA9PlxyXG4gICAgICB0aGlzLnByb3BzLnByb3BhZ2F0ZVN0YXRlKHtcclxuICAgICAgICBmb3JtYXR0aW5nT3BlbjogdHJ1ZSxcclxuICAgICAgICBzZWxlY3RlZENvbHM6IFtzZWxlY3RlZENvbF0sXHJcbiAgICAgIH0pO1xyXG4gICAgY29uc3QgaGlkZUNvbCA9ICgpID0+IHtcclxuICAgICAgY29uc3QgaGlkZUNhbGxiYWNrID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVwZGF0ZWRDb2x1bW5zID0gXy5tYXAodGhpcy5wcm9wcy5jb2x1bW5zLCBjID0+XHJcbiAgICAgICAgICBfLmFzc2lnbkluKHt9LCBjLCBjLm5hbWUgPT09IHNlbGVjdGVkQ29sID8geyB2aXNpYmxlOiAhYy52aXNpYmxlIH0gOiB7fSlcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMucHJvcHMucHJvcGFnYXRlU3RhdGUoeyBjb2x1bW5zOiB1cGRhdGVkQ29sdW1ucyB9KTtcclxuICAgICAgfTtcclxuICAgICAgc2VydmVyU3RhdGUudG9nZ2xlVmlzaWJpbGl0eShkYXRhSWQsIHNlbGVjdGVkQ29sLCBoaWRlQ2FsbGJhY2spO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IGRlbGV0ZUNvbCA9ICgpID0+IHtcclxuICAgICAgY29uc3QgeWVzQWN0aW9uID0gKCkgPT5cclxuICAgICAgICB0aGlzLnByb3BzLnByb3BhZ2F0ZVN0YXRlKFxyXG4gICAgICAgICAgeyBjb2x1bW5zOiBfLnJlamVjdCh0aGlzLnByb3BzLmNvbHVtbnMsIHsgbmFtZTogc2VsZWN0ZWRDb2wgfSkgfSxcclxuICAgICAgICAgIHNlcnZlclN0YXRlLmRlbGV0ZUNvbHVtbihkYXRhSWQsIHNlbGVjdGVkQ29sKVxyXG4gICAgICAgICk7XHJcbiAgICAgIGNvbnN0IG1zZyA9IGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoZSBjb2x1bW4gXCIke3NlbGVjdGVkQ29sfVwiP2A7XHJcbiAgICAgIGNvbnN0IHRpdGxlID0gYERlbGV0ZSBjb2x1bW4gLSAke3NlbGVjdGVkQ29sfWA7XHJcbiAgICAgIG9wZW5DaGFydCh7IHR5cGU6IFwiY29uZmlybVwiLCB0aXRsZSwgbXNnLCB5ZXNBY3Rpb24sIHNpemU6IFwibW9kYWwtc21cIiB9KTtcclxuICAgIH07XHJcbiAgICBjb25zdCByZW5hbWVDb2wgPSAoKSA9PlxyXG4gICAgICBvcGVuQ2hhcnQoe1xyXG4gICAgICAgIHR5cGU6IFwicmVuYW1lXCIsXHJcbiAgICAgICAgc2VsZWN0ZWRDb2wsXHJcbiAgICAgICAgY29sdW1uczogdGhpcy5wcm9wcy5jb2x1bW5zLFxyXG4gICAgICAgIHNpemU6IFwibW9kYWwtc21cIixcclxuICAgICAgfSk7XHJcbiAgICBjb25zdCBvcGVuQWN0aW9uID0gYWN0aW9uID0+IG9wZW5Qb3B1cChhY3Rpb24sIDQwMCwgNzcwKTtcclxuICAgIGNvbnN0IGNsb3NlTWVudSA9ICgpID0+IHRoaXMucHJvcHMuaGlkZUNvbHVtbk1lbnUoc2VsZWN0ZWRDb2wpO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdlxyXG4gICAgICAgIGlkPVwiY29sdW1uLW1lbnUtZGl2XCJcclxuICAgICAgICBjbGFzc05hbWU9XCJjb2x1bW4tdG9nZ2xlX19kcm9wZG93blwiXHJcbiAgICAgICAgaGlkZGVuPXshY29sdW1uTWVudU9wZW59XHJcbiAgICAgICAgc3R5bGU9e3sgbWluV2lkdGg6IFwiMTFlbVwiIH19XHJcbiAgICAgICAgcmVmPXtjbSA9PiAodGhpcy5fZGl2ID0gY20pfT5cclxuICAgICAgICB7Y29sdW1uTWVudU9wZW4gJiYgPEdsb2JhbEhvdEtleXMga2V5TWFwPXt7IENMT1NFX01FTlU6IFwiZXNjXCIgfX0gaGFuZGxlcnM9e3sgQ0xPU0VfTUVOVTogY2xvc2VNZW51IH19IC8+fVxyXG4gICAgICAgIDxoZWFkZXI+XHJcbiAgICAgICAgICA8c3Bhbj57YENvbHVtbiBcIiR7c2VsZWN0ZWRDb2x9XCJgfTwvc3Bhbj5cclxuICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJjb2wtbWVudS1kZXNjcmlwdG9yc1wiPlxyXG4gICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAge1wiRGF0YSBUeXBlOlwifVxyXG4gICAgICAgICAgICAgIDxzcGFuPntjb2xDZmcuZHR5cGV9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICB7Y29sQ2ZnLmhhc01pc3NpbmcgPiAwICYmIChcclxuICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICB7XCIjIE1pc3Npbmc6XCJ9XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj57Y29sQ2ZnLmhhc01pc3Npbmd9PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIHtjb2xDZmcuaGFzT3V0bGllcnMgPiAwICYmIChcclxuICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICB7XCIjIE91dGxpZXJzOlwifVxyXG4gICAgICAgICAgICAgICAgPHNwYW4+e2NvbENmZy5oYXNPdXRsaWVyc308L3NwYW4+XHJcbiAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAge2NvbENmZy5sb3dWYXJpYW5jZSAmJiAoXHJcbiAgICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAge2Ake2J1LmZsYWdJY29ufUxvdyBWYXJpYW5jZTpgfVxyXG4gICAgICAgICAgICAgICAgPHNwYW4+VHJ1ZTwvc3Bhbj5cclxuICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgPC91bD5cclxuICAgICAgICA8L2hlYWRlcj5cclxuICAgICAgICA8dWw+XHJcbiAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRvZ2dsZXItYWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtc29ydCBtbC00IG1yLTRcIiAvPlxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIGNvbXBhY3QgbS1hdXRvIGZvbnQtd2VpZ2h0LWJvbGQgY29sdW1uLXNvcnRpbmdcIj5cclxuICAgICAgICAgICAgICB7Xy5tYXAoU09SVF9QUk9QUywgKHsgZGlyLCBjb2wgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gZGlyID09PSBjdXJyRGlyO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgIGtleT17ZGlyfVxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXthY3RpdmUgPyB7fSA6IHsgY29sb3I6IFwiIzU2NWI2OFwiIH19XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYnRuIGJ0bi1wcmltYXJ5ICR7YWN0aXZlID8gXCJhY3RpdmVcIiA6IFwiXCJ9IGZvbnQtd2VpZ2h0LWJvbGRgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2FjdGl2ZSA/IF8ubm9vcCA6ICgpID0+IG1lbnVGdW5jcy51cGRhdGVTb3J0KFtzZWxlY3RlZENvbF0sIGRpciwgdGhpcy5wcm9wcyl9XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2FjdGl2ZX0+XHJcbiAgICAgICAgICAgICAgICAgICAge2NvbC5sYWJlbH1cclxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRvZ2dsZXItYWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiaWNvLXN3YXAtaG9yaXpcIiAvPlxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIGNvbXBhY3QgbS1hdXRvIGZvbnQtd2VpZ2h0LWJvbGQgY29sdW1uLXNvcnRpbmdcIj5cclxuICAgICAgICAgICAgICB7Xy5tYXAoTU9WRV9DT0xTLCAoW2ljb24sIGZ1bmMsIGhpbnQsIGljblN0eWxlXSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICBrZXk9e2ljb259XHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXtfLmFzc2lnbih7IGNvbG9yOiBcIiM1NjViNjhcIiwgd2lkdGg6IFwiMmVtXCIgfSwgaWNuU3R5bGUpfVxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BidG4gYnRuLXByaW1hcnkgZm9udC13ZWlnaHQtYm9sZGB9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2Z1bmMoc2VsZWN0ZWRDb2wsIHRoaXMucHJvcHMpfVxyXG4gICAgICAgICAgICAgICAgICB0aXRsZT17aGludH0+XHJcbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT17YGZhcyBmYS0ke2ljb259YH0gLz5cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICA8Q29uZGl0aW9uYWxSZW5kZXIgZGlzcGxheT17dW5sb2NrZWR9PlxyXG4gICAgICAgICAgICA8Q29sdW1uTWVudU9wdGlvblxyXG4gICAgICAgICAgICAgIG9wZW49e3NlcnZlclN0YXRlLmxvY2tDb2xzKFtzZWxlY3RlZENvbF0sIHRoaXMucHJvcHMpfVxyXG4gICAgICAgICAgICAgIGxhYmVsPVwiTG9ja1wiXHJcbiAgICAgICAgICAgICAgaWNvbkNsYXNzPVwiZmEgZmEtbG9jayBtbC0zIG1yLTRcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9Db25kaXRpb25hbFJlbmRlcj5cclxuICAgICAgICAgIDxDb25kaXRpb25hbFJlbmRlciBkaXNwbGF5PXshdW5sb2NrZWR9PlxyXG4gICAgICAgICAgICA8Q29sdW1uTWVudU9wdGlvblxyXG4gICAgICAgICAgICAgIG9wZW49e3NlcnZlclN0YXRlLnVubG9ja0NvbHMoW3NlbGVjdGVkQ29sXSwgdGhpcy5wcm9wcyl9XHJcbiAgICAgICAgICAgICAgbGFiZWw9XCJVbmxvY2tcIlxyXG4gICAgICAgICAgICAgIGljb25DbGFzcz1cImZhIGZhLWxvY2stb3BlbiBtbC0yIG1yLTRcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9Db25kaXRpb25hbFJlbmRlcj5cclxuICAgICAgICAgIDxDb2x1bW5NZW51T3B0aW9uIG9wZW49e2hpZGVDb2x9IGxhYmVsPVwiSGlkZVwiIGljb25DbGFzcz1cImljby12aXNpYmlsaXR5LW9mZlwiIC8+XHJcbiAgICAgICAgICA8Q29sdW1uTWVudU9wdGlvbiBvcGVuPXtkZWxldGVDb2x9IGxhYmVsPVwiRGVsZXRlXCIgaWNvbkNsYXNzPVwiaWNvLWRlbGV0ZVwiIC8+XHJcbiAgICAgICAgICA8Q29sdW1uTWVudU9wdGlvbiBvcGVuPXtyZW5hbWVDb2x9IGxhYmVsPVwiUmVuYW1lXCIgaWNvbkNsYXNzPVwiaWNvLWVkaXRcIiAvPlxyXG4gICAgICAgICAgPENvbHVtbk1lbnVPcHRpb24gb3Blbj17b3BlbkFjdGlvbihcInJlcGxhY2VtZW50XCIpfSBsYWJlbD1cIlJlcGxhY2VtZW50c1wiIGljb25DbGFzcz1cImZhcyBmYS1iYWNrc3BhY2UgbXItM1wiIC8+XHJcbiAgICAgICAgICA8Q29sdW1uTWVudU9wdGlvbiBvcGVuPXtvcGVuQWN0aW9uKFwidHlwZS1jb252ZXJzaW9uXCIpfSBsYWJlbD1cIlR5cGUgQ29udmVyc2lvblwiIGljb25DbGFzcz1cImljby1zd2FwLWhvcml6XCIgLz5cclxuICAgICAgICAgIDxDb2x1bW5NZW51T3B0aW9uIG9wZW49e29wZW5BY3Rpb24oXCJkdXBsaWNhdGVzXCIpfSBsYWJlbD1cIkR1cGxpY2F0ZXNcIiBpY29uQ2xhc3M9XCJmYXMgZmEtY2xvbmUgbWwtMiBtci00XCIgLz5cclxuICAgICAgICAgIDxDb2x1bW5NZW51T3B0aW9uIG9wZW49e29wZW5EZXNjcmliZX0gbGFiZWw9XCJEZXNjcmliZVwiIGljb25DbGFzcz1cImljby12aWV3LWNvbHVtblwiIC8+XHJcbiAgICAgICAgICA8Q29sdW1uTWVudU9wdGlvblxyXG4gICAgICAgICAgICBvcGVuPXtvcGVuUG9wdXAoXCJjb2x1bW4tYW5hbHlzaXNcIiwgNDI1LCA4MTApfVxyXG4gICAgICAgICAgICBsYWJlbD1cIkNvbHVtbiBBbmFseXNpc1wiXHJcbiAgICAgICAgICAgIGljb25DbGFzcz1cImljby1lcXVhbGl6ZXJcIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxDb2x1bW5NZW51T3B0aW9uIG9wZW49e29wZW5Gb3JtYXR0aW5nfSBsYWJlbD1cIkZvcm1hdHNcIiBpY29uQ2xhc3M9XCJpY28tcGFsZXR0ZVwiIC8+XHJcbiAgICAgICAgICB7Xy5oYXMoY29sQ2ZnLCBcImxvd1ZhcmlhbmNlXCIpICYmIChcclxuICAgICAgICAgICAgPENvbHVtbk1lbnVPcHRpb25cclxuICAgICAgICAgICAgICBvcGVuPXtvcGVuUG9wdXAoXCJ2YXJpYW5jZVwiLCA0MDAsIDc3MCl9XHJcbiAgICAgICAgICAgICAgbGFiZWw9XCJWYXJpYW5jZSBSZXBvcnRcIlxyXG4gICAgICAgICAgICAgIGljb25DbGFzcz1cImZhcyBmYS1jaGFydC1iYXIgbWwtMiBtci00XCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgICA8Q29sdW1uRmlsdGVyIHsuLi50aGlzLnByb3BzfSAvPlxyXG4gICAgICAgIDwvdWw+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuUmVhY3RDb2x1bW5NZW51LmRpc3BsYXlOYW1lID0gXCJSZWFjdENvbHVtbk1lbnVcIjtcclxuUmVhY3RDb2x1bW5NZW51LnByb3BUeXBlcyA9IHtcclxuICBzZWxlY3RlZENvbDogUHJvcFR5cGVzLnN0cmluZyxcclxuICBzZWxlY3RlZFRvZ2dsZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICBjb2x1bW5zOiBQcm9wVHlwZXMuYXJyYXksXHJcbiAgY29sdW1uTWVudU9wZW46IFByb3BUeXBlcy5ib29sLFxyXG4gIHNvcnRJbmZvOiBQcm9wVHlwZXMuYXJyYXksXHJcbiAgcHJvcGFnYXRlU3RhdGU6IFByb3BUeXBlcy5mdW5jLFxyXG4gIGRhdGFJZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gIG5vSW5mbzogUHJvcFR5cGVzLmJvb2wsXHJcbiAgb3BlbkNoYXJ0OiBQcm9wVHlwZXMuZnVuYyxcclxuICBoaWRlQ29sdW1uTWVudTogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgb3V0bGllckZpbHRlcnM6IFByb3BUeXBlcy5vYmplY3QsXHJcbn07XHJcblxyXG5jb25zdCBSZWR1eENvbHVtbk1lbnUgPSBjb25uZWN0KFxyXG4gIHN0YXRlID0+IF8ucGljayhzdGF0ZSwgW1wiZGF0YUlkXCIsIFwiY29sdW1uTWVudU9wZW5cIiwgXCJzZWxlY3RlZENvbFwiLCBcInNlbGVjdGVkVG9nZ2xlXCJdKSxcclxuICBkaXNwYXRjaCA9PiAoe1xyXG4gICAgb3BlbkNoYXJ0OiBjaGFydFByb3BzID0+IGRpc3BhdGNoKG9wZW5DaGFydChjaGFydFByb3BzKSksXHJcbiAgICBoaWRlQ29sdW1uTWVudTogY29sTmFtZSA9PiBkaXNwYXRjaChhY3Rpb25zLmhpZGVDb2x1bW5NZW51KGNvbE5hbWUpKSxcclxuICB9KVxyXG4pKFJlYWN0Q29sdW1uTWVudSk7XHJcblxyXG5leHBvcnQgeyBSZWR1eENvbHVtbk1lbnUgYXMgQ29sdW1uTWVudSwgUmVhY3RDb2x1bW5NZW51LCBwb3NpdGlvbk1lbnUsIGlnbm9yZU1lbnVDbGlja3MgfTtcclxuIiwiaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcblxyXG5jbGFzcyBDb2x1bW5NZW51T3B0aW9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGxpPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRvZ2dsZXItYWN0aW9uXCI+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcGxhaW5cIiBvbkNsaWNrPXt0aGlzLnByb3BzLm9wZW59PlxyXG4gICAgICAgICAgICA8aSBjbGFzc05hbWU9e3RoaXMucHJvcHMuaWNvbkNsYXNzfSAvPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXdlaWdodC1ib2xkXCI+e3RoaXMucHJvcHMubGFiZWx9PC9zcGFuPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8L2xpPlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuQ29sdW1uTWVudU9wdGlvbi5kaXNwbGF5TmFtZSA9IFwiQ29sdW1uTWVudU9wdGlvblwiO1xyXG5Db2x1bW5NZW51T3B0aW9uLnByb3BUeXBlcyA9IHtcclxuICBvcGVuOiBQcm9wVHlwZXMuZnVuYyxcclxuICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcclxuICBpY29uQ2xhc3M6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb2x1bW5NZW51T3B0aW9uO1xyXG4iLCJpbXBvcnQgcXMgZnJvbSBcInF1ZXJ5c3RyaW5nXCI7XHJcblxyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQXN5bmNTZWxlY3QgZnJvbSBcInJlYWN0LXNlbGVjdC9hc3luY1wiO1xyXG5cclxuaW1wb3J0IHsgZmV0Y2hKc29uUHJvbWlzZSB9IGZyb20gXCIuLi9mZXRjaGVyXCI7XHJcblxyXG5jbGFzcyBBc3luY1ZhbHVlU2VsZWN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHsgc2VsZWN0ZWQ6IF8uZ2V0KHByb3BzLCBcInNlbGVjdGVkXCIsIG51bGwpIH07XHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlID0gdGhpcy51cGRhdGVTdGF0ZS5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5sb2FkT3B0aW9ucyA9IHRoaXMubG9hZE9wdGlvbnMuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVN0YXRlKHN0YXRlKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlLCAoKSA9PiB0aGlzLnByb3BzLnVwZGF0ZVN0YXRlKHN0YXRlKSk7XHJcbiAgfVxyXG5cclxuICBsb2FkT3B0aW9ucyhpbnB1dCkge1xyXG4gICAgcmV0dXJuIGZldGNoSnNvblByb21pc2UoXHJcbiAgICAgIGAvZHRhbGUvYXN5bmMtY29sdW1uLWZpbHRlci1kYXRhLyR7dGhpcy5wcm9wcy5kYXRhSWR9LyR7ZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMucHJvcHMuc2VsZWN0ZWRDb2wpfT8ke3FzLnN0cmluZ2lmeSh7IGlucHV0IH0pfWBcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8QXN5bmNTZWxlY3RcclxuICAgICAgICBpc011bHRpXHJcbiAgICAgICAgaXNEaXNhYmxlZD17dGhpcy5wcm9wcy5taXNzaW5nfVxyXG4gICAgICAgIGNsYXNzTmFtZT1cIlNlbGVjdCBpcy1jbGVhcmFibGUgaXMtc2VhcmNoYWJsZSBTZWxlY3QtLXNpbmdsZVwiXHJcbiAgICAgICAgY2xhc3NOYW1lUHJlZml4PVwiU2VsZWN0XCJcclxuICAgICAgICBnZXRPcHRpb25MYWJlbD17Xy5wcm9wZXJ0eShcInZhbHVlXCIpfVxyXG4gICAgICAgIGdldE9wdGlvblZhbHVlPXtfLnByb3BlcnR5KFwidmFsdWVcIil9XHJcbiAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuc2VsZWN0ZWR9XHJcbiAgICAgICAgb25DaGFuZ2U9e3NlbGVjdGVkID0+IHRoaXMudXBkYXRlU3RhdGUoeyBzZWxlY3RlZCB9KX1cclxuICAgICAgICBpc0NsZWFyYWJsZVxyXG4gICAgICAgIGNhY2hlT3B0aW9uc1xyXG4gICAgICAgIGRlZmF1bHRPcHRpb25zPXtfLm1hcCh0aGlzLnByb3BzLnVuaXF1ZXMsIHUgPT4gKHsgdmFsdWU6IHUgfSkpfVxyXG4gICAgICAgIGxvYWRPcHRpb25zPXt0aGlzLmxvYWRPcHRpb25zfVxyXG4gICAgICAvPlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuQXN5bmNWYWx1ZVNlbGVjdC5kaXNwbGF5TmFtZSA9IFwiQXN5bmNWYWx1ZVNlbGVjdFwiO1xyXG5Bc3luY1ZhbHVlU2VsZWN0LnByb3BUeXBlcyA9IHtcclxuICB1bmlxdWVzOiBQcm9wVHlwZXMuYXJyYXksXHJcbiAgbWlzc2luZzogUHJvcFR5cGVzLmJvb2wsXHJcbiAgdXBkYXRlU3RhdGU6IFByb3BUeXBlcy5mdW5jLFxyXG4gIGRhdGFJZDogUHJvcFR5cGVzLnN0cmluZyxcclxuICBzZWxlY3RlZENvbDogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFzeW5jVmFsdWVTZWxlY3Q7XHJcbiIsInZhciBhcGkgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiKTtcbiAgICAgICAgICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tNi0xIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanM/P3JlZi0tNi0yIS4vQ29sdW1uRmlsdGVyLmNzc1wiKTtcblxuICAgICAgICAgICAgY29udGVudCA9IGNvbnRlbnQuX19lc01vZHVsZSA/IGNvbnRlbnQuZGVmYXVsdCA6IGNvbnRlbnQ7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICAgICAgfVxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLmluc2VydCA9IFwiaGVhZFwiO1xub3B0aW9ucy5zaW5nbGV0b24gPSBmYWxzZTtcblxudmFyIHVwZGF0ZSA9IGFwaShjb250ZW50LCBvcHRpb25zKTtcblxuXG5pZiAobW9kdWxlLmhvdCkge1xuICBpZiAoIWNvbnRlbnQubG9jYWxzIHx8IG1vZHVsZS5ob3QuaW52YWxpZGF0ZSkge1xuICAgIHZhciBpc0VxdWFsTG9jYWxzID0gZnVuY3Rpb24gaXNFcXVhbExvY2FscyhhLCBiKSB7XG4gIGlmICghYSAmJiBiIHx8IGEgJiYgIWIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgcDtcblxuICBmb3IgKHAgaW4gYSkge1xuICAgIGlmIChhW3BdICE9PSBiW3BdKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZm9yIChwIGluIGIpIHtcbiAgICBpZiAoIWFbcF0pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG4gICAgdmFyIG9sZExvY2FscyA9IGNvbnRlbnQubG9jYWxzO1xuXG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXG4gICAgICBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tNi0xIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanM/P3JlZi0tNi0yIS4vQ29sdW1uRmlsdGVyLmNzc1wiLFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tNi0xIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanM/P3JlZi0tNi0yIS4vQ29sdW1uRmlsdGVyLmNzc1wiKTtcblxuICAgICAgICAgICAgICBjb250ZW50ID0gY29udGVudC5fX2VzTW9kdWxlID8gY29udGVudC5kZWZhdWx0IDogY29udGVudDtcblxuICAgICAgICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKCFpc0VxdWFsTG9jYWxzKG9sZExvY2FscywgY29udGVudC5sb2NhbHMpKSB7XG4gICAgICAgICAgICAgICAgbW9kdWxlLmhvdC5pbnZhbGlkYXRlKCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBvbGRMb2NhbHMgPSBjb250ZW50LmxvY2FscztcblxuICAgICAgICAgICAgICB1cGRhdGUoY29udGVudCk7XG4gICAgICB9XG4gICAgKVxuICB9XG5cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkge1xuICAgIHVwZGF0ZSgpO1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTsiLCJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBjb21wb25lbnRzIH0gZnJvbSBcInJlYWN0LXNlbGVjdFwiO1xyXG5cclxuaW1wb3J0IHsgYnVpbGRVUkxTdHJpbmcsIHNhdmVDb2xGaWx0ZXJVcmwsIHRvZ2dsZU91dGxpZXJGaWx0ZXJVcmwgfSBmcm9tIFwiLi4vYWN0aW9ucy91cmwtdXRpbHNcIjtcclxuaW1wb3J0IERlc2NyaXB0aW9ucyBmcm9tIFwiLi4vZHRhbGUvY29sdW1uL2NvbHVtbi1tZW51LWRlc2NyaXB0aW9ucy5qc29uXCI7XHJcbmltcG9ydCB7IGV4cG9ydHMgYXMgZ3UgfSBmcm9tIFwiLi4vZHRhbGUvZ3JpZFV0aWxzXCI7XHJcbmltcG9ydCBtZW51RnVuY3MgZnJvbSBcIi4uL2R0YWxlL21lbnUvZGF0YVZpZXdlck1lbnVVdGlsc1wiO1xyXG5pbXBvcnQgeyBmZXRjaEpzb24gfSBmcm9tIFwiLi4vZmV0Y2hlclwiO1xyXG5pbXBvcnQgeyBEYXRlRmlsdGVyIH0gZnJvbSBcIi4vRGF0ZUZpbHRlclwiO1xyXG5pbXBvcnQgeyBOdW1lcmljRmlsdGVyIH0gZnJvbSBcIi4vTnVtZXJpY0ZpbHRlclwiO1xyXG5pbXBvcnQgeyBTdHJpbmdGaWx0ZXIgfSBmcm9tIFwiLi9TdHJpbmdGaWx0ZXJcIjtcclxuXHJcbnJlcXVpcmUoXCIuL0NvbHVtbkZpbHRlci5jc3NcIik7XHJcblxyXG5mdW5jdGlvbiBnZXRTdHlsZXMoKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIGxhYmVsOiBcImxvYWRpbmdJbmRpY2F0b3JcIixcclxuICAgIGNvbG9yOiBcImhzbCgwLCAwJSwgNDAlKVwiLFxyXG4gICAgZGlzcGxheTogXCJmbGV4XCIsXHJcbiAgICBwYWRkaW5nOiA4LFxyXG4gICAgdHJhbnNpdGlvbjogXCJjb2xvciAxNTBtc1wiLFxyXG4gICAgYWxpZ25TZWxmOiBcImNlbnRlclwiLFxyXG4gICAgZm9udFNpemU6IDQsXHJcbiAgICBsaW5lSGVpZ2h0OiAxLFxyXG4gICAgbWFyZ2luUmlnaHQ6IDQsXHJcbiAgICB0ZXh0QWxpZ246IFwiY2VudGVyXCIsXHJcbiAgICB2ZXJ0aWNhbEFsaWduOiBcIm1pZGRsZVwiLFxyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJ1aWxkU3RhdGUoeyBjb2x1bW5zLCBzZWxlY3RlZENvbCwgb3V0bGllckZpbHRlcnMgfSkge1xyXG4gIGNvbnN0IGNvbENmZyA9IF8uZmluZChjb2x1bW5zLCB7IG5hbWU6IHNlbGVjdGVkQ29sIH0pIHx8IHt9O1xyXG4gIGNvbnN0IGNvbFR5cGUgPSBndS5maW5kQ29sVHlwZShjb2xDZmcuZHR5cGUpO1xyXG4gIHJldHVybiB7XHJcbiAgICBjb2xUeXBlLFxyXG4gICAgdW5pcXVlQ3Q6IGNvbENmZy51bmlxdWVfY3QsXHJcbiAgICBkdHlwZTogY29sQ2ZnLmR0eXBlLFxyXG4gICAgaGFzT3V0bGllcnM6IGNvbENmZy5oYXNPdXRsaWVycyA+IDAsXHJcbiAgICBxdWVyeUFwcGxpZWQ6IF8uaGFzKG91dGxpZXJGaWx0ZXJzLCBzZWxlY3RlZENvbCksXHJcbiAgICBoYXNNaXNzaW5nOiBmYWxzZSxcclxuICAgIG1pc3Npbmc6IGZhbHNlLFxyXG4gICAgbG9hZGluZ1N0YXRlOiB0cnVlLFxyXG4gIH07XHJcbn1cclxuXHJcbmNsYXNzIENvbHVtbkZpbHRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSBidWlsZFN0YXRlKHByb3BzKTtcclxuICAgIHRoaXMuZmV0Y2hEYXRhID0gdGhpcy5mZXRjaERhdGEuYmluZCh0aGlzKTtcclxuICAgIHRoaXMudXBkYXRlU3RhdGUgPSB0aGlzLnVwZGF0ZVN0YXRlLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLnJlbmRlck1pc3NpbmdUb2dnbGUgPSB0aGlzLnJlbmRlck1pc3NpbmdUb2dnbGUuYmluZCh0aGlzKTtcclxuICAgIHRoaXMucmVuZGVyT3V0bGllclRvZ2dsZSA9IHRoaXMucmVuZGVyT3V0bGllclRvZ2dsZS5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5yZW5kZXJJY29uID0gdGhpcy5yZW5kZXJJY29uLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBmZXRjaERhdGEoc3RhdGUpIHtcclxuICAgIGZldGNoSnNvbihgL2R0YWxlL2NvbHVtbi1maWx0ZXItZGF0YS8ke3RoaXMucHJvcHMuZGF0YUlkfS8ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLnByb3BzLnNlbGVjdGVkQ29sKX1gLCBkYXRhID0+IHtcclxuICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgIGNvbnN0IG1pc3NpbmcgPSBfLmdldCh0aGlzLnByb3BzLmNvbHVtbkZpbHRlcnMsIFt0aGlzLnByb3BzLnNlbGVjdGVkQ29sLCBcIm1pc3NpbmdcIl0sIGZhbHNlKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKF8uYXNzaWduSW4oc3RhdGUgfHwge30sIHsgbG9hZGluZ1N0YXRlOiBmYWxzZSwgbWlzc2luZyB9LCBkYXRhKSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICB0aGlzLmZldGNoRGF0YSgpO1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xyXG4gICAgaWYgKHByZXZQcm9wcy5zZWxlY3RlZENvbCAhPT0gdGhpcy5wcm9wcy5zZWxlY3RlZENvbCkge1xyXG4gICAgICB0aGlzLmZldGNoRGF0YShidWlsZFN0YXRlKHRoaXMucHJvcHMpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZVN0YXRlKGNmZykge1xyXG4gICAgY29uc3QgdXJsID0gYnVpbGRVUkxTdHJpbmcoc2F2ZUNvbEZpbHRlclVybCh0aGlzLnByb3BzLmRhdGFJZCwgdGhpcy5wcm9wcy5zZWxlY3RlZENvbCksIHtcclxuICAgICAgY2ZnOiBKU09OLnN0cmluZ2lmeShjZmcpLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCB1cGRhdGVkU3RhdGUgPSB7IGNmZyB9O1xyXG4gICAgaWYgKF8uaGFzKGNmZywgXCJtaXNzaW5nXCIpKSB7XHJcbiAgICAgIHVwZGF0ZWRTdGF0ZS5taXNzaW5nID0gY2ZnLm1pc3Npbmc7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNldFN0YXRlKFxyXG4gICAgICB1cGRhdGVkU3RhdGUsXHJcbiAgICAgIGZldGNoSnNvbih1cmwsIGRhdGEgPT4gdGhpcy5wcm9wcy5wcm9wYWdhdGVTdGF0ZSh7IGNvbHVtbkZpbHRlcnM6IGRhdGEuY3VyckZpbHRlcnMgfHwge30gfSkpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVySWNvbihzaG93SWNvbiA9IHRydWUpIHtcclxuICAgIGNvbnN0IGJ1dHRvbkhhbmRsZXJzID0gbWVudUZ1bmNzLmJ1aWxkSG90a2V5SGFuZGxlcnModGhpcy5wcm9wcyk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0b2dnbGVyLWFjdGlvblwiPlxyXG4gICAgICAgIHtzaG93SWNvbiAmJiA8aSBjbGFzc05hbWU9XCJmYSBmYS1maWx0ZXIgYWxpZ24tYm90dG9tIHBvaW50ZXJcIiBvbkNsaWNrPXtidXR0b25IYW5kbGVycy5GSUxURVJ9IC8+fVxyXG4gICAgICA8L3NwYW4+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyTWlzc2luZ1RvZ2dsZShzaG93SWNvbikge1xyXG4gICAgY29uc3QgeyBoYXNNaXNzaW5nLCBtaXNzaW5nLCBjb2xUeXBlIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgaWYgKGhhc01pc3NpbmcpIHtcclxuICAgICAgY29uc3QgdG9nZ2xlTWlzc2luZyA9ICgpID0+XHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZShfLmFzc2lnbkluKHt9LCB0aGlzLnN0YXRlLmNmZywgeyB0eXBlOiBjb2xUeXBlLCBtaXNzaW5nOiAhbWlzc2luZyB9KSk7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGxpPlxyXG4gICAgICAgICAge3RoaXMucmVuZGVySWNvbihzaG93SWNvbil9XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm0tYXV0b1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbHVtbi1maWx0ZXIgbS0yXCI+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC13ZWlnaHQtYm9sZCBwci0zXCI+U2hvdyBPbmx5IE1pc3Npbmc8L3NwYW4+XHJcbiAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPXtgaWNvLWNoZWNrLWJveCR7bWlzc2luZyA/IFwiXCIgOiBcIi1vdXRsaW5lLWJsYW5rXCJ9IHBvaW50ZXJgfSBvbkNsaWNrPXt0b2dnbGVNaXNzaW5nfSAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvbGk+XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHJlbmRlck91dGxpZXJUb2dnbGUoc2hvd0ljb24pIHtcclxuICAgIGNvbnN0IHsgaGFzT3V0bGllcnMsIHF1ZXJ5QXBwbGllZCB9ID0gdGhpcy5zdGF0ZTtcclxuICAgIGlmIChoYXNPdXRsaWVycykge1xyXG4gICAgICBjb25zdCB0b2dnbGVGaWx0ZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdG9nZ2xlT3V0bGllckZpbHRlclVybCh0aGlzLnByb3BzLmRhdGFJZCwgdGhpcy5wcm9wcy5zZWxlY3RlZENvbCk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShcclxuICAgICAgICAgIHsgcXVlcnlBcHBsaWVkOiAhcXVlcnlBcHBsaWVkIH0sXHJcbiAgICAgICAgICBmZXRjaEpzb24odXJsLCBkYXRhID0+IHRoaXMucHJvcHMucHJvcGFnYXRlU3RhdGUoZGF0YSkpXHJcbiAgICAgICAgKTtcclxuICAgICAgfTtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8bGk+XHJcbiAgICAgICAgICB7dGhpcy5yZW5kZXJJY29uKHNob3dJY29uKX1cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibS1hdXRvXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sdW1uLWZpbHRlciBtLTJcIj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXdlaWdodC1ib2xkIHByLTNcIj5GaWx0ZXIgT3V0bGllcnM8L3NwYW4+XHJcbiAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPXtgaWNvLWNoZWNrLWJveCR7cXVlcnlBcHBsaWVkID8gXCJcIiA6IFwiLW91dGxpbmUtYmxhbmtcIn0gcG9pbnRlcmB9IG9uQ2xpY2s9e3RvZ2dsZUZpbHRlcn0gLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2xpPlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5sb2FkaW5nU3RhdGUpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8bGkgY2xhc3NOYW1lPVwiaG92ZXJhYmxlXCI+XHJcbiAgICAgICAgICB7dGhpcy5yZW5kZXJJY29uKCl9XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm0tYXV0b1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbHVtbi1maWx0ZXIgbS0yXCI+XHJcbiAgICAgICAgICAgICAgPGNvbXBvbmVudHMuTG9hZGluZ0luZGljYXRvciBnZXRTdHlsZXM9e2dldFN0eWxlc30gY3g9eygpID0+IFwiXCJ9IC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhvdmVyYWJsZV9fY29udGVudCBjb2wtbWVudS1kZXNjXCI+e0Rlc2NyaXB0aW9ucy5maWx0ZXJ9PC9kaXY+XHJcbiAgICAgICAgPC9saT5cclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHsgY29sVHlwZSB9ID0gdGhpcy5zdGF0ZTtcclxuICAgIGxldCBtYXJrdXAgPSBudWxsO1xyXG4gICAgc3dpdGNoIChjb2xUeXBlKSB7XHJcbiAgICAgIGNhc2UgXCJzdHJpbmdcIjpcclxuICAgICAgY2FzZSBcInVua25vd25cIjoge1xyXG4gICAgICAgIGlmICghXy5zdGFydHNXaXRoKHRoaXMuc3RhdGUuZHR5cGUsIFwidGltZWRlbHRhXCIpKSB7XHJcbiAgICAgICAgICBtYXJrdXAgPSA8U3RyaW5nRmlsdGVyIHsuLi5fLmFzc2lnbkluKHt9LCB0aGlzLnByb3BzLCB0aGlzLnN0YXRlKX0gdXBkYXRlU3RhdGU9e3RoaXMudXBkYXRlU3RhdGV9IC8+O1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIFwiZGF0ZVwiOlxyXG4gICAgICAgIG1hcmt1cCA9IDxEYXRlRmlsdGVyIHsuLi5fLmFzc2lnbkluKHt9LCB0aGlzLnByb3BzLCB0aGlzLnN0YXRlKX0gdXBkYXRlU3RhdGU9e3RoaXMudXBkYXRlU3RhdGV9IC8+O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiaW50XCI6XHJcbiAgICAgIGNhc2UgXCJmbG9hdFwiOlxyXG4gICAgICAgIG1hcmt1cCA9IDxOdW1lcmljRmlsdGVyIHsuLi5fLmFzc2lnbkluKHt9LCB0aGlzLnByb3BzLCB0aGlzLnN0YXRlKX0gdXBkYXRlU3RhdGU9e3RoaXMudXBkYXRlU3RhdGV9IC8+O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgbGV0IG1pc3NpbmdUb2dnbGUgPSBudWxsO1xyXG4gICAgaWYgKF8uaXNOdWxsKG1hcmt1cCkpIHtcclxuICAgICAgaWYgKCF0aGlzLnN0YXRlLmhhc01pc3NpbmcpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG4gICAgICBtaXNzaW5nVG9nZ2xlID0gdGhpcy5yZW5kZXJNaXNzaW5nVG9nZ2xlKHRydWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbWFya3VwID0gKFxyXG4gICAgICAgIDxsaSBjbGFzc05hbWU9XCJob3ZlcmFibGVcIj5cclxuICAgICAgICAgIHt0aGlzLnJlbmRlckljb24oKX1cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibS1hdXRvXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sdW1uLWZpbHRlciBtLTJcIj57bWFya3VwfTwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhvdmVyYWJsZV9fY29udGVudCBjb2wtbWVudS1kZXNjXCI+e0Rlc2NyaXB0aW9ucy5maWx0ZXJ9PC9kaXY+XHJcbiAgICAgICAgPC9saT5cclxuICAgICAgKTtcclxuICAgICAgbWlzc2luZ1RvZ2dsZSA9IHRoaXMucmVuZGVyTWlzc2luZ1RvZ2dsZShmYWxzZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8UmVhY3QuRnJhZ21lbnQ+XHJcbiAgICAgICAge21hcmt1cH1cclxuICAgICAgICB7bWlzc2luZ1RvZ2dsZX1cclxuICAgICAgICB7dGhpcy5yZW5kZXJPdXRsaWVyVG9nZ2xlKF8uaXNOdWxsKG1hcmt1cCkgJiYgXy5pc051bGwobWlzc2luZ1RvZ2dsZSkpfVxyXG4gICAgICA8L1JlYWN0LkZyYWdtZW50PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuQ29sdW1uRmlsdGVyLmRpc3BsYXlOYW1lID0gXCJDb2x1bW5GaWx0ZXJcIjtcclxuQ29sdW1uRmlsdGVyLnByb3BUeXBlcyA9IHtcclxuICBjb2x1bW5zOiBQcm9wVHlwZXMuYXJyYXksXHJcbiAgY29sdW1uRmlsdGVyczogUHJvcFR5cGVzLm9iamVjdCxcclxuICBzZWxlY3RlZENvbDogUHJvcFR5cGVzLnN0cmluZyxcclxuICBwcm9wYWdhdGVTdGF0ZTogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgZGF0YUlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgb3V0bGllckZpbHRlcnM6IFByb3BUeXBlcy5vYmplY3QsXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb2x1bW5GaWx0ZXI7XHJcbiIsImltcG9ydCAkIGZyb20gXCJqcXVlcnlcIjtcclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcblxyXG5pbXBvcnQgeyBEYXRlSW5wdXQgfSBmcm9tIFwiQGJsdWVwcmludGpzL2RhdGV0aW1lXCI7XHJcblxyXG5yZXF1aXJlKFwiQGJsdWVwcmludGpzL2NvcmUvbGliL2Nzcy9ibHVlcHJpbnQuY3NzXCIpO1xyXG5yZXF1aXJlKFwiQGJsdWVwcmludGpzL2RhdGV0aW1lL2xpYi9jc3MvYmx1ZXByaW50LWRhdGV0aW1lLmNzc1wiKTtcclxuXHJcbmNsYXNzIERhdGVGaWx0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICBjb25zdCBwcmV2aW91c1NlbGVjdGlvbiA9IF8uZ2V0KHByb3BzLmNvbHVtbkZpbHRlcnMsIFtwcm9wcy5zZWxlY3RlZENvbCwgXCJ2YWx1ZVwiXSwge30pO1xyXG4gICAgbGV0IHN0YXRlID0gXy5waWNrKHByb3BzLCBbXCJtaW5cIiwgXCJtYXhcIl0pO1xyXG4gICAgc3RhdGUuc3RhcnQgPSBwcmV2aW91c1NlbGVjdGlvbi5zdGFydCB8fCBzdGF0ZS5taW47XHJcbiAgICBzdGF0ZS5lbmQgPSBwcmV2aW91c1NlbGVjdGlvbi5lbmQgfHwgc3RhdGUubWF4O1xyXG4gICAgc3RhdGUgPSBfLm1hcFZhbHVlcyhzdGF0ZSwgdiA9PiAoXy5pc051bGwodikgPyBudWxsIDogbmV3IERhdGUobW9tZW50KHYpKSkpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgdGhpcy51cGRhdGVTdGF0ZSA9IHRoaXMudXBkYXRlU3RhdGUuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVN0YXRlKHByb3AsIHZhbHVlKSB7XHJcbiAgICBjb25zdCBpbnB1dFJlZiA9IHRoaXNbYCR7cHJvcH1JbnB1dGBdO1xyXG4gICAgY29uc3QgaW5wdXRSZWZWYWx1ZSA9ICQoaW5wdXRSZWYpWzBdLnZhbHVlO1xyXG4gICAgaWYgKGlucHV0UmVmVmFsdWUubGVuZ3RoID4gMCAmJiBpbnB1dFJlZlZhbHVlLmxlbmd0aCA8IDgpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbGV0IGNmZ1ZhbCA9IF8uYXNzaWduSW4oe30sIF8ucGljayh0aGlzLnN0YXRlLCBbXCJzdGFydFwiLCBcImVuZFwiXSksIHtcclxuICAgICAgW3Byb3BdOiB2YWx1ZSxcclxuICAgIH0pO1xyXG4gICAgY2ZnVmFsID0gXy5tYXBWYWx1ZXMoY2ZnVmFsLCB2ID0+IChfLmlzTnVsbCh2KSA/IHYgOiBtb21lbnQodikuZm9ybWF0KFwiWVlZWU1NRERcIikpKTtcclxuICAgIGxldCBjZmcgPSBudWxsO1xyXG4gICAgaWYgKCFfLmlzTnVsbChjZmdWYWwuc3RhcnQpIHx8ICFfLmlzTnVsbChjZmdWYWwuZW5kKSkge1xyXG4gICAgICBjZmcgPSBfLmFzc2lnbkluKHsgdHlwZTogXCJkYXRlXCIgfSwgY2ZnVmFsKTtcclxuICAgIH1cclxuICAgIHRoaXMuc2V0U3RhdGUoeyBbcHJvcF06IHZhbHVlIH0sICgpID0+IHRoaXMucHJvcHMudXBkYXRlU3RhdGUoY2ZnKSk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IHN0YXJ0LCBlbmQgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBjb25zdCBpbnB1dFByb3BzID0ge1xyXG4gICAgICBmb3JtYXREYXRlOiBkYXRlID0+IG1vbWVudChkYXRlKS5mb3JtYXQoXCJZWVlZTU1ERFwiKSxcclxuICAgICAgcGFyc2VEYXRlOiBzdHIgPT4gbmV3IERhdGUobW9tZW50KHN0cikpLFxyXG4gICAgICBwbGFjZWhvbGRlcjogXCJZWVlZTU1ERFwiLFxyXG4gICAgICBwb3BvdmVyUHJvcHM6IHsgdXNlUG9ydGFsOiBmYWxzZSB9LFxyXG4gICAgICBtaW5EYXRlOiB0aGlzLnN0YXRlLm1pbixcclxuICAgICAgbWF4RGF0ZTogdGhpcy5zdGF0ZS5tYXgsXHJcbiAgICAgIHNob3dBY3Rpb25zQmFyOiBmYWxzZSxcclxuICAgICAgZGlzYWJsZWQ6IHRoaXMucHJvcHMubWlzc2luZyxcclxuICAgIH07XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICA8RGF0ZUlucHV0XHJcbiAgICAgICAga2V5PXswfVxyXG4gICAgICAgIHZhbHVlPXtfLmlzTnVsbChzdGFydCkgPyBudWxsIDogbmV3IERhdGUobW9tZW50KHN0YXJ0KSl9XHJcbiAgICAgICAgb25DaGFuZ2U9e2RhdGUgPT4gdGhpcy51cGRhdGVTdGF0ZShcInN0YXJ0XCIsIGRhdGUpfVxyXG4gICAgICAgIGlucHV0UHJvcHM9e3sgaW5wdXRSZWY6IGMgPT4gKHRoaXMuc3RhcnRJbnB1dCA9IGMpIH19XHJcbiAgICAgICAgey4uLmlucHV0UHJvcHN9XHJcbiAgICAgIC8+LFxyXG4gICAgICA8c3BhbiBrZXk9ezF9PnRvPC9zcGFuPixcclxuICAgICAgPERhdGVJbnB1dFxyXG4gICAgICAgIGtleT17Mn1cclxuICAgICAgICB2YWx1ZT17Xy5pc051bGwoZW5kKSA/IG51bGwgOiBuZXcgRGF0ZShtb21lbnQoZW5kKSl9XHJcbiAgICAgICAgb25DaGFuZ2U9e2RhdGUgPT4gdGhpcy51cGRhdGVTdGF0ZShcImVuZFwiLCBkYXRlKX1cclxuICAgICAgICBpbnB1dFByb3BzPXt7IGlucHV0UmVmOiBjID0+ICh0aGlzLmVuZElucHV0ID0gYykgfX1cclxuICAgICAgICB7Li4uaW5wdXRQcm9wc31cclxuICAgICAgLz4sXHJcbiAgICBdO1xyXG4gIH1cclxufVxyXG5EYXRlRmlsdGVyLmRpc3BsYXlOYW1lID0gXCJEYXRlRmlsdGVyXCI7XHJcbkRhdGVGaWx0ZXIucHJvcFR5cGVzID0ge1xyXG4gIHNlbGVjdGVkQ29sOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIGRhdGFJZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gIGNvbHVtbkZpbHRlcnM6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgdXBkYXRlU3RhdGU6IFByb3BUeXBlcy5mdW5jLFxyXG4gIG1pbjogUHJvcFR5cGVzLnN0cmluZyxcclxuICBtYXg6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgbWlzc2luZzogUHJvcFR5cGVzLmJvb2wsXHJcbn07XHJcblxyXG5leHBvcnQgeyBEYXRlRmlsdGVyIH07XHJcbiIsImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcblxyXG5pbXBvcnQgQXN5bmNWYWx1ZVNlbGVjdCBmcm9tIFwiLi9Bc3luY1ZhbHVlU2VsZWN0XCI7XHJcbmltcG9ydCBWYWx1ZVNlbGVjdCBmcm9tIFwiLi9WYWx1ZVNlbGVjdFwiO1xyXG5cclxuY29uc3QgTkUgPSBcIlxcdTIyNjBcIjtcclxuY29uc3QgRVFfVE9HR0xFID0gW1xyXG4gIFtcIj1cIiwgXCJFcXVhbHNcIl0sXHJcbiAgW05FLCBcIk5vdCBFcXVhbHNcIl0sXHJcbl07XHJcbmNvbnN0IE9QRVJBTkRTID0gXy5jb25jYXQoRVFfVE9HR0xFLCBbXHJcbiAgW1wiPFwiLCBcIkxlc3MgVGhhblwiXSxcclxuICBbXCI+XCIsIFwiR3JlYXRlciBUaGFuXCJdLFxyXG4gIFtcIjw9XCIsIFwiTGVzcyBUaGFuIG9yIEVxdWFsXCJdLFxyXG4gIFtcIj49XCIsIFwiR3JlYXRlciBUaGFuIG9yIEVxdWFsXCJdLFxyXG4gIFtcIltdXCIsIFwiUmFuZ2UgKEluY2x1c2l2ZSlcIl0sXHJcbiAgW1wiKClcIiwgXCJSYW5nZSAoRXhjbHVzaXZlKVwiXSxcclxuXSk7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVWYWx1ZUlucHV0KHVwZGF0ZVN0YXRlLCB7IG1pc3NpbmcgfSwgc3RhdGUsIHByb3ApIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBrZXk9e3Byb3B9IGNsYXNzTmFtZT1cInJvdyBwdC0zXCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLWF1dG8gbS1hdXRvXCI+XHJcbiAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICBwbGFjZWhvbGRlcj17YEVudGVyICR7Xy5jYXBpdGFsaXplKHByb3ApfS4uLmB9XHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgbnVtZXJpYy1maWx0ZXJcIlxyXG4gICAgICAgICAgdmFsdWU9e3N0YXRlW3Byb3BdIHx8IFwiXCJ9XHJcbiAgICAgICAgICBkaXNhYmxlZD17bWlzc2luZ31cclxuICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHVwZGF0ZVN0YXRlKHsgW3Byb3BdOiBlLnRhcmdldC52YWx1ZSB9KX1cclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJ1aWxkU3RhdGUoeyBjb2x1bW5GaWx0ZXJzLCBzZWxlY3RlZENvbCwgbWluLCBtYXggfSkge1xyXG4gIGNvbnN0IGNmZyA9IF8uZ2V0KGNvbHVtbkZpbHRlcnMsIHNlbGVjdGVkQ29sLCB7IG9wZXJhbmQ6IFwiPVwiIH0pO1xyXG4gIGNvbnN0IHNlbGVjdGVkID0gXy5pbmNsdWRlcyhbXCI9XCIsIFwibmVcIl0sIGNmZy5vcGVyYW5kKSA/IF8ubWFwKGNmZy52YWx1ZSB8fCBudWxsLCB2ID0+ICh7IHZhbHVlOiB2IH0pKSA6IG51bGw7XHJcbiAgY29uc3QgdmFsdWUgPSBfLmluY2x1ZGVzKFtcIj1cIiwgXCJuZVwiXSwgY2ZnLm9wZXJhbmQpID8gXCJcIiA6IGNmZy52YWx1ZTtcclxuICBjb25zdCB7IG9wZXJhbmQgfSA9IGNmZztcclxuICByZXR1cm4ge1xyXG4gICAgc2VsZWN0ZWQsXHJcbiAgICBvcGVyYW5kOiBvcGVyYW5kID09PSBcIm5lXCIgPyBORSA6IFwiPVwiLFxyXG4gICAgbWluaW11bTogKGNmZy5taW4gfHwgbWluKSArIFwiXCIsXHJcbiAgICBtYXhpbXVtOiAoY2ZnLm1heCB8fCBtYXgpICsgXCJcIixcclxuICAgIHZhbHVlOiB2YWx1ZSArIFwiXCIsXHJcbiAgfTtcclxufVxyXG5cclxuY2xhc3MgTnVtZXJpY0ZpbHRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSBidWlsZFN0YXRlKHByb3BzKTtcclxuICAgIHRoaXMudXBkYXRlU3RhdGUgPSB0aGlzLnVwZGF0ZVN0YXRlLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLnJlbmRlck9wZXJhbmRJbnB1dHMgPSB0aGlzLnJlbmRlck9wZXJhbmRJbnB1dHMuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcclxuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkQ29sICE9PSBwcmV2UHJvcHMuc2VsZWN0ZWRDb2wpIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZShidWlsZFN0YXRlKHRoaXMucHJvcHMpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZVN0YXRlKHN0YXRlKSB7XHJcbiAgICBjb25zdCB1cGRhdGVkU3RhdGUgPSBfLmFzc2lnbkluKHt9LCB0aGlzLnN0YXRlLCBzdGF0ZSk7XHJcbiAgICBjb25zdCB7IGNvbFR5cGUgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCBwYXJzZUZ1bmMgPSBjb2xUeXBlID09PSBcImludFwiID8gcGFyc2VJbnQgOiBwYXJzZUZsb2F0O1xyXG4gICAgbGV0IGNmZyA9IHsgdHlwZTogY29sVHlwZSwgb3BlcmFuZDogdXBkYXRlZFN0YXRlLm9wZXJhbmQgfTtcclxuICAgIGNvbnN0IHVwZGF0ZUNmZ0ZvclZhbCA9ICgpID0+IHtcclxuICAgICAgY29uc3QgbnVtVmFsID0gcGFyc2VGdW5jKHVwZGF0ZWRTdGF0ZS52YWx1ZSk7XHJcbiAgICAgIGlmIChfLmlzTmFOKG51bVZhbCkpIHtcclxuICAgICAgICBjZmcgPSB7IHR5cGU6IGNvbFR5cGUgfTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY2ZnLnZhbHVlID0gbnVtVmFsO1xyXG4gICAgfTtcclxuICAgIHN3aXRjaCAoY2ZnLm9wZXJhbmQpIHtcclxuICAgICAgY2FzZSBcIj1cIjpcclxuICAgICAgY2FzZSBORToge1xyXG4gICAgICAgIGlmIChjb2xUeXBlID09PSBcImludFwiKSB7XHJcbiAgICAgICAgICBjZmcudmFsdWUgPSBfLm1hcCh1cGRhdGVkU3RhdGUuc2VsZWN0ZWQgfHwgW10sIFwidmFsdWVcIik7XHJcbiAgICAgICAgICBjZmcub3BlcmFuZCA9IGNmZy5vcGVyYW5kID09PSBORSA/IFwibmVcIiA6IGNmZy5vcGVyYW5kO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB1cGRhdGVDZmdGb3JWYWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcIjxcIjpcclxuICAgICAgY2FzZSBcIj5cIjpcclxuICAgICAgY2FzZSBcIjw9XCI6XHJcbiAgICAgIGNhc2UgXCI+PVwiOlxyXG4gICAgICAgIHVwZGF0ZUNmZ0ZvclZhbCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiW11cIjpcclxuICAgICAgY2FzZSBcIigpXCI6IHtcclxuICAgICAgICBsZXQgeyBtaW5pbXVtLCBtYXhpbXVtIH0gPSB1cGRhdGVkU3RhdGU7XHJcbiAgICAgICAgbWluaW11bSA9IHBhcnNlRnVuYyhtaW5pbXVtKTtcclxuICAgICAgICBtYXhpbXVtID0gcGFyc2VGdW5jKG1heGltdW0pO1xyXG4gICAgICAgIGlmICghXy5pc05hTihtaW5pbXVtKSkge1xyXG4gICAgICAgICAgY2ZnLm1pbiA9IG1pbmltdW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghXy5pc05hTihtYXhpbXVtKSkge1xyXG4gICAgICAgICAgY2ZnLm1heCA9IG1heGltdW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChfLmlzVW5kZWZpbmVkKGNmZy5taW4pICYmIF8uaXNVbmRlZmluZWQoY2ZnLm1heCkpIHtcclxuICAgICAgICAgIGNmZyA9IHsgdHlwZTogY29sVHlwZSB9O1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm1pbiA9PSBjZmcubWluICYmIHRoaXMucHJvcHMubWF4ID09IGNmZy5tYXgpIHtcclxuICAgICAgICAgIGNmZyA9IHsgdHlwZTogY29sVHlwZSB9O1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLnNldFN0YXRlKHVwZGF0ZWRTdGF0ZSwgKCkgPT4gdGhpcy5wcm9wcy51cGRhdGVTdGF0ZShjZmcpKTtcclxuICB9XHJcblxyXG4gIHJlbmRlck9wZXJhbmRJbnB1dHMoKSB7XHJcbiAgICBjb25zdCB7IG9wZXJhbmQgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBjb25zdCB7IGNvbFR5cGUgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBzd2l0Y2ggKG9wZXJhbmQpIHtcclxuICAgICAgY2FzZSBcIjxcIjpcclxuICAgICAgY2FzZSBcIj5cIjpcclxuICAgICAgY2FzZSBcIjw9XCI6XHJcbiAgICAgIGNhc2UgXCI+PVwiOlxyXG4gICAgICAgIHJldHVybiBjcmVhdGVWYWx1ZUlucHV0KHRoaXMudXBkYXRlU3RhdGUsIHRoaXMucHJvcHMsIHRoaXMuc3RhdGUsIFwidmFsdWVcIik7XHJcbiAgICAgIGNhc2UgXCJbXVwiOlxyXG4gICAgICBjYXNlIFwiKClcIjpcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgY3JlYXRlVmFsdWVJbnB1dCh0aGlzLnVwZGF0ZVN0YXRlLCB0aGlzLnByb3BzLCB0aGlzLnN0YXRlLCBcIm1pbmltdW1cIiksXHJcbiAgICAgICAgICBjcmVhdGVWYWx1ZUlucHV0KHRoaXMudXBkYXRlU3RhdGUsIHRoaXMucHJvcHMsIHRoaXMuc3RhdGUsIFwibWF4aW11bVwiKSxcclxuICAgICAgICBdO1xyXG4gICAgICBjYXNlIFwiPVwiOlxyXG4gICAgICBjYXNlIE5FOlxyXG4gICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgaWYgKGNvbFR5cGUgPT09IFwiZmxvYXRcIikge1xyXG4gICAgICAgICAgcmV0dXJuIGNyZWF0ZVZhbHVlSW5wdXQodGhpcy51cGRhdGVTdGF0ZSwgdGhpcy5wcm9wcywgdGhpcy5zdGF0ZSwgXCJ2YWx1ZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcmVxdWlyZXNBc3luYyA9IHRoaXMucHJvcHMudW5pcXVlQ3QgPiA1MDA7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIDxkaXYga2V5PXsyfSBjbGFzc05hbWU9XCJyb3cgcHQtM1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0xMlwiPlxyXG4gICAgICAgICAgICAgIHshcmVxdWlyZXNBc3luYyAmJiAoXHJcbiAgICAgICAgICAgICAgICA8VmFsdWVTZWxlY3Qgey4uLnRoaXMucHJvcHN9IHNlbGVjdGVkPXt0aGlzLnN0YXRlLnNlbGVjdGVkfSB1cGRhdGVTdGF0ZT17dGhpcy51cGRhdGVTdGF0ZX0gLz5cclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgIHtyZXF1aXJlc0FzeW5jICYmIChcclxuICAgICAgICAgICAgICAgIDxBc3luY1ZhbHVlU2VsZWN0IHsuLi50aGlzLnByb3BzfSBzZWxlY3RlZD17dGhpcy5zdGF0ZS5zZWxlY3RlZH0gdXBkYXRlU3RhdGU9e3RoaXMudXBkYXRlU3RhdGV9IC8+XHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICA8ZGl2IGtleT17MH0gY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtMTJcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIGNvbXBhY3QgbS1hdXRvIGZvbnQtd2VpZ2h0LWJvbGQgY29sdW1uLXNvcnRpbmdcIiBzdHlsZT17eyBmb250U2l6ZTogXCIxNnB4XCIgfX0+XHJcbiAgICAgICAgICAgIHtfLm1hcChPUEVSQU5EUywgKFtvcGVyYW5kLCBoaW50XSwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuc3RhdGUub3BlcmFuZCA9PT0gb3BlcmFuZDtcclxuICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICBrZXk9e2l9XHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXthY3RpdmUgPyB7fSA6IHsgY29sb3I6IFwiIzU2NWI2OFwiIH19XHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGJ0biBidG4tcHJpbWFyeSAke2FjdGl2ZSA/IFwiYWN0aXZlXCIgOiBcIlwifSBmb250LXdlaWdodC1ib2xkYH1cclxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy51cGRhdGVTdGF0ZSh7IG9wZXJhbmQgfSl9XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPXtoaW50fVxyXG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17YWN0aXZlIHx8IHRoaXMucHJvcHMubWlzc2luZ30+XHJcbiAgICAgICAgICAgICAgICAgIHtvcGVyYW5kfVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+LFxyXG4gICAgICB0aGlzLnJlbmRlck9wZXJhbmRJbnB1dHMoKSxcclxuICAgIF07XHJcbiAgfVxyXG59XHJcbk51bWVyaWNGaWx0ZXIuZGlzcGxheU5hbWUgPSBcIk51bWVyaWNGaWx0ZXJcIjtcclxuTnVtZXJpY0ZpbHRlci5wcm9wVHlwZXMgPSB7XHJcbiAgc2VsZWN0ZWRDb2w6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgY29sdW1uRmlsdGVyczogUHJvcFR5cGVzLm9iamVjdCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9uby11bnVzZWQtcHJvcC10eXBlc1xyXG4gIHVwZGF0ZVN0YXRlOiBQcm9wVHlwZXMuZnVuYyxcclxuICB1bmlxdWVzOiBQcm9wVHlwZXMuYXJyYXksXHJcbiAgdW5pcXVlQ3Q6IFByb3BUeXBlcy5udW1iZXIsXHJcbiAgY29sVHlwZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICBtaW46IFByb3BUeXBlcy5udW1iZXIsXHJcbiAgbWF4OiBQcm9wVHlwZXMubnVtYmVyLFxyXG4gIG1pc3Npbmc6IFByb3BUeXBlcy5ib29sLFxyXG59O1xyXG5cclxuZXhwb3J0IHsgTnVtZXJpY0ZpbHRlciwgRVFfVE9HR0xFLCBORSB9O1xyXG4iLCJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuaW1wb3J0IEFzeW5jVmFsdWVTZWxlY3QgZnJvbSBcIi4vQXN5bmNWYWx1ZVNlbGVjdFwiO1xyXG5pbXBvcnQgeyBFUV9UT0dHTEUsIE5FIH0gZnJvbSBcIi4vTnVtZXJpY0ZpbHRlclwiO1xyXG5pbXBvcnQgVmFsdWVTZWxlY3QgZnJvbSBcIi4vVmFsdWVTZWxlY3RcIjtcclxuXHJcbmNsYXNzIFN0cmluZ0ZpbHRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIGNvbnN0IGN1cnJGaWx0ZXIgPSBfLmdldChwcm9wcy5jb2x1bW5GaWx0ZXJzLCBwcm9wcy5zZWxlY3RlZENvbCwge30pO1xyXG4gICAgY3VyckZpbHRlci5vcGVyYW5kID0gY3VyckZpbHRlci5vcGVyYW5kID09PSBcIm5lXCIgPyBORSA6IFwiPVwiO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWQgPSBfLm1hcChfLmdldChjdXJyRmlsdGVyLCBcInZhbHVlXCIsIG51bGwpLCB2ID0+ICh7XHJcbiAgICAgIHZhbHVlOiB2LFxyXG4gICAgfSkpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHsgc2VsZWN0ZWQ6IHNlbGVjdGVkLCBvcGVyYW5kOiBjdXJyRmlsdGVyLm9wZXJhbmQgfTtcclxuICAgIHRoaXMudXBkYXRlU3RhdGUgPSB0aGlzLnVwZGF0ZVN0YXRlLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVTdGF0ZShzdGF0ZSkge1xyXG4gICAgY29uc3QgdXBkYXRlZFN0YXRlID0gXy5hc3NpZ25Jbih7fSwgdGhpcy5zdGF0ZSwgc3RhdGUpO1xyXG4gICAgY29uc3QgY2ZnID0ge1xyXG4gICAgICB0eXBlOiBcInN0cmluZ1wiLFxyXG4gICAgICB2YWx1ZTogXy5tYXAodXBkYXRlZFN0YXRlLnNlbGVjdGVkIHx8IFtdLCBcInZhbHVlXCIpLFxyXG4gICAgICBvcGVyYW5kOiB1cGRhdGVkU3RhdGUub3BlcmFuZCxcclxuICAgIH07XHJcbiAgICBjZmcub3BlcmFuZCA9IGNmZy5vcGVyYW5kID09PSBORSA/IFwibmVcIiA6IGNmZy5vcGVyYW5kO1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh1cGRhdGVkU3RhdGUsICgpID0+IHRoaXMucHJvcHMudXBkYXRlU3RhdGUoY2ZnKSk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCByZXF1aXJlc0FzeW5jID0gdGhpcy5wcm9wcy51bmlxdWVDdCA+IDUwMDtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIDxkaXYga2V5PXswfSBjbGFzc05hbWU9XCJyb3cgcGItM1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTEyIHRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBjb21wYWN0IG0tYXV0byBmb250LXdlaWdodC1ib2xkIGNvbHVtbi1zb3J0aW5nXCIgc3R5bGU9e3sgZm9udFNpemU6IFwiMTZweFwiIH19PlxyXG4gICAgICAgICAgICB7Xy5tYXAoRVFfVE9HR0xFLCAoW29wZXJhbmQsIGhpbnRdLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gdGhpcy5zdGF0ZS5vcGVyYW5kID09PSBvcGVyYW5kO1xyXG4gICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIGtleT17aX1cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e2FjdGl2ZSA/IHt9IDogeyBjb2xvcjogXCIjNTY1YjY4XCIgfX1cclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYnRuIGJ0bi1wcmltYXJ5ICR7YWN0aXZlID8gXCJhY3RpdmVcIiA6IFwiXCJ9IGZvbnQtd2VpZ2h0LWJvbGRgfVxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLnVwZGF0ZVN0YXRlKHsgb3BlcmFuZCB9KX1cclxuICAgICAgICAgICAgICAgICAgdGl0bGU9e2hpbnR9XHJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXthY3RpdmUgfHwgdGhpcy5wcm9wcy5taXNzaW5nfT5cclxuICAgICAgICAgICAgICAgICAge29wZXJhbmR9XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9KX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj4sXHJcbiAgICAgIDxkaXYga2V5PXsxfSBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0xMlwiPlxyXG4gICAgICAgICAgeyFyZXF1aXJlc0FzeW5jICYmIChcclxuICAgICAgICAgICAgPFZhbHVlU2VsZWN0IHsuLi50aGlzLnByb3BzfSBzZWxlY3RlZD17dGhpcy5zdGF0ZS5zZWxlY3RlZH0gdXBkYXRlU3RhdGU9e3RoaXMudXBkYXRlU3RhdGV9IC8+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgICAge3JlcXVpcmVzQXN5bmMgJiYgKFxyXG4gICAgICAgICAgICA8QXN5bmNWYWx1ZVNlbGVjdCB7Li4udGhpcy5wcm9wc30gc2VsZWN0ZWQ9e3RoaXMuc3RhdGUuc2VsZWN0ZWR9IHVwZGF0ZVN0YXRlPXt0aGlzLnVwZGF0ZVN0YXRlfSAvPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+LFxyXG4gICAgXTtcclxuICB9XHJcbn1cclxuU3RyaW5nRmlsdGVyLmRpc3BsYXlOYW1lID0gXCJTdHJpbmdGaWx0ZXJcIjtcclxuU3RyaW5nRmlsdGVyLnByb3BUeXBlcyA9IHtcclxuICBzZWxlY3RlZENvbDogUHJvcFR5cGVzLnN0cmluZyxcclxuICBjb2x1bW5GaWx0ZXJzOiBQcm9wVHlwZXMub2JqZWN0LCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L25vLXVudXNlZC1wcm9wLXR5cGVzXHJcbiAgdXBkYXRlU3RhdGU6IFByb3BUeXBlcy5mdW5jLFxyXG4gIHVuaXF1ZXM6IFByb3BUeXBlcy5hcnJheSxcclxuICBtaXNzaW5nOiBQcm9wVHlwZXMuYm9vbCxcclxuICB1bmlxdWVDdDogUHJvcFR5cGVzLm51bWJlcixcclxufTtcclxuXHJcbmV4cG9ydCB7IFN0cmluZ0ZpbHRlciB9O1xyXG4iLCJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgU2VsZWN0LCB7IGNyZWF0ZUZpbHRlciB9IGZyb20gXCJyZWFjdC1zZWxlY3RcIjtcclxuXHJcbmNsYXNzIFZhbHVlU2VsZWN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHsgc2VsZWN0ZWQ6IF8uZ2V0KHByb3BzLCBcInNlbGVjdGVkXCIsIG51bGwpIH07XHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlID0gdGhpcy51cGRhdGVTdGF0ZS5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlU3RhdGUoc3RhdGUpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUsICgpID0+IHRoaXMucHJvcHMudXBkYXRlU3RhdGUoc3RhdGUpKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxTZWxlY3RcclxuICAgICAgICBpc011bHRpXHJcbiAgICAgICAgaXNEaXNhYmxlZD17dGhpcy5wcm9wcy5taXNzaW5nfVxyXG4gICAgICAgIGNsYXNzTmFtZT1cIlNlbGVjdCBpcy1jbGVhcmFibGUgaXMtc2VhcmNoYWJsZSBTZWxlY3QtLXNpbmdsZVwiXHJcbiAgICAgICAgY2xhc3NOYW1lUHJlZml4PVwiU2VsZWN0XCJcclxuICAgICAgICBvcHRpb25zPXtfLm1hcCh0aGlzLnByb3BzLnVuaXF1ZXMsIG8gPT4gKHsgdmFsdWU6IG8gfSkpfVxyXG4gICAgICAgIGdldE9wdGlvbkxhYmVsPXtfLnByb3BlcnR5KFwidmFsdWVcIil9XHJcbiAgICAgICAgZ2V0T3B0aW9uVmFsdWU9e18ucHJvcGVydHkoXCJ2YWx1ZVwiKX1cclxuICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5zZWxlY3RlZH1cclxuICAgICAgICBvbkNoYW5nZT17c2VsZWN0ZWQgPT4gdGhpcy51cGRhdGVTdGF0ZSh7IHNlbGVjdGVkIH0pfVxyXG4gICAgICAgIGlzQ2xlYXJhYmxlXHJcbiAgICAgICAgZmlsdGVyT3B0aW9uPXtjcmVhdGVGaWx0ZXIoeyBpZ25vcmVBY2NlbnRzOiBmYWxzZSB9KX0gLy8gcmVxdWlyZWQgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMhXHJcbiAgICAgIC8+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5WYWx1ZVNlbGVjdC5kaXNwbGF5TmFtZSA9IFwiVmFsdWVTZWxlY3RcIjtcclxuVmFsdWVTZWxlY3QucHJvcFR5cGVzID0ge1xyXG4gIHVuaXF1ZXM6IFByb3BUeXBlcy5hcnJheSxcclxuICBtaXNzaW5nOiBQcm9wVHlwZXMuYm9vbCxcclxuICB1cGRhdGVTdGF0ZTogUHJvcFR5cGVzLmZ1bmMsXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWYWx1ZVNlbGVjdDtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==