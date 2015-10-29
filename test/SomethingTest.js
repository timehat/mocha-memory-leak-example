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
