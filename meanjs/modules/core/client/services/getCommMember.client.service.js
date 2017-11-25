(function () {
  'use strict';

  angular
    .module('core.services')
    .factory('GetCommMemberService', GetCommMemberService);

  GetCommMemberService.$inject = ['$resource', '$log'];

  function GetCommMemberService($resource, $log) {
    var commMember = $resource('/api/commmember');
    return commMember;
  }
}());
