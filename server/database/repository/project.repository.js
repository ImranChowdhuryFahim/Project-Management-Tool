/* eslint-disable class-methods-use-this */
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
const ProjectModel = require('../models/project.model');

class ProjectRepository {
  async findProjectByKey({ key }) {
    return ProjectModel.findOne({ key });
  }

  async findProjectById({ projectId }) {
    return ProjectModel.findOne({ _id: projectId });
  }

  async findPoject({ workspaceKey, title }) {
    return ProjectModel.findOne({ workspaceKey, title });
  }

  async findAllProjects({workspaceKey})
  {
    return ProjectModel.find({ workspaceKey }).populate('teamLead',['displayName']).populate('members.member', ['-__v', '-password', '-workspaces', '-projects']);
  }

  async createProject({
    workspaceKey, title, key, description, teamLead,
  }) {
    const project = new ProjectModel({
      workspaceKey,
      title,
      key,
      description,
      teamLead,
    });
    return project.save();
  }

  async getProjects({ workspaceKey }) {
    const projects = await ProjectModel.find({ workspaceKey }).populate('members.member', ['-__v', '-password', '-workspaces', '-projects'])
    return projects;
  }

  async getProjectDetails({ workspaceKey, projectKey }) {
    const project = await ProjectModel.find({ workspaceKey, key: projectKey }).populate('members.member', ['-__v', '-password', '-workspaces', '-projects']);
    return project;
  }

  async findMember({ projectId, userId }) {
    return ProjectModel.findOne({ _id: projectId, 'members.member': userId });
  }
}

module.exports = ProjectRepository;
