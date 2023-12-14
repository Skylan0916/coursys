import React from 'react';
import { useState } from "react";
import * as mutations from '../../graphql/mutations';
import { generateClient } from 'aws-amplify/api';
import 'react-toastify/dist/ReactToastify.css';
import { SubjectData } from '../../data/Subject';
import { SemesterData } from '../../data/Semester';
import { stringToHash, showError, showSuccess } from '../../utils';

const client = generateClient();

function RemoveClass() {
    const [subject, setSubject] = useState("");
    const [number, setNumber] = useState("");
    const [instructor, setInstructor] = useState("");
    const [semester, setSemester] = useState("");

    const handleRemoveClass = (event) => {
        event.preventDefault();
        removeClass(subject, number, instructor, semester);
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
            <form onSubmit={handleRemoveClass}>
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
                    <br />
                    <li>
                        <button type="submit">Remove Class</button>
                    </li>
                </ul>
            </form>
        </div>
    );
}

export default RemoveClass;