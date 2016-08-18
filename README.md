# JobChaser

Full-Stack, CRUD Web Application for those on the job hunt

## Motivation

This was the second project after 11 weeks of attending the Galvanize full-stack web development program and was done in a group of three. [My first project](https://github.com/jameslim1021/Canvas-Basketball-Game) was a purely front-end basketball game using HTML/CSS/Javascript so after learning the back-end portion of the full-stack, my group wanted to build an app that followed the principals of CRUD. As finding a job was (and still is) a top priority, we realized there wasn't a great tool for consolidating job search information. Typically this is done by keeping track of numerous emails, bookmarking job posts, and loose pieces of paper. We wanted to create a central location for users to browse jobs via Indeed.com's API, keep a personal list of jobs they're interested in, and related information to these jobs (notes, application stage, interview questions).

## Screenshots
Job Search Page

><img src="/public/images/ss1.png" alt="Drawing" style="width: 200px;"/>

User Job List

><img src="/public/images/ss2.png" alt="Drawing" style="width: 200px;"/>

Job Application Information

><img src="/public/images/ss3.png" alt="Drawing" style="width: 200px;"/>

## Challenges

One of the challenges we faced was about working in a group to build an application. Understanding the process and flow of Github took a bit of time to adjust to. There were more merge conflicts than we expected which were tedious to resolve. Creating a proper, working SQL schema for the data was also challenging to conceptualize. Thus, writing the Knex statements to make Postgres queries was equally difficult. Another challenge was properly rendering a lot of data using the templating engine EJS. There was a good amount of if/else logic to display certain content which was tricky to navigate. Pagination was also a lot harder than I realized. New found appreciation for the level of difficulty in programming small features like pagination that are seemingly trivial for the casual user.

## Technologies Used

* HTML/CSS(Foundation)
* Javascript
* jQuery
* Node.js
* Express
* EJS
* PostgreSQL
* Knex

## To-Do

* Debug errors to deploy to Heroku
* Fix pagination
* Add more inputs for users (cover letter, phone number, contacts/employees)
* CSS adjustments
