import React, { useRef, useState } from "react";
import Select from "react-select";
import "./style.css";
import TablePagination from "@material-ui/core/TablePagination";
import { useEffect } from "react";
const getPaginatedTasks = (tasks = [], pageNumber = 0, rowsCount = 25) => {
  const start = (pageNumber + 1) * rowsCount - rowsCount;
  return tasks.slice(start, start + rowsCount);
};

export default function TasksTable({
  openTasks,
  modificationFieldOptions,
  modificationTypeOptions,
  modificationFieldValueOptions,
  statusOptions,
  onDoneClick,
  onSelect,
  tableFilters,
  onUpdateClick,
}) {
  const disableSelect = () => {
    return tableFilters[0].value !== "Update" ? true : false;
  };

  /* Select inputs refs */
  const modField = useRef("");
  const modValue = useRef("");
  const statusSelect = useRef("");

  const [pageNumber, setPageNumber] = useState(0);
  const [rowsCount, setRowsCount] = useState(25);
  const [paginatedTasks, setPaginatedTasks] = useState([]);
  const handleChangePage = (event, newPage) => {
    setPageNumber(newPage);
    setPaginatedTasks(getPaginatedTasks(openTasks, newPage, rowsCount));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsCount(parseInt(event.target.value, 10));
    setPageNumber(0);
    setPaginatedTasks(getPaginatedTasks(openTasks, 0, event.target.value));
  };

  useEffect(() => {
    setPaginatedTasks(getPaginatedTasks(openTasks));
  }, [openTasks]);

  // /* Select inputs refs */
  // const modField = useRef("");
  // const modValue = useRef("");

  return (
    <div className="open-tasks">
      <div className="open-tasks-title">OPEN TASKS</div>
      <div className="container__filterSelect">
        <div>
          <h3>Type:</h3>
          <Select
            options={modificationTypeOptions}
            className="filterSelectB"
            onChange={(filter, name) => onSelect(filter, "modificationType")}
            placeholder="All"
            onInputChange={() => {
              modField.current.state.value = "";
              modValue.current.state.value = "";
              statusSelect.current.state.value = "";
            }}
          />
        </div>
        <div>
          <h3>Field:</h3>
          <Select
            options={modificationFieldOptions}
            className="filterSelectB"
            onChange={(filterObj, name) =>
              onSelect(filterObj, "modificationField")
            }
            isDisabled={disableSelect()}
            placeholder="Field"
            ref={modField}
            onInputChange={() => {
              modValue.current.state.value = "";
              statusSelect.current.state.value = "";
            }}
          />
        </div>
        <div>
          <h3>Value:</h3>
          <Select
            options={modificationFieldValueOptions}
            className="filterSelectB"
            onChange={(filter, name) => onSelect(filter, "modificationValue")}
            isDisabled={disableSelect()}
            placeholder="Value"
            ref={modValue}
          />
        </div>
        <div>
          <h3>Done/Not Done:</h3>
          <Select
            options={statusOptions}
            className="filterSelectB"
            onChange={(filter, name) => onSelect(filter, "status")}
            ref={statusSelect}
            placeholder={tableFilters[3].value}
            // value={}
          />
        </div>
        <button className="filterSelectB" onClick={() => onUpdateClick()}>
          Update
        </button>
      </div>
      <div className="open-tasks-table">
        <table className="container">
          <thead className="header__table">
            <tr>
              <th scope="col"> # </th> <th scope="col"> Id </th>
              <th scope="col"> Jira Name </th> <th scope="col"> Type </th>
              <th scope="col"> Field Name </th> <th scope="col"> Old Val </th>
              <th scope="col"> New Val </th> <th scope="col"> Done </th>
            </tr>
          </thead>
          <tbody className="body">
            {paginatedTasks.map((task, index) => (
              <tr key={index}>
                <th scope="row"> {++index} </th>
                <td> {task.jiraItem.id} </td>
                <td> {task.jiraItem.name} </td>
                <td> {task.diffItem.type} </td>
                <td>
                  {task.diffItem.updatedField &&
                    task.diffItem.updatedField.fieldName}
                </td>
                <td>
                  {task.diffItem.updatedField &&
                    task.diffItem.updatedField.oldValue}
                </td>
                <td>
                  {task.diffItem.updatedField &&
                    task.diffItem.updatedField.newValue}
                </td>
                <td>
                  <input
                    type="checkbox"
                    onClick={() => onDoneClick(task._id, task.taskItem.isDone)}
                    key={task._id}
                    defaultChecked={task.taskItem.isDone}
                    // checked={task.taskItem.isDone}
                    onChange={() => {}}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <TablePagination
            rowsPerPageOptions={[50, 100]}
            component="div"
            count={openTasks === undefined ? 0 : openTasks.length}
            rowsPerPage={rowsCount}
            page={pageNumber}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
}
