/**
 * @author Prashant Srivastav<prashant@codingdash.com>
 * @description Used for location auto-complete
 * @pre-requesties Before using this, following libs must be added
 *      https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places
 * How to use-
 *  Create a input element with following properties-
 *      data-rel="auto-suggest"
 *      [data-city="city-selector"]
 *      [data-state="state-selector"]
 *      [data-country="country-selector"]
 *      [data-complete="complete-selector"]
 *
 * Example-
 *      <input type="text" 
 *          id="searching" 
 *          data-rel="auto-suggest" 
 *          data-country="#country" 
 *          data-state="#state" 
 *          data-city="#city" 
 *          data-complete="#location" 
 *          placeholder = 'Search City'/>
 *      <input type="text" id="location" readonly />
 *      <input type="text" id="city" readonly />
 *      <input type="text" id="state" readonly />
 *      <input type="text" id="country" readonly />
 */

(function(document, window) {
    $(document).ready(function(){
        $('input[data-rel="auto-suggest"]').each(function(){
            var self = this;
            var options = {
                types: ['(cities)'],
                componentRestrictions: {country: "IN"}
            };
            var autocomplete = new google.maps.places.Autocomplete(this, options);
            google.maps.event.addListener(autocomplete, "place_changed", function() {
                var place = autocomplete.getPlace();
                $(self).blur();    
                setTimeout((function(place){
                    if(place === undefined) {
                        return false;
                    }
                    var city, country, state;
                    city = place.name;
                    var temp = place.formatted_address.split(",");
                    switch(temp.length) {
                        case 2:
                            state = city.replace( /[^\a-zA-z .]/g, '' );;
                            country = temp[1].trim().replace( /[^\a-zA-z .]/g, '' );; 
                            break;
                        case 3:
                            state = temp[1].trim().replace( /[^\a-zA-z .]/g, '' );;
                            country = temp[2].trim().replace( /[^\a-zA-z .]/g, '' );;
                            break;
                    }

                    //for city
                    if($(self).attr("data-city") && $($(self).attr("data-city"))) {
                        $($(self).attr("data-city")).val(city);
                    }
                    //for state
                    if($(self).attr("data-state") && $($(self).attr("data-state"))) {
                        $($(self).attr("data-state")).val(state);
                    }
                    //for country
                    if($(self).attr("data-country") && $($(self).attr("data-country"))) {
                        $($(self).attr("data-country")).val(country);
                    }
                    //for complete
                    if($(self).attr("data-complete") && $($(self).attr("data-complete"))) {
                        $($(self).attr("data-complete")).val(place.formatted_address);
                    }
                })(place), 10);
            });
        }); 
    });
})(document, window);
