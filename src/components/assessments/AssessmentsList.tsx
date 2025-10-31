import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, Eye, Edit, MoreVertical, MapPin, Briefcase, FileText, CheckCircle2 } from "lucide-react"

interface Job {
  id: string
  title: string
  location?: string
  type: string
}

interface Assessment {
  description: string
  sections: { questions: any[] }[]
}

interface AssessmentsListProps {
  jobs: Job[]
  assessments: Record<string, Assessment>
  loading: boolean
  error: string | null
  onCreateAssessment: (jobId: string) => void
  onEditAssessment: (jobId: string) => void
  onPreviewAssessment?: (jobId: string) => void
}

export function AssessmentsList({ 
  jobs, 
  assessments, 
  loading,
  error,
  onCreateAssessment, 
  onEditAssessment,
  onPreviewAssessment
}: AssessmentsListProps) {
  
  const handlePreview = (jobId: string) => {
    if (onPreviewAssessment) {
      onPreviewAssessment(jobId)
    } else {
      window.location.href = `/assessments/${jobId}/take`
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="relative overflow-hidden border-2">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 animate-pulse" />
            <CardHeader className="pb-4">
              <div className="space-y-3">
                <div className="h-6 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>
                <div className="flex gap-2">
                  <div className="h-5 bg-gray-200 rounded-full w-20 animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded-full w-24 animate-pulse"></div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-20 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded-lg w-full animate-pulse"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border-2 border-red-200 bg-red-50/50">
        <CardContent className="py-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <FileText className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <p className="text-red-600 font-semibold mb-2">Unable to load assessments</p>
          <p className="text-red-500 text-sm">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (jobs.length === 0) {
    return (
      <Card className="border-2 border-dashed border-gray-300 bg-gray-50/50">
        <CardContent className="py-16 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No Active Jobs Found</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Create some active job positions first to build assessments for them.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => {
        const assessment = assessments[job.id]
        const questionCount = assessment?.sections.reduce((total, section) => total + section.questions.length, 0) || 0
        const hasAssessment = !!assessment

        return (
          <Card
            key={job.id}
            className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 bg-gradient-to-br from-white to-gray-50/50"
          >
            {/* Status Indicator */}
            <div className={`absolute top-0 left-0 right-0 h-1 ${hasAssessment ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-gray-300 to-gray-400'}`} />
            
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                    {job.title}
                  </CardTitle>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="text-xs font-medium bg-white">
                      <MapPin className="h-3 w-3 mr-1" />
                      {job.location}
                    </Badge>
                    <Badge variant="outline" className="text-xs font-medium capitalize bg-white">
                      <Briefcase className="h-3 w-3 mr-1" />
                      {job.type}
                    </Badge>
                  </div>
                </div>

                {hasAssessment && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-52">
                      <DropdownMenuItem onClick={() => handlePreview(job.id)} className="cursor-pointer">
                        <Eye className="h-4 w-4 mr-2 text-blue-600" />
                        <span>Preview Assessment</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEditAssessment(job.id)} className="cursor-pointer">
                        <Edit className="h-4 w-4 mr-2 text-amber-600" />
                        <span>Edit Assessment</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {hasAssessment ? (
                <>
                  {/* Assessment Stats */}
                  <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-full flex-shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-900">
                        Assessment Ready
                      </div>
                      <div className="text-xs text-gray-600 flex items-center gap-2 mt-0.5">
                        <span className="flex items-center">
                          <FileText className="h-3 w-3 mr-1" />
                          {assessment.sections.length} sections
                        </span>
                        <span className="text-gray-400">•</span>
                        <span>{questionCount} questions</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  {assessment.description && (
                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {assessment.description}
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => handlePreview(job.id)}
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-white hover:bg-blue-50 hover:text-green-700 hover:border-blue-300 transition-all"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button
                      onClick={() => onEditAssessment(job.id)}
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-white hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300 transition-all"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {/* Empty State */}
                  <div className="py-6 px-4 text-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <FileText className="h-6 w-6 text-gray-400" />
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      No Assessment Yet
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      Create an assessment to evaluate candidates for this position
                    </p>
                  </div>

                  {/* Create Button */}
                  <Button
                    onClick={() => onCreateAssessment(job.id)}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-md hover:shadow-lg transition-all"
                    size="lg"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Create Assessment
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}