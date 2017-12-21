(function () {
  'use strict';

  angular
    .module('partyserver.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('partyserver', {
        abstract: true,
        url: '/partyserver',
        template: '<ui-view/>'
      })
      .state('partyserver.curd', {
        url: '/curd',
        templateUrl: '/modules/partyserver/client/views/partyserver-curdtable.client.view.html',
        controller: 'PartyserverCURDTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Partyserver CURD Table'
        }
      });
  }
}());
