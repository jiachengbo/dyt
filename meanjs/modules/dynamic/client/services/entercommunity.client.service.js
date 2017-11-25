(function () {
  'use strict';

  angular
    .module('dynamic.services')
    .factory('EnterCommunityServive', EnterCommunityServive);

  EnterCommunityServive.$inject = ['$resource', '$log'];

  function EnterCommunityServive($resource, $log) {
    var Dynamic = $resource('/api/entercommunityinfo/:entercommunityId', {
      entercommunityId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Dynamic.prototype, {
      createOrUpdate: function () {
        var basicinfo = this;
        return createOrUpdate(basicinfo);
      }
    });

    return Dynamic;

    function createOrUpdate(basicinfo) {
      if (basicinfo.id) {
        return basicinfo.$update(onSuccess, onError);
      } else {
        return basicinfo.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(basicinfo) {
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
