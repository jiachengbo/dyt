(function () {
  'use strict';

  angular
    .module('map')
    .controller('MapPersonModalFormController', MapPersonModalFormController);

  MapPersonModalFormController.$inject = ['$scope', '$window', '$timeout', '$log', '$uibModalInstance', 'mapPersonData', 'method', 'MapPersonTypeService', 'localStorageService', 'userCommId', 'partytype'];
  function MapPersonModalFormController($scope, $window, $timeout, $log, $uibModalInstance, mapPersonData, method, MapPersonTypeService, localStorageService, userCommId, partytype) {
    var vm = this;
    vm.mapPersonData = mapPersonData;
    vm.method = method;
    vm.mapPersonData.partytype = partytype;
    vm.disabled = (method === '查看');
    //性别下拉框
    var sexs = [
      {'name': '男'},
      {'name': '女'}
    ];
    $scope.sexInfo = sexs;
    //读取本地存储的社区村常量表
    var cvsList = localStorageService.getItems('CommunityVillageConstant');
    var srr = [];
    if (partytype === 2) {
      angular.forEach(cvsList, function (value, key) {
        if (value.name[value.name.length - 1] === '村') {
          this.push(value);
        }
      }, srr);
    } else if (partytype === 1) {
      angular.forEach(cvsList, function (value, key) {
        if (value.name.indexOf('社区') !== -1) {
          this.push(value);
        }
      }, srr);
    }
    $scope.communityInfo = srr;
    if (method === '新增') {
      vm.mapPersonData.sex = sexs[0].name;
      if (userCommId === '') {
        vm.mapPersonData.communityid = cvsList[0].id;
        vm.userCommId = false;
      } else {
        vm.mapPersonData.communityid = parseInt(userCommId, 0);
        vm.userCommId = true;
      }
    } else {
      vm.mapPersonData.sex = mapPersonData.sex;
      if (userCommId === '') {
        vm.mapPersonData.communityid = cvsList[0].id;
        vm.userCommId = false;
      } else {
        vm.mapPersonData.communityid = parseInt(userCommId, 0);
        vm.userCommId = true;
      }
    }
    //人员类型下拉框
    MapPersonTypeService.query().$promise.then(function (data) {
      if (data.length !== 0) {
        $scope.personTypeInfo = data;
        if (method === '新增') {
          vm.mapPersonData.persontype = data[0].persontypeid;
        }
      }
    });
    //百度地图API
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
          vm.mapPersonData.lng = lng;
          vm.mapPersonData.lat = lat;
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

    //地图点击事件
    vm.showMap = function () {
      $timeout(function () {
        map(15);
      }, 500);
    };
    //在这里处理要进行的操作
    vm.ok = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.mapPersonForm');
        return;
      }
      if (vm.mapPersonData.difficultreason === undefined || vm.mapPersonData.difficultreason === '') {
        vm.yzDifficultreason = true;
        return;
      } else {
        vm.yzDifficultreason = false;
      }
      if (vm.mapPersonData.difficultdemand === undefined || vm.mapPersonData.difficultdemand === '') {
        vm.yzDifficultdemand = true;
        return;
      } else {
        vm.yzDifficultdemand = false;
      }
      if (vm.picFile) {
        vm.mapPersonData.photos = vm.picFile;
      }
      $uibModalInstance.close(vm.mapPersonData);
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
