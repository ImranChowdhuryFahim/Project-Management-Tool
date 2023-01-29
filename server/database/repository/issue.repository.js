/* eslint-disable class-methods-use-this */
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
const IssueModel = require('../models/issue.model');

class IssueRepository {
  async createIssue({
    title, description, order, key, isDone, dueDate,
  }) {
    const issue = new IssueModel({
      title,
      description,
      order,
      key,
      isDone,
      dueDate,
    });
    return issue.save();
  }

  async updateIssue({
    issueId, title, description, order, isDone, dueDate,
  }) {
    return IssueModel.updateOne({ _id: issueId }, {
      title, description, order, isDone, dueDate,
    });
  }

  async deleteIssue({ issueId }) {
    return IssueModel.deleteOne({ _id: issueId });
  }
}

module.exports = IssueRepository;
