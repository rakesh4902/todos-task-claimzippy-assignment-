#### Task Management Application Overview

This application offers a streamlined interface for users to manage their tasks efficiently. Users can create, update, and delete tasks seamlessly within the user-friendly environment. The frontend, powered by React, presents a task form enabling users to input task details such as title and description, while tasks are displayed dynamically in a list format.


### Desktop View

![Desktop View](https://github.com/rakesh4902/todos-task-claimzippy-assignment-/assets/83058036/1fb52ca6-640d-49ae-acdd-d3b86b756103)


### Mobile View

![Task Management Interface](([https://imgur.com/IwpI4n6](https://drive.google.com/file/d/1N-ldDzUAi3vzJac2Wr0D8okpEE_mOkNV/view?usp=sharing)))


### Data Validation

- The backend, built with Express and Sequelize, includes a validation process for incoming task data.
- Users must enter a title with a minimum of 2 characters.
- Both the title and description fields must not be empty.
- This validation ensures that only valid task data is accepted and stored, enhancing the reliability of the application.

- ![Task Management Interface]((https://imgur.com/a/WYZDT3I))
- ![Task Management Interface]((https://imgur.com/00fRdfE))




This workflow enables users to perform actions on tasks with ease, enhancing productivity and organization in their workflow.




#### How to Start This Application on Your Local PC

To start this application on your local PC, follow these step-by-step instructions:

#### 1. Download the Code:
- First, download the zip file containing the application code from the GitHub repository.

#### 2. Unzip the File:
- Unzip the downloaded file to access the application code.

#### 3. Open with VS Code:
- Open the unzipped folder using any code editor, such as Visual Studio Code.

#### 4. Set Up Backend:
- Open your terminal.
- Navigate to the backend directory using the command `cd backend`.
- Ensure you have Node.js installed on your computer.
- Install Node.js dependencies by running `npm install`.
- Start the backend server by running `node app.js`.
- Upon successful execution, the backend server should be running.

#### 5. Set Up Frontend:
- Open another terminal window.
- Navigate to the frontend directory using the command `cd frontend`.
- Install frontend dependencies by running `npm install`.
- Start the frontend server by running `npm start`.
- The frontend application should now be accessible at `http://localhost:3001`.

#### 6. Accessing the Application:
- Since the backend server is running on port 3000 and the frontend server on port 3001, the frontend will be accessible at `http://localhost:3001`.
- To interact with the application, navigate to `http://localhost:3001` in your web browser.
- Tasks can be created within the application.

#### 7. Viewing Data in the Backend:
- If you wish to view the data stored in the backend, navigate to `http://localhost:3000/tasks` in your web browser.

#### 8. Additional Notes:
- Make sure both the backend and frontend servers are running simultaneously for the application to function correctly.
- Ensure that no other applications are using ports 3000 and 3001 to avoid conflicts.

This setup should allow you to run and interact with the web application seamlessly. If you encounter any issues during the setup process, feel free to reach out for assistance.
