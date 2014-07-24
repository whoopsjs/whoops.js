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
      template: '<pre data-line="{{lineHighlights}}"><code data-language="{{language}}">{{problems.source}}</code></pre>',
      restrict: 'E',
      scope: {
        source: '=',
        problems: '=',
        language: '@',
        lineHighlights: '='
      },
      link: function postLink(scope, element) {
        scope.$watch('problems', function (problems) {
          if (problems) {
            window.Rainbow.color(function () {
              scope.problems.data.problems.forEach(function (problem) {
                element.find('[data-line=\'' + problem.position.line + '\']').addClass('highlight').popover({
                  content: problem.message,
                  placement: 'bottom',
                  trigger: 'hover'
                });
              });

            });
            //   element.find('code').html(highlightedCode);
            // });
          }
        });
      }
    };
  });
