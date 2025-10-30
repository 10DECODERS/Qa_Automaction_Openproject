import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Settings as SettingsIcon, Save } from "lucide-react";

const Settings = () => {
  const [apiUrl, setApiUrl] = useState("");
  const [email, setEmail] = useState("");
  const [apiToken, setApiToken] = useState("");

  useEffect(() => {
    const savedSettings = localStorage.getItem("openproject_settings");
    if (savedSettings) {
      const { apiUrl, email, apiToken } = JSON.parse(savedSettings);
      setApiUrl(apiUrl || "");
      setEmail(email || "");
      setApiToken(apiToken || "");
    }
  }, []);

  const handleSave = () => {
    if (!apiUrl || !apiToken) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate URL format
    try {
      new URL(apiUrl);
    } catch {
      toast.error("Please enter a valid URL");
      return;
    }

    const settings = {
      apiUrl: apiUrl.replace(/\/$/, ""), // Remove trailing slash
      email,
      apiToken,
    };

    localStorage.setItem("openproject_settings", JSON.stringify(settings));
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure your OpenProject integration settings
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="apiUrl">OpenProject URL</Label>
              <Input
                id="apiUrl"
                placeholder="https://openproject.inside10d.com"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                The base URL of your OpenProject instance
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Email used for OpenProject authentication
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiToken">API Token</Label>
              <Input
                id="apiToken"
                type="password"
                placeholder="••••••••••••••••••••••••••••••••••••••"
                value={apiToken}
                onChange={(e) => setApiToken(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Generate an API token from your OpenProject account settings
              </p>
            </div>

            <Button onClick={handleSave} className="w-full" size="lg">
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </Card>

        <Card className="p-4 bg-muted/50">
          <div className="flex gap-3">
            <SettingsIcon className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium">How to get your API Token</p>
              <p className="text-sm text-muted-foreground">
                1. Log in to your OpenProject instance<br />
                2. Go to My Account → Access Tokens<br />
                3. Create a new API token with appropriate permissions<br />
                4. Copy and paste it here
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
