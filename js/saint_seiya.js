/*
 * Author: Andrea F. Bocchese, Maria Celeste Grandi
 * Description: This Script implement the funcion that handle the logic of the page, like button events and visualization of the info
 */

// ############# CUSTOMIZATION VARIABLE #############

//  Connection and Nerds Parameters
var API_base_dir = "http://localhost:8888/PWeb_Project/API/";
var depth_to_fetch = "4"; //this is the depth to fetch when we initialize the graph (clicking on a node non in the graph)

// results's view
var per_page = 6; //how many result you want to show in the results view

// info parameter
var height_low = "55px";
var height_high = "200px";
var up_and_down_animation_time = 700;

// filter
var filter_show_down_animation_time = 700;

// ############# END CUSTOMIZATION VARIABLE #############


var labelType, useGradients, nativeTextSupport, animate;
var json_results;
var to_search = -1;
var no_results="<button type='button' class='btn btn-default' disabled='disabled'>No results...</button>";

var is_low = 1;
var tot_page;

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

function reset(id){
    if(id==null){
       $jit.id('infovis').innerHTML ='<div id ="loading"></div>';
        document.getElementById('center-container').style.backgroundColor=("#D4D4D4");
        document.getElementById('filter_button').disabled="disabled";
        document.getElementById('filter_button').style.backgroundColor=("#A2B5CD"); 
    }else{
        $jit.id('infovis').innerHTML = '<div id ="loading"><img src="resource/loading.gif"/></div>';
        document.getElementById('center-container').style.backgroundColor=("#fff");
        document.getElementById('filter_button').disabled="";
        document.getElementById('filter_button').style.backgroundColor=("#23A4FF"); 
    }    
    $jit.id('inner-details').innerHTML = "<br>Details not available...search something, or something else!";
}

function turn_arrow(degrees){
    $('#arrow_img').animate({  borderSpacing: degrees }, {
        step: function(now,fx) {
          $(this).css('-webkit-transform','rotate('+now+'deg)');
          $(this).css('-moz-transform','rotate('+now+'deg)'); 
          $(this).css('-ms-transform','rotate('+now+'deg)'); 
        },
        duration:up_and_down_animation_time
    });
}

function info_up(){
    if(is_low == 1){
        $( "#root-container" ).animate({height: height_high}, up_and_down_animation_time);
        $jit.id('inner-details').style.display="table";
        turn_arrow('+180');
        is_low = 0;
    }
}

function info_down(){
    if(is_low == 0){
        $( "#root-container" ).animate({height: height_low}, up_and_down_animation_time);
        $jit.id('inner-details').style.display="none";
        turn_arrow('0');
        is_low = 1;
    }
}

function info_toggle(){
    if(is_low == 1)
        info_up();
    else
        info_down();
}


function filter(){
    input = document.getElementById("inner_rel").getElementsByClassName("check");
    if($jit.id('inner_rel').style.height =="0px" || $jit.id('inner_rel').style.height ==0){
        $("#inner_rel").animate({height: "30"*input.length}, filter_show_down_animation_time);
        for(var i=1; i<=input.length; i++)
            $jit.id("c"+i).style.visibility="visible";
    }else{
        $("#inner_rel").animate({height: "0"}, filter_show_down_animation_time);
        for(var i=1; i<=input.length; i++)
            $jit.id("c"+i).style.visibility="hidden";
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
        url: API_base_dir+"get_property.php",
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

function search(page_number){
    
    info_down();

    if(page_number=="-1"){
       reset(); 
       page_number=0;
    }
    
    if($jit.id('inner_rel').style.height >"0px")
        filter();

    if(document.getElementById('search').value.length == 0) {
         $jit.id('res').innerHTML = "Results:";
         $jit.id('inner-list').innerHTML = no_results
         return;
    }
    to_search = document.getElementById('search').value;
    if($('#myonoffswitch').is(':checked'))
        search_in_tag(to_search,page_number);
    else
        search_in_property(to_search,page_number);
}

function redo_search(){
    if (to_search != -1)
        if($('#myonoffswitch').is(':checked'))
            search_in_tag(to_search,0);
        else
            search_in_property(to_search,0);
}

function search_in_property(search, page_number){
    
    $jit.id('inner-list').innerHTML = "";
    
    var myData = {
        "q" : search,
        "per_page" : per_page,
        "page_number" : page_number
    };
    
    $.ajax({
        type: "POST",
        url: API_base_dir+"search_property.php",
        data: myData,
        success: function(msg){
            json_results=jQuery.parseJSON(msg);
        },
        error: function(err){
            alert('error search!');
        },
        complete: function(){
            print_search(json_results, search);
            property_pagination(search, page_number);
        }
    });
}
function print_search(json_results, query){
    $jit.id('res').innerHTML = 'Results for "' +query+'":';
    for (var k in json_results)
        $jit.id('inner-list').innerHTML += "<button type='button' class='btn btn-default' onclick=pre_init("+json_results[k].id+")>"+ json_results[k].name + "</button>";
           
    if(json_results.length == 0) 
        $jit.id('inner-list').innerHTML = no_results;
}

function search_in_tag(search, page_number){
    $jit.id('inner-list').innerHTML = "";
    
    var myData = {
        "q" : search,
        "per_page" : per_page,
        "page_number" : page_number
    };
    
    $.ajax({
        type: "POST",
        url: API_base_dir+"search_tag.php",
        data: myData,
        success: function(msg){
            json_results=jQuery.parseJSON(msg);
        },
        error: function(err) {
            alert('error tag!');
        },
        complete: function(){
            print_search(json_results, search);
            tag_pagination(search, page_number);
        }
    });
}

function tag_pagination(search, page_number){

    var myData = {
        "q" : search,
    };
    
    $.ajax({
        type: "POST",
        url: API_base_dir+"search_tag_count.php",
        data: myData,
        success: function(msg){
            json_results=jQuery.parseJSON(msg);
        },
        error: function(err) {
            alert('error tag!');
        },
        complete: function(){
           tot_el = json_results.number;
            if ((tot_el % per_page) == 0 ){
                tot_page = (tot_el / per_page );
            }else{
                tot_page = Math.floor(tot_el / per_page );
            }
            create_pagination(tot_page, page_number);
        }
    });
    
}

function property_pagination(search, page_number){

    var myData = {
        "q" : search,
    };
    
    $.ajax({
        type: "POST",
        url: API_base_dir+"search_property_count.php",
        data: myData,
        success: function(msg){
            json_results=jQuery.parseJSON(msg);
        },
        error: function(err) {
            alert('error tag!');
        },
        complete: function(){
             tot_el = json_results.number;
            if ((tot_el % per_page) == 0 ){
                tot_page = (tot_el / per_page )-1;
            }else{
                tot_page = Math.floor(tot_el / per_page );
            }
            create_pagination(tot_page, page_number);
        }
    });
    
}

function create_pagination(tot_page, page){
    if(tot_page>=1){
        $jit.id('div_page').innerHTML = " <button type='button' class='btn btn-default' onclick=search(0)>&#171</button>";
        if(tot_page<=5){        
            for (i=0; i<=tot_page; i++)
            $jit.id('div_page').innerHTML += " <button type='button' class='btn btn-default' onclick=search("+i+") id='page"+i+"'>"+ (i+1)+ "</button>";
        } else {
            if(page<=2){
               for (i=0; i<4; i++)
                    $jit.id('div_page').innerHTML += " <button type='button' class='btn btn-default' onclick=search("+i+") id='page"+i+"'>"+ (i+1)+ "</button>";
                $jit.id('div_page').innerHTML += " <button type='button' class='btn btn-default' onclick=search("+(i++)+")>...</button>";
            } else if (page >= tot_page-2){
                $jit.id('div_page').innerHTML += " <button type='button' class='btn btn-default' onclick=search("+(tot_page-4)+")>...</button>";
                for (i=tot_page-3; i<=tot_page; i++)
                    $jit.id('div_page').innerHTML += " <button type='button' class='btn btn-default' onclick=search("+i+") id='page"+i+"'>"+ (i+1)+ "</button>";
            }else {
                $jit.id('div_page').innerHTML += " <button type='button' class='btn btn-default' onclick=search("+(page-2)+")>...</button>";
                for (i=page-1; i<=page+1; i++)
                    $jit.id('div_page').innerHTML += " <button type='button' class='btn btn-default' onclick=search("+i+") id='page"+i+"'>"+ (i+1)+ "</button>";
                $jit.id('div_page').innerHTML += " <button type='button' class='btn btn-default' onclick=search("+(i++)+")>...</button>";
            }
        }
           
        $jit.id('div_page').innerHTML += " <button type='button' class='btn btn-default' onclick=search("+(tot_page)+")>&#187</button>";
        id_page="page"+page;
        document.getElementById(id_page).style.backgroundColor="#EFEFEF";
    }
    else $jit.id('div_page').innerHTML = "";
}

function get_criterion(){
    var json_criterion;
    $.ajax({
        url: API_base_dir+"get_criterion.php",
        success: function(msg){
            json_criterion=jQuery.parseJSON(msg);
        },
        error: function(err) {
            alert('error!');
        },
        complete: function(){
            $jit.id('inner_rel').innerHTML ="";
            for (var k in json_criterion){
                $jit.id('inner_rel').innerHTML +="<div class='check' id='c"+json_criterion[k].id+"'' onclick='re_init()'><input type='checkbox' name='c"+json_criterion[k].id+"' checked='true'>"+ json_criterion[k].name+"</input></div><br>"; 
                $jit.id("c"+json_criterion[k].id).style.visibility="hidden";
            }
        }
    });
}

function pre_init(id){
    if ($jit.id('inner_rel').style.height > "0px")
        filter();
    init(id);
}

function re_init(){
	if(rgraph != null)
		init(rgraph.graph.getNode(rgraph.root).id);
}

function init(id){
    reset(id);
    var similarity_options = [];
    var i;

    if(id!=null){
        var input = document.getElementById("inner_rel").getElementsByClassName("check");
        for(i=0; i < input.length; i++){
            similarity_options[i] = (($('#'+input[i].id+'>input').is(':checked')) ? input[i].id.slice(1)*1 : -1);
        }


    	var json;
        var myData = {
            "id" : id,
            "depth" : depth_to_fetch,
            "similarity" : JSON.stringify(similarity_options)
        };
        $.ajax( {
            type: "POST",
            url: API_base_dir+"get_data.php",
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
                //alert(is_low);
                info_up();
                //alert(is_low);
            }
            });
        get_property(id);

    }    else{
        get_criterion();

    }
}
