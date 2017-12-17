(function () {
  'use strict';

  angular
    .module('partyyl.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('partyyl', {
        abstract: true,
        url: '/partyyl',
        template: '<ui-view/>'
      })
      .state('partyyl.curd', {
        url: '/curd',
        templateUrl: '/modules/partyyl/client/views/partyyl-curdtable.client.view.html',
        controller: 'PartyylCURDTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Partyyl CURD Table'
        }
      });
  }
}());
