import { IUserRegister } from "@/Interfaces/IUser";

export const mocksUser:IUserRegister[] = [
    {
        "id":" 1",
        "name": "John",
        "email": "john.doe@example.com",
        "birthdate": new Date("1990-01-15"), 
        "password": "password123",
        "phone": 342567890,
        "address":"Avenida Galicia 2344",
        "country": "Argentina",
        "city": "Santa Fe",
    }
]