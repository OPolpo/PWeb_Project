/*
 * Author: Andrea F. Bocchese, Maria Celeste Grandi
 * Description: This Script handle the visualization of the node tree.
 */

var json;

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
