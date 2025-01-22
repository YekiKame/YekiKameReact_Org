export default new Proxy({}, {
    get: (target, prop) => prop, // Return the class name as-is
  });
  