/* Uses ES6 class syntax to create a class / constructor function that is Then
* used to instantiate each cat object.
*/
class Cat {
    /* Cat object properties.
    */
    constructor(name, image) {
      this.name = name;
      this.image = image;
      this.markup = `<div id=cat>
                    <div id="click-counter">0</div>
                    <p id="cat-name">${name}</p>
                    <img src="${image}">
                    </div>`;
    }

    /* Method that implements the cat object's varied display states and
    * overall functionality.
    */
    implement() {
      /* Prepare the cat's name to be added to `cat-list` in the DOM.
      */
      const newListItem = document.createElement('li');
      const liText = document.createTextNode(this.name);
      let markupToDisplay = this.markup;
      newListItem.appendChild(liText);

        /* On click of cat name as it will appear in the `cat-list`, feature
        * selected cat in the app by displaying its name, image and click count
        * in the `cat-container` in the DOM — do this by seetting the paricular
        * cat object's `markUp` property as the inner HTML of `cat-container`.
        */
        newListItem.addEventListener('click', function() {
        const catContainer = document.getElementById('cat-container');
        const resetText = document.getElementById('reset-button-container').getElementsByTagName('p').item(0);
        catContainer.innerHTML = '';
        catContainer.innerHTML = markupToDisplay;

        /* On same click of cat name, make text above "Reset" button correspond
        * to selected cat.
        */
        const catName = document.getElementById('cat-name').innerText;
        resetText.innerText = "Reset the click counter for " + catName + ":";

        /* When selected — and now featured — cat's image is clicked, increment
        * cat's click count and update cat's `markup` property with the new
        * click count in case needed for future reference.
        */
        const catImage = document.getElementsByTagName('img').item(0);
        const clickCounter = document.getElementById('click-counter');
        function onClickOfCat() {
          return function() {
            clickCounter.innerHTML++;
            markupToDisplay = catContainer.innerHTML;
          };
        };
        catImage.addEventListener('click', onClickOfCat());
      });

    /* Add the cat name text node prepared above, with its attached
    * function, to the cat list.
    */
    document.getElementById('cat-list-container').appendChild(newListItem);
    };

}


/* "Reset" Click Count Button Functionality: on click of button, the click
* count for the currently selected and featured cat is set back to 0.
*/
document.getElementById('reset-counter-button').addEventListener('click', function () {
  document.getElementById('click-counter').innerHTML= 0;
});

/* Default Cats: instantiate default cat objects and add them to the app.
*/
let cats = [];

const carrot = new Cat ('Carrot', 'images/carrot-cat-pic-by-alexas_fotos-cc0.jpg');
cats.push(carrot);

const turtle = new Cat ('Turtle', 'images/turtle-cat-pic-by-ilyessuti-cc0.jpg');
cats.push(turtle);

const ursa = new Cat ('Ursa', 'images/ursa-cat-pic-by-amandad-cc0.jpg');
cats.push(ursa);

const cobra = new Cat ('Cobra', 'images/whiskers-pic-by-kapa65-cc0.jpg');
cats.push(cobra);

const whiskers =  new Cat ('Whiskers', 'images/cobra-cat-pic-by-rihaij-cc0.jpg');
cats.push(whiskers);

const grus = new Cat ('Grus', 'images/grus-cat-pic-by-oldie-fan-cc0.jpg');
cats.push(grus);

function implementCats() {
  cats.forEach(function(c) {
    c.implement();
  });
};

implementCats();


/* Add New Cat on "Submit": add a new cat to the app when user fills proper
* `input` fields and clicks the `submit-button`; welcome the new cat with a
* customized alert.
*/
const submitButton = document.getElementById('submit-button');

/* Use of `.value` property for grabbing `input` field values informed by a May
* 27, 2017, post by Peter Mortensen on Stack Overflow. Accessed Aug. 15, 2018.
* URL: https://stackoverflow.com/a/11563667
*
* Use of `e.preventDefault()` to get the submit button work for the purposes
* here without actually submitting a form inspired by a Jan. 21, 2018, post by
* Benjamin Gruenbaum on Stack Overflow.  Accessed Aug. 15, 2018.
* URL: https://stackoverflow.com/a/21263484.
*/
submitButton.addEventListener('click', function(e) {
  const newCatName = document.getElementById('name-input').value;
  const newCatImageURL = document.getElementById('url-input').value;
  const newCat = new Cat (newCatName, newCatImageURL);
  newCat.implement();
  alert("Welcome to the app " + newCatName + "!");
  e.preventDefault();
});

/* Initially Displayed Cat: when the DOM finishes loading, display the first cat
* in the `cats` array and hence the cat list in the `cat-container` `div`.
*/
window.addEventListener('DOMContentLoaded', function() {
  let firstListItem = document.body.getElementsByTagName('li').item(0);
  firstListItem.click();
});
