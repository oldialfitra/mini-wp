# mini-wp
API Documentation yang meliputi : URLs, HTTP method, request, response (success dan error case) 
## Article Route
**Note:**  *  *is required*
HTTP  | Route | headers |form-data | Description | Success | Error
------|-------|--------|-----|--------------|---------|------
GET     | <span style="color:red"> /articles    </span>   | token |                                               | <span > Get all Articles (Authenticate User Only) </span>   | Objects [{ id, title, content, created_at, image, userId }]                   | Object { message: `Internal Server Error`, err }
POST    | <span style="color:red"> /articles     </span>   | token | *title, *content                | <span >  Create a Article (Authenticate User Only) </span>  | a new Article -> Object { id, title, content, created_at, image, userId }        | Object { message: `Internal Server Error`, err }
PUT     | <span style="color:red"> /articles/:id  </span>   | token |  *title, *content   | <span > Update a Article (Authenticate User Only) </span>   | a updated Article -> Object { id, title, content, created_at, image, userId }    | Object { message: `Internal Server Error`, err }
DELETE  | <span style="color:red"> /articles/:id  </span>   | token |                                               | <span > Delete a Article (Authenticate User Only)   </span> | a deleted Article -> Object { id, title, content, created_at, image, userId }    | Object { message: `Internal Server Error`, err }
GET     | <span style="color:red"> /articles/:id    </span>   | token |                                               | <span > Get one Article (Authenticate User Only) </span>   | Objects { id, title, content, created_at, image, userId }                   | Object { message: `Internal Server Error`, err }

## User Route
**Note:**  *  *is required*
HTTP  | Route |body | Description | Success | Error
------|-------|--------|-----|--------------|---------|------
POST     | <span style="color:red"> /users/login    </span>   |  *email, *password                                     | <span > Login User (Authenticate User Only) </span>   | Objects { id, email, password}                  | Object { message: `Internal Server Error`, err }
POST    | <span style="color:red"> /users/register     </span>   | *email, *password                | <span >  Register new User (Authenticate User Only) </span>  | a new User -> Object { id, email, password}        | Object { message: `Internal Server Error`, err }