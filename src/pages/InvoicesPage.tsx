
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Receipt, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockInvoices = [
  {
    id: "INV-001",
    client: "Tech Corp",
    amount: 5000,
    status: "paid",
    issueDate: "2023-12-01",
    dueDate: "2023-12-31",
    paidDate: "2023-12-15"
  },
  {
    id: "INV-002",
    client: "Startup Inc", 
    amount: 3500,
    status: "pending",
    issueDate: "2023-12-10",
    dueDate: "2024-01-10",
    paidDate: null
  },
  {
    id: "INV-003",
    client: "Fashion Brand",
    amount: 2000,
    status: "overdue",
    issueDate: "2023-11-15",
    dueDate: "2023-12-15",
    paidDate: null
  }
];

const statusConfig = {
  draft: { icon: Clock, color: "bg-gray-100 text-gray-800", label: "Draft" },
  pending: { icon: Clock, color: "bg-yellow-100 text-yellow-800", label: "Pending" },
  paid: { icon: CheckCircle, color: "bg-green-100 text-green-800", label: "Paid" },
  overdue: { icon: AlertCircle, color: "bg-red-100 text-red-800", label: "Overdue" }
};

export function InvoicesPage() {
  const [invoices] = useState(mockInvoices);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-600">Manage billing and payments</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Invoice
        </Button>
      </div>

      <div className="grid gap-6">
        {invoices.map((invoice) => {
          const StatusIcon = statusConfig[invoice.status as keyof typeof statusConfig].icon;
          return (
            <Card key={invoice.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-xl">{invoice.id}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Receipt className="w-4 h-4" />
                    {invoice.client}
                  </CardDescription>
                </div>
                <Badge className={statusConfig[invoice.status as keyof typeof statusConfig].color}>
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {statusConfig[invoice.status as keyof typeof statusConfig].label}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-green-600">
                      ${invoice.amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      Due: {new Date(invoice.dueDate).toLocaleDateString()}
                    </div>
                    {invoice.paidDate && (
                      <div className="text-sm text-green-600">
                        Paid: {new Date(invoice.paidDate).toLocaleDateString()}
                      </div>
                    )}
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
