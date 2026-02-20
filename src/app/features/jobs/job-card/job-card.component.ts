import { Component , Input} from '@angular/core';
import { CommonModule , DatePipe } from '@angular/common';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './job-card.component.html'
})
export class JobCardComponent {
@Input() job: any;
}
