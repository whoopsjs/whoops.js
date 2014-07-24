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
        var arrayOfLines = data.source.split(/\r\n?|\n/);
        data.data.problems.forEach(function (problem) {
          var line = 0;
          var start = problem.position.start;
          while (start > 0) {
            start = start -1 - arrayOfLines[line].length;
            line++;
          }
          problem.position.line = line + 1;
          // $scope.problemLines[line] = problem;
        });
      });
    }
  ]);
