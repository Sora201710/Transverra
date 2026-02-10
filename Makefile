dev:
	@echo "Starting all services..."
	(cd frontend && npm run dev) &
	(cd backend/src/api && npm run dev)
	wait