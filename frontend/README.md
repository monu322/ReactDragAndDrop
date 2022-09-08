# React drag and drop Frontend 🦾

This is an interface that enables the user to classify images by drag and drop. User can select multiple images and and drop them across the categories. On each drop, the newly classified metadata is sent across to backend for verification.

![Visual Abstract](ui.gif)

## Running locally

### 1. Run the Flask backend

Navigate to the "backend" folder. Instsall necessary pip libraries before firing up the backend

`pip3 install flask flask_cors`

Run the backend using command

`python3 __main__.py`

To verify if the backend is running, go to http://localhost:6789/hello and see if it returns a success message

### 2. Run the frontend

Navigate to the "frontend" folder. Instsall necessary node packages by running

`npm install`

Run the React frontend using command

`npm start`

You can view the frontend at http://localhost:3000
