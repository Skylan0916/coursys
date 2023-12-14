import React from 'react';
import { useState } from "react";
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import { generateClient } from 'aws-amplify/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SubjectData } from '../data/Subject';
import { SemesterData } from '../data/Semester';
import { CampusData } from '../data/Campus';
import { stringToHash } from '../utils';

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

    // Add class fields
    const [subject3, setSubject3] = useState("");
    const [number3, setNumber3] = useState("");
    const [title3, setTitle3] = useState("");
    const [instructor3, setInstructor3] = useState("");
    const [semester3, setSemester3] = useState("");
    const [time3, setTime3] = useState("");
    const [campus3, setCampus3] = useState("");
    const [capacity3, setCapacity3] = useState(0);
    const [enrollment3, setEnrollment3] = useState(0);

    // Remove class fields
    const [subject4, setSubject4] = useState("");
    const [number4, setNumber4] = useState("");
    const [instructor4, setInstructor4] = useState("");
    const [semester4, setSemester4] = useState("");

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

    const handleAddClass = (event) => {
        event.preventDefault();
        setTitle(title.trim())
        addClass(subject3, number3, title3, instructor3, semester3, time3, campus3, capacity3, enrollment3);
    }

    const handleRemoveClass = (event) => {
        event.preventDefault();
        removeClass(subject4, number4, instructor4, semester4);
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

    async function addClass(subject, number, title, instructor, semester, time, campus, capacity, enrollment) {
        const courseId = stringToHash(subject + number);
        const id = stringToHash(subject + number + instructor + semester);

        try {
            const course = await client.graphql({
                query: queries.getCourse,
                variables: { id: courseId }
              });
        } catch (error) {
            showError(`Course ${subject} ${number} does not exist`)
            return
        }

        const classDetails = {
            id: id,
            courseClassesId: courseId,
            title: title,
            instructor: instructor,
            semester: semester,
            time: time,
            campus: campus,
            capacity: capacity,
            enrollment: enrollment,
            description: ""
        };

        try {
            const newClass = await client.graphql({
                query: mutations.createClass,
                variables: { input: classDetails }
            });
            showSuccess(`Added class ${subject} ${number} for ${semester} instructed by ${instructor}`)
        } catch (error) {
            console.log(error)
            showError(`Failed to add class ${subject} ${number} for ${semester} instructed by ${instructor}`)
        }
    }

    async function removeClass(subject, number, instructor, semester) {
        const id = stringToHash(subject + number + instructor + semester)
        const classDetails = {
            id: id
        };

        try {
            const deletedClass = await client.graphql({
                query: mutations.deleteClass,
                variables: { input: classDetails }
            });
            showSuccess(`Removed class ${subject} ${number} for ${semester} instructed by ${instructor}`)
        } catch (error) {
            showError(`Failed to remove class ${subject} ${number} for ${semester} instructed by ${instructor}`)
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

            <br />

            <h2>Course Offering</h2>

            {/* Add Class Section */}
            <form onSubmit={handleAddClass}>
                <ul>
                    <li>
                        <label>Subject</label>
                        <span>
                            <select defaultValue={""} required onChange={(e) => setSubject3(e.target.value)}>
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
                            <input type="number" min="1000" max="9999" required value={number3} onChange={(e) => setNumber3(e.target.value)} />
                        </span>
                    </li>
                    <li>
                        <label>Title</label>
                        <span>
                            <input type="text" size="40" value={title3} required onChange={(e) => setTitle3(e.target.value)} />
                        </span>
                    </li>
                    <li>
                        <label>Instructor</label>
                        <span>
                            <input type="text" size="20" value={instructor3} required onChange={(e) => setInstructor3(e.target.value)} />
                        </span>
                    </li>
                    <li>
                        <label>Semester</label>
                        <span>
                            <select defaultValue={""} required onChange={(e) => setSemester3(e.target.value)}>
                                <option key="default" value="" disabled hidden></option>
                                {SemesterData.map((semester) => (
                                    <option key={semester.value} value={semester.value}>{semester.value}</option>
                                ))}
                            </select>
                        </span>
                    </li>
                    <li>
                        <label>Time</label>
                        <span>
                            <input type="text" size="20" value={time3} required onChange={(e) => setTime3(e.target.value)} />
                        </span>
                    </li>
                    <li>
                        <label>Campus</label>
                        <span>
                            <select defaultValue={""} required onChange={(e) => setCampus3(e.target.value)}>
                                <option key="default" value="" disabled hidden></option>
                                {CampusData.map((campus) => (
                                    <option key={campus.value} value={campus.value}>{campus.value}</option>
                                ))}
                            </select>
                        </span>
                    </li>
                    <li>
                        <label>Capacity</label>
                        <span>
                            <input type="number" min="1" max="500" required value={capacity3} onChange={(e) => setCapacity3(e.target.value)} />
                        </span>
                    </li>
                    <li>
                        <label>Enrollment</label>
                        <span>
                            <input type="number" min="0" max="500" required value={enrollment3} onChange={(e) => setEnrollment3(e.target.value)} />
                        </span>
                    </li>
                    <br />
                    <li>
                        <button type="submit">Add Class</button>
                    </li>
                </ul>
            </form>

            {/* Remove Class Section */}
            <form onSubmit={handleRemoveClass}>
                <ul>
                    <li>
                        <label>Subject</label>
                        <span>
                            <select defaultValue={""} required onChange={(e) => setSubject4(e.target.value)}>
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
                            <input type="number" min="1000" max="9999" required value={number4} onChange={(e) => setNumber4(e.target.value)} />
                        </span>
                    </li>
                    <li>
                        <label>Instructor</label>
                        <span>
                            <input type="text" size="20" value={instructor4} required onChange={(e) => setInstructor4(e.target.value)} />
                        </span>
                    </li>
                    <li>
                        <label>Semester</label>
                        <span>
                            <select defaultValue={""} required onChange={(e) => setSemester4(e.target.value)}>
                                <option key="default" value="" disabled hidden></option>
                                {SemesterData.map((semester) => (
                                    <option key={semester.value} value={semester.value}>{semester.value}</option>
                                ))}
                            </select>
                        </span>
                    </li>
                    <br />
                    <li>
                        <button type="submit">Remove Class</button>
                    </li>
                </ul>
            </form>

            <ToastContainer />
        </div>
    )
}

export default Admin;