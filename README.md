My site
==========

Helpful information: https://medium.com/@saadshaikh100/how-to-deploy-your-static-website-on-heroku-69f120626b12
Highlight:

Before starting this tutorial I may first tell you what is “Heroku”? Heroku is a cloud platform service where we can easily upload our apps which support multiple programming languages. In the beginning heroku only supported Ruby language but after that it has given support for different languages like Php, Python, Node.js, Clojure, Scala and Go. Heroku uses git repositories to deploy apps on web. After deploying your app on heroku you will get a link which would be your application domain that would be like this:
“applicationname.herokuapp.com” 

-- in our case, it will be
https://cassidypong.herokuapp.com

Heroku's default app is PHP app

What are Git and GitHub?
To get started we must first know what Git is. Git is an open source version control system. Git is distributed revision control system which is very fast and lightweight tool. Git was developed by Linux kernel developers in 2005.
Now to our next tool which will help or we can say is mandatory in deploying our app is GitHub.
GitHub is web based tool for hosting our Git repositories. GitHub provides all the distributed revision control and source code management (SCM) features of Git as well as adding its own features with its user friendly interface. GitHub also provides desktop application service for Git and also supports mobile integration. GitHub is open source tool means its services are free for those developers who will deploy their public repository which anybody can access and download. For private repositories you have to buy premium features but their cost is also very convenient. So both Git and GitHub are powerful tools which are very essential in developing our software projects in teams so that multiple team members can work parallel on one project without creating conflicts.

===========================================================

Please prepare your system for the sample site.
Install
1. Git tool kits
2. Heroku tool kits (toolbelt: https://devcenter.heroku.com/articles/heroku-cli)

There are many different git tools. My person favorite is git for Windows (of course, if you are using Windows)

=================================================

Please prepare your system for the sample site.

GitHub:
(From command prompt, you have to have "git" command already installed)

git clone https://github.com/CassidyPong/my-website.git


After the source code copied to your machine, you can call

git pull

to get most recent changes.

----------

Set up NODE.js Enviroment on your local machine

1. Install node js: go to http://nodejs.org/download/ and download the version you need.

2. Install express js: 
  From command line: type in - "npm install -g express"

3. unzip the zip file.

4. go to marketing_dev directory (marketing_prod for production env).

5. From command line: type in "npm install"
  All the needed packages will be installed (which are specified in package.json).

6. From command line: type in "npm start"
   to start the web service.

7. Go to brower: go to http://localhost:5000/ for the site running on your local machine

============================================================================================
Publish changes to Heroku:
(From command prompt, you have to have "heroku" command already installed)

Go to source code directory

Follow the instructions: https://devcenter.heroku.com/articles/git

1. Install heroku toolbelt.
2. > cd to the code folder
3. > heroku login
4. > heroku git:remote -a facilitron-marketing-dev  (to connect the app to existing repository)
4.b > heroku git:remote -a facilitron-marketing-prod  (to connect the app to production repository)

Then we can push the code, restart the app.

After that just do the following to push the new code to heroku:

git push heroku master

=================================================

To find the log:

heroku logs 
heroku logs -n 1500

To restart heroku dyno;

heroku restart

=================================================

Enviroment variables
NODE_ENV: 'production' or else
	- if NODE_ENV='production', we assume this is production site. Otherwise it is 'development' environment
	- in production env: the url will be forced to https, unless another env variable (USE_HTTP) has been set
USE_HTTP: 'yes' or else
	- if USE_HTTP='yes', the url won't be forced to https
