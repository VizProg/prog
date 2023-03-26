import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <div style={{
    display: 'flex',
    width: "100vw",
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
  </div>
);

export default SignInPage;
