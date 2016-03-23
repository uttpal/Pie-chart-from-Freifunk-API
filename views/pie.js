function drawc (data) {


var options = {
    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke : true,

    //String - The colour of each segment stroke
    segmentStrokeColor : "#fff",

    //Number - The width of each segment stroke
    segmentStrokeWidth : 2,

    //Number - The percentage of the chart that we cut out of the middle
    percentageInnerCutout : 50, // This is 0 for Pie charts

    //Number - Amount of animation steps
    animationSteps : 100,

    //String - Animation easing effect
    animationEasing : "easeOutBounce",

    //Boolean - Whether we animate the rotation of the Doughnut
    animateRotate : true,

    //Boolean - Whether we animate scaling the Doughnut from the centre
    animateScale : false,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

}


var ctx = document.getElementById("pie").getContext("2d");
new Chart(ctx).Pie(data,options);
}
console.log(211)

//var url = "http://api.freifunk.net/data/ffSummarizedDir.json?callback=drawc";

// var script = document.createElement('script');
// script.src = url
// document.getElementsByTagName('head').appendChild(script);

var url = "/data.json";

$.getJSON(url, function(data) {

    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    var output = [];

    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var val = data[key];
        if (val.state.nodes) {
            var structure =     {
                value: val.state.nodes,
                color: getRandomColor(),
                highlight: "#FFC870",
                label: val.name
            }
            output.push(structure)
        }

      }
    }

    drawc(output);
});