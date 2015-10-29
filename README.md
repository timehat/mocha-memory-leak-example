# mocha-memory-leak-example

```
npm install
```

Open "test.html" in Chrome. Take a Heap Snapshot. See this:
![Screenshot of memory leak](/heap-snapshot-leaking.png "Heap Snapshot")

Test file is this:
```
function MemoryLeak() {}

describe('Something', function () {
  var leakMe;

  beforeEach(function () {
    leakMe = new MemoryLeak();
  });

  it('should do something', function () {
    leakMe.isLeaked = true;
  });
});
```

"leakMe" is leaked here because mocha keeps a pointer to the function passed into "it". The function's scope has reference to "leakMe", which is not cleaned up after running the test. In the case where "leakMe" is a large object, browser memory consumption grows.

One solution (though tedious) would be to add the following to the test file:

```
  afterEach(function () {
    leakMe = undefined;
  });
```

Which allows the object to now be garbage collected.

![Screenshot of memory leak cleaned up](/heap-snapshot-clean.png "Clean Heap Snapshot")
