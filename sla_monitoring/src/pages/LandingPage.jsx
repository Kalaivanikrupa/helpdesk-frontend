import Header from "../components/Header";

function LandingPage({ goToLogin, goToSignup }) {
  return (
    <>
      <Header onLoginClick={goToLogin} onSignupClick={goToSignup} />

      <div className="center">
        <h1>Welcome to</h1>
        <h2>Enterprise SLA Monitoring & Escalation Platform</h2>
      </div>
    </>
  );
}

export default LandingPage;
