import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  Users, 
  FileText, 
  Calendar, 
  Download, 
  Search,
  LogOut,
  Eye,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface FormSubmission {
  id: string;
  formType: "contact" | "quickInquiry" | "siteVisit" | "emiCalculator" | "newsletter";
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
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const { toast } = useToast();

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

      if (result.success) {
        setIsLoggedIn(true);
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard",
        });
        fetchData();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const [submissionsResponse, statsResponse] = await Promise.all([
        fetch("/api/admin/submissions"),
        fetch("/api/admin/stats"),
      ]);
      
      const submissionsData = await submissionsResponse.json();
      const statsData = await statsResponse.json();
      
      setSubmissions(submissionsData);
      setStats(statsData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch dashboard data",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setSubmissions([]);
    setStats(null);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(submissions, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `form-submissions-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatFormType = (type: string) => {
    const types = {
      contact: "Contact Form",
      quickInquiry: "Quick Inquiry",
      siteVisit: "Site Visit",
      emiCalculator: "EMI Calculator",
      newsletter: "Newsletter"
    };
    return types[type as keyof typeof types] || type;
  };

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = searchTerm === "" || 
      JSON.stringify(submission.data).toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.formType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === "all" || submission.formType === filterType;
    
    return matchesSearch && matchesFilter;
  });

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-[#313131] [font-family:'Poppins',Helvetica]">
              Admin <span className="text-[#b48b2f]">Login</span>
            </CardTitle>
            <CardDescription>
              Access the BuildMasters admin dashboard
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-[#313131] [font-family:'Poppins',Helvetica]">
                BuildMasters <span className="text-[#b48b2f]">Admin</span>
              </h1>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-[#b48b2f]" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-[#313131]">{stats.total}</p>
                    <p className="text-sm text-[#6b6b6b]">Total Submissions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-[#313131]">{stats.byType.contact || 0}</p>
                    <p className="text-sm text-[#6b6b6b]">Contact Forms</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-[#313131]">{stats.byType.siteVisit || 0}</p>
                    <p className="text-sm text-[#6b6b6b]">Site Visits</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-[#313131]">{stats.byType.quickInquiry || 0}</p>
                    <p className="text-sm text-[#6b6b6b]">Quick Inquiries</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl font-bold text-[#313131] [font-family:'Poppins',Helvetica]">
                  Form Submissions
                </CardTitle>
                <CardDescription>
                  Manage and view all form submissions from your website
                </CardDescription>
              </div>
              <Button onClick={exportData} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export JSON
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search submissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="w-4 h-4 mr-2" />
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

            {/* Submissions Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Contact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell>
                        {new Date(submission.timestamp).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {formatFormType(submission.formType)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {submission.data.name && (
                            <div className="font-medium">{submission.data.name}</div>
                          )}
                          {submission.data.message && (
                            <div className="text-sm text-gray-600 truncate max-w-xs">
                              {submission.data.message}
                            </div>
                          )}
                          {submission.data.projectType && (
                            <div className="text-sm text-gray-600">
                              Project: {submission.data.projectType}
                            </div>
                          )}
                          {submission.data.visitDate && (
                            <div className="text-sm text-gray-600">
                              Visit: {submission.data.visitDate}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {submission.data.email && (
                            <div className="text-sm">{submission.data.email}</div>
                          )}
                          {submission.data.phone && (
                            <div className="text-sm">{submission.data.phone}</div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredSubmissions.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No submissions found matching your criteria
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};