(function () {
  'use strict';

  angular
    .module('activity.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('activity', {
        abstract: true,
        url: '/activity',
        template: '<ui-view/>'
      })
      .state('activity.curd', {
        url: '/curd',
        templateUrl: '/modules/activity/client/views/activity-curdtable.client.view.html',
        controller: 'ActivityCURDTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Activity CURD Table'
        }
      });
  }
}());
