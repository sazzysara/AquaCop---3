# ─────────────────────────────────────────────────────────────
# AquaCop Backend Dockerfile (Multi-Stage Production Build)
# Python 3.12-slim based with non-root security & geospatial libs
# ─────────────────────────────────────────────────────────────

# Stage 1: Build & Dependencies
FROM python:3.12-slim AS builder

WORKDIR /build

# Install build dependencies for geospatial libraries (GDAL, GEOS, PROJ)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    g++ \
    libgdal-dev \
    libgeos-dev \
    libproj-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt


# Stage 2: Minimal Runtime Environment
FROM python:3.12-slim AS runner

WORKDIR /app

# Install runtime shared libraries and curl for container healthcheck
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    libgdal-dev \
    libgeos-dev \
    sqlite3 \
    && rm -rf /var/lib/apt/lists/*

# Create dedicated non-root application user
RUN groupadd -g 1001 appgroup && \
    useradd -u 1001 -g appgroup -s /bin/bash -m appuser

# Copy installed python wheels from builder
COPY --from=builder /root/.local /home/appuser/.local

# Ensure python user bin is on PATH
ENV PATH="/home/appuser/.local/bin:${PATH}" \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PORT=8000 \
    CACHE_DIR="/app/cache" \
    DATABASE_URL="sqlite:////app/data/aquacop.db"

# Create data and cache directories with appropriate permissions
RUN mkdir -p /app/data /app/cache && \
    chown -R appuser:appgroup /app

# Copy application code
COPY --chown=appuser:appgroup . /app

# Switch to non-root user
USER appuser

EXPOSE 8000

# Container health probe
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD curl -f http://localhost:8000/api/health || exit 1

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
