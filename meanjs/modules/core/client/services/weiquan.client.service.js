(function () {
  'use strict';

  angular
    .module('core.services')
    .factory('WeiQuanService', WeiQuanService);

  WeiQuanService.$inject = ['$resource', '$log'];

  function WeiQuanService($resource, $log) {
    var weiquan = $resource('/api/weiquan');
    return weiquan;
  }
}());
