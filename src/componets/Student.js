import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button, Snackbar, Alert} from '@mui/material';

export default function Student() {
    const paperStyle = {padding:'50px 20px', width:600, margin:'20px auto'}
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [students, setStudents] = React.useState([]);
    const [showSuccessMsg, setShowSuccessMsg] = React.useState(false)
    const [successMsg, setSuccessMsg] = React.useState("")
    const [error, setError] = React.useState(false)
    const [emailError, setEmailError] = React.useState(false)
    const [updateStdById, setUpdateStdById] = React.useState('')
    const scrollRef = React.useRef(null);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
        return emailRegex.test(email);
    };

    const handleSubmit = (e) =>{
        if(name.trim() === ""){
            setError(true)
            return
        }else if(!validateEmail(email)){
            setEmailError(true)
            return
        }
        const student = {name, email}
        if(updateStdById !== '')
            handleUpdateStd(updateStdById, student)
        else
            handleSaveStd(student)

    }

    function handleSaveStd(student){
        fetch("http://localhost:8080/student/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(student)
        }).then(res => res.json())
          .then((result)=>{
            setStudents([...students, result])
            setName('')
            setEmail('')
            setShowSuccessMsg(true)
            setSuccessMsg("Student added successfully.")
           })
    }

    function handleUpdateStd(id, student){
        fetch(`http://localhost:8080/student/update/${id}`, {
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(student)
        }).then((resp)=>resp.json())
          .then((result)=>{
            setName('')
            setEmail('')
            fetchStudentList()
            setShowSuccessMsg(true)
            setSuccessMsg(result.message)

            if (scrollRef.current) {
                scrollRef.current.scrollTo({
                  top: scrollRef.current.scrollHeight,
                  behavior: 'smooth',
                });
              }
          })
    }

    React.useEffect(()=>{
        fetchStudentList()
    },[])

    const handleDelete = (id) => {
        fetch(`http://localhost:8080/student/delete/${id}`, {
            method: "DELETE",
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((result) => {
            setStudents(students.filter((student) => student.id !== id));
            setShowSuccessMsg(true);
            setSuccessMsg(result.message)
        })
        .catch((error) => {
            console.error("There was a problem with the delete operation:", error);
        });
    };

    const handleUpdate = (updateStd) =>{
        setUpdateStdById(updateStd.id)
        setName(updateStd.name)
        setEmail(updateStd.email)
    }

    const handleClose = ()=>{
        setShowSuccessMsg(false);
    }

    const fetchStudentList = ()=>{
        fetch("http://localhost:8080/student/all")
        .then(res => res.json())
        .then(result => {
            setStudents(result)
        })
    }

  return (
    <>
        <div>
            <Snackbar
                open={showSuccessMsg}
                autoHideDuration={3000} // Auto close after 3 sec
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }} // Position
            >
                <Alert onClose={handleClose} severity="success" variant="filled">
                    {successMsg}
                </Alert>
            </Snackbar>
        </div>
        <Container style={{textAlign:'center'}}>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{color:'blue'}} ref={scrollRef}>Add Student</h1>
                <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
                >
                <TextField id="outlined-basic" label="StudentName" variant="outlined" fullWidth 
                value={name} onChange={e => {
                    setName(e.target.value)
                    setError(false)
                }}
                error={error}
                helperText={error ? "This field is required." : ""}
                />
                <TextField id="outlined-basic" label="StudentEmail" variant="outlined" fullWidth
                value={email} onChange={e => {
                    setEmail(e.target.value)
                    setEmailError(false)
                }}
                error={emailError}
                helperText={emailError ? "Please provide valid email." : ""}
                />
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </Box>
            </Paper>
            <h1>Students List</h1>
            <Paper elevation={6} style={paperStyle}>
                {students.map((s, index) => (
                    <Paper elevation={6} style={{margin:'10px', padding:'15px', textAlign:"left"}} key={index}>
                        <div>Id: {index + 1}</div>
                        <div>Name: {s.name}</div>
                        <div>Email: {s.email}</div>
                        <div style={{textAlign:'center', marginTop:'10px'}}>
                            <Button 
                                size="small" 
                                variant="contained" 
                                onClick={()=> handleUpdate(s)}
                                sx={{marginRight:"10px"}}
                            >Update</Button>
                            <Button 
                                size="small" 
                                variant="outlined" 
                                color="error" 
                                onClick={()=> handleDelete(s.id)}
                            >Delete</Button>
                        </div>
                        
                    </Paper>
                ))}

            </Paper>
        </Container>
    </>
    
  );
}
