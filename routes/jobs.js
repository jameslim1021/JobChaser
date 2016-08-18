"use strict";
var express = require('express');
var router = express.Router();
var request = require('request');
var pg = require("pg");
var knex = require("../db/knex");

router.get('/', function(req, res, next) {
    if(req.session.passport) {
      let displayName = req.session.passport.user.displayName.split(' ');
      let passportFirst = displayName[0];
      let passportLast = displayName[1];
      let passportID = req.session.passport.user.id;
        knex('users').select().where({linkedin_id:passportID}).then(function(user){
          if (user[0] === undefined) {
            knex('users').insert({first_name:passportFirst, last_name:passportLast, linkedin_id:passportID}).returning('id').then(function(id){
              req.session.passport.id = parseInt(id);
            });
          } else {
            req.session.passport.id = parseInt(user[0].id);
          }
        });
    }

    var userID;
    if(req.session.user){
      userID = req.session.user.id;
    }
    let title = req.query.title;
    let location = req.query.location;
    let page = req.query.page || 1;
    let currentQuery = req.query;
    let offset = parseInt(page)*10;
    request(`http://api.indeed.com/ads/apisearch?publisher=4710753624090411&sort=&radius=&st=&jt=&limit=&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2&format=json&q=${title}&l=${location}&start=${offset}`,function(err,data){
        // let jobs = JSON.parse(data.body).results;
        let totalPages = Math.floor((JSON.parse(data.body).totalResults)/10);
        let totalResults = JSON.parse(data.body).totalResults;
        let jobs = [
            {jobtitle: "Software Engineer", company: "Google", formattedLocation: "San Francisco, CA", snippet: "Develop, test, and deliver creative solutions to a variety of client marketing challenges, using web-based technologies and data-driven solutions on top of interactive marketing platforms. Work with some of the greatest brands and companies in the world to deliver solutions that will touch millions of people and grow in the job."},
            {jobtitle: "Software Engineer(Web Back End)", company: "Apple", formattedLocation: "San Francisco, CA", snippet: "5 years experience"},
            {jobtitle: "Software Engineer - Platform", company: "Realogy", formattedLocation: "San Francisco, CA", snippet: "5 years experience"},
            {jobtitle: "Software Developer II", company: "Marin Software", formattedLocation: "San Francisco, CA", snippet: "5 years experience"},
            {jobtitle: "Software Engineer(Web Applications)", company: "Zephyr Health", formattedLocation: "San Francisco, CA", snippet: "5 years experience"},
            {jobtitle: "Software Engineer(San Francisco)", company: "Apex Systems", formattedLocation: "San Francisco, CA", snippet: "5 years experience"},
            {jobtitle: "Java Developer", company: "Cobra Solutions", formattedLocation: "San Francisco, CA", snippet: "5 years experience"},
            {jobtitle: "Junior Front End Engineer", company: "Fitbit", formattedLocation: "San Francisco, CA", snippet: "5 years experience"},
            {jobtitle: "Software Engineer III", company: "Anki", formattedLocation: "San Francisco, CA", snippet: "5 years experience"},
            {jobtitle: "Software Developer - Team Lead", company: "Pinnacle", formattedLocation: "San Francisco, CA", snippet: "5 years experience"},
            {jobtitle: "Senior Software Engineer", company: "Premise", formattedLocation: "San Francisco, CA", snippet: "5 years experience"},
            {jobtitle: "Junior Software Engineer", company: "Arena Solutions", formattedLocation: "San Francisco, CA", snippet: "5 years experience"},
            {jobtitle: "Front End Software Developer", company: "Apttus", formattedLocation: "San Francisco, CA", snippet: "5 years experience"},
            {jobtitle: "Senior Software Engineer", company: "ThredUP", formattedLocation: "San Francisco, CA", snippet: "5 years experience"},
            {jobtitle: "Senior Software Engineer", company: "Sungevity", formattedLocation: "San Francisco, CA", snippet: "5 years experience"},
            {jobtitle: "Back-End Software Engineer", company: "Uber", formattedLocation: "San Francisco, CA", snippet: "Uber Engineering is a high-performance culture marked by fearlessness and hyperproductivity. We’re looking for team players with natural product intuition who can work harder, faster, and smarter without sacrificing technical excellence. Our organizational challenges are unique, so you should be comfortable in uncharted territory and pumped to build systems that can support cities of 100,000 and 10 million people alike."}]
        res.render('index', {err:err,
                            jobs:jobs,
                            currentQuery:currentQuery,
                            page:page,
                            totalPages:100,
                            userID:userID||null,
                            totalResults:100
                          });
    });
});

module.exports = router;
