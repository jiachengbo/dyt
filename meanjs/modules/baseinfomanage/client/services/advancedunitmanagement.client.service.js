(function () {
  'use strict';

  angular
    .module('advancedUnitManagement.services')
    .factory('AdvancedUnitManagementService', AdvancedUnitManagementService);

  AdvancedUnitManagementService.$inject = ['$resource', '$log'];

  function AdvancedUnitManagementService($resource, $log) {
    var AdvancedUnitManagement = $resource('/api/advancedUnitManagement/:advancedUnitManagementId', {
      advancedUnitManagementId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(AdvancedUnitManagement.prototype, {
      createOrUpdate: function () {
        var advancedUnitManagement = this;
        return createOrUpdate(advancedUnitManagement);
      }
    });

    return AdvancedUnitManagement;

    function createOrUpdate(advancedUnitManagement) {
      if (advancedUnitManagement.id) {
        return advancedUnitManagement.$update(onSuccess, onError);
      } else {
        return advancedUnitManagement.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(advancedUnitManagement) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
