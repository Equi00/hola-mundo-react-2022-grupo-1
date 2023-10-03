export class User {
  id
  name
  surname
  userName
  itinerariosPuntuados
  itinerariosCreados
  destinosVisitados
  amigos
}

export function userFromJson(json) {
    const user = Object.assign(new User(),json,{
        id: json.id,
        name: json.name,
        surname: json.surname,
        userName: json.userName,
        itinerariosPuntuados: json.homeInfo.itinerariosPuntuados,
        itinerariosCreados: json.homeInfo.itinerariosCreados,
        destinosVisitados: json.homeInfo.destinosVisitados,
        amigos: json.homeInfo.amigos
    })
    return user
}
