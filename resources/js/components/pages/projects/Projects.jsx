import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Alert, Badge, Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [searchProjects, setSearchProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const getProjects = () => {
        fetch('http://127.0.0.1:8000/api/projects')
            .then(res => res.json())
            .then(data => {
                setProjects(data.data);
                setSearchProjects(data.data);
                setLoading(false);
            })
    }
    useEffect(() => {
        getProjects();

    }, [])

    const deleteItem = (id) => {
        fetch('http://127.0.0.1:8000/api/projects/' + id, {
            method: 'DELETE'
        }).then(() => {
            console.log('item deleted');
        })
        const remainigProjects = projects.filter(item => item.id !== id);
        setProjects(remainigProjects);
        setSearchProjects(remainigProjects);

    }
    const searchHandler = (e) => {
        const searchInput = e.target.value;
        if (searchInput !== '') {
            const serchItems = projects.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.trim().toLowerCase())
            })
            setSearchProjects(serchItems);
        } else {
            setSearchProjects(projects);
        }
    }

    return (
        <>
            <Container className='my-5'>
                <Row className='my-2'>
                    <Col md={4}>
                        <h2 className='mb-3'>Project List <Badge bg="primary">{searchProjects.length}</Badge></h2>
                    </Col>
                    <Col md={4}>
                        <Form>
                            <Form.Control type="text" onChange={(e) => searchHandler(e)} placeholder="Search Projects" />
                        </Form>
                    </Col>
                    <Col md={4}>
                        <Link className='float-end btn btn-primary' to="/projects/create">➕ Add new</Link>
                    </Col>
                </Row>

                {loading &&
                    <div className="text-center" style={{ height: '50vh' }}>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                }
                {
                    searchProjects.length === 0 ?
                        <Alert variant="warning">
                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                            <p>
                               Data not found
                            </p>
                        </Alert>
                        :
                        searchProjects.map((project, index) => (
                            <Card key={index} className="mb-4">
                                <Card.Header>
                                    {project.id} - {project.name} <Badge bg="primary">{project.tasks_count}</Badge>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        {project.description}
                                    </Card.Text>
                                    <Link className='me-2 btn btn-success' to={`/projects/view/${project.id}`}>👓 View & Edit</Link>
                                    <Button onClick={() => deleteItem(project.id)} variant="danger">🤬 Delete</Button>
                                </Card.Body>
                            </Card>
                        )
                        )
                }

            </Container>
        </>
    );
};

export default Projects;