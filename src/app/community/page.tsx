"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import UserCard from "@/components/UserCard";
import FilterModal, { FilterOptions } from "@/components/FilterModal";
import BottomNavigation from "@/components/BottomNavigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CommunityPage() {
  const [city, setCity] = useState<string>("New York");
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Mock user data for demonstration
  const mockUsers = [
    {
      id: "1",
      name: "Emma Johnson",
      age: 28,
      profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      nativeLanguages: [{ code: "US", name: "English" }],
      learningLanguages: [{ code: "ES", name: "Spanish" }],
      interests: ["Reading", "Hiking", "Cooking"],
    },
    {
      id: "2",
      name: "Miguel Santos",
      age: 32,
      profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel",
      nativeLanguages: [{ code: "ES", name: "Spanish" }],
      learningLanguages: [{ code: "US", name: "English" }],
      interests: ["Photography", "Travel", "Music"],
    },
    {
      id: "3",
      name: "Yuki Tanaka",
      age: 25,
      profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki",
      nativeLanguages: [{ code: "JP", name: "Japanese" }],
      learningLanguages: [{ code: "FR", name: "French" }],
      interests: ["Art", "Cinema", "Dancing"],
    },
    {
      id: "4",
      name: "Sophie Dubois",
      age: 30,
      profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
      nativeLanguages: [{ code: "FR", name: "French" }],
      learningLanguages: [{ code: "DE", name: "German" }],
      interests: ["Yoga", "Cooking", "Literature"],
    },
  ];

  // Mock cities for the dropdown
  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "San Francisco",
    "Boston",
    "Seattle",
    "Austin",
  ];

  const handleFilterApply = (filters: FilterOptions) => {
    // In a real app, this would filter the users based on the selected criteria
    console.log("Applied filters:", filters);
    setShowFilterModal(false);
  };

  const handleViewProfile = (userId: string) => {
    console.log("View profile for user:", userId);
    // In a real app, this would navigate to the user's profile
  };

  // Filter users based on search query
  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.nativeLanguages.some((lang) =>
        lang.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ) ||
      user.learningLanguages.some((lang) =>
        lang.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ) ||
      user.interests.some((interest) =>
        interest.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  return (
    <div className="flex flex-col min-h-screen bg-background pb-16">
      <div className="p-4 border-b sticky top-0 bg-background z-10">
        <h1 className="text-xl font-semibold mb-4">Community</h1>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="text-sm font-medium mr-2">City:</span>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowFilterModal(true)}
            aria-label="Filter"
          >
            <Filter className="h-5 w-5" />
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, language or interest"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              id={user.id}
              name={user.name}
              age={user.age}
              profilePicture={user.profilePicture}
              nativeLanguages={user.nativeLanguages}
              learningLanguages={user.learningLanguages}
              interests={user.interests}
              onViewProfile={handleViewProfile}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-muted-foreground mb-2">No users found</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      <FilterModal
        isOpen={showFilterModal}
        onOpenChange={setShowFilterModal}
        onApplyFilters={handleFilterApply}
      />

      <BottomNavigation />
    </div>
  );
}
