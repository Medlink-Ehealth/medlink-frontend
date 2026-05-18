import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";

const SignInPage: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F0F4F1] px-6 py-10 flex items-center justify-center">
      <div className="w-full max-w-[420px] rounded-[24px] bg-white p-9 shadow-[0_24px_80px_rgba(15,23,42,0.09)]">
        <div className="mb-7 text-center">
          <h1 className="mb-2 text-3xl font-black text-primary">Welcome Back</h1>
          <p className="text-sm text-[#55616D]">Log in to manage appointments and access your MedLink dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#475569]">Email address</label>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              required
              placeholder="your@email.com"
              className="w-full rounded-[14px] border border-[#CBD5E0] bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div>
            <label className="block mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#475569]">Password</label>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              required
              placeholder="Enter your password"
              className="w-full rounded-[14px] border border-[#CBD5E0] bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-[#475569]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
                className="h-4 w-4 accent-primary"
              />
              Remember me
            </label>
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => navigate('/')} className="text-sm font-bold text-primary transition hover:text-primaryLight">
                Back
              </button>
              <button type="button" onClick={() => navigate('/signup')} className="text-sm font-bold text-primary transition hover:text-primaryLight">
                Create account
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-[14px] bg-primary px-4 py-3 text-sm font-bold text-white shadow-[0_14px_30px_rgba(10,92,69,0.18)] transition hover:-translate-y-0.5 hover:bg-primaryLight"
          >
            Log In
          </button>
        </form>

        {submitted && (
          <div className="mt-6 rounded-[16px] bg-[#ECFDF5] p-4 text-sm leading-6 text-[#166534]">
            Demo sign-in successful. Your credentials are not sent anywhere in this prototype.
          </div>
        )}
      </div>
    </div>
  );
};

export default SignInPage;
