window.demoData = {
  name: 'root',
  children: [
    {
      name: 'a',
      children: [
        {
          name: 'c',
          children: [
            { name: 'foo' },
            { name: 'bar', children: [{ name: 'baz' }] }
          ]
        }
      ]
    },
    {
      name: 'b',
      children: [{ name: 'bee' }]
    }
  ]
};
