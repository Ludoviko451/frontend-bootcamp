import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { Response } from "../models/response";
export const ErrorResponseInterceptor:HttpInterceptorFn = (req, next) => {

    return next(req).pipe(catchError((error : HttpErrorResponse) => {

        let errorMessage:Response = {} as Response;

        if (error.error instanceof ErrorEvent) {
            errorMessage.status = error.status
            errorMessage.message = `${error.error.message}`
            
        }
        else {
            console.log(error.error.message)

            errorMessage.status = error.status

            if (error.status === 0) {
                errorMessage.message = `Estado del Servidor: Desconectado (Código de Error: 0)`
            }
            else if (error.status === 404){
                errorMessage.message = `No se encuentran registros`
            }
            else {
                errorMessage.message = `Error: ${error.error.message}`;
            }
        }

        return throwError(() => errorMessage)
    }))
}
