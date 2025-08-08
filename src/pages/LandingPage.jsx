import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"


export default function LandingPage() {
  return (
    <main className="min-h-screen 
    bg-[url(https://images.unsplash.com/photo-1685997180450-242a65624238?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] 
    bg-cover flex items-center justify-center px-4 sm:px-6 bg-right">
      <section className="bg-white/40 backdrop-blur-md max-w-xl w-full text-center rounded-2xl shadow-lg  p-8 sm:p-10">
        <h1 className="text-4xl font-bold text-slate-50 drop-shadow-md tracking-tight sm:text-5xl">
          Peace of mind,<br/> one update at a time.
        </h1>
        <p className="my-8 text-md sm:text-lg text-slate-800">
          Get real-time updates on your loved one's surgery.
        </p>
       
        <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-around mt-6">
          <Link to="/patient-status"><Button size="lg" variant="outline">Enter as Guest</Button></Link>
          <Link to="/login"><Button size="lg" className="bg-slate-800">Authorized Login</Button></Link>
        </div>
      </section>
    </main>
  )
}
