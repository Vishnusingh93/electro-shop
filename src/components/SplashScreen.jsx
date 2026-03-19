
import { useEffect, useState } from "react";
import logo from "../assets/electro-shop.png";

export default function SplashScreen({ children }) {

  const [progress, setProgress] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => clearInterval(interval);

  }, []);

  if (progress < 100) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(180deg,#f8f9ff,#ffffff)"
        }}
      >

        <img src={logo} width="200" alt="Electro Shop" />

        <div
          style={{
            width: "280px",
            height: "8px",
            background: "#e5e5e5",
            borderRadius: "20px",
            overflow: "hidden",
            marginTop: "20px"
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "linear-gradient(90deg,#6c4cff,#9c7bff)",
              transition: "width 0.2s"
            }}
          />
        </div>

      </div>
    );
  }

  return children;
}