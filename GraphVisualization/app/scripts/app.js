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
    window.Rainbow.color();
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/:visualize', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
