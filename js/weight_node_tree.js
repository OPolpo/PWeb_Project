var labelType, useGradients, nativeTextSupport, animate;
var jsonmio;
var json_results;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();


function sale(){
    var height_low = "55px";
    if($jit.id('root-container').style.height == height_low){
        if($jit.id('root-container').style.height == height_low){
            $( "#root-container" ).animate({
              height: "150"
              }, 700);
            $( "#inner-list" ).animate({
              height: "280"
              }, 700);
        }else{ 
        $( "#root-container" ).animate({
            height: height_low
            }, 700);
        $( "#inner-list" ).animate({
              height: "375"
              }, 700);
        }
    }
}



 function filter(){
     if($jit.id('inner_rel').style.height =="0px" || $jit.id('inner_rel').style.height ==0){
         $("#inner_rel").animate({
             height: "100"
             }, 700);
          $jit.id('c1').style.visibility="visible";
          $jit.id('c2').style.visibility="visible";
          $jit.id('c3').style.visibility="visible";
     }else{
         $("#inner_rel").animate({
             height: "0"
             }, 700);
          $jit.id('c1').style.visibility="hidden";
          $jit.id('c2').style.visibility="hidden";
          $jit.id('c3').style.visibility="hidden";
     }
 }



function get_property(id){
    var out ='';
    var myData = {
        "id" : id
    };
    
    var json_property;
    $.ajax( {
        type: "POST",
        url: "http://localhost:8888/PWeb_Project/API/get_property.php",
        data: myData,
        success: function(msg){
            json_property=jQuery.parseJSON(msg);
        },
        error: function(err) {
            alert('error!');
        },
        complete: function(){
        $jit.id('inner-details').innerHTML ="";
        for (var k in json_property)
            $jit.id('inner-details').innerHTML += json_property[k].p_name +":  " + json_property[k].p_value + "<br><br>";
        }
    });

}

function get_tag(){
    if($jit.id('inner_rel').style.height =="100px"){
        document.getElementById('filter_button').click();
    }
    var tag=document.getElementById('search').value;
    document.getElementById('search').value="";
    var no_results="<button type='button' class='btn btn-default' disabled='disabled'>No results...</button>";

    $jit.id('inner-list').innerHTML = "";
    if(tag.length == 0) {
        $jit.id('res').innerHTML = "Results:";
        $jit.id('inner-list').innerHTML = no_results
        return;
        }

    var myData = {
        "tag" : tag
    };

    $.ajax( {
        type: "POST",
        url: "http://localhost:8888/PWeb_Project/API/search_tag.php",
        data: myData,
        success: function(msg){
            json_results=jQuery.parseJSON(msg);
        },
        error: function(err) {
            alert('error tag!');
        },
        complete: function(){
        $jit.id('res').innerHTML = 'Results for "' +tag+'":';   
        for (var k in json_results)
            $jit.id('inner-list').innerHTML += "<button type='button' class='btn btn-default' onclick=init("+json_results[k].id+")>"+ json_results[k].name + "</button>";
        
        if(json_results.length == 0) 
            $jit.id('inner-list').innerHTML = no_results;
        }
    });

}

function init_tree(){
    var rgraph = new $jit.RGraph({
        //Where to append the visualization
        injectInto: 'infovis',
  
        //Add navigation capabilities:
        //zooming by scrolling and panning.
        Navigation: {
          enable: true,
          panning: true,
          zooming: 10
        },
        //Set Node and Edge styles.
        Node: {
            overridable: true,
            color: '#FFFFFF',
            dim: 8
        },
        
        Edge: {
          $color: '#C12222',
          lineWidth:1.5
        },
        onBeforeCompute: function(node){
            //Log.write("centering " + node.name + "...");
            //Add the relation list in the right column.
            //This list is taken from the data property of each JSON node.
            //$jit.id('inner-details').innerHTML = node.name;

        },
        
        onCreateLabel: function(domElement, node){
            domElement.innerHTML = node.name;
            domElement.onclick = function(){
                get_property(node.id);
                rgraph.onClick(node.id);
                if($jit.id('root-container').style.height =="55px"){
                    sale();
                }
            };
        },
        //Change some label dom properties.
        //This method is called each time a label is plotted.
        onPlaceLabel: function(domElement, node){
            var style = domElement.style;
            style.display = '';
            style.cursor = 'pointer';

            if (node._depth == 0) {
                style.fontSize = "2em";
                style.color = "#B87333";
            
            } else if(node._depth == 1){
                style.fontSize = "1em";
                style.color = "#556832";

            } else if(node._depth == 2){
                style.fontSize = "0.7em";
                style.color = "#800000";

            } else {
                style.display = 'none';
            }

            var left = parseInt(style.left);
            var w = domElement.offsetWidth;
            style.left = (left - w / 2) + 'px';
        },

        onBeforePlotNode: function(node){


            // DIMENSION
            node.setData('dim',node.data.my_weight*30/(node._depth+1),'end');
            if (node._depth > 2)
                node.setData('dim',0,'end');

            if (node._depth == 0)
                node.setData('dim',30,'end');
            

            // COLOR
            if (node._depth == 0)
                node.setData('color','#ffaa44','end');
            else
                node.setData('color','#ddeeaa','end');

        }
    });

    //load JSON data
    rgraph.loadJSON(jsonmio);

    //trigger small animation
    rgraph.graph.eachNode(function(n){
        var pos = n.getPos();
        pos.setc(-200, -200);
    });
    rgraph.compute('end');
    rgraph.fx.animate({
        modes:['polar','node-property:color:dim'],
        duration: 2000
    }); 
}

function init(id){
    $jit.id('infovis').innerHTML = '<div id ="loading"><img src="resource/loading.gif"/></div>';
    if(id!=null){
    var myData = {
        "id" : id,
        "depth" : "2",
        "family" : (($('#c1>input').is(':checked')) ? 1 : 0),
        "friends" : (($('#c2>input').is(':checked')) ? 1 : 0),
        "collleagues" : (($('#c3>input').is(':checked')) ? 1 : 0)
    };
    $.ajax( {
        type: "POST",
        url: "http://localhost:8888/PWeb_Project/API/get_data.php",
        data: myData,
        success: function(msg){
            //alert(msg);
            jsonmio=jQuery.parseJSON(msg);
        },
        error: function(err) {
            alert('error!');
        },
        complete: function() {
            $jit.id('loading').innerHTML = '';
            init_tree();
            
            if($jit.id('root-container').style.height =="55px"){
                sale();
            }

        }
    });
    get_property(id);
    }
}
