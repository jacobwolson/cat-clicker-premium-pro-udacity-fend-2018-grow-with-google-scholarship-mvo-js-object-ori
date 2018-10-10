// Model.
const model = {

  cats: [],

  Cat: function(name, image) {
    this.name = name;
    this.image = image;
    this.markup = `<div id=cat>
                  <div id="click-counter">0</div>
                  <p id="cat-name">${name}</p>
                  <img src="${image}">
                  </div>`;
    this.index = -1;
    this.inList = false;
  },

  catInfo: [
      ['Carrot', 'images/carrot-cat-pic-by-alexas_fotos-cc0.jpg'],
      ['Turtle', 'images/turtle-cat-pic-by-ilyessuti-cc0.jpg'],
      ['Ursa', 'images/ursa-cat-pic-by-amandad-cc0.jpg'],
      ['Cobra', 'images/cobra-cat-pic-by-rihaij-cc0.jpg'],
      ['Whiskers', 'images/whiskers-pic-by-kapa65-cc0.jpg'],
      ['Grus', 'images/grus-cat-pic-by-oldie-fan-cc0.jpg']
  ],

  makeCatsArray: function() {
    let i = 0;
    model.catInfo.forEach(function(c) {
      const newCat = new model.Cat(c[0], c[1]);
      model.cats.push(newCat);
      // Assign `index` property for use in `catDisplayView.attachCounter()`.
      newCat.index = i;
      i++;
    });
  }

};

// Octopus: a relay to connect, and a buffer between, the model and the views.
const octopus = {

  getCats: function() {
    return model.cats;
  },

  displayedCatIndex: -1,

  updateCats: function(a) {
    model.cats = a;
  },

  makeNewCat: function(name, image) {
    model.Cat(name, image);
  },

  init: function (callback) {
    model.makeCatsArray();
    catListView.makeList();
    addCatView.initFunctionality();
    callback();
  }

};

// Views: 1. `catlistView`, 2. `catDisplayView` and 3. `addCatView`.
const catListView = {

  makeList: function() {
    const catList = document.getElementById('cat-list-container');
    let nameText;
    octopus.getCats().forEach(function(c){
      if (c.inList == false) {
        const LI = document.createElement('li');
        nameText = document.createTextNode(c.name);
        LI.addEventListener('click', function() {
          catDisplayView.displayCat(c.markup, c.name);
          octopus.displayedCatIndex = c.index;
        });
        LI.appendChild(nameText);
        catList.appendChild(LI);
        c.inList = true;
      };
    });
  },

};

const catDisplayView = {

  displayCat: function(markup, name) {
    const catContainer = document.getElementById('cat-container');
    const resetText = document.getElementById('reset-button-container').getElementsByTagName('p').item(0);
    catContainer.innerHTML = markup;
    resetText.innerText = "Reset the click counter for " + name + ":";
    catDisplayView.attachCounter();
    catDisplayView.attachCounterResetButton();
  },

  attachCounter: function() {
    const catImage = document.getElementsByTagName('img').item(0);
    const clickCount = document.getElementById('click-counter');
    const catContainer = document.getElementById('cat-container');
    catImage.addEventListener('click', function() {
      clickCount.innerHTML++;
      // Resets markup of source cat object in order to save most current click count.
      octopus.getCats()[octopus.displayedCatIndex].markup = catContainer.innerHTML;
    });
  },

  attachCounterResetButton: function() {
    const clickCount = document.getElementById('click-counter');
    const resetButton = document.getElementById('reset-counter-button');
    resetButton.addEventListener('click', function() {
      clickCount.innerHTML = 0;
    });
  }

};

const addCatView = {

  initFunctionality: function() {
    const submitButton = document.getElementById('submit-button');
    submitButton.addEventListener('click', function(e) {
      const newCatName = document.getElementById('name-input').value;
      const newCatImageURL = document.getElementById('url-input').value;
      const newCat = new model.Cat(newCatName, newCatImageURL);
      const catsArray = octopus.getCats();
      newCat.index = catsArray.length;
      catsArray.push(newCat);
      octopus.updateCats(catsArray);
      catListView.makeList();
      document.getElementById('name-input').value = '';
      document.getElementById('url-input').value = '';
      alert("Welcome to the app " + newCatName + "!");
      e.preventDefault();
    });
  }

};

// Start the app!

/* Function that simulates click of first cat name in list after list loads to
* use as callback in `octopus.init()`.
*/
function displayFirstCat() {
  const firstListItem = document.getElementsByTagName('li').item(0);
  firstListItem.click();
};

octopus.init(displayFirstCat);
