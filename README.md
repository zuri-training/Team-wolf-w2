# TeamWolf_W2 (weCode)

## The Project Overview

weCode is a web application that allows users with little-to-no coding skills to build and manage websites using built-in design templates and easy-to-use features, for either personal or business purposes.
The aim of weCode is to help individuals and businesses scale up at minimal cost by spinning up basic websites that align with their individual or business choices.

## Links

GitHub Repository: https://github.com/zuri-training/Team-wolf-w2
Figma:https://www.figma.com/file/l4dOaRDSkvgBSp6CkVCqAM/Dev?node-id=0%3A1&t=R51t8oGk2KQIgzmA-1
Figjam:https://www.figma.com/file/VTjr4CeLzEOCIpsZwV148i/Team-35?node-id=0%3A1&t=egqVrpgO76Lyt30Z-1
Hosting: http://ec2-34-239-165-230.compute-1.amazonaws.com:3000/

## Feature Requests

### User: Unauthenticated

- Visit the platform to view basic information about it
- View and Interact with the documentation
- Register to setup a new website
- Setup website by filling out some information
- Browse through available templates

### User: Authenticated

- Full access to the platform
- Access to backend of created website
- Ability to create more pages
- Ability to change template
- Unique address
- Ability to add social media links

## Technologies Used

### Design: Figma

- Frontend: HTML, CSS, JavaScript, FontAwesome
- Backend: Node JS, MongoDB

### Development

The weCode application development cycle has been divided into three phases, which will be handled by specific development teams during the course of this project. The phases are:

- The Design Research (UI/UX)
- The Design implementation (FrontEnd)
- The Functionality (BackEnd)

### The Design Research (UI/UX)

The Designers in the team conducted user-qualitative and quantitative research in order to fully comprehend the needs, pain points, and expectations of the majority of users of content management systems.
The following steps were taken during the design process to help produce low fidelity and high fidelity designs for the web application:

- Empathize
- Define
- Ideate
- Prototype
- Test
  The major tools employed are:
- Figma
- FigJam

Here is a link to an extensive report on how the Design Research was conducted: https://docs.google.com/document/d/1I8HVGsuUoPnu8H3ePlUkeZi2UaCleg_uCoO-uENK-8k/edit?usp=drivesdk

### The Frontend

We have so far been successful in implementing the UI design for our landing, forgot password, sign up, and log-in pages, which is the front-end component of this project. They are currently not, however, in any way, shape, or form, functional.
The tools used:

- Vanilla CSS
- Flexbox & Grid
- Vanilla Javascript
- Font Awesome - for icons

A desktop-first approach was implemented, although it is mobile responsive, because we believe most people who would want to build web pages/websites will mostly use laptops for it.

### The Backend

NodeJS and MongoDB were used to create and operate the weCode web app.
It's important to note that it is not necessary to be familiar with these frameworks to use this web application, but it might be a good idea if you want to modify the way the backend functions or add new features.

#### Prerequisites

- Download and Install new version of node from https://nodejs.org
- Download and install Mongo DB Compass
- Unique address
- Ability to add social media links

#### Running the Server

- Clone the repo using: git clone https://github.com/zuri-training/Team-wolf-w2.git
- To install packages, run: npm install
- Open a .env file in the root/cloned directory and put the following inside it
  - PORT = 3000
  - MONGODB_URI="mongodb://localhost:27017/cms_app"
- To start the server, run: npm start (or npm run dev)

  ### Endpoints

  - The api endpoints can be found in the api.rest file

  ### User Authentication: Testing/Hosting

  - The website is currently being hosted on AWS with the URL: http://ec2-34-239-165-230.compute-1.amazonaws.com:3000/

## Chanllenges (Suggestions and Contributions are welcome)

- Reset Password failed to work using different ways (Cookie-session does give problem)
- Sign up or Login with Goolge works fine on localhost but fails on host server due to the follwing code (callbackURL: "http://localhost:3000/google/callback")
