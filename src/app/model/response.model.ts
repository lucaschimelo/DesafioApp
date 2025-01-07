export class ResponseModel<T>{
    data : T | undefined;
    success : boolean = false;
    statusCode : number = 0;
    errorList : [] = []
}