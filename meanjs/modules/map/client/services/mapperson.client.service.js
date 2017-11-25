(function () {
  'use strict';

  angular
    .module('map.services')
    .factory('MapPersonService', MapPersonService);

  MapPersonService.$inject = ['$resource', '$log'];

  function MapPersonService($resource, $log) {
    var Map = $resource('/api/map/person/:personId', {
      personId: '@personid'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Map.prototype, {
      createOrUpdate: function () {
        var map = this;
        return createOrUpdate(map);
      }
    });

    return Map;

    function createOrUpdate(map) {
      if (map.id) {
        return map.$update(onSuccess, onError);
      } else {
        return map.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(map) {
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
