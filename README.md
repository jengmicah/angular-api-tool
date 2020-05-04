# Vulcan Video Indexer

Angular 9 application to visualize Vulcan metadata output. Interacts with API from `nodejs-express-api`.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.2.

## Setting up environment for local development and running

Some initial set up is needed to run these applications. First, we need to install node.

### Install Node on Mac

Open your Terminal and enter the following to update Homebrew to see the latest versions:

`brew update`

Then, we install node itself:

`brew install node`

### Install Node on Windows

Open your Browser and navigate to https://nodejs.org/en/download/
Download the executable for windows and run it

### Prepare Repo

Clone repo <br>`git clone https://github.com/jengmicah/angular-api-tool.git`

Navigate to your clone of the repo <br>`cd vulcan-indexer-ui`

Update to latest code with <br>`git pull`

### Install Node Modules for the project

Run `npm install`<br>
<br>If there is an issue with native packages:
<br>&nbsp;&nbsp;&nbsp;Run `npm install -g node-gyp`
<br>&nbsp;&nbsp;&nbsp;Run `npm install --global --production windows-build-tools`	(if windows OS)

### Ensure API is running

Follow instructions at [NodeJS Express API](https://github.com/jengmicah/nodejs-express-api) to ensure that the database and API are running on either local or remote servers.

In `/src/app/data.service.ts`, you'll see that the REST API server is pointing to `http://localhost:5000/`. You can change this to whatever you'd like.

This application makes use of the following endpoints:

- /api/ingestmetadata
- /api/querymetadata/video
- /api/querymetadata/video/[jobID]
- /api/querymetadata/video?classnum=[class]
- /api/querymetadata/video?module_name=[module]
- /api/querymetadata/video?model_name=[model]

## Start Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

The app will automatically reload if you change any of the source files.

### The component folder structure is as follows:
```
src/app
   modal-add
       - Keep component to add DB entries here
   modal-video
       - Keep component to view video player and insights here
   navigation
       - Define pages to route to here (navbar)
   page-first
       - Define the first page to show in navigation here
   page-second
       - Define the second page to show in navigation here
```