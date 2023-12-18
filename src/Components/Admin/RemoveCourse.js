import React from 'react';
import { useState } from "react";
import * as mutations from '../../graphql/mutations';
import { generateClient } from 'aws-amplify/api';
import 'react-toastify/dist/ReactToastify.css';
import { SubjectData } from '../../data/Subject';
import { stringToHash, showError, showSuccess } from '../../utils';

const client = generateClient();

function RemoveCourse() {
    const [subject, setSubject] = useState("");
    const [number, setNumber] = useState("");

    const handleRemoveCourse = (event) => {
        event.preventDefault();
        removeCourse(subject, number);
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
            <form onSubmit={handleRemoveCourse} className="Form">
                <ul>
                    <li>
                        <label>Subject</label>
                        <span>
                            <select defaultValue={""} required onChange={(e) => setSubject(e.target.value)}>
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
                            <input type="number" min="1000" max="9999" required value={number} onChange={(e) => setNumber(e.target.value)} />
                        </span>
                    </li>
                    <br />
                    <li>
                        <button type="submit">Remove Course</button>
                    </li>
                </ul>
            </form>
        </div>
    );
}

export default RemoveCourse;