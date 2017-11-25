(function () {
  'use strict';

  angular
    .module('partyMemberTable.services')
    .factory('PartyMemberTableService', PartyMemberTableService);

  PartyMemberTableService.$inject = ['$resource', '$log'];

  function PartyMemberTableService($resource, $log) {
    var PartyMemberTable = $resource('/api/partyMemberTable/:partyMemberTableId', {
      partyMemberTableId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(PartyMemberTable.prototype, {
      createOrUpdate: function () {
        var partyMemberTable = this;
        return createOrUpdate(partyMemberTable);
      }
    });

    return PartyMemberTable;

    function createOrUpdate(partyMemberTable) {
      if (partyMemberTable.id) {
        return partyMemberTable.$update(onSuccess, onError);
      } else {
        return partyMemberTable.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(partyMemberTable) {
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
