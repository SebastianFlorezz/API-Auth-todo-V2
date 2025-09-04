API-Auth-todo-V2

A RESTful API built for user authentication and task (TODO) management.
Includes user registration and login with JWT, route protection, and CRUD operations for user-specific tasks.

FEATURES

    -JWT authentication (register, login, and protect endpoints)

    -User management (create and authenticate accounts)

    -Task (TODO) management with CRUD operations:

        Create

        Read

        Update

        Delete

    Middleware for route authorization

    Built with Node.js and Express

    Database: MySQL

    ORM:Prisma

    
REQUIREMENTS
    -Nodejs >= 16
     -Mysql

        
INSTALLATION AND USAGE

    Clone the repository:

        git clone https://github.com/SebastianFlorezz/API-Auth-todo-V2.git
        cd API-Auth-todo-V2


    Install dependencies:

        npm install


    Configure environment variables:
        Create a .env file based on .env.example:



    Run the server in development:
        npm run dev

MAIN ENDPOINTS
    Auth:
        POST api/register
            body example:
            {
                name: "Michael Jordan"
                email: "test@test.com",
                password: "Ab1234567890?"
            }

            RESPONSE:
                "data": {
                    "id": 3,
                    "name": "Michael Jordan",
                    "email": "test@test.com",
                    "createdAt": "2025-08-31T18:17:21.807Z",
                    "updatedAt": "2025-08-31T18:17:21.807Z"
                    },
                "timestamp": "2025-08-31T18:17:21.820Z"
            }    


        POST api/login
            body example:
            {
                email: "test@test.com",
                password: "Ab1234567890?"
            }
        
            RESPONSE: 
            {
            "data": {
                "user": {
                    "id": 3,
                    "name": "Michael Jordan",
                    "email": "test@test.com"
                },
                "token": {
                    "accessToken": " your token",
                    "expiresIn": 14400,
                    "tokenType": "Bearer"
                }
            },
            "timestamp": "2025-08-31T18:19:57.780Z"
            }

        




        


    