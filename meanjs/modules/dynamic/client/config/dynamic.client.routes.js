(function () {
  'use strict';

  angular
    .module('dynamic.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('dynamic', {
        abstract: true,
        url: '/dynamic',
        template: '<ui-view/>'
      })
      .state('dynamic.main', {
        url: '/mian',
        templateUrl: '/modules/dynamic/client/views/dynamic-main.client.view.html',
        controller: 'DynamicMainTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '工作动态页面'
        }
      })
      .state('dynamic.main.one', {
        url: '/one',
        views: {
          'grid': {
            templateUrl: '/modules/dynamic/client/views/dynamic-main-one.client.view.html',
            controller: 'DynamicMainOneTableController',
            controllerAs: 'vmo'
          }
        },
        params: {
          tabindex: 1,
          tabname: '两学一做',
          tj: '',
          typeId: 3
        }
      })
      .state('dynamic.learningdynamics', {
        url: '/learningdynamics',
        templateUrl: '/modules/dynamic/client/views/dynamic-learningdynamicstable.client.view.html',
        controller: 'LearningDynamicsTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '学习动态页面'
        }
      })
      .state('dynamic.threeservice', {
        url: '/threeservice',
        templateUrl: '/modules/dynamic/client/views/dynamic-threeservicetable.client.view.html',
        controller: 'ThreeServiceTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '三务公开页面'
        }
      })
      .state('dynamic.rectifying', {
        url: '/rectifying',
        templateUrl: '/modules/dynamic/client/views/dynamic-rectifyingtable.client.view.html',
        controller: 'RectifyingTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '党组织整顿页面'
        }
      })
      .state('dynamic.povertyalleviation', {
        url: '/povertyalleviation',
        templateUrl: '/modules/dynamic/client/views/dynamic-povertyalleviationtable.client.view.html',
        controller: 'PovertyAlleviationTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '脱贫攻坚页面'
        }
      })
      .state('dynamic.entercommunity', {
        url: '/entercommunity',
        templateUrl: '/modules/dynamic/client/views/dynamic-entercommunitytable.client.view.html',
        controller: 'EnterCommunityTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '在职党员进社区页面'
        }
      })
      .state('dynamic.professionalgrading', {
        url: '/professionalgrading',
        templateUrl: '/modules/dynamic/client/views/dynamic-professionalgradingtable.client.view.html',
        controller: 'ProfessionAlgradingTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '职业水平认证页面'
        }
      })
      .state('dynamic.starjudgments', {
        url: '/starjudgments',
        templateUrl: '/modules/dynamic/client/views/dynamic-starjudgmentstable.client.view.html',
        controller: 'StarJudgmentsTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '评星晋级争双强页面'
        }
      })
      .state('dynamic.federations', {
        url: '/federations',
        templateUrl: '/modules/dynamic/client/views/dynamic-federationstable.client.view.html',
        controller: 'FederationsTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '社区党建共建联合会页面'
        }
      })
      .state('dynamic.julac', {
        url: '/julac',
        templateUrl: '/modules/dynamic/client/views/dynamic-julactable.client.view.html',
        controller: 'julacTableController',
        controllerAs: 'vm',
        data: {
          pageTitle: '街道党建联席会页面'
        }
      });
  }
}());
