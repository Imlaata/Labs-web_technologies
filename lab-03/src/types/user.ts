export interface Location {
  street: {
    number: number
    name: string
  }
  city: string
  state: string
  country: string
  postcode: number | string
  timezone: {
    offset: string
    description: string
  }
}

export interface User {
  id: number
  gender: 'female' | 'male'
  name: {
    title: string
    first: string
    last: string
  }
  location: Location
  email: string
  phone: string
  cell: string
  dob: {
    date: string
    age: number
  }
  picture: string
  hobbies: string[]
  details: string
}
