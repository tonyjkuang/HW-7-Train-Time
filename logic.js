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

var train;
var destination;
var trainTime;
var frequency;

// Search Button changes what is stored in firebase
$("#submit").on("click", function() {
  // Prevent the page from refreshing
  event.preventDefault();

  // Get inputs
  train = $("#train-name").val().trim();
  destination = $("#destination").val().trim();
  trainTime = $("#first-train-time").val().trim();
  frequency = $("#frequency").val().trim();

  // Check if the input is valid
  if (train === "" || destination === "" || trainTime === "" || frequency === "") {
    alert("Please fill in all fields.");
  } else {
    database.ref().push({
      train: train,
      destination: destination,
      trainTime: trainTime,
      frequency: frequency
    });

      // Clear the fields
      $("#train-name").val("");
      $("#destination").val("");
      $("#first-train-time").val("");
      $("#frequency").val("");
  }
});

function createTrain(train, destination, frequency, trainTime) {
  var addRow = $("<tr>"); // Create a row for each train
  var addTrain = $("<td>").text(train);
  var addDestination = $("<td>").text(destination);
  var addFrequency = $("<td>").text(frequency);
  var nextArrival = calNextArrival();
  var convertNextArrival = moment(calNextArrival()).format("HH:mm");
  var tArrival = $("<td>").text(convertNextArrival);
  //var minsAway = calMinsAway();
  //var tMinsAway = $("<td>").text(minsAway);

  addRow.append(addTrain);
  addRow.append(addDestination);
  addRow.append(addFrequency);
  addRow.append(tArrival);
  //addRow.append(tMinsAway);
  $("#add-train").append(addRow);
}


function calNextArrival() {
  var firstDeparture = moment(trainTime, "HH:mm");
  var currentTime = moment();
  var currentInterval = moment(firstDeparture);
  var nextTrain;
  var counter = 0;
    // Assume there is no next train to start with
    while(!nextTrain && counter < 500) {
      
      console.log('Train Arrival :: ', currentInterval.format("HH:mm"))

      // Define the situation where first train time is after current time
      if (firstDeparture.isAfter(currentTime)) {
        console.log('train has not left yet.')
      }
      
      if ( currentInterval.isAfter(currentTime) ) {
        // Shows next train departure time
        nextTrain = currentInterval
        
      } else {
        // Shows all previous departure time
        currentInterval.add(frequency, 'minutes')

      }
      counter++
    }
    return nextTrain

}

// Calculate the time between current time and next arrival
/*function calMinsAway() {
  var nTrain = moment(createTrain(trainTime)).format("HH:mm");
  console.log(nTrain)
  var now = moment().format("HH:mm");
  var timeUntil = moment(nTrain).diff(now);
  return timeUntil;
};*/


// When changes occurs it will print them to console and html
database.ref().on("child_added", function(snapshot) {
  // Change the HTML
  createTrain(snapshot.val().train, snapshot.val().destination, snapshot.val().frequency, snapshot.val().trainTime);

  // If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});
