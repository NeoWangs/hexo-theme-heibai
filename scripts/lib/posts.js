'use strict';

function groupByYear(posts) {
  const map = new Map();
  posts.forEach((post) => {
    const year = String(new Date(post.date).getFullYear());
    if (!map.has(year)) map.set(year, []);
    map.get(year).push(post);
  });
  return Array.from(map.keys())
    .sort((a, b) => b.localeCompare(a))
    .map((year) => ({ year, posts: map.get(year) }));
}

function estimateReadingTime(content, charsPerMinute) {
  const rate = charsPerMinute || 400;
  if (!content) return 1;
  const text = String(content).replace(/<[^>]+>/g, '');
  const chars = text.trim().length;
  return Math.max(1, Math.round(chars / rate));
}

module.exports = { groupByYear, estimateReadingTime };
