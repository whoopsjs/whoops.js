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
      template: '<pre data-line="{{highlights}}"><code data-language="{{language}}">{{source}}</code></pre>',
      restrict: 'E',
      scope: {
        source: '=',
        lineNumbers: '=',
        highlights: '=',
        language: '@',
      },
      link: function postLink(scope, element) {
        scope.$watch('source', function (source) {
          if (source) {
            // element.find('code').attr('data-language', scope.language);
            window.Rainbow.color(function () { //source, attrs.language, function (highlightedCode) {
              scope.highlights.forEach(function (highlight) {
                element.find('[data-line=\'' + highlight + '\']').addClass('highlight');
              });

            });
            //   element.find('code').html(highlightedCode);
            // });
          }
        });
      }
    };
  });
