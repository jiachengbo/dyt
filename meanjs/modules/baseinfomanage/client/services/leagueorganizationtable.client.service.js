(function () {
  'use strict';

  angular
    .module('leagueOrganizationTable.services')
    .factory('LeagueOrganizationTableService', LeagueOrganizationTableService);

  LeagueOrganizationTableService.$inject = ['$resource', '$log'];

  function LeagueOrganizationTableService($resource, $log) {
    var LeagueOrganizationTable = $resource('/api/leagueOrganizationTable/:leagueOrganizationTableId', {
      leagueOrganizationTableId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(LeagueOrganizationTable.prototype, {
      createOrUpdate: function () {
        var leagueOrganizationTable = this;
        return createOrUpdate(leagueOrganizationTable);
      }
    });

    return LeagueOrganizationTable;

    function createOrUpdate(leagueOrganizationTable) {
      if (leagueOrganizationTable.id) {
        return leagueOrganizationTable.$update(onSuccess, onError);
      } else {
        return leagueOrganizationTable.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(leagueOrganizationTable) {
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
