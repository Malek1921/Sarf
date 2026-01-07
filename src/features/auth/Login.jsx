import { Link } from "react-router";

function Login() {
  return (
    <div className="w-full h-screen max-w-5xl mx-auto p-6 flex items-center justify-center">
      <div className="bg-blue-400 w-fit px-16 py-6 text-2xl rounded-2xl cursor-pointer">
        <Link to="/sales">Sales</Link>
      </div>
    </div>
  );
}

export default Login;
