// Models
const AdditionalField = require('../models/additionalField');
const Field = require('../components/field/model');
const FieldCategory = require('../models/fieldCategory');
const Layout = require('../components/layout/model');
const Resource = require('../models/resource');
const ResourceType = require('../models/resourceType');
const Role = require('../models/role');
const User = require('../models/user');

module.exports = async () => {
  // User
  User.belongsTo(Role, {
    as: 'role'
  });
  User.belongsTo(User, {
    onDelete: 'cascade',
    as: 'user'
  });
  User.hasMany(Resource, {
    onDelete: 'cascade',
    as: 'resources'
  });

  // Resource
  Resource.hasMany(AdditionalField, {
    as: 'additionalfields',
    onDelete: 'cascade'
  });
  Resource.belongsTo(User, {
    as: 'user',
    onDelete: 'cascade'
  });
  Resource.belongsTo(Resource, {
    onDelete: 'cascade',
    as: 'parent'
  });
  Resource.belongsTo(Layout, {
    as: 'layout'
  });
  Resource.belongsTo(ResourceType, {
    as: 'resourcetype'
  });
  Resource.belongsToMany(Resource, {
    as: 'translations',
    onDelete: 'cascade',
    through: 'ResourceTranslation',
    constraints: false
  });
  Resource.hasMany(Resource, {
    as: 'children',
    onDelete: 'cascade',
    foreignKey: 'parentId'
  });

  // Additional field
  AdditionalField.belongsTo(Field, {
    onDelete: 'cascade'
  });
  AdditionalField.belongsTo(Resource, {
    onDelete: 'cascade'
  });
  AdditionalField.belongsTo(FieldCategory, {
    as: 'category'
  });
}
