(function () {
  'use strict';

  angular
    .module('core.services')
    .factory('partyjiaoliuService', partyjiaoliuService);

  partyjiaoliuService.$inject = ['$resource', '$log'];

  function partyjiaoliuService($resource, $log) {
    var partyjiaoliu = $resource('/api/partyjiaoliu');
    return partyjiaoliu;
  }
}());
