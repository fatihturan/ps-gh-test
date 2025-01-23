webpackHotUpdate("main",{

/***/ "./static/popups/Correlations.jsx":
/*!****************************************!*\
  !*** ./static/popups/Correlations.jsx ***!
  \****************************************/
/*! exports provided: Correlations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Correlations", function() { return Correlations; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Bouncer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Bouncer */ "./static/Bouncer.jsx");
/* harmony import */ var _ConditionalRender__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ConditionalRender */ "./static/ConditionalRender.jsx");
/* harmony import */ var _RemovableError__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../RemovableError */ "./static/RemovableError.jsx");
/* harmony import */ var _actions_url_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../actions/url-utils */ "./static/actions/url-utils.js");
/* harmony import */ var _chartUtils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../chartUtils */ "./static/chartUtils.jsx");
/* harmony import */ var _fetcher__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../fetcher */ "./static/fetcher.js");
/* harmony import */ var _popups_Filter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../popups/Filter */ "./static/popups/Filter.jsx");
/* harmony import */ var _toggleUtils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../toggleUtils */ "./static/toggleUtils.js");
/* harmony import */ var _charts_ChartsBody__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./charts/ChartsBody */ "./static/popups/charts/ChartsBody.jsx");
/* harmony import */ var _correlations_CorrelationScatterStats__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./correlations/CorrelationScatterStats */ "./static/popups/correlations/CorrelationScatterStats.jsx");
/* harmony import */ var _correlations_CorrelationsGrid__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./correlations/CorrelationsGrid */ "./static/popups/correlations/CorrelationsGrid.jsx");
/* harmony import */ var _correlations_CorrelationsTsOptions__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./correlations/CorrelationsTsOptions */ "./static/popups/correlations/CorrelationsTsOptions.jsx");
/* harmony import */ var _correlations_correlationsUtils__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./correlations/correlationsUtils */ "./static/popups/correlations/correlationsUtils.jsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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


















var Correlations = /*#__PURE__*/function (_React$Component) {
  _inherits(Correlations, _React$Component);

  var _super = _createSuper(Correlations);

  function Correlations(props) {
    var _this;

    _classCallCheck(this, Correlations);

    _this = _super.call(this, props);
    _this.state = _correlations_correlationsUtils__WEBPACK_IMPORTED_MODULE_15__["default"].buildState();

    lodash__WEBPACK_IMPORTED_MODULE_0___default.a.forEach(["buildTs", "buildScatter", "viewScatter", "viewScatterRow"], function (f) {
      return _this[f] = _this[f].bind(_assertThisInitialized(_this));
    });

    return _this;
  }

  _createClass(Correlations, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(newProps, newState) {
      if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isEqual(this.props, newProps)) {
        return true;
      }

      var stateProps = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.concat(["error", "scatterError", "stats", "correlations", "selectedCols", "selectedDate", "window", "minPeriods"], ["useRolling"]);

      if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isEqual(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.pick(this.state, stateProps), lodash__WEBPACK_IMPORTED_MODULE_0___default.a.pick(newState, stateProps))) {
        return true;
      }

      if (this.state.chart != newState.chart) {
        // Don't re-render if we've only changed the chart.
        return false;
      }

      return false; // Otherwise, use the default react behaviour.
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      Object(_fetcher__WEBPACK_IMPORTED_MODULE_8__["fetchJson"])(Object(_actions_url_utils__WEBPACK_IMPORTED_MODULE_6__["buildURL"])("".concat(_correlations_correlationsUtils__WEBPACK_IMPORTED_MODULE_15__["default"].BASE_CORRELATIONS_URL, "/").concat(this.props.dataId), this.props.chartData, ["query"]), function (gridData) {
        if (gridData.error) {
          _this2.setState({
            error: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_RemovableError__WEBPACK_IMPORTED_MODULE_5__["RemovableError"], gridData)
          });

          return;
        }

        var data = gridData.data,
            dates = gridData.dates,
            code = gridData.code;

        var columns = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(data, "column");

        var rolling = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(dates, "0.rolling", false);

        var state = {
          correlations: data,
          columns: columns,
          dates: dates,
          hasDate: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.size(dates) > 0,
          selectedDate: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(dates, "0.name", null),
          rolling: rolling,
          gridCode: code
        };

        _this2.setState(state, function () {
          var _ref = _this2.props.chartData || {},
              col1 = _ref.col1,
              col2 = _ref.col2;

          if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isUndefined(col1)) {
            if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isUndefined(col2)) {
              var _$take = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.take(columns, 2);

              var _$take2 = _slicedToArray(_$take, 2);

              col1 = _$take2[0];
              col2 = _$take2[1];
            } else {
              col1 = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(columns, function (c) {
                return c !== col2;
              });
            }
          } else if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isUndefined(col2)) {
            col2 = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(columns, function (c) {
              return c !== col1;
            });
          }

          if (col1 && col2) {
            if (state.hasDate) {
              if (rolling) {
                _this2.buildTs([col1, col2], state.selectedDate, true, true);
              } else {
                _this2.buildTs([col1, col2], state.selectedDate, false, _this2.state.useRolling);
              }
            } else {
              _this2.buildScatter([col1, col2]);
            }
          }
        });
      });
    }
  }, {
    key: "buildTs",
    value: function buildTs(selectedCols, selectedDate, rolling, useRolling) {
      var window = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var minPeriods = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

      var query = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(this.props, "chartData.query");

      var path = "".concat(_correlations_correlationsUtils__WEBPACK_IMPORTED_MODULE_15__["default"].BASE_CORRELATIONS_TS_URL, "/").concat(this.props.dataId);
      var urlParams = {
        query: query,
        selectedCols: selectedCols,
        dateCol: selectedDate,
        rolling: rolling
      };

      if (useRolling) {
        urlParams = _objectSpread(_objectSpread({}, urlParams), {}, {
          rollingWindow: window !== null && window !== void 0 ? window : this.state.window,
          minPeriods: minPeriods !== null && minPeriods !== void 0 ? minPeriods : this.state.minPeriods
        });
      }

      var tsUrl = Object(_actions_url_utils__WEBPACK_IMPORTED_MODULE_6__["buildURL"])(path, urlParams, ["query", "selectedCols", "dateCol", "rolling", "rollingWindow", "minPeriods"]);
      var updatedState = {
        selectedCols: selectedCols,
        selectedDate: selectedDate,
        tsUrl: tsUrl,
        rolling: rolling,
        useRolling: useRolling
      };

      if (useRolling && !lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isNull(window)) {
        updatedState.window = window;
      }

      if (useRolling && !lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isNull(minPeriods)) {
        updatedState.minPeriods = minPeriods;
      }

      this.setState(updatedState);
    }
  }, {
    key: "viewScatterRow",
    value: function viewScatterRow(evt) {
      var point = this.state.chart.getElementAtEvent(evt);

      if (point) {
        var data = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(point, ["0", "_chart", "config", "data", "datasets", point[0]._datasetIndex, "data"]);

        if (data) {
          var index = data[point[0]._index].index;
          var updatedQuery = this.props.chartData.query;

          if (updatedQuery) {
            updatedQuery = [updatedQuery, "index == ".concat(index)];
          } else {
            updatedQuery = ["index == ".concat(index)];
          }

          Object(_popups_Filter__WEBPACK_IMPORTED_MODULE_9__["saveFilter"])(this.props.dataId, lodash__WEBPACK_IMPORTED_MODULE_0___default.a.join(updatedQuery, " and "), function () {
            window.opener.location.reload();
          });
        }
      }
    }
  }, {
    key: "buildScatter",
    value: function buildScatter(selectedCols) {
      var _this3 = this;

      var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var tsCode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var params = {
        selectedCols: selectedCols,
        query: this.props.chartData.query
      };

      if (date) {
        params.dateCol = this.state.selectedDate;
        params.date = date;
      }

      if (this.state.rolling) {
        params.rolling = this.state.rolling;
        params.window = this.state.window;
      }

      var path = "".concat(_correlations_correlationsUtils__WEBPACK_IMPORTED_MODULE_15__["default"].BASE_SCATTER_URL, "/").concat(this.props.dataId);
      var scatterUrl = Object(_actions_url_utils__WEBPACK_IMPORTED_MODULE_6__["buildURL"])(path, params, ["selectedCols", "query", "date", "dateCol", "rolling", "window"]);

      if (this.state.scatterUrl === scatterUrl) {
        return;
      }

      Object(_toggleUtils__WEBPACK_IMPORTED_MODULE_10__["toggleBouncer"])(["scatter-bouncer", "rawScatterChart"]);
      Object(_fetcher__WEBPACK_IMPORTED_MODULE_8__["fetchJson"])(scatterUrl, function (fetchedChartData) {
        Object(_toggleUtils__WEBPACK_IMPORTED_MODULE_10__["toggleBouncer"])(["scatter-bouncer", "rawScatterChart"]);
        var newState = {
          selectedCols: selectedCols,
          stats: fetchedChartData.stats,
          date: date,
          scatterError: null,
          scatterUrl: scatterUrl,
          scatterCode: fetchedChartData.code
        };

        if (tsCode) {
          newState.tsCode = tsCode;
        }

        if (fetchedChartData.error) {
          newState.scatterError = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_RemovableError__WEBPACK_IMPORTED_MODULE_5__["RemovableError"], fetchedChartData);

          _this3.setState(newState);

          return;
        }

        var builder = function builder(ctx) {
          if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(fetchedChartData, "data.all.x", []).length) {
            return null;
          }

          var x = fetchedChartData.x,
              y = fetchedChartData.y;
          return _correlations_correlationsUtils__WEBPACK_IMPORTED_MODULE_15__["default"].createScatter(ctx, fetchedChartData, x, y, _this3.viewScatterRow);
        };

        newState.chart = _chartUtils__WEBPACK_IMPORTED_MODULE_7__["default"].chartWrapper("rawScatterChart", _this3.state.chart, builder);

        _this3.setState(newState);
      });
    }
  }, {
    key: "viewScatter",
    value: function viewScatter(evt) {
      var chart = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(this, "_ts_chart.state.charts.0");

      if (chart) {
        var selectedPoint = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.head(chart.getElementsAtXAxis(evt));

        if (selectedPoint) {
          chart.getDatasetMeta(0).controller._config.selectedPoint = selectedPoint._index;
          var selectedCols = this.state.selectedCols;
          this.buildScatter(selectedCols, chart.data.labels[selectedPoint._index]);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      if (this.state.error) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          key: "body",
          className: "modal-body scatter-body"
        }, this.state.error);
      }

      var _this$state = this.state,
          selectedCols = _this$state.selectedCols,
          tsUrl = _this$state.tsUrl,
          hasDate = _this$state.hasDate;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        key: "body",
        className: "modal-body scatter-body"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_correlations_CorrelationsGrid__WEBPACK_IMPORTED_MODULE_13__["default"], _extends({
        buildTs: this.buildTs,
        buildScatter: this.buildScatter,
        selectedCols: selectedCols
      }, this.state)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ConditionalRender__WEBPACK_IMPORTED_MODULE_4__["default"], {
        display: !lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isEmpty(selectedCols) && hasDate
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_correlations_CorrelationsTsOptions__WEBPACK_IMPORTED_MODULE_14__["default"], _extends({}, this.state, {
        buildTs: this.buildTs
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_charts_ChartsBody__WEBPACK_IMPORTED_MODULE_11__["default"], {
        ref: function ref(r) {
          return _this4._ts_chart = r;
        },
        visible: true,
        url: tsUrl,
        columns: [{
          name: "x",
          dtype: "datetime[ns]"
        }, {
          name: "corr",
          dtype: "float64"
        }],
        x: {
          value: "x"
        },
        y: [{
          value: "corr"
        }],
        configHandler: function configHandler(config) {
          config.options.scales.yAxes = [{
            ticks: {
              min: -1.1,
              max: 1.1,
              stepSize: 0.2
            },
            afterTickToLabelConversion: function afterTickToLabelConversion(data) {
              data.ticks[0] = null;
              data.ticks[data.ticks.length - 1] = null;
            },
            id: "y-corr"
          }];
          config.options.onClick = _this4.viewScatter;
          config.options.legend = {
            display: false
          };
          config.plugins = [_chartUtils__WEBPACK_IMPORTED_MODULE_7__["default"].gradientLinePlugin(_correlations_correlationsUtils__WEBPACK_IMPORTED_MODULE_15__["default"].colorScale, "y-corr", -1, 1), _chartUtils__WEBPACK_IMPORTED_MODULE_7__["default"].lineHoverPlugin(_correlations_correlationsUtils__WEBPACK_IMPORTED_MODULE_15__["default"].colorScale)];
          config.data.datasets[0].selectedPoint = 0;
          return config;
        },
        height: 300,
        showControls: false,
        dataLoadCallback: function dataLoadCallback(data) {
          var selectedDate = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(data || {}, "data.all.x.0");

          var tsCode = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(data, "code", "");

          if (selectedDate) {
            _this4.buildScatter(_this4.state.selectedCols, selectedDate, tsCode);
          } else {
            _this4.setState({
              tsCode: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(data, "code", "")
            });
          }
        }
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_correlations_CorrelationScatterStats__WEBPACK_IMPORTED_MODULE_12__["default"], this.state), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("figure", null, this.state.scatterError, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ConditionalRender__WEBPACK_IMPORTED_MODULE_4__["default"], {
        display: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isEmpty(this.state.scatterError)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "chart-wrapper",
        style: {
          height: 400
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        id: "scatter-bouncer",
        style: {
          display: "none"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Bouncer__WEBPACK_IMPORTED_MODULE_3__["Bouncer"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("canvas", {
        id: "rawScatterChart"
      })))));
    }
  }]);

  return Correlations;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);
/* Correlations.displayName = "Correlations"; */


Correlations.displayName = "";
Correlations.propTypes = {
  dataId: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  chartData: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    visible: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,
    query: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
    title: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
    col1: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
    col2: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
  }),
  propagateState: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
};


/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdGF0aWMvcG9wdXBzL0NvcnJlbGF0aW9ucy5qc3giXSwibmFtZXMiOlsiQ29ycmVsYXRpb25zIiwicHJvcHMiLCJzdGF0ZSIsImNvcnJVdGlscyIsImJ1aWxkU3RhdGUiLCJfIiwiZm9yRWFjaCIsImYiLCJiaW5kIiwibmV3UHJvcHMiLCJuZXdTdGF0ZSIsImlzRXF1YWwiLCJzdGF0ZVByb3BzIiwiY29uY2F0IiwicGljayIsImNoYXJ0IiwiZmV0Y2hKc29uIiwiYnVpbGRVUkwiLCJCQVNFX0NPUlJFTEFUSU9OU19VUkwiLCJkYXRhSWQiLCJjaGFydERhdGEiLCJncmlkRGF0YSIsImVycm9yIiwic2V0U3RhdGUiLCJkYXRhIiwiZGF0ZXMiLCJjb2RlIiwiY29sdW1ucyIsIm1hcCIsInJvbGxpbmciLCJnZXQiLCJjb3JyZWxhdGlvbnMiLCJoYXNEYXRlIiwic2l6ZSIsInNlbGVjdGVkRGF0ZSIsImdyaWRDb2RlIiwiY29sMSIsImNvbDIiLCJpc1VuZGVmaW5lZCIsInRha2UiLCJmaW5kIiwiYyIsImJ1aWxkVHMiLCJ1c2VSb2xsaW5nIiwiYnVpbGRTY2F0dGVyIiwic2VsZWN0ZWRDb2xzIiwid2luZG93IiwibWluUGVyaW9kcyIsInF1ZXJ5IiwicGF0aCIsIkJBU0VfQ09SUkVMQVRJT05TX1RTX1VSTCIsInVybFBhcmFtcyIsImRhdGVDb2wiLCJyb2xsaW5nV2luZG93IiwidHNVcmwiLCJ1cGRhdGVkU3RhdGUiLCJpc051bGwiLCJldnQiLCJwb2ludCIsImdldEVsZW1lbnRBdEV2ZW50IiwiX2RhdGFzZXRJbmRleCIsImluZGV4IiwiX2luZGV4IiwidXBkYXRlZFF1ZXJ5Iiwic2F2ZUZpbHRlciIsImpvaW4iLCJvcGVuZXIiLCJsb2NhdGlvbiIsInJlbG9hZCIsImRhdGUiLCJ0c0NvZGUiLCJwYXJhbXMiLCJCQVNFX1NDQVRURVJfVVJMIiwic2NhdHRlclVybCIsInRvZ2dsZUJvdW5jZXIiLCJmZXRjaGVkQ2hhcnREYXRhIiwic3RhdHMiLCJzY2F0dGVyRXJyb3IiLCJzY2F0dGVyQ29kZSIsImJ1aWxkZXIiLCJjdHgiLCJsZW5ndGgiLCJ4IiwieSIsImNyZWF0ZVNjYXR0ZXIiLCJ2aWV3U2NhdHRlclJvdyIsImNoYXJ0VXRpbHMiLCJjaGFydFdyYXBwZXIiLCJzZWxlY3RlZFBvaW50IiwiaGVhZCIsImdldEVsZW1lbnRzQXRYQXhpcyIsImdldERhdGFzZXRNZXRhIiwiY29udHJvbGxlciIsIl9jb25maWciLCJsYWJlbHMiLCJpc0VtcHR5IiwiciIsIl90c19jaGFydCIsIm5hbWUiLCJkdHlwZSIsInZhbHVlIiwiY29uZmlnIiwib3B0aW9ucyIsInNjYWxlcyIsInlBeGVzIiwidGlja3MiLCJtaW4iLCJtYXgiLCJzdGVwU2l6ZSIsImFmdGVyVGlja1RvTGFiZWxDb252ZXJzaW9uIiwiaWQiLCJvbkNsaWNrIiwidmlld1NjYXR0ZXIiLCJsZWdlbmQiLCJkaXNwbGF5IiwicGx1Z2lucyIsImdyYWRpZW50TGluZVBsdWdpbiIsImNvbG9yU2NhbGUiLCJsaW5lSG92ZXJQbHVnaW4iLCJkYXRhc2V0cyIsImhlaWdodCIsIlJlYWN0IiwiQ29tcG9uZW50IiwiZGlzcGxheU5hbWUiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJzdHJpbmciLCJpc1JlcXVpcmVkIiwic2hhcGUiLCJ2aXNpYmxlIiwiYm9vbCIsInRpdGxlIiwicHJvcGFnYXRlU3RhdGUiLCJmdW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRU1BLFk7Ozs7O0FBQ0osd0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7QUFDakIsOEJBQU1BLEtBQU47QUFDQSxVQUFLQyxLQUFMLEdBQWFDLHdFQUFTLENBQUNDLFVB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RUFBRTZFLGlEQUFTLENBQUNDLE1BRlE7QUFHekJLLFNBQUssRUFBRU4saURBQVMsQ0FBQ0MsTUFIUTtBQUl6QjFGLFFBQUksRUFBRXlGLGlEQUFTLENBQUNDLE1BSlM7QUFLekJ6RixRQUFJLEVBQUV3RixpREFBUyxDQUFDQztBQUxTLEdBQWhCLENBRlk7QUFTdkJNLGdCQUFjLEVBQUVQLGlEQUFTLENBQUNRO0FBVEgsQ0FBekIiLCJmaWxlIjoibWFpbi5lMzgwNTcyNWQ2OTdlYWMxMWJhZC5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmltcG9ydCB7IEJvdW5jZXIgfSBmcm9tIFwiLi4vQm91bmNlclwiO1xyXG5pbXBvcnQgQ29uZGl0aW9uYWxSZW5kZXIgZnJvbSBcIi4uL0NvbmRpdGlvbmFsUmVuZGVyXCI7XHJcbmltcG9ydCB7IFJlbW92YWJsZUVycm9yIH0gZnJvbSBcIi4uL1JlbW92YWJsZUVycm9yXCI7XHJcbmltcG9ydCB7IGJ1aWxkVVJMIH0gZnJvbSBcIi4uL2FjdGlvbnMvdXJsLXV0aWxzXCI7XHJcbmltcG9ydCBjaGFydFV0aWxzIGZyb20gXCIuLi9jaGFydFV0aWxzXCI7XHJcbmltcG9ydCB7IGZldGNoSnNvbiB9IGZyb20gXCIuLi9mZXRjaGVyXCI7XHJcbmltcG9ydCB7IHNhdmVGaWx0ZXIgfSBmcm9tIFwiLi4vcG9wdXBzL0ZpbHRlclwiO1xyXG5pbXBvcnQgeyB0b2dnbGVCb3VuY2VyIH0gZnJvbSBcIi4uL3RvZ2dsZVV0aWxzXCI7XHJcbmltcG9ydCBDaGFydHNCb2R5IGZyb20gXCIuL2NoYXJ0cy9DaGFydHNCb2R5XCI7XHJcbmltcG9ydCBDb3JyZWxhdGlvblNjYXR0ZXJTdGF0cyBmcm9tIFwiLi9jb3JyZWxhdGlvbnMvQ29ycmVsYXRpb25TY2F0dGVyU3RhdHNcIjtcclxuaW1wb3J0IENvcnJlbGF0aW9uc0dyaWQgZnJvbSBcIi4vY29ycmVsYXRpb25zL0NvcnJlbGF0aW9uc0dyaWRcIjtcclxuaW1wb3J0IENvcnJlbGF0aW9uc1RzT3B0aW9ucyBmcm9tIFwiLi9jb3JyZWxhdGlvbnMvQ29ycmVsYXRpb25zVHNPcHRpb25zXCI7XHJcbmltcG9ydCBjb3JyVXRpbHMgZnJvbSBcIi4vY29ycmVsYXRpb25zL2NvcnJlbGF0aW9uc1V0aWxzXCI7XHJcblxyXG5jbGFzcyBDb3JyZWxhdGlvbnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0gY29yclV0aWxzLmJ1aWxkU3RhdGUoKTtcclxuICAgIF8uZm9yRWFjaChbXCJidWlsZFRzXCIsIFwiYnVpbGRTY2F0dGVyXCIsIFwidmlld1NjYXR0ZXJcIiwgXCJ2aWV3U2NhdHRlclJvd1wiXSwgZiA9PiAodGhpc1tmXSA9IHRoaXNbZl0uYmluZCh0aGlzKSkpO1xyXG4gIH1cclxuXHJcbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5ld1Byb3BzLCBuZXdTdGF0ZSkge1xyXG4gICAgaWYgKCFfLmlzRXF1YWwodGhpcy5wcm9wcywgbmV3UHJvcHMpKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgc3RhdGVQcm9wcyA9IF8uY29uY2F0KFxyXG4gICAgICBbXCJlcnJvclwiLCBcInNjYXR0ZXJFcnJvclwiLCBcInN0YXRzXCIsIFwiY29ycmVsYXRpb25zXCIsIFwic2VsZWN0ZWRDb2xzXCIsIFwic2VsZWN0ZWREYXRlXCIsIFwid2luZG93XCIsIFwibWluUGVyaW9kc1wiXSxcclxuICAgICAgW1widXNlUm9sbGluZ1wiXVxyXG4gICAgKTtcclxuICAgIGlmICghXy5pc0VxdWFsKF8ucGljayh0aGlzLnN0YXRlLCBzdGF0ZVByb3BzKSwgXy5waWNrKG5ld1N0YXRlLCBzdGF0ZVByb3BzKSkpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5jaGFydCAhPSBuZXdTdGF0ZS5jaGFydCkge1xyXG4gICAgICAvLyBEb24ndCByZS1yZW5kZXIgaWYgd2UndmUgb25seSBjaGFuZ2VkIHRoZSBjaGFydC5cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlOyAvLyBPdGhlcndpc2UsIHVzZSB0aGUgZGVmYXVsdCByZWFjdCBiZWhhdmlvdXIuXHJcbiAgfVxyXG5cclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIGZldGNoSnNvbihcclxuICAgICAgYnVpbGRVUkwoYCR7Y29yclV0aWxzLkJBU0VfQ09SUkVMQVRJT05TX1VSTH0vJHt0aGlzLnByb3BzLmRhdGFJZH1gLCB0aGlzLnByb3BzLmNoYXJ0RGF0YSwgW1wicXVlcnlcIl0pLFxyXG4gICAgICBncmlkRGF0YSA9PiB7XHJcbiAgICAgICAgaWYgKGdyaWREYXRhLmVycm9yKSB7XHJcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZXJyb3I6IDxSZW1vdmFibGVFcnJvciB7Li4uZ3JpZERhdGF9IC8+IH0pO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB7IGRhdGEsIGRhdGVzLCBjb2RlIH0gPSBncmlkRGF0YTtcclxuICAgICAgICBjb25zdCBjb2x1bW5zID0gXy5tYXAoZGF0YSwgXCJjb2x1bW5cIik7XHJcbiAgICAgICAgY29uc3Qgcm9sbGluZyA9IF8uZ2V0KGRhdGVzLCBcIjAucm9sbGluZ1wiLCBmYWxzZSk7XHJcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB7XHJcbiAgICAgICAgICBjb3JyZWxhdGlvbnM6IGRhdGEsXHJcbiAgICAgICAgICBjb2x1bW5zLFxyXG4gICAgICAgICAgZGF0ZXMsXHJcbiAgICAgICAgICBoYXNEYXRlOiBfLnNpemUoZGF0ZXMpID4gMCxcclxuICAgICAgICAgIHNlbGVjdGVkRGF0ZTogXy5nZXQoZGF0ZXMsIFwiMC5uYW1lXCIsIG51bGwpLFxyXG4gICAgICAgICAgcm9sbGluZyxcclxuICAgICAgICAgIGdyaWRDb2RlOiBjb2RlLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSwgKCkgPT4ge1xyXG4gICAgICAgICAgbGV0IHsgY29sMSwgY29sMiB9ID0gdGhpcy5wcm9wcy5jaGFydERhdGEgfHwge307XHJcbiAgICAgICAgICBpZiAoXy5pc1VuZGVmaW5lZChjb2wxKSkge1xyXG4gICAgICAgICAgICBpZiAoXy5pc1VuZGVmaW5lZChjb2wyKSkge1xyXG4gICAgICAgICAgICAgIFtjb2wxLCBjb2wyXSA9IF8udGFrZShjb2x1bW5zLCAyKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjb2wxID0gXy5maW5kKGNvbHVtbnMsIGMgPT4gYyAhPT0gY29sMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAoXy5pc1VuZGVmaW5lZChjb2wyKSkge1xyXG4gICAgICAgICAgICBjb2wyID0gXy5maW5kKGNvbHVtbnMsIGMgPT4gYyAhPT0gY29sMSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoY29sMSAmJiBjb2wyKSB7XHJcbiAgICAgICAgICAgIGlmIChzdGF0ZS5oYXNEYXRlKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHJvbGxpbmcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVpbGRUcyhbY29sMSwgY29sMl0sIHN0YXRlLnNlbGVjdGVkRGF0ZSwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVpbGRUcyhbY29sMSwgY29sMl0sIHN0YXRlLnNlbGVjdGVkRGF0ZSwgZmFsc2UsIHRoaXMuc3RhdGUudXNlUm9sbGluZyk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRoaXMuYnVpbGRTY2F0dGVyKFtjb2wxLCBjb2wyXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGJ1aWxkVHMoc2VsZWN0ZWRDb2xzLCBzZWxlY3RlZERhdGUsIHJvbGxpbmcsIHVzZVJvbGxpbmcsIHdpbmRvdyA9IG51bGwsIG1pblBlcmlvZHMgPSBudWxsKSB7XHJcbiAgICBjb25zdCBxdWVyeSA9IF8uZ2V0KHRoaXMucHJvcHMsIFwiY2hhcnREYXRhLnF1ZXJ5XCIpO1xyXG4gICAgY29uc3QgcGF0aCA9IGAke2NvcnJVdGlscy5CQVNFX0NPUlJFTEFUSU9OU19UU19VUkx9LyR7dGhpcy5wcm9wcy5kYXRhSWR9YDtcclxuICAgIGxldCB1cmxQYXJhbXMgPSB7XHJcbiAgICAgIHF1ZXJ5LFxyXG4gICAgICBzZWxlY3RlZENvbHMsXHJcbiAgICAgIGRhdGVDb2w6IHNlbGVjdGVkRGF0ZSxcclxuICAgICAgcm9sbGluZyxcclxuICAgIH07XHJcbiAgICBpZiAodXNlUm9sbGluZykge1xyXG4gICAgICB1cmxQYXJhbXMgPSB7XHJcbiAgICAgICAgLi4udXJsUGFyYW1zLFxyXG4gICAgICAgIHJvbGxpbmdXaW5kb3c6IHdpbmRvdyA/PyB0aGlzLnN0YXRlLndpbmRvdyxcclxuICAgICAgICBtaW5QZXJpb2RzOiBtaW5QZXJpb2RzID8/IHRoaXMuc3RhdGUubWluUGVyaW9kcyxcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIGNvbnN0IHRzVXJsID0gYnVpbGRVUkwocGF0aCwgdXJsUGFyYW1zLCBbXHJcbiAgICAgIFwicXVlcnlcIixcclxuICAgICAgXCJzZWxlY3RlZENvbHNcIixcclxuICAgICAgXCJkYXRlQ29sXCIsXHJcbiAgICAgIFwicm9sbGluZ1wiLFxyXG4gICAgICBcInJvbGxpbmdXaW5kb3dcIixcclxuICAgICAgXCJtaW5QZXJpb2RzXCIsXHJcbiAgICBdKTtcclxuICAgIGNvbnN0IHVwZGF0ZWRTdGF0ZSA9IHtcclxuICAgICAgc2VsZWN0ZWRDb2xzLFxyXG4gICAgICBzZWxlY3RlZERhdGUsXHJcbiAgICAgIHRzVXJsLFxyXG4gICAgICByb2xsaW5nLFxyXG4gICAgICB1c2VSb2xsaW5nLFxyXG4gICAgfTtcclxuICAgIGlmICh1c2VSb2xsaW5nICYmICFfLmlzTnVsbCh3aW5kb3cpKSB7XHJcbiAgICAgIHVwZGF0ZWRTdGF0ZS53aW5kb3cgPSB3aW5kb3c7XHJcbiAgICB9XHJcbiAgICBpZiAodXNlUm9sbGluZyAmJiAhXy5pc051bGwobWluUGVyaW9kcykpIHtcclxuICAgICAgdXBkYXRlZFN0YXRlLm1pblBlcmlvZHMgPSBtaW5QZXJpb2RzO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRTdGF0ZSh1cGRhdGVkU3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgdmlld1NjYXR0ZXJSb3coZXZ0KSB7XHJcbiAgICBjb25zdCBwb2ludCA9IHRoaXMuc3RhdGUuY2hhcnQuZ2V0RWxlbWVudEF0RXZlbnQoZXZ0KTtcclxuICAgIGlmIChwb2ludCkge1xyXG4gICAgICBjb25zdCBkYXRhID0gXy5nZXQocG9pbnQsIFtcIjBcIiwgXCJfY2hhcnRcIiwgXCJjb25maWdcIiwgXCJkYXRhXCIsIFwiZGF0YXNldHNcIiwgcG9pbnRbMF0uX2RhdGFzZXRJbmRleCwgXCJkYXRhXCJdKTtcclxuICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IGRhdGFbcG9pbnRbMF0uX2luZGV4XS5pbmRleDtcclxuICAgICAgICBsZXQgdXBkYXRlZFF1ZXJ5ID0gdGhpcy5wcm9wcy5jaGFydERhdGEucXVlcnk7XHJcbiAgICAgICAgaWYgKHVwZGF0ZWRRdWVyeSkge1xyXG4gICAgICAgICAgdXBkYXRlZFF1ZXJ5ID0gW3VwZGF0ZWRRdWVyeSwgYGluZGV4ID09ICR7aW5kZXh9YF07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHVwZGF0ZWRRdWVyeSA9IFtgaW5kZXggPT0gJHtpbmRleH1gXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2F2ZUZpbHRlcih0aGlzLnByb3BzLmRhdGFJZCwgXy5qb2luKHVwZGF0ZWRRdWVyeSwgXCIgYW5kIFwiKSwgKCkgPT4ge1xyXG4gICAgICAgICAgd2luZG93Lm9wZW5lci5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYnVpbGRTY2F0dGVyKHNlbGVjdGVkQ29scywgZGF0ZSA9IG51bGwsIHRzQ29kZSA9IG51bGwpIHtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHsgc2VsZWN0ZWRDb2xzLCBxdWVyeTogdGhpcy5wcm9wcy5jaGFydERhdGEucXVlcnkgfTtcclxuICAgIGlmIChkYXRlKSB7XHJcbiAgICAgIHBhcmFtcy5kYXRlQ29sID0gdGhpcy5zdGF0ZS5zZWxlY3RlZERhdGU7XHJcbiAgICAgIHBhcmFtcy5kYXRlID0gZGF0ZTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnN0YXRlLnJvbGxpbmcpIHtcclxuICAgICAgcGFyYW1zLnJvbGxpbmcgPSB0aGlzLnN0YXRlLnJvbGxpbmc7XHJcbiAgICAgIHBhcmFtcy53aW5kb3cgPSB0aGlzLnN0YXRlLndpbmRvdztcclxuICAgIH1cclxuICAgIGNvbnN0IHBhdGggPSBgJHtjb3JyVXRpbHMuQkFTRV9TQ0FUVEVSX1VSTH0vJHt0aGlzLnByb3BzLmRhdGFJZH1gO1xyXG4gICAgY29uc3Qgc2NhdHRlclVybCA9IGJ1aWxkVVJMKHBhdGgsIHBhcmFtcywgW1wic2VsZWN0ZWRDb2xzXCIsIFwicXVlcnlcIiwgXCJkYXRlXCIsIFwiZGF0ZUNvbFwiLCBcInJvbGxpbmdcIiwgXCJ3aW5kb3dcIl0pO1xyXG4gICAgaWYgKHRoaXMuc3RhdGUuc2NhdHRlclVybCA9PT0gc2NhdHRlclVybCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0b2dnbGVCb3VuY2VyKFtcInNjYXR0ZXItYm91bmNlclwiLCBcInJhd1NjYXR0ZXJDaGFydFwiXSk7XHJcbiAgICBmZXRjaEpzb24oc2NhdHRlclVybCwgZmV0Y2hlZENoYXJ0RGF0YSA9PiB7XHJcbiAgICAgIHRvZ2dsZUJvdW5jZXIoW1wic2NhdHRlci1ib3VuY2VyXCIsIFwicmF3U2NhdHRlckNoYXJ0XCJdKTtcclxuICAgICAgY29uc3QgbmV3U3RhdGUgPSB7XHJcbiAgICAgICAgc2VsZWN0ZWRDb2xzLFxyXG4gICAgICAgIHN0YXRzOiBmZXRjaGVkQ2hhcnREYXRhLnN0YXRzLFxyXG4gICAgICAgIGRhdGUsXHJcbiAgICAgICAgc2NhdHRlckVycm9yOiBudWxsLFxyXG4gICAgICAgIHNjYXR0ZXJVcmwsXHJcbiAgICAgICAgc2NhdHRlckNvZGU6IGZldGNoZWRDaGFydERhdGEuY29kZSxcclxuICAgICAgfTtcclxuICAgICAgaWYgKHRzQ29kZSkge1xyXG4gICAgICAgIG5ld1N0YXRlLnRzQ29kZSA9IHRzQ29kZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZmV0Y2hlZENoYXJ0RGF0YS5lcnJvcikge1xyXG4gICAgICAgIG5ld1N0YXRlLnNjYXR0ZXJFcnJvciA9IDxSZW1vdmFibGVFcnJvciB7Li4uZmV0Y2hlZENoYXJ0RGF0YX0gLz47XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGJ1aWxkZXIgPSBjdHggPT4ge1xyXG4gICAgICAgIGlmICghXy5nZXQoZmV0Y2hlZENoYXJ0RGF0YSwgXCJkYXRhLmFsbC54XCIsIFtdKS5sZW5ndGgpIHtcclxuICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB7IHgsIHkgfSA9IGZldGNoZWRDaGFydERhdGE7XHJcbiAgICAgICAgcmV0dXJuIGNvcnJVdGlscy5jcmVhdGVTY2F0dGVyKGN0eCwgZmV0Y2hlZENoYXJ0RGF0YSwgeCwgeSwgdGhpcy52aWV3U2NhdHRlclJvdyk7XHJcbiAgICAgIH07XHJcbiAgICAgIG5ld1N0YXRlLmNoYXJ0ID0gY2hhcnRVdGlscy5jaGFydFdyYXBwZXIoXCJyYXdTY2F0dGVyQ2hhcnRcIiwgdGhpcy5zdGF0ZS5jaGFydCwgYnVpbGRlcik7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB2aWV3U2NhdHRlcihldnQpIHtcclxuICAgIGNvbnN0IGNoYXJ0ID0gXy5nZXQodGhpcywgXCJfdHNfY2hhcnQuc3RhdGUuY2hhcnRzLjBcIik7XHJcbiAgICBpZiAoY2hhcnQpIHtcclxuICAgICAgY29uc3Qgc2VsZWN0ZWRQb2ludCA9IF8uaGVhZChjaGFydC5nZXRFbGVtZW50c0F0WEF4aXMoZXZ0KSk7XHJcbiAgICAgIGlmIChzZWxlY3RlZFBvaW50KSB7XHJcbiAgICAgICAgY2hhcnQuZ2V0RGF0YXNldE1ldGEoMCkuY29udHJvbGxlci5fY29uZmlnLnNlbGVjdGVkUG9pbnQgPSBzZWxlY3RlZFBvaW50Ll9pbmRleDtcclxuICAgICAgICBjb25zdCB7IHNlbGVjdGVkQ29scyB9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICB0aGlzLmJ1aWxkU2NhdHRlcihzZWxlY3RlZENvbHMsIGNoYXJ0LmRhdGEubGFiZWxzW3NlbGVjdGVkUG9pbnQuX2luZGV4XSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGlmICh0aGlzLnN0YXRlLmVycm9yKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBrZXk9XCJib2R5XCIgY2xhc3NOYW1lPVwibW9kYWwtYm9keSBzY2F0dGVyLWJvZHlcIj5cclxuICAgICAgICAgIHt0aGlzLnN0YXRlLmVycm9yfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgY29uc3QgeyBzZWxlY3RlZENvbHMsIHRzVXJsLCBoYXNEYXRlIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBrZXk9XCJib2R5XCIgY2xhc3NOYW1lPVwibW9kYWwtYm9keSBzY2F0dGVyLWJvZHlcIj5cclxuICAgICAgICA8Q29ycmVsYXRpb25zR3JpZFxyXG4gICAgICAgICAgYnVpbGRUcz17dGhpcy5idWlsZFRzfVxyXG4gICAgICAgICAgYnVpbGRTY2F0dGVyPXt0aGlzLmJ1aWxkU2NhdHRlcn1cclxuICAgICAgICAgIHNlbGVjdGVkQ29scz17c2VsZWN0ZWRDb2xzfVxyXG4gICAgICAgICAgey4uLnRoaXMuc3RhdGV9XHJcbiAgICAgICAgLz5cclxuICAgICAgICA8Q29uZGl0aW9uYWxSZW5kZXIgZGlzcGxheT17IV8uaXNFbXB0eShzZWxlY3RlZENvbHMpICYmIGhhc0RhdGV9PlxyXG4gICAgICAgICAgPENvcnJlbGF0aW9uc1RzT3B0aW9ucyB7Li4udGhpcy5zdGF0ZX0gYnVpbGRUcz17dGhpcy5idWlsZFRzfSAvPlxyXG4gICAgICAgICAgPENoYXJ0c0JvZHlcclxuICAgICAgICAgICAgcmVmPXtyID0+ICh0aGlzLl90c19jaGFydCA9IHIpfVxyXG4gICAgICAgICAgICB2aXNpYmxlPXt0cnVlfVxyXG4gICAgICAgICAgICB1cmw9e3RzVXJsfVxyXG4gICAgICAgICAgICBjb2x1bW5zPXtbXHJcbiAgICAgICAgICAgICAgeyBuYW1lOiBcInhcIiwgZHR5cGU6IFwiZGF0ZXRpbWVbbnNdXCIgfSxcclxuICAgICAgICAgICAgICB7IG5hbWU6IFwiY29yclwiLCBkdHlwZTogXCJmbG9hdDY0XCIgfSxcclxuICAgICAgICAgICAgXX1cclxuICAgICAgICAgICAgeD17eyB2YWx1ZTogXCJ4XCIgfX1cclxuICAgICAgICAgICAgeT17W3sgdmFsdWU6IFwiY29yclwiIH1dfVxyXG4gICAgICAgICAgICBjb25maWdIYW5kbGVyPXtjb25maWcgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbmZpZy5vcHRpb25zLnNjYWxlcy55QXhlcyA9IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgdGlja3M6IHsgbWluOiAtMS4xLCBtYXg6IDEuMSwgc3RlcFNpemU6IDAuMiB9LFxyXG4gICAgICAgICAgICAgICAgICBhZnRlclRpY2tUb0xhYmVsQ29udmVyc2lvbjogZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS50aWNrc1swXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS50aWNrc1tkYXRhLnRpY2tzLmxlbmd0aCAtIDFdID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgaWQ6IFwieS1jb3JyXCIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgY29uZmlnLm9wdGlvbnMub25DbGljayA9IHRoaXMudmlld1NjYXR0ZXI7XHJcbiAgICAgICAgICAgICAgY29uZmlnLm9wdGlvbnMubGVnZW5kID0geyBkaXNwbGF5OiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgIGNvbmZpZy5wbHVnaW5zID0gW1xyXG4gICAgICAgICAgICAgICAgY2hhcnRVdGlscy5ncmFkaWVudExpbmVQbHVnaW4oY29yclV0aWxzLmNvbG9yU2NhbGUsIFwieS1jb3JyXCIsIC0xLCAxKSxcclxuICAgICAgICAgICAgICAgIGNoYXJ0VXRpbHMubGluZUhvdmVyUGx1Z2luKGNvcnJVdGlscy5jb2xvclNjYWxlKSxcclxuICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgIGNvbmZpZy5kYXRhLmRhdGFzZXRzWzBdLnNlbGVjdGVkUG9pbnQgPSAwO1xyXG4gICAgICAgICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgIGhlaWdodD17MzAwfVxyXG4gICAgICAgICAgICBzaG93Q29udHJvbHM9e2ZhbHNlfVxyXG4gICAgICAgICAgICBkYXRhTG9hZENhbGxiYWNrPXtkYXRhID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZERhdGUgPSBfLmdldChkYXRhIHx8IHt9LCBcImRhdGEuYWxsLnguMFwiKTtcclxuICAgICAgICAgICAgICBjb25zdCB0c0NvZGUgPSBfLmdldChkYXRhLCBcImNvZGVcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idWlsZFNjYXR0ZXIodGhpcy5zdGF0ZS5zZWxlY3RlZENvbHMsIHNlbGVjdGVkRGF0ZSwgdHNDb2RlKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHRzQ29kZTogXy5nZXQoZGF0YSwgXCJjb2RlXCIsIFwiXCIpIH0pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9Db25kaXRpb25hbFJlbmRlcj5cclxuICAgICAgICA8Q29ycmVsYXRpb25TY2F0dGVyU3RhdHMgey4uLnRoaXMuc3RhdGV9IC8+XHJcbiAgICAgICAgPGZpZ3VyZT5cclxuICAgICAgICAgIHt0aGlzLnN0YXRlLnNjYXR0ZXJFcnJvcn1cclxuICAgICAgICAgIDxDb25kaXRpb25hbFJlbmRlciBkaXNwbGF5PXtfLmlzRW1wdHkodGhpcy5zdGF0ZS5zY2F0dGVyRXJyb3IpfT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGFydC13cmFwcGVyXCIgc3R5bGU9e3sgaGVpZ2h0OiA0MDAgfX0+XHJcbiAgICAgICAgICAgICAgPGRpdiBpZD1cInNjYXR0ZXItYm91bmNlclwiIHN0eWxlPXt7IGRpc3BsYXk6IFwibm9uZVwiIH19PlxyXG4gICAgICAgICAgICAgICAgPEJvdW5jZXIgLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8Y2FudmFzIGlkPVwicmF3U2NhdHRlckNoYXJ0XCIgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L0NvbmRpdGlvbmFsUmVuZGVyPlxyXG4gICAgICAgIDwvZmlndXJlPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbi8qIENvcnJlbGF0aW9ucy5kaXNwbGF5TmFtZSA9IFwiQ29ycmVsYXRpb25zXCI7ICovXHJcbkNvcnJlbGF0aW9ucy5kaXNwbGF5TmFtZSA9IFwiXCJcclxuQ29ycmVsYXRpb25zLnByb3BUeXBlcyA9IHtcclxuICBkYXRhSWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICBjaGFydERhdGE6IFByb3BUeXBlcy5zaGFwZSh7XHJcbiAgICB2aXNpYmxlOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxyXG4gICAgcXVlcnk6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGNvbDE6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBjb2wyOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIH0pLFxyXG4gIHByb3BhZ2F0ZVN0YXRlOiBQcm9wVHlwZXMuZnVuYyxcclxufTtcclxuXHJcbmV4cG9ydCB7IENvcnJlbGF0aW9ucyB9O1xyXG4iXSwic291cmNlUm9vdCI6IiJ9