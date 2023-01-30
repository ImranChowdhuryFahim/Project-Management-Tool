const { generateHash, validatePassword } = require('./utils');

test('hash function check', async () => {
    const password = '1235';
    const hashedPassword = await generateHash(password);

    expect(await validatePassword(password, hashedPassword)).toBe(true);
  });