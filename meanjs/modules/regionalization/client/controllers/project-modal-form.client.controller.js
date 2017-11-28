(function () {
  'use strict';

  angular
    .module('regionalization')
    .controller('ProjectModalFormController', ProjectModalFormController);

  ProjectModalFormController.$inject = ['$scope', '$log', '$uibModalInstance', 'projectData', 'method', 'localStorageService', 'userCommId'];
  function ProjectModalFormController($scope, $log, $uibModalInstance, projectData, method, localStorageService, userCommId) {
    var vm = this;
    vm.projectData = projectData;
    vm.method = method;
    vm.disabled = (method === '查看');
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
    var arr = [];
    angular.forEach(cvsList, function (value, key) {
      if (value.name.indexOf('社区') !== -1) {
        this.push(value);
      }
    }, arr);
    $scope.communityInfo = arr;
    if (method === '新增') {
      vm.projectData.source = projectSources[0].projectSourcename;
      vm.projectData.projecttype = projectTypes[0].projectTypename;
      vm.projectData.state = '待审核';
      if (userCommId === '') {
        if (cvsList.length > 0) {
          vm.projectData.communityid = cvsList[0].id;
        }
        vm.userCommId = false;
      } else {
        vm.projectData.communityid = parseInt(userCommId, 0);
        vm.userCommId = true;
      }
      vm.projectData.state = '待审核';
    }
    if (method === '修改' || method === '查看') {
      vm.projectData.sbtime = new Date(projectData.sbtime);
      vm.projectData.finishtime = new Date(projectData.finishtime);
      vm.projectData.source = projectData.source;
      if (userCommId === '') {
        if (cvsList.length > 0) {
          vm.projectData.communityid = cvsList[0].id;
        }
        vm.userCommId = false;
      } else {
        vm.projectData.communityid = parseInt(userCommId, 0);
        vm.userCommId = true;
      }
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
    vm.ok = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.projectForm');
        return;
      }
      var h_start_y = vm.projectData.sbtime.getTime();
      var h_end_y = vm.projectData.finishtime.getTime();
      if (parseInt(h_start_y, 10) >= parseInt(h_end_y, 10)) {
        vm.yzSbTimeAndFinishTime = true;
        return;
      } else {
        vm.yzSbTimeAndFinishTime = false;
      }
      if (vm.projectData.projectsummary === undefined || vm.projectData.projectsummary === '') {
        vm.yzProjectsummary = true;
        return;
      } else {
        vm.yzProjectsummary = false;
      }
      if (vm.projectData.measure === undefined || vm.projectData.measure === '') {
        vm.yzMeasure = true;
        return;
      } else {
        vm.yzMeasure = false;
      }
      if (vm.picFile) {
        vm.projectData.projectlogo = vm.picFile;
      }

      $uibModalInstance.close(vm.projectData);
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
