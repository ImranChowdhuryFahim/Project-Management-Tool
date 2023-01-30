/* eslint-disable class-methods-use-this */
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
const IssueModel = require('../models/issue.model');

class IssueRepository {
  async createIssue({
    workspaceKey, projectKey, title, description, key, isDone, dueDate,
  }) {
    const issue = new IssueModel({
      workspaceKey,
      projectKey,
      title,
      description,
      key,
      isDone,
      dueDate,
    });
    return issue.save();
  }

  async getIssueDetails({ workspaceKey, projectKey, issueKey }) {
    return IssueModel.findOne({ workspaceKey, projectKey, key: issueKey }).select(['-__v']);
  }

  async updateIssue({
    issueId, title, description, isDone, dueDate,
  }) {
    return IssueModel.updateOne({ _id: issueId }, {
      title, description, isDone, dueDate,
    });
  }

  async deleteIssue({ issueId }) {
    return IssueModel.deleteOne({ _id: issueId });
  }

  async deleteIssues({ issueIds }) {
    return IssueModel.deleteMany({ _id: { $in: issueIds } });
  }

  async findIssue({ workspaceKey, projectKey, issueKey }) {
    return IssueModel.findOne({ workspaceKey, projectKey, key: issueKey });
  }
}

module.exports = IssueRepository;