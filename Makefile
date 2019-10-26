install:
	npm install

test:
	npm test

lint:
	npx eslint .

start:
	npx babel-node src/bin/gendiff.js

prepublish:
	npm publish --dry-run
