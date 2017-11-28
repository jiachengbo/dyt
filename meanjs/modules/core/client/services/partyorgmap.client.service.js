(function () {
  'use strict';

  angular
    .module('core.services')
    .factory('partyorgmapService', partyorgmapService);

  partyorgmapService.$inject = ['$resource', '$log'];

  function partyorgmapService($resource, $log) {
    var partyorgmap = $resource('/api/partyorgmap');
    return partyorgmap;
  }
}());
