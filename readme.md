# Lush

### Description
A website for simulating fruit baskets to use for occassions. This website was created using Expressjs with sequelize ORM and postgresql database.

### Features
    1. user creation and retrieval
    2. retrieve all fruits
    3. create fruit baskets

### ORM Features
    1. Hooks
    2. Field validation
    3. Models association

### Endpoints
"?" === "optional
#### User
    1.  path : "/create"
        body : {
            username,
            password,
            email
        }
    2.  path : ""
        query ?: {username}

#### Basket
    1.  path : "/create"
        body :{
            title,
            userId,
            fruitItems: [
                {name, quantity}
            ]
        }
    2.  path : ""
        query ?: {
            title?,
            userId?
        }