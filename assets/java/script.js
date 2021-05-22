var time = 60;

$("#startBtn").click(function () {
  $("main").empty();

  $("main").append("<container></container>");
  $("container").append("<h3>Time Left: " + time + "</h3>");
  $("container").append("<h2>How many lands can you play per turn?</h2>");
  $("container").append("<ul></ul>");
  $("ul").append("<li>1</li>");
  $("ul").append("<li>2</li>");
  $("ul").append("<li>3</li>");
  $("ul").append("<li>4</li>");
});
