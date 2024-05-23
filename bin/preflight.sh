npm run clean \
&& npm audit --audit-level=moderate --omit=dev \
&& npm run spell \
&& npm run format:check \
&& npm run lint:check \
&& npm run type:check \
&& npm run test \
&& npm run build \
&& npm run release:dry