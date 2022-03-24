const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/api', async (req, res) => {

    try {
        const url = "https://ge.globo.com/futebol/times/flamengo/noticia/2022/03/24/flamengo-otimista-e-athletico-pr-senhor-do-tempo-entenda-o-jogo-de-paciencia-por-santos.ghtml";
    
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url); 
    
        const pageData = await page.evaluate(() => {
            return {
                title: document.getElementsByTagName("h1")[2].innerText,
                content: document.getElementsByTagName("article")[0].innerText
            }
        })
    
        // console.log(pageData);
    
        res.json(pageData);
    
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }})

app.listen(8888)