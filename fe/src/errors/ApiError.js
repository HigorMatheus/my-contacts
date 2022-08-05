export default class ApiError extends Error {
  constructor(response, body) {
    super();
    this.name = 'ApiError';
    this.response = response;
    this.message = body?.error || `${response.status} - ${response.statusText}`;
    this.body = body;
  }
}
