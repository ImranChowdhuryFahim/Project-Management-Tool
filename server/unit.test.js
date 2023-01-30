const { generateHash, validatePassword, validateSignature, generateSignature} = require('./utils');
test('hash function check', async () => {
    const password = '1235';
    const hashedPassword = await generateHash(password);

    expect(await validatePassword(password, hashedPassword)).toBe(true);
  });

  test('signature check', async () => {
    const payload = {id:12345};
    const token = await generateSignature(payload);

    expect(await !validateSignature(token)).toBe(false);
  });
