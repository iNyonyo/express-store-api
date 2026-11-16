# 3-day-nodejs-sprint
A repository to learn nodejs

## Features
- Products (list + single product)
- Customers (create / update with upsert)
- Orders (list order)
- Central error handling
- Proper HTTP status codes

---

## Setup Instructions

### 1. Clone the project
```bash
git clone <your-repo-url>
cd <project-folder>
```

### 2. Install Dependencies
```bash
cd src
npm install
```

### 3. Create the database
Run schema and seed files

### 4. Env Example
Copy .env.example into your own .env and fill in your values

### 5. Run the server
```bash
cd src
node app.js
```
Server will start on: http://localhost:5000/

### POSTMAN
Import the file Express_store_api.json into Postman to test all endpoints.

### API Endpoints
| Method | Endpoint | Description | Sample Response |
|---|---|---|---|
| GET | `/products` | Get all products | `[ { id, name, brand, price, ... }, ... ]` |
| GET | `/products/:id` | Get a single product by ID | `{ id, name, brand, price, ... }` |
| PUT | `/products/:id` | Create or update a product (upsert by ID) | `{ id, name, brand, price, ... }` |
| DELETE | `/products/:id` | Delete a product | No content (204) |
| GET | `/customers` | Get all customers | `[ { id, first_name, last_name, email, ... }, ... ]` |
| GET | `/customers/:id/orders` | Get orders of a specific customer | `{ ...order fields... }` or `null` |
| POST | `/customers` | Create or update a customer (upsert by email) | `{ id, first_name, last_name, email, ... }` |
| GET | `/orders/:id` | Get order details | `[ { first_name, product_name, quantity, ... }, ... ]` |
| GET | `/reports/summary` | Get sales summary (top 5 products, revenue, monthly) | `{ total_revenue: [...], per_month: [...], top_five: [...] }` |

---

### Reflections
#### Day 1
##### **Lesson** 
Learnt modules, built-in modules, async
patterns, events and how a server handles requests. 

##### **Challenge** 
Understanding the tutorial and how to apply it.

#### Day 2
##### **Lesson** 
Learnt Express basics, static files, API vs server-side
rendering, JSON, route params and query strings.

##### **Challenge** 
Writing the get endpoints and handling the errors.

#### Day 3
##### **Lesson** 
Learnt  POST, PUT, DELETE, Express Router and controllers.

##### **Challenge** 
Applying controller lesson and writing POST, PUT, and DELETE correctly.