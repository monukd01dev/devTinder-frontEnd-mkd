import SingupForm from "../components/forms/SingupForm"

function Signup() {
  return (
    // 🚨 FIX: Login ke jaisa exact same consistent wrapper de diya
    <div className="w-full flex items-center md:items-start justify-center min-h-[calc(100vh-80px)]">
      <SingupForm/>
    </div>
  )
}

export default Signup