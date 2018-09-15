// ***********************
// Map  Module
// ***********************

var mapModule = (function() {

})();


// ***********************
// Data Input Module
// ***********************


var dataModule = (function() {

    // Function constructor for listings

    var Listing = function(name, year, sqFt, heating, price, bedCount, bathCount, garage) {
        this.name = name;
        this.year = year;
        this.sqFt = sqFt;
        this.heating = heating;
        this.price = price;
        this.bedCount = bedCount;
        this.bathCount = bathCount;
        this.garage = garage;
    };

    // collect input data from fields

    // store field data

    return {

        newListing: function(name, year, sqFt, heating, price, bedCount, bathCount, garage) {
            newHome = new Listing(name, year, sqFt, heating, price, bedCount, bathCount, garage);

            return newHome;
        }

    };

})();


// ***********************
// UI Module
// ***********************

var UIModule = (function() {

    var DOMstrings = {
        inputName: '.input__name',
        inputYear: '.input__year',
        inputSquare: '.input__sqFt',
        inputHeating: '.input__heating',
        inputPrice: '.input__price',
        inputBedrooms: '.input__room-count',
        inputBathrooms: '.input__bath-count',
        inputGarage: '.input__garage',
        inputBtn: '.input__add-btn',
        listingContainer: '.list__container'
    };

    // update UI to show added listing

    return {

        listingInput: function() {
            return {
                name: document.querySelector(DOMstrings.inputName).value,
                year: document.querySelector(DOMstrings.inputYear).value,
                sqFt: document.querySelector(DOMstrings.inputSquare).value,
                heating: document.querySelector(DOMstrings.inputHeating).value,
                price: document.querySelector(DOMstrings.inputPrice).value,
                bedCount: document.querySelector(DOMstrings.inputBedrooms).value,
                bathCount: document.querySelector(DOMstrings.inputBathrooms).value,
                garage: document.querySelector(DOMstrings.inputGarage).value
            };
        },

        addListing: function(listingData) {
            var template, list, newListing;

            list = DOMstrings.listingContainer;

            template = '<div class="card listing" id="listing-0"><div class="card-header listing__titlebox" id="listing__titlebox"><h5 class="mb-0"><button class="btn btn-link" type="button" data-toggle="collapse" data-target="#list__item-0" aria-expanded="true" aria-controls="list__item-0"><p><span id="listing__title">%title%</span> <span id="listing__beds">%beds% Beds</span> <span id="listing__baths">%bath% Bath</span> <span id="listing__cost">$%price%</span></p></button></h5></div><div class="collapse listing__body" aria-labelledby="headingOne" data-parent="#all__listings" id="list__item-0"><div class="container-fluid"><div class="row"><div class="col"><p class=""><span class="detail__title">DESCRIPTION:</span><br><span class="listing__desc">This inviting home is ready for you to move in. Main floor has a circular lay out and uses space well. Good light through out. You have the a bedroom & full bath on the main plus another bath & 2 beds upstairs. A huge dining room is off of your kitchen.Your lot is level & easy to care for & fully fenced. You come home every day to quiet dead end street. The perfect spot for commuters.</span></p></div></div><div class="row listing__details"><div class="col"><p><span class="detail__title">Heating:</span> <span id="heating">%heating%</span></p><p><span class="detail__title">Year Built:</span> <span id="year">%year%</span></p><p><span class="detail__title">Square Feet:</span> <span id="sqFt">%sqft%</span></p><p><span class="detail__title">Price Per Sq/Ft:</span> $<span id="price__perFt">%ppsf%</span></p></div><div class="col"><p><span class="detail__title">Price:</span> $<span id="price">%price%</span></p><p><span class="detail__title">Bedrooms:</span> <span id="bedrooms">%beds%</span></p><p><span class="detail__title">Bathrooms:</span> <span id="bathrooms">%bath%</span></p><p><span class="detail__title">Garage:</span> <span id="price__perFt">%garage%</span></p></div></div></div></div></div>';

            newListing = template.replace('%title%', listingData.name);
            newListing = newListing.replace('%beds%', listingData.bedCount);
            newListing = newListing.replace('%beds%', listingData.bedCount);
            newListing = newListing.replace('%bath%', listingData.bathCount);
            newListing = newListing.replace('%bath%', listingData.bathCount);
            newListing = newListing.replace('%year%', listingData.year);
            newListing = newListing.replace('%heating%', listingData.heating);
            newListing = newListing.replace('%ppsf%', listingData.sqFt);
            newListing = newListing.replace('%sqft%', listingData.sqFt);
            newListing = newListing.replace('%price%', listingData.price);
            newListing = newListing.replace('%price%', listingData.price);
            newListing = newListing.replace('%garage%', listingData.garage);

            document.querySelector(list).insertAdjacentHTML('beforeend', newListing);

        },

        getStrings: function() {
            return DOMstrings;
        }

    };

})();


// ***********************
// Controller Module
// ***********************

var controllerModule = (function(mapCtrl, dataCtrl, UICtrl) {

    // build event listeners for form click and enter

    var setupEventListeners = function() {
        var DOM = UICtrl.getStrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddListing);
    };

    var ctrlAddListing = function() {

        var input;

        //***  newListing = new Listing(name, year, sqFt, heating, price, bedCount, bathCount, garage);***

        ///// get input data from form submission
        input = UIModule.listingInput();

        ///// add new listing to data structure
        dataCtrl.newListing(input.name, input.year, input.sqFt, input.heating, input.price, input.bedCount, input.bathCount, input.garage);

        // console.log(newHome);
        ///// add listing to UI
        UIModule.addListing(newHome);

    };

    return {
        inIt: function() {
            console.log('App is running');
            setupEventListeners();
        }
    };


})(mapModule, dataModule, UIModule);


controllerModule.inIt();