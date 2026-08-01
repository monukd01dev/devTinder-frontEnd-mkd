import LoginForm from "../components/forms/LoginForm"

function Login() {
  return (
    // 🚨 FIX: Mobile pe px-2, Desktop pe px-4. Height adjust ki.
    <div className="w-full flex items-start justify-center min-h-[calc(100vh-80px)]">
      <LoginForm/>
    </div>
  )
}

export default Login