import React, { useState } from "react";
import { useRef } from "react";

const MembersList = (props) => {
  const { currentMembers, reRender, deleteMember } = props;
  const [inputSelected, setInputSelected] = useState(false);
  const [indInputSelected, setIndInputSelected] = useState(null);

  const [freshMembers, setFreshMembers] = useState(currentMembers);
  if (freshMembers !== currentMembers) {
    setFreshMembers(currentMembers);
  }
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState({ name: "", email: " ", role: " " });

  const handleSelect = (id) => {
    if (indInputSelected === id) setIndInputSelected(null);
    else setIndInputSelected(id);
  };

  const handleDelete = (id) => {
    deleteMember(id);
  };

  const handleAll = () => {
    setInputSelected(!inputSelected);
  };

  let ref = useRef();
  let id;
  const update = (mem) => {
    setModal(true);
    setEdit(mem);
    id = mem.id;
    ref = ref.current;

    ref.click();
  };

  const onChange = (e) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setModal(false);
    reRender(edit);
  };

  return (
    <>
      <div className="headings">
        <div className="input-box">
          <input type="checkbox" onClick={handleAll} />
        </div>
        <div className="name">Name</div>
        <div className="email">Email</div>
        <div className="role">Role</div>
        <div className="actions">Actions</div>
      </div>
      <div className="members-list">
        {freshMembers.map((member) => {
          return (
            <div
              key={member.id}
              className={
                indInputSelected === member.id
                  ? "each-member grey"
                  : "each-member"
              }
            >
              <div className="input-box">
                {inputSelected ? (
                  <input
                    type="checkbox"
                    name={member.name}
                    id={member.id}
                    defaultChecked
                  />
                ) : (
                  <input
                    type="checkbox"
                    name={member.name}
                    id={member.id}
                    onClick={() => handleSelect(member.id)}
                  />
                )}
              </div>
              <div className="name">{member.name}</div>
              <div className="email">{member.email}</div>
              <div className="role">{member.role}</div>
              <div className="actions">
                <div className="edit">
                  <i
                    style={{ cursor: "pointer" }}
                    class="fa-solid fa-pen-to-square"
                    onClick={() => update(member)}
                  ></i>
                </div>
                <div className="delete">
                  <i
                    style={{ cursor: "pointer" }}
                    class="fa-solid fa-trash"
                    onClick={() => handleDelete(member.id)}
                  ></i>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
        style={{ display: "none" }}
      >
        Launch demo modal
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Form
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setModal(false)}
              ></button>
            </div>
            <div class="modal-body">
              <form action="">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    style={{ fontSize: "1rem" }}
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={edit.name}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    style={{ fontSize: "1rem" }}
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={edit.email}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    Role
                  </label>
                  <input
                    style={{ fontSize: "1rem" }}
                    type="text"
                    className="form-control"
                    id="role"
                    name="role"
                    value={edit.role}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setModal(false)}
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleSave}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MembersList;
