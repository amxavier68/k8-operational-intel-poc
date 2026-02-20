export function k8ErrorHandler(err, req, res, next) {
  const status = err.status || 500;

  console.error("k8-error:", err.message);

  res.status(status).json({
    ok: false,
    error: {
      message: err.message || "k8-internal-server-error"
    }
  });
}
