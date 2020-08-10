import React, {useEffect, useState} from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from './styles';

import {Typography} from "@material-ui/core";


import headerLogo from "./images/wireAlan_Reduce.jpeg"
import logo from "./images/wdt-brandwhite.png"


import wordsToNumbers from "words-to-numbers";

const alanKey = "678e65a153fa4d6aef45a7036f6b09fc2e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = ()=>{

    const classes = useStyles();


        const [newsArticles, setNewsArticles] = useState([]);
        const [activeArticles, setActiveArticles] = useState(-1);


    useEffect(()=>{
        alanBtn({
            key: alanKey,
            onCommand: ({command, articles, number})=>{
                if(command === "newHeadlines"){
                    // alert("This code was executed");
                    // console.log(articles)

                    setNewsArticles(articles);
                    setActiveArticles(-1);

                }else if(command === "highlight"){
                    setActiveArticles((prevActiveArticles) => prevActiveArticles + 1);
                }else if(command === "open"){
                    const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];
          
                    if (parsedNumber > 20) {
                      alanBtn().playText('Please try that again...');
                    } else if (article) {
                      window.open(article.url, '_blank');
                      alanBtn().playText('Opening...');
                    } else {
                      alanBtn().playText('Please try that again...');
                    }
                }
            },
        })
    }, []);

    return (
        <div>
        <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
          </div>
        ) : null}
        <img src={headerLogo} className={classes.alanLogo} alt="logo" />
      </div>
            <NewsCards articles={newsArticles} activeArticles={activeArticles} />

            <div className={classes.footer}>
          <Typography variant="body1" component="h2">
            Created by
            <a className={classes.link} href="#"> Odibo Sunday</a> -
         
          </Typography>
          <img className={classes.image} src={logo} height="50px" alt="JSMastery logo" />
        </div>
        </div>
    );
}

export default App;