import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Footer from './layouts/Footer';
import Header from './Layouts/Header';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import ProjectCreate from './pages/projects/ProjectCreate';
import Projects from './pages/projects/Projects';
import ProjectView from './pages/projects/ProjectView';


const App = () => {
    return (
    <BrowserRouter>
        <Header/>    
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/create" element={<ProjectCreate />} />
            <Route path="/projects/view/:id" element={<ProjectView />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
        </Routes>
        <Footer/>
    </BrowserRouter>
    );
};

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}