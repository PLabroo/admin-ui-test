import React, { useEffect, useState } from "react";
import axios from "axios";
import MembersList from "./components/MembersList";
import Pagination from "./components/Pagination";
import FilterData from "./components/FilterData";

const App = () => {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage, setMembersPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);

  const lastIndex = currentPage * membersPerPage;
  const firstIndex = lastIndex - membersPerPage;
  const currentMembers = members.slice(firstIndex, lastIndex);

  const paginate = (page) => {
    setCurrentPage(page);
  };

  const filtering = (search) => {
    const len = search.length;
    setFilteredData(search);
    const res = currentMembers.filter((current) => {
      console.log(current.name.substring(0, len));
      if (
        current.name.substring(0, len) === search ||
        current.email.substring(0, len) === search ||
        current.role.substring(0, len) === search
      )
        return current;
    });
    setFilteredMembers(res);
  };

  const reRender = (val) => {
    const newIndex = members.findIndex((mem) => {
      return mem.id === val.id;
    });
    const newMembers = [...members];
    newMembers[newIndex].name = val.name;
    newMembers[newIndex].email = val.email;
    newMembers[newIndex].role = val.role;
    setMembers(newMembers);
  };

  const deleteMember = (id) => {
    const updatedMembers = members.filter((mem) => {
      return mem.id !== id;
    });
    setMembers(updatedMembers);
  };

  const fetchMembers = async () => {
    const res = await axios.get(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    setMembers(res.data);
  };
  useEffect(() => {
    fetchMembers();
  }, []);
  return (
    <>
      <div className="admin-container">
        <div className="outer-input">
          <input
            type="text"
            placeholder="Search By Name,Email or Role"
            onChange={(e) => filtering(e.target.value)}
          />
        </div>
        <div className="data">
          {filteredData !== "" ? (
            <FilterData members={filteredMembers} />
          ) : (
            <MembersList
              members={members}
              currentMembers={currentMembers}
              currentPage={currentPage}
              reRender={reRender}
              deleteMember={deleteMember}
            />
          )}
        </div>
        <Pagination
          members={members}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default App;
