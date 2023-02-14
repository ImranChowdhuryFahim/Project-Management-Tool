/* eslint-disable class-methods-use-this */
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
const IssueModel = require('../models/issue.model');

class IssueRepository {
  async createIssue({
    workspaceKey, projectKey, title, description,priority, key, isDone, dueDate,
  }) {
    const issue = new IssueModel({
      workspaceKey,
      projectKey,
      title,
      priority,
      description,
      key,
      isDone,
      dueDate,
    });
    return issue.save();
  }

  async getIssueDetails({ workspaceKey, projectKey, issueKey }) {
    return IssueModel.findOne({ workspaceKey, projectKey, key: issueKey }).select(['-__v']).populate('assignee', ['-__v', '-password', '-workspaces', '-projects']);
  }

  async updateIssue({
    issueId, title, description, isDone, priority, dueDate,
  }) {
    return IssueModel.updateOne({ _id: issueId }, {
      title, description, isDone, dueDate, priority,
    });
  }

  async deleteIssue({ issueId }) {
    return IssueModel.deleteOne({ _id: issueId });
  }

  async deleteIssues({ issueIds }) {
    return IssueModel.deleteMany({ _id: { $in: issueIds } });
  }

  async findIssueById({ issueId }) {
    return IssueModel.findOne({ _id: issueId });
  }

  async findIssue({ workspaceKey, projectKey, issueKey }) {
    return IssueModel.findOne({ workspaceKey, projectKey, key: issueKey });
  }

  async findAssignee({ issueId, userId }) {
    return IssueModel.findOne({ _id: issueId, assignee: userId });
  }
}

module.exports = IssueRepository;
