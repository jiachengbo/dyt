(function () {
  'use strict';

  angular
    .module('core')
    .controller('TuanWeiController', TuanWeiController);
  TuanWeiController.$inject = ['$scope', '$rootScope', '$state', '$window', 'GetStreetMemberService', 'localStorageService', '$uibModal', 'GetTwMsgService', 'JoinUsService'];
  function TuanWeiController($scope, $rootScope, $state, $window, GetStreetMemberService, localStorageService, $uibModal, GetTwMsgService, JoinUsService) {
    var vm = this;
    $rootScope.$emit('state', $state.current.url);
    var activeConst = localStorageService.getItems('YLC_activitiesTypeTable');

    function getData(name) {
      if (name === '动态') {
        vm.activitiestypeid = [10, 9, 3, 4, 5, 6, 7, 8];
        GetTwMsgService.query({activitiestypeid: vm.activitiestypeid}).$promise.then(function (data) {
          console.log(data);
          var len;
          vm.bottomListData = [];
          if (data.length < 8) {
            len = data.length;
          } else {
            len = 8;
          }
          for (var i = 0; i < len; i++) {
            vm.bottomListData.push(data[i]);
          }
        });
      } else {
        for (var i = 0; i < activeConst.length; i++) {
          if (activeConst[i].name === name) {
            vm.activitiestypeid = activeConst[i].id;
          }
        }
        GetTwMsgService.query({activitiestypeid: vm.activitiestypeid}).$promise.then(function (data) {
          vm.listData = [];
          var len;
          if (data.length < 5) {
            len = data.length;
          } else {
            len = 5;
          }
          for (var k = 0; k < len; k++) {
            vm.listData.push(data[k]);
          }
          //轮播图设置  开始
          $scope.myInterval = 5000;
          $scope.noWrapSlides = false;
          $scope.active = 0;
          var slides = $scope.slides = [];
          var currIndex = 0;
          var myslides = [];
          console.log(data);
          for (var j = 0; j < len; j++) {
            myslides.push({
              id: j + 1,
              image: data[j].activitiespic,
              text: data[j].activitiesname
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

          for (var i = 0; i < myslides.length; i++) {
            $scope.addSlide(i);
          }

          // Randomize logic below

          function assignNewIndexesToSlides(indexes) {
            for (var i = 0, l = slides.length; i < l; i++) {
              slides[i].id = indexes.pop();
            }
          }

          function generateIndexesArray() {
            var indexes = [];
            for (var i = 0; i < currIndex; ++i) {
              indexes[i] = i;
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
      }
    }

    getData('蒲公英');
    getData('动态');
    GetTwMsgService.query({activitiestypeid: 1}).$promise.then(function (data) {
      vm.tuanweizx = [];
      vm.tuanweizx1 = [];
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        if (i < 5) {
          vm.tuanweizx.push(data[i]);
        } else {
          vm.tuanweizx1.push(data[i]);
        }
      }
    });
    vm.toDetails = function (id, type) {
      $state.go('tuanweixq', {id: id, type: type});
    };
    vm.ygTitle = '蒲公英';
    angular.element(document.querySelector('.ygdicon')).addClass('pgy');
    vm.showPGY = function () {
      angular.element(document.querySelector('.ygdicon')).addClass('pgy');
      vm.ygTitle = '蒲公英';
      getData('蒲公英');
    };
    vm.showSYC = function () {
      vm.ygTitle = '四叶草';
      angular.element(document.querySelector('.ygdicon')).addClass('syc');
      getData('四叶草');
    };
    vm.showXRK = function () {
      vm.ygTitle = '向日葵';
      angular.element(document.querySelector('.ygdicon')).addClass('xrk');
      getData('向日葵');
    };
    vm.showXYH = function () {
      vm.ygTitle = '夕阳红';
      angular.element(document.querySelector('.ygdicon')).addClass('xyh');
      getData('夕阳红');
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
    vm.joinUs = function () {
      var joinUsModal = vm.openjoinUsModal();
      joinUsModal.result.then(function (result) {
        var name = result.name;
        var sex = result.sex;
        var address = result.address;
        var phone = result.phone;
        var reason = result.reason;
        var time = new Date();
        JoinUsService.query({
          name: name,
          sex: sex,
          address: address,
          phone: phone,
          reason: reason,
          time: time
        }).$promise.then(function () {

        });
      });
    };
    vm.toNext = function (num) {
      $state.go('tuanwei' + num);
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
          return 'tuanwei';
        }
      });
    };
  }
}());
