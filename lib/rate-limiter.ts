// Simple in-memory rate limiter
// For production, consider using Redis for distributed rate limiting

interface RateLimitEntry {
    count: number
    resetTime: number
}

const rateLimits = new Map<string, RateLimitEntry>()

const RATE_LIMITS = {
    starter: 10,      // requests per minute
    professional: 50,
    enterprise: 200
}

export function checkRateLimit(userId: string, plan: string): { allowed: boolean; limit: number; remaining: number; resetIn: number } {
    const limit = RATE_LIMITS[plan as keyof typeof RATE_LIMITS] || 10
    const now = Date.now()
    const key = `${userId}`

    const entry = rateLimits.get(key)

    // No entry or reset time passed - create new entry
    if (!entry || now > entry.resetTime) {
        rateLimits.set(key, {
            count: 1,
            resetTime: now + 60000 // 60 seconds from now
        })

        return {
            allowed: true,
            limit,
            remaining: limit - 1,
            resetIn: 60
        }
    }

    // Check if limit exceeded
    if (entry.count >= limit) {
        return {
            allowed: false,
            limit,
            remaining: 0,
            resetIn: Math.ceil((entry.resetTime - now) / 1000)
        }
    }

    // Increment count
    entry.count++
    rateLimits.set(key, entry)

    return {
        allowed: true,
        limit,
        remaining: limit - entry.count,
        resetIn: Math.ceil((entry.resetTime - now) / 1000)
    }
}

// Cleanup old entries every 5 minutes
setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of rateLimits.entries()) {
        if (now > entry.resetTime + 300000) { // 5 minutes past reset
            rateLimits.delete(key)
        }
    }
}, 300000)