import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BusyService } from '../_services/busy.service';
import { delay, finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(BusyService);

  busyService.busy(); // Starts the spinner

  return next(req).pipe(
    // delay(1000),  //Fake delay for testing
    finalize(() => {
      busyService.idle()
    })
  )
};