$.getJSON("/articles", function(data) {
  for (var i = 0; i < data.length; i++) {
    $("#articles").append(
      `
    
      <div class="py-3 mt-3 row bg-success rounded">
        <img src="${data[i].image}" class= " col-5 col-lg-4 img-fluid w-100 mx-auto" >
        <div class = "header col-lg-8 col-12">
          <a id="title" href = "${data[i].link}">
            ${data[i].title}
          </a>
          <p id="resultSum">
            ${data[i].summary}
          </p>
          <button type="button" class="btn btn-lg col-12 col-lg-4 btn-warning comment" data-id="${data[i]._id}">
          What do you Think?
        </button>
        </div>
      </div>
      `
    )
  }
});

$(document).on("click", "#scraper", function() {
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
  .then(function() {
    console.log("SCRAPE IT UP SCRAPE IT UP")
    location.reload()
  })
})

$(document).on("click", ".comment", function() {
  $("#comment").empty();
  $("#articles").hide();
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .then(function(data) {
      $("#comment").append(
        `
        <div class ="card bg-success">
          <div class = "card-header">
            <a id="title" href = "${data.link}">
              ${data.title}
            </a>
            <p>
              ${data.summary}
              </p>
          </div>
          <div class = "card-body row">
            <div class = "col-8 mx-auto">
              <input class="commentInputs col-12 col-md-8 mx-auto" id='titleinput' name='title'/>
              <textarea class="commentInputs col-12 col-md-8 mx-auto" id='bodyinput' name='body'></textarea>
            </div>
            <div class = "col-4">
              <p>
                What Do You Think?
              </p>
              <p>
                Comment to the Left
              </p>
            </div>
          </div>
          <div class = "row mx-auto">
            <button data-id="${data._id}" class="mt-auto btn btn-warning" id='savenote'>Save Note</button>
            <a href="/" class="mt-auto btn btn-warning">Return To Articles</a>
          </div>
          <h2 class="noteTitle">Previous Comments</h2>
          ${data.comments.map((item, i) => `
            <h3>Subject: ${item.title}</h3>
            <p class=commentBody>${item.body}</p>
            <button data-id="${item._id}" class="mt-auto btn btn-primary" id='deletenote'>Delete Note</button>
            `.trim()).join('')}
        </div>
        `
      ) 


      // If there's a note in the article
      if (data.articles) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.comments.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.comments.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the comment section
      $("#comment").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
  $("#articles").show();
});

$(document).on("click", "#deletenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "GET",
    url: "/delete/" + thisId,
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the comment section
      $("#comment").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
  $("#articles").show();
});
