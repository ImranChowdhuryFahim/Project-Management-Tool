/* eslint-disable class-methods-use-this */
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
const ProjectModel = require('../models/project.model');

class ProjectRepository {
  async findProjectByKey({ key }) {
    return ProjectModel.findOne({ key });
  }

  async findDuplicatePoject({ workspaceKey, title }) {
    return ProjectModel.findOne({ workspaceKey, title });
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
    const projects = await ProjectModel.find({ workspaceKey });
    return projects;
  }
}

module.exports = ProjectRepository;
