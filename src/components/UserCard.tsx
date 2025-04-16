import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface Language {
  code: string;
  name: string;
}

interface UserCardProps {
  id?: string;
  name?: string;
  age?: number;
  profilePicture?: string;
  nativeLanguages?: Language[];
  learningLanguages?: Language[];
  interests?: string[];
  onViewProfile?: (userId: string) => void;
}

export default function UserCard({
  id = "1",
  name = "Sarah Johnson",
  age = 28,
  profilePicture = "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  nativeLanguages = [{ code: "US", name: "English" }],
  learningLanguages = [{ code: "ES", name: "Spanish" }],
  interests = ["Travel", "Photography", "Cooking"],
  onViewProfile = () => {},
}: UserCardProps) {
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  // Function to get flag emoji from country code
  const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  return (
    <Card className="w-full max-w-[335px] overflow-hidden bg-card">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={profilePicture} alt={name} />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">
                {name}, {age}
              </h3>
            </div>

            <div className="mt-2">
              <div className="flex items-center space-x-2">
                {nativeLanguages.map((lang, i) => (
                  <span
                    key={`native-${i}`}
                    className="inline-flex items-center"
                  >
                    <span className="mr-1">{getFlagEmoji(lang.code)}</span>
                    <span className="text-sm">{lang.name}</span>
                  </span>
                ))}
                <ArrowRight className="h-4 w-4 mx-1" />
                {learningLanguages.map((lang, i) => (
                  <span
                    key={`learning-${i}`}
                    className="inline-flex items-center"
                  >
                    <span className="mr-1">{getFlagEmoji(lang.code)}</span>
                    <span className="text-sm">{lang.name}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1">
              {interests.map((interest, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-end">
        <Button size="sm" onClick={() => onViewProfile(id)}>
          View Profile
        </Button>
      </CardFooter>
    </Card>
  );
}
