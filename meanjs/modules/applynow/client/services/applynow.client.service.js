(function () {
  'use strict';

  angular
    .module('applyNow.services')
    .factory('ApplyNowService', ApplyNowService);

  ApplyNowService.$inject = ['$resource', '$log'];

  function ApplyNowService($resource, $log) {
    var ApplyNow = $resource('/api/applyNow/:applyNowId', {
      applyNowId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(ApplyNow.prototype, {
      createOrUpdate: function () {
        var applyNow = this;
        return createOrUpdate(applyNow);
      }
    });

    return ApplyNow;

    function createOrUpdate(applyNow) {
      if (applyNow.id) {
        return applyNow.$update(onSuccess, onError);
      } else {
        return applyNow.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(applyNow) {
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
