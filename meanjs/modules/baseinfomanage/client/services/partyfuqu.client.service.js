(function () {
  'use strict';

  angular
    .module('partyOrganizationTable.services')
    .factory('partyfuquService', partyfuquService);

  partyfuquService.$inject = ['$resource', '$log'];

  function partyfuquService($resource, $log) {
    var partyfuwu = $resource('/api/partyfuwu');
    return partyfuwu;
  }
}());
