import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EditJobDialog } from "./EditJobDialog";
import { Edit, MapPin, Clock, Calendar, Archive, ArchiveRestore } from "lucide-react";
import { DatabaseService } from "@/lib/db";
import type { Job } from "@/lib/seed-data";

// Interface defining the props for the JobDetails component
interface JobDetailsProps {
  job: Job;
  onJobUpdated: (job: Job) => void;
}

// Component responsible for rendering detailed information about a job posting
export function JobDetails({ job, onJobUpdated }: JobDetailsProps) {
  // State to control the visibility of the edit dialog
  const [isEditDialogVisible, setIsEditDialogVisible] = useState(false);
  // State to indicate if an update operation is in progress
  const [isUpdating, setIsUpdating] = useState(false);

  // Asynchronous handler to toggle the job's archive status
  const toggleArchiveStatus = async () => {
    try {
      setIsUpdating(true);
      // Determine the new status based on the current one
      const newStatus = job.status === "active" ? "archived" : "active";
      // Update the job in the database
      const updatedJob = await DatabaseService.updateJob(job.id, { status: newStatus });
      if (updatedJob) {
        // Notify the parent component of the update
        onJobUpdated(updatedJob);
      }
    } catch (error) {
      console.error("Failed to update job:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Handler called when the job has been successfully updated in the edit dialog
  const onJobEditComplete = () => {
    setIsEditDialogVisible(false);
  };

  return (
    <div className="space-y-6">
      <Card className="border-green-200 bg-green-50">
        <CardHeader className="bg-green-100">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CardTitle className="text-2xl text-green-900">{job.title}</CardTitle>
                <Badge
                  variant={job.status === "active" ? "default" : "secondary"}
                  className={
                    job.status === "active" ? "bg-green-500 text-white" : "bg-green-200 text-green-800"
                  }
                >
                  {job.status}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-green-700">
                {job.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                )}
                {job.type && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span className="capitalize">{job.type}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Created {new Date(job.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogVisible(true)} className="border-green-300 text-green-700 hover:bg-green-100">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" onClick={toggleArchiveStatus} disabled={isUpdating} className="border-green-300 text-green-700 hover:bg-green-100">
                {job.status === "active" ? (
                  <>
                    <Archive className="h-4 w-4 mr-2" />
                    Archive
                  </>
                ) : (
                  <>
                    <ArchiveRestore className="h-4 w-4 mr-2" />
                    Restore
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 bg-green-50">
          {job.tags.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2 text-green-900">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-green-300 text-green-700">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {job.description && (
            <div>
              <h3 className="font-semibold mb-2 text-green-900">Description</h3>
              <p className="text-green-700 whitespace-pre-wrap">{job.description}</p>
            </div>
          )}

          {job.requirements && job.requirements.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2 text-green-900">Requirements</h3>
              <ul className="list-disc list-inside space-y-1 text-green-700">
                {job.requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      <EditJobDialog job={job} open={isEditDialogVisible} onOpenChange={setIsEditDialogVisible} onJobUpdated={onJobEditComplete} />
    </div>
  );
}
