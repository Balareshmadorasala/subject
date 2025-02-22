import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Schedule.css";

const ScheduleForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [showFields, setShowFields] = useState(false);
  const [scheduleList, setScheduleList] = useState([]);

  const [formData, setFormData] = useState({
    date: "",
    teacherName: "",
    subjectName: "",
    topicName: "",
    syllabus: "",
    link: "",
  });

  const handleDateChange = (e) => {
    setFormData({ ...formData, date: e.target.value });
    setShowFields(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setScheduleList([{ ...formData, isActive: false }, ...scheduleList]);
    setShowForm(false);
    setShowFields(false);
    setFormData({
      date: "",
      teacherName: "",
      subjectName: "",
      topicName: "",
      syllabus: "",
      link: "",
    });
  };

  const toggleDetails = (index) => {
    if (window.innerWidth <= 768) {
      setScheduleList((prevList) =>
        prevList.map((item, i) =>
          i === index ? { ...item, isActive: !item.isActive } : item
        )
      );
    }
  };

  return (
    <div className="schedule-container">
     <div className="schedule-button-container">
  <button
    className="btn btn-primary schedule-button"
    onClick={() => setShowForm(true)}
  >
    Add Schedule
  </button>
</div>


      {showForm && (
        <div className="schedule-form-container">
          <form className="schedule-form" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-12">
                <label>Date:</label>
                <input
                  type="date"
                  name="date"
                  className="form-control"
                  value={formData.date}
                  onChange={handleDateChange}
                  required
                />
              </div>
            </div>

            {showFields && (
              <>
                <div className="row">
                  <div className="col-md-6">
                    <label>Teacher Name:</label>
                    <input
                      type="text"
                      name="teacherName"
                      className="form-control"
                      value={formData.teacherName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Subject Name:</label>
                    <input
                      type="text"
                      name="subjectName"
                      className="form-control"
                      value={formData.subjectName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <label>Topic Name:</label>
                    <input
                      type="text"
                      name="topicName"
                      className="form-control"
                      value={formData.topicName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Syllabus:</label>
                    <input
                      type="text"
                      name="syllabus"
                      className="form-control"
                      value={formData.syllabus}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <label>Link:</label>
                    <input
                      type="url"
                      name="link"
                      className="form-control"
                      value={formData.link}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-buttons">
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      )}

      {scheduleList.length > 0 && (
        <div className="schedule-list">
          {scheduleList.map((item, index) => {
            const dateObj = new Date(item.date);
            const formattedDate =
              ("0" + dateObj.getDate()).slice(-2) +
              "-" +
              ("0" + (dateObj.getMonth() + 1)).slice(-2) +
              "-" +
              dateObj.getFullYear();

            return (
              <div
                key={index}
                className={`schedule-item card ${item.isActive ? "active" : ""}`}
              >
                <div className="card-body">
                  <h5
                    className="card-title"
                    onClick={() => toggleDetails(index)}
                  >
                    {formattedDate}
                  </h5>
                  <p>
                    <strong>Teacher Name:</strong> {item.teacherName}
                  </p>
                  <p>
                    <strong>Subject Name:</strong> {item.subjectName}
                  </p>
                  <p>
                    <strong>Topic Name:</strong> {item.topicName}
                  </p>
                  <p>
                    <strong>Syllabus:</strong> {item.syllabus}
                  </p>
                  <p>
                    <strong>Link:</strong>{" "}
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.link}
                    </a>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ScheduleForm;
