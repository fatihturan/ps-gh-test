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
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
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
        open: openPopup("column-analysis", 425, 810),
        label: "Column Analysis",
        iconClass: "ico-equalizer"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdGF0aWMvZHRhbGUvY29sdW1uL0NvbHVtbk1lbnUuanN4Il0sIm5hbWVzIjpbIlJPV19IRUlHSFQiLCJndSIsIlNPUlRfUFJPUFMiLCJNT1ZFX0NPTFMiLCJzZXJ2ZXJTdGF0ZSIsIm1vdmVUb0Zyb250IiwibW92ZUxlZnQiLCJmb250U2l6ZSIsInBhZGRpbmciLCJ3aWR0aCIsIm1vdmVSaWdodCIsIm1vdmVUb0JhY2siLCJidWlsZENhcmV0Q2xhc3MiLCJjYXJldFBjdCIsImxhc3RDYXJldFN0eWxlIiwiXyIsImdldCIsIiQiLCJmaW5kIiwiZW5kc1dpdGgiLCJmaW5hbENhcmV0UGN0IiwiaXNVbmRlZmluZWQiLCJjYXJldFN0eWxlIiwiYXBwZW5kIiwicG9zaXRpb25NZW51Iiwic2VsZWN0ZWRUb2dnbGUiLCJtZW51RGl2IiwiY3VyckxlZnQiLCJvZmZzZXQiLCJjdXJyVG9wIiwiZGl2V2lkdGgiLCJjc3MiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiZmluYWxMZWZ0IiwibGVmdCIsIm92ZXJsYXBQY3QiLCJNYXRoIiwiZmxvb3IiLCJ0b3AiLCJpZ25vcmVNZW51Q2xpY2tzIiwiZSIsImNvbEZpbHRlciIsImlzIiwidGFyZ2V0IiwiaGFzIiwibGVuZ3RoIiwiaGFzQ2xhc3MiLCJub2RlTmFtZSIsIlJlYWN0Q29sdW1uTWVudSIsInByb3BzIiwidXBkYXRlUG9zaXRpb24iLCJiaW5kIiwiaXNOdWxsIiwic2VsZWN0ZWRDb2wiLCJfZGl2IiwiY29sdW1uTWVudU9wZW4iLCJkYXRhSWQiLCJvcGVuQ2hhcnQiLCJjb2xDZmciLCJjb2x1bW5zIiwibmFtZSIsInVubG9ja2VkIiwiY3VyckRpciIsInNvcnRJbmZvIiwiY29sIiwiX2RpciIsImRpciIsIm9wZW5Qb3B1cCIsInR5cGUiLCJoZWlnaHQiLCJtZW51RnVuY3MiLCJzaG91bGRPcGVuUG9wdXAiLCJvcGVuIiwiYnVpbGRVUkxTdHJpbmciLCJmdWxsUGF0aCIsImFzc2lnbkluIiwidGl0bGUiLCJjYXBpdGFsaXplIiwicGljayIsIm9wZW5EZXNjcmliZSIsIm9wZW5Gb3JtYXR0aW5nIiwicHJvcGFnYXRlU3RhdGUiLCJmb3JtYXR0aW5nT3BlbiIsInNlbGVjdGVkQ29scyIsImhpZGVDb2wiLCJoaWRlQ2FsbGJhY2siLCJ1cGRhdGVkQ29sdW1ucyIsIm1hcCIsImMiLCJ2aXNpYmxlIiwidG9nZ2xlVmlzaWJpbGl0eSIsImRlbGV0ZUNvbCIsInllc0FjdGlvbiIsInJlamVjdCIsImRlbGV0ZUNvbHVtbiIsIm1zZyIsInNpemUiLCJyZW5hbWVDb2wiLCJvcGVuQWN0aW9uIiwiYWN0aW9uIiwiY2xvc2VNZW51IiwiaGlkZUNvbHVtbk1lbnUiLCJtaW5XaWR0aCIsImNtIiwiQ0xPU0VfTUVOVSIsImFjdGl2ZSIsImNvbG9yIiwibm9vcCIsInVwZGF0ZVNvcnQiLCJsYWJlbCIsImljb24iLCJmdW5jIiwiaGludCIsImljblN0eWxlIiwiYXNzaWduIiwibG9ja0NvbHMiLCJ1bmxvY2tDb2xzIiwiUmVhY3QiLCJDb21wb25lbnQiLCJkaXNwbGF5TmFtZSIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsInN0cmluZyIsImFycmF5IiwiYm9vbCIsImlzUmVxdWlyZWQiLCJub0luZm8iLCJvdXRsaWVyRmlsdGVycyIsIm9iamVjdCIsIlJlZHV4Q29sdW1uTWVudSIsImNvbm5lY3QiLCJzdGF0ZSIsImRpc3BhdGNoIiwiY2hhcnRQcm9wcyIsImNvbE5hbWUiLCJhY3Rpb25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7SUFFUUEsVSxHQUEyQkMsbUQsQ0FBM0JELFU7SUFBWUUsVSxHQUFlRCxtRCxDQUFmQyxVO0FBQ3BCLElBQU1DLFNBQVMsR0FBRyxD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Q0FBQ0csc0RBQU8sQ0FBQ2xDLGNBQVIsQ0FBdUJpQyxPQUF2QixDQUFELENBQVo7QUFBQTtBQUZaLEdBQUw7QUFBQSxDQUZxQixDQUFQLENBTXRCdEYsZUFOc0IsQ0FBeEIiLCJmaWxlIjoibWFpbi5hYWU1YzI5Y2ZmZmYxMzU5NzhjNi5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSBcImpxdWVyeVwiO1xyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBHbG9iYWxIb3RLZXlzIH0gZnJvbSBcInJlYWN0LWhvdGtleXNcIjtcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xyXG5cclxuaW1wb3J0IENvbmRpdGlvbmFsUmVuZGVyIGZyb20gXCIuLi8uLi9Db25kaXRpb25hbFJlbmRlclwiO1xyXG5pbXBvcnQgeyBvcGVuQ2hhcnQgfSBmcm9tIFwiLi4vLi4vYWN0aW9ucy9jaGFydHNcIjtcclxuaW1wb3J0IGFjdGlvbnMgZnJvbSBcIi4uLy4uL2FjdGlvbnMvZHRhbGVcIjtcclxuaW1wb3J0IHsgYnVpbGRVUkxTdHJpbmcgfSBmcm9tIFwiLi4vLi4vYWN0aW9ucy91cmwtdXRpbHNcIjtcclxuaW1wb3J0IENvbHVtbkZpbHRlciBmcm9tIFwiLi4vLi4vZmlsdGVycy9Db2x1bW5GaWx0ZXJcIjtcclxuaW1wb3J0IGJ1IGZyb20gXCIuLi9iYWNrZ3JvdW5kVXRpbHNcIjtcclxuaW1wb3J0IHsgZXhwb3J0cyBhcyBndSB9IGZyb20gXCIuLi9ncmlkVXRpbHNcIjtcclxuaW1wb3J0IG1lbnVGdW5jcyBmcm9tIFwiLi4vbWVudS9kYXRhVmlld2VyTWVudVV0aWxzXCI7XHJcbmltcG9ydCBzZXJ2ZXJTdGF0ZSBmcm9tIFwiLi4vc2VydmVyU3RhdGVNYW5hZ2VtZW50XCI7XHJcbmltcG9ydCBDb2x1bW5NZW51T3B0aW9uIGZyb20gXCIuL0NvbHVtbk1lbnVPcHRpb25cIjtcclxuXHJcbmNvbnN0IHsgUk9XX0hFSUdIVCwgU09SVF9QUk9QUyB9ID0gZ3U7XHJcbmNvbnN0IE1PVkVfQ09MUyA9IFtcclxuICBbXCJzdGVwLWJhY2t3YXJkXCIsIHNlcnZlclN0YXRlLm1vdmVUb0Zyb250LCBcIk1vdmUgQ29sdW1uIFRvIEZyb250XCIsIHt9XSxcclxuICBbXCJjYXJldC1sZWZ0XCIsIHNlcnZlclN0YXRlLm1vdmVMZWZ0LCBcIk1vdmUgQ29sdW1uIExlZnRcIiwgeyBmb250U2l6ZTogXCIxLjJlbVwiLCBwYWRkaW5nOiAwLCB3aWR0aDogXCIxLjNlbVwiIH1dLFxyXG4gIFtcImNhcmV0LXJpZ2h0XCIsIHNlcnZlclN0YXRlLm1vdmVSaWdodCwgXCJNb3ZlIENvbHVtbiBSaWdodFwiLCB7IGZvbnRTaXplOiBcIjEuMmVtXCIsIHBhZGRpbmc6IDAsIHdpZHRoOiBcIjEuM2VtXCIgfV0sXHJcbiAgW1wic3RlcC1mb3J3YXJkXCIsIHNlcnZlclN0YXRlLm1vdmVUb0JhY2ssIFwiTW92ZSBDb2x1bW4gVG8gQmFja1wiLCB7fV0sXHJcbl07XHJcblxyXG5mdW5jdGlvbiBidWlsZENhcmV0Q2xhc3MoY2FyZXRQY3QgPSA5MCkge1xyXG4gIGNvbnN0IGxhc3RDYXJldFN0eWxlID0gXy5nZXQoJChcImhlYWRcIikuZmluZChcInN0eWxlOmxhc3QtY2hpbGRcIiksIFwiMC5pbm5lckhUTUxcIik7XHJcbiAgaWYgKF8uZW5kc1dpdGgobGFzdENhcmV0U3R5bGUgfHwgXCJcIiwgXCIuY29sdW1uLXRvZ2dsZV9fZHJvcGRvd246OmFmdGVyIHtyaWdodDogXCIgKyBjYXJldFBjdCArIFwiJX1cIikpIHtcclxuICAgIHJldHVybjsgLy8gZG9uJ3QgY29udGludWFsbHkgYWRkIHN0eWxpbmcgaWYgaXRzIGFscmVhZHkgc2V0XHJcbiAgfVxyXG4gIGNvbnN0IGZpbmFsQ2FyZXRQY3QgPSBfLmlzVW5kZWZpbmVkKGNhcmV0UGN0KSA/IDkwIDogY2FyZXRQY3Q7XHJcbiAgbGV0IGNhcmV0U3R5bGUgPSBcIjxzdHlsZT5cIjtcclxuICBjYXJldFN0eWxlICs9IFwiLmNvbHVtbi10b2dnbGVfX2Ryb3Bkb3duOjpiZWZvcmUge3JpZ2h0OiBcIiArIGZpbmFsQ2FyZXRQY3QgKyBcIiV9XCI7XHJcbiAgY2FyZXRTdHlsZSArPSBcIi5jb2x1bW4tdG9nZ2xlX19kcm9wZG93bjo6YWZ0ZXIge3JpZ2h0OiBcIiArIGZpbmFsQ2FyZXRQY3QgKyBcIiV9XCI7XHJcbiAgY2FyZXRTdHlsZSArPSBcIjwvc3R5bGU+XCI7XHJcbiAgJChcImhlYWRcIikuYXBwZW5kKGNhcmV0U3R5bGUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwb3NpdGlvbk1lbnUoc2VsZWN0ZWRUb2dnbGUsIG1lbnVEaXYpIHtcclxuICBjb25zdCBjdXJyTGVmdCA9IF8uZ2V0KHNlbGVjdGVkVG9nZ2xlLm9mZnNldCgpLCBcImxlZnRcIiwgMCk7XHJcbiAgY29uc3QgY3VyclRvcCA9IF8uZ2V0KHNlbGVjdGVkVG9nZ2xlLm9mZnNldCgpLCBcInRvcFwiLCAwKTtcclxuICBjb25zdCBkaXZXaWR0aCA9IG1lbnVEaXYud2lkdGgoKTtcclxuICBjb25zdCBjc3MgPSB7fTtcclxuICBpZiAoY3VyckxlZnQgKyBkaXZXaWR0aCA+IHdpbmRvdy5pbm5lcldpZHRoKSB7XHJcbiAgICBjb25zdCBmaW5hbExlZnQgPSBjdXJyTGVmdCAtIChjdXJyTGVmdCArIGRpdldpZHRoICsgMjAgLSB3aW5kb3cuaW5uZXJXaWR0aCk7XHJcbiAgICBjc3MubGVmdCA9IGZpbmFsTGVmdDtcclxuICAgIGNvbnN0IG92ZXJsYXBQY3QgPSAoY3VyckxlZnQgLSAoZmluYWxMZWZ0IC0gMjApKSAvIGRpdldpZHRoO1xyXG4gICAgY29uc3QgY2FyZXRQY3QgPSBNYXRoLmZsb29yKDEwMCAtIG92ZXJsYXBQY3QgKiAxMDApO1xyXG4gICAgYnVpbGRDYXJldENsYXNzKGNhcmV0UGN0KTtcclxuICB9IGVsc2Uge1xyXG4gICAgY3NzLmxlZnQgPSBjdXJyTGVmdDtcclxuICAgIGJ1aWxkQ2FyZXRDbGFzcygpO1xyXG4gIH1cclxuICBjc3MudG9wID0gY3VyclRvcCArIFJPV19IRUlHSFQgLSA2O1xyXG4gIG1lbnVEaXYuY3NzKGNzcyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlnbm9yZU1lbnVDbGlja3MoZSkge1xyXG4gIGNvbnN0IGNvbEZpbHRlciA9ICQoXCJkaXYuY29sdW1uLWZpbHRlclwiKTtcclxuICBpZiAoY29sRmlsdGVyICYmIChjb2xGaWx0ZXIuaXMoZS50YXJnZXQpIHx8IGNvbEZpbHRlci5oYXMoZS50YXJnZXQpLmxlbmd0aCA+IDApKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTsgLy8gaWdub3JlIGZpbHRlciBjbGlja3NcclxuICB9XHJcbiAgaWYgKGNvbEZpbHRlciAmJiAkKGUudGFyZ2V0KS5oYXNDbGFzcyhcIlNlbGVjdF9fb3B0aW9uXCIpKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTsgLy8gaWdub3JlIG9wdGlvbiBzZWxlY3Rpb25cclxuICB9XHJcbiAgaWYgKGNvbEZpbHRlciAmJiBlLnRhcmdldC5ub2RlTmFtZSA9PT0gXCJzdmdcIikge1xyXG4gICAgcmV0dXJuIHRydWU7IC8vIGlnbm9yZSBvcHRpb24gc2VsZWN0aW9uXHJcbiAgfVxyXG4gIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuY2xhc3MgUmVhY3RDb2x1bW5NZW51IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy51cGRhdGVQb3NpdGlvbiA9IHRoaXMudXBkYXRlUG9zaXRpb24uYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVBvc2l0aW9uKCkge1xyXG4gICAgaWYgKCFfLmlzTnVsbCh0aGlzLnByb3BzLnNlbGVjdGVkQ29sKSkge1xyXG4gICAgICBwb3NpdGlvbk1lbnUoJChgZGl2LiR7dGhpcy5wcm9wcy5zZWxlY3RlZFRvZ2dsZX1gKSwgJCh0aGlzLl9kaXYpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcclxuICAgIHRoaXMudXBkYXRlUG9zaXRpb24oKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgY29sdW1uTWVudU9wZW4sIGRhdGFJZCwgc2VsZWN0ZWRDb2wsIG9wZW5DaGFydCB9ID0gdGhpcy5wcm9wcztcclxuICAgIGlmICghc2VsZWN0ZWRDb2wpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBjb25zdCBjb2xDZmcgPSBfLmZpbmQodGhpcy5wcm9wcy5jb2x1bW5zLCB7IG5hbWU6IHNlbGVjdGVkQ29sIH0pIHx8IHt9O1xyXG4gICAgY29uc3QgdW5sb2NrZWQgPSBfLmdldChjb2xDZmcsIFwibG9ja2VkXCIsIGZhbHNlKSA9PT0gZmFsc2U7XHJcbiAgICBsZXQgY3VyckRpciA9IF8uZmluZCh0aGlzLnByb3BzLnNvcnRJbmZvLCAoW2NvbCwgX2Rpcl0pID0+IHNlbGVjdGVkQ29sID09PSBjb2wpO1xyXG4gICAgY3VyckRpciA9IF8uaXNVbmRlZmluZWQoY3VyckRpcikgPyBTT1JUX1BST1BTWzJdLmRpciA6IGN1cnJEaXJbMV07XHJcbiAgICBjb25zdCBvcGVuUG9wdXAgPSAodHlwZSwgaGVpZ2h0ID0gNDUwLCB3aWR0aCA9IDUwMCkgPT4gKCkgPT4ge1xyXG4gICAgICBpZiAobWVudUZ1bmNzLnNob3VsZE9wZW5Qb3B1cChoZWlnaHQsIHdpZHRoKSkge1xyXG4gICAgICAgIG1lbnVGdW5jcy5vcGVuKFxyXG4gICAgICAgICAgYnVpbGRVUkxTdHJpbmcobWVudUZ1bmNzLmZ1bGxQYXRoKGAvZHRhbGUvcG9wdXAvJHt0eXBlfWAsIGRhdGFJZCksIHtcclxuICAgICAgICAgICAgc2VsZWN0ZWRDb2wsXHJcbiAgICAgICAgICB9KSxcclxuICAgICAgICAgIG51bGwsXHJcbiAgICAgICAgICBoZWlnaHQsXHJcbiAgICAgICAgICB3aWR0aFxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgb3BlbkNoYXJ0KFxyXG4gICAgICAgICAgXy5hc3NpZ25JbihcclxuICAgICAgICAgICAgeyB0eXBlLCB0aXRsZTogXy5jYXBpdGFsaXplKHR5cGUpIH0sXHJcbiAgICAgICAgICAgIF8ucGljayh0aGlzLnByb3BzLCBbXCJzZWxlY3RlZENvbFwiLCBcInByb3BhZ2F0ZVN0YXRlXCIsIFwiY29sdW1uc1wiXSlcclxuICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb3BlbkRlc2NyaWJlID0gKCkgPT5cclxuICAgICAgd2luZG93Lm9wZW4oXHJcbiAgICAgICAgYnVpbGRVUkxTdHJpbmcobWVudUZ1bmNzLmZ1bGxQYXRoKFwiL2R0YWxlL3BvcHVwL2Rlc2NyaWJlXCIsIGRhdGFJZCksIHtcclxuICAgICAgICAgIHNlbGVjdGVkQ29sLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIFwiX2JsYW5rXCJcclxuICAgICAgKTtcclxuICAgIGNvbnN0IG9wZW5Gb3JtYXR0aW5nID0gKCkgPT5cclxuICAgICAgdGhpcy5wcm9wcy5wcm9wYWdhdGVTdGF0ZSh7XHJcbiAgICAgICAgZm9ybWF0dGluZ09wZW46IHRydWUsXHJcbiAgICAgICAgc2VsZWN0ZWRDb2xzOiBbc2VsZWN0ZWRDb2xdLFxyXG4gICAgICB9KTtcclxuICAgIGNvbnN0IGhpZGVDb2wgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGhpZGVDYWxsYmFjayA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCB1cGRhdGVkQ29sdW1ucyA9IF8ubWFwKHRoaXMucHJvcHMuY29sdW1ucywgYyA9PlxyXG4gICAgICAgICAgXy5hc3NpZ25Jbih7fSwgYywgYy5uYW1lID09PSBzZWxlY3RlZENvbCA/IHsgdmlzaWJsZTogIWMudmlzaWJsZSB9IDoge30pXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLnByb3BzLnByb3BhZ2F0ZVN0YXRlKHsgY29sdW1uczogdXBkYXRlZENvbHVtbnMgfSk7XHJcbiAgICAgIH07XHJcbiAgICAgIHNlcnZlclN0YXRlLnRvZ2dsZVZpc2liaWxpdHkoZGF0YUlkLCBzZWxlY3RlZENvbCwgaGlkZUNhbGxiYWNrKTtcclxuICAgIH07XHJcbiAgICBjb25zdCBkZWxldGVDb2wgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHllc0FjdGlvbiA9ICgpID0+XHJcbiAgICAgICAgdGhpcy5wcm9wcy5wcm9wYWdhdGVTdGF0ZShcclxuICAgICAgICAgIHsgY29sdW1uczogXy5yZWplY3QodGhpcy5wcm9wcy5jb2x1bW5zLCB7IG5hbWU6IHNlbGVjdGVkQ29sIH0pIH0sXHJcbiAgICAgICAgICBzZXJ2ZXJTdGF0ZS5kZWxldGVDb2x1bW4oZGF0YUlkLCBzZWxlY3RlZENvbClcclxuICAgICAgICApO1xyXG4gICAgICBjb25zdCBtc2cgPSBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGUgY29sdW1uIFwiJHtzZWxlY3RlZENvbH1cIj9gO1xyXG4gICAgICBjb25zdCB0aXRsZSA9IGBEZWxldGUgY29sdW1uIC0gJHtzZWxlY3RlZENvbH1gO1xyXG4gICAgICBvcGVuQ2hhcnQoeyB0eXBlOiBcImNvbmZpcm1cIiwgdGl0bGUsIG1zZywgeWVzQWN0aW9uLCBzaXplOiBcIm1vZGFsLXNtXCIgfSk7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgcmVuYW1lQ29sID0gKCkgPT5cclxuICAgICAgb3BlbkNoYXJ0KHtcclxuICAgICAgICB0eXBlOiBcInJlbmFtZVwiLFxyXG4gICAgICAgIHNlbGVjdGVkQ29sLFxyXG4gICAgICAgIGNvbHVtbnM6IHRoaXMucHJvcHMuY29sdW1ucyxcclxuICAgICAgICBzaXplOiBcIm1vZGFsLXNtXCIsXHJcbiAgICAgIH0pO1xyXG4gICAgY29uc3Qgb3BlbkFjdGlvbiA9IGFjdGlvbiA9PiBvcGVuUG9wdXAoYWN0aW9uLCA0MDAsIDc3MCk7XHJcbiAgICBjb25zdCBjbG9zZU1lbnUgPSAoKSA9PiB0aGlzLnByb3BzLmhpZGVDb2x1bW5NZW51KHNlbGVjdGVkQ29sKTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXZcclxuICAgICAgICBpZD1cImNvbHVtbi1tZW51LWRpdlwiXHJcbiAgICAgICAgY2xhc3NOYW1lPVwiY29sdW1uLXRvZ2dsZV9fZHJvcGRvd25cIlxyXG4gICAgICAgIGhpZGRlbj17IWNvbHVtbk1lbnVPcGVufVxyXG4gICAgICAgIHN0eWxlPXt7IG1pbldpZHRoOiBcIjExZW1cIiB9fVxyXG4gICAgICAgIHJlZj17Y20gPT4gKHRoaXMuX2RpdiA9IGNtKX0+XHJcbiAgICAgICAge2NvbHVtbk1lbnVPcGVuICYmIDxHbG9iYWxIb3RLZXlzIGtleU1hcD17eyBDTE9TRV9NRU5VOiBcImVzY1wiIH19IGhhbmRsZXJzPXt7IENMT1NFX01FTlU6IGNsb3NlTWVudSB9fSAvPn1cclxuICAgICAgICB7LyogPGhlYWRlcj5cclxuICAgICAgICAgIDxzcGFuPntgQ29sdW1uIFwiJHtzZWxlY3RlZENvbH1cImB9PC9zcGFuPlxyXG4gICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImNvbC1tZW51LWRlc2NyaXB0b3JzXCI+XHJcbiAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICB7XCJEYXRhIFR5cGU6XCJ9XHJcbiAgICAgICAgICAgICAgPHNwYW4+e2NvbENmZy5kdHlwZX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgIHtjb2xDZmcuaGFzTWlzc2luZyA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgIHtcIiMgTWlzc2luZzpcIn1cclxuICAgICAgICAgICAgICAgIDxzcGFuPntjb2xDZmcuaGFzTWlzc2luZ308L3NwYW4+XHJcbiAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAge2NvbENmZy5oYXNPdXRsaWVycyA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgIHtcIiMgT3V0bGllcnM6XCJ9XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj57Y29sQ2ZnLmhhc091dGxpZXJzfTwvc3Bhbj5cclxuICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICB7Y29sQ2ZnLmxvd1ZhcmlhbmNlICYmIChcclxuICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICB7YCR7YnUuZmxhZ0ljb259TG93IFZhcmlhbmNlOmB9XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj5UcnVlPC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L3VsPlxyXG4gICAgICAgIDwvaGVhZGVyPiAqL31cclxuICAgICAgICA8dWw+XHJcbiAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRvZ2dsZXItYWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtc29ydCBtbC00IG1yLTRcIiAvPlxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIGNvbXBhY3QgbS1hdXRvIGZvbnQtd2VpZ2h0LWJvbGQgY29sdW1uLXNvcnRpbmdcIj5cclxuICAgICAgICAgICAgICB7Xy5tYXAoU09SVF9QUk9QUywgKHsgZGlyLCBjb2wgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gZGlyID09PSBjdXJyRGlyO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgIGtleT17ZGlyfVxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXthY3RpdmUgPyB7fSA6IHsgY29sb3I6IFwiIzU2NWI2OFwiIH19XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYnRuIGJ0bi1wcmltYXJ5ICR7YWN0aXZlID8gXCJhY3RpdmVcIiA6IFwiXCJ9IGZvbnQtd2VpZ2h0LWJvbGRgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2FjdGl2ZSA/IF8ubm9vcCA6ICgpID0+IG1lbnVGdW5jcy51cGRhdGVTb3J0KFtzZWxlY3RlZENvbF0sIGRpciwgdGhpcy5wcm9wcyl9XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2FjdGl2ZX0+XHJcbiAgICAgICAgICAgICAgICAgICAge2NvbC5sYWJlbH1cclxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRvZ2dsZXItYWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiaWNvLXN3YXAtaG9yaXpcIiAvPlxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIGNvbXBhY3QgbS1hdXRvIGZvbnQtd2VpZ2h0LWJvbGQgY29sdW1uLXNvcnRpbmdcIj5cclxuICAgICAgICAgICAgICB7Xy5tYXAoTU9WRV9DT0xTLCAoW2ljb24sIGZ1bmMsIGhpbnQsIGljblN0eWxlXSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICBrZXk9e2ljb259XHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXtfLmFzc2lnbih7IGNvbG9yOiBcIiM1NjViNjhcIiwgd2lkdGg6IFwiMmVtXCIgfSwgaWNuU3R5bGUpfVxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BidG4gYnRuLXByaW1hcnkgZm9udC13ZWlnaHQtYm9sZGB9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2Z1bmMoc2VsZWN0ZWRDb2wsIHRoaXMucHJvcHMpfVxyXG4gICAgICAgICAgICAgICAgICB0aXRsZT17aGludH0+XHJcbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT17YGZhcyBmYS0ke2ljb259YH0gLz5cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICA8Q29uZGl0aW9uYWxSZW5kZXIgZGlzcGxheT17dW5sb2NrZWR9PlxyXG4gICAgICAgICAgICA8Q29sdW1uTWVudU9wdGlvblxyXG4gICAgICAgICAgICAgIG9wZW49e3NlcnZlclN0YXRlLmxvY2tDb2xzKFtzZWxlY3RlZENvbF0sIHRoaXMucHJvcHMpfVxyXG4gICAgICAgICAgICAgIGxhYmVsPVwiTG9ja1wiXHJcbiAgICAgICAgICAgICAgaWNvbkNsYXNzPVwiZmEgZmEtbG9jayBtbC0zIG1yLTRcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9Db25kaXRpb25hbFJlbmRlcj5cclxuICAgICAgICAgIDxDb25kaXRpb25hbFJlbmRlciBkaXNwbGF5PXshdW5sb2NrZWR9PlxyXG4gICAgICAgICAgICA8Q29sdW1uTWVudU9wdGlvblxyXG4gICAgICAgICAgICAgIG9wZW49e3NlcnZlclN0YXRlLnVubG9ja0NvbHMoW3NlbGVjdGVkQ29sXSwgdGhpcy5wcm9wcyl9XHJcbiAgICAgICAgICAgICAgbGFiZWw9XCJVbmxvY2tcIlxyXG4gICAgICAgICAgICAgIGljb25DbGFzcz1cImZhIGZhLWxvY2stb3BlbiBtbC0yIG1yLTRcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9Db25kaXRpb25hbFJlbmRlcj5cclxuICAgICAgICAgIDxDb2x1bW5NZW51T3B0aW9uIG9wZW49e2hpZGVDb2x9IGxhYmVsPVwiSGlkZVwiIGljb25DbGFzcz1cImljby12aXNpYmlsaXR5LW9mZlwiIC8+XHJcbiAgICAgICAgICA8Q29sdW1uTWVudU9wdGlvbiBvcGVuPXtkZWxldGVDb2x9IGxhYmVsPVwiRGVsZXRlXCIgaWNvbkNsYXNzPVwiaWNvLWRlbGV0ZVwiIC8+XHJcbiAgICAgICAgICA8Q29sdW1uTWVudU9wdGlvbiBvcGVuPXtyZW5hbWVDb2x9IGxhYmVsPVwiUmVuYW1lXCIgaWNvbkNsYXNzPVwiaWNvLWVkaXRcIiAvPlxyXG4gICAgICAgICAgey8qIDxDb2x1bW5NZW51T3B0aW9uIG9wZW49e29wZW5BY3Rpb24oXCJyZXBsYWNlbWVudFwiKX0gbGFiZWw9XCJSZXBsYWNlbWVudHNcIiBpY29uQ2xhc3M9XCJmYXMgZmEtYmFja3NwYWNlIG1yLTNcIiAvPiAqL31cclxuICAgICAgICAgIHsvKiA8Q29sdW1uTWVudU9wdGlvbiBvcGVuPXtvcGVuQWN0aW9uKFwidHlwZS1jb252ZXJzaW9uXCIpfSBsYWJlbD1cIlR5cGUgQ29udmVyc2lvblwiIGljb25DbGFzcz1cImljby1zd2FwLWhvcml6XCIgLz4gKi99XHJcbiAgICAgICAgICB7LyogPENvbHVtbk1lbnVPcHRpb24gb3Blbj17b3BlbkFjdGlvbihcImR1cGxpY2F0ZXNcIil9IGxhYmVsPVwiRHVwbGljYXRlc1wiIGljb25DbGFzcz1cImZhcyBmYS1jbG9uZSBtbC0yIG1yLTRcIiAvPiAqL31cclxuICAgICAgICAgIHsvKiA8Q29sdW1uTWVudU9wdGlvbiBvcGVuPXtvcGVuRGVzY3JpYmV9IGxhYmVsPVwiRGVzY3JpYmVcIiBpY29uQ2xhc3M9XCJpY28tdmlldy1jb2x1bW5cIiAvPiAqL31cclxuICAgICAgICAgIDxDb2x1bW5NZW51T3B0aW9uXHJcbiAgICAgICAgICAgIG9wZW49e29wZW5Qb3B1cChcImNvbHVtbi1hbmFseXNpc1wiLCA0MjUsIDgxMCl9XHJcbiAgICAgICAgICAgIGxhYmVsPVwiQ29sdW1uIEFuYWx5c2lzXCJcclxuICAgICAgICAgICAgaWNvbkNsYXNzPVwiaWNvLWVxdWFsaXplclwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgey8qIDxDb2x1bW5NZW51T3B0aW9uIG9wZW49e29wZW5Gb3JtYXR0aW5nfSBsYWJlbD1cIkZvcm1hdHNcIiBpY29uQ2xhc3M9XCJpY28tcGFsZXR0ZVwiIC8+ICovfVxyXG4gICAgICAgICAgey8qIHtfLmhhcyhjb2xDZmcsIFwibG93VmFyaWFuY2VcIikgJiYgKFxyXG4gICAgICAgICAgICA8Q29sdW1uTWVudU9wdGlvblxyXG4gICAgICAgICAgICAgIG9wZW49e29wZW5Qb3B1cChcInZhcmlhbmNlXCIsIDQwMCwgNzcwKX1cclxuICAgICAgICAgICAgICBsYWJlbD1cIlZhcmlhbmNlIFJlcG9ydFwiXHJcbiAgICAgICAgICAgICAgaWNvbkNsYXNzPVwiZmFzIGZhLWNoYXJ0LWJhciBtbC0yIG1yLTRcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKX0gKi99XHJcbiAgICAgICAgICA8Q29sdW1uRmlsdGVyIHsuLi50aGlzLnByb3BzfSAvPlxyXG4gICAgICAgIDwvdWw+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuUmVhY3RDb2x1bW5NZW51LmRpc3BsYXlOYW1lID0gXCJSZWFjdENvbHVtbk1lbnVcIjtcclxuUmVhY3RDb2x1bW5NZW51LnByb3BUeXBlcyA9IHtcclxuICBzZWxlY3RlZENvbDogUHJvcFR5cGVzLnN0cmluZyxcclxuICBzZWxlY3RlZFRvZ2dsZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICBjb2x1bW5zOiBQcm9wVHlwZXMuYXJyYXksXHJcbiAgY29sdW1uTWVudU9wZW46IFByb3BUeXBlcy5ib29sLFxyXG4gIHNvcnRJbmZvOiBQcm9wVHlwZXMuYXJyYXksXHJcbiAgcHJvcGFnYXRlU3RhdGU6IFByb3BUeXBlcy5mdW5jLFxyXG4gIGRhdGFJZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gIG5vSW5mbzogUHJvcFR5cGVzLmJvb2wsXHJcbiAgb3BlbkNoYXJ0OiBQcm9wVHlwZXMuZnVuYyxcclxuICBoaWRlQ29sdW1uTWVudTogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgb3V0bGllckZpbHRlcnM6IFByb3BUeXBlcy5vYmplY3QsXHJcbn07XHJcblxyXG5jb25zdCBSZWR1eENvbHVtbk1lbnUgPSBjb25uZWN0KFxyXG4gIHN0YXRlID0+IF8ucGljayhzdGF0ZSwgW1wiZGF0YUlkXCIsIFwiY29sdW1uTWVudU9wZW5cIiwgXCJzZWxlY3RlZENvbFwiLCBcInNlbGVjdGVkVG9nZ2xlXCJdKSxcclxuICBkaXNwYXRjaCA9PiAoe1xyXG4gICAgb3BlbkNoYXJ0OiBjaGFydFByb3BzID0+IGRpc3BhdGNoKG9wZW5DaGFydChjaGFydFByb3BzKSksXHJcbiAgICBoaWRlQ29sdW1uTWVudTogY29sTmFtZSA9PiBkaXNwYXRjaChhY3Rpb25zLmhpZGVDb2x1bW5NZW51KGNvbE5hbWUpKSxcclxuICB9KVxyXG4pKFJlYWN0Q29sdW1uTWVudSk7XHJcblxyXG5leHBvcnQgeyBSZWR1eENvbHVtbk1lbnUgYXMgQ29sdW1uTWVudSwgUmVhY3RDb2x1bW5NZW51LCBwb3NpdGlvbk1lbnUsIGlnbm9yZU1lbnVDbGlja3MgfTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==