class Account {

    id: string
    name: string
    email: string
    group: Group[]
    password: string
    userImage: string

    addressName: string
    addressNumber: string
    city: string
    neighborhood: string
    state: string
    complement: string
}
class Group {
    name: string
}

export {Account, Group}