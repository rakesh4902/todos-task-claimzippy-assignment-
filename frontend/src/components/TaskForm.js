import { Component } from 'react';
import './TaskForm.css'

class TaskForm extends Component {
  state = {
    tasks: [],
    title: '',
    description: '',
    selectedTaskId: null,
    errorMessage: '',
  };

  // Fetch tasks from the backend when the component mounts
  componentDidMount() {
    this.fetchTasks();
  }

  // Fetch tasks from the backend
  fetchTasks = async () => {
    try {
      // Fetch tasks from the backend API
      const response = await fetch('http://localhost:3000/tasks');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const tasks = await response.json();
      this.setState({ tasks });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Handle input change for title and description fields
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };



  // Handle form submission (creating or updating a task)
  handleSubmit = async (e) => {
    e.preventDefault();
  
    const { title, description, selectedTaskId } = this.state;
  
    if (selectedTaskId) {
      // Update existing task
      try {
        // Sending PUT request to update task
        const response = await fetch(`http://localhost:3000/tasks/${selectedTaskId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, description }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
        
          if (Array.isArray(errorData.errors)) {
            throw new Error(errorData.errors.join('\n'));
          } else if (typeof errorData.errors === 'string') {
            throw new Error(errorData.errors);
          } else {
            // Handle other cases if needed
            throw new Error('An unexpected error occurred.');
          }
        }
  
        console.log('Task updated successfully');
  
        // Reset the form and selectedTaskId after updating
        this.setState({ title: '', description: '', selectedTaskId: null, errorMessage: null });
  
        // Fetch tasks again after updating
        this.fetchTasks();
        // Handle response and errors
      } catch (error) {
        console.error('Error updating task:', error);
        this.setState({ errorMessage: error.message });
      }
    } else {
      // Create new task
      try {
        const response = await fetch('http://localhost:3000/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, description }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
        
          if (Array.isArray(errorData.errors)) {
            throw new Error(errorData.errors.join('\n'));
          } else if (typeof errorData.errors === 'string') {
            throw new Error(errorData.errors);
          } else {
            // Handle other cases if needed
            throw new Error('An unexpected error occurred.');
          }
        }
        
  
        console.log('Task created successfully');
  
        // Reset the form after creating
        this.setState({ title: '', description: '', errorMessage: "" });
  
        // Fetch tasks again after creating
        this.fetchTasks();
      } catch (error) {
        console.log('Error creating task:', error);

        this.setState({ errorMessage: error.message });
      }
    }
  };
  

  // Handle updating a task
  handleUpdate = (taskId) => {
    // Set the selectedTaskId for the task being updated
    const selectedTask = this.state.tasks.find((task) => task.id === taskId);
    if (selectedTask) {
      this.setState({
        title: selectedTask.title,
        description: selectedTask.description,
        selectedTaskId: taskId,
      });
    }
  };

  // Handle deleting a task
  handleDelete = async (taskId) => {
    // Delete the task with the given ID
    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors.join('\n'));
      }

      console.log('Task deleted successfully');

      // Update state by removing the deleted task
      this.setState((prevState) => ({
        tasks: prevState.tasks.filter((task) => task.id !== taskId),
        errorMessage: '',
      }));
    } catch (error) {
      console.error('Error deleting task:', error);
      this.setState({ errorMessage: error.message });
    }
  };

  // Generate a random image URL for task background
   imageUrls = [
    'https://shorturl.at/buLO2',
    'https://shorturl.at/jkmuY',
  'https://shorturl.at/qvEL9',
    'https://shorturl.at/amntW',
    'https://shorturl.at/muKVZ',
    'https://shorturl.at/opCQ7',
    'https://rb.gy/emofwj',
    'https://shorturl.at/uwRSU',
    'https://shorturl.at/uERSU',
    'https://shorturl.at/rJO19',
    'https://shorturl.at/brsI8',

  ];

  getRandomImageUrl = () => {
    const randomIndex = Math.floor(Math.random() * this.imageUrls.length);
    return `url('${this.imageUrls[randomIndex]}')`;
  };


  // Render the TaskForm component
  render() {
    
    const {errorMessage,tasks,selectedTaskId}=this.state
    const noTasksAssigned = tasks.length === 0;
    return (
      <div className="main-app-container">
        <div className="form-app-container">
          {/* Form for creating or updating tasks */}
        <form onSubmit={this.handleSubmit} className="form-container">
          <h1 className="task-head">{selectedTaskId ? 'Update Task' : 'Task Schedule'}</h1>
          <div className='input-container'>
          <label className="form-header">Title</label>
          <input type="text" name="title" value={this.state.title} onChange={this.handleInputChange}  style={{ width: '100%' }}/>
          </div>
          <br />
          <div className='input-container'>
          <label className="form-description">Description</label>
          <textarea 
          name="description" 
          className="description" 
          value={this.state.description} 
          onChange={this.handleInputChange} 
          style={{ width: '100%', resize: 'none' }}
          />

          </div>
          <br />
          <button type="submit" className="submit-task">{selectedTaskId ? 'Update Task' : 'Assign Task'}</button>
          {errorMessage && <p className='error-message'>{errorMessage}</p>}
        </form>
        </div>
        
        <div className="tasks-list">
          {/* Display list of assigned tasks */}
        <h1 className="assigned-task-head"> Assigned Tasks</h1>
        <ul className="task-container">
          { noTasksAssigned ? (
                    <div className="finished-task"></div>
                ):( tasks.map((task) => (
            <li key={task.id} className="task-overview" style={{ backgroundImage: this.getRandomImageUrl(), backgroundSize: 'cover'}}>
            <div>
                <h1 className="task-title">{task.title}</h1>
                <hr className="title-divider" />
                <p className="task-description">{task.description}</p>
            </div>
            <div className="button-container">
                <button onClick={() => this.handleUpdate(task.id)} className="update-button">Update Status</button>
                <button onClick={() => this.handleDelete(task.id)} className="delete-button">Delete</button>
            </div>
        </li>)
          ))}
        </ul>
        </div>
        
      </div>
    );
  }
}

export default TaskForm;
