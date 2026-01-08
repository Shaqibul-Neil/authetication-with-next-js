import NextAuthProvider from "./NextAuthProvider";

const Providers = ({ children }) => {
  return <NextAuthProvider>{children}</NextAuthProvider>;
};

export default Providers;
