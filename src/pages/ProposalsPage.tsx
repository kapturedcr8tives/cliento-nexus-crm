
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, FileText, Clock, CheckCircle, XCircle, Search, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useProposals } from "@/hooks/useProposals";
import { CreateProposalDialog } from "@/components/crm/CreateProposalDialog";
import { EditProposalDialog } from "@/components/crm/EditProposalDialog";

const statusConfig = {
  draft: { icon: Clock, color: "bg-gray-100 text-gray-800", label: "Draft" },
  pending: { icon: Clock, color: "bg-yellow-100 text-yellow-800", label: "Pending" },
  approved: { icon: CheckCircle, color: "bg-green-100 text-green-800", label: "Approved" },
  rejected: { icon: XCircle, color: "bg-red-100 text-red-800", label: "Rejected" }
};

export function ProposalsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingProposal, setEditingProposal] = useState<any>(null);
  
  const { data: proposals, isLoading } = useProposals();

  const filteredProposals = proposals?.filter(proposal => {
    const matchesSearch = proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proposal.clients?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || proposal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cliento-blue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Proposals</h1>
          <p className="text-gray-600">Create and manage client proposals</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="bg-cliento-blue hover:bg-cliento-blue/90">
          <Plus className="w-4 h-4 mr-2" />
          New Proposal
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search proposals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="grid gap-6">
        {filteredProposals?.map((proposal) => {
          const StatusIcon = statusConfig[proposal.status as keyof typeof statusConfig].icon;
          return (
            <Card key={proposal.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-xl">{proposal.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    {proposal.clients?.name || proposal.leads?.name || 'No client assigned'}
                  </CardDescription>
                </div>
                <Badge className={statusConfig[proposal.status as keyof typeof statusConfig].color}>
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {statusConfig[proposal.status as keyof typeof statusConfig].label}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    {proposal.amount && (
                      <div className="text-2xl font-bold text-green-600">
                        ${proposal.amount.toLocaleString()}
                      </div>
                    )}
                    {proposal.valid_until && (
                      <div className="text-sm text-gray-500">
                        Valid until: {new Date(proposal.valid_until).toLocaleDateString()}
                      </div>
                    )}
                    {proposal.content && (
                      <p className="text-sm text-gray-600 line-clamp-2">{proposal.content}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditingProposal(proposal)}
                    >
                      Edit
                    </Button>
                    <Button size="sm">
                      Send
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredProposals?.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No proposals found</h3>
          <p className="text-gray-600 mb-4">Create your first proposal to get started</p>
          <Button onClick={() => setShowCreateDialog(true)} className="bg-cliento-blue hover:bg-cliento-blue/90">
            <Plus className="w-4 h-4 mr-2" />
            New Proposal
          </Button>
        </div>
      )}

      <CreateProposalDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog} 
      />
      
      {editingProposal && (
        <EditProposalDialog 
          proposal={editingProposal}
          open={!!editingProposal} 
          onOpenChange={() => setEditingProposal(null)} 
        />
      )}
    </div>
  );
}
