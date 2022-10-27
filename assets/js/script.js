$(function() { // start of jQuery function for on load best practice

    // for event handling and modifying elements on page
    let $movieFavEl = $("#movie-fav");
    let $dragBoxEl = $(".dragbox");
    let $searchMovieEl = $("#search-movie");
    let $searchResultsEl = $('#search-results-container');

    // for dynamic elements
    let myMovies = ["Movie 1", "Movie 2", "Movie 3", "Movie 4"];
    let favoriteListOrder = [];

    // sortable functionality
    $dragBoxEl.sortable({
        stop: favoriteListOrder = $dragBoxEl.sortable("toArray"), //(event, ui) => updateArray(event, ui)
        placeholder: "sortable-placeholder", // is this even being used?
        opacity: 0.5
    })

    // for updating movie array
    function updateArray() {
        myMovies = favoriteListOrder; // basic functionality
    }

    // for creating movie favorite list dynamically
    function updateFavorites() {
    $movieFavEl.empty();
        myMovies.forEach((x) => {
            $movieFavEl.append("<li class=\"listitem\"><div class=\"text\"> " + x + " <i class=\"fa fa-film\"></i></div></li>");
        });
    }

    // for adding movies to favorite list, calls updateFavorites function
    function addToFavorites(event) {
        event.preventDefault();
        myMovies.unshift(event.target.id);
        $movieFavEl.empty();
        myMovies.forEach((m) => {
            $movieFavEl.append("<li class=\"listitem\"><div class=\"text\">" + m
                + "<i class=\"fa fa-film\"></i></div></li>");
        });
    }

    $searchMovieEl.on('submit', function(p_oEvent){
        $searchResultsEl.empty();
        var sUrl, sMovie, oData;
        p_oEvent.preventDefault();
        sMovie = $searchMovieEl.find('input').val();
        console.log(sMovie);
        sUrl = 'https://www.omdbapi.com/?s=' + sMovie + '&type=movie&tomatoes=true&apikey=5e467eda'
        $.ajax(sUrl, {
            complete: function(p_oXHR, p_sStatus){
                oData = $.parseJSON(p_oXHR.responseText).Search; // Modify for dynamic search results
                console.log(oData);
                if (oData.Response === "False") {
                    $searchResultsEl.hide();
                } else {
                    oData.forEach((x) => {
                        $searchResultsEl.append("<div class=\"poster\"><img id=\'" + x.imdbID + "\' src=\'" + x.Poster + "\'/></div>")
                    });
                    /*<!--
                        <h3 class="title">Title</h3>
                        <p class="plot">Plot</p>
                        <span class="year">Year</span>
                    -->*/
                    $searchResultsEl.show();
                }
            }
        });
    });

    $searchResultsEl.on('click', '.poster img', addToFavorites); // update to point to button instead

}); // end of jQuery function for on load best practice