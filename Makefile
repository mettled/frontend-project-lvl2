install:
	npm install
start:
	npx babel-node src/bin/gendiff.js
publish:
	npm publish --dry-run

test:
	npm test -- --coverage

lint:
	npx eslint .
