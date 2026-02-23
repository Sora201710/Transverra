dev:
	@echo "Starting all services..."
	sudo systemctl start redis
	sudo systemctl start mongod

	@echo "App is running at http://localhost:5173"
	@export ENV_PATH=/home/christopherroy/Projects/Transverra/.env; \
	(cd frontend && npm run dev &> /home/christopherroy/Projects/Transverra/logs/react_log.txt) & \
	(cd backend/api && npm run dev &> /home/christopherroy/Projects/Transverra/logs/express_log.txt) & \
	(cd backend/utils && fastapi dev app.py &> /home/christopherroy/Projects/Transverra/logs/fastapi_log.txt) & \
	(cd backend/utils && celery -A celery_app worker --loglevel=INFO &> /home/christopherroy/Projects/Transverra/logs/celery_log.txt)

	wait