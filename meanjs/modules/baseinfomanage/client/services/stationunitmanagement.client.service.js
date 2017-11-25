(function () {
  'use strict';

  angular
    .module('stationUnitManagement.services')
    .factory('StationUnitManagementService', StationUnitManagementService);

  StationUnitManagementService.$inject = ['$resource', '$log'];

  function StationUnitManagementService($resource, $log) {
    var StationUnitManagement = $resource('/api/stationUnitManagement/:stationUnitManagementId', {
      stationUnitManagementId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(StationUnitManagement.prototype, {
      createOrUpdate: function () {
        var stationUnitManagement = this;
        return createOrUpdate(stationUnitManagement);
      }
    });

    return StationUnitManagement;

    function createOrUpdate(stationUnitManagement) {
      if (stationUnitManagement.id) {
        return stationUnitManagement.$update(onSuccess, onError);
      } else {
        return stationUnitManagement.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(stationUnitManagement) {
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
