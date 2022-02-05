export default class UserDto {
    userName;
    email;
    id;
    isActivated;
    constructor(model: any) {
       this.userName = model.userName
       this.email = model.email;
       this.id = model._id;
       this.isActivated = model.isActivated;
    }
}