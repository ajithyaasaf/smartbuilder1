import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useVisitCounter } from "@/hooks/useVisitCounter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  Users,
  FileText,
  Calendar,
  Download,
  Search,
  LogOut,
  Eye,
  Filter,
  RefreshCw,
  Clock,
  Trash2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface FormSubmission {
  id: string;
  formType:
    | "contact"
    | "quickInquiry"
    | "siteVisit"
    | "emiCalculator"
    | "newsletter";
  timestamp: string;
  data: Record<string, any>;
}

interface Stats {
  total: number;
  byType: Record<string, number>;
  recent: FormSubmission[];
}

export const Admin = (): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    byType: {},
    recent: [],
  });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [resetingVisits, setResetingVisits] = useState(false);
  const { toast } = useToast();
  const { counter: visitCounter, refetch: refetchVisits } = useVisitCounter(10000);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsLoggedIn(true);
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard",
        });
        await fetchData();
      } else {
        toast({
          title: "Login Failed",
          description: result.message || "Invalid username or password. Please check your credentials and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "Unable to connect to server. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      const data = await response.json();
      setStats(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const response = await fetch("/api/admin/submissions");
      const data = await response.json();
      setSubmissions(data);
    } catch (error) {
      console.error("Failed to fetch submissions:", error);
    }
  };

  const fetchData = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([fetchStats(), fetchSubmissions()]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch dashboard data",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setSubmissions([]);
    setStats({ total: 0, byType: {}, recent: [] });
    setSearchTerm("");
    setFilterType("all");
    setLastUpdated(null);
  };

  const exportData = () => {
    // Create a workbook with multiple sheets
    const workbook = XLSX.utils.book_new();

    // Sheet 1: Submissions Data
    const submissionsData = submissions.map((submission, index) => ({
      'S.No': index + 1,
      'Submission ID': submission.id,
      'Form Type': formatFormType(submission.formType),
      'Date & Time': formatTimestamp(submission.timestamp),
      'Customer Name': submission.data.name || 'N/A',
      'Email': submission.data.email || 'N/A',
      'Phone': submission.data.phone || 'N/A',
      'Project Type': submission.data.projectType || submission.data.project || 'N/A',
      'Budget': submission.data.budget || 'N/A',
      'Message': submission.data.message || 'N/A',
      'Preferred Date': submission.data.preferredDate || 'N/A',
      'Visitors': submission.data.visitors || 'N/A',
      'Call Time': submission.data.callTime || 'N/A',
      'EMI Amount': submission.data.emi || 'N/A',
      'Loan Amount': submission.data.loanAmount || 'N/A',
      'Interest Rate': submission.data.interestRate || 'N/A',
      'Tenure': submission.data.tenure || 'N/A'
    }));

    const submissionsSheet = XLSX.utils.json_to_sheet(submissionsData);
    XLSX.utils.book_append_sheet(workbook, submissionsSheet, "Form Submissions");

    // Sheet 2: Statistics Summary
    const statsData = [
      { 'Metric': 'Total Submissions', 'Value': stats.total },
      { 'Metric': 'Export Date', 'Value': new Date().toLocaleDateString('en-IN') },
      { 'Metric': 'Export Time', 'Value': new Date().toLocaleTimeString('en-IN') },
      { 'Metric': '', 'Value': '' }, // Empty row
      { 'Metric': 'Form Type Breakdown', 'Value': '' },
      ...Object.entries(stats.byType).map(([type, count]) => ({
        'Metric': formatFormType(type),
        'Value': count
      }))
    ];

    const statsSheet = XLSX.utils.json_to_sheet(statsData);
    XLSX.utils.book_append_sheet(workbook, statsSheet, "Statistics");

    // Generate and download the Excel file
    const fileName = `BuildMasters-Submissions-${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);

    toast({
      title: "Excel Export Successful",
      description: `${submissions.length} submissions exported to Excel file`,
    });
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const response = await fetch(`/api/admin/submissions/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        // Remove from local state immediately
        setSubmissions((prev) => prev.filter((sub) => sub.id !== id));

        // Refresh stats
        await fetchStats();

        toast({
          title: "Deleted Successfully",
          description: "Form submission has been permanently deleted",
        });
      } else {
        throw new Error(result.message || "Delete operation failed");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "Delete Failed",
        description:
          error instanceof Error
            ? error.message
            : "Failed to delete submission. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleResetVisits = async (resetTo?: number, reason?: string) => {
    setResetingVisits(true);
    try {
      const response = await fetch("/api/admin/visits/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          resetTo, 
          reason,
          adminUsername: username 
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        await refetchVisits();
        toast({
          title: "Visit Counter Reset",
          description: `Counter reset to ${resetTo || 0}. ${reason || 'Manual reset'}`,
        });
      } else {
        throw new Error(result.message || "Reset failed");
      }
    } catch (error) {
      console.error("Reset error:", error);
      toast({
        title: "Reset Failed",
        description: error instanceof Error ? error.message : "Failed to reset visit counter",
        variant: "destructive",
      });
    } finally {
      setResetingVisits(false);
    }
  };

  const formatFormType = (type: string) => {
    const types = {
      contact: "Contact Form",
      quickInquiry: "Quick Inquiry",
      siteVisit: "Site Visit",
      emiCalculator: "EMI Calculator",
      newsletter: "Newsletter",
    };
    return types[type as keyof typeof types] || type;
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getFormTypeColor = (type: string) => {
    const colors = {
      contact: "bg-blue-100 text-blue-800",
      quickInquiry: "bg-green-100 text-green-800",
      siteVisit: "bg-purple-100 text-purple-800",
      emiCalculator: "bg-orange-100 text-orange-800",
      newsletter: "bg-pink-100 text-pink-800",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const filteredSubmissions = submissions
    .filter((submission) => {
      const matchesFilter =
        filterType === "all" || submission.formType === filterType;
      const matchesSearch =
        searchTerm === "" ||
        JSON.stringify(submission.data)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        submission.formType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        formatTimestamp(submission.timestamp)
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      return matchesFilter && matchesSearch;
    })
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );

  const getMostPopularForm = () => {
    if (Object.keys(stats.byType).length === 0)
      return { type: "None Yet", count: 0 };
    const [type, count] = Object.entries(stats.byType).sort(
      ([, a], [, b]) => b - a,
    )[0];
    return { type: formatFormType(type), count };
  };

  // Set up real-time polling
  useEffect(() => {
    if (isLoggedIn) {
      fetchData();

      const interval = setInterval(() => {
        fetchStats();
        fetchSubmissions();
      }, 10000); // Refresh every 10 seconds

      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-[#313131] [font-family:'Poppins',Helvetica]">
              Admin <span className="text-[#b48b2f]">Login</span>
            </CardTitle>
            <CardDescription>
              Access the Smart builders and developers admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="admin"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="smartbuilder2025"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#b48b2f] hover:bg-[#9d7829] text-white"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const popularForm = getMostPopularForm();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-[#313131] [font-family:'Poppins',Helvetica]">
                Smart Builders & developers{" "}
                <span className="text-[#b48b2f]">Admin</span>
              </h1>
              {lastUpdated && (
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </div>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={fetchData}
                variant="outline"
                size="sm"
                disabled={isRefreshing}
                className="flex items-center"
              >
                <RefreshCw
                  className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
                />
                {isRefreshing ? "Refreshing..." : "Refresh"}
              </Button>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Real-Time Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-none shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-[#313131]">
                  Total Submissions
                </CardTitle>
                <FileText className="w-8 h-8 text-[#b48b2f]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#b48b2f]">
                {stats.total}
              </div>
              <p className="text-sm text-[#6b6b6b] mt-1">
                All forms {stats.total > 0 && "(Live Data)"}
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-[#313131]">
                  Most Popular
                </CardTitle>
                <BarChart3 className="w-8 h-8 text-[#b48b2f]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#b48b2f]">
                {popularForm.type}
              </div>
              <p className="text-sm text-[#6b6b6b] mt-1">
                {popularForm.count > 0
                  ? `${popularForm.count} submissions`
                  : "Waiting for data"}
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-[#313131]">
                  Form Types
                </CardTitle>
                <Users className="w-8 h-8 text-[#b48b2f]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#b48b2f]">
                {Object.keys(stats.byType).length}
              </div>
              <p className="text-sm text-[#6b6b6b] mt-1">Active form types</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-[#313131]">
                  Site Visits
                </CardTitle>
                <Eye className="w-8 h-8 text-[#b48b2f]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#b48b2f]">
                {visitCounter?.totalVisits?.toLocaleString('en-IN') || '0'}
              </div>
              <p className="text-sm text-[#6b6b6b] mt-1">
                Total visits (Today: {visitCounter?.dailyVisits || 0})
              </p>
              <div className="mt-3 flex space-x-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs"
                      disabled={resetingVisits}
                    >
                      Reset
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Reset Visit Counter</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will reset the visit counter. You can set a custom starting number or reset to 0.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleResetVisits(0, "Reset to zero")}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Reset to 0
                      </AlertDialogAction>
                      <AlertDialogAction
                        onClick={() => handleResetVisits(1000, "Set to 1000")}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Set to 1000
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form Type Breakdown */}
        {Object.keys(stats.byType).length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-[#313131]">
                Form Type Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {Object.entries(stats.byType).map(([type, count]) => (
                  <div
                    key={type}
                    className="text-center p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="text-2xl font-bold text-[#b48b2f]">
                      {count}
                    </div>
                    <div className="text-sm text-[#6b6b6b]">
                      {formatFormType(type)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submissions Management */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle className="text-xl font-semibold text-[#313131]">
                  Form Submissions ({filteredSubmissions.length})
                </CardTitle>
                <CardDescription>
                  Manage and export all form submissions
                </CardDescription>
              </div>
              <Button
                onClick={exportData}
                className="bg-[#b48b2f] hover:bg-[#9d7829] text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search and Filter Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search submissions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="md:w-48">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="contact">Contact Form</SelectItem>
                    <SelectItem value="quickInquiry">Quick Inquiry</SelectItem>
                    <SelectItem value="siteVisit">Site Visit</SelectItem>
                    <SelectItem value="emiCalculator">
                      EMI Calculator
                    </SelectItem>
                    <SelectItem value="newsletter">Newsletter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submissions Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Customer Info</TableHead>
                    <TableHead>Contact Details</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-mono text-xs">
                        {submission.id.split("_")[1]?.substring(0, 8)}...
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getFormTypeColor(submission.formType)}
                        >
                          {formatFormType(submission.formType)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {formatTimestamp(submission.timestamp)}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {submission.data.name && (
                            <div className="font-medium text-sm">
                              {submission.data.name}
                            </div>
                          )}
                          {submission.data.projectType && (
                            <div className="text-xs text-gray-600">
                              Project: {submission.data.projectType}
                            </div>
                          )}
                          {submission.data.project && (
                            <div className="text-xs text-gray-600">
                              Project: {submission.data.project}
                            </div>
                          )}
                          {submission.data.budget && (
                            <div className="text-xs text-gray-600">
                              Budget: {submission.data.budget}
                            </div>
                          )}
                          {submission.data.preferredDate && (
                            <div className="text-xs text-gray-600">
                              Visit: {submission.data.preferredDate}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {submission.data.email && (
                            <div className="text-sm">
                              {submission.data.email}
                            </div>
                          )}
                          {submission.data.phone && (
                            <div className="text-sm">
                              {submission.data.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                disabled={deletingId === submission.id}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Submission
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this form
                                  submission? This action cannot be undone and
                                  will permanently remove the data from both
                                  memory and file storage.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(submission.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredSubmissions.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  {submissions.length === 0
                    ? "No submissions yet. Forms will appear here once submitted."
                    : "No submissions found matching your search criteria."}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
