import React, { useState } from "react";
import { Button, Modal, Form, Table, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TeachingScheduleForm.css"; // Ensure CSS is updated

const TeachingSchedule = () => {
  const [show, setShow] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const [formData, setFormData] = useState({
    instructor: "",
    date: "",
    days: "",
    content: [],
    customContent: "",
    description: "",
  });

  const contentOptionsMap = {
    "1-10": ["Java OOPs", "Python Basics"],
    "10-20": ["ReactJS"],
    "20-30": ["ReactJS", "Python Basics"],
    "30-40": ["Java OOPs", "ReactJS", "Python Basics", "Data Structures"],
    "40-50": ["Python Basics", "Data Structures", "Algorithms"],
    "50-60": [
      "Java OOPs",
      "ReactJS",
      "Python Basics",
      "Data Structures",
      "Algorithms",
      "Machine Learning",
    ],
    "60-70": [
      "Java OOPs",
      "ReactJS",
      "Python Basics",
      "Data Structures",
      "Algorithms",
      "Machine Learning",
      "Artificial Intelligence",
    ],
    "70-80": [
      "Java OOPs",
      "ReactJS",
      "Python Basics",
      "Data Structures",
      "Algorithms",
      "Machine Learning",
      "Artificial Intelligence",
      "Cyber Security",
    ],
  };

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      instructor: "",
      date: "",
      days: "",
      content: [],
      customContent: "",
      description: "",
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "content") {
      setFormData((prevData) => ({
        ...prevData,
        content: checked
          ? [...prevData.content, value]
          : prevData.content.filter((c) => c !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalContent = formData.content.includes("Other")
      ? [...formData.content.filter((c) => c !== "Other"), formData.customContent]
      : formData.content;

    setSchedules([...schedules, { ...formData, content: finalContent }]);
    handleClose();
  };

  const handleDelete = (index) => {
    setSchedules(schedules.filter((_, i) => i !== index));
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = schedules.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="container mt-4">
      <div className="button-wrapper">
        <Button variant="primary" onClick={handleShow}>
          Teaching Scheduling
        </Button>
      </div>

      {schedules.length > 0 && (
        <div className="table-wrapper">
        

          <Table bordered hover className="mt-3 text-center">
            <thead className="table-header">
              <tr>
                <th>Instructor Name</th>
                <th>Date</th>
                <th>Days</th>
                <th>Content</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((schedule, index) => (
                <tr key={index}>
                   <td className="text-center align-middle"><strong>{schedule.instructor}</strong></td>
        <td className="text-center align-middle">{schedule.date}</td>
        <td className="text-center align-middle">{schedule.days} Days</td>
        <td className="text-center align-middle" >{Array.isArray(schedule.content) ? schedule.content.join(", ") : schedule.content}</td>
        <td className="description-cell">
  <div className="description-text">{schedule.description}</div>
</td>

        <td className="text-center align-middle">
          <button className="delete-button" onClick={() => handleDelete(indexOfFirstRow + index)}>
            Delete
          </button>
        </td>
      </tr>


                  
              ))}
            </tbody>
          </Table>

          <div className="pagination-wrapper">
            <button className="pagination-button" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            <span className="current-page">Page {currentPage}</span>
            <button
              className="pagination-button"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage >= Math.ceil(schedules.length / rowsPerPage)}
            >
              Next
            </button>
          </div>
        </div>
      )}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title >Add Teaching Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="form-group">
                  <Form.Label>Instructor Name:</Form.Label>
                  <Form.Control type="text" name="instructor" value={formData.instructor} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group">
                  <Form.Label>Date:</Form.Label>
                  <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="form-group">
                  <Form.Label>Days:</Form.Label>
                  <Form.Select name="days" value={formData.days} onChange={handleChange} required>
                    <option value="">Select Days</option>
                    {Object.keys(contentOptionsMap).map((range, index) => (
                      <option key={index} value={range}>{range} Days</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group">
                  <Form.Label>Description:</Form.Label>
                  <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="form-group">
                  <Form.Label>Content Type:</Form.Label>
                  <div className={`checkbox-container ${formData.days ? "visible" : ""}`}>
  {formData.days && contentOptionsMap[formData.days]?.map((option, idx) => (
    <div key={idx}>
      <input
        type="checkbox"
        name="content"
        value={option}
        checked={formData.content.includes(option)} // Ensure tick is shown
        onChange={handleChange}
      />
      <label>{option}</label>
    </div>
  ))}
</div>

                </Form.Group>
              </Col>

            
            </Row>

            <div className="button-group">
              <Button variant="success" type="submit">Submit</Button>
              <Button variant="danger" onClick={handleClose} className="ms-2">Cancel</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TeachingSchedule;
