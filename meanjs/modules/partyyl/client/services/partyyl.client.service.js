(function () {
  'use strict';

  angular
    .module('partyyl.services')
    .factory('PartyylService', PartyylService);

  PartyylService.$inject = ['$resource', '$log'];

  function PartyylService($resource, $log) {
    var Partyyl = $resource('/api/partyyl/:partyylId', {
      partyylId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Partyyl.prototype, {
      createOrUpdate: function () {
        var partyyl = this;
        return createOrUpdate(partyyl);
      }
    });

    return Partyyl;

    function createOrUpdate(partyyl) {
      if (partyyl.id) {
        return partyyl.$update(onSuccess, onError);
      } else {
        return partyyl.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(partyyl) {
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
