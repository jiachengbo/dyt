(function () {
  'use strict';

  angular
    .module('dynamic')
    .controller('DynamicMainTableController', DynamicMainTableController);

  DynamicMainTableController.$inject = ['$state', '$log'];
  function DynamicMainTableController($state, $log) {
    var vm = this;
    //选项卡
    vm.menus = [
      {id: 1, name: '两学一做', active: true},
      {id: 2, name: '固定党日', active: false},
      {id: 3, name: '三会一课', active: false}
    ];
    vm.activeTab = null;
    vm.selected = function (menu, Tj) {
      vm.activeTab = menu;
      $state.go('dynamic.main.one', {tabindex: menu.id, tabname: menu.name, tj: Tj, typeId: 3});
    };
    vm.selected(vm.menus[0], '');
  }
}());
