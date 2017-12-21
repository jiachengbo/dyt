(function () {
  'use strict';

  angular
    .module('partyserver.services')
    .factory('PartyserverService', PartyserverService);

  PartyserverService.$inject = ['$resource', '$log'];

  function PartyserverService($resource, $log) {
    var Partyserver = $resource('/api/partyserver/:partyserverId', {
      partyserverId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Partyserver.prototype, {
      createOrUpdate: function () {
        var partyserver = this;
        return createOrUpdate(partyserver);
      }
    });

    return Partyserver;

    function createOrUpdate(partyserver) {
      if (partyserver.id) {
        return partyserver.$update(onSuccess, onError);
      } else {
        return partyserver.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(partyserver) {
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
