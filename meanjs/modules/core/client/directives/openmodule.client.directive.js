(function () {
  'use strict';

  // https://gist.github.com/rhutchison/c8c14946e88a1c8f9216

  angular
    .module('core')
    .factory('UserMsg', UserMsg);

  UserMsg.$inject = ['$uibModal', '$interpolate', 'Authentication', 'localStorageService'];

  function UserMsg($uibModal, $interpolate, Authentication, localStorageService) {
    var obj = {};
    var vm = this;
    // 判断当前用户的层级id和对象id
    /*obj.openModal = function (resarg) {
      return $uibModal.open({
        templateUrl: '/modules/organization/client/views/youthleaguecommitteeactivitiestable-modal-form.client.view.html',
        controller: 'YLCAModalFormController',
        controllerAs: 'vm',
        backdrop: 'static',
        resolve: resarg,
        size: 'lg'
      });
    };*/


  }
}());
