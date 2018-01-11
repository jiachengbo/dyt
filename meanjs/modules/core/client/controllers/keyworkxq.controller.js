(function () {
  'use strict';

  angular
    .module('core')
    .controller('KeyWorkXqController', KeyWorkXqController);
  KeyWorkXqController.$inject = ['$scope', '$rootScope', '$state', '$window', '$stateParams', 'GetKeyWorkService', 'GetPartyBuildService', '$timeout'];
  function KeyWorkXqController($scope, $rootScope, $state, $window, $stateParams, GetKeyWorkService, GetPartyBuildService, $timeout) {
    var vm = this;
    $rootScope.$emit('state', $state.current.url);
    // vm.type = $stateParams.type;
    // vm.keyworkid = $stateParams.id;
    vm.type = $window.localStorage.getItem('type');
    vm.keyworkid = $window.localStorage.getItem('keyworkid');
    function getKeyWorkData(key, id) {
      GetKeyWorkService.query({key: key, keyworkid: id}).$promise.then(function (data) {
        vm.keyWorkArr = data[0];
        var iframe = document.querySelector('.myiframe');
        var bHeight;
        var dHeight;
        var height;
        if (iframe.attachEvent) {
          iframe.attachEvent('onload', function() {
            // var iframe = document.querySelector('.myiframe');
            bHeight = iframe.contentWindow.document.body.scrollHeight;
            dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
            height = Math.max(bHeight, dHeight);
            iframe.height = height;
          });
        } else {
          iframe.onload = function() {
            // var iframe = document.querySelector('.myiframe');
            bHeight = iframe.contentWindow.document.body.scrollHeight;
            dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
            height = Math.max(bHeight, dHeight);
            iframe.height = height;
          };
        }
      });
    }

    getKeyWorkData(vm.type, vm.keyworkid);

    // $timeout(function () {
    //   var iframe = document.querySelector('.myiframe');
    //   var bHeight = iframe.contentWindow.document.body.scrollHeight;
    //   var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
    //   var height = Math.max(bHeight, dHeight);
    //   iframe.height = height;
    //   iframe.contentWindow.document.body.style.margin = '0 auto';
    // }, 500);
    // vm.changeKey = function ($event) {
    //   getKeyWorkData($event.target.innerText);
    //   angular.element(document.querySelector('.keyword_active')).removeClass('keyword_active');
    //   angular.element($event.target).parent().addClass('keyword_active');
    // };
  }
}());
