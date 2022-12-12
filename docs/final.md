# Gaming at UMass - Team Omicron

## Semester Fall 2022

## Overview

This website we built takes aspects of popular websites that are used by many gamers alike, and bundles them all together, in a singular website.
Our website allows user to register/login, create events, comment on those events, message between users, and edit their profile, being to things such as, edit their bio, remove friends, and have a link to make events on the website. Our purpose with this whole operation was the abilty to link gamers alike at UMASS. Our motivation strives from being avid gamers areself. We consistenly found ourselves having a lack of friends on campus that played similiar games as us. We felt that making a hub for people that felt similiar on our view, would bring together a community that has yet to have an etsablished footing on campus.

## Team Members

John Steenbruggen - Steenbruh
Connor Andrews - Swerdnacs
John Rand - johnrandd241

## User-interface

## APIs

## Database

## URL Routes/Mappings

"/GetMsgFromUser"
'/CreateCommentSection'
"/GetMsgFromID"
"/posts"
"/posts/create"
"/users" - Returns a json displaying the users, was used for checking users and if fields were being properly updated
"/posts/get"
"/users/get"
"/users/changeprofile"
"/users/changebio"
"/events" - Directs users to the events page
"/login" - If user is logged out, it displays this button to redirect to the login page
"/logout" - User must be logged in to see this endpoint, it removes the users field from local storage and sends back a null user object, then redirects to events page
"/sendLoginCred" - unused
"/sendAllCred" - Sends back all of the user fields found from the db
"/login/auth" - Does a check based on what the user submitted on the login form, if user/pwrod are valid, returns the all the user fields and updates them clientside
"/register" - Redirects users to a page in which they can make a new profile
"/register/auth" - Takes in several variables from the user, checks to see if the email and username are in use via looking into the db, if they are not, a new row is made in the db.
"/profile"
'/user/addFriend'
'/user/removeFriend'
'/content/addPost'
'/content/removePost'
'/content/search'

## Authentication/Authorization

Default permissions for someone who isnt logged in include not being able to access certain features including the messages and profile page. Upon logging in, users are granted access their own profile page and are allowed to message other users aswell as create events and add other users. They are authenticated on the login page by the username and password being sent to the server, which the server makes a SQL call to check if that user is in the database with those crediationals. It then returns a JSON object of all the user fields that are in the DB, being saved in localstorage on the client side, allowing for the js to easily update and pages.

## Division of labor

John Rand - Implemented the login/register pages 
John Steenbruggen - 
Connor Andrews - 

## Conclusion 

Working on this project, we gained a huge apprection for websites devoloped in a similar mannor. Our biggest hurdle in this assignment, was figuring out how to use a variety of different methods and functions that we all had very little information on in order to achieve the desired outcome. We would've liked to known more on how to implement express servers, databases, and the linking of the two. If we had that knowledge going into this, we felt we would've been able to complete this project to a much higher standard. With that being said, we all learned so much about web programming from this project. The things we struggled with, we learned, and in the end were able to implement everything we wanted to from the project's conception.