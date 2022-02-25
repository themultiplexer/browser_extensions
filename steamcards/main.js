(function() {
  console.log("Hello")
  var url = window.location.href.split('?')[0]
  
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  if(url.endsWith("badges/") || url.endsWith("badges")) {
    var sheet = document.querySelector(".badges_sheet")
    var rows = sheet.querySelectorAll(".badge_row.is_link")

    rows.forEach(function(row) {
      console.log("processing")
      var link = row.querySelector(".badge_row_overlay").href

      if(link.includes("gamecards")){
        console.log("Hm?")
        fetch(link).then(response => {
          if (!response.ok) {
            throw new Error(`Gamecards request failed with status ${reponse.status}`)
          }
          return response.text()
        })
        .then(data => {
          var parser = new DOMParser();
          var doc = parser.parseFromString(data, 'text/html');

          var buy_link = Array.from(doc.querySelectorAll(".btn_grey_grey.btn_medium")).find(element => element.innerText.includes("Buy")).href
          console.log(buy_link)

          fetch(buy_link).then(response => {
            if (!response.ok) {
              throw new Error(`Request buy_link failed with status ${reponse.status}`)
            }
            return response.text()
          }).then(buy_data => {
            var new_parser = new DOMParser();
            var new_doc = new_parser.parseFromString(buy_data, 'text/html');
            console.log("Got new doc")

            var table = new_doc.querySelector(".market_multi_table").tBodies[0]
            console.log("Got Table")

            var total = 0.0
            table.querySelectorAll('tr').forEach(buy_row => {
              var qty = buy_row.querySelector(".market_dialog_input.market_multi_quantity").value
              var price = buy_row.querySelector(".market_dialog_input.market_multi_price").value

              if(qty == 1) {
                total += parseFloat(price.replace(",", ".").replace("€", ""))
              }
              
            })

            //var price = new_doc.querySelector("#market_multibuy_order_total").innerText //Calulated by script
            console.log("Got price")

            if(row.querySelector('.price') == null){
              var translate = document.createElement('p');
              translate.classList.add('price');
              translate.innerHTML = total.toFixed(2) + "€";
              row.appendChild(translate)
            }

          }).catch(error => console.log(error))

          
        }).catch(error => console.log(error))


        return
      }


    })


  } else {
    console.log("Noooo");
  }

  //

})();





