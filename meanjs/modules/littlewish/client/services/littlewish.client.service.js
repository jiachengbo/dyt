(function () {
  'use strict';

  angular
    .module('littlewish.services')
    .factory('LittlewishService', LittlewishService);

  LittlewishService.$inject = ['$resource', '$log'];

  function LittlewishService($resource, $log) {
    var Littlewish = $resource('/api/littlewish/:littlewishId', {
      littlewishId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Littlewish.prototype, {
      createOrUpdate: function () {
        var littlewish = this;
        return createOrUpdate(littlewish);
      }
    });

    return Littlewish;

    function createOrUpdate(littlewish) {
      if (littlewish.id) {
        return littlewish.$update(onSuccess, onError);
      } else {
        return littlewish.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(littlewish) {
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
