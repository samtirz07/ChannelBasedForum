
export const Landing = (props) => {
    
  let message = props.loggedIn ? <h1>Welcome {props.name}!</h1> : <h1>Welcome to the message board! Please log in to proceed...</h1>
  return (
    <div className="container">
      {message}
    </div>
  )

}