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

    var set = function (id, text) {
      var el = document.getElementById(id);
      if (el) el.textContent = text;
    };

    set('out-profit', money(profit));
    set('out-unit', money(perUnit));
    set('out-margin', (isFinite(margin) ? margin.toFixed(1) : '—') + '%');
    set('out-b2b', money(b2b));
    set('out-commission', money(commission));
    set('out-vat', money(vatShare));
  }

  ['price', 'cost', 'qty', 'liters'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', calc);
      el.addEventListener('change', calc);
    }
  });
  if (document.getElementById('price')) calc();

  var boxes = Array.prototype.slice.call(document.querySelectorAll('[data-gate]'));
  var nextBtn = document.getElementById('gate-next');
  var gateMsg = document.getElementById('gate-msg');

  function syncGate() {
    if (!boxes.length || !nextBtn || !gateMsg) return;
    var blocked = boxes.some(function (box) {
      return box.dataset.gate === 'block' && box.checked;
    });
    var ready = boxes.filter(function (box) {
      return box.dataset.gate === 'need';
    }).every(function (box) {
      return box.checked;
    });

    gateMsg.classList.add('show');
    if (blocked) {
      gateMsg.classList.add('bad');
      gateMsg.textContent = '你勾选了暂不适合 / 禁止类目。先换品或书面确认，再继续测算。';
      nextBtn.setAttribute('aria-disabled', 'true');
      nextBtn.classList.add('is-disabled');
      nextBtn.href = '#gate-msg';
      return;
    }
    gateMsg.classList.remove('bad');
    if (ready) {
      gateMsg.textContent = '主体与商品初筛通过。下一步只算「这票货值不值得」，不再重复讲准入。';
      nextBtn.removeAttribute('aria-disabled');
      nextBtn.classList.remove('is-disabled');
      nextBtn.href = 'step-2.html';
    } else {
      gateMsg.textContent = '勾选必备项后，才能进入测算。禁止/暂不接收项请保持不勾选。';
      nextBtn.setAttribute('aria-disabled', 'true');
      nextBtn.classList.add('is-disabled');
      nextBtn.href = '#gate-msg';
    }
  }

  boxes.forEach(function (box) {
    box.addEventListener('change', syncGate);
  });
  syncGate();

  if (nextBtn) {
    nextBtn.addEventListener('click', function (e) {
      if (nextBtn.getAttribute('aria-disabled') === 'true') e.preventDefault();
    });
  }
})();
