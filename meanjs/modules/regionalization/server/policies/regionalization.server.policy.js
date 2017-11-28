'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Regionalization Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['user', 'admin'],
    allows: [{
      resources: '/api/regionalization/project',
      permissions: '*'
    }, {
      resources: '/api/regionalization/project/:projectId',
      permissions: '*'
    }, {
      resources: '/api/regionalization/djdynamic',
      permissions: '*'
    }, {
      resources: '/api/regionalization/djdynamic/:dynamicId',
      permissions: '*'
    }, {
      resources: '/api/regionalization/interaction',
      permissions: '*'
    }, {
      resources: '/api/regionalization/interaction/:interactionId',
      permissions: '*'
    }, {
      resources: '/api/regionalization/progress',
      permissions: '*'
    }, {
      resources: '/api/regionalization/progress/:progressId',
      permissions: '*'
    }, {
      resources: '/api/regionalization/projectapproval/:approvalId',
      permissions: '*'
    }, {
      resources: '/api/regionalization/projectknot/:knotId',
      permissions: '*'
    }, {
      resources: '/api/regionalization/community',
      permissions: '*'
    }, {
      resources: '/api/regionalization/community/:communityId',
      permissions: '*'
    }]
  }]);
};

/**
 * Check If Regionalization Policy Allows
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
