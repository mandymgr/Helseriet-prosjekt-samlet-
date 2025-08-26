#!/bin/bash

echo "🔄 Requesting frontend server start..."

# Sjekk koordinering
if [ -f ".claude-coordination/coordinator.js" ]; then
    ./.claude-coordination/coordinator.js server start frontend
    if [ $? -ne 0 ]; then
        echo "❌ Could not get permission to start frontend server"
        echo "Another Claude session may already be running it."
        ./.claude-coordination/coordinator.js status
        exit 1
    fi
fi

echo "🚀 Starting frontend server..."
cd helseriet-frontend

# Start server i bakgrunnen og fang PID
npm run dev &
FRONTEND_PID=$!

# Rapporter til koordinering
if [ -f "../.claude-coordination/coordinator.js" ]; then
    sleep 2  # Gi server tid til å starte
    ../.claude-coordination/coordinator.js server running frontend $FRONTEND_PID
fi

echo "✅ Frontend server startet (PID: $FRONTEND_PID)"
echo "🌐 Tilgjengelig på: http://localhost:5173"

# Vent på at serveren kjører
wait $FRONTEND_PID