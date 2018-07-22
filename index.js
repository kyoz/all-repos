'use strict';

const Crawler = require('crawler');
const timeAgo = require('timeago.js');

const results = [];

module.exports = githubUsername => {
  return new Promise((resolve, reject) => {
    if (!githubUsername) {
      reject(new Error('You must provide a github username !'));
    }
    reposPageCount(githubUsername).then(pagesCount => {
      pagesCount = pagesCount ? pagesCount : 1;
      const getReposInfo = [];
      for (let i = 1; i <= pagesCount; i++) {
        getReposInfo.push(getReposInfoByPage(githubUsername, i));
      }

      Promise.all(getReposInfo).then(() => {
        resolve(results);
      }).catch(err => {
        reject(err);
      });
    });
  });
};

function reposPageCount(githubUsername) {
  return new Promise(resolve => {
    const pages = [];
    const crawler = new Crawler({
      maxConnections: 1,
      callback: (error, res, done) => {
        if (error) {
          return console.log(error);
        }

        const {$} = res;
        $('.paginate-container > .pagination > a').each((i, p) => {
          pages.push($(p).text());
        });

        done();
        resolve(pages[pages.length - 2]);
      }
    });

    crawler.queue(`https://github.com/${githubUsername}?tab=repositories`);
  });
}

function getReposInfoByPage(githubUsername, page) {
  const url = `https://github.com/${githubUsername}?page=${page}&tab=repositories`;

  return new Promise(resolve => {
    const crawler = new Crawler({
      maxConnections: 1,
      callback: (error, res, done) => {
        if (error) {
          return console.log(error);
        }

        const {
          $
        } = res;
        $('#all-repositories-list > ul > li').each((i, p) => {
          const name = $(p).find('[itemprop="name codeRepository"]').text().trim();
          const description = $(p).find('[itemprop="description"]').text().trim();
          const forkFrom = $(p).find('.d-inline-block.mb-1 > .f6.text-gray.mb-1 > .muted-link').text().trim();
          const lastUpdated = timeAgo().format(new Date($(p).find('.f6.text-gray.mt-2 > relative-time').attr('datetime')));
          const fullName = `${githubUsername}/${name}`;
          let stars = $(p).find(`[href="/${githubUsername}/${name}/stargazers"]`).text().trim();
          let forks = $(p).find(`[href="/${githubUsername}/${name}/network"]`).text().trim();
          const url = `https://github.com/${githubUsername}/${name}`;

          stars = stars ? stars : 0;
          forks = forks ? forks : 0;

          results.push({
            name,
            fullName,
            description,
            stars,
            forks,
            forkFrom,
            lastUpdated,
            url
          });
        });

        done();
        resolve();
      }
    });

    crawler.queue(url);
  });
}
