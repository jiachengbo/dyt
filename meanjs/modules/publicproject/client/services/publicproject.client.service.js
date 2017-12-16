(function () {
  'use strict';

  angular
    .module('publicproject.services')
    .factory('PublicprojectService', PublicprojectService);

  PublicprojectService.$inject = ['$resource', '$log'];

  function PublicprojectService($resource, $log) {
    var Publicproject = $resource('/api/publicproject/:publicprojectId', {
      publicprojectId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Publicproject.prototype, {
      createOrUpdate: function () {
        var publicproject = this;
        return createOrUpdate(publicproject);
      }
    });

    return Publicproject;

    function createOrUpdate(publicproject) {
      if (publicproject.id) {
        return publicproject.$update(onSuccess, onError);
      } else {
        return publicproject.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(publicproject) {
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
