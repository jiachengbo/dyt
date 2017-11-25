(function () {
  'use strict';

  angular
    .module('core')
    .controller('PartyMYInterController', PartyMYInterController);
  PartyMYInterController.$inject = ['$scope', '$log', '$window', 'partybuildService', '$uibModal', 'Notification', '$timeout', 'ApplyNowService'];
  function PartyMYInterController($scope, $log, $window, partybuildService, $uibModal, Notification, $timeout, ApplyNowService) {
    var vm = this;
    vm.show = true;
    vm.src = '/modules/core/client/img/zaixianzhifu/money.png';
  }
}());
