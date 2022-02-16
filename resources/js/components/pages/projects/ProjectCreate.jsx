import React, { useState } from 'react';
import { Button, Card, Container, Form, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const ProjectCreate = () => {
    const navigate = useNavigate();
    const [project, setProject] = useState({
        name: '',
        description: '',
        user_id: ''
    });
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
            user_id: 1
        }
        fetch('http://127.0.0.1:8000/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postBody)
        }).then(res => {
            return res.json();
        }).then(data => {
            if (data.success) {
                setProject({
                    name: '',
                    description: '',
                    user_id: ''
                });
                navigate('/projects');
            } else {
                setErrors({
                    errors: data.errors
                });
            }
            setLoading(false);
        });

    }


    return (
        <>

            <Container className='py-5'>
                <Card>
                    <Card.Header>
                        <h2>Create new Project
                            <Link className='float-end btn btn-primary' to="/projects">View all</Link>
                        </h2>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={submitForm}>
                            {/* <pre>{JSON.stringify(project, undefined, 2)}</pre> */}
                            <Form.Group className="mb-3" controlId="nameId">
                                <Form.Label>Project name</Form.Label>
                                <Form.Control type="text" name="name" onChange={changeInput} value={project.name} placeholder="Enter Project name" />
                                <Form.Text className="text-muted ">
                                    {errors.errors && errors.errors.name &&
                                        <p className='text-danger'>{errors.errors.name[0]}</p>
                                    }
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="descriptionId">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" name="description" onChange={changeInput} value={project.description} as="textarea" rows="5" placeholder="Enter Project Description" />
                                <Form.Text className="text-muted">
                                    {errors.errors && errors.errors.description &&
                                        <p className='text-danger'>{errors.errors.description[0]}</p>
                                    }
                                </Form.Text>
                            </Form.Group>
                            {loading && <Button variant="primary" type="submit" disabled>
                                <Spinner animation="border" role="status" size='sm'>
                                    <span className="visually-hidden"> Loading...</span>
                                </Spinner>
                                Saving...</Button>}
                            {!loading && <Button variant="primary" type="submit">Save Project</Button>}
                            <Link className='btn btn-danger ms-2' to="/projects">Cancle</Link>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default ProjectCreate;