/*
 * Author: Andrea F. Bocchese, Maria Celeste Grandi
 * Description: This Script implement the funcion that handle the logic of the page, like button events and visualization of the info
 */

var labelType, useGradients, nativeTextSupport, animate;
var json_results;

var height_high = "155px";
var height_low = "55px";

(function() {
 var ua = navigator.userAgent,
 iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
 typeOfCanvas = typeof HTMLCanvasElement,
 nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
 textSupport = nativeCanvasSupport && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
 //I'm setting this based on the fact that ExCanvas provides text support for IE
 //and that as of today iPhone/iPad current text support is lame
 labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
 nativeTextSupport = labelType == 'Native';
 useGradients = nativeCanvasSupport;
 animate = !(iStuff || !nativeCanvasSupport);
 })();

function showLoading(){
    $jit.id('infovis').innerHTML = '<div id ="loading"><img src="resource/loading.gif"/></div>';
}

function info_up(){
    if($jit.id('root-container').style.height == height_low){
        $( "#root-container" ).animate({height: height_high}, 700);
        $( "#inner-list" ).animate({height: height_high}, 700);
    }
}

function info_down(){
    if($jit.id('root-container').style.height == height_high){
        $( "#root-container" ).animate({height: height_low}, 700);
        $( "#inner-list" ).animate({height: height_low}, 700);
    }
}

function info_toggle(){
    if($jit.id('root-container').style.height == height_low)
        info_up();
    if($jit.id('root-container').style.height == height_high)
        info_down();
}


function filter(){
    if($jit.id('inner_rel').style.height =="0px" || $jit.id('inner_rel').style.height ==0){
        $("#inner_rel").animate({height: "100"}, 700);
        $jit.id('c1').style.visibility="visible";
        $jit.id('c2').style.visibility="visible";
        $jit.id('c3').style.visibility="visible";
    }else{
        $("#inner_rel").animate({height: "0"}, 700);
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
    $.ajax({
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
    showLoading();
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
    
    $.ajax({
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
