(function () {
  'use strict';

  angular
    .module('activitysquare.services')
    .factory('ActivitcService', ActivitcService);

  ActivitcService.$inject = ['$resource', '$log'];

  function ActivitcService($resource, $log) {
    var Activitc = $resource('/api/Activitc');
    return Activitc;
  }
}());
