(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', 'Notification', '$log', 'Authentication', 'menuService',
    'Socket', '$rootScope', '$window', '$state', '$interval', '$location', '$timeout'];

  function HeaderController($scope, Notification, $log, Authentication, menuService,
                            Socket, $rootScope, $window, $state, $interval, $location, $timeout) {
    var vm = this;
    if (Authentication.user) {
      history.pushState(null, null, '/homeback');
    }
    vm.left = ($window.innerWidth - 1294) / 2;
    $rootScope.tempState = $state.current.url;
    // $timeout(function () {
    $rootScope.index1_nav = $window.innerHeight - 1 + 'px';
    // },1000);
    $rootScope.index1_nav = $window.innerHeight - 1 + 'px';
    $interval.cancel($rootScope.trirm);
    $interval.cancel($rootScope.titletz);
    $interval.cancel($rootScope.kouhao);
    $rootScope.$on('state', function (event, data) {
      if (data !== $rootScope.tempState) {
        $rootScope.logoShow = false;
        $interval.cancel($rootScope.trirm);
        $interval.cancel($rootScope.kouhao);
      }
      $rootScope.tempState = data;
    });
    $rootScope.maskWidth = $window.innerWidth;
    $rootScope.maskHeight = $window.innerHeight;
    $rootScope.maskStyle = {
      'width': $window.innerWidth + 'px',
      'height': $window.innerHeight + 'px',
      'position': 'fixed',
      'zIndex': 20,
      'background-color': '#ddd',
      'opacity': 0.9
    };
    $rootScope.logoHeight = {
      'width': '1200px',
      'height': $window.innerHeight + 'px'
    };
    $rootScope.logoShow = false;
    $rootScope.showLogo = function () {
      $rootScope.logoShow = !$rootScope.logoShow;
    };
    $rootScope.fixedLeft = ($window.innerWidth - 1200) / 2 - 50 + 'px';
    $rootScope.leftStyle = {
      'margin-left': (vm.left - 70) + 'px'
    };
    $rootScope.rightStyle = {
      'margin-right': (vm.left - 20) + 'px'
    };
    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    var rolename = '';
    vm.toHome = function () {
      if (rolename.indexOf('admin') !== -1) {
        $state.go('superadmin');
      } else if (rolename.indexOf('adminrole') !== -1) {
        $state.go('ptadmin');
      } else {
        $state.go('homeback');
      }
    };
    if (Authentication.user) {
      vm.show = true;
      rolename = Authentication.user.roles;
      $timeout(function () {
        vm.toHome();
      }, 100);
    } else {
      vm.show = false;
    }
    $rootScope.$on('login', function (event, data) {
      if (data) {
        vm.show = true;
        rolename = Authentication.user.roles;
        vm.toHome();
      }
    });
    // logo墙跳转  开始
    $rootScope.toLXYZ = function () {
      $window.localStorage.setItem('type', '两学一做');
      $state.go('keyworkdangri');
    };
    $rootScope.toGDDR = function () {
      $window.localStorage.setItem('type', '固定党日');
      $state.go('keyworkdangri');
    };
    $rootScope.toSHYK = function () {
      $window.localStorage.setItem('type', '三会一课');
      $state.go('keyworkdangri');
    };
    // logo墙跳转  结束
    //vm.menu = menuService.getMenu('sidemenu');
    vm.menus = menuService;
    $rootScope.phone = false;
    $rootScope.wap = function () {
      //console.log($rootScope.phone);
      if ($rootScope.phone) {
        $rootScope.phone = false;
      } else {
        $rootScope.phone = true;
      }
    };
    $rootScope.$on('hiddenHead', function (event, data) {
      if (Authentication.user) {
        vm.show = data;
      }
    });
    vm.goBack = function () {
      if (rolename.indexOf('admin') !== -1) {
        $state.go('superadmin');
      } else if (rolename.indexOf('adminrole') !== -1) {
        $state.go('ptadmin');
      } else {
        $state.go('homeback');
      }
    };
    /*
     //用户待处理任务
     vm.userWaitHandles = [];

     //取得用户的待处理任务信息
     if (vm.authentication.user) {
     getWaitHandleTorec();
     } else {
     //在用户登录后，再获取
     $scope.$on('userLogin', getWaitHandleTorec);
     }

     // Make sure the Socket is connected
     if (!Socket.socket) {
     //等候socket有效
     $scope.$on('socketCreate', initSocket());
     } else {
     initSocket();
     }

     function initSocket() {
     //进入状态
     Socket.on('STATEIN', function (req) {
     var reqRec = buildReq(req);
     if (!reqRec) {
     $log.error('socket STATEIN req struct error:', req);
     Notification.error({ message: '<i class="glyphicon glyphicon-remove"></i>' +
     '状态改变通知，格式错误'});
     return;
     }

     $log.debug('socket STATEIN reqRec:', reqRec);
     Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i>' +
     '状态改变通知：' + reqRec.msgrecv.desc });
     });

     //离开状态
     Socket.on('STATEOUT', function (req) {
     var reqRec = buildReq(req);
     if (!reqRec) {
     $log.error('socket STATEOUT req struct error:', req);
     Notification.error({ message: '<i class="glyphicon glyphicon-remove"></i>' +
     '状态改变通知，格式错误'});
     return;
     }

     $log.debug('socket STATEOUT reqRec:', reqRec);
     Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i>' +
     '状态改变通知：' + reqRec.msgrecv.desc });
     });

     //任务派遣,必须回应，否则发送端会连续发送多次（3）,最后发送端失败
     Socket.on('DISPATCH', function (req, fn) {
     var reqRec = buildReq(req);
     if (!reqRec || !reqRec.msgrecv || !reqRec.msgrecv.torec) {
     $log.error('socket DISPATCH req struct error:', req);
     Notification.error({ message: '<i class="glyphicon glyphicon-remove"></i>' +
     '任务派遣，格式错误'});
     return;
     }

     //记录发送的任务
     vm.userWaitHandles.push(reqRec.msgrecv.torec);

     //回应
     fn('good recv');

     $log.debug('socket DISPATCH reqRec:', reqRec);
     Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i>' +
     '任务派遣：' + reqRec.msgrecv.desc });
     });

     // Remove the event listener when the controller instance is destroyed
     $scope.$on('$destroy', function () {
     Socket.removeListener('STATEIN');
     Socket.removeListener('STATEOUT');
     Socket.removeListener('DISPATCH');
     });
     }

     // 检验并生成请求结构
     function buildReq(req) {
     if (!req || typeof(req) !== 'object') {
     $log.error('request %s data not valid error:', this.msgcode, req);
     return null;
     }

     var reqRec = {};
     //收到的请求id
     if (typeof(req.id) !== 'number') {
     $log.error('request %s %j, col id not valid error', this.msgcode, req);
     return null;
     } else {
     reqRec.reqid = req.id;
     }

     //收到消息中的时间,以字符串方法传送
     if (!(typeof(req.lastsend_time) === 'string')) {
     $log.error('request %s %j, col lastsend_time not valid error', this.msgcode, req);
     return null;
     } else {
     reqRec.first_time = new Date(req.lastsend_time);
     }

     //收到消息尝试次数
     if (typeof(req.attempttimes) !== 'number') {
     $log.error('request %s %j, col attempttimes not valid error', this.msgcode, req);
     return null;
     } else {
     reqRec.attempttimes = req.attempttimes;
     }

     reqRec.msgrecv = req.msgsend;
     reqRec.lastrecv_time = new Date();

     //发送内容
     reqRec.msgsend = null;
     //发送时间
     reqRec.lastsend_time = null;
     //结果不需要，接收函数返回结果
     //reqRec.result = RESULT.NOCOMPLETE;

     return reqRec;
     }

     //取得用户的待处理任务信息
     function getWaitHandleTorec() {
     var queryParam = {
     where: {
     lastact_recvuserid: {$like: '%,' + Authentication.user.id + ',%'}
     },
     order: 'Torec.lastact_time ASC'
     };

     //查询Torec表
     return TorecService.query(queryParam)
     .then(function(data) {
     if (data && Array.isArray(data)) {
     $log.debug('query torec user tasks return %d records', data.length);
     data.forEach(function (v) {
     vm.userWaitHandles.push(v);
     });
     } else {
     throw new Error('respon format error');
     }
     })
     .catch(function (err) {
     $log.error('query torec user tasks error:', err);
     });
     }
     */
  }
}());
