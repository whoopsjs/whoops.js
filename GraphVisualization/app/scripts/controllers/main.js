'use strict';

/**
 * @ngdoc function
 * @name graphVisualizationApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the graphVisualizationApp
 */
angular.module('graphVisualizationApp')
  .controller('MainCtrl', ['$scope', '$http',
    function ($scope, $http) {
      $http.get('http://localhost:3000/problems.json').success(function (data) {
        $scope.problems = data;
        var arrayOfLines = window.S(data.source).lines();
        data.source = arrayOfLines.join('\n');
        data.data.problems.forEach(function (problem) {
          var line = 0;
          var start = 0;
          while (start <= problem.position.start) {
            start += arrayOfLines[line].length + 1;
            line++;
          }
          problem.position.line = line;
        });
      });
    }
  ]);
