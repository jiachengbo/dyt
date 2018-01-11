(function () {
  'use strict';

  angular
    .module('core')
    .controller('StudyXqController', StudyXqController);
  StudyXqController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$window', 'GetCommMemberService', 'GetPartyBuildService', 'studyDTService', '$timeout'];
  function StudyXqController($scope, $rootScope, $state, $stateParams, $window, GetCommMemberService, GetPartyBuildService, studyDTService, $timeout) {
    var vm = this;
    $rootScope.$emit('state', $state.current.url);
    console.log($stateParams.id);
    studyDTService.query({id: $stateParams.id}).$promise.then(function (data) {
      vm.studyDT = data[0];
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
    $timeout(function () {
      var iframe = document.querySelector('.myiframe');
      var bHeight = iframe.contentWindow.document.body.scrollHeight;
      var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
      var height = Math.max(bHeight, dHeight);
      iframe.height = height;
      iframe.contentWindow.document.body.style.margin = '0 auto';
    }, 1000);
  }
}());
