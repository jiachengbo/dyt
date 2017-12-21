(function () {
  'use strict';

  angular
    .module('activitysquare.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('activitysquare', {
        abstract: true,
        url: '/activitysquare',
        template: '<ui-view/>'
      })
      .state('activitysquare.curd', {
        url: '/curd',
        templateUrl: '/modules/activitysquare/client/views/activitysquare-curdtable.client.view.html',
        controller: 'ActivitysquareCURDTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Activitysquare CURD Table'
        }
      });
  }
}());
