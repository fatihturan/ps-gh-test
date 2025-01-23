webpackHotUpdate("main",{

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

      Object(_fetcher__WEBPACK_IMPORTED_MODULE_8__["fetchJson"])("".concat(BASE_DESCRIBE_URL, "/").concat(this.props.dataId, "/").concat(encodeURIComponent(this.props.selected.name)), function (detailData) {
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
      Object(_fetcher__WEBPACK_IMPORTED_MODULE_8__["fetchJson"])("/dtale/outliers/".concat(this.props.dataId, "/").concat(encodeURIComponent(this.props.selected.name)), function (outlierData) {
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
    /* Comments around renderDeepDataToggle, renderUniques and renderOutliers removes these from view */

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
      }));
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


/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdGF0aWMvcG9wdXBzL2Rlc2NyaWJlL0RldGFpbHMuanN4Il0sIm5hbWVzIjpbIkJBU0VfREVTQ1JJQkVfVVJMIiwiZGlzcGxheVVuaXF1ZXMiLCJ1bmlxdWVzIiwiZHR5cGUiLCJfIiwiaXNFbXB0eSIsImRhdGEiLCJ0aXRsZSIsInRvcCIsImZvbnRTaXplIiwiam9pbiIsIm1hcCIsInUiLCJ2YWx1ZSIsImNvdW50IiwiRGV0YWlscyIsInByb3BzIiwic3RhdGUiLCJlcnJvciIsImRldGFpbHMiLCJkZWVwRGF0YSIsIm91dGxpZXJzIiwibG9hZGluZ091dGxpZXJzIiwibG9hZERldGFpbHMiLCJiaW5kIiwicmVuZGVyVW5pcXVlcyIsInJlbmRlckRlZXBEYXRhVG9nZ2xlIiwibG9hZE91dGxpZXJzIiwicmVuZGVyT3V0bGllcnMiLCJwcmV2UHJvcHMiLCJpc0VxdWFsIiwic2VsZWN0ZWQiLCJmZXRjaEpzb24iLCJkYXRhSWQiLCJlbmNvZGVVUklDb21wb25lbnQiLCJuYW1lIiwiZGV0YWlsRGF0YSIsIm5ld1N0YXRlIiwiY29kZSIsInNldFN0YXRlIiwicGljayIsImdldCIsImR0eXBlQ3QiLCJzaXplIiwiZHR5cGVVbmlxdWVzIiwib3V0bGllckRhdGEiLCJpbmNsdWRlcyIsImd1IiwiZmluZENvbFR5cGUiLCJ0b2dnbGUiLCJ2YWwiLCJvdXRsaWVyc0NhbGxiYWNrIiwiaXNOdWxsIiwibm9vcCIsImJ1aWxkQnV0dG9uIiwib3V0bGllclZhbHVlcyIsInNhdmVGaWx0ZXIiLCJjZmciLCJ0eXBlIiwicXVlcnlBcHBsaWVkIiwicXVlcnkiLCJ1cmwiLCJidWlsZFVSTFN0cmluZyIsInNhdmVDb2xGaWx0ZXJVcmwiLCJKU09OIiwic3RyaW5naWZ5IiwiYXNzaWduSW4iLCJ3aW5kb3ciLCJvcGVuZXIiLCJsb2NhdGlvbiIsInJlbG9hZCIsImJvcmRlckJvdHRvbSIsIndpZHRoIiwic29ydEJ5IiwiZHR5cGVzIiwiUmVhY3QiLCJDb21wb25lbnQiLCJkaXNwbGF5TmFtZSIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCIsInN0cmluZyIsImFycmF5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEsaUJBQWlCLEdBQUcsaUJBQTFCOztBQUVBLFNBQVNDLGNBQVQsQ0FBd0JDLE9BQXhCLEVBQStDO0FBQUEsTUFBZEMsS0FBYyx1RUFBTixJQUFNOztBQUM3QyxNQUFJQyw2Q0FBQyxDQUFDQyxPQUFGLENBQVVILE9BQU8sQ0FBQ0ksSUFBbEIsQ0FBSixFQUE2QjtBQUMzQixXQUFPLElBQVA7QUFDRDs7QUFDRCxNQUFJQyxLQUFLLEdBQUcsZUFBWjs7QUFDQSxNQUFJSixLQUFKLEVBQVc7QUFDVEksU0FBSyxhQUFNQSxLQUFOLHVCQUF3QkosS0FBeEIsTUFBTDtBQUNEOztBQUNELE1BQUlELE9BQU8sQ0FBQ00sR0FBWixFQUFpQjtBQUNmRCxTQUFLLGFBQU1BLEtBQU4sMkJBQUw7QUFDRDs7QUFDRCxzQkFDRTtBQUFLLE9BQUcsRUFBRUosS0FBVjtBQUFpQixhQUFTLEVBQUM7QUFBM0Isa0JBQ0U7QUFBSyxhQUFTLEVBQUM7QUFBZixrQkFDRTtBQUFNLGFBQVMsRUFBQyxrQkFBaEI7QUFBbUMsU0FBSyxFQUFFO0FBQUVNLGNBQVEsRUFBRTtBQUFaO0FBQTFDLGVBQ01GLEtBRE4sT0FERixlQUlFLHNFQUpGLGVBS0UseUVBQ0dILDZDQUFDLENBQUNNLElBQUYsQ0FDQ04sNkNBQUMsQ0FBQ08sR0FBRixDQUFNVCxPQUFPLENBQUNJLElBQWQsRUFBb0IsVUFBQU0sQ0FBQztBQUFBLHFCQUFPQSxDQUFDLENBQUNDLEtBQVQsZUFBbUJELENBQUMsQ0FBQ0UsS0FBckI7QUFBQSxHQUFyQixDQURELEVBRUMsSUFGRCxDQURILENBTEYsQ0FERixDQURGO0FBZ0JE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QUFDQyxPQUFGLENBQVVjLE9BQVYsQ0FBSixFQUF3QjtBQUN0QixlQUFPLElBQVA7QUFDRDs7QUFYTSx3QkFZOEIsS0FBS0gsS0FabkM7QUFBQSxVQVlDMEQsTUFaRCxlQVlDQSxNQVpEO0FBQUEsVUFZUzNDLFFBWlQsZUFZU0EsUUFaVDtBQUFBLFVBWW1CRSxNQVpuQixlQVltQkEsTUFabkI7QUFhUCwwQkFDRSwyREFBQyw0Q0FBRCxDQUFPLFFBQVAscUJBQ0U7QUFBSyxpQkFBUyxFQUFDO0FBQWYsc0JBQ0U7QUFBSyxpQkFBUyxFQUFDO0FBQWYsc0JBQ0U7QUFBTSxpQkFBUyxFQUFDLHVCQUFoQjtBQUF3QyxhQUFLLEVBQUU7QUFBRXhCLGtCQUFRLEVBQUU7QUFBWjtBQUEvQyxTQUNHVSxPQUFPLENBQUNnQixJQURYLENBREYsZUFJRTtBQUFNLGlCQUFTLEVBQUM7QUFBaEIsY0FBeUJoQixPQUFPLENBQUNoQixLQUFqQyxNQUpGLENBREYsQ0FERixlQVNFLDJEQUFDLHVEQUFEO0FBQ0UsZUFBTyxFQUFFZ0IsT0FEWDtBQUVFLGtCQUFVLEVBQUVtQixJQUZkO0FBR0UsYUFBSyxFQUFFbkIsT0FBTyxDQUFDaEIsS0FIakI7QUFJRSxZQUFJLEVBQUV1RSxNQUpSO0FBS0UsV0FBRyxFQUFFM0MsUUFBUSxDQUFDSSxJQUxoQjtBQU1FLGNBQU0sRUFBRUY7QUFOVixRQVRGLENBREY7QUF1QkQ7Ozs7RUE3TG1CMEMsNENBQUssQ0FBQ0MsUzs7QUErTDVCN0QsT0FBTyxDQUFDOEQsV0FBUixHQUFzQixTQUF0QjtBQUNBOUQsT0FBTyxDQUFDK0QsU0FBUixHQUFvQjtBQUNsQi9DLFVBQVEsRUFBRWdELGlEQUFTLENBQUNDLE1BREY7QUFFbEIvQyxRQUFNLEVBQUU4QyxpREFBUyxDQUFDRSxNQUZBO0FBR2xCUCxRQUFNLEVBQUVLLGlEQUFTLENBQUNHO0FBSEEsQ0FBcEIiLCJmaWxlIjoibWFpbi5jYmFmODIxNTFlMmEwMjk2MGFjNC5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmltcG9ydCB7IEJvdW5jZXIgfSBmcm9tIFwiLi4vLi4vQm91bmNlclwiO1xyXG5pbXBvcnQgeyBKU0FuY2hvciB9IGZyb20gXCIuLi8uLi9KU0FuY2hvclwiO1xyXG5pbXBvcnQgeyBSZW1vdmFibGVFcnJvciB9IGZyb20gXCIuLi8uLi9SZW1vdmFibGVFcnJvclwiO1xyXG5pbXBvcnQgeyBidWlsZFVSTFN0cmluZywgc2F2ZUNvbEZpbHRlclVybCB9IGZyb20gXCIuLi8uLi9hY3Rpb25zL3VybC11dGlsc1wiO1xyXG5pbXBvcnQgeyBleHBvcnRzIGFzIGd1IH0gZnJvbSBcIi4uLy4uL2R0YWxlL2dyaWRVdGlsc1wiO1xyXG5pbXBvcnQgeyBmZXRjaEpzb24gfSBmcm9tIFwiLi4vLi4vZmV0Y2hlclwiO1xyXG5pbXBvcnQgeyBidWlsZEJ1dHRvbiB9IGZyb20gXCIuLi8uLi90b2dnbGVVdGlsc1wiO1xyXG5pbXBvcnQgRGV0YWlsc0NoYXJ0cyBmcm9tIFwiLi9EZXRhaWxzQ2hhcnRzXCI7XHJcblxyXG5jb25zdCBCQVNFX0RFU0NSSUJFX1VSTCA9IFwiL2R0YWxlL2Rlc2NyaWJlXCI7XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5VW5pcXVlcyh1bmlxdWVzLCBkdHlwZSA9IG51bGwpIHtcclxuICBpZiAoXy5pc0VtcHR5KHVuaXF1ZXMuZGF0YSkpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuICBsZXQgdGl0bGUgPSBcIlVuaXF1ZSBWYWx1ZXNcIjtcclxuICBpZiAoZHR5cGUpIHtcclxuICAgIHRpdGxlID0gYCR7dGl0bGV9IG9mIHR5cGUgJyR7ZHR5cGV9J2A7XHJcbiAgfVxyXG4gIGlmICh1bmlxdWVzLnRvcCkge1xyXG4gICAgdGl0bGUgPSBgJHt0aXRsZX0gKHRvcCAxMDAgbW9zdCBjb21tb24pYDtcclxuICB9XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYga2V5PXtkdHlwZX0gY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTEyXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC13ZWlnaHQtYm9sZFwiIHN0eWxlPXt7IGZvbnRTaXplOiBcIjEyMCVcIiB9fT5cclxuICAgICAgICAgIHtgJHt0aXRsZX06YH1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICB7Xy5qb2luKFxyXG4gICAgICAgICAgICBfLm1hcCh1bmlxdWVzLmRhdGEsIHUgPT4gYCR7dS52YWx1ZX0gKCR7dS5jb3VudH0pYCksXHJcbiAgICAgICAgICAgIFwiLCBcIlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuY2xhc3MgRGV0YWlscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGVycm9yOiBudWxsLFxyXG4gICAgICBkZXRhaWxzOiBudWxsLFxyXG4gICAgICBkZWVwRGF0YTogXCJ1bmlxdWVzXCIsXHJcbiAgICAgIG91dGxpZXJzOiBudWxsLFxyXG4gICAgICBsb2FkaW5nT3V0bGllcnM6IGZhbHNlLFxyXG4gICAgfTtcclxuICAgIHRoaXMubG9hZERldGFpbHMgPSB0aGlzLmxvYWREZXRhaWxzLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLnJlbmRlclVuaXF1ZXMgPSB0aGlzLnJlbmRlclVuaXF1ZXMuYmluZCh0aGlzKTtcclxuICAgIHRoaXMucmVuZGVyRGVlcERhdGFUb2dnbGUgPSB0aGlzLnJlbmRlckRlZXBEYXRhVG9nZ2xlLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmxvYWRPdXRsaWVycyA9IHRoaXMubG9hZE91dGxpZXJzLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLnJlbmRlck91dGxpZXJzID0gdGhpcy5yZW5kZXJPdXRsaWVycy5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xyXG4gICAgaWYgKCFfLmlzRXF1YWwodGhpcy5wcm9wcy5zZWxlY3RlZCwgcHJldlByb3BzLnNlbGVjdGVkKSkge1xyXG4gICAgICB0aGlzLmxvYWREZXRhaWxzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsb2FkRGV0YWlscygpIHtcclxuICAgIGZldGNoSnNvbihgJHtCQVNFX0RFU0NSSUJFX1VSTH0vJHt0aGlzLnByb3BzLmRhdGFJZH0vJHtlbmNvZGVVUklDb21wb25lbnQodGhpcy5wcm9wcy5zZWxlY3RlZC5uYW1lKX1gLCBkZXRhaWxEYXRhID0+IHtcclxuICAgICAgY29uc3QgbmV3U3RhdGUgPSB7XHJcbiAgICAgICAgZXJyb3I6IG51bGwsXHJcbiAgICAgICAgZGV0YWlsczogbnVsbCxcclxuICAgICAgICBjb2RlOiBudWxsLFxyXG4gICAgICAgIG91dGxpZXJzOiBudWxsLFxyXG4gICAgICAgIGRlZXBEYXRhOiBcInVuaXF1ZXNcIixcclxuICAgICAgfTtcclxuICAgICAgaWYgKGRldGFpbERhdGEuZXJyb3IpIHtcclxuICAgICAgICBuZXdTdGF0ZS5lcnJvciA9IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTEyXCI+XHJcbiAgICAgICAgICAgIDxSZW1vdmFibGVFcnJvciB7Li4uZGV0YWlsRGF0YX0gLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIG5ld1N0YXRlLmRldGFpbHMgPSBfLnBpY2soZGV0YWlsRGF0YSwgW1wiZGVzY3JpYmVcIiwgXCJ1bmlxdWVzXCIsIFwiZHR5cGVfY291bnRzXCJdKTtcclxuICAgICAgbmV3U3RhdGUuZGV0YWlscy5uYW1lID0gdGhpcy5wcm9wcy5zZWxlY3RlZC5uYW1lO1xyXG4gICAgICBuZXdTdGF0ZS5kZXRhaWxzLmR0eXBlID0gdGhpcy5wcm9wcy5zZWxlY3RlZC5kdHlwZTtcclxuICAgICAgbmV3U3RhdGUuY29kZSA9IGRldGFpbERhdGEuY29kZTtcclxuICAgICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlbmRlclVuaXF1ZXMoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5kZWVwRGF0YSA9PSBcIm91dGxpZXJzXCIpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdW5pcXVlcyA9IF8uZ2V0KHRoaXMuc3RhdGUsIFwiZGV0YWlscy51bmlxdWVzXCIpIHx8IHt9O1xyXG4gICAgY29uc3QgZHR5cGVDdCA9IF8uc2l6ZSh1bmlxdWVzKTtcclxuICAgIHJldHVybiBfLm1hcCh1bmlxdWVzLCAoZHR5cGVVbmlxdWVzLCBkdHlwZSkgPT4gZGlzcGxheVVuaXF1ZXMoZHR5cGVVbmlxdWVzLCBkdHlwZUN0ID4gMSA/IGR0eXBlIDogbnVsbCkpO1xyXG4gIH1cclxuXHJcbiAgbG9hZE91dGxpZXJzKCkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGxvYWRpbmdPdXRsaWVyczogdHJ1ZSB9KTtcclxuICAgIGZldGNoSnNvbihgL2R0YWxlL291dGxpZXJzLyR7dGhpcy5wcm9wcy5kYXRhSWR9LyR7ZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMucHJvcHMuc2VsZWN0ZWQubmFtZSl9YCwgb3V0bGllckRhdGEgPT4ge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgb3V0bGllcnM6IG91dGxpZXJEYXRhLCBsb2FkaW5nT3V0bGllcnM6IGZhbHNlIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZW5kZXJEZWVwRGF0YVRvZ2dsZSgpIHtcclxuICAgIGlmIChfLmluY2x1ZGVzKFtcImZsb2F0XCIsIFwiaW50XCJdLCBndS5maW5kQ29sVHlwZSh0aGlzLnByb3BzLnNlbGVjdGVkLmR0eXBlKSkpIHtcclxuICAgICAgY29uc3QgeyBkZWVwRGF0YSwgb3V0bGllcnMsIGxvYWRpbmdPdXRsaWVycyB9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgY29uc3QgdG9nZ2xlID0gdmFsID0+ICgpID0+IHtcclxuICAgICAgICBjb25zdCBvdXRsaWVyc0NhbGxiYWNrID0gXy5pc051bGwob3V0bGllcnMpICYmICFsb2FkaW5nT3V0bGllcnMgPyB0aGlzLmxvYWRPdXRsaWVycyA6IF8ubm9vcDtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgZGVlcERhdGE6IHZhbCB9LCBvdXRsaWVyc0NhbGxiYWNrKTtcclxuICAgICAgfTtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyBwYi01XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1hdXRvIHBsLTBcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAgY29tcGFjdCBjb2wtYXV0b1wiPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gey4uLmJ1aWxkQnV0dG9uKGRlZXBEYXRhID09IFwidW5pcXVlc1wiLCB0b2dnbGUoXCJ1bmlxdWVzXCIpKX0+VW5pcXVlczwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gey4uLmJ1aWxkQnV0dG9uKGRlZXBEYXRhID09IFwib3V0bGllcnNcIiwgdG9nZ2xlKFwib3V0bGllcnNcIikpfT5PdXRsaWVyczwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICByZW5kZXJPdXRsaWVycygpIHtcclxuICAgIGlmICh0aGlzLnN0YXRlLmRlZXBEYXRhID09IFwidW5pcXVlc1wiKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuc3RhdGUubG9hZGluZ091dGxpZXJzKSB7XHJcbiAgICAgIHJldHVybiA8Qm91bmNlciAvPjtcclxuICAgIH1cclxuICAgIGNvbnN0IHsgb3V0bGllcnMgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBjb25zdCBvdXRsaWVyVmFsdWVzID0gXy5nZXQob3V0bGllcnMsIFwib3V0bGllcnNcIiwgW10pO1xyXG4gICAgaWYgKF8uaXNFbXB0eShvdXRsaWVyVmFsdWVzKSkge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYga2V5PXszfSBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTEyXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtd2VpZ2h0LWJvbGRcIiBzdHlsZT17eyBmb250U2l6ZTogXCIxMjAlXCIgfX0+XHJcbiAgICAgICAgICAgICAgTm8gT3V0bGllcnMgRGV0ZWN0ZWRcclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBzYXZlRmlsdGVyID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCBjZmcgPSB7IHR5cGU6IFwib3V0bGllcnNcIiB9O1xyXG4gICAgICBpZiAoIW91dGxpZXJzLnF1ZXJ5QXBwbGllZCkge1xyXG4gICAgICAgIGNmZy5xdWVyeSA9IG91dGxpZXJzLnF1ZXJ5O1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHVybCA9IGJ1aWxkVVJMU3RyaW5nKHNhdmVDb2xGaWx0ZXJVcmwodGhpcy5wcm9wcy5kYXRhSWQsIHRoaXMucHJvcHMuc2VsZWN0ZWQubmFtZSksIHtcclxuICAgICAgICBjZmc6IEpTT04uc3RyaW5naWZ5KGNmZyksXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLnNldFN0YXRlKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIG91dGxpZXJzOiBfLmFzc2lnbkluKHt9LCBvdXRsaWVycywge1xyXG4gICAgICAgICAgICBxdWVyeUFwcGxpZWQ6ICFvdXRsaWVycy5xdWVyeUFwcGxpZWQsXHJcbiAgICAgICAgICB9KSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZldGNoSnNvbih1cmwsICgpID0+IHdpbmRvdy5vcGVuZXIubG9jYXRpb24ucmVsb2FkKCkpXHJcbiAgICAgICk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFtcclxuICAgICAgPGRpdiBrZXk9ezF9IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXdlaWdodC1ib2xkXCIgc3R5bGU9e3sgZm9udFNpemU6IFwiMTIwJVwiIH19PlxyXG4gICAgICAgICAgICB7YCR7Xy5zaXplKG91dGxpZXJWYWx1ZXMpfSBPdXRsaWVycyBGb3VuZCR7b3V0bGllcnMudG9wID8gXCIgKHRvcCAxMDApXCIgOiBcIlwifTpgfVxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgPEpTQW5jaG9yIG9uQ2xpY2s9e3NhdmVGaWx0ZXJ9IGNsYXNzTmFtZT1cImQtYmxvY2tcIj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHItM1wiPntgJHtvdXRsaWVycy5xdWVyeUFwcGxpZWQgPyBcIlJlbW92ZVwiIDogXCJBcHBseVwifSBvdXRsaWVyIGZpbHRlcjpgfTwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC13ZWlnaHQtYm9sZFwiPntvdXRsaWVycy5xdWVyeX08L3NwYW4+XHJcbiAgICAgICAgICA8L0pTQW5jaG9yPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLWF1dG9cIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaG92ZXJhYmxlXCIgc3R5bGU9e3sgYm9yZGVyQm90dG9tOiBcIm5vbmVcIiB9fT5cclxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiaWNvLWNvZGUgcHItM1wiIC8+XHJcbiAgICAgICAgICAgIDxzcGFuPlZpZXcgQ29kZTwvc3Bhbj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJob3ZlcmFibGVfX2NvbnRlbnRcIiBzdHlsZT17eyB3aWR0aDogXCJhdXRvXCIgfX0+XHJcbiAgICAgICAgICAgICAgPHByZSBjbGFzc05hbWU9XCJtYi0wXCI+e291dGxpZXJzLmNvZGV9PC9wcmU+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PixcclxuICAgICAgPGRpdiBrZXk9ezJ9IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTEyXCI+XHJcbiAgICAgICAgICA8c3Bhbj57Xy5qb2luKF8uc29ydEJ5KG91dGxpZXJWYWx1ZXMpLCBcIiwgXCIpfTwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+LFxyXG4gICAgXTtcclxuICB9XHJcbiAgIC8qIENvbW1lbnRzIGFyb3VuZCByZW5kZXJEZWVwRGF0YVRvZ2dsZSwgcmVuZGVyVW5pcXVlcyBhbmQgcmVuZGVyT3V0bGllcnMgcmVtb3ZlcyB0aGVzZSBmcm9tIHZpZXcgKi9cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5lcnJvcikge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYga2V5PXsxfSBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTEyXCI+e3RoaXMuc3RhdGUuZXJyb3J9PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBjb25zdCB7IGRldGFpbHMsIGNvZGUgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBpZiAoXy5pc0VtcHR5KGRldGFpbHMpKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgY29uc3QgeyBkdHlwZXMsIHNlbGVjdGVkLCBkYXRhSWQgfSA9IHRoaXMucHJvcHM7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8UmVhY3QuRnJhZ21lbnQ+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1iLTAgZm9udC13ZWlnaHQtYm9sZFwiIHN0eWxlPXt7IGZvbnRTaXplOiBcIjJlbVwiIH19PlxyXG4gICAgICAgICAgICAgIHtkZXRhaWxzLm5hbWV9XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicGwtM1wiPih7ZGV0YWlscy5kdHlwZX0pPC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPERldGFpbHNDaGFydHNcclxuICAgICAgICAgIGRldGFpbHM9e2RldGFpbHN9XHJcbiAgICAgICAgICBkZXRhaWxDb2RlPXtjb2RlfVxyXG4gICAgICAgICAgZHR5cGU9e2RldGFpbHMuZHR5cGV9XHJcbiAgICAgICAgICBjb2xzPXtkdHlwZXN9XHJcbiAgICAgICAgICBjb2w9e3NlbGVjdGVkLm5hbWV9XHJcbiAgICAgICAgICBkYXRhSWQ9e2RhdGFJZH1cclxuICAgICAgICAvPlxyXG4gICAgICAgIHsvKiB7dGhpcy5yZW5kZXJEZWVwRGF0YVRvZ2dsZSgpfVxyXG4gICAgICAgIHt0aGlzLnJlbmRlclVuaXF1ZXMoKX1cclxuICAgICAgICB7dGhpcy5yZW5kZXJPdXRsaWVycygpfSAqL31cclxuICAgICAgPC9SZWFjdC5GcmFnbWVudD5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbkRldGFpbHMuZGlzcGxheU5hbWUgPSBcIkRldGFpbHNcIjtcclxuRGV0YWlscy5wcm9wVHlwZXMgPSB7XHJcbiAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgZGF0YUlkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIGR0eXBlczogUHJvcFR5cGVzLmFycmF5LFxyXG59O1xyXG5cclxuZXhwb3J0IHsgRGV0YWlscyB9O1xyXG4iXSwic291cmNlUm9vdCI6IiJ9