import React from 'react';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import { listTakens } from '../graphql/queries';
import { generateClient } from 'aws-amplify/api';
import 'react-toastify/dist/ReactToastify.css';
import { SubjectData } from '../data/Subject';
import { Status } from '../data/Status';
import { stringToHash, showError, showSuccess } from '../utils';

const client = generateClient();

const Progress = ({ username }) => {
  const [taken, setTaken] = useState([]);
  const [credit, setCredit] = useState(0);
  const [breathCredit, setBreathCredit] = useState(0);
  const [requiredCredit, setRequiredCredit] = useState(0);
  const [electiveCredit, setElectiveCredit] = useState(0);

  const [subject, setSubject] = useState("");
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("");

  const [subject2, setSubject2] = useState("");
  const [number2, setNumber2] = useState("");

  async function fetchTaken() {
    setTaken([]);
    setCredit(0);
    setBreathCredit(0);
    setRequiredCredit(0);
    setElectiveCredit(0);

    let coursesTaken = [];

    const { data } = await client.graphql({
      query: listTakens
    });

    for (const item of data.listTakens.items) {
      let courseTaken = {};

      const course = await client.graphql({
        query: queries.getCourse,
        variables: { id: item.courseId }
      });

      courseTaken.name = course.data.getCourse.subject + ' ' + course.data.getCourse.number + ' - ' + course.data.getCourse.title
      courseTaken.breath = course.data.getCourse.is_breath;
      courseTaken.required = course.data.getCourse.is_required;
      courseTaken.elective = course.data.getCourse.is_elective;
      courseTaken.point = course.data.getCourse.point;
      courseTaken.status = item.status;
      coursesTaken.push(courseTaken);

      // Add the corresponding credit
      if (courseTaken.status == "Pass") {
        setCredit(prevCredit => prevCredit + 3);
        if (courseTaken.elective) {
          setElectiveCredit(prevCredit => prevCredit + 3);
        }
        if (courseTaken.required) {
          setRequiredCredit(prevCredit => prevCredit + 3);
        }
        if (courseTaken.breath) {
          setBreathCredit(prevCredit => prevCredit + 3);
        }
      }
    }

    setTaken(coursesTaken);
  }

  useEffect(() => {
    fetchTaken();
  }, []);

  const handleAddTaken = (event) => {
    event.preventDefault();
    addTaken(subject, number, status);
    setTimeout(fetchTaken, 3000);
  }

  const handleRemoveTaken = (event) => {
    event.preventDefault();
    removeTaken(subject2, number2);
    setTimeout(fetchTaken, 3000);
  }

  async function addTaken(subject, number, status) {
    try {
      const courseId = stringToHash(subject + number);

      // Check if course exists
      const course = await client.graphql({
        query: queries.getCourse,
        variables: { id: courseId }
      });

      if (course.data.getCourse == null) {
        showError(`Course ${subject} ${number} does not exist`);
        return;
      }

      // Add course taken to db
      const id = stringToHash(username + courseId);

      const takenDetails = {
        id: id,
        userId: username,
        courseId: courseId,
        status: status
      };

      const newTaken = await client.graphql({
        query: mutations.createTaken,
        variables: { input: takenDetails }
      });

      showSuccess(`Saved course ${subject} ${number} as taken`);
    } catch (error) {
      console.log(error);
      showError(`Failed to save course ${subject} ${number} as taken`);
    }
  }

  async function removeTaken(subject, number) {
    try {
      const courseId = stringToHash(subject + number);
      const id = stringToHash(username + courseId);

      const takenDetails = {
        id: id
      };

      const deletedTaken = await client.graphql({
        query: mutations.deleteTaken,
        variables: { input: takenDetails }
      });
      showSuccess(`Removed course ${subject} ${number}`)

    } catch (error) {
      console.log(error);
      showError(`Failed to remove course ${subject} ${number}`);
    }
  }

  return (
    <div>
      <h1>Graduation Progress</h1>

      <form onSubmit={handleAddTaken} className="Form">
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
            <label>Status</label>
            <span>
              <select defaultValue={""} required onChange={(e) => setStatus(e.target.value)}>
                <option key="default" value="" disabled hidden></option>
                {Status.map((status) => (
                  <option key={status.value} value={status.value}>{status.value}</option>
                ))}
              </select>
            </span>
          </li>
          <li>
            <button type="submit">Add</button>
          </li>
        </ul>
      </form>

      <form onSubmit={handleRemoveTaken} className="Form">
        <ul>
          <li>
            <label>Subject</label>
            <span>
              <select defaultValue={""} required onChange={(e) => setSubject2(e.target.value)}>
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
              <input type="number" min="1000" max="9999" required value={number2} onChange={(e) => setNumber2(e.target.value)} />
            </span>
          </li>
          <li>
            <button type="submit">Remove</button>
          </li>
        </ul>
      </form>

      <div>
        <h2>All Courses: {credit} / 30 Points</h2>
        <table className='ProgressTable'>
          <thead>
            <tr>
              <th className='ProgressCol'>Course</th>
              <th>Status</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {taken.map((data, index) => (
              <tr key={data.name}>
                <td>{data.name}</td>
                <td>{data.status}</td>
                <td>{data.point}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <br />
      <br />

      <div>
        <h2>Required Courses: {requiredCredit} / 6 Points</h2>
        <table className='ProgressTable'>
          <thead>
            <tr>
              <th className='ProgressCol'>Course</th>
              <th>Status</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {taken
              .filter(data => data.required)
              .map((data, index) => (
                <tr key={data.name}>
                  <td>{data.name}</td>
                  <td>{data.status}</td>
                  <td>{data.point}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <br />
      <br />

      <div>
        <h2>Breath Courses: {breathCredit} / 12 Points</h2>
        <table className='ProgressTable'>
          <thead>
            <tr>
              <th className='ProgressCol'>Course</th>
              <th>Status</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {taken
              .filter(data => data.breath)
              .map((data, index) => (
                <tr key={data.name}>
                  <td>{data.name}</td>
                  <td>{data.status}</td>
                  <td>{data.point}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <br />
      <br />

      <div>
        <h2>Elective Courses: {electiveCredit} / 6 Points</h2>
        <table className='ProgressTable'>
          <thead>
            <tr>
              <th className='ProgressCol'>Course</th>
              <th>Status</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {taken
              .filter(data => data.elective)
              .map((data, index) => (
                <tr key={data.name}>
                  <td>{data.name}</td>
                  <td>{data.status}</td>
                  <td>{data.point}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  )
}

export default Progress;