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
      $scope.updateLines = function () {
        if (!$scope.code || !$scope.problems) {
          return;
        }
        $scope.problemLines = [];
        var arrayOfLines = $scope.code.split(/[\r\n/]+/);
        $scope.problems.data.problems.forEach(function (problem) {
          var line = 0;
          var start = problem.position.start;
          while (start > 0) {
            start = start - arrayOfLines[line].length;
            line++;
          }
          $scope.problemLines.push(line);
        });
      };
      $http.get('http://localhost:3000/code').success(function (data) {
        $scope.code = data;
        $scope.updateLines();
      });
      $http.get('http://localhost:3000/problems.json').success(function (data) {
        $scope.problems = data;
        $scope.updateLines();
      });
    }
  ]);
