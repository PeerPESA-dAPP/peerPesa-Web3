"use client"

import { useState } from "react"
import { Moon, Sun, User, Shield, Globe, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

interface SettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const [darkMode, setDarkMode] = useState(false)
  const [biometricAuth, setBiometricAuth] = useState(true)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    // In a real app, you would apply the dark mode class to the document here
    if (!darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Manage your account settings and preferences.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4 py-4">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                <User className="mr-2 h-4 w-4" />
                Change Photo
              </Button>
            </div>

            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Display Name</Label>
                <Input id="name" value="John Doe" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value="john.doe@peerpesa.com" />
              </div>
            </div>

            <Button className="w-full">Save Changes</Button>
          </TabsContent>

          <TabsContent value="security" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Biometric Authentication</Label>
                  <p className="text-sm text-muted-foreground">Use Face ID or fingerprint to confirm transactions</p>
                </div>
                <Switch checked={biometricAuth} onCheckedChange={setBiometricAuth} />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" />
              </div>

              <Button className="w-full">
                <Shield className="mr-2 h-4 w-4" />
                Update Password
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Toggle between light and dark theme</p>
                </div>
                <Switch
                  checked={darkMode}
                  onCheckedChange={toggleDarkMode}
                  icons={{
                    checked: <Moon className="h-4 w-4" />,
                    unchecked: <Sun className="h-4 w-4" />,
                  }}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Language</Label>
                  <p className="text-sm text-muted-foreground">Select your preferred language</p>
                </div>
                <Button variant="outline" size="sm">
                  <Globe className="mr-2 h-4 w-4" />
                  English
                </Button>
              </div>
            </div>

            <Separator className="my-4" />

            <Button variant="destructive" className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
