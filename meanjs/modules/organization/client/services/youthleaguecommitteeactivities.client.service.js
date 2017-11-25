(function () {
  'use strict';

  angular
    .module('organization.services')
    .factory('ylcaService', ylcaService);

  ylcaService.$inject = ['$resource', '$log'];

  function ylcaService($resource, $log) {
    var Organization = $resource('/api/ylca/:ylcaId', {
      ylcaId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Organization.prototype, {
      createOrUpdate: function () {
        var organization = this;
        return createOrUpdate(organization);
      }
    });

    return Organization;

    function createOrUpdate(organization) {
      if (organization.id) {
        return organization.$update(onSuccess, onError);
      } else {
        return organization.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(organization) {
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
