(function () {
  'use strict';

  angular
    .module('core.services')
    .factory('GetPartyBuildService', GetPartyBuildService);

  GetPartyBuildService.$inject = ['$resource', '$log'];

  function GetPartyBuildService($resource, $log) {
    var partyBuild = $resource('/api/partybuild');
    return partyBuild;
  }
}());
