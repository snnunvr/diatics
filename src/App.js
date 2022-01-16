import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
function App() {

  const [personList, setPersonList] = useState([]);

  useEffect(() => {
    axios.get('https://randomuser.me/api/?results=10').then((res) => {
      console.log(res.data);
      setPersonList(res.data.results);
    });
  }, [])

  return (
    <div>
      <form>
        <input id="firstname" name="firstname" type="text" />
        <input id="lastname" name="lastname" type="text" />
        <input id="email" name="email" type="text" />
        <button type="button">EKLE</button>
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
          {
            personList.map((person) => {
              return (
                <tr>
                  <td>{person.name.first}</td>
                  <td>{person.name.last}</td>
                  <td>{person.email}</td>
                  <td><button>SİL</button></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
