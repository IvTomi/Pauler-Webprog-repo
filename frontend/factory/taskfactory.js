import TaskData from '../datasets/taskData.js'

export function mapTask(object){
    return new TaskData(object['id'],object['taskname'],object['description'],object['deadline'])
}