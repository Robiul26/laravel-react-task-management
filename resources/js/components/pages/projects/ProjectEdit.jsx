import React, { useState } from 'react';
import { Button, Card, Container, Form, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const ProjectEdit = ({ project, setProject, toggleEditProject, setToggleEditProject }) => {
    // console.log(project);
    const navigate = useNavigate();
    // const [project, setProject] = useState({
    //     name: 'jhhjk',
    //     description: '',
    //     user_id: ''
    // });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const changeInput = (e) => {
        const newProject = { ...project };
        newProject[e.target.name] = e.target.value;
        setProject(newProject);


    }


    const submitForm = (e) => {
        e.preventDefault();
        setLoading(true);
        const postBody = {
            name: project.name,
            description: project.description,
            status: project.status,
            user_id: 1
        }

        fetch('http://127.0.0.1:8000/api/projects/' + project.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postBody)
        })
            .then(res => {
                return res.json();

            })
            .then(data => {
                setProject(data.data);
                console.log(data.data);
                if (data.success) {
                    // setProject({
                    //     name: '',
                    //     description: '',
                    //     status: '',
                    //     user_id: ''
                    // });
                    navigate('/projects/view/'+ data.data.id);
                } else {
                    // debugger
                    setErrors({
                        errors: data.errors
                    });
                }
                // console.log('Errorfffrr', errors);
                setLoading(false);
            });


    }


    return (
        <>

            <Container className='py-5'>
                <Card>
                    <Card.Body>
                        <Form onSubmit={submitForm}>
                            {/* <pre>{JSON.stringify(project, undefined, 2)}</pre> */}
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="mb-3" controlId="nameId">
                                        <Form.Label>Project name</Form.Label>
                                        <Form.Control type="text" name="name" onChange={changeInput} value={project.name} placeholder="Enter Project name" />
                                        <Form.Text className="text-muted ">
                                            {errors.errors && errors.errors.name &&
                                                <p className='text-danger'>{errors.errors.name[0]}</p>
                                            }
                                        </Form.Text>
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="mb-3" controlId="statusId">
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control name="status" onChange={changeInput} value={project.status} as="select" >
                                            <option value={0}>Panding</option>
                                            <option value={1}>Completed</option>
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                                <div className="col-md-12">
                                    <Form.Group className="mb-3" controlId="descriptionId">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" name="description" onChange={changeInput} value={project.description} as="textarea" rows="5" placeholder="Enter Project Description" />
                                        <Form.Text className="text-muted">
                                            {errors.errors && errors.errors.description &&
                                                <p className='text-danger'>{errors.errors.description[0]}</p>
                                            }
                                        </Form.Text>
                                    </Form.Group>
                                </div>
                            </div>


                            {loading && <Button variant="primary" type="submit" disabled>
                                <Spinner animation="border" role="status" size='sm'>
                                    <span className="visually-hidden"> Loading...</span>
                                </Spinner>
                                Saving...</Button>}
                            {!loading && <Button variant="success" type="submit">Edit Project</Button>}
                            <Button className='ms-2' variant="danger" onClick={() => setToggleEditProject(!toggleEditProject)}>Cancle</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default ProjectEdit;