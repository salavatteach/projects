!function() {
  let s = document.getElementById("tasks"),
      e = document.getElementById("egor"),
      p = document.getElementById("monisensa"),         // ← новый таб
      t = document.getElementById("tasksBlock"),
      l = document.getElementById("egorBlock"),
      pr = document.getElementById("monisensaBlock"),   // ← новый блок
      i = document.getElementById("burger"),
      o = document.getElementById("sidebar"),
      c = document.getElementById("overlay"),
      d = document.getElementById("body");

  s.onclick = function() {
    s.classList.add("active");
    e.classList.remove("active");
    p.classList.remove("active");

    t.classList.remove("hidden");
    l.classList.add("hidden");
    pr.classList.add("hidden");

    o.classList.remove("show");
    c.classList.remove("show");
  };

  e.onclick = function() {
    s.classList.remove("active");
    e.classList.add("active");
    p.classList.remove("active");

    t.classList.add("hidden");
    l.classList.remove("hidden");
    pr.classList.add("hidden");

    o.classList.remove("show");
    c.classList.remove("show");
  };

  p.onclick = function() {
    s.classList.remove("active");
    e.classList.remove("active");
    p.classList.add("active");

    t.classList.add("hidden");
    l.classList.add("hidden");
    pr.classList.remove("hidden");

    o.classList.remove("show");
    c.classList.remove("show");
  };

  i.onclick = function() {
    d.classList.toggle("overflow");
    c.classList.toggle("show");
    o.classList.toggle("show");
  };
}();
