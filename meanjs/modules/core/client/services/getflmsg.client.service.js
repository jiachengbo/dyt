(function () {
  'use strict';

  angular
    .module('core.services')
    .factory('GetFlMsgService', GetFlMsgService);

  GetFlMsgService.$inject = ['$resource', '$log'];

  function GetFlMsgService($resource, $log) {
    var flmsg = $resource('/api/flmsg');
    return flmsg;
  }
}());
