'use strict';

/**
 * @ngdoc overview
 * @name graphVisualizationApp
 * @description
 * # graphVisualizationApp
 *
 * Main module of the application.
 */
angular
  .module('graphVisualizationApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    window.Rainbow.extend('javascript', [{
      'name': 'comment',
      'matches': {},
      'pattern': /(\/)(?!\*)(.+)(\/)([igm]{0,3})/g
    }]);
    // window.Rainbow.onHighlight(function (block, language) {
    //   console.log(block, 'for language', language, 'was highlighted');
    // });
    window.Rainbow.color();
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
