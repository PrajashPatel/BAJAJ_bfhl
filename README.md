# BAJAJ BFHL API

A professional REST API built for the Bajaj Finserv Health Limited (BFHL) assignment. The application processes input arrays and returns categorized data including odd numbers, even numbers, alphabets, special characters, and calculated values.

---

## 🚀 Live Deployment

* **Render Deployment:** [https://bajaj-bfhl-2-0e53.onrender.com/bfhl](https://bajaj-bfhl-2-0e53.onrender.com/bfhl)
* **GitHub Repository:** [https://github.com/PrajashPatel/BAJAJ_bfhl](https://github.com/PrajashPatel/BAJAJ_bfhl)

---

## 📌 Features

* Accepts JSON input through REST API
* Separates:

  * Even numbers
  * Odd numbers
  * Alphabets
  * Special characters
* Calculates:

  * Sum of numbers
  * Concatenated string in reverse alternating caps format
* Returns structured JSON response
* Error handling for invalid inputs
* Production deployment using Render

---

## 🛠️ Tech Stack

| Technology   | Usage               |
| ------------ | ------------------- |
| Node.js      | Runtime Environment |
| Express.js   | Backend Framework   |
| Render       | Deployment          |
| Git & GitHub | Version Control     |

---

## 📂 Project Structure

```bash
BAJAJ_bfhl/
│
├── node_modules/
├── package.json
├── package-lock.json
├── index.js
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/PrajashPatel/BAJAJ_bfhl.git
```

### 2️⃣ Navigate into the Project

```bash
cd BAJAJ_bfhl
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Start the Server

```bash
node index.js
```

Server will start at:

```bash
http://localhost:3000
```

---

## 📡 API Endpoint

### POST `/bfhl`

Processes the provided input array and returns categorized data.

---

## 📥 Sample Request

```json
{
  "data": ["a","1","334","4","R","$"]
}
```

---

## 📤 Sample Response

```json
{
  "is_success": true,
  "user_id": "your_name_ddmmyyyy",
  "email": "your_email@example.com",
  "roll_number": "your_roll_number",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["a", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

---

## 🧠 Logic Used

The API performs the following operations:

1. Iterates through the input array
2. Identifies the type of each element
3. Categorizes values accordingly
4. Computes:

   * Sum of numeric values
   * Reverse concatenated string with alternating capitalization
5. Sends a structured JSON response

---

## 🧪 Testing the API

You can test the API using:

* Postman
* Thunder Client
* cURL
* Hoppscotch

### Example cURL Command

```bash
curl -X POST https://bajaj-bfhl-2-0e53.onrender.com/bfhl \
-H "Content-Type: application/json" \
-d '{"data":["2","a","#","7"]}'
```

---

## 🌐 Deployment

The application is deployed on Render for public accessibility.

### Deployment Platform

* Render

---

## 🔒 Error Handling

The API handles:

* Invalid JSON payloads
* Empty requests
* Unsupported data formats
* Internal server errors

---

## 📈 Future Improvements

* Add frontend interface
* Add API documentation with Swagger
* Add automated testing
* Docker containerization
* CI/CD integration
* Input validation middleware

---

## 👨‍💻 Author

**Prajash Patel**

* GitHub: [https://github.com/PrajashPatel](https://github.com/PrajashPatel)

---

## 📜 License

This project is developed for educational and assessment purposes.
