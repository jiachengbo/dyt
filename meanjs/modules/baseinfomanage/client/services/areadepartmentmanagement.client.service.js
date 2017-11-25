(function () {
  'use strict';

  angular
    .module('areadepartmentmanagement.services')
    .factory('AreadepartmentmanagementService', AreadepartmentmanagementService);

  AreadepartmentmanagementService.$inject = ['$resource', '$log'];

  function AreadepartmentmanagementService($resource, $log) {
    var Areadepartmentmanagement = $resource('/api/areadepartmentmanagement/:areadepartmentmanagementId', {
      areadepartmentmanagementId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Areadepartmentmanagement.prototype, {
      createOrUpdate: function () {
        var areadepartmentmanagement = this;
        return createOrUpdate(areadepartmentmanagement);
      }
    });

    return Areadepartmentmanagement;

    function createOrUpdate(areadepartmentmanagement) {
      if (areadepartmentmanagement.id) {
        return areadepartmentmanagement.$update(onSuccess, onError);
      } else {
        return areadepartmentmanagement.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(areadepartmentmanagement) {
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
