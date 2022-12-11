# Team-wolf-w2

Website Name: weCode

## Introduction

A platform that allows users spin up a basic website - allow as much customizations as possible.

Project Name: my_cms

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

### Prerequisites

- Download and Install new version of node from https://nodejs.org
- Download and install Mongo DB Compass
- Unique address
- Ability to add social media links

### Running the Server

- Clone the repo using: git clone https://github.com/zuri-training/Team-wolf-w2.git
- To install packages: npm install
- Open a .env file in the root/cloned directory and put the following inside it
  - PORT = 3000
  - MONGODB_URI="mongodb://localhost:27017/cms_app"
- To run the server: npm run dev

### Endpoints

- The api endpoints can be found in the api.rest file
