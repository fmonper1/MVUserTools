var browser = chrome;

browser.storage.local.get(
  [
    "ignoredUsers",
    "checkboxHidePosts",
    "checkboxHideThreads",
    "checkboxFixNightWolf",
    "checkboxFavouritesHomepage"
  ],
  function(result) {
    ignoredUsers.value = result.ignoredUsers;
    checkboxHidePosts.checked = result.checkboxHidePosts;
    checkboxHideThreads.checked = result.checkboxHideThreads;
    checkboxFixNightWolf.checked = result.checkboxFixNightWolf;
    checkboxFavouritesHomepage.checked = result.checkboxFavouritesHomepage;
  }
);

document.getElementById("ignoredUsers").onchange = function() {
  browser.storage.local.set({ ignoredUsers: ignoredUsers.value });
};

document.getElementById("checkboxFavouritesHomepage").onchange = () => {
  browser.storage.local.set({
    checkboxFavouritesHomepage: checkboxFavouritesHomepage.checked
  });
};

document.getElementById("checkboxHidePosts").onchange = function() {
  browser.storage.local.set({ checkboxHidePosts: checkboxHidePosts.checked });
};
document.getElementById("checkboxHideThreads").onchange = function() {
  browser.storage.local.set({
    checkboxHideThreads: checkboxHideThreads.checked
  });
};

document.getElementById("checkboxFixNightWolf").onchange = function() {
  browser.storage.local.set({
    checkboxFixNightWolf: checkboxFixNightWolf.checked
  });
};

document.getElementsByTagName("button")[0].addEventListener("click", () => {
  console.log("click");
  chrome.tabs.query({ url: "*://*.mediavida.com/*" }, function(tabs) {
    tabs.map(tab => chrome.tabs.reload(tab.id));
  });
});
