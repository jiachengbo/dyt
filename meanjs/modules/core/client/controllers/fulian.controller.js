(function () {
  'use strict';

  angular
    .module('core')
    .controller('FuLianController', FuLianController);
  FuLianController.$inject = ['$scope', '$rootScope', '$state', '$window', 'GetFlMsgService', 'localStorageService', '$uibModal'];
  function FuLianController($scope, $rootScope, $state, $window, GetFlMsgService, localStorageService, $uibModal) {
    var vm = this;
    $rootScope.$emit('state', $state.current.url);
    var womenConst = localStorageService.getItems('WomensFederationTypeTable');
    function getListData(name) {
      if (name !== '动态' && name !== '妇联资讯') {
        for (var i = 0; i < womenConst.length; i++) {
          if (womenConst[i].name === name) {
            vm.typeid = womenConst[i].id;
          }
        }
        GetFlMsgService.query({typeid: vm.typeid, limit: 8}).$promise.then(function (data) {
          vm.listData = [];
          if (data.length < 6) {
            vm.listData = data;
          } else {
            for (var i = 0; i < 6; i++) {
              vm.listData.push(data[i]);
            }
          }

          //轮播图设置  开始
          $scope.myInterval = 5000;
          $scope.noWrapSlides = false;
          $scope.active = 0;

          var slides = $scope.slides = [];
          var currIndex = 0;

          var myslides = [];
          for (var j = 0; j < data.length; j++) {
            myslides.push({
              id: j + 1,
              image: data[j].photo
            });
          }
          $scope.addSlide = function (i) {
            slides.push({
              image: myslides[i].image,
              text: myslides[i].text,
              id: currIndex++
            });
          };

          $scope.randomize = function () {
            var indexes = generateIndexesArray();
            assignNewIndexesToSlides(indexes);
          };

          for (var k = 0; k < myslides.length; k++) {
            $scope.addSlide(k);
          }

          // Randomize logic below

          function assignNewIndexesToSlides(indexes) {
            for (var s = 0, l = slides.length; s < l; s++) {
              slides[s].id = indexes.pop();
            }
          }

          function generateIndexesArray() {
            var indexes = [];
            for (var q = 0; q < currIndex; ++q) {
              indexes[q] = q;
            }
            return shuffle(indexes);
          }

          // http://stackoverflow.com/questions/962802#962890
          function shuffle(array) {
            var tmp = array.length;
            var current = array.length;
            var top = array.length;
            if (top) {
              while (--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
              }
            }
            return array;
          }
        });
      } else if (name === '妇联资讯') {
        vm.typeid = 1;
        GetFlMsgService.query({typeid: vm.typeid, limit: 10}).$promise.then(function (data) {
          vm.topData = data;
          vm.leftData = [];
          vm.rightData = [];
          for (var k = 0; k < data.length; k ++) {
            if (k < 5) {
              vm.leftData[k] = data[k];
            } else {
              vm.rightData[k - 5] = data[k];
            }
          }
        });
      } else {
        vm.typeid = [];
        for (var j = 0; j < womenConst.length; j ++) {
          if (womenConst[j].name !== '妇联资讯' && womenConst[j].name !== '巾帼风采' && womenConst[j].name !== '未成年人' && womenConst[j].name !== '维权法苑') {
            vm.typeid.push(womenConst[j].id);
          }
        }
        GetFlMsgService.query({typeid: vm.typeid, limit: 8}).$promise.then(function (data) {
          vm.bottomData = data;
        });
      }

    }

    getListData('巾帼风采');
    getListData('动态');
    getListData('妇联资讯');

    vm.toDetails = function (id) {
      var typeid = id;
      $state.go('fulianxq', {id: typeid});
    };
    vm.toNext = function (num) {
      $state.go('woman-' + num);
    };
    vm.ygTitle = '巾帼风采';
    angular.element(document.querySelector('.ygdicon')).addClass('pgy');
    vm.showPGY = function () {
      vm.ygTitle = '巾帼风采';
      angular.element(document.querySelector('.ygdicon'))[0].className = 'icon ygdicon pgy';
      getListData('巾帼风采');
    };
    vm.showSYC = function () {
      vm.ygTitle = '未成年人';
      angular.element(document.querySelector('.ygdicon'))[0].className = 'icon ygdicon syc';
      getListData('未成年人');
    };
    vm.showXRK = function () {
      vm.ygTitle = '维权法苑';
      angular.element(document.querySelector('.ygdicon'))[0].className = 'icon ygdicon xrk';
      getListData('维权法苑');
    };
    vm.openjoinUsModal = function (resarg) {
      return $uibModal.open({
        templateUrl: '/modules/core/client/views/joinus.html',
        controller: 'JoinUsModalFormController',
        controllerAs: 'vm',
        backdrop: 'static',
        size: 'lg',
        resolve: resarg
      });
    };
    vm.fixedRight = ($window.innerWidth - 1200) / 2 - 120 + 'px';
    vm.fixedStyle = {
      'right': vm.fixedRight
    };
    vm.openjgModal = function (resarg) {
      return $uibModal.open({
        templateUrl: '/modules/core/client/views/jigou.html',
        controller: 'JiGouController',
        controllerAs: 'vm',
        size: 'lg',
        resolve: resarg
      });
    };
    vm.showZZJG = function () {
      var ZZJGmodal = vm.openjgModal({
        type: function () {
          return 'fulian';
        }
      });
    };
  }
}());
