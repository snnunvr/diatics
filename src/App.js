import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
function App() {

  const [personList, setPersonList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dataCount,setDataCount]=useState(0);

  const[initialData,setInitialData]=useState(false);

  const GetUsers = () => {
    axios.get('https://randomuser.me/api/?results=10').then((res) => {
      console.log(res.data);
      setPersonList(res.data.results);
      setInitialData(true);
      setDataCount(personList.length);
    });
  }

  useEffect(() => {
    if(!initialData)
      GetUsers();
  }, [])

  const AddUser = () => {
    const name = {
      first: firstName,
      last: lastName
    };
    let persons = personList;
    persons.push({
      name: name,
      email: email
    });
    console.log(persons);
    setPersonList(persons);
    console.log(personList);
    setDataCount(dataCount+1);
  }

  const DeleteUser=(email)=>{
    var data1 = [email];
        var i = personList.length;
        while (i--) {
            if (data1.indexOf(personList[i].email) != -1) {
                personList.splice(i, 1);
                setDataCount(dataCount-1);
            }
        }

  }

  return (
    <div className='container'>
    <div className='box'>
      <form>
        <input onKeyPress={(val) => setFirstName(val.target.value)} id="firstname" name="firstname" type="text" />
        <input onKeyPress={(val) => setLastName(val.target.value)} id="lastname" name="lastname" type="text" />
        <input onKeyPress={(val) => setEmail(val.target.value)} id="email" name="email" type="text" />
        <button onClick={() => AddUser()} type="button">EKLE</button>
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
                <tr key={person.email}>
                  <td>{person.name.first}</td>
                  <td>{person.name.last}</td>
                  <td>{person.email}</td>
                  <td><button onClick={()=>DeleteUser(person.email)}>SİL</button></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default App;
