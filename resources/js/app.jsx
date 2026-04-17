// import {useEffect} from "react";
//
// useEffect(() => {
//     fetch('http://127.0.0.1:8000/api/test')
//         .then(res => res.json())
//         .then(data => console.log(data));
// }, []);
import './bootstrap';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
function App() {
    const [apiData, setApiData] = useState(null);
    useEffect(() => {
        // You can fetch from your Laravel API routes like this!
        // Make sure to define Route::get('/test', ...) in routes/api.php
        fetch('http://127.0.0.1:8000/api/test')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setApiData(data);
            })
            .catch(err => console.error("API Error: ", err));
    }, []);
    return (
        <div>
            <h2>React is Successfully Installed and Running!</h2>
            <p>This component is rendered by React from resources/js/app.jsx</p>
        </div>
    );
}
// Find the root element and render the App component
const rootElement = document.getElementById('react-root');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
}
