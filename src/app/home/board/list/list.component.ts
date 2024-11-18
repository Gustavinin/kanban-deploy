import { Component, OnInit } from '@angular/core';
import { DatePipe, NgForOf, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';

import {DndModule} from 'ngx-drag-drop';

import {
  DndDraggableDirective,
  DndDropEvent,
  DndDropzoneDirective,
  DndPlaceholderRefDirective,
  DropEffect,
} from 'ngx-drag-drop';
import { RouterLink } from '@angular/router';
import { BoardService } from '../board.service';

interface Task {
  id?: string;
  title?: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
  assignees?: string[];
  status?: 'toDo' | 'inProgress' | 'done';
}

interface DropzoneLayout {
  container: string;
  list: string;
  dndHorizontal: boolean;
}


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    DndDropzoneDirective,
    DndPlaceholderRefDirective,
    NgForOf,
    DndDraggableDirective,
    NgSwitchCase,
    NgSwitch,
    RouterLink,
    DatePipe
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {


  toDoList: Task[] = [];

  inProgressList: Task[] = [];

  doneList: Task[] = [];


  horizontalLayoutActive: boolean = false;
  private currentDraggableEvent?: DragEvent;
  private currentDragEffectMsg?: string;
  private readonly verticalLayout: DropzoneLayout = {
    container: 'row',
    list: 'column',
    dndHorizontal: false,
  };
  layout: DropzoneLayout = this.verticalLayout;
  private readonly horizontalLayout: DropzoneLayout = {
    container: 'row',
    list: 'row wrap',
    dndHorizontal: true,
  };

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.boardService.getAllTasks().subscribe({
      next: (res: any) => {
        this.toDoList = res.body?.toDo
        this.inProgressList = res.body?.inProgress
        this.doneList = res.body?.done

      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  setHorizontalLayout(horizontalLayoutActive: boolean) {
    this.layout = horizontalLayoutActive
      ? this.horizontalLayout
      : this.verticalLayout;
  }

  onDragStart(event: DragEvent) {
    this.currentDragEffectMsg = '';
    this.currentDraggableEvent = event;
  }

  onDragged(item: any, list: any[], effect: DropEffect) {

    if (effect === 'move') {
      const index = list.indexOf(item);
      list.splice(index, 1);
    }
  }

  onDragEnd(event: DragEvent) {
    this.currentDraggableEvent = event;
  }

  onDrop(event: DndDropEvent, status: 'toDo' | 'inProgress' | 'done', list?: any[],) {
    if (list && (event.dropEffect === 'copy' || event.dropEffect === 'move')) {
      let index = event.index;

      if (typeof index === 'undefined') {
        index = list.length;
      }
      event.data.status = status;

      list.splice(index, 0, event.data);

      this.boardService.putTask(event.data.id, event.data).subscribe({
        next: () => {
          console.log('Status alterado com sucesso!');
        }
      })
    }
  }
}
