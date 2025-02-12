import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import "./App.css";

const images = ["/img1.gif", "/img2.gif", "/img3.gif", "/img4.gif", "/img5.gif"];

function Home() {
  const [index, setIndex] = useState(0);
  const [size, setSize] = useState(16);  // Tamaño inicial del botón
  const navigate = useNavigate();

  const handleNo = () => {
    setIndex((prev) => (prev + 1) % images.length);  // Cambiar imagen
    setSize((prev) => prev + 10);  // Aumentar tamaño del botón "Sí 💕"
  };

  const handleYes = () => {
    navigate("/success");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-300 to-pink-500 text-center p-6">
      <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-6 animate-bounce">¿Quieres ser mi San Valentín? 💖</h1>
      <img src={images[index]} alt="San Valentín" className="w-64 h-auto mb-6 rounded-xl shadow-lg border-4 border-white" />
      <div className="flex flex-col-reverse items-center gap-6">
        <button className="bg-red-600 text-white px-6 py-3 rounded-full w-22 hover:bg-red-800 shadow-lg transition-transform transform hover:scale-110" onClick={handleNo}>No 💔</button>
        <button className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-700 shadow-lg transition-transform transform hover:scale-125" onClick={handleYes} style={{ fontSize: `${size}px` }}>Sí 💕</button>
      </div>
    </div>
  );
}

function Success() {
  const [pdfBase64, setPdfBase64] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    
    if (file && file.type === "application/pdf") {
      try {
        const base64String = await convertToBase64(file);
        setPdfBase64(base64String);
      } catch (error) {
        console.error("Error al convertir a base64:", error);
      }
    } else {
      alert("Por favor selecciona un archivo PDF.");
    }
  };


  const sendEmail = () => {
    const templateParams = {
      to_email: "jaaronzambranoch@outlook.es",
      to_name: "Jaaro Zambrano",
      subject: "¡Sorpresa de San Valentín!",
      message: "Revisa el archivo adjunto.",
      attachment: "/sorpresa.pdf"
    };
    emailjs.send("service_a23evsq", "template_ybej5mj", templateParams, "FJX7h81Sn40b4XN4O").then(
      (response) => console.log("Correo enviado", response),
      (error) => console.log("Error", error)
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-400 to-red-400 text-white text-center p-6">
      <h1 className="text-4xl font-extrabold drop-shadow-lg">🎉 Revisa tu correo ❤️</h1>
      <img src="/img.gif" alt="San Valentín" className="w-72 h-auto mt-6 rounded-xl shadow-lg border-4 border-white animate-pulse" />
      <button className="mt-6 bg-blue-600 px-6 py-3 rounded-full shadow-lg hover:bg-blue-800 transition-transform transform hover:scale-110" onClick={sendEmail}>📩 Enviar Correo</button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;
