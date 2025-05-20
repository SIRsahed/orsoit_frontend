/**
 * Utility functions for session management
 */

/**
 * Broadcasts a session update to all components
 * This uses localStorage to trigger a storage event that other components can listen for
 * @param updatedSession Optional session data to broadcast
 */
export function broadcastSessionUpdate(updatedSession = null) {
  // Use localStorage to broadcast the event
  localStorage.setItem("profile-updated", Date.now().toString());

  // If session data is provided, you could store it temporarily
  if (updatedSession) {
    // You could store serialized session data if needed
    // localStorage.setItem("temp-session", JSON.stringify(updatedSession));
    console.log("Session update broadcasted", updatedSession);
  }
}
