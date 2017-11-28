(function () {
  'use strict';

  angular
    .module('womenInformationManagement.services')
    .factory('WomenInformationManagementService', WomenInformationManagementService);

  WomenInformationManagementService.$inject = ['$resource', '$log'];

  function WomenInformationManagementService($resource, $log) {
    var WomenInformationManagement = $resource('/api/womenInformationManagement/:womenInformationManagementId', {
      womenInformationManagementId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(WomenInformationManagement.prototype, {
      createOrUpdate: function () {
        var womenInformationManagement = this;
        return createOrUpdate(womenInformationManagement);
      }
    });

    return WomenInformationManagement;

    function createOrUpdate(womenInformationManagement) {
      if (womenInformationManagement.id) {
        return womenInformationManagement.$update(onSuccess, onError);
      } else {
        return womenInformationManagement.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(womenInformationManagement) {
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
