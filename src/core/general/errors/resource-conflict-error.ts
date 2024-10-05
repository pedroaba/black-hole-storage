import type { UseCaseError } from './use-case-error'

export class ResourceConflictError extends Error implements UseCaseError {
    constructor() {
        super('Resource already exists')
    }
}
