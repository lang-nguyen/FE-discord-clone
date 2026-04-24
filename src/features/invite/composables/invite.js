import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export function useInvite() {
  const { inviteCode } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inviteData, setInviteData] = useState(null);

  useEffect(() => {
    // Simulate API call to fetch invite details by code
    setIsLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      if (inviteCode === 'invalid') {
        setError("Invalid invite code");
        setInviteData(null);
      } else {
        setInviteData({
          inviter: {
            username: "HIN",
            globalName: ".hpsd",
            avatar: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=250&auto=format&fit=crop"
          },
          server: {
            name: "Discord-Clone",
            icon: null, // null means use default icon
            onlineCount: 1,
            memberCount: 3
          }
        });
      }
      setIsLoading(false);
    }, 500); // Fake delay

    return () => clearTimeout(timer);
  }, [inviteCode]);

  const handleAccept = async () => {
    // API call to join server
    console.log("Accepting invite:", inviteCode);
  };

  return {
    inviteCode,
    isLoading,
    error,
    inviteData,
    handleAccept
  };
}
