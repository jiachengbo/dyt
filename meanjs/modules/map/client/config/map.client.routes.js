(function () {
  'use strict';

  angular
    .module('map.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('map', {
        abstract: true,
        url: '/map',
        template: '<ui-view/>'
      })
      .state('map.person', {
        url: '/person',
        templateUrl: '/modules/map/client/views/map-persontable.client.view.html',
        controller: 'MapPersonTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '民情地图人员管理'
        }
      });
  }
}());
