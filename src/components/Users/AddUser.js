import { useState } from "react";
import "./AddUser.css";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const [enteredUser, setEnteredUser] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const userInputChangeHandler = (event) => {
    setEnteredUser(event.target.value);
  };

  const ageInputChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const addUserHandler = (event) => {
    event.preventDefault();

    if (enteredUser.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values)",
      });
      return;
    }

    if (enteredAge < 1 || enteredAge > 110) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age",
      });
      return;
    }

    props.onSaveUserData(enteredUser, enteredAge);
    setEnteredUser("");
    setEnteredAge("");
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          cancelError={errorHandler}
        />
      )}
      <div className="user-body">
        <form onSubmit={addUserHandler}>
          <div className="new-user__controls">
            <div className="new-user__control">
              <label htmlFor="username">Username</label>

              <input
                id="username"
                type="text"
                value={enteredUser}
                onChange={userInputChangeHandler}
              />
            </div>

            <div className="new-user__control">
              <label htmlFor="age">Age</label>

              <input
                id="age"
                type="number"
                value={enteredAge}
                onChange={ageInputChangeHandler}
              />
            </div>

            <div className="new-user__actions">
              <button type="submit">Add User</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
