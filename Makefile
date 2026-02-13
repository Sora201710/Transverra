dev:
	@echo "Starting all services..."
	# Export for the current shell and subshells
	@export ENV_PATH=/home/christopherroy/Projects/Transverra/.env; \
	(cd frontend && npm run dev) & \
	(cd backend/api && npm run dev) & \
	(cd backend/utils && fastapi dev app.py); \
	wait
