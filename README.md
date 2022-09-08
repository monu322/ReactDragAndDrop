# React Drag and Drop Project 🦾


## Overview

Flexible ReactJS + Python flask web-app for quickly sorting images into groups.

## Assets

1. **Image Directory** _./images_: a directory containing the images to be grouped. All image filenames are named as IMAGE_ID.jpg

2. **Metadata Directory** _./metadata_: a directory containing image attributes, such as the image name, image title, and image group name. All filenames are of the form IMAGE_ID.json

3. **Frontend Directory** _./frontend_: a directory containing the basic setup for the frontend (based on React). The basic setup loads a simple webpage, with a greetings message.

4. **Backend Directory** _./backend_: a directory containing the basic setup for the backend (based on Python and Flask). The basic setup includes code for launching a Flask application, as well as for sending image metadata information via a GET request. Further details are included in the code comments.


The images consist of two types: (i) friendly humans (referred to as _human_),
(ii) killer robots (referred to as _terminator_).

![Friendly Human](human_example.jpg)  
_Friendly Human_

![Killer Robot](robot_example.jpg)  
_Killer Robot_

The image metadata includes a _group_ field, specifying whether the corresponding image is an image of a terminator, or a human, respectively.

Using this interface, we can move the images around the groups, fixing any errors, and save this information persistently.

![Visual Abstract](utopia.jpg)
_Visualisation of what happens when you use efficient human-AI interfaces for ensuring AI safety_


### Summary:

The web-app have the following functionality:

1. Loading images sent by the backend
2. Displaying the images, grouped by their corresponding group tags
3. Selecting multiple images
4. Moving the selected images across the two groups
5. Saving the updated groupings, by sending new information from the frontend to the backend.


