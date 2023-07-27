import React, { useState, useEffect, useMemo, useRef } from "react";
import InterfaceDataService from "../services/InterfaceService";
import { useTable } from "react-table";

const InterfacesList = (props) => {
  const [interfaces, setInterfaces] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const interfacesRef = useRef();

  interfacesRef.current = interfaces;

  useEffect(() => {
    retrieveInterfaces();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveInterfaces = () => {
    InterfaceDataService.getAll()
      .then((response) => {
        setInterfaces(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveInterfaces();
  };

  const removeAllInterfaces = () => {
    InterfaceDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    InterfaceDataService.findByTitle(searchTitle)
      .then((response) => {
        setInterfaces(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openInterface = (rowIndex) => {
    const id = interfacesRef.current[rowIndex].id;

    props.history.push("/interfaces/" + id);
  };

  const deleteInterface = (rowIndex) => {
    const id = interfacesRef.current[rowIndex].id;

    InterfaceDataService.remove(id)
      .then((response) => {
        props.history.push("/interfaces");

        let newInterfaces = [...interfacesRef.current];
        newInterfaces.splice(rowIndex, 1);

        setInterfaces(newInterfaces);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Status",
        accessor: "published",
        Cell: (props) => {
          return props.value ? "Published" : "Pending";
        },
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openInterface(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteInterface(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: interfaces,
  });

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="col-md-8">
        <button className="btn btn-sm btn-danger" onClick={removeAllInterfaces}>
          Remove All
        </button>
      </div>
    </div>
  );
};

export default InterfacesList;