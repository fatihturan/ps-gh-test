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
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, "Save")))];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdGF0aWMvcG9wdXBzL2Rlc2NyaWJlL0Rlc2NyaWJlLmpzeCJdLCJuYW1lcyI6WyJEZXNjcmliZSIsInByb3BzIiwic3RhdGUiLCJsb2FkaW5nRHR5cGVzIiwiZHR5cGVzIiwiZHR5cGVzRmlsdGVyIiwic2VsZWN0ZWQiLCJmZXRjaEpzb24iLCJkdHlwZXNVcmwiLCJkYXRhSWQiLCJkdHlwZXNEYXRhIiwibmV3U3RhdGUiLCJlcnJvciIsInNldFN0YXRlIiwibGVuZ3RoIiwic2VsZWN0ZWRSb3ciLCJfIiwiZmluZCIsIm5hbWUiLCJjaGFydERhdGEiLCJzZWxlY3RlZENvbCIsImlzVW5kZWZpbmVkIiwiaGVhZCIsIm1hcCIsImQiLCJhc3NpZ24iLCJzYXZlIiwidmlzaWJpbGl0eSIsInJlZHVjZSIsIl9ncmlkIiwicmV0IiwiYXNzaWduSW4iLCJ2aXNpYmxlIiwiY2FsbGJhY2siLCJ3aW5kb3ciLCJjbG9zZSIsInNlcnZlclN0YXRlIiwidXBkYXRlVmlzaWJpbGl0eSIsInByb3BhZ2F0ZVN0YXRlIiwibWciLCJSZWFjdCIsIkNvbXBvbmVudCIsImRpc3BsYXlOYW1lIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsInNoYXBlIiwiYm9vbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztJQUVNQSxROzs7OztBQUNKLG9CQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7O0FBQ2pCLDhCQUFNQSxLQUFOO0FBQ0EsVUFBS0MsS0FBTCxHQUFhO0FBQ1hDLG1CQUFhLEVBQUUsSUFESjtBQUVYQyxZQUFNLEVBQUUsSUFGRztBQUdYQyxrQkFBWSxFQUFFLElBSEg7QUFJWEMsY0FBUSxFQUFFO0FBSkMsS0FBYjtBQUZpQjtBQVFsQjs7Ozt3Q0FFbUI7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S0FBS0EsS0FBTCxDQUFXQztBQUF4QyxzQkFDRSwyREFBQyxzREFBRDtBQUFZLFdBQUcsRUFBRSxhQUFBb0MsRUFBRTtBQUFBLGlCQUFLLE1BQUksQ0FBQ1YsS0FBTCxHQUFhVSxFQUFsQjtBQUFBLFNBQW5CO0FBQTBDLGNBQU0sRUFBRSxLQUFLckMsS0FBTCxDQUFXRSxNQUE3RDtBQUFxRSxzQkFBYyxFQUFFa0M7QUFBckYsUUFERixDQURGLENBREYsZUFNRTtBQUFLLGlCQUFTLEVBQUM7QUFBZixzQkFDRSwyREFBQyxnREFBRDtBQUFTLGdCQUFRLEVBQUUsS0FBS3BDLEtBQUwsQ0FBV0ksUUFBOUI7QUFBd0MsY0FBTSxFQUFFLEtBQUtMLEtBQUwsQ0FBV1EsTUFBM0Q7QUFBbUUsY0FBTSxFQUFFLEtBQUtQLEtBQUwsQ0FBV0U7QUFBdEYsUUFERixDQU5GLENBREYsQ0FESyxlQWFMO0FBQUssV0FBRyxFQUFDLFFBQVQ7QUFBa0IsaUJBQVMsRUFBQztBQUE1QixzQkFDRTtBQUFRLGlCQUFTLEVBQUMsaUJBQWxCO0FBQW9DLGVBQU8sRUFBRXNCO0FBQTdDLHNCQUNFLGdGQURGLENBREYsQ0FiSyxDQUFQO0FBbUJEOzs7O0VBdkVvQmMsNENBQUssQ0FBQ0MsUzs7QUF5RTdCekMsUUFBUSxDQUFDMEMsV0FBVCxHQUF1QixVQUF2QjtBQUNBMUMsUUFBUSxDQUFDMkMsU0FBVCxHQUFxQjtBQUNuQmxDLFFBQU0sRUFBRW1DLGlEQUFTLENBQUNDLE1BQVYsQ0FBaUJDLFVBRE47QUFFbkIzQixXQUFTLEVBQUV5QixpREFBUyxDQUFDRyxLQUFWLENBQWdCO0FBQ3pCZixXQUFPLEVBQUVZLGlEQUFTLENBQUNJLElBQVYsQ0FBZUYsVUFEQztBQUV6QjFCLGVBQVcsRUFBRXdCLGlEQUFTLENBQUNDO0FBRkUsR0FBaEI7QUFGUSxDQUFyQiIsImZpbGUiOiJtYWluLmFhOWNjODQ4OThjY2JlMTQ5MDdkLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuaW1wb3J0IHsgQm91bmNlcldyYXBwZXIgfSBmcm9tIFwiLi4vLi4vQm91bmNlcldyYXBwZXJcIjtcclxuaW1wb3J0IHsgUmVtb3ZhYmxlRXJyb3IgfSBmcm9tIFwiLi4vLi4vUmVtb3ZhYmxlRXJyb3JcIjtcclxuaW1wb3J0IHsgZHR5cGVzVXJsIH0gZnJvbSBcIi4uLy4uL2FjdGlvbnMvdXJsLXV0aWxzXCI7XHJcbmltcG9ydCBzZXJ2ZXJTdGF0ZSBmcm9tIFwiLi4vLi4vZHRhbGUvc2VydmVyU3RhdGVNYW5hZ2VtZW50XCI7XHJcbmltcG9ydCB7IGZldGNoSnNvbiB9IGZyb20gXCIuLi8uLi9mZXRjaGVyXCI7XHJcbmltcG9ydCB7IERldGFpbHMgfSBmcm9tIFwiLi9EZXRhaWxzXCI7XHJcbmltcG9ydCB7IER0eXBlc0dyaWQgfSBmcm9tIFwiLi9EdHlwZXNHcmlkXCI7XHJcblxyXG5jbGFzcyBEZXNjcmliZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGxvYWRpbmdEdHlwZXM6IHRydWUsXHJcbiAgICAgIGR0eXBlczogbnVsbCxcclxuICAgICAgZHR5cGVzRmlsdGVyOiBudWxsLFxyXG4gICAgICBzZWxlY3RlZDogbnVsbCxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIGZldGNoSnNvbihkdHlwZXNVcmwodGhpcy5wcm9wcy5kYXRhSWQpLCBkdHlwZXNEYXRhID0+IHtcclxuICAgICAgY29uc3QgbmV3U3RhdGUgPSB7XHJcbiAgICAgICAgZXJyb3I6IG51bGwsXHJcbiAgICAgICAgbG9hZGluZ0R0eXBlczogZmFsc2UsXHJcbiAgICAgIH07XHJcbiAgICAgIGlmIChkdHlwZXNEYXRhLmVycm9yKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGVycm9yOiA8UmVtb3ZhYmxlRXJyb3Igey4uLmR0eXBlc0RhdGF9IC8+IH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBuZXdTdGF0ZS5kdHlwZXMgPSBkdHlwZXNEYXRhLmR0eXBlcztcclxuICAgICAgaWYgKGR0eXBlc0RhdGEuZHR5cGVzLmxlbmd0aCkge1xyXG4gICAgICAgIGxldCBzZWxlY3RlZFJvdyA9IF8uZmluZChkdHlwZXNEYXRhLmR0eXBlcywge1xyXG4gICAgICAgICAgbmFtZTogdGhpcy5wcm9wcy5jaGFydERhdGEuc2VsZWN0ZWRDb2wsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKF8uaXNVbmRlZmluZWQoc2VsZWN0ZWRSb3cpKSB7XHJcbiAgICAgICAgICBzZWxlY3RlZFJvdyA9IF8uaGVhZChkdHlwZXNEYXRhLmR0eXBlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5ld1N0YXRlLmR0eXBlcyA9IF8ubWFwKG5ld1N0YXRlLmR0eXBlcywgZCA9PiBfLmFzc2lnbihkLCB7IHNlbGVjdGVkOiBkLm5hbWUgPT0gc2VsZWN0ZWRSb3cubmFtZSB9KSk7XHJcbiAgICAgICAgbmV3U3RhdGUuc2VsZWN0ZWQgPSBzZWxlY3RlZFJvdzsgLy8gYnkgZGVmYXVsdCwgZGlzcGxheSBmaXJzdCBjb2x1bW5cclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNldFN0YXRlKG5ld1N0YXRlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgaWYgKHRoaXMuc3RhdGUuZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGtleT1cImJvZHlcIiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XHJcbiAgICAgICAgICB7dGhpcy5zdGF0ZS5lcnJvcn1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHNhdmUgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHZpc2liaWxpdHkgPSBfLnJlZHVjZSh0aGlzLl9ncmlkLnN0YXRlLmR0eXBlcywgKHJldCwgZCkgPT4gXy5hc3NpZ25JbihyZXQsIHsgW2QubmFtZV06IGQudmlzaWJsZSB9KSwge30pO1xyXG4gICAgICBjb25zdCBjYWxsYmFjayA9ICgpID0+IHtcclxuICAgICAgICB3aW5kb3cuY2xvc2UoKTtcclxuICAgICAgfTtcclxuICAgICAgc2VydmVyU3RhdGUudXBkYXRlVmlzaWJpbGl0eSh0aGlzLnByb3BzLmRhdGFJZCwgdmlzaWJpbGl0eSwgY2FsbGJhY2spO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IHByb3BhZ2F0ZVN0YXRlID0gc3RhdGUgPT4gdGhpcy5zZXRTdGF0ZShzdGF0ZSk7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICA8ZGl2IGtleT1cImJvZHlcIiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5IGRlc2NyaWJlLWJvZHlcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNSBkZXNjcmliZS1kdHlwZXMtZ3JpZC1jb2xcIj5cclxuICAgICAgICAgICAgPEJvdW5jZXJXcmFwcGVyIHNob3dCb3VuY2VyPXt0aGlzLnN0YXRlLmxvYWRpbmdEdHlwZXN9PlxyXG4gICAgICAgICAgICAgIDxEdHlwZXNHcmlkIHJlZj17bWcgPT4gKHRoaXMuX2dyaWQgPSBtZyl9IGR0eXBlcz17dGhpcy5zdGF0ZS5kdHlwZXN9IHByb3BhZ2F0ZVN0YXRlPXtwcm9wYWdhdGVTdGF0ZX0gLz5cclxuICAgICAgICAgICAgPC9Cb3VuY2VyV3JhcHBlcj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNyBkZXNjcmliZS1kZXRhaWxzLWNvbFwiPlxyXG4gICAgICAgICAgICA8RGV0YWlscyBzZWxlY3RlZD17dGhpcy5zdGF0ZS5zZWxlY3RlZH0gZGF0YUlkPXt0aGlzLnByb3BzLmRhdGFJZH0gZHR5cGVzPXt0aGlzLnN0YXRlLmR0eXBlc30gLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj4sXHJcbiAgICAgIDxkaXYga2V5PVwiZm9vdGVyXCIgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBvbkNsaWNrPXtzYXZlfT5cclxuICAgICAgICAgIDxzcGFuPlNhdmU8L3NwYW4+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PixcclxuICAgIF07XHJcbiAgfVxyXG59XHJcbkRlc2NyaWJlLmRpc3BsYXlOYW1lID0gXCJEZXNjcmliZVwiO1xyXG5EZXNjcmliZS5wcm9wVHlwZXMgPSB7XHJcbiAgZGF0YUlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgY2hhcnREYXRhOiBQcm9wVHlwZXMuc2hhcGUoe1xyXG4gICAgdmlzaWJsZTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcclxuICAgIHNlbGVjdGVkQ29sOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIH0pLFxyXG59O1xyXG5cclxuZXhwb3J0IHsgRGVzY3JpYmUgfTsiXSwic291cmNlUm9vdCI6IiJ9