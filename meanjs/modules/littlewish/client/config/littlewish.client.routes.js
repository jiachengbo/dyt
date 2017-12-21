(function () {
  'use strict';

  angular
    .module('littlewish.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('littlewish', {
        abstract: true,
        url: '/littlewish',
        template: '<ui-view/>'
      })
      .state('littlewish.curd', {
        url: '/curd',
        templateUrl: '/modules/littlewish/client/views/littlewish-curdtable.client.view.html',
        controller: 'LittlewishCURDTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Littlewish CURD Table'
        }
      });
  }
}());
