import { Injectable } from '@angular/core';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})

export class ModalService {
    modalOptions:NgbModalOptions;

    constructor(private modal: NgbModal){
        this.modalOptions = {
            backdrop:'static',
            backdropClass:'customBackdrop'
          }
    }
    open(content) {
        this.modal.open(content, this.modalOptions);
      }
}