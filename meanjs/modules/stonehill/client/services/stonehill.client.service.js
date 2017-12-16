(function () {
  'use strict';

  angular
    .module('stonehill.services')
    .factory('StonehillService', StonehillService);

  StonehillService.$inject = ['$resource', '$log'];

  function StonehillService($resource, $log) {
    var Stonehill = $resource('/api/stonehill/:stonehillId', {
      stonehillId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Stonehill.prototype, {
      createOrUpdate: function () {
        var stonehill = this;
        return createOrUpdate(stonehill);
      }
    });

    return Stonehill;

    function createOrUpdate(stonehill) {
      if (stonehill.id) {
        return stonehill.$update(onSuccess, onError);
      } else {
        return stonehill.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(stonehill) {
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
