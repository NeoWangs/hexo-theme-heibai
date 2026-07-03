'use strict';

const { groupByYear, estimateReadingTime } = require('../lib/posts');

module.exports = function (hexo) {
  hexo.extend.helper.register('heibai_group_by_year', function (posts) {
    const arr = posts && typeof posts.toArray === 'function' ? posts.toArray() : posts || [];
    return groupByYear(arr);
  });

  hexo.extend.helper.register('heibai_reading_time', function (content) {
    return estimateReadingTime(content);
  });
};
