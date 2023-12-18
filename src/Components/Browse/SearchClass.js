import '../../App.css';
import React from 'react';
import { useState } from "react";
import { generateClient } from 'aws-amplify/api';
import { listCourses, listClasses } from '../../graphql/queries';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { SubjectData } from '../../data/Subject';
import { SemesterData } from '../../data/Semester';
import { showError, showSuccess } from '../../utils';

const client = generateClient();

function SearchCourse() {
    const [classes, setClasses] = useState([]);

    const [semester, setSemester] = useState("");
    const [subject, setSubject] = useState("");
    const [number, setNumber] = useState("");
    const [title, setTitle] = useState("");
    const [point, setPoint] = useState("");
    const [breath, setBreath] = useState(false);
    const [elective, setElective] = useState(false);
    const [required, setRequired] = useState(false);

    const handleSearch = (event) => {
        event.preventDefault();
        setTitle(title.trim());
        search();
    }

    async function search() {
        setClasses([]);

        // Get courses that meet the specified conditions
        let courses = {};

        let params = { query: listCourses };
        const variables = getCourseFilter();
        if (Object.keys(variables.filter).length > 0) {
            params.variables = variables;
        }

        const { data } = await client.graphql(params);

        for (const item of data.listCourses.items) {
            const name = item.subject + ' ' + item.number;
            courses[item.id] = name;
        }

        // Get classes that meet the specified conditions
        try {
            const res = await client.graphql({
                query: listClasses,
                variables: getClassFilter(courses)
            });

            let results = res.data.listClasses.items;

            // Add the corresponding course name to each class
            for (let i = 0; i < results.length; i++) {
                const id = results[i]["courseClassesId"];
                results[i]["course"] = courses[id];
            }

            if (results.length > 0) {
                showSuccess(`Matched ${results.length} classes`);
            } else {
                showError(`No classes matched`);
            }

            setClasses(results);

        } catch(error) {
            showError(`No classes matched`);
        }
    }

    function getCourseFilter() {
        let filter = {};
        if (subject != "") {
            filter.subject = { eq: subject };
        }
        if (number != "") {
            filter.number = { eq: number };
        }
        if (title != "") {
            filter.title = { eq: title };
        }
        if (point != "") {
            filter.point = { eq: point };
        }
        if (breath != false) {
            filter.is_breath = { eq: breath };
        }
        if (elective != false) {
            filter.is_elective = { eq: elective };
        }
        if (required != false) {
            filter.is_required = { eq: required };
        }

        const variables = {
            filter: filter
        };

        return variables;
    };

    function getClassFilter(courses) {
        let filter = {
            or: Object.keys(courses).map(id => ({ courseClassesId: { eq: id } }))
        };

        if (semester != "") {
            filter.semester = { eq: semester };
        }

        const variables = {
            filter: filter
        };

        return variables;
    };

    return (
        <div>
            <form onSubmit={handleSearch} >
                <ul>
                    <li>
                        <label>Semester</label>
                        <span>
                            <select defaultValue={""} onChange={(e) => setSemester(e.target.value)}>
                                <option key="default" value="" disabled hidden></option>
                                {SemesterData.map((semester) => (
                                    <option key={semester.value} value={semester.value}>{semester.value}</option>
                                ))}
                            </select>
                        </span>
                    </li>
                    <li>
                        <label>Subject</label>
                        <span>
                            <select defaultValue={""} onChange={(e) => setSubject(e.target.value)}>
                                <option key="default" value=""></option>
                                {SubjectData.map((subject) => (
                                    <option key={subject.symbol} value={subject.symbol}>{subject.symbol}</option>
                                ))}
                            </select>
                        </span>
                    </li>
                    <li>
                        <label>Number</label>
                        <span>
                            <input type="number" min="1000" max="9999" value={number} onChange={(e) => setNumber(e.target.value)} />
                        </span>
                    </li>
                    <li>
                        <label>Title</label>
                        <span>
                            <input type="text" size="40" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </span>
                    </li>
                    <li>
                        <label>Point</label>
                        <span>
                            <input type="number" min="1" max="10" value={point} onChange={(e) => setPoint(e.target.value)} />
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
                        <button type="submit">Search</button>
                    </li>
                </ul>
            </form >

            <br />

            <table>
                <thead>
                    <tr>
                        <th>Semester</th>
                        <th>Course</th>
                        <th>Title</th>
                        <th>Enrollment</th>
                        <th>Instructor</th>
                        <th>Time</th>
                    </tr>
                </thead>

                <tbody>
                    {classes.map((data) => (
                        <tr key={data.id}>
                            <td>{data.semester}</td>
                            <td>{data.course}</td>
                            <td>{data.title}</td>
                            <td>{data.enrollment} / {data.capacity}</td>
                            <td>{data.instructor}</td>
                            <td>{data.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ToastContainer />
        </div>
    );
}

export default SearchCourse;