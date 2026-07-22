/* ============================================================
   HALO 2 PORTFOLIO — interaction logic
   ============================================================ */
(function () {
  "use strict";

  var boot    = document.getElementById("boot");
  var app     = document.getElementById("app");
  var audio   = document.getElementById("theme");
  var muteBtn = document.getElementById("muteBtn");
  var bgvid   = document.getElementById("bgvid");
  var items   = Array.prototype.slice.call(document.querySelectorAll(".menu-item"));
  var panels  = document.getElementById("content");
  var booted  = false;

  /* ---------- Boot: any key / click starts everything ---------- */
  function startApp() {
    if (booted) return;
    booted = true;

    boot.classList.add("fade-out");
    if (bgvid) bgvid.play().catch(function () {/* keeps poster */});
    audio.volume = 0.0;
    audio.play().then(fadeInAudio).catch(function () {/* autoplay blocked */});

    setTimeout(function () {
      boot.classList.remove("active");
      app.classList.add("active");
    }, 900);
  }

  function fadeInAudio() {
    var target = 0.55, step = 0.03;
    var iv = setInterval(function () {
      audio.volume = Math.min(target, audio.volume + step);
      if (audio.volume >= target) clearInterval(iv);
    }, 90);
  }

  window.addEventListener("keydown", function (e) {
    if (!booted) { startApp(); return; }
    handleNavKeys(e);
  });
  boot.addEventListener("click", startApp);

  /* ---------- Menu selection ---------- */
  function selectItem(idx) {
    idx = (idx + items.length) % items.length;
    var already = items[idx].classList.contains("active");

    items.forEach(function (it) {
      it.classList.remove("active");
      it.classList.remove("just-selected");
    });
    items[idx].classList.add("active");

    var target = items[idx].getAttribute("data-target");
    document.querySelectorAll(".panel").forEach(function (p) {
      p.classList.toggle("active", p.id === target);
    });
    panels.scrollTop = 0;

    if (!already) {
      // retrigger selection pulse + content flash animations
      void items[idx].offsetWidth;
      items[idx].classList.add("just-selected");
      panels.classList.remove("flash");
      void panels.offsetWidth;
      panels.classList.add("flash");
    }
  }

  function currentIndex() {
    for (var i = 0; i < items.length; i++)
      if (items[i].classList.contains("active")) return i;
    return 0;
  }

  // Click / keyboard select the section. Hover is purely visual (CSS :hover),
  // so the cursor-over animation stays distinct from the selection animation.
  items.forEach(function (it, i) {
    it.addEventListener("click", function () { selectItem(i); });
  });

  /* ---------- Keyboard navigation ---------- */
  function handleNavKeys(e) {
    var i = currentIndex();
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault(); selectItem(i + 1); break;
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault(); selectItem(i - 1); break;
      case "Home":
        e.preventDefault(); selectItem(0); break;
      case "End":
        e.preventDefault(); selectItem(items.length - 1); break;
    }
  }

  /* ---------- Audio mute toggle ---------- */
  muteBtn.addEventListener("click", function () {
    audio.muted = !audio.muted;
    muteBtn.classList.toggle("muted", audio.muted);
    if (!audio.muted && audio.paused) audio.play().catch(function () {});
  });
})();
