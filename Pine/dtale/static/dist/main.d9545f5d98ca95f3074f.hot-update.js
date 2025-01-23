webpackHotUpdate("main",{

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


/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdGF0aWMvZHRhbGUvY29sdW1uL0NvbHVtbk1lbnUuanN4Il0sIm5hbWVzIjpbIlJPV19IRUlHSFQiLCJndSIsIlNPUlRfUFJPUFMiLCJNT1ZFX0NPTFMiLCJzZXJ2ZXJTdGF0ZSIsIm1vdmVUb0Zyb250IiwibW92ZUxlZnQiLCJmb250U2l6ZSIsInBhZGRpbmciLCJ3aWR0aCIsIm1vdmVSaWdodCIsIm1vdmVUb0JhY2siLCJidWlsZENhcmV0Q2xhc3MiLCJjYXJldFBjdCIsImxhc3RDYXJldFN0eWxlIiwiXyIsImdldCIsIiQiLCJmaW5kIiwiZW5kc1dpdGgiLCJmaW5hbENhcmV0UGN0IiwiaXNVbmRlZmluZWQiLCJjYXJldFN0eWxlIiwiYXBwZW5kIiwicG9zaXRpb25NZW51Iiwic2VsZWN0ZWRUb2dnbGUiLCJtZW51RGl2IiwiY3VyckxlZnQiLCJvZmZzZXQiLCJjdXJyVG9wIiwiZGl2V2lkdGgiLCJjc3MiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiZmluYWxMZWZ0IiwibGVmdCIsIm92ZXJsYXBQY3QiLCJNYXRoIiwiZmxvb3IiLCJ0b3AiLCJpZ25vcmVNZW51Q2xpY2tzIiwiZSIsImNvbEZpbHRlciIsImlzIiwidGFyZ2V0IiwiaGFzIiwibGVuZ3RoIiwiaGFzQ2xhc3MiLCJub2RlTmFtZSIsIlJlYWN0Q29sdW1uTWVudSIsInByb3BzIiwidXBkYXRlUG9zaXRpb24iLCJiaW5kIiwiaXNOdWxsIiwic2VsZWN0ZWRDb2wiLCJfZGl2IiwiY29sdW1uTWVudU9wZW4iLCJkYXRhSWQiLCJvcGVuQ2hhcnQiLCJjb2xDZmciLCJjb2x1bW5zIiwibmFtZSIsInVubG9ja2VkIiwiY3VyckRpciIsInNvcnRJbmZvIiwiY29sIiwiX2RpciIsImRpciIsIm9wZW5Qb3B1cCIsInR5cGUiLCJoZWlnaHQiLCJtZW51RnVuY3MiLCJzaG91bGRPcGVuUG9wdXAiLCJvcGVuIiwiYnVpbGRVUkxTdHJpbmciLCJmdWxsUGF0aCIsImFzc2lnbkluIiwidGl0bGUiLCJjYXBpdGFsaXplIiwicGljayIsIm9wZW5EZXNjcmliZSIsIm9wZW5Gb3JtYXR0aW5nIiwicHJvcGFnYXRlU3RhdGUiLCJmb3JtYXR0aW5nT3BlbiIsInNlbGVjdGVkQ29scyIsImhpZGVDb2wiLCJoaWRlQ2FsbGJhY2siLCJ1cGRhdGVkQ29sdW1ucyIsIm1hcCIsImMiLCJ2aXNpYmxlIiwidG9nZ2xlVmlzaWJpbGl0eSIsImRlbGV0ZUNvbCIsInllc0FjdGlvbiIsInJlamVjdCIsImRlbGV0ZUNvbHVtbiIsIm1zZyIsInNpemUiLCJyZW5hbWVDb2wiLCJvcGVuQWN0aW9uIiwiYWN0aW9uIiwiY2xvc2VNZW51IiwiaGlkZUNvbHVtbk1lbnUiLCJtaW5XaWR0aCIsImNtIiwiQ0xPU0VfTUVOVSIsImR0eXBlIiwiaGFzTWlzc2luZyIsImhhc091dGxpZXJzIiwibG93VmFyaWFuY2UiLCJidSIsImZsYWdJY29uIiwiYWN0aXZlIiwiY29sb3IiLCJub29wIiwidXBkYXRlU29ydCIsImxhYmVsIiwiaWNvbiIsImZ1bmMiLCJoaW50IiwiaWNuU3R5bGUiLCJhc3NpZ24iLCJsb2NrQ29scyIsInVubG9ja0NvbHMiLCJSZWFjdCIsIkNvbXBvbmVudCIsImRpc3BsYXlOYW1lIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwic3RyaW5nIiwiYXJyYXkiLCJib29sIiwiaXNSZXF1aXJlZCIsIm5vSW5mbyIsIm91dGxpZXJGaWx0ZXJzIiwib2JqZWN0IiwiUmVkdXhDb2x1bW5NZW51IiwiY29ubmVjdCIsInN0YXRlIiwiZGlzcGF0Y2giLCJjaGFydFByb3BzIiwiY29sTmFtZSIsImFjdGlvbnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQUVRQSxVLEdB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UUFBRCxFQUFXLGdCQUFYLEVBQTZCLGFBQTdCLEVBQTRDLGdCQUE1QyxDQUFkLENBQUo7QUFBQSxDQUR3QixFQUU3QixVQUFBQyxRQUFRO0FBQUEsU0FBSztBQUNYakYsYUFBUyxFQUFFLG1CQUFBa0YsVUFBVTtBQUFBLGFBQUlELFFBQVEsQ0FBQ2pGLGlFQUFTLENBQUNrRixVQUFELENBQVYsQ0FBWjtBQUFBLEtBRFY7QUFFWHRDLGtCQUFjLEVBQUUsd0JBQUF1QyxPQUFPO0FBQUEsYUFBSUYsUUFBUSxDQUFDRyxzREFBTyxDQUFDeEMsY0FBUixDQUF1QnVDLE9BQXZCLENBQUQsQ0FBWjtBQUFBO0FBRlosR0FBTDtBQUFBLENBRnFCLENBQVAsQ0FNdEI1RixlQU5zQixDQUF4QiIsImZpbGUiOiJtYWluLmQ5NTQ1ZjVkOThjYTk1ZjMwNzRmLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEdsb2JhbEhvdEtleXMgfSBmcm9tIFwicmVhY3QtaG90a2V5c1wiO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XHJcblxyXG5pbXBvcnQgQ29uZGl0aW9uYWxSZW5kZXIgZnJvbSBcIi4uLy4uL0NvbmRpdGlvbmFsUmVuZGVyXCI7XHJcbmltcG9ydCB7IG9wZW5DaGFydCB9IGZyb20gXCIuLi8uLi9hY3Rpb25zL2NoYXJ0c1wiO1xyXG5pbXBvcnQgYWN0aW9ucyBmcm9tIFwiLi4vLi4vYWN0aW9ucy9kdGFsZVwiO1xyXG5pbXBvcnQgeyBidWlsZFVSTFN0cmluZyB9IGZyb20gXCIuLi8uLi9hY3Rpb25zL3VybC11dGlsc1wiO1xyXG5pbXBvcnQgQ29sdW1uRmlsdGVyIGZyb20gXCIuLi8uLi9maWx0ZXJzL0NvbHVtbkZpbHRlclwiO1xyXG5pbXBvcnQgYnUgZnJvbSBcIi4uL2JhY2tncm91bmRVdGlsc1wiO1xyXG5pbXBvcnQgeyBleHBvcnRzIGFzIGd1IH0gZnJvbSBcIi4uL2dyaWRVdGlsc1wiO1xyXG5pbXBvcnQgbWVudUZ1bmNzIGZyb20gXCIuLi9tZW51L2RhdGFWaWV3ZXJNZW51VXRpbHNcIjtcclxuaW1wb3J0IHNlcnZlclN0YXRlIGZyb20gXCIuLi9zZXJ2ZXJTdGF0ZU1hbmFnZW1lbnRcIjtcclxuaW1wb3J0IENvbHVtbk1lbnVPcHRpb24gZnJvbSBcIi4vQ29sdW1uTWVudU9wdGlvblwiO1xyXG5cclxuY29uc3QgeyBST1dfSEVJR0hULCBTT1JUX1BST1BTIH0gPSBndTtcclxuY29uc3QgTU9WRV9DT0xTID0gW1xyXG4gIFtcInN0ZXAtYmFja3dhcmRcIiwgc2VydmVyU3RhdGUubW92ZVRvRnJvbnQsIFwiTW92ZSBDb2x1bW4gVG8gRnJvbnRcIiwge31dLFxyXG4gIFtcImNhcmV0LWxlZnRcIiwgc2VydmVyU3RhdGUubW92ZUxlZnQsIFwiTW92ZSBDb2x1bW4gTGVmdFwiLCB7IGZvbnRTaXplOiBcIjEuMmVtXCIsIHBhZGRpbmc6IDAsIHdpZHRoOiBcIjEuM2VtXCIgfV0sXHJcbiAgW1wiY2FyZXQtcmlnaHRcIiwgc2VydmVyU3RhdGUubW92ZVJpZ2h0LCBcIk1vdmUgQ29sdW1uIFJpZ2h0XCIsIHsgZm9udFNpemU6IFwiMS4yZW1cIiwgcGFkZGluZzogMCwgd2lkdGg6IFwiMS4zZW1cIiB9XSxcclxuICBbXCJzdGVwLWZvcndhcmRcIiwgc2VydmVyU3RhdGUubW92ZVRvQmFjaywgXCJNb3ZlIENvbHVtbiBUbyBCYWNrXCIsIHt9XSxcclxuXTtcclxuXHJcbmZ1bmN0aW9uIGJ1aWxkQ2FyZXRDbGFzcyhjYXJldFBjdCA9IDkwKSB7XHJcbiAgY29uc3QgbGFzdENhcmV0U3R5bGUgPSBfLmdldCgkKFwiaGVhZFwiKS5maW5kKFwic3R5bGU6bGFzdC1jaGlsZFwiKSwgXCIwLmlubmVySFRNTFwiKTtcclxuICBpZiAoXy5lbmRzV2l0aChsYXN0Q2FyZXRTdHlsZSB8fCBcIlwiLCBcIi5jb2x1bW4tdG9nZ2xlX19kcm9wZG93bjo6YWZ0ZXIge3JpZ2h0OiBcIiArIGNhcmV0UGN0ICsgXCIlfVwiKSkge1xyXG4gICAgcmV0dXJuOyAvLyBkb24ndCBjb250aW51YWxseSBhZGQgc3R5bGluZyBpZiBpdHMgYWxyZWFkeSBzZXRcclxuICB9XHJcbiAgY29uc3QgZmluYWxDYXJldFBjdCA9IF8uaXNVbmRlZmluZWQoY2FyZXRQY3QpID8gOTAgOiBjYXJldFBjdDtcclxuICBsZXQgY2FyZXRTdHlsZSA9IFwiPHN0eWxlPlwiO1xyXG4gIGNhcmV0U3R5bGUgKz0gXCIuY29sdW1uLXRvZ2dsZV9fZHJvcGRvd246OmJlZm9yZSB7cmlnaHQ6IFwiICsgZmluYWxDYXJldFBjdCArIFwiJX1cIjtcclxuICBjYXJldFN0eWxlICs9IFwiLmNvbHVtbi10b2dnbGVfX2Ryb3Bkb3duOjphZnRlciB7cmlnaHQ6IFwiICsgZmluYWxDYXJldFBjdCArIFwiJX1cIjtcclxuICBjYXJldFN0eWxlICs9IFwiPC9zdHlsZT5cIjtcclxuICAkKFwiaGVhZFwiKS5hcHBlbmQoY2FyZXRTdHlsZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBvc2l0aW9uTWVudShzZWxlY3RlZFRvZ2dsZSwgbWVudURpdikge1xyXG4gIGNvbnN0IGN1cnJMZWZ0ID0gXy5nZXQoc2VsZWN0ZWRUb2dnbGUub2Zmc2V0KCksIFwibGVmdFwiLCAwKTtcclxuICBjb25zdCBjdXJyVG9wID0gXy5nZXQoc2VsZWN0ZWRUb2dnbGUub2Zmc2V0KCksIFwidG9wXCIsIDApO1xyXG4gIGNvbnN0IGRpdldpZHRoID0gbWVudURpdi53aWR0aCgpO1xyXG4gIGNvbnN0IGNzcyA9IHt9O1xyXG4gIGlmIChjdXJyTGVmdCArIGRpdldpZHRoID4gd2luZG93LmlubmVyV2lkdGgpIHtcclxuICAgIGNvbnN0IGZpbmFsTGVmdCA9IGN1cnJMZWZ0IC0gKGN1cnJMZWZ0ICsgZGl2V2lkdGggKyAyMCAtIHdpbmRvdy5pbm5lcldpZHRoKTtcclxuICAgIGNzcy5sZWZ0ID0gZmluYWxMZWZ0O1xyXG4gICAgY29uc3Qgb3ZlcmxhcFBjdCA9IChjdXJyTGVmdCAtIChmaW5hbExlZnQgLSAyMCkpIC8gZGl2V2lkdGg7XHJcbiAgICBjb25zdCBjYXJldFBjdCA9IE1hdGguZmxvb3IoMTAwIC0gb3ZlcmxhcFBjdCAqIDEwMCk7XHJcbiAgICBidWlsZENhcmV0Q2xhc3MoY2FyZXRQY3QpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjc3MubGVmdCA9IGN1cnJMZWZ0O1xyXG4gICAgYnVpbGRDYXJldENsYXNzKCk7XHJcbiAgfVxyXG4gIGNzcy50b3AgPSBjdXJyVG9wICsgUk9XX0hFSUdIVCAtIDY7XHJcbiAgbWVudURpdi5jc3MoY3NzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaWdub3JlTWVudUNsaWNrcyhlKSB7XHJcbiAgY29uc3QgY29sRmlsdGVyID0gJChcImRpdi5jb2x1bW4tZmlsdGVyXCIpO1xyXG4gIGlmIChjb2xGaWx0ZXIgJiYgKGNvbEZpbHRlci5pcyhlLnRhcmdldCkgfHwgY29sRmlsdGVyLmhhcyhlLnRhcmdldCkubGVuZ3RoID4gMCkpIHtcclxuICAgIHJldHVybiB0cnVlOyAvLyBpZ25vcmUgZmlsdGVyIGNsaWNrc1xyXG4gIH1cclxuICBpZiAoY29sRmlsdGVyICYmICQoZS50YXJnZXQpLmhhc0NsYXNzKFwiU2VsZWN0X19vcHRpb25cIikpIHtcclxuICAgIHJldHVybiB0cnVlOyAvLyBpZ25vcmUgb3B0aW9uIHNlbGVjdGlvblxyXG4gIH1cclxuICBpZiAoY29sRmlsdGVyICYmIGUudGFyZ2V0Lm5vZGVOYW1lID09PSBcInN2Z1wiKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTsgLy8gaWdub3JlIG9wdGlvbiBzZWxlY3Rpb25cclxuICB9XHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5jbGFzcyBSZWFjdENvbHVtbk1lbnUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uID0gdGhpcy51cGRhdGVQb3NpdGlvbi5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlUG9zaXRpb24oKSB7XHJcbiAgICBpZiAoIV8uaXNOdWxsKHRoaXMucHJvcHMuc2VsZWN0ZWRDb2wpKSB7XHJcbiAgICAgIHBvc2l0aW9uTWVudSgkKGBkaXYuJHt0aGlzLnByb3BzLnNlbGVjdGVkVG9nZ2xlfWApLCAkKHRoaXMuX2RpdikpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xyXG4gICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBjb2x1bW5NZW51T3BlbiwgZGF0YUlkLCBzZWxlY3RlZENvbCwgb3BlbkNoYXJ0IH0gPSB0aGlzLnByb3BzO1xyXG4gICAgaWYgKCFzZWxlY3RlZENvbCkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGNvbnN0IGNvbENmZyA9IF8uZmluZCh0aGlzLnByb3BzLmNvbHVtbnMsIHsgbmFtZTogc2VsZWN0ZWRDb2wgfSkgfHwge307XHJcbiAgICBjb25zdCB1bmxvY2tlZCA9IF8uZ2V0KGNvbENmZywgXCJsb2NrZWRcIiwgZmFsc2UpID09PSBmYWxzZTtcclxuICAgIGxldCBjdXJyRGlyID0gXy5maW5kKHRoaXMucHJvcHMuc29ydEluZm8sIChbY29sLCBfZGlyXSkgPT4gc2VsZWN0ZWRDb2wgPT09IGNvbCk7XHJcbiAgICBjdXJyRGlyID0gXy5pc1VuZGVmaW5lZChjdXJyRGlyKSA/IFNPUlRfUFJPUFNbMl0uZGlyIDogY3VyckRpclsxXTtcclxuICAgIGNvbnN0IG9wZW5Qb3B1cCA9ICh0eXBlLCBoZWlnaHQgPSA0NTAsIHdpZHRoID0gNTAwKSA9PiAoKSA9PiB7XHJcbiAgICAgIGlmIChtZW51RnVuY3Muc2hvdWxkT3BlblBvcHVwKGhlaWdodCwgd2lkdGgpKSB7XHJcbiAgICAgICAgbWVudUZ1bmNzLm9wZW4oXHJcbiAgICAgICAgICBidWlsZFVSTFN0cmluZyhtZW51RnVuY3MuZnVsbFBhdGgoYC9kdGFsZS9wb3B1cC8ke3R5cGV9YCwgZGF0YUlkKSwge1xyXG4gICAgICAgICAgICBzZWxlY3RlZENvbCxcclxuICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgbnVsbCxcclxuICAgICAgICAgIGhlaWdodCxcclxuICAgICAgICAgIHdpZHRoXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBvcGVuQ2hhcnQoXHJcbiAgICAgICAgICBfLmFzc2lnbkluKFxyXG4gICAgICAgICAgICB7IHR5cGUsIHRpdGxlOiBfLmNhcGl0YWxpemUodHlwZSkgfSxcclxuICAgICAgICAgICAgXy5waWNrKHRoaXMucHJvcHMsIFtcInNlbGVjdGVkQ29sXCIsIFwicHJvcGFnYXRlU3RhdGVcIiwgXCJjb2x1bW5zXCJdKVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICBjb25zdCBvcGVuRGVzY3JpYmUgPSAoKSA9PlxyXG4gICAgICB3aW5kb3cub3BlbihcclxuICAgICAgICBidWlsZFVSTFN0cmluZyhtZW51RnVuY3MuZnVsbFBhdGgoXCIvZHRhbGUvcG9wdXAvZGVzY3JpYmVcIiwgZGF0YUlkKSwge1xyXG4gICAgICAgICAgc2VsZWN0ZWRDb2wsXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgXCJfYmxhbmtcIlxyXG4gICAgICApO1xyXG4gICAgY29uc3Qgb3BlbkZvcm1hdHRpbmcgPSAoKSA9PlxyXG4gICAgICB0aGlzLnByb3BzLnByb3BhZ2F0ZVN0YXRlKHtcclxuICAgICAgICBmb3JtYXR0aW5nT3BlbjogdHJ1ZSxcclxuICAgICAgICBzZWxlY3RlZENvbHM6IFtzZWxlY3RlZENvbF0sXHJcbiAgICAgIH0pO1xyXG4gICAgY29uc3QgaGlkZUNvbCA9ICgpID0+IHtcclxuICAgICAgY29uc3QgaGlkZUNhbGxiYWNrID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVwZGF0ZWRDb2x1bW5zID0gXy5tYXAodGhpcy5wcm9wcy5jb2x1bW5zLCBjID0+XHJcbiAgICAgICAgICBfLmFzc2lnbkluKHt9LCBjLCBjLm5hbWUgPT09IHNlbGVjdGVkQ29sID8geyB2aXNpYmxlOiAhYy52aXNpYmxlIH0gOiB7fSlcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMucHJvcHMucHJvcGFnYXRlU3RhdGUoeyBjb2x1bW5zOiB1cGRhdGVkQ29sdW1ucyB9KTtcclxuICAgICAgfTtcclxuICAgICAgc2VydmVyU3RhdGUudG9nZ2xlVmlzaWJpbGl0eShkYXRhSWQsIHNlbGVjdGVkQ29sLCBoaWRlQ2FsbGJhY2spO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IGRlbGV0ZUNvbCA9ICgpID0+IHtcclxuICAgICAgY29uc3QgeWVzQWN0aW9uID0gKCkgPT5cclxuICAgICAgICB0aGlzLnByb3BzLnByb3BhZ2F0ZVN0YXRlKFxyXG4gICAgICAgICAgeyBjb2x1bW5zOiBfLnJlamVjdCh0aGlzLnByb3BzLmNvbHVtbnMsIHsgbmFtZTogc2VsZWN0ZWRDb2wgfSkgfSxcclxuICAgICAgICAgIHNlcnZlclN0YXRlLmRlbGV0ZUNvbHVtbihkYXRhSWQsIHNlbGVjdGVkQ29sKVxyXG4gICAgICAgICk7XHJcbiAgICAgIGNvbnN0IG1zZyA9IGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoZSBjb2x1bW4gXCIke3NlbGVjdGVkQ29sfVwiP2A7XHJcbiAgICAgIGNvbnN0IHRpdGxlID0gYERlbGV0ZSBjb2x1bW4gLSAke3NlbGVjdGVkQ29sfWA7XHJcbiAgICAgIG9wZW5DaGFydCh7IHR5cGU6IFwiY29uZmlybVwiLCB0aXRsZSwgbXNnLCB5ZXNBY3Rpb24sIHNpemU6IFwibW9kYWwtc21cIiB9KTtcclxuICAgIH07XHJcbiAgICBjb25zdCByZW5hbWVDb2wgPSAoKSA9PlxyXG4gICAgICBvcGVuQ2hhcnQoe1xyXG4gICAgICAgIHR5cGU6IFwicmVuYW1lXCIsXHJcbiAgICAgICAgc2VsZWN0ZWRDb2wsXHJcbiAgICAgICAgY29sdW1uczogdGhpcy5wcm9wcy5jb2x1bW5zLFxyXG4gICAgICAgIHNpemU6IFwibW9kYWwtc21cIixcclxuICAgICAgfSk7XHJcbiAgICBjb25zdCBvcGVuQWN0aW9uID0gYWN0aW9uID0+IG9wZW5Qb3B1cChhY3Rpb24sIDQwMCwgNzcwKTtcclxuICAgIGNvbnN0IGNsb3NlTWVudSA9ICgpID0+IHRoaXMucHJvcHMuaGlkZUNvbHVtbk1lbnUoc2VsZWN0ZWRDb2wpO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdlxyXG4gICAgICAgIGlkPVwiY29sdW1uLW1lbnUtZGl2XCJcclxuICAgICAgICBjbGFzc05hbWU9XCJjb2x1bW4tdG9nZ2xlX19kcm9wZG93blwiXHJcbiAgICAgICAgaGlkZGVuPXshY29sdW1uTWVudU9wZW59XHJcbiAgICAgICAgc3R5bGU9e3sgbWluV2lkdGg6IFwiMTFlbVwiIH19XHJcbiAgICAgICAgcmVmPXtjbSA9PiAodGhpcy5fZGl2ID0gY20pfT5cclxuICAgICAgICB7Y29sdW1uTWVudU9wZW4gJiYgPEdsb2JhbEhvdEtleXMga2V5TWFwPXt7IENMT1NFX01FTlU6IFwiZXNjXCIgfX0gaGFuZGxlcnM9e3sgQ0xPU0VfTUVOVTogY2xvc2VNZW51IH19IC8+fVxyXG4gICAgICAgIDxoZWFkZXI+XHJcbiAgICAgICAgICA8c3Bhbj57YENvbHVtbiBcIiR7c2VsZWN0ZWRDb2x9XCJgfTwvc3Bhbj5cclxuICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJjb2wtbWVudS1kZXNjcmlwdG9yc1wiPlxyXG4gICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAge1wiRGF0YSBUeXBlOlwifVxyXG4gICAgICAgICAgICAgIDxzcGFuPntjb2xDZmcuZHR5cGV9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICB7Y29sQ2ZnLmhhc01pc3NpbmcgPiAwICYmIChcclxuICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICB7XCIjIE1pc3Npbmc6XCJ9XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj57Y29sQ2ZnLmhhc01pc3Npbmd9PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIHtjb2xDZmcuaGFzT3V0bGllcnMgPiAwICYmIChcclxuICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICB7XCIjIE91dGxpZXJzOlwifVxyXG4gICAgICAgICAgICAgICAgPHNwYW4+e2NvbENmZy5oYXNPdXRsaWVyc308L3NwYW4+XHJcbiAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAge2NvbENmZy5sb3dWYXJpYW5jZSAmJiAoXHJcbiAgICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAge2Ake2J1LmZsYWdJY29ufUxvdyBWYXJpYW5jZTpgfVxyXG4gICAgICAgICAgICAgICAgPHNwYW4+VHJ1ZTwvc3Bhbj5cclxuICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgPC91bD5cclxuICAgICAgICA8L2hlYWRlcj5cclxuICAgICAgICA8dWw+XHJcbiAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRvZ2dsZXItYWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtc29ydCBtbC00IG1yLTRcIiAvPlxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIGNvbXBhY3QgbS1hdXRvIGZvbnQtd2VpZ2h0LWJvbGQgY29sdW1uLXNvcnRpbmdcIj5cclxuICAgICAgICAgICAgICB7Xy5tYXAoU09SVF9QUk9QUywgKHsgZGlyLCBjb2wgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gZGlyID09PSBjdXJyRGlyO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgIGtleT17ZGlyfVxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXthY3RpdmUgPyB7fSA6IHsgY29sb3I6IFwiIzU2NWI2OFwiIH19XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYnRuIGJ0bi1wcmltYXJ5ICR7YWN0aXZlID8gXCJhY3RpdmVcIiA6IFwiXCJ9IGZvbnQtd2VpZ2h0LWJvbGRgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2FjdGl2ZSA/IF8ubm9vcCA6ICgpID0+IG1lbnVGdW5jcy51cGRhdGVTb3J0KFtzZWxlY3RlZENvbF0sIGRpciwgdGhpcy5wcm9wcyl9XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2FjdGl2ZX0+XHJcbiAgICAgICAgICAgICAgICAgICAge2NvbC5sYWJlbH1cclxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRvZ2dsZXItYWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiaWNvLXN3YXAtaG9yaXpcIiAvPlxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIGNvbXBhY3QgbS1hdXRvIGZvbnQtd2VpZ2h0LWJvbGQgY29sdW1uLXNvcnRpbmdcIj5cclxuICAgICAgICAgICAgICB7Xy5tYXAoTU9WRV9DT0xTLCAoW2ljb24sIGZ1bmMsIGhpbnQsIGljblN0eWxlXSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICBrZXk9e2ljb259XHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXtfLmFzc2lnbih7IGNvbG9yOiBcIiM1NjViNjhcIiwgd2lkdGg6IFwiMmVtXCIgfSwgaWNuU3R5bGUpfVxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BidG4gYnRuLXByaW1hcnkgZm9udC13ZWlnaHQtYm9sZGB9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2Z1bmMoc2VsZWN0ZWRDb2wsIHRoaXMucHJvcHMpfVxyXG4gICAgICAgICAgICAgICAgICB0aXRsZT17aGludH0+XHJcbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT17YGZhcyBmYS0ke2ljb259YH0gLz5cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICA8Q29uZGl0aW9uYWxSZW5kZXIgZGlzcGxheT17dW5sb2NrZWR9PlxyXG4gICAgICAgICAgICA8Q29sdW1uTWVudU9wdGlvblxyXG4gICAgICAgICAgICAgIG9wZW49e3NlcnZlclN0YXRlLmxvY2tDb2xzKFtzZWxlY3RlZENvbF0sIHRoaXMucHJvcHMpfVxyXG4gICAgICAgICAgICAgIGxhYmVsPVwiTG9ja1wiXHJcbiAgICAgICAgICAgICAgaWNvbkNsYXNzPVwiZmEgZmEtbG9jayBtbC0zIG1yLTRcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9Db25kaXRpb25hbFJlbmRlcj5cclxuICAgICAgICAgIDxDb25kaXRpb25hbFJlbmRlciBkaXNwbGF5PXshdW5sb2NrZWR9PlxyXG4gICAgICAgICAgICA8Q29sdW1uTWVudU9wdGlvblxyXG4gICAgICAgICAgICAgIG9wZW49e3NlcnZlclN0YXRlLnVubG9ja0NvbHMoW3NlbGVjdGVkQ29sXSwgdGhpcy5wcm9wcyl9XHJcbiAgICAgICAgICAgICAgbGFiZWw9XCJVbmxvY2tcIlxyXG4gICAgICAgICAgICAgIGljb25DbGFzcz1cImZhIGZhLWxvY2stb3BlbiBtbC0yIG1yLTRcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9Db25kaXRpb25hbFJlbmRlcj5cclxuICAgICAgICAgIDxDb2x1bW5NZW51T3B0aW9uIG9wZW49e2hpZGVDb2x9IGxhYmVsPVwiSGlkZVwiIGljb25DbGFzcz1cImljby12aXNpYmlsaXR5LW9mZlwiIC8+XHJcbiAgICAgICAgICA8Q29sdW1uTWVudU9wdGlvbiBvcGVuPXtkZWxldGVDb2x9IGxhYmVsPVwiRGVsZXRlXCIgaWNvbkNsYXNzPVwiaWNvLWRlbGV0ZVwiIC8+XHJcbiAgICAgICAgICA8Q29sdW1uTWVudU9wdGlvbiBvcGVuPXtyZW5hbWVDb2x9IGxhYmVsPVwiUmVuYW1lXCIgaWNvbkNsYXNzPVwiaWNvLWVkaXRcIiAvPlxyXG4gICAgICAgICAgPENvbHVtbk1lbnVPcHRpb24gb3Blbj17b3BlbkFjdGlvbihcInJlcGxhY2VtZW50XCIpfSBsYWJlbD1cIlJlcGxhY2VtZW50c1wiIGljb25DbGFzcz1cImZhcyBmYS1iYWNrc3BhY2UgbXItM1wiIC8+XHJcbiAgICAgICAgICA8Q29sdW1uTWVudU9wdGlvbiBvcGVuPXtvcGVuQWN0aW9uKFwidHlwZS1jb252ZXJzaW9uXCIpfSBsYWJlbD1cIlR5cGUgQ29udmVyc2lvblwiIGljb25DbGFzcz1cImljby1zd2FwLWhvcml6XCIgLz5cclxuICAgICAgICAgIDxDb2x1bW5NZW51T3B0aW9uIG9wZW49e29wZW5BY3Rpb24oXCJkdXBsaWNhdGVzXCIpfSBsYWJlbD1cIkR1cGxpY2F0ZXNcIiBpY29uQ2xhc3M9XCJmYXMgZmEtY2xvbmUgbWwtMiBtci00XCIgLz5cclxuICAgICAgICAgIDxDb2x1bW5NZW51T3B0aW9uIG9wZW49e29wZW5EZXNjcmliZX0gbGFiZWw9XCJEZXNjcmliZVwiIGljb25DbGFzcz1cImljby12aWV3LWNvbHVtblwiIC8+XHJcbiAgICAgICAgICA8Q29sdW1uTWVudU9wdGlvblxyXG4gICAgICAgICAgICBvcGVuPXtvcGVuUG9wdXAoXCJjb2x1bW4tYW5hbHlzaXNcIiwgNDI1LCA4MTApfVxyXG4gICAgICAgICAgICBsYWJlbD1cIkNvbHVtbiBBbmFseXNpc1wiXHJcbiAgICAgICAgICAgIGljb25DbGFzcz1cImljby1lcXVhbGl6ZXJcIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxDb2x1bW5NZW51T3B0aW9uIG9wZW49e29wZW5Gb3JtYXR0aW5nfSBsYWJlbD1cIkZvcm1hdHNcIiBpY29uQ2xhc3M9XCJpY28tcGFsZXR0ZVwiIC8+XHJcbiAgICAgICAgICB7Xy5oYXMoY29sQ2ZnLCBcImxvd1ZhcmlhbmNlXCIpICYmIChcclxuICAgICAgICAgICAgPENvbHVtbk1lbnVPcHRpb25cclxuICAgICAgICAgICAgICBvcGVuPXtvcGVuUG9wdXAoXCJ2YXJpYW5jZVwiLCA0MDAsIDc3MCl9XHJcbiAgICAgICAgICAgICAgbGFiZWw9XCJWYXJpYW5jZSBSZXBvcnRcIlxyXG4gICAgICAgICAgICAgIGljb25DbGFzcz1cImZhcyBmYS1jaGFydC1iYXIgbWwtMiBtci00XCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgICA8Q29sdW1uRmlsdGVyIHsuLi50aGlzLnByb3BzfSAvPlxyXG4gICAgICAgIDwvdWw+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuUmVhY3RDb2x1bW5NZW51LmRpc3BsYXlOYW1lID0gXCJSZWFjdENvbHVtbk1lbnVcIjtcclxuUmVhY3RDb2x1bW5NZW51LnByb3BUeXBlcyA9IHtcclxuICBzZWxlY3RlZENvbDogUHJvcFR5cGVzLnN0cmluZyxcclxuICBzZWxlY3RlZFRvZ2dsZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICBjb2x1bW5zOiBQcm9wVHlwZXMuYXJyYXksXHJcbiAgY29sdW1uTWVudU9wZW46IFByb3BUeXBlcy5ib29sLFxyXG4gIHNvcnRJbmZvOiBQcm9wVHlwZXMuYXJyYXksXHJcbiAgcHJvcGFnYXRlU3RhdGU6IFByb3BUeXBlcy5mdW5jLFxyXG4gIGRhdGFJZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gIG5vSW5mbzogUHJvcFR5cGVzLmJvb2wsXHJcbiAgb3BlbkNoYXJ0OiBQcm9wVHlwZXMuZnVuYyxcclxuICBoaWRlQ29sdW1uTWVudTogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgb3V0bGllckZpbHRlcnM6IFByb3BUeXBlcy5vYmplY3QsXHJcbn07XHJcblxyXG5jb25zdCBSZWR1eENvbHVtbk1lbnUgPSBjb25uZWN0KFxyXG4gIHN0YXRlID0+IF8ucGljayhzdGF0ZSwgW1wiZGF0YUlkXCIsIFwiY29sdW1uTWVudU9wZW5cIiwgXCJzZWxlY3RlZENvbFwiLCBcInNlbGVjdGVkVG9nZ2xlXCJdKSxcclxuICBkaXNwYXRjaCA9PiAoe1xyXG4gICAgb3BlbkNoYXJ0OiBjaGFydFByb3BzID0+IGRpc3BhdGNoKG9wZW5DaGFydChjaGFydFByb3BzKSksXHJcbiAgICBoaWRlQ29sdW1uTWVudTogY29sTmFtZSA9PiBkaXNwYXRjaChhY3Rpb25zLmhpZGVDb2x1bW5NZW51KGNvbE5hbWUpKSxcclxuICB9KVxyXG4pKFJlYWN0Q29sdW1uTWVudSk7XHJcblxyXG5leHBvcnQgeyBSZWR1eENvbHVtbk1lbnUgYXMgQ29sdW1uTWVudSwgUmVhY3RDb2x1bW5NZW51LCBwb3NpdGlvbk1lbnUsIGlnbm9yZU1lbnVDbGlja3MgfTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==