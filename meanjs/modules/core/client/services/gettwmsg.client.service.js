(function () {
  'use strict';

  angular
    .module('core.services')
    .factory('GetTwMsgService', GetTwMsgService);

  GetTwMsgService.$inject = ['$resource', '$log'];

  function GetTwMsgService($resource, $log) {
    var twmsg = $resource('/api/twmsg');
    return twmsg;
  }
}());
