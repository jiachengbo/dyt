(function () {
  'use strict';

  angular
    .module('regionalization.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('regionalization', {
        abstract: true,
        url: '/regionalization',
        template: '<ui-view/>'
      })
      .state('regionalization.project', {
        url: '/project',
        templateUrl: '/modules/regionalization/client/views/regionalization-projecttable.client.view.html',
        controller: 'projectProjectController',
        controllerAs: 'vm',
        data: {
          pageTitle: '项目管理'
        }
      })
      .state('regionalization.dynamic', {
        url: '/dynamic',
        templateUrl: '/modules/regionalization/client/views/regionalization-dynamictable.client.view.html',
        controller: 'RegionalizationDynamicController',
        controllerAs: 'vm',
        data: {
          pageTitle: '党建动态'
        }
      })
      .state('regionalization.interation', {
        url: '/interation',
        templateUrl: '/modules/regionalization/client/views/regionalization-Interationtable.client.view.html',
        controller: 'RegionalizationInterationController',
        controllerAs: 'vm',
        data: {
          pageTitle: '互动交流'
        }
      });
  }
}());
