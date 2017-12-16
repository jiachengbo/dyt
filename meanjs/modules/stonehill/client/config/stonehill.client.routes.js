(function () {
  'use strict';

  angular
    .module('stonehill.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('stonehill', {
        abstract: true,
        url: '/stonehill',
        template: '<ui-view/>'
      })
      .state('stonehill.curd', {
        url: '/curd',
        templateUrl: '/modules/stonehill/client/views/stonehill-curdtable.client.view.html',
        controller: 'StonehillCURDTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Stonehill CURD Table'
        }
      });
  }
}());
