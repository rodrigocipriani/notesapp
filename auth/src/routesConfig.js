const PUBLIC_ROUTES = ["/api/auth/google", "/api/auth/google/callback"];

const isRequiredAuth = req => PUBLIC_ROUTES.indexOf(req.path) < 0;

module.exports = { isRequiredAuth };
