
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Clock, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockProposals = [
  {
    id: "1",
    title: "Website Redesign Project",
    client: "Tech Corp",
    amount: 15000,
    status: "pending",
    validUntil: "2024-01-15",
    createdAt: "2023-12-01"
  },
  {
    id: "2", 
    title: "Mobile App Development",
    client: "Startup Inc",
    amount: 25000,
    status: "approved",
    validUntil: "2024-02-01",
    createdAt: "2023-11-28"
  },
  {
    id: "3",
    title: "Brand Identity Package",
    client: "Fashion Brand",
    amount: 8000,
    status: "draft",
    validUntil: "2024-01-30",
    createdAt: "2023-12-05"
  }
];

const statusConfig = {
  draft: { icon: Clock, color: "bg-gray-100 text-gray-800", label: "Draft" },
  pending: { icon: Clock, color: "bg-yellow-100 text-yellow-800", label: "Pending" },
  approved: { icon: CheckCircle, color: "bg-green-100 text-green-800", label: "Approved" },
  rejected: { icon: XCircle, color: "bg-red-100 text-red-800", label: "Rejected" }
};

export function ProposalsPage() {
  const [proposals] = useState(mockProposals);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Proposals</h1>
          <p className="text-gray-600">Create and manage client proposals</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Proposal
        </Button>
      </div>

      <div className="grid gap-6">
        {proposals.map((proposal) => {
          const StatusIcon = statusConfig[proposal.status as keyof typeof statusConfig].icon;
          return (
            <Card key={proposal.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-xl">{proposal.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    {proposal.client}
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
                    <div className="text-2xl font-bold text-green-600">
                      ${proposal.amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      Valid until: {new Date(proposal.validUntil).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
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
    </div>
  );
}
