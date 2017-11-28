(function () {
  'use strict';

  angular
    .module('leagueMemberTable')
    .controller('LeagueMemberTableModalFormController', LeagueMemberTableModalFormController);

  LeagueMemberTableModalFormController.$inject = ['$scope', '$uibModalInstance', 'leagueMemberTableData', 'method', 'columnDefs', 'localStorageService'];
  function LeagueMemberTableModalFormController($scope, $uibModalInstance, leagueMemberTableData, method, columnDefs, localStorageService) {
    var vm = this;
    vm.leagueMemberTableData = leagueMemberTableData;
    vm.method = method;
    vm.disabled = (method === '浏览');
    vm.columnDefs = columnDefs;
    //在这里处理要进行的操作
    vm.ok = function(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.leagueMemberTableForm');
        return;
      }
      $uibModalInstance.close(vm.leagueMemberTableData);
    };
    vm.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
    //----------sex-----------
    var cvs_sex = [{'name': '男'}, {'name': '女'}];
    $scope.cvs_sex = cvs_sex;
    if (method === '新增') {
      vm.leagueMemberTableData.sex = cvs_sex[0].name;
    } else if (method === '修改') {
      vm.leagueMemberTableData.sex = leagueMemberTableData.sex;
    }
    //----------is_local-----------
    var cvs_is_local = [{'name': '是'}, {'name': '否'}];
    $scope.cvs_is_local = cvs_is_local;
    if (method === '新增') {
      vm.leagueMemberTableData.is_local = cvs_is_local[0].name;
    } else if (method === '修改') {
      vm.leagueMemberTableData.is_local = leagueMemberTableData.is_local;
    }
    //----------政治面貌-----------
    var cvs_politics_status = [{'name': '团员'}, {'name': '党员'}];
    $scope.cvs_politics_status = cvs_politics_status;
    if (method === '新增') {
      vm.leagueMemberTableData.politics_status = cvs_politics_status[0].name;
    } else if (method === '修改') {
      vm.leagueMemberTableData.politics_status = leagueMemberTableData.politics_status;
    }
    //----------文化程度-----------
    var cvs_education = [
      {'name': '博士'},
      {'name': '硕士'},
      {'name': '本科'},
      {'name': '大专'},
      {'name': '中专和中技'},
      {'name': '技工学校'},
      {'name': '高中'},
      {'name': '初中'},
      {'name': '小学'},
      {'name': '文盲'},
      {'name': '半文盲'}
    ];
    $scope.cvs_education = cvs_education;
    if (method === '新增') {
      if (cvs_education.length > 0) {
        vm.leagueMemberTableData.education = cvs_education[0].name;
      } else {
        vm.leagueMemberTableData.education = '无';
      }
    } else if (method === '修改') {
      vm.leagueMemberTableData.education = leagueMemberTableData.education;
    }
    //--------------------56民族--NationConstant---------------
    var cvs_nation = localStorageService.getItems('NationConstant');
    $scope.cvs_nation = cvs_nation;
    if (method === '新增') {
      if (cvs_nation.length > 0) {
        vm.leagueMemberTableData.nation = cvs_nation[0].name;
      }
    } else if (method === '修改') {
      vm.leagueMemberTableData.nation = leagueMemberTableData.nation;
    }
//读取本地存储的社区村常量表
    var cvsList = localStorageService.getItems('CommunityVillageConstant');
    $scope.cvs = cvsList;
    if (method === '新增') {
      if (cvsList.length > 0) {
        vm.leagueMemberTableData.community = cvsList[0].name;
      } else {
        vm.leagueMemberTableData.community = '无';
      }
    } else if (method === '修改') {
      vm.leagueMemberTableData.community = leagueMemberTableData.community;
    }
//日期选择器
    $scope.today = function () {
      vm.leagueMemberTableData.birthday = new Date(leagueMemberTableData.birthday);
      vm.leagueMemberTableData.join_time = new Date(leagueMemberTableData.join_time);
    };
    $scope.today();
    $scope.clear = function () {
      vm.leagueMemberTableData.birthday = null;
      vm.leagueMemberTableData.join_time = null;
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
    // end日期选择器
  }
}());
