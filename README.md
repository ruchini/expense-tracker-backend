# Expense Tracker

Expense Tracker is a full-stack web application that allows users to track their expenses. The application provides a user-friendly interface to add, view, edit, and delete expenses.

## Features

- Add new expenses with details such as description, type, amount, and date.
- View a list of all expenses.
- Edit existing expenses.
- Delete expenses.

## Technologies Used

The Expense Tracker application is built using the following technologies:

- **Frontend**: React, Material-UI
- **Backend**: Node.js, Express.js, MongoDB

## Getting Started

To run the Expense Tracker application locally, follow the instructions below.

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

- git clone git@github.com:ruchini/expense-tracker-backend.git


2. Install dependencies for the backend:

- cd expense-tracker-backend
- npm install


3. Set up the MongoDB connection:

- Open the `config.js` file located in the `server` folder.
- Replace `<your-mongodb-uri>` with your MongoDB connection URI.

4. Enable Cross-Origin Resource Sharing (CORS):

- Open the `server.js` file located in the `server` folder.
- Add the following code snippet after the `app.use(express.json())` line:

  ```
  // Enable CORS
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  ```

  This allows requests from `http://localhost:3001` to access the backend server.

5. Start the backend server:

- tsc
- cd dist/
- node index.js




# Expense Tracker API

The Expense Tracker API provides endpoints to manage expenses in the Expense Tracker application.

## Table of Contents

- [Endpoints](#endpoints)
- [Error Handling](#error-handling)

## Endpoints

### Get Expenses

Returns a list of all expenses.

- **URL**: `/api/expenses`
- **Method**: `GET`
- **Response**: JSON

  - `status`: The status of the response (success or error)
  - `code`: The HTTP status code
  - `data`: An array of expense objects containing the expense details

#### Example

```http
GET /api/expenses
```

Response:

```json
{
  "status": "success",
  "code": 200,
  "data": [
    {
      "_id": "60fe081e02a2a21f1848e5ae",
      "description": "Lunch",
      "type": "Food",
      "amount": 15.5,
      "date": "2021-07-26T12:30:00.000Z"
    },
    {
      "_id": "60fe087b02a2a21f1848e5af",
      "description": "Movie tickets",
      "type": "Entertainment",
      "amount": 25,
      "date": "2021-07-27T18:00:00.000Z"
    }
  ]
}
```

### Add Expense

Adds a new expense.

- **URL**: `/api/expenses`
- **Method**: `POST`
- **Request**: JSON

  - `description`: The description of the expense
  - `type`: The type/category of the expense
  - `amount`: The amount spent on the expense
  - `date`: The date of the expense

- **Response**: JSON

  - `status`: The status of the response (success or error)
  - `code`: The HTTP status code
  - `data`: The newly created expense object with the generated ID

#### Example

```http
POST /api/expenses
Content-Type: application/json

{
  "description": "Dinner",
  "type": "Food",
  "amount": 30.75,
  "date": "2021-07-28T19:00:00.000Z"
}
```

Response:

```json
{
  "status": "success",
  "code": 201,
  "data": {
    "_id": "60fe08f402a2a21f1848e5b0",
    "description": "Dinner",
    "type": "Food",
    "amount": 30.75,
    "date": "2021-07-28T19:00:00.000Z"
  }
}
```

### Update Expense

Updates an existing expense.

- **URL**: `/api/expenses/:id`
- **Method**: `PUT`
- **Parameters**: `id` - The ID of the expense to update
- **Request**: JSON

  - `description`: The updated description of the expense
  - `type`: The updated type/category of the expense
  - `amount`: The updated amount spent on the expense
  - `date`: The updated date of the expense

- **Response**: JSON

  - `status`: The status of the response (success or error)
  - `code`: The HTTP status code
  - `data`: The updated expense object

#### Example

```http
PUT /api/expenses/60fe08f402a2a21f1848e5b0
Content-Type: application/json

{
  "description": "Updated Dinner",
  "type": "Food",
  "amount": 40,
  "date": "2021-07-29T20:00:00.000Z"
}
```

Response:

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "_id": "60fe08f402a2a21f1848e5b0",
    "description": "Updated Dinner",
    "type": "Food",
    "amount": 40,
    "date": "2021-07-29T20:00:00.000Z"
  }
}
```

### Remove Expense

Removes an existing expense.

- **URL**: `/api/expenses/:id`
- **Method**: `DELETE`
- **Parameters**: `id` - The ID of the expense to remove
- **Response**: JSON

  - `status`: The status of the response (success or error)
  - `code`: The HTTP status code
  - `message`: A message indicating the success of the deletion

#### Example

```http
DELETE /api/expenses/60fe08f402a2a21f1848e5b0
```

Response:

```json
{
  "status": "success",
  "code": 200,
  "message": "Expense removed successfully"
}
```

## Error Handling

In case of errors, the API will respond with a JSON object containing the following properties:

- `status`: The status of the response (error)
- `code`: The HTTP status code
- `error`: A descriptive error message

```json
{
  "status": "error",
  "code": 500,
  "error": "Internal server error"
}
```
