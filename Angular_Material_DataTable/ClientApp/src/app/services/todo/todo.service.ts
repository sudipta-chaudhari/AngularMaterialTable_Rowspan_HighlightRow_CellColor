import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ToDo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public todos: ToDo[];

  constructor(private http: HttpClient) { }

  public getToDos() {
    return this.http.get('https://jsonplaceholder.typicode.com/todos').pipe(map((response: ToDo[]) => response));
  }
}
