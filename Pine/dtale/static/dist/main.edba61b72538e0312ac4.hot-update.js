webpackHotUpdate("main",{

/***/ "./static/actions/url-utils.js":
/*!*************************************!*\
  !*** ./static/actions/url-utils.js ***!
  \*************************************/
/*! exports provided: buildURLParams, buildURLString, buildURL, dtypesUrl, saveColFilterUrl, toggleOutlierFilterUrl, cleanupEndpoint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildURLParams", function() { return buildURLParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildURLString", function() { return buildURLString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildURL", function() { return buildURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dtypesUrl", function() { return dtypesUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveColFilterUrl", function() { return saveColFilterUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleOutlierFilterUrl", function() { return toggleOutlierFilterUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cleanupEndpoint", function() { return cleanupEndpoint; });
/* harmony import */ var querystring__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");
/* harmony import */ var querystring__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(querystring__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var URL_KEYS = {
  filters: function filters(v) {
    return {
      filters: lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isEmpty(v) ? null : JSON.stringify(lodash__WEBPACK_IMPORTED_MODULE_1___default.a.mapValues(v, function (f) {
        return {
          value: f.filterTerm,
          type: lodash__WEBPACK_IMPORTED_MODULE_1___default.a.get(f.column, "filterRenderer.displayName")
        };
      }))
    };
  },
  ids: function ids(v) {
    return {
      ids: lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isEmpty(v) ? null : JSON.stringify(v)
    };
  },
  sortInfo: function sortInfo(v) {
    return {
      sort: lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isEmpty(v) ? null : JSON.stringify(v)
    };
  },
  query: function query(v) {
    return {
      query: v
    };
  },
  selectedCols: function selectedCols(v) {
    return {
      cols: lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isEmpty(v) ? null : JSON.stringify(v)
    };
  },
  selectedCol: function selectedCol(v) {
    return {
      col: v
    };
  },
  tsColumns: function tsColumns(v) {
    return {
      ts_columns: lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isEmpty(v) ? null : JSON.stringify(v)
    };
  }
};

function buildURLParams(state) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var required = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var accumulator = function accumulator(acc, v, k) {
    return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.assign(lodash__WEBPACK_IMPORTED_MODULE_1___default.a.get(URL_KEYS, k, function (v) {
      return _defineProperty({}, k, v);
    })(v), acc);
  };

  var params = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.reduce(lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isEmpty(props) ? state : lodash__WEBPACK_IMPORTED_MODULE_1___default.a.pick(state, props), accumulator, {});

  if (required) {
    if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.some(required, function (r) {
      return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isNil(params[r]);
    })) {
      return {};
    }
  }

  return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.pickBy(params, function (v) {
    return !lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isNil(v);
  });
}

function buildURLString(base, params) {
  return "".concat(base).concat(base.endsWith("?") ? "" : "?").concat(querystring__WEBPACK_IMPORTED_MODULE_0___default.a.stringify(params));
}

function buildURL(base, state, props) {
  var params = buildURLParams(state, props);
  return buildURLString(base, params);
}

function dtypesUrl(dataId) {
  return "/dtale/dtypes/".concat(dataId);
}

function saveColFilterUrl(dataId, column) {
  return "/dtale/save-column-filter/".concat(dataId, "/").concat(column);
}

function toggleOutlierFilterUrl(dataId, column) {
  return "/dtale/toggle-outlier-filter/".concat(dataId, "/").concat(column);
}

function cleanupEndpoint(endpoint) {
  while (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.includes(endpoint, "//")) {
    endpoint = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(endpoint, "//", "/");
  }

  return endpoint;
}



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
      return Object(_fetcher__WEBPACK_IMPORTED_MODULE_5__["fetchJsonPromise"])("/dtale/async-column-filter-data/".concat(this.props.dataId, "/").concat(this.props.selectedCol, "?").concat(querystring__WEBPACK_IMPORTED_MODULE_0___default.a.stringify({
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

      Object(_fetcher__WEBPACK_IMPORTED_MODULE_8__["fetchJson"])("/dtale/column-filter-data/".concat(this.props.dataId, "/").concat(this.props.selectedCol), function (data) {
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

/***/ "./static/popups/variance/Variance.jsx":
/*!*********************************************!*\
  !*** ./static/popups/variance/Variance.jsx ***!
  \*********************************************/
/*! exports provided: Variance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Variance", function() { return Variance; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _BouncerWrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../BouncerWrapper */ "./static/BouncerWrapper.jsx");
/* harmony import */ var _RemovableError__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../RemovableError */ "./static/RemovableError.jsx");
/* harmony import */ var _fetcher__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../fetcher */ "./static/fetcher.js");
/* harmony import */ var _CodePopup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../CodePopup */ "./static/popups/CodePopup.jsx");
/* harmony import */ var _VarianceChart__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./VarianceChart */ "./static/popups/variance/VarianceChart.jsx");
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










var Variance = /*#__PURE__*/function (_React$Component) {
  _inherits(Variance, _React$Component);

  var _super = _createSuper(Variance);

  function Variance(props) {
    var _this;

    _classCallCheck(this, Variance);

    _this = _super.call(this, props);
    _this.state = {
      loadingVariance: true,
      varianceData: null
    };
    _this.renderCheck2 = _this.renderCheck2.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Variance, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var column = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(this.props, "chartData.selectedCol");

      Object(_fetcher__WEBPACK_IMPORTED_MODULE_5__["fetchJson"])("/dtale/variance/".concat(this.props.dataId, "/").concat(column), function (varianceData) {
        var newState = {
          error: null,
          loadingVariance: false
        };

        if (varianceData.error) {
          _this2.setState({
            error: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_RemovableError__WEBPACK_IMPORTED_MODULE_4__["RemovableError"], varianceData)
          });

          return;
        }

        newState.varianceData = varianceData;

        _this2.setState(newState);
      });
    }
  }, {
    key: "renderCheck2",
    value: function renderCheck2() {
      var varianceData = this.state.varianceData;
      var check2 = varianceData.check2;

      if (!check2) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null, "Check 2: N/A");
      }

      var val1 = check2.val1.val;
      var val2 = check2.val2.val;
      var check2Msg = "Count of most common value / Count of second most common value > 20";

      var check2Ratio = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.round(check2.val1.ct / check2.val2.ct, 2);

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
        className: "mr-3"
      }, "Check 2: ".concat(check2Msg, " =>")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("b", null, check2.result + "")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
        className: "mr-3"
      }, "Count of most common \"".concat(val1, "\":")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("b", null, check2.val1.ct)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
        className: "mr-3"
      }, "Count of second most common \"".concat(val2, "\":")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("b", null, check2.val2.ct)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
        className: "mr-3"
      }, "Ratio:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("b", null, check2Ratio))));
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.error) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          key: "body",
          className: "modal-body"
        }, this.state.error);
      }

      var column = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(this.props, "chartData.selectedCol");

      var varianceData = this.state.varianceData;

      if (!varianceData) {
        return null;
      }

      var code = varianceData.code,
          check1 = varianceData.check1,
          check2 = varianceData.check2,
          size = varianceData.size,
          outlierCt = varianceData.outlierCt,
          missingCt = varianceData.missingCt,
          jarqueBera = varianceData.jarqueBera,
          shapiroWilk = varianceData.shapiroWilk;

      var check1Pct = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.round(100 * (check1.unique / check1.size), 2);

      var check1Msg = "Check 1: Count of unique values in a feature / sample size < 10%";

      var check2res = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(check2, "result", false);

      var lowVariance = check1.result && check2res;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        key: "body",
        className: "modal-body describe-body"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_BouncerWrapper__WEBPACK_IMPORTED_MODULE_3__["BouncerWrapper"], {
        showBouncer: this.state.loadingVariance
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h1", null, "Based on checks 1 & 2 \"".concat(column, "\" ").concat(lowVariance ? "has" : "does not have", " Low Variance")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
        className: "mr-3"
      }, "".concat(check1Msg, " =>")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("b", null, check1.result + "")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
        className: "mr-3"
      }, "Unique Values:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("b", null, check1.unique)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
        className: "mr-3"
      }, "Sample Size:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("b", null, check1.size)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
        className: "mr-3"
      }, "Percentage:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("b", null, check1Pct, "%"))), this.renderCheck2(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
        className: "mr-3"
      }, "Percentage Missing:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("b", null, lodash__WEBPACK_IMPORTED_MODULE_0___default.a.round(100 * (missingCt / size), 2), "%")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
        className: "mr-3"
      }, "Percentage Outliers:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("b", null, lodash__WEBPACK_IMPORTED_MODULE_0___default.a.round(100 * (outlierCt / size), 2), "%")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null, "Jarque-Bera"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null, "Statistic: ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("b", null, lodash__WEBPACK_IMPORTED_MODULE_0___default.a.round(jarqueBera.statistic, 2))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null, "P-value: ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("b", null, lodash__WEBPACK_IMPORTED_MODULE_0___default.a.round(jarqueBera.pvalue, 2)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null, "Shapiro-Wilk"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null, "Statistic: ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("b", null, lodash__WEBPACK_IMPORTED_MODULE_0___default.a.round(shapiroWilk.statistic, 2))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null, "P-value: ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("b", null, lodash__WEBPACK_IMPORTED_MODULE_0___default.a.round(shapiroWilk.pvalue, 2))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        style: {
          position: "absolute",
          right: 25,
          top: 60
        }
      }, Object(_CodePopup__WEBPACK_IMPORTED_MODULE_6__["renderCodePopupAnchor"])(code, "Variance")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        style: {
          position: "absolute",
          width: "50%",
          height: 325,
          right: 25,
          bottom: 0
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_VarianceChart__WEBPACK_IMPORTED_MODULE_7__["default"], _extends({}, this.props, {
        height: 275
      })))));
    }
  }]);

  return Variance;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

Variance.displayName = "Variance";
Variance.propTypes = {
  dataId: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  chartData: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    visible: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,
    selectedCol: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
  })
};


/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdGF0aWMvYWN0aW9ucy91cmwtdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL2ZpbHRlcnMvQXN5bmNWYWx1ZVNlbGVjdC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL2ZpbHRlcnMvQ29sdW1uRmlsdGVyLmpzeCIsIndlYnBhY2s6Ly8vLi9zdGF0aWMvcG9wdXBzL3ZhcmlhbmNlL1ZhcmlhbmNlLmpzeCJdLCJuYW1lcyI6WyJVUkxfS0VZUyIsImZpbHRlcnMiLCJ2IiwiXyIsImlzRW1wdHkiLCJKU09OIiwic3RyaW5naWZ5IiwibWFwVmFsdWVzIiwiZiIsInZhbHVlIiwiZmlsdGVyVGVybSIsInR5cGUiLCJnZXQiLCJjb2x1bW4iLCJpZHMiLCJzb3J0SW5mbyIsInNvcnQiLCJxdWVyeSIsInNlbGVjdGVkQ29scyIsImNvbHMiLCJzZWxlY3RlZENvbCIsImNvbCIsInRzQ29sdW1ucyIsInRzX2NvbHVtbnMiLCJidWlsZFVSTFBhcmFtcyIsInN0YXRlIiwicHJvcHMiLCJyZXF1aXJlZCIsImFjY3VtdWxhdG9yIiwiYWNjIiwiayIsImFzc2lnbiIsInBhcmFtcyIsInJlZHVjZSIsInBpY2siLCJzb21lIiwiciIsImlzTmlsIiwicGlja0J5IiwiYnVpbGRVUkxTdHJpbmciLCJiYXNlIiwiZW5kc1dpdGgiLCJxcyIsImJ1aWxkVVJMIiwiZHR5cGVzVXJsIiwiZGF0YUlkIiwic2F2ZUNvbEZpbHRlclVybCIsInRvZ2dsZU91dGxpZXJGaWx0ZXJVcmwiLCJjbGVhbnVwRW5kcG9pbnQiLCJlbmRwb2ludCIsImluY2x1ZGVzIiwicmVwbGFjZSIsIkFzeW5jVmFsdWVTZWxlY3QiLCJzZWxlY3RlZCIsInVwZGF0ZVN0YXRlIiwiYmluZCIsImxvYWRPcHRpb25zIiwic2V0U3RhdGUiLCJpbnB1dCIsImZldGNoSnNvblByb21pc2UiLCJtaXNzaW5nIiwicHJvcGVydHkiLCJtYXAiLCJ1bmlxdWVzIiwidSIsIlJlYWN0IiwiQ29tcG9uZW50IiwiZGlzcGxheU5hbWUiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJhcnJheSIsImJvb2wiLCJmdW5jIiwic3RyaW5nIiwicmVxdWlyZSIsImdldFN0eWxlcyIsImxhYmVsIiwiY29sb3IiLCJkaXNwbGF5IiwicGFkZGluZyIsInRyYW5zaXRpb24iLCJhbGlnblNlbGYiLCJmb250U2l6ZSIsImxpbmVIZWlnaHQiLCJtYXJnaW5SaWdodCIsInRleHRBbGlnbiIsInZlcnRpY2FsQWxpZ24iLCJidWlsZFN0YXRlIiwiY29sdW1ucyIsIm91dGxpZXJGaWx0ZXJzIiwiY29sQ2ZnIiwiZmluZCIsIm5hbWUiLCJjb2xUeXBlIiwiZ3UiLCJmaW5kQ29sVHlwZSIsImR0eXBlIiwidW5pcXVlQ3QiLCJ1bmlxdWVfY3QiLCJoYXNPdXRsaWVycyIsInF1ZXJ5QXBwbGllZCIsImhhcyIsImhhc01pc3NpbmciLCJsb2FkaW5nU3RhdGUiLCJDb2x1bW5GaWx0ZXIiLCJmZXRjaERhdGEiLCJyZW5kZXJNaXNzaW5nVG9nZ2xlIiwicmVuZGVyT3V0bGllclRvZ2dsZSIsInJlbmRlckljb24iLCJmZXRjaEpzb24iLCJkYXRhIiwic3VjY2VzcyIsImNvbHVtbkZpbHRlcnMiLCJhc3NpZ25JbiIsInByZXZQcm9wcyIsImNmZyIsInVybCIsInVwZGF0ZWRTdGF0ZSIsInByb3BhZ2F0ZVN0YXRlIiwiY3VyckZpbHRlcnMiLCJzaG93SWNvbiIsImJ1dHRvbkhhbmRsZXJzIiwibWVudUZ1bmNzIiwiYnVpbGRIb3RrZXlIYW5kbGVycyIsIkZJTFRFUiIsInRvZ2dsZU1pc3NpbmciLCJ0b2dnbGVGaWx0ZXIiLCJEZXNjcmlwdGlvbnMiLCJmaWx0ZXIiLCJtYXJrdXAiLCJzdGFydHNXaXRoIiwibWlzc2luZ1RvZ2dsZSIsImlzTnVsbCIsIm9iamVjdCIsImlzUmVxdWlyZWQiLCJWYXJpYW5jZSIsImxvYWRpbmdWYXJpYW5jZSIsInZhcmlhbmNlRGF0YSIsInJlbmRlckNoZWNrMiIsIm5ld1N0YXRlIiwiZXJyb3IiLCJjaGVjazIiLCJ2YWwxIiwidmFsIiwidmFsMiIsImNoZWNrMk1zZyIsImNoZWNrMlJhdGlvIiwicm91bmQiLCJjdCIsInJlc3VsdCIsImNvZGUiLCJjaGVjazEiLCJzaXplIiwib3V0bGllckN0IiwibWlzc2luZ0N0IiwiamFycXVlQmVyYSIsInNoYXBpcm9XaWxrIiwiY2hlY2sxUGN0IiwidW5pcXVlIiwiY2hlY2sxTXNnIiwiY2hlY2sycmVzIiwibG93VmFyaWFuY2UiLCJzdGF0aXN0aWMiLCJwdmFsdWUiLCJwb3NpdGlvbiIsInJpZ2h0IiwidG9wIiwicmVuZGVyQ29kZVBvcHVwQW5jaG9yIiwid2lkdGgiLCJoZWlnaHQiLCJib3R0b20iLCJjaGFydERhdGEiLCJzaGFwZSIsInZpc2libGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRUE7QUFFQSxJQUFNQSxRQUFRLEdBQUc7QUFDZkMsU0FBTyxFQUFFLGlCQUFBQyxDQUFDO0FBQUEsV0FBSztBQUNiRCxhQUFPLEVBQUVFLDZDQUFDLENBQUNDLE9BQUYsQ0FBVUYsQ0FBVixJQUNMLElBREssR0FFTEcsSUFBSSxDQUFDQyxTQUFMLENBQ0VILDZDQUFDLENBQUNJLFNBQUYsQ0FBWUwsQ0FBWixFQUFlLFVBQUFNLENBQUM7QUFBQSxlQUFLO0FBQUVDLGVBQUssRUFBRUQsQ0FBQyxDQUFDRSxVQUFYO0FBQXVCQyxjQUFJLEVBQUVSLDZDQUFDLENBQUNTLEdBQUYsQ0FBTUosQ0FBQyxDQUFDSyxNQUFSLEVBQWdCLDRCQUFoQjtBQUE3QixTQUFMO0FBQUEsT0FBaEIsQ0FERjtBQUhTLEtBQUw7QUFBQSxHQURLO0FBUWZDLEtBQUcsRUFBRSxhQUFBWixDQUFDO0FBQUEsV0FBSztBQUFFWSxTQUFHLEVBQUVYLDZDQUFDLENBQUNDLE9BQUYsQ0FBVUYsQ0FBVixJQUFlLElBQWYsR0FBc0JHLElBQUksQ0FBQ0MsU0FBTCxDQUFlSixDQUFmO0FBQTdCLEtBQUw7QUFBQSxHQVJTO0FBU2ZhLFVBQVEsRUFBRSxrQkFBQWIsQ0FBQztBQUFBLFdB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aURBQVMsQ0FBQ0k7QUFGRSxHQUFoQjtBQUZRLENBQXJCIiwiZmlsZSI6Im1haW4uZWRiYTYxYjcyNTM4ZTAzMTJhYzQuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBxcyBmcm9tIFwicXVlcnlzdHJpbmdcIjtcclxuXHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuXHJcbmNvbnN0IFVSTF9LRVlTID0ge1xyXG4gIGZpbHRlcnM6IHYgPT4gKHtcclxuICAgIGZpbHRlcnM6IF8uaXNFbXB0eSh2KVxyXG4gICAgICA/IG51bGxcclxuICAgICAgOiBKU09OLnN0cmluZ2lmeShcclxuICAgICAgICAgIF8ubWFwVmFsdWVzKHYsIGYgPT4gKHsgdmFsdWU6IGYuZmlsdGVyVGVybSwgdHlwZTogXy5nZXQoZi5jb2x1bW4sIFwiZmlsdGVyUmVuZGVyZXIuZGlzcGxheU5hbWVcIikgfSkpXHJcbiAgICAgICAgKSxcclxuICB9KSxcclxuICBpZHM6IHYgPT4gKHsgaWRzOiBfLmlzRW1wdHkodikgPyBudWxsIDogSlNPTi5zdHJpbmdpZnkodikgfSksXHJcbiAgc29ydEluZm86IHYgPT4gKHsgc29ydDogXy5pc0VtcHR5KHYpID8gbnVsbCA6IEpTT04uc3RyaW5naWZ5KHYpIH0pLFxyXG4gIHF1ZXJ5OiB2ID0+ICh7IHF1ZXJ5OiB2IH0pLFxyXG4gIHNlbGVjdGVkQ29sczogdiA9PiAoeyBjb2xzOiBfLmlzRW1wdHkodikgPyBudWxsIDogSlNPTi5zdHJpbmdpZnkodikgfSksXHJcbiAgc2VsZWN0ZWRDb2w6IHYgPT4gKHsgY29sOiB2IH0pLFxyXG4gIHRzQ29sdW1uczogdiA9PiAoeyB0c19jb2x1bW5zOiBfLmlzRW1wdHkodikgPyBudWxsIDogSlNPTi5zdHJpbmdpZnkodikgfSksXHJcbn07XHJcblxyXG5mdW5jdGlvbiBidWlsZFVSTFBhcmFtcyhzdGF0ZSwgcHJvcHMgPSBudWxsLCByZXF1aXJlZCA9IG51bGwpIHtcclxuICBjb25zdCBhY2N1bXVsYXRvciA9IChhY2MsIHYsIGspID0+IF8uYXNzaWduKF8uZ2V0KFVSTF9LRVlTLCBrLCB2ID0+ICh7IFtrXTogdiB9KSkodiksIGFjYyk7XHJcbiAgY29uc3QgcGFyYW1zID0gXy5yZWR1Y2UoXy5pc0VtcHR5KHByb3BzKSA/IHN0YXRlIDogXy5waWNrKHN0YXRlLCBwcm9wcyksIGFjY3VtdWxhdG9yLCB7fSk7XHJcbiAgaWYgKHJlcXVpcmVkKSB7XHJcbiAgICBpZiAoXy5zb21lKHJlcXVpcmVkLCByID0+IF8uaXNOaWwocGFyYW1zW3JdKSkpIHtcclxuICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gXy5waWNrQnkocGFyYW1zLCB2ID0+ICFfLmlzTmlsKHYpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYnVpbGRVUkxTdHJpbmcoYmFzZSwgcGFyYW1zKSB7XHJcbiAgcmV0dXJuIGAke2Jhc2V9JHtiYXNlLmVuZHNXaXRoKFwiP1wiKSA/IFwiXCIgOiBcIj9cIn0ke3FzLnN0cmluZ2lmeShwYXJhbXMpfWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJ1aWxkVVJMKGJhc2UsIHN0YXRlLCBwcm9wcykge1xyXG4gIGNvbnN0IHBhcmFtcyA9IGJ1aWxkVVJMUGFyYW1zKHN0YXRlLCBwcm9wcyk7XHJcbiAgcmV0dXJuIGJ1aWxkVVJMU3RyaW5nKGJhc2UsIHBhcmFtcyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGR0eXBlc1VybChkYXRhSWQpIHtcclxuICByZXR1cm4gYC9kdGFsZS9kdHlwZXMvJHtkYXRhSWR9YDtcclxufVxyXG5cclxuZnVuY3Rpb24gc2F2ZUNvbEZpbHRlclVybChkYXRhSWQsIGNvbHVtbikge1xyXG4gIHJldHVybiBgL2R0YWxlL3NhdmUtY29sdW1uLWZpbHRlci8ke2RhdGFJZH0vJHtjb2x1bW59YDtcclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlT3V0bGllckZpbHRlclVybChkYXRhSWQsIGNvbHVtbikge1xyXG4gIHJldHVybiBgL2R0YWxlL3RvZ2dsZS1vdXRsaWVyLWZpbHRlci8ke2RhdGFJZH0vJHtjb2x1bW59YDtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYW51cEVuZHBvaW50KGVuZHBvaW50KSB7XHJcbiAgd2hpbGUgKF8uaW5jbHVkZXMoZW5kcG9pbnQsIFwiLy9cIikpIHtcclxuICAgIGVuZHBvaW50ID0gXy5yZXBsYWNlKGVuZHBvaW50LCBcIi8vXCIsIFwiL1wiKTtcclxuICB9XHJcbiAgcmV0dXJuIGVuZHBvaW50O1xyXG59XHJcblxyXG5leHBvcnQge1xyXG4gIGJ1aWxkVVJMUGFyYW1zLFxyXG4gIGJ1aWxkVVJMU3RyaW5nLFxyXG4gIGJ1aWxkVVJMLFxyXG4gIGR0eXBlc1VybCxcclxuICBzYXZlQ29sRmlsdGVyVXJsLFxyXG4gIHRvZ2dsZU91dGxpZXJGaWx0ZXJVcmwsXHJcbiAgY2xlYW51cEVuZHBvaW50LFxyXG59O1xyXG4iLCJpbXBvcnQgcXMgZnJvbSBcInF1ZXJ5c3RyaW5nXCI7XHJcblxyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQXN5bmNTZWxlY3QgZnJvbSBcInJlYWN0LXNlbGVjdC9hc3luY1wiO1xyXG5cclxuaW1wb3J0IHsgZmV0Y2hKc29uUHJvbWlzZSB9IGZyb20gXCIuLi9mZXRjaGVyXCI7XHJcblxyXG5jbGFzcyBBc3luY1ZhbHVlU2VsZWN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHsgc2VsZWN0ZWQ6IF8uZ2V0KHByb3BzLCBcInNlbGVjdGVkXCIsIG51bGwpIH07XHJcbiAgICB0aGlzLnVwZGF0ZVN0YXRlID0gdGhpcy51cGRhdGVTdGF0ZS5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5sb2FkT3B0aW9ucyA9IHRoaXMubG9hZE9wdGlvbnMuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVN0YXRlKHN0YXRlKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlLCAoKSA9PiB0aGlzLnByb3BzLnVwZGF0ZVN0YXRlKHN0YXRlKSk7XHJcbiAgfVxyXG5cclxuICBsb2FkT3B0aW9ucyhpbnB1dCkge1xyXG4gICAgcmV0dXJuIGZldGNoSnNvblByb21pc2UoXHJcbiAgICAgIGAvZHRhbGUvYXN5bmMtY29sdW1uLWZpbHRlci1kYXRhLyR7dGhpcy5wcm9wcy5kYXRhSWR9LyR7dGhpcy5wcm9wcy5zZWxlY3RlZENvbH0/JHtxcy5zdHJpbmdpZnkoeyBpbnB1dCB9KX1gXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPEFzeW5jU2VsZWN0XHJcbiAgICAgICAgaXNNdWx0aVxyXG4gICAgICAgIGlzRGlzYWJsZWQ9e3RoaXMucHJvcHMubWlzc2luZ31cclxuICAgICAgICBjbGFzc05hbWU9XCJTZWxlY3QgaXMtY2xlYXJhYmxlIGlzLXNlYXJjaGFibGUgU2VsZWN0LS1zaW5nbGVcIlxyXG4gICAgICAgIGNsYXNzTmFtZVByZWZpeD1cIlNlbGVjdFwiXHJcbiAgICAgICAgZ2V0T3B0aW9uTGFiZWw9e18ucHJvcGVydHkoXCJ2YWx1ZVwiKX1cclxuICAgICAgICBnZXRPcHRpb25WYWx1ZT17Xy5wcm9wZXJ0eShcInZhbHVlXCIpfVxyXG4gICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnNlbGVjdGVkfVxyXG4gICAgICAgIG9uQ2hhbmdlPXtzZWxlY3RlZCA9PiB0aGlzLnVwZGF0ZVN0YXRlKHsgc2VsZWN0ZWQgfSl9XHJcbiAgICAgICAgaXNDbGVhcmFibGVcclxuICAgICAgICBjYWNoZU9wdGlvbnNcclxuICAgICAgICBkZWZhdWx0T3B0aW9ucz17Xy5tYXAodGhpcy5wcm9wcy51bmlxdWVzLCB1ID0+ICh7IHZhbHVlOiB1IH0pKX1cclxuICAgICAgICBsb2FkT3B0aW9ucz17dGhpcy5sb2FkT3B0aW9uc31cclxuICAgICAgLz5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbkFzeW5jVmFsdWVTZWxlY3QuZGlzcGxheU5hbWUgPSBcIkFzeW5jVmFsdWVTZWxlY3RcIjtcclxuQXN5bmNWYWx1ZVNlbGVjdC5wcm9wVHlwZXMgPSB7XHJcbiAgdW5pcXVlczogUHJvcFR5cGVzLmFycmF5LFxyXG4gIG1pc3Npbmc6IFByb3BUeXBlcy5ib29sLFxyXG4gIHVwZGF0ZVN0YXRlOiBQcm9wVHlwZXMuZnVuYyxcclxuICBkYXRhSWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgc2VsZWN0ZWRDb2w6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBc3luY1ZhbHVlU2VsZWN0O1xyXG4iLCJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBjb21wb25lbnRzIH0gZnJvbSBcInJlYWN0LXNlbGVjdFwiO1xyXG5cclxuaW1wb3J0IHsgYnVpbGRVUkxTdHJpbmcsIHNhdmVDb2xGaWx0ZXJVcmwsIHRvZ2dsZU91dGxpZXJGaWx0ZXJVcmwgfSBmcm9tIFwiLi4vYWN0aW9ucy91cmwtdXRpbHNcIjtcclxuaW1wb3J0IERlc2NyaXB0aW9ucyBmcm9tIFwiLi4vZHRhbGUvY29sdW1uL2NvbHVtbi1tZW51LWRlc2NyaXB0aW9ucy5qc29uXCI7XHJcbmltcG9ydCB7IGV4cG9ydHMgYXMgZ3UgfSBmcm9tIFwiLi4vZHRhbGUvZ3JpZFV0aWxzXCI7XHJcbmltcG9ydCBtZW51RnVuY3MgZnJvbSBcIi4uL2R0YWxlL21lbnUvZGF0YVZpZXdlck1lbnVVdGlsc1wiO1xyXG5pbXBvcnQgeyBmZXRjaEpzb24gfSBmcm9tIFwiLi4vZmV0Y2hlclwiO1xyXG5pbXBvcnQgeyBEYXRlRmlsdGVyIH0gZnJvbSBcIi4vRGF0ZUZpbHRlclwiO1xyXG5pbXBvcnQgeyBOdW1lcmljRmlsdGVyIH0gZnJvbSBcIi4vTnVtZXJpY0ZpbHRlclwiO1xyXG5pbXBvcnQgeyBTdHJpbmdGaWx0ZXIgfSBmcm9tIFwiLi9TdHJpbmdGaWx0ZXJcIjtcclxuXHJcbnJlcXVpcmUoXCIuL0NvbHVtbkZpbHRlci5jc3NcIik7XHJcblxyXG5mdW5jdGlvbiBnZXRTdHlsZXMoKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIGxhYmVsOiBcImxvYWRpbmdJbmRpY2F0b3JcIixcclxuICAgIGNvbG9yOiBcImhzbCgwLCAwJSwgNDAlKVwiLFxyXG4gICAgZGlzcGxheTogXCJmbGV4XCIsXHJcbiAgICBwYWRkaW5nOiA4LFxyXG4gICAgdHJhbnNpdGlvbjogXCJjb2xvciAxNTBtc1wiLFxyXG4gICAgYWxpZ25TZWxmOiBcImNlbnRlclwiLFxyXG4gICAgZm9udFNpemU6IDQsXHJcbiAgICBsaW5lSGVpZ2h0OiAxLFxyXG4gICAgbWFyZ2luUmlnaHQ6IDQsXHJcbiAgICB0ZXh0QWxpZ246IFwiY2VudGVyXCIsXHJcbiAgICB2ZXJ0aWNhbEFsaWduOiBcIm1pZGRsZVwiLFxyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJ1aWxkU3RhdGUoeyBjb2x1bW5zLCBzZWxlY3RlZENvbCwgb3V0bGllckZpbHRlcnMgfSkge1xyXG4gIGNvbnN0IGNvbENmZyA9IF8uZmluZChjb2x1bW5zLCB7IG5hbWU6IHNlbGVjdGVkQ29sIH0pIHx8IHt9O1xyXG4gIGNvbnN0IGNvbFR5cGUgPSBndS5maW5kQ29sVHlwZShjb2xDZmcuZHR5cGUpO1xyXG4gIHJldHVybiB7XHJcbiAgICBjb2xUeXBlLFxyXG4gICAgdW5pcXVlQ3Q6IGNvbENmZy51bmlxdWVfY3QsXHJcbiAgICBkdHlwZTogY29sQ2ZnLmR0eXBlLFxyXG4gICAgaGFzT3V0bGllcnM6IGNvbENmZy5oYXNPdXRsaWVycyA+IDAsXHJcbiAgICBxdWVyeUFwcGxpZWQ6IF8uaGFzKG91dGxpZXJGaWx0ZXJzLCBzZWxlY3RlZENvbCksXHJcbiAgICBoYXNNaXNzaW5nOiBmYWxzZSxcclxuICAgIG1pc3Npbmc6IGZhbHNlLFxyXG4gICAgbG9hZGluZ1N0YXRlOiB0cnVlLFxyXG4gIH07XHJcbn1cclxuXHJcbmNsYXNzIENvbHVtbkZpbHRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSBidWlsZFN0YXRlKHByb3BzKTtcclxuICAgIHRoaXMuZmV0Y2hEYXRhID0gdGhpcy5mZXRjaERhdGEuYmluZCh0aGlzKTtcclxuICAgIHRoaXMudXBkYXRlU3RhdGUgPSB0aGlzLnVwZGF0ZVN0YXRlLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLnJlbmRlck1pc3NpbmdUb2dnbGUgPSB0aGlzLnJlbmRlck1pc3NpbmdUb2dnbGUuYmluZCh0aGlzKTtcclxuICAgIHRoaXMucmVuZGVyT3V0bGllclRvZ2dsZSA9IHRoaXMucmVuZGVyT3V0bGllclRvZ2dsZS5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5yZW5kZXJJY29uID0gdGhpcy5yZW5kZXJJY29uLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBmZXRjaERhdGEoc3RhdGUpIHtcclxuICAgIGZldGNoSnNvbihgL2R0YWxlL2NvbHVtbi1maWx0ZXItZGF0YS8ke3RoaXMucHJvcHMuZGF0YUlkfS8ke3RoaXMucHJvcHMuc2VsZWN0ZWRDb2x9YCwgZGF0YSA9PiB7XHJcbiAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICBjb25zdCBtaXNzaW5nID0gXy5nZXQodGhpcy5wcm9wcy5jb2x1bW5GaWx0ZXJzLCBbdGhpcy5wcm9wcy5zZWxlY3RlZENvbCwgXCJtaXNzaW5nXCJdLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShfLmFzc2lnbkluKHN0YXRlIHx8IHt9LCB7IGxvYWRpbmdTdGF0ZTogZmFsc2UsIG1pc3NpbmcgfSwgZGF0YSkpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgdGhpcy5mZXRjaERhdGEoKTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcclxuICAgIGlmIChwcmV2UHJvcHMuc2VsZWN0ZWRDb2wgIT09IHRoaXMucHJvcHMuc2VsZWN0ZWRDb2wpIHtcclxuICAgICAgdGhpcy5mZXRjaERhdGEoYnVpbGRTdGF0ZSh0aGlzLnByb3BzKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGVTdGF0ZShjZmcpIHtcclxuICAgIGNvbnN0IHVybCA9IGJ1aWxkVVJMU3RyaW5nKHNhdmVDb2xGaWx0ZXJVcmwodGhpcy5wcm9wcy5kYXRhSWQsIHRoaXMucHJvcHMuc2VsZWN0ZWRDb2wpLCB7XHJcbiAgICAgIGNmZzogSlNPTi5zdHJpbmdpZnkoY2ZnKSxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgdXBkYXRlZFN0YXRlID0geyBjZmcgfTtcclxuICAgIGlmIChfLmhhcyhjZmcsIFwibWlzc2luZ1wiKSkge1xyXG4gICAgICB1cGRhdGVkU3RhdGUubWlzc2luZyA9IGNmZy5taXNzaW5nO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRTdGF0ZShcclxuICAgICAgdXBkYXRlZFN0YXRlLFxyXG4gICAgICBmZXRjaEpzb24odXJsLCBkYXRhID0+IHRoaXMucHJvcHMucHJvcGFnYXRlU3RhdGUoeyBjb2x1bW5GaWx0ZXJzOiBkYXRhLmN1cnJGaWx0ZXJzIHx8IHt9IH0pKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJlbmRlckljb24oc2hvd0ljb24gPSB0cnVlKSB7XHJcbiAgICBjb25zdCBidXR0b25IYW5kbGVycyA9IG1lbnVGdW5jcy5idWlsZEhvdGtleUhhbmRsZXJzKHRoaXMucHJvcHMpO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidG9nZ2xlci1hY3Rpb25cIj5cclxuICAgICAgICB7c2hvd0ljb24gJiYgPGkgY2xhc3NOYW1lPVwiZmEgZmEtZmlsdGVyIGFsaWduLWJvdHRvbSBwb2ludGVyXCIgb25DbGljaz17YnV0dG9uSGFuZGxlcnMuRklMVEVSfSAvPn1cclxuICAgICAgPC9zcGFuPlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJlbmRlck1pc3NpbmdUb2dnbGUoc2hvd0ljb24pIHtcclxuICAgIGNvbnN0IHsgaGFzTWlzc2luZywgbWlzc2luZywgY29sVHlwZSB9ID0gdGhpcy5zdGF0ZTtcclxuICAgIGlmIChoYXNNaXNzaW5nKSB7XHJcbiAgICAgIGNvbnN0IHRvZ2dsZU1pc3NpbmcgPSAoKSA9PlxyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUoXy5hc3NpZ25Jbih7fSwgdGhpcy5zdGF0ZS5jZmcsIHsgdHlwZTogY29sVHlwZSwgbWlzc2luZzogIW1pc3NpbmcgfSkpO1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxsaT5cclxuICAgICAgICAgIHt0aGlzLnJlbmRlckljb24oc2hvd0ljb24pfVxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtLWF1dG9cIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2x1bW4tZmlsdGVyIG0tMlwiPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtd2VpZ2h0LWJvbGQgcHItM1wiPlNob3cgT25seSBNaXNzaW5nPC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT17YGljby1jaGVjay1ib3gke21pc3NpbmcgPyBcIlwiIDogXCItb3V0bGluZS1ibGFua1wifSBwb2ludGVyYH0gb25DbGljaz17dG9nZ2xlTWlzc2luZ30gLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2xpPlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICByZW5kZXJPdXRsaWVyVG9nZ2xlKHNob3dJY29uKSB7XHJcbiAgICBjb25zdCB7IGhhc091dGxpZXJzLCBxdWVyeUFwcGxpZWQgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBpZiAoaGFzT3V0bGllcnMpIHtcclxuICAgICAgY29uc3QgdG9nZ2xlRmlsdGVyID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRvZ2dsZU91dGxpZXJGaWx0ZXJVcmwodGhpcy5wcm9wcy5kYXRhSWQsIHRoaXMucHJvcHMuc2VsZWN0ZWRDb2wpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoXHJcbiAgICAgICAgICB7IHF1ZXJ5QXBwbGllZDogIXF1ZXJ5QXBwbGllZCB9LFxyXG4gICAgICAgICAgZmV0Y2hKc29uKHVybCwgZGF0YSA9PiB0aGlzLnByb3BzLnByb3BhZ2F0ZVN0YXRlKGRhdGEpKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH07XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGxpPlxyXG4gICAgICAgICAge3RoaXMucmVuZGVySWNvbihzaG93SWNvbil9XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm0tYXV0b1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbHVtbi1maWx0ZXIgbS0yXCI+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC13ZWlnaHQtYm9sZCBwci0zXCI+RmlsdGVyIE91dGxpZXJzPC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT17YGljby1jaGVjay1ib3gke3F1ZXJ5QXBwbGllZCA/IFwiXCIgOiBcIi1vdXRsaW5lLWJsYW5rXCJ9IHBvaW50ZXJgfSBvbkNsaWNrPXt0b2dnbGVGaWx0ZXJ9IC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9saT5cclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgaWYgKHRoaXMuc3RhdGUubG9hZGluZ1N0YXRlKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGxpIGNsYXNzTmFtZT1cImhvdmVyYWJsZVwiPlxyXG4gICAgICAgICAge3RoaXMucmVuZGVySWNvbigpfVxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtLWF1dG9cIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2x1bW4tZmlsdGVyIG0tMlwiPlxyXG4gICAgICAgICAgICAgIDxjb21wb25lbnRzLkxvYWRpbmdJbmRpY2F0b3IgZ2V0U3R5bGVzPXtnZXRTdHlsZXN9IGN4PXsoKSA9PiBcIlwifSAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJob3ZlcmFibGVfX2NvbnRlbnQgY29sLW1lbnUtZGVzY1wiPntEZXNjcmlwdGlvbnMuZmlsdGVyfTwvZGl2PlxyXG4gICAgICAgIDwvbGk+XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBjb25zdCB7IGNvbFR5cGUgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBsZXQgbWFya3VwID0gbnVsbDtcclxuICAgIHN3aXRjaCAoY29sVHlwZSkge1xyXG4gICAgICBjYXNlIFwic3RyaW5nXCI6XHJcbiAgICAgIGNhc2UgXCJ1bmtub3duXCI6IHtcclxuICAgICAgICBpZiAoIV8uc3RhcnRzV2l0aCh0aGlzLnN0YXRlLmR0eXBlLCBcInRpbWVkZWx0YVwiKSkge1xyXG4gICAgICAgICAgbWFya3VwID0gPFN0cmluZ0ZpbHRlciB7Li4uXy5hc3NpZ25Jbih7fSwgdGhpcy5wcm9wcywgdGhpcy5zdGF0ZSl9IHVwZGF0ZVN0YXRlPXt0aGlzLnVwZGF0ZVN0YXRlfSAvPjtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBcImRhdGVcIjpcclxuICAgICAgICBtYXJrdXAgPSA8RGF0ZUZpbHRlciB7Li4uXy5hc3NpZ25Jbih7fSwgdGhpcy5wcm9wcywgdGhpcy5zdGF0ZSl9IHVwZGF0ZVN0YXRlPXt0aGlzLnVwZGF0ZVN0YXRlfSAvPjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImludFwiOlxyXG4gICAgICBjYXNlIFwiZmxvYXRcIjpcclxuICAgICAgICBtYXJrdXAgPSA8TnVtZXJpY0ZpbHRlciB7Li4uXy5hc3NpZ25Jbih7fSwgdGhpcy5wcm9wcywgdGhpcy5zdGF0ZSl9IHVwZGF0ZVN0YXRlPXt0aGlzLnVwZGF0ZVN0YXRlfSAvPjtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGxldCBtaXNzaW5nVG9nZ2xlID0gbnVsbDtcclxuICAgIGlmIChfLmlzTnVsbChtYXJrdXApKSB7XHJcbiAgICAgIGlmICghdGhpcy5zdGF0ZS5oYXNNaXNzaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuICAgICAgbWlzc2luZ1RvZ2dsZSA9IHRoaXMucmVuZGVyTWlzc2luZ1RvZ2dsZSh0cnVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG1hcmt1cCA9IChcclxuICAgICAgICA8bGkgY2xhc3NOYW1lPVwiaG92ZXJhYmxlXCI+XHJcbiAgICAgICAgICB7dGhpcy5yZW5kZXJJY29uKCl9XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm0tYXV0b1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbHVtbi1maWx0ZXIgbS0yXCI+e21hcmt1cH08L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJob3ZlcmFibGVfX2NvbnRlbnQgY29sLW1lbnUtZGVzY1wiPntEZXNjcmlwdGlvbnMuZmlsdGVyfTwvZGl2PlxyXG4gICAgICAgIDwvbGk+XHJcbiAgICAgICk7XHJcbiAgICAgIG1pc3NpbmdUb2dnbGUgPSB0aGlzLnJlbmRlck1pc3NpbmdUb2dnbGUoZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPFJlYWN0LkZyYWdtZW50PlxyXG4gICAgICAgIHttYXJrdXB9XHJcbiAgICAgICAge21pc3NpbmdUb2dnbGV9XHJcbiAgICAgICAge3RoaXMucmVuZGVyT3V0bGllclRvZ2dsZShfLmlzTnVsbChtYXJrdXApICYmIF8uaXNOdWxsKG1pc3NpbmdUb2dnbGUpKX1cclxuICAgICAgPC9SZWFjdC5GcmFnbWVudD5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbkNvbHVtbkZpbHRlci5kaXNwbGF5TmFtZSA9IFwiQ29sdW1uRmlsdGVyXCI7XHJcbkNvbHVtbkZpbHRlci5wcm9wVHlwZXMgPSB7XHJcbiAgY29sdW1uczogUHJvcFR5cGVzLmFycmF5LFxyXG4gIGNvbHVtbkZpbHRlcnM6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgc2VsZWN0ZWRDb2w6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgcHJvcGFnYXRlU3RhdGU6IFByb3BUeXBlcy5mdW5jLFxyXG4gIGRhdGFJZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gIG91dGxpZXJGaWx0ZXJzOiBQcm9wVHlwZXMub2JqZWN0LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29sdW1uRmlsdGVyO1xyXG4iLCJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuaW1wb3J0IHsgQm91bmNlcldyYXBwZXIgfSBmcm9tIFwiLi4vLi4vQm91bmNlcldyYXBwZXJcIjtcclxuaW1wb3J0IHsgUmVtb3ZhYmxlRXJyb3IgfSBmcm9tIFwiLi4vLi4vUmVtb3ZhYmxlRXJyb3JcIjtcclxuaW1wb3J0IHsgZmV0Y2hKc29uIH0gZnJvbSBcIi4uLy4uL2ZldGNoZXJcIjtcclxuaW1wb3J0IHsgcmVuZGVyQ29kZVBvcHVwQW5jaG9yIH0gZnJvbSBcIi4uL0NvZGVQb3B1cFwiO1xyXG5pbXBvcnQgVmFyaWFuY2VDaGFydCBmcm9tIFwiLi9WYXJpYW5jZUNoYXJ0XCI7XHJcblxyXG5jbGFzcyBWYXJpYW5jZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGxvYWRpbmdWYXJpYW5jZTogdHJ1ZSxcclxuICAgICAgdmFyaWFuY2VEYXRhOiBudWxsLFxyXG4gICAgfTtcclxuICAgIHRoaXMucmVuZGVyQ2hlY2syID0gdGhpcy5yZW5kZXJDaGVjazIuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgY29uc3QgY29sdW1uID0gXy5nZXQodGhpcy5wcm9wcywgXCJjaGFydERhdGEuc2VsZWN0ZWRDb2xcIik7XHJcbiAgICBmZXRjaEpzb24oYC9kdGFsZS92YXJpYW5jZS8ke3RoaXMucHJvcHMuZGF0YUlkfS8ke2NvbHVtbn1gLCB2YXJpYW5jZURhdGEgPT4ge1xyXG4gICAgICBjb25zdCBuZXdTdGF0ZSA9IHtcclxuICAgICAgICBlcnJvcjogbnVsbCxcclxuICAgICAgICBsb2FkaW5nVmFyaWFuY2U6IGZhbHNlLFxyXG4gICAgICB9O1xyXG4gICAgICBpZiAodmFyaWFuY2VEYXRhLmVycm9yKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGVycm9yOiA8UmVtb3ZhYmxlRXJyb3Igey4uLnZhcmlhbmNlRGF0YX0gLz4gfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIG5ld1N0YXRlLnZhcmlhbmNlRGF0YSA9IHZhcmlhbmNlRGF0YTtcclxuICAgICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlbmRlckNoZWNrMigpIHtcclxuICAgIGNvbnN0IHsgdmFyaWFuY2VEYXRhIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgY29uc3QgeyBjaGVjazIgfSA9IHZhcmlhbmNlRGF0YTtcclxuICAgIGlmICghY2hlY2syKSB7XHJcbiAgICAgIHJldHVybiA8bGk+Q2hlY2sgMjogTi9BPC9saT47XHJcbiAgICB9XHJcbiAgICBjb25zdCB2YWwxID0gY2hlY2syLnZhbDEudmFsO1xyXG4gICAgY29uc3QgdmFsMiA9IGNoZWNrMi52YWwyLnZhbDtcclxuICAgIGNvbnN0IGNoZWNrMk1zZyA9IGBDb3VudCBvZiBtb3N0IGNvbW1vbiB2YWx1ZSAvIENvdW50IG9mIHNlY29uZCBtb3N0IGNvbW1vbiB2YWx1ZSA+IDIwYDtcclxuICAgIGNvbnN0IGNoZWNrMlJhdGlvID0gXy5yb3VuZChjaGVjazIudmFsMS5jdCAvIGNoZWNrMi52YWwyLmN0LCAyKTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxSZWFjdC5GcmFnbWVudD5cclxuICAgICAgICA8bGk+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtci0zXCI+e2BDaGVjayAyOiAke2NoZWNrMk1zZ30gPT5gfTwvc3Bhbj5cclxuICAgICAgICAgIDxiPntjaGVjazIucmVzdWx0ICsgXCJcIn08L2I+XHJcbiAgICAgICAgPC9saT5cclxuICAgICAgICA8dWw+XHJcbiAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1yLTNcIj57YENvdW50IG9mIG1vc3QgY29tbW9uIFwiJHt2YWwxfVwiOmB9PC9zcGFuPlxyXG4gICAgICAgICAgICA8Yj57Y2hlY2syLnZhbDEuY3R9PC9iPlxyXG4gICAgICAgICAgPC9saT5cclxuICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibXItM1wiPntgQ291bnQgb2Ygc2Vjb25kIG1vc3QgY29tbW9uIFwiJHt2YWwyfVwiOmB9PC9zcGFuPlxyXG4gICAgICAgICAgICA8Yj57Y2hlY2syLnZhbDIuY3R9PC9iPlxyXG4gICAgICAgICAgPC9saT5cclxuICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibXItM1wiPlJhdGlvOjwvc3Bhbj5cclxuICAgICAgICAgICAgPGI+e2NoZWNrMlJhdGlvfTwvYj5cclxuICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgPC91bD5cclxuICAgICAgPC9SZWFjdC5GcmFnbWVudD5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5lcnJvcikge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYga2V5PVwiYm9keVwiIGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cclxuICAgICAgICAgIHt0aGlzLnN0YXRlLmVycm9yfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgY29uc3QgY29sdW1uID0gXy5nZXQodGhpcy5wcm9wcywgXCJjaGFydERhdGEuc2VsZWN0ZWRDb2xcIik7XHJcbiAgICBjb25zdCB7IHZhcmlhbmNlRGF0YSB9ID0gdGhpcy5zdGF0ZTtcclxuICAgIGlmICghdmFyaWFuY2VEYXRhKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgY29uc3QgeyBjb2RlLCBjaGVjazEsIGNoZWNrMiwgc2l6ZSwgb3V0bGllckN0LCBtaXNzaW5nQ3QsIGphcnF1ZUJlcmEsIHNoYXBpcm9XaWxrIH0gPSB2YXJpYW5jZURhdGE7XHJcbiAgICBjb25zdCBjaGVjazFQY3QgPSBfLnJvdW5kKDEwMCAqIChjaGVjazEudW5pcXVlIC8gY2hlY2sxLnNpemUpLCAyKTtcclxuICAgIGNvbnN0IGNoZWNrMU1zZyA9IFwiQ2hlY2sgMTogQ291bnQgb2YgdW5pcXVlIHZhbHVlcyBpbiBhIGZlYXR1cmUgLyBzYW1wbGUgc2l6ZSA8IDEwJVwiO1xyXG4gICAgY29uc3QgY2hlY2sycmVzID0gXy5nZXQoY2hlY2syLCBcInJlc3VsdFwiLCBmYWxzZSk7XHJcbiAgICBjb25zdCBsb3dWYXJpYW5jZSA9IGNoZWNrMS5yZXN1bHQgJiYgY2hlY2sycmVzO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBrZXk9XCJib2R5XCIgY2xhc3NOYW1lPVwibW9kYWwtYm9keSBkZXNjcmliZS1ib2R5XCI+XHJcbiAgICAgICAgPEJvdW5jZXJXcmFwcGVyIHNob3dCb3VuY2VyPXt0aGlzLnN0YXRlLmxvYWRpbmdWYXJpYW5jZX0+XHJcbiAgICAgICAgICA8aDE+e2BCYXNlZCBvbiBjaGVja3MgMSAmIDIgXCIke2NvbHVtbn1cIiAke2xvd1ZhcmlhbmNlID8gXCJoYXNcIiA6IFwiZG9lcyBub3QgaGF2ZVwifSBMb3cgVmFyaWFuY2VgfTwvaDE+XHJcbiAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtci0zXCI+e2Ake2NoZWNrMU1zZ30gPT5gfTwvc3Bhbj5cclxuICAgICAgICAgICAgICA8Yj57Y2hlY2sxLnJlc3VsdCArIFwiXCJ9PC9iPlxyXG4gICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibXItM1wiPlVuaXF1ZSBWYWx1ZXM6PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPGI+e2NoZWNrMS51bmlxdWV9PC9iPlxyXG4gICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibXItM1wiPlNhbXBsZSBTaXplOjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxiPntjaGVjazEuc2l6ZX08L2I+XHJcbiAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtci0zXCI+UGVyY2VudGFnZTo8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8Yj57Y2hlY2sxUGN0fSU8L2I+XHJcbiAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAge3RoaXMucmVuZGVyQ2hlY2syKCl9XHJcbiAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtci0zXCI+UGVyY2VudGFnZSBNaXNzaW5nOjwvc3Bhbj5cclxuICAgICAgICAgICAgICA8Yj57Xy5yb3VuZCgxMDAgKiAobWlzc2luZ0N0IC8gc2l6ZSksIDIpfSU8L2I+XHJcbiAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtci0zXCI+UGVyY2VudGFnZSBPdXRsaWVyczo8L3NwYW4+XHJcbiAgICAgICAgICAgICAgPGI+e18ucm91bmQoMTAwICogKG91dGxpZXJDdCAvIHNpemUpLCAyKX0lPC9iPlxyXG4gICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICA8bGk+SmFycXVlLUJlcmE8L2xpPlxyXG4gICAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgU3RhdGlzdGljOiA8Yj57Xy5yb3VuZChqYXJxdWVCZXJhLnN0YXRpc3RpYywgMil9PC9iPlxyXG4gICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgUC12YWx1ZTogPGI+e18ucm91bmQoamFycXVlQmVyYS5wdmFsdWUsIDIpfTwvYj5cclxuICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8bGk+U2hhcGlyby1XaWxrPC9saT5cclxuICAgICAgICAgICAgPHVsPlxyXG4gICAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgIFN0YXRpc3RpYzogPGI+e18ucm91bmQoc2hhcGlyb1dpbGsuc3RhdGlzdGljLCAyKX08L2I+XHJcbiAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICBQLXZhbHVlOiA8Yj57Xy5yb3VuZChzaGFwaXJvV2lsay5wdmFsdWUsIDIpfTwvYj5cclxuICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgPC91bD5cclxuICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxyXG4gICAgICAgICAgICAgIHJpZ2h0OiAyNSxcclxuICAgICAgICAgICAgICB0b3A6IDYwLFxyXG4gICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAge3JlbmRlckNvZGVQb3B1cEFuY2hvcihjb2RlLCBcIlZhcmlhbmNlXCIpfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcclxuICAgICAgICAgICAgICB3aWR0aDogXCI1MCVcIixcclxuICAgICAgICAgICAgICBoZWlnaHQ6IDMyNSxcclxuICAgICAgICAgICAgICByaWdodDogMjUsXHJcbiAgICAgICAgICAgICAgYm90dG9tOiAwLFxyXG4gICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgPFZhcmlhbmNlQ2hhcnQgey4uLnRoaXMucHJvcHN9IGhlaWdodD17Mjc1fSAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9Cb3VuY2VyV3JhcHBlcj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5WYXJpYW5jZS5kaXNwbGF5TmFtZSA9IFwiVmFyaWFuY2VcIjtcclxuVmFyaWFuY2UucHJvcFR5cGVzID0ge1xyXG4gIGRhdGFJZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gIGNoYXJ0RGF0YTogUHJvcFR5cGVzLnNoYXBlKHtcclxuICAgIHZpc2libGU6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICBzZWxlY3RlZENvbDogUHJvcFR5cGVzLnN0cmluZyxcclxuICB9KSxcclxufTtcclxuXHJcbmV4cG9ydCB7IFZhcmlhbmNlIH07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=