
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Receipt, Clock, CheckCircle, AlertCircle, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useInvoices } from "@/hooks/useInvoices";
import { CreateInvoiceDialog } from "@/components/crm/CreateInvoiceDialog";
import { EditInvoiceDialog } from "@/components/crm/EditInvoiceDialog";

const statusConfig = {
  draft: { icon: Clock, color: "bg-gray-100 text-gray-800", label: "Draft" },
  sent: { icon: Clock, color: "bg-blue-100 text-blue-800", label: "Sent" },
  paid: { icon: CheckCircle, color: "bg-green-100 text-green-800", label: "Paid" },
  overdue: { icon: AlertCircle, color: "bg-red-100 text-red-800", label: "Overdue" },
  cancelled: { icon: AlertCircle, color: "bg-gray-100 text-gray-800", label: "Cancelled" }
};

export function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<any>(null);
  
  const { data: invoices, isLoading } = useInvoices();

  const filteredInvoices = invoices?.filter(invoice => {
    const matchesSearch = invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.clients?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
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
          <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-600">Manage billing and payments</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="bg-cliento-blue hover:bg-cliento-blue/90">
          <Plus className="w-4 h-4 mr-2" />
          New Invoice
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search invoices..."
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
          <option value="sent">Sent</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="grid gap-6">
        {filteredInvoices?.map((invoice) => {
          const StatusIcon = statusConfig[invoice.status as keyof typeof statusConfig].icon;
          return (
            <Card key={invoice.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-xl">{invoice.invoice_number}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Receipt className="w-4 h-4" />
                    {invoice.clients?.name || 'No client assigned'}
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
                      ${invoice.total_amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      Due: {new Date(invoice.due_date).toLocaleDateString()}
                    </div>
                    {invoice.paid_date && (
                      <div className="text-sm text-green-600">
                        Paid: {new Date(invoice.paid_date).toLocaleDateString()}
                      </div>
                    )}
                    {invoice.notes && (
                      <p className="text-sm text-gray-600 line-clamp-2">{invoice.notes}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditingInvoice(invoice)}
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

      {filteredInvoices?.length === 0 && (
        <div className="text-center py-12">
          <Receipt className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
          <p className="text-gray-600 mb-4">Create your first invoice to get started</p>
          <Button onClick={() => setShowCreateDialog(true)} className="bg-cliento-blue hover:bg-cliento-blue/90">
            <Plus className="w-4 h-4 mr-2" />
            New Invoice
          </Button>
        </div>
      )}

      <CreateInvoiceDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog} 
      />
      
      {editingInvoice && (
        <EditInvoiceDialog 
          invoice={editingInvoice}
          open={!!editingInvoice} 
          onOpenChange={() => setEditingInvoice(null)} 
        />
      )}
    </div>
  );
}
