(function () {
  'use strict';

  angular
    .module('core')
    .controller('PartyGXInterController', PartyGXInterController);
  PartyGXInterController.$inject = ['$scope', '$log', '$window', 'partybuildService', '$uibModal', 'Notification', '$timeout', 'ApplyNowService'];
  function PartyGXInterController($scope, $log, $window, partybuildService, $uibModal, Notification, $timeout, ApplyNowService) {
    var vm = this;
    vm.show = true;
    vm.scoll = function () {
      angular.element(document.querySelector('body'))[0].scrollTop = 0;
    };
    var i = 1;
    vm.src = '/modules/core/client/img/zaixianzhifu/1.png';
    $timeout(function () {
      vm.tupain = function (a) {
        if (a && !angular.isNumber(a)) {
          i--;
        } else {
          i++;
        }
        if (i === 0) {
          i = 1;
        }
        if (angular.isNumber(a)) {
          i = a;
        }
        angular.element(document.querySelector('.basic_menu_site>ul>li.basic_current')).removeClass('basic_current');
        angular.element(document.querySelectorAll('.basic_menu_site>ul>li:nth-of-type(' + i + ')')).addClass('basic_current');
        vm.src = '/modules/core/client/img/zaixianzhifu/' + i + '.png';
        if (i === 6) {
          vm.show = false;
        } else {
          vm.show = true;
        }
      };
    }, 500);

    vm._openModal = function (resarg) {
      return $uibModal.open({
        templateUrl: '/modules/applynow/client/views/applyNow-modal-form.client.view.html',
        controller: 'ApplyNowModalFormController',
        controllerAs: 'vm',
        backdrop: 'static',
        size: 'lg',
        resolve: resarg
      });
    };

    //增加数据
    vm.add = function () {
      var modalInstance = vm._openModal({
        //applyNow会传入modal的controller
        applyNowData: function () {
          //空数据
          return new ApplyNowService();
        },
        //表明是增加
        method: function () {
          return '增加';
        }
      });

      // 模态窗口关闭之后返回的值
      modalInstance.result.then(function (result) {
        $log.log('modal ok:', result);
        result.$save()
          .then(function (res) {
            $window.alert('预约成功');
          })
          .catch(function (err) {
            $window.alert('预约失败请重新预约');
          });
      })
        .catch(function (reason) {
          $log.log('Modal dismissed:', reason);
        });
    };
  }
}());
