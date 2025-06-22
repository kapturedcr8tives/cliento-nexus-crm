
import React, { useState } from 'react';
import { Plus, Search, Filter, Mail, Phone, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useClients } from '@/hooks/useClients';
import { CreateClientDialog } from './CreateClientDialog';

export const ClientsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { data: clients, isLoading } = useClients();

  const filteredClients = clients?.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cliento-blue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600">Manage your client relationships</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="bg-cliento-blue hover:bg-cliento-blue/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients?.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="truncate">{client.name}</span>
                {client.tags && client.tags.length > 0 && (
                  <Badge variant="secondary">{client.tags[0]}</Badge>
                )}
              </CardTitle>
              {client.company && (
                <div className="flex items-center text-sm text-gray-600">
                  <Building2 className="w-4 h-4 mr-1" />
                  {client.company}
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-3">
              {client.email && (
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="truncate">{client.email}</span>
                </div>
              )}
              {client.phone && (
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {client.phone}
                </div>
              )}
              {client.notes && (
                <p className="text-sm text-gray-600 line-clamp-2">{client.notes}</p>
              )}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-gray-500">
                  Added {new Date(client.created_at).toLocaleDateString()}
                </span>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients?.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first client</p>
          <Button onClick={() => setShowCreateDialog(true)} className="bg-cliento-blue hover:bg-cliento-blue/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Client
          </Button>
        </div>
      )}

      <CreateClientDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog} 
      />
    </div>
  );
};
