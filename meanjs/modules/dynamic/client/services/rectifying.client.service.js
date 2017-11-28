(function () {
  'use strict';

  angular
    .module('dynamic.services')
    .factory('RectifyingServive', RectifyingServive);

  RectifyingServive.$inject = ['$resource', '$log'];

  function RectifyingServive($resource, $log) {
    var Dynamic = $resource('/api/rectifyinginfo/:rectifyingId', {
      rectifyingId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Dynamic.prototype, {
      createOrUpdate: function () {
        var dynamic = this;
        return createOrUpdate(dynamic);
      }
    });

    return Dynamic;

    function createOrUpdate(dynamic) {
      if (dynamic.id) {
        return dynamic.$update(onSuccess, onError);
      } else {
        return dynamic.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(dynamic) {
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
