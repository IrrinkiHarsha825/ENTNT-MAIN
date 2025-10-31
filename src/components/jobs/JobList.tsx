import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EditJobDialog } from "./EditJobDialog"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import type { DropResult } from "@hello-pangea/dnd"
import { GripVertical, Edit, Archive, ArchiveRestore, Eye, MoreHorizontal, MapPin, Briefcase } from "lucide-react"
import { useToast } from "@/components/ui/toast-provider"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import type { Job } from "@/lib/seed-data"
import { useNavigate } from "react-router-dom"

interface JobsListProps {
  jobs: Job[]
  loading: boolean
  error: string | null
  pagination: {
    total: number
    totalPages: number
  }
  currentPage: number
  onPageChange: (page: number) => void
  onJobUpdated: () => void
  onViewJob?: (jobId: string) => void 
}

export const JobsList: React.FC<JobsListProps> = ({
  jobs,
  loading,
  error,
  pagination,
  currentPage,
  onPageChange,
  onJobUpdated,
}) => {
  const { addToast } = useToast()
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [reorderLoading, setReorderLoading] = useState(false)
  const [optimisticJobs, setOptimisticJobs] = useState<Job[]>([])
  const navigate = useNavigate();

  useEffect(() => {
    setOptimisticJobs(jobs)
  }, [jobs])

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return

    const sourceIndex = result.source.index
    const destinationIndex = result.destination.index
    if (sourceIndex === destinationIndex) return

    const draggedJob = optimisticJobs[sourceIndex]
    const fromOrder = draggedJob.order
    const toOrder = optimisticJobs[destinationIndex].order

    const newJobs = Array.from(optimisticJobs)
    const [removed] = newJobs.splice(sourceIndex, 1)
    newJobs.splice(destinationIndex, 0, removed)
    setOptimisticJobs(newJobs)

    try {
      setReorderLoading(true)
      const response = await fetch(`/api/jobs/${draggedJob.id}/reorder`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fromOrder, toOrder }),
      })
      if (!response.ok) throw new Error("Failed to reorder job")

      addToast({
        title: "Job reordered",
        description: `"${draggedJob.title}" has been moved successfully.`,
        variant: "success",
      })
      onJobUpdated()
    } catch (err) {
      console.error(err)
      setOptimisticJobs(jobs)
      addToast({
        title: "Reorder failed",
        description: "Unable to reorder job. Please try again.",
        variant: "destructive",
      })
      onJobUpdated()
    } finally {
      setReorderLoading(false)
    }
  }

  const handleArchiveToggle = async (job: Job) => {
    try {
      const newStatus = job.status === "active" ? "archived" : "active"
      const response = await fetch(`/api/jobs/${job.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!response.ok) throw new Error("Failed to update job")

      addToast({
        title: `Job ${newStatus}`,
        description: `"${job.title}" has been ${newStatus}.`,
        variant: "success",
      })
      onJobUpdated()
    } catch (err) {
      console.error(err)
      addToast({
        title: "Update failed",
        description: "Unable to update job status. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-muted rounded w-1/3"></div>
              <div className="h-4 bg-muted rounded w-1/2 mt-2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-muted rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-destructive">{error}</p>
          <Button onClick={onJobUpdated} className="mt-4">
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (jobs.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">No jobs found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or create a new job.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {reorderLoading && (
        <div className="flex items-center justify-center py-4 bg-muted/50 rounded-lg border border-dashed">
          <LoadingSpinner className="mr-2" />
          <span className="text-sm text-muted-foreground">Reordering jobs...</span>
        </div>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="jobs">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
              {optimisticJobs.map((job, index) => (
                <Draggable key={job.id} draggableId={job.id} index={index}>
                  {(provided, snapshot) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`group transition-all duration-300 hover:shadow-md border ${
                        snapshot.isDragging ? "shadow-2xl scale-[1.02] rotate-1 border-primary/50" : "hover:border-primary/30"
                      } ${reorderLoading ? "opacity-50" : ""} ${
                        job.status === "archived" ? "bg-muted/30" : "bg-card"
                      }`}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          {/* Drag Handle */}
                          <div
                            {...provided.dragHandleProps}
                            className="mt-1.5 text-muted-foreground/40 hover:text-foreground cursor-grab active:cursor-grabbing transition-colors flex-shrink-0"
                          >
                            <GripVertical className="h-5 w-5" />
                          </div>

                          {/* Main Content */}
                          <div className="flex-1 min-w-0">
                            {/* Title and Status Row */}
                            <div className="flex items-start justify-between gap-3 mb-3">
                              <div className="flex items-center gap-2.5 flex-wrap">
                                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                                  {job.title}
                                </h3>
                                <Badge
                                  variant={job.status === "active" ? "default" : "secondary"}
                                  className={`${
                                    job.status === "active"
                                      ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
                                      : "bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-500/20"
                                  } font-medium px-2.5 py-0.5`}
                                >
                                  {job.status}
                                </Badge>
                              </div>
                              
                              {/* Actions Menu */}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                  <DropdownMenuItem onClick={() => navigate(`/jobs/${job.id}`)}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => setEditingJob(job)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Job
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleArchiveToggle(job)}>
                                    {job.status === "active" ? (
                                      <Archive className="h-4 w-4 mr-2" />
                                    ) : (
                                      <ArchiveRestore className="h-4 w-4 mr-2" />
                                    )}
                                    {job.status === "active" ? "Archive" : "Restore"}
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>

                            {/* Tags */}
                            {job.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mb-3">
                                {job.tags.map((tag) => (
                                  <Badge 
                                    key={tag} 
                                    variant="outline" 
                                    className="text-xs px-2 py-0.5 bg-primary/5 hover:bg-primary/10 transition-colors border-primary/20"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}

                            {/* Description */}
                            {job.description && (
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                                {job.description}
                              </p>
                            )}

                            {/* Location and Type */}
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              {job.location && (
                                <div className="flex items-center gap-1.5">
                                  <MapPin className="h-3.5 w-3.5" />
                                  <span>{job.location}</span>
                                </div>
                              )}
                              {job.type && (
                                <div className="flex items-center gap-1.5">
                                  <Briefcase className="h-3.5 w-3.5" />
                                  <span className="capitalize">{job.type}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between pt-2 border-t">
          <p className="text-sm text-muted-foreground font-medium">
            Showing {jobs.length} of {pagination.total} jobs
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-9"
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground px-2 font-medium">
              Page {currentPage} of {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === pagination.totalPages}
              className="h-9"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      <EditJobDialog
        job={editingJob}
        open={!!editingJob}
        onOpenChange={(open) => !open && setEditingJob(null)}
        onJobUpdated={() => {
          setEditingJob(null)
          onJobUpdated()
        }}
      />
    </div>
  )
}