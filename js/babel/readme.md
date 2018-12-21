package.json
```
{
  "//1": "temporary hack (mentioned twice): babel-plugin-transform-async-generator-functions INFO: https://github.com/babel/babel/issues/4969",
  "dependencies": {
    "async-csp": "^0.5.0",
    "babel-cli": "^6.26.0",
    "babel-preset-env": "^1.6.1",
    "babel-plugin-transform-async-generator-functions": "^6.24.1",
    "babel-plugin-transform-async-to-generator": "^6.24.1"
  },
  "//2": "Things only needed by tests:",
  "//3": "mocha needs babel-register and babel-polyfill",
  "//4": "babel-node (inside babel-cli) normally takes care of babel-polyfill; babel-register doesn’t",
  "devDependencies": {
    "babel-register": "^6.26.0",
    "babel-polyfill": "^6.26.0",
    "mocha": "^5.0.1"
  },
  "scripts": {
    "b": "babel-node",
    "test": "mocha --ui qunit --require babel-polyfill --require babel-register"
  },
  "babel": {
    "presets": [
      [
        "env",
        {
          "targets": {
            "node": "current"
          }
        }
      ]
    ],
    "plugins": [
      "transform-async-generator-functions",
      "transform-async-to-generator"
    ]
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/rauschma/async-iter-demo"
  },
  "author": "Axel Rauschmayer",
  "license": "MIT"
}
```
