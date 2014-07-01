/*
 * Author: Andrea F. Bocchese, Maria Celeste Grandi
 * Description: This Script handle the visualization of the node tree.
 */

// ######## NODE ########
var node_start_color = '#FFFFFF';
var node_color = '#ddeeaa';
var root_color = '#ffaa44';
var edge_color = '#C12222';
var my_depth_to_visualize = 1;

// ######## LABEL ########
var root_label_color = '#B87333';
var root_lable_font_size = '2em';

var node_lable_1_color = '#556832';
var node_lable_1_font_size = '1em';

var node_lable_2_color = '#800000';
var node_lable_2_font_size = '0.7em';

var rgraph = null;
function init_tree(json){
    rgraph = new $jit.RGraph({
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
            color: node_start_color,
            dim: 8
        },
        
        Edge: {
            $color: edge_color,
            lineWidth:1.5
        },
        
        onCreateLabel: function(domElement, node){
            domElement.innerHTML = node.name;
            domElement.onclick = function(){
                get_property(node.id);
                rgraph.onClick(node.id);
                info_up();
            };
        },
        //Change some label dom properties.
        //This method is called each time a label is plotted.
        onPlaceLabel: function(domElement, node){
            var style = domElement.style;
            style.display = '';
            style.cursor = 'pointer';
            
            if (node._depth == 0) {
                style.fontSize = root_lable_font_size;
                style.color = root_label_color;
            }
            else if(node._depth == 1){
                style.fontSize = node_lable_1_font_size;
                style.color = node_lable_1_color;
            
            }
            else if(node._depth == 2){
                style.fontSize = node_lable_2_font_size;
                style.color = node_lable_2_color;
            
            } 
            if(node._depth > my_depth_to_visualize){
                style.display = 'none';
            }
            
            var left = parseInt(style.left);
            var w = domElement.offsetWidth;
            style.left = (left - w / 2) + 'px';
        },
        
        onBeforePlotNode: function(node){
            // DIMENSION
            node.setData('dim',node.data.my_weight*30/(node._depth+1),'end');
            if (node._depth > my_depth_to_visualize)
               node.setData('dim',0,'end');
            
            if (node._depth == 0)
               node.setData('dim',30,'end');
            
            // COLOR
            if (node._depth == 0)
               node.setData('color',root_color,'end');
            else
               node.setData('color',node_color,'end');   
    }
});
    
    //load JSON data
    rgraph.loadJSON(json);
    
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
