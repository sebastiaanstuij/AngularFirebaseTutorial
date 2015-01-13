# AngularFirebaseTutorial
Angular app with Firebase backend base on this tutorial:
&amp; Firebase (https://thinkster.io/angulartutorial/learn-to-build-realtime-webapps/)

This version contains several improvements:
- Update to new Firebase/AngularFire authentication method ($firebaseAuth instead of $firebaseSimpleLogin)
- Custom bootstrap/bootswatch theme integration (LESS to CSS compile task in Grunt)
- Autmatic dependency injection in unit tests (wiredep)


## Prerequisites

###### Git
You need git to clone the repository. You can get it from
[http://git-scm.com/](http://git-scm.com/).

###### NodeJS & NPM
You must have node.js and its package manager (npm) installed.  
You can get them from [http://nodejs.org/](http://nodejs.org/).

###### Bower & Grunt:
```
npm install -g bower grunt
```


## Setup

###### Clone this repository using [git][git]:
```
git clone https://github.com/sebastiaanstuij/AngularFirebaseTutorial.git
cd angularfirebasetutorial
```

###### Install the npm dependencies.
```
npm install
```

###### Install the bower dependencies.
```
bower install
```

###### Replace FIREBASE_URL constant in app.js with your Firebase URL.

``` 
.constant('FIREBASE_URL', 'place your URL here');
```

###### Run the app locally.
```
grunt serve
```

###### Run unit tests.
```
grunt test
```

###### Create a 'dist' folder for deploying to remote host.
```
grunt build
```


##### Optional: deploy to Firebase hosting service.

###### Install Firebase CLI.
```
npm install -g firebase-tools
```

###### Setup Firebase hosting.
```
firebase login
```

###### Deploy to Firebase hosting.
```
firebase deploy
```

###### Open webpage to your hosted app.
```
firebase open
```
