import React, {useEffect, useState} from "react";

import './image-grid.styles.css';

import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import './image-grid.styles.css';

export default function ImageGrid({
    images, 
    group, 
    draggedItem, 
    setDraggedItem, 
    setImages,
    checkStatus,
    transferTo
}) {

    const onDragOver = (e)=>{
        e.preventDefault();
    }

    const onDragStart = (e, id, group)=>{
        setDraggedItem({
            id:id,
            group:group
        });
    }

    const onDrop = (e, category)=>{
        
        transferTo(category);
        setDraggedItem({});
        checkStatus();
    }

    const selectImage = (e, imgId)=>{
        console.log('Img ', imgId, ' selected.');

        const images_array = images;

        const objIndex = images_array.findIndex((obj => obj.id == imgId));
        images_array[objIndex].isClicked = !images_array[objIndex].isClicked

        setImages(images_array);
        localStorage.setItem("images", JSON.stringify(images_array));
        setDraggedItem({});
    }

    return (
        
        <>

            
            <Grid item xs={6}>
                <Card align='center' className="group-card">
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {group==='human'?'Friendly Humans':'Killer Robots'}
                        </Typography>
                        <Grid
                            className="img-grid-container"
                            onDrop={(e)=>onDrop(e, group)} 
                            onDragOver={(e)=>onDragOver(e)} container spacing={2}>
                            
                            {
                                images?images.map(image=>{

                                    if(image.group===group)
                                    {
                                        return(
                                            <Grid
                                                onDragStart={(e)=>onDragStart(e, image.id, image.group)} 
                                                draggable 
                                                item 
                                                key={image.id} 
                                                xs={12} sm={6} md={4} lg={3}
                                                onClick={(e)=>selectImage(e, image.id)}
                                                className="img-box"
                                            >
                                                <span className="img-id-span">{image.id}</span>
                                                <img 
                                                    className={"image "+(image.isClicked?'selected':'')} 
                                                    src={`http://192.168.0.24:6789/api/images/${image.id}`}/>
                                            </Grid>
                                        )
                                    }
                                }):''
                            }
                            
                            
                        </Grid>
                        
                        

                    </CardContent> 
                </Card>
            </Grid>      
        </>
)}
