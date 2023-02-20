/* eslint-disable class-methods-use-this */
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
const UserModel = require('../models/user.model');

class UserRepository {
  async findUserByEmail({ email }) {
    return UserModel.findOne({ email });
  }

  async findUserById({ _id }) {
    return UserModel.findOne({ _id });
  }

  async createUser({ displayName, email, hashedPassword }) {
    const user = new UserModel({
      displayName,
      email,
      password: hashedPassword,
    });

    return user.save();
  }

  async deleteUserByEmail({ email }) {
    return UserModel.deleteOne({ email });
  }

  async getUserProfile({ _id }) {
    return UserModel.findById({ _id }).select(['-password', '-__v', '-projects', '-workspaces']);
  }

  async updateUserProfile({ _id, displayName, avatarLink }) {
    return UserModel.updateOne({ _id }, { displayName, avatarLink });
  }

  async addWorkspace({
    _id, workspaceId, role,
  }) {
    const user = await UserModel.findOne({ _id });
    user.workspaces.push({ workspace: workspaceId, role });
    return user.save();
  }

  async getWorkspaces({ _id }) {
    const user = await UserModel.findOne({ _id }).populate({path:'workspaces.workspace' ,select:['_id', 'title', 'key', 'description','members'] ,populate:
    {path: 'members.member',model: UserModel,select:['displayName','email']}});

    return user.workspaces;
  }

  async addProject({
    _id, projectId,
  }) {
    const user = await UserModel.updateOne({ _id }, { $push: { projects: projectId } });
    return user;
  }

  async getProjects({ _id }) {
    const user = await UserModel.findOne({ _id }).populate('projects', ['_id', 'title', 'key', 'description']);
    return user.projects;
  }

  async getWorkspaceProjects({ _id, workspaceKey }) {
    const user = await UserModel.findOne({ _id }).populate({ path: 'projects', match: { workspaceKey }, select: ['_id', 'title', 'key', 'description'] });
    console.log(user)
    return user.projects;
  }
}

module.exports = UserRepository;
