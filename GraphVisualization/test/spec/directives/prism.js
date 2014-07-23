'use strict';

describe('Directive: prism', function () {

  // load the directive's module
  beforeEach(module('graphVisualizationApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<prism></prism>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the prism directive');
  }));
});
