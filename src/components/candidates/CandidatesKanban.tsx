import { useState, useMemo } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Eye, Mail, GripVertical } from "lucide-react"
import { useNavigate } from "react-router-dom" 

interface Candidate {
  id: string
  name: string
  email: string
  stage: "applied" | "screen" | "tech" | "offer" | "hired" | "rejected"
  createdAt: string
}

interface CandidatesKanbanProps {
  candidates: Candidate[]
  loading: boolean
  error: string | null
  onCandidateUpdated: () => void
}

const stages = [
  { id: "applied", title: "Applied", color: "bg-blue-500", lightColor: "bg-blue-50" },
  { id: "screen", title: "Screening", color: "bg-amber-500", lightColor: "bg-amber-50" },
  { id: "tech", title: "Technical", color: "bg-purple-500", lightColor: "bg-purple-50" },
  { id: "offer", title: "Offer", color: "bg-cyan-500", lightColor: "bg-cyan-50" },
  { id: "hired", title: "Hired", color: "bg-emerald-500", lightColor: "bg-emerald-50" },
  { id: "rejected", title: "Rejected", color: "bg-rose-500", lightColor: "bg-rose-50" },
]

export function CandidatesKanban({ candidates = [], loading, error, onCandidateUpdated }: CandidatesKanbanProps) {
  const navigate = useNavigate()
  const [dragLoading, setDragLoading] = useState(false)

  const candidatesByStage = useMemo(() => {
    const grouped: Record<string, Candidate[]> = {}
    stages.forEach((stage) => {
      grouped[stage.id] = candidates.filter((candidate) => candidate.stage === stage.id)
    })
    return grouped
  }, [candidates])

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return

    const { source, destination, draggableId } = result

    if (source.droppableId === destination.droppableId && source.index === destination.index) return

    const candidateId = draggableId
    const newStage = destination.droppableId as Candidate["stage"]

    try {
      setDragLoading(true)
      const response = await fetch(`/api/candidates/${candidateId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage: newStage }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to update candidate stage: ${errorText}`)
      }

      onCandidateUpdated()
    } catch (error) {
      console.error("Failed to update candidate:", error)
      alert("Failed to update candidate. Please try again.")
      onCandidateUpdated() 
    } finally {
      setDragLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4 px-1">
        {stages.map((stage) => (
          <div key={stage.id} className="flex-shrink-0 w-80">
            <div className="bg-gray-50 rounded-xl p-3 h-full">
              <div className={`${stage.color} rounded-lg px-3 py-2 mb-3`}>
                <div className="h-4 bg-white/50 rounded w-20 animate-pulse"></div>
              </div>
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="py-12 text-center px-4">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={onCandidateUpdated} className="bg-blue-600 hover:bg-blue-700">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4 px-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {stages.map((stage) => (
          <div key={stage.id} className="flex-shrink-0 w-80">
            <div className="bg-gray-50/80 rounded-xl p-3 backdrop-blur-sm border border-gray-200/50 shadow-sm h-full">
              <div className={`${stage.color} rounded-lg px-4 py-2.5 mb-3 shadow-sm flex items-center justify-between`}>
                <h3 className="font-semibold text-white text-sm">{stage.title}</h3>
                <Badge variant="secondary" className="bg-white/90 text-gray-700 text-xs font-medium px-2 py-0.5">
                  {candidatesByStage[stage.id]?.length || 0}
                </Badge>
              </div>

              <Droppable droppableId={stage.id}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`space-y-2 min-h-[500px] rounded-lg transition-all duration-200 ${
                      snapshot.isDraggingOver ? "bg-gray-200/50 ring-2 ring-gray-300 p-2" : "p-1"
                    }`}
                  >
                    {candidatesByStage[stage.id]?.map((candidate, index) => {
                      const initials = candidate.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)

                      return (
                        <Draggable key={candidate.id} draggableId={candidate.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 group ${
                                snapshot.isDragging ? "shadow-xl ring-2 ring-blue-400 scale-105 rotate-2" : ""
                              } ${dragLoading ? "opacity-50 pointer-events-none" : ""}`}
                            >
                              <div className="p-4">
                                <div className="flex items-start gap-3">
                                  <div {...provided.dragHandleProps} className="mt-1 cursor-grab active:cursor-grabbing">
                                    <GripVertical className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                                  </div>
                                  
                                  <Avatar className="h-10 w-10 flex-shrink-0 ring-2 ring-gray-100">
                                    <AvatarFallback className={`${stage.color} text-white text-sm font-semibold`}>
                                      {initials}
                                    </AvatarFallback>
                                  </Avatar>

                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                      <h4 className="font-semibold text-sm text-gray-900 truncate leading-tight">
                                        {candidate.name}
                                      </h4>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          e.preventDefault()
                                          navigate(`/candidates/${candidate.id}`) 
                                        }}
                                        className="h-7 w-7 p-0 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
                                      >
                                        <Eye className="h-3.5 w-3.5 text-gray-600" />
                                      </Button>
                                    </div>
                                    
                                    <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-500">
                                      <Mail className="h-3 w-3 flex-shrink-0" />
                                      <span className="truncate">{candidate.email}</span>
                                    </div>

                                    <div className="mt-3 pt-3 border-t border-gray-100">
                                      <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-400">
                                          {new Date(candidate.createdAt).toLocaleDateString('en-US', { 
                                            month: 'short', 
                                            day: 'numeric' 
                                          })}
                                        </span>
                                        <div className={`h-2 w-2 rounded-full ${stage.color} opacity-60`}></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      )
                    })}
                    {provided.placeholder}
                    
                    {candidatesByStage[stage.id]?.length === 0 && (
                      <div className="flex items-center justify-center h-40 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-lg">
                        No candidates
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .scrollbar-thin::-webkit-scrollbar {
          height: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </DragDropContext>
  )
}