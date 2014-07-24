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
            // scope.problems = scope.problems || {};
            // scope.lineHighlights = scope.problems.keys();
            // console.log(scope.lineHighlights);
            window.Rainbow.color(function () { //source, attrs.language, function (highlightedCode) {
              console.log(scope.problems);
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
