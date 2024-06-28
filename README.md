A Channel-based Forum React app which allows users to post questions and answer them. Features include:
- Create a new channel
- Like and Dislike a post
- Add a picture to your post
- Cookies to automate login
- Admin account that delete posts and channels

A user is must be logged in to see these posts. 
Frontend uses React and backend uses MySQL, Node js.

-------------------------------------------------------------------------------------------------------------------------------
To use the app, please follow these steps:
1. Open Docker desktop (install if necessary)
2. Download all the files, from github, into a folder and locate it in your terminal. Type in the command: docker-compose build
3. Once the images are built, type: docker-compose up -d
4. To connect to the react container, type: docker attach r1
5. To get the backend running, create a new terminal window and locate the project window. Input the command: docker attach ds1
6. In both terminals, please change to the proj1 folder by typing: cd proj1
7. In the terminal running the container ds1, type: node datastore.js
8. After the message "up and running" pops up, switch to the next terminal connected to r1 and type: npm start
9. Once the compilation is complete, open any browser and type "localhost" in the searchbox to view the app
-----------------------------------------------------------------------------------------------------------------------------------
