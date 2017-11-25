(function () {
  'use strict';

  angular
    .module('core.services')
    .factory('studyDTService', studyDTService);

  studyDTService.$inject = ['$resource', '$log'];
  function studyDTService($resource, $log) {
    var studyDT = $resource('/api/studyDT');
    return studyDT;
  }
}());
