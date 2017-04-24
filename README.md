_[Demo and API docs](https://owox.github.io/brainy-tree/)_

# &lt;brainy-tree&gt;

`brainy-tree` is a Polymer 1.x data tree web component.

A fork of [nuxeo-tree](https://www.webcomponents.org/element/nuxeo/nuxeo-ui-elements/nuxeo-tree) with some changes related to handling external data mutations, and some useful methods regarding common UX patterns like adding and deleting nodes.

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
            scope._onDeleteTap = function(e) {
              // get tree node from where delete was called
              var node = e.model.dataHost;
              var id = node.dataset.id;

              // get parent node
              var parent = tree.getParentById(id);

              // get path to given node
              var path = tree.getPathById('data', id);

              // get index for given node
              var index = tree.getChildNodeIndexById(parent, id);

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
    <!-- do not show expand icon for leaf nodes -->
    <span hidden$="[[isLeaf]]">
      <template is="dom-if" if="[[!opened]]">
        <iron-icon icon="hardware:keyboard-arrow-right" toggle></iron-icon>
      </template>
      <template is="dom-if" if="[[opened]]">
        <iron-icon icon="hardware:keyboard-arrow-down" toggle></iron-icon>
      </template>
    </span>
    <b>[[item.name]]</b>
    <!-- do not show remove icon for root node, which has ID "0" -->
    <paper-icon-button icon="clear" hidden$="[[!item.id]]" on-tap="_onDeleteTap"></paper-icon-button>
    <!-- only show input for leaf nodes -->
    <paper-input value="{{item.name}}" hidden$="[[!isLeaf]]"></paper-input>
  </template>
</brainy-tree>
```

## Features
- Collapsible tree re-rendering itself on outside data mutations
- The attribute `[toggle]` useful to toggle a node between opened and closed
- State management methods making easy opening branches
- Numeric ID system based on depth and children count 
