webpackHotUpdate("main",{

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
        style: "font-weight:bold"
      }, "SELECT COLUMNS TO VIEW:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
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


/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdGF0aWMvcG9wdXBzL2Rlc2NyaWJlL0Rlc2NyaWJlLmpzeCJdLCJuYW1lcyI6WyJEZXNjcmliZSIsInByb3BzIiwic3RhdGUiLCJsb2FkaW5nRHR5cGVzIiwiZHR5cGVzIiwiZHR5cGVzRmlsdGVyIiwic2VsZWN0ZWQiLCJmZXRjaEpzb24iLCJkdHlwZXNVcmwiLCJkYXRhSWQiLCJkdHlwZXNEYXRhIiwibmV3U3RhdGUiLCJlcnJvciIsInNldFN0YXRlIiwibGVuZ3RoIiwic2VsZWN0ZWRSb3ciLCJfIiwiZmluZCIsIm5hbWUiLCJjaGFydERhdGEiLCJzZWxlY3RlZENvbCIsImlzVW5kZWZpbmVkIiwiaGVhZCIsIm1hcCIsImQiLCJhc3NpZ24iLCJzYXZlIiwidmlzaWJpbGl0eSIsInJlZHVjZSIsIl9ncmlkIiwicmV0IiwiYXNzaWduSW4iLCJ2aXNpYmxlIiwiY2FsbGJhY2siLCJ3aW5kb3ciLCJvcGVuZXIiLCJsb2NhdGlvbiIsInJlbG9hZCIsImNsb3NlIiwic2VydmVyU3RhdGUiLCJ1cGRhdGVWaXNpYmlsaXR5IiwicHJvcGFnYXRlU3RhdGUiLCJtZyIsImhyZWYiLCJSZWFjdCIsIkNvbXBvbmVudCIsImRpc3BsYXlOYW1lIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsInNoYXBlIiwiYm9vbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztJQUVNQSxROzs7OztBQUNKLG9CQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7O0FBQ2pCLDhCQUFNQSxLQUFOO0FBQ0EsVUFBS0MsS0FBTCxHQUFhO0FBQ1hDLG1CQUFhLEVBQUUsSUFESjtBQUVYQyxZQUFNLEVBQUUsSUFGRztBQUdYQyxrQkFBWSxFQUFFLElBSEg7QUFJWEMsY0FBUSxF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bkIvQixXQUFTLEVBQUU2QixpREFBUyxDQUFDRyxLQUFWLENBQWdCO0FBQ3pCbkIsV0FBTyxFQUFFZ0IsaURBQVMsQ0FBQ0ksSUFBVixDQUFlRixVQURDO0FBRXpCOUIsZUFBVyxFQUFFNEIsaURBQVMsQ0FBQ0M7QUFGRSxHQUFoQjtBQUZRLENBQXJCIiwiZmlsZSI6Im1haW4uZTE2MTEwNzc4MWIwOWEwYmYwYjkuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcblxyXG5pbXBvcnQgeyBCb3VuY2VyV3JhcHBlciB9IGZyb20gXCIuLi8uLi9Cb3VuY2VyV3JhcHBlclwiO1xyXG5pbXBvcnQgeyBSZW1vdmFibGVFcnJvciB9IGZyb20gXCIuLi8uLi9SZW1vdmFibGVFcnJvclwiO1xyXG5pbXBvcnQgeyBkdHlwZXNVcmwgfSBmcm9tIFwiLi4vLi4vYWN0aW9ucy91cmwtdXRpbHNcIjtcclxuaW1wb3J0IHNlcnZlclN0YXRlIGZyb20gXCIuLi8uLi9kdGFsZS9zZXJ2ZXJTdGF0ZU1hbmFnZW1lbnRcIjtcclxuaW1wb3J0IHsgZmV0Y2hKc29uIH0gZnJvbSBcIi4uLy4uL2ZldGNoZXJcIjtcclxuaW1wb3J0IHsgRGV0YWlscyB9IGZyb20gXCIuL0RldGFpbHNcIjtcclxuaW1wb3J0IHsgRHR5cGVzR3JpZCB9IGZyb20gXCIuL0R0eXBlc0dyaWRcIjtcclxuXHJcbmNsYXNzIERlc2NyaWJlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgbG9hZGluZ0R0eXBlczogdHJ1ZSxcclxuICAgICAgZHR5cGVzOiBudWxsLFxyXG4gICAgICBkdHlwZXNGaWx0ZXI6IG51bGwsXHJcbiAgICAgIHNlbGVjdGVkOiBudWxsLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgZmV0Y2hKc29uKGR0eXBlc1VybCh0aGlzLnByb3BzLmRhdGFJZCksIGR0eXBlc0RhdGEgPT4ge1xyXG4gICAgICBjb25zdCBuZXdTdGF0ZSA9IHtcclxuICAgICAgICBlcnJvcjogbnVsbCxcclxuICAgICAgICBsb2FkaW5nRHR5cGVzOiBmYWxzZSxcclxuICAgICAgfTtcclxuICAgICAgaWYgKGR0eXBlc0RhdGEuZXJyb3IpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgZXJyb3I6IDxSZW1vdmFibGVFcnJvciB7Li4uZHR5cGVzRGF0YX0gLz4gfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIG5ld1N0YXRlLmR0eXBlcyA9IGR0eXBlc0RhdGEuZHR5cGVzO1xyXG4gICAgICBpZiAoZHR5cGVzRGF0YS5kdHlwZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkUm93ID0gXy5maW5kKGR0eXBlc0RhdGEuZHR5cGVzLCB7XHJcbiAgICAgICAgICBuYW1lOiB0aGlzLnByb3BzLmNoYXJ0RGF0YS5zZWxlY3RlZENvbCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoXy5pc1VuZGVmaW5lZChzZWxlY3RlZFJvdykpIHtcclxuICAgICAgICAgIHNlbGVjdGVkUm93ID0gXy5oZWFkKGR0eXBlc0RhdGEuZHR5cGVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbmV3U3RhdGUuZHR5cGVzID0gXy5tYXAobmV3U3RhdGUuZHR5cGVzLCBkID0+IF8uYXNzaWduKGQsIHsgc2VsZWN0ZWQ6IGQubmFtZSA9PSBzZWxlY3RlZFJvdy5uYW1lIH0pKTtcclxuICAgICAgICBuZXdTdGF0ZS5zZWxlY3RlZCA9IHNlbGVjdGVkUm93OyAvLyBieSBkZWZhdWx0LCBkaXNwbGF5IGZpcnN0IGNvbHVtblxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5lcnJvcikge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYga2V5PVwiYm9keVwiIGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cclxuICAgICAgICAgIHt0aGlzLnN0YXRlLmVycm9yfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgc2F2ZSA9ICgpID0+IHtcclxuICAgICAgY29uc3QgdmlzaWJpbGl0eSA9IF8ucmVkdWNlKHRoaXMuX2dyaWQuc3RhdGUuZHR5cGVzLCAocmV0LCBkKSA9PiBfLmFzc2lnbkluKHJldCwgeyBbZC5uYW1lXTogZC52aXNpYmxlIH0pLCB7fSk7XHJcbiAgICAgIGNvbnN0IGNhbGxiYWNrID0gKCkgPT4ge1xyXG4gICAgICAgIHdpbmRvdy5vcGVuZXIubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgd2luZG93LmNsb3NlKCk7XHJcbiAgICAgIH07XHJcbiAgICAgIHNlcnZlclN0YXRlLnVwZGF0ZVZpc2liaWxpdHkodGhpcy5wcm9wcy5kYXRhSWQsIHZpc2liaWxpdHksIGNhbGxiYWNrKTtcclxuICAgIH07XHJcbiAgICBjb25zdCBwcm9wYWdhdGVTdGF0ZSA9IHN0YXRlID0+IHRoaXMuc2V0U3RhdGUoc3RhdGUpO1xyXG4gICAgcmV0dXJuIFtcclxuICAgICAgPGRpdiBrZXk9XCJib2R5XCIgY2xhc3NOYW1lPVwibW9kYWwtYm9keSBkZXNjcmliZS1ib2R5XCI+XHJcbiAgICAgIDxkaXYgc3R5bGU9XCJmb250LXdlaWdodDpib2xkXCI+U0VMRUNUIENPTFVNTlMgVE8gVklFVzo8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNSBkZXNjcmliZS1kdHlwZXMtZ3JpZC1jb2xcIj5cclxuICAgICAgICAgICAgPEJvdW5jZXJXcmFwcGVyIHNob3dCb3VuY2VyPXt0aGlzLnN0YXRlLmxvYWRpbmdEdHlwZXN9PlxyXG4gICAgICAgICAgICAgIDxEdHlwZXNHcmlkIHJlZj17bWcgPT4gKHRoaXMuX2dyaWQgPSBtZyl9IGR0eXBlcz17dGhpcy5zdGF0ZS5kdHlwZXN9IHByb3BhZ2F0ZVN0YXRlPXtwcm9wYWdhdGVTdGF0ZX0gLz5cclxuICAgICAgICAgICAgPC9Cb3VuY2VyV3JhcHBlcj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgezxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTcgZGVzY3JpYmUtZGV0YWlscy1jb2xcIj5cclxuICAgICAgICAgICAgPERldGFpbHMgc2VsZWN0ZWQ9e3RoaXMuc3RhdGUuc2VsZWN0ZWR9IGRhdGFJZD17dGhpcy5wcm9wcy5kYXRhSWR9IGR0eXBlcz17dGhpcy5zdGF0ZS5kdHlwZXN9IC8+XHJcbiAgICAgICAgICA8L2Rpdj59XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PixcclxuICAgICAgPGRpdiBrZXk9XCJmb290ZXJcIiBjbGFzc05hbWU9XCJtb2RhbC1mb290ZXJcIj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9e3NhdmV9PlxyXG4gICAgICAgICAgPHNwYW4+U2F2ZTwvc3Bhbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9IHsoKSA9PiB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvZHRhbGUvbWFpbi97e2RhdGFfaWR9fSd9PlxyXG4gICAgICAgICAgPHNwYW4+UmVsb2FkPC9zcGFuPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj4sXHJcbiAgICBdO1xyXG4gIH1cclxufVxyXG5EZXNjcmliZS5kaXNwbGF5TmFtZSA9IFwiRGVzY3JpYmVcIjtcclxuRGVzY3JpYmUucHJvcFR5cGVzID0ge1xyXG4gIGRhdGFJZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gIGNoYXJ0RGF0YTogUHJvcFR5cGVzLnNoYXBlKHtcclxuICAgIHZpc2libGU6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICBzZWxlY3RlZENvbDogUHJvcFR5cGVzLnN0cmluZyxcclxuICB9KSxcclxufTtcclxuXHJcbmV4cG9ydCB7IERlc2NyaWJlIH07Il0sInNvdXJjZVJvb3QiOiIifQ==