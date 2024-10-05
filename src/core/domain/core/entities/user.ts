import { Entity } from '@core/general/entities/base-entity'
import type { UniqueEntityId } from '@core/general/entities/value-objects/unique-entity-id'
import type { Nullable } from '@core/general/types/nullable'

export interface UserProps {
    name: string
    email: string
    password: string
    avatarUrl?: Nullable<string>
}

export class User extends Entity<UserProps> {
    get name() {
        return this.props.name
    }

    set name(newName: string) {
        this.props.name = newName
    }

    get email() {
        return this.props.email
    }

    set email(newEmail: string) {
        this.props.email = newEmail
    }

    get password() {
        return this.props.password
    }

    set password(newPassword: string) {
        this.props.password = newPassword
    }

    get avatarUrl(): Nullable<string> | undefined {
        return this.props.avatarUrl
    }

    set avatarUrl(newAvatarUrl: string) {
        this.props.avatarUrl = newAvatarUrl
    }

    static create(props: UserProps, id?: UniqueEntityId) {
        const user = new User(props, id)

        return user
    }
}
