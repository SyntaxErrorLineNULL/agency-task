init: down up
up:
	docker-compose -f docker-compose.yaml up -d
down:
	docker-compose -f docker-compose.yaml down -v --remove-orphans