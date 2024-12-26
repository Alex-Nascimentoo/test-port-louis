# Test - Port Louis

This project is a test for the position of backend developer.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

To install this project, follow these steps:

1. Clone the repository:
  ```sh
  git clone https://github.com/alex-nascimentoo/test-port-louis.git
  ```
2. Navigate to the project directory:
  ```sh
  cd test-port-louis
  ```
3. Install the dependencies:
  ```sh
  npm install
  ```

## Usage

To use this project, let's first run the database with docker. For this, use the following command:
```sh
docker compose up -d
```
This will create a docker container with name ```test-port-louis-mysql-1```

After that, let's create our ```.env``` file, it should look something like this:

```js
DATABASE_URL="mysql://root:root@localhost:3306/contacts_db"
PORT=5000
```

Now we are ready to start using the application. Just run the following command:

```sh
npm start
```
