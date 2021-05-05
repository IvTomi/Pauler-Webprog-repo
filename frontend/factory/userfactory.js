import UserData from '../datasets/userdata.js'
import ContactData from '../datasets/contactData.js'
import PermissionData from '../datasets/permissionData.js'

export function mapUser(object){
    return new UserData(object['id'],object['username'],object['firstname'],object['lastname'],null,null)
}

export function mapContact(object){
    return new ContactData(object['id'],object['typename'],object['value'],object['description'],object['ispublic'])
}

export function mapPermission(object){
    return new PermissionData(object['id'],object['permissionname'],object['isenabled'])
}