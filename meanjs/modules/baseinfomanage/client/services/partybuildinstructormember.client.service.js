(function () {
  'use strict';

  angular
    .module('partyBuildInstructorTable.services')
    .factory('PartyBuildInstructorMemberService', PartyBuildInstructorMemberService);

  PartyBuildInstructorMemberService.$inject = ['$resource', '$log'];

  function PartyBuildInstructorMemberService($resource, $log) {
    var PartyBuildInstructorTable = $resource('/api/partyBuildInstructorMember/:partyBuildInstructorMemberId', {
      partyBuildInstructorMemberId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(PartyBuildInstructorTable.prototype, {
      createOrUpdate: function () {
        var partyBuildInstructorTable = this;
        return createOrUpdate(partyBuildInstructorTable);
      }
    });

    return PartyBuildInstructorTable;

    function createOrUpdate(partyBuildInstructorTable) {
      if (partyBuildInstructorTable.id) {
        return partyBuildInstructorTable.$update(onSuccess, onError);
      } else {
        return partyBuildInstructorTable.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(partyBuildInstructorTable) {
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
