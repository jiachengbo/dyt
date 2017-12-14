(function () {
  'use strict';

  angular
    .module('dynamic')
    .controller('DynamicModalFormController', DynamicModalFormController);

  DynamicModalFormController.$inject = ['$scope', '$log', '$uibModalInstance', 'dynamicData', 'method', 'tableName', 'localStorageService', 'userCommId', 'Authentication', '$stateParams', '$window', 'partyid'];
  function DynamicModalFormController($scope, $log, $uibModalInstance, dynamicData, method, tableName, localStorageService, userCommId, Authentication, $stateParams, $window, partyid) {
    var mo = this;

    mo.dynamicData = dynamicData;
    // mo.dynamicData.partytype = partyid;
    mo.method = method;
    mo.tablename = tableName;
    mo.leixin = $window.parseInt($stateParams.typeId);
    if (mo.leixin !== 3) {
      mo.show = false;
      // mo.dynamicData.starttime = null;
      // mo.dynamicData.endtime = null;
      // mo.dynamicData.head = null;
    } else {
      mo.show = true;
    }
    mo.disabled = (method === '查看');
    //党建类型 partytypesInfo
    var partytypesInfo;
    //活动类型 typeInfo
    var typeInfo;
    var roles = mo.AuthenticationRoles = Authentication.user.roles;
    var _roles = '';
    if (roles[1].indexOf('_') !== -1) {
      var roles1 = roles[1].split('_');
      _roles = roles1[0];
    }
    if (roles.indexOf('admin') !== -1 || roles.indexOf('adminrole') !== -1 || roles.indexOf('djadmin') !== -1) {
      partytypesInfo = [
        {'name': '农村党建'},
        {'name': '城市党建'},
        {'name': '非公党建'},
        {'name': '机关党建'},
        {'name': '社会组织党建'}
      ];
    } else if (roles.indexOf('ncadmin') !== -1 || _roles.indexOf('nc') !== -1) {
      partytypesInfo = [
        {'name': '农村党建'}
      ];
    } else if (roles.indexOf('jgadmin') !== -1) {
      partytypesInfo = [
        {'name': '机关党建'}
      ];
    } else if (roles.indexOf('sqadmin') !== -1 || _roles.indexOf('sq') !== -1) {
      partytypesInfo = [
        {'name': '城市党建'}
      ];
    } else if (roles.indexOf('fgadmin') !== -1) {
      partytypesInfo = [
        {'name': '非公党建'}
      ];
    } else if (roles.indexOf('shzzadmin') !== -1) {
      partytypesInfo = [
        {'name': '社会组织党建'}
      ];
    }
    $scope.partytypesInfo = partytypesInfo;
    if (method === '新增') {
      //党建类型
      if (partytypesInfo.length > 0) {
        if (tableName !== '两学一做') {
          mo.dynamicData.partytype = partytypesInfo[0].name;
        } else {
          mo.dynamicData.partytype = '';
        }
      }
    }
    //上级部署、安排落实、基层动态、书记讲党课、榜样的力量、长安新语
    if (tableName === '两学一做') {
      typeInfo = localStorageService.getItems('KeyWorkTypeConstant');
    } else if (tableName === '固定党日') {
      typeInfo = [
        {'id': 7, 'name': '固定党日'}
      ];
    } else if (tableName === '三会一课') {
      typeInfo = [
        {'id': 8, 'name': '三会一课'}
      ];
    }
    $scope.typeInfo = typeInfo;
    if (method === '新增') {
      if (typeInfo.length > 0) {
        if (tableName === '两学一做') {
          mo.dynamicData.typeId = typeInfo[0].id;
          mo.dynamicData.type = '两学一做';
        } else {
          mo.dynamicData.type = tableName;
        }
      }
    }
    //读取本地存储的社区常量表
    var cvsList = localStorageService.getItems('CommunityVillageConstant');
    var srr = [];
    if (partyid === '农村党建') {
      angular.forEach(cvsList, function (value, key) {
        if (value.name[value.name.length - 1] === '村') {
          this.push(value);
        }
      }, srr);
    } else if (partyid === '城市党建') {
      angular.forEach(cvsList, function (value, key) {
        if (value.name.indexOf('社区') !== -1) {
          this.push(value);
        }
      }, srr);
    } else {
      srr = cvsList;
    }
    $scope.communityInfo = srr;
    if (method === '新增') {
      mo.dynamicData.type = tableName;//活动类型
      if (userCommId === '') {
        if (cvsList.length > 0) {
          mo.dynamicData.communityid = cvsList[0].id;
        }
        mo.userCommId = false;
      } else {
        mo.dynamicData.communityid = parseInt(userCommId, 0);
        mo.userCommId = true;
      }
    }
    if (method === '修改' || method === '查看') {
      mo.dynamicData.starttime = new Date(dynamicData.starttime);
      mo.dynamicData.endtime = new Date(dynamicData.endtime);
      if (userCommId === '') {
        if (cvsList.length > 0) {
          mo.dynamicData.communityid = cvsList[0].id;
        }
        mo.userCommId = false;
      } else {
        mo.dynamicData.communityid = parseInt(userCommId, 0);
        mo.userCommId = true;
      }
    }

    //日期选择器
    $scope.today = function () {
      mo.dynamicData.starttime = new Date();
      mo.dynamicData.endtime = new Date();
    };
    $scope.clear = function () {
      mo.dynamicData.starttime = null;
      mo.dynamicData.endtime = null;
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
    mo.ok = function (isValid) {
      if (mo.fileFile) {
        if (mo.fileFile.name.slice(-4) !== 'html') {
          $window.alert('请将word文件进行转换');
          return;
        }
      }
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'mo.dynamicForm');
        return;
      }
      if (mo.leixin === 3) {
        var h_start_y = mo.dynamicData.starttime.getTime();
        var h_end_y = mo.dynamicData.endtime.getTime();
        if (parseInt(h_start_y, 10) > parseInt(h_end_y, 10)) {
          mo.yzStartAndEndTime = true;
          return;
        } else {
          mo.yzStartAndEndTime = false;
        }
        if (mo.dynamicData.content === undefined || mo.dynamicData.content === '') {
          mo.yzContent = true;
          return;
        } else {
          mo.yzContent = false;
        }
      }
      if (mo.picFile) {
        mo.dynamicData.photo = mo.picFile;
      }
      if (mo.fileFile) {
        mo.dynamicData.file_path = mo.fileFile;
      }
      $uibModalInstance.close(mo.dynamicData);
    };
    mo.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
