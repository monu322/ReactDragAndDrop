import React from 'react';
import ReactDOM from 'react-dom';

import './app.css';


import ImageSorter from './components/image-sorter/image-sorter.component';

const axios = require('axios');

class Viewer extends React.Component {

    render() {
        let content =
            <div>

                <ImageSorter></ImageSorter>

            </div>

        return content
    }
}


ReactDOM.render(
  <Viewer />,
  document.getElementById('root')
);
