(function () {
  'use strict';

  angular
    .module('partyOrganizationTable')
    .controller('PartyOrganizationTableModalFormController', PartyOrganizationTableModalFormController);

  PartyOrganizationTableModalFormController.$inject = ['$scope', '$uibModalInstance', 'partyOrganizationTableData', 'method', 'columnDefs', 'localStorageService', '$log', '$window', '$timeout', 'userCommId', 'party'];
  function PartyOrganizationTableModalFormController($scope, $uibModalInstance, partyOrganizationTableData, method, columnDefs, localStorageService, $log, $window, $timeout, userCommId, party) {
    var vm = this;
    vm.partyOrganizationTableData = partyOrganizationTableData;
    vm.method = method;
    vm.disabled = (method === '浏览');
    vm.columnDefs = columnDefs;
    //在这里处理要进行的操作
    vm.ok = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.partyOrganizationTableForm');
        return;
      }
      $uibModalInstance.close(vm.partyOrganizationTableData);
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    /* $scope.mapOpts = {
     apiKey: ‘替换成你的key‘,
     center: {longitude: 121.595871,latitude: 31.187017},
     zoom: 17,
     enableScrollWheelZoom: true,
     enableMapClick: false,
     onMapLoadFild: function () {
     //百度地图加载失败
     }
     };*/
    /*
     $scope.mapOpts = {
     center: {
     longitude: 108.980961,
     latitude: 34.227858
     },
     zoom: 15
     };*/
    //-----------获取地图选择的点坐标-----
    /* $scope.onMapClick = function ($event, $params) {
     // 地图按钮点击事件，与angularjs事件绑定方式相同
     // $log.info($event);
     var H = $params[0].point;
     var lng = H.lng;
     var lat = H.lat;
     vm.partyOrganizationTableData.longitude = lng;
     vm.partyOrganizationTableData.latitude = lat;
     };*/
    //-----------所在社区---------
    //读取本地存储的社区村常量表
    var cvsList = localStorageService.getItems('CommunityVillageConstant');

    var srr = [];
    if (party === 2) {
      angular.forEach(cvsList, function (value, key) {
        if (value.name[value.name.length - 1] === '村') {
          this.push(value);
        }
      }, srr);
      $scope.cvs = srr;
    } else if (party === 1) {
      angular.forEach(cvsList, function (value, key) {
        if (value.name.indexOf('社区') !== -1) {
          this.push(value);
        }
      }, srr);
      $scope.cvs = srr;
    } else {
      $scope.cvs = cvsList;
    }
    if (method === '新增') {
      if (userCommId === '') {
        if (cvsList.length > 0) {
          vm.partyOrganizationTableData.community = cvsList[0].id;
        } else {
          vm.partyOrganizationTableData.community = '1';
        }
        vm.userCommId = false;
      } else {
        vm.partyOrganizationTableData.community = parseInt(userCommId, 0);
        vm.userCommId = true;
      }
    } else if (method === '修改' || method === '查看') {
      // var cid = partyOrganizationTableData.community;
      // for (var i = 0; i < cvsList.length; i++) {
      //   if (cid === cvsList[i].id + '') {
      //     vm.partyOrganizationTableData.community = cvsList[i].id;
      //   }
      // }
      if (userCommId === '') {
        if (cvsList.length > 0) {
          vm.partyOrganizationTableData.community = cvsList[0].id;
        } else {
          vm.partyOrganizationTableData.community = '1';
        }
        vm.userCommId = false;
      } else {
        vm.partyOrganizationTableData.community = parseInt(userCommId, 0);
        vm.userCommId = true;
      }
    }
    //---------------单位类别-----PartyOrganizationUnitTypeConstant---
    var cvs_company_type = localStorageService.getItems('PartyOrganizationUnitTypeConstant');
    $scope.cvs_company_type = cvs_company_type;
    if (method === '新增') {
      if (cvs_company_type.length > 0) {
        vm.partyOrganizationTableData.company_type = cvs_company_type[0].id;
      } else {
        vm.partyOrganizationTableData.company_type = '1';
      }
    } else if (method === '修改' || method === '查看') {
      var typeId = partyOrganizationTableData.company_type;
      for (var j = 0; j < cvs_company_type.length; j++) {
        if (typeId === cvs_company_type[j].id + '') {
          vm.partyOrganizationTableData.company_type = cvs_company_type[j].id;
        }
      }
    }
    vm.partyOrganizationTableData.company_type = party;
    //-------------------                  ------------
    //日期选择器
    $scope.today = function () {
      // var now = new Date();
      // now.setFullYear(now.getFullYear() - 1);
      vm.partyOrganizationTableData.established_time = new Date(partyOrganizationTableData.established_time);
    };
    $scope.today();
    $scope.clear = function () {
      vm.partyOrganizationTableData.established_time = null;
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
    //  贾承博地图刷新
    function map(a) {
      var map = new $window.BMap.Map('allmap', {minZoom: a});
      map.centerAndZoom(new $window.BMap.Point(108.980961, 34.227858), a);
      map.enableScrollWheelZoom(true);
      // map.addControl(new $window.BMap.MapTypeControl());
      map.addEventListener('click', function (e) {
        var poi = e.point;
        var lng = poi.lng;
        var lat = poi.lat;
        $timeout(function () {
          vm.partyOrganizationTableData.longitude = lng;
          vm.partyOrganizationTableData.latitude = lat;
          map.clearOverlays();//清除定位图标
          var point = new $window.BMap.Point(lng, lat);
          addMarker('/modules/core/client/img/bdmap/dw.png', point, '');
        }, 500);
      });
      function addMarker(icon, point, sContent) {  // 创建图标对象
        var myIcon = new $window.BMap.Icon(icon, new $window.BMap.Size(32, 32), {
          anchor: new $window.BMap.Size(10, 25)
        });
        // 创建标注对象并添加到地图
        var marker = new $window.BMap.Marker(point, {icon: myIcon});
        map.addOverlay(marker);
      }
    }

    $timeout(function () {
      map(15);
    }, 500);

    //  ----------------
  }
}());
