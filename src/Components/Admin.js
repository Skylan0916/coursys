import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCourse from './Admin/AddCourse';
import RemoveCourse from './Admin/RemoveCourse';
import AddClass from './Admin/AddClass';
import RemoveClass from './Admin/RemoveClass';

const Admin = () => {
    return (
        <div>
            <h1>Administration</h1>

            <h2 className="Title">Course</h2>

            <AddCourse/>

            <RemoveCourse/>

            <br />

            <h2 className="Title">Course Offering</h2>

            <AddClass/>

            <RemoveClass/>

            <ToastContainer />
        </div>
    )
}

export default Admin;