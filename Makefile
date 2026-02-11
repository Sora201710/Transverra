dev:
	@echo "Starting all services..."
	(cd frontend && npm run dev) &
	(cd backend/api && npm run dev)
	wait