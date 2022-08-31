import React, {useEffect, useState} from "react";

import Alert from '@mui/material/Alert';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import ImageGrid from "../image-grid/image-grid.component";

import './image-sorter.styles.css';

import axios from 'axios';

import utopiaImg from '../../assets/utopia.jpg';
import apocalypseImg from '../../assets/apocalypse.jpg';

export default function ImageSorter() {

    const [saved, setSaved] = useState(false);
    const [images, setImages] = useState(null);
    const [draggedItem, setDraggedItem] = useState(null);

    function getImageData() {

        if("images" in localStorage)
        {
            setImages(JSON.parse(localStorage.getItem("images")));
        }
        else
        {
            // Make a request for image data if no images in localStorage
            axios.get('http://192.168.0.24:6789/api/load_img_data')
            .then((response)=>{

                //convert response to array of objects and store in state
                let imgArray = Object.keys(response.data.imgData).map(key => {
                    return response.data.imgData[key];
                })

                setImages(imgArray);
                
                // save to localStorage
                localStorage.setItem("images", JSON.stringify(imgArray));

                checkStatus();
            })
            .catch((error)=>{
                console.log(error);
            })   
        }
        
    };

    const checkStatus = ()=>{
        if(images)
        {
            //processing state data for sending to backend
            var output_data = {};
            
            for (let i = 0; i < images.length; i++) 
            {
                const img_id = images[i].id;
                output_data[img_id] = {
                    id: images[i].id,
                    group: images[i].group
                };
            } 

            //sending post request for verification
            axios.post('http://192.168.0.24:6789/api/check_grouping', 
            {imgMetadata:output_data})
            .then(function (response) {
                //updating state with status
                setSaved(response.data.success);
            })
            .catch(function (error) {
                console.log(error);
            });
            
        }
    }

    useEffect(()=>{
        //check humanity status whenever state image data changes
        checkStatus();
    }, [images]);

    useEffect(()=>{
        getImageData();
    },[]);

    const handleReset = ()=>{
        localStorage.removeItem('images');

        //make a fresh request to backend
        getImageData();
    }

    const transferTo = (category)=>
    {
        console.log('tranfered to ', category);
        if(images)
        {
            //change group of elements
            const newImages = images.map(img =>
                (img.isClicked === true || img.id===draggedItem.id) && img.group!==category
                  ? { ...img, group: category, isClicked:false }
                  : img
            );
    
            localStorage.setItem("images", JSON.stringify(newImages));
            setImages(newImages);
        }
        
    }

    return (
        
          <div className="image-sorter" style={{backgroundImage: `url(${saved?utopiaImg:apocalypseImg})`}}>
                <Grid className='alert-container' container spacing={1}>
                    <Grid item xs={10}>
                        {
                            saved?<Alert severity="success">Thank you for saving humanity, Tenyksian!</Alert>
                            :<Alert severity="warning">
                                Humanity is in danger!<br/>
                                Select multiple images and drag them across boxes to save humanity!<br/>
                            </Alert>
                        }
                    </Grid>
                        <Grid item xs={2}>
                            <Button disableElevation fullWidth onClick={handleReset} variant="contained">Reset</Button>
                        </Grid>
                </Grid>
                <Grid className='grid-container' container spacing={5}>
                    <ImageGrid 
                        draggedItem={draggedItem} 
                        setDraggedItem={setDraggedItem} 
                        group='human' 
                        images={images}
                        setImages={setImages}
                        checkStatus={checkStatus}
                        transferTo={transferTo}
                    />
                    
                    <ImageGrid 
                        draggedItem={draggedItem} 
                        setDraggedItem={setDraggedItem} 
                        group='terminator' 
                        images={images}
                        setImages={setImages}
                        checkStatus={checkStatus}
                        transferTo={transferTo}
                    />
                </Grid>
            </div>
)}
