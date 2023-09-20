import { useEffect } from "react";
import { toast } from "react-toastify";

function SignUp() {
  useEffect(() => {
    if (localStorage.getItem("user")) {
      window.location.href = "/";
    }
  });

  const submit = (e) => {
    e.preventDefault();
    const target = e.target;
    if (target.name.value.length > 4 && target.password.value.length > 8) {
      localStorage.setItem("user", true);
      window.location.href = "/";
    } else {
      toast.error("invalid fill !");
      localStorage.setItem("user", false);
    }
  };

  return (
    <section className="signup_section">
      <form className="sing_up" onSubmit={submit}>
        <h1 className="text-center gradient-txt">Register</h1>
        <div className="form-group">
          <div className="form-item mb-2">
            <label className="form-label">Full Name *</label>
            <input
              className="form-input"
              type="text"
              id="name"
              placeholder="Full Name"
              required
            />
          </div>
          <div className="form-item mb-2">
            <label className="form-label">@Username *</label>
            <input
              className="form-input"
              type="text"
              id="username"
              placeholder="Username"
              required
            />
          </div>
          <div className="form-item mb-2">
            <label className="form-label">Password *</label>
            <input
              className="form-input"
              type="password"
              id="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="text-center">
            <button type="submit" className="form-button">
              Register
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default SignUp;
