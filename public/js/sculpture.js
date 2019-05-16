      (function () {
  var options = {
    minDelay: 300,
    maxDelay: 2000,
    responsive: true },

  h = new Infectagons(options);
  h.start();
})();
function Infectagons(opts) {
  opts = opts || {};
  this.options = {
    containerId: 'hex',
    minDelay: 250,
    maxDelay: 2000,
    infectionChance: 0.5,
    infectionChanceOnClick: 0.7,
    responsive: false,
    animateWhenVisible: false };

  for (var prop in this.options) {
    if (prop in opts) this.options[prop] = opts[prop];
  }
  this.container = document.getElementById(this.options.containerId);
  this.hexagon = document.createElement('div');
  this.col = document.createElement('div');
  this.hexagon.className = 'hexagon';
  this.col.className = 'col';
  this.numRows = 0;
  this.numCols = 0;
  this.start = function () {
    this.respond();
    if (this.options.responsive) window.onresize = this.handleResize.bind(this);
    this.transformProperty = this.getSupportedProp(['transform', 'MozTransform', 'WebkitTransform', 'msTransform', 'OTransform']);
    this.int = setTimeout(this.go.bind(this), this.getRandomInt(this.options.minDelay, this.options.maxDelay), true);
  };
  this.respond = function () {
    // TODO: Away with the hardcoded values!
    var rows = Math.ceil((this.container.offsetHeight + 100) / 120),
    cols = Math.ceil((this.container.offsetWidth + 100) / 94);
    if (cols !== this.cols || rows !== this.rows) {
      this.els = [];
      this.container.innerHTML = '';
      for (var i = 0; i < cols; i++) {if (window.CP.shouldStopExecution(0)) break;
        var col = this.col.cloneNode();
        for (var j = 0; j < rows; j++) {if (window.CP.shouldStopExecution(1)) break;
          var hexagon = this.hexagon.cloneNode();
          col.appendChild(hexagon);
          this.els.push(hexagon);
          hexagon.onclick = this.handleClick.bind(this);
        }window.CP.exitedLoop(1);
        this.container.appendChild(col);
      }window.CP.exitedLoop(0);
    }
  };
  this.handleClick = function (e) {
    var el = e.target,
    sibs = this.getAdjacentSiblings(el),
    els = sibs.concat(el);
    this.spin(el);
    for (var i = 0; i < els.length; i++) {if (window.CP.shouldStopExecution(2)) break;
      var r = Math.random();
      if (r < this.options.infectionChanceOnClick) this.animate(els[i]);
    }window.CP.exitedLoop(2);
  };
  this.handleResize = function (e) {
    this.respond();
  };
  this.go = function (r) {
    var i = this.getRandomInt(0, this.els.length),
    el = this.els[i];
    this.animate(el);
    if (r === true) setTimeout(this.go.bind(this), this.getRandomInt(this.options.minDelay, this.options.maxDelay), true);
  };
  this.animate = function (el) {
    var ch = Math.random(),
    cl = this.addClassTo(el);
    if (cl) el.t = setTimeout(this.removeClassFrom, 500, el);
    if (ch < this.options.infectionChance) {
      var s = this.getAdjacentSiblings(el),
      r = this.getRandomInt(0, s.length);
      this.spin(el);
      setTimeout(this.animate.bind(this), 50, s[r]);
    }
  };
  this.spin = function (el) {
    el.rotation = el.rotation + 60 || 60;
    el.style[this.transformProperty] = 'rotate(' + el.rotation + 'deg) translatez(0)';
  };
  this.addClassTo = function (el) {
    if (el.className.indexOf('highlight') === -1) {
      el.className += ' highlight';
      return true;
    } else {
      clearTimeout(el.t);
      el.t = setTimeout(this.removeClassFrom, 500, el);
      return false;
    }
  };
  this.removeClassFrom = function (el) {
    el.className = el.className.replace('highlight', '');
  };
  this.getAdjacentSiblings = function (el) {
    var ret = [],
    row = el.parentNode,
    isOdd = this.rowIsOdd(row),
    offset = isOdd ? -1 : 1,
    elIndex = this.getElIndex(el);
    if (el.previousSibling !== null) ret.push(el.previousSibling);
    if (el.nextSibling !== null) ret.push(el.nextSibling);
    if (row.previousSibling !== null && row.previousSibling.nodeName === 'DIV') {
      ret.push(row.previousSibling.childNodes[elIndex]);
      if (typeof row.previousSibling.childNodes[elIndex + offset] !== 'undefined')
      ret.push(row.previousSibling.childNodes[elIndex + offset]);
    }
    if (row.nextSibling !== null && row.nextSibling.nodeName === 'DIV') {
      ret.push(row.nextSibling.childNodes[elIndex]);
      if (typeof row.nextSibling.childNodes[elIndex + offset] !== 'undefined')
      ret.push(row.nextSibling.childNodes[elIndex + offset]);
    }
    return ret;
  };
  this.getElIndex = function (el) {
    var i = 0;
    while (el.previousSibling !== null) {if (window.CP.shouldStopExecution(3)) break;
      el = el.previousSibling;
      i++;
    }window.CP.exitedLoop(3);
    return i;
  };
  this.rowIsOdd = function (el) {
    var i = 0;
    while (el.previousSibling !== null) {if (window.CP.shouldStopExecution(4)) break;
      el = el.previousSibling;
      i++;
    }window.CP.exitedLoop(4);
    return i % 2 === 1;
  };
  this.getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  this.getSupportedProp = function (a) {
    var r = document.documentElement;
    for (var i = 0; i < a.length; i++) {if (window.CP.shouldStopExecution(5)) break;
      if (a[i] in r.style) return a[i];
    }window.CP.exitedLoop(5);
  };
}