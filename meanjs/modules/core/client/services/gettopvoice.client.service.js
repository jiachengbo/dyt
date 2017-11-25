(function () {
  'use strict';

  angular
    .module('core.services')
    .factory('GetTopVoiceService', GetTopVoiceService);

  GetTopVoiceService.$inject = ['$resource', '$log'];

  function GetTopVoiceService($resource, $log) {
    var topVoice = $resource('/api/topvoice');
    return topVoice;
  }
}());
