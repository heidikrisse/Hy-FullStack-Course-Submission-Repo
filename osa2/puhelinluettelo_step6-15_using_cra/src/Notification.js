const Notification = ({ message, isSuccess }) => {
  if (!message) return null
  
  return (
    <div className={isSuccess ? "notification success" : "notification error"}>
      {message}
    </div>
  )
}
  
export default Notification
  