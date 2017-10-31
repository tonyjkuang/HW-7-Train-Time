// Initialize Firebase
var config = {
  apiKey: "AIzaSyBheteyfAZSjfz6cqO-U5_DstGgT-MeQ9M",
  authDomain: "hw-7-train-time.firebaseapp.com",
  databaseURL: "https://hw-7-train-time.firebaseio.com",
  projectId: "hw-7-train-time",
  storageBucket: "",
  messagingSenderId: "36966664583"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Set variables
var train = "";
var destination = "";
var trainTime = "";
var frequency = "";

// Search Button changes what is stored in firebase
$("#submit").on("click", function() {
  // Prevent the page from refreshing
  event.preventDefault();

  // Get inputs
  train = $("#train-name").val().trim();
  destination = $("#destination").val().trim();
  trainTime = $("#first-train-time").val().trim();
  frequency = $("#frequency").val().trim();

  //var trainName = $("<p>");
  //var trainDestination = $("<p>");
  //var firstTrainTime = $("<p>");
  //var trainFrequency = $("<p>")

  // Change what is saved in firebase
  database.ref().set({
    train: train,
    destination: destination,
    trainTime: trainTime,
    frequency: frequency
  });
});

// When changes occurs it will print them to console and html
database.ref().on("value", function(snapshot) {

  // Print the initial data to the console.
  console.log(snapshot.val());

  // Log the value of the various properties
  console.log(snapshot.val().train);
  console.log(snapshot.val().destination);
  console.log(snapshot.val().trainTime);
  console.log(snapshot.val().frequency);

  // Change the HTML
  $("#well-section").text(snapshot.val().train + " | " + snapshot.val().destination + " | " + snapshot.val().trainTime);

  // If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});