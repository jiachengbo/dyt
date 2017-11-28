(function () {
  'use strict';

  angular
    .module('applyNow.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('applyNow', {
        abstract: true,
        url: '/applyNow',
        template: '<ui-view/>'
      })
      .state('applyNow.curd', {
        url: '/curd',
        templateUrl: '/modules/applynow/client/views/applyNow-curdtable.client.view.html',
        controller: 'ApplyNowCURDTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'ApplyNow CURD Table'
        }
      });
  }
}());
