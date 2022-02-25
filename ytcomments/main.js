(function() {
  var chatElem = document.querySelector("#chat")
  if (chatElem !== null) {
    var pre = chatElem.querySelector("#scanninganimdiv")
    if (pre !== null) {
      chatElem.removeChild(pre);
    }
  }
  
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;
  
  if (chatElem !== null) {
      var chat = document.getElementById("chat")
      var div = document.createElement('div');
      div.id = 'scanninganimdiv';
      //div.innerHTML = '<p>CreateElement example</p>';
      div.style.position = 'absolute'
      div.style.backgroundColor = 'red'
      div.style.opacity = '0.5'
      //div.style.width = chat.offsetWidth
      div.style.width = '392px'
      div.style.height = '50px'
      div.setAttribute("anim-state", 0)
      chatElem.appendChild(div);
  }


  var comments = 0


  function myTimer() {


    var highlightedItems = document.querySelectorAll("ytd-comment-thread-renderer");
    console.log(highlightedItems.length)

    highlightedItems.forEach(function(comment) {
      if(comment.querySelector('.translatebutton') == null){
        var translate = document.createElement('button');
        translate.classList.add('translatebutton');
        translate.innerHTML = 'Translate';
        translate.style.display = 'inline-flex';
        translate.onclick = function(){
          var comment = this.parentElement.parentElement.querySelector('#content').querySelector('#content-text')
          var orig = comment.innerHTML.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')

          console.log(orig)

          var url = "https://api-free.deepl.com/v2/translate?auth_key=6b53c077-0a40-63b5-0d89-e847a23967c0:fx&text=" + encodeURIComponent(orig) + "&target_lang=DE"
          fetch(url)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Request failed with status ${reponse.status}`)
            }
            return response.json()
          })
          .then(data => {
            var country_code = data.translations[0].detected_source_language.toLowerCase()
            var flag = document.createElement('img');
            flag.src="https://flagcdn.com/16x12/" + country_code + ".png"
            flag.srcset="https://flagcdn.com/32x24/" + country_code + ".png 2x,https://flagcdn.com/48x36/" + country_code + ".png 3x"
            flag.width="16"
            flag.height="12"
            this.parentElement.parentElement.querySelector('#content').appendChild(flag)
            comment.innerHTML = country_code + '\n' + data.translations[0].text
          }).catch(error => console.log(error))

        };
        comment.querySelector('#header').appendChild(translate)
      }
    });

    if (chatElem !== null) {
        var anim = document.getElementById("scanninganimdiv")
        var animstate = anim.getAttribute("anim-state")
        anim.animate([
          { transform: 'translateY(0px)' },
          { transform: 'translateY(665px)' }
        ], {
          duration: 1000,
          iterations: 1,
          fill: "forwards",
          direction: animstate == 0 ? "normal" : "reverse",
          easing: "ease-in-out"
        });
        anim.setAttribute("anim-state", 1 - animstate)
        
        chat = document.getElementById("chat")
        chat.style.border = "5px solid red";
        
        var children = document.getElementById("chatframe").contentDocument.getElementsByTagName("yt-live-chat-text-message-renderer")
        for (var i = 0; i < children.length; i++) {
          var tableChild = children[i];
          if (tableChild.getAttribute("is-deleted") !== null) {
            var span = tableChild.querySelector("#content").querySelector("#message")
            
            //span.textContent = "| " + span.textContent + " |"
            tableChild.removeAttribute("is-deleted");
            span.style.color = 'red';
            
            tableChild.querySelector("#content").querySelector("#deleted-state").textContent = " [Restored]"
            
            browser.runtime.sendMessage({message:"numupdate", count: comments});
            comments += 1
          }
        }
    }
  }
  
  setInterval(myTimer, 2000)

  browser.runtime.onMessage.addListener((message) => {
    console.log(message.command)
    if (message.command === "beastify") {

    } else if (message.command === "reset") {
      myTimer();
    }
  });

})();





