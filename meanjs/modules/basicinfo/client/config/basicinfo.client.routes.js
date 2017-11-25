(function () {
  'use strict';

  angular
    .module('basicinfo.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('basicinfo', {
        abstract: true,
        url: '/basicinfo',
        template: '<ui-view/>'
      })
      .state('basicinfo.pioneerexemplary', {
        url: '/pioneerexemplary',
        templateUrl: '/modules/basicinfo/client/views/basicinfo-pioneerexemplarytable.client.view.html',
        controller: 'PioneerExemplaryTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '先锋模范表'
        }
      })
      .state('basicinfo.streetdynamics', {
        url: '/streetdynamics',
        templateUrl: '/modules/basicinfo/client/views/basicinfo-streetdynamicstable.client.view.html',
        controller: 'StreetDynamicTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '街道动态表'
        }
      })
      .state('basicinfo.topvoice', {
        url: '/topvoice',
        templateUrl: '/modules/basicinfo/client/views/basicinfo-topvoicetable.client.view.html',
        controller: 'TopVoiceTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '高层声音'
        },
        params: {
          type: 1
        }
      })
      .state('basicinfo.tongzhi', {
        url: '/topvoice',
        templateUrl: '/modules/basicinfo/client/views/basicinfo-topvoicetable.client.view.html',
        controller: 'TopVoiceTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '通知公告'
        },
        params: {
          type: 2
        }
      })
      .state('basicinfo.tradeunionactivities', {
        url: '/tradeunionactivities',
        templateUrl: '/modules/basicinfo/client/views/basicinfo-tradeunionactivitiestable.client.view.html',
        controller: 'TradeUnionActivitiesTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '工会活动表'
        }
      })
      .state('basicinfo.volunteerteam', {
        url: '/volunteerteam',
        templateUrl: '/modules/basicinfo/client/views/basicinfo-volunteerteamtable.client.view.html',
        controller: 'VolunteerTeamTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '红雁义工队管理'
        }
      })
      .state('basicinfo.guardianmailbox', {
        url: '/guardianmailbox',
        templateUrl: '/modules/basicinfo/client/views/basicinfo-guardianmailboxtable.client.view.html',
        controller: 'GuardianMailboxTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '维权邮箱管理'
        }
      });
  }
}());
