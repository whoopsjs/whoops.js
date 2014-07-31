'use strict';

/**
 * @ngdoc directive
 * @name graphVisualizationApp.directive:prism
 * @description
 * # prism
 */
angular.module('graphVisualizationApp')
  .directive('prism', function () {
    return {
      template: '<pre><code data-language="{{language}}">{{problems.source}}</code></pre>',
      restrict: 'E',
      scope: {
        problems: '=',
        language: '@'
      },
      link: function postLink(scope, element) {
        scope.$watch('problems', function (problems) {
          if (problems) {
            window.Rainbow.color(function () {
              scope.problems.data.problems.forEach(function (problem) {
                var level = (problem.type === 'risk' || problem.type === 'error') ? 'danger' : 'warning';
                var lineElement = element.find('[data-line=\'' + problem.position.line + '\']');
                lineElement.addClass('highlight');
                lineElement.addClass(level);
                lineElement.popover({
                  content: '<span class="label label-' + level + '">' + problem.type + ':</span> ' + problem.message,
                  placement: 'bottom',
                  trigger: 'hover',
                  html: true
                });
              });
            });
          }
        });
      }
    };
  });
