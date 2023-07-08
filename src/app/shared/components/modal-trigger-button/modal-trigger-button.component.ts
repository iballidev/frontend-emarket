import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-trigger-button',
  templateUrl: './modal-trigger-button.component.html',
  styleUrls: ['./modal-trigger-button.component.scss'],
})
export class ModalTriggerButtonComponent implements OnInit {
  @Output() triggerEvent = new EventEmitter();
  @Input() btnTitle!: string;
  @Input() btnType!: string;

  constructor() {}

  ngOnInit(): void {
    this.btnType ? this.btnType : 'button';
  }

  trigger() {
    this.triggerEvent ? this.triggerEvent.emit(true) : null;
  }
}
