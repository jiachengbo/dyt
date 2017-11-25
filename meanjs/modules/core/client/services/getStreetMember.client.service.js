(function () {
  'use strict';

  angular
    .module('core.services')
    .factory('GetStreetMemberService', GetStreetMemberService);

  GetStreetMemberService.$inject = ['$resource', '$log'];

  function GetStreetMemberService($resource, $log) {
    var streetMember = $resource('/api/streetmember');
    return streetMember;
  }
}());
