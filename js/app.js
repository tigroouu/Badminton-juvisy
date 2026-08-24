(function () {
  "use strict";

  var ROUTES = [
    "accueil",
    "le-club",
    "nous-rejoindre",
    "creneaux",
    "competition",
    "jeunes",
    "services",
  ];
  var DEFAULT_ROUTE = "accueil";

  var views = {};
  var navLinks = {};

  ROUTES.forEach(function (id) {
    views[id] = document.getElementById(id);
  });
  document.querySelectorAll("[data-route]").forEach(function (link) {
    var route = link.getAttribute("data-route");
    (navLinks[route] = navLinks[route] || []).push(link);
  });

  function currentRoute() {
    var hash = window.location.hash.replace(/^#\/?/, "");
    return ROUTES.indexOf(hash) !== -1 ? hash : DEFAULT_ROUTE;
  }

  function render() {
    var route = currentRoute();

    ROUTES.forEach(function (id) {
      if (!views[id]) return;
      views[id].classList.toggle("active", id === route);
    });

    Object.keys(navLinks).forEach(function (route2) {
      navLinks[route2].forEach(function (link) {
        link.classList.toggle("active", route2 === route);
      });
    });

    var titles = {
      accueil: "Accueil",
      "le-club": "Le club",
      "nous-rejoindre": "Nous rejoindre",
      creneaux: "Créneaux",
      competition: "Compétition",
      jeunes: "Jeunes",
      services: "Services",
    };
    document.title =
      (titles[route] || "Accueil") + " — Les Volants de Juvisy";

    // Move focus to the new view's heading for accessibility, without
    // jumping the scroll position on first load.
    var heading = views[route] && views[route].querySelector("h1");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    }

    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });

    var nav = document.getElementById("mainNav");
    var toggle = document.getElementById("navToggle");
    if (nav && nav.classList.contains("open")) {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  }

  window.addEventListener("hashchange", render);
  window.addEventListener("DOMContentLoaded", function () {
    if (!window.location.hash) {
      window.location.hash = "#" + DEFAULT_ROUTE;
    }
    render();
    document.getElementById("year").textContent = new Date().getFullYear();
  });

  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
})();
