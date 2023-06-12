// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** streamEvents GET /api/sse */
export async function streamEventsUsingGET(options?: { [key: string]: any }) {
  return request<API.FluxEventData_>('/api/sse', {
    method: 'GET',
    ...(options || {}),
  });
}
