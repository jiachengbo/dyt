(function () {
  'use strict';

  angular
    .module('map')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('sidemenu', {
      title: '民情地图',
      state: 'map',
      type: 'dropdown',
      roles: ['admin', 'ncadmin', 'sqadmin', 'adminrole', 'sq_wjsquser', 'sq_qlsquser', 'sq_yxsquser',
        'sq_xysquser', 'sq_tyysquser', 'sq_xylsquser', 'sq_bysquser', 'sq_xksquser', 'sq_swsquser', 'sq_ytlsquser',
        'sq_hbztsquser', 'sq_hcsquser', 'sq_chblsquser', 'sq_kjdxsquser', 'sq_chnlsquser', 'sq_jdcjsquser',
        'sq_jysquser', 'sq_xktsquser', 'sq_dytsquser', 'sq_tycuser', 'sq_tecuser', 'sq_dytcuser', 'sq_wjcuser',
        'sq_gymcuser', 'sq_tpbcuser', 'nc_wjsquser', 'nc_qlsquser', 'nc_yxsquser', 'nc_xysquser', 'nc_tyysquser',
        'nc_xylsquser', 'nc_bysquser', 'nc_xksquser', 'nc_swsquser', 'nc_ytlsquser', 'nc_hbztsquser', 'nc_hcsquser',
        'nc_chblsquser', 'nc_kjdxsquser', 'nc_chnlsquser', 'nc_jdcjsquser', 'nc_jysquser', 'nc_xktsquser',
        'nc_dytsquser', 'nc_tycuser', 'nc_tecuser', 'nc_dytcuser', 'nc_wjcuser', 'nc_gymcuser', 'nc_tpbcuser'],
      position: 0
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('sidemenu', 'map', {
      title: '人员管理',
      state: 'map.person',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'map', {
      title: '地图管理',
      state: 'baidumap',
      roles: ['*']
    });
  }
}());
