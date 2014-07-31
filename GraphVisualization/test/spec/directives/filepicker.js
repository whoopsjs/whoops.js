'use strict';

describe('Directive: filepicker', function () {

  // load the directive's module
  beforeEach(module('graphVisualizationApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<filepicker></filepicker>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the filepicker directive');
  }));
});
