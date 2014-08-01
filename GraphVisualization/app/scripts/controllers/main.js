'use strict';

/**
 * @ngdoc function
 * @name graphVisualizationApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the graphVisualizationApp
 */
angular.module('graphVisualizationApp')
  .controller('MainCtrl', ['$scope', '$http', '$routeParams',
    function ($scope, $http, $routeParams) {

      $scope.filesSelected = function (files) {
        if (files && files.length > 0) {
          var reader = new FileReader();
          reader.onload = function (e) {
            $scope.load(e.target.result);
          };
          reader.readAsText(files[0]);
        }
      };

      function dataReceived(response) {
        $scope.error = response.error;
        $scope.problems = response;
        if (response.error) {
          return;
        }
        var arrayOfLines = window.S(response.source).lines();
        response.source = arrayOfLines.join('\n');
        response.data.problems.forEach(function (problem) {
          var line = 0;
          var start = 0;
          while (start <= problem.position.start) {
            start += arrayOfLines[line].length + 1;
            line++;
          }
          problem.position.line = line;
        });
      }

      if ($routeParams.visualize) {
        $scope.visualize = true;
        $http.get('http://localhost:3000/problems.json').success(dataReceived);
      } else {
        $scope.problems = null;
      }

      $scope.load = function (source) {

        var data = {
          source: source
        };

        $http.post('http://localhost:3000/problems.json', data).success(dataReceived);
      };
    }
  ]);
