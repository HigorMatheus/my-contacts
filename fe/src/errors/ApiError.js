export default class ApiError extends Error {
  constructor(response, body) {
    super(body?.error || `${response.status} - ${response.statusText}`);
    this.name = 'ApiError';
    this.response = response;
  }
}
