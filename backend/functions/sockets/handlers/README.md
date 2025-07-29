# Socket Handler Modules

This directory contains the modularized socket event handlers, refactored from the original large `socketHandler.js` file.

## Structure

```
handlers/
├── index.js                    # Main exports for all handlers
├── userRegistrationHandler.js  # User socket registration and mapping
├── messageHandler.js           # Message sending and receiving
├── invitationHandler.js        # Connection invitations
├── typingHandler.js            # Typing indicators
├── videoCallHandler.js         # Video call signaling
└── disconnectHandler.js        # Socket disconnection and cleanup
```

## Modules

### userRegistrationHandler.js

- Manages user socket registration
- Handles multiple tab blocking
- Maintains user-to-socket mapping
- Provides cleanup utilities

### messageHandler.js

- Handles message sending between users
- Integrates with message saving to database
- Manages message broadcasting to receivers

### invitationHandler.js

- Manages connection invitations
- Updates database for invitation status
- Notifies recipients of new invitations

### typingHandler.js

- Handles typing indicator events
- Manages auto-timeout for typing indicators
- Provides cleanup for typing timeouts

### videoCallHandler.js

- Manages video call signaling
- Handles call initiation, acceptance, rejection
- Manages call timeouts and cleanup

### disconnectHandler.js

- Handles socket disconnection events
- Orchestrates cleanup across all modules
- Removes user from maps and clears timeouts

## Usage

The main `socketHandler.js` file now imports and orchestrates all these modular handlers:

```javascript
import {
  handleUserRegistration,
  handleMessages,
  handleInvitations,
  handleTypingIndicators,
  handleVideoCalls,
  handleDisconnection,
} from "./sockets/handlers/index.js";

export const socketEventHandlers = (socket, io) => {
  // Register all modularized handlers
  handleUserRegistration(socket, io);
  handleMessages(socket, io);
  handleInvitations(socket, io);
  handleTypingIndicators(socket, io);
  handleVideoCalls(socket, io);
  handleDisconnection(socket, io);
};
```

## Benefits

1. **Separation of Concerns**: Each module handles a specific functionality
2. **Maintainability**: Easier to modify individual features without affecting others
3. **Testability**: Each module can be tested independently
4. **Readability**: Smaller, focused files are easier to understand
5. **Reusability**: Individual handlers can be reused or disabled as needed
