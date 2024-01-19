import { Outlet } from "react-router-dom"
import Footer from "./Footer"

export default function AuthLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow max-w-4xl m-auto mt-10 md:mt-20 flex flex-col md:flex-row justify-center items-center">
        <img src="../img/logo-sinfondo.png" alt="Imagen logo tipo" className="max-w-sm" />
        <div className="p-8 w-full">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}
