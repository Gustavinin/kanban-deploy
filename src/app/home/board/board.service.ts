import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  // baseUrl = "http://localhost:3000/api";
  baseUrl = "https://kanbanapi-9al8.onrender.com/api";
  URL = this.baseUrl + "/tasks";

  constructor(private http: HttpClient) { }


  getAllTasks() {
    return this.http.get(`${this.URL}`, { observe: 'response' });
  }

  getTaskById(id: string){
    return this.http.get(`${this.URL}/${id}`, { observe: 'response' });
  }

  postTask(form: FormGroup) {
    return this.http.post(this.URL, form, { observe: 'response' });
  }

  putTask(id: string, form: FormGroup | any) {
    return this.http.put(`${this.URL}/${id}`, form, { observe: 'response' });
  }

  deleteTask(id: string) {
    return this.http.delete(`${this.URL}/${id}`, { observe: 'response' });
  }

}
