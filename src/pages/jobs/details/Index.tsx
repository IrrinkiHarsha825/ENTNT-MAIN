import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Navigation } from "@/components/layout/Navigation"
import { JobDetails } from "@/components/jobs/JobDetails"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import type { Job } from "@/lib/seed-data"

// Component for displaying detailed information about a specific job
export default function JobDetailPage() {
  // Extract the job identifier from the URL parameters
  const { jobId } = useParams()
  const navigate = useNavigate()
  // State to hold the selected job data
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  // State to track if data is currently being loaded
  const [isLoading, setIsLoading] = useState(true)
  // State to hold any error messages
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Effect to fetch job data when the component mounts or jobId changes
  useEffect(() => {
    // Asynchronous function to retrieve job details from the API
    const retrieveJobDetails = async () => {
      try {
        setIsLoading(true)
        // Fetch all jobs with default parameters
        const response = await fetch(`/api/jobs?search=&status=&page=1&pageSize=100&sort=order`)
        if (!response.ok) throw new Error("Failed to fetch jobs")

        const data = await response.json()
        // Locate the specific job by its ID
        const locatedJob = data.jobs.find((j: Job) => j.id === jobId)

        if (!locatedJob) {
          setErrorMessage("Job not found")
          return
        }

        setSelectedJob(locatedJob)
      } catch (err) {
        setErrorMessage(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    // Trigger job retrieval if a valid jobId is present
    if (jobId) {
      retrieveJobDetails()
    }
  }, [jobId])

  // Handler to update the job state when changes occur
  const handleJobUpdate = (updatedJob: Job) => {
    setSelectedJob(updatedJob)
  }

  // Render loading skeleton while data is being fetched
  if (isLoading) {
    return (
      <div className="min-h-screen bg-green-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-green-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-green-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-32 bg-green-200 rounded"></div>
              <div className="h-24 bg-green-200 rounded"></div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Render error state if an error occurred or job is not found
  if (errorMessage || !selectedJob) {
    return (
      <div className="min-h-screen bg-green-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => navigate("/jobs")} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Button>
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-green-800 mb-2">{errorMessage || "Job not found"}</h2>
            <p className="text-green-600">The job you're looking for doesn't exist or has been removed.</p>
          </div>
        </main>
      </div>
    )
  }

  // Render the main job details page
  return (
    <div className="min-h-screen bg-green-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate("/jobs")} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Button>

        <JobDetails job={selectedJob} onJobUpdated={handleJobUpdate} />
      </main>
    </div>
  )
}
