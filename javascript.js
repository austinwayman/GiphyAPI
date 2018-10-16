$(document).ready(function() {
    //Array for searched topics to be added
    var comedians = [];
    
      
      
    
      //Submit button click event takes search term from form input, trims and pushes to comedians array, displays button
        $("#addCom").on("click", function(event) {
            event.preventDefault();
            var newCom = $("#comedianInput").val().trim();
            comedians.push(newCom);
            console.log(comedians);
            $("#comedianInput").val('');
            displayButtons();
          });
    
      //Function iterates through comedians array to display button with array values in "myButtons" section of HTML
        function displayButtons() {
        $("#myButtons").empty();
        for (var i = 0; i < comedians.length; i++) {
          var a = $('<button class="btn btn-secondary">');
          a.attr("data-comedian", comedians[i]);
          a.text(comedians[i]);
          $("#myButtons").append(a);
        }
      }
    
    
      displayButtons();
    
      //Click event on button with id of "show" executes displayComedianName function
      $(document).on("click", ".btn", function(){
    
          var comedian = $(this).data("comedian");
          console.log(comedian);
      
          var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + comedian + "&api_key=SzR8GH72ppHulK01VqcC09jcc10UyZoy&limit=5";
      
          console.log(queryURL);
      
          $.ajax({
                url: queryURL,
                method: "GET"
              }).done(function(response) {
                  var results = response.data;
                  console.log(results);
                  for (var i = 0; i < results.length; i++) {
                  
                  var comDiv = $("<div class='col-md-4'>");
      
                  var rating = results[i].rating;
                  var defaultAnimatedSrc = results[i].images.fixed_height.url;
                  var staticSrc = results[i].images.fixed_height_still.url;
                  var showImage = $("<img>");
                  var p = $("<p class='butn'>").text("Rating: " + rating);
      
                  showImage.attr("src", staticSrc);
                  showImage.addClass("comedianGiphy");
                  showImage.attr("data-state", "still");
                  showImage.attr("data-still", staticSrc);
                  showImage.attr("data-animate", defaultAnimatedSrc);
                  comDiv.append(p);
                  comDiv.append(showImage);
                  $("#gifs-appear-here").prepend(comDiv);
      
              }
          });
      
      });
    
      //Click event on gifs with class of "comedianGiphy" executes pausePlayGifs function
      $(document).on("click", ".comedianGiphy", pausePlayGifs);
    
      //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
      function pausePlayGifs() {
           var state = $(this).attr("data-state");
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
      }
    }
    
    });





















// $(document).ready(function() {

//     var searchCom = [];

//     function displayComedianName() {
//         var x = $(this).data("search");
//         console.log(x);

//         var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + comedian + "&api_key=SzR8GH72ppHulK01VqcC09jcc10UyZoy&limit=10";
//         console.log(queryURL);
        
//         $.ajax({
//             url: queryURL,
//             method: "GET"
//         }).done(function(response) {
//             var results = response.data;
//             console.log(results);

//             for (var i = 0; i < results.length; i++) {

//                 var showDiv = $("<div class='col-md-4'>");

//                 var rating = results[i].rating;
//                 var defaultAnimatedSrc = results[i].images.fixed_height.url;
//                 var staticSrc = results[i].images.fixed_height_still.url;
//                 var showImage = $("<img>");
//                 var p = $("<p>").text("Rating: " + rating);

//                 showImage.attr("src", staticSrc);
//                 showImage.addClass("comedianGiphy");
//                 showImage.attr("data-state", "still");
//                 showImage.attr("data-still", staticSrc);
//                 showImage.attr("data-animate", defaultAnimatedSrc);
//                 showDiv.append(p);
//                 showDiv.append(showImage);
//                 $("#gifs-appear-here").prepend(showDiv)
                
//             }
//         });
//     }



//     $("#addComedian").on("click", function(event) {
//         event.preventDefault();
//         var newComedian = $("#comedianInput").val().trim();
//         searchCom.push(newComedian);
//         console.log(searchCom);
//         $("#comedianInput").val('');
//         displayButtons();
//     });



//     function displayButtons() {
//         $("#myButtons").empty();
//         for (var i = 0; i < searchCom.length; i++) {
//             var a = $('<button class="btn btn-info">');
//             a.attr("id", "show");
//             a.attr("data-comedian", searchCom[i]);
//             a.text(searchCom[i]);
//             $("#myButtons").append(a);
//         }
//     }

//     displayButtons();

//     $(document).on("click", "#show", displayComedianName);

//     $(document).on("click", ".comedianGiphy", pausePlayGifs);

//     function pausePlayGifs() {
//         var state = $(this).attr("data-state");
//         if (state === "still") {
//             $(this).attr("src", $(this).attr("data-animate"));
//             $(this).attr("data-state", "animate");
//         } else {
//             $(this).attr("src", $(this).attr("data-still"));
//             $(this).attr("data-state", "still");
//         }
//     }

// });






