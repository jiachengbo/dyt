(function () {
  'use strict';

  angular
    .module('regionalization')
    .controller('ProjectApprovalModalFormController', ProjectApprovalModalFormController);

  ProjectApprovalModalFormController.$inject = ['$scope', '$log', '$window', '$uibModalInstance', 'projectData', 'method', 'ProgressService', 'Notification', 'Upload', 'localStorageService'];
  function ProjectApprovalModalFormController($scope, $log, $window, $uibModalInstance, projectData, method, ProgressService, Notification, Upload, localStorageService) {
    var vm = this;
    vm.projectData = projectData;
    vm.method = method;
    vm.disabled = (method === '审核');
    //项目来源下拉框
    var projectSources = [
      {'projectSourcename': '问卷调查'},
      {'projectSourcename': '街道党工委研究'},
      {'projectSourcename': '在职党员上报'},
      {'projectSourcename': '成员单位上报'},
      {'projectSourcename': '社区发起'},
      {'projectSourcename': '其他'}
    ];
    $scope.projectSourceInfo = projectSources;
    //项目类型下拉框
    var projectTypes = [
      {'projectTypename': '社会稳定'},
      {'projectTypename': '经济发展'},
      {'projectTypename': '社会服务保障'},
      {'projectTypename': '社会综合治理'},
      {'projectTypename': '其他'}
    ];
    $scope.projectTypeInfo = projectTypes;
    //读取本地存储的社区村常量表
    var cvsList = localStorageService.getItems('CommunityVillageConstant');
    $scope.communityInfo = cvsList;
    //是否审核通过下拉框
    var approveds = [
      {'approvedname': '是'},
      {'approvedname': '否'}
    ];
    $scope.approvedInfo = approveds;
    if (method === '新增') {
      vm.projectData.source = projectSources[0].projectSourcename;
      vm.projectData.projecttype = projectTypes[0].projectTypename;
      if (cvsList.length > 0) {
        vm.projectData.communityid = cvsList[0].id;
      }
      vm.projectData.state = '待审核';
    }
    if (method === '修改' || method === '查看' || method === '审核') {
      vm.projectData.approvedstate = approveds[0].approvedname;
      vm.projectData.source = projectData.source;
      vm.projectData.sbtime = new Date(projectData.sbtime);
      vm.projectData.finishtime = new Date(projectData.finishtime);
    }
    //日期选择器
    $scope.today = function () {
      vm.projectData.sbtime = new Date();
      vm.projectData.finishtime = new Date();
    };
    $scope.clear = function () {
      vm.projectData.sbtime = null;
      vm.projectData.finishtime = null;
    };

    $scope.inlineOptions = {
      customClass: getDayClass,
      minDate: new Date(),
      showWeeks: true
    };

    $scope.toggleMin = function () {
      $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    };

    $scope.toggleMin();
    $scope.open1 = function () {
      $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
      $scope.popup2.opened = true;
    };

    $scope.popup1 = {
      opened: false
    };

    $scope.popup2 = {
      opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

    function getDayClass(data) {
      var date = data.date,
        mode = data.mode;
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

        for (var i = 0; i < $scope.events.length; i++) {
          var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }
      return '';
    }

    //在这里处理要进行的操作
    vm.approval = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.approvalForm');
        return;
      }
      vm.projectData.state = '实施中';
      if (vm.projectData.approvedstate === '否') {
        if (vm.projectData.rejectcause === undefined || vm.projectData.rejectcause === '') {
          vm.yzRejectCause = true;
          return;
        } else {
          vm.yzRejectCause = false;
        }
        vm.projectData.state = '未通过';
      }
      $uibModalInstance.close(vm.projectData);
    };
    //在这里处理要进行的操作
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
