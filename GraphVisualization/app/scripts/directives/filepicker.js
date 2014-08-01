'use strict';

/**
 * @ngdoc directive
 * @name graphVisualizationApp.directive:filepicker
 * @description
 * # filepicker
 */
angular.module('graphVisualizationApp')
  .directive('filepicker', function () {
    return {
      template: '<input type="file" class="form-control" />',
      restrict: 'E',
      scope: {
        'filesChanged': '&changed'
      },
      link: function postLink(scope, element) {
        element.bind('change', function (evt) {
          var files = evt.target.files;
          scope.filesChanged({
            files: files
          });
        });
      }
    };
  });
