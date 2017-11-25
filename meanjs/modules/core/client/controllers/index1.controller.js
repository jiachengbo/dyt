(function () {
  'use strict';

  angular
    .module('core')
    .controller('Index1Controller', Index1Controller);
  Index1Controller.$inject = ['$scope', '$rootScope', '$state', '$window', 'GetStreetMemberService', 'GetCommMemberService', 'partybuildService', '$interval', '$location', 'jiedaodtService', 'partyorgmapService', 'GetKeyWorkService', 'studyDTService', '$timeout', 'xianfeService', 'GetTopVoiceService'];
  function Index1Controller($scope, $rootScope, $state, $window, GetStreetMemberService, GetCommMemberService, partybuildService, $interval, $location, jiedaodtService, partyorgmapService, GetKeyWorkService, studyDTService, $timeout, xianfeService, GetTopVoiceService) {
    var vm = this;
    var num = 0;
    vm.shijiuda = '##';
    $interval.cancel($rootScope.trirm);
    $interval.cancel($rootScope.titletz);
    $interval.cancel($rootScope.kouhao);
    vm.tiaozhaun = function (numa) {
      $window.localStorage.setItem('partyxq', numa);
    };
    vm.kouhaoNum = 1;
    $rootScope.$emit('state', $state.current.url);
    if ($location.absUrl().indexOf('/index1') > 0) {
      $rootScope.trirm = $interval(function () {
        if (num < -160) {
          angular.element(document.querySelector('.index1_lunbo1 ul')).append(angular.element(document.querySelector('.index1_lunbo1 ul li:nth-of-type(1)')).remove()[0]);
          num = 0;
        }
        num = num - 10;
        if ($location.absUrl().indexOf('/index1') > 0) {
          angular.element(document.querySelector('.index1_lunbo1 ul'))[0].style.left = num + 'px';
        }
      }, 150);
      vm.aaa = function () {
        if ($location.absUrl().indexOf('/index1') > 0) {
          angular.element(document.querySelector('.titletz ul'))[0].style.top = '0px';
        }
        $('.titletz ul').animate({
          top: '-34px'
        }, 500);
        angular.element(document.querySelector('.titletz ul')).append(angular.element(document.querySelector('.titletz ul li:nth-of-type(1)')).remove()[0]);
      };
      $rootScope.titletz = $interval(function () {
        vm.aaa();
      }, 4000);
      $rootScope.kouhao = $interval(function () {
        if (vm.kouhaoNum === 2) {
          angular.element(document.querySelector('.intervalImg')).attr('src', '/modules/core/client/img/image/index1/kouhao2.png');
          angular.element(document.querySelector('.act')).removeClass('act');
          angular.element(document.querySelector('.kouhao2')).addClass('act');
          vm.kouhaoNum++;
        } else if (vm.kouhaoNum === 3) {
          angular.element(document.querySelector('.intervalImg')).attr('src', '/modules/core/client/img/image/index1/kouhao3.png');
          angular.element(document.querySelector('.act')).removeClass('act');
          angular.element(document.querySelector('.kouhao3')).addClass('act');
          vm.kouhaoNum++;
        } else if (vm.kouhaoNum === 4) {
          angular.element(document.querySelector('.intervalImg')).attr('src', '/modules/core/client/img/image/index1/kouhao4.png');
          angular.element(document.querySelector('.act')).removeClass('act');
          angular.element(document.querySelector('.kouhao4')).addClass('act');
          vm.kouhaoNum++;
        } else if (vm.kouhaoNum === 1) {
          angular.element(document.querySelector('.intervalImg')).attr('src', '/modules/core/client/img/image/map1/kouhao5.png');
          angular.element(document.querySelector('.act')).removeClass('act');
          angular.element(document.querySelector('.kouhao1')).addClass('act');
          vm.kouhaoNum++;
        } else if (vm.kouhaoNum === 5) {
          angular.element(document.querySelector('.intervalImg')).attr('src', '/modules/core/client/img/image/index1/kouhao1.png');
          angular.element(document.querySelector('.act')).removeClass('act');
          angular.element(document.querySelector('.kouhao5')).addClass('act');
          vm.kouhaoNum = 1;
        }
      }, 10000);
    } else {
      $interval.cancel($rootScope.trirm);
      $interval.cancel($rootScope.kouhao);
    }
    GetStreetMemberService.query().$promise.then(function (data) {
      vm.streetMemberArr = [];
      for (var i = 0; i < 4; i++) {
        vm.streetMemberArr.push(data[i]);
      }
    });
    vm.showKouHao1 = function () {
      vm.kouhaoNum = 1;
      angular.element(document.querySelector('.intervalImg')).attr('src', '/modules/core/client/img/image/map1/kouhao5.png');
      angular.element(document.querySelector('.act')).removeClass('act');
      angular.element(document.querySelector('.kouhao1')).addClass('act');
    };
    vm.showKouHao2 = function () {
      vm.kouhaoNum = 2;
      angular.element(document.querySelector('.act')).removeClass('act');
      angular.element(document.querySelector('.intervalImg')).attr('src', '/modules/core/client/img/image/index1/kouhao2.png');
      angular.element(document.querySelector('.kouhao2')).addClass('act');
    };
    vm.showKouHao3 = function () {
      vm.kouhaoNum = 3;
      angular.element(document.querySelector('.act')).removeClass('act');
      angular.element(document.querySelector('.intervalImg')).attr('src', '/modules/core/client/img/image/index1/kouhao3.png');
      angular.element(document.querySelector('.kouhao3')).addClass('act');
    };
    vm.showKouHao4 = function () {
      vm.kouhaoNum = 4;
      angular.element(document.querySelector('.act')).removeClass('act');
      angular.element(document.querySelector('.intervalImg')).attr('src', '/modules/core/client/img/image/index1/kouhao4.png');
      angular.element(document.querySelector('.kouhao4')).addClass('act');
    };
    vm.showKouHao5 = function () {
      vm.kouhaoNum = 5;
      angular.element(document.querySelector('.act')).removeClass('act');
      angular.element(document.querySelector('.intervalImg')).attr('src', '/modules/core/client/img/image/index1/kouhao1.png');
      angular.element(document.querySelector('.kouhao5')).addClass('act');
    };
    vm.Next = function ($event) {
      var src = $event.target.src;
      // if (src.match('kouhao5')) {
      //   vm.shijiuda = 'http://www.xiancn.com/zt/node_12214.htm';
      // } else {
      //   vm.shijiuda = '##';
      // }
      if (src.match('kouhao2')) {
        $state.go('quanhui');
      } else if (src.match('kouhao4')) {
        $state.go('jingzhunfupin');
      } else if (src.match('kouhao3')) {
        $state.go('shisanjie');
      } else if (src.match('kouhao1')) {
        $state.go('weijiamoshi');
      } else if (src.match('kouhao5')) {
        $state.go('yidang');
      }

    };
    GetCommMemberService.query().$promise.then(function (data) {
      vm.commMemberArr = [];
      for (var i = 0; i < 4; i++) {
        vm.commMemberArr.push(data[i]);
      }
    });


    //三会一课
    function getKeyWorkData(key) {
      GetKeyWorkService.query({key: key}).$promise.then(function (data) {
        vm.keyWorkArr = [];
        for (var i = 0; i < 4; i++) {
          vm.keyWorkArr.push(data[i]);
        }
      });
    }

    getKeyWorkData('三会一课');
    //学习动态
    studyDTService.query().$promise.then(function (data) {
      vm.studyDT = [];
      for (let i = 0; i < 4; i++) {
        vm.studyDT.push(data[i]);
      }
    });
    vm.tostudydt = function (a) {
      console.log(a);
      $state.go('studyxq', {id: a});
    };
    vm.toDetails = function (a) {
      // $window.localStorage.setItem('type', vm.type);
      $window.localStorage.setItem('type', '三会一课');
      $window.localStorage.setItem('keyworkid', a);
      // $state.go('keyworkxq',{type: vm.type, id:keyworkid});
      $state.go('keyworkxq');
    };
    //项目管理
    partybuildService.query().$promise.then(function (data) {
      vm.project = data;
    });
    vm.toNext = function (type) {
      $window.localStorage.setItem('type', type);
      $state.go('keyworkdangri');
    };
    //街道动态
    jiedaodtService.query().$promise.then(function (data) {
      vm.jiedao = data;
      vm.imgdata = [];
      for (vm.i = 0; vm.i < data.length; vm.i++) {
        var obj = {};
        obj.id = vm.i;
        obj.image = data[vm.i].photos;
        obj.text = data[vm.i].title;
        vm.imgdata.push(obj);
      }
      vm.myslides = vm.imgdata;
      //轮播图设置  开始
      $scope.myInterval = 5000;
      $scope.noWrapSlides = false;
      $scope.active = 0;

      var slides = $scope.slides = [];
      var currIndex = 0;

      // vm.myslides = [
      //   {id: 0, image: '/modules/core/client/img/image/images/index/banner_01.jpg'},
      //   {id: 1, image: '/modules/core/client/img/image/images/index/banner_02.jpg'},
      //   {id: 2, image: '/modules/core/client/img/image/images/index/banner_03.jpg'}
      // ];
      $scope.addSlide = function (i) {
        slides.push({
          image: vm.myslides[i].image,
          text: vm.myslides[i].text,
          id: currIndex++
        });
      };
      $scope.randomize = function () {
        var indexes = generateIndexesArray();
        assignNewIndexesToSlides(indexes);
      };

      for (var i = 0; i < vm.myslides.length; i++) {
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
    //  先锋模范
    xianfeService.query().$promise.then(function (data) {
      vm.xianfe = [];
      for (var i = 0; i < 4; i++) {
        vm.xianfe.push(data[i]);
      }
    });
    //  视屏集数
    $timeout(function () {
      vm.vide = function (num) {
        angular.element(document.querySelector('video'))[0].src = '/modules/core/client/video/0' + num + '.mp4';
        angular.element(document.querySelector('video+ul>li.active')).removeClass('active');
        angular.element(document.querySelector('video+ul>li:nth-of-type(' + num + ')')).addClass('active');
      };
    }, 500);
    //通知公告
    GetTopVoiceService.query({type: 2}).$promise.then(function (data) {
      vm.tongzhixq = data;
    });

    vm.showLeftTime = function () {
      var now = new Date();
      var year = now.getFullYear();
      var month = now.getMonth();
      var day = now.getDate();
      var hours = now.getHours();
      var minutes = now.getMinutes();
      var seconds = now.getSeconds();
      month = month + 1;
      if (seconds === 0) {
        seconds = 60;
      } else if (seconds < 10 && seconds !== 0) {
        seconds = '0' + seconds;
      }
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      if ($location.absUrl().indexOf('/index1') > 0) {
        angular.element(document.querySelector('.times'))[0].innerHTML = '' + year + '年' + month + '月' + day + '日 ' + hours + ':' + minutes + ':' + seconds + '';
      }
//一秒刷新一次显示时间
      var timeID = setTimeout(vm.showLeftTime, 1000);
    };
    vm.showLeftTime();
    // vm.vide = function (num) {
    //   angular.element(document.querySelector('video'))[0].src = '/modules/core/client/video/' + num + '.mp4';
    // };
  }
}());
