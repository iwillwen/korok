<div style="width: 100%;text-align: center;">
  <img src="./assets/logo-name.png" style="width: 600px" />
</div>

---

## Get Started

Korok is a library for creating a system displayed by config configurable pages and components. Korok could make the pages and components be configured and arranged with the data which is provided by server or other storage units.

Background story: [配置化页面渲染系统设计和实践](https://www.yuque.com/iwillwen/exps/gtppty) (Chinese)

PS: The name ***Korok*** is inspired by the game ***The Legend of Zelda***.

## Why using Korok?

Korok is original built for a *Businese Analytics* project (like [Metabase](https://metabase.com)). The pages in this kind of project are always created by some math guys without any JavaScript skills. So we have to make the system easy to read and easy to edit.

So korok is created to make the front-end system like a LEGO project. We can build some common components for other guys to use and build the pages.

```json
// Configure
[
  { "key": "hello-card", "props": { "span": 2, "target": "Foo" } },
  { "key": "hello-card", "props": { "span": 1, "target": "Bar" } }
]

// Hello-card
+-------------------+
|                   |
|                   |
|  Hello ${target}  |
|                   |
|                   |
+-------------------+

// Render
+---------------------------+-------------------+
|                           |                   |
|                           |                   |
|         Hello Foo!        |    Hello Bar!     |
|                           |                   |
|                           |                   |
+---------------------------+-------------------+
```

## Installation

You can install Korok by [NPM](http://www.npmjs.com) or [Yarn](http://yarnpkg.com).

```shell
# NPM
$ npm install korok-core
# Yarn
$ yarn add korok-core
```

## Example

Simple React DEMO.

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import Korok from 'korok-core'

// Register Regular Prop
Korok.registerRegularProp('span', {
  description: 'Card width',
  default: 1
})

// Define a card named `hello-card`
class HelloCard extends React.Component {
  constructor(props) {
    super(props)
    this.korok = new Korok('hello-card').setProps(props)
  }

  render() {
    const span = this.korok.getProp('span') || 1
    const target = this.korok.getProp('target')

    return (
      <div className="hello-card" style={{ width: span * 150 + 'px' }}>
        Hello {target}!
      </div>
    )
  }
}

Korok.register('hello-card', HelloCard)
  .registerProp('target', {
    description: 'Target',
    default: 'World'
  })

// Page config loaded from server
const cardsConfig = [
  { "key": "hello-card", "props": { "span": 2, "target": "Foo" } },
  { "key": "hello-card", "props": { "span": 1, "target": "Bar" } }
]

// Rendering page
class App extends React.Component {
  render() {
    const cards = cardsConfig.map(({ key, props }, i) => {
      const Comp = Korok.get(key)

      if (!Comp) return null

      return (
        <Comp {...props} />
      )
    })

    return cards
  }
}

const rootElement = document.getElementById("root")
render(<App />, rootElement)
```

### Live DEMO

* [Korok with React](https://codesandbox.io/s/zwk34k36lp)
* [Korok with React and Navigation](https://codesandbox.io/s/xo0qxo9rvo)
* [Korok with Vue](https://codesandbox.io/s/4r040zmr9w)
* [Korok with ReactGridLayout](https://codesandbox.io/s/kko8p68jvo)

# License

Copyright (c) 2019 Will Wen Gunn(willwengunn@gmail.com)
All rights reserved.

MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.