@echo off
echo Building Tillit MES Node...
call npm run build

echo Starting N8N with Tillit MES Node...
docker-compose up -d

echo.
echo N8N is starting up...
echo Once ready, access it at: http://localhost:5678
echo Login: admin / password
echo.
echo To check logs: docker-compose logs -f
echo To stop: docker-compose down
echo.
pause
