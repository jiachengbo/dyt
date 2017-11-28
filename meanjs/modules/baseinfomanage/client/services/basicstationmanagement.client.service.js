(function () {
  'use strict';

  angular
    .module('basicStationManagement.services')
    .factory('BasicStationManagementService', BasicStationManagementService);

  BasicStationManagementService.$inject = ['$resource', '$log'];

  function BasicStationManagementService($resource, $log) {
    var BasicStationManagement = $resource('/api/basicStationManagement/:basicStationManagementId', {
      basicStationManagementId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(BasicStationManagement.prototype, {
      createOrUpdate: function () {
        var basicStationManagement = this;
        return createOrUpdate(basicStationManagement);
      }
    });

    return BasicStationManagement;

    function createOrUpdate(basicStationManagement) {
      if (basicStationManagement.id) {
        return basicStationManagement.$update(onSuccess, onError);
      } else {
        return basicStationManagement.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(basicStationManagement) {
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
