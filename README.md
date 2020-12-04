```
"scripts": {
    "build": "webpack",
    "start": "webpack-dev-server --host 0.0.0.0"
  },
```

NOTE: there is a dependency conflich between webpack and webpack-cli, when I build docker image, that is why project is using webpack v4.
