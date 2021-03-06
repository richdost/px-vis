document.addEventListener("WebComponentsReady", function() {
  runTests();
});

function runTests(){
  suite('px-vis-zoom does Polymer exist?', function() {
    test('Polymer exists', function() {
      assert.isTrue(Polymer !== null);
    });
  });

  suite('px-vis-zoom baseZoom setup works', function() {
    var baseSVG = document.getElementById('baseSVG'),
        baseZoom = document.getElementById('baseZoom');

    suiteSetup(function(){
      var w = 500,
        h = 300,
        m = {
          "top": 10,
          "right": 5,
          "bottom": 20,
          "left": 15
        };

      baseSVG.set('width',w);
      baseSVG.set('height',h);
      baseSVG.set('margin',m);

      baseZoom.set('margin',m);
    });

    test('baseZoom fixture is created', function() {
      assert.isTrue(baseZoom !== null);
    });
    test('reset button is shown', function() {
      assert.isTrue(baseZoom.$.resetBtn.classList.contains('hidden'));
    });
  }); //suite

  suite('px-vis-zoom baseZoom extentsData added', function() {
    var baseSVG = document.getElementById('baseSVG'),
        baseZoom = document.getElementById('baseZoom');
    var eventObj = null;

    suiteSetup(function(done){
      var d = {
        "eX": [10, 52],
        "eY": [0, 10]
      };

      document.addEventListener('px-vis-selected-domain-updated',function(evt){
        eventObj = evt.detail;
      });

      baseZoom.set('extentsData',d);

      setTimeout(function(){ done() },10);
      // done();
    });

    test('event fired', function() {
      assert.isTrue(eventObj !== null);
    });
    test('event dataVar', function() {
      assert.equal(eventObj.dataVar, 'selectedDomain');
    });
    test('event method', function() {
      assert.equal(eventObj.method, 'set');
    });
    test('event data exists and is an object', function() {
      assert.equal(typeof(eventObj.data),'object');
    });
    test('event data.x exists and is an array', function() {
      assert.isTrue(Array.isArray(eventObj.data.x));
    });
    test('event data.y exists and is an array', function() {
      assert.isTrue(Array.isArray(eventObj.data.y));
    });
    test('event data exists and matches expected', function() {
      assert.equal(eventObj.data.x[0],10);
      assert.equal(eventObj.data.x[1],52);
    });
    test('reset button is shown', function() {
      assert.isFalse(baseZoom.$.resetBtn.classList.contains('hidden'));
    });
    // test('reset button is positioned correctly - left', function() {
    //   console.warn(baseSVG.$$('svg').getBoundingClientRect());
    //   console.warn(baseSVG.svg.node().parentNode.getBoundingClientRect());
    //   var left = baseSVG.$$('svg').getBoundingClientRect().right - 125;
    //   assert.equal(baseZoom.$.resetBtn.style.left, left);
    // });
    // test('reset button is positioned correctly - top', function() {
    //   var top = baseSVG.$$('svg').getBoundingClientRect().top + 20;
    //   assert.equal(baseZoom.$.resetBtn.style.top, top);
    // });
  }); //suite

  suite('px-vis-zoom baseZoom reset button clicked', function() {
    var baseSVG = document.getElementById('baseSVG'),
        baseZoom = document.getElementById('baseZoom');
    var eventObj = null;

    suiteSetup(function(done){
      document.addEventListener('px-vis-selected-domain-updated',function(evt){
        eventObj = evt.detail;
      });

      //can't use new MouseEvent cause IE
      var e = document.createEvent("MouseEvent");
      e.initMouseEvent("click",true,true,window,0,0,0,0,0,false,false,false,false,0,null);
      baseZoom.$.resetBtn.dispatchEvent(e);

      // give event time to process and fire
      setTimeout(function(){ done(); },100);
    });

    test('event fired', function() {
      assert.isTrue(eventObj !== null);
    });
    test('event dataVar', function() {
      assert.equal(eventObj.dataVar, 'selectedDomain');
    });
    test('event method', function() {
      assert.equal(eventObj.method, 'set');
    });
    test('event data exists and is a string', function() {
      assert.equal(typeof(eventObj.data),'string');
    });
    test('event data exists and matches expected', function() {
      assert.equal(eventObj.data,'reset');
    });
    test('reset button is hidden', function() {
      assert.isTrue(baseZoom.$.resetBtn.classList.contains('hidden'));
    });
  }); //suite

} //runTests
