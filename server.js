// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

var express = require("express");

// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

var app = express();
var PORT = process.env.PORT || 8000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/assets', express.static("./assets"));

//requires the abstracted routes
require("./routing/html-routes")(app);
require("./routing/api-routes")(app);

// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});

