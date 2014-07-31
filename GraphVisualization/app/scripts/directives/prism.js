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
              // var codeElement = element.find('code');
              scope.problems.data.problems.forEach(function (problem) {
                // console.log('begin with problem');
                // var html = codeElement.html();
                // var position = 0;
                // var nonHtmlPosition = 0;
                // var inTag = false;
                // var content = codeElement.html();
                // var startWithHtml = -1;
                // var endWithHtml = -1;
                // var currentTagStart = -1;
                // while (nonHtmlPosition <= problem.position.end) {
                //   if (nonHtmlPosition === problem.position.start && startWithHtml < 0 && !inTag) {
                //     if (content.charAt(currentTagStart + 2) !== '/') {
                //       startWithHtml = currentTagStart;
                //     } else {
                //       startWithHtml = position;
                //     }
                //   } else if (nonHtmlPosition >= problem.position.end && endWithHtml < 0 && !inTag) {
                //     endWithHtml = position;
                //   }
                //
                //
                //   if (content.charAt(position) === '<') {
                //     inTag = true;
                //     currentTagStart = position;
                //   } else if (content.charAt(position - 1) === '>') {
                //     inTag = false;
                //     currentTagStart = -1;
                //   }
                //
                //
                //   position++;
                //   if (!inTag) {
                //     nonHtmlPosition++;
                //   }
                // }
                // console.log('startWithHtml: ' + startWithHtml + ', start: ' + problem.position.start + ', endWithHtml: ' + endWithHtml + ', end: ' + problem.position.end);
                // codeElement.html([html.slice(0, startWithHtml), '<span class="highlight">', html.slice(startWithHtml, endWithHtml), '</span><!-- /highlight -->', html.slice(endWithHtml)].join(''));

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
                // console.log('end with problem');
              });
            });
          }
        });
      }
    };
  });
