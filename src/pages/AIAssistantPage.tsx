
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Send, Brain, FileText, BarChart3, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const aiFeatures = [
  {
    icon: FileText,
    title: "Proposal Writing",
    description: "Generate professional proposals tailored to your clients",
    action: "Write Proposal"
  },
  {
    icon: Users,
    title: "Lead Scoring",
    description: "Automatically score and prioritize your leads",
    action: "Score Leads"
  },
  {
    icon: BarChart3,
    title: "Business Insights",
    description: "Get AI-powered insights from your business data",
    action: "Generate Insights"
  },
  {
    icon: Brain,
    title: "Risk Prediction",
    description: "Identify potential project risks before they happen",
    action: "Analyze Risk"
  }
];

const mockConversations = [
  {
    id: "1",
    type: "user",
    message: "Help me write a proposal for a website redesign project",
    timestamp: "10:30 AM"
  },
  {
    id: "2", 
    type: "ai",
    message: "I'd be happy to help you create a website redesign proposal. Let me gather some information first:\n\n1. What's the client's company name?\n2. What's their current website URL?\n3. What are their main pain points with the current site?\n4. What's your proposed timeline and budget range?",
    timestamp: "10:31 AM"
  },
  {
    id: "3",
    type: "user", 
    message: "The client is TechStart Inc, their current site is techstart.com, they need better mobile responsiveness and faster loading times. Budget is around $15,000 and timeline is 6-8 weeks.",
    timestamp: "10:35 AM"
  }
];

export function AIAssistantPage() {
  const [messages, setMessages] = useState(mockConversations);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      type: "user" as const,
      message: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: "ai" as const,
        message: "I'm processing your request. This is a demo response - in a real implementation, this would connect to an AI service to provide intelligent assistance.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-purple-600" />
          AI Assistant
        </h1>
        <p className="text-gray-600">Let AI help you streamline your business processes</p>
      </div>

      {/* AI Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {aiFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card 
              key={index} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedFeature === feature.title ? 'ring-2 ring-purple-500' : ''
              }`}
              onClick={() => setSelectedFeature(feature.title)}
            >
              <CardHeader className="text-center">
                <Icon className="w-8 h-8 mx-auto text-purple-600" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription className="text-sm">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  {feature.action}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              AI Chat
            </CardTitle>
            <CardDescription>
              Ask questions or request help with your business tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Messages */}
            <div className="h-96 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-lg">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-white border shadow-sm'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.message}</div>
                    <div className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-purple-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Ask me anything about your business..."
                value={inputMessage}
                onChange={(e)=> setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights Panel */}
        <Card>
          <CardHeader>
            <CardTitle>AI Insights</CardTitle>
            <CardDescription>Recent AI-generated insights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Badge className="mb-2">Lead Scoring</Badge>
              <p className="text-sm">3 high-priority leads identified based on engagement patterns</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Badge className="mb-2" variant="secondary">Risk Analysis</Badge>
              <p className="text-sm">Project "Mobile App" shows low risk with 95% on-time delivery probability</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Badge className="mb-2" variant="outline">Optimization</Badge>
              <p className="text-sm">Suggesting 15% efficiency improvement in proposal workflow</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick AI Actions</CardTitle>
          <CardDescription>Common AI-powered tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Generate Email Template
            </Button>
            <Button variant="outline" className="justify-start">
              <Users className="w-4 h-4 mr-2" />
              Analyze Client Sentiment
            </Button>
            <Button variant="outline" className="justify-start">
              <BarChart3 className="w-4 h-4 mr-2" />
              Create Performance Report
            </Button>
            <Button variant="outline" className="justify-start">
              <Brain className="w-4 h-4 mr-2" />
              Predict Project Outcome
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
