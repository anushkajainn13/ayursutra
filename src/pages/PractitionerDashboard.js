import React, { useState, useEffect } from "react";
import PatientCard from "./PatientCard";
import "./Stylesheet/PractitionerDashboard.css";

const PractitionerDashboard = () => {
  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem("patients");
    return saved ? JSON.parse(saved) : [
      {
        initials: "RK",
        name: "Rajesh Kumar",
        age: 45,
        gender: "Male",
        status: "active",
        contact: "+91 9876543210",
        email: "rajesh.kumar@email.com",
        therapy: {
          therapy: "Abhyanga Massage",
          location: "Mumbai, Maharashtra",
          completedSessions: 4,
          totalSessions: 12,
          nextSession: "2025-09-18T14:00:00",
        },
      },
      {
        initials: "MP",
        name: "Meera Patel",
        age: 38,
        gender: "Female",
        status: "active",
        contact: "+91 9876543211",
        email: "meera.patel@email.com",
        therapy: {
          therapy: "Shirodhara",
          location: "Ahmedabad, Gujarat",
          completedSessions: 2,
          totalSessions: 8,
          nextSession: "2025-09-19T10:30:00",
        },
      },
    ];
  });

  const [search, setSearch] = useState("");
  const [newPatient, setNewPatient] = useState({
    initials: "",
    name: "",
    age: "",
    gender: "",
    contact: "",
    email: "",
    therapy: "",
    sessions: "",
    nextSession: "",
    location: "",
  });

  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  const addPatient = () => {
    if (!newPatient.name || !newPatient.therapy) {
      alert("Please fill at least Name and Therapy");
      return;
    }

    const [done, total] = newPatient.sessions
      ? newPatient.sessions.split("/").map(Number)
      : [0, 0];

    const patient = {
      initials: newPatient.initials || newPatient.name.slice(0, 2).toUpperCase(),
      name: newPatient.name,
      age: newPatient.age,
      gender: newPatient.gender,
      status: "new",
      contact: newPatient.contact,
      email: newPatient.email,
      therapy: {
        therapy: newPatient.therapy,
        location: newPatient.location,
        completedSessions: done,
        totalSessions: total,
        nextSession: newPatient.nextSession || "",
      },
    };

    setPatients([...patients, patient]);
    setNewPatient({
      initials: "",
      name: "",
      age: "",
      gender: "",
      contact: "",
      email: "",
      therapy: "",
      sessions: "",
      nextSession: "",
      location: "",
    });
  };

  const removePatient = (index) => {
    const updated = [...patients];
    updated.splice(index, 1);
    setPatients(updated);
  };

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">
      <h2 className="heading">Patient Management</h2>
      <p className="sub-heading">Manage patient profiles, therapy history, and progress tracking</p>

      {/* Search bar */}
      <input
        type="text"
        placeholder="🔍 Search patients..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      {/* Patients Grid */}
      <div className="patients-grid">
        {filteredPatients.map((patient, index) => (
          <PatientCard
            key={index}
            {...patient}
            onRemove={() => removePatient(index)}
          />
        ))}
      </div>

      {/* Add Patient Form */}
      <div className="add-patient-form">
        <h3>Add New Patient</h3>
        <form>
          <input
            type="text"
            placeholder="Initials (e.g. RK)"
            value={newPatient.initials}
            onChange={(e) =>
              setNewPatient({ ...newPatient, initials: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Full Name"
            value={newPatient.name}
            onChange={(e) =>
              setNewPatient({ ...newPatient, name: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Age"
            value={newPatient.age}
            onChange={(e) =>
              setNewPatient({ ...newPatient, age: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Gender"
            value={newPatient.gender}
            onChange={(e) =>
              setNewPatient({ ...newPatient, gender: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Contact"
            value={newPatient.contact}
            onChange={(e) =>
              setNewPatient({ ...newPatient, contact: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={newPatient.email}
            onChange={(e) =>
              setNewPatient({ ...newPatient, email: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Therapy (e.g. Panchakarma)"
            value={newPatient.therapy}
            onChange={(e) =>
              setNewPatient({ ...newPatient, therapy: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Sessions (e.g. 0/5)"
            value={newPatient.sessions}
            onChange={(e) =>
              setNewPatient({ ...newPatient, sessions: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Next Session (e.g. 22 Sept 2025, 3:00 PM)"
            value={newPatient.nextSession}
            onChange={(e) =>
              setNewPatient({ ...newPatient, nextSession: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Location"
            value={newPatient.location}
            onChange={(e) =>
              setNewPatient({ ...newPatient, location: e.target.value })
            }
          />

          <button type="button" onClick={addPatient}>
            Add Patient
          </button>
        </form>
      </div>
    </div>
  );
};

export default PractitionerDashboard;