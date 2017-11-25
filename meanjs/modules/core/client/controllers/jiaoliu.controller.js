(function () {
  'use strict';

  angular
    .module('core')
    .controller('JiaoLiuController', JiaoLiuController);
  JiaoLiuController.$inject = ['$scope', 'InterFlowService', '$window', 'partyjiaoliuService', 'communityService', '$state', '$rootScope'];
  function JiaoLiuController($scope, InterFlowService, $window, partyjiaoliuService, communityService, $state, $rootScope) {
    var vm = this;
    $rootScope.$emit('state', $state.current.url);
    vm.tiaozhaun = function (numa) {
      $window.localStorage.setItem('partyxq', numa);
    };
    partyjiaoliuService.query().$promise.then(function (data) {
      vm.jiaoliu = data;
    });
    communityService.query().$promise.then(function (data) {
      vm.community = data;
    });
    vm.check = function ($event) {
      angular.element($event.target).toggleClass('on_check');
    };
    vm.submit = function () {
      var onCheck = angular.element(document.querySelectorAll('.on_check'));
      var commId = [];
      for (var i = 0; i < onCheck.length; i++) {
        commId.push(angular.element(onCheck[i]).children()[0].id);
      }
      if (commId.length !== 0 && vm.text !== '') {
        InterFlowService.query({commId: commId, text: vm.text}).$promise.then(function (qq) {
          angular.element(document.querySelectorAll('.on_check')).removeClass('on_check');
          vm.text = '';
          if (qq) {
            $window.alert('评论成功！');
            $state.reload();
          } else {
            $window.alert('出错啦！');
          }
        });
      }
    };
  }
}());
