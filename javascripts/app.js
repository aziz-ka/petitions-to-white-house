
function randomColor() {
  return "#" + Math.floor(Math.random()*16777215).toString(16);
};

function visualize(data) {
  var svg = d3.select("svg");

  var circles = svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle");

  var circles = svg.selectAll("circle")
    .data(data)
    .transition()
    .duration(10)
      .attr("r", function(d) {
        if (d < 1000) {
          return d/100 + "px";
        };
        return d/1000 + "px";
      })
      .attr("cx", function() {return Math.random()*100 + "%"})
      .attr("cy", function() {return Math.random()*100 + "%"})
      .style("fill", function() {return randomColor()});

  svg.selectAll("circle").data(data).exit().remove();
}

$(function() {
  d3.select("svg").attr("width", "100%").attr("height", "100%");

  $.ajax({
    url: 'https://api.whitehouse.gov/v1/petitions.json?limit=100&isPublic=1',
    method: 'get',
    dataType: 'json',
    success: function(data) {
      var signatures = [];
      $(data.results).each(function(i) {
        var petition = [data.results[i].signatureCount];
        signatures.push(petition);
      });

      // setInterval(function() {
        visualize(signatures);
      // }, 1000);
    }
  })
})


