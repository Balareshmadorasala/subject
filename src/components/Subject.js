import React, { useState } from "react";
import { Button, Table, Form, Modal } from "react-bootstrap";
import "./Subject.css";

const SubjectManager = () => {
  const [show, setShow] = useState(false);
  const [topic, setTopic] = useState("");
  const [url, setUrl] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setTopic("");
    setUrl("");
    setEditIndex(null);
  };

  const handleSubmit = () => {
    if (editIndex !== null) {
      const updatedSubjects = [...subjects];
      updatedSubjects[editIndex] = { topic, url };
      setSubjects(updatedSubjects);
    } else {
      setSubjects([...subjects, { topic, url }]);
    }
    setShowTable(true);
    handleClose();
  };

  const handleEdit = (index) => {
    setTopic(subjects[index].topic);
    setUrl(subjects[index].url);
    setEditIndex(index);
    setShow(true);
  };

  const handleDelete = (index) => {
    const updatedSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(updatedSubjects);
    if (updatedSubjects.length === 0) {
      setShowTable(false);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = subjects.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(subjects.length / itemsPerPage);

  return (
    <div className="container mt-4">
      <Button className="add-subject-button" variant="primary" onClick={handleShow}>Add Subject</Button>

      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? "Edit Topic" : "Add Topic"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
          <Form >
  <div className="form-row">
    <Form.Label className="form-label">Topic:</Form.Label>
    <Form.Control type="text" className="form-input" value={topic} onChange={(e) => setTopic(e.target.value)} />
  </div>

  <div className="form-row">
    <Form.Label className="form-label">URL:</Form.Label>
    <Form.Control type="text" className="form-input" value={url} onChange={(e) => setUrl(e.target.value)} />
  </div>

  <div className="form-buttons">
    <Button variant="primary" onClick={handleSubmit}>{editIndex !== null ? "Update" : "Submit"}</Button>
    <Button variant="danger" onClick={handleClose}>Cancel</Button>
  </div>


           

          </Form>
        </Modal.Body>
        
      </Modal>

      {showTable && (
        <>
         <div className="table-wrapper">
          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>Serial No</th>
                <th>Topic</th>
                <th>URL</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((subject, index) => (
                <tr key={index}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{subject.topic}</td>
                  <td><a href={subject.url} target="_blank" rel="noopener noreferrer">{subject.url}</a></td>
                  <td>
                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(indexOfFirstItem + index)}>Update</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(indexOfFirstItem + index)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
          <div className="pagination-wrapper">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Prev
            </button>

            <span className="current-page">{currentPage}</span>

            <button
              onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
              disabled={currentPage >= totalPages}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SubjectManager;