//------------------ MODEL

var model = {
	currentCat: null,
	
//object which contains array with cats objects	
	cats: [
		{
			clickCount: 0,
			name: 'Tabby',
			imgSrc: 'cat_picture1.jpg'		 
		},
		{
			clickCount: 0,
			name: 'Bobby',
			imgSrc: 'cat_picture2.jpeg'		 
		},
		{
			clickCount: 0,
			name: 'Tobby',
			imgSrc: 'cat_picture3.jpeg'		 
		},
		{
			clickCount: 0,
			name: 'Kobby',
			imgSrc: 'cat_picture4.jpeg'		 
		},
		{
			clickCount: 0,
			name: 'Fobby',
			imgSrc: 'cat_picture5.jpeg'		 
		}		
	]
};


//------------------ OCTOPUS

var octopus = {
	
//method that starts the entire application 
	 init: function() {

//sets the shown cat to the first one in the list 
		 model.currentCat = model.cats[0];
		 
//tells the views to initialize 
		 catListView.init();
		 catView.init();
	 },
	
//function to be called in the VIEW object to render CurrentCat 	
	getCurrentCat: function() {
		return model.currentCat;
	},
	
//function to be called in the VIEW object to render Cats
	getCats: function(){
		return model.cats; 
	},
	
//sets the selected cat to the cat-object passed in
	setCurrentCat: function(cat) {
		model.currentCat = cat;
	},

//increments the counter for the selected cat 
	incrementCounter: function() {
		model.currentCat.clickCount++;
		catView.render();
	}
};



//------------------ VIEW


//----- CAT VIEW

var catView = {

//function to initialize the cat's view, called only once
	init: function() {

//store pointers to the DOM to get easier access later
		this.catElem = document.getElementById('cat');
		this.catNameElem = document.getElementById('cat-name');
		this.catImageElem = document.getElementById('cat-img');
		this.counterElem = document.getElementById('cat-count');
//
		this.catImageElem.addEventListener('click', function(e) {
			octopus.incrementCounter();
		});

//update the view
		this.render();
		
	},
	
//update the DOM elements with values from current cat
	render:function(){
//get the current cat from the OCTOPUS, which gets it from the MODEL
		var currentCat = octopus.getCurrentCat();
//sets the count element, source and image to those from our current cat
		this.counterElem.textContent = currentCat.clickCount;
		this.catNameElem.textContent = currentCat.name;
		this.catImageElem.src = currentCat.imgSrc;
	},
};

//----- CATLIST VIEW

var catListView = {
	
//function to initialize the cat list's view, called only once
	init: function() {

//store the DOM element get easier access later
		this.catListElem = document.getElementById('cat-list');
		this.render();
	},
	
	render: function() {

//gets the cats we will be rendering from the octopus 
		var cats = octopus.getCats();

//empty the cat list 
		this.catListElem.innerHTML = ''; 
		
//loop over the cats 
		for (var i = 0; i < cats.length; i++) {
			
//the cat we are currently looping over 
			var cat = cats[i];
			
//make a new cat list item and set its text 
			var elem = document.createElement('li');
			elem.textContent = cat.name;
			
/* IF YOU ADD AN EVENT LISTENER INSIDE A FOR LOOP YOU NEED 
   TO CREATE A LARGER FUNCTION, PASS IN YOUR VARIABLE AND THAN 
   RETURN THE FUNCTION WHICH DOES THE STAFF THAT YOU WANT */
			
			
//on click, setCurrentCat and render the catView
//(this uses our closure-in-a-loop trick to connect the value  
// of the cat variable to the click event function)
			elem.addEventListener('click', (function(cat){
				return function() {
					octopus.setCurrentCat(cat);
					catView.render();
				};
			})(cat));
			
// finally, add the element to the list 
			this.catListElem.appendChild(elem);
		};
			
		
	}
	
};

octopus.init();





























