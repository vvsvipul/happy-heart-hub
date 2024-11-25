# HappyHeartHub

## Overview
This web application aims to predict the likelihood of cardiovascular diseases (CVDs) based on various health parameters using advanced data mining techniques. Users can input their demographic information, lifestyle habits, and medical indicators to receive personalized predictions about their cardiovascular health. The application integrates a predictive model developed using the *K-Nearest Neighbors (KNN) algorithm* with user-friendly web interfaces to provide convenient access to health predictions.

## Features
* 🔮 **Health Prediction:** Users can input their health parameters and receive predictions about their risk of developing cardiovascular diseases.
* 🔐 **User Registration and Login:** Secure user registration and authentication mechanisms are implemented to protect user data and provide personalized experiences.
* 🛠️ **Technologies:** The application is built using *Node.js, Express.js, MongoDB, Docker*, and other technologies for scalability, reliability, and maintainability.
* 🏗️ **Modular Architecture:** The application follows the *Model-View-Controller (MVC)* architectural pattern for organizing code into separate components, ensuring scalability and separation of concerns.
* 🤖 **Integration with Machine Learning Model:** The *KNN* predictive model is integrated into the backend to provide accurate predictions based on user input.

## Installation
### Clone the Repository:
* `git clone https://github.com/ityashag/HappyHeartHub.git `
* Install Dependencies: `npm install`
* Set Environment Variables: Create a .env file in the root directory and add necessary environment variables such as database connection URI, session secret, etc.
* Run the Application: `node index.js`
* Access the Application: Open a web browser and navigate to http://localhost:3000 to access the web application.
### Docker 🐳
* Create a directory for your project:
`mkdir app`
`cd app`
* Create a docker-compose.yml file:
* Copy code `nano docker-compose.yml`
<br>

  ```
  version: '3.8'
  services:
    mongodb:
      image: mongo
      container_name: mongodb
      ports:
        - "4000:27017"
    nodejs:
      image: yashcse21/yash:latest
      container_name: nodejs
      environment:
        - DB=mongodb://mongodb:27017
        - SECRET=mysecret
      ports:
        - "8080:8080"
      depends_on:
        - mongodb
  ```
* Run : `docker-compose up`

## Technologies Used
* Frontend: HTML, CSS, JavaScript (with EJS templating)
* Backend: Node.js, Express.js
* Database: MongoDB
* Authentication: Passport.js
* Deployment: Docker, AWS (EC2)
  
## Usage
* Registration: Users can create an account by providing their email address and password.
* Login: Registered users can securely log in to access personalized features and predictions.
* Prediction: Users can input their health parameters into the provided form and receive predictions about their risk of developing cardiovascular diseases.
* Logout: Users can securely log out of their accounts to protect their privacy.
  
## Credits
* Instructor: Dr. Kashav Ajmera
* Dataset Source: Kaggle - Cardiovascular Disease Dataset
