import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/provider/provider";
const poppins = Poppins({
  weight: ["200", "400", "500", "600", "700"],
});

const RootLayout = ({ children }) => {
  return (
    <Providers>
      <html className={`${poppins.className}`}>
        <body className="">{children}</body>
      </html>
    </Providers>
  );
};
export default RootLayout;
