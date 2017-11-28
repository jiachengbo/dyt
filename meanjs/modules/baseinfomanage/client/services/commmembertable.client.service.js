(function () {
  'use strict';

  angular
    .module('commMemberTable.services')
    .factory('CommMemberTableService', CommMemberTableService);

  CommMemberTableService.$inject = ['$resource', '$log'];

  function CommMemberTableService($resource, $log) {
    var CommMemberTable = $resource('/api/commMemberTable/:commMemberTableId', {
      commMemberTableId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(CommMemberTable.prototype, {
      createOrUpdate: function () {
        var commMemberTable = this;
        return createOrUpdate(commMemberTable);
      }
    });

    return CommMemberTable;

    function createOrUpdate(commMemberTable) {
      if (commMemberTable.id) {
        return commMemberTable.$update(onSuccess, onError);
      } else {
        return commMemberTable.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(commMemberTable) {
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
