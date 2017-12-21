(function () {
  'use strict';

  angular
    .module('activitysquare.services')
    .factory('ActivitysquareService', ActivitysquareService);

  ActivitysquareService.$inject = ['$resource', '$log'];

  function ActivitysquareService($resource, $log) {
    var Activitysquare = $resource('/api/activitysquare/:activitysquareId', {
      activitysquareId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Activitysquare.prototype, {
      createOrUpdate: function () {
        var activitysquare = this;
        return createOrUpdate(activitysquare);
      }
    });

    return Activitysquare;

    function createOrUpdate(activitysquare) {
      if (activitysquare.id) {
        return activitysquare.$update(onSuccess, onError);
      } else {
        return activitysquare.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(activitysquare) {
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
