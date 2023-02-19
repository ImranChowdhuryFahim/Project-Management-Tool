/* eslint-disable global-require */
module.exports = {
  UserRepository: require('./repository/user.repository'),
  WorkspaceRepository: require('./repository/workspace.repository'),
  ProjectRepository: require('./repository/project.repository'),
  BoardRepository: require('./repository/board.repository'),
  ColumnRepository: require('./repository/column.repository'),
  IssueRepository: require('./repository/issue.repository'),
  NotificationRepository: require('./repository/notification.repository'),
};
