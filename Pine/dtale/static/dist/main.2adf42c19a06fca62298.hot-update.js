webpackHotUpdate("main",{

/***/ "./static/popups/CodePopup.jsx":
/*!*************************************!*\
  !*** ./static/popups/CodePopup.jsx ***!
  \*************************************/
/*! exports provided: CodePopup, renderCodePopupAnchor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CodePopup", function() { return CodePopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderCodePopupAnchor", function() { return renderCodePopupAnchor; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-syntax-highlighter */ "./node_modules/react-syntax-highlighter/dist/esm/index.js");
/* harmony import */ var react_syntax_highlighter_dist_esm_styles_hljs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-syntax-highlighter/dist/esm/styles/hljs */ "./node_modules/react-syntax-highlighter/dist/esm/styles/hljs/index.js");
/* harmony import */ var _CopyToClipboard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../CopyToClipboard */ "./static/CopyToClipboard.jsx");
/* harmony import */ var _JSAnchor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../JSAnchor */ "./static/JSAnchor.jsx");
/* harmony import */ var _dtale_menu_dataViewerMenuUtils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dtale/menu/dataViewerMenuUtils */ "./static/dtale/menu/dataViewerMenuUtils.jsx");
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









__webpack_require__(/*! ./CodePopup.css */ "./static/popups/CodePopup.css");

function renderCodePopupAnchor(code, title) {
  var onClick = function onClick() {
    window.code_popup = {
      code: code,
      title: title
    };
    _dtale_menu_dataViewerMenuUtils__WEBPACK_IMPORTED_MODULE_6__["default"].open("/dtale/code-popup", null, 450, 700);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_JSAnchor__WEBPACK_IMPORTED_MODULE_5__["JSAnchor"], {
    onClick: onClick
  });
}

var CodePopup = /*#__PURE__*/function (_React$Component) {
  _inherits(CodePopup, _React$Component);

  var _super = _createSuper(CodePopup);

  function CodePopup(props) {
    var _this;

    _classCallCheck(this, CodePopup);

    _this = _super.call(this, props);
    _this.renderCopyToClipboard = _this.renderCopyToClipboard.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CodePopup, [{
    key: "renderCopyToClipboard",
    value: function renderCopyToClipboard() {
      if (Object(_CopyToClipboard__WEBPACK_IMPORTED_MODULE_4__["canCopy"])()) {
        var buttonBuilder = function buttonBuilder(props) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", _extends({
            className: "btn btn-primary"
          }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
            className: "far fa-copy pr-3"
          }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, "Copy"));
        };

        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          key: "footer",
          className: "modal-footer"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_CopyToClipboard__WEBPACK_IMPORTED_MODULE_4__["CopyToClipboard"], {
          key: 1,
          text: this.props.code,
          buttonBuilder: buttonBuilder,
          tooltipPosition: "top"
        }));
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        key: "body",
        className: "modal-body code-popup-modal"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_2__["default"], {
        language: "python",
        style: react_syntax_highlighter_dist_esm_styles_hljs__WEBPACK_IMPORTED_MODULE_3__["docco"]
      }, this.props.code || "")), this.renderCopyToClipboard()];
    }
  }]);

  return CodePopup;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);

CodePopup.displayName = "CodePopup";
CodePopup.propTypes = {
  code: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
};


/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdGF0aWMvcG9wdXBzL0NvZGVQb3B1cC5qc3giXSwibmFtZXMiOlsicmVxdWlyZSIsInJlbmRlckNvZGVQb3B1cEFuY2hvciIsImNvZGUiLCJ0aXRsZSIsIm9uQ2xpY2siLCJ3aW5kb3ciLCJjb2RlX3BvcHVwIiwibWVudUZ1bmNzIiwib3BlbiIsIkNvZGVQb3B1cCIsInByb3BzIiwicmVuZGVyQ29weVRvQ2xpcGJvYXJkIiwiYmluZCIsImNhbkNvcHkiLCJidXR0b25CdWlsZGVyIiwiZG9jY28iLCJSZWFjdCIsIkNvbXBvbmVudCIsImRpc3BsYXlOYW1lIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwic3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBRUFBLG1CQUFPLENBQUMsc0RBQUQsQ0FBUDs7QUFFQSxTQUFTQyxxQkFBVCxDQUErQkMsSUFBL0IsRUFBcUNDLEtBQXJDLEVBQTRDO0FBQzFDLE1BQU1DLE9BQU8sR0FBRyxTQUFWQSxPQUFVLEdBQU07QUFDcEJDLFVBQU0sQ0FBQ0MsVUFBUCxHQUFvQjtBQUFFSixVQUFJLEVBQUpBLElBQUY7QUFBUUMsV0FBSyxFQUFMQTtBQUFSLEtBQXBCO0FBQ0FJLDJFQUFTLENBQUNDLElBQVYsQ0FBZSxtQkFBZixFQUFvQyxJQUFwQyxFQUEwQyxHQUExQyxFQUErQyxHQUEvQztBQUNELEdBSEQ7O0FBSUEsc0JBQ0UsMkRBQUMsa0RBQUQ7QUFBVSxXQUFPLEVBQUVKO0FBQW5CLElBREY7QUFNRDs7SUFFS0ssUzs7Ozs7QUFDSixxQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBOztBQUNqQiw4QkFBTUEsS0FBTjtBQUNBLFVBQUtDLHFCQUFMLEdBQTZCLE1BQUtBLHFCQUFMLENBQTJCQyxJQUEzQiwrQkFBN0I7QUFGaUI7QUFHbEI7Ozs7NENBRXVCO0FBQ3RCLFVBQUlDLGdFQUFPLEVBQVgsRUFBZTtBQUNiLFlBQU1DLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBQUosS0FBSztBQUFBLDhCQUN6QjtBQUFRLHFCQUFTLEVBQUM7QUFBbEIsYUFBd0NBLEtBQXhDLGdCQUNFO0FBQUcscUJBQVMsRUFBQztBQUFiLFlBREYsZUFFRSxnRkFGRixDQUR5QjtBQUFBLFNBQTNCOztBQU1BLDRCQUNFO0FBQUssYUFBRyxFQUFDLFFBQVQ7QUFBa0IsbUJBQVMsRUFBQztBQUE1Qix3QkFDRSwyREFBQyxnRUFBRDtBQUFpQixhQUFHLEVBQUUsQ0FBdEI7QUFBeUIsY0FBSSxFQUFFLEtBQUtBLEtBQUwsQ0FBV1IsSUFBMUM7QUFBZ0QsdUJBQWEsRUFBRVksYUFBL0Q7QUFBOEUseUJBQWUsRUFBQztBQUE5RixVQURGLENBREY7QUFLRDs7QUFDRCxhQUFPLElBQVA7QUFDRDs7OzZCQUVRO0FBQ1AsYUFBTyxjQUNMO0FBQUssV0FBRyxFQUFDLE1BQVQ7QUFBZ0IsaUJBQVMsRUFBQztBQUExQixzQkFDRSwyREFBQyxnRUFBRDtBQUFtQixnQkFBUSxFQUFDLFFBQTVCO0FBQXFDLGFBQUssRUFBRUMsbUZBQUtBO0FBQWpELFNBQ0csS0FBS0wsS0FBTCxDQUFXUixJQUFYLElBQW1CLEVBRHRCLENBREYsQ0FESyxFQU1MLEtBQUtTLHFCQUFMLEVBTkssQ0FBUDtBQVFEOzs7O0VBaENxQkssNENBQUssQ0FBQ0MsUzs7QUFrQzlCUixTQUFTLENBQUNTLFdBQVYsR0FBd0IsV0FBeEI7QUFDQVQsU0FBUyxDQUFDVSxTQUFWLEdBQXNCO0FBQ3BCakIsTUFBSSxFQUFFa0IsaURBQVMsQ0FBQ0M7QUFESSxDQUF0QiIsImZpbGUiOiJtYWluLjJhZGY0MmMxOWEwNmZjYTYyMjk4LmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFN5bnRheEhpZ2hsaWdodGVyIGZyb20gXCJyZWFjdC1zeW50YXgtaGlnaGxpZ2h0ZXJcIjtcclxuaW1wb3J0IHsgZG9jY28gfSBmcm9tIFwicmVhY3Qtc3ludGF4LWhpZ2hsaWdodGVyL2Rpc3QvZXNtL3N0eWxlcy9obGpzXCI7XHJcblxyXG5pbXBvcnQgeyBjYW5Db3B5LCBDb3B5VG9DbGlwYm9hcmQgfSBmcm9tIFwiLi4vQ29weVRvQ2xpcGJvYXJkXCI7XHJcbmltcG9ydCB7IEpTQW5jaG9yIH0gZnJvbSBcIi4uL0pTQW5jaG9yXCI7XHJcbmltcG9ydCBtZW51RnVuY3MgZnJvbSBcIi4uL2R0YWxlL21lbnUvZGF0YVZpZXdlck1lbnVVdGlsc1wiO1xyXG5cclxucmVxdWlyZShcIi4vQ29kZVBvcHVwLmNzc1wiKTtcclxuXHJcbmZ1bmN0aW9uIHJlbmRlckNvZGVQb3B1cEFuY2hvcihjb2RlLCB0aXRsZSkge1xyXG4gIGNvbnN0IG9uQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICB3aW5kb3cuY29kZV9wb3B1cCA9IHsgY29kZSwgdGl0bGUgfTtcclxuICAgIG1lbnVGdW5jcy5vcGVuKFwiL2R0YWxlL2NvZGUtcG9wdXBcIiwgbnVsbCwgNDUwLCA3MDApO1xyXG4gIH07XHJcbiAgcmV0dXJuIChcclxuICAgIDxKU0FuY2hvciBvbkNsaWNrPXtvbkNsaWNrfT5cclxuICAgICAgey8qPGkgY2xhc3NOYW1lPVwiaWNvLWNvZGUgcHItM1wiIC8+XHJcbiAgICAgIDxzcGFuPkNvZGUgRXhwb3J0PC9zcGFuPiovfVxyXG4gICAgPC9KU0FuY2hvcj5cclxuICApO1xyXG59XHJcblxyXG5jbGFzcyBDb2RlUG9wdXAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnJlbmRlckNvcHlUb0NsaXBib2FyZCA9IHRoaXMucmVuZGVyQ29weVRvQ2xpcGJvYXJkLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICByZW5kZXJDb3B5VG9DbGlwYm9hcmQoKSB7XHJcbiAgICBpZiAoY2FuQ29weSgpKSB7XHJcbiAgICAgIGNvbnN0IGJ1dHRvbkJ1aWxkZXIgPSBwcm9wcyA9PiAoXHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiB7Li4ucHJvcHN9PlxyXG4gICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmFyIGZhLWNvcHkgcHItM1wiIC8+XHJcbiAgICAgICAgICA8c3Bhbj5Db3B5PC9zcGFuPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICApO1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYga2V5PVwiZm9vdGVyXCIgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XHJcbiAgICAgICAgICA8Q29weVRvQ2xpcGJvYXJkIGtleT17MX0gdGV4dD17dGhpcy5wcm9wcy5jb2RlfSBidXR0b25CdWlsZGVyPXtidXR0b25CdWlsZGVyfSB0b29sdGlwUG9zaXRpb249XCJ0b3BcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICA8ZGl2IGtleT1cImJvZHlcIiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5IGNvZGUtcG9wdXAtbW9kYWxcIj5cclxuICAgICAgICA8U3ludGF4SGlnaGxpZ2h0ZXIgbGFuZ3VhZ2U9XCJweXRob25cIiBzdHlsZT17ZG9jY299PlxyXG4gICAgICAgICAge3RoaXMucHJvcHMuY29kZSB8fCBcIlwifVxyXG4gICAgICAgIDwvU3ludGF4SGlnaGxpZ2h0ZXI+XHJcbiAgICAgIDwvZGl2PixcclxuICAgICAgdGhpcy5yZW5kZXJDb3B5VG9DbGlwYm9hcmQoKSxcclxuICAgIF07XHJcbiAgfVxyXG59XHJcbkNvZGVQb3B1cC5kaXNwbGF5TmFtZSA9IFwiQ29kZVBvcHVwXCI7XHJcbkNvZGVQb3B1cC5wcm9wVHlwZXMgPSB7XHJcbiAgY29kZTogUHJvcFR5cGVzLnN0cmluZyxcclxufTtcclxuXHJcbmV4cG9ydCB7IENvZGVQb3B1cCwgcmVuZGVyQ29kZVBvcHVwQW5jaG9yIH07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=