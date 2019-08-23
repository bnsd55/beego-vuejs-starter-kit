# Beego Vue.js Starter Kit

Using Beego (GOLANG), Webpack, Sass, Vue.js, Vuex, Buefy

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

### Installing
In order to build the client, execute:

```
npm run start
```

Will start webpack-dev-server on port 8000 and create /dist folder with all the desired files.

Now, we need to run our Go server, just execute:

```
bee run
```

Will start our Beego server on port 8080 and gets the client files from /dist folder.

In order to visit and see how the project looks like, go to: localhost:8080

## Built With

* [Beego](https://beego.me/) - Go framework
* [Webpack](https://webpack.js.org/) - Module bundler
* [Vue.js](https://vuejs.org/) - JavaScript Framework
* [Vuex](https://vuex.vuejs.org/en/) - State management
* [Sass](http://sass-lang.com/) - CSS extension
* [Buefy](https://buefy.github.io/#/) - Lightweight UI components for Vue.js based on Bulma
* [Bulma](https://bulma.io/) - CSS framework 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

