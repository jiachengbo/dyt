(function () {
  'use strict';

  angular
    .module('map.services')
    .factory('MapPersonTypeService', MapPersonTypeService);

  MapPersonTypeService.$inject = ['$resource', '$log'];

  function MapPersonTypeService($resource, $log) {
    var Map = $resource('/api/map/personType/:personId', {
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
