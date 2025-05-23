"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { handleDisconnection } from "@/utils/disconnectionService";
import { DebugInfo } from "../types";

// Type definitions for server response

interface UseRoomConnectionProps {
  roomName: string;
  username: string;
  useDemo?: boolean;
}

interface UseRoomConnectionResult {
  token: string;
  error: string;
  isLoading: boolean;
  debugInfo: DebugInfo | null;
  usingDemoServer: boolean;
  liveKitUrl: string;
  participantCount: number;
  isRedirecting: boolean;
  retryConnection: () => Promise<void>;
  toggleDemoServer: () => void;
  handleOtherParticipantDisconnected: (otherUsername: string) => void;
}

export function useRoomConnection({
  roomName,
  username,
  useDemo = false,
}: UseRoomConnectionProps): UseRoomConnectionResult {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [usingDemoServer, setUsingDemoServer] = useState(useDemo);
  const [liveKitUrl, setLiveKitUrl] = useState("");
  const [participantCount, setParticipantCount] = useState(0);
  const [isRedirecting, setIsRedirecting] = useState(false);
  // Use ref to track if navigation has been initiated
  const hasInitiatedNavigation = useRef(false);
  // Use ref to track if disconnect action has been triggered
  const hasTriggeredDisconnectAction = useRef(false);
  // Track if connection has been stable
  const hasEstablishedStableConnection = useRef(false);
  // Track cleanup state to prevent multiple calls
  const isCleaningUp = useRef(false);

  // Reset navigation state when room or username changes
  useEffect(() => {
    setIsRedirecting(false);
    hasInitiatedNavigation.current = false;
    hasTriggeredDisconnectAction.current = false;
    hasEstablishedStableConnection.current = false;
    isCleaningUp.current = false;
  }, [roomName, username]);

  // Get token from the API
  const fetchToken = useCallback(
    async (useDemoServer: boolean) => {
      setIsLoading(true);
      setError("");

      try {
        // Ensure room name is sanitized
        const safeRoomName = roomName.replace(/[^a-zA-Z0-9-]/g, "");
        if (safeRoomName.length === 0) {
          setError(
            "Invalid room name. Please use only letters, numbers, and hyphens."
          );
          setIsLoading(false);
          return false;
        }

        console.log(
          `Attempting to get token for room: ${safeRoomName}, user: ${username}, useDemo: ${useDemoServer}`
        );

        // Set LiveKit URL immediately based on demo status
        if (useDemoServer) {
          setLiveKitUrl("wss://demo.livekit.cloud");
        } else {
          const publicUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL || "";
          setLiveKitUrl(publicUrl);
          console.log(`Using configured LiveKit URL: ${publicUrl}`);
        }

        const response = await fetch(
          `/api/get-livekit-token?room=${safeRoomName}&username=${username}&useDemo=${useDemoServer}&initialMatching=true`
        );
        const data = await response.json();

        if (data.error) {
          console.error(`Token error: ${data.error}`);
          // Set specific error message for room full condition
          if (data.error.includes("Room is full")) {
            setError(
              "This room is already full (maximum 2 participants allowed). Please try a different room."
            );
          } else {
            setError(`Failed to get token: ${data.error}`);
          }
          return false;
        }

        console.log("Successfully received token");

        // Log the debug info
        if (data.debug) {
          console.log("Debug info:", data.debug);
          setDebugInfo(data.debug);

          // Update participant count if available
          if (data.participantCount !== undefined) {
            setParticipantCount(data.participantCount);
            console.log(
              `Initial participant count from server: ${data.participantCount}`
            );
          }
        }

        // Make sure the token is a string
        if (typeof data.token === "string") {
          console.log(`Token received (length: ${data.token.length})`);
          setToken(data.token);
          
          // Mark connection as stable after a short delay
          // This prevents premature disconnection handling during initial connection
          setTimeout(() => {
            hasEstablishedStableConnection.current = true;
            console.log("Connection marked as stable");
          }, 3000);
          
          return true;
        } else {
          console.error("Invalid token format received:", typeof data.token);
          setError("Invalid token format received from server");
          return false;
        }
      } catch (error: unknown) {
        console.error("Failed to get token:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        setError(`Error fetching token: ${errorMessage}`);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [roomName, username]
  );

  // Handle when another participant disconnects
  const handleOtherParticipantDisconnected = useCallback(
    (otherUsername: string) => {
      console.log(
        `Other participant ${otherUsername} disconnected, redirecting to initial screen`
      );

      // Don't do anything if we've already triggered disconnect action
      if (hasTriggeredDisconnectAction.current) {
        console.log("Already handled disconnect action, skipping");
        return;
      }

      // Don't handle disconnections until we have a stable connection
      if (!hasEstablishedStableConnection.current) {
        console.log("Connection not yet stable, ignoring disconnection event");
        return;
      }

      // Mark that we've handled the disconnection so we don't trigger this again
      hasTriggeredDisconnectAction.current = true;

      // Add a longer grace period to avoid premature disconnection handling
      // This helps with initial connection issues and network fluctuations
      setTimeout(() => {
        // Use the disconnection service to handle this event
        handleDisconnection({
          username: username, // Current user
          otherUsername: otherUsername, // User who disconnected
          roomName: roomName,
          reason: "user_disconnected",
          onComplete: (result) => {
            console.log("Disconnection response:", result);
            
            // Navigate back to video chat page with reset flag
            if (!hasInitiatedNavigation.current) {
              hasInitiatedNavigation.current = true;
              setIsRedirecting(true);
              
              // The navigation will be handled by the disconnection service
              console.log("Disconnection service handling navigation");
            }
          }
        }).catch((error) => {
          console.error("Error notifying server about disconnection:", error);
        });
      }, 3000); // 3 seconds grace period for connection issues
    },
    [roomName, username]
  );

  // Toggle between normal and demo server
  const toggleDemoServer = () => {
    setUsingDemoServer(!usingDemoServer);
  };

  // Try connection again
  const retryConnection = async () => {
    await fetchToken(usingDemoServer);
  };

  // Initial token fetch
  useEffect(() => {
    fetchToken(usingDemoServer);
  }, [fetchToken, usingDemoServer]);

  // Clean up when the component unmounts
  useEffect(() => {
    // Set up a flag to identify if this is a quick unmount (likely a navigation issue)
    const mountTime = Date.now();
    
    return () => {
      // Only perform cleanup if we have a username and room name and haven't already cleaned up
      // AND the component was mounted for at least 3 seconds (to prevent cleanup on quick navigation)
      const unmountTime = Date.now();
      const componentLifetime = unmountTime - mountTime;
      
      // Check if we should skip disconnection (set by StableRoomConnector)
      const shouldSkipDisconnect = typeof window !== 'undefined' && 
        window.sessionStorage.getItem('skipDisconnect') === 'true';
      
      if (shouldSkipDisconnect) {
        console.log(`Skipping disconnect for ${username} due to skipDisconnect flag`);
        return;
      }
      
      if (username && roomName && !isCleaningUp.current && 
          hasEstablishedStableConnection.current && 
          componentLifetime > 5000) { // Increased from 3000 to 5000 ms
        isCleaningUp.current = true;
        console.log(`Cleanup on unmount for user ${username} in room ${roomName} after ${componentLifetime}ms`);
        
        // Use disconnection service for cleanup
        handleDisconnection({
          username, 
          roomName,
          reason: "component_cleanup",
          // Use keepalive to ensure the request completes even if the page is unloading
        }).catch(e => {
          console.error("Error during cleanup:", e);
        });
      } else if (componentLifetime <= 5000 || shouldSkipDisconnect) { // Increased from 3000 to 5000 ms
        console.log(`Skipping cleanup for quick unmount (${componentLifetime}ms) or navigation - likely a navigation issue`);
      }
    };
  }, [username, roomName]);

  return {
    token,
    error,
    isLoading,
    debugInfo,
    usingDemoServer,
    liveKitUrl,
    participantCount,
    isRedirecting,
    retryConnection,
    toggleDemoServer,
    handleOtherParticipantDisconnected,
  };
} 