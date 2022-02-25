(function() {
  console.log("Hello")
  var url = window.location.href.split('?')[0]
  
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  //browser.storage.managed.get('active').then(results => console.log(results))
  browser.storage.local.get(["active"]).then(results => {
    if(results.active) {
      console.log("Refrsh")
      window.location.reload(true);
    }
  })

  browser.runtime.onMessage.addListener((message) => {
    console.log(message.command)
    if (message.command === "reload") {
      console.log("YESSS")
      window.location.reload(true);
    }
  });


})();





