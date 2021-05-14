# How to run locally
Step 0: make sure to have NPM and MongoDB installed.

Step 1: cd into /client-side and run:
npm install


Step 2: Open a separate CMD and cd into /server-side and run:
npm install

Step 3: Open a separate CMD and cd into mongoDB installation folder (to the bin folder) and run mongod.exe:
mongod
(OR go to e.g. C:\Program Files\MongoDB\Server\4.2\bin, click on mongod.exe)
Minimize & let be.

Step 4: run server-side, cd into /server-side and run:
npm run start
Minimize & let be

Step 5: run client-side, cd into /client-side and run:
npm run serve
Go to http://localhost:8080 (see message at end in client-side cmd window)


Instructions
- The tool will start with the latest uploaded database (used for testing the software)
- To start with an empty database, load the file "empty_database.xlsx"
- To fill the database, it is needed to use the tool itself.


Known issues
- In case of empty learning items table, learning outcomes will not load ==> make sure to have at least one learning item before downloading/saving database for future use.

