
var Ticket = function(id, requestDate, requestTitle, requestDesc){
    this.id = id
    this.requestDate = requestDate
    this.requestTitle = requestTitle
    this.requestDesc = requestDesc
    this.assignedTech = null
    this.completionDate = null 
    this.notes = null
    this.completed = false

    this.completeTicket = function(assignedTech, completionDate, notes){
        this.assignedTech = assignedTech
        this.completionDate = completionDate 
        this.notes = notes
        this.completed = true
    }
}

module.exports = Ticket