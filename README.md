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
npm install
```

### 3. Create the database
Run schema and seed files

### 4. Env Example
Copy .env.example into your own .env and fill in your values

### 5. Run the server
```bash
node app.js
```
Server will start on: http://localhost:5000/

### API Endpoints
```
| Method | Endpoint                   | Description                                  | Sample Response |
|--------|----------------------------|----------------------------------------------|-----------------|
| GET    | `/products`                | Get all products                             | `[ { id, name, brand, price, ... }, ... ]` |
| GET    | `/products/:id`            | Get a single product by ID                   | `{ id, name, brand, price, ... }` |
| PUT    | `/products/:id`            | Create or update a product (upsert by id)    | `{ id, name, brand, price, ... }` |
| DELETE | `/products/:id`            | Delete a product                             | `[]` |
| GET    | `/customers`               | Get all customers                            | `[ { id, first_name, last_name, email, ... }, ... ]` |
| GET    | `/customers/:id/orders`    | Get orders of a specific customer            | `{ ...order fields... }` or `null` |
| POST   | `/customers`               | Create or update a customer (upsert by email)| `{ id, first_name, last_name, email, ... }` |
| GET    | `/orders/:id`              | Get order details                            | `[ { first_name, product_name, quantity, ... }, ... ]` |
| GET    | `/reports/summary`         | Get sales summary (top 5 products, revenue, monthly) | `{ total_revenue: [...], per_month: [...], top_five: [...] }` |
```