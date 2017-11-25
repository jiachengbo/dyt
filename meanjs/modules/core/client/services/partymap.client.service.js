(function () {
  'use strict';

  angular
    .module('core.services')
    .factory('partymapService', partymapService);

  partymapService.$inject = ['$resource', '$log'];

  function partymapService($resource, $log) {
    var partymap = $resource('/api/partymaplist');
    return partymap;
  }
}());
