# TASK MANAGER 

## PACKAGES USED 
1. EXPRESS JS
2. NODE JS
3. BCRYPT
4. JWT
5. COOKIE PARSER

## ALL ROUTES 
<pre>
 /auth/register 
 /auth/login 
 /tasks/all
 /tasks/create
 /tasks/:id (GET)
 /tasks/:id (PATCH)
 /tasks/:id (DELETE) 
</pre>

## PROJECT STRUCTURE
 <pre>project/
  src/
    config/
      db.js
    models/
      user.model.js
      task.model.js
      index.js
    routes/
      user.routes.js
      task.routes.js
    controllers/
      user.controller.js
      task.controller.js
    app.js
  .env
  .gitignore
  package.json
  README.md</pre>

## CLONE PROJECT 
git clone https://github.com/your/repo.git

## INSTALL DEPENDENCIES 
npm install

## ADD ENV 
<pre>DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=testdb
PORT=3000</pre>


## TO START THE PROJECT 
<pre>node server.js</pre>



