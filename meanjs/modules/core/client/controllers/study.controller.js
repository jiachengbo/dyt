(function () {
  'use strict';

  angular
    .module('core')
    .controller('StudyController', StudyController);
  StudyController.$inject = ['$scope', '$rootScope', '$state', '$window', 'GetStreetMemberService', 'GetCommMemberService', 'partybuildService', '$interval', 'studyDTService'];
  function StudyController($scope, $rootScope, $state, $window, GetStreetMemberService, GetCommMemberService, partybuildService, $interval, studyDTService) {
    var vm = this;
    $rootScope.$emit('state', $state.current.url);


    studyDTService.query().$promise.then(function (data) {
      vm.studyDT = data;
      console.log(data);
      vm.imgdata = [];
      for (vm.i = 0; vm.i < data.length; vm.i++) {
        var obj = {};
        obj.id = vm.i;
        obj.image = data[vm.i].photos;
        obj.title = data[vm.i].title;
        vm.imgdata.push(obj);
      }
      var myslides = vm.imgdata;
      //轮播图设置  开始
      $scope.myInterval = 5000;
      $scope.noWrapSlides = false;
      $scope.active = 0;
      var slides = $scope.slides = [];
      var currIndex = 0;
      // var myslides = [
      //   {id: 0, image: '/modules/core/client/img/image/images/index/banner_01.jpg'},
      //   {id: 1, image: '/modules/core/client/img/image/images/index/banner_02.jpg'},
      //   {id: 2, image: '/modules/core/client/img/image/images/index/banner_03.jpg'},
      //   {id: 3, image: '/modules/core/client/img/image/images/index/banner_04.jpg'},
      //   {id: 4, image: '/modules/core/client/img/image/images/index/banner_05.jpg'}
      // ];
      $scope.addSlide = function (i) {
        slides.push({
          image: myslides[i].image,
          text: myslides[i].title,
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
    vm.tostudydt = function (a) {
      console.log(a);
      $state.go('studyxq', {id: a});
    };
  }
}());
