(function () {
  'use strict';

  angular
    .module('basicinfo.services')
    .factory('VolunteerTeamService', VolunteerTeamService);

  VolunteerTeamService.$inject = ['$resource', '$log'];

  function VolunteerTeamService($resource, $log) {
    var Basicinfo = $resource('/api/basic/volunteerteaminfo/:volunteerteaminfoId', {
      volunteerteaminfoId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Basicinfo.prototype, {
      createOrUpdate: function () {
        var basicinfo = this;
        return createOrUpdate(basicinfo);
      }
    });

    return Basicinfo;

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
