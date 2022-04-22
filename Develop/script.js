// var array = ["", "", "", "", "", "", "", "", ""];
var currentDay = document.getElementById("currentDay");
var today = document.createElement("p");
var currentTime = moment().hour();

today.textContent = moment().format("dddd, MMMM Do, YYYY");
//use Moment.js to get today's date
currentDay.appendChild(today);

$(document).ready(function () {
  //for header tag
  var date = moment().format("dddd, MMMM Do");
  //for highlighting functionality
  var time = moment().format("HH");


  //inits planner
  loadEvents();
  highlighter();

  $("#currentDay").text(date);

  function highlighter() {
    $(".container-fluid .row").each(function () {
      var hour = $(this).children().first().attr("data-time");
      var block = $(this).children().next(".description");


      if (time == hour) {
        block.addClass("present");
      } else if (time < hour) {
        block.addClass("future");
      } else {
        block.addClass("past");
      }
    })
  }

  function saveEvent() {
    localStorage.setItem("events", JSON.stringify(array));
    console.log("Events Array")
  }

  function loadEvents() {
    // if (localStorage.length === 0 || localStorage.getItem("events") == null) {
    //   //Error handling; don't attempt JSON parsing if localStorage is empty
    //   console.log("events = null")
    // } else {
    //   console.log("null")
      //Proceed with parsing and loading events
      // var storedEvents = JSON.parse(localStorage.getItem("events"));

      //Loop through all rows within main container div
      $(".container-fluid .row").each(function () {
        // var timeStamp = $(this).find(".hour").attr("data-time");

        var timeStamp = $(this).find(".hour").text(); 

        var storedEvents = localStorage.getItem(timeStamp);

        $(this).find(".description").text(storedEvents);
        // $(this).find(".description").text(storedEvents[$(this).attr("data-index")]);
      });

      //returns storedEvents to array to be used outside of function
      // array = storedEvents;
    // }
  }

  //   $(".container-fluid .row").on("click", function (event) {
  //     event.preventDefault();
  //     highlighter();
  //     var element = event.target;

  //     console.log(event.target)
  //     //only take action if a button is pressed
  //     if (element.matches("button") === true) {

  //       array[element.parentElement.getAttribute("data-index")] = $(element).siblings(".description").val();
  //       saveEvent();
  //     }
  //   });
  // });

  //Saved it 

  $(".saveBtn").on("click", function () {
    console.log($(this));
    //siblings 
    var event = $(this).siblings(".description").val();
    // var time = $(this).siblings(".hour").attr("data-time");
    var time = $(this).siblings(".hour").text();
    console.log(time, event)

    localStorage.setItem(time, event);

  });


}); 
