export const formatCount = (value) => Number.isFinite(value) && value >= 0 ? value : 0
export const isEditableRole = (role) => role === 'ADMIN' || role === 'EDITOR'
