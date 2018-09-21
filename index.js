// ***********************
// Map  Module
// ***********************

var mapModule = (function() {

    // retrieve addresses from input 

    // convert address to coordinates

    // add coordinates to map html

    // remove when listing is deleted

})();


// ***********************
// Data Input Module
// ***********************


var dataModule = (function() {

    // Function constructor for listings

    var Listing = function(name, year, sqFt, heating, price, bedCount, bathCount, garage, description, address, city, state) {
        this.name = name;
        this.year = year;
        this.sqFt = sqFt;
        this.heating = heating;
        this.price = price;
        this.bedCount = bedCount;
        this.bathCount = bathCount;
        this.garage = garage;
        this.description = description;
        this.address = address;
        this.city = city;
        this.state = state;
    };

    var data = {
        listings: []
    };

    // store field data

    return {

        newID: function() {
            var ID;

            if (data.listings.length <= 0) {
                ID = 0;
            } else {
                ID = data.listings.length + 1;
            }

            return ID;
        },

        newListing: function(name, year, sqFt, heating, price, bedCount, bathCount, garage, description, address, city, state) {

            newHome = new Listing(name, year, sqFt, heating, price, bedCount, bathCount, garage, description, address, city, state);

            data.listings.push(newHome);

            function createAddress(add, ci, st) {
                var addressString = add + ' ' + ci + ' ' + st;
                return addressString;
            }
            addressString = createAddress(address, city, state);

            return newHome, addressString;

        },

        getLatLong: function(addString) {

            function showResult(result) {
                console.log(result.geometry.location.lat());
                console.log(result.geometry.location.lng());

                var latitude, longitude;

                latitude = result.geometry.location.lat();
                longitude = result.geometry.location.lng();
                updateMap(latitude, longitude);
            }

            function getLatitudeLongitude(callback, address) {
                // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
                address = address || 'Ferrol, Galicia, Spain';
                // Initialize the Geocoder
                geocoder = new google.maps.Geocoder();
                if (geocoder) {
                    geocoder.geocode({
                        'address': address
                    }, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            callback(results[0]);
                        }
                    });
                }

            }

            getLatitudeLongitude(showResult, addString);

            function updateMap(lat, lng) {
                // The location of Uluru
                var uluru = {
                    // lat: 47.2981173,
                    // lng: -122.3882006
                    lat: parseInt(lat),
                    lng: parseInt(lng)
                };
                // The map, centered at Uluru
                var map = new google.maps.Map(
                    document.getElementById('map'), {
                        zoom: 7,
                        center: uluru
                    });
                // The marker, positioned at Uluru
                var marker = new google.maps.Marker({
                    position: uluru,
                    map: map
                });
            }

        },

        // calculate price per square foot and return cost 

        test: function() {
            return data;
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
        listingContainer: '.list__container',
        inputDescription: '.input__description',
        inputAddress: '.input__addressLine',
        inputCity: '.input__city',
        inputState: '.input__state',
        emptyState: '.empty__position'
    };

    // update UI to show added listing

    return {

        clearInputs: function() {
            var fields;

            fields = document.querySelectorAll(
                DOMstrings.inputName + ', ' +
                DOMstrings.inputYear + ', ' +
                DOMstrings.inputSquare + ', ' +
                DOMstrings.inputHeating + ', ' +
                DOMstrings.inputPrice + ', ' +
                DOMstrings.inputBedrooms + ', ' +
                DOMstrings.inputGarage + ', ' +
                DOMstrings.inputDescription + ', ' +
                DOMstrings.inputAddress + ', ' +
                DOMstrings.inputCity + ', ' +
                DOMstrings.inputState + ', ' +
                DOMstrings.inputBathrooms
            );

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });


        },

        listingInput: function() {
            return {
                name: document.querySelector(DOMstrings.inputName).value,
                year: document.querySelector(DOMstrings.inputYear).value,
                sqFt: document.querySelector(DOMstrings.inputSquare).value,
                heating: document.querySelector(DOMstrings.inputHeating).value,
                price: document.querySelector(DOMstrings.inputPrice).value,
                bedCount: document.querySelector(DOMstrings.inputBedrooms).value,
                bathCount: document.querySelector(DOMstrings.inputBathrooms).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                address: document.querySelector(DOMstrings.inputAddress).value,
                city: document.querySelector(DOMstrings.inputCity).value,
                state: document.querySelector(DOMstrings.inputState).value,
                garage: document.querySelector(DOMstrings.inputGarage).value
            };
        },

        addListing: function(listingData) {
            var template, list, newListing, ID;

            ID = dataModule.newID();

            list = DOMstrings.listingContainer;

            template = '<div class="card listing" id="listing-%id%"><div class="card-header listing__titlebox" id="listing__titlebox"><h5 class="mb-0"><button class="btn btn-link" type="button" data-toggle="collapse" data-target="#list__item-%id%" aria-expanded="true" aria-controls="list__item-0"><p><span id="listing__title">%title%</span> <span id="listing__beds">%beds% Beds</span> <span id="listing__baths">%bath% Bath</span> <span id="listing__cost">$%price%</span></p></button></h5></div><div class="collapse listing__body" aria-labelledby="headingOne" data-parent="#all__listings" id="list__item-%id%"><div class="container-fluid"><div class="row"><div class="col"><p class=""><span class="detail__title">DESCRIPTION:</span><br><span class="listing__desc">%description%</span><br><br><span class="detail__title">ADDRESS:</span><br><span class="listing__address">%address%<br>%city%, %state%</span></p></div></div><div class="row listing__details"><div class="col"><p><span class="detail__title">Heating:</span> <span id="heating">%heating%</span></p><p><span class="detail__title">Year Built:</span> <span id="year">%year%</span></p><p><span class="detail__title">Square Feet:</span> <span id="sqFt">%sqft%</span></p><p><span class="detail__title">Price Per Sq/Ft:</span> $<span id="price__perFt">%ppsf%</span></p></div><div class="col"><p><span class="detail__title">Price:</span> $<span id="price">%price%</span></p><p><span class="detail__title">Bedrooms:</span> <span id="bedrooms">%beds%</span></p><p><span class="detail__title">Bathrooms:</span> <span id="bathrooms">%bath%</span></p><p><span class="detail__title">Garage:</span> <span id="price__perFt">%garage%</span></p></div></div></div></div></div>';

            newListing = template.replace('%title%', listingData.name);
            newListing = newListing.replace('%beds%', listingData.bedCount);
            newListing = newListing.replace('%beds%', listingData.bedCount);
            newListing = newListing.replace('%bath%', listingData.bathCount);
            newListing = newListing.replace('%bath%', listingData.bathCount);
            newListing = newListing.replace('%year%', listingData.year);
            newListing = newListing.replace('%heating%', listingData.heating);
            // 
            newListing = newListing.replace('%ppsf%', listingData.sqFt);
            // replace ppsf ^ with square foot cost method
            newListing = newListing.replace('%sqft%', listingData.sqFt);
            newListing = newListing.replace('%price%', listingData.price);
            newListing = newListing.replace('%price%', listingData.price);
            newListing = newListing.replace('%garage%', listingData.garage);
            newListing = newListing.replace('%description%', listingData.description);
            newListing = newListing.replace('%id%', ID);
            newListing = newListing.replace('%id%', ID);
            newListing = newListing.replace('%id%', ID);
            newListing = newListing.replace('%address%', listingData.address);
            newListing = newListing.replace('%city%', listingData.city);
            newListing = newListing.replace('%state%', listingData.state);

            document.querySelector(list).insertAdjacentHTML('beforeend', newListing);

        },

        // remove no listing placeholder when there is at least one listing

        removeNoListings: function() {
            document.querySelector(DOMstrings.listingContainer).classList.remove('empty__position');
            document.getElementById('no_listings').style.display = 'none';
        },

        // delete listing 

        removeListing: function() {

            // check to see if there are listings, add 'empty__position' class if none

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

        document.addEventListener('keypress', function(e) {
            if (e.keyCode === 13 || event.which === 13) {
                ctrlAddListing();
            }
        });
    };

    var ctrlAddListing = function() {

        var input;

        //***  newListing = new Listing(name, year, sqFt, heating, price, bedCount, bathCount, garage);***

        ///// get input data from form submission
        input = UIModule.listingInput();

        ///// add new listing to data structure
        dataCtrl.newListing(
            input.name,
            input.year,
            input.sqFt,
            input.heating,
            input.price,
            input.bedCount,
            input.bathCount,
            input.garage,
            input.description,
            input.address,
            input.city,
            input.state
        );

        // only adds listing if all required fields have been entered

        ///// add listing to UI
        UIModule.addListing(newHome);

        console.log(addressString + ' : this is inside the controller function');

        ///// clears inputs
        UICtrl.clearInputs();

        //// removes 'no listing' placeholder when list is empty
        UICtrl.removeNoListings();

        dataCtrl.getLatLong(addressString);

    };

    return {
        inIt: function() {
            console.log('App is running');
            setupEventListeners();
        }
    };


})(mapModule, dataModule, UIModule);


controllerModule.inIt();