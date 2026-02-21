const pool = require('../db');

// Middleware to log sensitive admin actions
const auditLog = (actionDescription) => {
  return async (req, res, next) => {
    // We capture the original end/json methods to ensure we only log on success
    const originalJson = res.json;
    
    res.json = function (data) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        // Log the action asynchronously after sending the response
        try {
          const adminId = req.user?.id || null;
          const ipAddress = req.ip || req.connection.remoteAddress;
          const endpoint = req.originalUrl;
          
          let action = typeof actionDescription === 'function' ? actionDescription(req) : actionDescription;
          
          pool.query(
            'INSERT INTO audit_logs (admin_id, action, endpoint, ip_address) VALUES ($1, $2, $3, $4)',
            [adminId, action, endpoint, ipAddress]
          ).catch(err => console.error('Error writing audit log:', err));
        } catch (err) {
          console.error('Audit Log Error:', err);
        }
      }
      
      return originalJson.call(this, data);
    };

    next();
  };
};

module.exports = { auditLog };
