install:
	npm install
start:
	npx babel-node src/bin/gendiff.js
publish:
	npm publish --dry-run

test:
	npm test -- --coverage

test-w:
	npm run watch

lint:
	npx eslint .
