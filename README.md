# AngularFirebaseTutorial
Angular app with Firebase backend base on this tutorial:
&amp; Firebase (https://thinkster.io/angulartutorial/learn-to-build-realtime-webapps/)

This version contains several improvements:
- Update to new Firebase/AngularFire authentication method ($firebaseAuth instead of $firebaseSimpleLogin)
- Custom bootstrap/bootswatch theme integration (LESS to CSS compile task in Grunt)
- Autmatic dependency injection in unit tests (wiredep)



## Setup 
1. git clone https://github.com/sebastiaanstuij/AngularFirebaseTutorial.git
2. Replace FIREBASE_URL constant in app.js with your Firebase URL.
3. Run 'npm install' in terminal to install npm dependencies.
4. Run 'bower install' in terminal to install bower dependencies.
5. Run 'grunt serve' to run app on local host.
6. RUn 'grunt test' to run unit tests
7. Run 'grunt build' to create a 'dist' folder for deploying to remote host.

Optional (deploy to Firebase hosting service):

8. Install Firebase CLI: run 'npm install -g firebase-tools' in terminal.
9. Run 'firebase login' in terminal to setup firebase hosting.
10. Run 'firebase deploy' in terminal to deploy to firebase hosting.
11. Run 'firebase open' in terminal to open webpage to your hosted app.
