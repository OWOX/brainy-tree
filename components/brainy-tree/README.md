[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/OWOX/brainy-tree)

_[Demo and API docs](https://owox.github.io/brainy-tree/)_

# &lt;brainy-tree&gt;

`brainy-tree` is a Polymer 1.x data tree web component.

**WIP!** I'm still working on this and API may change significantly!
Use this at your own risk. Any help, especially with tests, is strongly appreciated!

This is a fork of [nuxeo-tree](https://www.webcomponents.org/element/nuxeo/nuxeo-ui-elements/nuxeo-tree)
with a lot of changes regarding common UX patterns like adding and deleting nodes.

<!--
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="../paper-icon-button/paper-icon-button.html">
    <link rel="import" href="../paper-input/paper-input.html">
    <link rel="import" href="../iron-icon/iron-icon.html">
    <link rel="import" href="../iron-icons/hardware-icons.html">
    <link rel="import" href="../iron-icons/iron-icons.html">
    <link rel="import" href="brainy-tree.html">
    <script src="demo/data.js"></script>
    <style is="custom-style">
      [toggle] {
        cursor: pointer;
      }
    </style>
    <div>
      <template is="dom-bind">
        <next-code-block></next-code-block>
      </template>
      <script>
        (function() {
          'use strict';

          document.addEventListener('WebComponentsReady', function() {
            var scope = document.querySelector('template[is="dom-bind"]');
            var tree = document.querySelector('brainy-tree');
            scope.data = window.demoData;
            scope.prefix = 'Node ';
            scope._onAddTap = function(e) {
              // get tree node from where event was fired
              var id = e.model.dataHost.dataset.id;
              var node = tree.getNodeById(id);

              // get path to given node
              var path = tree.getPathForNode('data', node);

              // if node is a leaf, initialize children array
              if (!node.children) {
                scope.set(path, []);
              }

              // add a node in a data-binding-aware way
              scope.push(path, {
                name: 'child of ' + node.name,
                children: []
              });
            };
            scope._onDeleteTap = function(e) {
              // get ID of tree node from where event was fired
              var id = e.model.dataHost.dataset.id;

              // get parent node
              var parent = tree.getParentNodeById(id);

              // get path to parent node
              var path = tree.getPathForNode('data', parent);

              // get index for given node
              var index = tree.getChildIndexById(parent, id);

              // remove that node in a data-binding-aware way
              scope.splice(path, index, 1);
            };
          });
        })();
      </script>      
    </div>
  </template>
</custom-element-demo>
```
-->
```html
<brainy-tree data="[[data]]">
  <template>
    <span>[[prefix]] [[item.id]]:</span>
    <b>[[item.name]]</b>
    <!-- do not show remove icon for root node -->
    <paper-icon-button icon="clear" hidden$="[[isRoot]]" on-tap="_onDeleteTap"></paper-icon-button>
    <paper-icon-button icon="add" on-tap="_onAddTap"></paper-icon-button>
    <!-- only show input for leaf nodes -->
    <paper-input value="{{item.name}}" hidden$="[[!isLeaf]]"></paper-input>
  </template>
</brainy-tree>
```

## Template model

Tree node template is bound to template model of the following structure:
```js
{
  item: {},        // data for given node
  isRoot: false,   // true if node is a tree root
  isLeaf: false,   // true if node does not have children
  isFirst: false,  // true if node is a first child
  isLast: false,   // true if node is a last child
  siblingsCount: 0 // count of nodes at the same level
}
```

For example, the live demo above uses the following `data` object:

### data.json
```json
{
  "name": "root",
  "children": [
    {
      "name": "a",
      "children": [
        {
          "name": "c",
          "children": [
            { "name": "foo" },
            { "name": "bar", "children": [{ "name": "baz" }] }
          ]
        }
      ]
    },
    {
      "name": "b",
      "children": [{ "name": "bee" }]
    }
  ]
}
```

## Features
- The template represents the DOM to create for the nodes
- The `data` property specifies the model of a tree node
- Branches are re-rendered on external `data` mutations
- Tree node ID system based on depth and children count


## Warning
`brainy-tree` maintains node ID system based on depth and children count. Current behavior is mutating data
and setting `id` property on each node. Initially I tried to maintain duplicate inner data structure in sync,
but this was a bit tricky. But I'm going to refactor this behavior later on, as well as add tests for element.
