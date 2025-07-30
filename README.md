# Bajaj Finserv Health - Full Stack API Challenge (July 2025)

[cite_start]This project is a REST API created for the Chitkara Campus Hiring challenge by Bajaj Finserv Health[cite: 1, 3, 4]. The API processes an incoming array of data and returns a structured JSON object containing classified information based on the input.

## Objective

[cite_start]The core objective is to build and host a REST API that accepts a POST request with an array of data. [cite: 6] [cite_start]The API processes this array to separate numbers, alphabets, and special characters, and returns a JSON response with the classified data along with other user-specific details. [cite: 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

## Tech Stack

* **Runtime**: Node.js
* **Framework**: Express.js
* **Language**: TypeScript

## API Endpoint Details

### `/bfhl`

* [cite_start]**Method**: `POST` [cite: 30]
* **Description**: Processes an array of mixed data types.
* [cite_start]**Success Status Code**: `200` [cite: 32]

#### Request Body

The request must contain a JSON object with a single key, `data`, which holds an array of strings.

[cite_start]**Example:** [cite: 46-49]
```json
{
  "data": ["a","1","334","4","R", "$"]
}
