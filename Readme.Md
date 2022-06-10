## React Test Case
### Project main directory structure

- client
- server

#### Database used in the project
    - MySql

### Libraries used in the project
   - axios : Promise based HTTP client for the browser and node.js - GitHub - axios/axios
   - bootstrap : It is a front-end framework used for easier and faster web development. 
   - object-hash : Generate hashes from objects and values in node and the browser. Uses node.js crypto module for hashing.
   - React-Router : It is a fully-featured client and server-side routing library for React, a JavaScript library for building user interfaces.
   - body-parse : Node.js body parsing middleware.
   - cors : Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources.
   - express : Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
   - mysql2 : MySQL client for Node.js with focus on performance. Supports prepared statements, non-utf8 encodings, binary log protocol, compression, ssl.
   - nodemon : It is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected. 

### An example image of the database relation related
![RDMSLImage](/ReadmeFiles/RDMSLimage1.png)

* department_id and employee_id were used for tables relations

---
 The Employee entry can only see employees in their department.

 Ex:

 ![EmpLoginv1](/ReadmeFiles/EmployeeLogun1.png)

---
 Admin account with root privilege can see all details of all employees

Ex:

 ![RootLoginv1](/ReadmeFiles/AdminLoginv1.png)

> Note: root account was  hashed with md5
* **admin username:** root
* **password :** P@ssword123 

---
The root user can add employee

Ex:

 ![addEmpl](/ReadmeFiles/addEmpv1.png)

 ---
 Simple Local Storage Used

 Ex:

  ![Ls1](/ReadmeFiles/Ls1.png)

  ![Ls2](/ReadmeFiles/Ls2.png)


--------------------------------
Details on database relations

  ![ForeignK](/ReadmeFiles/RdbslForeign.png)


> Note: Sql Queries are in the SqlQuery folder