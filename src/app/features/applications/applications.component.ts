import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // DARORI BACH TKHDEM MODAL
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { ApplicationService } from '../../core/services/application.service';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule, DragDropModule, FormsModule], // Zidna FormsModule
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  private appService = inject(ApplicationService);

  pending: any[] = [];
  accepted: any[] = [];
  rejected: any[] = [];

  showToast = false;
  toastMsg = '';
  isModalOpen = false;
  selectedApp: any = null;
  tempNote: string = '';

  ngOnInit() {
    this.loadApplications();
  }

  loadApplications() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user.id) {
      this.appService.getUserApplications(user.id).subscribe(apps => {
        this.pending = apps.filter(a => a.status === 'en_attente');
        this.accepted = apps.filter(a => a.status === 'accepte');
        this.rejected = apps.filter(a => a.status === 'refuse');
      });
    }
  }

  openNoteModal(app: any) {
    this.selectedApp = app;
    this.tempNote = app.notes || '';
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedApp = null;
  }

  saveNote() {
    if (this.selectedApp) {
      this.appService.updateStatus(this.selectedApp.id, { notes: this.tempNote }).subscribe(() => {
        this.selectedApp.notes = this.tempNote;
        this.triggerToast('Note enregistrée 📝');
        this.closeModal();
      });
    }
  }

  drop(event: CdkDragDrop<any[]>, newStatus: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const app = event.container.data[event.currentIndex];
      this.appService.updateStatus(app.id, { status: newStatus }).subscribe(() => {
        this.triggerToast(`Statut mis à jour : ${newStatus.replace('_', ' ')}`);
      });
    }
  }

  onDelete(id: any) {
    this.appService.deleteApplication(id).subscribe(() => {
      this.loadApplications();
      this.triggerToast('Candidature supprimée 🗑️');
    });
  }

  private triggerToast(msg: string) {
    this.toastMsg = msg;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }
}
