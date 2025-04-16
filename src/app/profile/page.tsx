"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LogOut, Settings, Bell, Globe, Pencil } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

export default function ProfilePage() {
  // Mock user data - in a real app this would come from your auth/database
  const user = {
    name: "Sarah Johnson",
    city: "Berlin",
    age: 28,
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    nativeLanguages: [{ code: "EN", name: "English", flag: "🇬🇧" }],
    learningLanguages: [
      { code: "DE", name: "German", flag: "🇩🇪" },
      { code: "FR", name: "French", flag: "🇫🇷" },
    ],
    interests: ["Reading", "Hiking", "Photography", "Cooking", "Travel"],
  };

  return (
    <div className="min-h-screen bg-background p-4 pb-16">
      {/* Top Bar */}
      <div className="flex items-center justify-center mb-6 sticky top-0 bg-background z-10 py-2">
        <h1 className="text-xl font-semibold">My Profile</h1>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.profilePicture} alt={user.name} />
            <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-0 right-0 rounded-full bg-primary text-primary-foreground h-8 w-8"
            aria-label="Edit profile picture"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>

        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-muted-foreground">
          {user.city}, {user.age}
        </p>
      </div>

      {/* Languages Section */}
      <Card className="mb-6 shadow-sm">
        <CardContent className="pt-6">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Native Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.nativeLanguages.map((lang) => (
                <Badge
                  key={lang.code}
                  variant="outline"
                  className="text-sm py-1"
                >
                  {lang.flag} {lang.name}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Learning Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.learningLanguages.map((lang) => (
                <Badge key={lang.code} className="text-sm py-1">
                  {lang.flag} {lang.name}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interests Section */}
      <Card className="mb-6 shadow-sm">
        <CardContent className="pt-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {user.interests.map((interest) => (
              <Badge
                key={interest}
                variant="secondary"
                className="text-sm py-1"
              >
                {interest}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Settings Section */}
      <Card className="shadow-sm">
        <CardContent className="pt-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Settings
          </h3>

          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start text-left">
              <Globe className="mr-2 h-4 w-4" />
              Change language
            </Button>

            <Button variant="ghost" className="w-full justify-start text-left">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>

            <Separator className="my-2" />

            <Button
              variant="ghost"
              className="w-full justify-start text-left text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>

      <BottomNavigation />
    </div>
  );
}
