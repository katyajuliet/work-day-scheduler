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


  function loadEvents() {

    //Loop through all rows within main container div
    $(".container-fluid .row").each(function () {

      var timeStamp = $(this).find(".hour").text();
      var storedEvents = localStorage.getItem(timeStamp);

      $(this).find(".description").text(storedEvents);

    });

  }


  //Saved it 

  $(".saveBtn").on("click", function () {
    console.log($(this));
    //siblings 
    var event = $(this).siblings(".description").val();

    var time = $(this).siblings(".hour").text(); 
    // console.log(time, event)

    localStorage.setItem(time, event);

  });


}); 
