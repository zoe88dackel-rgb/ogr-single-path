(function () {
  'use strict';

  function money(n) {
    if (!isFinite(n)) return '—';
    return '¥' + Math.round(n).toLocaleString('zh-CN');
  }

  function num(id) {
    var el = document.getElementById(id);
    if (!el) return 0;
    var v = parseFloat(el.value);
    return isFinite(v) ? v : 0;
  }

  function calc() {
    if (!document.getElementById('price')) return;

    var price = num('price');
    var cost = num('cost');
    var qty = num('qty') || 1;
    var liters = num('liters') || 1;

    var freight = liters * 1.79 * qty;
    var clearance = 1600;
    var warehouse = 0.98 * qty;
    var insurance = price * qty * 0.0009;
    var tariff = price * qty * 0.1;
    var commission = price * qty * 0.08;
    var vatShare = price * qty * (22 / 122);

    var b2b = freight + clearance + warehouse + insurance + tariff;
    var revenue = price * qty;
    var cogs = cost * qty;
    var profit = revenue - cogs - b2b - commission;
    var perUnit = profit / qty;
    var margin = revenue ? (profit / revenue) * 100 : 0;

    function set(id, text) {
      var el = document.getElementById(id);
      if (el) el.textContent = text;
    }

    set('out-profit', money(profit));
    set('out-unit', money(perUnit));
    set('out-margin', (isFinite(margin) ? margin.toFixed(1) : '—') + '%');
    set('out-b2b', money(b2b));
    set('out-commission', money(commission));
    set('out-vat', money(vatShare));
  }

  ['price', 'cost', 'qty', 'liters'].forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', calc);
    el.addEventListener('change', calc);
  });
  calc();
})();
