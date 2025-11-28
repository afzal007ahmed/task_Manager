# TASK MANAGER

## PACKAGES USED

1. EXPRESS JS
2. NODE JS
3. BCRYPT
4. JWT
5. COOKIE PARSER

## ALL ROUTES

1. ## POST /auth/register

   ### Request Body

    <pre> {
          "name": "John",
          "email": "john@gmail.com",
          "password": "123456"
      }
     </pre>

   ### Response

   success :
      <pre>
      {
     "success": true,
     "data": {
       "id": 1,
       "username": "John",
       "email": "john@gmail.com",
       "updatedAt": "2025-11-28T10:00:00.000Z",
       "createdAt": "2025-11-28T10:00:00.000Z"
     },
     "error": null
   }
   
    </pre>

   Error :
   Invalid Values
    <pre>
     {
   "success": false,
   "data": null,
   "error": "Invalid Values."
     }
   
    </pre>

   Server Error

      <pre>
              {
          "success": false,
          "data": null,
          "error": "Something went wrong!"
        }
   
      </pre>

2. ## POST /auth/login

### Request Body

    <pre>
    {
      "email": "afzal@example.com",
      "password": "123456"
    }
    </pre>

### Response

success :

<pre>
  {
  "success": true,
  "data": {
    "id": 1,
    "name": "Afzal",
    "email": "afzal@example.com"
  },
  "error": null
}
 
</pre>

Invalid User

<pre>
{
"success": false,
"data": null,
"error": "User not found."
}  
 </pre>

Invalid Password

 <pre>
  {
  "success": false,
  "data": null,
  "error": "Invalid Password."
}

 </pre>

3.  ## GET /tasks/all

    Example Request
    /tasks/all?filterBy=status&name=pending&order=id&sort=asc

    ### Response

    <pre>
          {
        "success": true,
        "data": [
          {
            "id": 1,
            "title": "Task 1",
            "description": "Something",
            "priority": "high",
            "dueDate": "2025-12-10",
            "status": "pending",
            "userId": 1,
            "createdAt": "2025-11-28T10:00:00.000Z",
            "updatedAt": "2025-11-28T10:00:00.000Z"
          }
        ],
        "error": null
      }
    
    </pre>

    ## Error

    <pre>
    
        {
      "success": false,
      "data": null,
      "error": "error message"
    }
    </pre>

4.  ## POST /tasks/create

    ### Request Body

    <pre>
           {
       "title": "New Task",
       "description": "Complete the module",
       "priority": "high",
       "dueDate": "2025-12-20",
       "status": "pending",
       "userId": 1
     }
    
    </pre>

    ### Response

    success :

    <pre>
            {
        "success": true,
        "error": null
      }     
    </pre>

    Invalid Body :

    <pre>
       { success : false ,error : "Please provide valid details."}
    </pre>

    Server Error :

     <pre>
            {
         "success": false,
         "error": "Something went wrong."
       }
     </pre>

5.  ## GET /tasks/:id

    Example Request
    /tasks/4

    ### Response

        success :

     <pre>
               {
        "success": true,
        "data": {
          "id": 5,
          "title": "New Task",
          "description": "Complete the module",
          "priority": "high",
          "dueDate": "2025-12-20",
          "status": "pending",
          "userId": 1
        },
        "error": null
      }
    
      
     </pre>

        Invalid Id :

    <pre>
                  {
           "success": false,
           "data": null,
           "error": "Please provide a valid id."
         }
    
    </pre>

    Server Error :

    <pre>
           {
      "success": false,
      "data": null,
      "error": "Something went wrong"
    }
    
    </pre>

6.  ## PATCH /tasks/:id

### Request

  <pre>
              {
      "status": "completed"
    }

  </pre>

### Response

Success :

  <pre>
         {
    "success": true,
    "error": null
  }      
  </pre>

Invalid Id :

      <pre>
                 {
          "success": false,
          "error": "Please provide a valid id."
        }
      </pre>

7.  ## DELETE /tasks/:id

    Example Request
    /tasks/4

    ### Response

    success :

    <pre>
              {
       "success": true,
       "error": null
     }     
    </pre>

    Error :

    <pre>
                {
         "success": false,
         "error": "Please provide a valid id."
       }
    
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

git clone https://github.com/afzal007ahmed/task_Manager.git

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
