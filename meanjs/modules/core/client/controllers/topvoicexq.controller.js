(function () {
  'use strict';

  angular
    .module('core')
    .controller('TopVoiceXqController', TopVoiceXqController);
  TopVoiceXqController.$inject = ['$scope', '$rootScope', '$state', '$window', '$stateParams', 'GetKeyWorkService', 'GetTopVoiceService', '$timeout'];
  function TopVoiceXqController($scope, $rootScope, $state, $window, $stateParams, GetKeyWorkService, GetTopVoiceService, $timeout) {
    var vm = this;
    $rootScope.$emit('state', $state.current.url);
    // vm.type = $stateParams.type;
    // vm.keyworkid = $stateParams.id;
    var id = $stateParams.id;
    GetTopVoiceService.query({id: id}).$promise.then(function (data) {
      vm.detailsData = data[0];
    });

    $timeout(function () {
      var iframe = document.querySelector('.myiframe');
      var bHeight = iframe.contentWindow.document.body.scrollHeight;
      var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
      var height = Math.max(bHeight, dHeight);
      iframe.height = height;
      iframe.contentWindow.document.body.style.margin = '0 auto';
    }, 500);
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
