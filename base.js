const spec = funcs => prev => Object.keys(prev)
.map(k => ({ [k]: funcs[k](prev) }))
.reduce((acc, v) => ({ ...acc, ...v }), {});