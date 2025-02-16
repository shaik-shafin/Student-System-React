import {useEffect, useState} from "react";
import Card from "./Card";

const HomePage = () =>{

    const[users, setUsers] = useState([]);
    const[name, setName] = useState();
    const[email, setEmail] = useState();
  
    function handleSubmit(){
      const user = {
        id:Math.random(),
        name, //if the key and value are same then no need to mention the value.
        email
      }
  
      setUsers([...users, user]);
    }
  
    function handleDelete(id){
      //remove the user based on the id passed.
      setUsers(users.filter((user)=> user.id !== id));
    }
  
    useEffect(() => {
       //Fetch function is globally available in the browser, it is a browser function.
       fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => setUsers(json))
    }, [])
  
    return (
      <div className="App">
        {
          users.map(user=>(
            <Card userParam={user} deleteCard={handleDelete}/>
          ))
        }
        <input name="name" type="text" onChange={(e)=>setName(e.target.value)}/>
        <input name="email" type="email" onChange={(e)=>setEmail(e.target.value)}/>
        <button onClick={handleSubmit}>submit</button>
      </div>
    );
}

export default HomePage;