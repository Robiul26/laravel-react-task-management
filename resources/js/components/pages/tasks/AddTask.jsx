import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';

const AddTask = ({task, errors, handleInput, submitTaskForm, setToggleAddTask, toggleAddTask}) => {
    return (
        <>
            <Card className="m-2">
                <Card.Body>
                    <h4>Add new Task</h4>
                    <Form onSubmit={submitTaskForm}>
                        <Form.Group className="mb-3" controlId="taskId">
                            <Form.Label>Task name</Form.Label>
                            <Form.Control type="text" name='name' onChange={handleInput} value={task.name} placeholder="Enter task name" />
                            <Form.Text className="text-muted">
                                {errors.errors && errors.errors.name &&
                                    <p className='text-danger'>{errors.errors.name[0]}</p>
                                }
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="descriptionId">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" name='description' onChange={handleInput} value={task.description} as="textarea" placeholder="Enter description" />
                            <Form.Text className="text-muted">
                                {errors.errors && errors.errors.description &&
                                    <p className='text-danger'>{errors.errors.description[0]}</p>
                                }
                            </Form.Text>
                        </Form.Group>
                        <Button variant="success" type="submit"> Save Task </Button>
                        {toggleAddTask &&
                            <button className='btn btn-danger ms-2' onClick={() => setToggleAddTask(!toggleAddTask)}>Cancle</button>
                        }
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};

export default AddTask;