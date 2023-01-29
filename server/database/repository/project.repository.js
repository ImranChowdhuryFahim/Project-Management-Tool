/* eslint-disable class-methods-use-this */
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
const ProjectModel = require('../models/project.model');

class ProjectRepository {
  async findProjectByKey({ key }) {
    return ProjectModel.findOne({ key });
  }

  async findDuplicatePoject({ workspaceId, title }) {
    return ProjectModel.findOne({ workspaceId, title });
  }

  async createProject({
    workspaceId, title, key, description, teamLead,
  }) {
    const project = new ProjectModel({
      workspaceId,
      title,
      key,
      description,
      teamLead,
    });
    return project.save();
  }
}

module.exports = ProjectRepository;
