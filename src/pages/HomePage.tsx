import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Briefcase, FileText,  ArrowRight, Sparkles,  Star } from "lucide-react"
import { Navigation } from "@/components/layout/Navigation"

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-slate-900 dark:via-emerald-900/20 dark:to-slate-900">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/50 dark:to-green-900/50 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-semibold mb-8 border border-emerald-200 dark:border-emerald-800 shadow-sm">
            <Sparkles className="h-4 w-4" />
            Professional Hiring Platform
            <Star className="h-4 w-4 ml-1" />
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-6 leading-tight">
            Streamline Your<br />
            <span className="text-slate-700 dark:text-slate-300">Hiring Process</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed mb-10">
            The complete talent management platform designed for modern HR teams.
            Manage jobs, candidates, and assessments with professional efficiency.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              size="lg"
              onClick={() => navigate("/candidates")}
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={() => navigate('/jobs')}
              variant="outline"
              size="lg"
              className="px-8 py-4 rounded-2xl border-2 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-green-500 dark:hover:from-emerald-900/20 dark:hover:to-green-900/20 transition-all duration-300"
            >
              View Demo
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {/* Job Management */}
          <Card
            className="group hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800"
            onClick={() => navigate("/jobs")}
          >
            <CardHeader className="pb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/50 dark:to-green-900/50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Briefcase className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
              </div>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Job Management</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Create and organize job postings with advanced filtering and search capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full text-emerald-600 dark:text-emerald-400 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-green-500 dark:hover:from-emerald-900/20 dark:hover:to-green-900/20 transition-all duration-300 group">
                Manage Jobs
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </CardContent>
          </Card>

          {/* Candidate Pipeline */}
          <Card
            className="group hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800"
            onClick={() => navigate("/candidates")}
          >
            <CardHeader className="pb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/50 dark:to-teal-900/50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Users className="h-7 w-7 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Candidate Pipeline</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Visual kanban boards to track candidates through your hiring stages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full text-green-600 dark:text-green-400 hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-500 dark:hover:from-green-900/20 dark:hover:to-teal-900/20 transition-all duration-300 group">
                View Pipeline
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </CardContent>
          </Card>

          {/* Smart Assessments */}
          <Card
            className="group hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800"
            onClick={() => navigate("/assessments")}
          >
            <CardHeader className="pb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/50 dark:to-cyan-900/50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <FileText className="h-7 w-7 text-teal-600 dark:text-teal-400" />
              </div>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Smart Assessments</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Build custom assessments with multiple question types and validation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full text-teal-600 dark:text-teal-400 hover:bg-gradient-to-r hover:from-teal-500 hover:to-cyan-500 dark:hover:from-teal-900/20 dark:hover:to-cyan-900/20 transition-all duration-300 group">
                Create Assessment
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </CardContent>
          </Card>
        </div>



        {/* Call to Action */}
        <div className="text-center bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-emerald-100 max-w-2xl mx-auto">
              Join forward-thinking HR professionals who have streamlined their hiring process with TalentFlow's comprehensive platform.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                size="lg"
                onClick={() => navigate("/candidates")}
                className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Start Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm px-8 py-4 rounded-2xl transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 dark:from-slate-900 dark:via-emerald-900/20 dark:to-slate-900 border-t border-emerald-200/50 dark:border-emerald-800/50 mt-8 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between text-sm">
          <p className="text-slate-600 dark:text-slate-400">© {new Date().getFullYear()} TalentFlow. All rights reserved.</p>
          <p className="mt-2 md:mt-0 text-slate-600 dark:text-slate-400">
            Made by <span className="font-semibold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Irrinki Harsha</span>
          </p>
        </div>
      </footer>
    </div>
  )
}