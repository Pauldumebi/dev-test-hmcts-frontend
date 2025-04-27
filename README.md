# HMCTS Dev Test Frontend

### Getting Started
To get the frontend up and running locally, follow these steps:

### **Local Setup**

* The frontend connects to the local backend API at http://127.0.0.1:8000/api.

* Ensure the backend server is running before you start the frontend.

### 1. **Install Dependencies**
Run the following command to install all the required dependencies:

```json
    yarn install
```

### 2. **Build the Project**
Once dependencies are installed, build the project by running:

```json
    yarn webpack
```

### 3. **Start the Development Server**
To start the development server, run:

```json
    yarn start:dev
```

### 4. **Run Test**
Use the following command to run tests:

```json
    yarn test
```

yarn test

Alternatively, you can navigate to ```package.json``` and run the ```start:dev``` script manually.

This will start the frontend application on your local machine.

### **Features**

Once the frontend is up and running, you can:

1. Create Tasks
Add new tasks with a title, optional description, status, and due date.

2. View Tasks
View a list of all tasks. Click on any task to view its details.

3. Update Tasks
You can update the status of a task. For example, mark a task as "completed."

4. Delete Tasks
Delete tasks that are no longer needed.


### **Project Structure**

```src```: Contains all the frontend source code.

```public```: Holds static assets such as images and index.html.

```webpack.config.js```: Configuration for bundling the application.