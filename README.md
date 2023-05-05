# Calculator REST API (Node.js & Express)

This project is a simple calculator REST API built using Node.js, Express, and RapidAPI. It provides two main routes to perform calculations: one for evaluating equations and another for evaluating formulas with variables.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
  - [Endpoints](#endpoints)
- [License](#license)

## Features

- Evaluate mathematical equations
- Evaluate formulas with variables
- Protected by RapidAPI authentication

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14.x or later recommended)
- [npm](https://www.npmjs.com/get-npm) (v6.x or later recommended)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/calculator-rest-api.git
```

2. Navigate to the project directory:

```bash
cd calculator-rest-api
```

3. Install the required dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root folder and set the following variables:

- `PORT`: The port number where the server will listen (default: 5000)
- `RAPIDAPI_PROXY_SECRET`: The secret for RapidAPI authentication (default: "baf47800-331b-11ec-83bb-db3d1a0ed791")

Example:

```bash
PORT=5000
RAPIDAPI_PROXY_SECRET=baf47800-331b-11ec-83bb-db3d1a0ed791
```

## Usage

Start the server by running:

```bash
npm start
```

The server should now be running at http://localhost:5000 (or the port specified in your `.env` file).

### Endpoints

The API provides two main endpoints:

1. `POST /api/equation`: Calculate the result of a mathematical equation.

   Example request body:
   
   ```json
   {
      "equation": "2 + 3 * 4"
   }
   ```
   
   
2. `POST /api/formula`: Calculate the result of a formula with variables.

    Example request body:

      ```json
      {
        "formula": "a * b + c",
        "variables": {
          "a": 2,
          "b": 3,
          "c": 4
        }
      }
      ```
 

**Note:** Access to the API is protected by RapidAPI authentication. Make sure to include the `X-RapidAPI-Proxy-Secret` header in your requests.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt) file for details.

