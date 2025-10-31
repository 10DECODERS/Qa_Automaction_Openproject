import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, Flag, Loader2, CheckCircle2, XCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface WorkPackageDetail {
  id: number;
  subject: string;
  description?: {
    html: string;
    raw: string;
  };
  _embedded?: {
    status?: { name: string };
    priority?: { name: string };
    assignee?: { name: string };
    type?: { name: string };
  };
  createdAt: string;
  updatedAt: string;
}

interface TestCase {
  id: string;
  title: string;
  priority: string;
  type: string;
  preconditions: string;
  steps: string[];
  expectedResult: string;
  status: string;
}

const TicketDetail = () => {
  const { projectId, ticketId } = useParams();
  const navigate = useNavigate();
  const [workPackage, setWorkPackage] = useState<WorkPackageDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [generatingTests, setGeneratingTests] = useState(false);
  const [approvingTestCaseId, setApprovingTestCaseId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("All");

  useEffect(() => {
    fetchWorkPackageDetail();
  }, [ticketId]);

  const fetchWorkPackageDetail = async () => {
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
            path: `/api/v3/work_packages/${ticketId}`,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch work package details");
      }

      const data = await response.json();
      setWorkPackage(data);
    } catch (error) {
      console.error("Error fetching work package details:", error);
      toast.error("Failed to fetch ticket details");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const generateTestCases = async () => {
    if (!workPackage) return;

    setGeneratingTests(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10 * 60 * 1000); // 10 minutes
      const response = await fetch("https://n8n.inside10d.com/webhook/75409c62-f8c5-49e0-8329-23585fcfc9ba", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: ticketId
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error("Failed to generate test cases");
      }

      const data = await response.json();

      if (data && data[0]?.output) {
        const transformedTestCases: TestCase[] = data[0].output.map((item: any, index: number) => ({
          id: `TC-${ticketId}-${index + 1}`,
          title: item.title,
          priority: "Medium",
          type: "Functional",
          preconditions: "User is on the login page",
          steps: [item.description],
          expectedResult: item.description,
          status: "Pending"
        }));

        setTestCases(transformedTestCases);
        toast.success(`Generated ${transformedTestCases.length} test cases`);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error("Request timed out:", error);
        toast.error("Request timed out after 10 minutes");
      } else {
        console.error("Error generating test cases:", error);
        toast.error("Failed to generate test cases");
      }
    } finally {
      setGeneratingTests(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "passed":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="max-w-5xl mx-auto p-6 space-y-6 animate-pulse">
          <div className="h-8 bg-muted rounded w-48" />
          <div className="h-12 bg-muted rounded w-full" />
          <div className="h-64 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (!workPackage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Ticket not found</h2>
          <Button onClick={() => navigate(`/projects/${projectId}/tickets`)}>
            Back to Tickets
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(`/projects/${projectId}/tickets`)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-foreground">
                  #{workPackage.id}
                </h1>
                <Badge>{workPackage._embedded?.status?.name || "Unknown"}</Badge>
              </div>
              <h2 className="text-xl text-muted-foreground">
                {workPackage.subject}
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Flag className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Priority:</span>
              <span className="font-medium">
                {workPackage._embedded?.priority?.name || "Medium"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Assignee:</span>
              <span className="font-medium">
                {workPackage._embedded?.assignee?.name || "Unassigned"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Created:</span>
              <span className="font-medium">
                {formatDate(workPackage.createdAt)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Updated:</span>
              <span className="font-medium">
                {formatDate(workPackage.updatedAt)}
              </span>
            </div>
          </div>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Description</h3>
            {workPackage.description?.html ? (
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{
                  __html: workPackage.description.html,
                }}
              />
            ) : (
              <p className="text-muted-foreground">No description provided</p>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Test Cases</h3>
            <Button onClick={generateTestCases} disabled={generatingTests}>
              {generatingTests ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Test Cases"
              )}
            </Button>
          </div>

          {testCases.length > 0 && (
            <div className="flex gap-2 mb-6">
              <Button
                variant={filterStatus === "All" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("All")}
              >
                All
              </Button>
              <Button
                variant={filterStatus === "Pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("Pending")}
              >
                Pending
              </Button>
              <Button
                variant={filterStatus === "Approved" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("Approved")}
              >
                Approved
              </Button>
              <Button
                variant={filterStatus === "Rejected" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("Rejected")}
              >
                Rejected
              </Button>
            </div>
          )}

          {testCases.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No test cases generated yet. Click "Generate Test Cases" to create AI-powered test scenarios.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {testCases
                .filter((tc) => filterStatus === "All" || tc.status === filterStatus)
                .map((testCase) => (
                <Card key={testCase.id} className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-1">{testCase.title}</h4>
                        <p className="text-sm text-muted-foreground">Created: Invalid Date</p>
                      </div>
                      {testCase.status !== "Pending" && (
                        <Badge className="bg-primary text-primary-foreground">
                          {testCase.status}
                        </Badge>
                      )}
                    </div>

                    <p className="text-base">{testCase.expectedResult}</p>

                    {testCase.status === "Approved" || testCase.status === "Rejected" ? (
                      <p className="text-sm text-muted-foreground">
                        This ticket has been {testCase.status.toLowerCase()}.
                      </p>
                    ) : (
                      <div className="flex gap-3">
                        <Button
                          className="bg-green-600 hover:bg-green-700 text-white"
                          disabled={approvingTestCaseId === testCase.id}
                          onClick={async () => {
                            setApprovingTestCaseId(testCase.id);
                            try {
                              // Generate unique tc_id
                              const tc_id = `TC-${ticketId}-${Date.now()}`;

                              // Make first API call with timeout
                              const controller1 = new AbortController();
                              const timeoutId1 = setTimeout(() => controller1.abort(), 10 * 60 * 1000); // 10 minutes
                              const approveResponse = await fetch("https://n8n.inside10d.com/webhook/75fd5ddb-6bff-484a-bd69-b9a048b34aa5", {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                  task_id: ticketId,
                                  tc_id: tc_id,
                                  tc_text: testCase.preconditions,
                                  description: testCase.expectedResult,
                                  title: testCase.title,
                                  status: "Approved"
                                }),
                                signal: controller1.signal,
                              });
                              clearTimeout(timeoutId1);
                              const approveData = await approveResponse.json();

                              // Make second API call with the response from first call and increased timeout
                              const controller2 = new AbortController();
                              const timeoutId2 = setTimeout(() => controller2.abort(), 10 * 60 * 1000); // 10 minutes
                              await fetch("https://n8n.inside10d.com/webhook/openproject-new-ticket", {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify(approveData),
                                signal: controller2.signal,
                              });
                              clearTimeout(timeoutId2);

                              // Update local state
                              const updatedCases = testCases.map(tc =>
                                tc.id === testCase.id ? { ...tc, status: "Approved" } : tc
                              );
                              setTestCases(updatedCases);
                              toast.success("Test case approved");
                            } catch (error) {
                              if (error.name === 'AbortError') {
                                console.error("Request timed out:", error);
                                toast.error("Request timed out after 10 minutes");
                              } else {
                                console.error("Error approving test case:", error);
                                toast.error("Failed to approve test case");
                              }
                            } finally {
                              setApprovingTestCaseId(null);
                            }
                          }}
                        >
                          {approvingTestCaseId === testCase.id ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Approving...
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Approve
                            </>
                          )}
                        </Button>
                        <Button 
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={() => {
                            const updatedCases = testCases.map(tc => 
                              tc.id === testCase.id ? { ...tc, status: "Rejected" } : tc
                            );
                            setTestCases(updatedCases);
                            toast.error("Test case rejected");
                          }}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default TicketDetail;
