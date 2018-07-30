build:
	npm --version
	# Pin the npm version to 6.2.0
	# Using npx is a workaround for npm<5.6 not being able to self update
	# See: https://github.com/ipfs/ci-websites/issues/3
	npx npm@5.6 i -g npm@6.2.0
	npm --version
	npm ci
	npm run lint
	CI=true npm run test
	npm run build
