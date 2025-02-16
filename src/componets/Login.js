import {useNavigate } from "react-router-dom";
import {useState} from "react";

const db =[
    {
        email:"shaik.shafin@gmail.com",
        password:"12345"
    }
]

const Login = ({setIsAuth}) => {
    const[email, setEmail] = useState();
    const[password, setPassword] = useState();
    const Navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        const findUser = db.find((user)=> user.email === email && user.password == password);

        if(findUser){
            setIsAuth(true);
            Navigate("/about-us");
        }else{
            setIsAuth(false);
        }
    }

    return (
        <>
            <h1>Login Form</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" required onChange={(e)=>setEmail(e.target.value)}/>
                <input type="text" name="password" required onChange={(e)=>setPassword(e.target.value)}/>
                <button>submit</button>
            </form>
        </>
    )
}

export default Login;