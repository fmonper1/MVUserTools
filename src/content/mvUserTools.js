let isFirefox =
  navigator.userAgent.indexOf("Firefox") !== -1 ||
  navigator.userAgent.indexOf("Gecko/") !== -1;
let isChromium = window.chrome;
let browser = isChromium ? chrome : browser;
window.addEventListener("load", () => {
  console.log(browser);
});

document.addEventListener("DOMContentLoaded", event => {
  console.log(browser);
});

browser.storage.local.get(
  [
    "ignoredUsers",
    "checkboxHidePosts",
    "checkboxHideThreads",
    "checkboxFixNightWolf",
    "checkboxFavouritesHomepage"
  ],
  function(userSettings) {
    // Ocultar posts
    if (userSettings.checkboxHidePosts) {
      let x = document.querySelectorAll(".cf.post");
      let postContainer = document.getElementById("posts-wrap");
      for (let i = 0; i < x.length; i++) {
        if (userSettings.ignoredUsers.includes(x[i].dataset.autor)) {
          let postNumber = x[i].dataset.num;
          let hiddenGroup = document.createElement("div");
          hiddenGroup.classList.add("moderated-group");
          let a = document.createElement("a");
          a.setAttribute("name", `${i + 1}`);
          // let a = $('<a name="' + i + 1 + '" class="name-pad"></a>');
          let hiddenPostCard = document.createElement("div");
          hiddenPostCard.classList.add("post", "info");
          hiddenPostCard.innerHTML = `<div class="post-meta"><a href="#${postNumber}" class="qn">#${postNumber}</a><div class="post-body"><div class="locked-msg"><a class="post-btn hiddenmsg" href="#post-${postNumber}"><i class="fa fa-flag"></i> Has ocultado este post de <b>${postNumber}</b>. Pulsa para mostrar el post</a></div></div></div>`;
          console.log("hiddenPostCard", hiddenPostCard);
          // let hiddenPostCard = $('<div class="post info"><div class="post-meta"><a href="#' + postNumber + '" class="qn">#' + postNumber + '</a><div class="post-body"><div class="locked-msg"><a class="post-btn hiddenmsg" href="#post-' + postNumber + '"><i class="fa fa-flag"></i> Has ocultado este post de <b>' + x[i].dataset.autor + '</b>. Pulsa para mostrar el post</a></div></div></div></div>');
          x[i].classList.add("locked");
          hiddenGroup.appendChild(a);
          hiddenGroup.appendChild(hiddenPostCard);
          // hiddenGroup.insertBefore(x[i]);
          console.log(x[i]);
          postContainer.insertBefore(hiddenGroup, x[i]);
        }
      }
    }

    if (userSettings.checkboxFavouritesHomepage) {
      document.querySelector(".f2 a").click();
      document.querySelector(".f2 a").click();
      let favourites = document.querySelector(".f2 .flyout");
      let sidebar = document.querySelector(".c-side");
      let fragment = document.createDocumentFragment();
      fragment.appendChild(favourites);
      // console.log(favourites, sidebar, sidebar.querySelector(".b-side"));
      sidebar.insertBefore(fragment, sidebar.querySelector(".b-side"));
      // Ocultar hilos
      if (userSettings.checkboxHideThreads) {
        let threads = document.getElementsByClassName("tooltip-left");
        for (let i = 0; i < threads.length; i++) {
          let nombreUsuario = threads[i].href.split("/");
          nombreUsuario = nombreUsuario[nombreUsuario.length - 1];
          if (userSettings.ignoredUsers.includes(nombreUsuario)) {
            threads[i].parentNode.parentNode.style.display = "none";
          }
        }
      }
    }

    // Misc
    // Fix nick Nightwolf

    if (userSettings.checkboxFixNightWolf) {
      let autores = document.getElementsByClassName("autor user-card");
      for (let i = 0; i < autores.length; i++) {
        let userURL = autores[i].href.split("/");
        let username = userURL[userURL.length - 1];
        if (username === "NigthWolf") {
          autores[i].textContent = "NightWolf";
        }
      }
    }
  }
);
