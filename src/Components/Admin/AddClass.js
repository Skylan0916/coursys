import React from 'react';
import { useState } from "react";
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import { generateClient } from 'aws-amplify/api';
import 'react-toastify/dist/ReactToastify.css';
import { SubjectData } from '../../data/Subject';
import { SemesterData } from '../../data/Semester';
import { stringToHash, showError, showSuccess } from '../../utils';

const client = generateClient();

function AddClass() {
    const [subject, setSubject] = useState("");
    const [number, setNumber] = useState("");
    const [title, setTitle] = useState("");
    const [instructor, setInstructor] = useState("");
    const [semester, setSemester] = useState("");
    const [time, setTime] = useState("");
    const [capacity, setCapacity] = useState(0);
    const [enrollment, setEnrollment] = useState(0);

    const handleAddClass = (event) => {
        event.preventDefault();
        setTitle(title.trim())
        addClass(subject, number, title, instructor, semester, time, capacity, enrollment);
    }

    async function addClass(subject, number, title, instructor, semester, time, capacity, enrollment) {
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
            campus: "",
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

    return (
        <div>
            <form onSubmit={handleAddClass}>
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
                        <label>Instructor</label>
                        <span>
                            <input type="text" size="20" value={instructor} required onChange={(e) => setInstructor(e.target.value)} />
                        </span>
                    </li>
                    <li>
                        <label>Semester</label>
                        <span>
                            <select defaultValue={""} required onChange={(e) => setSemester(e.target.value)}>
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
                            <input type="text" size="20" value={time} required onChange={(e) => setTime(e.target.value)} />
                        </span>
                    </li>
                    <li>
                        <label>Capacity</label>
                        <span>
                            <input type="number" min="1" max="500" required value={capacity} onChange={(e) => setCapacity(e.target.value)} />
                        </span>
                    </li>
                    <li>
                        <label>Enrollment</label>
                        <span>
                            <input type="number" min="0" max="500" required value={enrollment} onChange={(e) => setEnrollment(e.target.value)} />
                        </span>
                    </li>
                    <br />
                    <li>
                        <button type="submit">Add Class</button>
                    </li>
                </ul>
            </form>
        </div>
    );
}

export default AddClass;