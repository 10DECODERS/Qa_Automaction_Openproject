import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, FileText, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface WorkPackage {
  id: number;
  subject: string;
  _embedded?: {
    status?: { name: string };
    priority?: { name: string };
    assignee?: { name: string };
  };
  createdAt: string;
}

const Tickets = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [workPackages, setWorkPackages] = useState<WorkPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    fetchWorkPackages();
    fetchProjectDetails();
  }, [projectId]);

  const fetchProjectDetails = async () => {
    const settings = localStorage.getItem("openproject_settings");
    if (!settings) return;

    const { apiUrl, apiToken } = JSON.parse(settings);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/openproject-proxy`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            apiUrl,
            apiToken,
            path: `/api/v3/projects/${projectId}`,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProjectName(data.name);
      }
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  const fetchWorkPackages = async () => {
    const settings = localStorage.getItem("openproject_settings");
    if (!settings) {
      toast.error("Please configure OpenProject settings first");
      navigate("/settings");
      return;
    }

    const { apiUrl, apiToken } = JSON.parse(settings);

    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/openproject-proxy`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            apiUrl,
            apiToken,
            path: `/api/v3/projects/${projectId}/work_packages`,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch work packages");
      }

      const data = await response.json();
      setWorkPackages(data._embedded?.elements || []);
    } catch (error) {
      console.error("Error fetching work packages:", error);
      toast.error("Failed to fetch tickets. Please check your settings.");
    } finally {
      setLoading(false);
    }
  };

  const filteredWorkPackages = workPackages.filter((wp) => {
    const matchesSearch = wp.subject
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      wp._embedded?.status?.name === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/projects")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tickets</h1>
            <p className="text-muted-foreground mt-1">
              View and manage all tickets for project {projectName}
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Ticket
          </Button>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="To Do">To Do</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Done">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="bg-card rounded-lg border">
            <div className="p-6 space-y-4 animate-pulse">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-12 bg-muted rounded" />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-card rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Key</TableHead>
                  <TableHead>Summary</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWorkPackages.map((wp) => (
                  <TableRow
                    key={wp.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() =>
                      navigate(`/projects/${projectId}/tickets/${wp.id}`)
                    }
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        #{wp.id}
                      </div>
                    </TableCell>
                    <TableCell>{wp.subject}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {wp._embedded?.status?.name || "Unknown"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {wp._embedded?.priority?.name || "Medium"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {wp._embedded?.assignee ? (
                          <>
                            <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                              {wp._embedded.assignee.name.charAt(0)}
                            </div>
                            {wp._embedded.assignee.name}
                          </>
                        ) : (
                          <span className="text-muted-foreground">
                            Unassigned
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(wp.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {!loading && filteredWorkPackages.length === 0 && (
          <div className="text-center py-12 bg-card rounded-lg border">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No tickets found</h3>
            <p className="text-muted-foreground">
              {searchTerm
                ? "Try adjusting your search or filters"
                : "Get started by creating a new ticket"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tickets;
