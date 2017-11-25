(function () {
  'use strict';

  angular
    .module('core')
    .controller('GongHuiXqController', GongHuiXqController);
  GongHuiXqController.$inject = ['$scope', '$rootScope', '$state', '$window', '$stateParams', 'GetGhMsgService', 'GetTopVoiceService', '$timeout'];
  function GongHuiXqController($scope, $rootScope, $state, $window, $stateParams, GetGhMsgService, GetTopVoiceService, $timeout) {
    var vm = this;
    $rootScope.$emit('state', $state.current.url);
    // vm.type = $stateParams.type;
    // vm.keyworkid = $stateParams.id;
    vm.detailsData = {};
    var id = $stateParams.id;
    if (id === 0) {
      vm.ttt = '工会简介';
      vm.detailsData.name = '工会简介';
      vm.detailsData.content = '工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介工会简介';
    } else {
      vm.ttt = '工会活动详情';
      GetGhMsgService.query({id: id}).$promise.then(function (data) {
        vm.detailsData = data[0];
        console.log(data);
      });
    }
    $timeout(function () {
      var iframe = document.querySelector('.myiframe');
      var bHeight = iframe.contentWindow.document.body.scrollHeight;
      var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
      var height = Math.max(bHeight, dHeight);
      iframe.height = height;
    }, 800);
    // vm.type = $window.localStorage.getItem('type');
    // vm.keyworkid = $window.localStorage.getItem('keyworkid');
    // console.log(vm.keyworkid);
    // function getKeyWorkData(key, id) {
    //   GetKeyWorkService.query({key:key, keyworkid: id}).$promise.then(function (data) {
    //     vm.keyWorkArr = data[0];
    //   });
    // }
    // getKeyWorkData(vm.type, vm.keyworkid);
    // vm.changeKey = function ($event) {
    //   getKeyWorkData($event.target.innerText);
    //   angular.element(document.querySelector('.keyword_active')).removeClass('keyword_active');
    //   angular.element($event.target).parent().addClass('keyword_active');
    // };
  }
}());
