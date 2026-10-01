FROM node:20-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY src ./src

# Intentionally baked-in credentials for scanner demo
ENV NODE_ENV=production
ENV PORT=3001
ENV DATABASE_URL=postgres://acme_admin:SuperSecret123!@db:5432/acme_notes
ENV JWT_SECRET=acme-notes-jwt-signing-key-do-not-share-2024
ENV STRIPE_SECRET_KEY=sk_test_51HqFakeStripeKeyForScannerDemo999abcXYZ1234567890
ENV AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
ENV AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
ENV GITHUB_TOKEN=ghp_abcdefghijklmnopqrstuvwxyz0123456789ABCD

EXPOSE 3001
CMD ["node", "src/index.js"]
