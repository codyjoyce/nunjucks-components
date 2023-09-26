# nunjucks-components

A Nunjucks extension that adds components with slots, similar to Svelte or Vue.

## Install

``` bash
npm install nunjucks-components
```

## Usage

Register the extension with nunjucks

``` js
import nunjucks from "nunjucks";

// Import the extension
import Components  from 'nunjucks-components';

const env = nunjucks.configure({ autoescape: true });

// Register
env.addExtension('Components', new Components(env));
```

Create a component to add to your templates

``` html
<!-- component.html !-->

<div>
    <slot>This slot will be replaced with content</slot>
</div>
```

Add the component to your template


``` html
<!-- template.html !-->

<h1>Welcome to my website!</h1>

<div>
    {% component "component.html" %}
        This is some text to fill the slot!
    {% componentend%}
</div>
```
_Note: You can use a variable instead of entering "component.html", useful for reusable components_

You can add tags or any other nunjucks markup inside your component
``` html
<!-- template.html !-->

{% set myComponent = "component.html" %}
{% set user = "Cody" %}

<h1>Welcome to my website!</h1>

<div>
    {% component myComponent %}
        Hello {{ user }}
        This is some text to fill the slot!
    {% componentend%}
</div>
```

### Passing Data

You can pass variables, which will only be accessible within the component

``` html
<!-- template.html !-->

{% set myComponent = "component.html" %}
{% set user = "Cody" %}

<h1>Welcome to my website!</h1>

<div>
    {% component myComponent,title="My Component",user=user %}
        This is some text to fill the slot!
    {% componentend%}
</div>
```

``` html
<!-- component.html !-->

<div>
    {{ title }} for {{ user }}
    <slot>This slot will be replaced with content</slot>
</div>
```
_Note: Objects can also be passed_

## Limitations
1. When passing variables to the component, they must be declared. for example:
```
title="My Component" will work

myTitle=title will work

title by itself will NOT work
```
_Note: variable changes within the components file do not change in the global template context._

