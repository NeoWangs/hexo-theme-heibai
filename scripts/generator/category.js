'use strict';

const pagination = require('hexo-pagination');

module.exports = function (hexo) {
  hexo.extend.generator.register('heibai-category', function (locals) {
    const categories = hexo.theme.config.categories || [];
    const perPage = hexo.config.per_page || 10;
    const paginationDir = hexo.config.pagination_dir || 'page';

    return categories.reduce((result, catConfig) => {
      const category = locals.categories.findOne({ name: catConfig.name });
      const posts = category ? category.posts.sort('-date') : locals.posts.limit(0);
      const path = catConfig.name.endsWith('/') ? catConfig.name : catConfig.name + '/';

      const pages = pagination(path, posts, {
        perPage,
        layout: ['category'],
        format: paginationDir + '/%d/',
        data: {
          categoryConfig: catConfig,
        },
      });

      return result.concat(pages);
    }, []);
  });
};
