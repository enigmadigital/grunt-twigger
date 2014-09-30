# grunt-twigger

Easy way to turn data and/or Twig templates into HTML.

## Getting Started

This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out
the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains
how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as
install and use Grunt plugins. Once you're familiar with that process, you may
install this plugin with this command:

```shell
npm install grunt-twigger --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with
this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-twigger');
```

## The "twigger" task

### Overview

In your project's Gruntfile, add a section named `twigger` to the data object
passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  twigger: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      options: {
        // Target-specific options go here.
      },
      // Paramaters go here.
    },
  },
});
```

### Usage Examples

#### Turn a Twig template into HTML

This renders a single Twig template file into a single HTML file, with some
data:

```js
grunt.initConfig({
  twigger: {
    your_target: {
      src: 'path/to/template.twig',
      data: {
        foo: 2,
        bar: 'Variables available in the template!'
      },
      dest: 'path/to/output.html'
    }
  },
});
```

Data can also be provided as a JSON or YAML file:

```js
grunt.initConfig({
  twigger: {
    your_target: {
      src: 'path/to/template.twig',
      data: 'path/to/data.json', // or data.yaml
      dest: 'path/to/output.html'
    }
  },
});
```

Multiple data sources can be merged together via an array. The last item in the
array takes precedence, and will overwrite values preceding it.

```js
grunt.initConfig({
  twigger: {
    your_target: {
      src: 'path/to/template.twig',
      data: [{ foo: 2 }, 'path/to/data1.json', 'path/to/data2.yaml'],
      dest: 'path/to/output.html'
    }
  },
});
```

#### Turn multiple Twig templates into HTML

You can render multiple Twig templates at once and place them into an output
directory using regular grunt src expansion. Each Twig template will have access
to the data passed in via the `data` parameter.

```js
grunt.initConfig({
  twigger: {
    your_target: {
      src: 'path/to/templates/*.twig',
      data: 'path/to/data.json',
      dest: 'path/to/output/'
    }
  },
});
```

#### Turn multiple data files into HTML

By selecting multiple JSON or YAML data files as the `src`, and specifying a
`template` parameter, twigger can output several HTML files based on the same
template but with different data. In this way, twigger can be used as a simple
static site generator.

```js
grunt.initConfig({
  twigger: {
    your_target: {
      src: 'path/to/data/*.json',
      template: 'path/to/template.twig',
      dest: 'path/to/output/'
    }
  },
});
```

### Options

#### options.twig
Type: `Object` Default value: `{ cache: false }`

Params object passed into the [twig.js](https://github.com/justjohn/twig.js/)
`twig` function when rendering the template. Use this to adjust twig.js
settings.

The `path`, `async` and `rethrow` params are not configurable.

An additional `cache` param is provided to enable/disable twig.js caching.
Caching is off by default.

For example, to specify a base path for twig `{{ include }}`s:

```js
grunt.initConfig({
  twigger: {
    options: {
      twig: {
        base: 'includes'
      }
    },
    // ...
  }
});
```

#### options.data
Type: `Object`
Default value: `{}`

Additional data that available to all Twig templates rendered by this task.

#### options.preRender
Type: `Function`
Default value: none

A function called before each Twig template is rendered. The function is passed
a single params object with the keys:

* `data` – the final data that will be passed into the Twig template. Can be
  modified.
* `src` – the path to the Twig template or JSON/YAML file that that grunt is
  processing.
* `template` – the path to the Twig template being rendered.

The `preRender` hook is useful for providing templates with dynamic variables.
For example, to provide a Twig template with a variable called `template`
containing its own template path, one could write:

```js
grunt.initConfig({
  twigger: {
    options: {
      preRender: function(params) {
        params.data.template = params.template;
      }
    },
    // ...
  }
});
```

### Parameters

#### src

Grunt path specifying the source Twig template files or JSON/YAML files to
generate from. If JSON/YAML files are specified, a `template` parameter must
also be specified.

#### dest

Path to a file or folder to put output into. If there is a single source file,
an output file should be specified. If there are multiple source files, a
directory should be specified.

#### data

Additional data given to the Twig template before rendering. Can be a JavaScript
object literal, grunt path to a JSON/YAML file or an array of literals and
paths. 

Data sources at a higher index in the list take precedence over sources left of
it. If data is specified in the `src` parameter, it takes precedence over all
sources in the `data` parameter.Paths to JSON/YAML files are expanded using
regular grunt globbing.

#### template

The path to the Twig template to use, if `src` points to a JSON/YAML data file.
Only one template may be specified.

## Contributing

Please take care to maintain the existing coding style. Add unit tests for any
new functionality. Run tests using `grunt test`.

## Release History

* `1.0.0` – Initial release
