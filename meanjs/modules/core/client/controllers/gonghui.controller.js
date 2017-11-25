(function () {
  'use strict';

  angular
    .module('core')
    .controller('GongHuiController', GongHuiController);
  GongHuiController.$inject = ['$scope', '$rootScope', '$state', '$window', 'GetGhMsgService', 'WeiQuanService', '$uibModal'];
  function GongHuiController($scope, $rootScope, $state, $window, GetGhMsgService, WeiQuanService, $uibModal) {
    var vm = this;
    $rootScope.$emit('state', $state.current.url);
    vm.fixedRight = ($window.innerWidth - 1200) / 2 - 120 + 'px';
    vm.fixedStyle = {
      'right': vm.fixedRight
    };
    GetGhMsgService.query({type: '工会资讯'}).$promise.then(function (data) {
      vm.zxData = [];
      for (let i = 0; i < 6; i++) {
        vm.zxData.push(data[i]);
      }
      //轮播图设置  开始
      $scope.myInterval = 5000;
      $scope.noWrapSlides = false;
      $scope.active = 0;

      var slides = $scope.slides = [];
      var currIndex = 0;
      var myslides = [];
      for (var j = 0; j < vm.zxData.length; j++) {
        myslides.push({
          id: j + 1,
          image: vm.zxData[j].photos,
          name: vm.zxData[j].name
        });
      }
      $scope.addSlide = function (i) {
        slides.push({
          image: myslides[i].image,
          text: myslides[i].name,
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
    GetGhMsgService.query({type: '工会动态'}).$promise.then(function (data) {
      vm.dtData = data;
    });

    vm.toDetails = function (id) {
      var iddd = id;
      $state.go('gonghuixq', {id: iddd});
    };
    vm.toDetails2 = function ($event) {
      var id = angular.element($event.target).parent()[0].id;
      $state.go('gonghuixq', {id: id});
    };
    vm.toNext = function (num) {
      $state.go('gonghui' + num);
    };
    vm.ygTitle = '工会资讯';
    angular.element(document.querySelector('.ygdicon')).addClass('pgy');

    vm.openWeiQuanModal = function (resarg) {
      return $uibModal.open({
        templateUrl: '/modules/core/client/views/weiquan.html',
        controller: 'WeiQuanModalFormController',
        controllerAs: 'vm',
        backdrop: 'static',
        size: 'lg',
        resolve: resarg
      });
    };
    vm.weiquan = function () {
      var weiQuanModal = vm.openWeiQuanModal();
      weiQuanModal.result.then(function (result) {
        var name = result.name;
        var sex = result.sex;
        var phone = result.phone;
        var email = result.email;
        var address = result.address;
        var zhuti = result.zhuti;
        var content = result.content;
        var time = new Date();
        WeiQuanService.query({
          name: name,
          sex: sex,
          phone: phone,
          email: email,
          address: address,
          zhuti: zhuti,
          content: content,
          time: time
        }).$promise.then(function () {

        });
      });
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
          return 'gonghui';
        }
      });
    };
  }
}());
