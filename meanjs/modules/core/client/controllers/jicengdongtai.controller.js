(function () {
  'use strict';

  angular
    .module('core')
    .controller('jicengdtController', jicengdtController);
  jicengdtController.$inject = ['$scope', '$rootScope', '$state', '$window', 'GetKeyWorkService', '$stateParams'];
  function jicengdtController($scope, $rootScope, $state, $window, GetKeyWorkService, $stateParams) {
    var vm = this;
    vm.type = '两学一做';
    $rootScope.$emit('state', $state.current.url);
    var keyworkid = $stateParams.keyworkid;
    function getKeyWorkData(keyid) {
      GetKeyWorkService.query({keyworkid: keyid}).$promise.then(function (data) {
        vm.keyWorkArr = data[0];
      });
    }
    getKeyWorkData(keyworkid);
  }
}());
