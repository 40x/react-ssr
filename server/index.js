"use strict";

var _react = _interopRequireDefault(require("react"));

var _express = _interopRequireDefault(require("express"));

var _reactRouter = require("react-router");

var _reactRedux = require("react-redux");

var _server = _interopRequireDefault(require("react-dom/server"));

var _App = _interopRequireDefault(require("../src/App"));

var _store = _interopRequireDefault(require("../src/store"));

var _routes = _interopRequireDefault(require("../src/routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');

var fs = require('fs');

var request = require('request');

var PORT = process.env.PORT || 3000;
var app = (0, _express.default)();

var router = _express.default.Router();

var distPath = path.resolve(__dirname, '../build'); // main css, js

router.use('^/static', _express.default.static(path.resolve(distPath, 'static'))); // service worker files, add other static content by modifying regex below

router.use('*/*.js', _express.default.static(path.resolve(distPath))); // proxy api calls which are triggered from UI
// after the load of the first page

router.use('/api', function (req, res) {
  var url = 'http://jsonplaceholder.typicode.com' + req.originalUrl.replace('/api', '');
  req.pipe(request(url)).pipe(res);
}); // everything else i.e. application routes

router.use('*', function (req, res) {
  var entry = path.resolve(distPath, 'index.html');
  fs.readFile(entry, 'utf8', function (err, htmlData) {
    if (err) {
      return res.status(404).end();
    }

    var context = {}; // create an empty store

    var store = (0, _store.default)(); // empty promise array

    var dataPromise = []; // extract route which matches request

    var route = _routes.default.filter(function (r) {
      return (0, _reactRouter.matchPath)(req.baseUrl, {
        path: r.path,
        exact: true
      });
    }); // extract component based on route


    var component = route.length ? route[0].component : null; // if action are available

    if (component && typeof component.serverSideFetch === 'function') {
      console.log("Found actions to dispatch for ".concat(req.url)); // get actions

      var actions = component.serverSideFetch(); // dispatch and store promises

      dataPromise = actions.map(function (action) {
        return store.dispatch(action());
      });
    } // once promises resolved, render template using new store


    Promise.all(dataPromise).then(function () {
      console.log("Rendering ".concat(req.url, " at ").concat(new Date().toString(), " on server"));

      var html = _server.default.renderToString(_react.default.createElement(_reactRedux.Provider, {
        store: store
      }, _react.default.createElement(_reactRouter.StaticRouter, {
        location: req.baseUrl,
        context: context
      }, _react.default.createElement(_App.default, null))));

      return res.send(htmlData // render the template
      .replace('<div id="root"></div>', "<div id=\"root\">".concat(html, "</div>")).replace('<script id="redux-state"></script>', // add the current store state to be used to initializing browser state
      "<script>window.REDUX_DATA = ".concat(JSON.stringify(store.getState()), "</script>")));
    });
  });
});
app.use(router);
app.listen(PORT, function () {
  console.log('listening on ' + PORT + '...');
});
