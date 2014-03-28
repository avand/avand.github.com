window.addEventListener("load", function() {
  var technologiesParagaphs = document.querySelectorAll(".technologies");

  for (var i = 0; i < technologiesParagaphs.length; i++) {
    var technologiesParagaph = technologiesParagaphs[i],
        technologies = technologiesParagaph.textContent.replace(/\n/g, "").split(", ");

    technologiesParagaph.textContent = "";

    technologies.forEach(function(technology) {
      var span = document.createElement("span");
      span.textContent = technology.trim();
      span.classList.add("technology");
      technologiesParagaph.appendChild(span);
    })
  }
})
