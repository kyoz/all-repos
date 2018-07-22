import test from 'ava';
import repos from '.';

test('must return repos list with valid github username', t => {
  t.truthy(repos('banminkyoz'));
});

test('must return error with null github username', async t => {
  const error = await t.throws(repos(''));
  t.is(error.message, `You must provide a github username !`);
});
