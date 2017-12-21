(function () {
  'use strict';

  angular
    .module('policy.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('policy', {
        abstract: true,
        url: '/policy',
        template: '<ui-view/>'
      })
      .state('policy.gonghui', {
        url: '/gonghui',
        templateUrl: '/modules/policy/client/views/policy-curdtable.client.view.html',
        controller: 'PolicyCURDTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Policy CURD Table'
        },
        params: {
          type: '工会'
        }
      })
      .state('policy.tuanwei', {
        url: '/tuanwei',
        templateUrl: '/modules/policy/client/views/policy-curdtable.client.view.html',
        controller: 'PolicyCURDTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Policy CURD Table'
        },
        params: {
          type: '团委'
        }
      })
      .state('policy.curd', {
        url: '/curd',
        templateUrl: '/modules/policy/client/views/policy-curdtable.client.view.html',
        controller: 'PolicyCURDTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Policy CURD Table'
        },
        params: {
          type: '妇联'
        }
      });
  }
}());
