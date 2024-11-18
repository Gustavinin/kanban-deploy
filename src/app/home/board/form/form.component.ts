import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BoardService } from '../board.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [NgIf, NgClass, ReactiveFormsModule, RouterLink],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {

  taskForm!: FormGroup;

  id!: string;

  constructor(
    private formBuilder: FormBuilder,
    private boardService: BoardService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.buildForm();
    this.id = this.activateRoute.snapshot.paramMap.get('id') || '';
    if (this.id) {
      this.getTaskById();
    }
  }

  buildForm() {
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(200)]],
      priority: ['low'],
      dueDate: ['', [Validators.required]],
      assignees: ['', [Validators.maxLength(100)]],
      status: ['toDo']
    });
  }

  getTaskById() {
    // this.spinner.show("clientFormSpinner");
    this.boardService.getTaskById(this.id).subscribe({
      next: (res) => {
        this.updateForm(res.body!);
      },
      error: () => {
        // this.spinner.hide("clientFormSpinner");
        // this.alert.notify('error', 'Erro ao buscar cliente!');
      }
    })
  }

  updateForm(task: any) {
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
      assignees: task.assignees,
      status: task.status,
    });
    // this.spinner.hide("clientFormSpinner");
  }

  applyError(field: any): Object {
    return {
      'is-invalid': this.checkValidTouched(field)
    }
  }

  checkValidTouched(field: any) {
    return !this.taskForm.get(field)?.valid && this.taskForm.get(field)?.touched;
  }

  onSubmit() {
    if (this.taskForm.valid) {
      // this.spinner.show("clientFormSpinner");

      if (this.id)
        this.putForm();
      else
        this.postForm();
    } else {
      // this.alert.notify('warning', 'Preencha todos os dados corretamente!');
      this.taskForm.markAllAsTouched();
    }
  }

  postForm() {
    this.boardService.postTask(this.taskForm.value).subscribe({
      next: () => {
        this.router.navigate(['/list']);
      },
      error: (err) => console.log(err)
    })
  }

  putForm() {
    this.boardService.putTask(this.id!, this.taskForm.value).subscribe({
      next: () => {
        console.log('editado com sucesso')
        this.router.navigate(['/list']);
      },
      error: (err) => {
        // this.sendErrorMessage(err, 'editar');
        console.log(err)
      }
    })
  }

  onDeleteTask() {
    this.boardService.deleteTask(this.id).subscribe({
      next: () => this.router.navigate(['/list'])
    })
  }

  teste() {
    console.log(this.taskForm)
  }

}
