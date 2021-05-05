```
"scripts": {
    "build": "webpack",
    "start": "webpack-dev-server --host 0.0.0.0"
  },
```

Withouth "--host" flag webpack-dev-server would not be accessible from outside

NOTE: there is a dependency conflich between webpack and webpack-cli, when I build docker image, that is why project is using webpack v4.

## Production hosted on AWS

http://18.212.232.17/
