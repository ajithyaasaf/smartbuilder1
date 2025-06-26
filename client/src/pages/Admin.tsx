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
  SafeSelect as Select,
  SafeSelectContent as SelectContent,
  SafeSelectItem as SelectItem,
  SafeSelectTrigger as SelectTrigger,
  SafeSelectValue as SelectValue,
} from "@/components/ui/safe-select";
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
  const [viewingSubmission, setViewingSubmission] = useState<FormSubmission | null>(null);
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
    const fileName = `SmartBuilders-Submissions-${new Date().toISOString().split('T')[0]}.xlsx`;
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-3 xs:p-4 sm:p-6">
        <Card className="w-full max-w-xs xs:max-w-sm sm:max-w-md shadow-xl border-none">
          <CardHeader className="text-center pb-4 xs:pb-6">
            <CardTitle className="text-lg xs:text-xl sm:text-2xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-2">
              Admin <span className="text-[#b48b2f]">Login</span>
            </CardTitle>
            <CardDescription className="text-xs xs:text-sm px-2">
              Access the Smart Builders & Developers admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 xs:px-6">
            <form onSubmit={handleLogin} className="space-y-3 xs:space-y-4">
              <div className="space-y-1.5 xs:space-y-2">
                <Label htmlFor="username" className="text-xs xs:text-sm font-medium">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="admin"
                  className="min-h-[44px] text-sm xs:text-base"
                />
              </div>
              <div className="space-y-1.5 xs:space-y-2">
                <Label htmlFor="password" className="text-xs xs:text-sm font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="smartbuilders2025"
                  className="min-h-[44px] text-sm xs:text-base"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#b48b2f] hover:bg-[#9d7829] text-white min-h-[44px] xs:min-h-[48px] text-sm xs:text-base font-medium transition-all duration-300"
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
      {/* Header - Enhanced Mobile Responsive */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 xs:h-16 sm:h-18">
            <div className="flex items-center space-x-2 xs:space-x-3 sm:space-x-4 min-w-0 flex-1">
              <h1 className="text-sm xs:text-base sm:text-lg lg:text-2xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] truncate">
                <span className="hidden sm:inline">Smart Builders & Developers </span>
                <span className="sm:hidden">Smart Builders </span>
                <span className="text-[#b48b2f]">Admin</span>
              </h1>
              {lastUpdated && (
                <div className="hidden md:flex items-center text-xs lg:text-sm text-gray-500">
                  <Clock className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                  <span className="hidden lg:inline">Last updated: </span>
                  {lastUpdated.toLocaleTimeString()}
                </div>
              )}
            </div>
            <div className="flex items-center space-x-1.5 xs:space-x-2 sm:space-x-3">
              <Button
                onClick={fetchData}
                variant="outline"
                size="sm"
                disabled={isRefreshing}
                className="flex items-center min-h-[36px] xs:min-h-[40px] px-2 xs:px-3 text-xs xs:text-sm"
              >
                <RefreshCw
                  className={`w-3 h-3 xs:w-4 xs:h-4 ${isRefreshing ? "animate-spin" : ""} ${isRefreshing ? "mr-1" : "xs:mr-2"}`}
                />
                <span className="hidden xs:inline">{isRefreshing ? "Refreshing..." : "Refresh"}</span>
              </Button>
              <Button 
                onClick={handleLogout} 
                variant="outline" 
                size="sm"
                className="flex items-center min-h-[36px] xs:min-h-[40px] px-2 xs:px-3 text-xs xs:text-sm"
              >
                <LogOut className="w-3 h-3 xs:w-4 xs:h-4 xs:mr-2" />
                <span className="hidden xs:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-4 xs:py-6 sm:py-8">
        {/* Real-Time Stats Overview - Enhanced Mobile */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-5 lg:gap-6 mb-6 xs:mb-8">
          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-2 px-3 xs:px-4 sm:px-6 pt-3 xs:pt-4 sm:pt-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm xs:text-base sm:text-lg font-semibold text-[#313131] leading-tight">
                  <span className="hidden xs:inline">Total Submissions</span>
                  <span className="xs:hidden">Submissions</span>
                </CardTitle>
                <FileText className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-[#b48b2f] flex-shrink-0" />
              </div>
            </CardHeader>
            <CardContent className="px-3 xs:px-4 sm:px-6 pb-3 xs:pb-4 sm:pb-6">
              <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-[#b48b2f] leading-tight">
                {stats.total}
              </div>
              <p className="text-xs xs:text-sm text-[#6b6b6b] mt-1 leading-tight">
                <span className="hidden xs:inline">All forms</span>
                <span className="xs:hidden">Total</span>
                {stats.total > 0 && <span className="hidden sm:inline"> (Live Data)</span>}
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-2 px-3 xs:px-4 sm:px-6 pt-3 xs:pt-4 sm:pt-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm xs:text-base sm:text-lg font-semibold text-[#313131] leading-tight">
                  <span className="hidden xs:inline">Most Popular</span>
                  <span className="xs:hidden">Popular</span>
                </CardTitle>
                <BarChart3 className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-[#b48b2f] flex-shrink-0" />
              </div>
            </CardHeader>
            <CardContent className="px-3 xs:px-4 sm:px-6 pb-3 xs:pb-4 sm:pb-6">
              <div className="text-lg xs:text-xl sm:text-2xl font-bold text-[#b48b2f] leading-tight line-clamp-1">
                {popularForm.type}
              </div>
              <p className="text-xs xs:text-sm text-[#6b6b6b] mt-1 leading-tight">
                {popularForm.count > 0
                  ? `${popularForm.count} submissions`
                  : "Waiting for data"}
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-2 px-3 xs:px-4 sm:px-6 pt-3 xs:pt-4 sm:pt-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm xs:text-base sm:text-lg font-semibold text-[#313131] leading-tight">
                  <span className="hidden xs:inline">Form Types</span>
                  <span className="xs:hidden">Types</span>
                </CardTitle>
                <Users className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-[#b48b2f] flex-shrink-0" />
              </div>
            </CardHeader>
            <CardContent className="px-3 xs:px-4 sm:px-6 pb-3 xs:pb-4 sm:pb-6">
              <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-[#b48b2f] leading-tight">
                {Object.keys(stats.byType).length}
              </div>
              <p className="text-xs xs:text-sm text-[#6b6b6b] mt-1 leading-tight">
                <span className="hidden xs:inline">Active form types</span>
                <span className="xs:hidden">Active</span>
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-2 px-3 xs:px-4 sm:px-6 pt-3 xs:pt-4 sm:pt-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm xs:text-base sm:text-lg font-semibold text-[#313131] leading-tight">
                  <span className="hidden xs:inline">Site Visits</span>
                  <span className="xs:hidden">Visits</span>
                </CardTitle>
                <Eye className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-[#b48b2f] flex-shrink-0" />
              </div>
            </CardHeader>
            <CardContent className="px-3 xs:px-4 sm:px-6 pb-3 xs:pb-4 sm:pb-6">
              <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-[#b48b2f] leading-tight">
                {visitCounter?.totalVisits?.toLocaleString('en-IN') || '0'}
              </div>
              <p className="text-xs xs:text-sm text-[#6b6b6b] mt-1 leading-tight">
                <span className="hidden sm:inline">Total visits (Today: {visitCounter?.dailyVisits || 0})</span>
                <span className="sm:hidden">Today: {visitCounter?.dailyVisits || 0}</span>
              </p>
              <div className="mt-2 xs:mt-3 flex space-x-1 xs:space-x-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs px-2 py-1 min-h-[32px] xs:min-h-[36px]"
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

        {/* Form Type Breakdown - Enhanced Mobile */}
        {Object.keys(stats.byType).length > 0 && (
          <Card className="mb-6 xs:mb-8 border-none shadow-lg">
            <CardHeader className="px-3 xs:px-4 sm:px-6">
              <CardTitle className="text-base xs:text-lg sm:text-xl font-semibold text-[#313131]">
                Form Type Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 xs:px-4 sm:px-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 xs:gap-3 sm:gap-4">
                {Object.entries(stats.byType).map(([type, count]) => (
                  <div
                    key={type}
                    className="text-center p-3 xs:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="text-lg xs:text-xl sm:text-2xl font-bold text-[#b48b2f]">
                      {count}
                    </div>
                    <div className="text-xs xs:text-sm text-[#6b6b6b] leading-tight">
                      {formatFormType(type)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submissions Management - Enhanced Mobile */}
        <Card className="border-none shadow-lg">
          <CardHeader className="px-3 xs:px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
              <div className="min-w-0 flex-1">
                <CardTitle className="text-base xs:text-lg sm:text-xl font-semibold text-[#313131] leading-tight">
                  <span className="hidden xs:inline">Form Submissions ({filteredSubmissions.length})</span>
                  <span className="xs:hidden">Submissions ({filteredSubmissions.length})</span>
                </CardTitle>
                <CardDescription className="text-xs xs:text-sm mt-1">
                  <span className="hidden sm:inline">Manage and export all form submissions</span>
                  <span className="sm:hidden">Manage submissions</span>
                </CardDescription>
              </div>
              <Button
                onClick={exportData}
                className="bg-[#b48b2f] hover:bg-[#9d7829] text-white min-h-[40px] xs:min-h-[44px] px-3 xs:px-4 text-xs xs:text-sm"
              >
                <Download className="w-3.5 h-3.5 xs:w-4 xs:h-4 mr-1.5 xs:mr-2" />
                <span className="hidden xs:inline">Export Data</span>
                <span className="xs:hidden">Export</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-3 xs:px-4 sm:px-6">
            {/* Search and Filter Controls - Mobile Optimized */}
            <div className="flex flex-col sm:flex-row gap-2 xs:gap-3 sm:gap-4 mb-4 xs:mb-5 sm:mb-6">
              <div className="flex-1 min-w-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5 xs:w-4 xs:h-4" />
                  <Input
                    placeholder="Search submissions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 xs:pl-10 min-h-[40px] xs:min-h-[44px] text-sm xs:text-base"
                  />
                </div>
              </div>
              <div className="w-full sm:w-40 md:w-48">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="min-h-[40px] xs:min-h-[44px] text-sm xs:text-base">
                    <Filter className="w-3.5 h-3.5 xs:w-4 xs:h-4 mr-1.5 xs:mr-2" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="contact">Contact Form</SelectItem>
                    <SelectItem value="quickInquiry">Quick Inquiry</SelectItem>
                    <SelectItem value="siteVisit">Site Visit</SelectItem>
                    <SelectItem value="emiCalculator">EMI Calculator</SelectItem>
                    <SelectItem value="newsletter">Newsletter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submissions Table - Mobile Responsive */}
            <div className="overflow-x-auto -mx-3 xs:-mx-4 sm:mx-0 rounded-lg border border-gray-200">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-xs xs:text-sm font-medium px-2 xs:px-3 sm:px-4 py-2 xs:py-3">
                      <span className="hidden sm:inline">ID</span>
                      <span className="sm:hidden">#</span>
                    </TableHead>
                    <TableHead className="text-xs xs:text-sm font-medium px-2 xs:px-3 sm:px-4 py-2 xs:py-3">Type</TableHead>
                    <TableHead className="text-xs xs:text-sm font-medium px-2 xs:px-3 sm:px-4 py-2 xs:py-3">
                      <span className="hidden md:inline">Timestamp</span>
                      <span className="md:hidden">Date</span>
                    </TableHead>
                    <TableHead className="text-xs xs:text-sm font-medium px-2 xs:px-3 sm:px-4 py-2 xs:py-3">
                      <span className="hidden lg:inline">Customer Info</span>
                      <span className="lg:hidden">Customer</span>
                    </TableHead>
                    <TableHead className="text-xs xs:text-sm font-medium px-2 xs:px-3 sm:px-4 py-2 xs:py-3">
                      <span className="hidden lg:inline">Contact Details</span>
                      <span className="lg:hidden">Contact</span>
                    </TableHead>
                    <TableHead className="text-xs xs:text-sm font-medium px-2 xs:px-3 sm:px-4 py-2 xs:py-3 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-mono text-xs">
                        {submission.id ? submission.id.split("_")[1]?.substring(0, 8) + "..." : "N/A"}
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
                          {submission.data?.name && (
                            <div className="font-medium text-sm">
                              {submission.data.name}
                            </div>
                          )}
                          {submission.data?.projectType && (
                            <div className="text-xs text-gray-600">
                              Project: {submission.data.projectType}
                            </div>
                          )}
                          {submission.data?.project && (
                            <div className="text-xs text-gray-600">
                              Project: {submission.data.project}
                            </div>
                          )}
                          {submission.data?.budget && (
                            <div className="text-xs text-gray-600">
                              Budget: {submission.data.budget}
                            </div>
                          )}
                          {submission.data?.preferredDate && (
                            <div className="text-xs text-gray-600">
                              Visit: {submission.data.preferredDate}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {submission.data?.email && (
                            <div className="text-sm">
                              {submission.data.email}
                            </div>
                          )}
                          {submission.data?.phone && (
                            <div className="text-sm">
                              {submission.data.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setViewingSubmission(submission)}
                            title="View Details"
                          >
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

      {/* View Submission Dialog */}
      {viewingSubmission && (
        <AlertDialog open={!!viewingSubmission} onOpenChange={() => setViewingSubmission(null)}>
          <AlertDialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#b48b2f]" />
                Submission Details
              </AlertDialogTitle>
              <AlertDialogDescription>
                Form Type: <Badge className={getFormTypeColor(viewingSubmission.formType)}>
                  {formatFormType(viewingSubmission.formType)}
                </Badge>
                <br />
                Submitted: {formatTimestamp(viewingSubmission.timestamp)}
                <br />
                ID: <code className="text-xs bg-gray-100 px-1 rounded">{viewingSubmission.id}</code>
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <div className="space-y-4 my-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Contact Information */}
                {(viewingSubmission.data?.name || viewingSubmission.data?.email || viewingSubmission.data?.phone) && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-[#313131] border-b pb-1">Contact Information</h4>
                    {viewingSubmission.data.name && (
                      <div><strong>Name:</strong> {viewingSubmission.data.name}</div>
                    )}
                    {viewingSubmission.data.email && (
                      <div><strong>Email:</strong> {viewingSubmission.data.email}</div>
                    )}
                    {viewingSubmission.data.phone && (
                      <div><strong>Phone:</strong> {viewingSubmission.data.phone}</div>
                    )}
                  </div>
                )}

                {/* Project Details */}
                {(viewingSubmission.data?.projectType || viewingSubmission.data?.project || viewingSubmission.data?.budget) && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-[#313131] border-b pb-1">Project Details</h4>
                    {viewingSubmission.data.projectType && (
                      <div><strong>Type:</strong> {viewingSubmission.data.projectType}</div>
                    )}
                    {viewingSubmission.data.project && (
                      <div><strong>Project:</strong> {viewingSubmission.data.project}</div>
                    )}
                    {viewingSubmission.data.budget && (
                      <div><strong>Budget:</strong> {viewingSubmission.data.budget}</div>
                    )}
                  </div>
                )}
              </div>

              {/* Visit Details */}
              {(viewingSubmission.data?.preferredDate || viewingSubmission.data?.preferredTime || viewingSubmission.data?.visitors) && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-[#313131] border-b pb-1">Visit Details</h4>
                  {viewingSubmission.data.preferredDate && (
                    <div><strong>Date:</strong> {viewingSubmission.data.preferredDate}</div>
                  )}
                  {viewingSubmission.data.preferredTime && (
                    <div><strong>Time:</strong> {viewingSubmission.data.preferredTime}</div>
                  )}
                  {viewingSubmission.data.visitors && (
                    <div><strong>Visitors:</strong> {viewingSubmission.data.visitors}</div>
                  )}
                </div>
              )}

              {/* EMI Calculator Details */}
              {(viewingSubmission.data?.price || viewingSubmission.data?.downPayment || viewingSubmission.data?.loanTenure) && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-[#313131] border-b pb-1">EMI Details</h4>
                  {viewingSubmission.data.price && (
                    <div><strong>Property Price:</strong> ₹{Number(viewingSubmission.data.price).toLocaleString()}</div>
                  )}
                  {viewingSubmission.data.downPayment && (
                    <div><strong>Down Payment:</strong> ₹{Number(viewingSubmission.data.downPayment).toLocaleString()}</div>
                  )}
                  {viewingSubmission.data.loanTenure && (
                    <div><strong>Loan Tenure:</strong> {viewingSubmission.data.loanTenure} years</div>
                  )}
                  {viewingSubmission.data.interestRate && (
                    <div><strong>Interest Rate:</strong> {viewingSubmission.data.interestRate}%</div>
                  )}
                  {viewingSubmission.data.emi && (
                    <div><strong>Monthly EMI:</strong> ₹{Number(viewingSubmission.data.emi).toLocaleString()}</div>
                  )}
                </div>
              )}

              {/* Message */}
              {viewingSubmission.data?.message && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-[#313131] border-b pb-1">Message</h4>
                  <div className="bg-gray-50 p-3 rounded border text-sm">
                    {viewingSubmission.data.message}
                  </div>
                </div>
              )}

              {/* Raw Data (for debugging) */}
              <details className="text-xs">
                <summary className="cursor-pointer text-gray-600 hover:text-gray-800">View Raw Data</summary>
                <pre className="bg-gray-100 p-2 rounded mt-2 overflow-x-auto text-xs">
                  {JSON.stringify(viewingSubmission.data, null, 2)}
                </pre>
              </details>
            </div>

            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setViewingSubmission(null)}>
                Close
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};
