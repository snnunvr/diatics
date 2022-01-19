import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [personList, setPersonList] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const GetUsers = () => {
    axios.get("https://randomuser.me/api/?results=10").then((res) => {
      console.log(res.data);
      setPersonList(res.data.results);
    });
  };

  // sayfamız ilk yüklendiğinde çalışacak olan hook ' umuz;
  useEffect(() => {
    GetUsers();
  }, []);

  const AddUser = () => {
    const name = {
      first: firstName,
      last: lastName,
    };

    let persons = [...personList]; //personList array 'inin bir kopyasını alıyor.

    // persons array' inin içerisine yeni oluşturduğum objeyi ekliyor.
    persons.push({
      name: name,
      email: email,
    });

    setPersonList(persons);
    console.log(persons);
  };

  const DeleteUser = (email) => {
    const newList = [...personList].filter((item) => item.email !== email);
    setPersonList(newList);
  };

  return (
    <div className="container">
      <div className="box">
        <form>
          <input
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            id="firstname"
            name="firstname"
            type="text"
            placeholder="First Name"
          />
          <input
            onChange={(val) => setLastName(val.target.value)}
            id="lastname"
            name="lastname"
            type="text"
            placeholder="Last Name"
          />
          <input
            onChange={(val) => setEmail(val.target.value)}
            id="email"
            name="email"
            placeholder="Email"
            type="email"
          />
          <button onClick={() => AddUser()} type="button">
            EKLE
          </button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Adı</th>
              <th>Soyadı</th>
              <th>Email</th>
              <th>SİL</th>
            </tr>
          </thead>
          <tbody>
            {personList.map((person) => (
              <tr key={person.email}>
                <td>{person.name.first}</td>
                <td>{person.name.last}</td>
                <td>{person.email}</td>
                <td>
                  <button
                    className="btn-trash"
                    onClick={() => DeleteUser(person.email)}
                  >
                    <i className="far fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
