PWeb_Project
============

This is a project for Web programming class.

The aim of the project is to implement a system to explore (with a weighted node tree) a database.
The schema of the database is defined by the professor.
To achieve our purpose, we used a modified versione of JIT, a rgraph class with little changes.

**Usage tip**

The Database provided is very small, you can try searching words like “bronzo” or “nero” to have some tag results.


**How to customize**

- node tree view
	
	At the beginning of the file *”weight_node_tree.js”* we provided some variable to customize the visualisation of the node tree, you can change may parameters (node, edge, label colors; label font size; how much level of node visualise).

- main window

	At the beginning of the file *”saint_seiya.js”* we provided some costumization variables like:

	- API_base_dir: the path to the api directory

	- depth_to_fetch: how much level of node you want to fetch from the database when you click on a node

	- per_page: how much results you want to visualise for each page 

	- height_low: the height of the div with the details, when it's down/close
   
    - height_high: the height of the div with the details, when it's up/open

    - up_and_down_animation_time: the duration of the animation of the div with the details

    - filter_show_down_animation_time: the duration of the animation of the div with the filter's criterion

- PHP api

	All parameter about database connection are specified in a single file *“config.php”*

