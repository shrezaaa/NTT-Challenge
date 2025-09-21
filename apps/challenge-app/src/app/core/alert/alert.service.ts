import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private _snackBar = inject(MatSnackBar);

  showSnackBar(
    message: string,
    duration: number = 5500
  ) {
    duration = Math.floor((message.length / 5) * 500);
    duration = duration > 3000 ? duration : 3000;

    const config: MatSnackBarConfig = {
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    };

    this._snackBar.open(message, 'Close', config);
  }
}
