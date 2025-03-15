# Use Node.js LTS version
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy all project files
COPY . .

# Build the Next.js app
RUN yarn build

# Expose port 3000 for Next.js
EXPOSE 3000

# Start the Next.js server
CMD ["yarn", "start"]
