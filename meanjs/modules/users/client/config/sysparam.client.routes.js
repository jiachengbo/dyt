(function () {
  'use strict';

  angular
    .module('sysparam.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.sysparam', {
        abstract: true,
        url: '/sysparam',
        template: '<ui-view/>'
      })
      .state('admin.sysparam.curd', {
        url: '/curd',
        templateUrl: '/modules/users/client/views/admin/sysparam-curdtable.client.view.html',
        controller: 'SysparamCURDTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '系统参数'
        }
      });
  }
}());
