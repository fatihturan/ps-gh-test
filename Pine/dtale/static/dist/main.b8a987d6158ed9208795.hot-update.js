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
  return "/dtale/save-column-filter/".concat(dataId, "/").concat(encodeURIComponent(column));
}

function toggleOutlierFilterUrl(dataId, column) {
  return "/dtale/toggle-outlier-filter/".concat(dataId, "/").concat(encodeURIComponent(column));
}

function cleanupEndpoint(endpoint) {
  while (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.includes(endpoint, "//")) {
    endpoint = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.replace(endpoint, "//", "/");
  }

  return endpoint;
}



/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdGF0aWMvYWN0aW9ucy91cmwtdXRpbHMuanMiXSwibmFtZXMiOlsiVVJMX0tFWVMiLCJmaWx0ZXJzIiwidiIsIl8iLCJpc0VtcHR5IiwiSlNPTiIsInN0cmluZ2lmeSIsIm1hcFZhbHVlcyIsImYiLCJ2YWx1ZSIsImZpbHRlclRlcm0iLCJ0eXBlIiwiZ2V0IiwiY29sdW1uIiwiaWRzIiwic29ydEluZm8iLCJzb3J0IiwicXVlcnkiLCJzZWxlY3RlZENvbHMiLCJjb2xzIiwic2VsZWN0ZWRDb2wiLCJjb2wiLCJ0c0NvbHVtbnMiLCJ0c19jb2x1bW5zIiwiYnVpbGRVUkxQYXJhbXMiLCJzdGF0ZSIsInByb3BzIiwicmVxdWlyZWQiLCJhY2N1bXVsYXRvciIsImFjYyIsImsiLCJhc3NpZ24iLCJwYXJhbXMiLCJyZWR1Y2UiLCJwaWNrIiwic29tZSIsInIiLCJpc05pbCIsInBpY2tCeSIsImJ1aWxkVVJMU3RyaW5nIiwiYmFzZSIsImVuZHNXaXRoIiwicXMiLCJidWlsZFVSTCIsImR0eXBlc1VybCIsImRhdGFJZCIsInNhdmVDb2xGaWx0ZXJVcmwiLCJlbmNvZGVVUklDb21wb25lbnQiLCJ0b2dnbGVPdXRsaWVyRmlsdGVyVXJsIiwiY2xlYW51cEVuZHBvaW50IiwiZW5kcG9pbnQiLCJpbmNsdWRlcyIsInJlcGxhY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRUE7QUFFQSxJQUFNQSxRQUFRLEdBQUc7QUFDZkMsU0FBTyxFQUFFLGlCQUFBQyxDQUFDO0FBQUEsV0FBSztBQUNiRCxhQUFPLEVBQUVFLDZDQUFDLENBQUNDLE9BQUYsQ0FBVUYsQ0FBVixJQUNMLElBREssR0FFTEcsSUFBSSxDQUFDQyxTQUFMLENBQ0VILDZDQUFDLENBQUNJLFNBQUYsQ0FBWUwsQ0FBWixFQUFlLFVBQUFNLENBQUM7QUFBQSxlQUFLO0FBQUVDLGVBQUssRUFBRUQsQ0FBQyxDQUFDRSxVQUFYO0FBQXVCQyxjQUFJLEVB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QUwsQ0FBYyxHQUFkLElBQXFCLEVBQXJCLEdBQTBCLEdBQTNDLFNBQWlEQyxrREFBRSxDQUFDcEMsU0FBSCxDQUFhMEIsTUFBYixDQUFqRDtBQUNEOztBQUVELFNBQVNXLFFBQVQsQ0FBa0JILElBQWxCLEVBQXdCZixLQUF4QixFQUErQkMsS0FBL0IsRUFBc0M7QUFDcEMsTUFBTU0sTUFBTSxHQUFHUixjQUFjLENBQUNDLEtBQUQsRUFBUUMsS0FBUixDQUE3QjtBQUNBLFNBQU9hLGNBQWMsQ0FBQ0MsSUFBRCxFQUFPUixNQUFQLENBQXJCO0FBQ0Q7O0FBRUQsU0FBU1ksU0FBVCxDQUFtQkMsTUFBbkIsRUFBMkI7QUFDekIsaUNBQXdCQSxNQUF4QjtBQUNEOztBQUVELFNBQVNDLGdCQUFULENBQTBCRCxNQUExQixFQUFrQ2hDLE1BQWxDLEVBQTBDO0FBQ3hDLDZDQUFvQ2dDLE1BQXBDLGNBQThDRSxrQkFBa0IsQ0FBQ2xDLE1BQUQsQ0FBaEU7QUFDRDs7QUFFRCxTQUFTbUMsc0JBQVQsQ0FBZ0NILE1BQWhDLEVBQXdDaEMsTUFBeEMsRUFBZ0Q7QUFDOUMsZ0RBQXVDZ0MsTUFBdkMsY0FBaURFLGtCQUFrQixDQUFDbEMsTUFBRCxDQUFuRTtBQUNEOztBQUVELFNBQVNvQyxlQUFULENBQXlCQyxRQUF6QixFQUFtQztBQUNqQyxTQUFPL0MsNkNBQUMsQ0FBQ2dELFFBQUYsQ0FBV0QsUUFBWCxFQUFxQixJQUFyQixDQUFQLEVBQW1DO0FBQ2pDQSxZQUFRLEdBQUcvQyw2Q0FBQyxDQUFDaUQsT0FBRixDQUFVRixRQUFWLEVBQW9CLElBQXBCLEVBQTBCLEdBQTFCLENBQVg7QUFDRDs7QUFDRCxTQUFPQSxRQUFQO0FBQ0QiLCJmaWxlIjoibWFpbi5iOGE5ODdkNjE1OGVkOTIwODc5NS5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHFzIGZyb20gXCJxdWVyeXN0cmluZ1wiO1xyXG5cclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5cclxuY29uc3QgVVJMX0tFWVMgPSB7XHJcbiAgZmlsdGVyczogdiA9PiAoe1xyXG4gICAgZmlsdGVyczogXy5pc0VtcHR5KHYpXHJcbiAgICAgID8gbnVsbFxyXG4gICAgICA6IEpTT04uc3RyaW5naWZ5KFxyXG4gICAgICAgICAgXy5tYXBWYWx1ZXModiwgZiA9PiAoeyB2YWx1ZTogZi5maWx0ZXJUZXJtLCB0eXBlOiBfLmdldChmLmNvbHVtbiwgXCJmaWx0ZXJSZW5kZXJlci5kaXNwbGF5TmFtZVwiKSB9KSlcclxuICAgICAgICApLFxyXG4gIH0pLFxyXG4gIGlkczogdiA9PiAoeyBpZHM6IF8uaXNFbXB0eSh2KSA/IG51bGwgOiBKU09OLnN0cmluZ2lmeSh2KSB9KSxcclxuICBzb3J0SW5mbzogdiA9PiAoeyBzb3J0OiBfLmlzRW1wdHkodikgPyBudWxsIDogSlNPTi5zdHJpbmdpZnkodikgfSksXHJcbiAgcXVlcnk6IHYgPT4gKHsgcXVlcnk6IHYgfSksXHJcbiAgc2VsZWN0ZWRDb2xzOiB2ID0+ICh7IGNvbHM6IF8uaXNFbXB0eSh2KSA/IG51bGwgOiBKU09OLnN0cmluZ2lmeSh2KSB9KSxcclxuICBzZWxlY3RlZENvbDogdiA9PiAoeyBjb2w6IHYgfSksXHJcbiAgdHNDb2x1bW5zOiB2ID0+ICh7IHRzX2NvbHVtbnM6IF8uaXNFbXB0eSh2KSA/IG51bGwgOiBKU09OLnN0cmluZ2lmeSh2KSB9KSxcclxufTtcclxuXHJcbmZ1bmN0aW9uIGJ1aWxkVVJMUGFyYW1zKHN0YXRlLCBwcm9wcyA9IG51bGwsIHJlcXVpcmVkID0gbnVsbCkge1xyXG4gIGNvbnN0IGFjY3VtdWxhdG9yID0gKGFjYywgdiwgaykgPT4gXy5hc3NpZ24oXy5nZXQoVVJMX0tFWVMsIGssIHYgPT4gKHsgW2tdOiB2IH0pKSh2KSwgYWNjKTtcclxuICBjb25zdCBwYXJhbXMgPSBfLnJlZHVjZShfLmlzRW1wdHkocHJvcHMpID8gc3RhdGUgOiBfLnBpY2soc3RhdGUsIHByb3BzKSwgYWNjdW11bGF0b3IsIHt9KTtcclxuICBpZiAocmVxdWlyZWQpIHtcclxuICAgIGlmIChfLnNvbWUocmVxdWlyZWQsIHIgPT4gXy5pc05pbChwYXJhbXNbcl0pKSkge1xyXG4gICAgICByZXR1cm4ge307XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBfLnBpY2tCeShwYXJhbXMsIHYgPT4gIV8uaXNOaWwodikpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBidWlsZFVSTFN0cmluZyhiYXNlLCBwYXJhbXMpIHtcclxuICByZXR1cm4gYCR7YmFzZX0ke2Jhc2UuZW5kc1dpdGgoXCI/XCIpID8gXCJcIiA6IFwiP1wifSR7cXMuc3RyaW5naWZ5KHBhcmFtcyl9YDtcclxufVxyXG5cclxuZnVuY3Rpb24gYnVpbGRVUkwoYmFzZSwgc3RhdGUsIHByb3BzKSB7XHJcbiAgY29uc3QgcGFyYW1zID0gYnVpbGRVUkxQYXJhbXMoc3RhdGUsIHByb3BzKTtcclxuICByZXR1cm4gYnVpbGRVUkxTdHJpbmcoYmFzZSwgcGFyYW1zKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHR5cGVzVXJsKGRhdGFJZCkge1xyXG4gIHJldHVybiBgL2R0YWxlL2R0eXBlcy8ke2RhdGFJZH1gO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzYXZlQ29sRmlsdGVyVXJsKGRhdGFJZCwgY29sdW1uKSB7XHJcbiAgcmV0dXJuIGAvZHRhbGUvc2F2ZS1jb2x1bW4tZmlsdGVyLyR7ZGF0YUlkfS8ke2VuY29kZVVSSUNvbXBvbmVudChjb2x1bW4pfWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZU91dGxpZXJGaWx0ZXJVcmwoZGF0YUlkLCBjb2x1bW4pIHtcclxuICByZXR1cm4gYC9kdGFsZS90b2dnbGUtb3V0bGllci1maWx0ZXIvJHtkYXRhSWR9LyR7ZW5jb2RlVVJJQ29tcG9uZW50KGNvbHVtbil9YDtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYW51cEVuZHBvaW50KGVuZHBvaW50KSB7XHJcbiAgd2hpbGUgKF8uaW5jbHVkZXMoZW5kcG9pbnQsIFwiLy9cIikpIHtcclxuICAgIGVuZHBvaW50ID0gXy5yZXBsYWNlKGVuZHBvaW50LCBcIi8vXCIsIFwiL1wiKTtcclxuICB9XHJcbiAgcmV0dXJuIGVuZHBvaW50O1xyXG59XHJcblxyXG5leHBvcnQge1xyXG4gIGJ1aWxkVVJMUGFyYW1zLFxyXG4gIGJ1aWxkVVJMU3RyaW5nLFxyXG4gIGJ1aWxkVVJMLFxyXG4gIGR0eXBlc1VybCxcclxuICBzYXZlQ29sRmlsdGVyVXJsLFxyXG4gIHRvZ2dsZU91dGxpZXJGaWx0ZXJVcmwsXHJcbiAgY2xlYW51cEVuZHBvaW50LFxyXG59O1xyXG4iXSwic291cmNlUm9vdCI6IiJ9