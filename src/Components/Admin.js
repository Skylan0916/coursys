import React from 'react';
import { useState } from "react";
import * as mutations from '../graphql/mutations';
import { generateClient } from 'aws-amplify/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SubjectData } from '../data/Subject';
import { stringToHash } from '../utils'

const client = generateClient();

const Admin = () => {
    // Add course fields
    const [subject, setSubject] = useState("");
    const [number, setNumber] = useState("");
    const [title, setTitle] = useState("");
    const [point, setPoint] = useState("");
    const [breath, setBreath] = useState(false);
    const [elective, setElective] = useState(false);
    const [required, setRequired] = useState(false);
    const [description, setDescription] = useState("");

    // Remove course fields
    const [subject2, setSubject2] = useState("");
    const [number2, setNumber2] = useState("");

    function showSuccess(message) {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT,
        });
    };

    function showError(message) {
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT,
        });
    };

    const handleAddCourse = (event) => {
        event.preventDefault();

        setTitle(title.trim())
        setDescription(description.trim())

        addCourse(subject, number, title, point, breath, elective, required, description);
    }

    const handleRemoveCourse = (event) => {
        event.preventDefault();
        removeCourse(subject, number);
    }

    async function addCourse(subject, number, title, point, breath, elective, required, description) {
        const id = stringToHash(subject + number)
        const courseDetails = {
            id: id,
            subject: subject,
            number: number,
            title: title,
            point: point,
            is_breath: breath,
            is_elective: elective,
            is_required: required,
            description: description
        };

        try {
            const newCourse = await client.graphql({
                query: mutations.createCourse,
                variables: { input: courseDetails }
            });
            showSuccess(`Added course ${subject} ${number}`)
        } catch (error) {
            showError(`Failed to add course ${subject} ${number}`)
        }
    }

    async function removeCourse(subject, number) {
        const id = stringToHash(subject + number)
        const courseDetails = {
            id: id
        };

        try {
            const deletedCourse = await client.graphql({
                query: mutations.deleteCourse,
                variables: { input: courseDetails }
            });
            showSuccess(`Removed course ${subject} ${number}`)
        } catch (error) {
            showError(`Failed to remove course ${subject} ${number}`)
        }
    }

    return (
        <div>
            <h1>Administration</h1>

            <h2>Course</h2>

            {/* Add Course Section */}
            <form onSubmit={handleAddCourse}>
                <ul>
                    <li>
                        <label>Subject</label>
                        <span>
                            <select defaultValue={""} required onChange={(e) => setSubject(e.target.value)}>
                                <option key="default" value="" disabled hidden></option>
                                {SubjectData.map((subject) => (
                                    <option key={subject.symbol} value={subject.symbol}>{subject.symbol}</option>
                                ))}
                            </select>
                        </span>
                    </li>
                    <li>
                        <label>Number</label>
                        <span>
                            <input type="number" min="1000" max="9999" required value={number} onChange={(e) => setNumber(e.target.value)} />
                        </span>
                    </li>
                    <li>
                        <label>Title</label>
                        <span>
                            <input type="text" size="40" value={title} required onChange={(e) => setTitle(e.target.value)} />
                        </span>
                    </li>
                    <li>
                        <label>Point</label>
                        <span>
                            <input type="number" min="1" max="10" required value={point} onChange={(e) => setPoint(e.target.value)} />
                        </span>
                    </li>
                    <li>
                        <label>Breath</label>
                        <span>
                            <input type="checkbox" value={breath} onChange={(e) => setBreath(e.target.checked)} />
                        </span>
                    </li>
                    <li>
                        <label>Elective</label>
                        <span>
                            <input type="checkbox" value={elective} onChange={(e) => setElective(e.target.checked)} />
                        </span>
                    </li>
                    <li>
                        <label>Required</label>
                        <span>
                            <input type="checkbox" value={required} onChange={(e) => setRequired(e.target.checked)} />
                        </span>
                    </li>
                    <br />
                    <li>
                        <label>Description</label>
                        <span>
                            <textarea cols="112" rows="5" required value={description} onChange={(e) => setDescription(e.target.value)} />
                        </span>
                    </li>
                    <br />
                    <li>
                        <button type="submit">Add Course</button>
                    </li>
                </ul>
            </form>

            {/* Remove Course Section */}
            <form onSubmit={handleRemoveCourse}>
                <ul>
                    <li>
                        <label>Subject</label>
                        <span>
                            <select defaultValue={""} required onChange={(e) => setSubject2(e.target.value)}>
                                <option value="" disabled hidden></option>
                                {SubjectData.map((subject) => (
                                    <option key={subject.symbol} value={subject.symbol}>{subject.symbol}</option>
                                ))}
                            </select>
                        </span>
                    </li>
                    <li>
                        <label>Number</label>
                        <span>
                            <input type="number" min="1000" max="9999" required value={number2} onChange={(e) => setNumber2(e.target.value)} />
                        </span>
                    </li>
                    <br />
                    <li>
                        <button type="submit">Remove Course</button>
                    </li>
                </ul>
            </form>


            <h2>Course Offering</h2>

            {/* Add Class Section */}


            {/* Remove Class Section */}

            <ToastContainer />
        </div>
    )
}

export default Admin;