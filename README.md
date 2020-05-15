# Portfolio Website v1

This is the first version of my personal portfolio website. Optimizing loading speed and accessibility were my highest priority during the realization of this project. The website is PWA-ready and can be installed / added to home screen on compatible devices.

You can check out the live project by clicking [here](https://www.patrickobermeier.dev/).

## Technologies & Tools Used

- HTML5
- Custom CSS + Bulma CSS Framework
- Sass via Node-Sass
- Vanilla JavaScript
- AOS Animation Library
- Parcel (Bundler) with the following plugins
  - ImageMin (Image Minification)
  - PurgeCSS (Removes unused CSS)
- Grunt for Post-Build Tasks
  - Critical CSS Plugin (Determines CSS needed for above-the-fold content and inlines it)
- Worbox CLI (Generates Servíceworker as part of a postbuild-script)

## Quick Start

### Development

After cloning / downloading this repository first install the dev-depencies via NPM by using the following CLI-command:

```
npm install
```

You can then launch a dev server with the following command:

```
npm start
```

Additionaly the Sass-files need to be re-compiled if they're modified. Therefore you can either build them once by running

```
npm run css-build
```

or continously watch for changes in the files and let them auto-recompile by using

```
npm run css-watch
```

### Deployment

You can build the static assets needed for deployment via the following CLI-command:

```
npm run build
```

The files will be build and bundled into the "dist" folder. These files can then be deployed to any static web server or a PaaS like Netlify.
