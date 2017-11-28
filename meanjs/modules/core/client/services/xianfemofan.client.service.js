(function () {
  'use strict';

  angular
    .module('core.services')
    .factory('xianfeService', xianfeService);

  xianfeService.$inject = ['$resource', '$log'];
  function xianfeService($resource, $log) {
    var xianfe = $resource('/api/xianfemofan');
    return xianfe;
  }
}());
