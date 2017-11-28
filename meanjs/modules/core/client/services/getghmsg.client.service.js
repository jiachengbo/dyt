(function () {
  'use strict';

  angular
    .module('core.services')
    .factory('GetGhMsgService', GetGhMsgService);

  GetGhMsgService.$inject = ['$resource', '$log'];

  function GetGhMsgService($resource, $log) {
    var ghmsg = $resource('/api/ghmsg');
    return ghmsg;
  }
}());
