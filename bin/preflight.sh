npm run clean \
&& npm audit --audit-level=moderate --omit=dev \
&& npm run spell \
&& npm run format \
&& npm run lint \
&& npm run type \
&& npm run test \
&& npm run build \
&& npm run release:dry