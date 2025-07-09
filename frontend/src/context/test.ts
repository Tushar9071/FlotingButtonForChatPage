(function() {
  function test(num: number) {
    console.log('Test called with:', num);
  }

  (window as any).test = test;
})();
