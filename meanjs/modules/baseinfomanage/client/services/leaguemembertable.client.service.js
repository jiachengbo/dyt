(function () {
  'use strict';

  angular
    .module('leagueMemberTable.services')
    .factory('LeagueMemberTableService', LeagueMemberTableService);

  LeagueMemberTableService.$inject = ['$resource', '$log'];

  function LeagueMemberTableService($resource, $log) {
    var LeagueMemberTable = $resource('/api/leagueMemberTable/:leagueMemberTableId', {
      leagueMemberTableId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(LeagueMemberTable.prototype, {
      createOrUpdate: function () {
        var leagueMemberTable = this;
        return createOrUpdate(leagueMemberTable);
      }
    });

    return LeagueMemberTable;

    function createOrUpdate(leagueMemberTable) {
      if (leagueMemberTable.id) {
        return leagueMemberTable.$update(onSuccess, onError);
      } else {
        return leagueMemberTable.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(leagueMemberTable) {
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
