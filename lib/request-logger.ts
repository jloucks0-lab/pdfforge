import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface RequestLogData {
    userId: string
    apiKey: string
    endpoint: string
    method: string
    statusCode: number
    responseTimeMs?: number
    errorMessage?: string
    requestParams?: any
    ipAddress?: string
    userAgent?: string
}

export async function logRequest(data: RequestLogData) {
    try {
        // Sanitize request params - don't log sensitive data
        const sanitizedParams = data.requestParams ? {
            hasHtml: !!data.requestParams.html,
            hasUrl: !!data.requestParams.url,
            options: data.requestParams.options,
            batchSize: data.requestParams.batch?.length
        } : null

        await supabase
            .from('request_logs')
            .insert({
                user_id: data.userId,
                api_key: data.apiKey,
                endpoint: data.endpoint,
                method: data.method,
                status_code: data.statusCode,
                response_time_ms: data.responseTimeMs,
                error_message: data.errorMessage,
                request_params: sanitizedParams,
                ip_address: data.ipAddress,
                user_agent: data.userAgent
            })
    } catch (error) {
        console.error('Failed to log request:', error)
        // Don't throw - logging failures shouldn't break the API
    }
}