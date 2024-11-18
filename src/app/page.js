"use client";
import React, { useState } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "@/firebase";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Push from "push.js";

export default function Home() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    {
      title: "Bienvenido",
      description:
        "Empieza con la administracion de nuestros empleados para obtener un manejo de estos",
      buttonText: "Siguiente",
      imageUrl: "/assets/img/imagen1.jpg",
    },
    {
      title: "Registra",
      description:
        "Administra a los nuevos empleados que entran a nuestra familia",
      buttonText: "Siguiente",
      imageUrl: "/assets/img/imagen2.jpg",
    },
    {
      title: "Administra",
      description:
        "Ten en tu poder la capacidad de manejar los datos o eliminacion de estos",
      buttonText: "Comenzar",
      imageUrl: "/assets/img/imagen3.jpg",
    },
  ];

  const activarMensajes = async () => {
    try {
      Push.Permission.request(
        async () => {
          // Permiso concedido
          Push.create("Bienvenido a Horizon ETP", {
            body: "Gracias por su cooperación con nosotros",
            icon: "/assets/img/notificacion.png",
            timeout: 5000,
            onClick: function () {
              window.focus();
              this.close();
            },
          });

          const token = await getToken(messaging, {
            vapidKey:
              "BM2uJMs_b58PPOAp5ZNMSX1opNRtQwF8Gi7TAy94KCw7hTFbLL618_hxpazaErohbWJzJJtpsROOa-MJxnJUqGM",
          });

          if (token) {
            console.log("Token generado:", token);
          } else {
            console.error("No se pudo generar el token.");
          }
        },
        () => {
          console.warn("Permiso de notificaciones denegado.");
        }
      );
    } catch (error) {
      console.error("Error al activar las notificaciones:", error);
    }

    router.push("/home");
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      activarMensajes();
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center text-black relative"
      style={{
        backgroundImage: `url(${steps[currentStep].imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
      <Head>
        <title classNameassName="mb-6 z-10 flex justify-end">
          Horizon enterprise
        </title>
        <meta
          name="description"
          content="Una descripción atractiva de la aplicación"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-end text-right px-4 sm:px-0 z-10 relative">
        <div className="absolute inset-0 bg-black opacity-50 z-0 transform scale-125"></div>{" "}
        {/* Capa oscura más grande */}
        <div className="w-full max-w-3xl text-right z-10 relative">
          {" "}
          {/* Aumentamos el tamaño del contenedor */}
          <header className="mb-6 z-10 flex justify-end">
            <h1 className="text-4xl font-bold sm:text-5xl text-white">
              Horizon Enterprise
            </h1>
          </header>
          <div className="w-full max-w-lg text-right z-10 relative">
            <h2 className="text-2xl font-semibold mb-4 sm:text-3xl text-white">
              {steps[currentStep].title}
            </h2>
            <p className="text-lg sm:text-xl text-white">
              {steps[currentStep].description}
            </p>
          </div>
          <div className="flex justify-end space-x-4 mt-8 z-10 relative">
            {currentStep > 0 && (
              <button
                onClick={previousStep}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-400 transition duration-300 ease-in-out"
              >
                Regresar
              </button>
            )}
            <button
              onClick={nextStep}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-400 transition duration-300 ease-in-out"
            >
              {steps[currentStep].buttonText}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
