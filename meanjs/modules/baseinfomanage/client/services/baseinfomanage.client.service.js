(function () {
  'use strict';

  angular
    .module('baseinfomanage.services')
    .factory('BaseinfomanageService', BaseinfomanageService);

  BaseinfomanageService.$inject = ['$resource', '$log'];

  function BaseinfomanageService($resource, $log) {
    var Baseinfomanage = $resource('/api/baseinfomanage/:baseinfomanageId', {
      baseinfomanageId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Baseinfomanage.prototype, {
      createOrUpdate: function () {
        var baseinfomanage = this;
        return createOrUpdate(baseinfomanage);
      }
    });

    return Baseinfomanage;

    function createOrUpdate(baseinfomanage) {
      if (baseinfomanage.id) {
        return baseinfomanage.$update(onSuccess, onError);
      } else {
        return baseinfomanage.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(baseinfomanage) {
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
