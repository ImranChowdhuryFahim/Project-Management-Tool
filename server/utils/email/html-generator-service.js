// import fs
const fs = require('fs');

const getAccountCreatedHtml = (userName) => {
  const htmlPath = `${__dirname}/account-create-successful.html`;
  const html = fs.readFileSync(htmlPath, 'utf8');
  const htmlReplaced = html
    .replace(/{{username}}/g, userName);
  return htmlReplaced;
};

module.exports = {
  getAccountCreatedHtml,
};
