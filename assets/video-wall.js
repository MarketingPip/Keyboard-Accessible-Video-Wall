/* Keyboard accesible video wall - built by https://github.com/MarketingPipeline
Built for Estuary - a HTML / CSS / JS design framework inspired by the default Kodi Theme

*/ 


function setLibaryInfo(elem){
  
        fetch_tmdb_info(elem.getAttribute('value'), elem.getAttribute('type'), 1).then(function(search_results) {
          if (search_results.tmdb_api_error){
            document.getElementById("title").innerHTML = elem.getAttribute('value')
              document.getElementById("description").innerHTML = "No info found"
          } else{
            if (elem.getAttribute('type') === "tv"){
                document.getElementById("title").innerHTML = search_results[0][0].name    
            } 
           if (elem.getAttribute('type') === "movie"){
                document.getElementById("title").innerHTML = search_results[0][0].title  
            } 
            
   document.getElementById("description").innerHTML = search_results[0][0].overview
          
          }
            //
  });
}



let focusedTab = 0;

function updateTabFocus() {
  // Give each tab an index of -1 so that it cannot be focused by normal means (e.g. with the 'tab' key).
  for (const tab of elementsArray) {
    tab.setAttribute("tabindex", -1);
  }
  // Give only the currently focused tab an index of 0 so that it can be navigated to with the 'tab' key, and from there its siblings can be focused with the arrow keys.
  elementsArray[focusedTab].querySelector("img").setAttribute("tabindex", 0);
  elementsArray[focusedTab].querySelector("img").focus();
}

function handleTabListKeydown(event) {
  const key = event.key;
  const tabs = elementsArray
  if (key === "ArrowRight" || key === "ArrowLeft") {
    if (key === "ArrowRight") {
      focusedTab++;
      // We have gone past the end, wrap around to the start
      if (focusedTab >= tabs.length) {
        focusedTab = 0;
      }
    } else if (key === "ArrowLeft") {
      focusedTab--;
      // We have gone before the start, wrap around to the end
      if (focusedTab < 0) {
        focusedTab = tabs.length - 1;
      }
    }
    updateTabFocus();
  }
}


// function to get the current element # 
function getElementIndex(el) {
  return [...el.parentElement.children].indexOf(el);
}



// handle keydown / mouse over and more 
elementsArray.forEach(function(elem) {

  
     // allow keyboard presses - left and right
     elem.addEventListener('keydown', (event) => {handleTabListKeydown(event)});
   
 // on focus (tab over / left and right keyboard)
     elem.querySelector("img").addEventListener( "focus", function() {
   setLibaryInfo(elem)
         // reset the tab index
      focusedTab = getElementIndex(elem)
       updateTabFocus();
         });
    elem.addEventListener( "click", function() {
    setLibaryInfo(elem)
      // reset the tab index
      focusedTab = getElementIndex(elem)
       updateTabFocus();
    });
  // no need to reset the tab index - but needed to allow focus
    elem.addEventListener( "mouseover", function() {
    setLibaryInfo(elem)
      
  
    });
});
