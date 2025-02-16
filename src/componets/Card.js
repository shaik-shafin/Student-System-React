function Card(props){

    return(
      <div className="card">
        <div>
          <h1>{props.userParam.name}</h1>
          <h1>{props.userParam.email}</h1>
        </div>
        <button 
        className="btn"
        onClick={()=> props.deleteCard(props.userParam.id)}
        >
          Delete
        </button>
        
      </div>
    )
  }

  export default Card;