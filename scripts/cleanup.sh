#!/bin/bash

echo "🧹 Starter system cleanup..."

# Trigger koordinert cleanup
if [ -f ".claude-coordination/coordinator.js" ]; then
    echo "📡 Triggering coordinated cleanup..."
    ./.claude-coordination/coordinator.js cleanup
    ./.claude-coordination/coordinator.js server stop backend
    ./.claude-coordination/coordinator.js server stop frontend  
    ./.claude-coordination/coordinator.js server stop prisma
fi

# Stop alle Helseriet prosesser
echo "Stopper alle Helseriet backend servere..."
pkill -f "helseriet.*nodemon" 2>/dev/null

echo "Stopper alle Helseriet frontend servere..."
pkill -f "helseriet.*vite" 2>/dev/null

echo "Stopper alle Prisma Studio instanser..."
pkill -f "prisma.*studio" 2>/dev/null

# Force stop eventuelle resterende prosesser
echo "Stopper alle resterende Helseriet prosesser..."
ps aux | grep -E "helseriet" | grep -v grep | awk '{print $2}' | xargs -I {} kill -9 {} 2>/dev/null

echo "✅ Cleanup fullført!"

# Vis antall resterende prosesser
REMAINING=$(ps aux | grep -E "(node|npm|vite|prisma)" | grep -v grep | wc -l | tr -d ' ')
echo "📊 Resterende prosesser: $REMAINING"

# Vis koordineringsstatus hvis tilgjengelig
if [ -f ".claude-coordination/coordinator.js" ]; then
    echo ""
    echo "📊 Koordineringsstatus:"
    ./.claude-coordination/coordinator.js status
fi

echo ""
echo "💡 For å starte servere på nytt:"
echo "Backend:  cd helseriet-backend && npm run dev"
echo "Frontend: cd helseriet-frontend && npm run dev"