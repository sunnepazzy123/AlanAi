import React, {useState, useEffect, createRef} from 'react';
import {Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography} from "@material-ui/core"
import useStyles from "./styles.js";
import classNames from "classnames";


export default function NewsCard({article, i, activeArticles}) {
    const classes = useStyles();
    const [elRefs, setElRefs] = useState([]);
    const scrollToRef = (ref)=> window.scroll(0, ref.current.offsetTop - 50);


    useEffect(()=>{
        setElRefs((refs)=> Array(20).fill().map((_, j)=> refs[j] || createRef()))
    }, []);

    useEffect(()=>{
        if(i === activeArticles && elRefs[activeArticles]){
            scrollToRef(elRefs[activeArticles]);
        }
    }, [i, activeArticles, elRefs]);

    let {description, publishedAt, source, title, url, urlToImage} = article;
    return (
      <Card ref={elRefs[i]} className={classNames(classes.card, activeArticles === i ? classes.activeCard : null ) }>
          <CardActionArea href={url} target="_blank">
              <CardMedia className={classes.media} image={urlToImage || "https://jasonngpartners.com/wp-content/uploads/2012/09/News_image.jpg" } />
              <div className={classes.details}>
                  <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
                  <Typography variant="body2" color="textSecondary" component="h2">{source.name}</Typography> 
              </div>
                <Typography gutterBottom variant="h5" className={classes.title} >{title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
                </CardContent>

          </CardActionArea>
          <CardActions className={classes.cardActions}>
              <Button size="small" color="primary">Learn More</Button>
              <Typography variant="h5" color="textSecondary" component="p">{i + 1}</Typography>
          </CardActions>
      </Card>
    )
}
