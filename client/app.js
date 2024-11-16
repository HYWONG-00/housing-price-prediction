function onClickedEstimatePrice(event) {
  event.preventDefault(); // Important to prevent the page reload

  console.log("Estimate price button clicked");
  var sqft = document.getElementById("uiSqft");
  var bhk = document.querySelector('select[name="uiBHK"]').value;
  var bathrooms = document.querySelector('select[name="uiBathrooms"]').value;
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");

  console.log({
    total_sqft: parseFloat(sqft.value),
    bhk: bhk,
    bath: bathrooms,
    location: location.value,
  });
  var url = "/api/predict_home_price";
  $.post(
    url,
    {
      total_sqft: parseFloat(sqft.value),
      bhk: bhk,
      bath: bathrooms,
      location: location.value,
    },
    function (data, status) {
      console.log(data.estimated_price);
      estPrice.textContent = data.estimated_price + " Lakh";
    }
  );
}

function onPageLoad() {
  console.log("document loaded");
  var url = "/api/get_location_names";
  console.log(url);

  $.get(url, function (data, status) {
    if (data) {
      var locations = data.locations;
      var uiLocations = document.getElementById("uiLocations");
      $("#uiLocations").empty();
      for (var i in locations) {
        var opt = new Option(locations[i]);
        $("#uiLocations").append(opt);
      }
    }
  });
}

window.addEventListener("load", onPageLoad);
