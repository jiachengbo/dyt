(function () {
  'use strict';

  angular
    .module('partyOrganizationTable.services')
    .factory('PartyOrganizationTableService', PartyOrganizationTableService);

  PartyOrganizationTableService.$inject = ['$resource', '$log'];

  function PartyOrganizationTableService($resource, $log) {
    var PartyOrganizationTable = $resource('/api/partyOrganizationTable/:partyOrganizationTableId', {
      partyOrganizationTableId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(PartyOrganizationTable.prototype, {
      createOrUpdate: function () {
        var partyOrganizationTable = this;
        return createOrUpdate(partyOrganizationTable);
      }
    });

    return PartyOrganizationTable;

    function createOrUpdate(partyOrganizationTable) {
      if (partyOrganizationTable.id) {
        return partyOrganizationTable.$update(onSuccess, onError);
      } else {
        return partyOrganizationTable.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(partyOrganizationTable) {
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
