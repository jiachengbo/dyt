(function () {
  'use strict';

  angular
    .module('organization.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('organization', {
        abstract: true,
        url: '/organization',
        template: '<ui-view/>'
      })
      .state('organization.ylo', {
        url: '/ylo',
        templateUrl: '/modules/organization/client/views/youthleagueorganizationstable.client.view.html',
        controller: 'YLOTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '团组织主页'
        }
      })
      .state('organization.ylca', {
        url: '/ylca',
        templateUrl: '/modules/organization/client/views/youthleaguecommitteeactivitiestable.client.view.html',
        controller: 'YLCActivitiesTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '团委活动主页'
        }
      });
  }
}());
