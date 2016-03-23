function drawc (data,canvasId) {


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


var ctx = document.getElementById(canvasId).getContext("2d");
new Chart(ctx).Pie(data,options);
}

var url = "http://api.freifunk.net/map/ffApiJsonp.php?mode=summary&callback=?";

function getDataAndDraw (data) {
    

    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function outputDataFromObj (data) {
        var output = []
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                var structure = {
                    value: data[key],
                    color: getRandomColor(),
                    highlight: "#FFC870",
                    label: key
                }
                output.push(structure);
            }
        }
        return output;
    }

    function createValuesObject (dataArray, rawObj) {
        for (var i = 0; i < dataArray.length; i++) {
            if (dataArray[i].length > 1) {
                if(rawObj[""+ dataArray[i]]){
                    rawObj[""+ dataArray[i]]++;
                } else{
                    rawObj[""+ dataArray[i]] = 1;
                }
            };
        }
        return;
    }
    var outputPie = [];
    var rawRoute = {};
    var rawFocus = {};

    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var val = data[key];
        if (val.state.nodes) {
            var nodesStructure = {
                value: val.state.nodes,
                color: getRandomColor(),
                highlight: "#FFC870",
                label: val.name
            }
            outputPie.push(nodesStructure)
        }

        var routingArray = val.techDetails.routing;
        createValuesObject(routingArray,rawRoute);

       var focusArray = val.state.focus;
        if(focusArray){
            createValuesObject(focusArray,rawFocus);
        }
        }

      }
    var outRouter = outputDataFromObj(rawRoute);
    var outFocus = outputDataFromObj(rawFocus);


    drawc(outFocus,"focus");
    drawc(outputPie,"pie");
    drawc(outRouter,"route");
    }


 $.ajax({
        type: 'GET',
        url: url,
        dataType: 'jsonp',
        success: getDataAndDraw
    });