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
  }, "".concat(title, ":"), " FARTS"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, lodash__WEBPACK_IMPORTED_MODULE_0___default.a.join(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(uniques.data, function (u) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdGF0aWMvcG9wdXBzL2Rlc2NyaWJlL0RldGFpbHMuanN4Il0sIm5hbWVzIjpbIkJBU0VfREVTQ1JJQkVfVVJMIiwiZGlzcGxheVVuaXF1ZXMiLCJ1bmlxdWVzIiwiZHR5cGUiLCJfIiwiaXNFbXB0eSIsImRhdGEiLCJ0aXRsZSIsInRvcCIsImZvbnRTaXplIiwiam9pbiIsIm1hcCIsInUiLCJ2YWx1ZSIsImNvdW50IiwiRGV0YWlscyIsInByb3BzIiwic3RhdGUiLCJlcnJvciIsImRldGFpbHMiLCJkZWVwRGF0YSIsIm91dGxpZXJzIiwibG9hZGluZ091dGxpZXJzIiwibG9hZERldGFpbHMiLCJiaW5kIiwicmVuZGVyVW5pcXVlcyIsInJlbmRlckRlZXBEYXRhVG9nZ2xlIiwibG9hZE91dGxpZXJzIiwicmVuZGVyT3V0bGllcnMiLCJwcmV2UHJvcHMiLCJpc0VxdWFsIiwic2VsZWN0ZWQiLCJmZXRjaEpzb24iLCJkYXRhSWQiLCJlbmNvZGVVUklDb21wb25lbnQiLCJuYW1lIiwiZGV0YWlsRGF0YSIsIm5ld1N0YXRlIiwiY29kZSIsInNldFN0YXRlIiwicGljayIsImdldCIsImR0eXBlQ3QiLCJzaXplIiwiZHR5cGVVbmlxdWVzIiwib3V0bGllckRhdGEiLCJpbmNsdWRlcyIsImd1IiwiZmluZENvbFR5cGUiLCJ0b2dnbGUiLCJ2YWwiLCJvdXRsaWVyc0NhbGxiYWNrIiwiaXNOdWxsIiwibm9vcCIsImJ1aWxkQnV0dG9uIiwib3V0bGllclZhbHVlcyIsInNhdmVGaWx0ZXIiLCJjZmciLCJ0eXBlIiwicXVlcnlBcHBsaWVkIiwicXVlcnkiLCJ1cmwiLCJidWlsZFVSTFN0cmluZyIsInNhdmVDb2xGaWx0ZXJVcmwiLCJKU09OIiwic3RyaW5naWZ5IiwiYXNzaWduSW4iLCJ3aW5kb3ciLCJvcGVuZXIiLCJsb2NhdGlvbiIsInJlbG9hZCIsImJvcmRlckJvdHRvbSIsIndpZHRoIiwic29ydEJ5IiwiZHR5cGVzIiwiUmVhY3QiLCJDb21wb25lbnQiLCJkaXNwbGF5TmFtZSIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCIsInN0cmluZyIsImFycmF5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEsaUJBQWlCLEdBQUcsaUJBQTFCOztBQUVBLFNBQVNDLGNBQVQsQ0FBd0JDLE9BQXhCLEVBQStDO0FBQUEsTUFBZEMsS0FBYyx1RUFBTixJQUFNOztBQUM3QyxNQUFJQyw2Q0FBQyxDQUFDQyxPQUFGLENBQVVILE9BQU8sQ0FBQ0ksSUFBbEIsQ0FBSixFQUE2QjtBQUMzQixXQUFPLElBQVA7QUFDRDs7QUFDRCxNQUFJQyxLQUFLLEdBQUcsZUFBWjs7QUFDQSxNQUFJSixLQUFKLEVBQVc7QUFDVEksU0FBSyxhQUFNQSxLQUFOLHVCQUF3QkosS0FBeEIsTUFBTDtBQUNEOztBQUNELE1BQUlELE9BQU8sQ0FBQ00sR0FBWixFQUFpQjtBQUNmRCxTQUFLLGFBQU1BLEtBQU4sMkJBQUw7QUFDRDs7QUFDRCxzQkFDRTtBQUFLLE9BQUcsRUFBRUosS0FBVjtBQUFpQixhQUFTLEVBQUM7QUFBM0Isa0JBQ0U7QUFBSyxhQUFTLEVBQUM7QUFBZixrQkFDRTtBQUFNLGFBQVMsRUFBQyxrQkFBaEI7QUFBbUMsU0FBSyxFQUFFO0FBQUVNLGNBQVEsRUFBRTtBQUFaO0FBQTFDLGVBQ01GLEtBRE4saUJBREYsZUFJRSxzRUFKRixlQUtFLHlFQUNHSCw2Q0FBQyxDQUFDTSxJQUFGLENBQ0NOLDZDQUFDLENBQUNPLEdBQUYsQ0FBTVQsT0FBTyxDQUFDSSxJQUFkLEVBQW9CLFVBQUFNLENBQUM7QUFBQSxxQkFBT0EsQ0FBQyxDQUFDQyxLQUFULGVBQW1CRCxDQUFDLENBQUNFLEtBQXJCO0FBQUEsR0FBckIsQ0FERCxFQUVDLElBRkQsQ0FESCxDQUxGLENBREYsQ0FERjtBQWdC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Q0FBQ0MsT0FBRixDQUFVYyxPQUFWLENBQUosRUFBd0I7QUFDdEIsZUFBTyxJQUFQO0FBQ0Q7O0FBWE0sd0JBWThCLEtBQUtILEtBWm5DO0FBQUEsVUFZQzBELE1BWkQsZUFZQ0EsTUFaRDtBQUFBLFVBWVMzQyxRQVpULGVBWVNBLFFBWlQ7QUFBQSxVQVltQkUsTUFabkIsZUFZbUJBLE1BWm5CO0FBYVAsMEJBQ0UsMkRBQUMsNENBQUQsQ0FBTyxRQUFQLHFCQUNFO0FBQUssaUJBQVMsRUFBQztBQUFmLHNCQUNFO0FBQUssaUJBQVMsRUFBQztBQUFmLHNCQUNFO0FBQU0saUJBQVMsRUFBQyx1QkFBaEI7QUFBd0MsYUFBSyxFQUFFO0FBQUV4QixrQkFBUSxFQUFFO0FBQVo7QUFBL0MsU0FDR1UsT0FBTyxDQUFDZ0IsSUFEWCxDQURGLGVBSUU7QUFBTSxpQkFBUyxFQUFDO0FBQWhCLGNBQXlCaEIsT0FBTyxDQUFDaEIsS0FBakMsTUFKRixDQURGLENBREYsZUFTRSwyREFBQyx1REFBRDtBQUNFLGVBQU8sRUFBRWdCLE9BRFg7QUFFRSxrQkFBVSxFQUFFbUIsSUFGZDtBQUdFLGFBQUssRUFBRW5CLE9BQU8sQ0FBQ2hCLEtBSGpCO0FBSUUsWUFBSSxFQUFFdUUsTUFKUjtBQUtFLFdBQUcsRUFBRTNDLFFBQVEsQ0FBQ0ksSUFMaEI7QUFNRSxjQUFNLEVBQUVGO0FBTlYsUUFURixDQURGO0FBdUJEOzs7O0VBN0xtQjBDLDRDQUFLLENBQUNDLFM7O0FBK0w1QjdELE9BQU8sQ0FBQzhELFdBQVIsR0FBc0IsU0FBdEI7QUFDQTlELE9BQU8sQ0FBQytELFNBQVIsR0FBb0I7QUFDbEIvQyxVQUFRLEVBQUVnRCxpREFBUyxDQUFDQyxNQURGO0FBRWxCL0MsUUFBTSxFQUFFOEMsaURBQVMsQ0FBQ0UsTUFGQTtBQUdsQlAsUUFBTSxFQUFFSyxpREFBUyxDQUFDRztBQUhBLENBQXBCIiwiZmlsZSI6Im1haW4uMWYwN2RiNTBiMWE0YjBlMmRjMWIuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcblxyXG5pbXBvcnQgeyBCb3VuY2VyIH0gZnJvbSBcIi4uLy4uL0JvdW5jZXJcIjtcclxuaW1wb3J0IHsgSlNBbmNob3IgfSBmcm9tIFwiLi4vLi4vSlNBbmNob3JcIjtcclxuaW1wb3J0IHsgUmVtb3ZhYmxlRXJyb3IgfSBmcm9tIFwiLi4vLi4vUmVtb3ZhYmxlRXJyb3JcIjtcclxuaW1wb3J0IHsgYnVpbGRVUkxTdHJpbmcsIHNhdmVDb2xGaWx0ZXJVcmwgfSBmcm9tIFwiLi4vLi4vYWN0aW9ucy91cmwtdXRpbHNcIjtcclxuaW1wb3J0IHsgZXhwb3J0cyBhcyBndSB9IGZyb20gXCIuLi8uLi9kdGFsZS9ncmlkVXRpbHNcIjtcclxuaW1wb3J0IHsgZmV0Y2hKc29uIH0gZnJvbSBcIi4uLy4uL2ZldGNoZXJcIjtcclxuaW1wb3J0IHsgYnVpbGRCdXR0b24gfSBmcm9tIFwiLi4vLi4vdG9nZ2xlVXRpbHNcIjtcclxuaW1wb3J0IERldGFpbHNDaGFydHMgZnJvbSBcIi4vRGV0YWlsc0NoYXJ0c1wiO1xyXG5cclxuY29uc3QgQkFTRV9ERVNDUklCRV9VUkwgPSBcIi9kdGFsZS9kZXNjcmliZVwiO1xyXG5cclxuZnVuY3Rpb24gZGlzcGxheVVuaXF1ZXModW5pcXVlcywgZHR5cGUgPSBudWxsKSB7XHJcbiAgaWYgKF8uaXNFbXB0eSh1bmlxdWVzLmRhdGEpKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbiAgbGV0IHRpdGxlID0gXCJVbmlxdWUgVmFsdWVzXCI7XHJcbiAgaWYgKGR0eXBlKSB7XHJcbiAgICB0aXRsZSA9IGAke3RpdGxlfSBvZiB0eXBlICcke2R0eXBlfSdgO1xyXG4gIH1cclxuICBpZiAodW5pcXVlcy50b3ApIHtcclxuICAgIHRpdGxlID0gYCR7dGl0bGV9ICh0b3AgMTAwIG1vc3QgY29tbW9uKWA7XHJcbiAgfVxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGtleT17ZHR5cGV9IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS0xMlwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtd2VpZ2h0LWJvbGRcIiBzdHlsZT17eyBmb250U2l6ZTogXCIxMjAlXCIgfX0+XHJcbiAgICAgICAgICB7YCR7dGl0bGV9OmB9IEZBUlRTXHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDxiciAvPlxyXG4gICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAge18uam9pbihcclxuICAgICAgICAgICAgXy5tYXAodW5pcXVlcy5kYXRhLCB1ID0+IGAke3UudmFsdWV9ICgke3UuY291bnR9KWApLFxyXG4gICAgICAgICAgICBcIiwgXCJcclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmNsYXNzIERldGFpbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBlcnJvcjogbnVsbCxcclxuICAgICAgZGV0YWlsczogbnVsbCxcclxuICAgICAgZGVlcERhdGE6IFwidW5pcXVlc1wiLFxyXG4gICAgICBvdXRsaWVyczogbnVsbCxcclxuICAgICAgbG9hZGluZ091dGxpZXJzOiBmYWxzZSxcclxuICAgIH07XHJcbiAgICB0aGlzLmxvYWREZXRhaWxzID0gdGhpcy5sb2FkRGV0YWlscy5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5yZW5kZXJVbmlxdWVzID0gdGhpcy5yZW5kZXJVbmlxdWVzLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLnJlbmRlckRlZXBEYXRhVG9nZ2xlID0gdGhpcy5yZW5kZXJEZWVwRGF0YVRvZ2dsZS5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5sb2FkT3V0bGllcnMgPSB0aGlzLmxvYWRPdXRsaWVycy5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5yZW5kZXJPdXRsaWVycyA9IHRoaXMucmVuZGVyT3V0bGllcnMuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcclxuICAgIGlmICghXy5pc0VxdWFsKHRoaXMucHJvcHMuc2VsZWN0ZWQsIHByZXZQcm9wcy5zZWxlY3RlZCkpIHtcclxuICAgICAgdGhpcy5sb2FkRGV0YWlscygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbG9hZERldGFpbHMoKSB7XHJcbiAgICBmZXRjaEpzb24oYCR7QkFTRV9ERVNDUklCRV9VUkx9LyR7dGhpcy5wcm9wcy5kYXRhSWR9LyR7ZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMucHJvcHMuc2VsZWN0ZWQubmFtZSl9YCwgZGV0YWlsRGF0YSA9PiB7XHJcbiAgICAgIGNvbnN0IG5ld1N0YXRlID0ge1xyXG4gICAgICAgIGVycm9yOiBudWxsLFxyXG4gICAgICAgIGRldGFpbHM6IG51bGwsXHJcbiAgICAgICAgY29kZTogbnVsbCxcclxuICAgICAgICBvdXRsaWVyczogbnVsbCxcclxuICAgICAgICBkZWVwRGF0YTogXCJ1bmlxdWVzXCIsXHJcbiAgICAgIH07XHJcbiAgICAgIGlmIChkZXRhaWxEYXRhLmVycm9yKSB7XHJcbiAgICAgICAgbmV3U3RhdGUuZXJyb3IgPSAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0xMlwiPlxyXG4gICAgICAgICAgICA8UmVtb3ZhYmxlRXJyb3Igey4uLmRldGFpbERhdGF9IC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBuZXdTdGF0ZS5kZXRhaWxzID0gXy5waWNrKGRldGFpbERhdGEsIFtcImRlc2NyaWJlXCIsIFwidW5pcXVlc1wiLCBcImR0eXBlX2NvdW50c1wiXSk7XHJcbiAgICAgIG5ld1N0YXRlLmRldGFpbHMubmFtZSA9IHRoaXMucHJvcHMuc2VsZWN0ZWQubmFtZTtcclxuICAgICAgbmV3U3RhdGUuZGV0YWlscy5kdHlwZSA9IHRoaXMucHJvcHMuc2VsZWN0ZWQuZHR5cGU7XHJcbiAgICAgIG5ld1N0YXRlLmNvZGUgPSBkZXRhaWxEYXRhLmNvZGU7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZW5kZXJVbmlxdWVzKCkge1xyXG4gICAgaWYgKHRoaXMuc3RhdGUuZGVlcERhdGEgPT0gXCJvdXRsaWVyc1wiKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHVuaXF1ZXMgPSBfLmdldCh0aGlzLnN0YXRlLCBcImRldGFpbHMudW5pcXVlc1wiKSB8fCB7fTtcclxuICAgIGNvbnN0IGR0eXBlQ3QgPSBfLnNpemUodW5pcXVlcyk7XHJcbiAgICByZXR1cm4gXy5tYXAodW5pcXVlcywgKGR0eXBlVW5pcXVlcywgZHR5cGUpID0+IGRpc3BsYXlVbmlxdWVzKGR0eXBlVW5pcXVlcywgZHR5cGVDdCA+IDEgPyBkdHlwZSA6IG51bGwpKTtcclxuICB9XHJcblxyXG4gIGxvYWRPdXRsaWVycygpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBsb2FkaW5nT3V0bGllcnM6IHRydWUgfSk7XHJcbiAgICBmZXRjaEpzb24oYC9kdGFsZS9vdXRsaWVycy8ke3RoaXMucHJvcHMuZGF0YUlkfS8ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLnByb3BzLnNlbGVjdGVkLm5hbWUpfWAsIG91dGxpZXJEYXRhID0+IHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IG91dGxpZXJzOiBvdXRsaWVyRGF0YSwgbG9hZGluZ091dGxpZXJzOiBmYWxzZSB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyRGVlcERhdGFUb2dnbGUoKSB7XHJcbiAgICBpZiAoXy5pbmNsdWRlcyhbXCJmbG9hdFwiLCBcImludFwiXSwgZ3UuZmluZENvbFR5cGUodGhpcy5wcm9wcy5zZWxlY3RlZC5kdHlwZSkpKSB7XHJcbiAgICAgIGNvbnN0IHsgZGVlcERhdGEsIG91dGxpZXJzLCBsb2FkaW5nT3V0bGllcnMgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgIGNvbnN0IHRvZ2dsZSA9IHZhbCA9PiAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgb3V0bGllcnNDYWxsYmFjayA9IF8uaXNOdWxsKG91dGxpZXJzKSAmJiAhbG9hZGluZ091dGxpZXJzID8gdGhpcy5sb2FkT3V0bGllcnMgOiBfLm5vb3A7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGRlZXBEYXRhOiB2YWwgfSwgb3V0bGllcnNDYWxsYmFjayk7XHJcbiAgICAgIH07XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgcGItNVwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtYXV0byBwbC0wXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIGNvbXBhY3QgY29sLWF1dG9cIj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIHsuLi5idWlsZEJ1dHRvbihkZWVwRGF0YSA9PSBcInVuaXF1ZXNcIiwgdG9nZ2xlKFwidW5pcXVlc1wiKSl9PlVuaXF1ZXM8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIHsuLi5idWlsZEJ1dHRvbihkZWVwRGF0YSA9PSBcIm91dGxpZXJzXCIsIHRvZ2dsZShcIm91dGxpZXJzXCIpKX0+T3V0bGllcnM8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyT3V0bGllcnMoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5kZWVwRGF0YSA9PSBcInVuaXF1ZXNcIikge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnN0YXRlLmxvYWRpbmdPdXRsaWVycykge1xyXG4gICAgICByZXR1cm4gPEJvdW5jZXIgLz47XHJcbiAgICB9XHJcbiAgICBjb25zdCB7IG91dGxpZXJzIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgY29uc3Qgb3V0bGllclZhbHVlcyA9IF8uZ2V0KG91dGxpZXJzLCBcIm91dGxpZXJzXCIsIFtdKTtcclxuICAgIGlmIChfLmlzRW1wdHkob3V0bGllclZhbHVlcykpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGtleT17M30gY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS0xMlwiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXdlaWdodC1ib2xkXCIgc3R5bGU9e3sgZm9udFNpemU6IFwiMTIwJVwiIH19PlxyXG4gICAgICAgICAgICAgIE5vIE91dGxpZXJzIERldGVjdGVkXHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgc2F2ZUZpbHRlciA9ICgpID0+IHtcclxuICAgICAgY29uc3QgY2ZnID0geyB0eXBlOiBcIm91dGxpZXJzXCIgfTtcclxuICAgICAgaWYgKCFvdXRsaWVycy5xdWVyeUFwcGxpZWQpIHtcclxuICAgICAgICBjZmcucXVlcnkgPSBvdXRsaWVycy5xdWVyeTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCB1cmwgPSBidWlsZFVSTFN0cmluZyhzYXZlQ29sRmlsdGVyVXJsKHRoaXMucHJvcHMuZGF0YUlkLCB0aGlzLnByb3BzLnNlbGVjdGVkLm5hbWUpLCB7XHJcbiAgICAgICAgY2ZnOiBKU09OLnN0cmluZ2lmeShjZmcpLFxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5zZXRTdGF0ZShcclxuICAgICAgICB7XHJcbiAgICAgICAgICBvdXRsaWVyczogXy5hc3NpZ25Jbih7fSwgb3V0bGllcnMsIHtcclxuICAgICAgICAgICAgcXVlcnlBcHBsaWVkOiAhb3V0bGllcnMucXVlcnlBcHBsaWVkLFxyXG4gICAgICAgICAgfSksXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmZXRjaEpzb24odXJsLCAoKSA9PiB3aW5kb3cub3BlbmVyLmxvY2F0aW9uLnJlbG9hZCgpKVxyXG4gICAgICApO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIDxkaXYga2V5PXsxfSBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC13ZWlnaHQtYm9sZFwiIHN0eWxlPXt7IGZvbnRTaXplOiBcIjEyMCVcIiB9fT5cclxuICAgICAgICAgICAge2Ake18uc2l6ZShvdXRsaWVyVmFsdWVzKX0gT3V0bGllcnMgRm91bmQke291dGxpZXJzLnRvcCA/IFwiICh0b3AgMTAwKVwiIDogXCJcIn06YH1cclxuICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgIDxKU0FuY2hvciBvbkNsaWNrPXtzYXZlRmlsdGVyfSBjbGFzc05hbWU9XCJkLWJsb2NrXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInByLTNcIj57YCR7b3V0bGllcnMucXVlcnlBcHBsaWVkID8gXCJSZW1vdmVcIiA6IFwiQXBwbHlcIn0gb3V0bGllciBmaWx0ZXI6YH08L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtd2VpZ2h0LWJvbGRcIj57b3V0bGllcnMucXVlcnl9PC9zcGFuPlxyXG4gICAgICAgICAgPC9KU0FuY2hvcj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1hdXRvXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhvdmVyYWJsZVwiIHN0eWxlPXt7IGJvcmRlckJvdHRvbTogXCJub25lXCIgfX0+XHJcbiAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImljby1jb2RlIHByLTNcIiAvPlxyXG4gICAgICAgICAgICA8c3Bhbj5WaWV3IENvZGU8L3NwYW4+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaG92ZXJhYmxlX19jb250ZW50XCIgc3R5bGU9e3sgd2lkdGg6IFwiYXV0b1wiIH19PlxyXG4gICAgICAgICAgICAgIDxwcmUgY2xhc3NOYW1lPVwibWItMFwiPntvdXRsaWVycy5jb2RlfTwvcHJlPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj4sXHJcbiAgICAgIDxkaXYga2V5PXsyfSBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS0xMlwiPlxyXG4gICAgICAgICAgPHNwYW4+e18uam9pbihfLnNvcnRCeShvdXRsaWVyVmFsdWVzKSwgXCIsIFwiKX08L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PixcclxuICAgIF07XHJcbiAgfVxyXG4gICAvKiBDb21tZW50cyBhcm91bmQgcmVuZGVyRGVlcERhdGFUb2dnbGUsIHJlbmRlclVuaXF1ZXMgYW5kIHJlbmRlck91dGxpZXJzIHJlbW92ZXMgdGhlc2UgZnJvbSB2aWV3ICovXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgaWYgKHRoaXMuc3RhdGUuZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGtleT17MX0gY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS0xMlwiPnt0aGlzLnN0YXRlLmVycm9yfTwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgY29uc3QgeyBkZXRhaWxzLCBjb2RlIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgaWYgKF8uaXNFbXB0eShkZXRhaWxzKSkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGNvbnN0IHsgZHR5cGVzLCBzZWxlY3RlZCwgZGF0YUlkIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPFJlYWN0LkZyYWdtZW50PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYi0wIGZvbnQtd2VpZ2h0LWJvbGRcIiBzdHlsZT17eyBmb250U2l6ZTogXCIyZW1cIiB9fT5cclxuICAgICAgICAgICAgICB7ZGV0YWlscy5uYW1lfVxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInBsLTNcIj4oe2RldGFpbHMuZHR5cGV9KTwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxEZXRhaWxzQ2hhcnRzXHJcbiAgICAgICAgICBkZXRhaWxzPXtkZXRhaWxzfVxyXG4gICAgICAgICAgZGV0YWlsQ29kZT17Y29kZX1cclxuICAgICAgICAgIGR0eXBlPXtkZXRhaWxzLmR0eXBlfVxyXG4gICAgICAgICAgY29scz17ZHR5cGVzfVxyXG4gICAgICAgICAgY29sPXtzZWxlY3RlZC5uYW1lfVxyXG4gICAgICAgICAgZGF0YUlkPXtkYXRhSWR9XHJcbiAgICAgICAgLz5cclxuICAgICAgICB7Lyoge3RoaXMucmVuZGVyRGVlcERhdGFUb2dnbGUoKX1cclxuICAgICAgICB7dGhpcy5yZW5kZXJVbmlxdWVzKCl9XHJcbiAgICAgICAge3RoaXMucmVuZGVyT3V0bGllcnMoKX0gKi99XHJcbiAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5EZXRhaWxzLmRpc3BsYXlOYW1lID0gXCJEZXRhaWxzXCI7XHJcbkRldGFpbHMucHJvcFR5cGVzID0ge1xyXG4gIHNlbGVjdGVkOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gIGRhdGFJZDogUHJvcFR5cGVzLnN0cmluZyxcclxuICBkdHlwZXM6IFByb3BUeXBlcy5hcnJheSxcclxufTtcclxuXHJcbmV4cG9ydCB7IERldGFpbHMgfTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==