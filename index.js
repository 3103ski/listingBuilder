/**
 * TODO LIST
 * 
 *  - validate input and only add listing if all fieldsa are filled in
 *  - add hover effect to listing buttons
 *  - update style of input title
 *  - style placeholder texts
 * 
 * 
 */



// ***********************
// Map  Module
// ***********************

var mapModule = (function() {

    addressToMap = function(locStr) {

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

        function updateMap(lat, lng) {

            var location, map, marker;

            // The coordinates of the entered location
            location = {
                lat: parseInt(lat),
                lng: parseInt(lng)
            };
            // The map, centered at location
            map = new google.maps.Map(
                document.getElementById('map'), {
                    zoom: 8,
                    center: location
                });
            // The marker, positioned at location
            marker = new google.maps.Marker({
                position: location,
                map: map
            });
        }

        getLatitudeLongitude(showResult, locStr);

        function showResult(result) {
            console.log(result.geometry.location.lat() + ' : This is the latitude of the mapped location');
            console.log(result.geometry.location.lng() + ' : This is the longitude of the mapped location');

            var latitude, longitude;

            latitude = result.geometry.location.lat();
            longitude = result.geometry.location.lng();
            updateMap(latitude, longitude);
        }

    }

    return {

        previewListing: function(id) {
            var ids, index, data, locationString, address, city, state;

            data = dataModule.listingArray();

            ids = data.listings.map(function(current) {
                return current.id;
            });

            index = ids.indexOf(id);

            address = data.listings[index].address;
            city = data.listings[index].city;
            state = data.listings[index].state;

            locationString = address + ' ' + city + ' ' + state;

            console.log(locationString + ' : this is the address being mapped out');

            addressToMap(locationString);
        },

        diplayOnMap: function(addString) {
            addressToMap(addString);
        }


    };
})();


// ***********************
// Data Input Module
// ***********************


var dataModule = (function() {

    var data, Listing;

    Listing = function(name, year, sqFt, heating, price, bedCount, bathCount, garage, description, address, city, state, id) {
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
        this.id = id;
    };

    data = {
        listings: []
    };

    return {

        newID: function() {
            var ID;

            if (data.listings.length > 0) {
                ID = data.listings[data.listings.length - 1].id + 1;
            } else {
                ID = 0;
            }

            return ID;
        },

        newListing: function(name, year, sqFt, heating, price, bedCount, bathCount, garage, description, address, city, state) {

            var listingID;

            listingID = this.newID();
            newHome = new Listing(name, year, sqFt, heating, price, bedCount, bathCount, garage, description, address, city, state, listingID);

            data.listings.push(newHome);

            return newHome;
        },

        deleteListing: function(id) {
            var ids, index;

            ids = data.listings.map(function(current) {
                return current.id;
            });

            index = ids.indexOf(id);

            console.log(data.listings[index].address);

            if (index !== -1) {
                data.listings.splice(index, 1);
            }

        },

        listingArray: function() {
            return data;
        }

    };

})();


// ***********************
// UI Module
// ***********************

var UIModule = (function() {

    var DOMstrings;

    DOMstrings = {
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
        emptyState: '.empty__position',
        removeBtn: '.remove__listing',
        listing: '.card'
    };

    // update UI to show added listing

    return {

        clearInputs: function() {
            var fields, fieldsArr;

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
            var template, list, newListing, ID, ppsf;

            ID = parseInt(dataModule.newID()) - 1;
            // console.log(ID);

            list = DOMstrings.listingContainer;

            ppsf = parseInt(listingData.price) / parseInt(listingData.sqFt);
            // console.log(ppsf);

            template = '<div class="card listing" id="listing-%id%"><div class="card-header listing__titlebox"><h5 class="mb-0"><button class="btn btn-link" type="button" data-toggle="collapse" data-target="#list__item-%id%" aria-expanded="true" aria-controls="list__item-0"><span id="listing__title">%title%</span> <span id="listing__beds">%beds% Beds</span> <span id="listing__baths">%bath% Bath</span> <span id="listing__cost">$%price%</span></button></h5><div><div><h2 class="map__listing"><i class="fas fa-map-marked-alt"></i></h2></div></div><div><div><div><h2 class="remove__listing"><i class="fas fa-times-circle"></i></h2></div></div></div></div><div class="collapse listing__body" aria-labelledby="headingOne" data-parent="#all__listings" id="list__item-%id%"><div class="container-fluid"><div class="row"><div class="col"><p class=""><span class="detail__title">DESCRIPTION:</span><br><span class="listing__desc">%description%</span><br><br><span class="detail__title">ADDRESS:</span><br><span class="listing__address">%address%<br>%city%, %state%</span></p></div></div><div class="row listing__details"><div class="col"><p><span class="detail__title">Heating:</span> <span id="heating">%heating%</span></p><p><span class="detail__title">Year Built:</span> <span id="year">%year%</span></p><p><span class="detail__title">Square Feet:</span> <span id="sqFt">%sqft%</span></p><p><span class="detail__title">Price Per Sq/Ft:</span> $<span id="price__perFt">%ppsf%</span></p></div><div class="col"><p><span class="detail__title">Price:</span> $<span id="price">%price%</span></p><p><span class="detail__title">Bedrooms:</span> <span id="bedrooms">%beds%</span></p><p><span class="detail__title">Bathrooms:</span> <span id="bathrooms">%bath%</span></p><p><span class="detail__title">Garage:</span> <span id="price__perFt">%garage%</span></p></div></div></div></div></div>';

            newListing = template.replace('%title%', listingData.name);
            newListing = newListing.replace('%beds%', listingData.bedCount);
            newListing = newListing.replace('%beds%', listingData.bedCount);
            newListing = newListing.replace('%bath%', listingData.bathCount);
            newListing = newListing.replace('%bath%', listingData.bathCount);
            newListing = newListing.replace('%year%', listingData.year);
            newListing = newListing.replace('%heating%', listingData.heating);
            newListing = newListing.replace('%ppsf%', ppsf);
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

        removeNoListings: function() {
            document.querySelector(DOMstrings.listingContainer).classList.remove('empty__position');
            document.getElementById('no_listings').style.display = 'none';
        },

        removeListing: function(selectorID) {
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
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

    var strings = UICtrl.getStrings();

    var setupEventListeners = function() {
        var DOM = UICtrl.getStrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddListing);

        document.querySelector(DOM.listingContainer).addEventListener('click', ctrlRemoveListing);

        document.querySelector(DOM.listingContainer).addEventListener('click', ctrlPreviewMap);

        document.addEventListener('keypress', function(e) {
            if (e.keyCode === 13 || event.which === 13) {
                ctrlAddListing();
            }
        });
    };

    var ctrlAddListing = function() {

        var input, addressString;

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

        ///// add listing to UI
        UIModule.addListing(newHome);

        ///// clears inputs
        UICtrl.clearInputs();

        //// removes 'no listing' placeholder after first listing is added
        UICtrl.removeNoListings();

        addressString = input.address + ' ' + input.city + ' ' + input.state;

        mapCtrl.diplayOnMap(addressString);

        // only adds listing if all required fields have been entered

    };

    ctrlPreviewMap = function(e) {
        var listingID, listings;

        listingID = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
        if (listingID.length === 9) {
            splitID = listingID.split('-');
            cardID = parseInt(splitID[1]);
            mapCtrl.previewListing(cardID);
            console.log(listingID);
        }

    };

    ctrlRemoveListing = function(e) {

        var listingID, listings;

        // correctly target listing ID on click
        listingID = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id;

        // checks for ID
        if (listingID.length === 9) {
            splitID = listingID.split('-');
            IDnumb = parseInt(splitID[1]);
            // }

            // remove listing from data structure
            dataCtrl.deleteListing(IDnumb);

            // remove listing from UI
            UICtrl.removeListing(listingID);
        }

        listings = dataCtrl.listingArray();

        if (listings.listings <= 0) {
            document.querySelector(strings.listingContainer).classList.add('empty__position');
            document.getElementById('no_listings').style.display = 'flex';

            mapCtrl.diplayOnMap('seattle washington');
        }
    };

    return {
        inIt: function() {
            console.log('App is running');
            setupEventListeners();
            mapCtrl.diplayOnMap('seattle washington');
        }
    };


})(mapModule, dataModule, UIModule);


controllerModule.inIt();