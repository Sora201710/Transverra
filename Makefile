dev:
	@echo "Starting all services..."
	# Export for the current shell and subshells
	# TODO: add sudo systemctl start redis to start the redis service
	# TODO: make these all log to different files
	@export ENV_PATH=/home/christopherroy/Projects/Transverra/.env; \
	(cd frontend && npm run dev) & \
	(cd backend/api && npm run dev) & \
	(cd backend/utils && fastapi dev app.py &> fastapi_errors.txt) & \
	(cd backend/utils && celery -A celery_app worker --loglevel=INFO &> celery_errors.txt)
	wait
