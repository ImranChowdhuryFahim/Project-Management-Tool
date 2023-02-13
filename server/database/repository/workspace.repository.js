/* eslint-disable class-methods-use-this */
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
const WorkspaceModel = require('../models/workspace.model');

class WorkspaceRepository {
  async findWorkspaceByTitle({ title }) {
    return WorkspaceModel.findOne({ title });
  }

  async findWorkspaceById({ _id }) {
    return WorkspaceModel.findOne({ _id });
  }

  async findWorkspaceByKey({ workspaceKey }) {
    return WorkspaceModel.findOne({ key: workspaceKey });
  }

  async findmember({ workspaceKey, userId }) {
    return WorkspaceModel.findOne({ key: workspaceKey, 'members.member': userId });
  }

  async findWorkspaceDetailsByKey({ workspaceKey }) {
    return WorkspaceModel.findOne({ key: workspaceKey }).select(['-__v', '-invitedUsers']).populate('members.member', ['-__v', '-password', '-workspaces', '-projects']);
  }

  async createWorkspace({
    title, key, description, owner,
  }) {
    const workspace = new WorkspaceModel({
      title,
      key,
      description,
      owner,
    });
    return workspace.save();
  }

  async addMember({
    _id, userId, role,
  }) {
    const workspace = await WorkspaceModel.findOne({ _id });
    workspace.members.push({ member: userId, role });
    return workspace.save();
  }
}

module.exports = WorkspaceRepository;
