(function () {
  'use strict';

  angular
    .module('streetMemberTable.services')
    .factory('StreetMemberTableService', StreetMemberTableService);

  StreetMemberTableService.$inject = ['$resource', '$log'];

  function StreetMemberTableService($resource, $log) {
    var StreetMemberTable = $resource('/api/streetMemberTable/:streetMemberTableId', {
      streetMemberTableId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(StreetMemberTable.prototype, {
      createOrUpdate: function () {
        var streetMemberTable = this;
        return createOrUpdate(streetMemberTable);
      }
    });

    return StreetMemberTable;

    function createOrUpdate(streetMemberTable) {
      if (streetMemberTable.id) {
        return streetMemberTable.$update(onSuccess, onError);
      } else {
        return streetMemberTable.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(streetMemberTable) {
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
