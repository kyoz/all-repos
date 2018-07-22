# all-repos 

> Get all github repositories by username

[![Build Status](https://travis-ci.org/banminkyoz/all-repos.svg?branch=master)](https://travis-ci.org/banminkyoz/all-repos) [![NPM version](https://badge.fury.io/js/all-repos.svg)](http://badge.fury.io/js/all-repos) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

## Install

```
$ npm install all-repos --save
```

## Usage

```js
const allRepos = require('all-repos');

allRepos('banminkyoz').then(repos => {
  console.log(repos);
}).catch(error => {
  console.log(error);
});

/* Results:

[
  {
    name: 'neovim',
    fullName: 'banminkyoz/neovim',
    description: 'My neovim config XD',
    stars: '1',
    forks: 0,
    forkFrom: '',
    lastUpdated: '3 weeks ago',
    url: 'https://github.com/banminkyoz/neovim'
  },
  ...
]

*/

```

## Related

- [all-repos-cli](https://github.com/banminkyoz/all-repos-cli) - CLI for this module

## License

MIT © [Kyoz](mailto:banminkyoz@gmail.com)