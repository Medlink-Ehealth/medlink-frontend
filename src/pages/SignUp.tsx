import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F0F4F1] px-6 py-10 flex items-center justify-center">
      <div className="w-full max-w-[460px] rounded-[24px] bg-white p-9 shadow-[0_24px_80px_rgba(15,23,42,0.09)]">
        <div className="mb-7 text-center">
          <h1 className="mb-2 text-3xl font-black text-primary">Create your MedLink account</h1>
          <p className="text-sm text-[#55616D]">New users can register here to book appointments and manage their profile.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#475569]">Full name</label>
            <input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              type="text"
              required
              placeholder="Jane Doe"
              className="w-full rounded-[14px] border border-[#CBD5E0] bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div>
            <label className="block mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#475569]">Email address</label>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              required
              placeholder="you@example.com"
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
              placeholder="Choose a secure password"
              className="w-full rounded-[14px] border border-[#CBD5E0] bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <label className="flex items-center gap-3 text-sm text-[#475569] cursor-pointer">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => setAcceptedTerms(event.target.checked)}
              className="h-4 w-4 accent-primary"
            />
            I agree to the terms and privacy policy.
          </label>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 min-w-[120px] rounded-[14px] border border-[#CBD5E0] bg-white px-4 py-3 text-sm font-bold text-primary transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(10,92,69,0.18)]"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 min-w-[120px] rounded-[14px] bg-primary px-4 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-primaryLight hover:shadow-[0_18px_36px_rgba(10,92,69,0.18)]"
            >
              Create Account
            </button>
          </div>
        </form>

        {submitted && (
          <div className="mt-4 rounded-[16px] bg-[#ECFDF5] p-4 text-sm leading-6 text-[#166534]">
            Welcome aboard! Your new MedLink account has been created in this demo.
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
