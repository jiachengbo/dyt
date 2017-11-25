(function () {
  'use strict';

  angular
    .module('baseinfomanage.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('baseinfomanage', {
        abstract: true,
        url: '/baseinfomanage',
        template: '<ui-view/>'
      })/*
       .state('baseinfomanage.curd', {
       url: '/curd',
       templateUrl: '/modules/baseinfomanage/client/views/baseinfomanage-curdtable.client.view.html',
       controller: 'BaseinfomanageCURDTableController',
       controllerAs: 'vm',
       data: {
       pageTitle: 'Baseinfomanage CURD Table'
       }
       })*/
      /* .state('bdmap', {
       url: '/bdmap',
       templateUrl: '/modules/baseinfomanage/client/views/bdmap.html'
       })*/
      .state('streetMemberTable', {
        url: '/streetMemberTable',
        templateUrl: '/modules/baseinfomanage/client/views/streetmembertable-curdtable.client.view.html',
        controller: 'StreetMemberTableCURDTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '街道班子成员管理页面'
        }
      })
      .state('commMemberTable', {
        url: '/commMemberTable',
        templateUrl: '/modules/baseinfomanage/client/views/commmembertable-curdtable.client.view.html',
        controller: 'CommMemberTableCURDTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '社区班子成员管理页面'
        }
      })
      .state('partyBuildInstructorTable', {
        url: '/partyBuildInstructorTable',
        templateUrl: '/modules/baseinfomanage/client/views/partybuildinstructormemtable-curdtable.client.view.html',
        controller: 'PartyBuildInstructorMemTableCURDTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '党建指导员管理页面'
        }
      })/* 原始党建指导员 应该是 党建指导员分配表，暂时隐藏掉，换做新做的 党建
      .state('partyBuildInstructorTable', {
        url: '/partyBuildInstructorTable',
        templateUrl: '/modules/baseinfomanage/client/views/partybuildinstructortable-curdtable.client.view.html',
        controller: 'PartyBuildInstructorTableCURDTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '党建指导员管理页面'
        }
      })*/
      .state('partyMemberTable', {
        url: '/partyMemberTable',
        templateUrl: '/modules/baseinfomanage/client/views/partymembertable-curdtable.client.view.html',
        controller: 'PartyMemberTableCURDTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '党员管理页面'
        }
      })
      .state('partyOrganizationTable', {
        url: '/partyOrganizationTable',
        templateUrl: '/modules/baseinfomanage/client/views/partyorganizationtable-curdtable.client.view.html',
        controller: 'PartyOrganizationTableCURDTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '党组织管理页面'
        }
      })
      .state('leagueMemberTable', {
        url: '/leagueMemberTable',
        templateUrl: '/modules/baseinfomanage/client/views/leaguemembertable-curdtable.client.view.html',
        controller: 'LeagueMemberTableCURDTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '团员管理页面'
        }
      })
      .state('leagueOrganizationTable', {
        url: '/leagueOrganizationTable',
        templateUrl: '/modules/baseinfomanage/client/views/leagueorganizationtable-curdtable.client.view.html',
        controller: 'LeagueOrganizationTableCURDTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '团组织管理页面'
        }
      })
      .state('areadepartmentmanagement', {
        url: '/areadepartmentmanagement',
        templateUrl: '/modules/baseinfomanage/client/views/areadepartmentmanagement-curdtable.client.view.html',
        controller: 'AreadepartmentmanagementCURDTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '三级包抓机制管理页面'
        }
      })
      .state('stationUnitManagement', {
        url: '/stationUnitManagement',
        templateUrl: '/modules/baseinfomanage/client/views/stationUnitManagement-curdtable.client.view.html',
        controller: 'StationUnitManagementCURDTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '驻地单位管理页面'
        }
      })
      .state('threeMasterMemberManagement', {
        url: '/threeMasterMemberManagement',
        templateUrl: '/modules/baseinfomanage/client/views/threemastermembermanagement-curdtable.client.view.html',
        controller: 'ThreeMasterMemberManagementCURDTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '三长三员管理页面'
        }
      })
      .state('basicStationManagement', {
        url: '/basicStationManagement',
        templateUrl: '/modules/baseinfomanage/client/views/basicStationManagement-curdtable.client.view.html',
        controller: 'BasicStationManagementCURDTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '基层站所管理页面'
        }
      })
      .state('unionInformationManagement', {
        url: '/unionInformationManagement',
        templateUrl: '/modules/baseinfomanage/client/views/unionInformationManagement-curdtable.client.view.html',
        controller: 'UnionInformationManagementCURDTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '工会信息管理页面'
        }
      })
      .state('womenInformationManagement', {
        url: '/womenInformationManagement',
        templateUrl: '/modules/baseinfomanage/client/views/womeninformationmanagement-curdtable.client.view.html',
        controller: 'WomenInformationManagementCURDTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '妇联活动管理页面'
        }
      })
      .state('advancedUnitManagement', {
        url: '/advancedUnitManagement',
        templateUrl: '/modules/baseinfomanage/client/views/advancedUnitManagement-curdtable.client.view.html',
        controller: 'AdvancedUnitManagementCURDTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '文明单位管理页面'
        }
      })
      .state('docconv', {
        url: '/docconv',
        templateUrl: '/modules/baseinfomanage/client/views/docconv.client.view.html',
        controller: 'DocConvController',
        controllerAs: 'vm',
        data: {
          pageTitle: '文件转换'
        }
      });
  }
}());
