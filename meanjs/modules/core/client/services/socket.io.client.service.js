(function () {
  'use strict';

  // Create the Socket.io wrapper service
  angular
    .module('core')
    .factory('Socket', Socket);

  Socket.$inject = ['$rootScope', 'Authentication', '$state', '$timeout', '$log', 'Notification', '$window'];

  function Socket($rootScope, Authentication, $state, $timeout, $log, Notification, $window) {
    var service = {
      connect: connect,
      emit: emit,
      on: on,
      removeListener: removeListener,
      socket: null
    };

    connect();

    return service;

    // Connect to Socket.io server
    function connect() {
      $log.log('socket connect, oldsocketvalid %s, user valid %s', !!service.socket, !!Authentication.user);

      //不重复连接
      if (!service.socket && Authentication.user && typeof(io) === 'function') {
        service.socket = io();
        $rootScope.$broadcast('socketCreate', service.socket);

        service.socket.on('USERRELOGIN', function () {
          $log.debug('socket recv USERRELOGIN msg, delay to refresh');
          Notification.error({ message: '<i class="glyphicon glyphicon-remove"></i>' +
            '当前用户在其他位置登录，如果不是你本人操作，请注意用户密码有可能泄露',
            delay: 5000});
          $timeout(function () {
            if (!$window.location.pathname || $window.location.pathname === '/') {
              $window.location.reload();
            } else {
              $window.location.href = '/';
            }
          }, 5000);

          service.socket.close();
        });

        /*
                service.socket.on('connect', function () {
                  $rootScope.$broadcast('socketConnect', service.socket);
                });
                service.socket.on('disconnect', function () {
                  $rootScope.$broadcast('socketDisconnect', service.socket);
                });
        */
/*
        //通过send发送消息时，可通过.on('message')接收
        //anything不能收到
        service.socket.on('anything', function (data) {
          $log.log('socketid %s recv message:', this.id, arguments);
        });
*/
      } else if (!service.socket && !Authentication.user) {
        //在用户登录后，重新连接
        $rootScope.$on('userLogin', connect);
      }
    }

    // Wrap the Socket.io 'emit' method
    function emit(eventName, data) {
      if (service.socket) {
        service.socket.emit(eventName, data);
      }
    }

    // Wrap the Socket.io 'on' method
    function on(eventName, callback) {
      if (service.socket) {
        service.socket.on(eventName, function (data, fn) {
          $timeout(function () {
            callback(data, fn);
          });
        });
      }
    }

    // Wrap the Socket.io 'removeListener' method
    function removeListener(eventName) {
      if (service.socket) {
        service.socket.removeListener(eventName);
      }
    }
  }
}());
