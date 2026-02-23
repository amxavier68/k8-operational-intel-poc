import jwt from "jsonwebtoken";

export function k8RequireJwt(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ ok: false, error: "k8-missing-token" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.k8Auth = payload;
    return next();
  } catch {
    return res.status(401).json({ ok: false, error: "k8-invalid-token" });
  }
}
