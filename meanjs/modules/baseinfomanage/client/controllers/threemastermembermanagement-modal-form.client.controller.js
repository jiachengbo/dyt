(function () {
  'use strict';

  angular
    .module('threeMasterMemberManagement')
    .controller('ThreeMasterMemberManagementModalFormController', ThreeMasterMemberManagementModalFormController);

  ThreeMasterMemberManagementModalFormController.$inject = ['$scope', '$uibModalInstance', 'threeMasterMemberManagementData', 'method', 'columnDefs', 'localStorageService', 'userCommId'];
  function ThreeMasterMemberManagementModalFormController($scope, $uibModalInstance, threeMasterMemberManagementData, method, columnDefs, localStorageService, userCommId) {
    var vm = this;
    vm.threeMasterMemberManagementData = threeMasterMemberManagementData;
    vm.method = method;
    vm.disabled = (method === '浏览');
    vm.columnDefs = columnDefs;
    //在这里处理要进行的操作
    vm.ok = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.threeMasterMemberManagementForm');
        return;
      }
      $uibModalInstance.close(vm.threeMasterMemberManagementData);
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
    //----------sex-----------
    var cvs_sex = [{'name': '男'}, {'name': '女'}];
    $scope.cvs_sex = cvs_sex;
    if (method === '新增') {
      vm.threeMasterMemberManagementData.sex = cvs_sex[0].name;
    } else if (method === '修改') {
      vm.threeMasterMemberManagementData.sex = threeMasterMemberManagementData.sex;
    }
    //读取本地存储的社区村常量表
    var cvs = localStorageService.getItems('CommunityVillageConstant');
    var arr = [];
    angular.forEach(cvs, function (value, key) {
      if (value.name.indexOf('社区') !== -1) {
        this.push(value);
      }
    }, arr);
    $scope.cvs = arr;
    if (method === '新增') {
      if (userCommId === '') {
        vm.threeMasterMemberManagementData.community = cvs[0].id;
        vm.userCommId = false;
      } else {
        vm.threeMasterMemberManagementData.community = parseInt(userCommId, 0);
        vm.userCommId = true;
      }
    } else if (method === '修改') {
      if (userCommId === '') {
        vm.threeMasterMemberManagementData.community = cvs[0].id;
        vm.userCommId = false;
      } else {
        vm.threeMasterMemberManagementData.community = parseInt(userCommId, 0);
        vm.userCommId = true;
      }
    }
    //----------文化程度-----------
    var cvs_education_degree = [
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
    $scope.cvs_education_degree = cvs_education_degree;
    if (method === '新增') {
      if (cvs_education_degree.length > 0) {
        vm.threeMasterMemberManagementData.education_degree = cvs_education_degree[0].name;
      } else {
        vm.threeMasterMemberManagementData.education_degree = '无';
      }
    } else if (method === '修改') {
      vm.threeMasterMemberManagementData.education_degree = threeMasterMemberManagementData.education_degree;
    }
    //----------类型type_style-----------
    var cvs_type_style = [
      {'name': '网格长'},
      {'name': '楼栋长'},
      {'name': '中心户长'},
      {'name': '党建工作专员'},
      {'name': '社区治理专员'},
      {'name': '为民服务专员'}
    ];
    $scope.cvs_type_style = cvs_type_style;
    if (method === '新增') {
      vm.threeMasterMemberManagementData.type_style = cvs_type_style[0].name;
    } else if (method === '修改') {
      vm.threeMasterMemberManagementData.type_style = threeMasterMemberManagementData.type_style;
    }
    //--------------------56民族--NationConstant---------------
    var cvs_nation = localStorageService.getItems('NationConstant');
    $scope.cvs_nation = cvs_nation;
    if (method === '新增') {
      if (cvs_nation.length > 0) {
        vm.threeMasterMemberManagementData.nation = cvs_nation[0].name;
      }
    } else if (method === '修改') {
      vm.threeMasterMemberManagementData.nation = threeMasterMemberManagementData.nation;
    }
    //-------------------------
    //日期选择器
    $scope.today = function () {
      vm.threeMasterMemberManagementData.birth_date = new Date(threeMasterMemberManagementData.birth_date);
    };
    $scope.today();
    $scope.clear = function () {
      vm.threeMasterMemberManagementData.birth_date = null;
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
    $scope.popup1 = {
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
