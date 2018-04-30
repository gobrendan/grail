//
// location picker 
//

$(function() {

  function locationPicker() {
    
    var locationPicker = $(".location-picker"), 
        locationPickerBtn = locationPicker.find(".location-picker__label"),
        locationPickerForm = locationPicker.find(".location-picker__form"), 
        
        locationPickerInput = locationPicker.find(".search-box__text-input"), 
        locationPickerInputVal = locationPicker.find(".search-box__text-input").val(), 
        locationPickerResults = locationPicker.find(".location-picker__results");

    // clicking the button/label

    locationPickerBtn.bind("click", locationPickerBtnHandler);
  
    function locationPickerBtnHandler(event) {

      // show form/input and give focus to input
  
      if ($(this).closest(locationPicker).find(locationPickerForm).attr('hidden')) {

        $(this).closest(locationPicker).find(locationPickerForm).removeAttr("hidden");
        $(this).closest(locationPicker).find(locationPickerForm).removeClass("hidden");
        locationPickerInput.focus();        

      } 

      // hide form/input
      
      else {

        $(this).closest(locationPicker).find(locationPickerForm).attr("hidden", "");
        $(this).closest(locationPicker).find(locationPickerForm).addClass("hidden");
        
      }

    }

    // processing the input, showing the results

    $('.search-box__text-input').keyup(function() {

      if ( $(this).val() == "287" || $(this).val() == "ash" || $(this).val() == "Ash" ) {

        $(this).closest(locationPicker).find(locationPickerResults).removeAttr("hidden");
        $(this).closest(locationPicker).find(locationPickerResults).removeClass("hidden");

      }

      else {

        $(this).closest(locationPicker).find(locationPickerResults).attr("hidden", "");
        $(this).closest(locationPicker).find(locationPickerResults).addClass("hidden");

      }
      
    });
    
  }

  locationPicker();
  
}());
