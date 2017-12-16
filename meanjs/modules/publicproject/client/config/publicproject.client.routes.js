(function () {
  'use strict';

  angular
    .module('publicproject.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('publicproject', {
        abstract: true,
        url: '/publicproject',
        template: '<ui-view/>'
      })
      .state('publicproject.curd', {
        url: '/curd',
        templateUrl: '/modules/publicproject/client/views/publicproject-curdtable.client.view.html',
        controller: 'PublicprojectCURDTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Publicproject CURD Table'
        }
      });
  }
}());
