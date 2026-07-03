'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { groupByYear, estimateReadingTime } = require('../scripts/lib/posts');

test('groupByYear groups posts by year, newest year first', () => {
  const posts = [
    { title: 'a', date: '2012-01-04' },
    { title: 'b', date: '2016-12-30' },
    { title: 'c', date: '2012-12-09' },
  ];
  const groups = groupByYear(posts);
  assert.deepEqual(groups.map((g) => g.year), ['2016', '2012']);
  assert.equal(groups[1].posts.length, 2);
});

test('groupByYear returns empty array for no posts', () => {
  assert.deepEqual(groupByYear([]), []);
});

test('estimateReadingTime strips HTML tags before counting', () => {
  const minutes = estimateReadingTime('<p>' + '字'.repeat(400) + '</p>');
  assert.equal(minutes, 1);
});

test('estimateReadingTime never returns less than 1 minute', () => {
  assert.equal(estimateReadingTime('short'), 1);
});

test('estimateReadingTime scales with content length', () => {
  const minutes = estimateReadingTime('字'.repeat(2400));
  assert.equal(minutes, 6);
});
