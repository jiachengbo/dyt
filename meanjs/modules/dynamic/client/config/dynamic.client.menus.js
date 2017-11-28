(function () {
  'use strict';

  angular
    .module('dynamic')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('sidemenu', {
      title: '重点工作动态',
      state: 'dynamic',
      type: 'dropdown',
      roles: ['admin', 'adminrole'],
      position: 0
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('sidemenu', 'dynamic', {
      title: '工作动态',
      state: 'dynamic.main.one',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'dynamic', {
      title: '学习动态',
      state: 'dynamic.learningdynamics',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'dynamic', {
      title: '三务公开',
      state: 'dynamic.threeservice',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'dynamic', {
      title: '党组织整顿',
      state: 'dynamic.rectifying',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'dynamic', {
      title: '脱贫攻坚',
      state: 'dynamic.povertyalleviation',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'dynamic', {
      title: '在职党员进社区',
      state: 'dynamic.entercommunity',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'dynamic', {
      title: '职业水平认证',
      state: 'dynamic.professionalgrading',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'dynamic', {
      title: '评星晋级争双强',
      state: 'dynamic.starjudgments',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'dynamic', {
      title: '社区党建共建联合会',
      state: 'dynamic.federations',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'dynamic', {
      title: '街道党建联席会',
      state: 'dynamic.julac',
      roles: ['*']
    });

  }
}());
