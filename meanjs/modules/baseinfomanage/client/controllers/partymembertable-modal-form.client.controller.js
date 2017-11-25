(function () {
  'use strict';

  angular
    .module('partyMemberTable')
    .controller('PartyMemberTableModalFormController', PartyMemberTableModalFormController);

  PartyMemberTableModalFormController.$inject = ['$state', '$scope', '$log', '$uibModalInstance', 'partyMemberTableData', 'method', 'columnDefs', 'localStorageService', 'userCommId', 'Authentication', 'party', 'partyfuquService', '$timeout'];
  function PartyMemberTableModalFormController($state, $scope, $log, $uibModalInstance, partyMemberTableData, method, columnDefs, localStorageService, userCommId, Authentication, party, partyfuquService, $timeout) {
    var vm = this;
    vm.partyMemberTableData = partyMemberTableData;
    vm.partyMemberTableData.partytype = party;
    vm.partyorg = localStorageService.getItems('PartyOrganizationUnitTypeConstant');
    vm.method = method;
    vm.disabled = (method === '浏览');
    vm.columnDefs = columnDefs;
    partyfuquService.query().$promise.then(function (data) {
      vm.partyzhibu = data;

    });
    //在这里处理要进行的操作
    vm.ok = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.partyMemberTableForm');
        return;
      }
      $uibModalInstance.close(vm.partyMemberTableData);
    };
    vm.cancel = function () {
      //  跳转到 地图界面
      $uibModalInstance.dismiss('cancel');

    };
    //----------sex-----------
    var cvs_sex = [{'name': '男'}, {'name': '女'}];
    $scope.cvs_sex = cvs_sex;
    if (method === '新增') {
      vm.partyMemberTableData.sex = cvs_sex[0].name;
    } else if (method === '修改') {
      vm.partyMemberTableData.sex = partyMemberTableData.sex;
    }
    //----------is_lost-是否失联----------
    var cvs_is_lost = [{'name': '否'}, {'name': '是'}];
    $scope.cvs_is_lost = cvs_is_lost;
    if (method === '新增') {
      vm.partyMemberTableData.is_lost = cvs_is_lost[0].name;
    } else if (method === '修改') {
      vm.partyMemberTableData.is_lost = partyMemberTableData.is_lost;
    }
    //----------is_lost-是否失联----------
    var cvs_is_float = [{'name': '否'}, {'name': '是'}];
    $scope.cvs_is_float = cvs_is_float;
    if (method === '新增') {
      vm.partyMemberTableData.is_float = cvs_is_float[0].name;
    } else if (method === '修改') {
      vm.partyMemberTableData.is_float = partyMemberTableData.is_float;
    }
    //--------------------56民族--NationConstant---------------
    var cvs_nation = localStorageService.getItems('NationConstant');
    $scope.cvs_nation = cvs_nation;
    if (method === '新增') {
      if (cvs_nation.length > 0) {
        vm.partyMemberTableData.nation = cvs_nation[0].name;
      }
    } else if (method === '修改') {
      vm.partyMemberTableData.nation = partyMemberTableData.nation;
    }
    //------------籍贯---NationPlaceConstant-----------
    var cvs_nation_place = localStorageService.getItems('NationPlaceConstant');
    $scope.cvs_nation_place = cvs_nation_place;
    if (method === '新增') {
      if (cvs_nation_place.length > 0) {
        vm.partyMemberTableData.nation_place = cvs_nation_place[0].name;
      }
    } else if (method === '修改') {
      vm.partyMemberTableData.nation_place = partyMemberTableData.nation_place;
    }
    //读取本地存储的社区村常量表
    var cvsList = localStorageService.getItems('CommunityVillageConstant');
    // var partyrole = localStorageService.getItems('PartyOrganizationUnitTypeConstant');
    // if(Authentication.user){
    //   if (Authentication.user.roles[1].indexOf('_') !== -1) {
    //     angular.forEach(partyrole, function (value, key) {
    //       if (value.roles.indexOf(Authentication.user.roles[1].split('_')[0]) !== -1) {
    //         vm.type = value.id;
    //       }
    //     });
    //   } else {
    //     angular.forEach(partyrole, function (value, key) {
    //       if (value.roles === Authentication.user.roles[1]) {
    //         vm.type = value.id;
    //       }
    //     });
    //   }
    // }
    var srr = [];
    if (party === 2) {
      angular.forEach(cvsList, function (value, key) {
        if (value.name[value.name.length - 1] === '村') {
          this.push(value);
        }
      }, srr);
    } else if (party === 1) {
      angular.forEach(cvsList, function (value, key) {
        if (value.name.indexOf('社区') !== -1) {
          this.push(value);
        }
      }, srr);
    } else {
      srr = cvsList;
    }
    $scope.cvs = srr;
    // $scope.cvs = cvsList;
    if (method === '新增') {
      if (userCommId === '') {
        if (cvsList.length > 0) {
          vm.partyMemberTableData.community = cvsList[0].id;
        }
        vm.userCommId = false;
      } else {
        vm.partyMemberTableData.community = parseInt(userCommId, 0);
        vm.userCommId = true;
      }
    } else if (method === '修改') {
      vm.partyMemberTableData.community = partyMemberTableData.community;

      if (userCommId === '') {
        if (cvsList.length > 0) {
          vm.partyMemberTableData.community = partyMemberTableData.community;
        }
        vm.userCommId = false;
      } else {
        vm.partyMemberTableData.community = parseInt(userCommId, 0);
        vm.userCommId = true;
      }
    }
    //----党员类别常量表----
    var cvsPartyTypeList = localStorageService.getItems('PartyMememberTypeConstant');
    $scope.cvs_party_type = cvsPartyTypeList;
    if (method === '新增') {
      if (cvsPartyTypeList.length > 0) {
        vm.partyMemberTableData.party_type = cvsPartyTypeList[0].name;
      } else {
        vm.partyMemberTableData.party_type = '无';
      }
    } else if (method === '修改') {
      vm.partyMemberTableData.party_type = partyMemberTableData.party_type;
    }
    vm.Selected = function (selectStr) {
      if (selectStr === '是') {
        vm.partyMemberTableData.lost_time = new Date(1900, 0, 1);
      }
    };


    //----党支部常量表----
    $timeout(function () {
      vm.shequ = function (num) {
        $scope.cvs_party_branch = [];
        angular.forEach(vm.partyzhibu, function (v, k) {
          if (v.community === num + '') {
            $scope.cvs_party_branch.push(v);
          }
        });
      };
      if (method === '新增') {
        if (vm.partyzhibu) {
          if (party === 1) {
            if (userCommId) {
              vm.shequ(parseInt(userCommId, 0));
            } else {
              vm.shequ(1);
            }
          } else {
            if (userCommId) {
              vm.shequ(parseInt(userCommId, 0));
            }
          }
          vm.partyMemberTableData.party_branch = vm.partyzhibu[0].name;
        } else {
          vm.partyMemberTableData.party_branch = '无';
        }
      } else if (method === '修改') {
        $scope.cvs_party_branch = [];
        angular.forEach(vm.partyzhibu, function (v, k) {
          if (v.community === partyMemberTableData.community + '') {
            $scope.cvs_party_branch.push(v);
          }
        });
        vm.partyMemberTableData.party_branch = $scope.cvs_party_branch[0].name;
      }
    }, 200);

    /*var cvsPartyBranchList = localStorageService.getItems('PartyBranchConstant');
     $scope.cvs_party_branch = cvsPartyBranchList;*/

    if (method === '新增') {
      vm.partyMemberTableData.birthday = new Date();
      vm.partyMemberTableData.join_time = new Date();
      vm.partyMemberTableData.lost_time = new Date(1900, 0, 1);
      vm.partyMemberTableData.conversion_time = new Date();
    } else if (method === '修改' || method === '浏览') {
      vm.partyMemberTableData.birthday = new Date(partyMemberTableData.birthday);
      vm.partyMemberTableData.join_time = new Date(partyMemberTableData.join_time);
      if (partyMemberTableData.lost_time === '' || partyMemberTableData.lost_time === null) {
        vm.partyMemberTableData.lost_time = new Date(1900, 0, 1);
      } else {
        vm.partyMemberTableData.lost_time = new Date(partyMemberTableData.lost_time);
      }
      vm.partyMemberTableData.conversion_time = new Date(partyMemberTableData.conversion_time);
    }
    //日期选择器
    $scope.today = function () {
      vm.partyMemberTableData.birthday = new Date();
      vm.partyMemberTableData.join_time = new Date();
      vm.partyMemberTableData.lost_time = new Date();
      vm.partyMemberTableData.conversion_time = new Date();
    };
    $scope.clear = function () {
      vm.partyMemberTableData.birthday = null;
      vm.partyMemberTableData.join_time = null;
      vm.partyMemberTableData.lost_time = null;
      vm.partyMemberTableData.conversion_time = null;
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
    $scope.open3 = function () {
      $scope.popup3.opened = true;
    };
    $scope.open4 = function () {
      $scope.popup4.opened = true;
    };
    $scope.popup1 = {
      opened: false
    };
    $scope.popup2 = {
      opened: false
    };
    $scope.popup3 = {
      opened: false
    };
    $scope.popup4 = {
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
