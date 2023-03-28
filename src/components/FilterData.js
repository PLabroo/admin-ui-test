import React from "react";

const FilterData = (props) => {
  const { members } = props;
  return (
    <>
      <div className="headings">
        <div className="input-box">
          <input type="checkbox" />
        </div>
        <div className="name">Name</div>
        <div className="email">Email</div>
        <div className="role">Role</div>
        <div className="actions">Actions</div>
      </div>
      <div className="members-list">
        {members.map((member) => {
          return (
            <div key={member.id} className="each-member">
              <div className="input-box">
                <input type="checkbox" name={member.name} id={member.id} />
              </div>
              <div className="name">{member.name}</div>
              <div className="email">{member.email}</div>
              <div className="role">{member.role}</div>
              <div className="actions">
                <div className="edit">
                  <i class="fa-solid fa-pen-to-square"></i>
                </div>
                <div className="delete">
                  <i class="fa-solid fa-trash"></i>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FilterData;
