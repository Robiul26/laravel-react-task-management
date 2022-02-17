import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { registerUser } from '../../../services/AuthServices';

const Register = () => {
    const [validated, setValidated] = useState(false);

    const [user, setUser] = useState({
        'name': '',
        'email': '',
        'password': '',
        'password_confirmation': ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const changeInput = (e) => {
        const newUserINfo = { ...user };
        newUserINfo[e.target.name] = e.target.value;
        setUser(newUserINfo);
    }
    const submitForm = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        setValidated(true);
        const postBody = {
            name: user.name,
            email: user.email,
            password: user.password,
            password_confirmation: user.password_confirmation,
        }

        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            registerUser(postBody).then(res => {
                if (res.success) {
                    setLoading(true);
                    setUser({
                        'name': '',
                        'email': '',
                        'password': '',
                        'password_confirmation': ''
                    })
                    setErrors({});
                    localStorage.setItem('loginData', JSON.stringify(res));
                } else {
                    setErrors({
                        errors: res.errors
                    });
                    console.log(errors);
                }
                setLoading(false);
            });
        }

    }

    return (
        <>
            <Container className='py-5'>
                <Card>
                    <Card.Header>
                        <h2>Register Account
                            <Link className='float-end btn btn-primary' to="/projects">View all</Link>
                        </h2>
                    </Card.Header>
                    <Card.Body>
                        <Form noValidate validated={validated} onSubmit={submitForm}>
                            {/* <pre>{JSON.stringify(project, undefined, 2)}</pre> */}
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="nameId">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control required minLength={4} type="text" name="name" onChange={changeInput} value={user.name} placeholder="Enter Project name" />
                                        <Form.Text className="text-muted ">
                                            {errors.errors && errors.errors.name &&
                                                <p className='text-danger'>{errors.errors.name[0]}</p>
                                            }
                                        </Form.Text>
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            Please Enter a username.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="emailId">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control required type="email" name="email" onChange={changeInput} value={user.email} placeholder="Enter Email" />
                                        <Form.Text className="text-muted ">
                                            {errors.errors && errors.errors.email &&
                                                <p className='text-danger'>{errors.errors.email[0]}</p>
                                            }
                                        </Form.Text>
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            Please Enter a Email.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="passwordId">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control required minLength={6} type="password" name="password" onChange={changeInput} value={user.password} placeholder="Enter Password" />
                                        <Form.Text className="text-muted ">
                                            {errors.errors && errors.errors.password &&
                                                <p className='text-danger'>{errors.errors.password[0]}</p>
                                            }
                                        </Form.Text>
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            Please Enter Password.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="confirmPasswordId">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control required minLength={6} type="password" name="password_confirmation" onChange={changeInput} value={user.password_confirmation} placeholder="Enter Confirm Password" />
                                        <Form.Text className="text-muted ">
                                            {errors.errors && errors.errors.password_confirmation &&
                                                <p className='text-danger'>{errors.errors.password_confirmation[0]}</p>
                                            }
                                        </Form.Text>
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            Please Enter Confirm Password.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>





                            {loading && <Button variant="primary" type="submit" disabled>
                                <Spinner animation="border" role="status" size='sm'>
                                    <span className="visually-hidden"> Loading...</span>
                                </Spinner>
                                Saving...</Button>}
                            {!loading && <Button variant="success" type="submit">Sign Up</Button>}
                            <Link className='btn btn-danger ms-2' to="/register">Cancle</Link>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default Register;