(function () {
  'use strict';

  angular
    .module('unionInformationManagement.services')
    .factory('UnionInformationManagementService', UnionInformationManagementService);

  UnionInformationManagementService.$inject = ['$resource', '$log'];

  function UnionInformationManagementService($resource, $log) {
    var UnionInformationManagement = $resource('/api/unionInformationManagement/:unionInformationManagementId', {
      unionInformationManagementId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(UnionInformationManagement.prototype, {
      createOrUpdate: function () {
        var unionInformationManagement = this;
        return createOrUpdate(unionInformationManagement);
      }
    });

    return UnionInformationManagement;

    function createOrUpdate(unionInformationManagement) {
      if (unionInformationManagement.id) {
        return unionInformationManagement.$update(onSuccess, onError);
      } else {
        return unionInformationManagement.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(unionInformationManagement) {
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
