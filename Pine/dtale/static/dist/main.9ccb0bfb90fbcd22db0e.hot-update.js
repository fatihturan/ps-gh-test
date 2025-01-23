webpackHotUpdate("main",{

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
  count: "Count (Non-Missing)",
  missing_ct: "Count (Missing)",
  missing_pct: "Percent Missing",
  freq: "Frequency",
  top: "Top",
  kurt: "Kurt Value",
  max: "Largest",
  min: "Smallest",
  mean: "Mean",
  median: "Median",
  mode: "Mode",
  sem: "Standard Error of the Mean (SEM)",
  skew: "Skewness",
  std: "Standard Deviation",
  sum: "Sum Total",
  unique: "Unique Values",
  "var": "Variance",
  '25%': "25th Percentile",
  '50%': "50th Percentile",
  '75%': "75th Percentile",
  first: "First",
  last: "Last"
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

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdGF0aWMvcG9wdXBzL2Rlc2NyaWJlL0RldGFpbHNCb3hwbG90LmpzeCJdLCJuYW1lcyI6WyJDT1VOVF9TVEFUUyIsIlBPU0lUSU9OX1NUQVRTIiwiTEFCRUxTIiwidG90YWxfY291bnQiLCJjb3VudCIsIm1pc3NpbmdfY3QiLCJtaXNzaW5nX3BjdCIsImZyZXEiLCJ0b3AiLCJrdXJ0IiwibWF4IiwibWluIiwibWVhbiIsIm1lZGlhbiIsIm1vZGUiLCJzZW0iLCJza2V3Iiwic3RkIiwic3VtIiwidW5pcXVlIiwiZmlyc3QiLCJsYXN0IiwiYnVpbGRTdGF0Iiwia2V5IiwidmFsdWUiLCJ1bmRlZmluZWQiLCJfIiwiZ2V0IiwiRGV0YWlsc0JveHBsb3QiLCJwcm9wcyIsInN0YXRlIiwiYm94cGxvdCIsImNyZWF0ZUJveHBsb3QiLCJiaW5kIiwibmV3UHJvcHMiLCJpc0VxdWFsIiwiZGV0YWlscyIsImJ1aWxkZXIiLCJjdHgiLCJkZXNjcmliZSIsIm5hbWUiLCJjaGFydERhdGEiLCJwaWNrQnkiLCJ2IiwiayIsImluY2x1ZGVzIiwibWFwS2V5cyIsIl92IiwibWFwVmFsdWVzIiwicGFyc2VGbG9hdCIsInJlcGxhY2UiLCJzaXplIiwiZm9yRWFjaCIsInAiLCJpc1VuZGVmaW5lZCIsIm91dGxpZXJzIiwiY2hhcnRVdGlscyIsImNyZWF0ZUNoYXJ0IiwidHlwZSIsImRhdGEiLCJsYWJlbHMiLCJkYXRhc2V0cyIsImxhYmVsIiwiYmFja2dyb3VuZENvbG9yIiwiYm9yZGVyQ29sb3IiLCJib3JkZXJXaWR0aCIsIm9wdGlvbnMiLCJyZXNwb25zaXZlIiwibGVnZW5kIiwiZGlzcGxheSIsInRpdGxlIiwidG9vbHRpcHMiLCJlbmFibGVkIiwic2NhbGVzIiwieUF4ZXMiLCJ0aWNrcyIsImNoYXJ0IiwiY2hhcnRXcmFwcGVyIiwic2V0U3RhdGUiLCJkZXNjcmliZUtleXMiLCJrZXlzIiwib21pdCIsImNvbmNhdCIsImR0eXBlQ291bnRzIiwiZHR5cGVfY291bnRzIiwibWFwIiwiZHR5cGUiLCJzdGF0IiwiaGVpZ2h0IiwiUmVhY3QiLCJDb21wb25lbnQiLCJkaXNwbGF5TmFtZSIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBRUEsSUFBTUEsV0FBVyxHQUFHLENBQUMsT0FBRCxFQUFVLFlBQVYsRUFBd0IsYUFBeEIsQ0FBcEI7QUFDQSxJQUFNQyxjQUFjLEdBQUcsQ0FBQyxPQUFELEVBQVUsTUFBVixFQUFrQixLQUFsQixDQUF2QjtBQUNBLElBQU1DLE1BQU0sR0FBRztBQUNiQyxhQUFXLEVBQUUsWUFEQTtBQUViQyxPQUFLLEVBQUUscUJBRk07QUFHYkMsWUFBVSxFQUFFLGlCQUhDO0FBSWJDLGFBQVcsRUFBRSxpQkFKQTtBQUtiQyxNQUFJLEVBQUUsV0FMTztBQU1iQyxLQUFHLEVBQUUsS0FOUTtBQU9iQyxNQUFJLEVBQUUsWUFQTztBQVFiQyxLQUFHLEVBQUUsU0FSUTtBQVNiQyxLQUFHLEVBQUUsVUFUUTtBQVViQyxNQUFJLEVBQUUsTUFWTztBQVdiQyxRQUFNLEVBQUUsUUFYSztBQVliQyxNQUFJLEVBQUUsTUFaTztBQWFiQyxLQUFHLEVBQUUsa0NBYlE7QUFjYkMsTUFBSSxFQUFFLFVBZE87QUFlYkMsS0FBRyxFQUFFLG9CQWZRO0FBZ0JiQyxLQUFHLEVBQUUsV0FoQlE7QUFpQmJDLFFBQU0sRUFBRSxlQWpCSztBQWtCYixTQUFLLFVBbEJRO0FBbUJiLFNBQU8saUJBbkJNO0FBb0JiLFNBQU8saUJBcEJNO0FBcUJiLFNBQU8saUJBckJNO0FBc0JiQyxPQUFLLEVBQUUsT0F0Qk07QUF1QmJDLE1BQUksRUFBRTtBQXZCTyxDQUFmOztBQTBCQSxTQUFTQyxTQUFULENBQW1CQyxHQUFuQixFQUF3QkMsS0FBeEIsRUFBK0I7QUFDN0IsTUFBSUEsS0FBSyxLQUFLQyxTQUFkLEVBQXlCO0FBQ3ZCLHdC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ZixFIiwiZmlsZSI6Im1haW4uOWNjYjBiZmI5MGZiY2QyMmRiMGUuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcblxyXG5pbXBvcnQgY2hhcnRVdGlscyBmcm9tIFwiLi4vLi4vY2hhcnRVdGlsc1wiO1xyXG5cclxuY29uc3QgQ09VTlRfU1RBVFMgPSBbXCJjb3VudFwiLCBcIm1pc3NpbmdfY3RcIiwgXCJtaXNzaW5nX3BjdFwiXTtcclxuY29uc3QgUE9TSVRJT05fU1RBVFMgPSBbXCJmaXJzdFwiLCBcImxhc3RcIiwgXCJ0b3BcIl07XHJcbmNvbnN0IExBQkVMUyA9IHtcclxuICB0b3RhbF9jb3VudDogXCJUb3RhbCBSb3dzXCIsXHJcbiAgY291bnQ6IFwiQ291bnQgKE5vbi1NaXNzaW5nKVwiLFxyXG4gIG1pc3NpbmdfY3Q6IFwiQ291bnQgKE1pc3NpbmcpXCIsXHJcbiAgbWlzc2luZ19wY3Q6IFwiUGVyY2VudCBNaXNzaW5nXCIsXHJcbiAgZnJlcTogXCJGcmVxdWVuY3lcIixcclxuICB0b3A6IFwiVG9wXCIsXHJcbiAga3VydDogXCJLdXJ0IFZhbHVlXCIsXHJcbiAgbWF4OiBcIkxhcmdlc3RcIixcclxuICBtaW46IFwiU21hbGxlc3RcIixcclxuICBtZWFuOiBcIk1lYW5cIixcclxuICBtZWRpYW46IFwiTWVkaWFuXCIsXHJcbiAgbW9kZTogXCJNb2RlXCIsXHJcbiAgc2VtOiBcIlN0YW5kYXJkIEVycm9yIG9mIHRoZSBNZWFuIChTRU0pXCIsXHJcbiAgc2tldzogXCJTa2V3bmVzc1wiLFxyXG4gIHN0ZDogXCJTdGFuZGFyZCBEZXZpYXRpb25cIixcclxuICBzdW06IFwiU3VtIFRvdGFsXCIsXHJcbiAgdW5pcXVlOiBcIlVuaXF1ZSBWYWx1ZXNcIixcclxuICB2YXI6IFwiVmFyaWFuY2VcIixcclxuICAnMjUlJzogXCIyNXRoIFBlcmNlbnRpbGVcIixcclxuICAnNTAlJzogXCI1MHRoIFBlcmNlbnRpbGVcIixcclxuICAnNzUlJzogXCI3NXRoIFBlcmNlbnRpbGVcIixcclxuICBmaXJzdDogXCJGaXJzdFwiLFxyXG4gIGxhc3Q6IFwiTGFzdFwiLFxyXG59O1xyXG5cclxuZnVuY3Rpb24gYnVpbGRTdGF0KGtleSwgdmFsdWUpIHtcclxuICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdj5cclxuICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZC1pbmxpbmUgcHItNVwiPntgJHtfLmdldChMQUJFTFMsIGtleSwga2V5KX06YH08L2g0PlxyXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImQtaW5saW5lXCI+e3ZhbHVlfTwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxuICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuY2xhc3MgRGV0YWlsc0JveHBsb3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0geyBib3hwbG90OiBudWxsIH07XHJcbiAgICB0aGlzLmNyZWF0ZUJveHBsb3QgPSB0aGlzLmNyZWF0ZUJveHBsb3QuYmluZCh0aGlzKTtcclxuICB9XHJcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICB0aGlzLmNyZWF0ZUJveHBsb3QoKTtcclxuICB9XHJcblxyXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXdQcm9wcykge1xyXG4gICAgcmV0dXJuICFfLmlzRXF1YWwodGhpcy5wcm9wcy5kZXRhaWxzLCBuZXdQcm9wcy5kZXRhaWxzKTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcclxuICAgIHRoaXMuY3JlYXRlQm94cGxvdCgpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlQm94cGxvdCgpIHtcclxuICAgIGNvbnN0IGJ1aWxkZXIgPSBjdHggPT4ge1xyXG4gICAgICBjb25zdCB7IGRldGFpbHMgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgIGNvbnN0IHsgZGVzY3JpYmUsIG5hbWUgfSA9IGRldGFpbHMgfHwge307XHJcbiAgICAgIGNvbnN0IGNoYXJ0RGF0YSA9IF8oZGVzY3JpYmUgfHwge30pXHJcbiAgICAgICAgLnBpY2tCeSgodiwgaykgPT4gXy5pbmNsdWRlcyhbXCIyNSVcIiwgXCI1MCVcIiwgXCI3NSVcIiwgXCJtaW5cIiwgXCJtYXhcIl0sIGspICYmICFfLmluY2x1ZGVzKFtcIm5hblwiLCBcImluZlwiXSwgdikpXHJcbiAgICAgICAgLm1hcEtleXMoKF92LCBrKSA9PiBfLmdldCh7IFwiMjUlXCI6IFwicTFcIiwgXCI1MCVcIjogXCJtZWRpYW5cIiwgXCI3NSVcIjogXCJxM1wiIH0sIGssIGspKVxyXG4gICAgICAgIC5tYXBWYWx1ZXModiA9PiBwYXJzZUZsb2F0KF8ucmVwbGFjZSh2LCAvLC9nLCBcIlwiKSkpXHJcbiAgICAgICAgLnZhbHVlKCk7XHJcbiAgICAgIGlmIChfLnNpemUoY2hhcnREYXRhKSA9PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuICAgICAgXy5mb3JFYWNoKFtcIm1pblwiLCBcIm1heFwiXSwgcCA9PiB7XHJcbiAgICAgICAgaWYgKCFfLmlzVW5kZWZpbmVkKGNoYXJ0RGF0YVtwXSkpIHtcclxuICAgICAgICAgIGNoYXJ0RGF0YVtgd2hpc2tlciR7cH1gXSA9IGNoYXJ0RGF0YVtwXTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoIV8uaXNVbmRlZmluZWQoZGVzY3JpYmUubWVhbikgJiYgIV8uaW5jbHVkZXMoW1wibmFuXCIsIFwiaW5mXCJdLCBkZXNjcmliZS5tZWFuKSkge1xyXG4gICAgICAgIGNoYXJ0RGF0YS5vdXRsaWVycyA9IFtwYXJzZUZsb2F0KF8ucmVwbGFjZShkZXNjcmliZS5tZWFuLCAvLC9nLCBcIlwiKSldO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBjaGFydFV0aWxzLmNyZWF0ZUNoYXJ0KGN0eCwge1xyXG4gICAgICAgIHR5cGU6IFwiYm94cGxvdFwiLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIGxhYmVsczogW25hbWVdLFxyXG4gICAgICAgICAgZGF0YXNldHM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGxhYmVsOiBuYW1lLFxyXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDU0LCAxNjIsIDIzNSwgMC41KVwiLFxyXG4gICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBcInJnYig1NCwgMTYyLCAyMzUpXCIsXHJcbiAgICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDEsXHJcbiAgICAgICAgICAgICAgZGF0YTogW2NoYXJ0RGF0YV0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcclxuICAgICAgICAgIGxlZ2VuZDogeyBkaXNwbGF5OiBmYWxzZSB9LFxyXG4gICAgICAgICAgdGl0bGU6IHsgZGlzcGxheTogZmFsc2UgfSxcclxuICAgICAgICAgIHRvb2x0aXBzOiB7IGVuYWJsZWQ6IGZhbHNlIH0sXHJcbiAgICAgICAgICBzY2FsZXM6IHtcclxuICAgICAgICAgICAgeUF4ZXM6IFt7IHRpY2tzOiB7IG1pbjogY2hhcnREYXRhLm1pbiAtIDEsIG1heDogY2hhcnREYXRhLm1heCArIDEgfSB9XSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgY2hhcnQgPSBjaGFydFV0aWxzLmNoYXJ0V3JhcHBlcihcImJveHBsb3RcIiwgdGhpcy5zdGF0ZS5ib3hwbG90LCBidWlsZGVyKTtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBib3hwbG90OiBjaGFydCB9KTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgZGV0YWlscyB9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IGRlc2NyaWJlID0gXy5nZXQoZGV0YWlscywgXCJkZXNjcmliZVwiLCB7fSk7XHJcbiAgICBjb25zdCBkZXNjcmliZUtleXMgPSBfLmtleXMoXy5vbWl0KGRlc2NyaWJlLCBfLmNvbmNhdChbXCJ0b3RhbF9jb3VudFwiLCBcImZyZXFcIl0sIENPVU5UX1NUQVRTLCBQT1NJVElPTl9TVEFUUykpKTtcclxuICAgIGxldCBkdHlwZUNvdW50cyA9IG51bGw7XHJcbiAgICBpZiAoZGV0YWlscy5kdHlwZV9jb3VudHMpIHtcclxuICAgICAgZHR5cGVDb3VudHMgPSAoXHJcbiAgICAgICAgPGxpPlxyXG4gICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIm1iLTBcIj5EdHlwZSBDb3VudHM8L2g0PlxyXG4gICAgICAgICAgPHVsPlxyXG4gICAgICAgICAgICB7Xy5tYXAoZGV0YWlscy5kdHlwZV9jb3VudHMsICh7IGNvdW50LCBkdHlwZSB9KSA9PiAoXHJcbiAgICAgICAgICAgICAgPGxpIGtleT17ZHR5cGV9PlxyXG4gICAgICAgICAgICAgICAge2R0eXBlfToge2NvdW50fVxyXG4gICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgPC91bD5cclxuICAgICAgICA8L2xpPlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC02XCI+XHJcbiAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICB7YnVpbGRTdGF0KFwidG90YWxfY291bnRcIiwgZGVzY3JpYmUudG90YWxfY291bnQpfVxyXG4gICAgICAgICAgICAgIDx1bD5cclxuICAgICAgICAgICAgICAgIHtfLm1hcChDT1VOVF9TVEFUUywgc3RhdCA9PiAoXHJcbiAgICAgICAgICAgICAgICAgIDxsaSBrZXk9e3N0YXR9PntidWlsZFN0YXQoc3RhdCwgZGVzY3JpYmVbc3RhdF0pfTwvbGk+XHJcbiAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICB7Xy5tYXAoUE9TSVRJT05fU1RBVFMsIGsgPT4gZGVzY3JpYmVba10gIT09IHVuZGVmaW5lZCAmJiA8bGkga2V5PXtrfT57YnVpbGRTdGF0KGssIGRlc2NyaWJlW2tdKX08L2xpPil9XHJcbiAgICAgICAgICAgIHtkZXNjcmliZS5mcmVxICE9PSB1bmRlZmluZWQgJiYgKFxyXG4gICAgICAgICAgICAgIDx1bD5cclxuICAgICAgICAgICAgICAgIDxsaT57YnVpbGRTdGF0KFwiZnJlcVwiLCBkZXNjcmliZS5mcmVxKX08L2xpPlxyXG4gICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIHtfLm1hcChkZXNjcmliZUtleXMsIGsgPT4gKFxyXG4gICAgICAgICAgICAgIDxsaSBrZXk9e2t9PntidWlsZFN0YXQoaywgZGVzY3JpYmVba10pfTwvbGk+XHJcbiAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICB7ZHR5cGVDb3VudHN9XHJcbiAgICAgICAgICA8L3VsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTZcIj5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgaGVpZ2h0OiAzMDAgfX0+XHJcbiAgICAgICAgICAgIDxjYW52YXMgaWQ9XCJib3hwbG90XCIgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbkRldGFpbHNCb3hwbG90LmRpc3BsYXlOYW1lID0gXCJEZXRhaWxzQm94cGxvdFwiO1xyXG5EZXRhaWxzQm94cGxvdC5wcm9wVHlwZXMgPSB7XHJcbiAgZGV0YWlsczogUHJvcFR5cGVzLm9iamVjdCxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERldGFpbHNCb3hwbG90O1xyXG4iXSwic291cmNlUm9vdCI6IiJ9