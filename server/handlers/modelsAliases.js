const Role = require('../models/role');
const User = require('../models/user');
const Resource = require('../models/resource');
const Layout = require('../models/layout');

module.exports = {
  $role: Role,
  $user: User,
  $resource: Resource,
  $layout: Layout
};
