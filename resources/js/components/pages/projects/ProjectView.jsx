import React, { useState, useEffect } from 'react';
import { Form, Badge, Button, Card, Container, Alert } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AddTask from '../tasks/AddTask';
import ProjectEdit from './ProjectEdit';

const ProjectView = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [project, setProject] = useState({});
    const [toggleAddTask, setToggleAddTask] = useState(false);
    const [toggleEditProject, setToggleEditProject] = useState(false);
    const [task, setTask] = useState({
        name: '',
        description: '',
        project_id: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getProjectDetails();
    }, []);

    const getProjectDetails = () => {
        fetch(('http://127.0.0.1:8000/api/projects/' + id))
            .then(res => res.json())
            .then(data => setProject(data.data))
    };

    const handleInput = (e) => {
        const newTask = { ...task };
        newTask[e.target.name] = e.target.value;
        setTask(newTask);
    }

    const submitTaskForm = (e) => {
        e.preventDefault();

        const postBody = {
            name: task.name,
            description: task.description,
            project_id: id
        }
        // console.log('from post body:', postBody);
        fetch('http://127.0.0.1:8000/api/tasks/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postBody)
        })
            .then(res => {
                return res.json();

            })
            .then(data => {
                // console.log('from then:', data.data);

                if (data.success) {
                    // console.log(task);
                    if (project.tasks) {
                        const taskList = project.tasks;
                        taskList.unshift(postBody);
                        setTask(taskList);
                    } else {
                        setTask(postBody);
                    }

                    setTask({
                        name: '',
                        description: '',
                        project_id: ''
                    });
                    // navigate(`/projects/view/${id}`);
                } else {
                    // console.log(data.errors);
                    setErrors({
                        errors: data.errors
                    });
                }
                // console.log('Errorfffrr', errors);
                // setLoading(false);
            });
    }

    const markAsCompleteTask = (taskId, task) => {
        let taskData = {};
        if (task.status === 0) {
            taskData = {
                name: task.name,
                description: task.description,
                status: 1,
                project_id: task.project_id
            }
        } else {
            taskData = {
                name: task.name,
                description: task.description,
                status: 0,
                project_id: task.project_id
            }
        }

        fetch('http://127.0.0.1:8000/api/tasks/' + taskId, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        })
            .then(res => {
                return res.json();

            })
            .then(data => {
                getProjectDetails();
                if (data.success) {

                } else {
                    // debugger
                    setErrors({
                        errors: data.errors
                    });
                }
                // console.log('Errorfffrr', errors);
                // setLoading(false);
            });
    }

    const deleteTask = (taskId) => {
        fetch('http://127.0.0.1:8000/api/tasks/' + taskId, {
            method: 'DELETE'
        }).then(() => {
            const remainigTasks = project.tasks.filter(item => item.id !== taskId);
            // setTask(remainigTasks);
            // console.log(remainigTasks);
            setProject({
                tasks: remainigTasks
            })
        })
    }

    return (
        <>
            <Container className='py-5'>
                <Card className="mb-4">
                    <Card.Header>
                        <div className="float-start">
                            {!toggleEditProject ? <h2 className='text-uppercase'>{project.name}<Badge bg="primary" className='ms-2'>{project.tasks && project.tasks.length}</Badge></h2> :
                                <h2>Edit Project</h2>
                            }
                        </div>
                        <div className="float-end">
                            {project.status === 1 ? <Button className='me-2' variant='outline-success' disabled> ✔ Completed</Button> :
                                <Button className='me-2' variant='outline-warning' disabled>Panding...</Button>
                            }
                            {!toggleEditProject && <button className='btn btn-success' onClick={() => setToggleEditProject(!toggleEditProject)}>Edit</button>}
                            <Link className='ms-2 btn btn-primary' to="/projects">View all</Link>
                        </div>
                    </Card.Header>
                    {!toggleEditProject ?
                        <>
                            {!toggleAddTask &&
                                <button className='btn btn-primary' onClick={() => setToggleAddTask(!toggleAddTask)}>➕ Create Task</button>
                            }
                            {toggleAddTask &&
                                <AddTask
                                    task={task}
                                    errors={errors}
                                    handleInput={handleInput}
                                    submitTaskForm={submitTaskForm}
                                    setToggleAddTask={setToggleAddTask}
                                    toggleAddTask={toggleAddTask}
                                />

                            }
                            {
                                project.tasks && project.tasks.length === 0 &&
                                <Alert variant="warning" className='m-5'>
                                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                                    <p>
                                        Task not available! Please Create
                                    </p>
                                </Alert>
                            }

                            {
                                project.tasks && project.tasks.map((task, index) => (
                                    <Card key={index} className="m-2">
                                        <Card.Body>
                                            <div className="float-start">
                                                <h4>{task.status ? <del className='text-success'> {task.name}</del> : task.name}</h4>
                                                {/* <p></p> */}
                                                <Card.Text>
                                                    {task.description}
                                                </Card.Text>
                                            </div>
                                            <div className="float-end">
                                                {task.status === 1 ? <Button variant='outline-success' onClick={() => markAsCompleteTask(task.id, task)}>✔ Mark as Completed</Button> :
                                                    <Button variant='outline-warning' onClick={() => markAsCompleteTask(task.id, task)}>Panding...</Button>}
                                                <Button className='ms-2' onClick={() => deleteTask(task.id)} variant="outline-danger">Delete</Button>
                                            </div>

                                        </Card.Body>
                                    </Card>
                                ))
                            }
                        </> :
                        <ProjectEdit
                            project={project}
                            setProject={setProject}
                            toggleEditProject={toggleEditProject}
                            setToggleEditProject={setToggleEditProject}
                        />

                    }
                </Card>
            </Container>
        </>
    );
};

export default ProjectView;