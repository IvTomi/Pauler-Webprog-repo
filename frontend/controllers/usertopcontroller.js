import {SessionJanitor} from '../utilities/sessionJanitor.js'

export function getName(){
    let user = SessionJanitor.getSessionUser()
    return (user.firstname + ' '+user.lastname)
}