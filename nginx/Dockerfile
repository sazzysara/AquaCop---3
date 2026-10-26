# ─────────────────────────────────────────────────────────────
# AquaCop Nginx Reverse Proxy Dockerfile
# Lean Alpine-based reverse proxy with active healthcheck
# ─────────────────────────────────────────────────────────────
FROM nginx:alpine

# Install curl for health monitoring probe
RUN apk add --no-cache curl

# Remove default configuration and place custom reverse proxy config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=20s --timeout=5s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:80/nginx-health || exit 1

CMD ["nginx", "-g", "daemon off;"]
