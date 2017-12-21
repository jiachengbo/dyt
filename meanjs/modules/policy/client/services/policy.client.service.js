(function () {
  'use strict';

  angular
    .module('policy.services')
    .factory('PolicyService', PolicyService);

  PolicyService.$inject = ['$resource', '$log'];

  function PolicyService($resource, $log) {
    var Policy = $resource('/api/policy/:policyId', {
      policyId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Policy.prototype, {
      createOrUpdate: function () {
        var policy = this;
        return createOrUpdate(policy);
      }
    });

    return Policy;

    function createOrUpdate(policy) {
      if (policy.id) {
        return policy.$update(onSuccess, onError);
      } else {
        return policy.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(policy) {
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
