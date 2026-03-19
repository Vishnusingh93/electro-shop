import "../styles/globals.css"; // agar aapke project me styling file hai
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <>
    
      <Component {...pageProps} />
      <Toaster />   {/* Ye toast notifications ke liye jaruri hai */}
    </>
  );
}

export default MyApp;