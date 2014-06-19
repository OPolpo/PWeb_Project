/*
 * Author: Andrea F. Bocchese, Maria Celeste Grandi
 * Description: This Script implement the funcion that handle the logic of the page, like button events and visualization of the info
 */

var labelType, useGradients, nativeTextSupport, animate;
var json_results;

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

function turn_arrow(degrees){
    $('#arrow_img').animate({  borderSpacing: degrees }, {
        step: function(now,fx) {
          $(this).css('-webkit-transform','rotate('+now+'deg)'); 
        },
        duration:700
    });
}

function info_up(){
    if($jit.id('root-container').style.height == height_low){
        $( "#root-container" ).animate({height: "150"}, 700);
        $( "#inner-list" ).animate({height: "280"}, 700);
        $jit.id('inner-details').style.display="table";
        turn_arrow('+180');
    }
}

function info_down(){
    if($jit.id('root-container').style.height != height_low){
        $( "#root-container" ).animate({height: height_low}, 700);
        $( "#inner-list" ).animate({height: "375"}, 700);
        $jit.id('inner-details').style.display="none";
        turn_arrow('0');
    }
}

function info_toggle(){
    if($jit.id('root-container').style.height == height_low)
        info_up();
    if($jit.id('root-container').style.height != height_low)
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
            $jit.id('inner-details').innerHTML = "<dl>";
            for (var k in json_property){
                $jit.id('inner-details').innerHTML += "<dt><h3>"+json_property[k].p_name +":</h3></dt><dd>" + json_property[k].p_value + "</dd>";
                }
            $jit.id('inner-details').innerHTML += "</dl>"; 
        }
    });
    
}

function search(){
    showLoading();
    if($jit.id('inner_rel').style.height =="100px"){
        document.getElementById('filter_button').click();
    }

    if($('#myonoffswitch').is(':checked'))
        search_in_tag();
    else
        search_in_property();
}

function search_in_property(){

    var property=document.getElementById('search').value;
    document.getElementById('search').value="";
    var no_results="<button type='button' class='btn btn-default' disabled='disabled'>No results...</button>";
    
    $jit.id('inner-list').innerHTML = "";
    
    var myData = {
        "q" : property
    };
    
    $.ajax({
        type: "POST",
        url: "http://localhost:8888/PWeb_Project/API/search_property.php",
        data: myData,
        success: function(msg){
            json_results=jQuery.parseJSON(msg);
        },
        error: function(err){
            alert('error search!');
        },
        complete: function(){
            print_search(json_results, property);
        }
    });
}
function print_search(json_results, query){
    $jit.id('res').innerHTML = 'Results for "' +query+'":';
    for (var k in json_results)
        $jit.id('inner-list').innerHTML += "<button type='button' class='btn btn-default' onclick=init("+json_results[k].id+")>"+ json_results[k].name + "</button>";
           
    if(json_results.length == 0) 
        $jit.id('inner-list').innerHTML = no_results;
}

function search_in_tag(){
    var tag=document.getElementById('search').value;
    document.getElementById('search').value="";
    var no_results="<button type='button' class='btn btn-default' disabled='disabled'>No results...</button>";
    
    $jit.id('inner-list').innerHTML = "";
    
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
            print_search(json_results, tag);
        }
    });
}

function re_init(){
	if(rgraph != null)
		init(rgraph.graph.getNode(rgraph.root).id);
}

function init(id){
    showLoading();
    var similarity_options = [];
    // if true the value is the id of the similarity criterion in the database otherwise a negative value
    similarity_options[0] = (($('#c1>input').is(':checked')) ? 1 : -1);
    similarity_options[1] = (($('#c2>input').is(':checked')) ? 2 : -1);
    similarity_options[2] = (($('#c3>input').is(':checked')) ? 3 : -1);

    if(id!=null){
    	var json;
        var myData = {
            "id" : id,
            "depth" : "3",
            "similarity" : JSON.stringify(similarity_options)
        };
        $.ajax( {
            type: "POST",
            url: "http://localhost:8888/PWeb_Project/API/get_data.php",
            data: myData,
            success: function(msg){
                json=jQuery.parseJSON(msg);
            },
            error: function(err) {
                alert('error!');
            },
            complete: function() {
                $jit.id('loading').innerHTML = '';	
                init_tree(json);
                info_up();
            }
            });
        get_property(id);
    }
}
