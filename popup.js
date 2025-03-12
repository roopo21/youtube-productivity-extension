document.addEventListener("DOMContentLoaded", () => {
    const commentCheckbox = document.getElementById("blockComments");
    const shortsCheckbox = document.getElementById("blockShorts");
    const discoveryCheckbox = document.getElementById("blockDiscovery");
  
    // Load stored values and set checkboxes
    chrome.storage.local.get(["blockComments", "blockShorts", "blockDiscovery"], (settings) => {
      commentCheckbox.checked = settings.blockComments ?? false;
      shortsCheckbox.checked = settings.blockShorts ?? false;
      discoveryCheckbox.checked = settings.blockDiscovery ?? false;
    });
  
    // Update storage when checkboxes are toggled
    function updateStorage(setting, checkbox) {
      chrome.storage.local.set({ [setting]: checkbox.checked });
    }
  
    commentCheckbox.addEventListener("change", () => updateStorage("blockComments", commentCheckbox));
    shortsCheckbox.addEventListener("change", () => updateStorage("blockShorts", shortsCheckbox));
    discoveryCheckbox.addEventListener("change", () => updateStorage("blockDiscovery", discoveryCheckbox));
  });
  