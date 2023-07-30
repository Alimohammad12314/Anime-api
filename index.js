const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const ejs = require('ejs')
require('dotenv').config()

require('./db')

const animelist = require('./db')

const app = express();

app.set('view engine', 'ejs')

app.use(bodyparser.urlencoded({ extended: true }))

// request methods for rest api (all animes)

app.route('/animes')
    .get((req, res) => {
        animelist.find()
            .then((anime) => {
                res.json(anime)
            })
            .catch((err) => {
                res.send(err)
            })
    })
    .post((req, res) => {

        animelist({ title: req.body.title, Genre: req.body.Genre }).save()
            .then(() => {
                res.send("Data added")
            })
            .catch((err) => {
                res.send(err)
            })
    })
    .delete((req, res) => {
        animelist.deleteMany({})
            .then(() => {
                res.send("Data deleted")
            })
            .catch((err) => {
                res.send(err)
            })
    })

// request methods for rest api (specific animes)
app.route('/animes/:animetitle')
    .get((req, res) => {
        
        animelist.findOne({title:req.params.animetitle})
            .then((anime) => {
                res.json(anime)
            })
            .catch((err) => {
                res.send("no such anime found")
            })
    })
    .put((req, res) => {

        animelist.findOneAndUpdate({ title: req.params.animetitle},{title:req.body.title,Genre:req.body.Genre})
            .then(() => {
                res.send("Data updated")
            })
            .catch((err) => {
                res.send(err)
            })
    })
    .patch((req, res) => {

        animelist.findOneAndUpdate({ title: req.params.animetitle},{$set:{title:req.body.title,Genre:req.body.Genre}})
            .then(() => {
                res.send("Data updated")
            })
            .catch((err) => {
                res.send(err)
            })
    })
    .delete((req, res) => {
        animelist.deleteOne({title:req.params.animetitle})
            .then(() => {
                res.send("Data deleted")
            })
            .catch((err) => {
                res.send(err)
            })
    })

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})