import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

export const ErrorResponseInterceptor:HttpInterceptorFn = (req, next) => {

    return next(req).pipe(catchError((error : HttpErrorResponse) => {
        let errorMessage = ""

        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`
            
        }
        else {
            console.log(error.error.message)
            if (error.status === 0) {
                errorMessage = `Estado del Servidor: Desconectado (Código de Error: 0)"`
            }
            else if (error.status === 404){
                errorMessage = `No se encuentran registros`
            }
            else {
                errorMessage = `Error: ${error.error.message}`;
            }
        }

        return throwError(() => errorMessage)
    }))
}
