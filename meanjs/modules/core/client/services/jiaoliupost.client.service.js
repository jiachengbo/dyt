(function () {
  'use strict';

  angular
    .module('core.services')
    .factory('InterFlowService', InterFlowService);

  InterFlowService.$inject = ['$resource', '$log'];

  function InterFlowService($resource, $log) {
    var interFlow = $resource('/api/interflow');
    return interFlow;
  }
}());
