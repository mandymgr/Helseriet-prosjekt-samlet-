#!/bin/bash

echo "🔄 Requesting backend server start..."

# Sjekk koordinering
if [ -f ".claude-coordination/coordinator.js" ]; then
    ./.claude-coordination/coordinator.js server start backend
    if [ $? -ne 0 ]; then
        echo "❌ Could not get permission to start backend server"
        echo "Another Claude session may already be running it."
        ./.claude-coordination/coordinator.js status
        exit 1
    fi
fi

echo "🚀 Starting backend server..."
cd helseriet-backend

# Start server i bakgrunnen og fang PID
npm run dev &
BACKEND_PID=$!

# Rapporter til koordinering
if [ -f "../.claude-coordination/coordinator.js" ]; then
    sleep 2  # Gi server tid til å starte
    ../.claude-coordination/coordinator.js server running backend $BACKEND_PID
fi

echo "✅ Backend server startet (PID: $BACKEND_PID)"
echo "🌐 Tilgjengelig på: http://localhost:3001"

# Vent på at serveren kjører
wait $BACKEND_PID