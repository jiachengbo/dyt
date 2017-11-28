(function () {
  'use strict';

  angular
    .module('regionalization.services')
    .factory('CommunityService', CommunityService);

  CommunityService.$inject = ['$resource', '$log'];

  function CommunityService($resource, $log) {
    var Regionalization = $resource('/api/regionalization/community/:communityId', {
      communityId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Regionalization.prototype, {
      createOrUpdate: function () {
        var article = this;
        return createOrUpdate(article);
      }
    });

    return Regionalization;

    function createOrUpdate(article) {
      if (article.id) {
        return article.$update(onSuccess, onError);
      } else {
        return article.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(article) {
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
