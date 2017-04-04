// Set up options for plugin invokation
var equalHeightsOptions = {
  elements: document.getElementsByClassName("price-comparison-table__content-container"),
  responsiveOptions: [{
    breakpointMin: 768,
    breakpointMax: 991,
    elementsPerRow: 2
  }]
};

window.addEventListener('resize', function(event) {
  // Invoke EQ heights on window resize
  equalHeights(equalHeightsOptions);
});

window.addEventListener('load', function(event) {
  // Invoke EQ heights on window load
  equalHeights(equalHeightsOptions);
});

function equalHeights(options) {

  // Initially reset height of all elements
  for (i = 0; i < options.elements.length; i++) {
    options.elements[i].style.minHeight = "";
  }

  // Get viewport width
  var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

  // Check if our current viewport width falls within the range of one of our responsive options
  for (i = 0; i < options.responsiveOptions.length; i++) {
    if (viewportWidth >= options.responsiveOptions[i].breakpointMin &&
       viewportWidth <= options.responsiveOptions[i].breakpointMax) {

      // Set variable for tallest element height
      var tallestElementHeight = 0,
          // Create empty chunked array variable
          elementsChunked = [],
          // Convert elements from HTMLCollection to array so it can be chunked
          elements = [].slice.call(options.elements);

      // Chunk the array by the amount of items per row so we can equalise only the ones next to eachother
      while (elements.length) {
        elementsChunked.push(elements.splice(0, options.responsiveOptions[i].elementsPerRow));
      }

      // Loop through all specified elements
      for (j = 0; j < elementsChunked.length; j++) {

        for (k = 0; k < elementsChunked[j].length; k++) {

          // If element's height is more than currently set tallestElementHeight variable, set it to that element's height
          if (elementsChunked[j][k].offsetHeight > tallestElementHeight) {
            tallestElementHeight = elementsChunked[j][k].offsetHeight;

            // Loop through all elements and set the height to the update tallesElementHeight
            for (l = 0; l < elementsChunked[j].length; l++) {
              elementsChunked[j][l].style.minHeight = tallestElementHeight + "px";
            }
          }
        }
      }

      // Break out of loop if we have found a responsive option which fits the viewport width we are currently on
      break;
    }
  }
}
