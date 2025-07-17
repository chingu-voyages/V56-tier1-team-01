import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-blue-50 flex items-center justify-center px-4 sm:px-6">
      <section className="max-w-xl w-full text-center bg-white rounded-2xl shadow-lg border border-blue-100 p-8 sm:p-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 tracking-tight">
          Surgery Status Board
        </h1>
        <p className="mt-2 text-md sm:text-lg text-slate-600">
          Tailwind and ShadCN working, I think!
        </p>
       
        <div className="mt-6">
          <Button size="lg">ShadCN Button</Button>
        </div>
      </section>
    </main>
  )
}
