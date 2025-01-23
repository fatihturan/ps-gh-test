webpackHotUpdate("main",{

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./static/popups/describe/DtypesGrid.css":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-1!./node_modules/postcss-loader/src??ref--6-2!./static/popups/describe/DtypesGrid.css ***!
  \*******************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".dtypes .cell,\r\n.dtypes .headerCell {\r\n  width: 100%;\r\n  height: 100%;\r\n  display: inherit;\r\n  border-width: 1px;\r\n  border-style: solid;\r\n  border-color: rgba(170, 170, 170, 0.25);\r\n}\r\n.dtypes .headerCell {\r\n  font-weight: bold;\r\n  cursor: pointer;\r\n}\r\n.dtypes .headerCell.filterable .row {\r\n  margin-left: 0;\r\n  margin-right: 0;\r\n  padding-bottom: 0.5em;\r\n  padding-top: 0.5em;\r\n}\r\n.dtypes .headerCell.filterable .col,\r\n.dtypes .headerCell.filterable .col-auto {\r\n  padding-left: 0;\r\n  padding-right: 0;\r\n}\r\n\r\n.dtypes .dtype-row-selected {\r\n  font-weight: bold;\r\n  background-color: rgba(11, 8, 39, 0.2);\r\n}\r\n.dtypes .dtype-row:hover {\r\n  font-weight: bold;\r\n  cursor: pointer;\r\n  background-color: rgba(11, 8, 39, 0.2);\r\n}\r\n", "",{"version":3,"sources":["DtypesGrid.css"],"names":[],"mappings":"AAAA;;EAEE,WAAW;EACX,YAAY;EACZ,gBAAgB;EAChB,iBAAiB;EACjB,mBAAmB;EACnB,uCAAuC;AACzC;AACA;EACE,iBAAiB;EACjB,eAAe;AACjB;AACA;EACE,cAAc;EACd,eAAe;EACf,qBAAqB;EACrB,kBAAkB;AACpB;AACA;;EAEE,eAAe;EACf,gBAAgB;AAClB;;AAEA;EACE,iBAAiB;EACjB,yCAAyC;AAC3C;AACA;EACE,iBAAiB;EACjB,eAAe;EACf,yCAAyC;AAC3C","file":"DtypesGrid.css","sourcesContent":[".dtypes .cell,\r\n.dtypes .headerCell {\r\n  width: 100%;\r\n  height: 100%;\r\n  display: inherit;\r\n  border-width: 1px;\r\n  border-style: solid;\r\n  border-color: rgba(170, 170, 170, 0.25);\r\n}\r\n.dtypes .headerCell {\r\n  font-weight: bold;\r\n  cursor: pointer;\r\n}\r\n.dtypes .headerCell.filterable .row {\r\n  margin-left: 0;\r\n  margin-right: 0;\r\n  padding-bottom: 0.5em;\r\n  padding-top: 0.5em;\r\n}\r\n.dtypes .headerCell.filterable .col,\r\n.dtypes .headerCell.filterable .col-auto {\r\n  padding-left: 0;\r\n  padding-right: 0;\r\n}\r\n\r\n.dtypes .dtype-row-selected {\r\n  font-weight: bold;\r\n  background-color: rgba(11, 8, 39, 0.2);\r\n}\r\n.dtypes .dtype-row:hover {\r\n  font-weight: bold;\r\n  cursor: pointer;\r\n  background-color: rgba(11, 8, 39, 0.2);\r\n}\r\n"]}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./static/main.jsx":
/*!*************************!*\
  !*** ./static/main.jsx ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_dtale__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/dtale */ "./static/actions/dtale.js");
/* harmony import */ var _adapter_for_react_16__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./adapter-for-react-16 */ "./static/adapter-for-react-16.js");
/* harmony import */ var _adapter_for_react_16__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_adapter_for_react_16__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _dtale_DataViewer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dtale/DataViewer */ "./static/dtale/DataViewer.jsx");
/* harmony import */ var _popups_CodeExport__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./popups/CodeExport */ "./static/popups/CodeExport.jsx");
/* harmony import */ var _popups_CodePopup__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./popups/CodePopup */ "./static/popups/CodePopup.jsx");
/* harmony import */ var _popups_Correlations__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./popups/Correlations */ "./static/popups/Correlations.jsx");
/* harmony import */ var _popups_Filter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./popups/Filter */ "./static/popups/Filter.jsx");
/* harmony import */ var _popups_Instances__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./popups/Instances */ "./static/popups/Instances.jsx");
/* harmony import */ var _popups_Upload__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./popups/Upload */ "./static/popups/Upload.jsx");
/* harmony import */ var _popups_analysis_ColumnAnalysis__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./popups/analysis/ColumnAnalysis */ "./static/popups/analysis/ColumnAnalysis.jsx");
/* harmony import */ var _popups_charts_Charts__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./popups/charts/Charts */ "./static/popups/charts/Charts.jsx");
/* harmony import */ var _popups_create_CreateColumn__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./popups/create/CreateColumn */ "./static/popups/create/CreateColumn.jsx");
/* harmony import */ var _popups_describe_Describe__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./popups/describe/Describe */ "./static/popups/describe/Describe.jsx");
/* harmony import */ var _popups_duplicates_Duplicates__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./popups/duplicates/Duplicates */ "./static/popups/duplicates/Duplicates.jsx");
/* harmony import */ var _popups_replacement_CreateReplacement__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./popups/replacement/CreateReplacement */ "./static/popups/replacement/CreateReplacement.jsx");
/* harmony import */ var _popups_reshape_Reshape__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./popups/reshape/Reshape */ "./static/popups/reshape/Reshape.jsx");
/* harmony import */ var _popups_variance_Variance__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./popups/variance/Variance */ "./static/popups/variance/Variance.jsx");
/* harmony import */ var _reducers_dtale__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./reducers/dtale */ "./static/reducers/dtale.js");
/* harmony import */ var _reducers_store__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./reducers/store */ "./static/reducers/store.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

























__webpack_require__(/*! ./publicPath */ "./static/publicPath.js");

var settingsVal = _reducers_dtale__WEBPACK_IMPORTED_MODULE_21__["default"].getHiddenValue("settings");
var settings = settingsVal ? JSON.parse(settingsVal) : {};
var pathname = window.location.pathname;

if (window.resourceBaseUrl) {
  pathname = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.replace(pathname, window.resourceBaseUrl, "");
}

if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.startsWith(pathname, "/dtale/popup")) {
  __webpack_require__(/*! ./dtale/DataViewer.css */ "./static/dtale/DataViewer.css");

  var rootNode = null;
  var dataId = _reducers_dtale__WEBPACK_IMPORTED_MODULE_21__["default"].getHiddenValue("data_id");

  var chartData = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.assignIn(_actions_dtale__WEBPACK_IMPORTED_MODULE_4__["default"].getParams(), {
    visible: true
  }, settings.query ? {
    query: settings.query
  } : {});

  var pathSegs = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.split(pathname, "/");

  var popupType = pathSegs[pathSegs.length - 1] === "code-popup" ? "code-popup" : pathSegs[3];

  switch (popupType) {
    case "filter":
      rootNode = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_popups_Filter__WEBPACK_IMPORTED_MODULE_10__["ReactFilter"], {
        dataId: dataId,
        chartData: chartData
      });
      break;

    case "correlations":
      rootNode = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_popups_Correlations__WEBPACK_IMPORTED_MODULE_9__["Correlations"], {
        dataId: dataId,
        chartData: chartData
      });
      break;

    case "describe":
      rootNode = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_popups_describe_Describe__WEBPACK_IMPORTED_MODULE_16__["Describe"], {
        dataId: dataId,
        chartData: chartData
      });
      break;

    case "variance":
      rootNode = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_popups_variance_Variance__WEBPACK_IMPORTED_MODULE_20__["Variance"], {
        dataId: dataId,
        chartData: chartData
      });
      break;

    case "build":
      rootNode = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_popups_create_CreateColumn__WEBPACK_IMPORTED_MODULE_15__["ReactCreateColumn"], {
        dataId: dataId,
        chartData: chartData
      });
      break;

    case "duplicates":
      rootNode = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_popups_duplicates_Duplicates__WEBPACK_IMPORTED_MODULE_17__["ReactDuplicates"], {
        dataId: dataId,
        chartData: chartData
      });
      break;

    case "type-conversion":
      {
        var prePopulated = {
          type: "type_conversion",
          saveAs: "inplace",
          cfg: {
            col: chartData.selectedCol
          }
        };
        rootNode = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_popups_create_CreateColumn__WEBPACK_IMPORTED_MODULE_15__["ReactCreateColumn"], {
          dataId: dataId,
          chartData: chartData,
          prePopulated: prePopulated
        });
        break;
      }

    case "replacement":
      rootNode = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_popups_replacement_CreateReplacement__WEBPACK_IMPORTED_MODULE_18__["ReactCreateReplacement"], {
        dataId: dataId,
        chartData: chartData
      });
      break;

    case "reshape":
      rootNode = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_popups_reshape_Reshape__WEBPACK_IMPORTED_MODULE_19__["ReactReshape"], {
        dataId: dataId,
        chartData: chartData
      });
      break;

    case "column-analysis":
      rootNode = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_popups_analysis_ColumnAnalysis__WEBPACK_IMPORTED_MODULE_13__["ReactColumnAnalysis"], _extends({
        dataId: dataId,
        chartData: chartData
      }, {
        height: 250
      }));
      break;

    case "instances":
      rootNode = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_popups_Instances__WEBPACK_IMPORTED_MODULE_11__["default"], {
        dataId: dataId,
        iframe: true
      });
      break;

    case "code-export":
      rootNode = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_popups_CodeExport__WEBPACK_IMPORTED_MODULE_7__["CodeExport"], {
        dataId: dataId
      });
      break;

    case "upload":
      rootNode = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_popups_Upload__WEBPACK_IMPORTED_MODULE_12__["ReactUpload"], {
        chartData: {
          visible: true
        }
      });
      break;

    case "charts":
    default:
      rootNode = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_popups_charts_Charts__WEBPACK_IMPORTED_MODULE_14__["ReactCharts"], {
        dataId: dataId,
        chartData: chartData
      });
      break;
  }

  react_dom__WEBPACK_IMPORTED_MODULE_2___default.a.render(rootNode, document.getElementById("popup-content"));
} else if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.startsWith(pathname, "/dtale/code-popup")) {
  __webpack_require__(/*! ./dtale/DataViewer.css */ "./static/dtale/DataViewer.css");

  document.getElementById("code-title").innerHTML = "".concat(window.opener.code_popup.title, " Code Export");
  react_dom__WEBPACK_IMPORTED_MODULE_2___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_popups_CodePopup__WEBPACK_IMPORTED_MODULE_8__["CodePopup"], {
    code: window.opener.code_popup.code
  }), document.getElementById("popup-content"));
} else {
  var store = Object(_reducers_store__WEBPACK_IMPORTED_MODULE_22__["createStore"])(_reducers_dtale__WEBPACK_IMPORTED_MODULE_21__["default"].store);
  store.dispatch(_actions_dtale__WEBPACK_IMPORTED_MODULE_4__["default"].init());
  react_dom__WEBPACK_IMPORTED_MODULE_2___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__["Provider"], {
    store: store
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_dtale_DataViewer__WEBPACK_IMPORTED_MODULE_6__["DataViewer"], {
    settings: settings
  })), document.getElementById("content"));
}

/***/ }),

/***/ "./static/popups/analysis/filters/DescribeFilters.jsx":
/*!************************************************************!*\
  !*** ./static/popups/analysis/filters/DescribeFilters.jsx ***!
  \************************************************************/
/*! exports provided: DescribeFilters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DescribeFilters", function() { return DescribeFilters; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ButtonToggle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../ButtonToggle */ "./static/ButtonToggle.jsx");
/* harmony import */ var _dtale_gridUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../dtale/gridUtils */ "./static/dtale/gridUtils.jsx");
/* harmony import */ var _CodePopup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../CodePopup */ "./static/popups/CodePopup.jsx");
/* harmony import */ var _CategoryInputs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CategoryInputs */ "./static/popups/analysis/filters/CategoryInputs.jsx");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Constants */ "./static/popups/analysis/filters/Constants.js");
/* harmony import */ var _OrdinalInputs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./OrdinalInputs */ "./static/popups/analysis/filters/OrdinalInputs.jsx");
/* harmony import */ var _TextEnterFilter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./TextEnterFilter */ "./static/popups/analysis/filters/TextEnterFilter.jsx");
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












function wrapFilterMarkup(filterMarkup) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "form-group row small-gutters mb-3 mt-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "col row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "col"
  }), filterMarkup, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "col"
  })));
}

function buildState(props) {
  return {
    type: "boxplot",
    bins: "20",
    top: (props.top || 100) + "",
    ordinalCol: null,
    ordinalAgg: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(_Constants__WEBPACK_IMPORTED_MODULE_7__["ANALYSIS_AGGS"], {
      value: "sum"
    }),
    categoryCol: null,
    categoryAgg: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(_Constants__WEBPACK_IMPORTED_MODULE_7__["ANALYSIS_AGGS"], {
      value: "mean"
    })
  };
}

var DescribeFilters = /*#__PURE__*/function (_React$Component) {
  _inherits(DescribeFilters, _React$Component);

  var _super = _createSuper(DescribeFilters);

  function DescribeFilters(props) {
    var _this;

    _classCallCheck(this, DescribeFilters);

    _this = _super.call(this, props);
    _this.state = buildState(props);
    _this.buildChart = _this.buildChart.bind(_assertThisInitialized(_this));
    _this.buildChartTypeToggle = _this.buildChartTypeToggle.bind(_assertThisInitialized(_this));
    _this.buildFilter = _this.buildFilter.bind(_assertThisInitialized(_this));
    _this.updateOrdinal = _this.updateOrdinal.bind(_assertThisInitialized(_this));
    _this.updateCategory = _this.updateCategory.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(DescribeFilters, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(newProps, newState) {
      var props = ["cols", "dtype", "code", "details"];

      if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isEqual(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.pick(this.props, props), lodash__WEBPACK_IMPORTED_MODULE_0___default.a.pick(newProps, props))) {
        return true;
      }

      return !lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isEqual(this.state, newState);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isEqual(this.props.details, prevProps.details)) {
        this.setState(buildState(this.props));
      }
    }
  }, {
    key: "buildChartTypeToggle",
    value: function buildChartTypeToggle() {
      var _this2 = this;

      var colType = _dtale_gridUtils__WEBPACK_IMPORTED_MODULE_4__["exports"].findColType(this.props.dtype);
      var options = [{
        label: _Constants__WEBPACK_IMPORTED_MODULE_7__["TITLES"].boxplot,
        value: "boxplot"
      }];

      if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.includes(["float", "int"], colType)) {
        options.push({
          label: _Constants__WEBPACK_IMPORTED_MODULE_7__["TITLES"].histogram,
          value: "histogram"
        });
      }

      if (colType === "float") {
        options.push({
          label: _Constants__WEBPACK_IMPORTED_MODULE_7__["TITLES"].categories,
          value: "categories"
        });
      } else {
        options.push({
          label: _Constants__WEBPACK_IMPORTED_MODULE_7__["TITLES"].value_counts,
          value: "value_counts"
        });
      }

      var update = function update(value) {
        return _this2.setState({
          type: value
        }, _this2.buildChart);
      };

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ButtonToggle__WEBPACK_IMPORTED_MODULE_3__["default"], {
        options: options,
        update: update,
        defaultValue: this.state.type
      });
    }
  }, {
    key: "buildFilter",
    value: function buildFilter(prop) {
      var _this3 = this;

      var propagateState = function propagateState(state) {
        return _this3.setState(state);
      };

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_TextEnterFilter__WEBPACK_IMPORTED_MODULE_9__["default"], {
        key: "prop",
        prop: prop,
        buildChart: this.buildChart,
        dtype: this.props.dtype,
        propagateState: propagateState,
        defaultValue: this.state[prop]
      });
    }
  }, {
    key: "buildChart",
    value: function buildChart() {
      this.props.buildChart(this.state);
    }
  }, {
    key: "updateOrdinal",
    value: function updateOrdinal(prop, val) {
      var _this4 = this;

      var currState = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.assignIn({}, lodash__WEBPACK_IMPORTED_MODULE_0___default.a.pick(this.state, ["ordinalCol", "ordinalAgg"]), _defineProperty({}, prop, val));

      this.setState(currState, function () {
        if (currState.ordinalCol && currState.ordinalAgg) {
          _this4.buildChart();
        }
      });
    }
  }, {
    key: "updateCategory",
    value: function updateCategory(prop, val) {
      var _this5 = this;

      var currState = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.assignIn({}, lodash__WEBPACK_IMPORTED_MODULE_0___default.a.pick(this.state, ["categoryCol", "categoryAgg"]), _defineProperty({}, prop, val));

      this.setState(currState, function () {
        if (currState.categoryCol && currState.categoryAgg) {
          _this5.buildChart();
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isNull(this.props.type)) {
        return null;
      }

      var _this$props = this.props,
          code = _this$props.code,
          dtype = _this$props.dtype;
      var colType = _dtale_gridUtils__WEBPACK_IMPORTED_MODULE_4__["exports"].findColType(dtype);
      var filterMarkup = null;

      if (this.state.type === "boxplot") {
        filterMarkup = null;
      } else if ("int" === colType) {
        // int -> Value Counts or Histogram
        if (this.state.type === "histogram") {
          filterMarkup = wrapFilterMarkup(this.buildFilter("bins"));
        } else {
          filterMarkup = wrapFilterMarkup([this.buildFilter("top"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_OrdinalInputs__WEBPACK_IMPORTED_MODULE_8__["default"], _extends({
            key: "ordinal",
            updateOrdinal: this.updateOrdinal
          }, this.props))]);
        }
      } else if ("float" === colType) {
        // floats -> Histogram or Categories
        if (this.state.type === "histogram") {
          filterMarkup = wrapFilterMarkup(this.buildFilter("bins"));
        } else {
          filterMarkup = wrapFilterMarkup([this.buildFilter("top"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_CategoryInputs__WEBPACK_IMPORTED_MODULE_6__["default"], _extends({
            key: "category",
            updateCategory: this.updateCategory
          }, this.props))]);
        }
      } else {
        // date, string, bool -> Value Counts
        filterMarkup = wrapFilterMarkup([this.buildFilter("top"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_OrdinalInputs__WEBPACK_IMPORTED_MODULE_8__["default"], _extends({
          key: "ordinal",
          updateOrdinal: this.updateOrdinal
        }, this.props))]);
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "form-group row small-gutters mb-3 mt-3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "col row"
      }, this.buildChartTypeToggle()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "col-auto"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, Object(_CodePopup__WEBPACK_IMPORTED_MODULE_5__["renderCodePopupAnchor"])(code, _Constants__WEBPACK_IMPORTED_MODULE_7__["TITLES"][this.state.type])))), filterMarkup);
    }
  }]);

  return DescribeFilters;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

DescribeFilters.displayName = "DescribeFilters";
DescribeFilters.propTypes = {
  selectedCol: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  cols: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  dtype: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  code: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  type: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  top: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  buildChart: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  details: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object
};


/***/ }),

/***/ "./static/popups/describe/Describe.jsx":
/*!*********************************************!*\
  !*** ./static/popups/describe/Describe.jsx ***!
  \*********************************************/
/*! exports provided: Describe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Describe", function() { return Describe; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _BouncerWrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../BouncerWrapper */ "./static/BouncerWrapper.jsx");
/* harmony import */ var _RemovableError__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../RemovableError */ "./static/RemovableError.jsx");
/* harmony import */ var _actions_url_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../actions/url-utils */ "./static/actions/url-utils.js");
/* harmony import */ var _dtale_serverStateManagement__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../dtale/serverStateManagement */ "./static/dtale/serverStateManagement.jsx");
/* harmony import */ var _fetcher__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../fetcher */ "./static/fetcher.js");
/* harmony import */ var _Details__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Details */ "./static/popups/describe/Details.jsx");
/* harmony import */ var _DtypesGrid__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./DtypesGrid */ "./static/popups/describe/DtypesGrid.jsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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












var Describe = /*#__PURE__*/function (_React$Component) {
  _inherits(Describe, _React$Component);

  var _super = _createSuper(Describe);

  function Describe(props) {
    var _this;

    _classCallCheck(this, Describe);

    _this = _super.call(this, props);
    _this.state = {
      loadingDtypes: true,
      dtypes: null,
      dtypesFilter: null,
      selected: null
    };
    return _this;
  }

  _createClass(Describe, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      Object(_fetcher__WEBPACK_IMPORTED_MODULE_7__["fetchJson"])(Object(_actions_url_utils__WEBPACK_IMPORTED_MODULE_5__["dtypesUrl"])(this.props.dataId), function (dtypesData) {
        var newState = {
          error: null,
          loadingDtypes: false
        };

        if (dtypesData.error) {
          _this2.setState({
            error: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_RemovableError__WEBPACK_IMPORTED_MODULE_4__["RemovableError"], dtypesData)
          });

          return;
        }

        newState.dtypes = dtypesData.dtypes;

        if (dtypesData.dtypes.length) {
          var selectedRow = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(dtypesData.dtypes, {
            name: _this2.props.chartData.selectedCol
          });

          if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isUndefined(selectedRow)) {
            selectedRow = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.head(dtypesData.dtypes);
          }

          newState.dtypes = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(newState.dtypes, function (d) {
            return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.assign(d, {
              selected: d.name == selectedRow.name
            });
          });
          newState.selected = selectedRow; // by default, display first column
        }

        _this2.setState(newState);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (this.state.error) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          key: "body",
          className: "modal-body"
        }, this.state.error);
      }

      var save = function save() {
        var visibility = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.reduce(_this3._grid.state.dtypes, function (ret, d) {
          return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.assignIn(ret, _defineProperty({}, d.name, d.visible));
        }, {});

        var callback = function callback() {
          window.opener.location.reload();
          window.close();
        };

        _dtale_serverStateManagement__WEBPACK_IMPORTED_MODULE_6__["default"].updateVisibility(_this3.props.dataId, visibility, callback);
      };

      var propagateState = function propagateState(state) {
        return _this3.setState(state);
      };

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        key: "body",
        className: "modal-body describe-body"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "col-md-5 describe-dtypes-grid-col"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_BouncerWrapper__WEBPACK_IMPORTED_MODULE_3__["BouncerWrapper"], {
        showBouncer: this.state.loadingDtypes
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_DtypesGrid__WEBPACK_IMPORTED_MODULE_9__["DtypesGrid"], {
        ref: function ref(mg) {
          return _this3._grid = mg;
        },
        dtypes: this.state.dtypes,
        propagateState: propagateState
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "col-md-7 describe-details-col"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Details__WEBPACK_IMPORTED_MODULE_8__["Details"], {
        selected: this.state.selected,
        dataId: this.props.dataId,
        dtypes: this.state.dtypes
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        key: "footer",
        className: "modal-footer"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", {
        className: "btn btn-primary",
        onClick: save
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, "Save")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", {
        className: "btn btn-primary",
        onClick: function onClick() {
          return window.location.href = '/dtale/main/{{data_id}}';
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, "Reload")))];
    }
  }]);

  return Describe;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

Describe.displayName = "Describe";
Describe.propTypes = {
  dataId: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  chartData: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    visible: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,
    selectedCol: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
  })
};


/***/ }),

/***/ "./static/popups/describe/Details.jsx":
/*!********************************************!*\
  !*** ./static/popups/describe/Details.jsx ***!
  \********************************************/
/*! exports provided: Details */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Details", function() { return Details; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Bouncer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Bouncer */ "./static/Bouncer.jsx");
/* harmony import */ var _JSAnchor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../JSAnchor */ "./static/JSAnchor.jsx");
/* harmony import */ var _RemovableError__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../RemovableError */ "./static/RemovableError.jsx");
/* harmony import */ var _actions_url_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../actions/url-utils */ "./static/actions/url-utils.js");
/* harmony import */ var _dtale_gridUtils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../dtale/gridUtils */ "./static/dtale/gridUtils.jsx");
/* harmony import */ var _fetcher__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../fetcher */ "./static/fetcher.js");
/* harmony import */ var _toggleUtils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../toggleUtils */ "./static/toggleUtils.js");
/* harmony import */ var _DetailsCharts__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./DetailsCharts */ "./static/popups/describe/DetailsCharts.jsx");
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












var BASE_DESCRIBE_URL = "/dtale/describe";

function displayUniques(uniques) {
  var dtype = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isEmpty(uniques.data)) {
    return null;
  }

  var title = "Unique Values";

  if (dtype) {
    title = "".concat(title, " of type '").concat(dtype, "'");
  }

  if (uniques.top) {
    title = "".concat(title, " (top 100 most common)");
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    key: dtype,
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "col-sm-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
    className: "font-weight-bold",
    style: {
      fontSize: "120%"
    }
  }, "".concat(title, ":")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, lodash__WEBPACK_IMPORTED_MODULE_0___default.a.join(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(uniques.data, function (u) {
    return "".concat(u.value, " (").concat(u.count, ")");
  }), ", "))));
}

var Details = /*#__PURE__*/function (_React$Component) {
  _inherits(Details, _React$Component);

  var _super = _createSuper(Details);

  function Details(props) {
    var _this;

    _classCallCheck(this, Details);

    _this = _super.call(this, props);
    _this.state = {
      error: null,
      details: null,
      deepData: "uniques",
      outliers: null,
      loadingOutliers: false
    };
    _this.loadDetails = _this.loadDetails.bind(_assertThisInitialized(_this));
    _this.renderUniques = _this.renderUniques.bind(_assertThisInitialized(_this));
    _this.renderDeepDataToggle = _this.renderDeepDataToggle.bind(_assertThisInitialized(_this));
    _this.loadOutliers = _this.loadOutliers.bind(_assertThisInitialized(_this));
    _this.renderOutliers = _this.renderOutliers.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Details, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isEqual(this.props.selected, prevProps.selected)) {
        this.loadDetails();
      }
    }
  }, {
    key: "loadDetails",
    value: function loadDetails() {
      var _this2 = this;

      Object(_fetcher__WEBPACK_IMPORTED_MODULE_8__["fetchJson"])("".concat(BASE_DESCRIBE_URL, "/").concat(this.props.dataId, "/").concat(this.props.selected.name), function (detailData) {
        var newState = {
          error: null,
          details: null,
          code: null,
          outliers: null,
          deepData: "uniques"
        };

        if (detailData.error) {
          newState.error = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
            className: "col-md-12"
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_RemovableError__WEBPACK_IMPORTED_MODULE_5__["RemovableError"], detailData));

          _this2.setState(newState);

          return;
        }

        newState.details = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.pick(detailData, ["describe", "uniques", "dtype_counts"]);
        newState.details.name = _this2.props.selected.name;
        newState.details.dtype = _this2.props.selected.dtype;
        newState.code = detailData.code;

        _this2.setState(newState);
      });
    }
  }, {
    key: "renderUniques",
    value: function renderUniques() {
      if (this.state.deepData == "outliers") {
        return null;
      }

      var uniques = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(this.state, "details.uniques") || {};

      var dtypeCt = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.size(uniques);

      return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(uniques, function (dtypeUniques, dtype) {
        return displayUniques(dtypeUniques, dtypeCt > 1 ? dtype : null);
      });
    }
  }, {
    key: "loadOutliers",
    value: function loadOutliers() {
      var _this3 = this;

      this.setState({
        loadingOutliers: true
      });
      Object(_fetcher__WEBPACK_IMPORTED_MODULE_8__["fetchJson"])("/dtale/outliers/".concat(this.props.dataId, "/").concat(this.props.selected.name), function (outlierData) {
        _this3.setState({
          outliers: outlierData,
          loadingOutliers: false
        });
      });
    }
  }, {
    key: "renderDeepDataToggle",
    value: function renderDeepDataToggle() {
      var _this4 = this;

      if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.includes(["float", "int"], _dtale_gridUtils__WEBPACK_IMPORTED_MODULE_7__["exports"].findColType(this.props.selected.dtype))) {
        var _this$state = this.state,
            deepData = _this$state.deepData,
            outliers = _this$state.outliers,
            loadingOutliers = _this$state.loadingOutliers;

        var toggle = function toggle(val) {
          return function () {
            var outliersCallback = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isNull(outliers) && !loadingOutliers ? _this4.loadOutliers : lodash__WEBPACK_IMPORTED_MODULE_0___default.a.noop;

            _this4.setState({
              deepData: val
            }, outliersCallback);
          };
        };

        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          className: "row pb-5"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          className: "col-auto pl-0"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          className: "btn-group compact col-auto"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", Object(_toggleUtils__WEBPACK_IMPORTED_MODULE_9__["buildButton"])(deepData == "uniques", toggle("uniques")), "Uniques"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", Object(_toggleUtils__WEBPACK_IMPORTED_MODULE_9__["buildButton"])(deepData == "outliers", toggle("outliers")), "Outliers"))));
      }

      return null;
    }
  }, {
    key: "renderOutliers",
    value: function renderOutliers() {
      var _this5 = this;

      if (this.state.deepData == "uniques") {
        return null;
      }

      if (this.state.loadingOutliers) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Bouncer__WEBPACK_IMPORTED_MODULE_3__["Bouncer"], null);
      }

      var outliers = this.state.outliers;

      var outlierValues = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(outliers, "outliers", []);

      if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isEmpty(outlierValues)) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          key: 3,
          className: "row"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          className: "col-sm-12"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
          className: "font-weight-bold",
          style: {
            fontSize: "120%"
          }
        }, "No Outliers Detected")));
      }

      var saveFilter = function saveFilter() {
        var cfg = {
          type: "outliers"
        };

        if (!outliers.queryApplied) {
          cfg.query = outliers.query;
        }

        var url = Object(_actions_url_utils__WEBPACK_IMPORTED_MODULE_6__["buildURLString"])(Object(_actions_url_utils__WEBPACK_IMPORTED_MODULE_6__["saveColFilterUrl"])(_this5.props.dataId, _this5.props.selected.name), {
          cfg: JSON.stringify(cfg)
        });

        _this5.setState({
          outliers: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.assignIn({}, outliers, {
            queryApplied: !outliers.queryApplied
          })
        }, Object(_fetcher__WEBPACK_IMPORTED_MODULE_8__["fetchJson"])(url, function () {
          return window.opener.location.reload();
        }));
      };

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        key: 1,
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "col"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
        className: "font-weight-bold",
        style: {
          fontSize: "120%"
        }
      }, "".concat(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.size(outlierValues), " Outliers Found").concat(outliers.top ? " (top 100)" : "", ":")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_JSAnchor__WEBPACK_IMPORTED_MODULE_4__["JSAnchor"], {
        onClick: saveFilter,
        className: "d-block"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
        className: "pr-3"
      }, "".concat(outliers.queryApplied ? "Remove" : "Apply", " outlier filter:")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
        className: "font-weight-bold"
      }, outliers.query))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "col-auto"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "hoverable",
        style: {
          borderBottom: "none"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", {
        className: "ico-code pr-3"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, "View Code"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "hoverable__content",
        style: {
          width: "auto"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("pre", {
        className: "mb-0"
      }, outliers.code))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        key: 2,
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "col-sm-12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, lodash__WEBPACK_IMPORTED_MODULE_0___default.a.join(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.sortBy(outlierValues), ", "))))];
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.error) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          key: 1,
          className: "row"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          className: "col-sm-12"
        }, this.state.error));
      }

      var _this$state2 = this.state,
          details = _this$state2.details,
          code = _this$state2.code;

      if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isEmpty(details)) {
        return null;
      }

      var _this$props = this.props,
          dtypes = _this$props.dtypes,
          selected = _this$props.selected,
          dataId = _this$props.dataId;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "col"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
        className: "mb-0 font-weight-bold",
        style: {
          fontSize: "2em"
        }
      }, details.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
        className: "pl-3"
      }, "(", details.dtype, ")"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_DetailsCharts__WEBPACK_IMPORTED_MODULE_10__["default"], {
        details: details,
        detailCode: code,
        dtype: details.dtype,
        cols: dtypes,
        col: selected.name,
        dataId: dataId
      }), this.renderDeepDataToggle(), this.renderUniques(), this.renderOutliers());
    }
  }]);

  return Details;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

Details.displayName = "Details";
Details.propTypes = {
  selected: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  dataId: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  dtypes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array
};


/***/ }),

/***/ "./static/popups/describe/DetailsBoxplot.jsx":
/*!***************************************************!*\
  !*** ./static/popups/describe/DetailsBoxplot.jsx ***!
  \***************************************************/
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
/* harmony import */ var _chartUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../chartUtils */ "./static/chartUtils.jsx");
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





var COUNT_STATS = ["count", "missing_ct", "missing_pct"];
var POSITION_STATS = ["first", "last", "top"];
var LABELS = {
  total_count: "Total Rows",
  count: "Count (non-nan)",
  missing_ct: "Count (missing)",
  missing_pct: "% Missing",
  freq: "Frequency"
};

function buildStat(key, value) {
  if (value !== undefined) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h4", {
      className: "d-inline pr-5"
    }, "".concat(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(LABELS, key, key), ":")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
      className: "d-inline"
    }, value));
  }

  return null;
}

var DetailsBoxplot = /*#__PURE__*/function (_React$Component) {
  _inherits(DetailsBoxplot, _React$Component);

  var _super = _createSuper(DetailsBoxplot);

  function DetailsBoxplot(props) {
    var _this;

    _classCallCheck(this, DetailsBoxplot);

    _this = _super.call(this, props);
    _this.state = {
      boxplot: null
    };
    _this.createBoxplot = _this.createBoxplot.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(DetailsBoxplot, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.createBoxplot();
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(newProps) {
      return !lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isEqual(this.props.details, newProps.details);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.createBoxplot();
    }
  }, {
    key: "createBoxplot",
    value: function createBoxplot() {
      var _this2 = this;

      var builder = function builder(ctx) {
        var details = _this2.props.details;

        var _ref = details || {},
            describe = _ref.describe,
            name = _ref.name;

        var chartData = lodash__WEBPACK_IMPORTED_MODULE_0___default()(describe || {}).pickBy(function (v, k) {
          return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.includes(["25%", "50%", "75%", "min", "max"], k) && !lodash__WEBPACK_IMPORTED_MODULE_0___default.a.includes(["nan", "inf"], v);
        }).mapKeys(function (_v, k) {
          return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get({
            "25%": "q1",
            "50%": "median",
            "75%": "q3"
          }, k, k);
        }).mapValues(function (v) {
          return parseFloat(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.replace(v, /,/g, ""));
        }).value();

        if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.size(chartData) == 0) {
          return null;
        }

        lodash__WEBPACK_IMPORTED_MODULE_0___default.a.forEach(["min", "max"], function (p) {
          if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isUndefined(chartData[p])) {
            chartData["whisker".concat(p)] = chartData[p];
          }
        });

        if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isUndefined(describe.mean) && !lodash__WEBPACK_IMPORTED_MODULE_0___default.a.includes(["nan", "inf"], describe.mean)) {
          chartData.outliers = [parseFloat(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.replace(describe.mean, /,/g, ""))];
        }

        return _chartUtils__WEBPACK_IMPORTED_MODULE_3__["default"].createChart(ctx, {
          type: "boxplot",
          data: {
            labels: [name],
            datasets: [{
              label: name,
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderColor: "rgb(54, 162, 235)",
              borderWidth: 1,
              data: [chartData]
            }]
          },
          options: {
            responsive: true,
            legend: {
              display: false
            },
            title: {
              display: false
            },
            tooltips: {
              enabled: false
            },
            scales: {
              yAxes: [{
                ticks: {
                  min: chartData.min - 1,
                  max: chartData.max + 1
                }
              }]
            }
          }
        });
      };

      var chart = _chartUtils__WEBPACK_IMPORTED_MODULE_3__["default"].chartWrapper("boxplot", this.state.boxplot, builder);
      this.setState({
        boxplot: chart
      });
    }
  }, {
    key: "render",
    value: function render() {
      var details = this.props.details;

      var describe = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(details, "describe", {});

      var describeKeys = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.keys(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.omit(describe, lodash__WEBPACK_IMPORTED_MODULE_0___default.a.concat(["total_count", "freq"], COUNT_STATS, POSITION_STATS)));

      var dtypeCounts = null;

      if (details.dtype_counts) {
        dtypeCounts = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h4", {
          className: "mb-0"
        }, "Dtype Counts"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("ul", null, lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(details.dtype_counts, function (_ref2) {
          var count = _ref2.count,
              dtype = _ref2.dtype;
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", {
            key: dtype
          }, dtype, ": ", count);
        })));
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "col-md-6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null, buildStat("total_count", describe.total_count), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("ul", null, lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(COUNT_STATS, function (stat) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", {
          key: stat
        }, buildStat(stat, describe[stat]));
      }))), lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(POSITION_STATS, function (k) {
        return describe[k] !== undefined && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", {
          key: k
        }, buildStat(k, describe[k]));
      }), describe.freq !== undefined && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null, buildStat("freq", describe.freq))), lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(describeKeys, function (k) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", {
          key: k
        }, buildStat(k, describe[k]));
      }), dtypeCounts)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "col-md-6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        style: {
          height: 300
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("canvas", {
        id: "boxplot"
      }))));
    }
  }]);

  return DetailsBoxplot;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

DetailsBoxplot.displayName = "DetailsBoxplot";
DetailsBoxplot.propTypes = {
  details: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object
};
/* harmony default export */ __webpack_exports__["default"] = (DetailsBoxplot);

/***/ }),

/***/ "./static/popups/describe/DetailsCharts.jsx":
/*!**************************************************!*\
  !*** ./static/popups/describe/DetailsCharts.jsx ***!
  \**************************************************/
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
/* harmony import */ var _analysis_columnAnalysisUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../analysis/columnAnalysisUtils */ "./static/popups/analysis/columnAnalysisUtils.js");
/* harmony import */ var _analysis_filters_DescribeFilters__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../analysis/filters/DescribeFilters */ "./static/popups/analysis/filters/DescribeFilters.jsx");
/* harmony import */ var _DetailsBoxplot__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DetailsBoxplot */ "./static/popups/describe/DetailsBoxplot.jsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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








var DetailsCharts = /*#__PURE__*/function (_React$Component) {
  _inherits(DetailsCharts, _React$Component);

  var _super = _createSuper(DetailsCharts);

  function DetailsCharts(props) {
    var _this;

    _classCallCheck(this, DetailsCharts);

    _this = _super.call(this, props);
    _this.state = _objectSpread({
      chart: null,
      type: "boxplot",
      error: null,
      chartParams: null
    }, props);
    _this.buildChart = _this.buildChart.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(DetailsCharts, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.buildChart({
        type: "boxplot"
      });
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(newProps, newState) {
      if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isEqual(this.props, newProps)) {
        return true;
      }

      var updateState = ["type", "error", "chartParams", "chart"];

      if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isEqual(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.pick(this.state, updateState), lodash__WEBPACK_IMPORTED_MODULE_0___default.a.pick(newState, updateState))) {
        return true;
      }

      return false;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isEqual(this.props, prevProps)) {
        this.setState(this.props, function () {
          return _this2.buildChart({
            type: "boxplot"
          });
        });
      }
    }
  }, {
    key: "buildChart",
    value: function buildChart(chartParams) {
      var _this3 = this;

      var finalParams = chartParams || this.state.chartParams;

      if (finalParams.type === "boxplot") {
        var _this$props = this.props,
            details = _this$props.details,
            detailCode = _this$props.detailCode;
        this.setState({
          chart: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_DetailsBoxplot__WEBPACK_IMPORTED_MODULE_5__["default"], {
            details: details
          }),
          code: detailCode,
          query: null
        });
      } else {
        var propagateState = function propagateState(state) {
          return _this3.setState(state);
        };

        var props = {
          chartData: {
            selectedCol: this.props.col
          },
          height: 400,
          dataId: this.props.dataId
        };
        Object(_analysis_columnAnalysisUtils__WEBPACK_IMPORTED_MODULE_3__["dataLoader"])(props, this.state, propagateState, finalParams);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var details = this.props.details;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "col-md-12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_analysis_filters_DescribeFilters__WEBPACK_IMPORTED_MODULE_4__["DescribeFilters"], _extends({}, lodash__WEBPACK_IMPORTED_MODULE_0___default.a.pick(this.state, ["type", "cols", "dtype", "code", "top"]), {
        chartType: this.state.type,
        selectedCol: this.props.col,
        buildChart: this.buildChart,
        details: details
      })))), this.state.chart);
    }
  }]);

  return DetailsCharts;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

DetailsCharts.displayName = "DetailsCharts";
DetailsCharts.propTypes = {
  details: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  detailCode: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  cols: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  dtype: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  col: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  dataId: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
};
/* harmony default export */ __webpack_exports__["default"] = (DetailsCharts);

/***/ }),

/***/ "./static/popups/describe/DtypesGrid.css":
/*!***********************************************!*\
  !*** ./static/popups/describe/DtypesGrid.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--6-1!../../../node_modules/postcss-loader/src??ref--6-2!./DtypesGrid.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./static/popups/describe/DtypesGrid.css");

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
      /*! !../../../node_modules/css-loader/dist/cjs.js??ref--6-1!../../../node_modules/postcss-loader/src??ref--6-2!./DtypesGrid.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./static/popups/describe/DtypesGrid.css",
      function () {
        content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--6-1!../../../node_modules/postcss-loader/src??ref--6-2!./DtypesGrid.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./static/popups/describe/DtypesGrid.css");

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

/***/ "./static/popups/describe/DtypesGrid.jsx":
/*!***********************************************!*\
  !*** ./static/popups/describe/DtypesGrid.jsx ***!
  \***********************************************/
/*! exports provided: DtypesGrid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DtypesGrid", function() { return DtypesGrid; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_virtualized_dist_commonjs_AutoSizer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-virtualized/dist/commonjs/AutoSizer */ "./node_modules/react-virtualized/dist/commonjs/AutoSizer/index.js");
/* harmony import */ var react_virtualized_dist_commonjs_AutoSizer__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_virtualized_dist_commonjs_AutoSizer__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_virtualized_dist_commonjs_Table_Column__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-virtualized/dist/commonjs/Table/Column */ "./node_modules/react-virtualized/dist/commonjs/Table/Column.js");
/* harmony import */ var react_virtualized_dist_commonjs_Table_Column__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_virtualized_dist_commonjs_Table_Column__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_virtualized_dist_commonjs_Table_Table__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-virtualized/dist/commonjs/Table/Table */ "./node_modules/react-virtualized/dist/commonjs/Table/Table.js");
/* harmony import */ var react_virtualized_dist_commonjs_Table_Table__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_virtualized_dist_commonjs_Table_Table__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _dtale_gridUtils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../dtale/gridUtils */ "./static/dtale/gridUtils.jsx");
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









__webpack_require__(/*! ./DtypesGrid.css */ "./static/popups/describe/DtypesGrid.css");

var SortIndicator = /*#__PURE__*/function (_React$Component) {
  _inherits(SortIndicator, _React$Component);

  var _super = _createSuper(SortIndicator);

  function SortIndicator() {
    _classCallCheck(this, SortIndicator);

    return _super.apply(this, arguments);
  }

  _createClass(SortIndicator, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          sortDirection = _this$props.sortDirection,
          sortBy = _this$props.sortBy,
          dataKey = _this$props.dataKey;

      if (sortBy !== dataKey || lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isNull(sortDirection)) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("svg", {
          width: 18,
          height: 18,
          style: {
            verticalAlign: "bottom"
          }
        });
      }

      var className = "ReactVirtualized__Table__sortableHeaderIcon--".concat(sortDirection);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("svg", {
        className: "ReactVirtualized__Table__sortableHeaderIcon ".concat(className),
        width: 18,
        height: 18,
        viewBox: "0 0 24 24",
        style: {
          verticalAlign: "bottom"
        }
      }, sortDirection === "ASC" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("path", {
        d: "M7 14l5-5 5 5z"
      }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("path", {
        d: "M7 10l5 5 5-5z"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("path", {
        d: "M0 0h24v24H0z",
        fill: "none"
      }));
    }
  }]);

  return SortIndicator;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

SortIndicator.propTypes = {
  sortDirection: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(["ASC", "DESC", "NONE"]),
  sortBy: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  dataKey: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
};

function sortDtypes(dtypes, sortBy, sortDirection) {
  return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.orderBy(dtypes, [sortBy], [sortDirection.toLowerCase()]);
}

function buildSortDtypesState(state, _ref) {
  var sortDirection = _ref.sortDirection,
      sortBy = _ref.sortBy;
  var finalSort = sortDirection;

  if (sortBy == state.sortBy && state.sortDirection === "DESC") {
    finalSort = "NONE";
  }

  if (finalSort === "NONE") {
    return {
      dtypes: sortDtypes(state.dtypes, "index", "ASC"),
      sortDirection: finalSort,
      sortBy: sortBy
    };
  }

  return {
    dtypes: sortDtypes(state.dtypes, sortBy, sortDirection),
    sortDirection: finalSort,
    sortBy: sortBy
  };
}

function filterDtypes(_ref2) {
  var dtypes = _ref2.dtypes,
      dtypesFilter = _ref2.dtypesFilter,
      sortDirection = _ref2.sortDirection,
      sortBy = _ref2.sortBy;
  var filteredDtypes = dtypes;

  if (dtypesFilter) {
    var substrLower = dtypesFilter.toLowerCase();
    filteredDtypes = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(dtypes, function (_ref3) {
      var name = _ref3.name;
      return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.includes(name.toLowerCase(), substrLower);
    });
  }

  return sortDtypes(filteredDtypes, sortBy, sortDirection);
}

var DtypesGrid = /*#__PURE__*/function (_React$Component2) {
  _inherits(DtypesGrid, _React$Component2);

  var _super2 = _createSuper(DtypesGrid);

  function DtypesGrid(props) {
    var _this;

    _classCallCheck(this, DtypesGrid);

    _this = _super2.call(this, props);
    _this.state = {
      dtypes: props.dtypes,
      dtypesFilter: null,
      sortBy: null,
      sortDirection: "NONE",
      allVisible: _dtale_gridUtils__WEBPACK_IMPORTED_MODULE_6__["exports"].noHidden(props.dtypes)
    };
    _this._headerRenderer = _this._headerRenderer.bind(_assertThisInitialized(_this));
    _this._rowClass = _this._rowClass.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(DtypesGrid, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(_newProps, newState) {
      return !lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isEqual(this.state, newState);
    }
  }, {
    key: "_headerRenderer",
    value: function _headerRenderer(_ref4) {
      var _this2 = this;

      var dataKey = _ref4.dataKey,
          label = _ref4.label,
          sortBy = _ref4.sortBy,
          sortDirection = _ref4.sortDirection;

      if (dataKey === "visible") {
        var allVisible = this.state.allVisible;

        var onClick = function onClick(e) {
          _this2.setState({
            dtypes: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(_this2.state.dtypes, function (d) {
              return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.assign({}, d, {
                visible: !allVisible
              });
            }),
            allVisible: !allVisible
          });

          e.stopPropagation();
        };

        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          className: "headerCell pointer",
          onClick: onClick
        }, label, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", {
          className: "ico-check-box".concat(allVisible ? "" : "-outline-blank"),
          onClick: onClick
        }));
      }

      var filterMarkup = null;

      if (dataKey === "name") {
        var filter = function filter(e) {
          return _this2.setState({
            dtypesFilter: e.target.value
          });
        };

        var _onClick = function _onClick(e) {
          return e.stopPropagation();
        };

        filterMarkup = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          className: "col",
          onClick: _onClick
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("input", {
          type: "text",
          onClick: _onClick,
          className: "w-100",
          value: this.state.dtypesFilter || "",
          onChange: filter
        }));
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        key: 0,
        className: "headerCell filterable"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "col-auto"
      }, label, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(SortIndicator, {
        dataKey: dataKey,
        sortBy: sortBy,
        sortDirection: sortDirection
      })), filterMarkup));
    }
  }, {
    key: "_rowClass",
    value: function _rowClass(_ref5) {
      var index = _ref5.index;

      if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(this.state.dtypes, [index, "selected"], false)) {
        return "dtype-row-selected";
      }

      return "dtype-row";
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isEmpty(this.state.error)) {
        return this.state.error;
      }

      var _this$state = this.state,
          sortBy = _this$state.sortBy,
          sortDirection = _this$state.sortDirection;

      var toggleVisibility = function toggleVisibility(_ref6) {
        var name = _ref6.name,
            visible = _ref6.visible;
        return function (e) {
          _this3.setState({
            dtypes: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(_this3.state.dtypes, function (d) {
              if (d.name === name) {
                return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.assign({}, d, {
                  visible: !visible
                });
              }

              return d;
            })
          });

          e.stopPropagation();
        };
      };

      var currDtypes = filterDtypes(this.state);

      var rowClick = function rowClick(_ref7) {
        var rowData = _ref7.rowData;
        return _this3.setState({
          dtypes: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(_this3.state.dtypes, function (d) {
            return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.assign({}, d, {
              selected: d.name === rowData.name
            });
          })
        }, function () {
          return _this3.props.propagateState({
            selected: rowData
          });
        });
      };

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_virtualized_dist_commonjs_AutoSizer__WEBPACK_IMPORTED_MODULE_3___default.a, null, function (_ref8) {
        var height = _ref8.height,
            width = _ref8.width;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_virtualized_dist_commonjs_Table_Table__WEBPACK_IMPORTED_MODULE_5___default.a, {
          headerHeight: 40,
          height: height < 400 ? 400 : height,
          overscanRowCount: 10,
          rowStyle: {
            display: "flex"
          },
          rowHeight: _dtale_gridUtils__WEBPACK_IMPORTED_MODULE_6__["exports"].ROW_HEIGHT,
          rowGetter: function rowGetter(_ref9) {
            var index = _ref9.index;
            return currDtypes[index];
          },
          rowCount: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.size(currDtypes),
          rowClassName: _this3._rowClass,
          sort: function sort(state) {
            return _this3.setState(buildSortDtypesState(_this3.state, state));
          },
          sortBy: sortBy,
          sortDirection: sortDirection === "NONE" ? null : sortDirection,
          width: width,
          onRowClick: rowClick,
          className: "dtypes"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_virtualized_dist_commonjs_Table_Column__WEBPACK_IMPORTED_MODULE_4___default.a, {
          dataKey: "index",
          label: "#",
          headerRenderer: _this3._headerRenderer,
          width: 35,
          style: {
            textAlign: "center"
          },
          className: "cell"
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_virtualized_dist_commonjs_Table_Column__WEBPACK_IMPORTED_MODULE_4___default.a, {
          dataKey: "visible",
          label: "Visible",
          headerRenderer: _this3._headerRenderer,
          width: 60,
          style: {
            textAlign: "left",
            paddingLeft: ".5em"
          },
          className: "cell",
          cellRenderer: function cellRenderer(_ref10) {
            var rowData = _ref10.rowData;
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
              onClick: toggleVisibility(rowData),
              className: "text-center pointer"
            }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", {
              className: "ico-check-box".concat(rowData.visible ? "" : "-outline-blank")
            }));
          }
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_virtualized_dist_commonjs_Table_Column__WEBPACK_IMPORTED_MODULE_4___default.a, {
          dataKey: "name",
          label: "Column Name",
          headerRenderer: _this3._headerRenderer,
          width: 200,
          flexGrow: 1,
          style: {
            textAlign: "left",
            paddingLeft: ".5em"
          },
          className: "cell"
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_virtualized_dist_commonjs_Table_Column__WEBPACK_IMPORTED_MODULE_4___default.a, {
          width: 100,
          dataKey: "dtype",
          label: "Data Type",
          headerRenderer: _this3._headerRenderer,
          style: {
            textAlign: "right",
            paddingLeft: ".5em",
            paddingTop: ".35em",
            fontSize: "80%"
          },
          className: "cell"
        }));
      });
    }
  }]);

  return DtypesGrid;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

DtypesGrid.displayName = "DtypesGrid";
DtypesGrid.propTypes = {
  dtypes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  propagateState: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
};


/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdGF0aWMvcG9wdXBzL2Rlc2NyaWJlL0R0eXBlc0dyaWQuY3NzIiwid2VicGFjazovLy8uL3N0YXRpYy9tYWluLmpzeCIsIndlYnBhY2s6Ly8vLi9zdGF0aWMvcG9wdXBzL2FuYWx5c2lzL2ZpbHRlcnMvRGVzY3JpYmVGaWx0ZXJzLmpzeCIsIndlYnBhY2s6Ly8vLi9zdGF0aWMvcG9wdXBzL2Rlc2NyaWJlL0Rlc2NyaWJlLmpzeCIsIndlYnBhY2s6Ly8vLi9zdGF0aWMvcG9wdXBzL2Rlc2NyaWJlL0RldGFpbHMuanN4Iiwid2VicGFjazovLy8uL3N0YXRpYy9wb3B1cHMvZGVzY3JpYmUvRGV0YWlsc0JveHBsb3QuanN4Iiwid2VicGFjazovLy8uL3N0YXRpYy9wb3B1cHMvZGVzY3JpYmUvRGV0YWlsc0NoYXJ0cy5qc3giLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL3BvcHVwcy9kZXNjcmliZS9EdHlwZXNHcmlkLmNzcz9hYjZiIiwid2VicGFjazovLy8uL3N0YXRpYy9wb3B1cHMvZGVzY3JpYmUvRHR5cGVzR3JpZC5qc3giXSwibmFtZXMiOlsicmVxdWlyZSIsInNldHRpbmdzVmFsIiwiYXBwIiwiZ2V0SGlkZGVuVmFsdWUiLCJzZXR0aW5ncyIsIkpTT04iLCJwYXJzZSIsInBhdGhuYW1lIiwid2luZG93IiwibG9jYXRpb24iLCJyZXNvdXJjZUJhc2VVcmwiLCJfIiwicmVwbGFjZSIsInN0YXJ0c1dpdGgiLCJyb290Tm9kZSIsImRhdGFJZCIsImNoYXJ0RGF0YSIsImFzc2lnbkluIiwiYWN0aW9ucyIsImdldFBhcmFtcyIsInZpc2libGUiLCJxdWVyeSIsInBhdGhTZWdzIiwic3BsaXQiLCJwb3B1cFR5cGUiLCJsZW5ndGgiLCJwcmVQb3B1bGF0ZWQiLCJ0eXBlIiwic2F2ZUFzIiwiY2ZnIiwiY29sIiwic2VsZWN0ZWRDb2wiLCJSZWFjdERPTSIsInJlbmRlciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJpbm5lckhUTUwiLCJvcGVuZXIiLCJjb2RlX3BvcHVwIiwidGl0bGUiLCJjb2RlIiwic3RvcmUiLCJjcmVhdGVTdG9yZSIsImRpc3BhdGNoIiwiaW5pdCIsIndyYXBGaWx0ZXJNYXJrdXAiLCJmaWx0ZXJNYXJrdXAiLCJidWlsZFN0YXRlIiwicHJvcHMiLCJiaW5zIiwidG9wIiwib3JkaW5hbENvbCIsIm9yZGluYWxBZ2ciLCJmaW5kIiwiQU5BTFlTSVNfQUdHUyIsInZhbHVlIiwiY2F0ZWdvcnlDb2wiLCJjYXRlZ29yeUFnZyIsIkRlc2NyaWJlRmlsdGVycyIsInN0YXRlIiwiYnVpbGRDaGFydCIsImJpbmQiLCJidWlsZENoYXJ0VHlwZVRvZ2dsZSIsImJ1aWxkRmlsdGVyIiwidXBkYXRlT3JkaW5hbCIsInVwZGF0ZUNhdGVnb3J5IiwibmV3UHJvcHMiLCJuZXdTdGF0ZSIsImlzRXF1YWwiLCJwaWNrIiwicHJldlByb3BzIiwiZGV0YWlscyIsInNldFN0YXRlIiwiY29sVHlwZSIsImd1IiwiZmluZENvbFR5cGUiLCJkdHlwZSIsIm9wdGlvbnMiLCJsYWJlbCIsIlRJVExFUyIsImJveHBsb3QiLCJpbmNsdWRlcyIsInB1c2giLCJoaXN0b2dyYW0iLCJjYXRlZ29yaWVzIiwidmFsdWVfY291bnRzIiwidXBkYXRlIiwicHJvcCIsInByb3BhZ2F0ZVN0YXRlIiwia2V5IiwiZGVmYXVsdFZhbHVlIiwidmFsIiwiY3VyclN0YXRlIiwiaXNOdWxsIiwicmVuZGVyQ29kZVBvcHVwQW5jaG9yIiwiUmVhY3QiLCJDb21wb25lbnQiLCJkaXNwbGF5TmFtZSIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsInN0cmluZyIsImNvbHMiLCJhcnJheSIsIm51bWJlciIsImZ1bmMiLCJvYmplY3QiLCJEZXNjcmliZSIsImxvYWRpbmdEdHlwZXMiLCJkdHlwZXMiLCJkdHlwZXNGaWx0ZXIiLCJzZWxlY3RlZCIsImZldGNoSnNvbiIsImR0eXBlc1VybCIsImR0eXBlc0RhdGEiLCJlcnJvciIsInNlbGVjdGVkUm93IiwibmFtZSIsImlzVW5kZWZpbmVkIiwiaGVhZCIsIm1hcCIsImQiLCJhc3NpZ24iLCJzYXZlIiwidmlzaWJpbGl0eSIsInJlZHVjZSIsIl9ncmlkIiwicmV0IiwiY2FsbGJhY2siLCJyZWxvYWQiLCJjbG9zZSIsInNlcnZlclN0YXRlIiwidXBkYXRlVmlzaWJpbGl0eSIsIm1nIiwiaHJlZiIsImlzUmVxdWlyZWQiLCJzaGFwZSIsImJvb2wiLCJCQVNFX0RFU0NSSUJFX1VSTCIsImRpc3BsYXlVbmlxdWVzIiwidW5pcXVlcyIsImlzRW1wdHkiLCJkYXRhIiwiZm9udFNpemUiLCJqb2luIiwidSIsImNvdW50IiwiRGV0YWlscyIsImRlZXBEYXRhIiwib3V0bGllcnMiLCJsb2FkaW5nT3V0bGllcnMiLCJsb2FkRGV0YWlscyIsInJlbmRlclVuaXF1ZXMiLCJyZW5kZXJEZWVwRGF0YVRvZ2dsZSIsImxvYWRPdXRsaWVycyIsInJlbmRlck91dGxpZXJzIiwiZGV0YWlsRGF0YSIsImdldCIsImR0eXBlQ3QiLCJzaXplIiwiZHR5cGVVbmlxdWVzIiwib3V0bGllckRhdGEiLCJ0b2dnbGUiLCJvdXRsaWVyc0NhbGxiYWNrIiwibm9vcCIsImJ1aWxkQnV0dG9uIiwib3V0bGllclZhbHVlcyIsInNhdmVGaWx0ZXIiLCJxdWVyeUFwcGxpZWQiLCJ1cmwiLCJidWlsZFVSTFN0cmluZyIsInNhdmVDb2xGaWx0ZXJVcmwiLCJzdHJpbmdpZnkiLCJib3JkZXJCb3R0b20iLCJ3aWR0aCIsInNvcnRCeSIsIkNPVU5UX1NUQVRTIiwiUE9TSVRJT05fU1RBVFMiLCJMQUJFTFMiLCJ0b3RhbF9jb3VudCIsIm1pc3NpbmdfY3QiLCJtaXNzaW5nX3BjdCIsImZyZXEiLCJidWlsZFN0YXQiLCJ1bmRlZmluZWQiLCJEZXRhaWxzQm94cGxvdCIsImNyZWF0ZUJveHBsb3QiLCJidWlsZGVyIiwiY3R4IiwiZGVzY3JpYmUiLCJwaWNrQnkiLCJ2IiwiayIsIm1hcEtleXMiLCJfdiIsIm1hcFZhbHVlcyIsInBhcnNlRmxvYXQiLCJmb3JFYWNoIiwicCIsIm1lYW4iLCJjaGFydFV0aWxzIiwiY3JlYXRlQ2hhcnQiLCJsYWJlbHMiLCJkYXRhc2V0cyIsImJhY2tncm91bmRDb2xvciIsImJvcmRlckNvbG9yIiwiYm9yZGVyV2lkdGgiLCJyZXNwb25zaXZlIiwibGVnZW5kIiwiZGlzcGxheSIsInRvb2x0aXBzIiwiZW5hYmxlZCIsInNjYWxlcyIsInlBeGVzIiwidGlja3MiLCJtaW4iLCJtYXgiLCJjaGFydCIsImNoYXJ0V3JhcHBlciIsImRlc2NyaWJlS2V5cyIsImtleXMiLCJvbWl0IiwiY29uY2F0IiwiZHR5cGVDb3VudHMiLCJkdHlwZV9jb3VudHMiLCJzdGF0IiwiaGVpZ2h0IiwiRGV0YWlsc0NoYXJ0cyIsImNoYXJ0UGFyYW1zIiwidXBkYXRlU3RhdGUiLCJmaW5hbFBhcmFtcyIsImRldGFpbENvZGUiLCJkYXRhTG9hZGVyIiwiU29ydEluZGljYXRvciIsInNvcnREaXJlY3Rpb24iLCJkYXRhS2V5IiwidmVydGljYWxBbGlnbiIsImNsYXNzTmFtZSIsIm9uZU9mIiwic29ydER0eXBlcyIsIm9yZGVyQnkiLCJ0b0xvd2VyQ2FzZSIsImJ1aWxkU29ydER0eXBlc1N0YXRlIiwiZmluYWxTb3J0IiwiZmlsdGVyRHR5cGVzIiwiZmlsdGVyZWREdHlwZXMiLCJzdWJzdHJMb3dlciIsImZpbHRlciIsIkR0eXBlc0dyaWQiLCJhbGxWaXNpYmxlIiwibm9IaWRkZW4iLCJfaGVhZGVyUmVuZGVyZXIiLCJfcm93Q2xhc3MiLCJfbmV3UHJvcHMiLCJvbkNsaWNrIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsInRhcmdldCIsImluZGV4IiwidG9nZ2xlVmlzaWJpbGl0eSIsImN1cnJEdHlwZXMiLCJyb3dDbGljayIsInJvd0RhdGEiLCJST1dfSEVJR0hUIiwidGV4dEFsaWduIiwicGFkZGluZ0xlZnQiLCJwYWRkaW5nVG9wIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDK0Y7QUFDL0YsOEJBQThCLG1GQUEyQjtBQUN6RDtBQUNBLDhCQUE4QixRQUFTLDBDQUEwQyxrQkFBa0IsbUJBQW1CLHVCQUF1Qix3QkFBd0IsMEJBQTBCLDhDQUE4QyxLQUFLLHlCQUF5Qix3QkFBd0Isc0JBQXNCLEtBQUsseUNBQXlDLHFCQUFxQixzQkFBc0IsNEJBQTRCLHlCQUF5QixLQUFLLHNGQUFzRixzQkFBc0IsdUJBQXVCLEtBQUsscUNBQXFDLHdCQUF3QixnREFBZ0QsS0FBSyw4QkFBOEIsd0JBQXdCLHNCQUFzQixnREFBZ0QsS0FBSyxXQUFXLHNFQUFzRSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxXQUFXLE1BQU0sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLE1BQU0sTUFBTSxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxNQUFNLEtBQUssWUFBWSxXQUFXLFlBQVkseUZBQXlGLGtCQUFrQixtQkFBbUIsdUJBQXVCLHdCQUF3QiwwQkFBMEIsOENBQThDLEtBQUsseUJBQXlCLHdCQUF3QixzQkFBc0IsS0FBSyx5Q0FBeUMscUJBQXFCLHNCQUFzQiw0QkFBNEIseUJBQXlCLEtBQUssc0ZBQXNGLHNCQUFzQix1QkFBdUIsS0FBSyxxQ0FBcUMsd0JBQXdCLGdEQUFnRCxLQUFLLDhCQUE4Qix3QkFBd0Isc0JBQXNCLGdEQUFnRCxLQUFLLE9BQU87QUFDcGdFO0FBQ2Usc0ZBQXVCLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOdkM7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQUEsbUJBQU8sQ0FBQyw0Q0FBRCxDQUFQOztBQUVBLElBQU1DLFdBQVcsR0FBR0Msd0RBQUcsQ0FBQ0MsY0FBSixDQUFtQixVQUFuQixDQUFwQjtBQUNBLElBQU1DLFFBQVEsR0FBR0gsV0FBVyxHQUFHSSxJQUFJLENBQUNDLEtBQUwsQ0FBV0wsV0FBWCxDQUFILEdBQTZCLEVBQXpEO0FBRUEsSUFBSU0sUUFBUSxHQUFHQyxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JGLFFBQS9COztBQUNBLElBQUlDLE1BQU0sQ0FBQ0UsZUFBWCxFQUE0QjtBQUMxQkgsVUFBUSxHQUFHSSw2Q0FBQyxDQUFDQyxPQUFGLENBQVVMLFFBQVYsRUFBb0JDLE1BQU0sQ0FBQ0UsZUFBM0IsRUFBNEMsRUFBNUMsQ0FBWDtBQUNEOztBQUNELElBQUlDLDZDQUFDLENBQUNFLFVBQUYsQ0FBYU4sUUFBYixFQUF1QixjQUF2QixDQUFKLEVBQTRDO0FBQzFDUCxxQkFBTyxDQUFDLDZEQUFELENBQVA7O0FBRUEsTUFBSWMsUUFBUSxHQUFHLElBQWY7QUFDQSxNQUFNQyxNQUFNLEdBQUdiLHdEQUFHLENBQUNDLGNBQUosQ0FBbUIsU0FBbkIsQ0FBZjs7QUFDQSxNQUFNYSxTQUFTLEdBQUdMLDZDQUFDLENBQUNNLFFBQUYsQ0FBV0Msc0RBQU8sQ0FBQ0MsU0FBUixFQUFYLEVBQWdDO0FBQUVDLFdBQU8sRUFBRTtBQUFYLEdBQWhDLEVBQW1EaEIsUUFBUSxDQUFDaUIsS0FBVCxHQUFpQjtBQUFFQSxTQUFLLEVBQUVqQixRQUFRLENBQUNpQjtBQUFsQixHQUFqQixHQUE2QyxFQUFoRyxDQUFsQjs7QUFDQSxNQUFNQyxRQUFRLEdBQUdYLDZDQUFDLENBQUNZLEtBQUYsQ0FBUWhCLFFBQVIsRUFBa0IsR0FBbEIsQ0FBakI7O0FBQ0EsTUFBTWlCLFNBQVMsR0FBR0YsUUFBUSxDQUFDQSxRQUFRLENBQUNHLE1BQVQsR0FBa0IsQ0FBbkIsQ0FBUixLQUFrQyxZQUFsQyxHQUFpRCxZQUFqRCxHQUFnRUgsUUFBUSxDQUFDLENBQUQsQ0FBMUY7O0FBRUEsVUFBUUUsU0FBUjtBQUNFLFNBQUssUUFBTDtBQUNFVixjQUFRLGdCQUFHLDJEQUFDLDJEQUFELEVBQVk7QUFBRUMsY0FBTSxFQUFOQSxNQUFGO0FBQVVDLGlCQUFTLEVBQVRBO0FBQVYsT0FBWixDQUFYO0FBQ0E7O0FBQ0YsU0FBSyxjQUFMO0FBQ0VGLGNBQVEsZ0JBQUcsMkRBQUMsaUVBQUQsRUFBa0I7QUFBRUMsY0FBTSxFQUFOQSxNQUFGO0FBQVVDLGlCQUFTLEVBQVRBO0FBQVYsT0FBbEIsQ0FBWDtBQUNBOztBQUNGLFNBQUssVUFBTDtBQUNFRixjQUFRLGdCQUFHLDJEQUFDLG1FQUFELEVBQWM7QUFBRUMsY0FBTSxFQUFOQSxNQUFGO0FBQVVDLGlCQUFTLEVBQVRBO0FBQVYsT0FBZCxDQUFYO0FBQ0E7O0FBQ0YsU0FBSyxVQUFMO0FBQ0VGLGNBQVEsZ0JBQUcsMkRBQUMsbUVBQUQsRUFBYztBQUFFQyxjQUFNLEVBQU5BLE1BQUY7QUFBVUMsaUJBQVMsRUFBVEE7QUFBVixPQUFkLENBQVg7QUFDQTs7QUFDRixTQUFLLE9BQUw7QUFDRUYsY0FBUSxnQkFBRywyREFBQyw4RUFBRCxFQUFrQjtBQUFFQyxjQUFNLEVBQU5BLE1BQUY7QUFBVUMsaUJBQVMsRUFBVEE7QUFBVixPQUFsQixDQUFYO0FBQ0E7O0FBQ0YsU0FBSyxZQUFMO0FBQ0VGLGNBQVEsZ0JBQUcsMkRBQUMsOEVBQUQsRUFBZ0I7QUFBRUMsY0FBTSxFQUFOQSxNQUFGO0FBQVVDLGlCQUFTLEVBQVRBO0FBQVYsT0FBaEIsQ0FBWDtBQUNBOztBQUNGLFNBQUssaUJBQUw7QUFBd0I7QUFDdEIsWUFBTVUsWUFBWSxHQUFHO0FBQ25CQyxjQUFJLEVBQUUsaUJBRGE7QUFFbkJDLGdCQUFNLEVBQUUsU0FGVztBQUduQkMsYUFBRyxFQUFFO0FBQUVDLGVBQUcsRUFBRWQsU0FBUyxDQUFDZTtBQUFqQjtBQUhjLFNBQXJCO0FBS0FqQixnQkFBUSxnQkFBRywyREFBQyw4RUFBRCxFQUFrQjtBQUFFQyxnQkFBTSxFQUFOQSxNQUFGO0FBQVVDLG1CQUFTLEVBQVRBLFNBQVY7QUFBcUJVLHNCQUFZLEVBQVpBO0FBQXJCLFNBQWxCLENBQVg7QUFDQTtBQUNEOztBQUNELFNBQUssYUFBTDtBQUNFWixjQUFRLGdCQUFHLDJEQUFDLDZGQUFELEVBQXVCO0FBQUVDLGNBQU0sRUFBTkEsTUFBRjtBQUFVQyxpQkFBUyxFQUFUQTtBQUFWLE9BQXZCLENBQVg7QUFDQTs7QUFDRixTQUFLLFNBQUw7QUFDRUYsY0FBUSxnQkFBRywyREFBQyxxRUFBRCxFQUFhO0FBQUVDLGNBQU0sRUFBTkEsTUFBRjtBQUFVQyxpQkFBUyxFQUFUQTtBQUFWLE9BQWIsQ0FBWDtBQUNBOztBQUNGLFNBQUssaUJBQUw7QUFDRUYsY0FBUSxnQkFBRywyREFBQyxvRkFBRCxXQUFvQjtBQUFFQyxjQUFNLEVBQU5BLE1BQUY7QUFBVUMsaUJBQVMsRUFBVEE7QUFBVixPQUFwQjtBQUEyQyxjQUFNLEVBQUU7QUFBbkQsU0FBWDtBQUNBOztBQUNGLFNBQUssV0FBTDtBQUNFRixjQUFRLGdCQUFHLDJEQUFDLDBEQUFEO0FBQVcsY0FBTSxFQUFFQyxNQUFuQjtBQUEyQixjQUFNLEVBQUU7QUFBbkMsUUFBWDtBQUNBOztBQUNGLFNBQUssYUFBTDtBQUNFRCxjQUFRLGdCQUFHLDJEQUFDLDZEQUFEO0FBQVksY0FBTSxFQUFFQztBQUFwQixRQUFYO0FBQ0E7O0FBQ0YsU0FBSyxRQUFMO0FBQ0VELGNBQVEsZ0JBQUcsMkRBQUMsMkRBQUQ7QUFBUSxpQkFBUyxFQUFFO0FBQUVNLGlCQUFPLEVBQUU7QUFBWDtBQUFuQixRQUFYO0FBQ0E7O0FBQ0YsU0FBSyxRQUFMO0FBQ0E7QUFDRU4sY0FBUSxnQkFBRywyREFBQyxrRUFBRCxFQUFZO0FBQUVDLGNBQU0sRUFBTkEsTUFBRjtBQUFVQyxpQkFBUyxFQUFUQTtBQUFWLE9BQVosQ0FBWDtBQUNBO0FBakRKOztBQW1EQWdCLGtEQUFRLENBQUNDLE1BQVQsQ0FBZ0JuQixRQUFoQixFQUEwQm9CLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixlQUF4QixDQUExQjtBQUNELENBN0RELE1BNkRPLElBQUl4Qiw2Q0FBQyxDQUFDRSxVQUFGLENBQWFOLFFBQWIsRUFBdUIsbUJBQXZCLENBQUosRUFBaUQ7QUFDdERQLHFCQUFPLENBQUMsNkRBQUQsQ0FBUDs7QUFDQWtDLFVBQVEsQ0FBQ0MsY0FBVCxDQUF3QixZQUF4QixFQUFzQ0MsU0FBdEMsYUFBcUQ1QixNQUFNLENBQUM2QixNQUFQLENBQWNDLFVBQWQsQ0FBeUJDLEtBQTlFO0FBQ0FQLGtEQUFRLENBQUNDLE1BQVQsZUFBZ0IsMkRBQUMsMkRBQUQ7QUFBVyxRQUFJLEVBQUV6QixNQUFNLENBQUM2QixNQUFQLENBQWNDLFVBQWQsQ0FBeUJFO0FBQTFDLElBQWhCLEVBQW9FTixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsZUFBeEIsQ0FBcEU7QUFDRCxDQUpNLE1BSUE7QUFDTCxNQUFNTSxLQUFLLEdBQUdDLG9FQUFXLENBQUN4Qyx3REFBRyxDQUFDdUMsS0FBTCxDQUF6QjtBQUNBQSxPQUFLLENBQUNFLFFBQU4sQ0FBZXpCLHNEQUFPLENBQUMwQixJQUFSLEVBQWY7QUFDQVosa0RBQVEsQ0FBQ0MsTUFBVCxlQUNFLDJEQUFDLG9EQUFEO0FBQVUsU0FBSyxFQUFFUTtBQUFqQixrQkFDRSwyREFBQyw0REFBRDtBQUFZLFlBQVEsRUFBRXJDO0FBQXRCLElBREYsQ0FERixFQUlFOEIsUUFBUSxDQUFDQyxjQUFULENBQXdCLFNBQXhCLENBSkY7QUFNRCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVHRDtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTVSxnQkFBVCxDQUEwQkMsWUFBMUIsRUFBd0M7QUFDdEMsc0JBQ0U7QUFBSyxhQUFTLEVBQUM7QUFBZixrQkFDRTtBQUFLLGFBQVMsRUFBQztBQUFmLGtCQUNFO0FBQUssYUFBUyxFQUFDO0FBQWYsSUFERixFQUVHQSxZQUZILGVBR0U7QUFBSyxhQUFTLEVBQUM7QUFBZixJQUhGLENBREYsQ0FERjtBQVNEOztBQUVELFNBQVNDLFVBQVQsQ0FBb0JDLEtBQXBCLEVBQTJCO0FBQ3pCLFNBQU87QUFDTHJCLFFBQUksRUFBRSxTQUREO0FBRUxzQixRQUFJLEVBQUUsSUFGRDtBQUdMQyxPQUFHLEVBQUUsQ0FBQ0YsS0FBSyxDQUFDRSxHQUFOLElBQWEsR0FBZCxJQUFxQixFQUhyQjtBQUlMQyxjQUFVLEVBQUUsSUFKUDtBQUtMQyxjQUFVLEVBQUV6Qyw2Q0FBQyxDQUFDMEMsSUFBRixDQUFPQyx3REFBUCxFQUFzQjtBQUFFQyxXQUFLLEVBQUU7QUFBVCxLQUF0QixDQUxQO0FBTUxDLGVBQVcsRUFBRSxJQU5SO0FBT0xDLGVBQVcsRUFBRTlDLDZDQUFDLENBQUMwQyxJQUFGLENBQU9DLHdEQUFQLEVBQXNCO0FBQUVDLFdBQUssRUFBRTtBQUFULEtBQXRCO0FBUFIsR0FBUDtBQVNEOztJQUVLRyxlOzs7OztBQUNKLDJCQUFZVixLQUFaLEVBQW1CO0FBQUE7O0FBQUE7O0FBQ2pCLDhCQUFNQSxLQUFOO0FBQ0EsVUFBS1csS0FBTCxHQUFhWixVQUFVLENBQUNDLEtBQUQsQ0FBdkI7QUFDQSxVQUFLWSxVQUFMLEdBQWtCLE1BQUtBLFVBQUwsQ0FBZ0JDLElBQWhCLCtCQUFsQjtBQUNBLFVBQUtDLG9CQUFMLEdBQTRCLE1BQUtBLG9CQUFMLENBQTBCRCxJQUExQiwrQkFBNUI7QUFDQSxVQUFLRSxXQUFMLEdBQW1CLE1BQUtBLFdBQUwsQ0FBaUJGLElBQWpCLCtCQUFuQjtBQUNBLFVBQUtHLGFBQUwsR0FBcUIsTUFBS0EsYUFBTCxDQUFtQkgsSUFBbkIsK0JBQXJCO0FBQ0EsVUFBS0ksY0FBTCxHQUFzQixNQUFLQSxjQUFMLENBQW9CSixJQUFwQiwrQkFBdEI7QUFQaUI7QUFRbEI7Ozs7MENBRXFCSyxRLEVBQVVDLFEsRUFBVTtBQUN4QyxVQUFNbkIsS0FBSyxHQUFHLENBQUMsTUFBRCxFQUFTLE9BQVQsRUFBa0IsTUFBbEIsRUFBMEIsU0FBMUIsQ0FBZDs7QUFDQSxVQUFJLENBQUNyQyw2Q0FBQyxDQUFDeUQsT0FBRixDQUFVekQsNkNBQUMsQ0FBQzBELElBQUYsQ0FBTyxLQUFLckIsS0FBWixFQUFtQkEsS0FBbkIsQ0FBVixFQUFxQ3JDLDZDQUFDLENBQUMwRCxJQUFGLENBQU9ILFFBQVAsRUFBaUJsQixLQUFqQixDQUFyQyxDQUFMLEVBQW9FO0FBQ2xFLGVBQU8sSUFBUDtBQUNEOztBQUNELGFBQU8sQ0FBQ3JDLDZDQUFDLENBQUN5RCxPQUFGLENBQVUsS0FBS1QsS0FBZixFQUFzQlEsUUFBdEIsQ0FBUjtBQUNEOzs7dUNBRWtCRyxTLEVBQVc7QUFDNUIsVUFBSSxDQUFDM0QsNkNBQUMsQ0FBQ3lELE9BQUYsQ0FBVSxLQUFLcEIsS0FBTCxDQUFXdUIsT0FBckIsRUFBOEJELFNBQVMsQ0FBQ0MsT0FBeEMsQ0FBTCxFQUF1RDtBQUNyRCxhQUFLQyxRQUFMLENBQWN6QixVQUFVLENBQUMsS0FBS0MsS0FBTixDQUF4QjtBQUNEO0FBQ0Y7OzsyQ0FFc0I7QUFBQTs7QUFDckIsVUFBTXlCLE9BQU8sR0FBR0Msd0RBQUUsQ0FBQ0MsV0FBSCxDQUFlLEtBQUszQixLQUFMLENBQVc0QixLQUExQixDQUFoQjtBQUNBLFVBQU1DLE9BQU8sR0FBRyxDQUFDO0FBQUVDLGFBQUssRUFBRUMsaURBQU0sQ0FBQ0MsT0FBaEI7QUFBeUJ6QixhQUFLLEVBQUU7QUFBaEMsT0FBRCxDQUFoQjs7QUFDQSxVQUFJNUMsNkNBQUMsQ0FBQ3NFLFFBQUYsQ0FBVyxDQUFDLE9BQUQsRUFBVSxLQUFWLENBQVgsRUFBNkJSLE9BQTdCLENBQUosRUFBMkM7QUFDekNJLGVBQU8sQ0FBQ0ssSUFBUixDQUFhO0FBQUVKLGVBQUssRUFBRUMsaURBQU0sQ0FBQ0ksU0FBaEI7QUFBMkI1QixlQUFLLEVBQUU7QUFBbEMsU0FBYjtBQUNEOztBQUNELFVBQUlrQixPQUFPLEtBQUssT0FBaEIsRUFBeUI7QUFDdkJJLGVBQU8sQ0FBQ0ssSUFBUixDQUFhO0FBQUVKLGVBQUssRUFBRUMsaURBQU0sQ0FBQ0ssVUFBaEI7QUFBNEI3QixlQUFLLEVBQUU7QUFBbkMsU0FBYjtBQUNELE9BRkQsTUFFTztBQUNMc0IsZUFBTyxDQUFDSyxJQUFSLENBQWE7QUFBRUosZUFBSyxFQUFFQyxpREFBTSxDQUFDTSxZQUFoQjtBQUE4QjlCLGVBQUssRUFBRTtBQUFyQyxTQUFiO0FBQ0Q7O0FBQ0QsVUFBTStCLE1BQU0sR0FBRyxTQUFUQSxNQUFTLENBQUEvQixLQUFLO0FBQUEsZUFBSSxNQUFJLENBQUNpQixRQUFMLENBQWM7QUFBRTdDLGNBQUksRUFBRTRCO0FBQVIsU0FBZCxFQUErQixNQUFJLENBQUNLLFVBQXBDLENBQUo7QUFBQSxPQUFwQjs7QUFDQSwwQkFBTywyREFBQyxxREFBRDtBQUFjLGVBQU8sRUFBRWlCLE9BQXZCO0FBQWdDLGNBQU0sRUFBRVMsTUFBeEM7QUFBZ0Qsb0JBQVksRUFBRSxLQUFLM0IsS0FBTCxDQUFXaEM7QUFBekUsUUFBUDtBQUNEOzs7Z0NBRVc0RCxJLEVBQU07QUFBQTs7QUFDaEIsVUFBTUMsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixDQUFBN0IsS0FBSztBQUFBLGVBQUksTUFBSSxDQUFDYSxRQUFMLENBQWNiLEtBQWQsQ0FBSjtBQUFBLE9BQTVCOztBQUNBLDBCQUNFLDJEQUFDLHdEQUFELEVBQ007QUFDRjhCLFdBQUcsRUFBRSxNQURIO0FBRUZGLFlBQUksRUFBSkEsSUFGRTtBQUdGM0Isa0JBQVUsRUFBRSxLQUFLQSxVQUhmO0FBSUZnQixhQUFLLEVBQUUsS0FBSzVCLEtBQUwsQ0FBVzRCLEtBSmhCO0FBS0ZZLHNCQUFjLEVBQWRBLGNBTEU7QUFNRkUsb0JBQVksRUFBRSxLQUFLL0IsS0FBTCxDQUFXNEIsSUFBWDtBQU5aLE9BRE4sQ0FERjtBQVlEOzs7aUNBRVk7QUFDWCxXQUFLdkMsS0FBTCxDQUFXWSxVQUFYLENBQXNCLEtBQUtELEtBQTNCO0FBQ0Q7OztrQ0FFYTRCLEksRUFBTUksRyxFQUFLO0FBQUE7O0FBQ3ZCLFVBQU1DLFNBQVMsR0FBR2pGLDZDQUFDLENBQUNNLFFBQUYsQ0FBVyxFQUFYLEVBQWVOLDZDQUFDLENBQUMwRCxJQUFGLENBQU8sS0FBS1YsS0FBWixFQUFtQixDQUFDLFlBQUQsRUFBZSxZQUFmLENBQW5CLENBQWYsc0JBQW9FNEIsSUFBcEUsRUFBMkVJLEdBQTNFLEVBQWxCOztBQUNBLFdBQUtuQixRQUFMLENBQWNvQixTQUFkLEVBQXlCLFlBQU07QUFDN0IsWUFBSUEsU0FBUyxDQUFDekMsVUFBVixJQUF3QnlDLFNBQVMsQ0FBQ3hDLFVBQXRDLEVBQWtEO0FBQ2hELGdCQUFJLENBQUNRLFVBQUw7QUFDRDtBQUNGLE9BSkQ7QUFLRDs7O21DQUVjMkIsSSxFQUFNSSxHLEVBQUs7QUFBQTs7QUFDeEIsVUFBTUMsU0FBUyxHQUFHakYsNkNBQUMsQ0FBQ00sUUFBRixDQUFXLEVBQVgsRUFBZU4sNkNBQUMsQ0FBQzBELElBQUYsQ0FBTyxLQUFLVixLQUFaLEVBQW1CLENBQUMsYUFBRCxFQUFnQixhQUFoQixDQUFuQixDQUFmLHNCQUFzRTRCLElBQXRFLEVBQTZFSSxHQUE3RSxFQUFsQjs7QUFDQSxXQUFLbkIsUUFBTCxDQUFjb0IsU0FBZCxFQUF5QixZQUFNO0FBQzdCLFlBQUlBLFNBQVMsQ0FBQ3BDLFdBQVYsSUFBeUJvQyxTQUFTLENBQUNuQyxXQUF2QyxFQUFvRDtBQUNsRCxnQkFBSSxDQUFDRyxVQUFMO0FBQ0Q7QUFDRixPQUpEO0FBS0Q7Ozs2QkFFUTtBQUNQLFVBQUlqRCw2Q0FBQyxDQUFDa0YsTUFBRixDQUFTLEtBQUs3QyxLQUFMLENBQVdyQixJQUFwQixDQUFKLEVBQStCO0FBQzdCLGVBQU8sSUFBUDtBQUNEOztBQUhNLHdCQUlpQixLQUFLcUIsS0FKdEI7QUFBQSxVQUlDUixJQUpELGVBSUNBLElBSkQ7QUFBQSxVQUlPb0MsS0FKUCxlQUlPQSxLQUpQO0FBS1AsVUFBTUgsT0FBTyxHQUFHQyx3REFBRSxDQUFDQyxXQUFILENBQWVDLEtBQWYsQ0FBaEI7QUFDQSxVQUFJOUIsWUFBWSxHQUFHLElBQW5COztBQUNBLFVBQUksS0FBS2EsS0FBTCxDQUFXaEMsSUFBWCxLQUFvQixTQUF4QixFQUFtQztBQUNqQ21CLG9CQUFZLEdBQUcsSUFBZjtBQUNELE9BRkQsTUFFTyxJQUFJLFVBQVUyQixPQUFkLEVBQXVCO0FBQzVCO0FBQ0EsWUFBSSxLQUFLZCxLQUFMLENBQVdoQyxJQUFYLEtBQW9CLFdBQXhCLEVBQXFDO0FBQ25DbUIsc0JBQVksR0FBR0QsZ0JBQWdCLENBQUMsS0FBS2tCLFdBQUwsQ0FBaUIsTUFBakIsQ0FBRCxDQUEvQjtBQUNELFNBRkQsTUFFTztBQUNMakIsc0JBQVksR0FBR0QsZ0JBQWdCLENBQUMsQ0FDOUIsS0FBS2tCLFdBQUwsQ0FBaUIsS0FBakIsQ0FEOEIsZUFFOUIsMkRBQUMsc0RBQUQ7QUFBZSxlQUFHLEVBQUMsU0FBbkI7QUFBNkIseUJBQWEsRUFBRSxLQUFLQztBQUFqRCxhQUFvRSxLQUFLaEIsS0FBekUsRUFGOEIsQ0FBRCxDQUEvQjtBQUlEO0FBQ0YsT0FWTSxNQVVBLElBQUksWUFBWXlCLE9BQWhCLEVBQXlCO0FBQzlCO0FBQ0EsWUFBSSxLQUFLZCxLQUFMLENBQVdoQyxJQUFYLEtBQW9CLFdBQXhCLEVBQXFDO0FBQ25DbUIsc0JBQVksR0FBR0QsZ0JBQWdCLENBQUMsS0FBS2tCLFdBQUwsQ0FBaUIsTUFBakIsQ0FBRCxDQUEvQjtBQUNELFNBRkQsTUFFTztBQUNMakIsc0JBQVksR0FBR0QsZ0JBQWdCLENBQUMsQ0FDOUIsS0FBS2tCLFdBQUwsQ0FBaUIsS0FBakIsQ0FEOEIsZUFFOUIsMkRBQUMsdURBQUQ7QUFBZ0IsZUFBRyxFQUFDLFVBQXBCO0FBQStCLDBCQUFjLEVBQUUsS0FBS0U7QUFBcEQsYUFBd0UsS0FBS2pCLEtBQTdFLEVBRjhCLENBQUQsQ0FBL0I7QUFJRDtBQUNGLE9BVk0sTUFVQTtBQUNMO0FBQ0FGLG9CQUFZLEdBQUdELGdCQUFnQixDQUFDLENBQzlCLEtBQUtrQixXQUFMLENBQWlCLEtBQWpCLENBRDhCLGVBRTlCLDJEQUFDLHNEQUFEO0FBQWUsYUFBRyxFQUFDLFNBQW5CO0FBQTZCLHVCQUFhLEVBQUUsS0FBS0M7QUFBakQsV0FBb0UsS0FBS2hCLEtBQXpFLEVBRjhCLENBQUQsQ0FBL0I7QUFJRDs7QUFDRCwwQkFDRSwyREFBQyw0Q0FBRCxDQUFPLFFBQVAscUJBQ0U7QUFBSyxpQkFBUyxFQUFDO0FBQWYsc0JBQ0U7QUFBSyxpQkFBUyxFQUFDO0FBQWYsU0FBMEIsS0FBS2Msb0JBQUwsRUFBMUIsQ0FERixlQUVFO0FBQUssaUJBQVMsRUFBQztBQUFmLHNCQUNFLHdFQUFNZ0Msd0VBQXFCLENBQUN0RCxJQUFELEVBQU91QyxpREFBTSxDQUFDLEtBQUtwQixLQUFMLENBQVdoQyxJQUFaLENBQWIsQ0FBM0IsQ0FERixDQUZGLENBREYsRUFPR21CLFlBUEgsQ0FERjtBQVdEOzs7O0VBN0gyQmlELDRDQUFLLENBQUNDLFM7O0FBK0hwQ3RDLGVBQWUsQ0FBQ3VDLFdBQWhCLEdBQThCLGlCQUE5QjtBQUNBdkMsZUFBZSxDQUFDd0MsU0FBaEIsR0FBNEI7QUFDMUJuRSxhQUFXLEVBQUVvRSxpREFBUyxDQUFDQyxNQURHO0FBRTFCQyxNQUFJLEVBQUVGLGlEQUFTLENBQUNHLEtBRlU7QUFHMUIxQixPQUFLLEVBQUV1QixpREFBUyxDQUFDQyxNQUhTO0FBSTFCNUQsTUFBSSxFQUFFMkQsaURBQVMsQ0FBQ0MsTUFKVTtBQUsxQnpFLE1BQUksRUFBRXdFLGlEQUFTLENBQUNDLE1BTFU7QUFNMUJsRCxLQUFHLEVBQUVpRCxpREFBUyxDQUFDSSxNQU5XO0FBTzFCM0MsWUFBVSxFQUFFdUMsaURBQVMsQ0FBQ0ssSUFQSTtBQVExQmpDLFNBQU8sRUFBRTRCLGlEQUFTLENBQUNNO0FBUk8sQ0FBNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwS0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRU1DLFE7Ozs7O0FBQ0osb0JBQVkxRCxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7O0FBQ2pCLDhCQUFNQSxLQUFOO0FBQ0EsVUFBS1csS0FBTCxHQUFhO0FBQ1hnRCxtQkFBYSxFQUFFLElBREo7QUFFWEMsWUFBTSxFQUFFLElBRkc7QUFHWEMsa0JBQVksRUFBRSxJQUhIO0FBSVhDLGNBQVEsRUFBRTtBQUpDLEtBQWI7QUFGaUI7QUFRbEI7Ozs7d0NBRW1CO0FBQUE7O0FBQ2xCQyxnRUFBUyxDQUFDQyxvRUFBUyxDQUFDLEtBQUtoRSxLQUFMLENBQVdqQyxNQUFaLENBQVYsRUFBK0IsVUFBQWtHLFVBQVUsRUFBSTtBQUNwRCxZQUFNOUMsUUFBUSxHQUFHO0FBQ2YrQyxlQUFLLEVBQUUsSUFEUTtBQUVmUCx1QkFBYSxFQUFFO0FBRkEsU0FBakI7O0FBSUEsWUFBSU0sVUFBVSxDQUFDQyxLQUFmLEVBQXNCO0FBQ3BCLGdCQUFJLENBQUMxQyxRQUFMLENBQWM7QUFBRTBDLGlCQUFLLGVBQUUsMkRBQUMsOERBQUQsRUFBb0JELFVBQXBCO0FBQVQsV0FBZDs7QUFDQTtBQUNEOztBQUNEOUMsZ0JBQVEsQ0FBQ3lDLE1BQVQsR0FBa0JLLFVBQVUsQ0FBQ0wsTUFBN0I7O0FBQ0EsWUFBSUssVUFBVSxDQUFDTCxNQUFYLENBQWtCbkYsTUFBdEIsRUFBOEI7QUFDNUIsY0FBSTBGLFdBQVcsR0FBR3hHLDZDQUFDLENBQUMwQyxJQUFGLENBQU80RCxVQUFVLENBQUNMLE1BQWxCLEVBQTBCO0FBQzFDUSxnQkFBSSxFQUFFLE1BQUksQ0FBQ3BFLEtBQUwsQ0FBV2hDLFNBQVgsQ0FBcUJlO0FBRGUsV0FBMUIsQ0FBbEI7O0FBR0EsY0FBSXBCLDZDQUFDLENBQUMwRyxXQUFGLENBQWNGLFdBQWQsQ0FBSixFQUFnQztBQUM5QkEsdUJBQVcsR0FBR3hHLDZDQUFDLENBQUMyRyxJQUFGLENBQU9MLFVBQVUsQ0FBQ0wsTUFBbEIsQ0FBZDtBQUNEOztBQUNEekMsa0JBQVEsQ0FBQ3lDLE1BQVQsR0FBa0JqRyw2Q0FBQyxDQUFDNEcsR0FBRixDQUFNcEQsUUFBUSxDQUFDeUMsTUFBZixFQUF1QixVQUFBWSxDQUFDO0FBQUEsbUJBQUk3Ryw2Q0FBQyxDQUFDOEcsTUFBRixDQUFTRCxDQUFULEVBQVk7QUFBRVYsc0JBQVEsRUFBRVUsQ0FBQyxDQUFDSixJQUFGLElBQVVELFdBQVcsQ0FBQ0M7QUFBbEMsYUFBWixDQUFKO0FBQUEsV0FBeEIsQ0FBbEI7QUFDQWpELGtCQUFRLENBQUMyQyxRQUFULEdBQW9CSyxXQUFwQixDQVI0QixDQVFLO0FBQ2xDOztBQUNELGNBQUksQ0FBQzNDLFFBQUwsQ0FBY0wsUUFBZDtBQUNELE9BckJRLENBQVQ7QUFzQkQ7Ozs2QkFFUTtBQUFBOztBQUNQLFVBQUksS0FBS1IsS0FBTCxDQUFXdUQsS0FBZixFQUFzQjtBQUNwQiw0QkFDRTtBQUFLLGFBQUcsRUFBQyxNQUFUO0FBQWdCLG1CQUFTLEVBQUM7QUFBMUIsV0FDRyxLQUFLdkQsS0FBTCxDQUFXdUQsS0FEZCxDQURGO0FBS0Q7O0FBQ0QsVUFBTVEsSUFBSSxHQUFHLFNBQVBBLElBQU8sR0FBTTtBQUNqQixZQUFNQyxVQUFVLEdBQUdoSCw2Q0FBQyxDQUFDaUgsTUFBRixDQUFTLE1BQUksQ0FBQ0MsS0FBTCxDQUFXbEUsS0FBWCxDQUFpQmlELE1BQTFCLEVBQWtDLFVBQUNrQixHQUFELEVBQU1OLENBQU47QUFBQSxpQkFBWTdHLDZDQUFDLENBQUNNLFFBQUYsQ0FBVzZHLEdBQVgsc0JBQW1CTixDQUFDLENBQUNKLElBQXJCLEVBQTRCSSxDQUFDLENBQUNwRyxPQUE5QixFQUFaO0FBQUEsU0FBbEMsRUFBd0YsRUFBeEYsQ0FBbkI7O0FBQ0EsWUFBTTJHLFFBQVEsR0FBRyxTQUFYQSxRQUFXLEdBQU07QUFDckJ2SCxnQkFBTSxDQUFDNkIsTUFBUCxDQUFjNUIsUUFBZCxDQUF1QnVILE1BQXZCO0FBQ0F4SCxnQkFBTSxDQUFDeUgsS0FBUDtBQUNELFNBSEQ7O0FBSUFDLDRFQUFXLENBQUNDLGdCQUFaLENBQTZCLE1BQUksQ0FBQ25GLEtBQUwsQ0FBV2pDLE1BQXhDLEVBQWdENEcsVUFBaEQsRUFBNERJLFFBQTVEO0FBQ0QsT0FQRDs7QUFRQSxVQUFNdkMsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixDQUFBN0IsS0FBSztBQUFBLGVBQUksTUFBSSxDQUFDYSxRQUFMLENBQWNiLEtBQWQsQ0FBSjtBQUFBLE9BQTVCOztBQUNBLGFBQU8sY0FDTDtBQUFLLFdBQUcsRUFBQyxNQUFUO0FBQWdCLGlCQUFTLEVBQUM7QUFBMUIsc0JBQ0U7QUFBSyxpQkFBUyxFQUFDO0FBQWYsc0JBQ0U7QUFBSyxpQkFBUyxFQUFDO0FBQWYsc0JBQ0UsMkRBQUMsOERBQUQ7QUFBZ0IsbUJBQVcsRUFBRSxLQUFLQSxLQUFMLENBQVdnRDtBQUF4QyxzQkFDRSwyREFBQyxzREFBRDtBQUFZLFdBQUcsRUFBRSxhQUFBeUIsRUFBRTtBQUFBLGlCQUFLLE1BQUksQ0FBQ1AsS0FBTCxHQUFhTyxFQUFsQjtBQUFBLFNBQW5CO0FBQTBDLGNBQU0sRUFBRSxLQUFLekUsS0FBTCxDQUFXaUQsTUFBN0Q7QUFBcUUsc0JBQWMsRUFBRXBCO0FBQXJGLFFBREYsQ0FERixDQURGLGVBTUc7QUFBSyxpQkFBUyxFQUFDO0FBQWYsc0JBQ0MsMkRBQUMsZ0RBQUQ7QUFBUyxnQkFBUSxFQUFFLEtBQUs3QixLQUFMLENBQVdtRCxRQUE5QjtBQUF3QyxjQUFNLEVBQUUsS0FBSzlELEtBQUwsQ0FBV2pDLE1BQTNEO0FBQW1FLGNBQU0sRUFBRSxLQUFLNEMsS0FBTCxDQUFXaUQ7QUFBdEYsUUFERCxDQU5ILENBREYsQ0FESyxlQWFMO0FBQUssV0FBRyxFQUFDLFFBQVQ7QUFBa0IsaUJBQVMsRUFBQztBQUE1QixzQkFDRTtBQUFRLGlCQUFTLEVBQUMsaUJBQWxCO0FBQW9DLGVBQU8sRUFBRWM7QUFBN0Msc0JBQ0UsZ0ZBREYsQ0FERixlQUlFO0FBQVEsaUJBQVMsRUFBQyxpQkFBbEI7QUFBb0MsZUFBTyxFQUFHO0FBQUEsaUJBQU1sSCxNQUFNLENBQUNDLFFBQVAsQ0FBZ0I0SCxJQUFoQixHQUF1Qix5QkFBN0I7QUFBQTtBQUE5QyxzQkFDRSxrRkFERixDQUpGLENBYkssQ0FBUDtBQXNCRDs7OztFQTNFb0J0Qyw0Q0FBSyxDQUFDQyxTOztBQTZFN0JVLFFBQVEsQ0FBQ1QsV0FBVCxHQUF1QixVQUF2QjtBQUNBUyxRQUFRLENBQUNSLFNBQVQsR0FBcUI7QUFDbkJuRixRQUFNLEVBQUVvRixpREFBUyxDQUFDQyxNQUFWLENBQWlCa0MsVUFETjtBQUVuQnRILFdBQVMsRUFBRW1GLGlEQUFTLENBQUNvQyxLQUFWLENBQWdCO0FBQ3pCbkgsV0FBTyxFQUFFK0UsaURBQVMsQ0FBQ3FDLElBQVYsQ0FBZUYsVUFEQztBQUV6QnZHLGVBQVcsRUFBRW9FLGlEQUFTLENBQUNDO0FBRkUsR0FBaEI7QUFGUSxDQUFyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUZBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNcUMsaUJBQWlCLEdBQUcsaUJBQTFCOztBQUVBLFNBQVNDLGNBQVQsQ0FBd0JDLE9BQXhCLEVBQStDO0FBQUEsTUFBZC9ELEtBQWMsdUVBQU4sSUFBTTs7QUFDN0MsTUFBSWpFLDZDQUFDLENBQUNpSSxPQUFGLENBQVVELE9BQU8sQ0FBQ0UsSUFBbEIsQ0FBSixFQUE2QjtBQUMzQixXQUFPLElBQVA7QUFDRDs7QUFDRCxNQUFJdEcsS0FBSyxHQUFHLGVBQVo7O0FBQ0EsTUFBSXFDLEtBQUosRUFBVztBQUNUckMsU0FBSyxhQUFNQSxLQUFOLHVCQUF3QnFDLEtBQXhCLE1BQUw7QUFDRDs7QUFDRCxNQUFJK0QsT0FBTyxDQUFDekYsR0FBWixFQUFpQjtBQUNmWCxTQUFLLGFBQU1BLEtBQU4sMkJBQUw7QUFDRDs7QUFDRCxzQkFDRTtBQUFLLE9BQUcsRUFBRXFDLEtBQVY7QUFBaUIsYUFBUyxFQUFDO0FBQTNCLGtCQUNFO0FBQUssYUFBUyxFQUFDO0FBQWYsa0JBQ0U7QUFBTSxhQUFTLEVBQUMsa0JBQWhCO0FBQW1DLFNBQUssRUFBRTtBQUFFa0UsY0FBUSxFQUFFO0FBQVo7QUFBMUMsZUFDTXZHLEtBRE4sT0FERixlQUlFLHNFQUpGLGVBS0UseUVBQ0c1Qiw2Q0FBQyxDQUFDb0ksSUFBRixDQUNDcEksNkNBQUMsQ0FBQzRHLEdBQUYsQ0FBTW9CLE9BQU8sQ0FBQ0UsSUFBZCxFQUFvQixVQUFBRyxDQUFDO0FBQUEscUJBQU9BLENBQUMsQ0FBQ3pGLEtBQVQsZUFBbUJ5RixDQUFDLENBQUNDLEtBQXJCO0FBQUEsR0FBckIsQ0FERCxFQUVDLElBRkQsQ0FESCxDQUxGLENBREYsQ0FERjtBQWdCRDs7SUFFS0MsTzs7Ozs7QUFDSixtQkFBWWxHLEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7QUFDakIsOEJBQU1BLEtBQU47QUFDQSxVQUFLVyxLQUFMLEdBQWE7QUFDWHVELFdBQUssRUFBRSxJQURJO0FBRVgzQyxhQUFPLEVBQUUsSUFGRTtBQUdYNEUsY0FBUSxFQUFFLFNBSEM7QUFJWEMsY0FBUSxFQUFFLElBSkM7QUFLWEMscUJBQWUsRUFBRTtBQUxOLEtBQWI7QUFPQSxVQUFLQyxXQUFMLEdBQW1CLE1BQUtBLFdBQUwsQ0FBaUJ6RixJQUFqQiwrQkFBbkI7QUFDQSxVQUFLMEYsYUFBTCxHQUFxQixNQUFLQSxhQUFMLENBQW1CMUYsSUFBbkIsK0JBQXJCO0FBQ0EsVUFBSzJGLG9CQUFMLEdBQTRCLE1BQUtBLG9CQUFMLENBQTBCM0YsSUFBMUIsK0JBQTVCO0FBQ0EsVUFBSzRGLFlBQUwsR0FBb0IsTUFBS0EsWUFBTCxDQUFrQjVGLElBQWxCLCtCQUFwQjtBQUNBLFVBQUs2RixjQUFMLEdBQXNCLE1BQUtBLGNBQUwsQ0FBb0I3RixJQUFwQiwrQkFBdEI7QUFiaUI7QUFjbEI7Ozs7dUNBRWtCUyxTLEVBQVc7QUFDNUIsVUFBSSxDQUFDM0QsNkNBQUMsQ0FBQ3lELE9BQUYsQ0FBVSxLQUFLcEIsS0FBTCxDQUFXOEQsUUFBckIsRUFBK0J4QyxTQUFTLENBQUN3QyxRQUF6QyxDQUFMLEVBQXlEO0FBQ3ZELGFBQUt3QyxXQUFMO0FBQ0Q7QUFDRjs7O2tDQUVhO0FBQUE7O0FBQ1p2QyxnRUFBUyxXQUFJMEIsaUJBQUosY0FBeUIsS0FBS3pGLEtBQUwsQ0FBV2pDLE1BQXBDLGNBQThDLEtBQUtpQyxLQUFMLENBQVc4RCxRQUFYLENBQW9CTSxJQUFsRSxHQUEwRSxVQUFBdUMsVUFBVSxFQUFJO0FBQy9GLFlBQU14RixRQUFRLEdBQUc7QUFDZitDLGVBQUssRUFBRSxJQURRO0FBRWYzQyxpQkFBTyxFQUFFLElBRk07QUFHZi9CLGNBQUksRUFBRSxJQUhTO0FBSWY0RyxrQkFBUSxFQUFFLElBSks7QUFLZkQsa0JBQVEsRUFBRTtBQUxLLFNBQWpCOztBQU9BLFlBQUlRLFVBQVUsQ0FBQ3pDLEtBQWYsRUFBc0I7QUFDcEIvQyxrQkFBUSxDQUFDK0MsS0FBVCxnQkFDRTtBQUFLLHFCQUFTLEVBQUM7QUFBZiwwQkFDRSwyREFBQyw4REFBRCxFQUFvQnlDLFVBQXBCLENBREYsQ0FERjs7QUFLQSxnQkFBSSxDQUFDbkYsUUFBTCxDQUFjTCxRQUFkOztBQUNBO0FBQ0Q7O0FBQ0RBLGdCQUFRLENBQUNJLE9BQVQsR0FBbUI1RCw2Q0FBQyxDQUFDMEQsSUFBRixDQUFPc0YsVUFBUCxFQUFtQixDQUFDLFVBQUQsRUFBYSxTQUFiLEVBQXdCLGNBQXhCLENBQW5CLENBQW5CO0FBQ0F4RixnQkFBUSxDQUFDSSxPQUFULENBQWlCNkMsSUFBakIsR0FBd0IsTUFBSSxDQUFDcEUsS0FBTCxDQUFXOEQsUUFBWCxDQUFvQk0sSUFBNUM7QUFDQWpELGdCQUFRLENBQUNJLE9BQVQsQ0FBaUJLLEtBQWpCLEdBQXlCLE1BQUksQ0FBQzVCLEtBQUwsQ0FBVzhELFFBQVgsQ0FBb0JsQyxLQUE3QztBQUNBVCxnQkFBUSxDQUFDM0IsSUFBVCxHQUFnQm1ILFVBQVUsQ0FBQ25ILElBQTNCOztBQUNBLGNBQUksQ0FBQ2dDLFFBQUwsQ0FBY0wsUUFBZDtBQUNELE9BdEJRLENBQVQ7QUF1QkQ7OztvQ0FFZTtBQUNkLFVBQUksS0FBS1IsS0FBTCxDQUFXd0YsUUFBWCxJQUF1QixVQUEzQixFQUF1QztBQUNyQyxlQUFPLElBQVA7QUFDRDs7QUFFRCxVQUFNUixPQUFPLEdBQUdoSSw2Q0FBQyxDQUFDaUosR0FBRixDQUFNLEtBQUtqRyxLQUFYLEVBQWtCLGlCQUFsQixLQUF3QyxFQUF4RDs7QUFDQSxVQUFNa0csT0FBTyxHQUFHbEosNkNBQUMsQ0FBQ21KLElBQUYsQ0FBT25CLE9BQVAsQ0FBaEI7O0FBQ0EsYUFBT2hJLDZDQUFDLENBQUM0RyxHQUFGLENBQU1vQixPQUFOLEVBQWUsVUFBQ29CLFlBQUQsRUFBZW5GLEtBQWY7QUFBQSxlQUF5QjhELGNBQWMsQ0FBQ3FCLFlBQUQsRUFBZUYsT0FBTyxHQUFHLENBQVYsR0FBY2pGLEtBQWQsR0FBc0IsSUFBckMsQ0FBdkM7QUFBQSxPQUFmLENBQVA7QUFDRDs7O21DQUVjO0FBQUE7O0FBQ2IsV0FBS0osUUFBTCxDQUFjO0FBQUU2RSx1QkFBZSxFQUFFO0FBQW5CLE9BQWQ7QUFDQXRDLGdFQUFTLDJCQUFvQixLQUFLL0QsS0FBTCxDQUFXakMsTUFBL0IsY0FBeUMsS0FBS2lDLEtBQUwsQ0FBVzhELFFBQVgsQ0FBb0JNLElBQTdELEdBQXFFLFVBQUE0QyxXQUFXLEVBQUk7QUFDM0YsY0FBSSxDQUFDeEYsUUFBTCxDQUFjO0FBQUU0RSxrQkFBUSxFQUFFWSxXQUFaO0FBQXlCWCx5QkFBZSxFQUFFO0FBQTFDLFNBQWQ7QUFDRCxPQUZRLENBQVQ7QUFHRDs7OzJDQUVzQjtBQUFBOztBQUNyQixVQUFJMUksNkNBQUMsQ0FBQ3NFLFFBQUYsQ0FBVyxDQUFDLE9BQUQsRUFBVSxLQUFWLENBQVgsRUFBNkJQLHdEQUFFLENBQUNDLFdBQUgsQ0FBZSxLQUFLM0IsS0FBTCxDQUFXOEQsUUFBWCxDQUFvQmxDLEtBQW5DLENBQTdCLENBQUosRUFBNkU7QUFBQSwwQkFDM0IsS0FBS2pCLEtBRHNCO0FBQUEsWUFDbkV3RixRQURtRSxlQUNuRUEsUUFEbUU7QUFBQSxZQUN6REMsUUFEeUQsZUFDekRBLFFBRHlEO0FBQUEsWUFDL0NDLGVBRCtDLGVBQy9DQSxlQUQrQzs7QUFFM0UsWUFBTVksTUFBTSxHQUFHLFNBQVRBLE1BQVMsQ0FBQXRFLEdBQUc7QUFBQSxpQkFBSSxZQUFNO0FBQzFCLGdCQUFNdUUsZ0JBQWdCLEdBQUd2Siw2Q0FBQyxDQUFDa0YsTUFBRixDQUFTdUQsUUFBVCxLQUFzQixDQUFDQyxlQUF2QixHQUF5QyxNQUFJLENBQUNJLFlBQTlDLEdBQTZEOUksNkNBQUMsQ0FBQ3dKLElBQXhGOztBQUNBLGtCQUFJLENBQUMzRixRQUFMLENBQWM7QUFBRTJFLHNCQUFRLEVBQUV4RDtBQUFaLGFBQWQsRUFBaUN1RSxnQkFBakM7QUFDRCxXQUhpQjtBQUFBLFNBQWxCOztBQUlBLDRCQUNFO0FBQUssbUJBQVMsRUFBQztBQUFmLHdCQUNFO0FBQUssbUJBQVMsRUFBQztBQUFmLHdCQUNFO0FBQUssbUJBQVMsRUFBQztBQUFmLHdCQUNFLHFFQUFZRSxnRUFBVyxDQUFDakIsUUFBUSxJQUFJLFNBQWIsRUFBd0JjLE1BQU0sQ0FBQyxTQUFELENBQTlCLENBQXZCLFlBREYsZUFFRSxxRUFBWUcsZ0VBQVcsQ0FBQ2pCLFFBQVEsSUFBSSxVQUFiLEVBQXlCYyxNQUFNLENBQUMsVUFBRCxDQUEvQixDQUF2QixhQUZGLENBREYsQ0FERixDQURGO0FBVUQ7O0FBQ0QsYUFBTyxJQUFQO0FBQ0Q7OztxQ0FFZ0I7QUFBQTs7QUFDZixVQUFJLEtBQUt0RyxLQUFMLENBQVd3RixRQUFYLElBQXVCLFNBQTNCLEVBQXNDO0FBQ3BDLGVBQU8sSUFBUDtBQUNEOztBQUNELFVBQUksS0FBS3hGLEtBQUwsQ0FBVzBGLGVBQWYsRUFBZ0M7QUFDOUIsNEJBQU8sMkRBQUMsZ0RBQUQsT0FBUDtBQUNEOztBQU5jLFVBT1BELFFBUE8sR0FPTSxLQUFLekYsS0FQWCxDQU9QeUYsUUFQTzs7QUFRZixVQUFNaUIsYUFBYSxHQUFHMUosNkNBQUMsQ0FBQ2lKLEdBQUYsQ0FBTVIsUUFBTixFQUFnQixVQUFoQixFQUE0QixFQUE1QixDQUF0Qjs7QUFDQSxVQUFJekksNkNBQUMsQ0FBQ2lJLE9BQUYsQ0FBVXlCLGFBQVYsQ0FBSixFQUE4QjtBQUM1Qiw0QkFDRTtBQUFLLGFBQUcsRUFBRSxDQUFWO0FBQWEsbUJBQVMsRUFBQztBQUF2Qix3QkFDRTtBQUFLLG1CQUFTLEVBQUM7QUFBZix3QkFDRTtBQUFNLG1CQUFTLEVBQUMsa0JBQWhCO0FBQW1DLGVBQUssRUFBRTtBQUFFdkIsb0JBQVEsRUFBRTtBQUFaO0FBQTFDLGtDQURGLENBREYsQ0FERjtBQVNEOztBQUNELFVBQU13QixVQUFVLEdBQUcsU0FBYkEsVUFBYSxHQUFNO0FBQ3ZCLFlBQU16SSxHQUFHLEdBQUc7QUFBRUYsY0FBSSxFQUFFO0FBQVIsU0FBWjs7QUFDQSxZQUFJLENBQUN5SCxRQUFRLENBQUNtQixZQUFkLEVBQTRCO0FBQzFCMUksYUFBRyxDQUFDUixLQUFKLEdBQVkrSCxRQUFRLENBQUMvSCxLQUFyQjtBQUNEOztBQUNELFlBQU1tSixHQUFHLEdBQUdDLHlFQUFjLENBQUNDLDJFQUFnQixDQUFDLE1BQUksQ0FBQzFILEtBQUwsQ0FBV2pDLE1BQVosRUFBb0IsTUFBSSxDQUFDaUMsS0FBTCxDQUFXOEQsUUFBWCxDQUFvQk0sSUFBeEMsQ0FBakIsRUFBZ0U7QUFDeEZ2RixhQUFHLEVBQUV4QixJQUFJLENBQUNzSyxTQUFMLENBQWU5SSxHQUFmO0FBRG1GLFNBQWhFLENBQTFCOztBQUdBLGNBQUksQ0FBQzJDLFFBQUwsQ0FDRTtBQUNFNEUsa0JBQVEsRUFBRXpJLDZDQUFDLENBQUNNLFFBQUYsQ0FBVyxFQUFYLEVBQWVtSSxRQUFmLEVBQXlCO0FBQ2pDbUIsd0JBQVksRUFBRSxDQUFDbkIsUUFBUSxDQUFDbUI7QUFEUyxXQUF6QjtBQURaLFNBREYsRUFNRXhELDBEQUFTLENBQUN5RCxHQUFELEVBQU07QUFBQSxpQkFBTWhLLE1BQU0sQ0FBQzZCLE1BQVAsQ0FBYzVCLFFBQWQsQ0FBdUJ1SCxNQUF2QixFQUFOO0FBQUEsU0FBTixDQU5YO0FBUUQsT0FoQkQ7O0FBaUJBLGFBQU8sY0FDTDtBQUFLLFdBQUcsRUFBRSxDQUFWO0FBQWEsaUJBQVMsRUFBQztBQUF2QixzQkFDRTtBQUFLLGlCQUFTLEVBQUM7QUFBZixzQkFDRTtBQUFNLGlCQUFTLEVBQUMsa0JBQWhCO0FBQW1DLGFBQUssRUFBRTtBQUFFYyxrQkFBUSxFQUFFO0FBQVo7QUFBMUMsbUJBQ01uSSw2Q0FBQyxDQUFDbUosSUFBRixDQUFPTyxhQUFQLENBRE4sNEJBQzZDakIsUUFBUSxDQUFDbEcsR0FBVCxHQUFlLFlBQWYsR0FBOEIsRUFEM0UsT0FERixlQUlFLDJEQUFDLGtEQUFEO0FBQVUsZUFBTyxFQUFFb0gsVUFBbkI7QUFBK0IsaUJBQVMsRUFBQztBQUF6QyxzQkFDRTtBQUFNLGlCQUFTLEVBQUM7QUFBaEIsbUJBQTJCbEIsUUFBUSxDQUFDbUIsWUFBVCxHQUF3QixRQUF4QixHQUFtQyxPQUE5RCxzQkFERixlQUVFO0FBQU0saUJBQVMsRUFBQztBQUFoQixTQUFvQ25CLFFBQVEsQ0FBQy9ILEtBQTdDLENBRkYsQ0FKRixDQURGLGVBVUU7QUFBSyxpQkFBUyxFQUFDO0FBQWYsc0JBQ0U7QUFBSyxpQkFBUyxFQUFDLFdBQWY7QUFBMkIsYUFBSyxFQUFFO0FBQUV1SixzQkFBWSxFQUFFO0FBQWhCO0FBQWxDLHNCQUNFO0FBQUcsaUJBQVMsRUFBQztBQUFiLFFBREYsZUFFRSxxRkFGRixlQUdFO0FBQUssaUJBQVMsRUFBQyxvQkFBZjtBQUFvQyxhQUFLLEVBQUU7QUFBRUMsZUFBSyxFQUFFO0FBQVQ7QUFBM0Msc0JBQ0U7QUFBSyxpQkFBUyxFQUFDO0FBQWYsU0FBdUJ6QixRQUFRLENBQUM1RyxJQUFoQyxDQURGLENBSEYsQ0FERixDQVZGLENBREssZUFxQkw7QUFBSyxXQUFHLEVBQUUsQ0FBVjtBQUFhLGlCQUFTLEVBQUM7QUFBdkIsc0JBQ0U7QUFBSyxpQkFBUyxFQUFDO0FBQWYsc0JBQ0UseUVBQU83Qiw2Q0FBQyxDQUFDb0ksSUFBRixDQUFPcEksNkNBQUMsQ0FBQ21LLE1BQUYsQ0FBU1QsYUFBVCxDQUFQLEVBQWdDLElBQWhDLENBQVAsQ0FERixDQURGLENBckJLLENBQVA7QUEyQkQ7Ozs2QkFFUTtBQUNQLFVBQUksS0FBSzFHLEtBQUwsQ0FBV3VELEtBQWYsRUFBc0I7QUFDcEIsNEJBQ0U7QUFBSyxhQUFHLEVBQUUsQ0FBVjtBQUFhLG1CQUFTLEVBQUM7QUFBdkIsd0JBQ0U7QUFBSyxtQkFBUyxFQUFDO0FBQWYsV0FBNEIsS0FBS3ZELEtBQUwsQ0FBV3VELEtBQXZDLENBREYsQ0FERjtBQUtEOztBQVBNLHlCQVFtQixLQUFLdkQsS0FSeEI7QUFBQSxVQVFDWSxPQVJELGdCQVFDQSxPQVJEO0FBQUEsVUFRVS9CLElBUlYsZ0JBUVVBLElBUlY7O0FBU1AsVUFBSTdCLDZDQUFDLENBQUNpSSxPQUFGLENBQVVyRSxPQUFWLENBQUosRUFBd0I7QUFDdEIsZUFBTyxJQUFQO0FBQ0Q7O0FBWE0sd0JBWThCLEtBQUt2QixLQVpuQztBQUFBLFVBWUM0RCxNQVpELGVBWUNBLE1BWkQ7QUFBQSxVQVlTRSxRQVpULGVBWVNBLFFBWlQ7QUFBQSxVQVltQi9GLE1BWm5CLGVBWW1CQSxNQVpuQjtBQWFQLDBCQUNFLDJEQUFDLDRDQUFELENBQU8sUUFBUCxxQkFDRTtBQUFLLGlCQUFTLEVBQUM7QUFBZixzQkFDRTtBQUFLLGlCQUFTLEVBQUM7QUFBZixzQkFDRTtBQUFNLGlCQUFTLEVBQUMsdUJBQWhCO0FBQXdDLGFBQUssRUFBRTtBQUFFK0gsa0JBQVEsRUFBRTtBQUFaO0FBQS9DLFNBQ0d2RSxPQUFPLENBQUM2QyxJQURYLENBREYsZUFJRTtBQUFNLGlCQUFTLEVBQUM7QUFBaEIsY0FBeUI3QyxPQUFPLENBQUNLLEtBQWpDLE1BSkYsQ0FERixDQURGLGVBU0UsMkRBQUMsdURBQUQ7QUFDRSxlQUFPLEVBQUVMLE9BRFg7QUFFRSxrQkFBVSxFQUFFL0IsSUFGZDtBQUdFLGFBQUssRUFBRStCLE9BQU8sQ0FBQ0ssS0FIakI7QUFJRSxZQUFJLEVBQUVnQyxNQUpSO0FBS0UsV0FBRyxFQUFFRSxRQUFRLENBQUNNLElBTGhCO0FBTUUsY0FBTSxFQUFFckc7QUFOVixRQVRGLEVBaUJHLEtBQUt5SSxvQkFBTCxFQWpCSCxFQWtCRyxLQUFLRCxhQUFMLEVBbEJILEVBbUJHLEtBQUtHLGNBQUwsRUFuQkgsQ0FERjtBQXVCRDs7OztFQTdMbUIzRCw0Q0FBSyxDQUFDQyxTOztBQStMNUJrRCxPQUFPLENBQUNqRCxXQUFSLEdBQXNCLFNBQXRCO0FBQ0FpRCxPQUFPLENBQUNoRCxTQUFSLEdBQW9CO0FBQ2xCWSxVQUFRLEVBQUVYLGlEQUFTLENBQUNNLE1BREY7QUFFbEIxRixRQUFNLEVBQUVvRixpREFBUyxDQUFDQyxNQUZBO0FBR2xCUSxRQUFNLEVBQUVULGlEQUFTLENBQUNHO0FBSEEsQ0FBcEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1T0E7QUFDQTtBQUNBO0FBRUE7QUFFQSxJQUFNeUUsV0FBVyxHQUFHLENBQUMsT0FBRCxFQUFVLFlBQVYsRUFBd0IsYUFBeEIsQ0FBcEI7QUFDQSxJQUFNQyxjQUFjLEdBQUcsQ0FBQyxPQUFELEVBQVUsTUFBVixFQUFrQixLQUFsQixDQUF2QjtBQUNBLElBQU1DLE1BQU0sR0FBRztBQUNiQyxhQUFXLEVBQUUsWUFEQTtBQUViakMsT0FBSyxFQUFFLGlCQUZNO0FBR2JrQyxZQUFVLEVBQUUsaUJBSEM7QUFJYkMsYUFBVyxFQUFFLFdBSkE7QUFLYkMsTUFBSSxFQUFFO0FBTE8sQ0FBZjs7QUFRQSxTQUFTQyxTQUFULENBQW1CN0YsR0FBbkIsRUFBd0JsQyxLQUF4QixFQUErQjtBQUM3QixNQUFJQSxLQUFLLEtBQUtnSSxTQUFkLEVBQXlCO0FBQ3ZCLHdCQUNFLHFGQUNFO0FBQUksZUFBUyxFQUFDO0FBQWQsaUJBQWtDNUssNkNBQUMsQ0FBQ2lKLEdBQUYsQ0FBTXFCLE1BQU4sRUFBY3hGLEdBQWQsRUFBbUJBLEdBQW5CLENBQWxDLE9BREYsZUFFRTtBQUFNLGVBQVMsRUFBQztBQUFoQixPQUE0QmxDLEtBQTVCLENBRkYsQ0FERjtBQU1EOztBQUNELFNBQU8sSUFBUDtBQUNEOztJQUVLaUksYzs7Ozs7QUFDSiwwQkFBWXhJLEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7QUFDakIsOEJBQU1BLEtBQU47QUFDQSxVQUFLVyxLQUFMLEdBQWE7QUFBRXFCLGFBQU8sRUFBRTtBQUFYLEtBQWI7QUFDQSxVQUFLeUcsYUFBTCxHQUFxQixNQUFLQSxhQUFMLENBQW1CNUgsSUFBbkIsK0JBQXJCO0FBSGlCO0FBSWxCOzs7O3dDQUNtQjtBQUNsQixXQUFLNEgsYUFBTDtBQUNEOzs7MENBRXFCdkgsUSxFQUFVO0FBQzlCLGFBQU8sQ0FBQ3ZELDZDQUFDLENBQUN5RCxPQUFGLENBQVUsS0FBS3BCLEtBQUwsQ0FBV3VCLE9BQXJCLEVBQThCTCxRQUFRLENBQUNLLE9BQXZDLENBQVI7QUFDRDs7O3lDQUVvQjtBQUNuQixXQUFLa0gsYUFBTDtBQUNEOzs7b0NBRWU7QUFBQTs7QUFDZCxVQUFNQyxPQUFPLEdBQUcsU0FBVkEsT0FBVSxDQUFBQyxHQUFHLEVBQUk7QUFBQSxZQUNicEgsT0FEYSxHQUNELE1BQUksQ0FBQ3ZCLEtBREosQ0FDYnVCLE9BRGE7O0FBQUEsbUJBRU1BLE9BQU8sSUFBSSxFQUZqQjtBQUFBLFlBRWJxSCxRQUZhLFFBRWJBLFFBRmE7QUFBQSxZQUVIeEUsSUFGRyxRQUVIQSxJQUZHOztBQUdyQixZQUFNcEcsU0FBUyxHQUFHTCw2Q0FBQyxDQUFDaUwsUUFBUSxJQUFJLEVBQWIsQ0FBRCxDQUNmQyxNQURlLENBQ1IsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKO0FBQUEsaUJBQVVwTCw2Q0FBQyxDQUFDc0UsUUFBRixDQUFXLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxLQUFmLEVBQXNCLEtBQXRCLEVBQTZCLEtBQTdCLENBQVgsRUFBZ0Q4RyxDQUFoRCxLQUFzRCxDQUFDcEwsNkNBQUMsQ0FBQ3NFLFFBQUYsQ0FBVyxDQUFDLEtBQUQsRUFBUSxLQUFSLENBQVgsRUFBMkI2RyxDQUEzQixDQUFqRTtBQUFBLFNBRFEsRUFFZkUsT0FGZSxDQUVQLFVBQUNDLEVBQUQsRUFBS0YsQ0FBTDtBQUFBLGlCQUFXcEwsNkNBQUMsQ0FBQ2lKLEdBQUYsQ0FBTTtBQUFFLG1CQUFPLElBQVQ7QUFBZSxtQkFBTyxRQUF0QjtBQUFnQyxtQkFBTztBQUF2QyxXQUFOLEVBQXFEbUMsQ0FBckQsRUFBd0RBLENBQXhELENBQVg7QUFBQSxTQUZPLEVBR2ZHLFNBSGUsQ0FHTCxVQUFBSixDQUFDO0FBQUEsaUJBQUlLLFVBQVUsQ0FBQ3hMLDZDQUFDLENBQUNDLE9BQUYsQ0FBVWtMLENBQVYsRUFBYSxJQUFiLEVBQW1CLEVBQW5CLENBQUQsQ0FBZDtBQUFBLFNBSEksRUFJZnZJLEtBSmUsRUFBbEI7O0FBS0EsWUFBSTVDLDZDQUFDLENBQUNtSixJQUFGLENBQU85SSxTQUFQLEtBQXFCLENBQXpCLEVBQTRCO0FBQzFCLGlCQUFPLElBQVA7QUFDRDs7QUFDREwscURBQUMsQ0FBQ3lMLE9BQUYsQ0FBVSxDQUFDLEtBQUQsRUFBUSxLQUFSLENBQVYsRUFBMEIsVUFBQUMsQ0FBQyxFQUFJO0FBQzdCLGNBQUksQ0FBQzFMLDZDQUFDLENBQUMwRyxXQUFGLENBQWNyRyxTQUFTLENBQUNxTCxDQUFELENBQXZCLENBQUwsRUFBa0M7QUFDaENyTCxxQkFBUyxrQkFBV3FMLENBQVgsRUFBVCxHQUEyQnJMLFNBQVMsQ0FBQ3FMLENBQUQsQ0FBcEM7QUFDRDtBQUNGLFNBSkQ7O0FBS0EsWUFBSSxDQUFDMUwsNkNBQUMsQ0FBQzBHLFdBQUYsQ0FBY3VFLFFBQVEsQ0FBQ1UsSUFBdkIsQ0FBRCxJQUFpQyxDQUFDM0wsNkNBQUMsQ0FBQ3NFLFFBQUYsQ0FBVyxDQUFDLEtBQUQsRUFBUSxLQUFSLENBQVgsRUFBMkIyRyxRQUFRLENBQUNVLElBQXBDLENBQXRDLEVBQWlGO0FBQy9FdEwsbUJBQVMsQ0FBQ29JLFFBQVYsR0FBcUIsQ0FBQytDLFVBQVUsQ0FBQ3hMLDZDQUFDLENBQUNDLE9BQUYsQ0FBVWdMLFFBQVEsQ0FBQ1UsSUFBbkIsRUFBeUIsSUFBekIsRUFBK0IsRUFBL0IsQ0FBRCxDQUFYLENBQXJCO0FBQ0Q7O0FBQ0QsZUFBT0MsbURBQVUsQ0FBQ0MsV0FBWCxDQUF1QmIsR0FBdkIsRUFBNEI7QUFDakNoSyxjQUFJLEVBQUUsU0FEMkI7QUFFakNrSCxjQUFJLEVBQUU7QUFDSjRELGtCQUFNLEVBQUUsQ0FBQ3JGLElBQUQsQ0FESjtBQUVKc0Ysb0JBQVEsRUFBRSxDQUNSO0FBQ0U1SCxtQkFBSyxFQUFFc0MsSUFEVDtBQUVFdUYsNkJBQWUsRUFBRSx5QkFGbkI7QUFHRUMseUJBQVcsRUFBRSxtQkFIZjtBQUlFQyx5QkFBVyxFQUFFLENBSmY7QUFLRWhFLGtCQUFJLEVBQUUsQ0FBQzdILFNBQUQ7QUFMUixhQURRO0FBRk4sV0FGMkI7QUFjakM2RCxpQkFBTyxFQUFFO0FBQ1BpSSxzQkFBVSxFQUFFLElBREw7QUFFUEMsa0JBQU0sRUFBRTtBQUFFQyxxQkFBTyxFQUFFO0FBQVgsYUFGRDtBQUdQekssaUJBQUssRUFBRTtBQUFFeUsscUJBQU8sRUFBRTtBQUFYLGFBSEE7QUFJUEMsb0JBQVEsRUFBRTtBQUFFQyxxQkFBTyxFQUFFO0FBQVgsYUFKSDtBQUtQQyxrQkFBTSxFQUFFO0FBQ05DLG1CQUFLLEVBQUUsQ0FBQztBQUFFQyxxQkFBSyxFQUFFO0FBQUVDLHFCQUFHLEVBQUV0TSxTQUFTLENBQUNzTSxHQUFWLEdBQWdCLENBQXZCO0FBQTBCQyxxQkFBRyxFQUFFdk0sU0FBUyxDQUFDdU0sR0FBVixHQUFnQjtBQUEvQztBQUFULGVBQUQ7QUFERDtBQUxEO0FBZHdCLFNBQTVCLENBQVA7QUF3QkQsT0EzQ0Q7O0FBNENBLFVBQU1DLEtBQUssR0FBR2pCLG1EQUFVLENBQUNrQixZQUFYLENBQXdCLFNBQXhCLEVBQW1DLEtBQUs5SixLQUFMLENBQVdxQixPQUE5QyxFQUF1RDBHLE9BQXZELENBQWQ7QUFDQSxXQUFLbEgsUUFBTCxDQUFjO0FBQUVRLGVBQU8sRUFBRXdJO0FBQVgsT0FBZDtBQUNEOzs7NkJBRVE7QUFBQSxVQUNDakosT0FERCxHQUNhLEtBQUt2QixLQURsQixDQUNDdUIsT0FERDs7QUFFUCxVQUFNcUgsUUFBUSxHQUFHakwsNkNBQUMsQ0FBQ2lKLEdBQUYsQ0FBTXJGLE9BQU4sRUFBZSxVQUFmLEVBQTJCLEVBQTNCLENBQWpCOztBQUNBLFVBQU1tSixZQUFZLEdBQUcvTSw2Q0FBQyxDQUFDZ04sSUFBRixDQUFPaE4sNkNBQUMsQ0FBQ2lOLElBQUYsQ0FBT2hDLFFBQVAsRUFBaUJqTCw2Q0FBQyxDQUFDa04sTUFBRixDQUFTLENBQUMsYUFBRCxFQUFnQixNQUFoQixDQUFULEVBQWtDOUMsV0FBbEMsRUFBK0NDLGNBQS9DLENBQWpCLENBQVAsQ0FBckI7O0FBQ0EsVUFBSThDLFdBQVcsR0FBRyxJQUFsQjs7QUFDQSxVQUFJdkosT0FBTyxDQUFDd0osWUFBWixFQUEwQjtBQUN4QkQsbUJBQVcsZ0JBQ1Qsb0ZBQ0U7QUFBSSxtQkFBUyxFQUFDO0FBQWQsMEJBREYsZUFFRSx1RUFDR25OLDZDQUFDLENBQUM0RyxHQUFGLENBQU1oRCxPQUFPLENBQUN3SixZQUFkLEVBQTRCO0FBQUEsY0FBRzlFLEtBQUgsU0FBR0EsS0FBSDtBQUFBLGNBQVVyRSxLQUFWLFNBQVVBLEtBQVY7QUFBQSw4QkFDM0I7QUFBSSxlQUFHLEVBQUVBO0FBQVQsYUFDR0EsS0FESCxRQUNZcUUsS0FEWixDQUQyQjtBQUFBLFNBQTVCLENBREgsQ0FGRixDQURGO0FBWUQ7O0FBQ0QsMEJBQ0U7QUFBSyxpQkFBUyxFQUFDO0FBQWYsc0JBQ0U7QUFBSyxpQkFBUyxFQUFDO0FBQWYsc0JBQ0Usb0ZBQ0UsdUVBQ0dxQyxTQUFTLENBQUMsYUFBRCxFQUFnQk0sUUFBUSxDQUFDVixXQUF6QixDQURaLGVBRUUsdUVBQ0d2Syw2Q0FBQyxDQUFDNEcsR0FBRixDQUFNd0QsV0FBTixFQUFtQixVQUFBaUQsSUFBSTtBQUFBLDRCQUN0QjtBQUFJLGFBQUcsRUFBRUE7QUFBVCxXQUFnQjFDLFNBQVMsQ0FBQzBDLElBQUQsRUFBT3BDLFFBQVEsQ0FBQ29DLElBQUQsQ0FBZixDQUF6QixDQURzQjtBQUFBLE9BQXZCLENBREgsQ0FGRixDQURGLEVBU0dyTiw2Q0FBQyxDQUFDNEcsR0FBRixDQUFNeUQsY0FBTixFQUFzQixVQUFBZSxDQUFDO0FBQUEsZUFBSUgsUUFBUSxDQUFDRyxDQUFELENBQVIsS0FBZ0JSLFNBQWhCLGlCQUE2QjtBQUFJLGFBQUcsRUFBRVE7QUFBVCxXQUFhVCxTQUFTLENBQUNTLENBQUQsRUFBSUgsUUFBUSxDQUFDRyxDQUFELENBQVosQ0FBdEIsQ0FBakM7QUFBQSxPQUF2QixDQVRILEVBVUdILFFBQVEsQ0FBQ1AsSUFBVCxLQUFrQkUsU0FBbEIsaUJBQ0Msb0ZBQ0UsdUVBQUtELFNBQVMsQ0FBQyxNQUFELEVBQVNNLFFBQVEsQ0FBQ1AsSUFBbEIsQ0FBZCxDQURGLENBWEosRUFlRzFLLDZDQUFDLENBQUM0RyxHQUFGLENBQU1tRyxZQUFOLEVBQW9CLFVBQUEzQixDQUFDO0FBQUEsNEJBQ3BCO0FBQUksYUFBRyxFQUFFQTtBQUFULFdBQWFULFNBQVMsQ0FBQ1MsQ0FBRCxFQUFJSCxRQUFRLENBQUNHLENBQUQsQ0FBWixDQUF0QixDQURvQjtBQUFBLE9BQXJCLENBZkgsRUFrQkcrQixXQWxCSCxDQURGLENBREYsZUF1QkU7QUFBSyxpQkFBUyxFQUFDO0FBQWYsc0JBQ0U7QUFBSyxhQUFLLEVBQUU7QUFBRUcsZ0JBQU0sRUFBRTtBQUFWO0FBQVosc0JBQ0U7QUFBUSxVQUFFLEVBQUM7QUFBWCxRQURGLENBREYsQ0F2QkYsQ0FERjtBQStCRDs7OztFQXJIMEJsSSw0Q0FBSyxDQUFDQyxTOztBQXVIbkN3RixjQUFjLENBQUN2RixXQUFmLEdBQTZCLGdCQUE3QjtBQUNBdUYsY0FBYyxDQUFDdEYsU0FBZixHQUEyQjtBQUN6QjNCLFNBQU8sRUFBRTRCLGlEQUFTLENBQUNNO0FBRE0sQ0FBM0I7QUFJZStFLDZFQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4SkE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztJQUVNMEMsYTs7Ozs7QUFDSix5QkFBWWxMLEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7QUFDakIsOEJBQU1BLEtBQU47QUFDQSxVQUFLVyxLQUFMO0FBQ0U2SixXQUFLLEVBQUUsSUFEVDtBQUVFN0wsVUFBSSxFQUFFLFNBRlI7QUFHRXVGLFdBQUssRUFBRSxJQUhUO0FBSUVpSCxpQkFBVyxFQUFFO0FBSmYsT0FLS25MLEtBTEw7QUFPQSxVQUFLWSxVQUFMLEdBQWtCLE1BQUtBLFVBQUwsQ0FBZ0JDLElBQWhCLCtCQUFsQjtBQVRpQjtBQVVsQjs7Ozt3Q0FFbUI7QUFDbEIsV0FBS0QsVUFBTCxDQUFnQjtBQUFFakMsWUFBSSxFQUFFO0FBQVIsT0FBaEI7QUFDRDs7OzBDQUVxQnVDLFEsRUFBVUMsUSxFQUFVO0FBQ3hDLFVBQUksQ0FBQ3hELDZDQUFDLENBQUN5RCxPQUFGLENBQVUsS0FBS3BCLEtBQWYsRUFBc0JrQixRQUF0QixDQUFMLEVBQXNDO0FBQ3BDLGVBQU8sSUFBUDtBQUNEOztBQUNELFVBQU1rSyxXQUFXLEdBQUcsQ0FBQyxNQUFELEVBQVMsT0FBVCxFQUFrQixhQUFsQixFQUFpQyxPQUFqQyxDQUFwQjs7QUFDQSxVQUFJLENBQUN6Tiw2Q0FBQyxDQUFDeUQsT0FBRixDQUFVekQsNkNBQUMsQ0FBQzBELElBQUYsQ0FBTyxLQUFLVixLQUFaLEVBQW1CeUssV0FBbkIsQ0FBVixFQUEyQ3pOLDZDQUFDLENBQUMwRCxJQUFGLENBQU9GLFFBQVAsRUFBaUJpSyxXQUFqQixDQUEzQyxDQUFMLEVBQWdGO0FBQzlFLGVBQU8sSUFBUDtBQUNEOztBQUNELGFBQU8sS0FBUDtBQUNEOzs7dUNBRWtCOUosUyxFQUFXO0FBQUE7O0FBQzVCLFVBQUksQ0FBQzNELDZDQUFDLENBQUN5RCxPQUFGLENBQVUsS0FBS3BCLEtBQWYsRUFBc0JzQixTQUF0QixDQUFMLEVBQXVDO0FBQ3JDLGFBQUtFLFFBQUwsQ0FBYyxLQUFLeEIsS0FBbkIsRUFBMEI7QUFBQSxpQkFBTSxNQUFJLENBQUNZLFVBQUwsQ0FBZ0I7QUFBRWpDLGdCQUFJLEVBQUU7QUFBUixXQUFoQixDQUFOO0FBQUEsU0FBMUI7QUFDRDtBQUNGOzs7K0JBRVV3TSxXLEVBQWE7QUFBQTs7QUFDdEIsVUFBTUUsV0FBVyxHQUFHRixXQUFXLElBQUksS0FBS3hLLEtBQUwsQ0FBV3dLLFdBQTlDOztBQUNBLFVBQUlFLFdBQVcsQ0FBQzFNLElBQVosS0FBcUIsU0FBekIsRUFBb0M7QUFBQSwwQkFDRixLQUFLcUIsS0FESDtBQUFBLFlBQzFCdUIsT0FEMEIsZUFDMUJBLE9BRDBCO0FBQUEsWUFDakIrSixVQURpQixlQUNqQkEsVUFEaUI7QUFFbEMsYUFBSzlKLFFBQUwsQ0FBYztBQUNaZ0osZUFBSyxlQUFFLDJEQUFDLHVEQUFEO0FBQWdCLG1CQUFPLEVBQUVqSjtBQUF6QixZQURLO0FBRVovQixjQUFJLEVBQUU4TCxVQUZNO0FBR1pqTixlQUFLLEVBQUU7QUFISyxTQUFkO0FBS0QsT0FQRCxNQU9PO0FBQ0wsWUFBTW1FLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBQTdCLEtBQUs7QUFBQSxpQkFBSSxNQUFJLENBQUNhLFFBQUwsQ0FBY2IsS0FBZCxDQUFKO0FBQUEsU0FBNUI7O0FBQ0EsWUFBTVgsS0FBSyxHQUFHO0FBQ1poQyxtQkFBUyxFQUFFO0FBQUVlLHVCQUFXLEVBQUUsS0FBS2lCLEtBQUwsQ0FBV2xCO0FBQTFCLFdBREM7QUFFWm1NLGdCQUFNLEVBQUUsR0FGSTtBQUdabE4sZ0JBQU0sRUFBRSxLQUFLaUMsS0FBTCxDQUFXakM7QUFIUCxTQUFkO0FBS0F3Tix3RkFBVSxDQUFDdkwsS0FBRCxFQUFRLEtBQUtXLEtBQWIsRUFBb0I2QixjQUFwQixFQUFvQzZJLFdBQXBDLENBQVY7QUFDRDtBQUNGOzs7NkJBRVE7QUFBQSxVQUNDOUosT0FERCxHQUNhLEtBQUt2QixLQURsQixDQUNDdUIsT0FERDtBQUVQLDBCQUNFLDJEQUFDLDRDQUFELENBQU8sUUFBUCxxQkFDRTtBQUFLLGlCQUFTLEVBQUM7QUFBZixzQkFDRTtBQUFLLGlCQUFTLEVBQUM7QUFBZixzQkFDRSwyREFBQyxpRkFBRCxlQUNNNUQsNkNBQUMsQ0FBQzBELElBQUYsQ0FBTyxLQUFLVixLQUFaLEVBQW1CLENBQUMsTUFBRCxFQUFTLE1BQVQsRUFBaUIsT0FBakIsRUFBMEIsTUFBMUIsRUFBa0MsS0FBbEMsQ0FBbkIsQ0FETjtBQUVFLGlCQUFTLEVBQUUsS0FBS0EsS0FBTCxDQUFXaEMsSUFGeEI7QUFHRSxtQkFBVyxFQUFFLEtBQUtxQixLQUFMLENBQVdsQixHQUgxQjtBQUlFLGtCQUFVLEVBQUUsS0FBSzhCLFVBSm5CO0FBS0UsZUFBTyxFQUFFVztBQUxYLFNBREYsQ0FERixDQURGLEVBWUcsS0FBS1osS0FBTCxDQUFXNkosS0FaZCxDQURGO0FBZ0JEOzs7O0VBeEV5QnpILDRDQUFLLENBQUNDLFM7O0FBMEVsQ2tJLGFBQWEsQ0FBQ2pJLFdBQWQsR0FBNEIsZUFBNUI7QUFDQWlJLGFBQWEsQ0FBQ2hJLFNBQWQsR0FBMEI7QUFDeEIzQixTQUFPLEVBQUU0QixpREFBUyxDQUFDTSxNQURLO0FBRXhCNkgsWUFBVSxFQUFFbkksaURBQVMsQ0FBQ0MsTUFGRTtBQUd4QkMsTUFBSSxFQUFFRixpREFBUyxDQUFDRyxLQUhRO0FBSXhCMUIsT0FBSyxFQUFFdUIsaURBQVMsQ0FBQ0MsTUFKTztBQUt4QnRFLEtBQUcsRUFBRXFFLGlEQUFTLENBQUNDLE1BTFM7QUFNeEJyRixRQUFNLEVBQUVvRixpREFBUyxDQUFDQztBQU5NLENBQTFCO0FBU2U4SCw0RUFBZixFOzs7Ozs7Ozs7OztBQzVGQSxVQUFVLG1CQUFPLENBQUMseUpBQThFO0FBQ2hHLDBCQUEwQixtQkFBTyxDQUFDLCtQQUF1STs7QUFFeks7O0FBRUE7QUFDQSwwQkFBMEIsUUFBUztBQUNuQzs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOzs7QUFHQSxJQUFJLElBQVU7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNLCtQQUF1STtBQUM3STtBQUNBLGtCQUFrQixtQkFBTyxDQUFDLCtQQUF1STs7QUFFaks7O0FBRUE7QUFDQSw0QkFBNEIsUUFBUztBQUNyQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSxzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQWxPLG1CQUFPLENBQUMsaUVBQUQsQ0FBUDs7SUFFTXdPLGE7Ozs7Ozs7Ozs7Ozs7NkJBQ0s7QUFBQSx3QkFDb0MsS0FBS3hMLEtBRHpDO0FBQUEsVUFDQ3lMLGFBREQsZUFDQ0EsYUFERDtBQUFBLFVBQ2dCM0QsTUFEaEIsZUFDZ0JBLE1BRGhCO0FBQUEsVUFDd0I0RCxPQUR4QixlQUN3QkEsT0FEeEI7O0FBRVAsVUFBSTVELE1BQU0sS0FBSzRELE9BQVgsSUFBc0IvTiw2Q0FBQyxDQUFDa0YsTUFBRixDQUFTNEksYUFBVCxDQUExQixFQUFtRDtBQUNqRCw0QkFBTztBQUFLLGVBQUssRUFBRSxFQUFaO0FBQWdCLGdCQUFNLEVBQUUsRUFBeEI7QUFBNEIsZUFBSyxFQUFFO0FBQUVFLHlCQUFhLEVBQUU7QUFBakI7QUFBbkMsVUFBUDtBQUNEOztBQUNELFVBQU1DLFNBQVMsMERBQW1ESCxhQUFuRCxDQUFmO0FBQ0EsMEJBQ0U7QUFDRSxpQkFBUyx3REFBaURHLFNBQWpELENBRFg7QUFFRSxhQUFLLEVBQUUsRUFGVDtBQUdFLGNBQU0sRUFBRSxFQUhWO0FBSUUsZUFBTyxFQUFDLFdBSlY7QUFLRSxhQUFLLEVBQUU7QUFBRUQsdUJBQWEsRUFBRTtBQUFqQjtBQUxULFNBTUdGLGFBQWEsS0FBSyxLQUFsQixnQkFBMEI7QUFBTSxTQUFDLEVBQUM7QUFBUixRQUExQixnQkFBd0Q7QUFBTSxTQUFDLEVBQUM7QUFBUixRQU4zRCxlQU9FO0FBQU0sU0FBQyxFQUFDLGVBQVI7QUFBd0IsWUFBSSxFQUFDO0FBQTdCLFFBUEYsQ0FERjtBQVdEOzs7O0VBbEJ5QjFJLDRDQUFLLENBQUNDLFM7O0FBb0JsQ3dJLGFBQWEsQ0FBQ3RJLFNBQWQsR0FBMEI7QUFDeEJ1SSxlQUFhLEVBQUV0SSxpREFBUyxDQUFDMEksS0FBVixDQUFnQixDQUFDLEtBQUQsRUFBUSxNQUFSLEVBQWdCLE1BQWhCLENBQWhCLENBRFM7QUFFeEIvRCxRQUFNLEVBQUUzRSxpREFBUyxDQUFDQyxNQUZNO0FBR3hCc0ksU0FBTyxFQUFFdkksaURBQVMsQ0FBQ0M7QUFISyxDQUExQjs7QUFNQSxTQUFTMEksVUFBVCxDQUFvQmxJLE1BQXBCLEVBQTRCa0UsTUFBNUIsRUFBb0MyRCxhQUFwQyxFQUFtRDtBQUNqRCxTQUFPOU4sNkNBQUMsQ0FBQ29PLE9BQUYsQ0FBVW5JLE1BQVYsRUFBa0IsQ0FBQ2tFLE1BQUQsQ0FBbEIsRUFBNEIsQ0FBQzJELGFBQWEsQ0FBQ08sV0FBZCxFQUFELENBQTVCLENBQVA7QUFDRDs7QUFFRCxTQUFTQyxvQkFBVCxDQUE4QnRMLEtBQTlCLFFBQWdFO0FBQUEsTUFBekI4SyxhQUF5QixRQUF6QkEsYUFBeUI7QUFBQSxNQUFWM0QsTUFBVSxRQUFWQSxNQUFVO0FBQzlELE1BQUlvRSxTQUFTLEdBQUdULGFBQWhCOztBQUNBLE1BQUkzRCxNQUFNLElBQUluSCxLQUFLLENBQUNtSCxNQUFoQixJQUEwQm5ILEtBQUssQ0FBQzhLLGFBQU4sS0FBd0IsTUFBdEQsRUFBOEQ7QUFDNURTLGFBQVMsR0FBRyxNQUFaO0FBQ0Q7O0FBQ0QsTUFBSUEsU0FBUyxLQUFLLE1BQWxCLEVBQTBCO0FBQ3hCLFdBQU87QUFDTHRJLFlBQU0sRUFBRWtJLFVBQVUsQ0FBQ25MLEtBQUssQ0FBQ2lELE1BQVAsRUFBZSxPQUFmLEVBQXdCLEtBQXhCLENBRGI7QUFFTDZILG1CQUFhLEVBQUVTLFNBRlY7QUFHTHBFLFlBQU0sRUFBTkE7QUFISyxLQUFQO0FBS0Q7O0FBQ0QsU0FBTztBQUNMbEUsVUFBTSxFQUFFa0ksVUFBVSxDQUFDbkwsS0FBSyxDQUFDaUQsTUFBUCxFQUFla0UsTUFBZixFQUF1QjJELGFBQXZCLENBRGI7QUFFTEEsaUJBQWEsRUFBRVMsU0FGVjtBQUdMcEUsVUFBTSxFQUFOQTtBQUhLLEdBQVA7QUFLRDs7QUFFRCxTQUFTcUUsWUFBVCxRQUF1RTtBQUFBLE1BQS9DdkksTUFBK0MsU0FBL0NBLE1BQStDO0FBQUEsTUFBdkNDLFlBQXVDLFNBQXZDQSxZQUF1QztBQUFBLE1BQXpCNEgsYUFBeUIsU0FBekJBLGFBQXlCO0FBQUEsTUFBVjNELE1BQVUsU0FBVkEsTUFBVTtBQUNyRSxNQUFJc0UsY0FBYyxHQUFHeEksTUFBckI7O0FBQ0EsTUFBSUMsWUFBSixFQUFrQjtBQUNoQixRQUFNd0ksV0FBVyxHQUFHeEksWUFBWSxDQUFDbUksV0FBYixFQUFwQjtBQUNBSSxrQkFBYyxHQUFHek8sNkNBQUMsQ0FBQzJPLE1BQUYsQ0FBUzFJLE1BQVQsRUFBaUI7QUFBQSxVQUFHUSxJQUFILFNBQUdBLElBQUg7QUFBQSxhQUFjekcsNkNBQUMsQ0FBQ3NFLFFBQUYsQ0FBV21DLElBQUksQ0FBQzRILFdBQUwsRUFBWCxFQUErQkssV0FBL0IsQ0FBZDtBQUFBLEtBQWpCLENBQWpCO0FBQ0Q7O0FBQ0QsU0FBT1AsVUFBVSxDQUFDTSxjQUFELEVBQWlCdEUsTUFBakIsRUFBeUIyRCxhQUF6QixDQUFqQjtBQUNEOztJQUVLYyxVOzs7OztBQUNKLHNCQUFZdk0sS0FBWixFQUFtQjtBQUFBOztBQUFBOztBQUNqQiwrQkFBTUEsS0FBTjtBQUNBLFVBQUtXLEtBQUwsR0FBYTtBQUNYaUQsWUFBTSxFQUFFNUQsS0FBSyxDQUFDNEQsTUFESDtBQUVYQyxrQkFBWSxFQUFFLElBRkg7QUFHWGlFLFlBQU0sRUFBRSxJQUhHO0FBSVgyRCxtQkFBYSxFQUFFLE1BSko7QUFLWGUsZ0JBQVUsRUFBRTlLLHdEQUFFLENBQUMrSyxRQUFILENBQVl6TSxLQUFLLENBQUM0RCxNQUFsQjtBQUxELEtBQWI7QUFPQSxVQUFLOEksZUFBTCxHQUF1QixNQUFLQSxlQUFMLENBQXFCN0wsSUFBckIsK0JBQXZCO0FBQ0EsVUFBSzhMLFNBQUwsR0FBaUIsTUFBS0EsU0FBTCxDQUFlOUwsSUFBZiwrQkFBakI7QUFWaUI7QUFXbEI7Ozs7MENBRXFCK0wsUyxFQUFXekwsUSxFQUFVO0FBQ3pDLGFBQU8sQ0FBQ3hELDZDQUFDLENBQUN5RCxPQUFGLENBQVUsS0FBS1QsS0FBZixFQUFzQlEsUUFBdEIsQ0FBUjtBQUNEOzs7MkNBRTBEO0FBQUE7O0FBQUEsVUFBekN1SyxPQUF5QyxTQUF6Q0EsT0FBeUM7QUFBQSxVQUFoQzVKLEtBQWdDLFNBQWhDQSxLQUFnQztBQUFBLFVBQXpCZ0csTUFBeUIsU0FBekJBLE1BQXlCO0FBQUEsVUFBakIyRCxhQUFpQixTQUFqQkEsYUFBaUI7O0FBQ3pELFVBQUlDLE9BQU8sS0FBSyxTQUFoQixFQUEyQjtBQUFBLFlBQ2pCYyxVQURpQixHQUNGLEtBQUs3TCxLQURILENBQ2pCNkwsVUFEaUI7O0FBRXpCLFlBQU1LLE9BQU8sR0FBRyxTQUFWQSxPQUFVLENBQUFDLENBQUMsRUFBSTtBQUNuQixnQkFBSSxDQUFDdEwsUUFBTCxDQUFjO0FBQ1pvQyxrQkFBTSxFQUFFakcsNkNBQUMsQ0FBQzRHLEdBQUYsQ0FBTSxNQUFJLENBQUM1RCxLQUFMLENBQVdpRCxNQUFqQixFQUF5QixVQUFBWSxDQUFDO0FBQUEscUJBQUk3Ryw2Q0FBQyxDQUFDOEcsTUFBRixDQUFTLEVBQVQsRUFBYUQsQ0FBYixFQUFnQjtBQUFFcEcsdUJBQU8sRUFBRSxDQUFDb087QUFBWixlQUFoQixDQUFKO0FBQUEsYUFBMUIsQ0FESTtBQUVaQSxzQkFBVSxFQUFFLENBQUNBO0FBRkQsV0FBZDs7QUFJQU0sV0FBQyxDQUFDQyxlQUFGO0FBQ0QsU0FORDs7QUFPQSw0QkFDRTtBQUFLLG1CQUFTLEVBQUMsb0JBQWY7QUFBb0MsaUJBQU8sRUFBRUY7QUFBN0MsV0FDRy9LLEtBREgsZUFFRTtBQUFHLG1CQUFTLHlCQUFrQjBLLFVBQVUsR0FBRyxFQUFILEdBQVEsZ0JBQXBDLENBQVo7QUFBb0UsaUJBQU8sRUFBRUs7QUFBN0UsVUFGRixDQURGO0FBTUQ7O0FBQ0QsVUFBSS9NLFlBQVksR0FBRyxJQUFuQjs7QUFDQSxVQUFJNEwsT0FBTyxLQUFLLE1BQWhCLEVBQXdCO0FBQ3RCLFlBQU1ZLE1BQU0sR0FBRyxTQUFUQSxNQUFTLENBQUFRLENBQUM7QUFBQSxpQkFBSSxNQUFJLENBQUN0TCxRQUFMLENBQWM7QUFBRXFDLHdCQUFZLEVBQUVpSixDQUFDLENBQUNFLE1BQUYsQ0FBU3pNO0FBQXpCLFdBQWQsQ0FBSjtBQUFBLFNBQWhCOztBQUNBLFlBQU1zTSxRQUFPLEdBQUcsU0FBVkEsUUFBVSxDQUFBQyxDQUFDO0FBQUEsaUJBQUlBLENBQUMsQ0FBQ0MsZUFBRixFQUFKO0FBQUEsU0FBakI7O0FBQ0FqTixvQkFBWSxnQkFDVjtBQUFLLG1CQUFTLEVBQUMsS0FBZjtBQUFxQixpQkFBTyxFQUFFK007QUFBOUIsd0JBQ0U7QUFDRSxjQUFJLEVBQUMsTUFEUDtBQUVFLGlCQUFPLEVBQUVBLFFBRlg7QUFHRSxtQkFBUyxFQUFDLE9BSFo7QUFJRSxlQUFLLEVBQUUsS0FBS2xNLEtBQUwsQ0FBV2tELFlBQVgsSUFBMkIsRUFKcEM7QUFLRSxrQkFBUSxFQUFFeUk7QUFMWixVQURGLENBREY7QUFXRDs7QUFDRCwwQkFDRTtBQUFLLFdBQUcsRUFBRSxDQUFWO0FBQWEsaUJBQVMsRUFBQztBQUF2QixzQkFDRTtBQUFLLGlCQUFTLEVBQUM7QUFBZixzQkFDRTtBQUFLLGlCQUFTLEVBQUM7QUFBZixTQUNHeEssS0FESCxlQUVFLDJEQUFDLGFBQUQsRUFBbUI7QUFBRTRKLGVBQU8sRUFBUEEsT0FBRjtBQUFXNUQsY0FBTSxFQUFOQSxNQUFYO0FBQW1CMkQscUJBQWEsRUFBYkE7QUFBbkIsT0FBbkIsQ0FGRixDQURGLEVBS0czTCxZQUxILENBREYsQ0FERjtBQVdEOzs7cUNBRW9CO0FBQUEsVUFBVG1OLEtBQVMsU0FBVEEsS0FBUzs7QUFDbkIsVUFBSXRQLDZDQUFDLENBQUNpSixHQUFGLENBQU0sS0FBS2pHLEtBQUwsQ0FBV2lELE1BQWpCLEVBQXlCLENBQUNxSixLQUFELEVBQVEsVUFBUixDQUF6QixFQUE4QyxLQUE5QyxDQUFKLEVBQTBEO0FBQ3hELGVBQU8sb0JBQVA7QUFDRDs7QUFDRCxhQUFPLFdBQVA7QUFDRDs7OzZCQUVRO0FBQUE7O0FBQ1AsVUFBSSxDQUFDdFAsNkNBQUMsQ0FBQ2lJLE9BQUYsQ0FBVSxLQUFLakYsS0FBTCxDQUFXdUQsS0FBckIsQ0FBTCxFQUFrQztBQUNoQyxlQUFPLEtBQUt2RCxLQUFMLENBQVd1RCxLQUFsQjtBQUNEOztBQUhNLHdCQUkyQixLQUFLdkQsS0FKaEM7QUFBQSxVQUlDbUgsTUFKRCxlQUlDQSxNQUpEO0FBQUEsVUFJUzJELGFBSlQsZUFJU0EsYUFKVDs7QUFLUCxVQUFNeUIsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQjtBQUFBLFlBQUc5SSxJQUFILFNBQUdBLElBQUg7QUFBQSxZQUFTaEcsT0FBVCxTQUFTQSxPQUFUO0FBQUEsZUFBdUIsVUFBQTBPLENBQUMsRUFBSTtBQUNuRCxnQkFBSSxDQUFDdEwsUUFBTCxDQUFjO0FBQ1pvQyxrQkFBTSxFQUFFakcsNkNBQUMsQ0FBQzRHLEdBQUYsQ0FBTSxNQUFJLENBQUM1RCxLQUFMLENBQVdpRCxNQUFqQixFQUF5QixVQUFBWSxDQUFDLEVBQUk7QUFDcEMsa0JBQUlBLENBQUMsQ0FBQ0osSUFBRixLQUFXQSxJQUFmLEVBQXFCO0FBQ25CLHVCQUFPekcsNkNBQUMsQ0FBQzhHLE1BQUYsQ0FBUyxFQUFULEVBQWFELENBQWIsRUFBZ0I7QUFBRXBHLHlCQUFPLEVBQUUsQ0FBQ0E7QUFBWixpQkFBaEIsQ0FBUDtBQUNEOztBQUNELHFCQUFPb0csQ0FBUDtBQUNELGFBTE87QUFESSxXQUFkOztBQVFBc0ksV0FBQyxDQUFDQyxlQUFGO0FBQ0QsU0FWd0I7QUFBQSxPQUF6Qjs7QUFXQSxVQUFNSSxVQUFVLEdBQUdoQixZQUFZLENBQUMsS0FBS3hMLEtBQU4sQ0FBL0I7O0FBQ0EsVUFBTXlNLFFBQVEsR0FBRyxTQUFYQSxRQUFXO0FBQUEsWUFBR0MsT0FBSCxTQUFHQSxPQUFIO0FBQUEsZUFDZixNQUFJLENBQUM3TCxRQUFMLENBQ0U7QUFDRW9DLGdCQUFNLEVBQUVqRyw2Q0FBQyxDQUFDNEcsR0FBRixDQUFNLE1BQUksQ0FBQzVELEtBQUwsQ0FBV2lELE1BQWpCLEVBQXlCLFVBQUFZLENBQUM7QUFBQSxtQkFBSTdHLDZDQUFDLENBQUM4RyxNQUFGLENBQVMsRUFBVCxFQUFhRCxDQUFiLEVBQWdCO0FBQUVWLHNCQUFRLEVBQUVVLENBQUMsQ0FBQ0osSUFBRixLQUFXaUosT0FBTyxDQUFDako7QUFBL0IsYUFBaEIsQ0FBSjtBQUFBLFdBQTFCO0FBRFYsU0FERixFQUlFO0FBQUEsaUJBQU0sTUFBSSxDQUFDcEUsS0FBTCxDQUFXd0MsY0FBWCxDQUEwQjtBQUFFc0Isb0JBQVEsRUFBRXVKO0FBQVosV0FBMUIsQ0FBTjtBQUFBLFNBSkYsQ0FEZTtBQUFBLE9BQWpCOztBQU9BLDBCQUNFLDJEQUFDLGdGQUFELFFBQ0c7QUFBQSxZQUFHcEMsTUFBSCxTQUFHQSxNQUFIO0FBQUEsWUFBV3BELEtBQVgsU0FBV0EsS0FBWDtBQUFBLDRCQUNDLDJEQUFDLGtGQUFEO0FBQ0Usc0JBQVksRUFBRSxFQURoQjtBQUVFLGdCQUFNLEVBQUVvRCxNQUFNLEdBQUcsR0FBVCxHQUFlLEdBQWYsR0FBcUJBLE1BRi9CO0FBR0UsMEJBQWdCLEVBQUUsRUFIcEI7QUFJRSxrQkFBUSxFQUFFO0FBQUVqQixtQkFBTyxFQUFFO0FBQVgsV0FKWjtBQUtFLG1CQUFTLEVBQUV0SSx3REFBRSxDQUFDNEwsVUFMaEI7QUFNRSxtQkFBUyxFQUFFO0FBQUEsZ0JBQUdMLEtBQUgsU0FBR0EsS0FBSDtBQUFBLG1CQUFlRSxVQUFVLENBQUNGLEtBQUQsQ0FBekI7QUFBQSxXQU5iO0FBT0Usa0JBQVEsRUFBRXRQLDZDQUFDLENBQUNtSixJQUFGLENBQU9xRyxVQUFQLENBUFo7QUFRRSxzQkFBWSxFQUFFLE1BQUksQ0FBQ1IsU0FSckI7QUFTRSxjQUFJLEVBQUUsY0FBQWhNLEtBQUs7QUFBQSxtQkFBSSxNQUFJLENBQUNhLFFBQUwsQ0FBY3lLLG9CQUFvQixDQUFDLE1BQUksQ0FBQ3RMLEtBQU4sRUFBYUEsS0FBYixDQUFsQyxDQUFKO0FBQUEsV0FUYjtBQVVFLGdCQUFNLEVBQUVtSCxNQVZWO0FBV0UsdUJBQWEsRUFBRTJELGFBQWEsS0FBSyxNQUFsQixHQUEyQixJQUEzQixHQUFrQ0EsYUFYbkQ7QUFZRSxlQUFLLEVBQUU1RCxLQVpUO0FBYUUsb0JBQVUsRUFBRXVGLFFBYmQ7QUFjRSxtQkFBUyxFQUFDO0FBZFosd0JBZUUsMkRBQUMsbUZBQUQ7QUFDRSxpQkFBTyxFQUFDLE9BRFY7QUFFRSxlQUFLLEVBQUMsR0FGUjtBQUdFLHdCQUFjLEVBQUUsTUFBSSxDQUFDVixlQUh2QjtBQUlFLGVBQUssRUFBRSxFQUpUO0FBS0UsZUFBSyxFQUFFO0FBQUVhLHFCQUFTLEVBQUU7QUFBYixXQUxUO0FBTUUsbUJBQVMsRUFBQztBQU5aLFVBZkYsZUF1QkUsMkRBQUMsbUZBQUQ7QUFDRSxpQkFBTyxFQUFDLFNBRFY7QUFFRSxlQUFLLEVBQUMsU0FGUjtBQUdFLHdCQUFjLEVBQUUsTUFBSSxDQUFDYixlQUh2QjtBQUlFLGVBQUssRUFBRSxFQUpUO0FBS0UsZUFBSyxFQUFFO0FBQUVhLHFCQUFTLEVBQUUsTUFBYjtBQUFxQkMsdUJBQVcsRUFBRTtBQUFsQyxXQUxUO0FBTUUsbUJBQVMsRUFBQyxNQU5aO0FBT0Usc0JBQVksRUFBRTtBQUFBLGdCQUFHSCxPQUFILFVBQUdBLE9BQUg7QUFBQSxnQ0FDWjtBQUFLLHFCQUFPLEVBQUVILGdCQUFnQixDQUFDRyxPQUFELENBQTlCO0FBQXlDLHVCQUFTLEVBQUM7QUFBbkQsNEJBQ0U7QUFBRyx1QkFBUyx5QkFBa0JBLE9BQU8sQ0FBQ2pQLE9BQVIsR0FBa0IsRUFBbEIsR0FBdUIsZ0JBQXpDO0FBQVosY0FERixDQURZO0FBQUE7QUFQaEIsVUF2QkYsZUFvQ0UsMkRBQUMsbUZBQUQ7QUFDRSxpQkFBTyxFQUFDLE1BRFY7QUFFRSxlQUFLLEVBQUMsYUFGUjtBQUdFLHdCQUFjLEVBQUUsTUFBSSxDQUFDc08sZUFIdkI7QUFJRSxlQUFLLEVBQUUsR0FKVDtBQUtFLGtCQUFRLEVBQUUsQ0FMWjtBQU1FLGVBQUssRUFBRTtBQUFFYSxxQkFBUyxFQUFFLE1BQWI7QUFBcUJDLHVCQUFXLEVBQUU7QUFBbEMsV0FOVDtBQU9FLG1CQUFTLEVBQUM7QUFQWixVQXBDRixlQTZDRywyREFBQyxtRkFBRDtBQUNDLGVBQUssRUFBRSxHQURSO0FBRUMsaUJBQU8sRUFBQyxPQUZUO0FBR0MsZUFBSyxFQUFDLFdBSFA7QUFJQyx3QkFBYyxFQUFFLE1BQUksQ0FBQ2QsZUFKdEI7QUFLQyxlQUFLLEVBQUU7QUFDTGEscUJBQVMsRUFBRSxPQUROO0FBRUxDLHVCQUFXLEVBQUUsTUFGUjtBQUdMQyxzQkFBVSxFQUFFLE9BSFA7QUFJTDNILG9CQUFRLEVBQUU7QUFKTCxXQUxSO0FBV0MsbUJBQVMsRUFBQztBQVhYLFVBN0NILENBREQ7QUFBQSxPQURILENBREY7QUFpRUQ7Ozs7RUFoS3NCL0MsNENBQUssQ0FBQ0MsUzs7QUFrSy9CdUosVUFBVSxDQUFDdEosV0FBWCxHQUF5QixZQUF6QjtBQUNBc0osVUFBVSxDQUFDckosU0FBWCxHQUF1QjtBQUNyQlUsUUFBTSxFQUFFVCxpREFBUyxDQUFDRyxLQURHO0FBRXJCZCxnQkFBYyxFQUFFVyxpREFBUyxDQUFDSztBQUZMLENBQXZCIiwiZmlsZSI6Im1haW4uZDVjOWVjNGZmMjM1NDdlM2I2YzYuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyh0cnVlKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi5kdHlwZXMgLmNlbGwsXFxyXFxuLmR0eXBlcyAuaGVhZGVyQ2VsbCB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIGRpc3BsYXk6IGluaGVyaXQ7XFxyXFxuICBib3JkZXItd2lkdGg6IDFweDtcXHJcXG4gIGJvcmRlci1zdHlsZTogc29saWQ7XFxyXFxuICBib3JkZXItY29sb3I6IHJnYmEoMTcwLCAxNzAsIDE3MCwgMC4yNSk7XFxyXFxufVxcclxcbi5kdHlwZXMgLmhlYWRlckNlbGwge1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcbi5kdHlwZXMgLmhlYWRlckNlbGwuZmlsdGVyYWJsZSAucm93IHtcXHJcXG4gIG1hcmdpbi1sZWZ0OiAwO1xcclxcbiAgbWFyZ2luLXJpZ2h0OiAwO1xcclxcbiAgcGFkZGluZy1ib3R0b206IDAuNWVtO1xcclxcbiAgcGFkZGluZy10b3A6IDAuNWVtO1xcclxcbn1cXHJcXG4uZHR5cGVzIC5oZWFkZXJDZWxsLmZpbHRlcmFibGUgLmNvbCxcXHJcXG4uZHR5cGVzIC5oZWFkZXJDZWxsLmZpbHRlcmFibGUgLmNvbC1hdXRvIHtcXHJcXG4gIHBhZGRpbmctbGVmdDogMDtcXHJcXG4gIHBhZGRpbmctcmlnaHQ6IDA7XFxyXFxufVxcclxcblxcclxcbi5kdHlwZXMgLmR0eXBlLXJvdy1zZWxlY3RlZCB7XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoODIsIDE4NywgMjM5LCAwLjIpO1xcclxcbn1cXHJcXG4uZHR5cGVzIC5kdHlwZS1yb3c6aG92ZXIge1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDgyLCAxODcsIDIzOSwgMC4yKTtcXHJcXG59XFxyXFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiRHR5cGVzR3JpZC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7O0VBRUUsV0FBVztFQUNYLFlBQVk7RUFDWixnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQix1Q0FBdUM7QUFDekM7QUFDQTtFQUNFLGlCQUFpQjtFQUNqQixlQUFlO0FBQ2pCO0FBQ0E7RUFDRSxjQUFjO0VBQ2QsZUFBZTtFQUNmLHFCQUFxQjtFQUNyQixrQkFBa0I7QUFDcEI7QUFDQTs7RUFFRSxlQUFlO0VBQ2YsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLHlDQUF5QztBQUMzQztBQUNBO0VBQ0UsaUJBQWlCO0VBQ2pCLGVBQWU7RUFDZix5Q0FBeUM7QUFDM0NcIixcImZpbGVcIjpcIkR0eXBlc0dyaWQuY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5kdHlwZXMgLmNlbGwsXFxyXFxuLmR0eXBlcyAuaGVhZGVyQ2VsbCB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIGRpc3BsYXk6IGluaGVyaXQ7XFxyXFxuICBib3JkZXItd2lkdGg6IDFweDtcXHJcXG4gIGJvcmRlci1zdHlsZTogc29saWQ7XFxyXFxuICBib3JkZXItY29sb3I6IHJnYmEoMTcwLCAxNzAsIDE3MCwgMC4yNSk7XFxyXFxufVxcclxcbi5kdHlwZXMgLmhlYWRlckNlbGwge1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcbi5kdHlwZXMgLmhlYWRlckNlbGwuZmlsdGVyYWJsZSAucm93IHtcXHJcXG4gIG1hcmdpbi1sZWZ0OiAwO1xcclxcbiAgbWFyZ2luLXJpZ2h0OiAwO1xcclxcbiAgcGFkZGluZy1ib3R0b206IDAuNWVtO1xcclxcbiAgcGFkZGluZy10b3A6IDAuNWVtO1xcclxcbn1cXHJcXG4uZHR5cGVzIC5oZWFkZXJDZWxsLmZpbHRlcmFibGUgLmNvbCxcXHJcXG4uZHR5cGVzIC5oZWFkZXJDZWxsLmZpbHRlcmFibGUgLmNvbC1hdXRvIHtcXHJcXG4gIHBhZGRpbmctbGVmdDogMDtcXHJcXG4gIHBhZGRpbmctcmlnaHQ6IDA7XFxyXFxufVxcclxcblxcclxcbi5kdHlwZXMgLmR0eXBlLXJvdy1zZWxlY3RlZCB7XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoODIsIDE4NywgMjM5LCAwLjIpO1xcclxcbn1cXHJcXG4uZHR5cGVzIC5kdHlwZS1yb3c6aG92ZXIge1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDgyLCAxODcsIDIzOSwgMC4yKTtcXHJcXG59XFxyXFxuXCJdfV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcclxuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcclxuXHJcbmltcG9ydCBhY3Rpb25zIGZyb20gXCIuL2FjdGlvbnMvZHRhbGVcIjtcclxuaW1wb3J0IFwiLi9hZGFwdGVyLWZvci1yZWFjdC0xNlwiO1xyXG5pbXBvcnQgeyBEYXRhVmlld2VyIH0gZnJvbSBcIi4vZHRhbGUvRGF0YVZpZXdlclwiO1xyXG5pbXBvcnQgeyBDb2RlRXhwb3J0IH0gZnJvbSBcIi4vcG9wdXBzL0NvZGVFeHBvcnRcIjtcclxuaW1wb3J0IHsgQ29kZVBvcHVwIH0gZnJvbSBcIi4vcG9wdXBzL0NvZGVQb3B1cFwiO1xyXG5pbXBvcnQgeyBDb3JyZWxhdGlvbnMgfSBmcm9tIFwiLi9wb3B1cHMvQ29ycmVsYXRpb25zXCI7XHJcbmltcG9ydCB7IFJlYWN0RmlsdGVyIGFzIEZpbHRlciB9IGZyb20gXCIuL3BvcHVwcy9GaWx0ZXJcIjtcclxuaW1wb3J0IEluc3RhbmNlcyBmcm9tIFwiLi9wb3B1cHMvSW5zdGFuY2VzXCI7XHJcbmltcG9ydCB7IFJlYWN0VXBsb2FkIGFzIFVwbG9hZCB9IGZyb20gXCIuL3BvcHVwcy9VcGxvYWRcIjtcclxuaW1wb3J0IHsgUmVhY3RDb2x1bW5BbmFseXNpcyBhcyBDb2x1bW5BbmFseXNpcyB9IGZyb20gXCIuL3BvcHVwcy9hbmFseXNpcy9Db2x1bW5BbmFseXNpc1wiO1xyXG5pbXBvcnQgeyBSZWFjdENoYXJ0cyBhcyBDaGFydHMgfSBmcm9tIFwiLi9wb3B1cHMvY2hhcnRzL0NoYXJ0c1wiO1xyXG5pbXBvcnQgeyBSZWFjdENyZWF0ZUNvbHVtbiBhcyBDcmVhdGVDb2x1bW4gfSBmcm9tIFwiLi9wb3B1cHMvY3JlYXRlL0NyZWF0ZUNvbHVtblwiO1xyXG5pbXBvcnQgeyBEZXNjcmliZSB9IGZyb20gXCIuL3BvcHVwcy9kZXNjcmliZS9EZXNjcmliZVwiO1xyXG5pbXBvcnQgeyBSZWFjdER1cGxpY2F0ZXMgYXMgRHVwbGljYXRlcyB9IGZyb20gXCIuL3BvcHVwcy9kdXBsaWNhdGVzL0R1cGxpY2F0ZXNcIjtcclxuaW1wb3J0IHsgUmVhY3RDcmVhdGVSZXBsYWNlbWVudCBhcyBDcmVhdGVSZXBsYWNlbWVudCB9IGZyb20gXCIuL3BvcHVwcy9yZXBsYWNlbWVudC9DcmVhdGVSZXBsYWNlbWVudFwiO1xyXG5pbXBvcnQgeyBSZWFjdFJlc2hhcGUgYXMgUmVzaGFwZSB9IGZyb20gXCIuL3BvcHVwcy9yZXNoYXBlL1Jlc2hhcGVcIjtcclxuaW1wb3J0IHsgVmFyaWFuY2UgfSBmcm9tIFwiLi9wb3B1cHMvdmFyaWFuY2UvVmFyaWFuY2VcIjtcclxuaW1wb3J0IGFwcCBmcm9tIFwiLi9yZWR1Y2Vycy9kdGFsZVwiO1xyXG5pbXBvcnQgeyBjcmVhdGVTdG9yZSB9IGZyb20gXCIuL3JlZHVjZXJzL3N0b3JlXCI7XHJcblxyXG5yZXF1aXJlKFwiLi9wdWJsaWNQYXRoXCIpO1xyXG5cclxuY29uc3Qgc2V0dGluZ3NWYWwgPSBhcHAuZ2V0SGlkZGVuVmFsdWUoXCJzZXR0aW5nc1wiKTtcclxuY29uc3Qgc2V0dGluZ3MgPSBzZXR0aW5nc1ZhbCA/IEpTT04ucGFyc2Uoc2V0dGluZ3NWYWwpIDoge307XHJcblxyXG5sZXQgcGF0aG5hbWUgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XHJcbmlmICh3aW5kb3cucmVzb3VyY2VCYXNlVXJsKSB7XHJcbiAgcGF0aG5hbWUgPSBfLnJlcGxhY2UocGF0aG5hbWUsIHdpbmRvdy5yZXNvdXJjZUJhc2VVcmwsIFwiXCIpO1xyXG59XHJcbmlmIChfLnN0YXJ0c1dpdGgocGF0aG5hbWUsIFwiL2R0YWxlL3BvcHVwXCIpKSB7XHJcbiAgcmVxdWlyZShcIi4vZHRhbGUvRGF0YVZpZXdlci5jc3NcIik7XHJcblxyXG4gIGxldCByb290Tm9kZSA9IG51bGw7XHJcbiAgY29uc3QgZGF0YUlkID0gYXBwLmdldEhpZGRlblZhbHVlKFwiZGF0YV9pZFwiKTtcclxuICBjb25zdCBjaGFydERhdGEgPSBfLmFzc2lnbkluKGFjdGlvbnMuZ2V0UGFyYW1zKCksIHsgdmlzaWJsZTogdHJ1ZSB9LCBzZXR0aW5ncy5xdWVyeSA/IHsgcXVlcnk6IHNldHRpbmdzLnF1ZXJ5IH0gOiB7fSk7XHJcbiAgY29uc3QgcGF0aFNlZ3MgPSBfLnNwbGl0KHBhdGhuYW1lLCBcIi9cIik7XHJcbiAgY29uc3QgcG9wdXBUeXBlID0gcGF0aFNlZ3NbcGF0aFNlZ3MubGVuZ3RoIC0gMV0gPT09IFwiY29kZS1wb3B1cFwiID8gXCJjb2RlLXBvcHVwXCIgOiBwYXRoU2Vnc1szXTtcclxuXHJcbiAgc3dpdGNoIChwb3B1cFR5cGUpIHtcclxuICAgIGNhc2UgXCJmaWx0ZXJcIjpcclxuICAgICAgcm9vdE5vZGUgPSA8RmlsdGVyIHsuLi57IGRhdGFJZCwgY2hhcnREYXRhIH19IC8+O1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJjb3JyZWxhdGlvbnNcIjpcclxuICAgICAgcm9vdE5vZGUgPSA8Q29ycmVsYXRpb25zIHsuLi57IGRhdGFJZCwgY2hhcnREYXRhIH19IC8+O1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJkZXNjcmliZVwiOlxyXG4gICAgICByb290Tm9kZSA9IDxEZXNjcmliZSB7Li4ueyBkYXRhSWQsIGNoYXJ0RGF0YSB9fSAvPjtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwidmFyaWFuY2VcIjpcclxuICAgICAgcm9vdE5vZGUgPSA8VmFyaWFuY2Ugey4uLnsgZGF0YUlkLCBjaGFydERhdGEgfX0gLz47XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcImJ1aWxkXCI6XHJcbiAgICAgIHJvb3ROb2RlID0gPENyZWF0ZUNvbHVtbiB7Li4ueyBkYXRhSWQsIGNoYXJ0RGF0YSB9fSAvPjtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwiZHVwbGljYXRlc1wiOlxyXG4gICAgICByb290Tm9kZSA9IDxEdXBsaWNhdGVzIHsuLi57IGRhdGFJZCwgY2hhcnREYXRhIH19IC8+O1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJ0eXBlLWNvbnZlcnNpb25cIjoge1xyXG4gICAgICBjb25zdCBwcmVQb3B1bGF0ZWQgPSB7XHJcbiAgICAgICAgdHlwZTogXCJ0eXBlX2NvbnZlcnNpb25cIixcclxuICAgICAgICBzYXZlQXM6IFwiaW5wbGFjZVwiLFxyXG4gICAgICAgIGNmZzogeyBjb2w6IGNoYXJ0RGF0YS5zZWxlY3RlZENvbCB9LFxyXG4gICAgICB9O1xyXG4gICAgICByb290Tm9kZSA9IDxDcmVhdGVDb2x1bW4gey4uLnsgZGF0YUlkLCBjaGFydERhdGEsIHByZVBvcHVsYXRlZCB9fSAvPjtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICBjYXNlIFwicmVwbGFjZW1lbnRcIjpcclxuICAgICAgcm9vdE5vZGUgPSA8Q3JlYXRlUmVwbGFjZW1lbnQgey4uLnsgZGF0YUlkLCBjaGFydERhdGEgfX0gLz47XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcInJlc2hhcGVcIjpcclxuICAgICAgcm9vdE5vZGUgPSA8UmVzaGFwZSB7Li4ueyBkYXRhSWQsIGNoYXJ0RGF0YSB9fSAvPjtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwiY29sdW1uLWFuYWx5c2lzXCI6XHJcbiAgICAgIHJvb3ROb2RlID0gPENvbHVtbkFuYWx5c2lzIHsuLi57IGRhdGFJZCwgY2hhcnREYXRhIH19IGhlaWdodD17MjUwfSAvPjtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwiaW5zdGFuY2VzXCI6XHJcbiAgICAgIHJvb3ROb2RlID0gPEluc3RhbmNlcyBkYXRhSWQ9e2RhdGFJZH0gaWZyYW1lPXt0cnVlfSAvPjtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwiY29kZS1leHBvcnRcIjpcclxuICAgICAgcm9vdE5vZGUgPSA8Q29kZUV4cG9ydCBkYXRhSWQ9e2RhdGFJZH0gLz47XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcInVwbG9hZFwiOlxyXG4gICAgICByb290Tm9kZSA9IDxVcGxvYWQgY2hhcnREYXRhPXt7IHZpc2libGU6IHRydWUgfX0gLz47XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcImNoYXJ0c1wiOlxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcm9vdE5vZGUgPSA8Q2hhcnRzIHsuLi57IGRhdGFJZCwgY2hhcnREYXRhIH19IC8+O1xyXG4gICAgICBicmVhaztcclxuICB9XHJcbiAgUmVhY3RET00ucmVuZGVyKHJvb3ROb2RlLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBvcHVwLWNvbnRlbnRcIikpO1xyXG59IGVsc2UgaWYgKF8uc3RhcnRzV2l0aChwYXRobmFtZSwgXCIvZHRhbGUvY29kZS1wb3B1cFwiKSkge1xyXG4gIHJlcXVpcmUoXCIuL2R0YWxlL0RhdGFWaWV3ZXIuY3NzXCIpO1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29kZS10aXRsZVwiKS5pbm5lckhUTUwgPSBgJHt3aW5kb3cub3BlbmVyLmNvZGVfcG9wdXAudGl0bGV9IENvZGUgRXhwb3J0YDtcclxuICBSZWFjdERPTS5yZW5kZXIoPENvZGVQb3B1cCBjb2RlPXt3aW5kb3cub3BlbmVyLmNvZGVfcG9wdXAuY29kZX0gLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9wdXAtY29udGVudFwiKSk7XHJcbn0gZWxzZSB7XHJcbiAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShhcHAuc3RvcmUpO1xyXG4gIHN0b3JlLmRpc3BhdGNoKGFjdGlvbnMuaW5pdCgpKTtcclxuICBSZWFjdERPTS5yZW5kZXIoXHJcbiAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cclxuICAgICAgPERhdGFWaWV3ZXIgc2V0dGluZ3M9e3NldHRpbmdzfSAvPlxyXG4gICAgPC9Qcm92aWRlcj4sXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIilcclxuICApO1xyXG59XHJcbiIsImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcblxyXG5pbXBvcnQgQnV0dG9uVG9nZ2xlIGZyb20gXCIuLi8uLi8uLi9CdXR0b25Ub2dnbGVcIjtcclxuaW1wb3J0IHsgZXhwb3J0cyBhcyBndSB9IGZyb20gXCIuLi8uLi8uLi9kdGFsZS9ncmlkVXRpbHNcIjtcclxuaW1wb3J0IHsgcmVuZGVyQ29kZVBvcHVwQW5jaG9yIH0gZnJvbSBcIi4uLy4uL0NvZGVQb3B1cFwiO1xyXG5pbXBvcnQgQ2F0ZWdvcnlJbnB1dHMgZnJvbSBcIi4vQ2F0ZWdvcnlJbnB1dHNcIjtcclxuaW1wb3J0IHsgQU5BTFlTSVNfQUdHUywgVElUTEVTIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBPcmRpbmFsSW5wdXRzIGZyb20gXCIuL09yZGluYWxJbnB1dHNcIjtcclxuaW1wb3J0IFRleHRFbnRlckZpbHRlciBmcm9tIFwiLi9UZXh0RW50ZXJGaWx0ZXJcIjtcclxuXHJcbmZ1bmN0aW9uIHdyYXBGaWx0ZXJNYXJrdXAoZmlsdGVyTWFya3VwKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCByb3cgc21hbGwtZ3V0dGVycyBtYi0zIG10LTNcIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgcm93XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIiAvPlxyXG4gICAgICAgIHtmaWx0ZXJNYXJrdXB9XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIiAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJ1aWxkU3RhdGUocHJvcHMpIHtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogXCJib3hwbG90XCIsXHJcbiAgICBiaW5zOiBcIjIwXCIsXHJcbiAgICB0b3A6IChwcm9wcy50b3AgfHwgMTAwKSArIFwiXCIsXHJcbiAgICBvcmRpbmFsQ29sOiBudWxsLFxyXG4gICAgb3JkaW5hbEFnZzogXy5maW5kKEFOQUxZU0lTX0FHR1MsIHsgdmFsdWU6IFwic3VtXCIgfSksXHJcbiAgICBjYXRlZ29yeUNvbDogbnVsbCxcclxuICAgIGNhdGVnb3J5QWdnOiBfLmZpbmQoQU5BTFlTSVNfQUdHUywgeyB2YWx1ZTogXCJtZWFuXCIgfSksXHJcbiAgfTtcclxufVxyXG5cclxuY2xhc3MgRGVzY3JpYmVGaWx0ZXJzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IGJ1aWxkU3RhdGUocHJvcHMpO1xyXG4gICAgdGhpcy5idWlsZENoYXJ0ID0gdGhpcy5idWlsZENoYXJ0LmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmJ1aWxkQ2hhcnRUeXBlVG9nZ2xlID0gdGhpcy5idWlsZENoYXJ0VHlwZVRvZ2dsZS5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5idWlsZEZpbHRlciA9IHRoaXMuYnVpbGRGaWx0ZXIuYmluZCh0aGlzKTtcclxuICAgIHRoaXMudXBkYXRlT3JkaW5hbCA9IHRoaXMudXBkYXRlT3JkaW5hbC5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy51cGRhdGVDYXRlZ29yeSA9IHRoaXMudXBkYXRlQ2F0ZWdvcnkuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXdQcm9wcywgbmV3U3RhdGUpIHtcclxuICAgIGNvbnN0IHByb3BzID0gW1wiY29sc1wiLCBcImR0eXBlXCIsIFwiY29kZVwiLCBcImRldGFpbHNcIl07XHJcbiAgICBpZiAoIV8uaXNFcXVhbChfLnBpY2sodGhpcy5wcm9wcywgcHJvcHMpLCBfLnBpY2sobmV3UHJvcHMsIHByb3BzKSkpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gIV8uaXNFcXVhbCh0aGlzLnN0YXRlLCBuZXdTdGF0ZSk7XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XHJcbiAgICBpZiAoIV8uaXNFcXVhbCh0aGlzLnByb3BzLmRldGFpbHMsIHByZXZQcm9wcy5kZXRhaWxzKSkge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKGJ1aWxkU3RhdGUodGhpcy5wcm9wcykpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYnVpbGRDaGFydFR5cGVUb2dnbGUoKSB7XHJcbiAgICBjb25zdCBjb2xUeXBlID0gZ3UuZmluZENvbFR5cGUodGhpcy5wcm9wcy5kdHlwZSk7XHJcbiAgICBjb25zdCBvcHRpb25zID0gW3sgbGFiZWw6IFRJVExFUy5ib3hwbG90LCB2YWx1ZTogXCJib3hwbG90XCIgfV07XHJcbiAgICBpZiAoXy5pbmNsdWRlcyhbXCJmbG9hdFwiLCBcImludFwiXSwgY29sVHlwZSkpIHtcclxuICAgICAgb3B0aW9ucy5wdXNoKHsgbGFiZWw6IFRJVExFUy5oaXN0b2dyYW0sIHZhbHVlOiBcImhpc3RvZ3JhbVwiIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKGNvbFR5cGUgPT09IFwiZmxvYXRcIikge1xyXG4gICAgICBvcHRpb25zLnB1c2goeyBsYWJlbDogVElUTEVTLmNhdGVnb3JpZXMsIHZhbHVlOiBcImNhdGVnb3JpZXNcIiB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG9wdGlvbnMucHVzaCh7IGxhYmVsOiBUSVRMRVMudmFsdWVfY291bnRzLCB2YWx1ZTogXCJ2YWx1ZV9jb3VudHNcIiB9KTtcclxuICAgIH1cclxuICAgIGNvbnN0IHVwZGF0ZSA9IHZhbHVlID0+IHRoaXMuc2V0U3RhdGUoeyB0eXBlOiB2YWx1ZSB9LCB0aGlzLmJ1aWxkQ2hhcnQpO1xyXG4gICAgcmV0dXJuIDxCdXR0b25Ub2dnbGUgb3B0aW9ucz17b3B0aW9uc30gdXBkYXRlPXt1cGRhdGV9IGRlZmF1bHRWYWx1ZT17dGhpcy5zdGF0ZS50eXBlfSAvPjtcclxuICB9XHJcblxyXG4gIGJ1aWxkRmlsdGVyKHByb3ApIHtcclxuICAgIGNvbnN0IHByb3BhZ2F0ZVN0YXRlID0gc3RhdGUgPT4gdGhpcy5zZXRTdGF0ZShzdGF0ZSk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8VGV4dEVudGVyRmlsdGVyXHJcbiAgICAgICAgey4uLntcclxuICAgICAgICAgIGtleTogXCJwcm9wXCIsXHJcbiAgICAgICAgICBwcm9wLFxyXG4gICAgICAgICAgYnVpbGRDaGFydDogdGhpcy5idWlsZENoYXJ0LFxyXG4gICAgICAgICAgZHR5cGU6IHRoaXMucHJvcHMuZHR5cGUsXHJcbiAgICAgICAgICBwcm9wYWdhdGVTdGF0ZSxcclxuICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdGhpcy5zdGF0ZVtwcm9wXSxcclxuICAgICAgICB9fVxyXG4gICAgICAvPlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGJ1aWxkQ2hhcnQoKSB7XHJcbiAgICB0aGlzLnByb3BzLmJ1aWxkQ2hhcnQodGhpcy5zdGF0ZSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVPcmRpbmFsKHByb3AsIHZhbCkge1xyXG4gICAgY29uc3QgY3VyclN0YXRlID0gXy5hc3NpZ25Jbih7fSwgXy5waWNrKHRoaXMuc3RhdGUsIFtcIm9yZGluYWxDb2xcIiwgXCJvcmRpbmFsQWdnXCJdKSwgeyBbcHJvcF06IHZhbCB9KTtcclxuICAgIHRoaXMuc2V0U3RhdGUoY3VyclN0YXRlLCAoKSA9PiB7XHJcbiAgICAgIGlmIChjdXJyU3RhdGUub3JkaW5hbENvbCAmJiBjdXJyU3RhdGUub3JkaW5hbEFnZykge1xyXG4gICAgICAgIHRoaXMuYnVpbGRDaGFydCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZUNhdGVnb3J5KHByb3AsIHZhbCkge1xyXG4gICAgY29uc3QgY3VyclN0YXRlID0gXy5hc3NpZ25Jbih7fSwgXy5waWNrKHRoaXMuc3RhdGUsIFtcImNhdGVnb3J5Q29sXCIsIFwiY2F0ZWdvcnlBZ2dcIl0pLCB7IFtwcm9wXTogdmFsIH0pO1xyXG4gICAgdGhpcy5zZXRTdGF0ZShjdXJyU3RhdGUsICgpID0+IHtcclxuICAgICAgaWYgKGN1cnJTdGF0ZS5jYXRlZ29yeUNvbCAmJiBjdXJyU3RhdGUuY2F0ZWdvcnlBZ2cpIHtcclxuICAgICAgICB0aGlzLmJ1aWxkQ2hhcnQoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAoXy5pc051bGwodGhpcy5wcm9wcy50eXBlKSkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGNvbnN0IHsgY29kZSwgZHR5cGUgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCBjb2xUeXBlID0gZ3UuZmluZENvbFR5cGUoZHR5cGUpO1xyXG4gICAgbGV0IGZpbHRlck1hcmt1cCA9IG51bGw7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS50eXBlID09PSBcImJveHBsb3RcIikge1xyXG4gICAgICBmaWx0ZXJNYXJrdXAgPSBudWxsO1xyXG4gICAgfSBlbHNlIGlmIChcImludFwiID09PSBjb2xUeXBlKSB7XHJcbiAgICAgIC8vIGludCAtPiBWYWx1ZSBDb3VudHMgb3IgSGlzdG9ncmFtXHJcbiAgICAgIGlmICh0aGlzLnN0YXRlLnR5cGUgPT09IFwiaGlzdG9ncmFtXCIpIHtcclxuICAgICAgICBmaWx0ZXJNYXJrdXAgPSB3cmFwRmlsdGVyTWFya3VwKHRoaXMuYnVpbGRGaWx0ZXIoXCJiaW5zXCIpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmaWx0ZXJNYXJrdXAgPSB3cmFwRmlsdGVyTWFya3VwKFtcclxuICAgICAgICAgIHRoaXMuYnVpbGRGaWx0ZXIoXCJ0b3BcIiksXHJcbiAgICAgICAgICA8T3JkaW5hbElucHV0cyBrZXk9XCJvcmRpbmFsXCIgdXBkYXRlT3JkaW5hbD17dGhpcy51cGRhdGVPcmRpbmFsfSB7Li4udGhpcy5wcm9wc30gLz4sXHJcbiAgICAgICAgXSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoXCJmbG9hdFwiID09PSBjb2xUeXBlKSB7XHJcbiAgICAgIC8vIGZsb2F0cyAtPiBIaXN0b2dyYW0gb3IgQ2F0ZWdvcmllc1xyXG4gICAgICBpZiAodGhpcy5zdGF0ZS50eXBlID09PSBcImhpc3RvZ3JhbVwiKSB7XHJcbiAgICAgICAgZmlsdGVyTWFya3VwID0gd3JhcEZpbHRlck1hcmt1cCh0aGlzLmJ1aWxkRmlsdGVyKFwiYmluc1wiKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZmlsdGVyTWFya3VwID0gd3JhcEZpbHRlck1hcmt1cChbXHJcbiAgICAgICAgICB0aGlzLmJ1aWxkRmlsdGVyKFwidG9wXCIpLFxyXG4gICAgICAgICAgPENhdGVnb3J5SW5wdXRzIGtleT1cImNhdGVnb3J5XCIgdXBkYXRlQ2F0ZWdvcnk9e3RoaXMudXBkYXRlQ2F0ZWdvcnl9IHsuLi50aGlzLnByb3BzfSAvPixcclxuICAgICAgICBdKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gZGF0ZSwgc3RyaW5nLCBib29sIC0+IFZhbHVlIENvdW50c1xyXG4gICAgICBmaWx0ZXJNYXJrdXAgPSB3cmFwRmlsdGVyTWFya3VwKFtcclxuICAgICAgICB0aGlzLmJ1aWxkRmlsdGVyKFwidG9wXCIpLFxyXG4gICAgICAgIDxPcmRpbmFsSW5wdXRzIGtleT1cIm9yZGluYWxcIiB1cGRhdGVPcmRpbmFsPXt0aGlzLnVwZGF0ZU9yZGluYWx9IHsuLi50aGlzLnByb3BzfSAvPixcclxuICAgICAgXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8UmVhY3QuRnJhZ21lbnQ+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIHJvdyBzbWFsbC1ndXR0ZXJzIG1iLTMgbXQtM1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgcm93XCI+e3RoaXMuYnVpbGRDaGFydFR5cGVUb2dnbGUoKX08L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLWF1dG9cIj5cclxuICAgICAgICAgICAgPGRpdj57cmVuZGVyQ29kZVBvcHVwQW5jaG9yKGNvZGUsIFRJVExFU1t0aGlzLnN0YXRlLnR5cGVdKX08L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIHtmaWx0ZXJNYXJrdXB9XHJcbiAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5EZXNjcmliZUZpbHRlcnMuZGlzcGxheU5hbWUgPSBcIkRlc2NyaWJlRmlsdGVyc1wiO1xyXG5EZXNjcmliZUZpbHRlcnMucHJvcFR5cGVzID0ge1xyXG4gIHNlbGVjdGVkQ29sOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIGNvbHM6IFByb3BUeXBlcy5hcnJheSxcclxuICBkdHlwZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICBjb2RlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIHR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgdG9wOiBQcm9wVHlwZXMubnVtYmVyLFxyXG4gIGJ1aWxkQ2hhcnQ6IFByb3BUeXBlcy5mdW5jLFxyXG4gIGRldGFpbHM6IFByb3BUeXBlcy5vYmplY3QsXHJcbn07XHJcblxyXG5leHBvcnQgeyBEZXNjcmliZUZpbHRlcnMgfTtcclxuIiwiaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmltcG9ydCB7IEJvdW5jZXJXcmFwcGVyIH0gZnJvbSBcIi4uLy4uL0JvdW5jZXJXcmFwcGVyXCI7XHJcbmltcG9ydCB7IFJlbW92YWJsZUVycm9yIH0gZnJvbSBcIi4uLy4uL1JlbW92YWJsZUVycm9yXCI7XHJcbmltcG9ydCB7IGR0eXBlc1VybCB9IGZyb20gXCIuLi8uLi9hY3Rpb25zL3VybC11dGlsc1wiO1xyXG5pbXBvcnQgc2VydmVyU3RhdGUgZnJvbSBcIi4uLy4uL2R0YWxlL3NlcnZlclN0YXRlTWFuYWdlbWVudFwiO1xyXG5pbXBvcnQgeyBmZXRjaEpzb24gfSBmcm9tIFwiLi4vLi4vZmV0Y2hlclwiO1xyXG5pbXBvcnQgeyBEZXRhaWxzIH0gZnJvbSBcIi4vRGV0YWlsc1wiO1xyXG5pbXBvcnQgeyBEdHlwZXNHcmlkIH0gZnJvbSBcIi4vRHR5cGVzR3JpZFwiO1xyXG5cclxuY2xhc3MgRGVzY3JpYmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBsb2FkaW5nRHR5cGVzOiB0cnVlLFxyXG4gICAgICBkdHlwZXM6IG51bGwsXHJcbiAgICAgIGR0eXBlc0ZpbHRlcjogbnVsbCxcclxuICAgICAgc2VsZWN0ZWQ6IG51bGwsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICBmZXRjaEpzb24oZHR5cGVzVXJsKHRoaXMucHJvcHMuZGF0YUlkKSwgZHR5cGVzRGF0YSA9PiB7XHJcbiAgICAgIGNvbnN0IG5ld1N0YXRlID0ge1xyXG4gICAgICAgIGVycm9yOiBudWxsLFxyXG4gICAgICAgIGxvYWRpbmdEdHlwZXM6IGZhbHNlLFxyXG4gICAgICB9O1xyXG4gICAgICBpZiAoZHR5cGVzRGF0YS5lcnJvcikge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBlcnJvcjogPFJlbW92YWJsZUVycm9yIHsuLi5kdHlwZXNEYXRhfSAvPiB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgbmV3U3RhdGUuZHR5cGVzID0gZHR5cGVzRGF0YS5kdHlwZXM7XHJcbiAgICAgIGlmIChkdHlwZXNEYXRhLmR0eXBlcy5sZW5ndGgpIHtcclxuICAgICAgICBsZXQgc2VsZWN0ZWRSb3cgPSBfLmZpbmQoZHR5cGVzRGF0YS5kdHlwZXMsIHtcclxuICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMuY2hhcnREYXRhLnNlbGVjdGVkQ29sLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChfLmlzVW5kZWZpbmVkKHNlbGVjdGVkUm93KSkge1xyXG4gICAgICAgICAgc2VsZWN0ZWRSb3cgPSBfLmhlYWQoZHR5cGVzRGF0YS5kdHlwZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBuZXdTdGF0ZS5kdHlwZXMgPSBfLm1hcChuZXdTdGF0ZS5kdHlwZXMsIGQgPT4gXy5hc3NpZ24oZCwgeyBzZWxlY3RlZDogZC5uYW1lID09IHNlbGVjdGVkUm93Lm5hbWUgfSkpO1xyXG4gICAgICAgIG5ld1N0YXRlLnNlbGVjdGVkID0gc2VsZWN0ZWRSb3c7IC8vIGJ5IGRlZmF1bHQsIGRpc3BsYXkgZmlyc3QgY29sdW1uXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGlmICh0aGlzLnN0YXRlLmVycm9yKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBrZXk9XCJib2R5XCIgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxyXG4gICAgICAgICAge3RoaXMuc3RhdGUuZXJyb3J9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBzYXZlID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCB2aXNpYmlsaXR5ID0gXy5yZWR1Y2UodGhpcy5fZ3JpZC5zdGF0ZS5kdHlwZXMsIChyZXQsIGQpID0+IF8uYXNzaWduSW4ocmV0LCB7IFtkLm5hbWVdOiBkLnZpc2libGUgfSksIHt9KTtcclxuICAgICAgY29uc3QgY2FsbGJhY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgd2luZG93Lm9wZW5lci5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICB3aW5kb3cuY2xvc2UoKTtcclxuICAgICAgfTtcclxuICAgICAgc2VydmVyU3RhdGUudXBkYXRlVmlzaWJpbGl0eSh0aGlzLnByb3BzLmRhdGFJZCwgdmlzaWJpbGl0eSwgY2FsbGJhY2spO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IHByb3BhZ2F0ZVN0YXRlID0gc3RhdGUgPT4gdGhpcy5zZXRTdGF0ZShzdGF0ZSk7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICA8ZGl2IGtleT1cImJvZHlcIiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5IGRlc2NyaWJlLWJvZHlcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNSBkZXNjcmliZS1kdHlwZXMtZ3JpZC1jb2xcIj5cclxuICAgICAgICAgICAgPEJvdW5jZXJXcmFwcGVyIHNob3dCb3VuY2VyPXt0aGlzLnN0YXRlLmxvYWRpbmdEdHlwZXN9PlxyXG4gICAgICAgICAgICAgIDxEdHlwZXNHcmlkIHJlZj17bWcgPT4gKHRoaXMuX2dyaWQgPSBtZyl9IGR0eXBlcz17dGhpcy5zdGF0ZS5kdHlwZXN9IHByb3BhZ2F0ZVN0YXRlPXtwcm9wYWdhdGVTdGF0ZX0gLz5cclxuICAgICAgICAgICAgPC9Cb3VuY2VyV3JhcHBlcj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgezxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTcgZGVzY3JpYmUtZGV0YWlscy1jb2xcIj5cclxuICAgICAgICAgICAgPERldGFpbHMgc2VsZWN0ZWQ9e3RoaXMuc3RhdGUuc2VsZWN0ZWR9IGRhdGFJZD17dGhpcy5wcm9wcy5kYXRhSWR9IGR0eXBlcz17dGhpcy5zdGF0ZS5kdHlwZXN9IC8+XHJcbiAgICAgICAgICA8L2Rpdj59XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PixcclxuICAgICAgPGRpdiBrZXk9XCJmb290ZXJcIiBjbGFzc05hbWU9XCJtb2RhbC1mb290ZXJcIj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9e3NhdmV9PlxyXG4gICAgICAgICAgPHNwYW4+U2F2ZTwvc3Bhbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9IHsoKSA9PiB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvZHRhbGUvbWFpbi97e2RhdGFfaWR9fSd9PlxyXG4gICAgICAgICAgPHNwYW4+UmVsb2FkPC9zcGFuPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj4sXHJcbiAgICBdO1xyXG4gIH1cclxufVxyXG5EZXNjcmliZS5kaXNwbGF5TmFtZSA9IFwiRGVzY3JpYmVcIjtcclxuRGVzY3JpYmUucHJvcFR5cGVzID0ge1xyXG4gIGRhdGFJZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gIGNoYXJ0RGF0YTogUHJvcFR5cGVzLnNoYXBlKHtcclxuICAgIHZpc2libGU6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICBzZWxlY3RlZENvbDogUHJvcFR5cGVzLnN0cmluZyxcclxuICB9KSxcclxufTtcclxuXHJcbmV4cG9ydCB7IERlc2NyaWJlIH07IiwiaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmltcG9ydCB7IEJvdW5jZXIgfSBmcm9tIFwiLi4vLi4vQm91bmNlclwiO1xyXG5pbXBvcnQgeyBKU0FuY2hvciB9IGZyb20gXCIuLi8uLi9KU0FuY2hvclwiO1xyXG5pbXBvcnQgeyBSZW1vdmFibGVFcnJvciB9IGZyb20gXCIuLi8uLi9SZW1vdmFibGVFcnJvclwiO1xyXG5pbXBvcnQgeyBidWlsZFVSTFN0cmluZywgc2F2ZUNvbEZpbHRlclVybCB9IGZyb20gXCIuLi8uLi9hY3Rpb25zL3VybC11dGlsc1wiO1xyXG5pbXBvcnQgeyBleHBvcnRzIGFzIGd1IH0gZnJvbSBcIi4uLy4uL2R0YWxlL2dyaWRVdGlsc1wiO1xyXG5pbXBvcnQgeyBmZXRjaEpzb24gfSBmcm9tIFwiLi4vLi4vZmV0Y2hlclwiO1xyXG5pbXBvcnQgeyBidWlsZEJ1dHRvbiB9IGZyb20gXCIuLi8uLi90b2dnbGVVdGlsc1wiO1xyXG5pbXBvcnQgRGV0YWlsc0NoYXJ0cyBmcm9tIFwiLi9EZXRhaWxzQ2hhcnRzXCI7XHJcblxyXG5jb25zdCBCQVNFX0RFU0NSSUJFX1VSTCA9IFwiL2R0YWxlL2Rlc2NyaWJlXCI7XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5VW5pcXVlcyh1bmlxdWVzLCBkdHlwZSA9IG51bGwpIHtcclxuICBpZiAoXy5pc0VtcHR5KHVuaXF1ZXMuZGF0YSkpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuICBsZXQgdGl0bGUgPSBcIlVuaXF1ZSBWYWx1ZXNcIjtcclxuICBpZiAoZHR5cGUpIHtcclxuICAgIHRpdGxlID0gYCR7dGl0bGV9IG9mIHR5cGUgJyR7ZHR5cGV9J2A7XHJcbiAgfVxyXG4gIGlmICh1bmlxdWVzLnRvcCkge1xyXG4gICAgdGl0bGUgPSBgJHt0aXRsZX0gKHRvcCAxMDAgbW9zdCBjb21tb24pYDtcclxuICB9XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYga2V5PXtkdHlwZX0gY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTEyXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC13ZWlnaHQtYm9sZFwiIHN0eWxlPXt7IGZvbnRTaXplOiBcIjEyMCVcIiB9fT5cclxuICAgICAgICAgIHtgJHt0aXRsZX06YH1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICB7Xy5qb2luKFxyXG4gICAgICAgICAgICBfLm1hcCh1bmlxdWVzLmRhdGEsIHUgPT4gYCR7dS52YWx1ZX0gKCR7dS5jb3VudH0pYCksXHJcbiAgICAgICAgICAgIFwiLCBcIlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuY2xhc3MgRGV0YWlscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGVycm9yOiBudWxsLFxyXG4gICAgICBkZXRhaWxzOiBudWxsLFxyXG4gICAgICBkZWVwRGF0YTogXCJ1bmlxdWVzXCIsXHJcbiAgICAgIG91dGxpZXJzOiBudWxsLFxyXG4gICAgICBsb2FkaW5nT3V0bGllcnM6IGZhbHNlLFxyXG4gICAgfTtcclxuICAgIHRoaXMubG9hZERldGFpbHMgPSB0aGlzLmxvYWREZXRhaWxzLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLnJlbmRlclVuaXF1ZXMgPSB0aGlzLnJlbmRlclVuaXF1ZXMuYmluZCh0aGlzKTtcclxuICAgIHRoaXMucmVuZGVyRGVlcERhdGFUb2dnbGUgPSB0aGlzLnJlbmRlckRlZXBEYXRhVG9nZ2xlLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmxvYWRPdXRsaWVycyA9IHRoaXMubG9hZE91dGxpZXJzLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLnJlbmRlck91dGxpZXJzID0gdGhpcy5yZW5kZXJPdXRsaWVycy5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xyXG4gICAgaWYgKCFfLmlzRXF1YWwodGhpcy5wcm9wcy5zZWxlY3RlZCwgcHJldlByb3BzLnNlbGVjdGVkKSkge1xyXG4gICAgICB0aGlzLmxvYWREZXRhaWxzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsb2FkRGV0YWlscygpIHtcclxuICAgIGZldGNoSnNvbihgJHtCQVNFX0RFU0NSSUJFX1VSTH0vJHt0aGlzLnByb3BzLmRhdGFJZH0vJHt0aGlzLnByb3BzLnNlbGVjdGVkLm5hbWV9YCwgZGV0YWlsRGF0YSA9PiB7XHJcbiAgICAgIGNvbnN0IG5ld1N0YXRlID0ge1xyXG4gICAgICAgIGVycm9yOiBudWxsLFxyXG4gICAgICAgIGRldGFpbHM6IG51bGwsXHJcbiAgICAgICAgY29kZTogbnVsbCxcclxuICAgICAgICBvdXRsaWVyczogbnVsbCxcclxuICAgICAgICBkZWVwRGF0YTogXCJ1bmlxdWVzXCIsXHJcbiAgICAgIH07XHJcbiAgICAgIGlmIChkZXRhaWxEYXRhLmVycm9yKSB7XHJcbiAgICAgICAgbmV3U3RhdGUuZXJyb3IgPSAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0xMlwiPlxyXG4gICAgICAgICAgICA8UmVtb3ZhYmxlRXJyb3Igey4uLmRldGFpbERhdGF9IC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBuZXdTdGF0ZS5kZXRhaWxzID0gXy5waWNrKGRldGFpbERhdGEsIFtcImRlc2NyaWJlXCIsIFwidW5pcXVlc1wiLCBcImR0eXBlX2NvdW50c1wiXSk7XHJcbiAgICAgIG5ld1N0YXRlLmRldGFpbHMubmFtZSA9IHRoaXMucHJvcHMuc2VsZWN0ZWQubmFtZTtcclxuICAgICAgbmV3U3RhdGUuZGV0YWlscy5kdHlwZSA9IHRoaXMucHJvcHMuc2VsZWN0ZWQuZHR5cGU7XHJcbiAgICAgIG5ld1N0YXRlLmNvZGUgPSBkZXRhaWxEYXRhLmNvZGU7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZW5kZXJVbmlxdWVzKCkge1xyXG4gICAgaWYgKHRoaXMuc3RhdGUuZGVlcERhdGEgPT0gXCJvdXRsaWVyc1wiKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHVuaXF1ZXMgPSBfLmdldCh0aGlzLnN0YXRlLCBcImRldGFpbHMudW5pcXVlc1wiKSB8fCB7fTtcclxuICAgIGNvbnN0IGR0eXBlQ3QgPSBfLnNpemUodW5pcXVlcyk7XHJcbiAgICByZXR1cm4gXy5tYXAodW5pcXVlcywgKGR0eXBlVW5pcXVlcywgZHR5cGUpID0+IGRpc3BsYXlVbmlxdWVzKGR0eXBlVW5pcXVlcywgZHR5cGVDdCA+IDEgPyBkdHlwZSA6IG51bGwpKTtcclxuICB9XHJcblxyXG4gIGxvYWRPdXRsaWVycygpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBsb2FkaW5nT3V0bGllcnM6IHRydWUgfSk7XHJcbiAgICBmZXRjaEpzb24oYC9kdGFsZS9vdXRsaWVycy8ke3RoaXMucHJvcHMuZGF0YUlkfS8ke3RoaXMucHJvcHMuc2VsZWN0ZWQubmFtZX1gLCBvdXRsaWVyRGF0YSA9PiB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBvdXRsaWVyczogb3V0bGllckRhdGEsIGxvYWRpbmdPdXRsaWVyczogZmFsc2UgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlbmRlckRlZXBEYXRhVG9nZ2xlKCkge1xyXG4gICAgaWYgKF8uaW5jbHVkZXMoW1wiZmxvYXRcIiwgXCJpbnRcIl0sIGd1LmZpbmRDb2xUeXBlKHRoaXMucHJvcHMuc2VsZWN0ZWQuZHR5cGUpKSkge1xyXG4gICAgICBjb25zdCB7IGRlZXBEYXRhLCBvdXRsaWVycywgbG9hZGluZ091dGxpZXJzIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICBjb25zdCB0b2dnbGUgPSB2YWwgPT4gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG91dGxpZXJzQ2FsbGJhY2sgPSBfLmlzTnVsbChvdXRsaWVycykgJiYgIWxvYWRpbmdPdXRsaWVycyA/IHRoaXMubG9hZE91dGxpZXJzIDogXy5ub29wO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBkZWVwRGF0YTogdmFsIH0sIG91dGxpZXJzQ2FsbGJhY2spO1xyXG4gICAgICB9O1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IHBiLTVcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLWF1dG8gcGwtMFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBjb21wYWN0IGNvbC1hdXRvXCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiB7Li4uYnVpbGRCdXR0b24oZGVlcERhdGEgPT0gXCJ1bmlxdWVzXCIsIHRvZ2dsZShcInVuaXF1ZXNcIikpfT5VbmlxdWVzPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiB7Li4uYnVpbGRCdXR0b24oZGVlcERhdGEgPT0gXCJvdXRsaWVyc1wiLCB0b2dnbGUoXCJvdXRsaWVyc1wiKSl9Pk91dGxpZXJzPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHJlbmRlck91dGxpZXJzKCkge1xyXG4gICAgaWYgKHRoaXMuc3RhdGUuZGVlcERhdGEgPT0gXCJ1bmlxdWVzXCIpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5sb2FkaW5nT3V0bGllcnMpIHtcclxuICAgICAgcmV0dXJuIDxCb3VuY2VyIC8+O1xyXG4gICAgfVxyXG4gICAgY29uc3QgeyBvdXRsaWVycyB9ID0gdGhpcy5zdGF0ZTtcclxuICAgIGNvbnN0IG91dGxpZXJWYWx1ZXMgPSBfLmdldChvdXRsaWVycywgXCJvdXRsaWVyc1wiLCBbXSk7XHJcbiAgICBpZiAoXy5pc0VtcHR5KG91dGxpZXJWYWx1ZXMpKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBrZXk9ezN9IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tMTJcIj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC13ZWlnaHQtYm9sZFwiIHN0eWxlPXt7IGZvbnRTaXplOiBcIjEyMCVcIiB9fT5cclxuICAgICAgICAgICAgICBObyBPdXRsaWVycyBEZXRlY3RlZFxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHNhdmVGaWx0ZXIgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNmZyA9IHsgdHlwZTogXCJvdXRsaWVyc1wiIH07XHJcbiAgICAgIGlmICghb3V0bGllcnMucXVlcnlBcHBsaWVkKSB7XHJcbiAgICAgICAgY2ZnLnF1ZXJ5ID0gb3V0bGllcnMucXVlcnk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgdXJsID0gYnVpbGRVUkxTdHJpbmcoc2F2ZUNvbEZpbHRlclVybCh0aGlzLnByb3BzLmRhdGFJZCwgdGhpcy5wcm9wcy5zZWxlY3RlZC5uYW1lKSwge1xyXG4gICAgICAgIGNmZzogSlNPTi5zdHJpbmdpZnkoY2ZnKSxcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgb3V0bGllcnM6IF8uYXNzaWduSW4oe30sIG91dGxpZXJzLCB7XHJcbiAgICAgICAgICAgIHF1ZXJ5QXBwbGllZDogIW91dGxpZXJzLnF1ZXJ5QXBwbGllZCxcclxuICAgICAgICAgIH0pLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmV0Y2hKc29uKHVybCwgKCkgPT4gd2luZG93Lm9wZW5lci5sb2NhdGlvbi5yZWxvYWQoKSlcclxuICAgICAgKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICA8ZGl2IGtleT17MX0gY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtd2VpZ2h0LWJvbGRcIiBzdHlsZT17eyBmb250U2l6ZTogXCIxMjAlXCIgfX0+XHJcbiAgICAgICAgICAgIHtgJHtfLnNpemUob3V0bGllclZhbHVlcyl9IE91dGxpZXJzIEZvdW5kJHtvdXRsaWVycy50b3AgPyBcIiAodG9wIDEwMClcIiA6IFwiXCJ9OmB9XHJcbiAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICA8SlNBbmNob3Igb25DbGljaz17c2F2ZUZpbHRlcn0gY2xhc3NOYW1lPVwiZC1ibG9ja1wiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwci0zXCI+e2Ake291dGxpZXJzLnF1ZXJ5QXBwbGllZCA/IFwiUmVtb3ZlXCIgOiBcIkFwcGx5XCJ9IG91dGxpZXIgZmlsdGVyOmB9PC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXdlaWdodC1ib2xkXCI+e291dGxpZXJzLnF1ZXJ5fTwvc3Bhbj5cclxuICAgICAgICAgIDwvSlNBbmNob3I+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtYXV0b1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJob3ZlcmFibGVcIiBzdHlsZT17eyBib3JkZXJCb3R0b206IFwibm9uZVwiIH19PlxyXG4gICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJpY28tY29kZSBwci0zXCIgLz5cclxuICAgICAgICAgICAgPHNwYW4+VmlldyBDb2RlPC9zcGFuPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhvdmVyYWJsZV9fY29udGVudFwiIHN0eWxlPXt7IHdpZHRoOiBcImF1dG9cIiB9fT5cclxuICAgICAgICAgICAgICA8cHJlIGNsYXNzTmFtZT1cIm1iLTBcIj57b3V0bGllcnMuY29kZX08L3ByZT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+LFxyXG4gICAgICA8ZGl2IGtleT17Mn0gY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tMTJcIj5cclxuICAgICAgICAgIDxzcGFuPntfLmpvaW4oXy5zb3J0Qnkob3V0bGllclZhbHVlcyksIFwiLCBcIil9PC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj4sXHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgaWYgKHRoaXMuc3RhdGUuZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGtleT17MX0gY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS0xMlwiPnt0aGlzLnN0YXRlLmVycm9yfTwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgY29uc3QgeyBkZXRhaWxzLCBjb2RlIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgaWYgKF8uaXNFbXB0eShkZXRhaWxzKSkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGNvbnN0IHsgZHR5cGVzLCBzZWxlY3RlZCwgZGF0YUlkIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPFJlYWN0LkZyYWdtZW50PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYi0wIGZvbnQtd2VpZ2h0LWJvbGRcIiBzdHlsZT17eyBmb250U2l6ZTogXCIyZW1cIiB9fT5cclxuICAgICAgICAgICAgICB7ZGV0YWlscy5uYW1lfVxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInBsLTNcIj4oe2RldGFpbHMuZHR5cGV9KTwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxEZXRhaWxzQ2hhcnRzXHJcbiAgICAgICAgICBkZXRhaWxzPXtkZXRhaWxzfVxyXG4gICAgICAgICAgZGV0YWlsQ29kZT17Y29kZX1cclxuICAgICAgICAgIGR0eXBlPXtkZXRhaWxzLmR0eXBlfVxyXG4gICAgICAgICAgY29scz17ZHR5cGVzfVxyXG4gICAgICAgICAgY29sPXtzZWxlY3RlZC5uYW1lfVxyXG4gICAgICAgICAgZGF0YUlkPXtkYXRhSWR9XHJcbiAgICAgICAgLz5cclxuICAgICAgICB7dGhpcy5yZW5kZXJEZWVwRGF0YVRvZ2dsZSgpfVxyXG4gICAgICAgIHt0aGlzLnJlbmRlclVuaXF1ZXMoKX1cclxuICAgICAgICB7dGhpcy5yZW5kZXJPdXRsaWVycygpfVxyXG4gICAgICA8L1JlYWN0LkZyYWdtZW50PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuRGV0YWlscy5kaXNwbGF5TmFtZSA9IFwiRGV0YWlsc1wiO1xyXG5EZXRhaWxzLnByb3BUeXBlcyA9IHtcclxuICBzZWxlY3RlZDogUHJvcFR5cGVzLm9iamVjdCxcclxuICBkYXRhSWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgZHR5cGVzOiBQcm9wVHlwZXMuYXJyYXksXHJcbn07XHJcblxyXG5leHBvcnQgeyBEZXRhaWxzIH07XHJcbiIsImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcblxyXG5pbXBvcnQgY2hhcnRVdGlscyBmcm9tIFwiLi4vLi4vY2hhcnRVdGlsc1wiO1xyXG5cclxuY29uc3QgQ09VTlRfU1RBVFMgPSBbXCJjb3VudFwiLCBcIm1pc3NpbmdfY3RcIiwgXCJtaXNzaW5nX3BjdFwiXTtcclxuY29uc3QgUE9TSVRJT05fU1RBVFMgPSBbXCJmaXJzdFwiLCBcImxhc3RcIiwgXCJ0b3BcIl07XHJcbmNvbnN0IExBQkVMUyA9IHtcclxuICB0b3RhbF9jb3VudDogXCJUb3RhbCBSb3dzXCIsXHJcbiAgY291bnQ6IFwiQ291bnQgKG5vbi1uYW4pXCIsXHJcbiAgbWlzc2luZ19jdDogXCJDb3VudCAobWlzc2luZylcIixcclxuICBtaXNzaW5nX3BjdDogXCIlIE1pc3NpbmdcIixcclxuICBmcmVxOiBcIkZyZXF1ZW5jeVwiLFxyXG59O1xyXG5cclxuZnVuY3Rpb24gYnVpbGRTdGF0KGtleSwgdmFsdWUpIHtcclxuICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdj5cclxuICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZC1pbmxpbmUgcHItNVwiPntgJHtfLmdldChMQUJFTFMsIGtleSwga2V5KX06YH08L2g0PlxyXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImQtaW5saW5lXCI+e3ZhbHVlfTwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxuICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuY2xhc3MgRGV0YWlsc0JveHBsb3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0geyBib3hwbG90OiBudWxsIH07XHJcbiAgICB0aGlzLmNyZWF0ZUJveHBsb3QgPSB0aGlzLmNyZWF0ZUJveHBsb3QuYmluZCh0aGlzKTtcclxuICB9XHJcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICB0aGlzLmNyZWF0ZUJveHBsb3QoKTtcclxuICB9XHJcblxyXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXdQcm9wcykge1xyXG4gICAgcmV0dXJuICFfLmlzRXF1YWwodGhpcy5wcm9wcy5kZXRhaWxzLCBuZXdQcm9wcy5kZXRhaWxzKTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcclxuICAgIHRoaXMuY3JlYXRlQm94cGxvdCgpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlQm94cGxvdCgpIHtcclxuICAgIGNvbnN0IGJ1aWxkZXIgPSBjdHggPT4ge1xyXG4gICAgICBjb25zdCB7IGRldGFpbHMgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgIGNvbnN0IHsgZGVzY3JpYmUsIG5hbWUgfSA9IGRldGFpbHMgfHwge307XHJcbiAgICAgIGNvbnN0IGNoYXJ0RGF0YSA9IF8oZGVzY3JpYmUgfHwge30pXHJcbiAgICAgICAgLnBpY2tCeSgodiwgaykgPT4gXy5pbmNsdWRlcyhbXCIyNSVcIiwgXCI1MCVcIiwgXCI3NSVcIiwgXCJtaW5cIiwgXCJtYXhcIl0sIGspICYmICFfLmluY2x1ZGVzKFtcIm5hblwiLCBcImluZlwiXSwgdikpXHJcbiAgICAgICAgLm1hcEtleXMoKF92LCBrKSA9PiBfLmdldCh7IFwiMjUlXCI6IFwicTFcIiwgXCI1MCVcIjogXCJtZWRpYW5cIiwgXCI3NSVcIjogXCJxM1wiIH0sIGssIGspKVxyXG4gICAgICAgIC5tYXBWYWx1ZXModiA9PiBwYXJzZUZsb2F0KF8ucmVwbGFjZSh2LCAvLC9nLCBcIlwiKSkpXHJcbiAgICAgICAgLnZhbHVlKCk7XHJcbiAgICAgIGlmIChfLnNpemUoY2hhcnREYXRhKSA9PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuICAgICAgXy5mb3JFYWNoKFtcIm1pblwiLCBcIm1heFwiXSwgcCA9PiB7XHJcbiAgICAgICAgaWYgKCFfLmlzVW5kZWZpbmVkKGNoYXJ0RGF0YVtwXSkpIHtcclxuICAgICAgICAgIGNoYXJ0RGF0YVtgd2hpc2tlciR7cH1gXSA9IGNoYXJ0RGF0YVtwXTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoIV8uaXNVbmRlZmluZWQoZGVzY3JpYmUubWVhbikgJiYgIV8uaW5jbHVkZXMoW1wibmFuXCIsIFwiaW5mXCJdLCBkZXNjcmliZS5tZWFuKSkge1xyXG4gICAgICAgIGNoYXJ0RGF0YS5vdXRsaWVycyA9IFtwYXJzZUZsb2F0KF8ucmVwbGFjZShkZXNjcmliZS5tZWFuLCAvLC9nLCBcIlwiKSldO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBjaGFydFV0aWxzLmNyZWF0ZUNoYXJ0KGN0eCwge1xyXG4gICAgICAgIHR5cGU6IFwiYm94cGxvdFwiLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIGxhYmVsczogW25hbWVdLFxyXG4gICAgICAgICAgZGF0YXNldHM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGxhYmVsOiBuYW1lLFxyXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDU0LCAxNjIsIDIzNSwgMC41KVwiLFxyXG4gICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBcInJnYig1NCwgMTYyLCAyMzUpXCIsXHJcbiAgICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDEsXHJcbiAgICAgICAgICAgICAgZGF0YTogW2NoYXJ0RGF0YV0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcclxuICAgICAgICAgIGxlZ2VuZDogeyBkaXNwbGF5OiBmYWxzZSB9LFxyXG4gICAgICAgICAgdGl0bGU6IHsgZGlzcGxheTogZmFsc2UgfSxcclxuICAgICAgICAgIHRvb2x0aXBzOiB7IGVuYWJsZWQ6IGZhbHNlIH0sXHJcbiAgICAgICAgICBzY2FsZXM6IHtcclxuICAgICAgICAgICAgeUF4ZXM6IFt7IHRpY2tzOiB7IG1pbjogY2hhcnREYXRhLm1pbiAtIDEsIG1heDogY2hhcnREYXRhLm1heCArIDEgfSB9XSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgY2hhcnQgPSBjaGFydFV0aWxzLmNoYXJ0V3JhcHBlcihcImJveHBsb3RcIiwgdGhpcy5zdGF0ZS5ib3hwbG90LCBidWlsZGVyKTtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBib3hwbG90OiBjaGFydCB9KTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgZGV0YWlscyB9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IGRlc2NyaWJlID0gXy5nZXQoZGV0YWlscywgXCJkZXNjcmliZVwiLCB7fSk7XHJcbiAgICBjb25zdCBkZXNjcmliZUtleXMgPSBfLmtleXMoXy5vbWl0KGRlc2NyaWJlLCBfLmNvbmNhdChbXCJ0b3RhbF9jb3VudFwiLCBcImZyZXFcIl0sIENPVU5UX1NUQVRTLCBQT1NJVElPTl9TVEFUUykpKTtcclxuICAgIGxldCBkdHlwZUNvdW50cyA9IG51bGw7XHJcbiAgICBpZiAoZGV0YWlscy5kdHlwZV9jb3VudHMpIHtcclxuICAgICAgZHR5cGVDb3VudHMgPSAoXHJcbiAgICAgICAgPGxpPlxyXG4gICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIm1iLTBcIj5EdHlwZSBDb3VudHM8L2g0PlxyXG4gICAgICAgICAgPHVsPlxyXG4gICAgICAgICAgICB7Xy5tYXAoZGV0YWlscy5kdHlwZV9jb3VudHMsICh7IGNvdW50LCBkdHlwZSB9KSA9PiAoXHJcbiAgICAgICAgICAgICAgPGxpIGtleT17ZHR5cGV9PlxyXG4gICAgICAgICAgICAgICAge2R0eXBlfToge2NvdW50fVxyXG4gICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgPC91bD5cclxuICAgICAgICA8L2xpPlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC02XCI+XHJcbiAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICB7YnVpbGRTdGF0KFwidG90YWxfY291bnRcIiwgZGVzY3JpYmUudG90YWxfY291bnQpfVxyXG4gICAgICAgICAgICAgIDx1bD5cclxuICAgICAgICAgICAgICAgIHtfLm1hcChDT1VOVF9TVEFUUywgc3RhdCA9PiAoXHJcbiAgICAgICAgICAgICAgICAgIDxsaSBrZXk9e3N0YXR9PntidWlsZFN0YXQoc3RhdCwgZGVzY3JpYmVbc3RhdF0pfTwvbGk+XHJcbiAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICB7Xy5tYXAoUE9TSVRJT05fU1RBVFMsIGsgPT4gZGVzY3JpYmVba10gIT09IHVuZGVmaW5lZCAmJiA8bGkga2V5PXtrfT57YnVpbGRTdGF0KGssIGRlc2NyaWJlW2tdKX08L2xpPil9XHJcbiAgICAgICAgICAgIHtkZXNjcmliZS5mcmVxICE9PSB1bmRlZmluZWQgJiYgKFxyXG4gICAgICAgICAgICAgIDx1bD5cclxuICAgICAgICAgICAgICAgIDxsaT57YnVpbGRTdGF0KFwiZnJlcVwiLCBkZXNjcmliZS5mcmVxKX08L2xpPlxyXG4gICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIHtfLm1hcChkZXNjcmliZUtleXMsIGsgPT4gKFxyXG4gICAgICAgICAgICAgIDxsaSBrZXk9e2t9PntidWlsZFN0YXQoaywgZGVzY3JpYmVba10pfTwvbGk+XHJcbiAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICB7ZHR5cGVDb3VudHN9XHJcbiAgICAgICAgICA8L3VsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTZcIj5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgaGVpZ2h0OiAzMDAgfX0+XHJcbiAgICAgICAgICAgIDxjYW52YXMgaWQ9XCJib3hwbG90XCIgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbkRldGFpbHNCb3hwbG90LmRpc3BsYXlOYW1lID0gXCJEZXRhaWxzQm94cGxvdFwiO1xyXG5EZXRhaWxzQm94cGxvdC5wcm9wVHlwZXMgPSB7XHJcbiAgZGV0YWlsczogUHJvcFR5cGVzLm9iamVjdCxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERldGFpbHNCb3hwbG90O1xyXG4iLCJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuaW1wb3J0IHsgZGF0YUxvYWRlciB9IGZyb20gXCIuLi9hbmFseXNpcy9jb2x1bW5BbmFseXNpc1V0aWxzXCI7XHJcbmltcG9ydCB7IERlc2NyaWJlRmlsdGVycyB9IGZyb20gXCIuLi9hbmFseXNpcy9maWx0ZXJzL0Rlc2NyaWJlRmlsdGVyc1wiO1xyXG5pbXBvcnQgRGV0YWlsc0JveHBsb3QgZnJvbSBcIi4vRGV0YWlsc0JveHBsb3RcIjtcclxuXHJcbmNsYXNzIERldGFpbHNDaGFydHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBjaGFydDogbnVsbCxcclxuICAgICAgdHlwZTogXCJib3hwbG90XCIsXHJcbiAgICAgIGVycm9yOiBudWxsLFxyXG4gICAgICBjaGFydFBhcmFtczogbnVsbCxcclxuICAgICAgLi4ucHJvcHMsXHJcbiAgICB9O1xyXG4gICAgdGhpcy5idWlsZENoYXJ0ID0gdGhpcy5idWlsZENoYXJ0LmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIHRoaXMuYnVpbGRDaGFydCh7IHR5cGU6IFwiYm94cGxvdFwiIH0pO1xyXG4gIH1cclxuXHJcbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5ld1Byb3BzLCBuZXdTdGF0ZSkge1xyXG4gICAgaWYgKCFfLmlzRXF1YWwodGhpcy5wcm9wcywgbmV3UHJvcHMpKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdXBkYXRlU3RhdGUgPSBbXCJ0eXBlXCIsIFwiZXJyb3JcIiwgXCJjaGFydFBhcmFtc1wiLCBcImNoYXJ0XCJdO1xyXG4gICAgaWYgKCFfLmlzRXF1YWwoXy5waWNrKHRoaXMuc3RhdGUsIHVwZGF0ZVN0YXRlKSwgXy5waWNrKG5ld1N0YXRlLCB1cGRhdGVTdGF0ZSkpKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xyXG4gICAgaWYgKCFfLmlzRXF1YWwodGhpcy5wcm9wcywgcHJldlByb3BzKSkge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHRoaXMucHJvcHMsICgpID0+IHRoaXMuYnVpbGRDaGFydCh7IHR5cGU6IFwiYm94cGxvdFwiIH0pKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGJ1aWxkQ2hhcnQoY2hhcnRQYXJhbXMpIHtcclxuICAgIGNvbnN0IGZpbmFsUGFyYW1zID0gY2hhcnRQYXJhbXMgfHwgdGhpcy5zdGF0ZS5jaGFydFBhcmFtcztcclxuICAgIGlmIChmaW5hbFBhcmFtcy50eXBlID09PSBcImJveHBsb3RcIikge1xyXG4gICAgICBjb25zdCB7IGRldGFpbHMsIGRldGFpbENvZGUgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIGNoYXJ0OiA8RGV0YWlsc0JveHBsb3QgZGV0YWlscz17ZGV0YWlsc30gLz4sXHJcbiAgICAgICAgY29kZTogZGV0YWlsQ29kZSxcclxuICAgICAgICBxdWVyeTogbnVsbCxcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBwcm9wYWdhdGVTdGF0ZSA9IHN0YXRlID0+IHRoaXMuc2V0U3RhdGUoc3RhdGUpO1xyXG4gICAgICBjb25zdCBwcm9wcyA9IHtcclxuICAgICAgICBjaGFydERhdGE6IHsgc2VsZWN0ZWRDb2w6IHRoaXMucHJvcHMuY29sIH0sXHJcbiAgICAgICAgaGVpZ2h0OiA0MDAsXHJcbiAgICAgICAgZGF0YUlkOiB0aGlzLnByb3BzLmRhdGFJZCxcclxuICAgICAgfTtcclxuICAgICAgZGF0YUxvYWRlcihwcm9wcywgdGhpcy5zdGF0ZSwgcHJvcGFnYXRlU3RhdGUsIGZpbmFsUGFyYW1zKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgZGV0YWlscyB9ID0gdGhpcy5wcm9wcztcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxSZWFjdC5GcmFnbWVudD5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtMTJcIj5cclxuICAgICAgICAgICAgPERlc2NyaWJlRmlsdGVyc1xyXG4gICAgICAgICAgICAgIHsuLi5fLnBpY2sodGhpcy5zdGF0ZSwgW1widHlwZVwiLCBcImNvbHNcIiwgXCJkdHlwZVwiLCBcImNvZGVcIiwgXCJ0b3BcIl0pfVxyXG4gICAgICAgICAgICAgIGNoYXJ0VHlwZT17dGhpcy5zdGF0ZS50eXBlfVxyXG4gICAgICAgICAgICAgIHNlbGVjdGVkQ29sPXt0aGlzLnByb3BzLmNvbH1cclxuICAgICAgICAgICAgICBidWlsZENoYXJ0PXt0aGlzLmJ1aWxkQ2hhcnR9XHJcbiAgICAgICAgICAgICAgZGV0YWlscz17ZGV0YWlsc31cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIHt0aGlzLnN0YXRlLmNoYXJ0fVxyXG4gICAgICA8L1JlYWN0LkZyYWdtZW50PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuRGV0YWlsc0NoYXJ0cy5kaXNwbGF5TmFtZSA9IFwiRGV0YWlsc0NoYXJ0c1wiO1xyXG5EZXRhaWxzQ2hhcnRzLnByb3BUeXBlcyA9IHtcclxuICBkZXRhaWxzOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gIGRldGFpbENvZGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgY29sczogUHJvcFR5cGVzLmFycmF5LFxyXG4gIGR0eXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIGNvbDogUHJvcFR5cGVzLnN0cmluZyxcclxuICBkYXRhSWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEZXRhaWxzQ2hhcnRzO1xyXG4iLCJ2YXIgYXBpID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIik7XG4gICAgICAgICAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTYtMSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvc3JjL2luZGV4LmpzPz9yZWYtLTYtMiEuL0R0eXBlc0dyaWQuY3NzXCIpO1xuXG4gICAgICAgICAgICBjb250ZW50ID0gY29udGVudC5fX2VzTW9kdWxlID8gY29udGVudC5kZWZhdWx0IDogY29udGVudDtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgICAgICB9XG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuaW5zZXJ0ID0gXCJoZWFkXCI7XG5vcHRpb25zLnNpbmdsZXRvbiA9IGZhbHNlO1xuXG52YXIgdXBkYXRlID0gYXBpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cbmlmIChtb2R1bGUuaG90KSB7XG4gIGlmICghY29udGVudC5sb2NhbHMgfHwgbW9kdWxlLmhvdC5pbnZhbGlkYXRlKSB7XG4gICAgdmFyIGlzRXF1YWxMb2NhbHMgPSBmdW5jdGlvbiBpc0VxdWFsTG9jYWxzKGEsIGIpIHtcbiAgaWYgKCFhICYmIGIgfHwgYSAmJiAhYikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBwO1xuXG4gIGZvciAocCBpbiBhKSB7XG4gICAgaWYgKGFbcF0gIT09IGJbcF0pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmb3IgKHAgaW4gYikge1xuICAgIGlmICghYVtwXSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcbiAgICB2YXIgb2xkTG9jYWxzID0gY29udGVudC5sb2NhbHM7XG5cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcbiAgICAgIFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS02LTEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcz8/cmVmLS02LTIhLi9EdHlwZXNHcmlkLmNzc1wiLFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tNi0xIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanM/P3JlZi0tNi0yIS4vRHR5cGVzR3JpZC5jc3NcIik7XG5cbiAgICAgICAgICAgICAgY29udGVudCA9IGNvbnRlbnQuX19lc01vZHVsZSA/IGNvbnRlbnQuZGVmYXVsdCA6IGNvbnRlbnQ7XG5cbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICghaXNFcXVhbExvY2FscyhvbGRMb2NhbHMsIGNvbnRlbnQubG9jYWxzKSkge1xuICAgICAgICAgICAgICAgIG1vZHVsZS5ob3QuaW52YWxpZGF0ZSgpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgb2xkTG9jYWxzID0gY29udGVudC5sb2NhbHM7XG5cbiAgICAgICAgICAgICAgdXBkYXRlKGNvbnRlbnQpO1xuICAgICAgfVxuICAgIClcbiAgfVxuXG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHtcbiAgICB1cGRhdGUoKTtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307IiwiaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IEF1dG9TaXplciBmcm9tIFwicmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9BdXRvU2l6ZXJcIjtcclxuaW1wb3J0IENvbHVtbiBmcm9tIFwicmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9UYWJsZS9Db2x1bW5cIjtcclxuaW1wb3J0IFRhYmxlIGZyb20gXCJyZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL1RhYmxlL1RhYmxlXCI7XHJcblxyXG5pbXBvcnQgeyBleHBvcnRzIGFzIGd1IH0gZnJvbSBcIi4uLy4uL2R0YWxlL2dyaWRVdGlsc1wiO1xyXG5cclxucmVxdWlyZShcIi4vRHR5cGVzR3JpZC5jc3NcIik7XHJcblxyXG5jbGFzcyBTb3J0SW5kaWNhdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IHNvcnREaXJlY3Rpb24sIHNvcnRCeSwgZGF0YUtleSB9ID0gdGhpcy5wcm9wcztcclxuICAgIGlmIChzb3J0QnkgIT09IGRhdGFLZXkgfHwgXy5pc051bGwoc29ydERpcmVjdGlvbikpIHtcclxuICAgICAgcmV0dXJuIDxzdmcgd2lkdGg9ezE4fSBoZWlnaHQ9ezE4fSBzdHlsZT17eyB2ZXJ0aWNhbEFsaWduOiBcImJvdHRvbVwiIH19IC8+O1xyXG4gICAgfVxyXG4gICAgY29uc3QgY2xhc3NOYW1lID0gYFJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19zb3J0YWJsZUhlYWRlckljb24tLSR7c29ydERpcmVjdGlvbn1gO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHN2Z1xyXG4gICAgICAgIGNsYXNzTmFtZT17YFJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19zb3J0YWJsZUhlYWRlckljb24gJHtjbGFzc05hbWV9YH1cclxuICAgICAgICB3aWR0aD17MTh9XHJcbiAgICAgICAgaGVpZ2h0PXsxOH1cclxuICAgICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcclxuICAgICAgICBzdHlsZT17eyB2ZXJ0aWNhbEFsaWduOiBcImJvdHRvbVwiIH19PlxyXG4gICAgICAgIHtzb3J0RGlyZWN0aW9uID09PSBcIkFTQ1wiID8gPHBhdGggZD1cIk03IDE0bDUtNSA1IDV6XCIgLz4gOiA8cGF0aCBkPVwiTTcgMTBsNSA1IDUtNXpcIiAvPn1cclxuICAgICAgICA8cGF0aCBkPVwiTTAgMGgyNHYyNEgwelwiIGZpbGw9XCJub25lXCIgLz5cclxuICAgICAgPC9zdmc+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5Tb3J0SW5kaWNhdG9yLnByb3BUeXBlcyA9IHtcclxuICBzb3J0RGlyZWN0aW9uOiBQcm9wVHlwZXMub25lT2YoW1wiQVNDXCIsIFwiREVTQ1wiLCBcIk5PTkVcIl0pLFxyXG4gIHNvcnRCeTogUHJvcFR5cGVzLnN0cmluZyxcclxuICBkYXRhS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG5cclxuZnVuY3Rpb24gc29ydER0eXBlcyhkdHlwZXMsIHNvcnRCeSwgc29ydERpcmVjdGlvbikge1xyXG4gIHJldHVybiBfLm9yZGVyQnkoZHR5cGVzLCBbc29ydEJ5XSwgW3NvcnREaXJlY3Rpb24udG9Mb3dlckNhc2UoKV0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBidWlsZFNvcnREdHlwZXNTdGF0ZShzdGF0ZSwgeyBzb3J0RGlyZWN0aW9uLCBzb3J0QnkgfSkge1xyXG4gIGxldCBmaW5hbFNvcnQgPSBzb3J0RGlyZWN0aW9uO1xyXG4gIGlmIChzb3J0QnkgPT0gc3RhdGUuc29ydEJ5ICYmIHN0YXRlLnNvcnREaXJlY3Rpb24gPT09IFwiREVTQ1wiKSB7XHJcbiAgICBmaW5hbFNvcnQgPSBcIk5PTkVcIjtcclxuICB9XHJcbiAgaWYgKGZpbmFsU29ydCA9PT0gXCJOT05FXCIpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGR0eXBlczogc29ydER0eXBlcyhzdGF0ZS5kdHlwZXMsIFwiaW5kZXhcIiwgXCJBU0NcIiksXHJcbiAgICAgIHNvcnREaXJlY3Rpb246IGZpbmFsU29ydCxcclxuICAgICAgc29ydEJ5LFxyXG4gICAgfTtcclxuICB9XHJcbiAgcmV0dXJuIHtcclxuICAgIGR0eXBlczogc29ydER0eXBlcyhzdGF0ZS5kdHlwZXMsIHNvcnRCeSwgc29ydERpcmVjdGlvbiksXHJcbiAgICBzb3J0RGlyZWN0aW9uOiBmaW5hbFNvcnQsXHJcbiAgICBzb3J0QnksXHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmlsdGVyRHR5cGVzKHsgZHR5cGVzLCBkdHlwZXNGaWx0ZXIsIHNvcnREaXJlY3Rpb24sIHNvcnRCeSB9KSB7XHJcbiAgbGV0IGZpbHRlcmVkRHR5cGVzID0gZHR5cGVzO1xyXG4gIGlmIChkdHlwZXNGaWx0ZXIpIHtcclxuICAgIGNvbnN0IHN1YnN0ckxvd2VyID0gZHR5cGVzRmlsdGVyLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBmaWx0ZXJlZER0eXBlcyA9IF8uZmlsdGVyKGR0eXBlcywgKHsgbmFtZSB9KSA9PiBfLmluY2x1ZGVzKG5hbWUudG9Mb3dlckNhc2UoKSwgc3Vic3RyTG93ZXIpKTtcclxuICB9XHJcbiAgcmV0dXJuIHNvcnREdHlwZXMoZmlsdGVyZWREdHlwZXMsIHNvcnRCeSwgc29ydERpcmVjdGlvbik7XHJcbn1cclxuXHJcbmNsYXNzIER0eXBlc0dyaWQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBkdHlwZXM6IHByb3BzLmR0eXBlcyxcclxuICAgICAgZHR5cGVzRmlsdGVyOiBudWxsLFxyXG4gICAgICBzb3J0Qnk6IG51bGwsXHJcbiAgICAgIHNvcnREaXJlY3Rpb246IFwiTk9ORVwiLFxyXG4gICAgICBhbGxWaXNpYmxlOiBndS5ub0hpZGRlbihwcm9wcy5kdHlwZXMpLFxyXG4gICAgfTtcclxuICAgIHRoaXMuX2hlYWRlclJlbmRlcmVyID0gdGhpcy5faGVhZGVyUmVuZGVyZXIuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuX3Jvd0NsYXNzID0gdGhpcy5fcm93Q2xhc3MuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShfbmV3UHJvcHMsIG5ld1N0YXRlKSB7XHJcbiAgICByZXR1cm4gIV8uaXNFcXVhbCh0aGlzLnN0YXRlLCBuZXdTdGF0ZSk7XHJcbiAgfVxyXG5cclxuICBfaGVhZGVyUmVuZGVyZXIoeyBkYXRhS2V5LCBsYWJlbCwgc29ydEJ5LCBzb3J0RGlyZWN0aW9uIH0pIHtcclxuICAgIGlmIChkYXRhS2V5ID09PSBcInZpc2libGVcIikge1xyXG4gICAgICBjb25zdCB7IGFsbFZpc2libGUgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgIGNvbnN0IG9uQ2xpY2sgPSBlID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgIGR0eXBlczogXy5tYXAodGhpcy5zdGF0ZS5kdHlwZXMsIGQgPT4gXy5hc3NpZ24oe30sIGQsIHsgdmlzaWJsZTogIWFsbFZpc2libGUgfSkpLFxyXG4gICAgICAgICAgYWxsVmlzaWJsZTogIWFsbFZpc2libGUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgfTtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlckNlbGwgcG9pbnRlclwiIG9uQ2xpY2s9e29uQ2xpY2t9PlxyXG4gICAgICAgICAge2xhYmVsfVxyXG4gICAgICAgICAgPGkgY2xhc3NOYW1lPXtgaWNvLWNoZWNrLWJveCR7YWxsVmlzaWJsZSA/IFwiXCIgOiBcIi1vdXRsaW5lLWJsYW5rXCJ9YH0gb25DbGljaz17b25DbGlja30gLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGxldCBmaWx0ZXJNYXJrdXAgPSBudWxsO1xyXG4gICAgaWYgKGRhdGFLZXkgPT09IFwibmFtZVwiKSB7XHJcbiAgICAgIGNvbnN0IGZpbHRlciA9IGUgPT4gdGhpcy5zZXRTdGF0ZSh7IGR0eXBlc0ZpbHRlcjogZS50YXJnZXQudmFsdWUgfSk7XHJcbiAgICAgIGNvbnN0IG9uQ2xpY2sgPSBlID0+IGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIGZpbHRlck1hcmt1cCA9IChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiIG9uQ2xpY2s9e29uQ2xpY2t9PlxyXG4gICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgb25DbGljaz17b25DbGlja31cclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0xMDBcIlxyXG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5kdHlwZXNGaWx0ZXIgfHwgXCJcIn1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e2ZpbHRlcn1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGtleT17MH0gY2xhc3NOYW1lPVwiaGVhZGVyQ2VsbCBmaWx0ZXJhYmxlXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLWF1dG9cIj5cclxuICAgICAgICAgICAge2xhYmVsfVxyXG4gICAgICAgICAgICA8U29ydEluZGljYXRvciB7Li4ueyBkYXRhS2V5LCBzb3J0QnksIHNvcnREaXJlY3Rpb24gfX0gLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAge2ZpbHRlck1hcmt1cH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgX3Jvd0NsYXNzKHsgaW5kZXggfSkge1xyXG4gICAgaWYgKF8uZ2V0KHRoaXMuc3RhdGUuZHR5cGVzLCBbaW5kZXgsIFwic2VsZWN0ZWRcIl0sIGZhbHNlKSkge1xyXG4gICAgICByZXR1cm4gXCJkdHlwZS1yb3ctc2VsZWN0ZWRcIjtcclxuICAgIH1cclxuICAgIHJldHVybiBcImR0eXBlLXJvd1wiO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgaWYgKCFfLmlzRW1wdHkodGhpcy5zdGF0ZS5lcnJvcikpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuZXJyb3I7XHJcbiAgICB9XHJcbiAgICBjb25zdCB7IHNvcnRCeSwgc29ydERpcmVjdGlvbiB9ID0gdGhpcy5zdGF0ZTtcclxuICAgIGNvbnN0IHRvZ2dsZVZpc2liaWxpdHkgPSAoeyBuYW1lLCB2aXNpYmxlIH0pID0+IGUgPT4ge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICBkdHlwZXM6IF8ubWFwKHRoaXMuc3RhdGUuZHR5cGVzLCBkID0+IHtcclxuICAgICAgICAgIGlmIChkLm5hbWUgPT09IG5hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF8uYXNzaWduKHt9LCBkLCB7IHZpc2libGU6ICF2aXNpYmxlIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgfSksXHJcbiAgICAgIH0pO1xyXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IGN1cnJEdHlwZXMgPSBmaWx0ZXJEdHlwZXModGhpcy5zdGF0ZSk7XHJcbiAgICBjb25zdCByb3dDbGljayA9ICh7IHJvd0RhdGEgfSkgPT5cclxuICAgICAgdGhpcy5zZXRTdGF0ZShcclxuICAgICAgICB7XHJcbiAgICAgICAgICBkdHlwZXM6IF8ubWFwKHRoaXMuc3RhdGUuZHR5cGVzLCBkID0+IF8uYXNzaWduKHt9LCBkLCB7IHNlbGVjdGVkOiBkLm5hbWUgPT09IHJvd0RhdGEubmFtZSB9KSksXHJcbiAgICAgICAgfSxcclxuICAgICAgICAoKSA9PiB0aGlzLnByb3BzLnByb3BhZ2F0ZVN0YXRlKHsgc2VsZWN0ZWQ6IHJvd0RhdGEgfSlcclxuICAgICAgKTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxBdXRvU2l6ZXI+XHJcbiAgICAgICAgeyh7IGhlaWdodCwgd2lkdGggfSkgPT4gKFxyXG4gICAgICAgICAgPFRhYmxlXHJcbiAgICAgICAgICAgIGhlYWRlckhlaWdodD17NDB9XHJcbiAgICAgICAgICAgIGhlaWdodD17aGVpZ2h0IDwgNDAwID8gNDAwIDogaGVpZ2h0fVxyXG4gICAgICAgICAgICBvdmVyc2NhblJvd0NvdW50PXsxMH1cclxuICAgICAgICAgICAgcm93U3R5bGU9e3sgZGlzcGxheTogXCJmbGV4XCIgfX1cclxuICAgICAgICAgICAgcm93SGVpZ2h0PXtndS5ST1dfSEVJR0hUfVxyXG4gICAgICAgICAgICByb3dHZXR0ZXI9eyh7IGluZGV4IH0pID0+IGN1cnJEdHlwZXNbaW5kZXhdfVxyXG4gICAgICAgICAgICByb3dDb3VudD17Xy5zaXplKGN1cnJEdHlwZXMpfVxyXG4gICAgICAgICAgICByb3dDbGFzc05hbWU9e3RoaXMuX3Jvd0NsYXNzfVxyXG4gICAgICAgICAgICBzb3J0PXtzdGF0ZSA9PiB0aGlzLnNldFN0YXRlKGJ1aWxkU29ydER0eXBlc1N0YXRlKHRoaXMuc3RhdGUsIHN0YXRlKSl9XHJcbiAgICAgICAgICAgIHNvcnRCeT17c29ydEJ5fVxyXG4gICAgICAgICAgICBzb3J0RGlyZWN0aW9uPXtzb3J0RGlyZWN0aW9uID09PSBcIk5PTkVcIiA/IG51bGwgOiBzb3J0RGlyZWN0aW9ufVxyXG4gICAgICAgICAgICB3aWR0aD17d2lkdGh9XHJcbiAgICAgICAgICAgIG9uUm93Q2xpY2s9e3Jvd0NsaWNrfVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJkdHlwZXNcIj5cclxuICAgICAgICAgICAgPENvbHVtblxyXG4gICAgICAgICAgICAgIGRhdGFLZXk9XCJpbmRleFwiXHJcbiAgICAgICAgICAgICAgbGFiZWw9XCIjXCJcclxuICAgICAgICAgICAgICBoZWFkZXJSZW5kZXJlcj17dGhpcy5faGVhZGVyUmVuZGVyZXJ9XHJcbiAgICAgICAgICAgICAgd2lkdGg9ezM1fVxyXG4gICAgICAgICAgICAgIHN0eWxlPXt7IHRleHRBbGlnbjogXCJjZW50ZXJcIiB9fVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImNlbGxcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8Q29sdW1uXHJcbiAgICAgICAgICAgICAgZGF0YUtleT1cInZpc2libGVcIlxyXG4gICAgICAgICAgICAgIGxhYmVsPVwiVmlzaWJsZVwiXHJcbiAgICAgICAgICAgICAgaGVhZGVyUmVuZGVyZXI9e3RoaXMuX2hlYWRlclJlbmRlcmVyfVxyXG4gICAgICAgICAgICAgIHdpZHRoPXs2MH1cclxuICAgICAgICAgICAgICBzdHlsZT17eyB0ZXh0QWxpZ246IFwibGVmdFwiLCBwYWRkaW5nTGVmdDogXCIuNWVtXCIgfX1cclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjZWxsXCJcclxuICAgICAgICAgICAgICBjZWxsUmVuZGVyZXI9eyh7IHJvd0RhdGEgfSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBvbkNsaWNrPXt0b2dnbGVWaXNpYmlsaXR5KHJvd0RhdGEpfSBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBwb2ludGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT17YGljby1jaGVjay1ib3gke3Jvd0RhdGEudmlzaWJsZSA/IFwiXCIgOiBcIi1vdXRsaW5lLWJsYW5rXCJ9YH0gLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxDb2x1bW5cclxuICAgICAgICAgICAgICBkYXRhS2V5PVwibmFtZVwiXHJcbiAgICAgICAgICAgICAgbGFiZWw9XCJDb2x1bW4gTmFtZVwiXHJcbiAgICAgICAgICAgICAgaGVhZGVyUmVuZGVyZXI9e3RoaXMuX2hlYWRlclJlbmRlcmVyfVxyXG4gICAgICAgICAgICAgIHdpZHRoPXsyMDB9XHJcbiAgICAgICAgICAgICAgZmxleEdyb3c9ezF9XHJcbiAgICAgICAgICAgICAgc3R5bGU9e3sgdGV4dEFsaWduOiBcImxlZnRcIiwgcGFkZGluZ0xlZnQ6IFwiLjVlbVwiIH19XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY2VsbFwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIHs8Q29sdW1uXHJcbiAgICAgICAgICAgICAgd2lkdGg9ezEwMH1cclxuICAgICAgICAgICAgICBkYXRhS2V5PVwiZHR5cGVcIlxyXG4gICAgICAgICAgICAgIGxhYmVsPVwiRGF0YSBUeXBlXCJcclxuICAgICAgICAgICAgICBoZWFkZXJSZW5kZXJlcj17dGhpcy5faGVhZGVyUmVuZGVyZXJ9XHJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjogXCJyaWdodFwiLFxyXG4gICAgICAgICAgICAgICAgcGFkZGluZ0xlZnQ6IFwiLjVlbVwiLFxyXG4gICAgICAgICAgICAgICAgcGFkZGluZ1RvcDogXCIuMzVlbVwiLFxyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6IFwiODAlXCIsXHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjZWxsXCJcclxuICAgICAgICAgICAgLz59XHJcbiAgICAgICAgICA8L1RhYmxlPlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvQXV0b1NpemVyPlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuRHR5cGVzR3JpZC5kaXNwbGF5TmFtZSA9IFwiRHR5cGVzR3JpZFwiO1xyXG5EdHlwZXNHcmlkLnByb3BUeXBlcyA9IHtcclxuICBkdHlwZXM6IFByb3BUeXBlcy5hcnJheSxcclxuICBwcm9wYWdhdGVTdGF0ZTogUHJvcFR5cGVzLmZ1bmMsXHJcbn07XHJcblxyXG5leHBvcnQgeyBEdHlwZXNHcmlkIH07Il0sInNvdXJjZVJvb3QiOiIifQ==