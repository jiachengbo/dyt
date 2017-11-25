'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Dynamic Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['user', 'admin'],
    allows: [{
      resources: '/api/dynamic',
      permissions: '*'
    }, {
      resources: '/api/dynamic/:typeId',
      permissions: '*'
    }, {
      resources: '/api/learningdynamicsinfo',
      permissions: '*'
    }, {
      resources: '/api/learningdynamicsinfo/:learningdynamicsId',
      permissions: '*'
    }, {
      resources: '/api/povertyalleviationinfo',
      permissions: '*'
    }, {
      resources: '/api/povertyalleviationinfo/:povertyalleviationId',
      permissions: '*'
    }, {
      resources: '/api/rectifyinginfo',
      permissions: '*'
    }, {
      resources: '/api/rectifyinginfo/:rectifyingId',
      permissions: '*'
    }, {
      resources: '/api/threeserviceinfo',
      permissions: '*'
    }, {
      resources: '/api/threeserviceinfo/:threeserviceId',
      permissions: '*'
    }, {
      resources: '/api/entercommunityinfo',
      permissions: '*'
    }, {
      resources: '/api/entercommunityinfo/:entercommunityId',
      permissions: '*'
    }, {
      resources: '/api/federationsinfo',
      permissions: '*'
    }, {
      resources: '/api/federationsinfo/:federationsId',
      permissions: '*'
    }, {
      resources: '/api/julacinfo',
      permissions: '*'
    }, {
      resources: '/api/julacinfo/:julacId',
      permissions: '*'
    }, {
      resources: '/api/professionalgradinginfo',
      permissions: '*'
    }, {
      resources: '/api/professionalgradinginfo/:professionalgradingId',
      permissions: '*'
    }, {
      resources: '/api/starjudgmentsinfo',
      permissions: '*'
    }, {
      resources: '/api/starjudgmentsinfo/:starjudgmentsId',
      permissions: '*'
    }]
  }]);
};

/**
 * Check If Dynamic Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
