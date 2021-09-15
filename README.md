## My first react app

https://fervent-mccarthy-bb5574.netlify.app/

```
"scripts": {
    "build": "webpack",
    "start": "webpack-dev-server --host 0.0.0.0"
  },
```

- It was deployed to AWS, that is why Dockerfile exists

Withouth "--host" flag webpack-dev-server would not be accessible from outside

NOTE: there is a dependency conflich between webpack and webpack-cli, when I build docker image, that is why project is using webpack v4.
