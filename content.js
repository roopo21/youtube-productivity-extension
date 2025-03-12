// Load settings and apply them
chrome.storage.local.get(["blockComments", "blockShorts", "blockDiscovery"], (settings) => {
    console.log("Loaded settings:", settings);
  
    if (!settings || Object.keys(settings).length === 0) {
      const defaultSettings = {
        blockComments: false,
        blockShorts: false,
        blockDiscovery: false
      };
      
      chrome.storage.local.set(defaultSettings, () => {
        console.log("Default settings applied:", defaultSettings);
        removeElements(defaultSettings); // Apply immediately
      });
  
    } else {
      removeElements(settings);
    }
  });
  
  function removeElements(settings) {
    if (!settings) return;

    document.querySelectorAll("#comments").forEach(el => {
      el.style.display = settings.blockComments ? "none" : "";
    });
  
    document.querySelectorAll("ytd-reel-shelf-renderer").forEach(el => {
      el.style.display = settings.blockShorts ? "none" : "";
    });
  
    document.querySelectorAll("ytd-rich-grid-renderer, ytd-two-column-browse-results-renderer, ytd-watch-next-secondary-results-renderer").forEach(el => {
      if (settings.blockDiscovery) {
        el.style.opacity = "0"; 
        el.style.pointerEvents = "none"; 
      } else {
        el.style.opacity = ""; 
        el.style.pointerEvents = ""; 
        el.removeAttribute("style"); 
      }
    });
  }
  
  // Observe YouTube's DOM changes
  const observer = new MutationObserver(() => {
    chrome.storage.local.get(["blockComments", "blockShorts", "blockDiscovery"], (settings) => {
      removeElements(settings);
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
  
  // storage changes
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local") {
      chrome.storage.local.get(["blockComments", "blockShorts", "blockDiscovery"], (settings) => {
        console.log("Settings updated:", settings);
        removeElements(settings);
      });
    }
  });
  