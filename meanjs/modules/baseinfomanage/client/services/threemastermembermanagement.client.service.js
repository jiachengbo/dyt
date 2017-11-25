(function () {
  'use strict';

  angular
    .module('threeMasterMemberManagement.services')
    .factory('ThreeMasterMemberManagementService', ThreeMasterMemberManagementService);

  ThreeMasterMemberManagementService.$inject = ['$resource', '$log'];

  function ThreeMasterMemberManagementService($resource, $log) {
    var ThreeMasterMemberManagement = $resource('/api/threeMasterMemberManagement/:threeMasterMemberManagementId', {
      threeMasterMemberManagementId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(ThreeMasterMemberManagement.prototype, {
      createOrUpdate: function () {
        var threeMasterMemberManagement = this;
        return createOrUpdate(threeMasterMemberManagement);
      }
    });

    return ThreeMasterMemberManagement;

    function createOrUpdate(threeMasterMemberManagement) {
      if (threeMasterMemberManagement.id) {
        return threeMasterMemberManagement.$update(onSuccess, onError);
      } else {
        return threeMasterMemberManagement.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(threeMasterMemberManagement) {
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
