const Notification = ({ message, isSuccess }) => {
  if (message === null) {
    return null
  }
    
  const notificationClass = isSuccess ? "notification success" : "notification error"
    
  return (
    <div className={notificationClass}>
      {message}
    </div>
  )
}
  
export default Notification
  