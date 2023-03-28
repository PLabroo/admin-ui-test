import React from "react";

const Pagination = ({ members, currentPage, paginate }) => {
  const pushNumbers = [];

  for (let i = 1; i <= Math.ceil(members.length / 10); i++) {
    pushNumbers.push(i);
  }
  return (
    <>
      <div className="pagination">
        <button
          style={{
            border: "1px solid red",
            borderRadius: "25px",
            width: "10%",
            padding: "0.3rem",
            backgroundColor: "rgba(255,0,0,0.7)",
            color: "white",
          }}
        >
          Delete All
        </button>
        <button>
          <i
            class="fa-solid fa-angles-left"
            onClick={() => paginate(currentPage > 2 ? currentPage - 1 : 1)}
          ></i>
        </button>
        <ul className="nums">
          {pushNumbers.map((number) => {
            return (
              <li key={number} className="each-page">
                <button
                  className={currentPage === number ? "selected" : ""}
                  onClick={() => paginate(number)}
                >
                  {number}
                </button>
              </li>
            );
          })}
        </ul>
        <button>
          <i
            class="fa-solid fa-angles-right"
            onClick={() =>
              paginate(currentPage < pushNumbers.length ? currentPage + 1 : 1)
            }
          ></i>
        </button>
      </div>
    </>
  );
};

export default Pagination;
